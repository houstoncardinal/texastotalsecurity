import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Building2, Camera, Shield, Lock, Wifi, Zap, Eye, Users } from "lucide-react";

const solutions = [
  { icon: Shield, title: "Commercial Alarm Systems", desc: "Intrusion detection, panic buttons, and 24/7 monitoring designed for business operations and compliance." },
  { icon: Camera, title: "Commercial Surveillance", desc: "Multi-camera systems with remote viewing, analytics, and high-retention recording for loss prevention and liability." },
  { icon: Zap, title: "Active Deterrence", desc: "Cameras with sirens, strobes, and two-way talk that confront trespassers before damage occurs." },
  { icon: Lock, title: "Access Control", desc: "Manage who enters your facility and when with keycard, fob, and mobile credential systems." },
  { icon: Wifi, title: "Networking & Infrastructure", desc: "Structured cabling, enterprise WiFi, and network design to support your security and business technology." },
  { icon: Eye, title: "Video Monitoring", desc: "Live and recorded video verification for alarm events — reducing false dispatches and improving response." },
];

const industries = [
  "Small Businesses",
  "Apartment Complexes",
  "Condominium or Townhome Complexes",
  "Home Owners Associations (HOA)",
  "Industrial Complexes",
  "Government Buildings",
  "Hotels",
  "Daycares / Schools / Universities",
  "Hospital / Dental / Medical Facilities",
  "Retail Centers",
  "Parking Garages",
  "Valet Facilities",
  "Construction Sites",
  "Recycling Centers",
  "Places of Worship",
  "Restaurants",
  "Stadiums",
  "Airports",
  "Marinas",
];

const faqs = [
  { question: "What types of commercial properties do you serve?", answer: "We serve virtually every type of commercial property — from small businesses and retail stores to industrial complexes, government buildings, hospitals, schools, hotels, construction sites, parking garages, places of worship, airports, marinas, and more. Each system is custom-designed for the unique needs of your operation." },
  { question: "Can you integrate surveillance with our existing alarm system?", answer: "Yes. We specialize in integrating security cameras, alarms, access control, and monitoring into a unified system. If you already have equipment, we can often work with it and build around it." },
  { question: "Do you provide monitoring for commercial properties?", answer: "Absolutely. Our local Houston-based monitoring center provides 24/7 alarm and video monitoring. We also offer video guard patrol, where our monitoring station logs into your cameras at scheduled times to check on specific areas." },
];

const CommercialSecurity = () => (
  <Layout>
    <PageHero
      title="Commercial Security Systems in Houston, TX"
      subtitle="Contact Texas Total Security to discuss your commercial security project. Enterprise-grade alarm, surveillance, and monitoring solutions designed for Houston businesses."
      ctaText="Request a Commercial Consultation"
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Business Security Solutions" subtitle="Protect your assets, employees, and operations with systems designed for commercial environments." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-6">
              <s.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading title="Industries We Serve" subtitle="We design security for every type of commercial operation." />
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {industries.map((i) => (
            <span key={i} className="trust-badge">{i}</span>
          ))}
        </div>
        <div className="max-w-2xl mx-auto">
          <LeadForm title="Request a Commercial Security Consultation" subtitle="Describe your business and security needs." />
        </div>
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default CommercialSecurity;
