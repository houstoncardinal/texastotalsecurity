import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cities } from "@/lib/cityData";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";

const ServiceAreas = () => {
  const schemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Service Areas", href: "/service-areas" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Security Service Areas Houston TX | Local Alarm Company Near Me | Texas Total Security"
        description="Texas Total Security serves Houston, Katy, Sugar Land, The Woodlands, Cypress & surrounding areas. Local alarm company, HOA security cameras, security poles & 24/7 monitoring near you. Call (713) 387-9937."
        schemas={schemas}
      />
      <Breadcrumbs items={[{ name: "Service Areas" }]} />

      <section className="section-dark py-16 sm:py-20 lg:py-24">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Security Systems Across Houston & Surrounding Cities
          </h1>
          <p className="text-lg opacity-70">
            Texas Total Security proudly serves Houston and surrounding communities with custom alarm systems, security cameras, and 24/7 local monitoring. Local service, local monitoring, local expertise — wherever you are in the greater Houston area.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <SectionHeading
            title="Areas We Serve"
            subtitle="Click any city for detailed information about security services in your area."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}-security-systems`}
                className="glass-card p-6 flex gap-4 group"
              >
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {city.name} Security Systems
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {city.county} · Population {city.population}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                    View Services <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">Don't see your area? We likely serve your community too.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
              Contact Us to Confirm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTABlock title="Need Security in Your Area?" subtitle="Contact us to schedule a free onsite security analysis at your property." />
    </Layout>
  );
};

export default ServiceAreas;
