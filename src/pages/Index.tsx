import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import CTABlock from "@/components/CTABlock";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { generateLocalBusinessSchema, generateFAQSchema, generateOrganizationSchema, generateSiteLinksSearchBoxSchema, generateItemListSchema } from "@/lib/seo";
import {
  Shield, Camera, Home, Building2, Users, Radio,
  ArrowRight, Phone, CheckCircle2, Star,
  PhoneCall, ClipboardCheck, Wrench, HeadphonesIcon,
  Award, Lock, MapPin, Plus, Minus, AlertTriangle,
} from "lucide-react";

/* ─── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  show:    { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden:  { opacity: 0, x: -32 },
  show:    { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 32 },
  show:    { opacity: 1, x: 0 },
};

const easeExpo = [0.16, 1, 0.3, 1] as const;

const vp = { once: true, amount: 0.15 };

/* ─── Data ──────────────────────────────────────────────────── */
const services = [
  { icon: Shield,    title: "Alarm Systems & Takeovers",       desc: "Switching from ADT, Brinks, or Vivint? We take over your existing equipment and provide local monitoring — no long-term contracts.",   href: "/alarm-systems" },
  { icon: Camera,    title: "Security Camera Systems",         desc: "4K IP cameras, LPR, security poles & active deterrence for apartment complexes, commercial properties, and HOA communities.",          href: "/security-cameras" },
  { icon: Building2, title: "Commercial & Industrial Security", desc: "Enterprise-grade security for offices, retail, warehouses, and multi-site operations — scalable to any portfolio size.",               href: "/commercial" },
  { icon: Users,     title: "Property Management Security",    desc: "Comprehensive surveillance solutions for multifamily communities, apartment complexes, and managed properties.",                       href: "/property-management-security" },
  { icon: Users,     title: "HOA & Community Security",        desc: "Gate cameras, license plate recognition, common area surveillance & neighborhood-wide security systems for HOA boards.",              href: "/hoa-security" },
  { icon: Radio,     title: "24/7 Monitoring & Active Deterrence", desc: "In-house Houston monitoring center with local dispatch. Cameras with sirens, strobes & two-way audio — never outsourced.",       href: "/monitoring-services" },
];

const processSteps = [
  { icon: PhoneCall,       num: "01", title: "Discovery Call",          desc: "Speak with a security specialist about your property portfolio, pain points, and security goals." },
  { icon: ClipboardCheck,  num: "02", title: "Free Property Assessment", desc: "We visit your property, evaluate existing equipment, map vulnerabilities, and design a tailored solution." },
  { icon: Wrench,          num: "03", title: "Professional Deployment",  desc: "Licensed technicians install your system with minimal disruption to tenants and business operations." },
  { icon: HeadphonesIcon,  num: "04", title: "Ongoing Monitoring & Support", desc: "24/7 local monitoring, remote diagnostics, and a dedicated account manager for the life of your system." },
];

const whyUs = [
  { icon: MapPin,          title: "Houston-Born & Operated",     desc: "30+ years serving Houston's commercial and residential communities. We know the neighborhoods, the crime patterns, and the infrastructure." },
  { icon: Shield,          title: "We Never Sell Your Contract",  desc: "Unlike national providers, your account stays with our local team — permanently. No buyouts, no surprises." },
  { icon: HeadphonesIcon,  title: "In-House Local Monitoring",    desc: "Our monitoring center is in Houston — not a national call center. Local operators dispatch local authorities within seconds." },
  { icon: Building2,       title: "Built for Property Managers",  desc: "We understand multi-site operations, tenant liability concerns, and HOA compliance — because we've done it for 30+ years." },
  { icon: Award,           title: "Trusted by Decision Makers",   desc: "Property management companies, HOA boards, and business owners across Greater Houston rely on us for their security infrastructure." },
  { icon: Lock,            title: "Enterprise-Grade Technology",   desc: "Active deterrence, LPR cameras, custom security poles, and smart integrations — built for commercial-scale deployments." },
];

const testimonials = [
  { name: "Property Manager",   role: "Sugar Land, TX",   text: "They provided great coverage for our entrance and exit gates, plus active deterrence with strobe lights. Their license plate cameras are outstanding." },
  { name: "Business Owner",     role: "Houston, TX",       text: "Texas Total Security installed surveillance in all the right locations. I can travel while getting remote access to my cameras on my phone. Exactly what I needed." },
  { name: "HOA Board President", role: "Katy, TX",         text: "Our community needed a complete security overhaul. They handled everything — from the security poles to LPR cameras at every gate. Crime incidents dropped dramatically." },
];

const faqs = [
  { q: "How do property management companies switch alarm providers?", a: "Switching is straightforward. We evaluate your existing alarm equipment from ADT, Brinks, Vivint, or any other provider — and in most cases, take over your panels, sensors, and wiring without replacing them. Our local team handles the entire transition with zero downtime to your tenants and operations." },
  { q: "Do you handle security for apartment complexes and multifamily properties?", a: "Yes — this is one of our core specialties. We provide comprehensive security for apartment communities including entrance/exit gate cameras, LPR systems, common area surveillance, package area monitoring, mailbox cameras, and dumpster area deterrence systems." },
  { q: "What makes you different from national alarm companies?", a: "We are a locally owned Houston company — not a franchise. You get dedicated Houston technicians, an in-house monitoring center that never outsources, and we never sell your contract to a national company. Property managers get a single point of contact for every property in their portfolio." },
  { q: "Can you install security poles with multiple cameras?", a: "Absolutely. We custom-fabricate security poles in heights from 10 to 25 feet, supporting 1–4 cameras per pole with integrated wiring, LED floodlights, IR illuminators, and active deterrence systems. Use our 3D configurator to design your exact setup." },
  { q: "Do you serve commercial and industrial properties?", a: "Yes. From single retail locations to multi-site corporate campuses, warehouses, and industrial facilities — every system is custom-designed for your property's layout, liability requirements, and operational needs." },
  { q: "Can you take over our existing alarm equipment?", a: "In most cases, yes. We evaluate your existing keypads, sensors, wiring, and panels during a free property assessment. If your equipment is compatible — such as Honeywell VISTA panels, DMP, or DSC systems — we integrate it into your new setup, saving significant replacement costs." },
  { q: "What does a free property assessment include?", a: "A certified security professional visits your property at no cost. We map every entry point, evaluate existing equipment, identify blind spots and vulnerabilities, and provide a detailed proposal with transparent pricing. Zero obligation, zero pressure — designed for decision makers who need clear ROI justification." },
  { q: "How long does a commercial security installation take?", a: "Commercial and HOA projects typically take 1–5 days depending on scope. Apartment complexes with multiple buildings may take 1–2 weeks. We schedule around your operations and coordinate with property management to minimize disruption to tenants." },
  { q: "Do you offer 24/7 monitoring with local dispatch?", a: "Yes. Our monitoring center is based in Houston — not outsourced to a national call center. When an alarm triggers, local operators verify the signal and dispatch local authorities immediately. Property managers receive real-time notifications and incident reports." },
  { q: "What areas in Houston do you serve?", a: "We serve Houston and premier surrounding communities including Sugar Land, Katy, The Woodlands, Cypress, Bellaire, Memorial, West University, and Richmond. Contact us to confirm service availability for your property portfolio." },
];

/* ─── CountUp ───────────────────────────────────────────────── */
function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Page ──────────────────────────────────────────────────── */
const Index = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > window.innerHeight * 0.35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const schemas = [
    generateSiteLinksSearchBoxSchema(),
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
    generateItemListSchema([
      { name: "Alarm Systems", description: "Custom alarm design, installation & local monitoring", url: "/alarm-systems", position: 1 },
      { name: "Security Camera Systems", description: "HD surveillance, license plate cameras, PTZ & remote viewing", url: "/security-cameras", position: 2 },
      { name: "Residential Security", description: "Whole-home protection with smart integration & 24/7 monitoring", url: "/residential", position: 3 },
      { name: "Commercial Security", description: "Scalable security for offices, retail & industrial sites", url: "/commercial", position: 4 },
      { name: "HOA Security", description: "Gate cameras, license plate recognition & community surveillance", url: "/hoa-security", position: 5 },
      { name: "Active Deterrence & Monitoring", description: "Cameras with sirens, strobes & two-way talk, 24/7 local dispatch", url: "/monitoring-services", position: 6 },
    ]),
  ];

  return (
    <Layout>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* ── Floating Call CTA ── */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            className="floating-cta"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.45, ease: easeExpo }}
          >
            <motion.a
              href="tel:7133879937"
              className="flex items-center gap-3 px-5 py-3.5 rounded-full font-semibold text-white text-sm shadow-2xl"
              style={{
                background: "linear-gradient(135deg, hsl(0 85% 38%) 0%, hsl(0 85% 50%) 100%)",
                boxShadow: "0 8px 32px hsl(0 85% 45% / 0.45), 0 2px 8px rgba(0,0,0,0.3)",
              }}
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 40px hsl(0 85% 45% / 0.55), 0 4px 12px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-white/80"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <Phone className="w-4 h-4" />
              <span>(713) 387-9937</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <SEOHead
        title="Commercial Security Systems Houston | Property Management & HOA Security | Texas Total Security"
        description="Houston's trusted commercial security company for property managers, HOAs & businesses. Alarm takeovers, 4K cameras, security poles, LPR & 24/7 local monitoring. Switch from ADT today. Free assessment: (713) 387-9937."
        schemas={schemas}
      />

      {/* ══════════════════════════════════════════════════
          HERO — cinematic, full-height, ultra-scale type WITH VIDEO BACKGROUND
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "hsl(0 0% 3%)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* Primary video - security camera footage */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-security-camera-view-of-a-city-street-at-night-34556-large.mp4" type="video/mp4" />
          </video>
          
          {/* Fallback image if video fails */}
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt="Houston commercial security installation"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Layered overlays for depth - darker for video */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.80) 45%, rgba(0,0,0,0.65) 100%)" }}
          />
          
          {/* Animated gradient overlay for visual interest */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 30% 40%, hsl(0 85% 45% / 0.08), transparent 70%)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Upper center bloom */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-10%", left: "50%", transform: "translateX(-50%)",
              width: "1200px", height: "700px",
              background: "radial-gradient(ellipse at center, hsl(0 85% 45% / 0.06) 0%, transparent 65%)",
            }}
          />
          
          {/* Bottom fade to bg */}
          <div
            className="absolute bottom-0 inset-x-0 h-64 pointer-events-none"
            style={{ background: "linear-gradient(to top, hsl(0 0% 3%) 0%, transparent 100%)" }}
          />
        </div>

        {/* Fine grid texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            opacity: 0.018,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />


        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-28 lg:py-36 text-center">

            {/* Live badge with pulse animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeExpo }}
              className="inline-flex items-center gap-2.5 mb-10 px-4 sm:px-5 py-2.5 rounded-full border max-w-[95vw]"
              style={{
                background: "hsl(0 85% 45% / 0.12)",
                borderColor: "hsl(0 85% 45% / 0.28)",
                boxShadow: "0 0 30px hsl(0 85% 45% / 0.15)",
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: "hsl(0 85% 58%)" }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsl(0 85% 58% / 0.4)",
                    "0 0 0 6px hsl(0 85% 58% / 0)",
                    "0 0 0 0 hsl(0 85% 58% / 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span
                className="font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ 
                  color: "hsl(0 85% 68%)",
                  fontSize: "clamp(9px, 2.5vw, 11px)",
                }}
              >
                <span className="hidden sm:inline">Serving Property Managers · HOAs · Businesses · Houston, TX</span>
                <span className="sm:hidden">Houston's Trusted Security · Since 1994</span>
              </span>
            </motion.div>

            {/* Ultra-scale headline with gradient animation */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.1 }}
              className="font-display font-bold text-white px-4 max-w-6xl mx-auto"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 8rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                marginBottom: "1.75rem",
              }}
            >
              <span className="block">Stop Overpaying&nbsp;for</span>
              <motion.span
                className="block"
                style={{
                  background: "linear-gradient(135deg, hsl(0 80% 72%) 0%, hsl(0 85% 52%) 50%, hsl(0 90% 42%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% auto",
                }}
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Security That Doesn't&nbsp;Perform.
              </motion.span>
            </motion.h1>

            {/* Subtitle with typewriter effect */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeExpo, delay: 0.2 }}
              className="mx-auto mb-3 text-white px-4"
              style={{
                fontSize: "clamp(1.0625rem, 2vw, 1.35rem)",
                lineHeight: 1.65,
                opacity: 0.85,
                maxWidth: "38rem",
              }}
            >
              Switch your alarm company, upgrade your surveillance, or build a custom security system — designed for property managers, HOA boards, and business owners across Houston.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[12px] mb-12"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Houston · Katy · Sugar Land · The Woodlands · Cypress · Bellaire · Memorial
            </motion.p>

            {/* CTAs with enhanced hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easeExpo, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/qualify"
                  className="btn-primary-gradient inline-flex items-center gap-2 text-base px-12 py-4.5 shadow-lg shadow-red-900/25"
                  style={{
                    boxShadow: "0 4px 24px hsl(0 85% 45% / 0.3)",
                  }}
                >
                  <span className="relative">
                    <span className="relative z-10">Check If You Qualify — 60 Seconds</span>
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-white/20 blur-md"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="tel:7133879937"
                  className="btn-outline-light inline-flex items-center gap-2 text-base px-10 py-4"
                >
                  <Phone className="w-5 h-5" /> (713) 387-9937
                </a>
              </motion.div>
            </motion.div>

            {/* Quick scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
              >
                <motion.div
                  className="w-1 h-2 rounded-full"
                  style={{ background: "hsl(0 85% 60%)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          TRUST STRIP — infinite marquee
      ══════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 py-3.5 marquee-outer">
        {(() => {
          const items = [
            { label: "Switch From ADT / Vivint / Brinks",     highlight: true  },
            { label: "Property Management Solutions",          highlight: true  },
            { label: "Licensed & Insured · LIC# B03066901",   highlight: true  },
            { label: "HOA & Community Security",               highlight: true  },
            { label: "Custom Security Poles",                  highlight: false },
            { label: "License Plate Recognition",              highlight: false },
            { label: "Alarm.com",                              highlight: false },
            { label: "24/7 Local Monitoring Center",           highlight: false },
            { label: "Honeywell / Resideo",                    highlight: false },
            { label: "30+ Years in Houston",                   highlight: false },
          ];
          const row = [...items, ...items];
          return (
            <div className="marquee-track">
              {row.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-4 px-6">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap"
                    style={{ color: item.highlight ? "rgb(100 107 115)" : "rgb(163 170 178)" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-gray-200 select-none" aria-hidden>·</span>
                </span>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ══════════════════════════════════════════════════
          HOUSTON PROBLEM — alert banner
      ══════════════════════════════════════════════════ */}
      <Link
        to="/houston-we-have-a-problem"
        className="group flex items-center justify-between gap-4 px-5 py-3.5 hover:opacity-90 transition-opacity"
        style={{ background: "hsl(0 85% 38%)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <AlertTriangle className="w-4 h-4 text-white/80 shrink-0" />
          <span className="text-[12.5px] font-bold text-white tracking-wide truncate">
            Houston, We Have a Problem — See Why Property Crime is Rising & What You Can Do About It
          </span>
        </div>
        <span className="hidden sm:flex items-center gap-1 text-[12px] font-semibold text-white/80 shrink-0 group-hover:gap-2 transition-all">
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>

      {/* ══════════════════════════════════════════════════
          SERVICES — Masterfully Redesigned
      ══════════════════════════════════════════════════ */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "hsl(0 85% 45% / 0.06)",
                border: "1px solid hsl(0 85% 45% / 0.12)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={vp}
            >
              <Shield className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
                What We Do
              </span>
            </motion.div>
            
            <h2
              className="font-display font-bold text-gray-900 mb-6"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.045em" }}
            >
              Complete Security for Every Property Type
            </h2>
            
            <p className="text-gray-600 leading-relaxed text-lg max-w-2xl mx-auto">
              From alarm takeovers to custom security poles, enterprise surveillance, and 24/7 local monitoring — engineered for property managers, HOA boards, and business owners across Greater Houston.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, i) => (
              <motion.div
                key={service.href}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
              >
                <Link
                  to={service.href}
                  className="group block h-full"
                >
                  <div
                    className="relative h-full rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
                    style={{
                      background: "white",
                      border: "1px solid hsl(0 0% 92%)",
                    }}
                  >
                    {/* Hover gradient overlay */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg, hsl(0 85% 45% / 0.03) 0%, transparent 100%)",
                      }}
                    />
                    
                    {/* Number badge */}
                    <div className="absolute top-6 right-6">
                      <span
                        className="font-display font-bold text-[11px] tracking-[0.2em] tabular-nums"
                        style={{ color: "rgba(0,0,0,0.08)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: "linear-gradient(135deg, hsl(0 85% 45% / 0.08) 0%, hsl(0 85% 45% / 0.04) 100%)",
                          border: "1px solid hsl(0 85% 45% / 0.12)",
                        }}
                      >
                        <service.icon
                          className="w-7 h-7 transition-colors duration-300"
                          style={{ color: "hsl(0 85% 50%)" }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="font-display font-bold text-gray-900 text-xl mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[15px] mb-5">
                        {service.desc}
                      </p>
                      
                      {/* Arrow indicator */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{
                        background: "linear-gradient(90deg, hsl(0 85% 45%), hsl(0 85% 55%))",
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-gray-700 border-2 border-gray-200 hover:border-accent hover:text-accent hover:shadow-lg transition-all duration-300"
            >
              View All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EXISTING EQUIPMENT — system evaluation showcase
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left — keypad collage on clean white */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.85, ease: easeExpo }}
            className="relative flex items-center justify-center bg-white p-6 sm:p-10 lg:p-12 lg:border-r border-gray-100"
            style={{ minHeight: "420px" }}
          >
            <img
              src="/keypads-collage.png"
              alt="Various Honeywell alarm keypads compatible with Texas Total Security systems — Houston TX"
              className="w-full max-w-[520px] h-auto object-contain mx-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Right — content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.85, ease: easeExpo }}
            className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 xl:p-18"
          >
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4 block" style={{ color: "hsl(0 85% 50%)" }}>
              System Takeover
            </span>
            <div className="w-9 h-[3px] rounded-full mb-6" style={{ background: "hsl(var(--accent))" }} />
            <h2
              className="font-display font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontSize: "clamp(1.875rem, 3.2vw, 2.6rem)", letterSpacing: "-0.042em" }}
            >
              Already Have a Keypad Like This?{" "}
              <span style={{ color: "hsl(var(--accent))" }}>We'll Use It.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              Switching alarm companies doesn't mean replacing everything. We evaluate your existing equipment and reuse what works — saving you money while upgrading your protection.
            </p>

            {/* Key Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Keep your existing keypads, sensors & wiring",
                "Compatible with Honeywell, DSC, DMP & more",
                "Seamless transfer to local Houston monitoring",
                "Free onsite equipment evaluation",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 50%)" }} />
                  <span className="text-gray-700 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/free-analysis"
                className="btn-primary-gradient inline-flex items-center gap-2 text-base px-8 py-4"
                style={{ boxShadow: "0 4px 20px hsl(0 85% 45% / 0.3)" }}
              >
                Get Free Evaluation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:7133879937" className="btn-outline-dark inline-flex items-center gap-2 text-base px-8 py-4">
                <Phone className="w-5 h-5" /> (713) 387-9937
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE TTS — dark + photo split
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ background: "hsl(0 0% 4.5%)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Left — editorial content */}
          <div className="section-padding px-4 sm:px-6 lg:px-16 xl:px-20">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <span
                className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
                style={{ color: "hsl(0 85% 58%)" }}
              >
                Why Choose Us
              </span>
              <div className="w-8 h-[2px] rounded-full mb-7" style={{ background: "hsl(var(--accent))" }} />
              <h2
                className="font-display font-bold text-white mb-7"
                style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 1.0, letterSpacing: "-0.045em" }}
              >
                Not a franchise.
                <br />
                <span style={{ color: "rgba(255,255,255,0.45)" }}>Your neighbors.</span>
              </h2>
               <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.42)" }}>
                 We've been protecting Houston's commercial properties, apartment communities, and businesses for over three decades. When you call us, you reach real people who know your system — not a national call center routing tickets to strangers.
               </p>
               <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.42)" }}>
                 We never sell your contract to a national company. We never outsource your monitoring. Your account stays with the same local team that installed your system — giving property managers and business owners a single point of accountability.
               </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <Link to="/about" className="btn-primary-gradient inline-flex items-center gap-2">
                  About Our Company <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:7133879937" className="btn-outline-light inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (713) 387-9937
                </a>
              </div>
            </motion.div>

            {/* Why-Us grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.07 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "hsl(0 85% 45% / 0.11)", border: "1px solid hsl(0 85% 45% / 0.18)" }}
                  >
                    <item.icon className="w-[18px] h-[18px]" style={{ color: "hsl(0 85% 60%)" }} />
                  </div>
                  <h3 className="font-display font-semibold text-white text-[14px] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.36)" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — office photo */}
          <div className="relative min-h-[400px] lg:min-h-0 hidden lg:block">
            <img
              src="/imgi_12_Better-Picture-LOGO-on-Wall-at-Office2-scaled.jpg"
              alt="Texas Total Security office"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Overlay fade from left */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, hsl(0 0% 4.5%) 0%, hsl(0 0% 4.5% / 0.6) 40%, transparent 100%)",
              }}
            />
            {/* Overlay fade from bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, hsl(0 0% 4.5%) 0%, transparent 35%)",
              }}
            />

            {/* Floating trust card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: easeExpo, delay: 0.3 }}
              className="absolute bottom-10 right-8 rounded-2xl p-5"
              style={{
                background: "rgba(8,8,8,0.82)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                maxWidth: "220px",
              }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                ))}
              </div>
               <p className="text-[13px] font-semibold text-white leading-snug mb-2">
                 "Delivered on every promise."
               </p>
               <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                 Property Manager — Sugar Land, TX
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS — pull quote + supporting cards
      ══════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">

          {/* Google rating badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full border border-gray-100"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.055)" }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">5.0</span>
              <span className="text-xs text-gray-400 font-medium">on Google</span>
            </div>
            <a
              href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold hover:underline underline-offset-2"
              style={{ color: "hsl(var(--accent))" }}
            >
              Read all Google reviews →
            </a>
          </motion.div>

          {/* Featured pull quote */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo, delay: 0.1 }}
            className="rounded-3xl p-10 sm:p-14 mb-8 text-center mx-auto relative overflow-hidden"
            style={{ maxWidth: "58rem", background: "hsl(0 0% 4%)" }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, hsl(0 85% 45% / 0.09), transparent 65%)" }}
            />
            {/* Fine grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.018,
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            {/* Quote mark */}
            <div
              className="font-display font-bold leading-none select-none mb-5 relative z-10"
              style={{
                fontSize: "6rem",
                lineHeight: 0.75,
                background: "linear-gradient(135deg, hsl(0 85% 45% / 0.38) 0%, hsl(0 85% 45% / 0.12) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &ldquo;
            </div>
            <p
              className="font-display font-medium text-white relative z-10"
              style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", lineHeight: 1.5, letterSpacing: "-0.01em", marginBottom: "2rem" }}
            >
              What really stood out was how Texas Total Security described in such detail and confidence the process and exactly what I would be getting. They delivered on every promise.
            </p>
            <div className="flex items-center justify-center gap-3 relative z-10">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "hsl(0 85% 45% / 0.14)", color: "hsl(0 85% 62%)", border: "1px solid hsl(0 85% 45% / 0.2)" }}
              >
                H
              </div>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-white leading-none mb-1">Homeowner</p>
                <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.32)" }}>Bellaire, TX</p>
              </div>
              <div className="flex gap-0.5 ml-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Supporting testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: 0.1 + i * 0.09 }}
                className="bg-white rounded-2xl p-6 border border-gray-100/80"
                style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                  ))}
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "hsl(0 85% 45% / 0.08)", color: "hsl(var(--accent))" }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 leading-none mb-0.5">{t.name}</p>
                    <p className="text-[11px] text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.55, ease: easeExpo, delay: 0.2 }}
            className="text-center mt-10"
          >
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{ color: "hsl(var(--accent))" }}
            >
              View All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS — numbered steps with advanced animations
      ══════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden" style={{ background: "hsl(0 0% 5%)" }}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(0 85% 45% / 0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, hsl(0 85% 45% / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: "10%",
            right: "5%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, hsl(0 85% 45% / 0.06) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="container-tight px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "hsl(0 85% 45% / 0.1)",
                border: "1px solid hsl(0 85% 45% / 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(0 85% 58%)" }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 65%)" }}>
                How It Works
              </span>
            </motion.span>
            <div className="w-8 h-[2px] rounded-full mx-auto mb-6" style={{ background: "hsl(var(--accent))" }} />
            <h2
              className="font-display font-bold text-white mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              From First Call to 24/7 Protection
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Simple, transparent, and stress-free. Here's exactly what happens when you work with us.
            </p>
          </motion.div>

          {/* Steps with animated connectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.65, ease: easeExpo, delay: i * 0.12 }}
                className="relative group"
              >
                {/* Card */}
                <motion.div
                  className="relative rounded-2xl p-6 sm:p-7"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  whileHover={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.1)",
                    y: -4,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, hsl(0 85% 45% / 0.15), transparent 60%)",
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Step number */}
                  <div className="relative mb-5">
                    <div className="relative flex items-center gap-4">
                      <div className="relative">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background: "hsl(0 85% 45% / 0.15)",
                            border: "1px solid hsl(0 85% 45% / 0.25)",
                          }}
                        >
                          <span
                            className="font-display font-bold text-lg"
                            style={{
                              background: "linear-gradient(135deg, hsl(0 85% 65%) 0%, hsl(0 85% 45% 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {step.num}
                          </span>
                        </div>
                      </div>
                      
                      {/* Connector line */}
                      {i < processSteps.length - 1 && (
                        <div className="hidden lg:block flex-1 relative">
                          <motion.div
                            className="h-0.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.1)" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                          />
                          <motion.div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                            style={{ 
                              background: "hsl(0 85% 45% / 0.5)",
                              boxShadow: "0 0 10px hsl(0 85% 45% / 0.5)",
                            }}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            animate={{
                              boxShadow: [
                                "0 0 10px hsl(0 85% 45% / 0.5)",
                                "0 0 20px hsl(0 85% 45% / 0.8)",
                                "0 0 10px hsl(0 85% 45% / 0.5)",
                              ],
                            }}
                            transition={{
                              duration: 0.3,
                              delay: 0.8 + i * 0.15,
                              repeat: Infinity,
                              repeatDelay: 1 + i * 0.2,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Icon with animated border */}
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: "hsl(0 85% 45% / 0.08)",
                      border: "1px solid hsl(0 85% 45% / 0.12)",
                    }}
                    whileHover={{ 
                      background: "hsl(0 85% 45% / 0.15)",
                      borderColor: "hsl(0 85% 45% / 0.25)",
                      scale: 1.05,
                    }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: "hsl(0 85% 60%)" }} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-white mb-2.5 text-[15px] tracking-tight group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.36)" }}>
                    {step.desc}
                  </p>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, transparent 50%, hsl(0 85% 45% / 0.1) 100%)",
                      borderRadius: "0 1rem 0 100%",
                    }}
                    whileHover={{
                      background: "linear-gradient(135deg, transparent 50%, hsl(0 85% 45% / 0.2) 100%)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Mobile connector (vertical) */}
                {i < processSteps.length - 1 && (
                  <motion.div
                    className="lg:hidden absolute left-1/2 -bottom-3 w-0.5 h-6"
                    style={{ 
                      background: "linear-gradient(to bottom, hsl(0 85% 45% / 0.3), transparent)",
                    }}
                    initial={{ height: 0 }}
                    whileInView={{ height: 24 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link
              to="/free-analysis"
              className="btn-primary-gradient inline-flex items-center gap-2 text-base px-8 py-4"
            >
              Start Your Free Analysis <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FREE ANALYSIS — split CTA card
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.03), 0 20px 48px rgba(0,0,0,0.07)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — content */}
              <div className="p-8 sm:p-12 lg:p-14 lg:border-r border-gray-100">
                <div className="w-8 h-[2px] rounded-full mb-6" style={{ background: "hsl(var(--accent))" }} />
                <h2 className="font-display font-bold text-gray-900 tracking-tight leading-[1.07] mb-4"
                  style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", letterSpacing: "-0.04em" }}
                >
                  Free Onsite Security Analysis
                </h2>
                 <p className="text-gray-500 leading-relaxed mb-8 text-base">
                   Our security professionals visit your property at no cost. We evaluate your layout, assess existing equipment, identify every vulnerability, and provide a detailed proposal — designed for property managers and decision makers who need clear ROI justification.
                 </p>
                 <ul className="space-y-4">
                   {[
                     "Security specialist meets you onsite at your property",
                     "Evaluates existing alarm and camera equipment for reuse",
                     "Maps all entry points, common areas, and blind spots",
                     "Delivers a detailed proposal with transparent pricing",
                   ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right — CTA */}
              <div
                className="p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center"
                style={{ background: "hsl(0 0% 98.5%)" }}
              >
                <img
                  src="/logo.png"
                  alt="Texas Total Security"
                  className="w-16 h-16 object-contain mb-6"
                  style={{ opacity: 0.85 }}
                  loading="lazy"
                />
                <h3 className="font-display font-bold text-gray-900 text-2xl tracking-tight mb-3" style={{ letterSpacing: "-0.03em" }}>
                  Ready to Get Started?
                </h3>
                 <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">
                   Schedule your free property assessment today. A security specialist will contact you within 24 hours.
                 </p>
                <Link
                  to="/free-analysis"
                  className="btn-primary-gradient inline-flex items-center gap-2 text-base px-9 py-4 w-full sm:w-auto justify-center mb-3"
                >
                  Schedule Free Analysis <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-xs text-gray-400 mb-6">No obligation. No pressure. 100% free.</p>
                <div className="flex items-center gap-2 pt-6 border-t border-gray-100 w-full justify-center">
                  <Phone className="w-4 h-4" style={{ color: "hsl(var(--accent))" }} />
                  <span className="text-sm text-gray-500">Or call: </span>
                  <a
                    href="tel:7133879937"
                    className="text-sm font-bold hover:underline underline-offset-2"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    (713) 387-9937
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ — animated accordion
      ══════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="eyebrow">FAQ</span>
            <div className="w-8 h-[2px] rounded-full mx-auto mb-5" style={{ background: "hsl(var(--accent))" }} />
            <h2
              className="font-display font-bold text-gray-900 mb-4"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 leading-relaxed text-base">
              Everything you need to know about working with Texas Total Security.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.q}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-display font-semibold text-gray-900 text-[15px] leading-snug text-left">
                      {faq.q}
                    </h3>
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{
                        background: isOpen ? "hsl(var(--accent))" : "hsl(0 0% 93%)",
                      }}
                    >
                      {isOpen
                        ? <Minus className="w-3.5 h-3.5 text-white" />
                        : <Plus  className="w-3.5 h-3.5 text-gray-500" />
                      }
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
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7">
                          <p className="text-[14px] text-gray-500 leading-relaxed">{faq.a}</p>
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

      {/* Final CTA */}
      <CTABlock />
    </Layout>
  );
};

export default Index;
