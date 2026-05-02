import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import {
  Camera, Shield, CheckCircle2, ArrowRight, Phone,
  Eye, Clock, Maximize2, Plus, Minus, Waves, AlertTriangle
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const features = [
  { icon: Maximize2, title: "Wide-Angle Pool Deck Coverage",   desc: "Full coverage of the pool deck, surrounding walkways, and all entry points — no area of the pool zone is left unmonitored." },
  { icon: Eye,       title: "Night Vision & After-Hours Monitoring", desc: "After-hours unauthorized access is the most common pool liability issue. Our IR cameras capture clear footage in complete darkness." },
  { icon: Clock,     title: "24/7 Continuous Recording",        desc: "Round-the-clock recording ensures every pool area event is documented — daytime rule enforcement and after-hours access incidents alike." },
  { icon: AlertTriangle, title: "Liability Incident Documentation", desc: "When a safety incident occurs at the pool, timestamped footage is the difference between a documented record and an undocumented liability." },
  { icon: Shield,    title: "Rule Enforcement Evidence",        desc: "Enforce pool rules with documented footage — unauthorized guests, after-hours use, and rule violations are all captured and timestamped." },
  { icon: Camera,    title: "Motion Alert Configuration",       desc: "Configure motion alerts for after-hours pool access — receive real-time notification when someone enters the pool area outside approved hours." },
];

const faqsForSchema = [
  { question: "Why is pool area surveillance so important for HOA liability?", answer: "A drowning or serious injury at an HOA pool without video documentation creates a liability nightmare. Without footage, the HOA cannot definitively establish who was present, what happened before the incident, whether pool rules were being followed, or whether the injured party was an authorized resident or an unauthorized guest. With footage, you have an objective record of events that your insurance carrier, attorneys, and potentially a court can review. The presence of cameras also documents that the HOA took reasonable steps to monitor pool area safety." },
  { question: "Can cameras be positioned without violating swimmer privacy?", answer: "Yes. Camera positioning at community pools is designed to cover the deck, entry points, and surrounding areas — not to provide closeup surveillance of swimmers in the water. Standard placements focus on the gate entry, the deck perimeter, and the approach walkways. This provides the safety documentation and access monitoring you need while respecting reasonable privacy expectations. We discuss positioning with HOA boards before any installation." },
  { question: "What is the most common pool area incident type?", answer: "After-hours unauthorized access is by far the most common incident type at HOA and apartment complex pools. This includes residents using the pool after posted closing times, non-residents accessing the pool through gaps in fencing, and teenagers gathering at the pool after dark. After-hours access is when the most serious incidents — alcohol consumption, injury, equipment damage — are most likely to occur. Coverage designed specifically for detecting after-hours pool access is the most important design consideration." },
  { question: "Can pool cameras help enforce the guest policy?", answer: "Yes. If your pool has a resident-only policy or limits the number of guests per resident, cameras at the entry point document who is entering and when. This footage can be used in HOA hearings where a resident is accused of allowing unauthorized access. The timestamp and footage provide objective evidence compared to a neighbor complaint." },
  { question: "Do cameras need to be weatherproofed specifically for pool environments?", answer: "Pool areas present unique challenges: chlorine vapor, humidity, splash proximity, and UV exposure from extended sun. We select camera housings rated for this environment and mount cameras at positions that balance coverage with distance from direct splash. All cabling is run through sealed conduit to protect against moisture intrusion. Our installations are designed for long-term reliability in pool environments specifically." },
  { question: "How does the motion alert system work for after-hours pool access?", answer: "We configure motion detection zones for the pool area that activate during after-hours windows. When the system detects motion in the defined zone during restricted hours, it sends an alert to designated management personnel. This allows for faster response — contacting the individuals or dispatch in real time — rather than discovering an incident after the fact during a morning footage review." },
  { question: "What if our pool area has a separate hot tub or spa?", answer: "We design coverage for every distinct zone within your recreation area — the main pool, hot tub or spa, bathroom facilities, and any covered pavilion or cabana areas. Each zone may require its own camera depending on sight lines. We assess the full layout during the free site visit and design for complete coverage." },
  { question: "How long should pool area footage be retained?", answer: "We recommend a minimum of 60 days for pool areas due to the delayed nature of many incident reports. A resident injury may not result in a formal complaint or legal action until weeks after the event. Having footage available for a longer window gives your HOA the protection it needs. Storage is sized to retain footage for your specified period." },
];

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
    { name: "Pool Area Cameras", href: "/hoa-security/pool-cameras" },
  ]),
  generateFAQSchema(faqsForSchema),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pool & Recreation Area Surveillance for Houston HOA Communities",
    provider: { "@type": "LocalBusiness", name: "Texas Total Security" },
    serviceType: "Security Camera Installation",
    areaServed: "Houston, TX",
    description: "24/7 pool area surveillance, after-hours access monitoring, and liability documentation for HOA communities and apartment complexes in Houston.",
    url: "https://www.texastotalsecurity.com/hoa-security/pool-cameras",
  },
];

const PoolAreaCameras = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Pool & Recreation Area Surveillance for Houston HOA Communities | Texas Total Security"
        description="24/7 pool area cameras, after-hours access monitoring, and liability documentation for HOA communities and apartment complexes throughout Houston, TX."
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
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 64%)" }}>HOA Security · Houston, TX</span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Pool & Recreation Area Surveillance<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>for Houston HOA Communities</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "34rem" }}>
              Your pool area is your HOA's highest liability zone. After-hours access, unauthorized guests, and undocumented safety incidents are all risks that cameras directly address.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Wide-angle pool deck coverage — full zone, no blind spots",
                "After-hours motion alerts — know when someone accesses the pool at night",
                "24/7 recording for safety compliance and liability documentation",
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
                <Waves className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>The Problem</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                A Pool Area Incident Without Footage Is a Lawsuit Waiting to Happen
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Pool areas are the single highest-liability common amenity at any HOA community. When a safety incident occurs — whether it's an unauthorized guest who slips on wet deck, a drowning accident, or an injury during after-hours access — the HOA's ability to defend itself depends almost entirely on what the cameras captured. Without footage, you have no evidence of who was present, whether pool rules were being followed, or whether the injured party was authorized to be there.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Beyond liability, pool areas are magnets for after-hours problems: teenagers gathering at night, non-residents using the amenity, alcohol consumption, and equipment damage. Without camera coverage, you discover these incidents after they happen — often after the damage or injury has already occurred.
              </p>
              <div className="space-y-3">
                {[
                  "Drowning or injury without footage — HOA cannot establish what happened",
                  "Unauthorized guests or non-residents use the pool with no documentation",
                  "After-hours access leads to alcohol incidents, equipment damage, or injury",
                  "Pool rule violations go undocumented and unenforceable",
                  "Insurance claims without footage are disputed or denied",
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
                What Pool Area Cameras Solve
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Safety Incident Documentation", desc: "Every incident on the pool deck is recorded with timestamp — objective evidence for insurance and legal proceedings." },
                  { label: "After-Hours Access Detection", desc: "Motion alerts notify management in real time when someone accesses the pool outside approved hours." },
                  { label: "Unauthorized Guest Enforcement", desc: "Footage documents who is entering the pool area — supporting enforcement of guest policies and resident-only rules." },
                  { label: "Rule Violation Evidence", desc: "Diving, running, glass containers — pool rule violations are documented for HOA hearings." },
                  { label: "HOA Liability Protection", desc: "Cameras demonstrate the HOA took reasonable steps to monitor pool safety — essential in any negligence claim." },
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
              Pool Area Camera Systems for Houston HOA Communities
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Complete pool zone coverage, motion alerts for after-hours access, and 24/7 recording for safety compliance and liability protection.
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
              Get a Free Pool Area Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DARK TRUST STRIP ── */}
      <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Pool Environment Hardware", desc: "We select housings and mounting positions specifically suited for pool environments — chlorine vapor, humidity, and UV exposure are all accounted for." },
              { num: "02", title: "Licensed Professionals", desc: "License #B03066901. Our licensed team installs all conduit, wiring, and mounting — no subcontractors, no exceptions." },
              { num: "03", title: "Local Owner Accountability", desc: "Tim Townsend is reachable directly when you need footage pulled for an insurance claim or incident investigation — not a call center." },
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
                Pool Camera Questions Answered
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Specific answers for HOA boards evaluating pool area surveillance.
            </p>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                q: "Why is pool area surveillance so important for HOA liability?",
                a: (
                  <span>
                    A drowning or serious injury at an HOA pool without video documentation creates a liability nightmare. Without footage, the HOA cannot definitively establish who was present, what happened before the incident, whether pool rules were being followed, or whether the injured party was an authorized resident or an unauthorized guest. With footage, you have an objective record of events for your insurance carrier, attorneys, and potentially a court to review.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free assessment</Link>{" "}
                    to evaluate your pool area coverage.
                  </span>
                ),
              },
              {
                q: "Can cameras be positioned without violating swimmer privacy?",
                a: (
                  <span>
                    Yes. Camera positioning at community pools is designed to cover the deck, entry points, and surrounding areas — not to provide closeup surveillance of swimmers in the water. Standard placements focus on the gate entry, the deck perimeter, and the approach walkways. This provides the safety documentation and access monitoring you need while respecting reasonable privacy expectations. We discuss positioning with HOA boards before any installation. Call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss your specific layout.
                  </span>
                ),
              },
              {
                q: "What is the most common pool area incident type?",
                a: (
                  <span>
                    After-hours unauthorized access is by far the most common incident type at HOA and apartment complex pools. This includes residents using the pool after posted closing times, non-residents accessing the pool through gaps in fencing, and teenagers gathering at the pool after dark. After-hours access is when the most serious incidents — alcohol consumption, injury, equipment damage — are most likely to occur. Coverage designed specifically for detecting after-hours pool access is the most important design consideration.
                  </span>
                ),
              },
              {
                q: "Can pool cameras help enforce the guest policy?",
                a: (
                  <span>
                    Yes. If your pool has a resident-only policy or limits the number of guests per resident, cameras at the entry point document who is entering and when. This footage can be used in HOA hearings where a resident is accused of allowing unauthorized access. The timestamp and footage provide objective evidence compared to a neighbor complaint alone.
                  </span>
                ),
              },
              {
                q: "Do cameras need to be weatherproofed specifically for pool environments?",
                a: (
                  <span>
                    Pool areas present unique challenges: chlorine vapor, humidity, splash proximity, and UV exposure from extended sun. We select camera housings rated for this environment and mount cameras at positions that balance coverage with distance from direct splash. All cabling is run through sealed conduit to protect against moisture intrusion.
                  </span>
                ),
              },
              {
                q: "How does the motion alert system work for after-hours pool access?",
                a: (
                  <span>
                    We configure motion detection zones for the pool area that activate during after-hours windows. When the system detects motion in the defined zone during restricted hours, it sends an alert to designated management personnel. This allows for faster response — contacting the individuals or dispatching security in real time — rather than discovering an incident the following morning during a footage review.
                  </span>
                ),
              },
              {
                q: "What if our pool area has a separate hot tub or spa?",
                a: (
                  <span>
                    We design coverage for every distinct zone within your recreation area — the main pool, hot tub or spa, bathroom facilities, and any covered pavilion or cabana areas. Each zone may require its own camera depending on sight lines. We assess the full layout during the{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free site visit</Link>{" "}
                    and design for complete coverage.
                  </span>
                ),
              },
              {
                q: "How long should pool area footage be retained?",
                a: (
                  <span>
                    We recommend a minimum of 60 days for pool areas due to the delayed nature of many incident reports. A resident injury may not result in a formal complaint or legal action until weeks after the event. Having footage available for a longer window gives your HOA the protection it needs. Storage is sized to retain footage for your specified period.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request your free assessment</Link>{" "}
                    and we'll size the storage accordingly.
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

export default PoolAreaCameras;
