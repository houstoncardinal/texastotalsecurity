import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import { blogArticles, blogCategories } from "@/lib/blogData";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";

const Blog = () => {
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Security Resources", href: "/blog" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Security Resources & Guides | Houston Security Blog"
        description="Expert security guides, tips, and resources from Texas Total Security. Home security, business surveillance, alarm systems, crime prevention, and Houston-specific advice."
        schemas={schemas}
      />
      <Breadcrumbs items={[{ name: "Security Resources" }]} />

      <section className="section-dark py-16 sm:py-20">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Security Resources & Guides
          </h1>
          <p className="text-lg opacity-70">
            Expert advice on alarm systems, security cameras, crime prevention, and protecting your Houston property — from the team with 30+ years of experience.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary/50 border-b border-border py-6">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {blogCategories.map(cat => (
              <Link
                key={cat.slug}
                to={`/blog/category/${cat.slug}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border hover:border-accent hover:text-accent transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionHeading title="Latest Articles" subtitle="In-depth guides and expert insights to help you make informed security decisions." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.map(article => {
              const category = blogCategories.find(c => c.slug === article.category);
              return (
                <Link key={article.slug} to={`/blog/${article.slug}`} className="glass-card group block overflow-hidden">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40 flex items-center justify-center">
                    <Tag className="w-10 h-10 text-accent/40" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {category && <span className="text-xs font-semibold text-accent uppercase tracking-wider">{category.name}</span>}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{article.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTABlock />
    </Layout>
  );
};

export default Blog;
