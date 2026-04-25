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
  slogan: "Get the Protection You Deserve",
  foundingDate: "1994",

  description: "Houston-based local alarm company specializing in residential security systems, commercial alarm systems, security camera installation, HOA & multi-family community security, and 24/7 alarm monitoring. Serving Houston and all surrounding areas for 30+ years.",
  address: {
    street: "11331 Richmond Ave. #102",
    city: "Houston",
    state: "TX",
    zip: "77082",
  },
  areaServed: [
    "Houston", "Bellaire", "West University Place", "Southside Place",
    "Hunters Creek Village", "Piney Point Village", "Bunker Hill Village",
    "Hedwig Village", "Hilshire Village", "Spring Valley Village",
    "Katy", "Sugar Land", "The Woodlands", "Spring",
    "Cypress", "Pearland", "Pasadena", "Humble", "Conroe", "Baytown",
    "Missouri City", "Friendswood", "League City", "Stafford", "Richmond",
    "Tomball",
  ],
  geo: { lat: 29.7604, lng: -95.3698 },
  hours: {
    weekday: { open: "08:00", close: "18:00" },
    saturday: { open: "08:00", close: "14:00" },
  },
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Financing"],
  foundingLocation: { city: "Houston", state: "TX" },
  brandColors: ["#dc2626", "#1f2937"],
  services: [
    "Alarm System Installation",
    "Security Camera Systems",
    "24/7 Alarm Monitoring",
    "Commercial Security Systems",
    "Residential Security Systems",
    "HOA Security Solutions",
    "Video Verification Monitoring",
    "System Takeover",
    "Service & Maintenance",
    "Fire Alarm Systems",
    "Smart Home Integration",
    "License Plate Recognition",
    "Video Doorbell Systems",
  ],
};

/** Enhanced Organization Schema with complete business details */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService", "SecurityService"],
    "@id": `${BASE_URL}/#organization`,
    "name": COMPANY.name,
    "url": COMPANY.url,
    "logo": {
      "@type": "ImageObject",
      "url": COMPANY.logo,
      "width": 200,
      "height": 200,
      "description": "Texas Total Security Company Logo"
    },
    "image": [
      `${BASE_URL}/logo.png`,
      `${BASE_URL}/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg`,
      `${BASE_URL}/imgi_12_Better-Picture-LOGO-on-Wall-at-Office2-scaled.jpg`,
      `${BASE_URL}/imgi_9_iStock-1253624795-Family-on-Couch-Home-Page-scaled.jpg`
    ],
    "description": COMPANY.description,
    "telephone": COMPANY.phoneTel,
    "email": COMPANY.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY.address.street,
      "addressLocality": COMPANY.address.city,
      "addressRegion": COMPANY.address.state,
      "postalCode": COMPANY.address.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": COMPANY.geo.lat,
      "longitude": COMPANY.geo.lng
    },
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": COMPANY.foundingLocation.city,
        "addressRegion": COMPANY.foundingLocation.state,
        "addressCountry": "US"
      }
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 15,
      "maxValue": 50,
      "value": 35
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": COMPANY.geo.lat,
        "longitude": COMPANY.geo.lng
      },
      "geoRadius": "60 miles",
      "areaServed": COMPANY.areaServed.map(city => ({
        "@type": "City",
        "name": `${city}, TX`,
        "addressRegion": "TX"
      }))
    },
    "serviceType": COMPANY.services,
    "knowsLanguage": ["English", "Spanish", "Vietnamese", "Chinese"],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "name": "Texas Department of Public Safety Security License",
      "identifier": COMPANY.license,
      "validIn": {
        "@type": "State",
        "name": "Texas"
      },
      "recognizedBy": {
        "@type": "GovernmentOrganization",
        "name": "Texas Department of Public Safety",
        "url": "https://www.dps.texas.gov/"
      }
    },
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Texas Security Association",
        "url": "https://www.texassecurity.org"
      },
      {
        "@type": "Organization",
        "name": "National Association of Security Dealers",
        "url": "https://www.nasda.com"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/texastotalsecurity",
      "https://www.linkedin.com/company/texastotalsecurity",
      "https://www.instagram.com/texastotalsecurity",
      "https://twitter.com/texastotalsecurity",
      "https://www.youtube.com/@texastotalsecurity",
      "https://maps.app.goo.gl/o4XYckgxB3B77AyW8",
      "https://www.bbb.org/us/tx/houston/profile/security-systems-monitors/texas-total-security-1305-169040915",
      "https://www.yelp.com/biz/texas-total-security-houston",
      "https://www.angi.com/companylist/us/tx/houston/texas-total-security-reviews"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": COMPANY.phoneTel,
        "contactType": "customer service",
        "availableLanguage": ["English", "Spanish", "Vietnamese"],
        "areaServed": "US",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": COMPANY.phoneTel,
        "contactType": "sales",
        "availableLanguage": ["English", "Spanish"],
        "areaServed": "US",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": COMPANY.phoneTel,
        "contactType": "technical support",
        "availableLanguage": ["English", "Spanish"],
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "telephone": COMPANY.phoneTel,
        "contactType": "emergency",
        "description": "24/7 Emergency Monitoring Center",
        "availableLanguage": ["English", "Spanish"],
        "areaServed": "US"
      }
    ],
    "potentialAction": [
      {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/free-analysis`,
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        },
        "result": {
          "@type": "Reservation",
          "name": "Free Security Analysis"
        }
      },
      {
        "@type": "ContactAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/contact`,
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        },
        "result": {
          "@type": "ContactPage",
          "name": "Contact Us"
        }
      }
    ]
  };
}

export function generateLocalBusinessSchema(city?: string) {
  const serviceOfferings = [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Alarm System Installation", "description": "Professional installation of hardwired, wireless, and hybrid alarm systems" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Security Camera Installation", "description": "HD and 4K surveillance camera systems with remote viewing" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Alarm Monitoring", "description": "Professional 24/7 monitoring with fast dispatch response" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Security Systems", "description": "Enterprise-grade security for businesses" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Security Systems", "description": "Whole-home protection with smart home integration" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HOA Security Solutions", "description": "Gate cameras, community surveillance, LPR systems" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Verification Monitoring", "description": "Double-verified video monitoring for alarm events" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "System Takeover", "description": "Take over existing systems from other providers" } },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Service & Maintenance", "description": "Ongoing system support and troubleshooting" } },
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SecurityService"],
    "@id": `${BASE_URL}/#localbusiness`,
    "name": COMPANY.name,
    "url": COMPANY.url,
    "logo": COMPANY.logo,
    "slogan": COMPANY.slogan,
    "foundingDate": COMPANY.foundingDate,
    "hasMap": "https://maps.app.goo.gl/o4XYckgxB3B77AyW8",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".page-description", ".eyebrow"]
    },
    "sameAs": [
      "https://maps.app.goo.gl/o4XYckgxB3B77AyW8",
      "https://www.facebook.com/texastotalsecurity",
      "https://www.linkedin.com/company/texastotalsecurity",
      "https://www.instagram.com/texastotalsecurity",
      "https://www.bbb.org/us/tx/houston/profile/security-systems-monitors",
      "https://www.yelp.com/biz/texas-total-security-houston"
    ],
    "image": [COMPANY.logo, `${BASE_URL}/og-image.jpg`],
    "description": city
      ? `${COMPANY.name} provides professional alarm systems, security cameras, and 24/7 local monitoring in ${city}, TX and surrounding areas. Locally owned and operated for 30+ years.`
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
      "longitude": COMPANY.geo.lng
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
    "openingHours": ["Mo-Fr 08:00-18:00", "Sa 08:00-14:00"],
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
      "name": "Texas DPS Alarm License",
      "identifier": COMPANY.license,
      "validIn": { "@type": "State", "name": "Texas" }
    },
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
    "description": `Learn about ${COMPANY.name} - Houston's locally owned and operated security experts. Family-owned, locally operated, with professional 24/7 monitoring.`,
    "mainEntity": {
      "@type": ["Organization", "LocalBusiness"],
      "name": COMPANY.name,
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

export function generateHowToSchema(title: string, description: string, steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "totalTime": "PT30M",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": `${BASE_URL}/${index + 1}`
    })),
    "provider": {
      "@type": "Organization",
      "name": COMPANY.name,
      "url": COMPANY.url
    }
  };
}

export function generateProductSchema(name: string, description: string, price?: string, availability?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": COMPANY.name
    },
    "offers": {
      "@type": "Offer",
      "price": price || "0",
      "priceCurrency": "USD",
      "availability": availability || "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": COMPANY.name
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "247",
      "bestRating": "5"
    }
  };
}

export function generateVideoSchema2(title: string, description: string, thumbnailUrl: string, uploadDate: string) {
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

export function generateVideoObjectSchema(title: string, description: string, videoUrl: string, thumbnailUrl: string, uploadDate: string, duration?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "uploadDate": uploadDate,
    "duration": duration || "PT2M",
    "thumbnailUrl": thumbnailUrl,
    "contentUrl": videoUrl,
    "embedUrl": videoUrl,
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

export function generateLocalSEOKeywords() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${COMPANY.name} - Houston Security Systems`,
    "description": COMPANY.description,
    "url": COMPANY.url,
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": COMPANY.name,
      "areaServed": COMPANY.areaServed.map(city => ({
        "@type": "City",
        "name": `${city}, TX`
      }))
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

/** ServicePage WebPage schema — use on every service page alongside generateServiceSchema */
export function generateServicePageSchema(
  name: string,
  description: string,
  url: string,
  breadcrumbs: BreadcrumbItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}${url}`,
    "name": name,
    "description": description,
    "url": `${BASE_URL}${url}`,
    "isPartOf": { "@type": "WebSite", "@id": `${BASE_URL}/#website`, "url": BASE_URL },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": `${BASE_URL}${item.href}`
      }))
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".page-description"]
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": COMPANY.name,
      "url": COMPANY.url
    },
    "potentialAction": {
      "@type": "RequestAQuote",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/free-analysis`,
        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
      },
      "result": { "@type": "Quote", "name": "Free Security Analysis" }
    }
  };
}

/** ItemList schema — use on Services, Industries, Portfolio listing pages */
export function generateItemListSchema(
  items: { name: string; description: string; url: string; position: number }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Security Services — Texas Total Security",
    "description": "Complete security system services for Houston homes and businesses",
    "numberOfItems": items.length,
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "description": item.description,
      "url": `${BASE_URL}${item.url}`
    }))
  };
}

/** AggregateOffer schema — use on free analysis / quote pages */
export function generateAggregateOfferSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    "name": "Professional Security System Installation — Houston TX",
    "description": "Custom security systems for homes and businesses. Alarm systems, cameras, and 24/7 monitoring.",
    "priceCurrency": "USD",
    "lowPrice": "0",
    "offerCount": "10",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": COMPANY.name
    },
    "areaServed": COMPANY.areaServed.map(c => ({ "@type": "City", "name": `${c}, TX` }))
  };
}

/** Enhanced service schema with offer details, used on every service page */
export function generateEnhancedServiceSchema(
  serviceName: string,
  serviceDesc: string,
  serviceUrl: string,
  serviceType: string,
  keywords: string[],
  faqs?: FAQItem[]
) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}${serviceUrl}/#service`,
    "name": serviceName,
    "alternateName": keywords.slice(0, 3),
    "description": serviceDesc,
    "url": `${BASE_URL}${serviceUrl}`,
    "serviceType": serviceType,
    "category": "Security Services",
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      "name": COMPANY.name,
      "telephone": COMPANY.phoneTel,
      "url": COMPANY.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Houston",
        "addressRegion": "TX",
        "addressCountry": "US"
      }
    },
    "areaServed": COMPANY.areaServed.map(c => ({ "@type": "City", "name": `${c}, TX` })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Options`,
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Onsite Analysis" }, "price": "0", "priceCurrency": "USD" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Professional Installation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Local Monitoring" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "System Takeover Available" } }
      ]
    },
    "potentialAction": {
      "@type": "RequestAQuote",
      "target": `${BASE_URL}/free-analysis`,
      "name": "Get Free Security Analysis"
    }
  };
  if (faqs && faqs.length > 0) {
    base["mainEntity"] = faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }));
  }
  return base;
}

/** SiteLinksSearchBox — only add once on the homepage */
export function generateSiteLinksSearchBoxSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": COMPANY.name,
    "description": COMPANY.description,
    "publisher": { "@type": "Organization", "@id": `${BASE_URL}/#organization` }
  };
}

/** Comprehensive Homepage Schema - combines all key schemas */
export function generateComprehensiveHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebSite
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": COMPANY.name,
        "description": COMPANY.description,
        "publisher": { "@type": "Organization", "@id": `${BASE_URL}/#organization` },
        "inLanguage": "en-US"
      },
      // 2. Organization (main entity)
      generateOrganizationSchema(),
      // 3. LocalBusiness (location-based)
      generateLocalBusinessSchema(),
      // 4. Service (main service offered)
      {
        "@context": "https://schema.org",
        "@type": ["Service", "SecurityService"],
        "@id": `${BASE_URL}/#mainService`,
        "name": "Security System Installation & Monitoring",
        "description": COMPANY.description,
        "provider": { "@type": "Organization", "@id": `${BASE_URL}/#organization` },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": { "@type": "GeoCoordinates", "latitude": COMPANY.geo.lat, "longitude": COMPANY.geo.lng },
          "geoRadius": "60 miles"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Security Services",
          "numberOfItems": 14,
          "itemListElement": COMPANY.services.map((service, i) => ({
            "@type": "Offer",
            "position": i + 1,
            "itemOffered": { "@type": "Service", "name": service }
          }))
        },
        "potentialAction": {
          "@type": "ReserveAction",
          "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/free-analysis` },
          "result": { "@type": "Reservation", "name": "Free Security Analysis" }
        }
      },
      // 5. FAQPage — expanded with all required questions
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you handle alarm system installation for older homes or buildings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We install wireless systems that require no new wiring, making them perfect for older homes and retrofits. Our licensed technicians work around existing walls, trim, and infrastructure with zero damage."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can you respond to service calls in the Houston area?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We typically respond to service calls within 24–48 hours in the Greater Houston area. Emergency monitoring response is immediate — our professional monitoring center contacts local authorities within seconds of a verified alarm."
            }
          },
          {
            "@type": "Question",
            "name": "Can I integrate my alarm systems with security cameras or smart devices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We install fully integrated systems combining alarms, HD cameras, smart locks, doorbell cameras, and home automation on a single platform. Control everything from one mobile app."
            }
          },
          {
            "@type": "Question",
            "name": "What makes your security systems different from national alarm companies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are locally owned and operated — not a franchise. We provide professional 24/7 monitoring and never sell your contract. You get a dedicated local team that knows your system and your neighborhood."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer security solutions for both residential and commercial properties?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We serve Houston homeowners, businesses, HOA communities, apartment complexes, and property managers. Every system is custom-designed for the specific property, regardless of size."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer security for HOA communities and multi-family properties?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — this is one of our core specialties. We provide gate cameras, LPR cameras, community-wide surveillance, alarm monitoring for multiple units, and HOA board-friendly reporting. We are trusted by property managers and HOA boards throughout Greater Houston."
            }
          },
          {
            "@type": "Question",
            "name": "How do I switch from my current alarm company to Texas Total Security?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Switching is simple. We evaluate your existing equipment during a free onsite visit. In most cases we take over your current keypads, sensors, and wiring — no replacements needed. Our technicians handle the full transition and activate local Houston monitoring in a single visit, typically within a few hours."
            }
          },
          {
            "@type": "Question",
            "name": "What areas do you serve around Houston?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `We serve all of Greater Houston and the surrounding area including ${COMPANY.areaServed.join(", ")}. Contact us to confirm service availability for your specific address.`
            }
          }
        ]
      }
    ]
  };
}

/**
 * Ten canonical Service schemas — one per core service offering.
 * Import and spread into the schemas[] array on each relevant page.
 */
export function generateAllServicesSchemas() {
  const provider = {
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    "name": COMPANY.name,
    "telephone": COMPANY.phoneTel,
    "email": COMPANY.email,
    "url": COMPANY.url,
    "hasCredential": `Texas DPS Alarm License ${COMPANY.license}`,
  };
  const areaServed = COMPANY.areaServed.map(c => ({ "@type": "City", "name": `${c}, TX` }));
  const freeOffer = { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free Onsite Security Analysis", "availability": "https://schema.org/InStock" };

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/residential/#service`,
      "name": "Residential Alarm System Installation – Houston TX",
      "serviceType": "Residential Security System Installation",
      "description": "Custom residential alarm system installation for Houston homeowners. Hardwired, wireless & hybrid systems, smart home integration, and 24/7 local monitoring. No long-term contracts.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [freeOffer, { "@type": "Offer", "name": "Professional Alarm Installation" }, { "@type": "Offer", "name": "24/7 Local Monitoring" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/commercial/#service`,
      "name": "Commercial Alarm System Installation – Houston TX",
      "serviceType": "Commercial Security System Installation",
      "description": "Enterprise-grade commercial alarm systems for Houston businesses, offices, retail, and industrial facilities. Licensed installation, local monitoring, and system takeovers from any provider.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [freeOffer, { "@type": "Offer", "name": "Commercial Alarm Installation" }, { "@type": "Offer", "name": "Multi-Site Management" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/security-cameras/#service`,
      "name": "Security Camera System Installation – Houston TX",
      "serviceType": "Security Camera Installation",
      "description": "Professional HD and 4K security camera installation for Houston homes, businesses, and communities. Indoor/outdoor cameras, license plate recognition (LPR), active deterrence, and remote viewing.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [freeOffer, { "@type": "Offer", "name": "4K IP Camera Installation" }, { "@type": "Offer", "name": "License Plate Recognition Systems" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/hoa-security/#service`,
      "name": "HOA Community Security Systems – Houston TX",
      "serviceType": "HOA Security System Installation",
      "description": "Complete HOA security solutions including gate cameras, LPR cameras, common area surveillance, and community-wide alarm monitoring. Designed for HOA boards and property managers in Greater Houston.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [freeOffer, { "@type": "Offer", "name": "Community Camera Systems" }, { "@type": "Offer", "name": "LPR Gate Camera Systems" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/property-management-security/#service`,
      "name": "Multi-Family Property Security – Houston TX",
      "serviceType": "Multi-Family Security System Installation",
      "description": "Comprehensive security for apartment complexes and multi-family communities. Entrance/exit cameras, LPR, common area monitoring, package area surveillance, and alarm monitoring for multiple units.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [freeOffer, { "@type": "Offer", "name": "Multi-Unit Alarm Monitoring" }, { "@type": "Offer", "name": "Community Surveillance Systems" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/monitoring-services/#service`,
      "name": "24/7 Alarm Monitoring – Houston TX",
      "serviceType": "Alarm Monitoring Service",
      "description": "Professional 24/7 alarm monitoring for Houston homes and businesses. Fast local dispatch, real-time notifications, and active deterrence support.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [{ "@type": "Offer", "name": "24/7 Local Monitoring", "priceCurrency": "USD" }, { "@type": "Offer", "name": "Video Verification Monitoring" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/monitoring-services/#active-deterrence`,
      "name": "Active Deterrence & Notification Systems – Houston TX",
      "serviceType": "Active Deterrence Security",
      "description": "Cameras with built-in sirens, strobes, and two-way audio for real-time intruder deterrence. Backed by 24/7 local monitoring with instant local dispatch response.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [freeOffer, { "@type": "Offer", "name": "Active Deterrence Camera Installation" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/alarm-systems/#service`,
      "name": "Alarm Company Switch Service – Houston TX",
      "serviceType": "Alarm System Takeover",
      "description": "Switch your alarm company to Texas Total Security with zero hassle. We take over your existing keypads, sensors, and wiring from any provider — ADT, Brinks, Vivint, and more. No long-term contracts. Done in one visit.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [freeOffer, { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free System Takeover Evaluation" }],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${BASE_URL}/free-analysis/#service`,
      "name": "Free Onsite Security Analysis – Houston TX",
      "serviceType": "Security Consultation",
      "description": "Free onsite security analysis for Houston homes, businesses, and communities. A licensed security specialist visits your property, evaluates existing equipment, identifies vulnerabilities, and delivers a custom proposal — no obligation.",
      "provider": provider,
      "areaServed": areaServed,
      "offers": [{ "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free Onsite Security Analysis", "availability": "https://schema.org/InStock" }],
    },
  ];
}

export { COMPANY, BASE_URL };
