import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas } from "@/lib/seo";
import { Shield, Radio, RefreshCw, Cable, AlertTriangle, Keyboard, Lock, Bell, CheckCircle2, ArrowRight, Phone, DollarSign, PhoneOff, Star } from "lucide-react";
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

const painPoints = [
  {
    icon: AlertTriangle,
    color: "hsl(38 92% 50%)",
    bg: "hsl(38 92% 50% / 0.08)",
    border: "hsl(38 92% 50% / 0.2)",
    title: "Equipment Problems",
    subtitle: "Your system isn't working — and nobody's fixing it.",
    bullets: [
      "Bypassing zones just to be able to set your alarm",
      "Sensors that don't respond — door contacts, motion detectors, windows",
      "Alarm won't arm or disarm reliably",
      "Annoying beeping, chirping, or false alerts you can't resolve",
    ],
  },
  {
    icon: PhoneOff,
    color: "hsl(0 85% 50%)",
    bg: "hsl(0 85% 50% / 0.08)",
    border: "hsl(0 85% 50% / 0.2)",
    title: "Bad Customer Service",
    subtitle: "You can't get anyone to take your problems seriously.",
    bullets: [
      "Waiting on hold for 30+ minutes to reach a real person",
      "Problems reported months ago that still aren't fixed",
      "Getting bounced between departments with no resolution",
      "Feeling like just a number — not a customer",
    ],
  },
  {
    icon: RefreshCw,
    color: "hsl(220 85% 55%)",
    bg: "hsl(220 85% 55% / 0.08)",
    border: "hsl(220 85% 55% / 0.2)",
    title: "Outdated Equipment",
    subtitle: "Your system is years behind — and your family deserves better.",
    bullets: [
      "Old keypads, panels, and sensors that are past their prime",
      "No smartphone access or remote monitoring capability",
      "Missing cameras, glass break sensors, or smart alerts",
      "Technology that no longer meets today's security standards",
    ],
  },
  {
    icon: DollarSign,
    color: "hsl(142 70% 40%)",
    bg: "hsl(142 70% 40% / 0.08)",
    border: "hsl(142 70% 40% / 0.2)",
    title: "Paying Too Much",
    subtitle: "You were oversold — and you've felt it every month since.",
    bullets: [
      "Monthly monitoring bills that keep climbing with no explanation",
      "Paying for features or equipment you don't actually use",
      "Locked into a long-term contract you can't get out of",
      "Overpaying for service you can't even reach when something goes wrong",
    ],
  },
];

const features = [
  { icon: Shield, title: "Alarm Installation", desc: "Professional installation of hardwired alarm systems tailored to your property." },
  { icon: Radio, title: "24/7 Professional Monitoring", desc: "Certified partner monitoring center with fast dispatch — trained operators ready to respond when it matters." },
  { icon: RefreshCw, title: "System Takeover", desc: "Already have a system? We can take it over and activate it on our professional monitoring." },
  { icon: Cable, title: "Hardwired Systems", desc: "Reliable hardwired alarm solutions with cellular backup for dependable communication." },
  { icon: Keyboard, title: "Smart Keypads", desc: "Touchscreen keypads with user codes, schedules, and easy arm/disarm." },
  { icon: Lock, title: "Glass Break & Sensors", desc: "Door/window contacts, motion detectors, and glass break sensors for full perimeter coverage." },
];

const alarmEquipment = [
  "Touchscreen Alarm Keypads with Panic Buttons",
  "Door / Window Contact Sensors",
  "Motion Detectors with Pet Immunity",
  "Glass Break Sensors",
  "Indoor / Outdoor Sirens & Strobes",
  "Smart Home Integration",
  "Cellular Backup Communication",
  "24/7 Professional Monitoring",
];

const faqs = [
  { question: "My alarm has sensors that don't work and zones I have to bypass — can you fix that?", answer: "Absolutely. This is one of the most common reasons Houston homeowners switch to us. We assess your existing equipment, identify every faulty sensor and bypassed zone, and fix or replace what's broken. In many cases we do this during the same visit we switch your monitoring." },
  { question: "I've been trying to get my alarm company to fix problems for months with no results — what do you do differently?", answer: "When you call Texas Total Security, you reach a real local person — not a national call center. When something needs attention with your system, we call you first. You shouldn't have to chase your alarm company. Our team is in Houston, our technicians are local, and your problems get resolved — not passed around." },
  { question: "My equipment is old and outdated — do I have to replace everything to switch?", answer: "Not necessarily. We evaluate your existing Honeywell, DSC, 2GIG, or compatible equipment and determine what's worth keeping versus upgrading. In many cases we can reprogram your existing panel and bring it up to current standards. We'll be straightforward about what needs to go and what doesn't." },
  { question: "I feel like I was oversold and I'm paying too much — can switching actually save me money?", answer: "Most customers who switch to Texas Total Security pay less per month on monitoring than they did before — often significantly less. We offer transparent, straightforward pricing with no hidden fees. Fill out our free assessment and we'll show you a direct comparison of what you're paying now versus what you'd pay with us." },
  { question: "Am I stuck if I'm still in a contract?", answer: "Not necessarily. We'll review your contract details during the free assessment. Some contracts have conditions that allow you to exit — equipment problems that went unresolved, service failures, or recent changes in terms. We'll give you an honest answer about your options." },
  { question: "How long does switching alarm companies take?", answer: "Most switches are completed in a single visit — typically a few hours. We reprogram your existing panel, test every sensor, replace any faulty components, and activate professional 24/7 monitoring before we leave." },
  { question: "What happens during a power outage?", answer: "All our systems include battery backup and communicate over Verizon cellular — not your internet or landline. When a storm knocks out your Wi-Fi or a deep freeze disrupts phone lines, your alarm stays fully connected and monitored." },
  { question: "Can you install a completely new alarm system if my equipment isn't salvageable?", answer: "Yes. We design and install complete hardwired alarm systems for Houston homes and businesses. If your current equipment isn't worth keeping, we'll build you a new system from scratch." },
];

const faqsDisplay = [
  {
    question: "My alarm has sensors that don't work and zones I have to bypass — can you fix that?",
    answer: (
      <span>
        Absolutely. This is one of the most common reasons Houston homeowners switch to us. We assess your existing equipment, identify every faulty sensor and bypassed zone, and fix or replace what's broken. In many cases we do this during the same visit we switch your monitoring.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free assessment</Link>{" "}
        and we'll document every issue before recommending anything.
      </span>
    ),
  },
  {
    question: "I've been trying to get my alarm company to fix problems for months with no results — what do you do differently?",
    answer: (
      <span>
        When you call Texas Total Security, you reach a real local person — not a national call center. When something needs attention with your system, we call you first. You shouldn't have to chase your alarm company. Our team is in Houston, our technicians are local, and your problems get resolved — not passed around.{" "}
        <Link to="/reviews" className="text-red-600 font-semibold hover:underline">Read what Houston customers say about our service</Link>.
      </span>
    ),
  },
  {
    question: "My equipment is old and outdated — do I have to replace everything to switch?",
    answer: (
      <span>
        Not necessarily. We evaluate your existing Honeywell, DSC, 2GIG, or compatible equipment and determine what's worth keeping versus upgrading. In many cases we can reprogram your existing panel and bring it up to current standards.{" "}
        <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">See how our alarm takeover process works</Link>{" "}
        — we'll be straightforward about what needs to go and what doesn't.
      </span>
    ),
  },
  {
    question: "I feel like I was oversold and I'm paying too much — can switching actually save me money?",
    answer: (
      <span>
        Most customers who switch to Texas Total Security pay less per month on monitoring than they did before — often significantly less. We offer transparent, straightforward pricing with no hidden fees.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Fill out our free assessment</Link>{" "}
        and we'll show you a direct comparison of what you're paying now versus what you'd pay with us.
      </span>
    ),
  },
  {
    question: "Am I stuck if I'm still in a contract?",
    answer: (
      <span>
        Not necessarily. We'll review your contract details during the{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free assessment</Link>.
        {" "}Some contracts have conditions that allow you to exit — equipment problems that went unresolved, service failures, or recent changes in terms. We'll give you an honest answer about your options. Call{" "}
        <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
        to discuss your situation.
      </span>
    ),
  },
  {
    question: "How long does switching alarm companies take?",
    answer: (
      <span>
        Most switches are completed in a single visit — typically a few hours. We reprogram your existing panel, test every sensor, replace any faulty components, and activate professional 24/7 monitoring before we leave.{" "}
        <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">Learn more about the switching process</Link>{" "}
        or call <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a> to schedule.
      </span>
    ),
  },
  {
    question: "What happens during a power outage?",
    answer: (
      <span>
        All our systems include battery backup and communicate over Verizon cellular — not your internet or landline. When a storm knocks out your Wi-Fi or a deep freeze disrupts phone lines, your alarm stays fully connected and monitored.{" "}
        <Link to="/monitoring-services" className="text-red-600 font-semibold hover:underline">Learn more about our monitoring reliability</Link>.
      </span>
    ),
  },
  {
    question: "Can you install a completely new alarm system if my equipment isn't salvageable?",
    answer: (
      <span>
        Yes. We design and install complete hardwired alarm systems for Houston homes and businesses. If your current equipment isn't worth keeping, we'll build you a new system from scratch.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free assessment</Link>{" "}
        and we'll design the right system for your property.
      </span>
    ),
  },
];

const alarmSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Alarm System Installation & Monitoring — Houston TX",
    "Custom alarm system design, professional installation, and 24/7 professional monitoring for homes and businesses in Houston, TX. We take over existing alarm systems from all providers. Licensed & insured.",
    "/alarm-systems",
    "Alarm System Installation",
    ["switch alarm company Houston TX", "local alarm company Houston", "change alarm provider Houston", "local alarm system Houston", "local burglar alarm Houston", "alarm companies near me Houston", "best alarm companies Houston", "professional alarm monitoring Houston", "change alarm company Houston", "alarm system takeover Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Alarm Systems", href: "/alarm-systems" },
  ]),
  generateAllServicesSchemas()[7],
  generateFAQSchema(faqs),
];

const AlarmSystems = () => (
  <Layout>
    <SEOHead
      title="Alarm System Installation Houston TX | 24/7 Monitoring | Texas Total Security"
      description="Professional alarm system installation and 24/7 monitoring for Houston homes & businesses. Local, licensed, and trusted for 15+ years."
      schemas={alarmSchemas}
    />

    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img
          src="/keypads-collage.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.90)_44%,rgba(10,10,10,0.72)_100%)]" />
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
        <div className="grid lg:grid-cols-[minmax(0,1fr)_460px] gap-7 lg:gap-9 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                Hardwired Alarm Systems · Houston
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Houston Alarm System Installation, Takeovers & 24/7 Professional Monitoring.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Hardwired alarm systems, problem-zone repairs, system takeovers, and Verizon cellular monitoring from a licensed Houston security company.
            </p>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
              {[
                { label: "Hardwired", sublabel: "systems only" },
                { label: "Verizon", sublabel: "cellular monitoring" },
                { label: "Local", sublabel: "owner access" },
                { label: "Single Visit", sublabel: "most switches" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-white">{stat.label}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{stat.sublabel}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
                <Phone className="w-4 h-4" /> Call (713) 387-9937
              </a>
              <a href="#alarm-details" className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                See What We Fix <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
              <span>Licensed & Insured · LIC# B03066901</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-red-400" /> 5-Star Rated</span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}
            className="lg:justify-self-end w-full"
          >
            <LeadForm
              title="Free Alarm Assessment"
              subtitle="Tell us what is happening with your current system. We will review your options."
              showServiceType
              defaultServiceType="alarm"
              referringPage="/alarm-systems"
              compact
              className="shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <section id="alarm-details" className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-10 items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">
                Why People Switch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
              A better alarm company should feel obvious from the first call.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              If your system has bypassed zones, unreliable sensors, outdated equipment, poor service, or a monthly bill that keeps climbing, we can inspect it, clean it up, and move your monitoring locally.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a href="tel:7133879937" className="inline-flex items-center justify-center gap-2 bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
                <Phone className="w-4 h-4" /> Talk to a Local Person
              </a>
              <Link to="/switch-my-alarm" className="inline-flex items-center justify-center gap-2 border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 hover:border-red-200 hover:bg-red-50 transition-colors">
                Start Switch Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }}
                className="border border-gray-200 bg-gray-50 p-5 hover:border-red-200 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white border border-gray-200">
                    <point.icon className="w-5 h-5" style={{ color: point.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-950 leading-tight">{point.title}</h3>
                    <p className="mt-1 text-sm font-medium" style={{ color: point.color }}>{point.subtitle}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {point.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span className="text-sm leading-relaxed text-gray-600">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-stretch">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 sm:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <div className="absolute right-0 top-0 h-40 w-40 bg-red-600/10 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-red-600/10 border border-red-500/25">
                <Cable className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">Hardwired · Monitored · Accountable</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                Enterprise-grade alarm protection, built around real coverage.
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                Every system is planned around the points that actually protect a property: doors, windows, motion zones, glass break, emergency response, cellular communication, and professional monitoring through our certified San Antonio partner center.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "24/7", sublabel: "Certified monitoring" },
                  { label: "Cellular", sublabel: "Verizon network" },
                  { label: "Local", sublabel: "Account management" },
                  { label: "Licensed", sublabel: "B03066901" },
                ].map((badge) => (
                  <div key={badge.label} className="border border-white/10 bg-black p-4">
                    <p className="font-display text-2xl font-bold">{badge.label}</p>
                    <p className="mt-1 text-xs text-white/40">{badge.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.035 }}
                className="bg-black p-5 hover:bg-white/[0.045] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-red-500/10 border border-red-500/20">
                    <feature.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold leading-tight">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
              <Radio className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">Professional Monitoring</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
              Reliable coverage, clear equipment, and no national call-center maze.
            </h2>
            <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
              <p>
                Texas Total Security delivers professional 24/7 alarm monitoring with fast response times and trained operators who take action the moment your alarm triggers.
              </p>
              <p>
                If you already have alarm equipment and are frustrated with your current provider, we make switching simple while maximizing the value of what you own.
              </p>
              <p className="font-semibold text-gray-900">
                Your account is managed by Texas Total Security, with alarm signals handled through our certified partner monitoring center in San Antonio.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h3 className="text-xl font-display font-bold text-gray-950 mb-4">Alarm System Equipment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {alarmEquipment.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className="flex items-start gap-2.5 bg-white p-3 border border-gray-100"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <FAQSection items={faqsDisplay} />
  </Layout>
);

export default AlarmSystems;
