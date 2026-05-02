import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/seo";
import {
  Shield, MapPin, Radio, PhoneCall, Star, Award,
  CheckCircle2, ArrowRight, Phone, Users,
  Building2, Camera, Smartphone, Clock, Lightbulb,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };

const fadeUp   = { hidden: { opacity: 0, y: 36  }, show: { opacity: 1, y: 0  } };
const fadeLeft = { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } };
const fadeRight= { hidden: { opacity: 0, x:  32 }, show: { opacity: 1, x: 0 } };

/* ─── Google G SVG ──────────────────────────────────────────── */
const GoogleG = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const StarRow = () => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

/* ─── Data ──────────────────────────────────────────────────── */
const values = [
  { icon: MapPin,    title: "Talk to the Owner Directly",        desc: "Locally owned — not a franchise. When something needs attention, you can reach Tim directly. No hold queues, no ticket systems, no scripts." },
  { icon: Shield,    title: "Managed by Texas Total Security", desc: "Your account is managed by Texas Total Security, with alarm signals handled through our certified San Antonio partner monitoring center. Your relationship stays with us, period." },
  { icon: Radio,     title: "Verizon Cellular Monitoring",       desc: "We monitor over Verizon cellular — not your internet or landline. Your alarm stays connected even when Wi-Fi fails or storms knock out phone lines." },
  { icon: PhoneCall, title: "We Call You First",                 desc: "When your equipment needs attention, we reach out before you ever have to. Proactive service means issues are resolved before they become problems." },
  { icon: Star,      title: "5-Star Rated on Google",           desc: "Every review we've earned comes from a real Houston customer we genuinely cared for. We stay accountable long after the system goes in." },
  { icon: Award,     title: "Competitive Monitoring Rates",     desc: "Many customers who switch pay less per month than before — often keeping their existing equipment and simply lowering their monitoring rate." },
];

const specializations = [
  { icon: Camera,    text: "Hardwired 4K Camera & Surveillance Systems" },
  { icon: Shield,    text: "Commercial Alarm System Design & Installation" },
  { icon: Radio,     text: "24/7 Professional Alarm Monitoring" },
  { icon: PhoneCall, text: "Alarm System Takeover — Any Provider" },
  { icon: Users,     text: "HOA & Gated Community Security" },
  { icon: Camera,    text: "License Plate Recognition (LPR) Cameras" },
  { icon: MapPin,    text: "Active Deterrence — Strobes, Sirens, Two-Way Audio" },
  { icon: Building2, text: "Security Poles — Custom-Height, Multi-Camera" },
  { icon: Building2, text: "Multi-Family & Apartment Complex Security" },
  { icon: Shield,    text: "Proactive System Monitoring & Maintenance" },
];

const googleReviews = [
  { name: "Coleman Ferguson", text: "The owner, Tim Townsend, is a very credible, knowledgeable person who was able to explain everything to me. Texas Total Security did a fantastic job. The cameras are all commercial grade. I would recommend this company to everyone." },
  { name: "Anna Bermudez",   text: "Excellent Service! These guys know what they are doing. Love my Alarm System and my New Cameras all over my property. I would recommend Tim at Texas Total Security to anyone looking for a Security System!!!" },
  { name: "Jason Hammond",   text: "FANTASTIC experience and very professional and caring company. I felt very comfortable from start to finish. Honest and knowledgeable staff." },
  { name: "DLA Armstrong",   text: "Above and beyond EXTRA SERVICE. They were detailed, educated me on security tips, and reviewed with me until I understood everything before they left." },
  { name: "Floral Yang",     text: "Very happy with my new security camera system! Did a great job at installing everything and explained exactly how to use all the equipment. I will recommend to my friends and family." },
  { name: "Iris Deleon",     text: "Tim was amazing! I had an issue with my NVR, he came out, gave me a fair price, and fixed it quickly. Highly recommend." },
];

/* ─── Page ──────────────────────────────────────────────────── */
const About = () => {
  const [ownerImgError, setOwnerImgError] = useState(false);

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="About Texas Total Security | Houston's Locally Owned Alarm & Security Company"
        description="Meet Tim Townsend and the Texas Total Security team — Houston's locally owned, licensed security specialists. Hardwired cameras, alarm systems, and 24/7 monitoring. LIC# B03066901."
        schemas={schemas}
      />

      {/* ══════════════════════════════════════════════════
          HERO — dark cinematic, full-bleed
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "hsl(0 0% 4%)", minHeight: "82vh", display: "flex", alignItems: "center" }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/imgi_14_upscale_gate_TTS.jpg"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.04)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.82) 55%, rgba(0,0,0,0.62) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 30% 60%, hsl(0 85% 38% / 0.07), transparent 68%)" }} />
          <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(0 0% 4%), transparent)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.012, backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right, transparent, hsl(0 85% 54%))" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "hsl(0 75% 66%)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                About Texas Total Security
              </span>
              <div className="h-px w-8" style={{ background: "linear-gradient(to left, transparent, hsl(0 85% 54% / 0.4))" }} />
            </div>

            {/* Headline */}
            <h1
              className="font-display font-bold text-white mb-5"
              style={{
                fontSize: "clamp(1.9rem, 5.5vw, 4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                maxWidth: "50rem",
                wordBreak: "keep-all",
                overflowWrap: "normal",
              }}
            >
              <span className="block">Not a Franchise.</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, hsl(0 78% 80%) 0%, hsl(0 85% 58%) 40%, hsl(0 90% 44%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Houston's Own Security Company.
              </span>
            </h1>

            {/* Accent rule */}
            <div className="flex items-center gap-2 mb-6" style={{ maxWidth: "50rem" }}>
              <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, hsl(0 85% 50% / 0.5))" }} />
              <div className="h-[2px] w-7 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, hsl(0 85% 50% / 0.5))" }} />
            </div>

            {/* Sub */}
            <p
              className="text-white mb-8 leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", opacity: 0.9, maxWidth: "38rem" }}
            >
              Locally owned and licensed in Houston, Texas. We design, install, and monitor hardwired camera and alarm systems for homeowners, businesses, and property managers — and we answer when you call.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-9">
              <Link
                to="/property-assessment"
                className="btn-primary-gradient inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5"
                style={{ fontSize: "0.9rem", boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38)" }}
              >
                Get My Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:7133879937"
                className="btn-outline-light inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5"
                style={{ fontSize: "0.9rem" }}
              >
                <Phone className="w-4 h-4" /> (713) 387-9937
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { icon: Shield,       label: "LIC# B03066901" },
                { icon: Star,         label: "5.0 Google Rating" },
                { icon: CheckCircle2, label: "Locally Owned" },
                { icon: MapPin,       label: "Houston-Based" },
              ].map(({ icon: Icon, label }, i, arr) => (
                <span key={label} className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.72)" }}>
                    <Icon className="w-3 h-3" style={{ color: "hsl(0 85% 58%)" }} />
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                  </span>
                  {i < arr.length - 1 && <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TIM TOWNSEND — owner section
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#fff", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left — photo */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.8, ease: easeExpo }}
            >
              <div className="relative w-full">
                {/* Frame */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: "4/5",
                    border: "1px solid hsl(0 0% 88%)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.07)",
                  }}
                >
                  {!ownerImgError ? (
                    <img
                      src="/timtownsend.jpg"
                      alt="Tim Townsend — Founder, Texas Total Security"
                      className="w-full h-full object-cover"
                      onError={() => setOwnerImgError(true)}
                    />
                  ) : null}

                  {/* Placeholder shown when no photo */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                      background: "linear-gradient(145deg, hsl(0 0% 96%), hsl(0 40% 96%))",
                      opacity: ownerImgError ? 1 : 0,
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
                      style={{ background: "hsl(0 85% 50% / 0.10)", border: "1.5px solid hsl(0 85% 50% / 0.22)" }}
                    >
                      <span className="font-display font-bold text-2xl" style={{ color: "hsl(0 85% 46%)" }}>TT</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "hsl(0 0% 35%)", fontWeight: 600 }}>Tim Townsend</p>
                    <p style={{ fontSize: "11px", color: "hsl(0 0% 55%)", marginTop: 3 }}>Founder & Owner</p>
                  </div>

                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 48%)" }} />
                </div>

                {/* Credential badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 px-4 py-2.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(14px)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                >
                  <p className="font-bold leading-tight" style={{ fontSize: "13.5px", color: "hsl(0 0% 10%)" }}>Tim Townsend</p>
                  <p style={{ fontSize: "11px", color: "hsl(0 85% 46%)", fontWeight: 700, marginTop: "2px" }}>
                    Founder · Licensed Security Professional
                  </p>
                  <p style={{ fontSize: "10px", color: "hsl(0 0% 52%)", marginTop: "2px" }}>LIC# B03066901</p>
                </div>
              </div>
            </motion.div>

            {/* Right — bio */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.1 }}
            >
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.18)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(0 85% 48%)" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "hsl(0 75% 42%)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Meet the Owner</span>
              </div>

              <h2
                className="font-display font-bold mb-1"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-0.035em", color: "hsl(0 0% 8%)" }}
              >
                Tim Townsend
              </h2>
              <p style={{ fontSize: "13.5px", color: "hsl(0 85% 44%)", fontWeight: 700, letterSpacing: "0.04em", marginBottom: "1.25rem" }}>
                Founder & Licensed Security Professional
              </p>

              <div className="space-y-3.5 mb-6" style={{ color: "hsl(0 0% 30%)", fontSize: "15px", lineHeight: 1.72 }}>
                <p>
                  Tim built Texas Total Security from the ground up — not as a franchise or a call-center operation, but as a hands-on Houston business with one standard: every system he puts in has to be something he'd trust to protect his own family.
                </p>
                <p>
                  With 15+ years of field experience and a state-issued security license, Tim has personally overseen 100's of projects across Houston — hardwired 4K camera systems, alarm systems, and monitored access control for homes in River Oaks, HOA communities in Memorial Villages, and commercial properties throughout the metro. He brings the same level of care to every job, regardless of size.
                </p>
                <p>
                  When you call Texas Total Security, you get Tim. He visits the property, designs the system himself, and stays reachable long after installation day.
                </p>
              </div>

              {/* Google review quote */}
              <blockquote
                className="mb-6 px-5 py-4"
                style={{ background: "hsl(0 0% 97%)", borderLeft: "3px solid hsl(0 85% 48%)", borderRadius: "0 10px 10px 0" }}
              >
                <p style={{ fontSize: "14px", color: "hsl(0 0% 22%)", fontStyle: "italic", lineHeight: 1.68 }}>
                  "Tim Townsend is a very credible, knowledgeable person who was able to explain everything in a way I was able to understand. I would recommend this company to everyone."
                </p>
                <p style={{ fontSize: "10.5px", color: "hsl(0 0% 52%)", fontWeight: 700, marginTop: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  — Coleman Ferguson · ★★★★★ Google Review
                </p>
              </blockquote>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:7133879937"
                  className="btn-primary-gradient inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5"
                  style={{ fontSize: "0.875rem" }}
                >
                  <Phone className="w-4 h-4" /> Call Tim Directly
                </a>
                <Link
                  to="/property-assessment"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200"
                  style={{ background: "hsl(0 0% 96%)", border: "1px solid hsl(0 0% 86%)", color: "hsl(0 0% 18%)", fontSize: "0.875rem" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "hsl(0 0% 91%)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "hsl(0 0% 96%)";
                  }}
                >
                  Request Free Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COMMUNITY CRIME-FIGHTING
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "hsl(0 0% 5%)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">

          <motion.div
            className="text-center mb-12 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "hsl(0 85% 50% / 0.10)", border: "1px solid hsl(0 85% 50% / 0.22)" }}
            >
              <span style={{ fontSize: "10px", fontWeight: 700, color: "hsl(0 75% 66%)", letterSpacing: "0.15em", textTransform: "uppercase" }}>15+ Years · 100's of Projects</span>
            </div>
            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              Empowering Houston Communities to Fight Crime Together
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.58)", lineHeight: 1.72 }}>
              Security isn't just cameras and alarms — it's giving neighbors the tools to protect each other. We build systems that connect communities and solve real-world problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: Smartphone,
                label: "Community Crime App",
                heading: "Neighbors Watching Out for Each Other",
                body: "Our clients gain access to a community-connected security app where neighbors can instantly share photos and video footage of suspicious activity — turning individual cameras into a neighborhood-wide crime-fighting network.",
                accent: true,
              },
              {
                icon: Clock,
                label: "15+ Years in Houston",
                heading: "Built on Long-Term Relationships",
                body: "We've spent 15+ years installing 100's of security systems across Houston — and we don't disappear after installation day. We maintain the relationship, service the system, and stay accountable for years to come.",
                accent: false,
              },
              {
                icon: Lightbulb,
                label: "Real Solutions in 2026",
                heading: "Modern Security for Today's Threats",
                body: "Crime evolves. So do we. In 2026, we help Houston homeowners, HOAs, and businesses solve real-world security challenges with technology that actually works — hardwired infrastructure, cellular monitoring, and community connectivity.",
                accent: false,
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{
                  background: card.accent ? "hsl(0 85% 50% / 0.07)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${card.accent ? "hsl(0 85% 50% / 0.18)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "hsl(0 85% 50% / 0.12)", border: "1px solid hsl(0 85% 50% / 0.22)" }}
                >
                  <card.icon className="w-5 h-5" style={{ color: "hsl(0 85% 58%)" }} />
                </div>
                <p style={{ fontSize: "9.5px", fontWeight: 700, color: "hsl(0 75% 62%)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "8px" }}>{card.label}</p>
                <h3
                  className="font-display font-bold text-white mb-3"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.3, letterSpacing: "-0.02em" }}
                >
                  {card.heading}
                </h3>
                <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.55)", lineHeight: 1.72 }}>{card.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
          >
            <p
              className="font-display font-bold text-white mx-auto"
              style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)", lineHeight: 1.5, maxWidth: "44rem", letterSpacing: "-0.02em" }}
            >
              "We help our customers solve real-world security problems —
              not just in theory, but in practice, every single day."
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)", marginTop: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              — Tim Townsend, Founder · Texas Total Security
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR VALUES
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">

          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.15)" }}
            >
              <span style={{ fontSize: "10px", fontWeight: 700, color: "hsl(0 85% 48%)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Why Choose Us</span>
            </div>
            <h2
              className="font-display font-bold text-gray-900 mb-3"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              What Sets Texas Total Security Apart
            </h2>
            <p className="text-gray-500 mx-auto" style={{ maxWidth: "38rem", fontSize: "15px" }}>
              The principles that guide everything we do — from the first call to long-term monitoring.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.07 }}
                className="group flex gap-4 p-5 rounded-2xl bg-white"
                style={{ border: "1px solid hsl(0 0% 91%)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "hsl(0 85% 50% / 0.07)" }}
                >
                  <v.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1.5" style={{ fontSize: "14px" }}>{v.title}</h3>
                  <p className="text-gray-500 leading-relaxed" style={{ fontSize: "13px" }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SPECIALIZATIONS — dark
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "hsl(0 0% 5%)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.8, ease: easeExpo }}>
              <div className="h-[3px] w-10 rounded-full mb-5" style={{ background: "hsl(0 85% 50%)" }} />
              <h2
                className="font-display font-bold text-white mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                What We Specialize In
              </h2>
              <p className="leading-relaxed mb-7" style={{ fontSize: "15px", color: "rgba(255,255,255,0.62)" }}>
                Comprehensive security solutions for Houston homeowners, businesses, and property managers. Every system is custom-designed for your specific property.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/services"
                  className="btn-primary-gradient inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5"
                  style={{ fontSize: "0.875rem" }}
                >
                  View All Services <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/property-assessment"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.10)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
                >
                  Free Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.8, ease: easeExpo, delay: 0.1 }}>
              <div className="space-y-1">
                {specializations.map((s, i) => (
                  <div
                    key={s.text}
                    className="flex items-center gap-3.5 py-3 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.055)" }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "hsl(0 85% 50% / 0.12)", border: "1px solid hsl(0 85% 50% / 0.20)" }}
                    >
                      <s.icon className="w-3 h-3" style={{ color: "hsl(0 85% 56%)" }} />
                    </div>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.78)", fontWeight: 500, lineHeight: 1.4 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GOOGLE REVIEWS
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "white", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">

          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <GoogleG className="w-6 h-6" />
              <span className="font-bold text-gray-800" style={{ fontSize: "15px" }}>Google Reviews</span>
              <StarRow />
              <span className="font-bold text-gray-700" style={{ fontSize: "14px" }}>5.0</span>
            </div>
            <h2
              className="font-display font-bold text-gray-900 mb-3"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              What Houston Customers Say
            </h2>
            <p className="text-gray-500" style={{ fontSize: "15px" }}>
              Real reviews from real customers across the Houston area.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {googleReviews.map((r, i) => (
              <motion.div
                key={r.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.07 }}
                className="flex flex-col p-5 rounded-2xl"
                style={{ border: "1px solid hsl(0 0% 91%)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <GoogleG className="w-4 h-4" />
                  <StarRow />
                </div>
                <p className="text-gray-600 leading-relaxed flex-1 mb-4" style={{ fontSize: "13.5px" }}>
                  "{r.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800" style={{ fontSize: "13px" }}>{r.name}</p>
                  <p style={{ fontSize: "11px", color: "hsl(0 0% 56%)" }}>Verified Google Review</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA — dark
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "hsl(0 0% 4%)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full"
              style={{ background: "hsl(0 85% 50% / 0.10)", border: "1px solid hsl(0 85% 50% / 0.20)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "hsl(0 75% 66%)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Ready to Get Started?</span>
            </div>

            <h2
              className="font-display font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
            >
              Let's Secure Your Houston Property
            </h2>

            {/* Accent rule */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, hsl(0 85% 50% / 0.5))" }} />
              <div className="h-[2px] w-7 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, hsl(0 85% 50% / 0.5))" }} />
            </div>

            <p
              className="mb-8 mx-auto"
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", maxWidth: "32rem", lineHeight: 1.72 }}
            >
              Request a free, no-obligation property assessment. Tim will personally review your property and deliver a transparent proposal — no pressure, no scripts.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                to="/property-assessment"
                className="btn-primary-gradient inline-flex items-center justify-center gap-2 font-semibold px-8 py-4"
                style={{ fontSize: "0.925rem", boxShadow: "0 6px 28px hsl(0 85% 45% / 0.38)" }}
              >
                Get My Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.88)", fontSize: "0.925rem" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.10)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <Phone className="w-4 h-4" /> Call (713) 387-9937
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
