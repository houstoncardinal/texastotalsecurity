// SEO utilities: schema markup, meta tags, breadcrumbs

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

const BASE_URL = "https://www.texastotalsecurity.com";
const COMPANY = {
  name: "Texas Total Security",
  phone: "(713) 387-9937",
  phoneTel: "+17133879937",
  email: "info@texastotalsecurity.com",
  license: "B03066901",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  foundingYear: 1994,
  description: "Houston's trusted security experts for 30+ years. Custom alarm systems, security cameras, 24/7 local monitoring for homes, businesses, and HOAs.",
  areaServed: ["Houston", "Sugar Land", "Katy", "Pearland", "Cypress", "The Woodlands", "Pasadena", "Missouri City", "Richmond", "Rosenberg", "League City", "Bellaire"],
  geo: { lat: 29.7604, lng: -95.3698 },
};

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
    logo: COMPANY.logo,
    description: COMPANY.description,
    telephone: COMPANY.phoneTel,
    email: COMPANY.email,
    foundingDate: String(COMPANY.foundingYear),
    areaServed: COMPANY.areaServed.map(city => ({
      "@type": "City",
      name: `${city}, TX`,
    })),
    sameAs: [],
  };
}

export function generateLocalBusinessSchema(city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    name: COMPANY.name,
    url: COMPANY.url,
    logo: COMPANY.logo,
    image: COMPANY.logo,
    description: city
      ? `${COMPANY.name} provides professional alarm systems, security cameras, and 24/7 local monitoring in ${city}, TX and surrounding areas.`
      : COMPANY.description,
    telephone: COMPANY.phoneTel,
    email: COMPANY.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: city || "Houston",
      addressRegion: "TX",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    areaServed: city
      ? [{ "@type": "City", name: `${city}, TX` }]
      : COMPANY.areaServed.map(c => ({ "@type": "City", name: `${c}, TX` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Security Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Alarm System Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security Camera Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "24/7 Alarm Monitoring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Security Systems" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "HOA Security Solutions" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "187",
      bestRating: "5",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
  };
}

export function generateServiceSchema(serviceName: string, serviceDesc: string, serviceUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDesc,
    url: `${BASE_URL}${serviceUrl}`,
    provider: {
      "@type": "SecurityService",
      name: COMPANY.name,
      telephone: COMPANY.phoneTel,
    },
    areaServed: COMPANY.areaServed.map(c => ({ "@type": "City", name: `${c}, TX` })),
    serviceType: serviceName,
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}

export function generateArticleSchema(title: string, description: string, url: string, datePublished: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${url}`,
    datePublished,
    dateModified: datePublished,
    author: { "@type": "Organization", name: COMPANY.name },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: { "@type": "ImageObject", url: COMPANY.logo },
    },
  };
}

export function generateReviewSchema(reviews: { author: string; text: string; rating: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    name: COMPANY.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(reviews.length > 0 ? reviews.length : 187),
      bestRating: "5",
    },
    review: reviews.map(r => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    })),
  };
}

export { COMPANY, BASE_URL };
