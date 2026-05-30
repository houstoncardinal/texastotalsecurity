import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema, generateFAQSchema, generateAllServicesSchemas, generateServicePageReviewSchema } from "@/lib/seo";
import {
  Building2, Camera, Shield, Zap, Eye,
  ArrowRight, Lock, Plus, Minus, Star, Quote
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const solutions = [
  { icon: Camera,    title: "4K Commercial Surveillance",    desc: "Multi-camera hardwired systems with 4K resolution, high-retention recording, and remote live viewing for your facility." },
  { icon: Shield,    title: "Commercial Alarm Systems",      desc: "Intrusion detection across every access point — doors, windows, and motion zones — with 24/7 professional monitoring and direct dispatch." },
  { icon: Zap,       title: "Active Deterrence",             desc: "Cameras equipped with sirens, strobe lights, and two-way audio that confront and stop trespassers in real time — before damage is done." },
  { icon: Lock,      title: "License Plate Reader",     desc: "License Plate Reader (LPR) cameras at entry and exit points capture every vehicle — essential for gated facilities, parking areas, and high-traffic commercial properties." },
  { icon: Eye,       title: "24/7 Alarm Monitoring",         desc: "Professional monitoring through our certified partner center — fast signal verification and direct dispatch communication with your team." },
  { icon: Building2, title: "Alarm Takeovers & Upgrades",    desc: "Already have a system? We take over existing commercial panels and sensors, saving replacement costs while improving your monitoring service." },
];

const pillars = [
  { num: "01", title: "On-Site System Design",   desc: "We visit your facility, walk every access point, and engineer a system around your specific layout, risk profile, and operational needs — no generic packages." },
  { num: "02", title: "24/7 Professional Monitoring", desc: "Your monitoring account is managed locally — dispatched through our certified partner center in San Antonio. Same team, same number, same accountability." },
  { num: "03", title: "Long-Term Partnership",   desc: "We maintain the relationship after installation day. When your system needs expansion, the team that installed it is the team that shows up." },
];

const industries = [
  "Small Businesses", "Apartment Complexes", "Condominium Complexes",
  "Home Owners Associations", "Industrial Facilities", "Government Buildings",
  "Hotels & Hospitality", "Daycares & Schools", "Medical & Dental Offices",
  "Retail Centers", "Parking Garages", "Valet Facilities",
  "Construction Sites", "Recycling Centers", "Places of Worship",
  "Restaurants", "Stadiums & Event Venues", "Marinas",
];

const reviewProof = [
  {
    name: "Coleman Ferguson",
    role: "Google Review",
    text: "Texas Total Security did a fantastic job installing an alarm system and cameras. The cameras are all 1080p hd and are all commercial grade. The owner, Tim Townsend, is a very credible, knowledgeable person who was able to explain everything to me in a way I was able to understand.",
  },
  {
    name: "John Gray",
    role: "Google Review",
    text: "Very professional and safety oriented with cameras and alarm systems",
  },
  {
    name: "S Nevar",
    role: "Google Review",
    text: "Great company and staff. They did the set up on mobile phones and explained everything we needed to know on our two-way audio cameras and doorbell. Highly recommend. Thank You Tim and Johnny.",
  },
];

const faqs = [
  {
    question: "What types of commercial properties do you serve?",
    answer: "We serve virtually every type — from small businesses and retail to industrial complexes, apartment communities, government buildings, medical offices, schools, hotels, construction sites, parking garages, places of worship, and more. If it's a commercial property in Houston, we've secured one like it.",
  },
  {
    question: "Can you integrate cameras with our existing alarm system?",
    answer: "Yes. We specialize in combining surveillance and alarm systems into a single unified setup. In many cases we take over and upgrade existing infrastructure, saving the cost of full replacement.",
  },
  {
    question: "What is active deterrence and do I need it?",
    answer: "Active deterrence cameras respond to detected intrusions with audible sirens and strobe lights — warning or stopping trespassers before a crime occurs. We recommend them for after-hours properties, construction sites, parking areas, and any location where a visual alarm alone isn't enough.",
  },
  {
    question: "How does your commercial security consultation work?",
    answer: "We visit your facility, walk the property, identify vulnerabilities, and design a custom security proposal — at no charge and no obligation. You receive a detailed system design and clear pricing before any commitment.",
  },
  {
    question: "Do you handle multi-building or multi-location systems?",
    answer: "Yes. We design and manage systems across multiple buildings or locations, giving ownership and security personnel a centralized view of their entire portfolio.",
  },
  {
    question: "What if we already have a system from another provider?",
    answer: "We can often take over your existing panels and sensors and connect them to our monitoring platform — giving you improved service and local accountability without the cost of starting from scratch.",
  },
];

const commercialSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Commercial Security Systems Houston TX",
    "Enterprise-grade security for Houston businesses. Commercial alarms, 4K surveillance, active deterrence & 24/7 professional monitoring. Scalable for any industry.",
    "/commercial",
    "Commercial Security System Installation",
    ["commercial security systems Houston TX", "business alarm system Houston", "commercial surveillance Houston", "commercial security camera systems Houston", "business security cameras Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Commercial Security", href: "/commercial" },
  ]),
  generateAllServicesSchemas()[1],
  generateServicePageReviewSchema(
    [
      { author: "S Nevar", text: "Great company and staff. They did the set up on mobile phones and explained everything we needed to know on our two-way audio cameras and doorbell. Highly recommend. Thank You Tim and Johnny.", rating: 5, location: "Houston" },
      { author: "Coleman Ferguson", text: "Texas Total Security did a fantastic job installing an alarm system and cameras. The cameras are all 1080p hd and are all commercial grade. The owner, Tim Townsend, is a very credible, knowledgeable person who was able to explain everything to me in a way I was able to understand. I would recommend this company to everyone.", rating: 5, location: "Houston" },
    ],
    "Commercial Security Systems — Houston TX",
    "/commercial"
  ),
  generateFAQSchema(faqs),
];

const commercialImages = [
  "20251224_114459.jpg",
  "20260115_141311.jpg",
  "20260129_125134.jpg",
  "20260224_100256.jpg",
  "20260224_103953.jpg",
  "20260224_104001.jpg",
  "20260314_093725.jpg",
  "20260320_120744.jpg",
  "20260402_092659.jpg",
  "imgi_2_com10-scaled.jpg",
  "imgi_6_com6-scaled.jpg",
  "imgi_22_com16.png",
  "imgi_23_com15.jpg",
  "imgi_50_com25.png",
  "imgi_58_com17.png",
  "imgi_62_com13.png",
  "imgi_74_fmf-1252.jpg",
  "imgi_75_qtq80-zVtNuU.jpg",
];

const CommercialSecurity = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
  <Layout>
    <SEOHead
      title="Commercial Security Systems Houston TX | Business Alarms & Cameras | Texas Total Security"
      description="Custom commercial alarm systems, 4K surveillance cameras & active deterrence for Houston businesses. Licensed local experts. Free on-site assessment. Call (713) 387-9937."
      schemas={commercialSchemas}
    />

    {/* ══ HERO — compact professional banner ══════════════ */}
    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img
          src="/commercial/imgi_6_com6-scaled.jpg"
          alt="Commercial security camera system protecting Houston business"
          className="h-full w-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.91)_48%,rgba(10,10,10,0.76)_100%)]" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_460px] gap-8 lg:gap-10 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <Building2 className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">Commercial Security · Houston, TX</span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Commercial security solutions built for Houston businesses.
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
              <span>Licensed & Insured</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-red-400 fill-red-400" /> Commercial-Grade Systems</span>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}>
            <LeadForm
              title="Free Commercial Assessment"
              subtitle="Describe your facility. We will review risks, cameras, alarms, and monitoring options."
              showServiceType
              defaultServiceType="commercial"
              defaultPropertyType="commercial"
              referringPage="/commercial"
              compact
              className="shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ TRUST PROOF — real Google reviews ═══════════════ */}
    <section className="bg-white py-12 sm:py-14 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-10 items-start">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-red-50 border border-red-100">
              <Star className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-red-700">Real Google Reviews</span>
            </div>
            <h2 className="font-display font-bold text-gray-950 leading-tight" style={{ fontSize: "clamp(1.55rem, 3vw, 2.2rem)", letterSpacing: "-0.03em" }}>
              Commercial-grade work, explained clearly by the owner.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Commercial buyers need proof of experience, expertise, and accountability. These real reviews highlight the signals that matter: professional installation, commercial-grade cameras, clear education, and direct local ownership.
            </p>
            <Link to="/reviews" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:underline">
              Read all customer reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {reviewProof.map((review, i) => (
              <motion.article
                key={review.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.06 }}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Quote className="w-5 h-5 text-red-600" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-gray-600">"{review.text}"</p>
                <div className="mt-5 border-t border-gray-200 pt-4">
                  <p className="text-sm font-bold text-gray-950">{review.name}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-gray-400">{review.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
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
                Commercial Security Solutions
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed sm:text-right sm:max-w-[18rem]">
              Every system is custom-engineered for your facility — not pulled from a catalog.
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
        {/* Row 2 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

    {/* ══ INDUSTRIES + IMAGE ════════════════════════════════ */}
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
              <Building2 className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>Industries We Serve</span>
            </div>
            <h2 className="font-display font-bold text-gray-900 mb-3 leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
              We Secure Every Type of Commercial Property
            </h2>
            <p className="text-gray-500 leading-relaxed mb-7 text-sm">
              From neighborhood small businesses to large industrial facilities — if it's a commercial property in Houston, we've built a security system for one like it.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {industries.map((ind) => (
                <span key={ind}
                  className="text-[12px] font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "hsl(0 0% 96%)", border: "1px solid hsl(0 0% 90%)", color: "hsl(0 0% 28%)" }}>
                  {ind}
                </span>
              ))}
            </div>
            <Link to="/free-analysis?service=commercial&property=commercial"
              className="btn-primary-gradient inline-flex items-center gap-2 text-sm font-semibold">
              Free Onsite Security Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeRight} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src="/commercial/imgi_62_com13.png"
              alt="Professional commercial security camera installation in Houston"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 48%)" }} />
            
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
              Commercial Installations Across Houston
            </h2>
            <p className="text-gray-500 text-sm mt-1">A sample of systems our licensed technicians have designed and installed.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {commercialImages.map((img, i) => (
            <motion.div
              key={img}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                src={`/commercial/${img}`}
                alt={`Commercial installation ${img}`}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Answers to the most common questions from Houston business owners and facility managers.
          </p>
        </motion.div>

        <div className="grid gap-2 md:grid-cols-2 md:items-start">
          {[
            {
              q: "What types of commercial properties do you serve?",
              a: (
                <span>
                  We serve virtually every type — from small businesses and retail to industrial complexes, apartment communities, government buildings, medical offices, schools, hotels, construction sites, parking garages, places of worship, and more. If it's a commercial property in Houston, we've secured one like it. Visit our{" "}
                  <Link to="/industries" className="text-red-600 font-semibold hover:underline">Industries We Serve</Link>{" "}
                  page for a full breakdown by sector.
                </span>
              ),
            },
            {
              q: "Can you integrate cameras with our existing alarm system?",
              a: (
                <span>
                  Yes. We specialize in combining surveillance and alarm systems into a single unified setup. In many cases we take over and upgrade existing infrastructure, saving the cost of full replacement. We assess your existing equipment during the{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free site assessment</Link>{" "}
                  and design the most cost-effective path forward.
                </span>
              ),
            },
            {
              q: "What is active deterrence and do I need it?",
              a: (
                <span>
                  Active deterrence cameras respond to detected intrusions with audible sirens and strobe lights — warning or stopping trespassers before a crime occurs. We recommend them for after-hours properties, construction sites, parking areas, and any location where a visual alarm alone isn't enough. Learn more about our{" "}
                  <Link to="/security-cameras" className="text-red-600 font-semibold hover:underline">commercial camera systems</Link>{" "}
                  or call us at{" "}
                  <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                  to discuss your property's specific needs.
                </span>
              ),
            },
            {
              q: "How does your commercial security consultation work?",
              a: (
                <span>
                  We visit your facility, walk the property with you, identify vulnerabilities, and design a custom security proposal — at no charge and no obligation. You receive a detailed system design and clear pricing before any commitment.{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule your free assessment</Link>{" "}
                  to get started.
                </span>
              ),
            },
            {
              q: "Do you handle multi-building or multi-location systems?",
              a: (
                <span>
                  Yes. We design and manage systems across multiple buildings or locations, giving ownership and security personnel a centralized view of their entire portfolio. Whether it's a campus facility, a multi-building industrial complex, or multiple retail locations — one local team manages everything. Contact us at{" "}
                  <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                  to discuss your multi-location requirements.
                </span>
              ),
            },
            {
              q: "What if we already have a system from another provider?",
              a: (
                <span>
                  We can often take over your existing panels and sensors and connect them to our monitoring platform — giving you improved service and local accountability without the cost of starting from scratch. Visit our{" "}
                  <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">alarm takeover page</Link>{" "}
                  to learn more about switching, or{" "}
                  <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">schedule an assessment</Link>{" "}
                  and we'll evaluate your existing equipment at no charge.
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
        <div className="mt-7 flex justify-center">
          <Link to="/faq" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-800 shadow-sm transition-all hover:border-red-200 hover:text-red-600 hover:shadow-md">
            View the Full Security FAQ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    <CTABlock />
  </Layout>
  );
};

export default CommercialSecurity;
