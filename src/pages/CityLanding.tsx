import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import CTABlock from "@/components/CTABlock";
import InternalLinks from "@/components/InternalLinks";
import FAQSection from "@/components/FAQSection";
import { getCityBySlug } from "@/lib/cityData";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { Shield, Camera, Radio, Home, Building2, Users, CheckCircle2, MapPin, ArrowRight } from "lucide-react";

const serviceLinks = [
  { label: "Alarm Systems", href: "/alarm-systems" },
  { label: "Security Cameras", href: "/security-cameras" },
  { label: "Residential Security", href: "/residential-security" },
  { label: "Commercial Security", href: "/commercial-security" },
  { label: "HOA Security", href: "/hoa-security" },
  { label: "Monitoring Services", href: "/monitoring-services" },
];

const serviceIcons = [Shield, Camera, Home, Building2, Users, Radio];

const CityLanding = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? getCityBySlug(citySlug) : undefined;

  if (!city) return <Navigate to="/service-areas" replace />;

  const breadcrumbs = [
    { name: "Service Areas", href: "/service-areas" },
    { name: `${city.name} Security Systems` },
  ];

  const schemas = [
    generateLocalBusinessSchema(city.name),
    generateServiceSchema(
      `Security Systems in ${city.name}`,
      `Professional alarm, camera, and monitoring services in ${city.name}, TX.`,
      `/${city.slug}-security-systems`
    ),
    generateFAQSchema(city.faqs.map(f => ({ question: f.question, answer: f.answer }))),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Service Areas", href: "/service-areas" },
      { name: `${city.name} Security Systems`, href: `/${city.slug}-security-systems` },
    ]),
  ];

  return (
    <Layout>
      <SEOHead title={city.metaTitle} description={city.metaDescription} schemas={schemas} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="section-dark py-16 sm:py-20 lg:py-24">
        <div className="container-tight px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">{city.name}, {city.county}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Security Systems in {city.name}, TX
          </h1>
          <p className="text-lg opacity-80 mb-6 max-w-3xl leading-relaxed">{city.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center justify-center gap-2">
              Free Security Analysis in {city.name} <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:7133879937" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              Call (713) 387-9937
            </a>
          </div>
        </div>
      </section>

      {/* Security Context */}
      <section className="section-padding">
        <div className="container-tight max-w-4xl mx-auto">
          <SectionHeading title={`Why ${city.name} Properties Need Professional Security`} centered={false} />
          <p className="text-muted-foreground leading-relaxed mb-8">{city.securityContext}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {city.services.map(service => (
              <div key={service} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm font-medium text-foreground capitalize">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services in City */}
      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <SectionHeading
            title={`Security Services in ${city.name}`}
            subtitle={`Texas Total Security provides comprehensive security solutions throughout ${city.name} and ${city.county}.`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceLinks.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <Link key={s.href} to={s.href} className="glass-card p-6 group block">
                  <Icon className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-2">{s.label} in {city.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Professional {s.label.toLowerCase()} designed and installed for {city.name} properties by Houston's most trusted security company.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionHeading
            title={`Neighborhoods We Serve in ${city.name}`}
            subtitle={`Our technicians serve every corner of ${city.name} and surrounding communities.`}
          />
          <div className="flex flex-wrap justify-center gap-3">
            {city.neighborhoods.map(n => (
              <span key={n} className="trust-badge">
                <MapPin className="w-3.5 h-3.5" /> {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section-padding bg-secondary">
        <div className="container-tight max-w-3xl mx-auto">
          <SectionHeading title={`Why ${city.name} Trusts Texas Total Security`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Local Company, Not National", desc: `We're based in Houston — not a distant call center. When ${city.name} clients call, they reach a real person who knows the area.` },
              { title: "30+ Years of Experience", desc: "Three decades of designing and installing security systems across the greater Houston metropolitan area." },
              { title: "Custom-Designed Systems", desc: `Every ${city.name} property gets a security system designed for its specific layout, risks, and needs — no one-size-fits-all packages.` },
              { title: "24/7 Local Monitoring", desc: "Our monitoring center is in Houston. Local operators, faster response, direct dispatch to local authorities." },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={`Security System FAQ — ${city.name}, TX`}
        subtitle={`Common questions about security services in ${city.name}.`}
        items={city.faqs}
      />

      {/* Lead Form */}
      <section className="section-padding bg-secondary">
        <div className="container-tight max-w-2xl mx-auto">
          <LeadForm
            title={`Get a Free Security Analysis in ${city.name}`}
            subtitle={`Schedule a complimentary onsite security evaluation for your ${city.name} property. No obligation.`}
          />
        </div>
      </section>

      <InternalLinks title="Explore Our Security Services" links={serviceLinks} />
      <CTABlock title={`Protect Your ${city.name} Property Today`} subtitle={`Schedule a free onsite security analysis for your ${city.name} home or business. Expert recommendations, no obligation.`} />
    </Layout>
  );
};

export default CityLanding;
