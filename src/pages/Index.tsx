import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { generateLocalBusinessSchema, generateFAQSchema, generateOrganizationSchema } from "@/lib/seo";
import {
  Shield, Camera, Home, Building2, Users, Radio,
  ArrowRight, Phone, CheckCircle2, Star,
  PhoneCall, ClipboardCheck, Wrench, HeadphonesIcon,
  Award, Lock, Zap, MapPin,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────── */

const techPartners = ["Honeywell / Resideo", "Alarm.com", "DMP", "DSC", "Hikvision", "Bosch Security"];

const processSteps = [
  { icon: PhoneCall,      num: "01", title: "Initial Call",         desc: "Speak with a security specialist about your needs and schedule your free analysis." },
  { icon: ClipboardCheck, num: "02", title: "Free Onsite Analysis", desc: "We meet you onsite, examine your layout, and gather everything needed to build your solution." },
  { icon: Wrench,         num: "03", title: "Expert Installation",  desc: "Certified technicians install your system with precision and clean workmanship." },
  { icon: HeadphonesIcon, num: "04", title: "24/7 Monitoring",      desc: "Local dispatch, ongoing support, and fast response — for the life of your system." },
];

const featuredTestimonial = {
  text: "What really stood out was how Texas Total Security described in such detail and confidence the process and exactly what I would be getting. They delivered on every promise.",
  name: "Homeowner",
  role: "Bellaire, TX",
};

const testimonials = [
  { name: "Homeowner",        role: "Houston, TX",   text: "I love my new security cameras — the coverage and resolution is great! I can keep an eye on the kids while they play. The street and driveway coverage is excellent." },
  { name: "Business Owner",   role: "Houston, TX",   text: "Texas Total Security installed surveillance cameras in all the right locations. Now I can travel while getting remote access to my cameras on my phone or tablet. Exactly what I needed." },
  { name: "Property Manager", role: "Houston, TX",   text: "They provided great coverage for our entrance and exit gates, plus active deterrence with strobe lights. Their license plate cameras are outstanding." },
];

const whyUs = [
  { icon: MapPin,         title: "Houston-Born & Operated",      desc: "Trustworthy security techs working in Houston and surrounding areas for over 30 years. We live and work in the same communities we protect." },
  { icon: Shield,         title: "We Don't Sell Your Contract",  desc: "We don't sell our alarm contracts to big national companies. Your account stays with us — always." },
  { icon: HeadphonesIcon, title: "In-House Monitoring",          desc: "Our monitoring center is local. When an alarm triggers, local operators dispatch local authorities — fast." },
  { icon: Users,          title: "Friendly, Local Service",      desc: "You'll know your technician by name, and they'll know your system inside and out." },
  { icon: Award,          title: "30+ Years of Experience",      desc: "Trusted Houston security technicians serving the greater area since 1994." },
  { icon: Lock,           title: "Latest Equipment & Tech",      desc: "Active deterrence, license plate recognition, and smart integrations backed by top-tier hardware." },
];

const faqs = [
  { q: "Do you handle alarm installation for older homes?",        a: "Yes. Our technicians are trained to install alarm systems in properties of all ages. We assess your structure, wiring, and layout to ensure your new system is installed safely and reliably." },
  { q: "How quickly can you respond to service calls?",            a: "Because we're a local team, we provide fast support throughout Houston and surrounding communities — whether you need maintenance, troubleshooting, or an equipment check." },
  { q: "Can I integrate alarms with cameras and smart devices?",   a: "Absolutely. Our systems integrate seamlessly with cameras, smart locks, mobile apps, and home automation — allowing you to monitor and manage your property from anywhere." },
  { q: "What sets you apart from national alarm companies?",       a: "Personalized service, local expertise, and technology designed for Houston environments. You get professional installation and responsive support from a team that truly knows local security challenges." },
  { q: "Do you serve both residential and commercial properties?", a: "Yes. From single-family homes to warehouses and retail spaces — every setup is customized to match your property's size, layout, and safety goals." },
];

/* ─── Page ─────────────────────────────────────────────────────── */

const Index = () => {
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
  ];

  return (
    <Layout>
      <SEOHead
        title="Texas Total Security | #1 Security Systems for Homes & Businesses in Houston, TX"
        description="Houston's trusted security experts for 30+ years. Custom alarm systems, security cameras, 24/7 local monitoring. Free onsite security analysis. Call (713) 387-9937."
        schemas={schemas}
      />

      {/* ══════════════════════════════════════════════════
          HERO — editorial, type-driven, with background image
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "hsl(0 0% 3%)", minHeight: "96vh", display: "flex", flexDirection: "column" }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt="Houston commercial security"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Dark gradient overlay for readability */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.80) 40%, rgba(0,0,0,0.60) 100%)" }}
          />
          {/* Red accent glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 25% 40%, hsl(0 85% 45% / 0.12), transparent 55%)" }}
          />
        </div>
        {/* Fine grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Red radial bloom — upper center */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "600px",
            background: "radial-gradient(ellipse at center, hsl(0 85% 45% / 0.08) 0%, transparent 68%)",
          }}
        />
        {/* Subtle bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(0 0% 3%), transparent)" }}
        />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">

            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full border animate-fade-up"
              style={{
                background: "hsl(0 85% 45% / 0.08)",
                borderColor: "hsl(0 85% 45% / 0.22)",
              }}
            >
              <span className="live-dot" />
              <span
                className="text-[11px] font-bold tracking-[0.18em] uppercase"
                style={{ color: "hsl(0 85% 62%)" }}
              >
                Monitoring Active · Houston, TX
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-bold text-white animate-fade-up animate-delay-100"
              style={{
                fontSize: "clamp(3.25rem, 7.5vw, 6.25rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                marginBottom: "1.75rem",
              }}
            >
              Protecting
              <br />
              What Matters{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(0 85% 62%) 0%, hsl(0 85% 45%) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Most.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-up animate-delay-200 mx-auto"
              style={{
                fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.48)",
                maxWidth: "34rem",
                marginBottom: "0.75rem",
              }}
            >
              #1 Security Systems for Homes and Businesses in Houston, TX.
            </p>
            <p
              className="text-sm mb-12 animate-fade-up animate-delay-200"
              style={{ color: "rgba(255,255,255,0.24)" }}
            >
              Also serving Katy · Sugar Land · The Woodlands · Cypress
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animate-delay-300">
              <Link
                to="/free-analysis"
                className="btn-primary-gradient inline-flex items-center gap-2 text-base px-10 py-4"
              >
                Free Security Analysis <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:7133879937"
                className="btn-outline-light inline-flex items-center gap-2 text-base px-10 py-4"
              >
                <Phone className="w-5 h-5" /> (713) 387-9937
              </a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 animate-fade-up animate-delay-400">
              {["Free Onsite Analysis", "No Long-Term Contracts", "24/7 Local Dispatch", "Licensed & Insured"].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.42)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <CheckCircle2 className="w-3 h-3" style={{ color: "hsl(0 85% 55%)" }} />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="relative z-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(16px)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/5">
              {[
                { num: "30+",    label: "Years Protecting Houston" },
                { num: "1,000s", label: "Systems Installed" },
                { num: "24/7",   label: "Local Monitoring" },
                { num: "100%",   label: "Locally Owned & Operated" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:px-6">
                  <p
                    className="font-display font-bold mb-1.5"
                    style={{
                      fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                      letterSpacing: "-0.04em",
                      background: "linear-gradient(135deg, hsl(0 85% 62%) 0%, hsl(0 85% 48%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TRUST + TECH PARTNERS (merged strip)
      ══════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 divide-x-0">
            {[
              "30+ Years Experience",
              "Licensed & Insured · LIC# B03066901",
              "24/7 Local Dispatch",
              "Residential & Commercial",
              ...techPartners,
            ].map((item, i, arr) => (
              <div key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-gray-200 hidden lg:inline select-none" aria-hidden>·</span>
                )}
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap"
                  style={{ color: i < 4 ? "rgb(107 114 128)" : "rgb(156 163 175)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SERVICES — 6-card grid
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Complete Security for Every Property"
            subtitle="From residential alarm systems to enterprise-grade commercial surveillance — every system is custom-designed, professionally installed, and locally monitored."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ServiceCard icon={Shield}    title="Alarm Systems"                  description="Custom alarm design, installation, and local monitoring. Hardwired, wireless, and hybrid solutions for any property." href="/alarm-systems" />
            <ServiceCard icon={Camera}    title="Security Camera Systems"        description="HD surveillance, license plate cameras, PTZ, active deterrence, and full remote viewing — professionally installed." href="/security-cameras" />
            <ServiceCard icon={Home}      title="Residential Security"           description="Whole-home protection with smart integration, environmental sensors, and 24/7 monitoring for your family." href="/residential" />
            <ServiceCard icon={Building2} title="Commercial Security"            description="Scalable security for offices, retail, industrial sites, and multi-location businesses of any size." href="/commercial" />
            <ServiceCard icon={Users}     title="HOA Security"                   description="Gate cameras, license plate recognition, common area surveillance, and community-wide security systems." href="/hoa-security" />
            <ServiceCard icon={Radio}     title="Active Deterrence & Monitoring" description="Cameras with sirens, strobes, and two-way talk. Indoor/outdoor networking, WiFi, and 24/7 local dispatch." href="/monitoring-services" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE TTS — dark, no images
      ══════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — editorial block */}
            <div>
              <span
                className="block text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
                style={{ color: "hsl(0 85% 55%)" }}
              >
                Why Choose Us
              </span>
              <div className="w-8 h-[2px] rounded-full mb-6" style={{ background: "hsl(var(--accent))" }} />
              <h2
                className="font-display font-bold text-white mb-6 tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.06 }}
              >
                Not a franchise.
                <br />
                Your neighbors.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                We've been protecting Houston properties for over three decades. When you call us, you reach real people who know your system — not a national call center routing tickets to strangers.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
                We never sell your contract to a national company. We never outsource your monitoring. Your account stays with the same local team that installed your system — for the life of your relationship with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about" className="btn-primary-gradient inline-flex items-center gap-2">
                  About Our Company <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:7133879937" className="btn-outline-light inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (713) 387-9937
                </a>
              </div>
            </div>

            {/* Right — 6-point grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyUs.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-6 group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "background 0.25s ease, border-color 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "hsl(0 85% 45% / 0.12)", border: "1px solid hsl(0 85% 45% / 0.18)" }}
                  >
                    <item.icon className="w-4.5 h-4.5" style={{ color: "hsl(0 85% 58%)" }} />
                  </div>
                  <h3 className="font-display font-semibold text-white text-[14px] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS — featured quote + cards
      ══════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">

          {/* Google rating badge */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full border border-gray-100"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">5.0</span>
              <span className="text-xs text-gray-400 font-medium">on Google</span>
            </div>
            <a
              href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold hover:underline underline-offset-2"
              style={{ color: "hsl(var(--accent))" }}
            >
              Read all Google reviews →
            </a>
          </div>

          {/* Featured pull quote */}
          <div
            className="rounded-3xl p-10 sm:p-14 mb-8 text-center mx-auto"
            style={{
              maxWidth: "56rem",
              background: "hsl(0 0% 4%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(0 85% 45% / 0.08), transparent 65%)" }}
            />
            {/* Large quote mark */}
            <div
              className="font-display font-bold leading-none select-none mb-6 relative z-10"
              style={{
                fontSize: "7rem",
                lineHeight: 0.7,
                background: "linear-gradient(135deg, hsl(0 85% 45% / 0.35) 0%, hsl(0 85% 45% / 0.12) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &ldquo;
            </div>
            <p
              className="font-display font-medium text-white relative z-10"
              style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", lineHeight: 1.5, letterSpacing: "-0.01em", marginBottom: "2rem" }}
            >
              {featuredTestimonial.text}
            </p>
            <div className="flex items-center justify-center gap-3 relative z-10">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "hsl(0 85% 45% / 0.15)", color: "hsl(0 85% 60%)", border: "1px solid hsl(0 85% 45% / 0.2)" }}
              >
                {featuredTestimonial.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-white leading-none mb-1">{featuredTestimonial.name}</p>
                <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>{featuredTestimonial.role}</p>
              </div>
              <div className="flex gap-0.5 ml-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3" style={{ fill: "hsl(var(--accent))", color: "hsl(var(--accent))" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Supporting testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200"
              style={{ color: "hsl(var(--accent))" }}
            >
              View All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS — dark section, 4 numbered steps
      ══════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="From First Call to 24/7 Protection"
            subtitle="Simple, transparent, and stress-free. Here's exactly what happens when you work with us."
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.055)",
                }}
              >
                <span
                  className="font-display font-bold leading-none mb-4 block"
                  style={{
                    fontSize: "2.75rem",
                    letterSpacing: "-0.045em",
                    background: "linear-gradient(135deg, hsl(0 85% 45% / 0.55) 0%, hsl(0 85% 45% / 0.22) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.num}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "hsl(0 85% 45% / 0.10)", border: "1px solid hsl(0 85% 45% / 0.15)" }}
                >
                  <step.icon className="w-5 h-5" style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="font-display font-semibold text-white mb-2 text-[15px] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {step.desc}
                </p>
                {/* Step connector */}
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 -right-2.5 z-10 w-5 h-px"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FREE ANALYSIS — split CTA card
      ══════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.04), 0 20px 48px rgba(0,0,0,0.07)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — content */}
              <div className="p-8 sm:p-12 lg:p-14 lg:border-r border-gray-100">
                <div className="w-8 h-[2px] rounded-full mb-6" style={{ background: "hsl(var(--accent))" }} />
                <h2 className="font-display font-bold text-gray-900 text-3xl sm:text-4xl tracking-tight leading-[1.08] mb-4">
                  Free Onsite Security Analysis
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Our security professionals visit your property at no cost. We evaluate your layout, identify every vulnerability, and provide expert recommendations — no pressure, no obligation.
                </p>
                <ul className="space-y-4">
                  {[
                    "Security Pro meets with you onsite at your home or business",
                    "Reviews your current system or plans for new installation",
                    "Examines layout and identifies all vulnerability points",
                    "Provides expert solutions and a clear, transparent plan",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right — CTA */}
              <div
                className="p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center"
                style={{ background: "hsl(0 0% 98%)" }}
              >
                <img
                  src="/logo.png"
                  alt="Texas Total Security"
                  className="w-16 h-16 object-contain mb-6"
                  style={{ opacity: 0.88 }}
                  loading="lazy"
                />
                <h3 className="font-display font-bold text-gray-900 text-2xl tracking-tight mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">
                  Schedule your free analysis today. A security expert will contact you within 24 hours.
                </p>
                <Link
                  to="/free-analysis"
                  className="btn-primary-gradient inline-flex items-center gap-2 text-base px-9 py-4 w-full sm:w-auto justify-center mb-3"
                >
                  Schedule Free Analysis <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-xs text-gray-400 mb-6">No obligation. No pressure. 100% free.</p>
                <div
                  className="flex items-center gap-2 pt-6 border-t border-gray-100 w-full justify-center"
                >
                  <Phone className="w-4 h-4" style={{ color: "hsl(var(--accent))" }} />
                  <span className="text-sm text-gray-500">Or call: </span>
                  <a
                    href="tel:7133879937"
                    className="text-sm font-bold hover:underline underline-offset-2"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    (713) 387-9937
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with Texas Total Security."
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl p-6 sm:p-7 bg-white border border-gray-100"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04)" }}
              >
                <h3 className="font-display font-semibold text-gray-900 mb-2.5 text-[15px] leading-snug">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTABlock />
    </Layout>
  );
};

export default Index;
