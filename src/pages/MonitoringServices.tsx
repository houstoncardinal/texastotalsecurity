import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Radio, MapPin, Clock, Shield, PhoneCall, CheckCircle2, Phone, Star, Signal, Bell, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

const benefits = [
  { icon: Signal, title: "Cellular Communication", desc: "Alarm signals communicate over cellular paths instead of depending on Wi-Fi or traditional phone lines." },
  { icon: PhoneCall, title: "Proactive Account Support", desc: "When equipment or communication problems appear, our local team helps address them before they become bigger issues." },
  { icon: MapPin, title: "Local Account Management", desc: "Your account is managed by Texas Total Security, not passed around a national call-center system." },
  { icon: Shield, title: "Certified Monitoring Partner", desc: "Alarm events are handled through our certified monitoring partner center with trained operators and dispatch workflows." },
  { icon: Bell, title: "Signal Verification", desc: "Monitoring is configured around clear alarm events, emergency contacts, dispatch instructions, and property-specific response needs." },
  { icon: Clock, title: "24/7/365 Coverage", desc: "Monitoring remains active every day of the year, including nights, weekends, holidays, and severe weather events." },
];

const monitoringTypes = [
  "Alarm Monitoring — 24/7 professional alarm monitoring with dispatch workflows",
  "System Takeover Monitoring — activate compatible existing equipment under Texas Total Security",
  "Cellular Communication — alarm signal paths that do not rely on Wi-Fi or landline service",
  "Custom Instructions — emergency contacts, dispatch preferences, and site-specific notes",
];

const faqs = [
  {
    question: "What type of monitoring do you provide?",
    answer: (
      <span>
        We provide professional 24/7 alarm monitoring through our certified dispatch partner. When your alarm triggers, trained operators verify the event and dispatch the appropriate local authorities.{" "}
        <Link to="/alarm-systems" className="text-red-600 font-semibold hover:underline">Learn more about our alarm systems</Link>{" "}
        or call <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a> with questions.
      </span>
    ),
  },
  {
    question: "Does your company ever transfer or sell monitoring accounts to other companies?",
    answer: (
      <span>
        Never. Your account is managed by Texas Total Security, with monitoring handled through our certified partner center. We do not sell or transfer your account to a national alarm company — unlike many providers.{" "}
        <Link to="/reviews" className="text-red-600 font-semibold hover:underline">Read what our Houston customers say</Link>{" "}
        about our service consistency.
      </span>
    ),
  },
  {
    question: "Can you monitor my existing alarm system?",
    answer: (
      <span>
        In most cases, yes. We can often take over compatible alarm panels and activate professional monitoring without replacing every device.{" "}
        <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">See how our alarm takeover program works</Link>{" "}
        or{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">schedule a free assessment</Link>{" "}
        and we'll evaluate your existing equipment.
      </span>
    ),
  },
  {
    question: "What if my current monitoring is unreliable?",
    answer: (
      <span>
        We inspect communication paths, panel condition, cellular modules, sensors, and account programming to determine what needs to be corrected before monitoring is activated. Call{" "}
        <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
        or{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">schedule a free system review</Link>{" "}
        — we'll diagnose and fix your monitoring issues.
      </span>
    ),
  },
];

const monitoringSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "24/7 Alarm Monitoring Houston TX — Professional Monitoring",
    "Professional 24/7 alarm monitoring for Houston homes and businesses. Cellular communication, system takeovers, local account management, and certified dispatch support.",
    "/monitoring-services",
    "Alarm Monitoring Service",
    ["alarm monitoring Houston TX", "24/7 alarm monitoring Houston", "professional alarm monitoring Houston", "security monitoring company Houston", "alarm system takeover Houston"]
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Monitoring Services", href: "/monitoring-services" },
  ]),
];

const MonitoringServices = () => (
  <Layout>
    <SEOHead
      title="Alarm Monitoring Houston TX | 24/7 Professional Monitoring"
      description="Professional 24/7 alarm monitoring in Houston, TX. Cellular communication, alarm system takeovers, local account management, certified dispatch support, and responsive service."
      schemas={monitoringSchemas}
    />

    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img src="/honeywell.jpg" alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.91)_48%,rgba(10,10,10,0.74)_100%)]" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_460px] gap-8 lg:gap-10 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <Radio className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                24/7 Professional Monitoring · Houston
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Monitoring should be accountable before, during, and after an alarm event.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Texas Total Security manages your account locally while alarm signals are handled through a certified monitoring partner center with clear dispatch procedures.
            </p>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
              {[
                { label: "24/7", sublabel: "monitoring coverage" },
                { label: "Cellular", sublabel: "communication paths" },
                { label: "Local", sublabel: "account management" },
                { label: "Takeover", sublabel: "existing systems" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-white">{stat.label}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{stat.sublabel}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
              <span>Licensed & Insured · LIC# B03066901</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-red-400" /> Local Support</span>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}>
            <LeadForm
              title="Switch to Professional Monitoring"
              subtitle="Use the quick form or guided prompts. We will review your current system and options."
              showServiceType
              defaultServiceType="monitoring"
              referringPage="/monitoring-services"
              compact
              className="shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-start">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }} className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
              <Shield className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">Monitoring Difference</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
              Designed for reliability, not call-center confusion.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Monitoring depends on working equipment, proper programming, cellular communication, and a team that answers when something needs attention.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }}
                className="bg-white p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-red-50 border border-red-100 mb-4">
                  <b.icon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-display font-bold text-gray-950">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-red-600/10 border border-red-500/25">
              <Wrench className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">What We Configure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              Monitoring service should match the property and the people responding.
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              We help configure the details that make monitoring useful: contacts, dispatch instructions, zones, cellular communication, and escalation priorities.
            </p>
          </div>
          <div className="grid gap-2">
            {monitoringTypes.map((item) => (
              <div key={item} className="flex items-start gap-3 border border-white/10 bg-white/[0.035] p-4">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed text-white/65">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Phone className="w-9 h-9 text-red-600 mx-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">Want to discuss monitoring first?</h2>
        <p className="mt-3 text-gray-600 leading-relaxed">Call Texas Total Security and speak with a local team member about your current system.</p>
        <a href="tel:7133879937" className="mt-6 btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
          <Phone className="w-4 h-4" /> Call (713) 387-9937
        </a>
      </div>
    </section>

    <FAQSection items={faqs} />
  </Layout>
);

export default MonitoringServices;
