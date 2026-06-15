/**
 * Build-time pre-render for blog articles.
 *
 * Social crawlers (iMessage, Facebook, Slack, LinkedIn, Twitter) DON'T execute JS.
 * They only see the static HTML returned at the URL — so the React `SEOHead`
 * component (which sets meta tags in useEffect) is invisible to them.
 *
 * To fix per-article share previews, this script writes a real
 * `dist/blog/<slug>/index.html` for every article, each containing that
 * article's own <title>, <meta description>, canonical, og:*, twitter:*,
 * and JSON-LD (Article + Breadcrumb + extras).
 *
 * Netlify's catch-all SPA redirect (`/*  ->  /index.html  200`) only fires
 * when no real file matches the path, so these pre-rendered files take
 * precedence for crawlers while the React app still hydrates normally for
 * human visitors.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { blogArticles, blogCategories } from "../src/lib/blogData";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = resolve(root, "dist");
const shellPath = resolve(distDir, "index.html");

const SITE_URL = "https://www.texastotalsecurity.com";
const COMPANY = "Texas Total Security";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

if (!existsSync(shellPath)) {
  console.warn(`[prerender-blog] ${shellPath} not found — skipping.`);
  process.exit(0);
}

const shell = readFileSync(shellPath, "utf8");

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function resolveOgImage(heroImage: string | undefined): string {
  if (!heroImage) return DEFAULT_OG;
  if (/^https?:\/\//.test(heroImage)) return heroImage;
  if (heroImage.startsWith("/")) return `${SITE_URL}${heroImage}`;
  // Imported bundled image (not a public URL) — fall back to default OG
  return DEFAULT_OG;
}

function buildSchemas(article: typeof blogArticles[number]) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const image = resolveOgImage(article.heroImage);
  const category = blogCategories.find((c) => c.slug === article.category);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "image": [image],
    "datePublished": article.datePublished,
    "dateModified": article.datePublished,
    "author": { "@type": "Organization", "name": COMPANY, "url": SITE_URL },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "articleSection": category?.name,
    "keywords": article.tags?.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Security Resources", "item": `${SITE_URL}/blog` },
      ...(category
        ? [{ "@type": "ListItem", "position": 3, "name": category.name, "item": `${SITE_URL}/blog/category/${category.slug}` }]
        : []),
      {
        "@type": "ListItem",
        "position": category ? 4 : 3,
        "name": article.title,
        "item": url,
      },
    ],
  };

  return [articleSchema, breadcrumbSchema, ...(article.extraSchemas || [])];
}

function buildMetaBlock(article: typeof blogArticles[number]): string {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const image = resolveOgImage(article.heroImage);
  const title = escape(article.metaTitle);
  const desc = escape(article.metaDescription);
  const alt = escape(article.heroImageAlt || article.title);
  const schemas = buildSchemas(article);

  return `    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${alt}" />
    <meta property="og:site_name" content="${COMPANY}" />
    <meta property="og:locale" content="en_US" />
    <meta property="article:published_time" content="${article.datePublished}" />
    <meta property="article:modified_time" content="${article.datePublished}" />
    <meta property="article:author" content="${COMPANY}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${alt}" />
    <meta name="twitter:site" content="@texastotalsecurity" />
${schemas.map((s) => `    <script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}`;
}

// Replace the head's existing title + meta description + canonical + og:* +
// twitter:* block with the article's. We strip the homepage-level tags so
// crawlers see only the article-correct ones.
function rewriteHead(article: typeof blogArticles[number]): string {
  const meta = buildMetaBlock(article);
  let out = shell;

  // Drop existing tags we're going to replace.
  out = out.replace(/<title>[\s\S]*?<\/title>/, "");
  out = out.replace(/<meta\s+name="description"[^>]*>\s*/i, "");
  out = out.replace(/<link\s+rel="canonical"[^>]*>\s*/i, "");
  out = out.replace(/<meta\s+property="og:[^"]*"[^>]*>\s*/gi, "");
  out = out.replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, "");

  // Insert the article block right after <head>.
  out = out.replace(/<head>/i, `<head>\n${meta}\n`);
  return out;
}

let written = 0;
for (const article of blogArticles) {
  const outDir = resolve(distDir, "blog", article.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), rewriteHead(article), "utf8");
  written++;
}

console.log(`[prerender-blog] wrote ${written} pre-rendered article HTML file(s) into dist/blog/<slug>/index.html`);
