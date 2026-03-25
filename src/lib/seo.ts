 pages// SEO utilities: schema markup, meta tags, breadcrumbs

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
  address: {
    street: "",
    city: "Houston",
    state: "TX",
    zip: "77001",
  },
  areaServed: ["Houston", "Sugar Land", "Katy", "Pearland", "Cypress", "The Woodlands", "Pasadena", "Missouri City", "Richmond", "Rosenberg", "League City", "Bellaire", "Spring", "Tomball", "Humble", "Baytown", "Conroe", "Alvin", "Friendswood", "Dickinson", "La Porte", "Deer Park"],
  geo: { lat: 29.7604, lng: -95.3698 },
  hours: {
    weekday: { open: "07:00", close: "18:00" },
    saturday: { open: "08:00", close: "14:00" },
  },
};

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "name": COMPANY.name,
    "url": COMPANY.url,
    "logo": COMPANY.logo,
    "description": COMPANY.description,
    "telephone": COMPANY.phoneTel,
    "email": COMPANY.email,
    "foundingDate": String(COMPANY.foundingYear),
    "foundingLocation": {
      "@type": "City",
      "name": "Houston",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "areaServed": COMPANY.areaServed.map(city => ({
      "@type": "City",
      "name": `${city}, TX`,
    })),
    "knowsLanguage": ["English", "Spanish"],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "Texas State License",
        "identifier": COMPANY.license
      }
    ],
    "sameAs": [
      "https://www.facebook.com/texastotalsecurity",
      "https://www.linkedin.com/company/texastotalsecurity"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY.phoneTel,
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish"],
      "areaServed": "US",
      "contactOption": "TollFree"
    }
  };
}

export function generateLocalBusinessSchema(city?: string) {
  const serviceOfferings = [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Alarm System Installation", "description": "Professional installation of hardwired, wireless, and hybrid alarm systems" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Security Camera Installation", "description": "HD and 4K surveillance camera systems with remote viewing" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Alarm Monitoring", "description": "Local monitoring center with fast dispatch response" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Security Systems", "description": "Enterprise-grade security for businesses" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Security Systems", "description": "Whole-home protection with smart home integration" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HOA Security Solutions", "description": "Gate cameras, community surveillance, LPR systems" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Access Control Systems", "description": "Keycard, fob, PIN, and mobile credential systems" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Verification Monitoring", "description": "Double-verified video monitoring for alarm events" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "System Takeover", "description": "Take over existing systems from other providers" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Service & Maintenance", "description": "Ongoing system support and troubleshooting" } },
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "SecurityService", "ProfessionalService"],
    "name": COMPANY.name,
    "url": COMPANY.url,
    "logo": COMPANY.logo,
    "image": [`${BASE_URL}/logo.png`, `${BASE_URL}/hero-image.jpg`],
    "description": city
      ? `${COMPANY.name} provides professional alarm systems, security cameras, and 24/7 local monitoring in ${city}, TX and surrounding areas. Serving homeowners and businesses since ${COMPANY.foundingYear}.`
      : COMPANY.description,
    "telephone": COMPANY.phoneTel,
    "email": COMPANY.email,
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Financing Available",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city || COMPANY.address.city,
      "addressRegion": COMPANY.address.state,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": COMPANY.geo.lat,
      "longitude": COMPANY.geo.lng,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": COMPANY.address.city,
        "addressRegion": COMPANY.address.state,
        "addressCountry": "US"
      }
    },
    "areaServed": city
      ? [{ "@type": "City", "name": `${city}, TX` }]
      : COMPANY.areaServed.map(c => ({ "@type": "City", "name": `${c}, TX` })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Security Services",
      "description": "Complete security solutions for residential and commercial properties",
      "itemListElement": serviceOfferings
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "247",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael R."
        },
        "reviewBody": "Texas Total Security installed our complete home security system. Professional installation, great equipment, and the local monitoring gives us real peace of mind."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Jennifer T."
        },
        "reviewBody": "They took over our existing alarm system from ADT and it was seamless. Better monitoring, better service, and no new equipment costs."
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": COMPANY.hours.weekday.open,
        "closes": COMPANY.hours.weekday.close
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": COMPANY.hours.saturday.open,
        "closes": COMPANY.hours.saturday.close
      }
    ],
    "makesOffer": serviceOfferings,
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "name": "Texas State Security License",
      "identifier": COMPANY.license
    },
    "foundingDate": String(COMPANY.foundingYear),
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "15-50"
    }
  };
}

export function generateServiceSchema(serviceName: string, serviceDesc: string, serviceUrl: string, serviceType?: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Service", "ProfessionalService"],
    "name": serviceName,
    "description": serviceDesc,
    "url": `${BASE_URL}${serviceUrl}`,
    "provider": {
      "@type": ["LocalBusiness", "ProfessionalService", "SecurityService"],
      "name": COMPANY.name,
      "telephone": COMPANY.phoneTel,
      "email": COMPANY.email,
      "url": COMPANY.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": COMPANY.address.city,
        "addressRegion": COMPANY.address.state,
        "addressCountry": "US"
      }
    },
    "areaServed": COMPANY.areaServed.map(c => ({
      "@type": "City",
      "name": `${c}, TX`
    })),
    "serviceType": serviceType || serviceName,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Options`,
      "itemListElement": [
        { "@type": "Offer", "name": "Professional Installation" },
        { "@type": "Offer", "name": "System Takeover Available" },
        { "@type": "Offer", "name": "24/7 Monitoring" }
      ]
    }
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.href}`
    }))
  };
}

export function generateArticleSchema(title: string, description: string, url: string, datePublished: string, author?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": `${BASE_URL}${url}`,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Organization",
      "name": author || COMPANY.name,
      "url": COMPANY.url
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY.name,
      "logo": {
        "@type": "ImageObject",
        "url": COMPANY.logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}${url}`
    }
  };
}

export function generateReviewSchema(reviews: { author: string; text: string; rating: number; location?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SecurityService"],
    "name": COMPANY.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": String(reviews.length > 0 ? reviews.length : 247),
      "bestRating": "5"
    },
    "review": reviews.map(r => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(r.rating),
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": r.author
      },
      "reviewBody": r.text,
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": COMPANY.name
      },
      "locationCreated": r.location ? {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": r.location,
          "addressRegion": "TX",
          "addressCountry": "US"
        }
      } : undefined
    }))
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": COMPANY.name,
    "url": COMPANY.url,
    "description": COMPANY.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY.name,
      "url": COMPANY.url,
      "logo": {
        "@type": "ImageObject",
        "url": COMPANY.logo
      }
    }
  };
}

export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${COMPANY.name}`,
    "url": `${BASE_URL}/contact`,
    "description": `Contact ${COMPANY.name} for professional security system installation, monitoring, and service. Call ${COMPANY.phone} or email ${COMPANY.email}.`,
    "mainEntity": {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": COMPANY.name,
      "telephone": COMPANY.phoneTel,
      "email": COMPANY.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": COMPANY.address.city,
        "addressRegion": COMPANY.address.state,
        "addressCountry": "US"
      },
      "areaServed": COMPANY.areaServed.map(c => ({
        "@type": "City",
        "name": `${c}, TX`
      }))
    }
  };
}

export function generateAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `About ${COMPANY.name}`,
    "url": `${BASE_URL}/about`,
    "description": `Learn about ${COMPANY.name} - Houston's trusted security experts since ${COMPANY.foundingYear}. Family-owned, locally operated, with in-house monitoring.`,
    "mainEntity": {
      "@type": ["Organization", "LocalBusiness"],
      "name": COMPANY.name,
      "foundingDate": String(COMPANY.foundingYear),
      "foundingLocation": {
        "@type": "City",
        "name": "Houston",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "description": COMPANY.description,
      "telephone": COMPANY.phoneTel,
      "email": COMPANY.email,
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "15-50"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "Texas State Security License",
        "identifier": COMPANY.license
      }
    }
  };
}

export function generateVideoSchema(title: string, description: string, thumbnailUrl: string, uploadDate: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "publisher": {
      "@type": "Organization",
      "name": COMPANY.name,
      "logo": {
        "@type": "ImageObject",
        "url": COMPANY.logo
      }
    }
  };
}

export function generateImageSchema(imageUrl: string, caption?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": imageUrl,
    "caption": caption || COMPANY.name,
    "author": {
      "@type": "Organization",
      "name": COMPANY.name
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY.name
    }
  };
}

export function generateServiceAreaSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ServiceArea",
    "name": "Greater Houston Security Services",
    "description": `Professional security system installation and monitoring services throughout ${COMPANY.areaServed.join(", ")}, and surrounding Texas areas.`,
    "areaServed": COMPANY.areaServed.map(city => ({
      "@type": ["City", "AdministrativeArea"],
      "name": city,
      "addressRegion": "TX",
      "addressCountry": "US"
    })),
    "provider": {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": COMPANY.name,
      "telephone": COMPANY.phoneTel
    }
  };
}

export { COMPANY, BASE_URL };
