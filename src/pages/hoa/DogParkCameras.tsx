import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import {
  Camera, Shield, CheckCircle2, ArrowRight, Phone,
  Eye, Clock, Maximize2, Plus, Minus, PawPrint, FileText
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const features = [
  { icon: Maximize2, title: "Wide-Angle Dog Park Coverage",    desc: "Full coverage of the dog park enclosure, entry gate, surrounding walkways, and seating areas — every zone where incidents occur." },
  { icon: Eye,       title: "24/7 Night Vision Recording",     desc: "Incidents don't only happen in daylight. IR cameras capture clear footage after dark for after-hours access and evening incidents." },
  { icon: Clock,     title: "Continuous Recording",            desc: "Every moment in the dog park is documented — from a dog bite during peak evening hours to unauthorized access after the park is closed." },
  { icon: FileText,  title: "Incident Evidence Export",        desc: "Pull and export footage in minutes for police reports, insurance claims, HOA hearings, or resident dispute documentation." },
  { icon: Shield,    title: "Dog Bite Liability Documentation", desc: "When a dog bites another dog or a person, footage documents the incident, the animals involved, and the owners present — objective evidence for any dispute or claim." },
  { icon: Camera,    title: "Rule Violation Documentation",    desc: "Footage documents leash policy violations, unauthorized pet access, and instances where rules were not followed — supporting HOA enforcement." },
];

const faqsForSchema = [
  { question: "What types of dog park incidents does camera footage help resolve?", answer: "Dog bites are the most common and most expensive incident type — both for the HOA's liability and for involved residents. Footage documents the animals involved, the owners present, and the circumstances of the incident. He-said-she-said disputes between residents over whose dog was aggressive, whether a dog was on a leash, or what provoked the incident are very common at community dog parks. Objective footage resolves these disputes definitively. Unauthorized access, property damage, and violations of park rules are also frequently documented." },
  { question: "Is the HOA liable for dog bites that happen in the dog park?", answer: "Liability depends on the specific circumstances, your governing documents, and the applicable local laws. However, HOA liability exposure is significantly affected by whether the board can demonstrate due diligence in maintaining the facility and monitoring for rule compliance. Camera footage that shows the HOA maintained the space, enforced rules, and that the incident was caused by a specific pet owner's negligence rather than a facility deficiency is essential documentation for your HOA's attorney and insurance carrier." },
  { question: "Can cameras identify which dog and owner were involved in an incident?", answer: "Yes — when cameras are positioned correctly. We design dog park camera placements to capture the entry gate (where owners and dogs enter and can be individually identified) as well as the interior of the park. An incident that occurs inside the park can be tied to an owner by reviewing footage of who entered with which dog before the incident occurred. This is how surveillance footage is most effectively used in dog park dispute resolution." },
  { question: "What if the dog park has multiple entry gates?", answer: "We design camera coverage for every entry and exit point in the dog park — typically including both large dog and small dog enclosures if your park has a divided layout. Each gate entry is covered to document who enters with which pet. Interior coverage addresses the full park area. We assess your specific dog park layout during the free property visit." },
  { question: "Can cameras help enforce the registration or vaccination requirement for dogs?", answer: "Cameras at the entry gate document which residents are bringing their pets into the park, which can support enforcement of pet registration requirements. While cameras cannot verify vaccination status, they document which resident and which dog accessed the facility — providing the management team with a record they can cross-reference against registration records when a violation or complaint is filed." },
  { question: "How long should dog park footage be retained?", answer: "Dog bite incidents in particular have a longer reporting tail — a dog bite may not result in a formal complaint or legal action until days or weeks after the incident. A victim may initially handle the situation privately before deciding to pursue a claim. We recommend 60 days minimum retention for dog park footage. We size storage to your specified retention period during installation." },
  { question: "Do cameras deter problem behavior in dog parks?", answer: "The visible presence of cameras has a measurable effect on behavior in monitored spaces. Residents who know the dog park is under surveillance are more likely to follow leash rules, clean up after their pets, and supervise their dogs appropriately. This deterrent effect on rule-bending behavior is as valuable as the incident documentation capability for day-to-day management of the amenity." },
];

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
    { name: "Dog Park Cameras", href: "/hoa-security/dog-park-cameras" },
  ]),
  generateFAQSchema(faqsForSchema),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dog Park Security Cameras for Houston HOA & Multifamily Communities",
    provider: { "@type": "LocalBusiness", name: "Texas Total Security" },
    serviceType: "Security Camera Installation",
    areaServed: "Houston, TX",
    description: "Wide-angle dog park surveillance, dog bite incident documentation, and rule enforcement evidence for HOA communities and apartment complexes in Houston.",
    url: "https://www.texastotalsecurity.com/hoa-security/dog-park-cameras",
  },
];

const DogParkCameras = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Dog Park Security Cameras for Houston HOA & Multifamily Communities | Texas Total Security"
        description="Wide-angle dog park surveillance, dog bite incident documentation, and dispute resolution footage for HOA communities and apartment complexes throughout Houston, TX."
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
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 64%)" }}>HOA & Multifamily Security · Houston, TX</span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Dog Park Security Cameras<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>for Houston HOA & Multifamily Communities</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "34rem" }}>
              Dog bite incidents, he-said-she-said disputes, and unauthorized access are the most common dog park problems — and all three are documented definitively with properly positioned camera coverage.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Wide-angle coverage of the full dog park enclosure and entry gate",
                "Dog bite incident documentation — objective evidence for disputes and claims",
                "24/7 recording with easy footage export for police and HOA hearings",
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
                <PawPrint className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>The Problem</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                Dog Park Disputes Are Among the Most Common HOA Complaints — and the Hardest to Resolve Without Video
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Dog parks generate a disproportionate share of resident complaints and board time at communities where they're offered. Dog bite incidents create immediate liability concerns. Disputes between residents about whose dog was aggressive, whether a dog was properly supervised, or whether a bite was provoked are nearly impossible to resolve fairly without objective footage. When there's no video, management is forced to choose between competing accounts — and the losing party is often furious with the board.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Beyond dog bites, unauthorized access, property damage, and rule violations — unleashed dogs, aggressive breeds in the small dog section, failure to clean up — are all recurring management headaches at unmonitored dog parks. Cameras change the dynamic entirely: residents know they're accountable, and management has evidence when action is needed.
              </p>
              <div className="space-y-3">
                {[
                  "Dog bites with no footage — he-said-she-said dispute with no resolution",
                  "Non-resident pets using the facility with no documentation",
                  "Leash violations and aggressive breed violations go unrecorded",
                  "Property damage and equipment misuse with no evidence trail",
                  "Board spends hours on unresolvable disputes that footage would settle immediately",
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
                What Dog Park Cameras Solve
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Dog Bite Documentation", desc: "Footage establishes which animals and owners were involved and what provoked the incident — objective evidence for any claim." },
                  { label: "Dispute Resolution", desc: "He-said-she-said disputes are resolved with footage in minutes instead of consuming board hours." },
                  { label: "Unauthorized Access Evidence", desc: "Non-resident pets and owners accessing the facility are documented for enforcement." },
                  { label: "Rule Violation Records", desc: "Leash violations, breed restriction violations, and rule infractions are captured and timestamped." },
                  { label: "HOA Liability Protection", desc: "Footage demonstrates the HOA maintained the facility and enforced rules — essential in negligence claims." },
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
              Dog Park Camera Systems for Houston Communities
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Complete enclosure coverage, gate entry documentation, and 24/7 recording designed for the specific incident types that occur in community dog parks.
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
              Get a Free Dog Park Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DARK TRUST STRIP ── */}
      <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Gate Entry Coverage by Design", desc: "We position a camera at every gate entry specifically to document who enters with which pet — essential for tying inside incidents to specific owners." },
              { num: "02", title: "Licensed Professionals", desc: "License #B03066901. Licensed team, no subcontractors, all conduit and weatherproofing handled to Houston climate standards." },
              { num: "03", title: "Direct Local Access", desc: "Tim Townsend is reachable when you need footage pulled for a dog bite claim or dispute — same day, same contact, no call center." },
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
                Dog Park Camera Questions Answered
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Specific answers for HOA boards managing dog park incidents and disputes.
            </p>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                q: "What types of dog park incidents does camera footage help resolve?",
                a: (
                  <span>
                    Dog bites are the most common and most expensive incident type — both for the HOA's liability and for involved residents. Footage documents the animals involved, the owners present, and the circumstances of the incident. He-said-she-said disputes between residents over whose dog was aggressive, whether a dog was on a leash, or what provoked the incident are very common at community dog parks. Objective footage resolves these disputes definitively.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free assessment</Link>{" "}
                    to review your dog park coverage.
                  </span>
                ),
              },
              {
                q: "Is the HOA liable for dog bites that happen in the dog park?",
                a: (
                  <span>
                    Liability depends on the specific circumstances, your governing documents, and applicable local laws. However, HOA liability exposure is significantly affected by whether the board can demonstrate due diligence in maintaining the facility and monitoring for rule compliance. Camera footage that shows the HOA maintained the space and that the incident was caused by a specific pet owner's negligence rather than a facility deficiency is essential documentation for your HOA's attorney and insurance carrier. Call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss your specific situation.
                  </span>
                ),
              },
              {
                q: "Can cameras identify which dog and owner were involved in an incident?",
                a: (
                  <span>
                    Yes — when cameras are positioned correctly. We design dog park camera placements to capture the entry gate (where owners and dogs enter and can be individually identified) as well as the interior of the park. An incident that occurs inside the park can be tied to an owner by reviewing footage of who entered with which dog before the incident occurred. This is how surveillance footage is most effectively used in dog park dispute resolution.
                  </span>
                ),
              },
              {
                q: "What if the dog park has multiple entry gates?",
                a: (
                  <span>
                    We design camera coverage for every entry and exit point in the dog park — typically including both large dog and small dog enclosures if your park has a divided layout. Each gate entry is covered to document who enters with which pet. Interior coverage addresses the full park area. We assess your specific dog park layout during the{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free property visit</Link>.
                  </span>
                ),
              },
              {
                q: "Can cameras help enforce the registration or vaccination requirement for dogs?",
                a: (
                  <span>
                    Cameras at the entry gate document which residents are bringing their pets into the park, which can support enforcement of pet registration requirements. While cameras cannot verify vaccination status, they document which resident and which dog accessed the facility — providing the management team with a record they can cross-reference against registration records when a violation or complaint is filed.
                  </span>
                ),
              },
              {
                q: "How long should dog park footage be retained?",
                a: (
                  <span>
                    Dog bite incidents in particular have a longer reporting tail — a dog bite may not result in a formal complaint or legal action until days or weeks after the incident. We recommend 60 days minimum retention for dog park footage. We size storage to your specified retention period during installation.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request your free assessment</Link>{" "}
                    and we'll design a storage configuration for your needs.
                  </span>
                ),
              },
              {
                q: "Do cameras deter problem behavior in dog parks?",
                a: (
                  <span>
                    The visible presence of cameras has a measurable effect on behavior in monitored spaces. Residents who know the dog park is under surveillance are more likely to follow leash rules, clean up after their pets, and supervise their dogs appropriately. This deterrent effect on rule-bending behavior is as valuable as the incident documentation capability for day-to-day management of the amenity.
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

export default DogParkCameras;
