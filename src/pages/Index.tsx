import { motion, useScroll, useSpring } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import SecurityShowdownChart from "@/components/SecurityShowdownChart";

import {
  generateItemListSchema,
  generateComprehensiveHomepageSchema,
  generateSiteLinksSearchBoxSchema,
  generateSpecialAnnouncementSchema,
} from "@/lib/seo";
import {
  Shield, Building2, Radio, Home, Camera,
  ArrowRight, Phone, CheckCircle2, XCircle, Star, Briefcase,
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
  accentLineIndex?: number; // which line index gets the brand-red color
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
      "Unhappy with your current alarm company?",
      "Don't let a bad system put your property at risk.",
    ],
    accentLineIndex: 0,
    sub: "Are you tired of false alarms, hidden fees, and unresponsive support? Upgrade your peace of mind with a completely Free, No-Obligation Onsite Security Analysis from our Houston-based experts.",
    cta: { label: "Call Now: (713) 387-9937", href: "tel:7133879937" },
    ctas: [
      { label: "Call Now: (713) 387-9937", href: "tel:7133879937", external: true },
      { label: "Schedule My Free Analysis", href: "/free-analysis" },
    ],
    bg: "/imgi_8_qtq80-BdoLjp-2048x1367.jpg",
    overlay: "rgba(0,0,0,0.78)",
  },
  {
    eyebrow: "Locally Owned · Licensed & Insured · Houston Based · 5 Star On Google",
    headline: [
      "Make the switch to a",
      "Local & Reliable",
      "Security Company",
    ],
    accentLineIndex: 1,
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
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "60vh", maxHeight: "84vh", display: "flex", flexDirection: "column", background: "white" }}>

        {/* Full-bleed background */}
        <img
          src="/herobanner.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover z-0" style={{ objectPosition: "center 70%" }}
        />

        {/* Overlay — strong on mobile, left-weighted on desktop */}
        <div
          className="absolute inset-0 z-[1] sm:hidden"
          style={{ background: "rgba(255,255,255,0.88)" }}
        />
        <div
          className="absolute inset-0 z-[1] hidden sm:block"
          style={{ background: "linear-gradient(100deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0.55) 68%, rgba(255,255,255,0.05) 100%)" }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-[3px] z-20" style={{ background: "linear-gradient(90deg, hsl(0 85% 44%), hsl(0 85% 44%) 50%, transparent)" }} />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-[56rem] px-6 sm:px-10 lg:px-16 xl:px-20 pt-10 pb-20 lg:pt-16 lg:pb-28">

            {/* Headline */}
            <h1
              className="font-display font-black mb-5"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.2rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}
            >
              {hero.headline.map((line, idx) => (
                <span
                  key={idx}
                  className="block"
                  style={idx === (hero.accentLineIndex ?? 1) ? { color: "hsl(0 85% 40%)" } : { color: "#0a0a0a" }}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p
              className="mb-8 leading-relaxed text-[1.05rem] font-medium max-w-xl"
              style={{ color: "#1a1a1a", paddingLeft: "0.875rem", borderLeft: "2px solid hsl(0 85% 44% / 0.55)" }}
            >
              {hero.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <motion.a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 text-white text-sm rounded-lg"
                style={{ background: "linear-gradient(135deg, hsl(0 85% 44%), hsl(0 90% 34%))", boxShadow: "0 4px 20px hsl(0 85% 30% / 0.38)" }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4 shrink-0" />
                Call Now: (713) 387-9937
              </motion.a>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  to="/free-analysis"
                  className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 text-sm rounded-lg w-full sm:w-auto transition-colors"
                  style={{ border: "1.5px solid rgba(0,0,0,0.16)", background: "rgba(255,255,255,0.88)", color: "#111" }}
                >
                  Free Onsite Security Analysis
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          MAKE THE SWITCH — banner
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 91%)", borderBottom: "1px solid hsl(0 0% 91%)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-5 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.26em]" style={{ color: "hsl(0 85% 50%)" }}>
                  Locally Owned · Houston Based
                </span>
              </div>
              <h2
                className="font-display font-black text-gray-950 leading-tight mb-4"
                style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", letterSpacing: "-0.03em" }}
              >
                Make the switch to a{" "}
                <span style={{ color: "hsl(0 85% 40%)" }}>Local & Reliable</span>{" "}
                Security Company
              </h2>
              <p className="text-gray-600 leading-relaxed text-[1rem] max-w-xl">
                Our goal at Texas Total Security is to provide our customers with comfort and peace of mind knowing that their business, family and/or assets are safe.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/switch-my-alarm"
                  className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 text-white text-sm rounded-lg whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, hsl(0 85% 44%), hsl(0 90% 34%))", boxShadow: "0 4px 16px hsl(0 85% 30% / 0.30)" }}
                >
                  Switch Your Alarm Company
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </motion.div>
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-lg px-6 py-3.5 transition-colors whitespace-nowrap"
                style={{ border: "1.5px solid rgba(0,0,0,0.13)", color: "#111", background: "#fff" }}
              >
                <Phone className="w-4 h-4 shrink-0" style={{ color: "hsl(0 85% 44%)" }} />
                (713) 387-9937
              </a>
            </div>
          </motion.div>
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
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
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
                      <div className="relative h-[240px] sm:h-[280px] lg:h-[320px] overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.label}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          style={i === 1 ? { objectPosition: "center 35%" } : undefined}
                          loading="lazy"
                        />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)" }} />
                        <div
                          className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-lg"
                          style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                        >
                          <Icon className="h-5 w-5" style={{ color: "hsl(0 85% 46%)" }} />
                        </div>
                      </div>
                      <div className="bg-white p-5 sm:p-6 lg:p-7">
                        <h3
                          className="font-bold leading-tight mb-4"
                          style={{ fontSize: "clamp(1.35rem, 2.8vw, 1.75rem)", letterSpacing: "-0.02em", color: "hsl(0 0% 12%)" }}
                        >
                          {title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: "hsl(0 85% 46%)" }}>{ctaLabel}</span>
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
          BRAND STATEMENT
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", borderTop: "1px solid hsl(0 0% 91%)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-6 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: "hsl(0 85% 50%)" }}>
                Locally Owned · Houston, TX
              </span>
            </div>
            <h2
              className="font-display font-black text-gray-950 leading-[1.06] mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", letterSpacing: "-0.035em" }}
            >
              Welcome to Texas Total Security.
              <br />
              <span style={{ color: "hsl(0 85% 40%)" }}>There is a difference.</span>
            </h2>
            <p className="text-gray-800 leading-[1.85] text-[1.1rem] max-w-3xl">
              We are your local alarm company, rooted right here in Houston. While big national corporations treat you like an account number in an overseas call center, our friendly, local staff actually knows your name. With technicians right around the corner, we protect your family with the speed and care of a true neighbor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          US VS THEM — comparison table
      ══════════════════════════════════════════════════ */}
      <section id="local-vs-national" style={{ scrollMarginTop: "6rem", background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 91%)", borderBottom: "1px solid hsl(0 0% 91%)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">

          {/* ── Table header ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="pb-7"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-5 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.26em]" style={{ color: "hsl(0 85% 50%)" }}>
                The Difference Is Clear
              </span>
            </div>
            <h3
              className="font-extrabold text-gray-900 leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.025em" }}
            >
              Texas Total Security
              <span className="font-light" style={{ color: "hsl(0 85% 48%)" }}> vs. </span>
              Big National Alarm Companies
            </h3>
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
                Free Onsite Security Analysis
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
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

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
          SECURITY SHOWDOWN CHART TEASER
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 91%)", borderBottom: "1px solid hsl(0 0% 91%)" }}>

        {/* Subtle red tint at top */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent 10%, hsl(0 85% 44% / 0.25) 40%, hsl(0 85% 44% / 0.25) 60%, transparent 90%)" }} />

        {/* ── Title block ── */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-10 sm:pb-12 text-center">

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.5, ease: easeExpo }}
            className="flex justify-center mb-5"
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{ background: "hsl(0 85% 44% / 0.07)", border: "1px solid hsl(0 85% 44% / 0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "hsl(0 85% 44%)" }}>
                The Security Showdown
              </span>
            </div>
          </motion.div>

          {/* Main title */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo, delay: 0.06 }}
            className="font-display font-black text-gray-950 leading-[1.02] mb-5"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            Texas Total Security
            <span style={{ color: "hsl(0 85% 42%)" }}> vs.</span>
            <br className="hidden sm:block" />{" "}DIY Wi-Fi Cameras
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.1 }}
            className="max-w-xl mx-auto leading-relaxed mb-10 text-gray-500"
            style={{ fontSize: "clamp(0.92rem, 1.5vw, 1.05rem)" }}
          >
            Six critical categories. One clear winner. See exactly where off-the-shelf Wi-Fi cameras fall short — and what a professional hardwired system delivers instead.
          </motion.p>

          {/* VS chips */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.14 }}
            className="inline-grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6 max-w-md mx-auto"
          >
            {/* TTS label */}
            <div className="flex flex-col items-center gap-1 text-center">
              <img src="/logo.png" alt="Texas Total Security" className="w-8 h-8 object-contain" />
              <p className="text-[13px] font-black leading-tight" style={{ color: "hsl(0 85% 42%)" }}>Texas Total Security</p>
              <p className="text-[10px] text-gray-500">Hardwired · Professional</p>
            </div>
            {/* VS divider */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-px h-8" style={{ background: "hsl(0 0% 88%)" }} />
              <p className="font-black text-[11px] text-gray-400">VS</p>
              <div className="w-px h-8" style={{ background: "hsl(0 0% 88%)" }} />
            </div>
            {/* DIY label */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-[13px] font-black text-gray-900 leading-tight">DIY Wi-Fi Cameras</p>
              <p className="text-[10px] text-gray-500">Wireless · Self-Installed</p>
            </div>
          </motion.div>

        </div>

        {/* ── Chart ── */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo, delay: 0.06 }}
          >
            <SecurityShowdownChart />
          </motion.div>

          {/* Read more link */}
          <div className="flex justify-center mt-6">
            <Link
              to="/blog/security-showdown-hardwired-vs-wifi-cameras"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{ color: "hsl(0 85% 44%)" }}
            >
              Read the full breakdown article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          FREE ONSITE SECURITY ANALYSIS
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ borderTop: "1px solid hsl(0 0% 91%)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* Left — logobg image with white corner vignette */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.9, ease: easeExpo }}
            className="relative min-h-[280px] lg:min-h-0 order-2 lg:order-1"
          >
            <img
              src="/logobg.jpg"
              alt="Texas Total Security — Free Onsite Security Analysis"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* White corner vignette — blends image edges into the white section */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  "radial-gradient(ellipse 55% 45% at 0% 0%, rgba(255,255,255,0.82) 0%, transparent 60%)",
                  "radial-gradient(ellipse 55% 45% at 100% 0%, rgba(255,255,255,0.82) 0%, transparent 60%)",
                  "radial-gradient(ellipse 55% 45% at 0% 100%, rgba(255,255,255,0.82) 0%, transparent 60%)",
                  "radial-gradient(ellipse 55% 45% at 100% 100%, rgba(255,255,255,0.82) 0%, transparent 60%)",
                ].join(", "),
              }}
            />
          </motion.div>

          {/* Right — content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.85, ease: easeExpo }}
            className="flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-14 xl:px-16 order-1 lg:order-2"
            style={{ background: "#ffffff" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-5 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.26em]" style={{ color: "hsl(0 85% 50%)" }}>
                No Obligation · No Commitment
              </span>
            </div>

            <h2
              className="font-display font-black text-gray-950 leading-tight mb-7"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", letterSpacing: "-0.03em" }}
            >
              Free Onsite<br />Security Analysis
            </h2>

            {/* 4-step process */}
            <ol className="mb-8">
              {[
                { title: "Meets You Onsite",      body: "Security Pro meets with you onsite at your home or business" },
                { title: "Reviews Your System",   body: "Talks about current security system, upgrades, or plans for a new one" },
                { title: "Inspects the Property", body: "Examines layout and gathers information regarding equipment" },
                { title: "Presents Your Plan",    body: "Comes up with solutions, ideas, and discusses a plan of action" },
              ].map((step, i) => (
                <li key={i} className="flex flex-col items-center">
                  {/* Step row */}
                  <div className="flex items-center gap-4 w-full">
                    {/* Circle */}
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-base"
                      style={{ background: "linear-gradient(135deg, hsl(0 85% 46%) 0%, hsl(0 90% 34%) 100%)", boxShadow: "0 4px 14px hsl(0 85% 36% / 0.28)" }}
                    >
                      {i + 1}
                    </div>
                    {/* Text */}
                    <div
                      className="flex-1 rounded-xl px-4 py-3.5"
                      style={{ background: "hsl(0 0% 98%)", border: "1px solid hsl(0 0% 91%)" }}
                    >
                      <p className="font-display font-black text-[1rem] leading-tight" style={{ color: "hsl(0 85% 40%)" }}>{step.title}</p>
                      <p className="text-gray-800 text-[0.88rem] leading-relaxed mt-1">{step.body}</p>
                    </div>
                  </div>

                  {/* Downward arrow connector */}
                  {i < 3 && (
                    <div className="flex flex-col items-center" style={{ marginLeft: "5.5rem", alignSelf: "flex-start" }}>
                      <div className="w-px h-3" style={{ background: "hsl(0 85% 44% / 0.25)" }} />
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="hsl(0 85% 44%)" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="w-px h-3" style={{ background: "hsl(0 85% 44% / 0.25)" }} />
                    </div>
                  )}
                </li>
              ))}
            </ol>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/free-analysis"
                className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 text-white text-sm rounded-lg"
                style={{ background: "linear-gradient(135deg, hsl(0 85% 44%), hsl(0 90% 34%))", boxShadow: "0 4px 18px hsl(0 85% 30% / 0.32)" }}
              >
                Schedule My Free Analysis
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 font-semibold text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Phone className="w-4 h-4" style={{ color: "hsl(0 85% 44%)" }} />
                (713) 387-9937
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CONVERSION STRIP
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(0 60% 8%) 55%, hsl(0 0% 5%) 100%)" }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 80% at 50% 110%, hsl(0 85% 38% / 0.18), transparent 65%)" }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent 10%, hsl(0 85% 44% / 0.4) 40%, hsl(0 85% 44% / 0.4) 60%, transparent 90%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12">

          {/* Conversion copy + CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo }}
            className="text-center"
          >
            <h2
              className="font-display font-black text-white mb-4 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", letterSpacing: "-0.04em" }}
            >
              Don't wait for a break-in to realize<br className="hidden sm:block" /> your alarm company failed you.
            </h2>
            <p className="mb-9 max-w-2xl mx-auto leading-relaxed font-medium" style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.70)" }}>
              Claim your{" "}
              <strong className="text-white font-bold">FREE Onsite Security Analysis</strong>{" "}
              today.{" "}
              <span style={{ color: "hsl(0 85% 65%)" }}>Spots are limited this week.</span>
            </p>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block w-full sm:w-auto"
            >
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-3 font-black text-white rounded-2xl w-full sm:w-auto"
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  letterSpacing: "-0.01em",
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg, hsl(0 85% 46%) 0%, hsl(0 90% 32%) 100%)",
                  boxShadow: "0 0 0 1px hsl(0 85% 44% / 0.4), 0 6px 32px hsl(0 85% 28% / 0.55), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <Phone className="w-5 h-5 shrink-0" />
                Call Now: (713) 387-9937
              </a>
            </motion.div>
            <p className="mt-4 text-[12px] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.32)" }}>
              No commitment. No obligation. Local Houston experts.
            </p>
          </motion.div>

          {/* Reviews row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10"
          >
            {[
              { quote: "Switched from ADT — love that they're local. Communication and service is awesome.", author: "Homeowner, Houston TX" },
              { quote: "They installed cameras and an alarm system. The owner Tim Townsend is very knowledgeable. Would recommend to everyone.", author: "Homeowner, Houston TX" },
              { quote: "Great coverage for our entrance gates with active deterrence. Their license plate cameras are outstanding.", author: "Property Manager, River Oaks TX" },
            ].map((r, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-4"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-3 h-3" style={{ fill: "hsl(0 85% 52%)", color: "hsl(0 85% 52%)" }} />
                  ))}
                </div>
                <p className="text-[12.5px] leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.78)" }}>"{r.quote}"</p>
                <p className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>— {r.author}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

    </Layout>
  );
};

export default Index;
