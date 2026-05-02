import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import {
  Camera, Shield, CheckCircle2, ArrowRight, Phone,
  Eye, MapPin, Clock, Maximize2, Plus, Minus, Car, Lock
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const features = [
  { icon: Car,      title: "License Plate Recognition (LPR)", desc: "Every vehicle entering and exiting your community is captured and logged — day and night — with high-resolution LPR cameras purpose-built for gate environments." },
  { icon: Maximize2, title: "Wide-Angle Entry Coverage",      desc: "Multiple cameras cover the full approach, lane, pedestrian path, and exit. No angle is left unmonitored." },
  { icon: Eye,       title: "Night Vision & IR Illumination", desc: "Specialized IR illumination gives you clear plate and facial detail even in complete darkness — tested and verified before we leave the site." },
  { icon: Lock,      title: "Video Intercom Integration",     desc: "Pair your surveillance system with video intercom for complete visitor identification and access control at every entry point." },
  { icon: Clock,     title: "After-Hours Monitoring",         desc: "24/7 recording backed by Verizon cellular means your gate footage is available whenever an incident is reported — not just during business hours." },
  { icon: Shield,    title: "Incident Documentation",         desc: "Export timestamped footage for police reports, HOA hearings, insurance claims, or resident dispute resolution in minutes." },
];

const faqsForSchema = [
  { question: "How many cameras does a gate entrance system typically require?", answer: "Most single-lane residential gates require a minimum of two cameras: one LPR camera aimed at the inbound lane at the optimal angle for plate capture, and one wide-angle camera covering the full approach and pedestrian access. Two-lane or dual-direction entrances require additional cameras. Multi-entrance communities need independent setups at each gate. We assess your specific layout and design the exact camera positions before installation." },
  { question: "Can LPR cameras read plates at night?", answer: "Yes. Our LPR cameras use dedicated IR illumination designed for nighttime plate capture — not generic security cameras repurposed for LPR. We test every installation in darkness before we consider the job complete. If the plate isn't readable, we adjust angle, illumination, or focal length until it is." },
  { question: "What happens if a vehicle tailgates through the gate?", answer: "LPR cameras with wide-angle coverage capture every vehicle in the lane, regardless of whether the gate opened for them. If a vehicle follows another without authorization, the footage documents both vehicles with timestamp and plate data. Many of our HOA clients use this footage to identify and address unauthorized entry." },
  { question: "Can the gate camera footage be accessed remotely?", answer: "Yes. Board members, property managers, and authorized personnel can view live and recorded gate footage from any device — phone, tablet, or desktop — with secure login credentials. No IT infrastructure is required on your end." },
  { question: "How long is gate footage stored?", answer: "Storage duration depends on your system configuration and the number of cameras. Most installations are set up for 30 to 90 days of continuous recording, stored locally on-site. We size the storage capacity to your camera count and desired retention period during the system design phase." },
  { question: "Will the cameras hold up in Houston's heat and weather?", answer: "All cameras installed by Texas Total Security are rated for outdoor use in extreme conditions — including the heat, humidity, and storm exposure Houston delivers. We use weatherproof, vandal-resistant housings and route all cabling through conduit to protect against the elements." },
  { question: "Can you integrate with our existing gate operator or intercom?", answer: "In most cases, yes. We work with the most common gate operator brands and can integrate camera systems alongside your existing infrastructure. We assess compatibility during the site visit and design accordingly." },
  { question: "What if our HOA has multiple entrances?", answer: "We design and install systems covering every entry point in your community — from a single gate to master-planned communities with multiple entrances and miles of perimeter. Every entrance gets the same quality of coverage, and all cameras are managed from a single platform." },
];

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
    { name: "Gate & Entrance Cameras", href: "/hoa-security/gates-entrances" },
  ]),
  generateFAQSchema(faqsForSchema),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gate & Entrance Camera Systems for HOA Communities",
    provider: { "@type": "LocalBusiness", name: "Texas Total Security" },
    serviceType: "Security Camera Installation",
    areaServed: "Houston, TX",
    description: "LPR gate cameras, wide-angle entry coverage, and 24/7 recording for HOA communities and apartment complexes throughout Houston.",
    url: "https://www.texastotalsecurity.com/hoa-security/gates-entrances",
  },
];

const GateEntranceCameras = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Gate & Entrance Camera Systems for HOA Communities | Texas Total Security"
        description="LPR cameras, wide-angle entry coverage & 24/7 recording at every gate and entrance. Serving Houston HOA communities and apartment complexes. Free property assessment."
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
              Gate & Entrance Camera Systems<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>for HOA Communities</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "34rem" }}>
              Every vehicle that enters or exits your community should be documented. LPR cameras, wide-angle coverage, and 24/7 recording — designed for the gate environments where it matters most.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "License plate recognition at every entry and exit — day and night",
                "Wide-angle cameras covering full approach, lane, and pedestrian access",
                "24/7 recording over Verizon cellular — always on, always accessible",
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
                <MapPin className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>The Problem</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                No Documentation Means No Accountability at Your Gate
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                The gate is the first line of defense for any community — and the most frequently cited location when incidents happen. Without LPR cameras and proper coverage, your HOA has no record of who entered, when they entered, or whether they were authorized. When a car break-in happens in the parking lot, a package is stolen from a resident's door, or an unauthorized person is seen in a common area — the first question law enforcement asks is: "Do you have gate footage?"
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                A basic camera pointed at the gate isn't enough. Plate capture requires the right lens, the right angle, and the right IR illumination. Without purpose-built LPR cameras, you'll have footage that shows a vehicle passed through — but not which vehicle. That footage is useless to investigators.
              </p>
              <div className="space-y-3">
                {[
                  "No record of who enters or exits after hours",
                  "Unauthorized vehicles with no plate documentation",
                  "Incidents happen inside the community with no evidence trail",
                  "HOA liability exposure without footage for disputes or lawsuits",
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
                What a Proper Gate System Solves
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Vehicle Documentation", desc: "Every plate captured — both directions, every hour of the day." },
                  { label: "Unauthorized Entry Evidence", desc: "Tailgating, forced entry, and after-hours access are all on record." },
                  { label: "Visitor Management Support", desc: "Video intercom integration lets staff or residents verify visitors remotely." },
                  { label: "Law Enforcement Cooperation", desc: "Export footage in minutes when police or management need documentation." },
                  { label: "HOA Board Accountability", desc: "Board members access footage remotely — no relying on staff reports." },
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
              Gate & Entrance Camera Systems Built for HOA Communities
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Every component is selected and positioned specifically for gate environments — not generic cameras pointed at the road.
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
              Get a Free Gate Camera Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DARK TRUST STRIP ── */}
      <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "LPR Tested in the Field", desc: "We verify plate capture quality at night before calling an installation complete. If the plate isn't readable, we adjust until it is." },
              { num: "02", title: "Licensed Professionals", desc: "Every installation is performed by our licensed team — License #B03066901. No subcontractors, no handoffs." },
              { num: "03", title: "One Local Team", desc: "When your community needs footage retrieved or a camera serviced, you reach Tim Townsend directly — not a call center." },
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
                Gate Camera Questions Answered
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Specific answers for HOA boards and property managers evaluating gate camera systems.
            </p>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                q: "How many cameras does a gate entrance system typically require?",
                a: (
                  <span>
                    Most single-lane residential gates require a minimum of two cameras: one LPR camera aimed at the inbound lane at the optimal angle for plate capture, and one wide-angle camera covering the full approach and pedestrian access. Two-lane or dual-direction entrances require additional cameras. Multi-entrance communities need independent setups at each gate. We assess your specific layout during a{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free property assessment</Link>{" "}
                    and design the exact camera positions before installation.
                  </span>
                ),
              },
              {
                q: "Can LPR cameras read plates at night?",
                a: (
                  <span>
                    Yes. Our LPR cameras use dedicated IR illumination designed for nighttime plate capture — not generic security cameras repurposed for LPR. We test every installation in darkness before we consider the job complete. If the plate isn't readable, we adjust angle, illumination, or focal length until it is. Call us at{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss your specific gate layout.
                  </span>
                ),
              },
              {
                q: "What happens if a vehicle tailgates through the gate?",
                a: (
                  <span>
                    LPR cameras with wide-angle coverage capture every vehicle in the lane, regardless of whether the gate opened for them. If a vehicle follows another without authorization, the footage documents both vehicles with timestamp and plate data. Many of our HOA clients use this footage in conjunction with management companies to identify and address unauthorized entry. We can also design coverage that flags multiple vehicles passing simultaneously.
                  </span>
                ),
              },
              {
                q: "Can the gate camera footage be accessed remotely?",
                a: (
                  <span>
                    Yes. Board members, property managers, and authorized personnel can view live and recorded gate footage from any device — phone, tablet, or desktop — with secure login credentials. No IT infrastructure is required on your end. This is one of the most-used features by HOA boards who want direct access without relying on a property management company to pull footage.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule your free assessment</Link>{" "}
                    to learn more about the remote access setup process.
                  </span>
                ),
              },
              {
                q: "How long is gate footage stored?",
                a: (
                  <span>
                    Storage duration depends on your system configuration and the number of cameras. Most installations are set up for 30 to 90 days of continuous recording, stored locally on-site. We size the storage capacity to your camera count and desired retention period during the system design phase. Longer retention is available and recommended for high-traffic gates.
                  </span>
                ),
              },
              {
                q: "Will the cameras hold up in Houston's heat and weather?",
                a: (
                  <span>
                    All cameras installed by Texas Total Security are rated for outdoor use in extreme conditions — including the heat, humidity, and storm exposure Houston delivers. We use weatherproof, vandal-resistant housings and route all cabling through conduit to protect against the elements. Our systems are built for the Houston climate specifically — not a generic national product.
                  </span>
                ),
              },
              {
                q: "Can you integrate with our existing gate operator or intercom?",
                a: (
                  <span>
                    In most cases, yes. We work with the most common gate operator brands and can integrate camera systems alongside your existing infrastructure. We assess compatibility during the site visit and design accordingly. If you're also looking at a full security pole installation at the gate, visit our{" "}
                    <Link to="/security-pole-configurator" className="text-red-600 font-semibold hover:underline">Security Pole Configurator</Link>{" "}
                    to explore options.
                  </span>
                ),
              },
              {
                q: "What if our HOA has multiple entrances?",
                a: (
                  <span>
                    We design and install systems covering every entry point in your community — from a single gate to master-planned communities with multiple entrances and miles of perimeter. Every entrance gets the same quality of coverage, and all cameras are managed from a single platform.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request your free property assessment</Link>{" "}
                    and we'll map coverage for every entrance.
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

export default GateEntranceCameras;
