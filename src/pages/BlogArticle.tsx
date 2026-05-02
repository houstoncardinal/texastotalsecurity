import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABlock from "@/components/CTABlock";
import InternalLinks from "@/components/InternalLinks";
import { getArticleBySlug, blogCategories } from "@/lib/blogData";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Clock, ArrowLeft, ArrowRight, Phone } from "lucide-react";

const BlogArticle = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const article = articleSlug ? getArticleBySlug(articleSlug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

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
  ];

  const serviceLinks = article.relatedServices.map(href => {
    const labels: Record<string, string> = {
      "/alarm-systems": "Alarm Systems",
      "/security-cameras": "Security Cameras",
      "/residential": "Residential Security",
      "/commercial": "Commercial Security",
      "/hoa-security": "HOA Security",
      "/monitoring-services": "Monitoring Services",
      "/service-maintenance": "Service & Maintenance",
    };
    return { label: labels[href] || href, href };
  });

  // Simple markdown-to-HTML converter for article content
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return <h2 key={i} className="text-2xl font-display font-bold text-foreground mt-10 mb-4">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("### ")) {
        return <h3 key={i} className="text-xl font-display font-semibold text-foreground mt-8 mb-3">{block.replace("### ", "")}</h3>;
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter(l => l.startsWith("- "));
        return (
          <ul key={i} className="space-y-2 my-4 ml-4">
            {items.map((item, j) => {
              const text = item.replace("- ", "");
              return (
                <li key={j} className="text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-accent mt-1.5">•</span>
                  <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>') }} />
                </li>
              );
            })}
          </ul>
        );
      }
      // Regular paragraph
      const html = block
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>');
      return <p key={i} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: html }} />;
    });
  };

  return (
    <Layout>
      <SEOHead title={article.metaTitle} description={article.metaDescription} schemas={schemas} />
      <Breadcrumbs items={breadcrumbs} />

      <article className="section-padding">
        <div className="container-tight max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
            </Link>
            <div className="flex items-center gap-3 mb-4">
              {category && <span className="text-xs font-semibold text-accent uppercase tracking-wider">{category.name}</span>}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {article.readTime} read
              </span>
              <span className="text-xs text-muted-foreground">{new Date(article.datePublished).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">{article.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
          </div>

          {/* CTA Banner */}
          <div className="glass-card p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-accent/5 border-accent/20">
            <div>
              <p className="font-display font-semibold text-foreground text-sm">Need expert advice for your property?</p>
              <p className="text-xs text-muted-foreground">Schedule a free onsite security analysis — no obligation.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/free-analysis" className="btn-primary-gradient text-xs px-4 py-2">Free Analysis</Link>
              <a href="tel:7133879937" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                <Phone className="w-3 h-3" /> (713) 387-9937
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="prose-custom">
            {renderContent(article.content)}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-border">
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
