import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";

const ServiceAreaMap = lazy(() => import("@/components/ServiceAreaMap"));
import { generateItemListSchema, generateComprehensiveHomepageSchema } from "@/lib/seo";
import {
  Shield, Building2, Radio, Home,
  ArrowRight, Phone, CheckCircle2, Star,
  PhoneCall,
  Award, MapPin, Plus, Minus,
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
  ctas?: { label: string; href: string; external?: boolean }[];
  bg: string;
  overlay: string;
};

const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Homeowners · Property Managers · HOA Communities",
    headline: [
      "Custom Surveillance & Alarm Systems",
      "for Every Houston Property.",
    ],
    sub: "Hardwired 4K cameras, license plate recognition, and 24/7 professional monitoring. Whether you're a homeowner or a property manager, you get a custom-engineered system and the accountability of a local owner-operated team.",
    cta: { label: "Request a Free Quote", href: "/property-assessment" },
    ctas: [
      { label: "Request a Free Quote", href: "/property-assessment" },
      { label: "Speak with the Owner", href: "tel:7133879937", external: true },
    ],
    bg: "/imgi_14_upscale_gate_TTS.jpg",
    overlay: "linear-gradient(135deg, rgba(0,0,0,0.91) 0%, rgba(0,0,0,0.76) 50%, rgba(0,0,0,0.56) 100%)",
  },
  {
    eyebrow: "Alarm Takeover · Any Provider · Hardwired System Specialists",
    headline: [
      "Still Overpaying a National Company?",
      "Switch to Local. Keep Your Equipment.",
    ],
    sub: "Your existing sensors, wiring, and panels stay exactly as-is. Our certified Houston team takes over monitoring — over Verizon cellular — for less than you pay now.",
    cta: { label: "See How Easy It Is to Switch", href: "/switch-my-alarm" },
    bg: "/imgi_13_gd9131.jpg",
    overlay: "linear-gradient(135deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.74) 50%, rgba(0,0,0,0.54) 100%)",
  },
];

/* ─── Data ──────────────────────────────────────────────────── */


const whyUs = [
  { icon: MapPin,     title: "Talk to the Owner Directly",          desc: "We're a locally owned Houston company — not a franchise. When something needs attention, you can reach the owner of the company. No hold queues, no call centers, no automated systems." },
  { icon: Radio,      title: "Monitored Over Verizon Cellular",      desc: "Our systems communicate via Verizon cellular — not your internet or landline. When Wi-Fi goes down or a storm knocks out phone lines, your alarm stays fully connected." },
  { icon: PhoneCall,  title: "We Call You First",                    desc: "When your alarm equipment flags an issue, we reach out to you before you even know there's a problem. You'll never have to call to complain about something that should have been caught." },
  { icon: Star,       title: "5-Star Rated on Google",               desc: "Every review we've earned comes from a customer we genuinely cared about. We don't consider a job done at installation — we stay accountable for your safety long after." },
  { icon: Award,      title: "Competitive Rates When You Switch",          desc: "Many customers who switch to Texas Total Security pay less on monthly monitoring — often keeping their existing equipment and lowering their rate. Ask us to compare your current plan." },
  { icon: Shield,     title: "Managed by Texas Total Security",     desc: "Your account is managed by Texas Total Security, with alarm signals handled through our certified San Antonio partner monitoring center. No surprise provider changes." },
];

const testimonials = [
  {
    name: "Property Manager",
    role: "River Oaks, TX",
    text: "They provided great coverage for our entrance and exit gates, plus active deterrence with strobe lights. Their license plate cameras are outstanding.",
  },
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "Very happy with Texas Total Security! We switched from ADT — love that they are a local Houston alarm company. Their communication and customer service is awesome. Highly recommend!",
  },
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "Texas Total Security did a fantastic job installing an alarm system and cameras. The cameras are all 1080p HD and commercial grade. The owner Tim Townsend is very knowledgeable. I would recommend this company to everyone.",
  },
];

const faqs = [
  { q: "How do property management companies switch alarm providers?", a: "Switching is straightforward. We evaluate your existing alarm equipment from any provider — and in most cases, take over your panels, sensors, and wiring without replacing them. Our local team handles the entire transition with zero downtime to your tenants and operations." },
  { q: "Do you handle security for apartment complexes and multifamily properties?", a: "Yes — this is one of our core specialties. We provide comprehensive security for apartment communities including entrance/exit gate cameras, LPR systems, common area surveillance, package area monitoring, mailbox cameras, and dumpster area deterrence systems." },
  { q: "What makes you different from national alarm companies?", a: "Five things set us apart: (1) You can talk directly to the owner — no hold queues or call centers. (2) We monitor over Verizon cellular, not internet or landline, so your system stays connected even when Wi-Fi or phone lines go down. (3) When your equipment has an issue, we call you first — you never have to chase us. (4) We're 5-star rated on Google by real Houston customers. (5) Many customers who switch pay less on monthly monitoring — ask us to compare your current plan. Your account is managed by Texas Total Security, with monitoring handled through our certified San Antonio partner center." },
  { q: "Can you install security poles with multiple cameras?", a: "Absolutely. We custom-fabricate security poles in heights from 10 to 25 feet, supporting 1–4 cameras per pole with integrated wiring, LED floodlights, IR illuminators, and active deterrence systems. Use our 3D configurator to design your exact setup." },
  { q: "Do you serve commercial and industrial properties?", a: "Yes. From single retail locations to multi-site corporate campuses, warehouses, and industrial facilities — every system is custom-designed for your property's layout, liability requirements, and operational needs." },
  { q: "Can you take over our existing alarm equipment?", a: "In most cases, yes. We evaluate your existing keypads, sensors, wiring, and panels during a free property assessment. If your equipment is compatible — such as Honeywell VISTA panels, DMP, or DSC systems — we integrate it into your new setup, saving significant replacement costs." },
  { q: "What does a free property assessment include?", a: "A certified security professional visits your property at no cost. We map every entry point, evaluate existing equipment, identify blind spots and vulnerabilities, and provide a detailed proposal with transparent pricing. Zero obligation, zero pressure — designed for decision makers who need clear ROI justification." },
  { q: "How long does a commercial security installation take?", a: "Commercial and HOA projects typically take 1–5 days depending on scope. Apartment complexes with multiple buildings may take 1–2 weeks. We schedule around your operations and coordinate with property management to minimize disruption to tenants." },
  { q: "Do you offer 24/7 monitoring with local dispatch?", a: "Yes. We partner with a certified professional dispatch center staffed 24/7/365. When an alarm triggers, trained operators verify the signal and dispatch local authorities immediately. Property managers receive real-time notifications and incident reports after every event." },
  { q: "What areas in Houston do you serve?", a: "We specialize in Houston's most prestigious inner-loop neighborhoods — River Oaks, the Villages (77024), Galleria / Tanglewood, Energy Corridor, Bellaire, West University Place, Memorial, Spring Valley, Rice Military, Upper Kirby, Montrose, and the Medical Center area. Contact us to confirm service availability for your property." },
];


/* ─── Who We Serve cards ────────────────────────────────────── */
const whoWeServeCards = [
  {
    id: 0,
    icon: Home,
    label: "Residential",
    eyebrow: "Residential Security",
    href: "/residential",
    image: "/residential/imgi_33_luxury-home-6886153_1280.jpg",
    headline: "Your Home Deserves Real Protection.",
    body: "Custom alarm systems and HD camera networks — designed for your home, installed by local Houston technicians, and monitored 24/7 over Verizon cellular.",
    features: [
      "Alarm system design, installation & monitoring",
      "HD indoor & outdoor camera networks",
      "Verizon cellular — on even when Wi-Fi fails",
      "Talk to the owner — not a call center",
    ],
    cta: { label: "Explore Residential Solutions", href: "/residential" },
    stat: { value: "< 30s", label: "avg. alarm response" },
  },
  {
    id: 1,
    icon: Briefcase,
    label: "Commercial",
    eyebrow: "Commercial Security",
    href: "/commercial",
    image: "/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg",
    headline: "Stop Losses. Protect What You've Built.",
    body: "From retail storefronts to multi-site operations — active deterrence, 4K cameras, and commercial alarm systems that protect your assets, employees, and bottom line.",
    features: [
      "Active deterrence cameras & commercial alarms",
      "4K coverage for entries, lots & loading areas",
      "24/7 professional monitoring — never outsourced",
      "Multi-site management & centralized reporting",
    ],
    cta: { label: "Explore Commercial Solutions", href: "/commercial" },
    stat: { value: "200+", label: "Houston businesses secured" },
  },
  {
    id: 2,
    icon: Building2,
    label: "Property Managers & HOAs",
    eyebrow: "Multi-Family & HOA Security",
    href: "/hoa-security",
    image: "/imgi_14_upscale_gate_TTS.jpg",
    headline: "One Team. Every Property. Zero Gaps.",
    body: "Enterprise surveillance, gate cameras, LPR, and alarm monitoring across your entire portfolio — with board-ready reporting and a single local team you can actually call.",
    features: [
      "Gate cameras & license plate recognition (LPR)",
      "Community-wide surveillance infrastructure",
      "Multi-unit alarm monitoring & system takeover",
      "HOA board reports & proactive hardware alerts",
    ],
    cta: { label: "Explore HOA & Multi-Family Solutions", href: "/hoa-security" },
    stat: { value: "5★", label: "Google rated" },
  },
];

/* ─── Page ──────────────────────────────────────────────────── */
const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Hero slider auto-advance — resets to 12s every time slide changes
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 12000);
    return () => clearTimeout(timer);
  }, [currentSlide, isHeroPaused]);

  const schemas = [
    generateComprehensiveHomepageSchema(),
    generateItemListSchema([
      { name: "Alarm Systems", description: "Custom alarm design, installation & professional monitoring", url: "/alarm-systems", position: 1 },
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
        description="Houston's trusted local security company. Alarm systems, security cameras, HOA & commercial security. Serving Houston & surrounding areas for 15+ years. Call (713) 387-9937."
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
          <div className="max-w-5xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-11 sm:py-14 text-left sm:text-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-content-${currentSlide}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: easeExpo }}
              >

                {/* ── Headline — large, bold ── */}
                <h1
                  className="font-display font-bold text-white px-2 sm:mx-auto"
                  style={{
                    fontSize: "clamp(1.6rem, 4.5vw, 3.25rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                    marginBottom: "1.2rem",
                    maxWidth: "54rem",
                    wordBreak: "keep-all",
                    overflowWrap: "normal",
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

                {/* ── Subtitle ── */}
                <p
                  className="sm:mx-auto mb-5 text-white px-2 leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 1.55vw, 1.05rem)", opacity: 0.92, maxWidth: "38rem" }}
                >
                  {heroSlides[currentSlide].sub}
                </p>

                {/* ── CTAs ── */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start sm:justify-center gap-3 mb-6">
                  {heroSlides[currentSlide].ctas ? (
                    heroSlides[currentSlide].ctas!.map((cta, idx) => (
                      <motion.div key={cta.href} className="w-full sm:w-auto" whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.975 }}>
                        {cta.external ? (
                          <a
                            href={cta.href}
                            className={`justify-center w-full sm:w-auto ${idx === 0 ? "btn-primary-gradient inline-flex items-center gap-2.5 font-semibold px-7 py-3.5" : "btn-outline-light inline-flex items-center gap-2.5 font-semibold px-7 py-3.5"}`}
                            style={idx === 0 ? { fontSize: "0.9rem", boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38), 0 2px 8px rgba(0,0,0,0.3)" } : { fontSize: "0.9rem" }}
                          >
                            {cta.label} <Phone className="w-4 h-4" />
                          </a>
                        ) : (
                          <Link
                            to={cta.href}
                            className={`justify-center w-full sm:w-auto ${idx === 0 ? "btn-primary-gradient inline-flex items-center gap-2.5 font-semibold px-7 py-3.5" : "btn-outline-light inline-flex items-center gap-2.5 font-semibold px-7 py-3.5"}`}
                            style={idx === 0 ? { fontSize: "0.9rem", boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38), 0 2px 8px rgba(0,0,0,0.3)" } : { fontSize: "0.9rem" }}
                          >
                            {cta.label} <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <>
                      <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.975 }}>
                        <Link
                          to={heroSlides[currentSlide].cta.href}
                          className="justify-center w-full sm:w-auto btn-primary-gradient inline-flex items-center gap-2.5 font-semibold px-7 py-3.5"
                          style={{ fontSize: "0.9rem", boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38), 0 2px 8px rgba(0,0,0,0.3)" }}
                        >
                          {heroSlides[currentSlide].cta.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                      <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <a
                          href="tel:7133879937"
                          className="justify-center w-full sm:w-auto btn-outline-light inline-flex items-center gap-2.5 font-semibold px-7 py-3.5"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <Phone className="w-4 h-4" /> (713) 387-9937
                        </a>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* ── Trust authority strip ── */}
                <div className="flex items-center justify-start sm:justify-center flex-wrap gap-x-5 gap-y-1">
                  {[
                    { icon: Star,         label: "Top Rated" },
                    { icon: Shield,       label: "LIC# B03066901" },
                    { icon: CheckCircle2, label: "Locally Owned" },
                    { icon: MapPin,       label: "Houston-Based" },
                  ].map(({ icon: Icon, label }, idx, arr) => (
                    <span key={label} className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.72)" }}>
                        <Icon className="w-3 h-3" style={{ color: "hsl(0 85% 58%)" }} />
                        <span className="text-[10px] font-semibold tracking-[0.1em] uppercase">{label}</span>
                      </span>
                      {idx < arr.length - 1 && (
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                      )}
                    </span>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* ── Slide navigation dots ── */}
            <div className="flex items-center justify-start sm:justify-center gap-2.5 mt-7">
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
                      transition={{ duration: 12, ease: "linear" }}
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
          TRUST STRIP — light marquee
      ══════════════════════════════════════════════════ */}
      <div
        className="marquee-outer overflow-hidden"
        style={{
          background: "hsl(0 0% 97%)",
          borderTop: "1px solid hsl(0 0% 91%)",
          borderBottom: "1px solid hsl(0 0% 91%)",
          padding: "10px 0",
        }}
      >
        {(() => {
          const items = [
            { label: "Switch Alarm Providers",             accent: true  },
            { label: "Property Management Security",       accent: false },
            { label: "LIC# B03066901 · Licensed & Insured", accent: true },
            { label: "HOA & Community Security",           accent: false },
            { label: "Custom Security Poles",              accent: false },
            { label: "License Plate Recognition",          accent: true  },
            { label: "Alarm.com Authorized Dealer",        accent: false },
            { label: "24/7 Professional Alarm Monitoring", accent: true  },
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
                        style={{ background: "hsl(0 85% 50%)" }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                      />
                      <span
                        className="text-[10.5px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                        style={{ color: "hsl(0 0% 11%)" }}
                      >
                        {item.label}
                      </span>
                    </span>
                  ) : (
                    <span
                      className="text-[10.5px] font-medium uppercase tracking-[0.15em] whitespace-nowrap"
                      style={{ color: "hsl(0 0% 52%)" }}
                    >
                      {item.label}
                    </span>
                  )}
                  <span style={{ color: "hsl(0 0% 82%)", fontSize: "16px", lineHeight: 1 }} aria-hidden>╌</span>
                </span>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ══════════════════════════════════════════════════
          WHO WE SERVE — light theme image cards
      ══════════════════════════════════════════════════ */}
      <section
        className="overflow-hidden"
        style={{
          background: "white",
          borderTop: "1px solid hsl(0 0% 92%)",
          paddingTop: "clamp(3rem, 6vw, 5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header row — left-aligned, side by side with descriptor */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-9"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "hsl(0 85% 50%)" }}
                >
                  Who We Serve
                </span>
              </div>
              <h2
                className="font-display font-bold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", letterSpacing: "-0.04em" }}
              >
                Security Solutions for Every Property Type
              </h2>
            </div>
            <p
              className="text-gray-500 text-sm leading-relaxed sm:text-right sm:max-w-xs"
            >
              From homeowners to HOA boards — every system is custom-designed for your property and your goals.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whoWeServeCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.09 }}
                >
                  <Link to={card.cta.href} className="group block h-full">
                    <div
                      className="relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-350"
                      style={{
                        border: "1px solid hsl(0 0% 91%)",
                        background: "white",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        transition: "box-shadow 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0px)";
                      }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden h-44 sm:h-[200px]">
                        <img
                          src={card.image}
                          alt={card.label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.52) 100%)" }}
                        />
                        {/* Eyebrow on image */}
                        <div className="absolute bottom-3 left-3">
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{
                              background: "hsl(0 85% 48%)",
                              boxShadow: "0 2px 12px hsl(0 85% 40% / 0.45)",
                            }}
                          >
                            <Icon className="w-3 h-3 text-white" />
                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.16em] whitespace-nowrap">
                              {card.eyebrow}
                            </span>
                          </div>
                        </div>
                        {/* Red top accent */}
                        <div
                          className="absolute top-0 left-0 right-0"
                          style={{
                            height: 3,
                            background: "linear-gradient(to right, hsl(0 85% 42%), hsl(0 85% 56%))",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <h3
                          className="font-display font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-[hsl(0,85%,45%)] transition-colors duration-200"
                          style={{ fontSize: "1.05rem", letterSpacing: "-0.025em" }}
                        >
                          {card.headline}
                        </h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                          {card.body}
                        </p>

                        {/* Features */}
                        <ul className="space-y-1.5 mb-5 flex-1">
                          {card.features.map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <CheckCircle2
                                className="w-3.5 h-3.5 shrink-0 mt-[1px]"
                                style={{ color: "hsl(0 85% 50%)" }}
                              />
                              <span className="text-[12.5px] text-gray-700 leading-snug">{f}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA row */}
                        <div
                          className="pt-4"
                          style={{ borderTop: "1px solid hsl(0 0% 93%)" }}
                        >
                          <span
                            className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all duration-200"
                            style={{ color: "hsl(0 85% 48%)" }}
                          >
                            {card.cta.label}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SWITCH YOUR ALARM COMPANY — dark theme
      ══════════════════════════════════════════════════ */}
      <section
        className="overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 55% 7%) 55%, hsl(0 0% 4%) 100%)" }}
      >
        {/* Ambient red glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 100% 50%, hsl(0 85% 38% / 0.13), transparent 65%)" }} />
        {/* Top / bottom hairlines */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent 5%, hsl(0 85% 44% / 0.3) 40%, hsl(0 85% 44% / 0.3) 60%, transparent 95%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(to right, transparent 5%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, transparent 95%)" }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-2">

          {/* Left — residential image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.9, ease: easeExpo }}
            className="relative min-h-[220px] lg:min-h-0"
          >
            <img
              src="/keypadimage.jpg"
              alt="Security alarm keypad — Texas Total Security Houston"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, hsl(0 55% 7%) 100%)" }} />
            <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 40%, hsl(0 0% 4%) 100%)" }} />

            {/* Review badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: 0.35 }}
              className="absolute bottom-5 left-5 rounded-xl p-3.5"
              style={{
                background: "rgba(8,8,8,0.84)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
                maxWidth: "210px",
              }}
            >
              <div className="flex gap-0.5 mb-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5" style={{ fill: "hsl(0 85% 52%)", color: "hsl(0 85% 52%)" }} />
                ))}
              </div>
              <p className="text-[11.5px] font-semibold text-white leading-snug mb-0.5">"Switched from ADT. Love that they're local — communication and service is awesome."</p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>Google Reviewer — Houston, TX</p>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.9, ease: easeExpo }}
            className="flex flex-col justify-center px-7 py-9 sm:px-9 lg:px-12 lg:py-10"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 60%)" }}>
                Alarm Takeover · Any Provider · Hardwired System Specialists
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display font-bold leading-[1.08] mb-4"
              style={{ fontSize: "clamp(1.55rem, 2.8vw, 2.25rem)", letterSpacing: "-0.04em" }}
            >
              <span className="block text-white">Tired of Your Current Alarm Company?</span>
              <span className="block" style={{ color: "hsl(0 85% 54%)" }}>Switching Is Easier Than You Think.</span>
            </h2>

            {/* Trust stats */}
            <div className="flex items-center gap-5 mb-5 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                { value: "500+", label: "switched" },
                { value: "1 visit", label: "typical" },
                { value: "5★", label: "Google" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-white leading-none" style={{ fontSize: "1.1rem", letterSpacing: "-0.03em" }}>{s.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* How it works — 3-step process */}
            <div className="mb-6">
              <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] mb-3.5" style={{ color: "rgba(255,255,255,0.30)" }}>How It Works</p>
              <div className="space-y-2.5">
                {[
                  { step: "1", title: "Free Switch Assessment", desc: "We visit your property, evaluate your existing alarm equipment, and tell you exactly what we can take over — at no charge." },
                  { step: "2", title: "Same-Day Takeover", desc: "Our tech reprograms your panel, tests every sensor, and activates 24/7 monitoring — all in a single visit. Most switches take just a few hours." },
                  { step: "3", title: "You're Protected", desc: "Your system stays exactly as-is. Honeywell, DSC, DMP, Resideo & more. Monitoring runs over Verizon cellular — works even when Wi-Fi goes down." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 items-start">
                    <div
                      className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold mt-0.5"
                      style={{ background: "hsl(0 85% 50%)", color: "white" }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white leading-snug">{item.title}</p>
                      <p className="text-[12px] leading-relaxed mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/switch-my-alarm"
                className="btn-primary-gradient inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3"
                style={{ boxShadow: "0 4px 24px hsl(0 85% 44% / 0.42)" }}
              >
                Start My Free Switch Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.11)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "white"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.11)"; }}
              >
                <Phone className="w-4 h-4" /> (713) 387-9937
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE TTS — light + photo split
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ background: "white", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left — content */}
          <div className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-14 xl:px-16">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-px rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>
                  Why Choose Us
                </span>
              </div>
              <h2
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-0.04em", color: "hsl(0 0% 8%)" }}
              >
                Not a franchise.{" "}
                <span style={{ color: "hsl(0 85% 50%)" }}>Your neighbors.</span>
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "hsl(0 0% 38%)", maxWidth: "36rem" }}>
                Locally owned in Houston. We monitor over Verizon cellular so you stay protected when Wi-Fi fails. We call you first when something needs attention — and you can always reach the owner directly.
              </p>

              {/* CTA row — phone stands out */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-7">
                <Link to="/about" className="btn-primary-gradient inline-flex items-center gap-2 text-sm">
                  About Our Company <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:7133879937"
                  className="group inline-flex items-center gap-3 rounded-xl px-5 py-3 font-bold transition-all duration-200"
                  style={{
                    background: "hsl(0 0% 9%)",
                    color: "white",
                    fontSize: "0.95rem",
                    letterSpacing: "-0.01em",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "hsl(0 85% 50%)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px hsl(0 85% 44% / 0.38)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "hsl(0 0% 9%)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)";
                  }}
                >
                  <Phone className="w-4 h-4 shrink-0" style={{ color: "hsl(0 85% 58%)" }} />
                  (713) 387-9937
                </a>
              </div>
            </motion.div>

            {/* Why-Us grid — compact, no descriptions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.06 }}
                  className="rounded-xl p-3.5"
                  style={{
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: "hsl(0 85% 45% / 0.09)", border: "1px solid hsl(0 85% 45% / 0.15)" }}
                  >
                    <item.icon className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h3 className="font-semibold leading-snug" style={{ fontSize: "11.5px", color: "hsl(0 0% 12%)" }}>
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — interactive service area map */}
          <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center" style={{ background: "hsl(0 0% 10%)", minHeight: 300 }}>
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-red-500 rounded-full animate-spin mx-auto mb-2" />
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Loading map…</p>
                </div>
              </div>
            }>
              <ServiceAreaMap />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS — Google-branded enterprise reviews
      ══════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16" style={{ background: "white", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">

          {/* Header row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-9"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>
                  Verified Google Reviews
                </span>
              </div>
              <h2
                className="font-display font-bold text-gray-900"
                style={{ fontSize: "clamp(1.55rem, 2.8vw, 2.1rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
              >
                Trusted Across Houston
              </h2>
            </div>

            {/* Google aggregate badge */}
            <div
              className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 shrink-0"
              style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 90%)" }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-label="Google">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-bold text-gray-900" style={{ fontSize: "1.05rem" }}>5.0</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">Rated on Google</p>
              </div>
            </div>
          </motion.div>

          {/* Featured review — horizontal dark bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}
            className="rounded-2xl p-6 sm:p-7 mb-5 relative overflow-hidden"
            style={{ background: "hsl(0 0% 5%)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 45% 100% at 0% 50%, hsl(0 85% 45% / 0.1), transparent)" }} />
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 relative z-10">
              <div className="flex-1 min-w-0">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                  ))}
                </div>
                <p
                  className="font-display font-medium text-white"
                  style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", lineHeight: 1.55, letterSpacing: "-0.01em" }}
                >
                  "What really stood out was how Texas Total Security described in such detail and confidence the process and exactly what I would be getting. They delivered on every promise."
                </p>
              </div>
              <div
                className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2.5 shrink-0 sm:pl-7 sm:border-l mt-4 sm:mt-0"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 hidden sm:block opacity-50 mb-0.5" aria-label="Google">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: "hsl(0 85% 45% / 0.14)", color: "hsl(0 85% 62%)", border: "1px solid hsl(0 85% 45% / 0.22)" }}
                >
                  H
                </div>
                <div className="sm:text-right">
                  <p className="text-[12.5px] font-semibold text-white leading-none mb-0.5">Homeowner</p>
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>Bellaire, TX</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3-col review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: 0.12 + i * 0.08 }}
                className="rounded-2xl p-5 flex flex-col"
                style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 91%)" }}
              >
                {/* Google branding + stars */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-label="Google">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-[10.5px] font-semibold" style={{ color: "hsl(0 0% 50%)" }}>Google Review</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p className="text-[13.5px] text-gray-600 leading-relaxed flex-1 mb-4">"{t.text}"</p>

                {/* Reviewer */}
                <div className="flex items-center gap-2.5 pt-3.5" style={{ borderTop: "1px solid hsl(0 0% 88%)" }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "hsl(0 85% 45% / 0.09)", color: "hsl(var(--accent))" }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-gray-900 leading-none mb-0.5">{t.name}</p>
                    <p className="text-[11px] text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.5, ease: easeExpo, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-7 pt-6"
            style={{ borderTop: "1px solid hsl(0 0% 91%)" }}
          >
            <p className="text-[12.5px] text-gray-400 text-center sm:text-left">
              Every review shown is a verified Google review from a real Texas Total Security customer.
            </p>
            <a
              href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:gap-3 shrink-0"
              style={{ color: "hsl(var(--accent))" }}
            >
              View All Google Reviews <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          FAQ — animated accordion
      ══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14" style={{ background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>FAQ</span>
              </div>
              <h2
                className="font-display font-bold text-gray-900"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Everything you need to know about working with Texas Total Security.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-2">
            {[
              {
                q: "How do property management companies switch alarm providers?",
                a: (
                  <span>
                    Switching is straightforward. We evaluate your existing alarm equipment from any provider — and in most cases, take over your panels, sensors, and wiring without replacing them. Our local team handles the entire transition with zero downtime to your tenants and operations.{" "}
                    <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">Learn more about our alarm takeover program</Link>{" "}
                    or call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to start the switch.
                  </span>
                ),
              },
              {
                q: "Do you handle security for apartment complexes and multifamily properties?",
                a: (
                  <span>
                    Yes — this is one of our core specialties. We provide comprehensive security for apartment communities including entrance/exit gate cameras, LPR systems, common area surveillance, package area monitoring, mailbox cameras, and dumpster area deterrence systems.{" "}
                    <Link to="/hoa-security" className="text-red-600 font-semibold hover:underline">Explore our HOA & property management security solutions</Link>{" "}
                    for a full breakdown of coverage areas.
                  </span>
                ),
              },
              {
                q: "What makes you different from national alarm companies?",
                a: (
                  <span>
                    Five things set us apart: (1) You can talk directly to the owner — no hold queues or call centers. (2) We monitor over Verizon cellular, not internet or landline, so your system stays connected even when Wi-Fi or phone lines go down. (3) When your equipment has an issue, we call you first — you never have to chase us. (4) We're{" "}
                    <Link to="/reviews" className="text-red-600 font-semibold hover:underline">5-star rated on Google</Link>{" "}
                    by real Houston customers. (5) Many customers who switch pay less on monthly monitoring — ask us to compare your current plan.
                  </span>
                ),
              },
              {
                q: "Can you install security poles with multiple cameras?",
                a: (
                  <span>
                    Absolutely. We custom-fabricate security poles in heights from 10 to 25 feet, supporting 1–4 cameras per pole with integrated wiring, LED floodlights, IR illuminators, and active deterrence systems.{" "}
                    <Link to="/security-pole-configurator" className="text-red-600 font-semibold hover:underline">Use our 3D configurator to design your exact setup</Link>.
                  </span>
                ),
              },
              {
                q: "Do you serve commercial and industrial properties?",
                a: (
                  <span>
                    Yes. From single retail locations to multi-site corporate campuses, warehouses, and industrial facilities — every system is custom-designed for your property's layout, liability requirements, and operational needs.{" "}
                    <Link to="/commercial" className="text-red-600 font-semibold hover:underline">Explore commercial security solutions</Link>{" "}
                    or{" "}
                    <Link to="/industries" className="text-red-600 font-semibold hover:underline">see the industries we serve</Link>.
                  </span>
                ),
              },
              {
                q: "Can you take over our existing alarm equipment?",
                a: (
                  <span>
                    In most cases, yes. We evaluate your existing keypads, sensors, wiring, and panels during a{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free property assessment</Link>.
                    {" "}If your equipment is compatible — such as Honeywell VISTA panels, DMP, or DSC systems — we integrate it into your new setup, saving significant replacement costs. Visit our{" "}
                    <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">alarm takeover page</Link>{" "}
                    to learn more.
                  </span>
                ),
              },
              {
                q: "What does a free property assessment include?",
                a: (
                  <span>
                    A certified security professional visits your property at no cost. We map every entry point, evaluate existing equipment, identify blind spots and vulnerabilities, and provide a detailed proposal with transparent pricing. Zero obligation, zero pressure — designed for decision makers who need clear ROI justification.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule your free assessment now</Link>.
                  </span>
                ),
              },
              {
                q: "How long does a commercial security installation take?",
                a: (
                  <span>
                    Commercial and HOA projects typically take 1–5 days depending on scope. Apartment complexes with multiple buildings may take 1–2 weeks. We schedule around your operations and coordinate with property management to minimize disruption to tenants. Call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss your project timeline.
                  </span>
                ),
              },
              {
                q: "Do you offer 24/7 monitoring with local dispatch?",
                a: (
                  <span>
                    Yes. We partner with a certified professional dispatch center staffed 24/7/365. When an alarm triggers, trained operators verify the signal and dispatch local authorities immediately. Property managers receive real-time notifications and incident reports after every event.{" "}
                    <Link to="/monitoring-services" className="text-red-600 font-semibold hover:underline">Learn more about our monitoring services</Link>.
                  </span>
                ),
              },
              {
                q: "What areas in Houston do you serve?",
                a: (
                  <span>
                    We specialize in Houston's most prestigious inner-loop neighborhoods — River Oaks, the Villages (77024), Galleria / Tanglewood, Energy Corridor, Bellaire, West University Place, Memorial, Spring Valley, Rice Military, Upper Kirby, Montrose, and the Medical Center area.{" "}
                    <Link to="/service-areas" className="text-red-600 font-semibold hover:underline">View our full service area map</Link>{" "}
                    or contact us to confirm availability for your property.
                  </span>
                ),
              },
            ].map((faq, i) => {
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

    </Layout>
  );
};

export default Index;
