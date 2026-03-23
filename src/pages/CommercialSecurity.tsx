import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
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
  "Office Buildings", "Retail Stores", "Restaurants", "Medical Facilities", "Schools & Daycare",
  "Industrial & Warehouse", "Apartment Complexes", "Construction Sites", "Parking Garages",
  "Hotels & Hospitality", "Places of Worship", "Government Buildings", "Airports & Marinas",
];

const CommercialSecurity = () => (
  <Layout>
    <PageHero
      title="Commercial Security Systems"
      subtitle="Enterprise-grade alarm, surveillance, and monitoring solutions designed for Houston businesses. Scalable, reliable, and custom-built for your operations."
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

    <CTABlock />
  </Layout>
);

export default CommercialSecurity;
