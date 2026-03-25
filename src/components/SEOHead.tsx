import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  schemas?: object[];
  ogImage?: string;
}

const BASE_URL = "https://www.texastotalsecurity.com";
const COMPANY_NAME = "Texas Total Security";
const COMPANY_PHONE = "(713) 387-9937";
const COMPANY_EMAIL = "info@texastotalsecurity.com";
const COMPANY_LICENSE = "B03066901";

const SEOHead = ({ title, description, canonical, schemas = [], ogImage }: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;
  const fullTitle = title.includes(COMPANY_NAME) ? title : `${title} | ${COMPANY_NAME}`;
  const defaultOgImage = `${BASE_URL}/og-image.jpg`;
  const currentOgImage = ogImage || defaultOgImage;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Core meta tags
    setMeta("description", description);
    setMeta("keywords", "security systems, alarm systems, security cameras, Houston TX, home security, business security, 24/7 monitoring, commercial security, residential security, HOA security");
    setMeta("robots", "index, follow");
    setMeta("author", COMPANY_NAME);
    
    // Open Graph / Facebook
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", currentOgImage, "property");
    setMeta("og:image:alt", `${COMPANY_NAME} - Houston Security Systems`, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:site_name", COMPANY_NAME, "property");
    setMeta("og:locale", "en_US", "property");
    
    // Twitter Card
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", currentOgImage, "name");
    setMeta("twitter:image:alt", `${COMPANY_NAME} - Houston Security Systems`, "name");
    setMeta("twitter:site", "@texastotalsecurity", "name");
    
    // Additional SEO meta
    setMeta("theme-color", "#dc2626", "name");
    setMeta("msapplication-TileColor", "#dc2626", "name");
    setMeta("apple-mobile-web-app-title", COMPANY_NAME, "name");
    setMeta("apple-mobile-web-app-capable", "yes", "name");
    setMeta("apple-mobile-web-app-status-bar-style", "default", "name");

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // Additional link tags
    const additionalLinks = [
      { rel: "alternate", type: "application/rss+xml", title: `${COMPANY_NAME} Blog`, href: `${BASE_URL}/blog/feed.xml` },
      { rel: "author", href: `${BASE_URL}/about` },
    ];

    additionalLinks.forEach(({ rel, type, title, href }) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      if (type) el.setAttribute("type", type);
      if (title) el.setAttribute("title", title);
      el.setAttribute("href", href);
    });

    // Schema markup - include Website schema on all pages
    const existingSchemas = document.querySelectorAll('script[data-seo="schema"]');
    existingSchemas.forEach(el => el.remove());

    // Always include Website schema for SGE visibility
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": COMPANY_NAME,
      "url": BASE_URL,
      "description": "Houston's trusted security experts for 30+ years. Custom alarm systems, security cameras, 24/7 local monitoring.",
      "publisher": {
        "@type": "Organization",
        "name": COMPANY_NAME,
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/logo.png`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+17133879937",
          "contactType": "customer service",
          "availableLanguage": ["English", "Spanish"]
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Prepend Website schema
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "schema");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Add Website schema last
    const websiteScript = document.createElement("script");
    websiteScript.type = "application/ld+json";
    websiteScript.setAttribute("data-seo", "schema");
    websiteScript.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(websiteScript);

    return () => {
      const leftover = document.querySelectorAll('script[data-seo="schema"]');
      leftover.forEach(el => el.remove());
    };
  }, [fullTitle, description, canonicalUrl, schemas, currentOgImage]);

  return null;
};

export default SEOHead;
