import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import FAQSection from "@/components/FAQSection";
import { getNeighborhood } from "@/lib/neighborhoodData";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import {
  Shield,
  Camera,
  Radio,
  Home,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Star,
  Phone,
} from "lucide-react";

const serviceLinks = [
  { label: "Alarm Systems", href: "/alarm-systems" },
  { label: "Security Cameras", href: "/security-cameras" },
  { label: "Residential Security", href: "/residential" },
  { label: "Commercial Security", href: "/commercial" },
  { label: "HOA Security", href: "/hoa-security" },
  { label: "Monitoring Services", href: "/monitoring-services" },
];

const serviceIcons = [Shield, Camera, Home, Building2, Users, Radio];

const NeighborhoodLanding = () => {
  const { neighborhoodSlug } = useParams<{ neighborhoodSlug: string }>();
  const neighborhood = neighborhoodSlug ? getNeighborhood(neighborhoodSlug) : undefined;

  if (!neighborhood) return <Navigate to="/service-areas" replace />;

  const breadcrumbs = [
    { name: "Service Areas", href: "/service-areas" },
    { name: `${neighborhood.name} Security Systems` },
  ];

  const schemas = [
    generateLocalBusinessSchema(neighborhood.name),
    generateServiceSchema(
      `Security Systems in ${neighborhood.name}`,
      `Professional alarm, camera, and monitoring services in ${neighborhood.fullName}.`,
      `/neighborhoods/${neighborhood.slug}`
    ),
    generateFAQSchema(neighborhood.faqs.map((f) => ({ question: f.question, answer: f.answer }))),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Service Areas", href: "/service-areas" },
      { name: `${neighborhood.name} Security Systems`, href: `/neighborhoods/${neighborhood.slug}` },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title={neighborhood.metaTitle}
        description={neighborhood.metaDescription}
        schemas={schemas}
      />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="section-dark py-16 sm:py-20 lg:py-24">
        <div className="container-tight px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              {neighborhood.fullName} &mdash; Zip {neighborhood.zipCode}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
            {neighborhood.headline}
          </h1>
          <p className="text-lg opacity-80 mb-8 max-w-3xl leading-relaxed">{neighborhood.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/free-analysis"
              className="btn-primary-gradient inline-flex items-center justify-center gap-2"
            >
              Free Property Analysis <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:7133879937"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              (713) 387-9937
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-accent/10 border-y border-accent/20 py-6">
        <div className="container-tight max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {neighborhood.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-accent">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Context */}
      <section className="section-padding">
        <div className="container-tight max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Why ${neighborhood.name} Properties Need Professional Security`}
            centered={false}
          />
          <p className="text-muted-foreground leading-relaxed mb-8 text-base">
            {neighborhood.securityContext}
          </p>

          {neighborhood.propertyTypes.length > 0 && (
            <>
              <h3 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
                Property Types We Serve in {neighborhood.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {neighborhood.propertyTypes.map((type) => (
                  <div key={type} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm text-foreground">{type}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-secondary">
        <div className="container-tight max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Security Services in ${neighborhood.name}`}
            subtitle="Every system is custom-designed for your specific property — not a packaged template."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {neighborhood.services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div key={service.title} className="card-base p-5 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding">
        <div className="container-tight max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Why ${neighborhood.name} Residents & Businesses Choose Texas Total Security`}
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {neighborhood.whyUs.map((item) => (
              <div key={item.title} className="card-base p-6 flex gap-4">
                <Star className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="section-padding bg-secondary" id="contact">
        <div className="container-tight max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Get a Free Security Assessment for Your ${neighborhood.name} Property`}
            subtitle="Tell us about your property and a local specialist will reach out within one business day."
            centered
          />
          <div className="mt-8">
            <LeadForm
              title={`Free Security Assessment — ${neighborhood.name}`}
              showServiceType
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={`${neighborhood.name} Security Systems — Frequently Asked Questions`}
        items={neighborhood.faqs}
      />

      {/* Internal links */}
      <section className="section-padding bg-secondary">
        <div className="container-tight max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-display font-bold text-foreground mb-6 text-center">
            Explore Our Services
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {link.label} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NeighborhoodLanding;
