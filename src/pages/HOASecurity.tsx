import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Camera, Eye, Zap, Shield, Smartphone, FileText, Users, MonitorSpeaker } from "lucide-react";

const solutions = [
  { icon: Camera, title: "Gate Camera Systems", desc: "High-definition cameras at every entry and exit point with night vision and weather-resistant housing." },
  { icon: Eye, title: "License Plate Recognition", desc: "LPR cameras that capture and log every vehicle entering and leaving your community." },
  { icon: Zap, title: "Active Deterrence", desc: "Cameras with built-in sirens and strobes that deter trespassers in real time." },
  { icon: Shield, title: "Common Area Surveillance", desc: "Pool areas, playgrounds, parking lots, and amenity centers covered with strategic placement." },
  { icon: Smartphone, title: "Remote Access", desc: "Board members and property managers can view footage from any device, anywhere." },
  { icon: FileText, title: "Incident Documentation", desc: "Easily retrieve and export footage for police reports, insurance claims, and board meetings." },
  { icon: Users, title: "Board Consultation", desc: "We work directly with HOA boards to design systems that fit community needs and budgets." },
  { icon: MonitorSpeaker, title: "Deterrence Lighting", desc: "Integrated lighting solutions that activate with motion or on schedule." },
];

const testimonials = [
  { name: "Lisa M.", role: "HOA Board President, Katy", text: "Since installing the gate camera system, we've seen a dramatic reduction in trespassing and vehicle break-ins. The board is thrilled with the quality and Texas Total Security's responsiveness." },
  { name: "Robert K.", role: "Property Manager, Sugar Land", text: "Managing multiple communities means I need reliable systems and a vendor I can count on. Texas Total Security delivers on both fronts." },
  { name: "Jennifer W.", role: "HOA Board Member, Cypress", text: "The LPR cameras have been a game-changer for our community. We can now track every vehicle and provide footage to law enforcement." },
];

const faqs = [
  { question: "How do you work with HOA boards?", answer: "We present to your board, provide detailed proposals with options at different price points, and handle all aspects of the installation." },
  { question: "Can we view footage remotely?", answer: "Yes. Authorized board members and property managers get secure remote access from any device." },
  { question: "Do you handle multi-entrance communities?", answer: "Absolutely. We design systems for communities of all sizes — from single-gate to large master-planned communities." },
  { question: "What about ongoing maintenance?", answer: "We offer maintenance plans that include regular system checks, camera cleaning, firmware updates, and priority support." },
  { question: "Can the system capture license plates at night?", answer: "Yes. Our LPR cameras use specialized IR illumination designed specifically for nighttime plate capture." },
];

const hoaSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "HOA Security Systems Houston TX",
    "Professional HOA and community security solutions in Houston, TX. Gate cameras, license plate recognition, common area surveillance, active deterrence & 24/7 monitoring for residential communities.",
    "/hoa-security",
    "HOA Security System Installation",
    ["HOA security Houston TX", "HOA cameras Houston", "gate cameras Houston", "license plate recognition HOA Houston", "community security cameras Houston"]
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
  ]),
];

const HOASecurity = () => (
  <Layout>
    <SEOHead
      title="HOA Security Systems Houston TX | Gate Cameras & Community Surveillance"
      description="HOA and community security solutions in Houston, TX. Gate cameras, license plate recognition, common area surveillance & active deterrence. Trusted by Houston HOAs since 1994. Call (713) 387-9937."
      schemas={hoaSchemas}
    />
    <PageHero
      title="HOA Security Solutions"
      subtitle="Gate cameras, license plate recognition, common area surveillance, and community-wide protection systems designed for Houston-area HOAs and property managers."
      ctaText="Schedule a Board Consultation"
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Community Security Systems" subtitle="Comprehensive surveillance and deterrence solutions designed specifically for homeowner associations." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading title="Trusted by Houston HOA Boards" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm title="Request an HOA Security Consultation" subtitle="Tell us about your community and we'll prepare a presentation for your board." />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default HOASecurity;
