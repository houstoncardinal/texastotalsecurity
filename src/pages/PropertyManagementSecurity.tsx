import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  generateLocalBusinessSchema,
  generateEnhancedServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import {
  Camera, Eye, Zap, Shield, Smartphone, FileText,
  Users, Building2, CheckCircle2, ArrowRight, Phone,
  MapPin, Trash2, Mail, Waves, Clock, Maximize2,
  Radio, Car, DoorOpen, Star, PhoneCall, Award, Plug,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 32  }, show: { opacity: 1, y: 0   } };
const fadeLeft  = { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0   } };
const fadeRight = { hidden: { opacity: 0, x: 32  }, show: { opacity: 1, x: 0   } };

/* ─── Coverage spots ───────────────────────────────────────── */
const coverageSpots = [
  {
    icon: Car,
    title: "Parking Lots & Garages",
    desc: "Vehicle break-ins, hit-and-runs, and overnight trespassing are the most frequent liability events in multi-family properties. Wide-angle and LPR cameras document every incident with timestamped footage.",
    tags: ["Vehicle Break-In Evidence", "Hit & Run Documentation", "LPR Capture"],
  },
  {
    icon: Trash2,
    title: "Dumpster & Trash Areas",
    desc: "Illegal dumping, vandalism, and after-hours trespassing are expensive and hard to prove without footage. Cameras covering dumpster enclosures give you documentation and deter repeat offenders.",
    tags: ["Illegal Dumping Evidence", "Vandalism Deterrence", "Cost Recovery"],
  },
  {
    icon: Mail,
    title: "Mailboxes & Package Areas",
    desc: "Package theft is among the top resident complaints in multi-family communities. Camera coverage at mailbox clusters and package areas protects residents and limits your liability exposure.",
    tags: ["Package Theft Deterrence", "Resident Protection", "Dispute Resolution"],
  },
  {
    icon: Waves,
    title: "Pool & Amenity Areas",
    desc: "Unauthorized access, after-hours use, and amenity damage create significant liability. 24/7 surveillance gives you documentation and helps enforce lease rules without on-site staff.",
    tags: ["After-Hours Monitoring", "Lease Enforcement", "Liability Protection"],
  },
  {
    icon: DoorOpen,
    title: "Building Entrances & Lobbies",
    desc: "Controlled access starts at the front door. Cameras at every entrance document who enters and exits — essential for unauthorized access incidents, vandalism, and tenant disputes.",
    tags: ["Access Documentation", "Unauthorized Entry", "Tenant Safety"],
  },
  {
    icon: MapPin,
    title: "Leasing Offices & Common Areas",
    desc: "After-hours break-ins, loitering, and vandalism in leasing areas affect operations and staff safety. Camera coverage protects your team and your equipment when the office is closed.",
    tags: ["After-Hours Protection", "Staff Safety", "Asset Security"],
  },
];

/* ─── Why us ───────────────────────────────────────────────── */
const whyUs = [
  {
    icon: Plug,
    title: "We Specialize in Hard-Wired Systems",
    desc: "Every camera we install is wired directly — no batteries, no Wi-Fi dropouts, no signal interference. Hard-wired systems are more reliable, more secure, and built to last in high-demand property environments.",
  },
  {
    icon: PhoneCall,
    title: "We Call You First",
    desc: "When something needs attention at your property, we reach out to you proactively. You shouldn't have to chase us down — and with us, you never will.",
  },
  {
    icon: Radio,
    title: "Monitored Over Verizon Cellular",
    desc: "Our systems communicate over Verizon cellular — not your internet. Recording stays active even when the property's connection drops. No ISP dependency, no gaps.",
  },
  {
    icon: Users,
    title: "Talk to the Owner Directly",
    desc: "No hold queues. No national call center. When you call Texas Total Security, you reach someone who knows your property, knows your history, and can make decisions.",
  },
  {
    icon: Smartphone,
    title: "Remote Multi-Site Access",
    desc: "View live and recorded footage across every property you manage — one platform, any device, anywhere. Full portfolio visibility from your phone.",
  },
  {
    icon: Award,
    title: "Managed by Texas Total Security",
    desc: "Your account is managed by Texas Total Security, with alarm signals handled through our certified San Antonio partner monitoring center. No surprise provider changes.",
  },
];

/* ─── Property types ───────────────────────────────────────── */
const propertyTypes = [
  { icon: Building2, label: "Apartment Complexes",         desc: "Single-owner multi-unit properties with leasing offices, parking structures, and shared amenities managed by a professional property management company." },
  { icon: Users,     label: "Multi-Family Communities",    desc: "Duplex, triplex, and larger residential buildings where property managers handle maintenance, tenant relations, and security on behalf of ownership." },
  { icon: MapPin,    label: "Mixed-Use Developments",      desc: "Residential over retail — properties combining living spaces with commercial tenants, requiring both residential and commercial security coverage." },
  { icon: Shield,    label: "Managed Condo Buildings",     desc: "Condo communities where the COA has hired a professional property management company to handle day-to-day operations and security coordination." },
  { icon: DoorOpen,  label: "Student Housing",             desc: "High-turnover residential properties near universities with elevated security needs — access documentation, common area surveillance, and incident logging." },
  { icon: Car,       label: "Multi-Property Portfolios",   desc: "Property managers overseeing multiple locations who need a single trusted vendor, one point of contact, and a unified remote management platform." },
];

/* ─── Solutions ────────────────────────────────────────────── */
const solutions = [
  { icon: Camera,    title: "4K Hard-Wired Surveillance",      desc: "Power-over-Ethernet IP cameras deliver consistent 4K resolution across parking lots, building entrances, amenity areas, and common spaces — no Wi-Fi required." },
  { icon: Eye,       title: "License Plate Recognition",       desc: "LPR documents every vehicle entering and leaving — essential for hit-and-run incidents, unauthorized access, and trespassing documentation." },
  { icon: Zap,       title: "Active Deterrence",               desc: "Cameras with built-in sirens and strobes that respond to intrusion in real time — no on-site guard required." },
  { icon: Maximize2, title: "Wide-Angle Full Coverage",        desc: "Strategically placed cameras eliminate blind spots across large parking areas, courtyards, and multi-building campuses." },
  { icon: Clock,     title: "Reliable 24/7 Recording",         desc: "Continuous high-definition recording stored locally — always available for incident review, police reports, and insurance claims." },
  { icon: Radio,     title: "Cellular Backup",                 desc: "Systems run over Verizon cellular — not your internet. Recording stays active even when the property's connectivity is interrupted." },
  { icon: Smartphone, title: "Multi-Site Remote Management",   desc: "Property managers view live and recorded footage across every site from a single dashboard, on any device." },
  { icon: FileText,  title: "Incident Documentation",          desc: "Export timestamped footage for police reports, insurance claims, eviction proceedings, or owner reporting in minutes." },
];

/* ─── Testimonials ─────────────────────────────────────────── */
const testimonials = [
  {
    name: "Robert K.",
    role: "Property Manager, Sugar Land",
    text: "Managing multiple communities means I need reliable systems and a vendor I can count on. Texas Total Security delivers on both fronts — every time.",
  },
  {
    name: "Maria T.",
    role: "Regional Manager, Houston",
    text: "We had a hit-and-run in our parking lot and the footage was crystal clear. The police identified the vehicle within hours. That's the kind of system we needed.",
  },
  {
    name: "David L.",
    role: "Property Manager, Katy TX",
    text: "What I appreciate most is that I can call and actually reach someone who knows my properties. No hold queues, no 1-800 numbers — just a local team that treats us like a real client.",
  },
];

/* ─── FAQs ─────────────────────────────────────────────────── */
const faqs = [
  {
    question: "Why do you specialize in hard-wired camera systems?",
    answer: "Hard-wired systems are simply more reliable than wireless. Every camera connects directly via cable — there are no batteries to replace, no Wi-Fi signal to lose, no interference from other networks in a multi-unit building. For property managers who need footage available 24/7 across multiple locations, hard-wired is the only professional-grade choice. We use Power-over-Ethernet (PoE) IP cameras that deliver consistent 4K recording without any of the failure points that come with wireless systems.",
  },
  {
    question: "What coverage locations are most important for apartment complexes?",
    answer: "Based on incident frequency across multi-family properties, the highest-priority locations are: parking lots and garages (vehicle break-ins, hit-and-runs), dumpster areas (illegal dumping and vandalism), mailbox clusters (package theft), pool and amenity areas (after-hours trespassing and liability), and building entrances (unauthorized access). We assess your property layout and design coverage around your specific incident history and risk exposure.",
  },
  {
    question: "Can you manage cameras across multiple properties from one platform?",
    answer: "Yes. Property managers with multiple sites can access all cameras — live and recorded — from a single management platform on any device. We set up each property and connect your entire portfolio so you have unified visibility without juggling different systems or logins.",
  },
  {
    question: "What happens when the internet goes down at a property?",
    answer: "All of our systems include Verizon cellular backup. Cameras communicate over the cellular network — not your internet provider — so recording continues uninterrupted even during an outage. Your footage is protected regardless of connectivity status.",
  },
  {
    question: "How does the footage help with tenant disputes or eviction proceedings?",
    answer: "Timestamped, high-definition footage is admissible documentation for lease violations, property damage claims, noise complaints, unauthorized guests, and eviction proceedings. We can export specific clips in formats accepted by courts and property management platforms.",
  },
  {
    question: "Can the system capture license plates in a parking lot at night?",
    answer: "Yes. Our LPR cameras use specialized IR illumination designed for nighttime plate capture at parking lot entry and exit points. We test every installation to verify plate capture quality before we leave the site.",
  },
  {
    question: "What about ongoing maintenance after installation?",
    answer: "We offer maintenance plans covering regular system checks, camera cleaning, firmware updates, and priority service response. When something needs attention, we reach out to you — you shouldn't have to file a ticket with a national support line and wait.",
  },
  {
    question: "How do you handle properties with multiple buildings or large campuses?",
    answer: "Large multi-building properties are our specialty. We design coverage using a combination of wide-angle cameras, PTZ units, and strategically placed fixed cameras to eliminate blind spots across large footprints. All cameras feed into a centralized recording system accessible remotely.",
  },
];

const faqsDisplay = [
  {
    question: "Why do you specialize in hard-wired camera systems?",
    answer: (
      <span>
        Hard-wired systems are simply more reliable than wireless. Every camera connects directly via cable — there are no batteries to replace, no Wi-Fi signal to lose, no interference from other networks in a multi-unit building. For property managers who need footage available 24/7 across multiple locations, hard-wired is the only professional-grade choice.{" "}
        <Link to="/security-cameras" className="text-red-600 font-semibold hover:underline">Learn more about our hardwired 4K camera systems</Link>.
      </span>
    ),
  },
  {
    question: "What coverage locations are most important for apartment complexes?",
    answer: (
      <span>
        Based on incident frequency across multi-family properties, the highest-priority locations are: parking lots and garages (vehicle break-ins, hit-and-runs), dumpster areas (illegal dumping and vandalism), mailbox clusters (package theft), pool and amenity areas (after-hours trespassing and liability), and building entrances (unauthorized access).{" "}
        <Link to="/hoa-security" className="text-red-600 font-semibold hover:underline">Explore coverage solutions by area</Link>{" "}
        or <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">schedule a free property assessment</Link>.
      </span>
    ),
  },
  {
    question: "Can you manage cameras across multiple properties from one platform?",
    answer: (
      <span>
        Yes. Property managers with multiple sites can access all cameras — live and recorded — from a single management platform on any device. We set up each property and connect your entire portfolio so you have unified visibility without juggling different systems or logins. Call{" "}
        <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
        to discuss multi-site configuration for your portfolio.
      </span>
    ),
  },
  {
    question: "What happens when the internet goes down at a property?",
    answer: (
      <span>
        All of our systems include Verizon cellular backup. Cameras communicate over the cellular network — not your internet provider — so recording continues uninterrupted even during an outage. Your footage is protected regardless of connectivity status.{" "}
        <Link to="/monitoring-services" className="text-red-600 font-semibold hover:underline">Learn more about our monitoring reliability</Link>.
      </span>
    ),
  },
  {
    question: "How does the footage help with tenant disputes or eviction proceedings?",
    answer: (
      <span>
        Timestamped, high-definition footage is admissible documentation for lease violations, property damage claims, noise complaints, unauthorized guests, and eviction proceedings. We can export specific clips in formats accepted by courts and property management platforms. Call{" "}
        <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
        to discuss footage export and documentation workflows.
      </span>
    ),
  },
  {
    question: "Can the system capture license plates in a parking lot at night?",
    answer: (
      <span>
        Yes. Our LPR cameras use specialized IR illumination designed for nighttime plate capture at parking lot entry and exit points. We test every installation to verify plate capture quality before we leave the site.{" "}
        <Link to="/hoa-security/gates-entrances" className="text-red-600 font-semibold hover:underline">See how we configure LPR for gates and entrances</Link>.
      </span>
    ),
  },
  {
    question: "What about ongoing maintenance after installation?",
    answer: (
      <span>
        We offer maintenance plans covering regular system checks, camera cleaning, firmware updates, and priority service response. When something needs attention, we reach out to you — you shouldn't have to file a ticket with a national support line and wait.{" "}
        <Link to="/service-maintenance" className="text-red-600 font-semibold hover:underline">Learn about our maintenance plans</Link>{" "}
        or call <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>.
      </span>
    ),
  },
  {
    question: "How do you handle properties with multiple buildings or large campuses?",
    answer: (
      <span>
        Large multi-building properties are our specialty. We design coverage using a combination of wide-angle cameras, PTZ units, and strategically placed fixed cameras to eliminate blind spots across large footprints. All cameras feed into a centralized recording system accessible remotely.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free site assessment</Link>{" "}
        and we'll design a coverage plan for your campus.
      </span>
    ),
  },
];

/* ─── Schemas ──────────────────────────────────────────────── */
const schemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Property Management Security Systems Houston TX",
    "Hard-wired security camera systems for apartment complexes, multi-family properties, and mixed-use developments in Houston, TX. Parking lot surveillance, dumpster cameras, mailbox coverage, amenity area monitoring & remote multi-site management.",
    "/property-management-security",
    "Property Management Security System Installation",
    [
      "property management security cameras Houston TX",
      "apartment complex security cameras Houston",
      "multi-family security systems Houston",
      "parking lot surveillance cameras Houston",
      "apartment security systems Houston TX",
      "hard wired security cameras Houston",
      "multi-site property management cameras",
      "package theft cameras apartment Houston",
    ],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Property Management Security", href: "/property-management-security" },
  ]),
  generateFAQSchema(faqs),
];

/* ─── Page ──────────────────────────────────────────────────── */
const PropertyManagementSecurity = () => (
  <Layout>
    <SEOHead
      title="Property Management Security Systems Houston TX | Apartment & Multi-Family Cameras | Texas Total Security"
      description="Hard-wired security camera systems for apartment complexes, multi-family properties & mixed-use developments in Houston. Parking lot coverage, dumpster cameras, mailbox surveillance, amenity monitoring & remote multi-site management."
      schemas={schemas}
    />

    {/* ── HERO ── */}
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 60% 12%) 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(0 85% 60% / 0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 85% 45% / 0.12) 0%, transparent 70%)" }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: easeExpo }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "hsl(0 85% 45% / 0.12)", border: "1px solid hsl(0 85% 45% / 0.25)" }}
          >
            <Building2 className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 65%)" }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 85% 65%)" }}>
              Property Management Security · Houston, TX
            </span>
          </div>
          <h1
            className="font-display font-bold text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            Protect Every Property You Manage.
            <span className="block" style={{ color: "hsl(0 85% 60%)" }}>
              Hard-Wired. Reliable. Local.
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Professional hard-wired surveillance for apartment complexes, multi-family properties, and mixed-use developments across Houston. Parking lots, dumpsters, mailboxes, pool areas, building entrances — every location that creates liability, documented 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/free-analysis?service=property-management&property=multifamily"
              className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 text-base"
              style={{ boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38)" }}
            >
              Schedule a Free Property Assessment <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:7133879937"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-5 h-5" /> (713) 387-9937
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── TRUST STRIP ── */}
    <section className="py-5 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            "Hard-Wired Systems — No Wi-Fi Needed",
            "Talk to the Owner Directly",
            "Monitored Over Verizon Cellular",
            "We Call You First",
            "5-Star Rated on Google",
          ].map((chip) => (
            <div key={chip} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-accent" />
              <span className="text-sm font-semibold text-gray-700">{chip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── VALUE PROP ── */}
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5 uppercase tracking-widest"
              style={{ background: "hsl(0 85% 50% / 0.08)", color: "hsl(0 85% 50%)" }}
            >
              For Property Managers
            </div>
            <h2 className="font-display font-bold text-gray-900 text-3xl sm:text-4xl mb-5 leading-tight">
              Your Reputation Depends on What Your Cameras See.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              One unrecorded incident at a parking lot, a package theft at the mailboxes with no footage, or a pool area injury with no documentation — and you're answering to ownership without evidence. Texas Total Security designs hard-wired surveillance systems around the specific locations where incidents happen on multi-family and managed properties.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Remote access to every property from your phone or desktop",
                "4K hard-wired footage that holds up for insurance claims and legal proceedings",
                "Reliable 24/7 recording over Verizon cellular — no gaps, no internet dependency",
                "One local Houston company for all your properties — not a different vendor per site",
                "We call you when something needs attention — you don't chase us",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-accent" />
                  <span className="text-sm text-gray-700 leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/free-analysis?service=property-management&property=multifamily"
              className="btn-primary-gradient inline-flex items-center gap-2 px-7 py-3.5"
            >
              Get a Property Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeRight} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "4K",        label: "Hard-Wired Resolution" },
              { value: "24/7",      label: "Reliable Recording" },
              { value: "Multi-Site", label: "One Dashboard" },
              { value: "Local",     label: "Houston-Based Team" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 text-center border border-gray-100"
                style={{ background: "hsl(0 0% 98%)" }}
              >
                <p className="font-display font-bold text-3xl mb-1.5 text-accent">{s.value}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── HARDWIRED CALLOUT ── */}
    <section
      className="section-padding"
      style={{ background: "linear-gradient(135deg, hsl(0 0% 6%) 0%, hsl(0 55% 10%) 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5 uppercase tracking-widest"
              style={{ background: "hsl(0 85% 50% / 0.15)", color: "hsl(0 85% 65%)" }}
            >
              <Plug className="w-3.5 h-3.5" /> Our Specialty
            </div>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl mb-5 leading-tight">
              We Specialize in Hard-Wired Systems — and There's a Reason Why.
            </h2>
            <p className="text-white/60 leading-relaxed mb-6 text-base">
              Wireless cameras look attractive on paper. But in a multi-family environment with dozens of units, thick walls, competing Wi-Fi networks, and high-traffic common areas — wireless systems fail. Batteries die. Signals drop. Coverage disappears exactly when you need it most.
            </p>
            <p className="text-white/60 leading-relaxed mb-8 text-base">
              Every camera Texas Total Security installs is wired directly using Power-over-Ethernet (PoE) — a single cable handles both power and data, delivering consistent 4K recording with zero battery maintenance and no wireless interference. That's the professional standard for managed properties, and it's what we deliver on every job.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "No batteries to replace across dozens of cameras",
                "No Wi-Fi signal loss or interference in dense buildings",
                "Consistent 4K recording — never degraded by congestion",
                "Tamper-resistant — harder to disable than wireless",
                "Power-over-Ethernet: one cable, zero compromises",
                "Built to last in high-demand property environments",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 60%)" }} />
                  <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo, delay: 0.12 }}
            className="space-y-4"
          >
            {[
              { label: "Wireless",    items: ["Batteries die — cameras go dark", "Wi-Fi congestion in multi-unit buildings", "Signal blocked by walls & floors", "Easy to tamper with or jam", "Inconsistent recording quality"] },
              { label: "Hard-Wired", items: ["Direct PoE cable — always powered", "Zero Wi-Fi dependency", "Consistent signal through any structure", "Tamper-resistant physical connection", "Consistent 4K recording, every time"], isGood: true },
            ].map((col) => (
              <div
                key={col.label}
                className="rounded-2xl p-6 border"
                style={{
                  background: col.isGood ? "hsl(0 85% 45% / 0.10)" : "hsl(0 0% 100% / 0.04)",
                  borderColor: col.isGood ? "hsl(0 85% 45% / 0.30)" : "hsl(0 0% 100% / 0.08)",
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: col.isGood ? "hsl(0 85% 62%)" : "rgba(255,255,255,0.35)" }}
                >
                  {col.label}
                </p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm"
                      style={{ color: col.isGood ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.35)" }}>
                      <span className="text-base leading-none" style={{ color: col.isGood ? "hsl(0 85% 62%)" : "rgba(255,255,255,0.25)" }}>
                        {col.isGood ? "✓" : "✕"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── COVERAGE SPOTS ── */}
    <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}
          >
            <Eye className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
              Reliable Coverage Where It Counts
            </span>
          </div>
          <h2
            className="font-display font-bold text-gray-900 mb-4 leading-tight"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
          >
            Every High-Risk Location on Your Property — Covered.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            These are the spots where incidents happen most on managed properties. Missing coverage at any one of them creates liability gaps that are expensive to explain to ownership — and to insurance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverageSpots.map((spot, i) => (
            <motion.div
              key={spot.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.15)" }}
              >
                <spot.icon className="w-6 h-6" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <h3 className="font-display font-bold text-gray-900 text-lg mb-3 leading-tight">{spot.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{spot.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {spot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{ background: "hsl(0 85% 50% / 0.06)", color: "hsl(0 85% 45%)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── WHY US ── */}
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display font-bold text-gray-900 text-3xl sm:text-4xl mb-4 leading-tight">
            Why Property Managers Choose Texas Total Security
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            We're a locally owned Houston company — not a franchise, not a call center. One owner, one team, and a track record built on showing up and getting it right.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              className="rounded-2xl p-6 border border-gray-100 bg-gray-50 hover:bg-white hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300"
                style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.12)" }}
              >
                <item.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-base mb-2 leading-snug">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── PROPERTY TYPES ── */}
    <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display font-bold text-gray-900 text-3xl sm:text-4xl mb-4 leading-tight">
            Properties We Secure
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            From a 50-unit apartment complex to a multi-site portfolio of mixed-use properties — every property type has different layout challenges, and we design hardwired systems for your specific situation.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {propertyTypes.map((pt, i) => (
            <motion.div
              key={pt.label}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.5, ease: easeExpo, delay: i * 0.06 }}
              className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-4 hover:border-red-100 hover:shadow-md transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "hsl(0 85% 50% / 0.07)" }}
              >
                <pt.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{pt.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{pt.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── SOLUTIONS GRID ── */}
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display font-bold text-gray-900 text-3xl sm:text-4xl mb-4">
            The Full System — Everything Your Property Needs
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Every component is hard-wired and works together — from parking lot LPR to dumpster cameras to remote multi-site management — giving you complete visibility and documentation across your entire portfolio.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.06 }}
              className="rounded-2xl p-6 border border-gray-100 bg-gray-50 hover:bg-white hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.12)" }}
              >
                <s.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <h3 className="font-display font-semibold text-gray-900 text-sm mb-2 leading-snug">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ── */}
    <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-gray-900 text-3xl mb-2">
            Trusted by Houston Property Managers
          </h2>
          <p className="text-gray-500 text-sm">
            Real feedback from the people responsible for keeping their properties safe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>

    {/* ── LEAD FORM ── */}
    <section className="section-padding bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadForm
          title="Request a Property Management Security Consultation"
          subtitle="Tell us about your property or portfolio. We'll prepare coverage recommendations and transparent pricing — no pressure, no runaround."
          showServiceType
          defaultServiceType="property-management"
          defaultPropertyType="multifamily"
        />
      </div>
    </section>

    <FAQSection items={faqsDisplay} />
    <CTABlock />
  </Layout>
);

export default PropertyManagementSecurity;
