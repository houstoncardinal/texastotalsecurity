import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas } from "@/lib/seo";
import {
  Home, Shield, Camera, Smartphone,
  Lock, Bell, CheckCircle2, ArrowRight, Phone, Plus, Minus
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp   = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight= { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const solutions = [
  { icon: Camera,     title: "4K Hardwired Cameras",      desc: "Hardwired 4K resolution — no Wi-Fi dependency, no dropped feeds, zero blind spots." },
  { icon: Shield,     title: "Custom Alarm Systems",      desc: "Every door, window, and access point covered — built for your layout, not a generic package." },
  { icon: Bell,       title: "24/7 Cellular Monitoring",  desc: "Connected over Verizon cellular, not your internet — stays on when Wi-Fi or power goes down." },
  { icon: Smartphone, title: "Remote App Access",         desc: "Arm, disarm, and view live footage from anywhere in the world — full visibility, always." },
  { icon: Lock,       title: "Perimeter & Gate Security", desc: "Driveway coverage and LPR cameras so you know who's approaching before they reach your door." },
];

const propertyTypes = [
  "New Homeowners",
  "Existing Homeowners",
  "New Homes from the Ground Up",
  "Condominiums & Townhomes",
  "Second Homes",
  "Lake Homes, Ranches & Waterfront Properties",
];

const pillars = [
  { icon: Shield, num: "01", title: "Superior Installation",    desc: "Licensed technicians handle every sensor, camera, and panel — placed for maximum coverage of your specific property." },
  { icon: Bell,   num: "02", title: "Dedicated 24/7 Monitoring", desc: "Our professional partner monitoring center watches your home around the clock, ready to dispatch emergency services the moment an alarm fires." },
  { icon: Home,   num: "03", title: "Responsive Local Support",  desc: "When you need help, you reach a real local team who knows your system — not a national call center or a ticket queue." },
];

const faqs = [
  {
    question: "How does Texas Total Security customize residential security systems?",
    answer: "Our consultants visit your property in person and assess every vulnerability — sight lines, entry points, lighting, and property boundaries — before designing your system. No two homes are identical, and no two systems should be either.",
  },
  {
    question: "What does your residential security service include?",
    answer: "Our service is built on three commitments: superior installation by licensed professionals, a system design tailored to your specific property, and 24/7 professional monitoring with rapid emergency dispatch.",
  },
  {
    question: "Do you offer more than basic burglar alarms?",
    answer: "Yes. We integrate hardwired 4K surveillance cameras and remote app access alongside your alarm system — a comprehensive layered defense well beyond a standard alarm.",
  },
  {
    question: "Is my home too old for a modern system?",
    answer: "Not at all. We work with existing wiring where possible and install solutions suited to your home's infrastructure — older homes and retrofits are a routine part of what we do.",
  },
  {
    question: "Can I monitor my system remotely?",
    answer: "Yes. Our systems include app access for remote arm/disarm, live camera viewing, and real-time alerts from anywhere in the world.",
  },
  {
    question: "What if I already have a system from another company?",
    answer: "We can often take over your existing equipment and connect it to our monitoring platform — better service without the cost of full replacement.",
  },
];

const residentialSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Residential Security Systems Houston TX",
    "Custom home security for Houston homeowners. 4K hardwired cameras, alarm systems & 24/7 professional monitoring. New homes, existing homes, condos & second homes.",
    "/residential",
    "Residential Security System Installation",
    ["local home security companies Houston TX", "local home security systems Houston", "local alarm system Houston", "local burglar alarm Houston", "home security systems local Houston", "residential alarm installation Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Residential Security", href: "/residential" },
  ]),
  generateAllServicesSchemas()[0],
  generateFAQSchema(faqs),
];

const residentialGalleryImages = [
  { src: "/residential/imgi_4_resi5-scaled.jpg", alt: "Outdoor residential security camera installed at Houston home" },
  { src: "/residential/imgi_33_luxury-home-6886153_1280.jpg", alt: "Luxury Houston home protected by residential security system" },
  { src: "/residential/imgi_2_resi6-scaled.jpg", alt: "Hardwired security camera protecting Houston home backyard" },
  { src: "/residential/imgi_7_resi2-scaled.jpg", alt: "Surveillance cameras protecting Houston backyard pool area" },
  { src: "/residential/20250124_181858 (1).jpg", alt: "Professional home security system installation detail" },
  { src: "/residential/imgi_5_resi4-scaled.jpg", alt: "Dome security camera mounted on Houston home exterior" },
  { src: "/residential/imgi_31_resi7-768x1024.png", alt: "HD residential camera installed on Houston residence" },
  { src: "/residential/imgi_8_resi1.jpg", alt: "Security cameras on residential perimeter fence" },
];

const ResidentialSecurity = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
  <Layout>
    <SEOHead
      title="Residential Security Systems Houston TX | Home Alarm Installation | Texas Total Security"
      description="Protect your Houston home with professional alarm systems, 4K hardwired cameras & 24/7 professional monitoring. Customized for every property type. Free onsite assessment."
      schemas={residentialSchemas}
    />

    {/* ══ HERO — 2-column ══════════════════════════════════ */}
    <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="/residential/imgi_33_luxury-home-6886153_1280.jpg"
          alt="Luxury Houston residential home secured by Texas Total Security"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.78) 52%, rgba(0,0,0,0.60) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 15% 65%, hsl(0 85% 44% / 0.12), transparent 65%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 w-full lg:py-20">

          {/* Left — copy */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, ease: easeExpo }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 64%)" }}>Residential Security · Houston, TX</span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Houston's Most Trusted<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Home Security Experts.</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "30rem" }}>
              Custom alarm systems and hardwired 4K cameras — built around your property, backed by 24/7 professional monitoring.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Hardwired 4K cameras — no Wi-Fi dependency, no blind spots",
                "Alarm system custom-designed for your home's layout",
                "24/7 monitoring over Verizon cellular — stays on when Wi-Fi fails",
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
                Get My Free Assessment <ArrowRight className="w-4 h-4" />
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
            variants={fadeRight}
            initial="hidden"
            animate="show"
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
                  title="Get Your Free Home Security Assessment"
                  subtitle="No obligation. We'll design the perfect system for your property."
                  showServiceType
                  defaultServiceType="residential"
                  defaultPropertyType="residential"
                  referringPage="/residential"
                  compact
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

    {/* ══ SOLUTIONS GRID ═══════════════════════════════════ */}
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
                style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>What We Install</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                Complete Residential Security Solutions
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed sm:text-right sm:max-w-[18rem]">
              Every technology works together as one integrated system — designed around your home.
            </p>
          </div>
        </motion.div>

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {solutions.slice(0, 3).map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              className="group flex gap-4 p-5 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
              style={{ border: "1px solid hsl(0 0% 91%)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "hsl(0 85% 45% / 0.07)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <s.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900 mb-1 text-[14px] leading-tight group-hover:text-accent transition-colors duration-200">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Row 2 — 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-2/3 lg:mx-auto">
          {solutions.slice(3).map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: (i + 3) * 0.07 }}
              className="group flex gap-4 p-5 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
              style={{ border: "1px solid hsl(0 0% 91%)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: "hsl(0 85% 45% / 0.07)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <s.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900 mb-1 text-[14px] leading-tight group-hover:text-accent transition-colors duration-200">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ THREE PILLARS — dark ══════════════════════════════ */}
    <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="shrink-0 mt-0.5">
                <span className="font-display font-bold text-[11px] tracking-[0.14em]"
                  style={{ color: "hsl(0 85% 50%)" }}>
                  {p.num}
                </span>
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

    {/* ══ PROPERTY TYPES + IMAGE ════════════════════════════ */}
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
              <Home className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>Every Property Type</span>
            </div>
            <h2 className="font-display font-bold text-gray-900 mb-3 leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
              We Protect Every Type of Home
            </h2>
            <p className="text-gray-500 leading-relaxed mb-7 text-sm">
              Whether you're moving into your first home, building from the ground up, or securing a lakeside retreat — we custom-design the right system for your property, then back it with professional monitoring and local support.
            </p>

            <div className="space-y-2 mb-8">
              {propertyTypes.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(0 85% 50%)" }} />
                  <span className="text-[14px] text-gray-700 font-medium">{t}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/free-analysis?service=residential&property=residential"
              className="btn-primary-gradient inline-flex items-center gap-2 text-sm font-semibold">
              Get My Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeRight} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src="/residential/imgi_2_resi6-scaled.jpg"
              alt="Hardwired security camera protecting Houston home backyard"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)" }} />
            <div className="absolute bottom-5 left-5 right-5 px-4 py-3 rounded-xl"
              style={{ background: "rgba(6,6,6,0.84)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <p className="font-bold text-white text-sm leading-tight">Hardwired. Local. Accountable.</p>
              <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.5)", marginTop: "3px" }}>Professional installation by our own licensed Houston technicians.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ GALLERY ══════════════════════════════════════════ */}
    <section style={{ background: "hsl(0 0% 97%)" }} className="py-12 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.65, ease: easeExpo }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
        >
          <div>
            <h2 className="font-display font-bold text-gray-900 leading-tight"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", letterSpacing: "-0.03em" }}>
              Real Installations. Real Protection.
            </h2>
            <p className="text-gray-500 text-sm mt-1">Every project installed by our licensed Houston team.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {residentialGalleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
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

    {/* ══ FAQ — inline accordion ════════════════════════════ */}
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
            Everything you need to know about home security systems for Houston homeowners.
          </p>
        </motion.div>

        <div className="space-y-2">
          {[
            {
              q: "How does Texas Total Security customize residential security systems?",
              a: (
                <span>
                  Our consultants visit your property in person and assess every vulnerability — sight lines, entry points, lighting, and property boundaries — before designing your system. No two homes are identical, and no two systems should be either. Start with a{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free home security assessment</Link>{" "}
                  and we'll walk your property together.
                </span>
              ),
            },
            {
              q: "What does your residential security service include?",
              a: (
                <span>
                  Our service is built on three commitments: superior installation by licensed professionals, a system design tailored to your specific property, and 24/7 professional monitoring with rapid emergency dispatch. Learn more about our{" "}
                  <Link to="/security-cameras" className="text-red-600 font-semibold hover:underline">hardwired 4K camera systems</Link>{" "}
                  and how they integrate with your alarm system.
                </span>
              ),
            },
            {
              q: "Do you offer more than basic burglar alarms?",
              a: (
                <span>
                  Yes. We integrate hardwired 4K surveillance cameras and remote app access alongside your alarm system — a comprehensive layered defense well beyond a standard alarm. Explore our full range of{" "}
                  <Link to="/security-cameras" className="text-red-600 font-semibold hover:underline">residential camera options</Link>{" "}
                  or call us at{" "}
                  <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                  to discuss what's right for your home.
                </span>
              ),
            },
            {
              q: "Is my home too old for a modern system?",
              a: (
                <span>
                  Not at all. We work with existing wiring where possible and install solutions suited to your home's infrastructure — older homes and retrofits are a routine part of what we do. We assess your home's specific conditions during the{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free property assessment</Link>{" "}
                  and design around what's already there.
                </span>
              ),
            },
            {
              q: "Can I monitor my system remotely?",
              a: (
                <span>
                  Yes. Our systems include app access for remote arm/disarm, live camera viewing, and real-time alerts from anywhere in the world. You can check your home from your phone whether you're at the office or out of the country. Call{" "}
                  <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                  to discuss remote access capabilities for your specific property.
                </span>
              ),
            },
            {
              q: "What if I already have a system from another company?",
              a: (
                <span>
                  We can often take over your existing equipment and connect it to our monitoring platform — better service without the cost of full replacement. Visit our{" "}
                  <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">alarm takeover page</Link>{" "}
                  to learn about your switching options, or{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">schedule a free assessment</Link>{" "}
                  and we'll evaluate your existing system at no charge.
                </span>
              ),
            },
          ].map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <motion.div
                key={faq.q}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
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

export default ResidentialSecurity;
