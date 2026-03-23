import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  schemas?: object[];
}

const BASE_URL = "https://www.texastotalsecurity.com";

const SEOHead = ({ title, description, canonical, schemas = [] }: SEOHeadProps) => {
  const location = useLocation();
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;
  const fullTitle = title.includes("Texas Total Security") ? title : `${title} | Texas Total Security`;

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

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // Schema markup
    const existingSchemas = document.querySelectorAll('script[data-seo="schema"]');
    existingSchemas.forEach(el => el.remove());

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "schema");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const leftover = document.querySelectorAll('script[data-seo="schema"]');
      leftover.forEach(el => el.remove());
    };
  }, [fullTitle, description, canonicalUrl, schemas]);

  return null;
};

export default SEOHead;
