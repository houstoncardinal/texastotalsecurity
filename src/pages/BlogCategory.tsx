import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import { getArticlesByCategory, blogCategories } from "@/lib/blogData";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { ArrowRight, Clock, Tag } from "lucide-react";

const BlogCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = blogCategories.find(c => c.slug === categorySlug);
  const articles = categorySlug ? getArticlesByCategory(categorySlug) : [];

  if (!category) return <Navigate to="/blog" replace />;

  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Security Resources", href: "/blog" },
      { name: category.name, href: `/blog/category/${category.slug}` },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title={`${category.name} | Security Resources`}
        description={category.description}
        schemas={schemas}
      />
      <Breadcrumbs items={[
        { name: "Security Resources", href: "/blog" },
        { name: category.name },
      ]} />

      <section className="section-dark py-16 sm:py-20">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">{category.name}</h1>
          <p className="text-lg opacity-70">{category.description}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <Link key={article.slug} to={`/blog/${article.slug}`} className="glass-card group block overflow-hidden">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40 flex items-center justify-center">
                    <Tag className="w-10 h-10 text-accent/40" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Articles for this category are coming soon.</p>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                View All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTABlock />
    </Layout>
  );
};

export default BlogCategory;
