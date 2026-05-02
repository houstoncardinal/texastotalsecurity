import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas } from "@/lib/seo";
import {
  Building2, Camera, Shield, Zap, Eye,
  CheckCircle2, ArrowRight, Phone, Lock, Plus, Minus
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const solutions = [
  { icon: Camera,    title: "4K Commercial Surveillance",    desc: "Multi-camera hardwired systems with 4K resolution, high-retention recording, and remote live viewing for your facility." },
  { icon: Shield,    title: "Commercial Alarm Systems",      desc: "Intrusion detection across every access point — doors, windows, and motion zones — with 24/7 professional monitoring and direct dispatch." },
  { icon: Zap,       title: "Active Deterrence",             desc: "Cameras equipped with sirens, strobe lights, and two-way audio that confront and stop trespassers in real time — before damage is done." },
  { icon: Lock,      title: "License Plate Recognition",     desc: "LPR cameras at entry and exit points capture every vehicle — essential for gated facilities, parking areas, and high-traffic commercial properties." },
  { icon: Eye,       title: "24/7 Alarm Monitoring",         desc: "Professional monitoring through our certified partner center — fast signal verification and direct dispatch communication with your team." },
  { icon: Building2, title: "Alarm Takeovers & Upgrades",    desc: "Already have a system? We take over existing commercial panels and sensors, saving replacement costs while improving your monitoring service." },
];

const pillars = [
  { num: "01", title: "On-Site System Design",   desc: "We visit your facility, walk every access point, and engineer a system around your specific layout, risk profile, and operational needs — no generic packages." },
  { num: "02", title: "24/7 Professional Monitoring", desc: "Your monitoring account is managed locally — dispatched through our certified partner center in San Antonio. Same team, same number, same accountability." },
  { num: "03", title: "Long-Term Partnership",   desc: "We maintain the relationship after installation day. When your system needs service or expansion, the team that installed it is the team that shows up." },
];

const industries = [
  "Small Businesses", "Apartment Complexes", "Condominium Complexes",
  "Home Owners Associations", "Industrial Facilities", "Government Buildings",
  "Hotels & Hospitality", "Daycares & Schools", "Medical & Dental Offices",
  "Retail Centers", "Parking Garages", "Valet Facilities",
  "Construction Sites", "Recycling Centers", "Places of Worship",
  "Restaurants", "Stadiums & Event Venues", "Marinas",
];

const faqs = [
  {
    question: "What types of commercial properties do you serve?",
    answer: "We serve virtually every type — from small businesses and retail to industrial complexes, apartment communities, government buildings, medical offices, schools, hotels, construction sites, parking garages, places of worship, and more. If it's a commercial property in Houston, we've secured one like it.",
  },
  {
    question: "Can you integrate cameras with our existing alarm system?",
    answer: "Yes. We specialize in combining surveillance and alarm systems into a single unified setup. In many cases we take over and upgrade existing infrastructure, saving the cost of full replacement.",
  },
  {
    question: "What is active deterrence and do I need it?",
    answer: "Active deterrence cameras respond to detected intrusions with audible sirens and strobe lights — warning or stopping trespassers before a crime occurs. We recommend them for after-hours properties, construction sites, parking areas, and any location where a visual alarm alone isn't enough.",
  },
  {
    question: "How does your commercial security consultation work?",
    answer: "We visit your facility, walk the property, identify vulnerabilities, and design a custom security proposal — at no charge and no obligation. You receive a detailed system design and clear pricing before any commitment.",
  },
  {
    question: "Do you handle multi-building or multi-location systems?",
    answer: "Yes. We design and manage systems across multiple buildings or locations, giving ownership and security personnel a centralized view of their entire portfolio.",
  },
  {
    question: "What if we already have a system from another provider?",
    answer: "We can often take over your existing panels and sensors and connect them to our monitoring platform — giving you improved service and local accountability without the cost of starting from scratch.",
  },
];

const commercialSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Commercial Security Systems Houston TX",
    "Enterprise-grade security for Houston businesses. Commercial alarms, 4K surveillance, active deterrence & 24/7 professional monitoring. Scalable for any industry.",
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

const CommercialSecurity = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
  <Layout>
    <SEOHead
      title="Commercial Security Systems Houston TX | Business Alarms & Cameras | Texas Total Security"
      description="Custom commercial alarm systems, 4K surveillance cameras & active deterrence for Houston businesses. Licensed local experts. Free on-site assessment. Call (713) 387-9937."
      schemas={commercialSchemas}
    />

    {/* ══ HERO — 2-column ══════════════════════════════════ */}
    <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
      <div className="absolute inset-0">
        <img
          src="/commercial/imgi_6_com6-scaled.jpg"
          alt="Commercial security camera system protecting Houston business"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.80) 52%, rgba(0,0,0,0.62) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 15% 65%, hsl(0 85% 44% / 0.13), transparent 65%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 w-full lg:py-20">

          {/* Left — copy */}
          <motion.div
            variants={fadeLeft} initial="hidden" animate="show"
            transition={{ duration: 0.8, ease: easeExpo }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 64%)" }}>Commercial Security · Houston, TX</span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Commercial Security Solutions<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Built for Houston Businesses.</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "30rem" }}>
              Custom-engineered cameras, alarms, and active deterrence — built for your operation, monitored 24/7 by a local team that knows your system.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "4K hardwired cameras — active deterrence stops threats in real time",
                "Commercial alarm system designed around your facility's risk profile",
                "24/7 professional monitoring — local team, local accountability",
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-[2px]" style={{ color: "hsl(0 85% 54%)" }} />
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/property-assessment"
                className="btn-primary-gradient inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5"
                style={{ boxShadow: "0 4px 24px hsl(0 85% 44% / 0.42)" }}
              >
                Request a Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3.5 rounded-xl transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "white" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                <Phone className="w-4 h-4" style={{ color: "hsl(0 85% 54%)" }} /> (713) 387-9937
              </a>
            </div>
          </motion.div>

          {/* Right — form panel */}
          <motion.div
            variants={fadeRight} initial="hidden" animate="show"
            transition={{ duration: 0.8, ease: easeExpo, delay: 0.15 }}
            className="flex items-center"
          >
            <div className="w-full rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,8,8,0.82)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
              }}>
              <div className="px-1 py-1">
                <LeadForm
                  title="Request a Free Commercial Assessment"
                  subtitle="Describe your facility — we'll design a custom system at no charge, no obligation."
                  showServiceType
                  defaultServiceType="commercial"
                  defaultPropertyType="commercial"
                  referringPage="/commercial"
                  compact
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

    {/* ══ SOLUTIONS GRID ═══════════════════════════════════ */}
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
                style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>What We Install</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                Commercial Security Solutions
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed sm:text-right sm:max-w-[18rem]">
              Every system is custom-engineered for your facility — not pulled from a catalog.
            </p>
          </div>
        </motion.div>

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {solutions.slice(0, 3).map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              className="group flex gap-4 p-5 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
              style={{ border: "1px solid hsl(0 0% 91%)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "hsl(0 85% 45% / 0.07)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <s.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900 mb-1 text-[14px] leading-tight group-hover:text-accent transition-colors duration-200">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Row 2 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {solutions.slice(3).map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: (i + 3) * 0.07 }}
              className="group flex gap-4 p-5 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
              style={{ border: "1px solid hsl(0 0% 91%)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "hsl(0 85% 45% / 0.07)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <s.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900 mb-1 text-[14px] leading-tight group-hover:text-accent transition-colors duration-200">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ THREE PILLARS — dark ══════════════════════════════ */}
    <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="shrink-0 mt-0.5">
                <span className="font-display font-bold text-[11px] tracking-[0.14em]"
                  style={{ color: "hsl(0 85% 50%)" }}>
                  {p.num}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: "15px" }}>{p.title}</h3>
                <p className="leading-relaxed" style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.52)" }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ INDUSTRIES + IMAGE ════════════════════════════════ */}
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
              <Building2 className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>Industries We Serve</span>
            </div>
            <h2 className="font-display font-bold text-gray-900 mb-3 leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
              We Secure Every Type of Commercial Property
            </h2>
            <p className="text-gray-500 leading-relaxed mb-7 text-sm">
              From neighborhood small businesses to large industrial facilities — if it's a commercial property in Houston, we've built a security system for one like it.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {industries.map((ind) => (
                <span key={ind}
                  className="text-[12px] font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "hsl(0 0% 96%)", border: "1px solid hsl(0 0% 90%)", color: "hsl(0 0% 28%)" }}>
                  {ind}
                </span>
              ))}
            </div>
            <Link to="/free-analysis?service=commercial&property=commercial"
              className="btn-primary-gradient inline-flex items-center gap-2 text-sm font-semibold">
              Request a Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeRight} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src="/commercial/imgi_62_com13.png"
              alt="Professional commercial security camera installation in Houston"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 48%)" }} />
            <div className="absolute bottom-5 left-5 right-5 px-4 py-3 rounded-xl"
              style={{ background: "rgba(6,6,6,0.84)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <p className="font-bold text-white text-sm leading-tight">Engineered. Installed. Professionally Monitored.</p>
              <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.5)", marginTop: "3px" }}>One team handles your design, installation, and ongoing support.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ GALLERY ══════════════════════════════════════════ */}
    <section style={{ background: "hsl(0 0% 97%)" }} className="py-12 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.65, ease: easeExpo }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
        >
          <div>
            <h2 className="font-display font-bold text-gray-900 leading-tight"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", letterSpacing: "-0.03em" }}>
              Commercial Installations Across Houston
            </h2>
            <p className="text-gray-500 text-sm mt-1">A sample of systems our licensed technicians have designed and installed.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { src: "/commercial/imgi_10_com2.jpg",        alt: "Commercial security camera installation at Houston business" },
            { src: "/commercial/imgi_22_com16.png",       alt: "Multi-camera commercial security system on Houston facility" },
            { src: "/commercial/imgi_23_com15.jpg",       alt: "Active deterrence camera system at commercial property" },
            { src: "/commercial/imgi_2_com10-scaled.jpg", alt: "Multi-camera security pole on commercial property" },
            { src: "/commercial/imgi_50_com25.png",       alt: "Hardwired surveillance system installed by Texas Total Security" },
            { src: "/commercial/imgi_58_com17.png",       alt: "Houston commercial property camera installation" },
            { src: "/commercial/imgi_62_com13.png",       alt: "Commercial camera system on business exterior" },
            { src: "/commercial/imgi_6_com6-scaled.jpg",  alt: "Security camera installation at Houston commercial facility" },
            { src: "/commercial/imgi_74_fmf-1252.jpg",    alt: "Hardwired commercial camera system Houston" },
            { src: "/commercial/imgi_75_qtq80-zVtNuU.jpg",alt: "Multi-camera installation at commercial property" },
          ].map((img, i) => (
            <motion.div
              key={img.src}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ FAQ — inline accordion ════════════════════════════ */}
    <section className="py-12 sm:py-16" style={{ background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 92%)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.6, ease: easeExpo }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>FAQ</span>
            </div>
            <h2 className="font-display font-bold text-gray-900"
              style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
            Answers to the most common questions from Houston business owners and facility managers.
          </p>
        </motion.div>

        <div className="space-y-2">
          {[
            {
              q: "What types of commercial properties do you serve?",
              a: (
                <span>
                  We serve virtually every type — from small businesses and retail to industrial complexes, apartment communities, government buildings, medical offices, schools, hotels, construction sites, parking garages, places of worship, and more. If it's a commercial property in Houston, we've secured one like it. Visit our{" "}
                  <Link to="/industries" className="text-red-600 font-semibold hover:underline">Industries We Serve</Link>{" "}
                  page for a full breakdown by sector.
                </span>
              ),
            },
            {
              q: "Can you integrate cameras with our existing alarm system?",
              a: (
                <span>
                  Yes. We specialize in combining surveillance and alarm systems into a single unified setup. In many cases we take over and upgrade existing infrastructure, saving the cost of full replacement. We assess your existing equipment during the{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free site assessment</Link>{" "}
                  and design the most cost-effective path forward.
                </span>
              ),
            },
            {
              q: "What is active deterrence and do I need it?",
              a: (
                <span>
                  Active deterrence cameras respond to detected intrusions with audible sirens and strobe lights — warning or stopping trespassers before a crime occurs. We recommend them for after-hours properties, construction sites, parking areas, and any location where a visual alarm alone isn't enough. Learn more about our{" "}
                  <Link to="/security-cameras" className="text-red-600 font-semibold hover:underline">commercial camera systems</Link>{" "}
                  or call us at{" "}
                  <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                  to discuss your property's specific needs.
                </span>
              ),
            },
            {
              q: "How does your commercial security consultation work?",
              a: (
                <span>
                  We visit your facility, walk the property with you, identify vulnerabilities, and design a custom security proposal — at no charge and no obligation. You receive a detailed system design and clear pricing before any commitment.{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule your free assessment</Link>{" "}
                  to get started.
                </span>
              ),
            },
            {
              q: "Do you handle multi-building or multi-location systems?",
              a: (
                <span>
                  Yes. We design and manage systems across multiple buildings or locations, giving ownership and security personnel a centralized view of their entire portfolio. Whether it's a campus facility, a multi-building industrial complex, or multiple retail locations — one local team manages everything. Contact us at{" "}
                  <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                  to discuss your multi-location requirements.
                </span>
              ),
            },
            {
              q: "What if we already have a system from another provider?",
              a: (
                <span>
                  We can often take over your existing panels and sensors and connect them to our monitoring platform — giving you improved service and local accountability without the cost of starting from scratch. Visit our{" "}
                  <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">alarm takeover page</Link>{" "}
                  to learn more about switching, or{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">schedule an assessment</Link>{" "}
                  and we'll evaluate your existing equipment at no charge.
                </span>
              ),
            },
          ].map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <motion.div
                key={faq.q}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.06 }}
                className={`faq-item ${isOpen ? "open" : ""}`}
              >
                <button
                  className="faq-trigger"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <h3 className="font-display font-semibold text-gray-900 text-[15px] leading-snug text-left">{faq.q}</h3>
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{ background: isOpen ? "hsl(0 85% 50%)" : "hsl(0 0% 93%)" }}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-gray-500" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 sm:px-6 pb-5">
                        <p className="text-[13.5px] text-gray-500 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <CTABlock />
  </Layout>
  );
};

export default CommercialSecurity;
