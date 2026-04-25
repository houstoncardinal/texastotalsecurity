import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import CTABlock from "@/components/CTABlock";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { generateItemListSchema, generateComprehensiveHomepageSchema } from "@/lib/seo";
import {
  Shield, Camera, Building2, Users, Radio, Home,
  ArrowRight, Phone, CheckCircle2, Star,
  PhoneCall, ClipboardCheck, Wrench, HeadphonesIcon,
  Award, Lock, MapPin, Plus, Minus,
  ChevronLeft, ChevronRight, Briefcase,
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

/* ─── Hero slides ───────────────────────────────────────────── */
type HeroSlide = {
  eyebrow: string;
  headline: string[];
  sub: string;
  cta: { label: string; href: string };
  ctas?: { label: string; href: string }[];
  bg: string;
  overlay: string;
};

const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Houston Homeowners · Property Managers · HOA Boards",
    headline: ["Protecting Houston Homes,", "Communities & Properties."],
    sub: "Whether you're a homeowner looking for peace of mind or a property manager securing your portfolio — we build security that fits your life.",
    cta: { label: "Get a Free Assessment", href: "/free-analysis" },
    ctas: [
      { label: "Protect My Home", href: "/residential" },
      { label: "Protect My Property", href: "/commercial" },
    ],
    bg: "/residential/imgi_33_luxury-home-6886153_1280.jpg",
    overlay: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.50) 100%)",
  },
  {
    eyebrow: "Alarm Takeovers · No Long-Term Contracts",
    headline: ["Go Local.", "Better Service. No Contracts."],
    sub: "We take over your existing alarm from ADT, Brinks, Vivint, or any provider. Keep your hardware, lower your rate. Backed by 24/7 professional alarm monitoring.",
    cta: { label: "Switch My Alarm Today", href: "/alarm-systems" },
    bg: "/imgi_13_gd9131.jpg",
    overlay: "linear-gradient(135deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.74) 50%, rgba(0,0,0,0.54) 100%)",
  },
  {
    eyebrow: "4K IP Surveillance · License Plate Recognition",
    headline: ["See Everything.", "Miss Nothing."],
    sub: "Commercial-grade 4K cameras, LPR systems, and custom security poles for apartment complexes, HOAs, and businesses across Greater Houston.",
    cta: { label: "Design Your Camera System", href: "/security-cameras" },
    bg: "/imgi_10_com15.jpg",
    overlay: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.52) 100%)",
  },
  {
    eyebrow: "HOA Boards · Property Management · Communities",
    headline: ["Complete Gate &", "Community Protection."],
    sub: "License plate cameras, gate cameras, common area surveillance, and active deterrence — custom-engineered for HOA boards and property managers.",
    cta: { label: "Get a Free Property Assessment", href: "/hoa-security" },
    bg: "/imgi_14_upscale_gate_TTS.jpg",
    overlay: "linear-gradient(135deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.74) 50%, rgba(0,0,0,0.54) 100%)",
  },
  {
    eyebrow: "Professional 24/7 Alarm Monitoring",
    headline: ["Always Watching.", "Fast Response. Real Accountability."],
    sub: "Professional 24/7 monitoring with fast dispatch response. Active deterrence cameras with sirens, strobes & two-way audio — protecting Houston homes and businesses around the clock.",
    cta: { label: "Learn About Our Monitoring", href: "/monitoring-services" },
    bg: "/imgi_8_qtq80-BdoLjp-2048x1367.jpg",
    overlay: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.60) 100%)",
  },
];

/* ─── Data ──────────────────────────────────────────────────── */
const services = [
  { icon: Shield,    title: "Alarm Systems & Takeovers",       desc: "Switching from your current provider? We take over your existing equipment and provide professional 24/7 monitoring — no long-term contracts.",   href: "/alarm-systems" },
  { icon: Camera,    title: "Security Camera Systems",         desc: "4K IP cameras, LPR, security poles & active deterrence for apartment complexes, commercial properties, and HOA communities.",          href: "/security-cameras" },
  { icon: Building2, title: "Commercial & Industrial Security", desc: "Enterprise-grade security for offices, retail, warehouses, and multi-site operations — scalable to any portfolio size.",               href: "/commercial" },
  { icon: Users,     title: "Property Management Security",    desc: "Comprehensive surveillance solutions for multifamily communities, apartment complexes, and managed properties.",                       href: "/property-management-security" },
  { icon: Users,     title: "HOA & Community Security",        desc: "Gate cameras, license plate recognition, common area surveillance & neighborhood-wide security systems for HOA boards.",              href: "/hoa-security" },
  { icon: Radio,     title: "24/7 Monitoring & Active Deterrence", desc: "Professional 24/7 monitoring with fast dispatch response. Active deterrence cameras with sirens, strobes & two-way audio.",       href: "/monitoring-services" },
];

const processSteps = [
  { icon: PhoneCall,       num: "01", title: "Discovery Call",          desc: "Speak with a security specialist about your property portfolio, pain points, and security goals." },
  { icon: ClipboardCheck,  num: "02", title: "Free Property Assessment", desc: "We visit your property, evaluate existing equipment, map vulnerabilities, and design a tailored solution." },
  { icon: Wrench,          num: "03", title: "Professional Deployment",  desc: "Licensed technicians install your system with minimal disruption to tenants and business operations." },
  { icon: HeadphonesIcon,  num: "04", title: "Ongoing Monitoring & Support", desc: "24/7 professional monitoring, remote diagnostics, and a dedicated account manager for the life of your system." },
];

const whyUs = [
  { icon: MapPin,          title: "Houston-Born & Operated",     desc: "Locally owned and operated, serving Houston's commercial and residential communities. We know the neighborhoods, the crime patterns, and the infrastructure." },
  { icon: Shield,          title: "We Never Sell Your Contract",  desc: "Unlike national providers, your account stays with our local team — permanently. No buyouts, no surprises." },
  { icon: HeadphonesIcon,  title: "Professional 24/7 Monitoring",   desc: "Certified monitoring center staffed around the clock. When an alarm triggers, trained operators verify and dispatch local authorities within seconds." },
  { icon: Building2,       title: "Built for Property Managers",  desc: "We understand multi-site operations, tenant liability concerns, and HOA compliance — because property management security is what we do." },
  { icon: Award,           title: "Trusted by Decision Makers",   desc: "Property management companies, HOA boards, and business owners across Greater Houston rely on us for their security infrastructure." },
  { icon: Lock,            title: "Enterprise-Grade Technology",   desc: "Active deterrence, LPR cameras, custom security poles, and smart integrations — built for commercial-scale deployments." },
];

const testimonials = [
  { name: "Property Manager",   role: "Sugar Land, TX",   text: "They provided great coverage for our entrance and exit gates, plus active deterrence with strobe lights. Their license plate cameras are outstanding." },
  { name: "Business Owner",     role: "Houston, TX",       text: "Texas Total Security installed surveillance in all the right locations. I can travel while getting remote access to my cameras on my phone. Exactly what I needed." },
  { name: "HOA Board President", role: "Katy, TX",         text: "Our community needed a complete security overhaul. They handled everything — from the security poles to LPR cameras at every gate. Crime incidents dropped dramatically." },
];

const faqs = [
  { q: "How do property management companies switch alarm providers?", a: "Switching is straightforward. We evaluate your existing alarm equipment from any provider — and in most cases, take over your panels, sensors, and wiring without replacing them. Our local team handles the entire transition with zero downtime to your tenants and operations." },
  { q: "Do you handle security for apartment complexes and multifamily properties?", a: "Yes — this is one of our core specialties. We provide comprehensive security for apartment communities including entrance/exit gate cameras, LPR systems, common area surveillance, package area monitoring, mailbox cameras, and dumpster area deterrence systems." },
  { q: "What makes you different from national alarm companies?", a: "We are a locally owned Houston company — not a franchise. You get dedicated Houston technicians, professional 24/7 monitoring, and we never sell your contract. Property managers get a single point of contact for every property in their portfolio." },
  { q: "Can you install security poles with multiple cameras?", a: "Absolutely. We custom-fabricate security poles in heights from 10 to 25 feet, supporting 1–4 cameras per pole with integrated wiring, LED floodlights, IR illuminators, and active deterrence systems. Use our 3D configurator to design your exact setup." },
  { q: "Do you serve commercial and industrial properties?", a: "Yes. From single retail locations to multi-site corporate campuses, warehouses, and industrial facilities — every system is custom-designed for your property's layout, liability requirements, and operational needs." },
  { q: "Can you take over our existing alarm equipment?", a: "In most cases, yes. We evaluate your existing keypads, sensors, wiring, and panels during a free property assessment. If your equipment is compatible — such as Honeywell VISTA panels, DMP, or DSC systems — we integrate it into your new setup, saving significant replacement costs." },
  { q: "What does a free property assessment include?", a: "A certified security professional visits your property at no cost. We map every entry point, evaluate existing equipment, identify blind spots and vulnerabilities, and provide a detailed proposal with transparent pricing. Zero obligation, zero pressure — designed for decision makers who need clear ROI justification." },
  { q: "How long does a commercial security installation take?", a: "Commercial and HOA projects typically take 1–5 days depending on scope. Apartment complexes with multiple buildings may take 1–2 weeks. We schedule around your operations and coordinate with property management to minimize disruption to tenants." },
  { q: "Do you offer 24/7 monitoring with local dispatch?", a: "Yes. Our professional monitoring center is staffed 24/7. When an alarm triggers, trained operators verify the signal and dispatch local authorities immediately. Property managers receive real-time notifications and incident reports." },
  { q: "What areas in Houston do you serve?", a: "We serve Houston and premier surrounding communities including Sugar Land, Katy, The Woodlands, Cypress, Bellaire, Memorial, West University, and Richmond. Contact us to confirm service availability for your property portfolio." },
];


/* ─── Page ──────────────────────────────────────────────────── */
const Index = () => {
  useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Hero slider auto-advance — resets to 8s every time slide changes
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentSlide, isHeroPaused]);

  const schemas = [
    generateComprehensiveHomepageSchema(),
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

      <SEOHead
        title="Local Alarm Company Houston TX | Security Cameras & HOA Systems | Texas Total Security"
        description="Houston's trusted local security company. Alarm systems, security cameras, HOA & commercial security. Serving Houston & surrounding areas for 30+ years. Call (713) 387-9937."
        schemas={schemas}
      />

      {/* ══════════════════════════════════════════════════
          HERO — enterprise cinematic slider, 5 slides, 8s auto-advance
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "hsl(0 0% 4%)", display: "flex", flexDirection: "column" }}
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >

        {/* ── Background images — crossfade ── */}
        <AnimatePresence initial={false}>
          {heroSlides.map((slide, i) =>
            i === currentSlide ? (
              <motion.div
                key={`hero-bg-${i}`}
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                <img
                  src={slide.bg}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover"
                  style={{ transform: "scale(1.06)" }}
                />
                {/* Primary cinematic overlay */}
                <div className="absolute inset-0" style={{ background: slide.overlay }} />
                {/* Left vignette */}
                <div
                  className="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
                  style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
                />
                {/* Right vignette */}
                <div
                  className="absolute inset-y-0 right-0 w-2/5 pointer-events-none"
                  style={{ background: "linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
                />
                {/* Top red bloom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 35% at 50% 0%, hsl(0 85% 45% / 0.08), transparent 70%)" }}
                />
                {/* Bottom fade to section bg */}
                <div
                  className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
                  style={{ background: "linear-gradient(to top, hsl(0 0% 4%) 0%, transparent 100%)" }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            opacity: 0.016,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── Slide content ── */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-5xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-11 sm:py-14 text-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-content-${currentSlide}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: easeExpo }}
              >

                {/* ── Eyebrow — editorial horizontal rule style ── */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <motion.div
                    className="h-px"
                    style={{ width: "2.5rem", background: "linear-gradient(to right, transparent, hsl(0 85% 54%))" }}
                    initial={{ scaleX: 0, originX: 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: easeExpo }}
                  />
                  <motion.span
                    className="font-bold uppercase tracking-[0.22em] whitespace-nowrap overflow-hidden text-ellipsis max-w-[80vw]"
                    style={{ color: "hsl(0 75% 64%)", fontSize: "10px", letterSpacing: "0.22em" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    {heroSlides[currentSlide].eyebrow}
                  </motion.span>
                  <motion.div
                    className="h-px"
                    style={{ width: "2.5rem", background: "linear-gradient(to left, transparent, hsl(0 85% 54% / 0.4))" }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: easeExpo }}
                  />
                </div>

                {/* ── Headline — large, bold ── */}
                <h1
                  className="font-display font-bold text-white px-2 mx-auto"
                  style={{
                    fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                    marginBottom: "1.1rem",
                    maxWidth: "52rem",
                  }}
                >
                  <span className="block">{heroSlides[currentSlide].headline[0]}</span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 40%, hsl(0 90% 44%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {heroSlides[currentSlide].headline[1]}
                  </span>
                </h1>

                {/* ── Accent rule under headline ── */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, hsl(0 85% 50% / 0.5))" }} />
                  <div className="h-[2px] w-8 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                  <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, hsl(0 85% 50% / 0.5))" }} />
                </div>

                {/* ── Subtitle ── */}
                <p
                  className="mx-auto mb-5 text-white px-2 leading-relaxed"
                  style={{ fontSize: "clamp(0.94rem, 1.55vw, 1.08rem)", opacity: 0.76, maxWidth: "38rem" }}
                >
                  {heroSlides[currentSlide].sub}
                </p>

                {/* ── CTAs ── */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  {heroSlides[currentSlide].ctas ? (
                    heroSlides[currentSlide].ctas!.map((cta, idx) => (
                      <motion.div key={cta.href} whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.975 }}>
                        <Link
                          to={cta.href}
                          className={idx === 0 ? "btn-primary-gradient inline-flex items-center gap-2.5 font-semibold px-7 py-3.5" : "btn-outline-light inline-flex items-center gap-2.5 font-semibold px-7 py-3.5"}
                          style={idx === 0 ? { fontSize: "0.9rem", boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38), 0 2px 8px rgba(0,0,0,0.3)" } : { fontSize: "0.9rem" }}
                        >
                          {cta.label} <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <>
                      <motion.div whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.975 }}>
                        <Link
                          to={heroSlides[currentSlide].cta.href}
                          className="btn-primary-gradient inline-flex items-center gap-2.5 font-semibold px-7 py-3.5"
                          style={{ fontSize: "0.9rem", boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38), 0 2px 8px rgba(0,0,0,0.3)" }}
                        >
                          {heroSlides[currentSlide].cta.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <a
                          href="tel:7133879937"
                          className="btn-outline-light inline-flex items-center gap-2.5 font-semibold px-7 py-3.5"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <Phone className="w-4 h-4" /> (713) 387-9937
                        </a>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* ── Trust authority strip ── */}
                <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-1">
                  {[
                    { icon: Star,         label: "Top Rated" },
                    { icon: Shield,       label: "LIC# B03066901" },
                    { icon: CheckCircle2, label: "No Contracts" },
                    { icon: MapPin,       label: "Houston-Based" },
                  ].map(({ icon: Icon, label }, idx, arr) => (
                    <span key={label} className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.32)" }}>
                        <Icon className="w-3 h-3" style={{ color: "hsl(0 85% 52% / 0.65)" }} />
                        <span className="text-[10px] font-semibold tracking-[0.1em] uppercase">{label}</span>
                      </span>
                      {idx < arr.length - 1 && (
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
                      )}
                    </span>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* ── Slide navigation dots ── */}
            <div className="flex items-center justify-center gap-2.5 mt-7">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative overflow-hidden rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  style={{
                    width: i === currentSlide ? "2.25rem" : "0.4rem",
                    height: "0.4rem",
                    background: i === currentSlide ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)",
                  }}
                >
                  {i === currentSlide && !isHeroPaused && (
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: "hsl(0 85% 54%)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ── Prev / Next arrows ── */}
        {[
          { dir: "prev", icon: ChevronLeft,  pos: "left-4 sm:left-6",  fn: () => setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length) },
          { dir: "next", icon: ChevronRight, pos: "right-4 sm:right-6", fn: () => setCurrentSlide(p => (p + 1) % heroSlides.length) },
        ].map(({ dir, icon: Icon, pos, fn }) => (
          <button
            key={dir}
            onClick={fn}
            aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
            className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <Icon className="w-4 h-4 text-white/60" />
          </button>
        ))}

      </section>

      {/* ══════════════════════════════════════════════════
          TRUST STRIP — luxury dark marquee
      ══════════════════════════════════════════════════ */}
      <div
        className="marquee-outer overflow-hidden"
        style={{
          background: "hsl(0 0% 5%)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "11px 0",
        }}
      >
        {(() => {
          const items = [
            { label: "Switch Alarm Providers", accent: true  },
            { label: "Property Management Security",       accent: false },
            { label: "LIC# B03066901 · Licensed & Insured", accent: true  },
            { label: "HOA & Community Security",           accent: false },
            { label: "Custom Security Poles",              accent: false },
            { label: "License Plate Recognition",          accent: true  },
            { label: "Alarm.com Authorized Dealer",        accent: false },
            { label: "24/7 Professional Alarm Monitoring",            accent: true  },
            { label: "Honeywell · Resideo Systems",        accent: false },
            { label: "Locally Owned & Operated",           accent: false },
          ];
          const row = [...items, ...items];
          return (
            <div className="marquee-track">
              {row.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-5 px-5 select-none">
                  {item.accent ? (
                    <span className="inline-flex items-center gap-2">
                      <motion.span
                        className="w-[5px] h-[5px] rounded-full shrink-0"
                        style={{ background: "hsl(0 85% 52%)" }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                      />
                      <span
                        className="text-[10.5px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                        style={{ color: "rgba(255,255,255,0.88)" }}
                      >
                        {item.label}
                      </span>
                    </span>
                  ) : (
                    <span
                      className="text-[10.5px] font-medium uppercase tracking-[0.15em] whitespace-nowrap"
                      style={{ color: "rgba(255,255,255,0.32)" }}
                    >
                      {item.label}
                    </span>
                  )}
                  <span style={{ color: "rgba(255,255,255,0.08)", fontSize: "16px", lineHeight: 1 }} aria-hidden>╌</span>
                </span>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ══════════════════════════════════════════════════
          WHO WE SERVE — two-column split cards
      ══════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}
            >
              <Users className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
                Who We Serve
              </span>
            </div>
            <h2
              className="font-display font-bold text-gray-900 mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              Security Built for Your Life
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              From first-time homeowners to multi-property managers — we design systems tailored to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Homeowners card — light */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <Link to="/residential" className="group block h-full">
                <div className="relative h-full rounded-3xl p-8 bg-white border border-gray-200 hover:border-accent/30 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(0 85% 45% / 0.03) 0%, transparent 100%)" }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: "linear-gradient(135deg, hsl(0 85% 45% / 0.08) 0%, hsl(0 85% 45% / 0.04) 100%)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                    <Home className="w-7 h-7" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-xl mb-3 leading-tight group-hover:text-accent transition-colors duration-300">Homeowners</h3>
                  <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                    Your home is your family's sanctuary. Custom alarm and camera systems backed by 24/7 monitoring — with real people who answer the phone.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {["Custom alarm & smart home integration", "HD indoor & outdoor cameras", "No long-term contracts", "Local technicians — real people, real answers"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(0 85% 50%)" }} />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 font-semibold text-accent group-hover:gap-3 transition-all duration-300 text-sm">
                    Protect My Home <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, hsl(0 85% 45%), hsl(0 85% 55%))" }} />
                </div>
              </Link>
            </motion.div>

            {/* Business Owners card — medium dark */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}
            >
              <Link to="/commercial" className="group block h-full">
                <div className="relative h-full rounded-3xl p-8 overflow-hidden" style={{ background: "hsl(220 18% 11%)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(220 60% 50% / 0.10), transparent 65%)" }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative z-10" style={{ background: "hsl(220 60% 50% / 0.14)", border: "1px solid hsl(220 60% 50% / 0.22)" }}>
                    <Briefcase className="w-7 h-7" style={{ color: "hsl(220 70% 72%)" }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-3 leading-tight relative z-10">Business Owners</h3>
                  <p className="leading-relaxed mb-5 relative z-10 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    From single storefronts to multi-site operations — we design commercial security that protects your assets, employees, and bottom line.
                  </p>
                  <ul className="space-y-2 mb-6 relative z-10">
                    {["Commercial alarm systems & cameras", "Active deterrence systems", "24/7 professional monitoring", "Service & support — not just install"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(220 70% 68%)" }} />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300 relative z-10 text-sm" style={{ color: "hsl(220 70% 72%)" }}>
                    Protect My Business <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Property Managers & HOAs card — darkest */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo, delay: 0.16 }}
            >
              <Link to="/hoa-security" className="group block h-full">
                <div className="relative h-full rounded-3xl p-8 overflow-hidden" style={{ background: "hsl(0 0% 6%)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 20% 50%, hsl(0 85% 45% / 0.12), transparent 65%)" }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative z-10" style={{ background: "hsl(0 85% 45% / 0.15)", border: "1px solid hsl(0 85% 45% / 0.25)" }}>
                    <Building2 className="w-7 h-7" style={{ color: "hsl(0 85% 60%)" }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-3 leading-tight relative z-10">Property Managers, HOA Boards & Board Members</h3>
                  <p className="leading-relaxed mb-5 relative z-10 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Gate access, community cameras, centralized reporting, and a single point of contact for your entire portfolio — built for how you actually manage properties.
                  </p>
                  <ul className="space-y-2 mb-6 relative z-10">
                    {["Gate cameras & LPR systems", "Community-wide surveillance", "Multi-unit alarm monitoring", "HOA board-friendly reporting"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(0 85% 58%)" }} />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300 relative z-10 text-sm" style={{ color: "hsl(0 85% 62%)" }}>
                    Protect My Property <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SWITCH YOUR ALARM COMPANY — residential warm tone
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left — warm residential image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.85, ease: easeExpo }}
            className="relative min-h-[400px] lg:min-h-[580px]"
          >
            <img
              src="/residential/imgi_33_luxury-home-6886153_1280.jpg"
              alt="Houston family home protected by Texas Total Security alarm system"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, transparent 55%, white 100%)" }}
            />
            {/* Floating review badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: easeExpo, delay: 0.3 }}
              className="absolute bottom-8 left-8 rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                maxWidth: "240px",
              }}
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                ))}
              </div>
              <p className="text-[13px] font-semibold text-gray-900 leading-snug mb-1">
                "Switching was so easy. Done in one afternoon."
              </p>
              <p className="text-[11px] text-gray-500">Homeowner — Bellaire, TX</p>
            </motion.div>
          </motion.div>

          {/* Right — warm residential copy */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.85, ease: easeExpo }}
            className="flex flex-col justify-center p-8 sm:p-12 lg:p-14 xl:p-16"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 w-fit"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}
            >
              <Home className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(0 85% 45%)" }}>
                No Contracts · Local Service
              </span>
            </div>
            <div className="w-9 h-[3px] rounded-full mb-6" style={{ background: "hsl(var(--accent))" }} />
            <h2
              className="font-display font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em" }}
            >
              Tired of Your Current Alarm Company?{" "}
              <span style={{ color: "hsl(var(--accent))" }}>Switching Is Easier Than You Think.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-7 text-lg">
              If you're paying too much, getting poor service, or just can't reach a real person when something goes wrong — you don't have to stay stuck. Switching to a local Houston alarm company is faster and simpler than most homeowners expect.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { title: "We use your existing equipment", desc: "In most cases we take over your current keypads, sensors, and wiring — no ripping anything out." },
                { title: "Real people answer the phone", desc: "Our local team is based right here in Houston. No national call center, no tickets, no waiting." },
                { title: "No long-term contracts", desc: "Month-to-month service. You stay because you love it, not because you're locked in." },
                { title: "Done in a single visit", desc: "Most switches are completed in a few hours. We handle everything — you just enjoy better service." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 50%)" }} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm leading-snug mb-0.5">{item.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/alarm-systems"
                className="btn-primary-gradient inline-flex items-center gap-2 text-base px-8 py-4"
                style={{ boxShadow: "0 4px 20px hsl(0 85% 45% / 0.3)" }}
              >
                Switch My Alarm Today <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:7133879937" className="btn-outline-dark inline-flex items-center gap-2 text-base px-8 py-4">
                <Phone className="w-5 h-5" /> (713) 387-9937
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COMMERCIAL MULTI-FAMILY & HOA — professional dark
      ══════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden" style={{ background: "hsl(0 0% 4.5%)" }}>
        {/* Background decorations */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, hsl(0 85% 38% / 0.12), transparent 65%)" }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(to right, transparent 5%, hsl(0 85% 44% / 0.35) 40%, hsl(0 85% 44% / 0.35) 60%, transparent 95%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "hsl(0 85% 45% / 0.1)", border: "1px solid hsl(0 85% 45% / 0.2)" }}
            >
              <Building2 className="w-4 h-4" style={{ color: "hsl(0 85% 60%)" }} />
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 65%)" }}>
                Multi-Family & HOA Security
              </span>
            </div>
            <div className="w-8 h-[2px] rounded-full mx-auto mb-6" style={{ background: "hsl(var(--accent))" }} />
            <h2
              className="font-display font-bold text-white mb-5"
              style={{ fontSize: "clamp(1.875rem, 3.8vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
            >
              Securing Multi-Family Communities & HOA Properties Across Houston
            </h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              From gate cameras and license plate recognition to community-wide surveillance and alarm monitoring for every unit — we build security ecosystems that property managers and HOA boards can trust and report on.
            </p>
            <p className="text-sm font-semibold" style={{ color: "hsl(0 85% 62%)" }}>
              Trusted by Property Managers and HOA Boards throughout Greater Houston
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[
              {
                icon: Lock,
                title: "Gate Camera Systems",
                desc: "LPR and surveillance cameras covering gate entries with remote viewing, resident monitoring, and visitor documentation for gated communities.",
              },
              {
                icon: Camera,
                title: "Community Camera Systems",
                desc: "4K IP cameras covering entries, parking lots, common areas, and perimeter — with remote viewing for management.",
              },
              {
                icon: Shield,
                title: "Alarm Monitoring for Multiple Units",
                desc: "Centralized alarm monitoring across every building. Instant dispatch with incident reports delivered to your inbox.",
              },
              {
                icon: ClipboardCheck,
                title: "HOA Board-Friendly Reporting",
                desc: "Monthly security reports, incident logs, and system health summaries designed for board review and liability protection.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
                className="group rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "hsl(0 85% 45% / 0.12)", border: "1px solid hsl(0 85% 45% / 0.2)" }}
                >
                  <item.icon className="w-6 h-6" style={{ color: "hsl(0 85% 60%)" }} />
                </div>
                <h3 className="font-display font-semibold text-white text-[15px] mb-2.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-center"
          >
            <Link
              to="/free-analysis"
              className="btn-primary-gradient inline-flex items-center gap-2 text-base px-10 py-4"
              style={{ boxShadow: "0 6px 32px hsl(0 85% 44% / 0.40), 0 2px 8px rgba(0,0,0,0.4)" }}
            >
              Request a Property Assessment <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PRE-QUALIFICATION CTA — luxury split section
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(125deg, hsl(0 0% 5%) 0%, hsl(0 70% 8%) 55%, hsl(0 0% 5%) 100%)" }}
      >
        {/* Left red glow bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 100% at 2% 50%, hsl(0 85% 38% / 0.22), transparent 65%)" }}
        />
        {/* Right subtle bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 80% at 98% 50%, hsl(0 85% 30% / 0.10), transparent 65%)" }}
        />
        {/* Top/bottom hairlines */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent 5%, hsl(0 85% 44% / 0.35) 40%, hsl(0 85% 44% / 0.35) 60%, transparent 95%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(to right, transparent 5%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent 95%)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-9 sm:py-11">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

            {/* ── Left: headline copy ── */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 60%)" }}>
                  Pre-Qualification
                </span>
              </div>
              <h2
                className="font-display font-bold text-white mb-3"
                style={{ fontSize: "clamp(1.55rem, 3.2vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                See If Your Property<br className="hidden sm:block" /> Qualifies — 60 Seconds.
              </h2>
              <p
                className="leading-relaxed"
                style={{ fontSize: "clamp(0.85rem, 1.4vw, 0.97rem)", color: "rgba(255,255,255,0.52)", maxWidth: "30rem" }}
              >
                Answer 5 quick questions. We'll tell you exactly which security program fits your property, your budget, and your goals.
              </p>
            </div>

            {/* ── Vertical divider (desktop) ── */}
            <div
              className="hidden lg:block w-px self-stretch"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.10) 70%, transparent)" }}
            />

            {/* ── Right: qualifiers + CTA ── */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none">
              <ul className="space-y-2.5 mb-6">
                {[
                  "Property managers, HOA boards & commercial properties",
                  "Free onsite assessment included — no hidden costs",
                  "No long-term contracts · Local Houston team",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "hsl(0 85% 54%)" }}
                    />
                    <span className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.68)" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.025, y: -1 }}
                  whileTap={{ scale: 0.975 }}
                  className="w-full sm:w-auto lg:w-full xl:w-auto"
                >
                  <Link
                    to="/qualify"
                    className="btn-primary-gradient w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-bold px-8 py-3.5 whitespace-nowrap"
                    style={{
                      fontSize: "0.88rem",
                      letterSpacing: "0.01em",
                      boxShadow: "0 6px 32px hsl(0 85% 44% / 0.40), 0 2px 8px rgba(0,0,0,0.4)",
                    }}
                  >
                    Check If I Qualify — Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <a
                  href="tel:7133879937"
                  className="flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Or call (713) 387-9937
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES — Masterfully Redesigned
      ══════════════════════════════════════════════════ */}
      <section className="section-padding overflow-hidden" style={{ background: "hsl(0 0% 98%)" }}>
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
            <Link to="/alarm-systems">
              <img
                src="/keypads-collage.jpg"
                alt="Various Honeywell alarm keypads compatible with Texas Total Security systems — Houston TX"
                className="w-full max-w-[520px] h-auto object-contain mx-auto hover:opacity-90 transition-opacity duration-200"
                loading="lazy"
              />
            </Link>
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
              System Takeover · Service & Support
            </span>
            <div className="w-9 h-[3px] rounded-full mb-6" style={{ background: "hsl(var(--accent))" }} />
            <h2
              className="font-display font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontSize: "clamp(1.875rem, 3.2vw, 2.6rem)", letterSpacing: "-0.042em" }}
            >
              Do You Have a Hardwired System?{" "}
              <span style={{ color: "hsl(var(--accent))" }}>We'll Take It Over.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-lg">
              If you have an existing hardwired alarm system, we can take it over and monitor it — no full replacement needed. We also support wireless and hybrid systems from all major manufacturers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We don't just install and disappear. Our local team provides ongoing service, maintenance, and support so your system stays sharp year after year.
            </p>

            {/* Key Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Hardwired, wireless & hybrid systems all supported",
                "Compatible with Honeywell, DSC, DMP & more",
                "Ongoing service & maintenance — not just install",
                "Free onsite equipment evaluation — no obligation",
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
          <div className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-16 xl:px-20">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <span
                className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-4"
                style={{ color: "hsl(0 85% 58%)" }}
              >
                Why Choose Us
              </span>
              <h2
                className="font-display font-bold text-white mb-4"
                style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.045em" }}
              >
                Not a franchise.
                <br />
                <span style={{ color: "rgba(255,255,255,0.45)" }}>Your neighbors.</span>
              </h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                Over three decades protecting Houston homes, businesses, and communities. When you call, you reach real people who know your system. We provide professional 24/7 monitoring, never sell your contract, and stay with you long after the install.
              </p>
              <p className="text-[13px] font-medium mb-7" style={{ color: "rgba(255,255,255,0.28)" }}>
                We genuinely care about the people and properties we protect — and your neighbors can tell the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/about" className="btn-primary-gradient inline-flex items-center gap-2">
                  About Our Company <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:7133879937" className="btn-outline-light inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (713) 387-9937
                </a>
              </div>
            </motion.div>

            {/* Why-Us grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.07 }}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: "hsl(0 85% 45% / 0.11)", border: "1px solid hsl(0 85% 45% / 0.18)" }}
                  >
                    <item.icon className="w-[18px] h-[18px]" style={{ color: "hsl(0 85% 60%)" }} />
                  </div>
                  <h3 className="font-display font-semibold text-white text-[13px] mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.36)" }}>
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
