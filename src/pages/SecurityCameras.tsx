import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas } from "@/lib/seo";
import { Camera, Eye, Zap, MonitorSpeaker, Shield, CheckCircle2, ArrowRight, Phone, Star, AlertTriangle, Network, Database, MapPin } from "lucide-react";
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

const fullCameraList = [
  "CCTV Infrastructure — Hardwired PoE camera networks, fiber backhaul, surge protection, and commercial NVR recording",
  "High-Definition IP Cameras — 4K and multi-megapixel imaging for entrances, corridors, amenity centers, and critical assets",
  "License Plate Recognition — Purpose-built LPR coverage for gates, parking lots, loading zones, and access-controlled lanes",
  "PTZ Cameras — Operator-controlled or tour-based coverage for parking fields, perimeters, and large common areas",
  "180 Degree & Multi-Sensor Cameras — Broad-area visibility with fewer mounting points and fewer blind spots",
  "Fisheye Cameras — Top-down situational awareness for lobbies, clubhouses, retail areas, and interior common spaces",
  "Professional Video Monitoring — Real-time alerts, remote viewing, event review, and escalation workflows",
  "Edge Storage — Camera-level redundancy paired with centralized NVR storage for resilient evidence retention",
  "Active Deterrence — Strobes, sirens, prerecorded messages, and two-way voice for immediate response",
  "Security Poles — Engineered pole assemblies with LPR cameras, wide-angle cameras, lighting, and deterrence equipment",
  "Construction Site Surveillance — Temporary or semi-permanent systems for theft reduction and project oversight",
  "Audio Recording — Integrated camera microphones or standalone devices where legally appropriate",
  "Notification Systems — Mobile alerts, VMS notifications, and direct NVR event review",
  "Recording Systems — NVR, DVR, and hybrid retention architectures using surveillance-rated hard drives",
  "Visual Verification — Recorded and live video evidence to support incident response, access decisions, and claims review",
];

const cameraChallenges = [
  {
    icon: AlertTriangle,
    color: "hsl(38 92% 50%)",
    title: "Liability Exposure",
    subtitle: "Incidents happen, but the evidence is incomplete.",
    bullets: [
      "No usable footage for claims, violations, or police reports",
      "Blind spots at gates, parking areas, dumpsters, and amenity centers",
      "Low-resolution video that cannot identify faces, vehicles, or plates",
    ],
  },
  {
    icon: Network,
    color: "hsl(220 85% 55%)",
    title: "Unreliable Infrastructure",
    subtitle: "Camera systems fail when the network is improvised.",
    bullets: [
      "Wi-Fi cameras dropping offline across large properties",
      "No PoE switching plan, surge protection, or fiber backhaul strategy",
      "Consumer-grade equipment installed where commercial CCTV is required",
    ],
  },
  {
    icon: Eye,
    color: "hsl(0 85% 50%)",
    title: "Limited Operational Visibility",
    subtitle: "Management cannot verify what is happening in real time.",
    bullets: [
      "No remote viewing access for authorized property stakeholders",
      "No real-time alerts for vehicles, people, gates, or restricted areas",
      "Slow investigations because footage is difficult to search or export",
    ],
  },
  {
    icon: Database,
    color: "hsl(142 70% 40%)",
    title: "Poor Retention Planning",
    subtitle: "The system records, but not long enough or reliably enough.",
    bullets: [
      "NVR storage is undersized for camera count and resolution",
      "No edge storage redundancy for critical cameras",
      "Retention settings do not match HOA, property, or enterprise needs",
    ],
  },
];

const surveillanceCapabilities = [
  { icon: Shield, title: "Hardwired CCTV Infrastructure", desc: "Commercial PoE camera networks with structured cabling, fiber uplinks, weather-rated junctions, surge protection, and serviceable NVR design." },
  { icon: Camera, title: "4K IP Camera Installation", desc: "High-definition IP infrastructure for entrances, parking lots, common areas, corridors, loading zones, and exterior perimeters." },
  { icon: Eye, title: "License Plate Recognition", desc: "Purpose-built LPR camera placement for HOA gates, drive lanes, parking access, visitor entry, and vehicle investigations." },
  { icon: MapPin, title: "Coverage Mapping & Placement", desc: "Camera layouts planned around field of view, mounting height, lighting, choke points, blind spots, and evidence requirements." },
  { icon: MonitorSpeaker, title: "Professional Video Monitoring", desc: "Remote viewing, real-time alerts, visual verification, event review, and escalation workflows for management teams." },
  { icon: Zap, title: "Active Deterrence", desc: "Strobes, sirens, two-way voice, and speaker output for intervention at gates, dumpster areas, after-hours zones, and parking lots." },
];

const monitoringPanels = [
  {
    title: "Remote Viewing",
    body: "Secure mobile and desktop access for authorized managers, board members, and security personnel, with permissions configured around your property operations.",
  },
  {
    title: "Real-Time Alerts",
    body: "Event notifications for motion, gate activity, access points, and priority camera views, routed to the right property stakeholders for review.",
  },
  {
    title: "Visual Verification",
    body: "Live and recorded video review to confirm what happened before dispatching staff, vendors, law enforcement, or after-hours response.",
  },
  {
    title: "Evidence Workflow",
    body: "Searchable NVR footage, exportable clips, timestamped records, and retention planning for claims, violations, investigations, and board reporting.",
  },
];

const faqs = [
  { question: "How many cameras does a commercial property need?", answer: "Camera count depends on field of view, mounting height, lighting, entry points, choke points, and identification requirements. We map coverage zones before recommending camera quantity or placement." },
  { question: "Can property managers view cameras remotely?", answer: "Yes. We configure secure remote viewing for authorized users with mobile and desktop access, role-based permissions, and event review workflows." },
  { question: "Do you design hardwired CCTV systems?", answer: "Yes. We design hardwired CCTV infrastructure using PoE switching, NVR recording, fiber or wireless backhaul where appropriate, surge protection, and weather-rated enclosures." },
  { question: "How long is footage stored?", answer: "Most systems are designed for 30 to 90 days of retention, but storage is engineered around camera count, resolution, frame rate, motion activity, compliance requirements, and available budget." },
  { question: "Can cameras support video monitoring and real-time alerts?", answer: "Yes. Properly designed surveillance systems can support professional video monitoring, remote viewing, event notifications, visual verification, and escalation workflows for management teams." },
  { question: "What's the difference between IP cameras and analog cameras?", answer: "IP cameras provide higher resolution, cleaner network architecture, remote access flexibility, and better scalability. Analog cameras may be supported in hybrid systems when existing infrastructure still has value." },
  { question: "Do you install systems for HOAs and enterprise clients?", answer: "Yes. We design and install surveillance systems for HOA communities, apartment portfolios, commercial buildings, warehouses, industrial sites, retail centers, and multi-location enterprise clients." },
  { question: "Can cameras be installed on poles or existing structures?", answer: "Yes. We can mount cameras on buildings, existing poles, or engineered security poles with integrated cameras, lighting, wireless links, and active deterrence equipment." },
];

const faqsDisplay = [
  {
    question: "How many cameras does a commercial property need?",
    answer: (
      <span>
        Camera count depends on field of view, mounting height, lighting, entry points, choke points, and identification requirements. We map coverage zones before recommending camera quantity or placement.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free site assessment</Link>{" "}
        and we'll produce a coverage map for your property.
      </span>
    ),
  },
  {
    question: "Can property managers view cameras remotely?",
    answer: (
      <span>
        Yes. We configure secure remote viewing for authorized users with mobile and desktop access, role-based permissions, and event review workflows.{" "}
        <Link to="/hoa-security" className="text-red-600 font-semibold hover:underline">See how we set up multi-property remote access for HOAs and property managers</Link>.
      </span>
    ),
  },
  {
    question: "Do you design hardwired CCTV systems?",
    answer: (
      <span>
        Yes. We design hardwired CCTV infrastructure using PoE switching, NVR recording, fiber or wireless backhaul where appropriate, surge protection, and weather-rated enclosures.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request a free consultation</Link>{" "}
        or call <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a> to discuss your infrastructure requirements.
      </span>
    ),
  },
  {
    question: "How long is footage stored?",
    answer: (
      <span>
        Most systems are designed for 30 to 90 days of retention, but storage is engineered around camera count, resolution, frame rate, motion activity, compliance requirements, and available budget.{" "}
        <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free assessment</Link>{" "}
        and we'll design the right retention plan for your regulatory and operational needs.
      </span>
    ),
  },
  {
    question: "Can cameras support video monitoring and real-time alerts?",
    answer: (
      <span>
        Yes. Properly designed surveillance systems can support professional video monitoring, remote viewing, event notifications, visual verification, and escalation workflows for management teams.{" "}
        <Link to="/monitoring-services" className="text-red-600 font-semibold hover:underline">Learn more about our 24/7 monitoring services</Link>.
      </span>
    ),
  },
  {
    question: "What's the difference between IP cameras and analog cameras?",
    answer: (
      <span>
        IP cameras provide higher resolution, cleaner network architecture, remote access flexibility, and better scalability. Analog cameras may be supported in hybrid systems when existing infrastructure still has value. Call{" "}
        <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
        to discuss which is right for your property.
      </span>
    ),
  },
  {
    question: "Do you install systems for HOAs and enterprise clients?",
    answer: (
      <span>
        Yes. We design and install surveillance systems for HOA communities, apartment portfolios, commercial buildings, warehouses, industrial sites, retail centers, and multi-location enterprise clients.{" "}
        <Link to="/hoa-security" className="text-red-600 font-semibold hover:underline">Explore HOA security solutions</Link>{" "}
        or <Link to="/commercial" className="text-red-600 font-semibold hover:underline">see commercial security options</Link>.
      </span>
    ),
  },
  {
    question: "Can cameras be installed on poles or existing structures?",
    answer: (
      <span>
        Yes. We can mount cameras on buildings, existing poles, or engineered security poles with integrated cameras, lighting, wireless links, and active deterrence equipment.{" "}
        <Link to="/security-pole-configurator" className="text-red-600 font-semibold hover:underline">Use our 3D security pole configurator</Link>{" "}
        to design your exact pole setup.
      </span>
    ),
  },
];

const cameraSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Security Camera Systems Houston TX | CCTV, LPR & Video Monitoring",
    "Professional security camera systems in Houston, TX. Hardwired CCTV infrastructure, 4K IP cameras, license plate recognition, video monitoring, remote viewing, active deterrence, and enterprise surveillance systems for HOAs, property managers, and businesses.",
    "/security-cameras",
    "Security Camera Installation",
    ["security camera systems Houston TX", "security camera installation Houston", "surveillance systems Houston", "video monitoring Houston", "CCTV installation Houston", "license plate recognition cameras Houston", "HOA security cameras Houston", "property management security cameras Houston", "4K IP camera installation Houston", "commercial surveillance systems Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Security Cameras", href: "/security-cameras" },
  ]),
  generateAllServicesSchemas()[2],
  generateFAQSchema(faqs),
];

const SecurityCameras = () => (
  <Layout>
    <SEOHead
      title="Security Camera Systems Houston TX | CCTV, LPR & Video Monitoring"
      description="Professional security camera systems in Houston, TX. Hardwired CCTV infrastructure, 4K IP cameras, LPR, video monitoring, remote viewing & surveillance systems for HOAs, property managers and businesses."
      schemas={cameraSchemas}
    />

    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img
          src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
          alt=""
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.91)_46%,rgba(10,10,10,0.74)_100%)]" />
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
              <Camera className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                CCTV · LPR · Video Monitoring · Houston
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Security Camera Systems in Houston, TX
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Enterprise-grade surveillance systems for HOAs, property managers, commercial facilities, and multi-site operators that need reliable footage, remote viewing, LPR, and accountable video monitoring.
            </p>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
              {[
                { label: "4K IP", sublabel: "camera systems" },
                { label: "CCTV", sublabel: "hardwired networks" },
                { label: "LPR", sublabel: "gate & vehicle capture" },
                { label: "Alerts", sublabel: "video monitoring" },
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
              <a href="#camera-details" className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Review System Strategy <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
              <span>Licensed & Insured · LIC# B03066901</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-red-400" /> Houston Area Specialists</span>
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
              title="Free Camera System Assessment"
              subtitle="Tell us about your property, coverage goals, and current camera issues."
              showServiceType
              defaultServiceType="cameras"
              referringPage="/security-cameras"
              compact
              className="shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <section id="camera-details" className="py-12 sm:py-14 bg-white">
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
                Why Camera Systems Fail
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
              A surveillance system should reduce uncertainty, not create more of it.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Houston properties need more than cameras on a wall. They need engineered CCTV infrastructure, correct camera placement, searchable evidence, remote visibility, and video monitoring workflows that support real operational decisions.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a href="tel:7133879937" className="inline-flex items-center justify-center gap-2 bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
                <Phone className="w-4 h-4" /> Talk to a Camera Specialist
              </a>
              <Link to="/free-analysis?service=cameras" className="inline-flex items-center justify-center gap-2 border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 hover:border-red-200 hover:bg-red-50 transition-colors">
                Request Site Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cameraChallenges.map((point, i) => (
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
                  {point.bullets.map((b) => (
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
                <Network className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">Hardwired · Monitored · Serviceable</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                Enterprise surveillance systems, designed around coverage and evidence.
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                Every system is planned around the property’s true risk profile: gate lanes, drive aisles, parking exposure, common areas, access points, lighting conditions, network path, storage retention, and who needs authority to view or export footage.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "PoE", sublabel: "hardwired CCTV" },
                  { label: "LPR", sublabel: "vehicle evidence" },
                  { label: "NVR", sublabel: "retention planning" },
                  { label: "VMS", sublabel: "remote access" },
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
            {surveillanceCapabilities.map((feature, i) => (
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

    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
              <MonitorSpeaker className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">Professional Video Monitoring</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-950 leading-tight">
              Monitoring, remote access, and evidence tools in one compact workflow.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Remote viewing, real-time alerts, visual verification, and searchable footage are configured around your property’s operating priorities: gates, parking, common areas, vendors, and after-hours activity.
            </p>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="grid gap-2">
              {monitoringPanels.map((panel, i) => (
                <details
                  key={panel.title}
                  open={i === 0}
                  className="group border border-gray-200 bg-gray-50 open:bg-white open:shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-gray-950">
                    <span>{panel.title}</span>
                    <span className="flex h-6 w-6 items-center justify-center border border-gray-200 bg-white text-red-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600">
                    {panel.body}
                  </div>
                </details>
              ))}
              <details className="group border border-gray-200 bg-gray-50 open:bg-white open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-gray-950">
                  <span>View System Components</span>
                  <span className="flex h-6 w-6 items-center justify-center border border-gray-200 bg-white text-red-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 border-t border-gray-100 p-4">
                  {fullCameraList.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 bg-gray-50 p-3 border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </details>
              <div className="border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-relaxed text-gray-900">
                Built for Houston HOAs, property managers, commercial facilities, and multi-site operators that need fast access to reliable footage.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        SECURITY POLE CONFIGURATOR CTA
    ══════════════════════════════════════════════════ */}
    <section className="py-12 sm:py-14 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.75, ease: easeExpo }}
          className="relative p-8 sm:p-10 overflow-hidden border border-gray-200 bg-white"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="relative z-10 grid lg:grid-cols-[0.7fr_1.3fr] gap-6 items-center">
            <div className="w-14 h-14 flex items-center justify-center bg-red-50 border border-red-100">
              <MapPin className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
                Custom engineering and security pole system design.
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Use the 3D Security Pole Configurator as an early-stage design tool for pole assemblies, camera placement, lighting, and active deterrence. Final specifications are validated through site conditions, power availability, network path, wind exposure, and required field of view.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/security-pole-configurator" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
                  Open 3D Configurator <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/free-analysis?service=cameras" className="inline-flex items-center justify-center gap-2 border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-900 hover:border-red-200 hover:bg-red-50 transition-colors">
                  Schedule Site Survey
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        CTA BANNER — Get Started
    ══════════════════════════════════════════════════ */}
    <section className="py-12 sm:py-14 relative overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
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
            Build a Surveillance System That Supports Operations
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Schedule a site analysis for CCTV infrastructure, professional video monitoring, camera placement, recording retention, and long-term system design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/free-analysis?service=cameras"
              className="btn-primary-gradient inline-flex items-center justify-center gap-2 text-sm px-7 py-3.5"
            >
              Schedule Free Analysis <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:7133879937"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-5 h-5" /> (713) 387-9937
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        FAQ SECTION
    ══════════════════════════════════════════════════ */}
    <FAQSection items={faqsDisplay} />
  </Layout>
);

export default SecurityCameras;
