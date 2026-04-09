import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import CTABlock from "@/components/CTABlock";
import LeadForm from "@/components/LeadForm";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";
import {
  AlertTriangle, Shield, Camera, Home, Building2,
  ArrowRight, Phone, CheckCircle2, TrendingUp, Lock,
  Eye, Radio, MapPin, Users, Zap,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };

const fadeUp   = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight= { hidden: { opacity: 0, x: 28  }, show: { opacity: 1, x: 0 } };

const problems = [
  {
    icon: Home,
    stat: "#4",
    label: "Burglary Rate in Texas",
    desc: "Houston consistently ranks among the highest in residential burglary. Most break-ins happen between 10 AM–3 PM when homes are empty — and most are preventable with a proper alarm system.",
  },
  {
    icon: Camera,
    stat: "Top 3",
    label: "Vehicle Theft City in the U.S.",
    desc: "Harris County leads Texas in auto theft. Parking lot cameras, active deterrence systems, and LPR cameras are proven tools to reduce theft and recover stolen property faster.",
  },
  {
    icon: Building2,
    stat: "60%",
    label: "Of Break-Ins Are Preventable",
    desc: "Security research shows that 60% of burglars will abandon a target if they spot a visible security camera or active alarm system. Deterrence saves your home before anything happens.",
  },
  {
    icon: AlertTriangle,
    stat: "3 Min",
    label: "Avg. Burglary Duration",
    desc: "Intruders are in and out in under 3 minutes. That's why real-time alarm monitoring with local dispatch — not a distant national call center — is the only way to catch threats in time.",
  },
];

const solutions = [
  {
    icon: Shield,
    title: "Local Alarm Systems",
    desc: "Custom-designed alarm systems with 24/7 Houston-based monitoring. We never outsource your monitoring to a national call center.",
    href: "/alarm-systems",
  },
  {
    icon: Camera,
    title: "Security Camera Systems",
    desc: "HD cameras, license plate recognition, active deterrence, and security poles — covering every angle of your property.",
    href: "/security-cameras",
  },
  {
    icon: Home,
    title: "Residential Security",
    desc: "Whole-home protection tailored to your neighborhood. Sensors, cameras, smart integration, and 24/7 local monitoring.",
    href: "/residential",
  },
  {
    icon: Building2,
    title: "Commercial Security",
    desc: "From small businesses to industrial complexes — scalable alarm and surveillance systems for every commercial property.",
    href: "/commercial",
  },
  {
    icon: Users,
    title: "HOA & Community Security",
    desc: "Gate cameras, LPR, community surveillance, and neighborhood-wide security systems for HOAs and apartment complexes.",
    href: "/hoa-security",
  },
  {
    icon: Radio,
    title: "24/7 Local Monitoring",
    desc: "Our Houston-based dispatch center never sleeps. When an alarm triggers, local operators contact local authorities — immediately.",
    href: "/monitoring-services",
  },
];

const neighborhoods = [
  "Memorial", "River Oaks", "Bellaire", "West University Place",
  "The Heights", "Midtown", "Montrose", "Sugar Land",
  "Katy", "Cypress", "The Woodlands", "Richmond",
];

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Houston Security Problem", href: "/houston-we-have-a-problem" },
  ]),
];

const HoustonProblem = () => (
  <Layout>
    <SEOHead
      title="Houston, We Have a Problem | Security Solutions for Houston TX | Texas Total Security"
      description="Houston's property crime, burglary, and vehicle theft rates are rising. Texas Total Security is Houston's #1 local alarm company — alarm systems, security cameras, HOA surveillance & 24/7 local monitoring. Call (713) 387-9937."
      schemas={schemas}
    />

    {/* ══ HERO ══════════════════════════════════════════════ */}
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        background: "hsl(0 0% 3%)",
        minHeight: "100vh",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
          alt="Houston cityscape security"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      {/* Red radial bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 20% 50%, hsl(0 85% 45% / 0.15), transparent 65%)",
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.018,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(0 0% 3%) 0%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeExpo }}
          className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full border"
          style={{
            background: "hsl(0 85% 45% / 0.12)",
            borderColor: "hsl(0 85% 45% / 0.28)",
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: "hsl(0 85% 58%)" }}
            animate={{ boxShadow: ["0 0 0 0 hsl(0 85% 58% / 0.4)", "0 0 0 7px hsl(0 85% 58% / 0)", "0 0 0 0 hsl(0 85% 58% / 0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="text-[11px] font-bold tracking-[0.18em] uppercase"
            style={{ color: "hsl(0 85% 68%)" }}
          >
            Houston, TX · Crime & Security Alert
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeExpo, delay: 0.1 }}
          className="font-display font-bold text-white mb-6"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.05em",
          }}
        >
          Houston,
          <br />
          <motion.span
            style={{
              background: "linear-gradient(135deg, hsl(0 80% 72%) 0%, hsl(0 85% 52%) 50%, hsl(0 90% 42%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% auto",
            }}
            animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            We Have a Problem.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeExpo, delay: 0.22 }}
          className="mb-10 max-w-2xl"
          style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.65, color: "rgba(255,255,255,0.62)" }}
        >
          Property crime, vehicle theft, and home burglaries are real threats in the Greater Houston area. Most are preventable. Texas Total Security has been protecting Houston homes, businesses, and communities for over 30 years — with the alarm systems, security cameras, and 24/7 local monitoring that actually work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeExpo, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/free-analysis"
            className="btn-primary-gradient inline-flex items-center gap-2 text-base px-10 py-4"
            style={{ boxShadow: "0 4px 28px hsl(0 85% 45% / 0.4)" }}
          >
            Get My Free Security Analysis <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:7133879937"
            className="btn-outline-light inline-flex items-center gap-2 text-base px-8 py-4"
          >
            <Phone className="w-5 h-5" /> (713) 387-9937
          </a>
        </motion.div>
      </div>
    </section>

    {/* ══ PROBLEM STATS ═══════════════════════════════════════ */}
    <section className="section-padding" style={{ background: "hsl(0 0% 5%)" }}>
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span
            className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
            style={{ color: "hsl(0 85% 58%)" }}
          >
            The Reality Check
          </span>
          <div className="w-10 h-[2px] rounded-full mx-auto mb-6" style={{ background: "hsl(var(--accent))" }} />
          <h2
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
          >
            Houston's Security Challenges Are Real
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)" }} className="text-base leading-relaxed">
            The data doesn't lie. Greater Houston faces serious property crime challenges — but with the right security system, most incidents are entirely preventable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.65, ease: easeExpo, delay: i * 0.1 }}
              className="rounded-2xl p-7 relative overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 50% 0%, hsl(0 85% 45% / 0.12), transparent 60%)" }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "hsl(0 85% 45% / 0.12)", border: "1px solid hsl(0 85% 45% / 0.2)" }}
              >
                <item.icon className="w-5 h-5" style={{ color: "hsl(0 85% 60%)" }} />
              </div>
              <p
                className="font-display font-bold mb-1"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                  letterSpacing: "-0.045em",
                  background: "linear-gradient(135deg, hsl(0 80% 68%) 0%, hsl(0 85% 50%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.stat}
              </p>
              <p className="text-[13px] font-semibold text-white mb-3 leading-snug">{item.label}</p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ THE SOLUTION ═════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="eyebrow">The Solution</span>
          <div className="w-10 h-[2px] rounded-full mx-auto mb-5" style={{ background: "hsl(var(--accent))" }} />
          <h2
            className="font-display font-bold text-gray-900 mb-5"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
          >
            Houston Deserves Better Security. We Deliver It.
          </h2>
          <p className="text-gray-500 leading-relaxed text-base">
            Texas Total Security has protected Houston properties for 30+ years. Every system is custom-designed for your property — not a one-size-fits-all package from a national company.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <motion.div
              key={s.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
            >
              <Link
                to={s.href}
                className="block rounded-2xl p-7 h-full group transition-all duration-200 hover:shadow-lg"
                style={{ border: "1px solid hsl(0 0% 91%)", background: "hsl(0 0% 99%)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-accent/12"
                  style={{ background: "hsl(0 85% 45% / 0.07)", border: "1px solid hsl(0 85% 45% / 0.12)" }}
                >
                  <s.icon className="w-5 h-5" style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="font-display font-semibold text-gray-900 text-[15px] mb-2 group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                <span
                  className="inline-flex items-center gap-1 text-[12px] font-semibold group-hover:gap-2 transition-all"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ WHY LOCAL MATTERS ═══════════════════════════════ */}
    <section className="section-padding overflow-hidden" style={{ background: "hsl(0 0% 97%)" }}>
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.8, ease: easeExpo }}
          >
            <span className="eyebrow">Why Local Matters</span>
            <div className="w-9 h-[3px] rounded-full mb-6" style={{ background: "hsl(var(--accent))" }} />
            <h2
              className="font-display font-bold text-gray-900 mb-6 leading-[1.06]"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", letterSpacing: "-0.042em" }}
            >
              National Companies Don't Know Houston.{" "}
              <span style={{ color: "hsl(var(--accent))" }}>We Do.</span>
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed mb-8 text-base">
              <p>
                ADT, Brinks, and Vivint route your emergency through call centers thousands of miles away. By the time they reach a local dispatcher, the threat is over.
              </p>
              <p>
                Texas Total Security operates an in-house monitoring center right here in Houston. When your alarm triggers, our local operators dispatch local police — in seconds, not minutes.
              </p>
              <p>
                We've been in your neighborhood. We've protected your neighbors. We know the specific security challenges of every Houston zip code, from Memorial to The Woodlands.
              </p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                "In-house monitoring — never sold to a national company",
                "Local Houston technicians who know your system",
                "System takeover from ADT, Brinks & Vivint",
                "No long-term contracts required",
                "Serving Houston since 1994 — 30+ years",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/free-analysis"
                className="btn-primary-gradient inline-flex items-center gap-2"
                style={{ boxShadow: "0 4px 20px hsl(0 85% 45% / 0.3)" }}
              >
                Get Protected Today <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:7133879937" className="btn-outline-dark inline-flex items-center gap-2 text-[13.5px]">
                <Phone className="w-4 h-4" /> (713) 387-9937
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.8, ease: easeExpo }}
            className="space-y-4"
          >
            {/* Comparison card */}
            <div
              className="rounded-2xl overflow-hidden border border-gray-200"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
            >
              {/* Header */}
              <div className="grid grid-cols-3 text-center">
                <div className="p-4 bg-gray-50 border-r border-gray-200">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">Feature</p>
                </div>
                <div
                  className="p-4 border-r border-gray-200"
                  style={{ background: "hsl(0 85% 45% / 0.08)" }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "hsl(var(--accent))" }}>
                    Texas Total Security
                  </p>
                </div>
                <div className="p-4 bg-gray-50">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">National Company</p>
                </div>
              </div>
              {/* Rows */}
              {[
                ["Monitoring Center", "Local · Houston", "National Call Center"],
                ["Contract Sales", "Never Sold", "Sold to Third Party"],
                ["Response Speed", "Seconds", "Minutes"],
                ["Technicians", "Local Houston Team", "Rotating Contractors"],
                ["Long-Term Contracts", "Not Required", "1–3 Year Required"],
                ["System Takeover", "Yes — Free Assessment", "Rarely Offered"],
              ].map(([feat, tts, nat], i) => (
                <div
                  key={feat}
                  className="grid grid-cols-3 text-center border-t border-gray-100"
                  style={{ background: i % 2 === 0 ? "white" : "hsl(0 0% 99%)" }}
                >
                  <div className="p-3.5 border-r border-gray-100">
                    <p className="text-[12px] font-semibold text-gray-700">{feat}</p>
                  </div>
                  <div className="p-3.5 border-r border-gray-100" style={{ background: "hsl(0 85% 45% / 0.04)" }}>
                    <p className="text-[12px] font-semibold" style={{ color: "hsl(0 85% 42%)" }}>{tts}</p>
                  </div>
                  <div className="p-3.5">
                    <p className="text-[12px] text-gray-400">{nat}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ NEIGHBORHOODS WE SERVE ══════════════════════════ */}
    <section className="section-padding" style={{ background: "hsl(0 0% 4%)" }}>
      <div className="container-tight px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="mb-12"
        >
          <span
            className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
            style={{ color: "hsl(0 85% 58%)" }}
          >
            Protecting Greater Houston
          </span>
          <div className="w-10 h-[2px] rounded-full mx-auto mb-6" style={{ background: "hsl(var(--accent))" }} />
          <h2
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
          >
            We Protect Every Corner of Houston
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)" }} className="text-base max-w-xl mx-auto leading-relaxed">
            From River Oaks to Katy, from The Woodlands to Bellaire — Texas Total Security covers every premier Houston neighborhood and suburb.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {neighborhoods.map((n, i) => (
            <motion.span
              key={n}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <MapPin className="w-3 h-3" style={{ color: "hsl(0 85% 55%)" }} />
              {n}
            </motion.span>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/service-areas"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
            style={{ color: "hsl(0 85% 60%)" }}
          >
            View All Service Areas <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>

    {/* ══ LEAD FORM ════════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="container-tight max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadForm
          title="Stop the Problem. Start Your Protection."
          subtitle="Get a free onsite security analysis from Houston's most trusted local alarm company. No pressure, no obligation — just expert guidance."
        />
      </div>
    </section>

    <CTABlock />
  </Layout>
);

export default HoustonProblem;
