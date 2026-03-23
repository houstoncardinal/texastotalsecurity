import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const areas = [
  { name: "Houston", desc: "Comprehensive security services across the Houston metro — from downtown to the suburbs." },
  { name: "Bellaire", desc: "Premium home and business security for the Bellaire community." },
  { name: "Sugar Land", desc: "Residential and commercial security solutions throughout Sugar Land." },
  { name: "Katy", desc: "Alarm, camera, and HOA security systems for Katy neighborhoods and businesses." },
  { name: "Missouri City", desc: "Custom security design and installation for Missouri City properties." },
  { name: "Pearland", desc: "Complete security coverage for homes and businesses in Pearland." },
  { name: "The Woodlands", desc: "Expert security services for The Woodlands communities and commercial centers." },
  { name: "Cypress", desc: "Local security installation and monitoring for Cypress-area properties." },
  { name: "Pasadena", desc: "Industrial, commercial, and residential security in Pasadena." },
  { name: "League City", desc: "Alarm and surveillance solutions for League City homes and businesses." },
  { name: "Richmond", desc: "Security system design and service for Richmond and Fort Bend County." },
  { name: "Rosenberg", desc: "Comprehensive protection for Rosenberg residential and commercial properties." },
];

const ServiceAreas = () => (
  <Layout>
    <PageHero
      title="Service Areas"
      subtitle="Texas Total Security proudly serves Houston and surrounding communities. Local service, local monitoring, local expertise — wherever you are in the greater Houston area."
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Areas We Serve" subtitle="We provide security system installation, monitoring, and service across the greater Houston metropolitan area." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div key={area.name} className="glass-card p-6 flex gap-4">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{area.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
              </div>
            </div>
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

export default ServiceAreas;
