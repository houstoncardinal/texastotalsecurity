import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import LeadForm from "@/components/LeadForm";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas } from "@/lib/seo";
import {
  Camera, Eye, Zap, Shield, Smartphone, FileText, Users, Building2,
  CheckCircle2, ArrowRight, Phone, MapPin, Trash2, Mail, Waves,
  PawPrint, Baby, Clock, Maximize2, Star, Radio, TrendingUp,
  ChevronLeft, ChevronRight, Plus, Minus,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

/* ─── Audience toggle data ─────────────────────────────────── */
const audiences = [
  {
    id: "pm",
    icon: Building2,
    label: "Property Manager",
    mobileLabel: "Prop. Manager",
    sublabel: "Apartments, Multi-family & Mixed-Use",
  },
  {
    id: "hoa",
    icon: Users,
    label: "HOA Board",
    mobileLabel: "HOA Board",
    sublabel: "Residential Communities & Neighborhoods",
  },
  {
    id: "investor",
    icon: TrendingUp,
    label: "Investor / Owner",
    mobileLabel: "Investor",
    sublabel: "Protect & Maximize Your Investment",
  },
];

const audienceContent = {
  pm: {
    eyebrow: "For Property Managers",
    headline: "Are You Covering Every Corner of Your Property?",
    body: "As a property manager, your reputation — and your liability — depends on what your cameras see. One unrecorded incident at a dumpster area, a parking lot assault with no footage, or a package theft at the mailboxes with no evidence, and you're answering to ownership without the documentation you need. Texas Total Security designs surveillance systems around the specific locations that matter most to property managers: the places where incidents actually happen.",
    points: [
      "Remote access to every property from your phone or desktop",
      "High-resolution footage that holds up for incident documentation and tenant disputes",
      "Reliable 24/7 recording — no gaps, no downtime, no excuses",
      "One local company for all your properties — not a different vendor for every site",
      "We call you when something needs attention — you don't chase us",
    ],
    cta: "Get a Property Assessment",
    stat1: { value: "24/7", label: "Reliable Recording" },
    stat2: { value: "4K", label: "High Resolution" },
    stat3: { value: "Multi-Site", label: "One Point of Contact" },
    stat4: { value: "Local", label: "Houston-Based Team" },
  },
  hoa: {
    eyebrow: "For HOA Boards",
    headline: "Keep an Eye on Your Community — All of It.",
    body: "Your residents trust the board to keep the community safe. That means more than a camera at the front gate — it means complete visibility across every common area: pools, mailboxes, playgrounds, dog parks, and dumpster stations. Texas Total Security works directly with HOA boards to design systems that protect residents, document incidents, and provide the footage you need when you need it.",
    points: [
      "Board members and managers view footage remotely from any device",
      "LPR cameras document every vehicle entering and exiting the community",
      "Complete common area coverage — not just the front gate",
      "We present to your full board with proposals and options at every price point",
      "Your account is managed by Texas Total Security",
    ],
    cta: "Schedule a Board Consultation",
    stat1: { value: "HD", label: "License Plate Capture" },
    stat2: { value: "Wide", label: "Full-Area Coverage" },
    stat3: { value: "Board", label: "Ready Reporting" },
    stat4: { value: "5 ★", label: "Google Rated" },
  },
  investor: {
    eyebrow: "For Investors & Owners",
    headline: "Is Your Investment Actually Being Taken Care Of?",
    body: "Reliability matters. As an investor or property owner, you can't afford to find out about an incident days after it happened — or to discover the camera system you paid for wasn't even recording. Surveillance is now, not the future. The cameras don't lie. We give your property management team the tools to hold staff, residents, and vendors accountable — stop losing money, solve problems faster, and own your equipment outright. No monthly fees. No third parties between you and your footage. Even keeps recording when the internet goes down.",
    points: [
      "The equipment is yours — no monthly streaming or storage fees",
      "Reliable 24/7 recording — even when the internet or power drops",
      "Real-time live view + instant playback & download from any device",
      "Hold staff, residents, and delivery drivers accountable on video",
      "No third-party gatekeepers — direct access to your own system",
      "Property managers solve incidents and coordinate maintenance faster",
    ],
    cta: "Protect Your Investment",
    stat1: { value: "$0", label: "Monthly Cloud Fees" },
    stat2: { value: "Own", label: "Your Equipment" },
    stat3: { value: "24/7", label: "Recording Uptime" },
    stat4: { value: "Direct", label: "Owner Access" },
  },
};

/* ─── Coverage spots ───────────────────────────────────────── */
const coverageSpots = [
  {
    icon: MapPin,
    title: "Gates & Entrances",
    href: "/hoa-security/gates-entrances",
    desc: "LPR cameras document every vehicle in and out. Wide-angle coverage captures pedestrian traffic, visitors, and after-hours entry. The first line of defense — and the most important one.",
    tags: ["License Plate Recognition", "Day & Night Capture", "Wide-Angle Coverage"],
  },
  {
    icon: Trash2,
    title: "Dumpster Areas",
    href: "/hoa-security/dumpster-cameras",
    desc: "Illegal dumping, vandalism, and unauthorized access are common and expensive. Cameras covering your dumpster enclosures give you documented evidence and deter repeat offenders.",
    tags: ["Vandalism Deterrence", "Incident Documentation", "Trespassing Evidence"],
  },
  {
    icon: Mail,
    title: "Mailboxes & Package Areas",
    href: "/hoa-security/mailbox-cameras",
    desc: "Package theft and mail theft are among the most frequent resident complaints in multi-family communities. Camera coverage at mailbox clusters and package lockers protects residents and limits your liability.",
    tags: ["Package Theft Deterrence", "Resident Protection", "Dispute Resolution"],
  },
  {
    icon: Waves,
    title: "Pool & Recreation Areas",
    href: "/hoa-security/pool-cameras",
    desc: "Pool areas create significant liability exposure — unauthorized access, after-hours use, and safety incidents. 24/7 surveillance gives you documentation and helps enforce community rules.",
    tags: ["After-Hours Monitoring", "Liability Coverage", "Safety Compliance"],
  },
  {
    icon: Baby,
    title: "Playgrounds",
    href: "/hoa-security/playground-cameras",
    desc: "Playgrounds are high-traffic, high-visibility community spaces. Camera coverage provides safety monitoring, documents incidents, and gives parents confidence that the space is protected.",
    tags: ["Safety Monitoring", "Incident Documentation", "Community Confidence"],
  },
  {
    icon: PawPrint,
    title: "Dog Parks",
    href: "/hoa-security/dog-park-cameras",
    desc: "Dog park incidents — animal disputes, unauthorized access, or property damage — frequently generate resident complaints. Cameras provide objective documentation when he-said-she-said situations arise.",
    tags: ["Dispute Documentation", "Rule Enforcement", "Community Accountability"],
  },
];

/* ─── Property types ───────────────────────────────────────── */
const propertyTypes = [
  { icon: Building2, label: "Apartment Complexes", desc: "Owned by a single entity, managed by a professional property management company. No HOA — one decision-maker, one point of contact.", audience: "Property Management" },
  { icon: Users, label: "Condominium Communities", desc: "Individual unit owners governed by a Condo Owners Association (COA). The COA often hires a property management company to handle day-to-day operations.", audience: "HOA / Property Management" },
  { icon: MapPin, label: "Townhome Communities", desc: "Individually owned units with shared driveways, entries, and green spaces governed by an HOA.", audience: "HOA" },
  { icon: Shield, label: "Gated Neighborhoods", desc: "Single-family HOA communities requiring gate control, LPR, and perimeter coverage across common areas.", audience: "HOA" },
  { icon: Star, label: "Master-Planned Communities", desc: "Large-scale HOA developments with multiple entry points, amenity centers, and miles of common area to cover.", audience: "HOA" },
  { icon: TrendingUp, label: "Mixed-Use Developments", desc: "Residential over retail — managed by a property management company, combining residential and commercial security needs.", audience: "Property Management" },
];

/* ─── Solutions ────────────────────────────────────────────── */
const solutions = [
  { icon: Camera, title: "Gate Camera Systems", desc: "HD cameras at every entry and exit with license plate recognition, night vision, and weatherproof housing." },
  { icon: Eye, title: "License Plate Recognition", desc: "LPR captures every vehicle entering and leaving — essential documentation for management and law enforcement." },
  { icon: Zap, title: "Active Deterrence", desc: "Cameras with built-in sirens and strobes that respond to intrusions in real time — no guard required." },
  { icon: Maximize2, title: "Wide-Angle Full Coverage", desc: "Strategically placed cameras with wide fields of view eliminate blind spots across large common areas." },
  { icon: Clock, title: "Reliable 24/7 Recording", desc: "Continuous high-definition recording stored locally and backed up — always available when you need it." },
  { icon: Radio, title: "Cellular Backup", desc: "Systems communicate over Verizon cellular — not your internet. Recording stays active even when connectivity drops." },
  { icon: Smartphone, title: "Remote Management", desc: "Board members and property managers view live and recorded footage from any device, anywhere." },
  { icon: FileText, title: "Incident Documentation", desc: "Retrieve and export footage for police reports, insurance claims, HOA hearings, or tenant disputes." },
];

/* ─── Security pole images ─────────────────────────────────── */
const poleImages = [
  "/securitypoles/pole1.JPG",
  "/securitypoles/pole2.JPG",
  "/securitypoles/20241211_110527.jpg",
  "/securitypoles/20241211_110548.jpg",
  "/securitypoles/imgi_11_com1.jpg",
  "/securitypoles/imgi_27_com11.jpg",
  "/securitypoles/imgi_2_com10-scaled.jpg",
  "/securitypoles/imgi_31_com7.jpg",
  "/securitypoles/imgi_36_com2.jpg",
  "/securitypoles/imgi_51_com11-768x1024.jpg",
];

/* ─── Testimonials ─────────────────────────────────────────── */
const testimonials = [
  { name: "Lisa M.", role: "HOA Board President, West University Place", text: "Since installing the gate camera system, we've seen a dramatic reduction in trespassing and vehicle break-ins. The board is thrilled with the quality and Texas Total Security's responsiveness." },
  { name: "Robert K.", role: "Property Manager, River Oaks", text: "Managing multiple communities means I need reliable systems and a vendor I can count on. Texas Total Security delivers on both fronts — every time." },
  { name: "Jennifer W.", role: "HOA Board Member, Memorial Villages", text: "The LPR cameras have been a game-changer. We can track every vehicle and provide footage to law enforcement the same day an incident is reported." },
];

/* ─── Gallery ──────────────────────────────────────────────── */
const hoaGalleryImages = [
  { src: "/hoa/20241211_110941.jpg", alt: "HOA security camera installation at a Houston community" },
  { src: "/hoa/image.png", alt: "Community security system equipment for an HOA property" },
  { src: "/hoa/imgi_27_com11.jpg", alt: "HOA camera installation protecting a managed property" },
  { src: "/hoa/20241211_110548.jpg", alt: "HOA surveillance cameras covering a neighborhood entrance" },
  { src: "/hoa/imgi_7_com5-scaled.jpg", alt: "Security camera system installed for a Houston community" },
  { src: "/hoa/20241211_110505.jpg", alt: "HOA gate camera system at a neighborhood access point" },
  { src: "/hoa/image (1).png", alt: "HOA security camera view for community monitoring" },
  { src: "/hoa/imgi_2_com10-scaled.jpg", alt: "Community camera system mounted for wide area coverage" },
  { src: "/hoa/imgi_11_com1.jpg", alt: "Outdoor HOA security camera installation" },
  { src: "/hoa/imgi_33_com5.jpg", alt: "Houston HOA surveillance camera system" },
  { src: "/hoa/imgi_36_com2.jpg", alt: "Managed property camera installation for common areas" },
  { src: "/hoa/20241211_110527.jpg", alt: "HOA security camera monitoring community common areas" },
  { src: "/hoa/imgi_8_com4.jpg", alt: "Security camera installation for apartment and HOA properties" },
  { src: "/hoa/imgi_31_com7.jpg", alt: "HOA perimeter camera installation in Houston" },
  { src: "/hoa/imgi_6_com6-scaled.jpg", alt: "Community surveillance system with professional camera placement" },
  { src: "/hoa/imgi_4_com8-scaled.jpg", alt: "HOA property surveillance camera installation" },
  { src: "/hoa/imgi_51_com11-768x1024.jpg", alt: "Vertical HOA security camera installation detail" },
  { src: "/hoa/imgi_9_com3.jpg", alt: "Security camera system protecting a managed community" },
];

/* ─── FAQs ─────────────────────────────────────────────────── */
const faqs = [
  { question: "What coverage locations are most important for a property manager?", answer: "Based on where incidents most frequently occur, the highest-priority locations are: gate entries/exits (LPR), dumpster areas (vandalism and illegal dumping), mailbox clusters (package theft), pool areas (after-hours access and liability), and parking structures (vehicle break-ins). We assess your property and design coverage around your specific layout and incident history." },
  { question: "How do you work with HOA boards?", answer: "We present directly to your board with detailed proposals and options at different price points. We handle every aspect of the installation — including coordinating access, conduit routing, and any permits required. After installation, board members and property managers get secure remote access from any device." },
  { question: "Can we view footage remotely for multiple properties?", answer: "Yes. Property managers with multiple sites can access all cameras from a single platform — live and recorded footage, from any device. We set up each location and connect your entire portfolio under one management dashboard." },
  { question: "Do you handle multi-entrance communities?", answer: "Absolutely. We design systems for communities of all sizes — from a single gate to large master-planned communities with multiple entry points and miles of common area to cover." },
  { question: "Can the system capture license plates at night?", answer: "Yes. Our LPR cameras use specialized IR illumination designed specifically for nighttime plate capture. We test every installation to verify plate capture quality before we leave the site." },
  { question: "What types of properties do you serve?", answer: "We work with apartment complexes, condominium communities, townhome developments, gated single-family HOA neighborhoods, master-planned communities, and mixed-use developments throughout the Houston area." },
  { question: "What if internet or power goes down at the property?", answer: "All systems include battery backup for power outages. Cameras communicate over Verizon cellular — not your internet — so recording stays active even when connectivity is interrupted. Your footage is protected." },
  { question: "What about ongoing maintenance?", answer: "We offer maintenance plans covering regular system checks, camera cleaning, firmware updates, and priority service response. When something needs attention, we reach out to you — you shouldn't have to chase us." },
];

/* ─── Schemas ──────────────────────────────────────────────── */
const hoaSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "HOA Security Systems Houston TX — Property Manager & Community Surveillance",
    "Professional HOA and property management security solutions in Houston, TX. Gate cameras, LPR, dumpster area coverage, mailbox surveillance, pool cameras, playground monitoring & 24/7 recording.",
    "/hoa-security",
    "HOA Security System Installation",
    ["HOA security camera systems Houston TX", "HOA gate cameras Houston", "property management security cameras Houston", "apartment complex security cameras", "community security cameras Houston", "dumpster area cameras Houston", "mailbox cameras HOA", "pool surveillance cameras Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
  ]),
  generateAllServicesSchemas()[3],
  generateFAQSchema(faqs),
];

/* ─── Page ──────────────────────────────────────────────────── */
const HOASecurity = () => {
  const [activeAudience, setActiveAudience] = useState<"pm" | "hoa" | "investor">("pm");
  const content = audienceContent[activeAudience];

  // Security pole image carousel
  const [poleIdx, setPoleIdx] = useState(0);
  const [polePaused, setPolePaused] = useState(false);
  const [openHoaFaq, setOpenHoaFaq] = useState<number | null>(null);
  const poleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (polePaused) return;
    poleTimerRef.current = setTimeout(() => {
      setPoleIdx(p => (p + 1) % poleImages.length);
    }, 4000);
    return () => { if (poleTimerRef.current) clearTimeout(poleTimerRef.current); };
  }, [poleIdx, polePaused]);

  return (
    <Layout>
      <SEOHead
        title="HOA & Property Management Security Houston TX | Community Cameras | Texas Total Security"
        description="Secure your community with professional gate cameras, LPR, dumpster area coverage, pool surveillance, mailbox cameras & 24/7 recording. Serving HOA boards and property managers across Houston."
        schemas={hoaSchemas}
      />

      {/* ══ HERO — 2-column with embedded form ══════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
        {/* BG */}
        <div className="absolute inset-0">
          <img
            src="/hoa/20241211_110527.jpg"
            alt="HOA security camera system protecting Houston community common areas"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.80) 52%, rgba(0,0,0,0.62) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 15% 65%, hsl(0 85% 44% / 0.13), transparent 65%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 w-full lg:py-20">

            {/* Left — copy */}
            <motion.div
              variants={fadeLeft} initial="hidden" animate="show"
              transition={{ duration: 0.8, ease: easeExpo }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 64%)" }}>HOA · Property Management · Investor Security</span>
              </div>

              <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-4"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
                Be on Top of Your<br />
                <span style={{
                  background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Community & Investment.</span>
              </h1>

              <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "30rem" }}>
                24/7 surveillance for every location that matters — gates, mailboxes, pools, and parking. One local team for every property you manage.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Gate cameras with license plate recognition — every vehicle logged",
                  "Full common-area coverage: mailboxes, pools, dumpsters, parking",
                  "One local team managing all your properties — reach us directly",
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
                  Get a Property Assessment <ArrowRight className="w-4 h-4" />
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

            {/* Right — form panel */}
            <motion.div
              variants={fadeRight} initial="hidden" animate="show"
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.15 }}
              className="flex items-center"
            >
              <div className="w-full rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(8,8,8,0.82)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
                }}>
                <div className="px-1 py-1">
                  <LeadForm
                    title="Request a Free Property Assessment"
                    subtitle="Tell us about your property — we'll design a custom system at no charge, no obligation."
                    showServiceType
                    defaultServiceType="hoa"
                    defaultPropertyType="hoa"
                    referringPage="/hoa-security"
                    compact
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── AUDIENCE TOGGLE ── */}
      <section className="bg-white" style={{ borderTop: "1px solid hsl(0 0% 91%)", borderBottom: "1px solid hsl(0 0% 91%)" }}>
        <div className="max-w-7xl mx-auto">

          {/* Tab selector bar */}
          <div className="border-b" style={{ borderColor: "hsl(0 0% 91%)" }}>

            {/* Mobile — equal 3-column grid, all tabs visible at once */}
            <div className="grid grid-cols-3 sm:hidden">
              {audiences.map((a) => {
                const active = activeAudience === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setActiveAudience(a.id as "pm" | "hoa" | "investor")}
                    className="relative flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 transition-colors duration-200"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                      style={{
                        background: active ? "hsl(0 85% 50%)" : "hsl(0 0% 95%)",
                        border: active ? "none" : "1px solid hsl(0 0% 88%)",
                      }}
                    >
                      <a.icon className="w-4 h-4" style={{ color: active ? "white" : "rgba(0,0,0,0.36)" }} />
                    </div>
                    <p className="text-[10px] font-bold leading-tight text-center"
                      style={{ color: active ? "#111" : "rgba(0,0,0,0.42)" }}>
                      {a.mobileLabel}
                    </p>
                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-t-full" style={{ background: "hsl(0 85% 50%)" }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop — horizontal row with sublabel */}
            <div className="hidden sm:flex px-6 lg:px-8">
              {audiences.map((a) => {
                const active = activeAudience === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setActiveAudience(a.id as "pm" | "hoa" | "investor")}
                    className="relative flex items-center gap-3 px-5 py-4 shrink-0 transition-all duration-200"
                    style={{ color: active ? "#111" : "rgba(0,0,0,0.40)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background: active ? "hsl(0 85% 50%)" : "hsl(0 0% 95%)",
                        border: active ? "none" : "1px solid hsl(0 0% 88%)",
                      }}
                    >
                      <a.icon className="w-4 h-4" style={{ color: active ? "white" : "rgba(0,0,0,0.38)" }} />
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-bold leading-tight">{a.label}</p>
                      <p className="text-[10px] leading-tight mt-0.5"
                        style={{ color: active ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.30)" }}>
                        {a.sublabel}
                      </p>
                    </div>
                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-t-full" style={{ background: "hsl(0 85% 50%)" }} />
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAudience}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: easeExpo }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0">

                {/* Left — copy */}
                <div className="px-6 sm:px-8 lg:px-10 py-8 lg:py-10 border-b lg:border-b-0 lg:border-r"
                  style={{ borderColor: "hsl(0 0% 91%)" }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-[0.16em]"
                    style={{ background: "hsl(0 85% 50% / 0.07)", border: "1px solid hsl(0 85% 50% / 0.16)", color: "hsl(0 80% 42%)" }}>
                    {content.eyebrow}
                  </div>
                  <h2 className="font-display font-bold text-gray-900 leading-tight mb-3"
                    style={{ fontSize: "clamp(1.45rem, 2.6vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                    {content.headline}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-5 text-[14px]" style={{ maxWidth: "38rem" }}>
                    {content.body}
                  </p>
                  <ul className="space-y-2.5 mb-7">
                    {content.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
                          style={{ background: "hsl(0 85% 50% / 0.10)", border: "1px solid hsl(0 85% 50% / 0.22)" }}>
                          <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "hsl(0 80% 46%)" }} />
                        </div>
                        <span className="text-[13.5px] text-gray-600 leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={activeAudience === "pm"
                      ? "/property-assessment"
                      : activeAudience === "investor"
                      ? "/property-assessment"
                      : "/property-assessment"}
                    className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-3 text-[13.5px] font-bold"
                    style={{ boxShadow: "0 4px 16px hsl(0 85% 44% / 0.28)" }}>
                    {content.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right — stat cards */}
                <div className="grid grid-cols-2 p-6 sm:p-8 gap-3 content-start" style={{ background: "hsl(0 0% 98%)" }}>
                  {[content.stat1, content.stat2, content.stat3, content.stat4].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28, ease: easeExpo, delay: i * 0.06 }}
                      className="rounded-xl p-4 flex flex-col gap-1"
                      style={{
                        background: i === 0 ? "hsl(0 85% 50% / 0.07)" : "white",
                        border: i === 0 ? "1px solid hsl(0 85% 50% / 0.18)" : "1px solid hsl(0 0% 90%)",
                      }}
                    >
                      <p className="font-display font-bold leading-none"
                        style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)", color: i === 0 ? "hsl(0 80% 44%)" : "#111", letterSpacing: "-0.04em" }}>
                        {s.value}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">{s.label}</p>
                    </motion.div>
                  ))}
                  <div className="col-span-2 rounded-xl p-3.5" style={{ background: "white", border: "1px solid hsl(0 0% 90%)" }}>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Texas Total Security is locally owned and operated in Houston. You work directly with the owner — not a national call center or franchise.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── COVERAGE SPOTS ── */}
      <section className="py-10 sm:py-14" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
              <Eye className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
                Reliable Surveillance Where It Counts
              </span>
            </div>
            <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}>
              Are You Covered at Every Location That Matters?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Every community has the same high-risk spots. These are the locations where incidents happen most — and where reliable cameras make the difference between a documented event and a he-said-she-said dispute.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageSpots.map((spot, i) => (
              <motion.div
                key={spot.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              >
                <Link
                  to={spot.href}
                  className="block bg-white rounded-2xl p-7 border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 group h-full"
                  style={{ textDecoration: "none" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-50"
                    style={{ background: "hsl(0 85% 50% / 0.07)", border: "1px solid hsl(0 85% 50% / 0.14)" }}>
                    <spot.icon className="w-6 h-6" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-3 leading-tight group-hover:text-red-600 transition-colors duration-200">{spot.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{spot.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {spot.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                        style={{ background: "hsl(0 85% 50% / 0.06)", color: "hsl(0 85% 45%)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all duration-200" style={{ color: "hsl(0 85% 48%)" }}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROPERTY TYPES ── */}
      <section className="py-10 sm:py-14" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <h2 className="font-display font-bold text-gray-900 text-2xl sm:text-3xl mb-3 leading-tight">
              We Work with Every Type of Property
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              From 50-unit apartments to 500-home HOA neighborhoods — every property type has different layout challenges, and we design for your specific situation.
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
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "hsl(0 85% 50% / 0.07)" }}>
                  <pt.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm">{pt.label}</p>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap"
                      style={{
                        background: pt.audience === "HOA" ? "hsl(220 85% 55% / 0.08)" : pt.audience === "Property Management" ? "hsl(142 70% 40% / 0.08)" : "hsl(38 92% 50% / 0.10)",
                        color: pt.audience === "HOA" ? "hsl(220 85% 45%)" : pt.audience === "Property Management" ? "hsl(142 70% 32%)" : "hsl(38 92% 35%)",
                      }}>
                      {pt.audience}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{pt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <h2 className="font-display font-bold text-gray-900 text-2xl sm:text-3xl mb-3">
              The Full System — Everything Your Property Needs
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every component works together — from gate LPR to dumpster cameras to remote management — complete visibility across your entire property.
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
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                  style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.12)" }}>
                  <s.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <h3 className="font-display font-semibold text-gray-900 text-sm mb-2 leading-snug">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ background: "hsl(0 0% 97%)" }} className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
          >
            <div>
              <h2 className="font-display font-bold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", letterSpacing: "-0.03em" }}>
                Real HOA Installations Across Houston
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Actual community security camera systems professionally installed by Texas Total Security.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {hoaGalleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }}
                className="relative rounded-xl overflow-hidden"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-gray-900 text-3xl mb-2">Trusted by Houston HOA Boards & Property Managers</h2>
            <p className="text-gray-500 text-sm">Real feedback from the people responsible for keeping their communities safe.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY POLES ── */}
      <section className="overflow-hidden" style={{ background: "hsl(0 0% 5%)" }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 60% at 60% 50%, hsl(0 85% 38% / 0.10), transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

            {/* Left — copy */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 60%)" }}>Security Poles</span>
              </div>

              <h2 className="font-display font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}>
                Custom Security Camera Poles for Gate & Entrance Installs
              </h2>

              <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", color: "rgba(255,255,255,0.58)", maxWidth: "34rem" }}>
                Texas Total Security custom-fabricates and installs security camera poles for HOA communities, apartment complexes, and neighborhood entrances throughout Houston. Poles support wide-angle cameras, LPR, and LED strobe kits — at the exact height and angle your property requires.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Custom-height poles from 10 to 30 feet",
                  "Entrance gate systems with LPR and wide-angle coverage",
                  "All hardware, mounting, and underground conduit included",
                  "Outdoor weather-rated housing for all equipment",
                  "Multi-camera pole configurations available",
                  "We handle permits and coordination with property management",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-[2px]" style={{ color: "hsl(0 85% 54%)" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/security-pole-configurator"
                  className="btn-primary-gradient inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5"
                  style={{ boxShadow: "0 4px 24px hsl(0 85% 44% / 0.42)" }}
                >
                  Design Your Pole System <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:7133879937"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3.5 rounded-xl transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.16)", color: "white" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  <Phone className="w-4 h-4" style={{ color: "hsl(0 85% 54%)" }} /> (713) 387-9937
                </a>
              </div>
            </motion.div>

            {/* Right — image carousel */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo, delay: 0.1 }}
              onMouseEnter={() => setPolePaused(true)}
              onMouseLeave={() => setPolePaused(false)}
            >
              {/* Main image */}
              <div
                className="relative rounded-2xl overflow-hidden mb-3"
                style={{
                  aspectRatio: "4/3",
                  background: "hsl(0 0% 10%)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={poleIdx}
                    src={poleImages[poleIdx]}
                    alt="Security camera pole installation by Texas Total Security"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {[
                  { dir: "prev", icon: ChevronLeft, pos: "left-3", fn: () => setPoleIdx(p => (p - 1 + poleImages.length) % poleImages.length) },
                  { dir: "next", icon: ChevronRight, pos: "right-3", fn: () => setPoleIdx(p => (p + 1) % poleImages.length) },
                ].map(({ dir, icon: Icon, pos, fn }) => (
                  <button
                    key={dir}
                    onClick={fn}
                    aria-label={dir === "prev" ? "Previous image" : "Next image"}
                    className={`absolute ${pos} top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200`}
                    style={{ background: "rgba(0,0,0,0.52)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.75)"}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.52)"}
                  >
                    <Icon className="w-4 h-4 text-white/70" />
                  </button>
                ))}

                {/* Progress bar */}
                {!polePaused && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <motion.div
                      key={poleIdx}
                      className="h-full"
                      style={{ background: "hsl(0 85% 52%)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  </div>
                )}

                {/* Image counter */}
                <div
                  className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-white/70 pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em" }}
                >
                  {poleIdx + 1} / {poleImages.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-5 gap-2">
                {poleImages.slice(0, 10).map((src, idx) => (
                  <button
                    key={src}
                    onClick={() => setPoleIdx(idx)}
                    className="relative rounded-lg overflow-hidden transition-all duration-200"
                    style={{
                      aspectRatio: "1/1",
                      border: idx === poleIdx ? "2px solid hsl(0 85% 52%)" : "2px solid transparent",
                      boxShadow: idx === poleIdx ? "0 0 0 1px hsl(0 85% 52% / 0.3)" : "none",
                      opacity: idx === poleIdx ? 1 : 0.5,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      aria-hidden
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── FAQ — inline accordion ── */}
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
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Answers for HOA boards, property managers, and investors evaluating community security systems.
            </p>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                q: "What coverage locations are most important for a property manager?",
                a: (
                  <span>
                    Based on where incidents most frequently occur, the highest-priority locations are: gate entries/exits (LPR), dumpster areas (vandalism and illegal dumping), mailbox clusters (package theft), pool areas (after-hours access and liability), and parking structures (vehicle break-ins). We assess your property and design coverage around your specific layout and incident history.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free property assessment</Link>{" "}
                    and we'll prioritize the locations that matter most for your community.
                  </span>
                ),
              },
              {
                q: "How do you work with HOA boards?",
                a: (
                  <span>
                    We present directly to your board with detailed proposals and options at different price points. We handle every aspect of the installation — including coordinating access, conduit routing, and any permits required. After installation, board members and property managers get secure remote access from any device. Reach Tim Townsend directly at{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to schedule a board presentation.
                  </span>
                ),
              },
              {
                q: "Can we view footage remotely for multiple properties?",
                a: (
                  <span>
                    Yes. Property managers with multiple sites can access all cameras from a single platform — live and recorded footage, from any device. We set up each location and connect your entire portfolio under one management dashboard.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request a property assessment</Link>{" "}
                    and we'll design the multi-site access configuration for your portfolio.
                  </span>
                ),
              },
              {
                q: "Do you handle multi-entrance communities?",
                a: (
                  <span>
                    Absolutely. We design systems for communities of all sizes — from a single gate to large master-planned communities with multiple entry points and miles of common area to cover. If your community needs custom security poles at multiple entrances, visit our{" "}
                    <Link to="/security-pole-configurator" className="text-red-600 font-semibold hover:underline">Security Pole Configurator</Link>{" "}
                    to explore pole options.
                  </span>
                ),
              },
              {
                q: "Can the system capture license plates at night?",
                a: (
                  <span>
                    Yes. Our LPR cameras use specialized IR illumination designed specifically for nighttime plate capture. We test every installation to verify plate capture quality before we leave the site. If the plate isn't readable, we adjust angle, illumination, or focal length until it is. Call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss LPR placement for your specific gate configuration.
                  </span>
                ),
              },
              {
                q: "What types of properties do you serve?",
                a: (
                  <span>
                    We work with apartment complexes, condominium communities, townhome developments, gated single-family HOA neighborhoods, master-planned communities, and mixed-use developments throughout the Houston area.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule your free assessment</Link>{" "}
                    and we'll design the right system for your specific property type and layout.
                  </span>
                ),
              },
              {
                q: "What if internet or power goes down at the property?",
                a: (
                  <span>
                    All systems include battery backup for power outages. Cameras communicate over Verizon cellular — not your internet — so recording stays active even when connectivity is interrupted. Your footage is protected regardless of local network conditions.
                  </span>
                ),
              },
              {
                q: "What about ongoing maintenance?",
                a: (
                  <span>
                    We offer maintenance plans covering regular system checks, camera cleaning, firmware updates, and priority service response. When something needs attention, we reach out to you — you shouldn't have to chase us. Contact{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss maintenance plan options for your property.
                  </span>
                ),
              },
            ].map((faq, i) => {
              const isOpen = openHoaFaq === i;
              return (
                <motion.div
                  key={faq.q}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                  transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.06 }}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenHoaFaq(isOpen ? null : i)}
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

export default HOASecurity;
