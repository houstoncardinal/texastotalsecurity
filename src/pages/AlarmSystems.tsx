import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Shield, Radio, RefreshCw, Wifi, AlertTriangle, Keyboard, Lock, Bell, CheckCircle2, ArrowRight, Phone, Star } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0 },
};

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 };

const features = [
  { icon: Shield, title: "Alarm Installation", desc: "Professional installation of hardwired, wireless, and hybrid alarm systems tailored to your property." },
  { icon: Radio, title: "24/7 Local Monitoring", desc: "Houston-based monitoring with fast local dispatch — not a distant national call center." },
  { icon: RefreshCw, title: "System Takeover", desc: "Already have a system? We can take it over and activate it on our local monitoring." },
  { icon: Wifi, title: "Wireless Systems", desc: "Modern wireless alarm solutions with cellular backup for reliable communication." },
  { icon: AlertTriangle, title: "Panic & Duress", desc: "Panic buttons, key fob remotes, and silent duress codes for emergency situations." },
  { icon: Keyboard, title: "Smart Keypads", desc: "Touchscreen keypads with user codes, schedules, and easy arm/disarm." },
  { icon: Lock, title: "Glass Break & Sensors", desc: "Door/window contacts, motion detectors, glass break sensors, and environmental monitoring." },
  { icon: Bell, title: "Sirens & Strobes", desc: "Interior/exterior sirens and alarm strobes to alert and help law enforcement." },
];

const alarmEquipment = [
  "Alarm Systems (Hardwired and Wireless) — Arm on AWAY when you leave, or STAY to protect you while at home",
  "Alarm Keypad — Arm/Disarm with Panic Button, Police, Fire, and Emergency Medical dispatch",
  "Key Fob or Keychain Remote — Remotely Arm or Disarm with Panic Button",
  "Medical Pendants — Necklace or Watch to remotely communicate for medical emergencies",
  "Hard Wired or Wireless Panic Button — Silent Alarm for Law Enforcement dispatch",
  "Motion Detector (PIR) — Triggered by humans walking in front of sensor",
  "Glass Break Sensor — Triggered when glass is broken at a window or door",
  "Door Sensor — Triggered when the door is opened",
  "Window Sensor — Triggered when the window is opened",
  "Outdoor Siren — Audible alarm to alert people and help law enforcement locate the event",
  "Indoor Siren — Audible noise inside home or business",
  "Alarm Strobe — Strobe light outside to signal an event and guide law enforcement",
  "Smart Home / Automation System — Tied into Audio/Video, Thermostats, Door Locks, Garage Doors, Lighting",
  "Alarm Monitoring — Through Dispatch Center located in San Antonio, TX",
  "Video Monitoring — Double Verified Video Monitoring triggered by alarm events",
  "Video Guard Patrol — Monitoring station logs into cameras at scheduled times",
  "Custom Monitoring Services — Specific environments monitored for specific events",
];

const faqs = [
  { question: "Do you provide both installation and monitoring services?", answer: "Yes. Texas Total Security offers complete alarm system installation and alarm system monitoring services. Our technicians handle everything from designing and installing your system to connecting it to our Houston-based monitoring center for 24/7 protection." },
  { question: "Can you install security systems for both homes and businesses?", answer: "Absolutely. We design and install custom alarm and surveillance systems for both residential and commercial properties." },
  { question: "How long does it take to install a new alarm system?", answer: "Most residential systems can be installed within a few hours to a full day, depending on property size and complexity." },
  { question: "Can I use my current system from another alarm company?", answer: "Yes. In many cases, we can take over monitoring of your existing alarm equipment, allowing you to avoid the cost of a full replacement." },
  { question: "Switching from another alarm company?", answer: "Switching is easier than you might think. Our team handles the transition smoothly, minimizing downtime and ensuring your system is protected throughout." },
  { question: "Can you take over my existing alarm system?", answer: "Yes. We regularly take over systems from ADT, Brinks, Vivint, and other providers." },
  { question: "What's the difference between hardwired and wireless alarms?", answer: "Hardwired systems use physical wiring — extremely reliable for new construction. Wireless systems use radio signals and are ideal for existing homes. We also install hybrid systems." },
  { question: "What happens during a power outage?", answer: "All our systems include battery backup. Cellular communication ensures your system stays connected even if phone or internet lines are down." },
  { question: "What is the cost of switching alarm companies?", answer: "In many cases, there is minimal cost to switch. We often take over your existing alarm equipment at no charge, eliminating the need for new hardware. Contact us for a free assessment and we'll provide transparent pricing with no surprises." },
  { question: "How long does it take to switch alarm companies?", answer: "Most alarm company switches are completed in a single visit. Our technicians reprogram your existing panel, test all sensors, and connect your system to our local Houston monitoring center — typically within a few hours." },
];

const alarmSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Alarm System Installation & Monitoring — Houston TX",
    "Custom alarm system design, professional installation, and 24/7 local monitoring for homes and businesses in Houston, TX. System takeovers from ADT, Brinks, Vivint. Licensed & insured.",
    "/alarm-systems",
    "Alarm System Installation",
    ["switch alarm company Houston TX", "local alarm company Houston", "cancel ADT Houston", "local alarm system Houston", "local burglar alarm Houston", "alarm companies near me Houston", "best alarm companies Houston", "local alarm monitoring Houston", "change alarm company Houston", "Honeywell alarm installation Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Alarm Systems", href: "/alarm-systems" },
  ]),
];

const AlarmSystems = () => (
  <Layout>
    <SEOHead
      title="Switch Alarm Companies Houston TX | Local Alarm Installation & Monitoring | Texas Total Security"
      description="Ready to switch alarm companies? Houston's best local alarm company. Cancel ADT, Brinks or Vivint & switch to expert Honeywell installation with 24/7 local monitoring. System takeovers available. (713) 387-9937."
      schemas={alarmSchemas}
    />
    
    <PageHero
      title="Local Alarm Company in Houston, TX"
      subtitle="Switch alarm companies with zero hassle. Houston's top-rated local alarm company installs Honeywell systems, takes over from ADT, Brinks & Vivint, and provides 24/7 local monitoring — never outsourced."
      ctaText="Switch Your Alarm Today — Free Survey"
    />

    {/* ══════════════════════════════════════════════════
        INTRO SECTION — Switching Made Easy
    ══════════════════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.75, ease: easeExpo }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-gray-100"
            style={{ background: "linear-gradient(135deg, hsl(0 85% 45% / 0.02) 0%, white 100%)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(0 85% 45% / 0.08) 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <div className="w-12 h-1 rounded-full mb-6" style={{ background: "hsl(0 85% 50%)" }} />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
                Switching Alarm Companies? We Make It Easy.
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Finding the right local alarm company is critical for real protection. Texas Total Security is one of Houston's top-rated local alarm companies — and switching is simpler than you think.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Whether you want to cancel ADT, change from Brinks, drop Vivint, or just find the best local alarm company near you, our team handles the entire takeover process. We keep your existing equipment in most cases, saving you time and money.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        FEATURES GRID — Modern Card Design
    ══════════════════════════════════════════════════ */}
    <section className="section-padding" style={{ background: "hsl(0 0% 98%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "hsl(0 85% 45% / 0.06)",
              border: "1px solid hsl(0 85% 45% / 0.12)",
            }}
          >
            <Shield className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
              Our Services
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Protect What Matters Most
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            You deserve more than a one-size-fits-all security solution. Our alarm systems are custom-designed for your property.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
              className="group"
            >
              <div className="h-full rounded-2xl p-7 bg-white border border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 85% 45% / 0.08) 0%, hsl(0 85% 45% / 0.04) 100%)",
                    border: "1px solid hsl(0 85% 45% / 0.12)",
                  }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        LOCAL MONITORING SPLIT — Content + Equipment List
    ══════════════════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left — Content */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="w-12 h-1 rounded-full mb-6" style={{ background: "hsl(0 85% 50%)" }} />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Local Monitoring You Can Trust
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                Unlike national providers that route alerts through distant call centers, Texas Total Security delivers alarm system monitoring backed by a local, in-house dispatch team right here in Houston, TX.
              </p>
              <p>
                If you already have alarm equipment and are frustrated with your current provider, we make switching simple while maximizing the value of what you own.
              </p>
              <p className="font-semibold text-gray-900">
                We never sell your contract to a big national company — your security stays local.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Local Team", sublabel: "Houston-Based" },
                { label: "24/7", sublabel: "Local Monitoring" },
                { label: "Licensed", sublabel: "#B03066901" },
                { label: "5.0 ★", sublabel: "Google Rating" },
              ].map((badge) => (
                <div key={badge.label} className="rounded-xl p-4 border border-gray-200 bg-gray-50">
                  <p className="font-display font-bold text-2xl text-gray-900 mb-1">{badge.label}</p>
                  <p className="text-sm text-gray-500">{badge.sublabel}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Equipment List */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-2xl p-8 border border-gray-200 bg-white shadow-lg">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Alarm System Equipment
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {alarmEquipment.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 50%)" }} />
                    <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        CTA BANNER — Switch Today
    ══════════════════════════════════════════════════ */}
    <section className="section-padding relative overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(0 85% 45% / 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Switch Alarm Companies?
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get a free onsite security survey. We'll evaluate your existing equipment and show you how much you can save.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/free-analysis"
              className="btn-primary-gradient inline-flex items-center gap-2 text-base px-10 py-4"
            >
              Schedule Free Survey <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:7133879937"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-5 h-5" /> (713) 387-9937
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        LEAD FORM
    ══════════════════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadForm
          title="Get a Free Alarm System Quote"
          subtitle="Tell us about your property and we'll design a custom alarm solution."
        />
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        FAQ SECTION
    ══════════════════════════════════════════════════ */}
    <FAQSection items={faqs} />

    {/* ══════════════════════════════════════════════════
        FINAL CTA
    ══════════════════════════════════════════════════ */}
    <CTABlock />
  </Layout>
);

export default AlarmSystems;
