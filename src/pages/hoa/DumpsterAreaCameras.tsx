import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import {
  Camera, Shield, CheckCircle2, ArrowRight, Phone,
  Eye, Clock, Maximize2, Plus, Minus, Zap, Trash2
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const features = [
  { icon: Zap,       title: "Active Deterrence Cameras",      desc: "Built-in sirens and strobe lights respond to detected intrusions in real time — warning and stopping illegal dumpers before they unload." },
  { icon: Maximize2, title: "Wide-Angle Enclosure Coverage",  desc: "Full coverage of the dumpster pad, surrounding approach area, and access points — no blind angles where dumping goes unrecorded." },
  { icon: Eye,       title: "Night Vision IR",                desc: "Illegal dumping happens after dark. High-quality IR illumination captures clear footage of individuals and vehicles in complete darkness." },
  { icon: Camera,    title: "Incident Evidence Export",       desc: "Export timestamped footage for code enforcement violations, HOA hearings, police reports, or insurance claims in minutes." },
  { icon: Clock,     title: "24/7 Continuous Recording",      desc: "Round-the-clock recording backed by Verizon cellular — your dumpster area is monitored every hour of the day and night." },
  { icon: Shield,    title: "Vandalism Documentation",        desc: "Graffiti, property damage, and unauthorized access are all captured and documented — giving you the evidence needed to hold individuals accountable." },
];

const faqsForSchema = [
  { question: "Can dumpster area cameras actually prevent illegal dumping?", answer: "Active deterrence cameras with sirens and strobes have a measurable deterrent effect — especially when visible signage indicates the area is monitored. The visible hardware alone discourages casual dumpers. When someone does attempt illegal dumping, the siren and strobe activate in real time, often causing the person to leave immediately. For persistent offenders, the recorded footage with vehicle plates and facial detail provides the evidence needed for code enforcement or police action." },
  { question: "What does illegal dumping actually cost an HOA or property manager?", answer: "The cost of a single illegal dumping incident can range from a few hundred dollars for debris removal to several thousand dollars in fines, hauling fees, and cleanup labor if hazardous materials are involved. Cities like Houston can cite property owners for illegal dumping on their premises — meaning the property pays the fine even when they didn't create the problem. Repeat violations escalate those fines. Camera documentation lets you contest citations and identify the responsible party." },
  { question: "How do active deterrence cameras work at dumpster areas?", answer: "Active deterrence cameras combine motion detection with built-in sirens and strobe lights. When motion is detected in the defined zone — typically the dumpster pad after hours — the camera activates an audible alarm and visible strobe. This warns the person they've been detected and the area is under surveillance. The event is recorded with full detail. We configure the detection zones to minimize false activations during normal business hours while covering after-hours access." },
  { question: "What if the dumpster area doesn't have power nearby?", answer: "We assess power availability during the site visit and design the electrical approach accordingly. In most cases, we can run conduit from the nearest available circuit. For areas where running power is impractical, we can discuss solar-powered camera options. Every installation is designed around your specific site conditions." },
  { question: "Can cameras help resolve disputes with specific residents or vendors?", answer: "Yes. Timestamped footage showing the specific vehicle, individual, or vendor that dumped illegal material is the most effective tool for resolving disputes. Whether the issue goes to an HOA hearing, city code enforcement, or small claims court, video evidence is far more credible than resident testimony alone. We configure all systems for easy footage export for exactly this purpose." },
  { question: "How many cameras does a dumpster area typically need?", answer: "Most standard dumpster enclosures require one to two cameras: one wide-angle camera covering the full pad and approach, and potentially a second camera covering the access gate or a secondary angle. Larger dumpster compounds with multiple containers or multiple access points require additional cameras. We design the exact layout during a free site visit." },
  { question: "Will the cameras survive Houston weather near a dumpster?", answer: "All outdoor cameras installed by Texas Total Security are weatherproof and rated for the temperature extremes and humidity of the Houston environment. Dumpster areas present additional challenges — odors, pests, and heavy equipment proximity — and we account for these conditions in camera mounting height, housing selection, and cable routing." },
];

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
    { name: "Dumpster Area Cameras", href: "/hoa-security/dumpster-cameras" },
  ]),
  generateFAQSchema(faqsForSchema),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dumpster Area Security Cameras for Apartment & HOA Properties",
    provider: { "@type": "LocalBusiness", name: "Texas Total Security" },
    serviceType: "Security Camera Installation",
    areaServed: "Houston, TX",
    description: "Active deterrence cameras and 24/7 recording for dumpster areas at apartment complexes and HOA communities throughout Houston.",
    url: "https://www.texastotalsecurity.com/hoa-security/dumpster-cameras",
  },
];

const DumpsterAreaCameras = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Dumpster Area Security Cameras for Apartment & HOA Properties | Texas Total Security"
        description="Active deterrence cameras stop illegal dumping before it starts. 24/7 recording and incident evidence for dumpster areas at Houston apartment complexes and HOA communities."
        schemas={schemas}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 20% 8%) 50%, hsl(0 0% 5%) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 55% at 12% 70%, hsl(0 85% 44% / 0.13), transparent 65%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col justify-center" style={{ minHeight: "92vh" }}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, ease: easeExpo }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 64%)" }}>HOA & Apartment Security · Houston, TX</span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Dumpster Area Security Cameras<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>for Apartment & HOA Properties</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "34rem" }}>
              Illegal dumping is expensive, recurring, and often fined by the city. Active deterrence cameras stop it before it happens — and document it when it does.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Active deterrence — sirens and strobes stop dumpers in real time",
                "24/7 night vision recording of every approach and access point",
                "Timestamped evidence for code enforcement, police, and HOA hearings",
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
                Get a Free Assessment <ArrowRight className="w-4 h-4" />
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
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
                style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <Trash2 className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>The Problem</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                Illegal Dumping Is Costing Your Property More Than You Know
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Dumpster areas are one of the most consistently problematic locations for apartment complexes and HOA communities. Non-residents dump household furniture, construction debris, mattresses, and hazardous materials into your dumpsters — and you pay the overage charges, the hauling fees, and in Houston, potentially the city fines. Without camera coverage, you have no way to identify the responsible party.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Beyond dumping, dumpster enclosures attract vandalism, graffiti, and trespassing — especially after hours. Without documentation, every cleanup comes out of the property budget with no recourse. And when a resident disputes a charge or a city inspector writes a violation, you need footage — not a work order history.
              </p>
              <div className="space-y-3">
                {[
                  "Non-residents dump furniture and construction debris — you pay removal",
                  "City fines for illegal dumping land on the property owner",
                  "Vandalism and graffiti with no documented evidence",
                  "Repeat offenders continue because there's no accountability",
                  "Insurance claims without footage are routinely denied or disputed",
                ].map((risk) => (
                  <div key={risk} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(0 85% 50%)" }} />
                    <p className="text-sm text-gray-600 leading-relaxed">{risk}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
              className="rounded-2xl p-8"
              style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 91%)" }}
            >
              <h3 className="font-display font-bold text-gray-900 mb-5" style={{ fontSize: "1.15rem" }}>
                What Dumpster Area Cameras Solve
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Stop Dumping Before It Happens", desc: "Active deterrence cameras warn and deter — most dumpers leave immediately when a siren activates." },
                  { label: "Document Who's Responsible", desc: "Footage with vehicle plates and facial detail gives code enforcement and management what they need." },
                  { label: "Contest City Fines", desc: "If a city inspector cites your property for illegal dumping, footage proving the source can contest the violation." },
                  { label: "Identify Repeat Offenders", desc: "Recurring violations from the same individual or vehicle become a documented pattern that justifies escalation." },
                  { label: "Protect HOA Budget", desc: "Every incident prevented is money saved on hauling, cleanup, and fines. Cameras pay for themselves." },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 50%)" }} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE INSTALL ── */}
      <section style={{ background: "hsl(0 0% 97%)" }} className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
              <Camera className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>What We Install</span>
            </div>
            <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", letterSpacing: "-0.03em" }}>
              Dumpster Area Camera Systems for Houston Properties
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Active deterrence and full enclosure coverage — designed to stop illegal dumping before it happens and document it when it does.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.15)" }}>
                  <f.icon className="w-6 h-6" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-[15px] mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="mt-10 text-center"
          >
            <Link
              to="/property-assessment"
              className="btn-primary-gradient inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5"
            >
              Get a Free Dumpster Area Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DARK TRUST STRIP ── */}
      <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Active Deterrence That Works", desc: "We configure detection zones specifically for dumpster enclosures — maximizing deterrence after hours while minimizing false activations during normal pickup times." },
              { num: "02", title: "Licensed Professionals", desc: "Every installation is performed by our licensed team — License #B03066901. No subcontractors, no shortcuts on conduit and weatherproofing." },
              { num: "03", title: "Local Owner Accountability", desc: "Owner Tim Townsend is reachable directly. When a code violation or incident requires footage, you're not waiting in a ticket queue." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="shrink-0 mt-0.5">
                  <span className="font-display font-bold text-[11px] tracking-[0.14em]" style={{ color: "hsl(0 85% 50%)" }}>{p.num}</span>
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

      {/* ── FAQ ── */}
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
                Dumpster Camera Questions Answered
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Specific answers for property managers and HOA boards dealing with illegal dumping.
            </p>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                q: "Can dumpster area cameras actually prevent illegal dumping?",
                a: (
                  <span>
                    Active deterrence cameras with sirens and strobes have a measurable deterrent effect — especially when visible signage indicates the area is monitored. The visible hardware alone discourages casual dumpers. When someone does attempt illegal dumping, the siren and strobe activate in real time, often causing the person to leave immediately. For persistent offenders, the recorded footage with vehicle plates and facial detail provides the evidence needed for code enforcement or police action.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free assessment</Link>{" "}
                    to walk your dumpster area with us.
                  </span>
                ),
              },
              {
                q: "What does illegal dumping actually cost an HOA or property manager?",
                a: (
                  <span>
                    The cost of a single illegal dumping incident can range from a few hundred dollars for debris removal to several thousand dollars in fines, hauling fees, and cleanup labor if hazardous materials are involved. Cities like Houston can cite property owners for illegal dumping on their premises — meaning the property pays the fine even when they didn't create the problem. Repeat violations escalate those fines. Camera documentation lets you contest citations and identify the responsible party. Call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss your specific situation.
                  </span>
                ),
              },
              {
                q: "How do active deterrence cameras work at dumpster areas?",
                a: (
                  <span>
                    Active deterrence cameras combine motion detection with built-in sirens and strobe lights. When motion is detected in the defined zone — typically the dumpster pad after hours — the camera activates an audible alarm and visible strobe. This warns the person they've been detected and the area is under surveillance. The event is recorded with full detail. We configure the detection zones to minimize false activations during normal business hours while covering after-hours access.
                  </span>
                ),
              },
              {
                q: "What if the dumpster area doesn't have power nearby?",
                a: (
                  <span>
                    We assess power availability during the site visit and design the electrical approach accordingly. In most cases, we can run conduit from the nearest available circuit. For areas where running power is impractical, we can discuss the best available options for your property conditions. Every installation is designed around your specific site.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request your free site assessment</Link>{" "}
                    and we'll evaluate your power situation at no charge.
                  </span>
                ),
              },
              {
                q: "Can cameras help resolve disputes with specific residents or vendors?",
                a: (
                  <span>
                    Yes. Timestamped footage showing the specific vehicle, individual, or vendor that dumped illegal material is the most effective tool for resolving disputes. Whether the issue goes to an HOA hearing, city code enforcement, or small claims court, video evidence is far more credible than resident testimony alone. We configure all systems for easy footage export for exactly this purpose.
                  </span>
                ),
              },
              {
                q: "How many cameras does a dumpster area typically need?",
                a: (
                  <span>
                    Most standard dumpster enclosures require one to two cameras: one wide-angle camera covering the full pad and approach, and potentially a second covering the access gate or a secondary angle. Larger dumpster compounds with multiple containers or multiple access points require additional cameras. We design the exact layout during a{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free site visit</Link>.
                  </span>
                ),
              },
              {
                q: "Will the cameras survive Houston weather near a dumpster?",
                a: (
                  <span>
                    All outdoor cameras installed by Texas Total Security are weatherproof and rated for the temperature extremes and humidity of the Houston environment. Dumpster areas present additional challenges — odors, pests, and heavy equipment proximity — and we account for these conditions in camera mounting height, housing selection, and cable routing. Our systems are designed for long-term reliability in demanding environments.
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

export default DumpsterAreaCameras;
