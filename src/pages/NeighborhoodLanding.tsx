import { useParams, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import LeadForm from "@/components/LeadForm";
import { getNeighborhood } from "@/lib/neighborhoodData";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import {
  Shield, Camera, Radio, Home, Building2,
  CheckCircle2, MapPin, ArrowRight, Star,
  Phone, Award, PhoneCall, Plus, Minus,
  Zap, Eye, Lock,
} from "lucide-react";

/* ─── Animation variants ────────────────────────────────────── */
const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };

const fadeUp   = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight= { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

/* ─── Static company-wide data ──────────────────────────────── */
const companyDifferentiators = [
  { icon: MapPin,    title: "Talk to the Owner Directly",     desc: "Locally owned — not a franchise. Reach the owner of the company directly, no hold queues, no call centers." },
  { icon: Radio,     title: "Verizon Cellular Monitoring",    desc: "Your system communicates over Verizon cellular. Works even when your Wi-Fi goes down or phone lines fail." },
  { icon: PhoneCall, title: "We Call You First",              desc: "When equipment flags an issue, we reach out before you even know there's a problem. Proactive — not reactive." },
  { icon: Star,      title: "5-Star Google Rated",            desc: "Every review earned from a customer we genuinely cared for. Accountable long after installation." },
  { icon: Award,     title: "Competitive Monitoring Rates",   desc: "Many customers who switch pay less on monthly monitoring — often keeping their existing equipment." },
  { icon: Shield,    title: "Managed by Texas Total Security", desc: "Your account relationship stays with Texas Total Security, with alarm signals handled through our certified San Antonio partner monitoring center." },
];

const processSteps = [
  { num: "01", icon: PhoneCall, title: "Discovery Call",           desc: "Speak with a local specialist about your property, existing equipment, and security goals. Zero pressure." },
  { num: "02", icon: Eye,       title: "Free Property Assessment", desc: "We visit your property, evaluate every entry point and blind spot, and design a custom solution." },
  { num: "03", icon: Zap,       title: "Same-Day Installation",    desc: "Most installations complete in a single visit. Licensed technicians. No disruption to your household or tenants." },
  { num: "04", icon: Lock,      title: "24/7 Monitoring & Support", desc: "Verizon cellular monitoring from day one. We proactively alert you to equipment issues before you notice them." },
];

const serviceIcons = [Shield, Camera, Home, Building2, Radio, Star];

const realReviews = [
  {
    text: "What really stood out was how Texas Total Security described in such detail and confidence the process and exactly what I would be getting. They delivered on every promise.",
    name: "Homeowner",
    loc: "Bellaire, TX",
  },
  {
    text: "They provided great coverage for our entrance and exit gates, plus active deterrence with strobe lights. Their license plate cameras are outstanding.",
    name: "Property Manager",
    loc: "River Oaks, TX",
  },
  {
    text: "Switched from ADT — love that they are a local Houston alarm company. Communication and customer service is awesome. Highly recommend!",
    name: "Homeowner",
    loc: "Houston, TX",
  },
];

/* ─── Google G SVG ──────────────────────────────────────────── */
const GoogleG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

/* ─── Component ─────────────────────────────────────────────── */
const NeighborhoodLanding = () => {
  const { neighborhoodSlug } = useParams<{ neighborhoodSlug: string }>();
  const neighborhood = neighborhoodSlug ? getNeighborhood(neighborhoodSlug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!neighborhood) return <Navigate to="/service-areas" replace />;

  const schemas = [
    generateLocalBusinessSchema(neighborhood.name),
    generateServiceSchema(
      `Security Systems in ${neighborhood.name}`,
      `Professional hardwired alarm systems, camera networks, and 24/7 monitoring in ${neighborhood.fullName}.`,
      `/neighborhoods/${neighborhood.slug}`
    ),
    generateFAQSchema(neighborhood.faqs.map(f => ({ question: f.question, answer: f.answer }))),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Service Areas", href: "/service-areas" },
      { name: `${neighborhood.name} Security Systems`, href: `/neighborhoods/${neighborhood.slug}` },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title={neighborhood.metaTitle}
        description={neighborhood.metaDescription}
        schemas={schemas}
      />

      {/* ══════════════════════════════════════════════════
          HERO — premium service-page treatment
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.92)_46%,rgba(10,10,10,0.76)_100%)]" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_430px] gap-7 lg:gap-9 items-center">
            <motion.div variants={fadeLeft} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo }}>
              <div className="flex items-center gap-2 mb-5">
                <Link to="/service-areas" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/35 transition-colors hover:text-white/65">
                  Service Areas
                </Link>
                <span className="text-white/20 text-[10px]">/</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-red-200">
                  {neighborhood.name}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-red-500/25 bg-red-500/10 mb-5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                  {neighborhood.fullName} · Zip {neighborhood.zipCode}
                </span>
              </div>

              <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
                {neighborhood.headline}
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
                {neighborhood.intro}
              </p>

              <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
                {[
                  { icon: Star, label: "5-Star", sublabel: "Google rated" },
                  { icon: Shield, label: "Licensed", sublabel: "B03066901" },
                  { icon: Radio, label: "Verizon", sublabel: "cellular monitoring" },
                  { icon: Camera, label: "Hardwired", sublabel: "alarms & cameras" },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
                    <item.icon className="w-4 h-4 text-red-400 mb-2" />
                    <p className="font-display text-[15px] font-bold text-white">{item.label}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">{item.sublabel}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/property-assessment"
                  className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold"
                >
                  Get Free Property Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:7133879937"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="w-4 h-4" /> (713) 387-9937
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}
              className="border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm shadow-2xl shadow-black/30"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-200">Local System Strategy</p>
                  <h2 className="font-display mt-2 text-2xl font-bold text-white">{neighborhood.name} Coverage Priorities</h2>
                </div>
                <span className="flex h-11 w-11 items-center justify-center bg-red-500 text-white">
                  <Shield className="h-5 w-5" />
                </span>
              </div>

              <div className="py-4 space-y-2.5">
                {neighborhood.propertyTypes.slice(0, 5).map((type) => (
                  <div key={type} className="flex gap-3 border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white/65">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                    <span>{type}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {["Alarm systems", "4K cameras", "LPR & gates", "Monitoring"].map((item) => (
                  <div key={item} className="border border-white/10 bg-black/20 px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECURITY CONTEXT — why this area needs us
      ══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] gap-6 lg:gap-8 items-stretch">

            {/* Left — text */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.8, ease: easeExpo }}
              className="border border-gray-200 bg-white p-6 sm:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>
                  Local Security Context
                </span>
              </div>
              <h2
                className="font-display font-bold text-gray-900 mb-4"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
              >
                Why {neighborhood.name} Properties Need Professional Security
              </h2>
              <p className="text-[14.5px] text-gray-600 leading-relaxed mb-6">{neighborhood.securityContext}</p>

              <Link
                to="/property-assessment"
                className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
              >
                Request a Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right — property types */}
            {neighborhood.propertyTypes.length > 0 && (
              <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.8, ease: easeExpo }}>
                <div
                  className="h-full border border-gray-200 bg-[#f7f7f8] p-6 sm:p-7"
                >
                  <h3 className="font-display font-semibold text-gray-900 mb-4 text-[15px]">
                    Property Types We Serve in {neighborhood.name}
                  </h3>
                  <ul className="space-y-3">
                    {neighborhood.propertyTypes.map(type => (
                      <li key={type} className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 bg-red-50 border border-red-100">
                          <CheckCircle2 className="w-3 h-3" style={{ color: "hsl(0 85% 50%)" }} />
                        </div>
                        <span className="text-[13.5px] text-gray-700 leading-snug">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-[#f7f7f8] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65, ease: easeExpo }} className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>What We Install</span>
              </div>
              <h2 className="font-display font-bold text-gray-900" style={{ fontSize: "clamp(1.45rem, 2.6vw, 1.9rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
                Security Services in {neighborhood.name}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-500">
              Designed around property type, camera sightlines, entry points, and the way people actually move through this area.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {neighborhood.services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
                  className="group border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_14px_34px_rgba(127,29,29,0.1)]"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-3.5 bg-gray-950 transition-colors group-hover:bg-red-600">
                    <Icon className="w-4.5 h-4.5" style={{ color: "white", width: "18px", height: "18px" }} />
                  </div>
                  <h3 className="font-display font-bold text-gray-950 mb-1.5 leading-snug" style={{ fontSize: "14px" }}>{service.title}</h3>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY TEXAS TOTAL SECURITY — dark section
      ══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 relative overflow-hidden bg-neutral-950">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(190,18,60,0.12),transparent_65%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65, ease: easeExpo }} className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 60%)" }}>Why Choose Us</span>
            </div>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(1.45rem, 2.6vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
            >
              Why {neighborhood.name} Chooses Texas Total Security
            </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/50">
              Local installation, clean cabling, monitoring accountability, and service after the job is complete.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-9">
            {(neighborhood.whyUs.length >= 4 ? neighborhood.whyUs : companyDifferentiators).map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.06 }}
                className="border border-white/10 bg-white/[0.045] p-4"
              >
                <h3 className="font-semibold text-white mb-1.5" style={{ fontSize: "13px" }}>{item.title}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA row */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6, ease: easeExpo }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link to="/about" className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-3 text-sm font-bold">
              About Texas Total Security <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:7133879937"
              className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.045] px-5 py-3 font-bold text-white transition-all duration-200 hover:bg-white/10"
              style={{ fontSize: "0.95rem" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "hsl(0 85% 50%)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.045)"; }}
            >
              <Phone className="w-4 h-4 shrink-0" style={{ color: "hsl(0 85% 58%)" }} />
              (713) 387-9937
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS — 4 steps, light section
      ══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65, ease: easeExpo }} className="mb-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>How It Works</span>
            </div>
            <h2 className="font-display font-bold text-gray-900" style={{ fontSize: "clamp(1.45rem, 2.6vw, 1.9rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              From First Call to 24/7 Protection
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.08 }}
                className="relative border border-gray-200 bg-[#f7f7f8] p-5"
              >
                <div className="inline-flex items-center justify-center w-9 h-9 mb-4 bg-gray-950 font-display font-bold text-sm text-white">
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5 text-[13.5px] leading-snug">{step.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS — Google-branded
      ══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-[#f7f7f8] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65, ease: easeExpo }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>Verified Google Reviews</span>
              </div>
              <h2 className="font-display font-bold text-gray-900" style={{ fontSize: "clamp(1.45rem, 2.6vw, 1.9rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
                What Houston Clients Say
              </h2>
            </div>
            <div className="inline-flex items-center gap-2.5 border border-gray-200 bg-white px-4 py-2.5 shrink-0">
              <GoogleG className="w-5 h-5 shrink-0" />
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-bold text-gray-900 text-sm">5.0</span>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3" style={{ fill: "hsl(0 85% 50%)", color: "hsl(0 85% 50%)" }} />)}</div>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Rated on Google</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {realReviews.map((r, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.55, ease: easeExpo, delay: 0.08 + i * 0.08 }} className="flex flex-col border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <GoogleG className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-semibold" style={{ color: "hsl(0 0% 50%)" }}>Google Review</span>
                  </div>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3 h-3" style={{ fill: "hsl(0 85% 50%)", color: "hsl(0 85% 50%)" }} />)}</div>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed flex-1 mb-4">"{r.text}"</p>
                <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid hsl(0 0% 91%)" }}>
                  <div className="w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0 bg-red-50 text-red-600">{r.name.charAt(0)}</div>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900 leading-none mb-0.5">{r.name}</p>
                    <p className="text-[10.5px] text-gray-400">{r.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14" style={{ background: "white", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6, ease: easeExpo }} className="mb-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>FAQ</span>
            </div>
            <h2 className="font-display font-bold text-gray-900" style={{ fontSize: "clamp(1.45rem, 2.6vw, 1.9rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              {neighborhood.name} Security Systems — Common Questions
            </h2>
          </motion.div>

          <div className="space-y-2">
            {neighborhood.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.question}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.5, ease: easeExpo, delay: i * 0.06 }}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-display font-semibold text-gray-900 text-[14.5px] leading-snug text-left">
                      {faq.question}
                    </h3>
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{ background: isOpen ? "hsl(0 85% 50%)" : "hsl(0 0% 93%)" }}
                    >
                      {isOpen
                        ? <Minus className="w-3.5 h-3.5 text-white" />
                        : <Plus  className="w-3.5 h-3.5 text-gray-500" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-5">
                          <p className="text-[13.5px] text-gray-500 leading-relaxed">{faq.answer}</p>
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

      {/* ══════════════════════════════════════════════════
          LEAD FORM CTA — dark
      ══════════════════════════════════════════════════ */}
      <section
        className="py-12 sm:py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 55% 7%) 60%, hsl(0 0% 4%) 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 55% at 50% 0%, hsl(0 85% 38% / 0.1), transparent 65%)" }} />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "hsl(0 85% 45% / 0.12)", border: "1px solid hsl(0 85% 45% / 0.22)" }}>
              <MapPin className="w-3 h-3" style={{ color: "hsl(0 85% 60%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(0 75% 65%)" }}>{neighborhood.name}</span>
            </div>
            <h2
              className="font-display font-bold text-white mb-3"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
            >
              Get Your Free {neighborhood.name} Security Assessment
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "30rem", margin: "0 auto" }}>
              A local specialist will visit your property, evaluate every vulnerability, and deliver a custom proposal — no cost, no obligation.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo, delay: 0.1 }}>
            <LeadForm
              title={`Free Security Assessment — ${neighborhood.name}`}
              subtitle={`Guided or quick request for ${neighborhood.fullName}. This submission is tagged automatically with the area, ZIP code, and neighborhood page.`}
              showServiceType
              defaultServiceType="analysis"
              defaultCity={neighborhood.name}
              defaultZip={neighborhood.zipCode}
              referringPage={`/neighborhoods/${neighborhood.slug}`}
              areaName={neighborhood.name}
              areaSlug={neighborhood.slug}
              areaZip={neighborhood.zipCode}
              formContext="neighborhood"
              compact
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICE LINKS
      ══════════════════════════════════════════════════ */}
      <div style={{ background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mr-1">Explore:</span>
            {[
              { label: "Alarm Systems",        href: "/alarm-systems" },
              { label: "Security Cameras",     href: "/security-cameras" },
              { label: "Residential Security", href: "/residential" },
              { label: "Commercial Security",  href: "/commercial" },
              { label: "HOA Security",         href: "/hoa-security" },
              { label: "Monitoring Services",  href: "/monitoring-services" },
              { label: "All Service Areas",    href: "/service-areas" },
            ].map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition-all duration-150"
                style={{ background: "white", border: "1px solid hsl(0 0% 89%)", color: "hsl(0 0% 35%)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(0 85% 50%)"; (e.currentTarget as HTMLAnchorElement).style.color = "hsl(0 85% 50%)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(0 0% 89%)"; (e.currentTarget as HTMLAnchorElement).style.color = "hsl(0 0% 35%)"; }}
              >
                {link.label} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default NeighborhoodLanding;
