import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import {
  Home, Shield, Camera, Thermometer, Smartphone,
  Baby, Lock, Bell, CheckCircle2, ArrowRight, Phone,
} from "lucide-react";

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
    title: "Smart Locks & Access Control",
    desc: "Keyless entry with smart locks, garage door controllers, and automated access tied directly to your security system.",
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
  { icon: Bell, title: "Dedicated 24/7 Monitoring", desc: "Our local Houston monitoring center watches your home around the clock, ready to dispatch emergency services the moment an alarm triggers." },
  { icon: Home, title: "Responsive Support", desc: "When you need help, you talk to a real local person who knows your system. Not a national call center. Not a ticket queue." },
];

const faqs = [
  {
    question: "How does Texas Total Security customize residential alarm systems?",
    answer: "We specialize in customizing residential alarm systems to fit diverse properties. Our consultants work directly with you to design a solution that addresses the specific vulnerabilities and layout of your property. No two homes are identical, and no two systems should be either.",
  },
  {
    question: "What does your residential security service include?",
    answer: "Our service is built on three core pillars: superior installation by licensed professionals, personalized system design tailored to your home, and dedicated 24/7 monitoring with rapid response from our local Houston dispatch center.",
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
];

const ResidentialSecurity = () => (
  <Layout>
    <SEOHead
      title="Local Home Security Systems Houston TX | Best Local Alarm Company Near Me | Texas Total Security"
      description="Best local home security company near you in Houston, TX. Local home security systems, residential alarm installation, home cameras & 24/7 local monitoring. Local alarm companies near you since 1994. Free analysis: (713) 387-9937."
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Home className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Residential Security</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.06] tracking-tight mb-6">
            Residential Security Service in{" "}
            <span style={{ color: "hsl(var(--accent))" }}>Houston, TX</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
            Protect your family and home with a custom-designed alarm and surveillance system backed by 24/7 local monitoring from Houston's most trusted security experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2">
              Get a Free Home Security Analysis <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:7133879937" className="btn-outline-light text-sm">
              <Phone className="w-4 h-4" /> (713) 387-9937
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ── INTRO ─────────────────────────────────────────── */}
    <section className="section-padding">
      <div className="container-tight max-w-4xl mx-auto text-center">
        <div className="divider-accent" />
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-5">
          Your Home Deserves More Than a Generic System
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          At Texas Total Security in Houston, TX, we understand that protecting your home is your number one priority. We deliver absolute peace of mind through a robust and fully customized residential security service. Every home has unique needs, and we design tailored solutions that provide seamless and comprehensive protection for your family, your property, and everything that matters most.
        </p>
      </div>
    </section>

    {/* ── THREE PILLARS ─────────────────────────────────── */}
    <section className="section-padding-sm" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading
          title="Three Pillars of Total Protection"
          subtitle="True security is not a generic, one-size-fits-all product. Our service rests on three non-negotiable commitments."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="glass-card p-8 text-center group">
              <div className="w-14 h-14 rounded-2xl bg-accent/8 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/14 transition-colors">
                <p.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── SPLIT — patio lifestyle ───────────────────────── */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
            <img
              src="/residential/imgi_2_resi6-scaled.jpg"
              alt="Protected Houston home patio and backyard"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.08), transparent)" }} />
          </div>
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
              Designing Your Personalized Defense
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Choosing Texas Total Security means partnering with a team deeply committed to your long-term protection — going far beyond simple alarms to include full home automation, environmental monitoring, and smart home integration.
              </p>
              <p>
                Our highly trained and licensed technicians manage the entire setup process, ensuring every component functions flawlessly from day one. Our local Houston monitoring center provides constant vigilance, ready to dispatch emergency services instantly when an alarm triggers.
              </p>
              <p>
                From your front door to your backyard, from your detached garage to your second home — we design coverage with zero blind spots.
              </p>
            </div>
            <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2 mt-7">
              Schedule a Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── SOLUTIONS GRID ───────────────────────────────── */}
    <section className="section-padding-sm" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading
          title="Complete Residential Security Solutions"
          subtitle="Every technology we offer works together as one integrated system — designed around your home."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-7 group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4 group-hover:bg-accent/14 transition-colors">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 text-[15px]">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── PROPERTY TYPES + IMAGE ───────────────────────── */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              We Protect Every Type of Home
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're moving into your first home, securing a lakeside retreat, or protecting a luxury estate — we custom-design the right system for your property.
            </p>
            <div className="space-y-3.5">
              {propertyTypes.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-medium">{t}</span>
                </div>
              ))}
            </div>
            <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2 mt-8">
              Get My Free Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Photo collage — 2×2 */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { src: "/residential/imgi_7_resi2-scaled.jpg", alt: "Surveillance camera protecting Houston backyard pool" },
              { src: "/residential/imgi_5_resi4-scaled.jpg", alt: "Dome cameras mounted on home exterior" },
              { src: "/residential/imgi_4_resi5-scaled.jpg", alt: "Outdoor camera post with estate in background" },
              { src: "/residential/imgi_8_resi1.jpg", alt: "Security cameras on residential fence perimeter" },
            ].map((img, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden ${i === 0 ? "row-span-1" : ""}`}
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── PHOTO STRIP ──────────────────────────────────── */}
    <section className="section-padding-sm overflow-hidden" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading
          title="Real Installations. Real Protection."
          subtitle="Every project is professionally installed by our licensed Houston technicians."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "/residential/imgi_11_resi7.png", alt: "Professional residential camera installation" },
            { src: "/residential/imgi_31_resi7-768x1024.png", alt: "HD camera mounted on Houston home" },
            { src: "/residential/imgi_2_resi6-scaled.jpg", alt: "Backyard coverage at protected residence" },
            { src: "/residential/imgi_7_resi2-scaled.jpg", alt: "Pool and yard surveillance system" },
            { src: "/residential/imgi_4_resi5-scaled.jpg", alt: "PTZ cameras at luxury residential estate" },
            { src: "/residential/imgi_8_resi1.jpg", alt: "Perimeter security camera installation" },
          ].map((img, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-sm"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── LEAD FORM ────────────────────────────────────── */}
    <section className="section-padding">
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm
          title="Get a Free Home Security Assessment"
          subtitle="Tell us about your home and we'll design the perfect system — no obligation, no pressure."
        />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default ResidentialSecurity;
