import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABlock from "@/components/CTABlock";
import InternalLinks from "@/components/InternalLinks";
import { getArticleBySlug, blogCategories } from "@/lib/blogData";
import SecurityShowdownChart, { BackToChart } from "@/components/SecurityShowdownChart";
import { ZoomableImage } from "@/components/ZoomableImage";
import houstonProblemImg from "@/assets/houston-we-have-a-problem.png";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Clock, ArrowLeft, Phone } from "lucide-react";

// Imported (bundled) hero images keyed by heroImage value
const importedHeroImages: Record<string, string> = {
  "houston-we-have-a-problem": houstonProblemImg,
};

// Resolve heroImage — supports both imported assets and /public/ URLs
function resolveHeroImage(heroImage: string | undefined): string | undefined {
  if (!heroImage) return undefined;
  if (heroImage.startsWith("/")) return heroImage; // public folder
  return importedHeroImages[heroImage];
}

// Articles where the chart IS the hero — skip the pre-content CTA strip
const CHART_FIRST_ARTICLES = new Set(["security-showdown-hardwired-vs-wifi-cameras"]);

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

// Running counter for numbered section headings per article
let h2Counter = 0;
const NUMBERED_ARTICLES = new Set(["security-showdown-hardwired-vs-wifi-cameras"]);

const BlogArticle = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const article = articleSlug ? getArticleBySlug(articleSlug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

  // Reset counter before render
  h2Counter = 0;

  const category = blogCategories.find(c => c.slug === article.category);
  const breadcrumbs = [
    { name: "Security Resources", href: "/blog" },
    ...(category ? [{ name: category.name, href: `/blog/category/${category.slug}` }] : []),
    { name: article.title },
  ];

  const schemas = [
    generateArticleSchema(article.title, article.metaDescription, `/blog/${article.slug}`, article.datePublished),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Security Resources", href: "/blog" },
      { name: article.title, href: `/blog/${article.slug}` },
    ]),
    ...(article.extraSchemas || []),
  ];

  const serviceLinks = article.relatedServices.map(href => {
    const labels: Record<string, string> = {
      "/alarm-systems": "Alarm Systems",
      "/security-cameras": "Security Cameras",
      "/residential": "Residential Security",
      "/commercial": "Commercial Security",
      "/hoa-security": "HOA Security",
      "/monitoring-services": "Monitoring Services",
    };
    return { label: labels[href] || href, href };
  });

  const inlineComponents: Record<string, React.ReactNode> = {
    "[[SHOWDOWN_CHART]]": <SecurityShowdownChart />,
    "[[BACK_TO_CHART]]": <BackToChart />,
  };

  const renderInlineHtml = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent font-medium underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-all">$1</a>');

  const isNumbered = NUMBERED_ARTICLES.has(articleSlug ?? "");

  const renderContent = (content: string) => {
    // Skip non-content headings (last two) for the numbering in this article
    const nonNumberedHeadings = new Set([
      "Is a Professional System Right for You?",
    ]);

    return content.split("\n\n").map((block, i) => {
      const trimmed = block.trim();

      // Inline component tokens
      if (inlineComponents[trimmed]) {
        return <div key={i}>{inlineComponents[trimmed]}</div>;
      }

      if (block.startsWith("## ")) {
        const text = block.replace("## ", "");
        const id = slugify(text);
        const showNumber = isNumbered && !nonNumberedHeadings.has(text);
        if (showNumber) h2Counter++;
        const num = h2Counter;

        return (
          <div key={i} className="mt-14 mb-5 scroll-mt-28 group" id={id}>
            {showNumber && (
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, hsl(0 85% 50%) 0%, hsl(0 92% 36%) 100%)" }}
                >
                  {num}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
            )}
            {!showNumber && (
              <div className="h-px w-12 bg-accent/30 mb-4" />
            )}
            <h2 className="text-2xl sm:text-[1.6rem] font-display font-bold text-foreground leading-tight">
              {text}
            </h2>
          </div>
        );
      }

      if (block.startsWith("### ")) {
        const text = block.replace("### ", "");
        return (
          <h3 key={i} className="text-lg font-display font-semibold text-foreground mt-8 mb-3">
            {text}
          </h3>
        );
      }

      if (block.startsWith("- ")) {
        const items = block.split("\n").filter(l => l.startsWith("- "));
        return (
          <ul key={i} className="space-y-3 my-5">
            {items.map((item, j) => (
              <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "hsl(0 85% 45%)" }}
                />
                <span dangerouslySetInnerHTML={{ __html: renderInlineHtml(item.replace("- ", "")) }} />
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p
          key={i}
          className="text-muted-foreground leading-[1.85] mb-5 text-[0.97rem]"
          dangerouslySetInnerHTML={{ __html: renderInlineHtml(block) }}
        />
      );
    });
  };

  const heroSrc = resolveHeroImage(article.heroImage);
  const isChartFirst = CHART_FIRST_ARTICLES.has(articleSlug ?? "");

  // Build absolute OG image URL — public-folder images use the /path directly
  const ogImage = article.heroImage?.startsWith("/") ? article.heroImage : undefined;

  return (
    <Layout>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        schemas={schemas}
        ogImage={ogImage}
        ogImageAlt={article.heroImageAlt}
      />
      <Breadcrumbs items={breadcrumbs} />

      <article className="section-padding">
        <div className="container-tight max-w-3xl mx-auto">

          {/* ── Header ── */}
          <header className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-7 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Resources
            </Link>

            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              {category && (
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    background: "hsl(0 85% 44% / 0.08)",
                    color: "hsl(0 85% 40%)",
                    border: "1px solid hsl(0 85% 44% / 0.16)",
                  }}
                >
                  {category.name}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {article.readTime} read
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(article.datePublished).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-[2.1rem] font-display font-bold text-foreground mb-5 leading-tight">
              {article.title}
            </h1>
            <p
              className="text-base sm:text-lg text-muted-foreground leading-relaxed pl-4"
              style={{ borderLeft: "3px solid hsl(0 85% 44% / 0.35)" }}
            >
              {article.excerpt}
            </p>
          </header>

          {/* ── Hero image (zoomable) ── */}
          {heroSrc && (
            <div className="mb-10 -mx-4 sm:mx-0">
              <ZoomableImage
                src={heroSrc}
                alt={article.heroImageAlt || article.title}
                caption={article.heroImageAlt}
              />
            </div>
          )}

          {/* ── Pre-content CTA (suppressed for chart-first articles) ── */}
          {!isChartFirst && (
            <div
              className="p-5 mb-10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{
                background: "hsl(0 85% 44% / 0.04)",
                border: "1px solid hsl(0 85% 44% / 0.12)",
              }}
            >
              <div>
                <p className="font-display font-semibold text-foreground text-sm">Need expert advice for your property?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Free onsite security analysis — no obligation.</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <Link to="/free-analysis" className="btn-primary-gradient text-xs px-5 py-2.5 whitespace-nowrap">
                  Free Onsite Security Analysis
                </Link>
                <a href="tel:7133879937" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent whitespace-nowrap">
                  <Phone className="w-3 h-3" /> (713) 387-9937
                </a>
              </div>
            </div>
          )}

          {/* ── Body ── */}
          <div className="prose-custom">{renderContent(article.content)}</div>

          {/* ── Post-content CTA ── */}
          <div
            className="mt-14 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{
              background: "linear-gradient(135deg, hsl(0 85% 44% / 0.07) 0%, hsl(0 85% 44% / 0.02) 100%)",
              border: "1px solid hsl(0 85% 44% / 0.15)",
            }}
          >
            <div>
              <p className="font-display font-bold text-foreground text-base mb-1">Ready to discuss your property?</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Our licensed technicians provide free onsite security analyses for Houston-area homes and businesses — no obligation, no commitment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
              <Link to="/free-analysis" className="btn-primary-gradient text-sm px-6 py-3 whitespace-nowrap">
                Free Onsite Security Analysis
              </Link>
              <a href="tel:7133879937" className="text-sm font-semibold text-accent whitespace-nowrap hover:opacity-80 transition-opacity">
                (713) 387-9937
              </a>
            </div>
          </div>

          {/* ── Tags ── */}
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Topics</p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="trust-badge text-xs">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </article>

      <InternalLinks title="Related Services" links={serviceLinks} />
      <CTABlock />
    </Layout>
  );
};

export default BlogArticle;
