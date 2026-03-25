import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Building2, Camera, Shield, Lock, Wifi, Zap, Eye, Users } from "lucide-react";

const solutions = [
  { icon: Shield, title: "Commercial Alarm Systems", desc: "Intrusion detection, panic buttons, and 24/7 monitoring designed for business operations." },
  { icon: Camera, title: "Commercial Surveillance", desc: "Multi-camera systems with remote viewing, analytics, and high-retention recording." },
  { icon: Zap, title: "Active Deterrence", desc: "Cameras with sirens, strobes, and two-way talk that confront trespassers." },
  { icon: Lock, title: "Access Control", desc: "Manage who enters your facility with keycard, fob, and mobile credential systems." },
  { icon: Wifi, title: "Networking & Infrastructure", desc: "Structured cabling, enterprise WiFi, and network design for your technology." },
  { icon: Eye, title: "Video Monitoring", desc: "Live and recorded video verification for alarm events — reducing false dispatches." },
];

const industries = [
  "Small Businesses", "Apartment Complexes", "Condominium or Townhome Complexes",
  "Home Owners Associations (HOA)", "Industrial Complexes", "Government Buildings",
  "Hotels", "Daycares / Schools / Universities", "Hospital / Dental / Medical Facilities",
  "Retail Centers", "Parking Garages", "Valet Facilities", "Construction Sites",
  "Recycling Centers", "Places of Worship", "Restaurants", "Stadiums", "Airports", "Marinas",
];

const faqs = [
  { question: "What types of commercial properties do you serve?", answer: "We serve virtually every type — from small businesses and retail stores to industrial complexes, government buildings, hospitals, schools, hotels, construction sites, parking garages, places of worship, airports, marinas, and more." },
  { question: "Can you integrate surveillance with our existing alarm system?", answer: "Yes. We specialize in integrating security cameras, alarms, access control, and monitoring into a unified system." },
  { question: "Do you provide monitoring for commercial properties?", answer: "Absolutely. Our local Houston-based monitoring center provides 24/7 alarm and video monitoring, including video guard patrol." },
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
            <div key={s.title} className="glass-card p-7">
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading title="Industries We Serve" subtitle="We design security for every type of commercial operation." />
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
