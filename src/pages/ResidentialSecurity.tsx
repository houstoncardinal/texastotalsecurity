import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas } from "@/lib/seo";
import {
  Home, Shield, Camera, Thermometer, Smartphone,
  Baby, Lock, Bell, CheckCircle2, ArrowRight, Phone, Star
} from "lucide-react";

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

const solutions = [
  {
    icon: Shield,
    title: "Whole-Home Alarm Systems",
    desc: "Custom alarm coverage for every door, window, and access point with 24/7 local monitoring and instant emergency dispatch.",
  },
  {
    icon: Camera,
    title: "Home Surveillance Cameras",
    desc: "Indoor and outdoor HD cameras with night vision, motion detection, and live mobile app access from anywhere in the world.",
  },
  {
    icon: Thermometer,
    title: "Environmental Sensors",
    desc: "Smoke, CO, flood, and temperature sensors that protect against fire, gas leaks, and water damage around the clock.",
  },
  {
    icon: Smartphone,
    title: "Smart Home Integration",
    desc: "Control your security system, smart locks, lights, and cameras from your smartphone with one seamless platform.",
  },
  {
    icon: Baby,
    title: "Family Safety Features",
    desc: "Baby monitors, panic buttons, medical alerts, and custom user codes so every family member stays protected.",
  },
  {
    icon: Lock,
    title: "Smart Locks & Keyless Entry",
    desc: "Keyless entry with smart locks and garage door controllers tied directly to your security system for seamless home automation.",
  },
];

const propertyTypes = [
  "New Homeowners",
  "Existing Homeowners",
  "New Homes from the Ground Up",
  "Condominiums or Townhomes",
  "Second Homes",
  "Lake Homes, Ocean Front Properties, Ranches, Etc.",
];

const pillars = [
  { icon: Shield, title: "Superior Installation", desc: "Licensed technicians handle the entire setup process with precision craftsmanship — every sensor, camera, and panel placed for maximum coverage." },
  { icon: Bell, title: "Dedicated 24/7 Monitoring", desc: "Professional monitoring center watches your home around the clock, ready to contact emergency services the moment an alarm triggers." },
  { icon: Home, title: "Responsive Support", desc: "When you need help, you talk to a real local person who knows your system. Not a national call center. Not a ticket queue." },
];

const faqs = [
  {
    question: "How does Texas Total Security customize residential alarm systems?",
    answer: "We specialize in customizing residential alarm systems to fit diverse properties. Our consultants work directly with you to design a solution that addresses the specific vulnerabilities and layout of your property. No two homes are identical, and no two systems should be either.",
  },
  {
    question: "What does your residential security service include?",
    answer: "Our service is built on three core pillars: superior installation by licensed professionals, personalized system design tailored to your home, and dedicated 24/7 professional monitoring with rapid response.",
  },
  {
    question: "Do you offer solutions beyond basic burglar alarms?",
    answer: "Yes. We integrate fire and CO detection, environmental monitoring, smart home automation, and surveillance cameras for comprehensive, layered defense — far beyond a basic alarm.",
  },
  {
    question: "Is my home too old for a modern security system?",
    answer: "Not at all. We install wireless systems that require no new wiring, making them perfect for older homes and retrofits with zero damage to walls or trim.",
  },
  {
    question: "Can I control my system when I'm away from home?",
    answer: "Yes. Our systems include mobile apps for remote arm/disarm, live camera viewing, smart lock control, and real-time notifications from anywhere in the world.",
  },
  {
    question: "What if I already have a system from another company?",
    answer: "We can often take over your existing equipment and activate it on our local monitoring platform — so you get better service without the cost of a full replacement.",
  },
];

const residentialSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Residential Security Systems Houston TX",
    "Complete home security for Houston homeowners. Custom alarm systems, HD cameras, smart home integration & 24/7 local monitoring. New homes, existing homes, condos & second homes.",
    "/residential",
    "Residential Security System Installation",
    ["local home security companies Houston TX", "local home security systems Houston", "local alarm system Houston", "local burglar alarm Houston", "local home alarm companies Houston", "local security system companies Houston", "home security systems local Houston", "residential alarm installation Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Residential Security", href: "/residential" },
  ]),
  generateAllServicesSchemas()[0],
  generateFAQSchema(faqs),
];

const ResidentialSecurity = () => (
  <Layout>
    <SEOHead
      title="Residential Security Systems Houston TX | Home Alarm Installation | Texas Total Security"
      description="Protect your Houston home with professional alarm systems, security cameras & smart monitoring. Local experts, no national contracts. Free onsite analysis."
      schemas={residentialSchemas}
    />

    {/* ── HERO ─────────────────────────────────────────── */}
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/residential/imgi_33_luxury-home-6886153_1280.jpg"
          alt="Luxury residential home protected by Texas Total Security"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.38) 100%)" }}
        />
        {/* Red radial accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 20% 60%, hsl(0 85% 45% / 0.14), transparent 60%)" }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.75, ease: easeExpo }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Home className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.6)" }}>Residential Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.06] tracking-tight mb-6">
            Residential Security Service in{" "}
            <span style={{
              background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 40%, hsl(0 90% 44%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Houston, TX</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
            Protect your family and home with a custom-designed alarm and surveillance system backed by 24/7 local monitoring from Houston's most trusted security experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.975 }}>
              <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2"
                style={{ boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38), 0 2px 8px rgba(0,0,0,0.3)" }}>
                Get a Free Home Security Analysis <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a href="tel:7133879937" className="btn-outline-light text-sm">
                <Phone className="w-4 h-4" /> (713) 387-9937
              </a>
            </motion.div>
          </div>

          <div className="flex items-center justify-start flex-wrap gap-x-5 gap-y-1 mt-10">
            {[
              { icon: Star,         label: "5.0 Google Rating" },
              { icon: Shield,       label: "Licensed #B03066901" },
              { icon: CheckCircle2, label: "No Long Contracts" },
            ].map(({ icon: Icon, label }, idx, arr) => (
              <span key={label} className="flex items-center gap-4">
                <span className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.32)" }}>
                  <Icon className="w-3 h-3" style={{ color: "hsl(0 85% 52% / 0.65)" }} />
                  <span className="text-[10px] font-semibold tracking-[0.1em] uppercase">{label}</span>
                </span>
                {idx < arr.length - 1 && (
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── INTRO ─────────────────────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-tight max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.75, ease: easeExpo }}
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
              Your Home Deserves Better
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Your Home Deserves More Than a Generic System
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At Texas Total Security in Houston, TX, we understand that protecting your home is your number one priority. We deliver absolute peace of mind through a robust and fully customized residential security service. Every home has unique needs, and we design tailored solutions that provide seamless and comprehensive protection for your family, your property, and everything that matters most.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ── THREE PILLARS ─────────────────────────────────── */}
    <section className="section-padding" style={{ background: "hsl(0 0% 98%)" }}>
      <div className="container-tight">
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
              Three Pillars
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Three Pillars of Total Protection
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            True security is not a generic, one-size-fits-all product. Our service rests on three non-negotiable commitments.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
              className="group"
            >
              <div className="h-full rounded-2xl p-8 bg-white border border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden text-center">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 85% 45% / 0.03) 0%, transparent 100%)",
                  }}
                />
                <div className="absolute top-0 right-0 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-display font-bold text-[10px] tracking-[0.2em] tabular-nums" style={{ color: "rgba(0,0,0,0.06)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 85% 45% / 0.08) 0%, hsl(0 85% 45% / 0.04) 100%)",
                    border: "1px solid hsl(0 85% 45% / 0.12)",
                  }}
                >
                  <p.icon className="w-7 h-7" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-3 leading-tight group-hover:text-accent transition-colors duration-300">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(90deg, hsl(0 85% 45%), hsl(0 85% 55%))",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── SPLIT — patio lifestyle ───────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}
          >
            <img
              src="/residential/imgi_2_resi6-scaled.jpg"
              alt="Protected Houston home patio and backyard"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 85% 45% / 0.05), transparent)" }} />
          </motion.div>
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "hsl(0 85% 45% / 0.06)",
                border: "1px solid hsl(0 85% 45% / 0.12)",
              }}>
              <Home className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
                Custom Design
              </span>
            </div>
            <div className="w-12 h-1 rounded-full mb-6" style={{ background: "hsl(0 85% 50%)" }} />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-5 leading-tight">
              Designing Your Personalized Defense
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Choosing Texas Total Security means partnering with a team deeply committed to your long-term protection — going far beyond simple alarms to include full home automation, environmental monitoring, and smart home integration.
              </p>
              <p>
                Our highly trained and licensed technicians manage the entire setup process, ensuring every component functions flawlessly from day one. Our professional monitoring center provides constant vigilance, ready to contact emergency services instantly when an alarm triggers.
              </p>
              <p>
                From your front door to your backyard, from your detached garage to your second home — we design coverage with zero blind spots.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.975 }} className="inline-block mt-7">
              <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2">
                Schedule a Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── SOLUTIONS GRID ───────────────────────────────── */}
    <section className="section-padding" style={{ background: "hsl(0 0% 98%)" }}>
      <div className="container-tight">
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
              Complete Solutions
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Complete Residential Security Solutions
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Every technology we offer works together as one integrated system — designed around your home.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
              className="group"
            >
              <div className="h-full rounded-2xl p-7 bg-white border border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 85% 45% / 0.03) 0%, transparent 100%)",
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 85% 45% / 0.08) 0%, hsl(0 85% 45% / 0.04) 100%)",
                    border: "1px solid hsl(0 85% 45% / 0.12)",
                  }}
                >
                  <s.icon className="w-6 h-6" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2 text-[15px] leading-tight group-hover:text-accent transition-colors duration-300">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(90deg, hsl(0 85% 45%), hsl(0 85% 55%))",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── PROPERTY TYPES + IMAGE ───────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "hsl(0 85% 45% / 0.06)",
                border: "1px solid hsl(0 85% 45% / 0.12)",
              }}>
              <Home className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
                All Property Types
              </span>
            </div>
            <div className="w-12 h-1 rounded-full mb-6" style={{ background: "hsl(0 85% 50%)" }} />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">
              We Protect Every Type of Home
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you're moving into your first home, securing a lakeside retreat, or protecting a luxury estate — we custom-design the right system for your property.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {propertyTypes.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-2.5 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" style={{ color: "hsl(0 85% 50%)" }} />
                  <span className="text-sm text-gray-700 leading-relaxed">{t}</span>
                </motion.div>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.975 }} className="inline-block">
              <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2">
                Get My Free Analysis <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Photo collage — 2×2 */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { src: "/residential/imgi_7_resi2-scaled.jpg", alt: "Surveillance camera protecting Houston backyard pool" },
              { src: "/residential/imgi_5_resi4-scaled.jpg", alt: "Dome cameras mounted on home exterior" },
              { src: "/residential/imgi_4_resi5-scaled.jpg", alt: "Outdoor camera post with estate in background" },
              { src: "/residential/imgi_8_resi1.jpg", alt: "Security cameras on residential fence perimeter" },
            ].map((img, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl overflow-hidden shadow-lg ${i === 0 ? "row-span-1" : ""}`}
                style={{ aspectRatio: "1/1" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── PHOTO STRIP ──────────────────────────────────── */}
    <section className="section-padding overflow-hidden" style={{ background: "hsl(0 0% 98%)" }}>
      <div className="container-tight">
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
              Real Installations
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Real Installations. Real Protection.
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Every project is professionally installed by our licensed Houston technicians.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "/residential/imgi_11_resi7.png", alt: "Professional residential camera installation" },
            { src: "/residential/imgi_31_resi7-768x1024.png", alt: "HD camera mounted on Houston home" },
            { src: "/residential/imgi_2_resi6-scaled.jpg", alt: "Backyard coverage at protected residence" },
            { src: "/residential/imgi_7_resi2-scaled.jpg", alt: "Pool and yard surveillance system" },
            { src: "/residential/imgi_4_resi5-scaled.jpg", alt: "PTZ cameras at luxury residential estate" },
            { src: "/residential/imgi_8_resi1.jpg", alt: "Perimeter security camera installation" },
          ].map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.07 }}
              className="relative rounded-2xl overflow-hidden shadow-lg"
              style={{ aspectRatio: "4/3" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── LEAD FORM ────────────────────────────────────── */}
    <section className="section-padding bg-white">
      <div className="container-tight max-w-2xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.75, ease: easeExpo }}
        >
          <LeadForm
            title="Get a Free Home Security Assessment"
            subtitle="Tell us about your home and we'll design the perfect system — no obligation, no pressure."
          />
        </motion.div>
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default ResidentialSecurity;