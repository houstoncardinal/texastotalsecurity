import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";

import {
  generateItemListSchema,
  generateComprehensiveHomepageSchema,
  generateSiteLinksSearchBoxSchema,
  generateSpecialAnnouncementSchema,
} from "@/lib/seo";
import {
  Shield, Building2, Radio, Home, Camera,
  ArrowRight, Phone, CheckCircle2, Star,
  Plus, Minus, Briefcase,
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
    eyebrow: "Locally Owned · Licensed & Insured · Houston Based · 5 Star On Google",
    headline: [
      "Make the switch to a Local & Reliable",
      "Security Company That Cares",
    ],
    sub: "Our goal at Texas Total Security is to provide our customers with comfort and peace of mind knowing that their business, family and/or assets are safe!",
    cta: { label: "Switch Your Alarm Company", href: "/switch-my-alarm" },
    bg: "/imgi_9_iStock-1253624795-Family-on-Couch-Home-Page-scaled.jpg",
    overlay: "rgba(0,0,0,0.74)",
  },
];

/* ─── Data ──────────────────────────────────────────────────── */


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

const homepageFaqs = [
  {
    q: "What security services does Texas Total Security provide?",
    a: (
      <span>
        We design, install, and support residential alarm systems, commercial security systems, hardwired security cameras, 24/7 alarm monitoring, HOA camera systems, License Plate Reader (LPR) cameras, active deterrence, and alarm takeovers.{" "}
        <Link to="/services" className="text-red-600 font-semibold hover:underline">View all security services</Link>.
      </span>
    ),
  },
  {
    q: "Can you take over my existing alarm system?",
    a: (
      <span>
        In many cases, yes. We evaluate your existing panel, keypads, sensors, and wiring, then tell you what can be reused, repaired, or upgraded before switching monitoring.{" "}
        <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">Learn about alarm takeovers</Link>.
      </span>
    ),
  },
  {
    q: "What makes you different from national alarm companies?",
    a: (
      <span>
        We are Houston-owned, reachable, and locally accountable. Your system is managed by Texas Total Security, and customers can talk to the owner directly.
      </span>
    ),
  },
  {
    q: "Do you install security cameras for HOAs and apartment communities?",
    a: (
      <span>
        Yes. We design gate cameras, License Plate Reader (LPR) systems, mailbox and package area cameras, dumpster deterrence, pool area cameras, and portfolio-wide surveillance for HOAs, multi-family properties, and property managers.{" "}
        <Link to="/hoa-security" className="text-red-600 font-semibold hover:underline">Explore HOA security</Link>.
      </span>
    ),
  },
  {
    q: "Do your alarm systems work when internet goes down?",
    a: (
      <span>
        Yes. Our monitored alarm systems can include backup communication and battery backup for power interruptions.
      </span>
    ),
  },
  {
    q: "What does a free property assessment include?",
    a: (
      <span>
        We review your property layout, existing equipment, entry points, camera angles, blind spots, and monitoring needs, then provide a clear recommendation with no obligation.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request a free assessment</Link>.
      </span>
    ),
  },
];

const comparisonRows = [
  {
    feature: "Contract Ownership",
    localTitle: "Kept In-House",
    localBody: "Your contract stays local. It is never sold to outside or parent corporations.",
    nationalTitle: "Sold Quickly",
    nationalBody: "Contracts are routinely flipped to a national mother company within 30 days.",
  },
  {
    feature: "Customer Recognition",
    localTitle: "Personalized",
    localBody: "Staff know you by your first name, from the front office to the service techs.",
    nationalTitle: "Transaction-Based",
    nationalBody: "Treated as an account number with a high-volume, standardized approach.",
  },
  {
    feature: "Post-Sale Support",
    localTitle: "Full Service",
    localBody: "Our local team handles everything from upgrades to billing updates directly.",
    nationalTitle: "Locked Out",
    nationalBody: "The local franchise cannot modify, view, or service the account once it is sold.",
  },
  {
    feature: "Call Center Location",
    localTitle: "Local",
    localBody: "In-state support that understands the local area and your needs.",
    nationalTitle: "Out-of-State/Country",
    nationalBody: "Massive, centralized, out-of-state or international call centers.",
  },
  {
    feature: "Customer Service",
    localTitle: "Personal & Direct",
    localBody: "Direct line to local staff who can personally help in emergencies.",
    nationalTitle: "Automated Queues",
    nationalBody: "Customers must navigate massive national queues and automated menus.",
  },
  {
    feature: "Staff Consistency",
    localTitle: "Familiar Faces",
    localBody: "You work with the same trusted local salespeople and technicians.",
    nationalTitle: "Revolving Door",
    nationalBody: "High corporate turnover means you rarely speak to or see the same person twice.",
  },
  {
    feature: "Account Management",
    localTitle: "Relationship-Driven",
    localBody: "Decisions are made locally by people who know your history.",
    nationalTitle: "System-Driven",
    nationalBody: "You are treated as a line-item asset on a corporate balance sheet.",
  },
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
    body: "Custom alarm systems and HD camera networks — designed for your home, installed by local Houston technicians, and supported by 24/7 professional monitoring.",
    features: [
      "Alarm system design, installation & monitoring",
      "HD indoor & outdoor camera networks",
      "Reliable monitoring and backup planning",
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
    image: "/commercial/commercialbanner.jpg",
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
    body: "Enterprise surveillance, gate cameras, License Plate Reader (LPR), and alarm monitoring across your entire portfolio — with board-ready reporting and a single local team you can actually call.",
    features: [
      "Gate cameras & license plate reader (LPR)",
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const hero = heroSlides[0];

  const schemas = [
    generateComprehensiveHomepageSchema(),
    generateSiteLinksSearchBoxSchema(),
    generateSpecialAnnouncementSchema(),
    generateItemListSchema([
      { name: "Alarm Systems", description: "Custom alarm design, installation & professional monitoring", url: "/alarm-systems", position: 1 },
      { name: "Security Camera Systems", description: "HD surveillance, license plate cameras, PTZ & remote viewing", url: "/security-cameras", position: 2 },
      { name: "Residential Security", description: "Whole-home protection with smart integration & 24/7 monitoring", url: "/residential", position: 3 },
      { name: "Commercial Security", description: "Scalable security for offices, retail & industrial sites", url: "/commercial", position: 4 },
      { name: "HOA Security", description: "Gate cameras, license plate reader & community surveillance", url: "/hoa-security", position: 5 },
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
          HERO — redesigned for maximum impact
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "hsl(0 0% 4%)", display: "flex", flexDirection: "column" }}
      >
        {/* Subtle red ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 50% at 20% 60%, hsl(0 85% 38% / 0.10), transparent 60%)" }} />

        <div className="absolute inset-0 z-0">
          <img
            src={hero.bg}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.60) 100%)" }} />
        </div>

        {/* ── Slide content ── */}
        <div className="relative z-10 flex-1 flex items-center min-h-[440px] sm:min-h-[520px] lg:min-h-[560px]">
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-14 sm:py-16 lg:py-20 text-left">

            <AnimatePresence mode="wait">
              <motion.div
                className="max-w-[68rem]"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: easeExpo }}
              >
                {/* Eyebrow badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-red-200/90">
                    Highly Rated & Trusted Houston Security Company
                  </span>
                </div>

                {/* Main headline */}
                <h1
                  className="font-display font-bold text-white"
                  style={{
                    fontSize: "clamp(2rem, 5.8vw, 3.85rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    marginBottom: "1.25rem",
                    maxWidth: "68rem",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                    textShadow: "0 4px 24px rgba(0,0,0,0.55)",
                  }}
                >
                  <span className="block text-white/95">Make the switch</span>
                  <span className="block">
                    to a{" "}
                    <span className="inline-block" style={{ color: "hsl(0 85% 56%)" }}>Local & Reliable</span>
                  </span>
                  <span className="block text-white/90">Security Company</span>
                </h1>

                <p
                  className="mb-7 text-white/70 leading-relaxed"
                  style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", maxWidth: "36rem", textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}
                >
                  <span className="font-semibold text-white/90">Our goal at Texas Total Security is to provide homeowners and business owners with comfort and a piece of mind knowing that their family and assets are safe.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
                  <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to={hero.cta.href}
                      className="btn-primary-gradient justify-center w-full sm:w-auto inline-flex items-center gap-2.5 font-semibold px-7 py-3.5 text-white text-sm"
                      style={{ boxShadow: "0 8px 28px hsl(0 85% 28% / 0.48)" }}
                    >
                      {hero.cta.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                  <Link
                    to="/request-callback"
                    className="text-sm font-semibold text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-red-500/40 hover:decoration-red-500"
                  >
                    Request a Callback
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHO WE SERVE — Residential & Commercial
      ══════════════════════════════════════════════════ */}
      <section
        style={{
          background: "white",
          borderTop: "1px solid hsl(0 0% 91%)",
          paddingTop: "clamp(2rem, 4vw, 3.25rem)",
          paddingBottom: "clamp(1.5rem, 4vw, 3.25rem)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="mb-5 sm:mb-7"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-6 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 85% 50%)" }}>
                Who We Serve
              </span>
            </div>
            <h2
              className="font-bold text-gray-900 leading-tight"
              style={{ fontSize: "clamp(1.55rem, 3vw, 2.25rem)", letterSpacing: "-0.04em" }}
            >
              Security Solutions for Every Property Type
            </h2>
          </motion.div>

          {/* 2-col cards — clean professional design */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            {whoWeServeCards.slice(0, 2).map((card, i) => {
              const Icon = card.icon;
              const title = i === 0 ? "Residential Security" : "Commercial Security";
              const ctaLabel = i === 0 ? "Explore Residential Security" : "Explore Commercial Security";
              return (
                <motion.div
                  key={card.id}
                  variants={i === 0 ? fadeLeft : fadeRight}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.65, ease: easeExpo, delay: i * 0.08 }}
                >
                  <Link to={card.cta.href} className="group block h-full" style={{ textDecoration: "none" }}>
                    <div
                      className="relative h-full overflow-hidden rounded-xl"
                      style={{
                        border: "1px solid hsl(0 0% 90%)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)",
                        transition: "box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08), 0 20px 48px rgba(0,0,0,0.08)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      {/* Image section - larger, more prominent */}
                      <div className="relative h-[240px] sm:h-[280px] lg:h-[320px] overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.label}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          style={i === 1 ? { objectPosition: "center 35%" } : undefined}
                          loading="lazy"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)" }} />

                        {/* Icon badge */}
                        <div
                          className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-lg"
                          style={{
                            background: "rgba(255,255,255,0.92)",
                            backdropFilter: "blur(8px)",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                          }}
                        >
                          <Icon className="h-5 w-5" style={{ color: "hsl(0 85% 46%)" }} />
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="bg-white p-5 sm:p-6 lg:p-7">
                        <h3
                          className="font-bold leading-tight mb-4"
                          style={{ fontSize: "clamp(1.35rem, 2.8vw, 1.75rem)", letterSpacing: "-0.02em", color: "hsl(0 0% 12%)" }}
                        >
                          {title}
                        </h3>

                        {/* CTA row */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: "hsl(0 85% 46%)" }}>
                            {ctaLabel}
                          </span>
                          <span
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1.5 group-hover:bg-red-700"
                            style={{ background: "hsl(0 85% 46%)", color: "white", boxShadow: "0 4px 12px hsl(0 85% 38% / 0.25)" }}
                            aria-hidden="true"
                          >
                            <ArrowRight className="h-4 w-4" />
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
              src="/timtownsend2.jpg"
              alt="Tim Townsend — Texas Total Security Houston"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Removed overlay divs for clearer image */}
            {/* <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, hsl(0 55% 7%) 100%)" }} /> */}
            {/* <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 40%, hsl(0 0% 4%) 100%)" }} /> */}

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
            <div className="mb-6">
              <h3
                className="text-red-600 font-extrabold uppercase tracking-widest mb-4"
                style={{ letterSpacing: "0.2em", fontSize: "1.125rem" }}
              >
                Free Onsite Security Analysis
              </h3>
              <div className="space-y-6 text-white text-lg sm:text-xl leading-relaxed max-w-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 20l9-5-9-5-9 5 9 5z" />
                      <path d="M12 12v8" />
                      <path d="M12 12L3 7" />
                      <path d="M12 12l9-5" />
                    </svg>
                  </div>
                  <p>Security Pro meets with you onsite at your home or business</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <p>Talks about current security system, upgrades, or plans for a new one</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 3h18v18H3z" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  </div>
                  <p>Examines layout and gathers information regarding equipment</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l7 7-7 7-7-7 7-7z" />
                      <path d="M12 12v8" />
                    </svg>
                  </div>
                  <p>Comes up with solutions, ideas, and discusses a plan of action</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          US VS THEM — comparison table
      ══════════════════════════════════════════════════ */}
      <section id="local-vs-national" style={{ scrollMarginTop: "6rem", background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 91%)", padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-5 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.26em]" style={{ color: "hsl(0 85% 50%)" }}>
                  The Difference Is Clear
                </span>
              </div>
              <h2
                className="font-extrabold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.025em" }}
              >
                Texas Total Security
                <span className="font-light" style={{ color: "hsl(0 85% 48%)" }}> vs. </span>
                Big National Alarm Companies
              </h2>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo, delay: 0.08 }}
            className="rounded-2xl"
            style={{ border: "1px solid hsl(0 0% 88%)", boxShadow: "0 4px 32px rgba(0,0,0,0.08)", overflow: "visible" }}
          >
            {/* ── Column headers: desktop (3-col) ── */}
            <div className="hidden md:grid grid-cols-[0.85fr_1.2fr_1.2fr]">
              <div
                className="px-6 lg:px-8 py-4 flex items-center"
                style={{ background: "hsl(0 0% 14%)", borderTopLeftRadius: "1rem" }}
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 0% 42%)" }}>
                  Feature / Category
                </span>
              </div>
              <div
                className="flex items-center px-5 py-4"
                style={{ background: "hsl(0 85% 44%)", borderLeft: "1px solid hsl(0 80% 38%)" }}
              >
                <span className="font-extrabold text-white leading-tight" style={{ fontSize: "clamp(0.82rem, 2vw, 1rem)", letterSpacing: "0" }}>
                  Texas Total Security (Local Provider)
                </span>
              </div>
              <div
                className="flex items-center px-5 py-4"
                style={{ background: "hsl(0 0% 20%)", borderLeft: "1px solid hsl(0 0% 27%)", borderTopRightRadius: "1rem" }}
              >
                <span className="font-extrabold leading-tight" style={{ fontSize: "clamp(0.82rem, 2vw, 1rem)", letterSpacing: "0", color: "hsl(0 0% 58%)" }}>
                  Big National Alarm Company/Franchises
                </span>
              </div>
            </div>

            {/* ── Column headers: mobile (2-col, feature label appears in each row) ── */}
            <div className="grid grid-cols-2 md:hidden">
              <div
                className="flex items-center justify-center px-3 py-3"
                style={{ background: "hsl(0 85% 44%)", borderTopLeftRadius: "1rem" }}
              >
                <span className="font-extrabold text-white text-[11px] leading-tight text-center">
                  Texas Total Security (Local Provider)
                </span>
              </div>
              <div
                className="flex items-center justify-center px-3 py-3"
                style={{ background: "hsl(0 0% 20%)", borderLeft: "1px solid hsl(0 0% 27%)", borderTopRightRadius: "1rem" }}
              >
                <span className="font-extrabold text-[11px] leading-tight text-center" style={{ color: "hsl(0 0% 58%)" }}>
                  Big National Alarm Company/Franchises
                </span>
              </div>
            </div>

            {/* ── Rows ── */}
            {comparisonRows.map((row, i) => {
              const rowBg = i % 2 === 0 ? "white" : "hsl(0 0% 99%)";
              const ttsBg  = i % 2 === 0 ? "hsl(0 80% 97.5%)" : "hsl(0 80% 96.5%)";
              const natBg  = i % 2 === 0 ? "hsl(0 0% 97%)"    : "hsl(0 0% 96%)";
              return (
                <div key={i} style={{ borderTop: "1px solid hsl(0 0% 91%)" }}>

                  {/* Desktop row: 3-col grid */}
                  <div className="hidden md:grid grid-cols-[0.85fr_1.2fr_1.2fr]">
                    <div
                      className="px-6 lg:px-8 py-5 flex items-center"
                      style={{ background: rowBg }}
                    >
                      <span
                        className="font-extrabold leading-snug"
                        style={{ fontSize: "clamp(0.82rem, 1.35vw, 0.95rem)", color: "hsl(0 0% 16%)" }}
                      >
                        {row.feature}
                      </span>
                    </div>

                    {/* TTS detail */}
                    <div className="px-5 py-5" style={{ background: ttsBg, borderLeft: "1px solid hsl(0 70% 90%)" }}>
                      <div className="font-extrabold text-red-700 leading-tight mb-1.5" style={{ fontSize: "0.9rem" }}>
                        {row.localTitle}
                      </div>
                      <p className="text-gray-700 leading-relaxed" style={{ fontSize: "0.82rem" }}>
                        {row.localBody}
                      </p>
                    </div>

                    {/* National detail */}
                    <div className="px-5 py-5" style={{ background: natBg, borderLeft: "1px solid hsl(0 0% 90%)" }}>
                      <div className="font-extrabold leading-tight mb-1.5" style={{ color: "hsl(0 0% 31%)", fontSize: "0.9rem" }}>
                        {row.nationalTitle}
                      </div>
                      <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.82rem" }}>
                        {row.nationalBody}
                      </p>
                    </div>
                  </div>

                  {/* Mobile row: feature full-width, verdicts side-by-side below */}
                  <div className="md:hidden" style={{ background: rowBg }}>
                    <div className="px-4 pt-3 pb-2.5">
                      <span className="font-extrabold text-gray-900 leading-snug" style={{ fontSize: "0.9rem" }}>
                        {row.feature}
                      </span>
                    </div>
                    <div className="grid grid-cols-2" style={{ borderTop: "1px solid hsl(0 0% 93%)" }}>
                      <div className="px-3 py-3" style={{ background: ttsBg }}>
                        <div className="font-extrabold text-red-700 leading-tight mb-1" style={{ fontSize: "0.75rem" }}>
                          {row.localTitle}
                        </div>
                        <p className="text-gray-700 leading-relaxed" style={{ fontSize: "0.68rem" }}>
                          {row.localBody}
                        </p>
                      </div>
                      <div className="px-3 py-3" style={{ background: natBg, borderLeft: "1px solid hsl(0 0% 91%)" }}>
                        <div className="font-extrabold leading-tight mb-1" style={{ color: "hsl(0 0% 31%)", fontSize: "0.75rem" }}>
                          {row.nationalTitle}
                        </div>
                        <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.68rem" }}>
                          {row.nationalBody}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* ── CTA footer ── */}
            <div
              style={{
                borderTop: "1px solid hsl(0 0% 89%)",
                background: "hsl(0 0% 98%)",
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <p className="text-gray-500" style={{ fontSize: "0.82rem" }}>
              
              </p>
              <a
                href="/free-analysis"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-bold uppercase tracking-[0.11em] transition-opacity duration-200 hover:opacity-85 whitespace-nowrap shrink-0"
                style={{ background: "hsl(0 85% 44%)", color: "white", fontSize: "clamp(0.66rem, 1.2vw, 0.73rem)" }}
              >
                Get a Free Security Analysis
                <ArrowRight className="w-3 h-3 shrink-0" />
              </a>
            </div>

          </motion.div>
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

          <div className="grid gap-2 lg:grid-cols-2 lg:items-start">
            {homepageFaqs.map((faq, i) => {
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.55, ease: easeExpo, delay: 0.1 }}
            className="mt-7 flex justify-center"
          >
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-800 shadow-sm transition-all hover:border-red-200 hover:text-red-600 hover:shadow-md"
            >
              View the Full Security FAQ <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
