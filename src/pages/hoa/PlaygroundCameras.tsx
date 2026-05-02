import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import {
  Camera, Shield, CheckCircle2, ArrowRight, Phone,
  Eye, Clock, Maximize2, Plus, Minus, Baby, Users
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const features = [
  { icon: Maximize2, title: "Wide-Angle Full Playground Coverage", desc: "Every piece of equipment, the surrounding perimeter, and all access points covered — no blind spots where an incident could occur without documentation." },
  { icon: Eye,       title: "Night Vision & After-Hours Monitoring", desc: "After-hours access and vandalism are common at community playgrounds. IR cameras capture clear footage in complete darkness." },
  { icon: Clock,     title: "Real-Time 24/7 Recording",              desc: "Continuous recording means every moment on the playground is documented — from peak afternoon hours to late-night unauthorized access." },
  { icon: Camera,    title: "Incident Documentation",                desc: "When a child is injured or equipment is damaged, timestamped footage is the definitive record — far more reliable than witness accounts alone." },
  { icon: Shield,    title: "Remote Monitoring Access",              desc: "Board members and property managers can view live footage of playground areas from any device — providing real-time oversight without being on-site." },
  { icon: Users,     title: "Parental Confidence",                   desc: "Visible surveillance cameras signal to parents that the HOA is actively invested in the safety of the community's children — a retention and reputation benefit." },
];

const faqsForSchema = [
  { question: "Are there privacy concerns with cameras at a children's playground?", answer: "This is one of the most common questions we receive, and the answer is no — not when cameras are positioned and configured appropriately. Community playground cameras cover common property areas, not private spaces. The purpose is safety monitoring, incident documentation, and after-hours access detection. Cameras are mounted at heights and angles designed to capture area coverage rather than invasive closeup footage. Signage indicating video surveillance is in use should be posted at the entrance to the playground area." },
  { question: "What is the most common incident type at HOA playgrounds?", answer: "Equipment-related injuries during peak hours, after-hours access and vandalism (particularly in the evening), and non-resident use of the playground are the three most common categories. Vandalism — broken equipment, graffiti, and deliberate damage — is frequently reported in communities without camera coverage. After-hours access by older teenagers is a persistent problem that cameras with motion alerts can address in real time." },
  { question: "How does playground camera footage help in a liability situation?", answer: "When a child is injured on playground equipment, the HOA's liability exposure depends significantly on whether the incident was properly documented. Footage can establish what the child was doing at the time of injury, whether equipment was being used as intended, whether adequate supervision was present, and whether the equipment was in proper working condition. Without footage, these facts are disputed based on witness accounts — which are inherently less reliable." },
  { question: "Can cameras be used to enforce age restrictions on playground equipment?", answer: "Yes. Some communities have age or size restrictions on specific playground equipment for safety reasons. Camera footage can document instances where equipment is being used by individuals outside those parameters — supporting enforcement and establishing that the HOA's rules were in place and communicated." },
  { question: "Will cameras be visible to children and parents?", answer: "Yes, and that's by design. Visible cameras serve both as a deterrent to inappropriate behavior and as a signal to parents and residents that the playground area is monitored. We recommend visible mounting positions that don't interfere with the play environment while making the surveillance presence clear. Signage should accompany the cameras." },
  { question: "How many cameras does a community playground typically need?", answer: "A standard residential playground requires two to three cameras for complete coverage: one wide-angle camera capturing the full equipment area, one covering the primary access point, and potentially a third for a secondary entry or a specific equipment area with poor sight lines from the first two. We assess your specific playground layout during the free site visit." },
  { question: "What if the playground area has poor lighting?", answer: "IR cameras provide clear footage in complete darkness — lighting is not a requirement for quality nighttime recording. For after-hours deterrence, we can also recommend motion-activated lighting in conjunction with camera coverage. Improved lighting and camera coverage work together for maximum deterrence and documentation quality." },
];

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
    { name: "Playground Cameras", href: "/hoa-security/playground-cameras" },
  ]),
  generateFAQSchema(faqsForSchema),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Playground Security Cameras for Houston HOA & Apartment Communities",
    provider: { "@type": "LocalBusiness", name: "Texas Total Security" },
    serviceType: "Security Camera Installation",
    areaServed: "Houston, TX",
    description: "Wide-angle playground surveillance, incident documentation, and after-hours access monitoring for HOA communities and apartment complexes in Houston.",
    url: "https://www.texastotalsecurity.com/hoa-security/playground-cameras",
  },
];

const PlaygroundCameras = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Playground Security Cameras for Houston HOA & Apartment Communities | Texas Total Security"
        description="Wide-angle playground surveillance, child safety monitoring, and incident documentation for HOA communities and apartment complexes throughout Houston, TX."
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
              Playground Security Cameras<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>for Houston HOA & Apartment Communities</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "34rem" }}>
              Community playgrounds carry significant liability and safety responsibility. Wide-angle cameras document incidents, deter after-hours access, and give parents confidence that their children's play area is protected.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Full playground coverage — every piece of equipment and access point",
                "24/7 real-time recording for incident documentation and liability protection",
                "After-hours motion monitoring — alert management to unauthorized night access",
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
                <Baby className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>The Problem</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                Playground Incidents Without Documentation Leave Your HOA Exposed
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Community playgrounds are one of the most frequently used common amenities in any residential community — and one of the highest-risk locations for personal injury claims. When a child is injured on playground equipment, the HOA's ability to defend itself against negligence claims depends on what was documented. Without camera footage, the facts of an incident become a dispute between parent accounts, management observations, and equipment inspection records.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Beyond injury liability, playgrounds attract after-hours misuse — teenagers gathering at night, vandalism to equipment, and graffiti. Every instance of damage comes out of the HOA budget, and without documentation, there's no path to hold anyone accountable or recover costs.
              </p>
              <div className="space-y-3">
                {[
                  "Child injury disputes where witness accounts conflict",
                  "After-hours vandalism with no evidence trail",
                  "Non-resident use of playground without documentation",
                  "Equipment damage without footage to identify responsible party",
                  "Parents question HOA commitment to safety without visible monitoring",
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
                What Playground Cameras Solve
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Incident Documentation", desc: "Every moment on the playground is recorded — providing objective evidence in injury disputes." },
                  { label: "After-Hours Deterrence", desc: "Cameras deter vandalism and unauthorized after-hours access — particularly by teenagers." },
                  { label: "Equipment Damage Evidence", desc: "When playground equipment is deliberately damaged, footage identifies the responsible party." },
                  { label: "HOA Liability Protection", desc: "Cameras demonstrate the HOA actively monitors safety — essential in negligence claims." },
                  { label: "Parental Confidence", desc: "Parents who see active surveillance feel their children are in a safer environment — a retention benefit." },
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
              Playground Camera Systems for Houston Communities
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Full playground coverage, 24/7 recording, and after-hours monitoring designed for the safety and liability protection needs of HOA communities.
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
              Get a Free Playground Area Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DARK TRUST STRIP ── */}
      <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Child Safety First Positioning", desc: "We position cameras to maximize incident documentation and area coverage — not to record children in ways that would be intrusive or raise privacy concerns." },
              { num: "02", title: "Licensed Professionals", desc: "License #B03066901. Our licensed team handles all conduit, weatherproofing, and mounting — built for Houston's climate long-term." },
              { num: "03", title: "Local Owner Access", desc: "Tim Townsend is reachable directly when you need footage for an incident investigation — no national call center, no ticket queue." },
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
                Playground Camera Questions Answered
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Specific answers for HOA boards evaluating playground surveillance.
            </p>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                q: "Are there privacy concerns with cameras at a children's playground?",
                a: (
                  <span>
                    This is one of the most common questions we receive, and the answer is no — not when cameras are positioned and configured appropriately. Community playground cameras cover common property areas, not private spaces. The purpose is safety monitoring, incident documentation, and after-hours access detection. Cameras are mounted at heights and angles designed to capture area coverage. Signage indicating video surveillance is in use should be posted at the entrance to the playground area.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free consultation</Link>{" "}
                    and we'll walk your board through the positioning approach.
                  </span>
                ),
              },
              {
                q: "What is the most common incident type at HOA playgrounds?",
                a: (
                  <span>
                    Equipment-related injuries during peak hours, after-hours access and vandalism (particularly in the evening), and non-resident use of the playground are the three most common categories. Vandalism — broken equipment, graffiti, and deliberate damage — is frequently reported in communities without camera coverage. After-hours access by older teenagers is a persistent problem that cameras with motion alerts can address in real time. Call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss your specific situation.
                  </span>
                ),
              },
              {
                q: "How does playground camera footage help in a liability situation?",
                a: (
                  <span>
                    When a child is injured on playground equipment, the HOA's liability exposure depends significantly on whether the incident was properly documented. Footage can establish what the child was doing at the time of injury, whether equipment was being used as intended, and whether the equipment was in proper working condition before the incident. Without footage, these facts are disputed based on witness accounts — which are inherently less reliable and more easily challenged.
                  </span>
                ),
              },
              {
                q: "Can cameras be used to enforce age restrictions on playground equipment?",
                a: (
                  <span>
                    Yes. Some communities have age or size restrictions on specific playground equipment for safety reasons. Camera footage can document instances where equipment is being used by individuals outside those parameters — supporting enforcement and establishing that the HOA's rules were in place and communicated.
                  </span>
                ),
              },
              {
                q: "Will cameras be visible to children and parents?",
                a: (
                  <span>
                    Yes, and that's by design. Visible cameras serve both as a deterrent to inappropriate behavior and as a signal to parents and residents that the playground area is monitored. We recommend visible mounting positions that don't interfere with the play environment while making the surveillance presence clear. Signage should accompany the cameras.
                  </span>
                ),
              },
              {
                q: "How many cameras does a community playground typically need?",
                a: (
                  <span>
                    A standard residential playground requires two to three cameras for complete coverage: one wide-angle camera capturing the full equipment area, one covering the primary access point, and potentially a third for a secondary entry or a specific area with poor sight lines. We assess your specific playground layout during the{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free site visit</Link>{" "}
                    and design for complete coverage.
                  </span>
                ),
              },
              {
                q: "What if the playground area has poor lighting?",
                a: (
                  <span>
                    IR cameras provide clear footage in complete darkness — lighting is not a requirement for quality nighttime recording. For after-hours deterrence, we can also recommend motion-activated lighting in conjunction with camera coverage. Improved lighting and camera coverage work together for maximum deterrence and documentation quality.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request your free assessment</Link>{" "}
                    and we'll evaluate your lighting and camera needs together.
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

export default PlaygroundCameras;
