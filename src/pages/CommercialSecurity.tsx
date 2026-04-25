import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas } from "@/lib/seo";
import {
  Building2, Camera, Shield, Wifi, Zap,
  Eye, Users, CheckCircle2, ArrowRight, Phone,
} from "lucide-react";

const solutions = [
  {
    icon: Shield,
    title: "Commercial Alarm Systems",
    desc: "Intrusion detection, panic buttons, and 24/7 local monitoring designed for business operations of any scale.",
  },
  {
    icon: Camera,
    title: "Commercial Surveillance",
    desc: "Multi-camera systems with remote viewing, advanced analytics, and high-retention recording for your facility.",
  },
  {
    icon: Zap,
    title: "Active Deterrence",
    desc: "Cameras equipped with sirens, strobes, and two-way talk that actively confront and deter trespassers in real time.",
  },
  {
    icon: Wifi,
    title: "Networking & Infrastructure",
    desc: "Structured cabling, enterprise WiFi design, and network infrastructure to support your security and business technology.",
  },
  {
    icon: Eye,
    title: "Video Monitoring",
    desc: "Live and recorded video verification for alarm events — reducing false dispatches and improving response accuracy.",
  },
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

const whyUs = [
  { icon: Building2, title: "Houston's Local Experts", desc: "Deep commercial security experience across virtually every industry type in the greater Houston area — locally owned and operated." },
  { icon: Shield, title: "We Own Your Contract", desc: "We never sell your monitoring contract to a national company. Your account stays with our local team — always." },
  { icon: Eye, title: "Professional 24/7 Monitoring", desc: "Certified monitoring center staffed around the clock — fast signal verification and direct dispatch to local authorities." },
  { icon: CheckCircle2, title: "Custom-Engineered Systems", desc: "Every commercial system is designed specifically for your facility layout, risk profile, and operational needs." },
];

const faqs = [
  {
    question: "What types of commercial properties do you serve?",
    answer: "We serve virtually every type — from small businesses and retail stores to industrial complexes, government buildings, hospitals, schools, hotels, construction sites, parking garages, places of worship, airports, marinas, and more. If it's a commercial property in Houston, we've likely secured one like it.",
  },
  {
    question: "Can you integrate surveillance with our existing alarm system?",
    answer: "Yes. We specialize in integrating security cameras, alarms, and monitoring into a single unified system. In many cases we can take over and upgrade existing infrastructure to avoid unnecessary replacement costs.",
  },
  {
    question: "Do you provide 24/7 monitoring for commercial properties?",
    answer: "Absolutely. We provide professional 24/7 alarm and video monitoring, including video guard patrol services — where live operators actively review your cameras on a schedule.",
  },
  {
    question: "How does your commercial security consultation work?",
    answer: "We visit your facility, walk the property, identify vulnerabilities, and design a custom security proposal — at no charge and no obligation. You get a detailed system design and clear pricing before any commitment.",
  },
  {
    question: "Do you handle large multi-location or multi-building systems?",
    answer: "Yes. We design and manage enterprise-scale systems that cover multiple buildings, campuses, or locations from a centralized platform, giving management and security personnel a unified view.",
  },
];

const commercialSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Commercial Security Systems Houston TX",
    "Enterprise-grade security for Houston businesses. Commercial alarms, HD surveillance, active deterrence & 24/7 video monitoring. Scalable for any industry or business size.",
    "/commercial",
    "Commercial Security System Installation",
    ["commercial security systems Houston TX", "business alarm system Houston", "commercial surveillance Houston", "commercial CCTV Houston", "business security cameras Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Commercial Security", href: "/commercial" },
  ]),
  generateAllServicesSchemas()[1],
  generateFAQSchema(faqs),
];

const CommercialSecurity = () => (
  <Layout>
    <SEOHead
      title="Commercial Security Systems Houston TX | Business Alarms & Cameras | Texas Total Security"
      description="Custom commercial alarm systems, security cameras & active deterrence for Houston businesses. Licensed local experts. Call (713) 387-9937 for a free assessment."
      schemas={commercialSchemas}
    />

    {/* ── HERO ─────────────────────────────────────────── */}
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/commercial/imgi_6_com6-scaled.jpg"
          alt="Commercial security camera protecting Houston business district"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.40) 100%)" }}
        />
        {/* Red radial accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 50% at 15% 65%, hsl(0 85% 45% / 0.16), transparent 60%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Commercial Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.06] tracking-tight mb-6">
            Commercial Security Systems in{" "}
            <span style={{ color: "hsl(var(--accent))" }}>Houston, TX</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
            Contact Texas Total Security to discuss your commercial security project. Enterprise-grade alarm, surveillance, and monitoring solutions designed for Houston businesses of every size.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2">
              Request a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:7133879937" className="btn-outline-light text-sm">
              <Phone className="w-4 h-4" /> (713) 387-9937
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ── INTRO ─────────────────────────────────────────── */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
              Built for the Demands of Business
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Commercial security is fundamentally different from residential protection. Your business operates on a schedule, involves employees and customers, holds valuable assets, and faces threats that demand professional-grade solutions.
              </p>
              <p>
                Texas Total Security designs and installs security systems for Houston's commercial properties — from neighborhood small businesses to large industrial facilities and government buildings. We understand what your operation requires: reliable coverage, scalable infrastructure, and a monitoring partner you can trust.
              </p>
              <p>
                We handle everything — system design, professional installation, and ongoing local monitoring — under one roof, by one team that never sells your contract away.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { src: "/commercial/imgi_9_com3.jpg", alt: "Texas Total Security service van" },
              { src: "/commercial/imgi_33_com5.jpg", alt: "Active deterrence security camera installation" },
              { src: "/commercial/imgi_2_com10-scaled.jpg", alt: "Multi-camera commercial security pole" },
              { src: "/commercial/imgi_31_com7.jpg", alt: "Commercial building security cameras" },
            ].map((img, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-sm"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── SOLUTIONS GRID ───────────────────────────────── */}
    <section className="section-padding-sm" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading
          title="Commercial Security Solutions"
          subtitle="Protect your assets, employees, and operations with systems engineered for commercial environments."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-7 group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4 group-hover:bg-accent/14 transition-colors">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 text-[15px]">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── WHY CHOOSE US ────────────────────────────────── */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
              Building Long-Term Relationships Through Service, Installation &amp; Monitoring
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our business is built on one principle: earn trust through results. We don't rely on contracts and lock-ins — we rely on delivering security systems that genuinely work, backed by a local team that stands behind every installation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyUs.map((item) => (
                <div key={item.title} className="flex gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/15 transition-colors">
                    <item.icon className="w-4.5 h-4.5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
            <img
              src="/commercial/imgi_8_com4.jpg"
              alt="Professional commercial security camera installation"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    {/* ── INDUSTRIES ───────────────────────────────────── */}
    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading
          title="Industries We Serve"
          subtitle="We design and install security systems for virtually every type of commercial operation across Houston and the surrounding region."
        />
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {industries.map((industry) => (
            <span key={industry} className="trust-badge">{industry}</span>
          ))}
        </div>
      </div>
    </section>

    {/* ── PHOTO GALLERY ────────────────────────────────── */}
    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Commercial Installations Across Houston"
          subtitle="A sample of the systems our licensed technicians have designed and installed for Houston-area businesses."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "/commercial/imgi_11_com1.jpg", alt: "Commercial security camera on pole" },
            { src: "/commercial/imgi_36_com2.jpg", alt: "Apartment complex security installation" },
            { src: "/commercial/imgi_9_com3.jpg", alt: "Texas Total Security service vehicle" },
            { src: "/commercial/imgi_7_com5-scaled.jpg", alt: "Commercial surveillance system installation" },
            { src: "/commercial/imgi_4_com8-scaled.jpg", alt: "Business security camera setup" },
            { src: "/commercial/imgi_27_com11.jpg", alt: "Commercial property camera installation" },
          ].map((img, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-sm"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── LEAD FORM ────────────────────────────────────── */}
    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm
          title="Request a Commercial Security Consultation"
          subtitle="Describe your business and security needs — we'll design a custom solution at no charge."
        />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default CommercialSecurity;
