import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Camera, Eye, Zap, Shield, Smartphone, FileText, Users, MonitorSpeaker } from "lucide-react";

const solutions = [
  { icon: Camera, title: "Gate Camera Systems", desc: "HD HOA gate cameras at every entry and exit point — license plate recognition, night vision, and weather-resistant housing for neighborhood security." },
  { icon: Eye, title: "License Plate Recognition", desc: "HOA surveillance cameras with LPR capture every vehicle entering and leaving your community — essential for neighborhood security camera systems." },
  { icon: Zap, title: "Active Deterrence", desc: "Cameras with built-in sirens and strobes that deter trespassers in real time." },
  { icon: Shield, title: "Common Area Surveillance", desc: "HOA pool cameras, playground surveillance, parking lot monitoring, and amenity center coverage — complete community security camera systems." },
  { icon: Smartphone, title: "Remote Access", desc: "Board members and property managers can view footage from any device, anywhere." },
  { icon: FileText, title: "Incident Documentation", desc: "Easily retrieve and export footage for police reports, insurance claims, and board meetings." },
  { icon: Users, title: "Board Consultation", desc: "We work directly with HOA boards to design systems that fit community needs and budgets." },
  { icon: MonitorSpeaker, title: "Deterrence Lighting", desc: "Integrated lighting solutions that activate with motion or on schedule." },
];

const testimonials = [
  { name: "Lisa M.", role: "HOA Board President, Katy", text: "Since installing the gate camera system, we've seen a dramatic reduction in trespassing and vehicle break-ins. The board is thrilled with the quality and Texas Total Security's responsiveness." },
  { name: "Robert K.", role: "Property Manager, Sugar Land", text: "Managing multiple communities means I need reliable systems and a vendor I can count on. Texas Total Security delivers on both fronts." },
  { name: "Jennifer W.", role: "HOA Board Member, Cypress", text: "The LPR cameras have been a game-changer for our community. We can now track every vehicle and provide footage to law enforcement." },
];

const faqs = [
  { question: "How do you work with HOA boards?", answer: "We present to your board, provide detailed proposals with options at different price points, and handle all aspects of the installation." },
  { question: "Can we view footage remotely?", answer: "Yes. Authorized board members and property managers get secure remote access from any device." },
  { question: "Do you handle multi-entrance communities?", answer: "Absolutely. We design systems for communities of all sizes — from single-gate to large master-planned communities." },
  { question: "What about ongoing maintenance?", answer: "We offer maintenance plans that include regular system checks, camera cleaning, firmware updates, and priority support." },
  { question: "Can the system capture license plates at night?", answer: "Yes. Our LPR cameras use specialized IR illumination designed specifically for nighttime plate capture." },
];

const hoaSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "HOA Security Systems Houston TX",
    "Professional HOA and community security solutions in Houston, TX. Gate cameras, license plate recognition, common area surveillance, active deterrence & 24/7 monitoring for residential communities.",
    "/hoa-security",
    "HOA Security System Installation",
    ["HOA security camera systems Houston TX", "HOA gate cameras Houston", "HOA surveillance cameras Houston", "neighborhood security camera systems", "HOA pool cameras Houston", "apartment complex security camera systems", "community security cameras Houston", "homeowners association security camera"]
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
  ]),
];

const HOASecurity = () => (
  <Layout>
    <SEOHead
      title="HOA Security Camera Systems Houston TX | Gate Cameras & Community Surveillance | Texas Total Security"
      description="Expert HOA security camera systems in Houston, TX. HOA gate cameras, community surveillance, HOA pool cameras, license plate recognition & neighborhood security camera systems. Trusted by Houston HOAs since 1994. Call (713) 387-9937."
      schemas={hoaSchemas}
    />
    <PageHero
      title="HOA Security Solutions"
      subtitle="HOA surveillance cameras, gate security camera systems, community-wide monitoring, and neighborhood security solutions designed specifically for Houston HOAs, apartment complexes, and property managers."
      ctaText="Schedule a Board Consultation"
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Community Security Systems" subtitle="Comprehensive HOA surveillance cameras, gate camera systems, and community-wide security solutions for homeowner associations and property managers." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-white">
      <div className="container-tight">
        <SectionHeading
          title="Real HOA Security Installations"
          subtitle="Actual community security camera systems professionally installed by Texas Total Security across the Houston area."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            { src: "/hoa/20241211_110505.jpg", alt: "HOA gate camera system installed at Houston neighborhood entrance" },
            { src: "/hoa/20241211_110527.jpg", alt: "HOA security camera monitoring community common area Houston TX" },
            { src: "/hoa/20241211_110548.jpg", alt: "HOA surveillance cameras protecting Houston neighborhood perimeter" },
            { src: "/hoa/20241211_110941.jpg", alt: "Community security camera installation for Houston homeowners association" },
          ].map((img, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-sm group"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {[
            { stat: "HOA Gate Cameras", desc: "License plate recognition & HD video at every entrance and exit point" },
            { stat: "HOA Pool Cameras", desc: "24/7 surveillance for pools, recreation areas, and community amenities" },
            { stat: "Community-Wide", desc: "Full neighborhood security camera systems covering every common area" },
          ].map((item) => (
            <div key={item.stat} className="glass-card p-6">
              <p className="font-display font-bold text-accent text-lg mb-2">{item.stat}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading title="Trusted by Houston HOA Boards" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-5">
              Security Poles & Entrance Gate Camera Installs
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Texas Total Security specializes in security camera pole installations for HOA communities, apartment complexes, and neighborhood entrances throughout the Houston area. Our custom security poles support wide-angle cameras, license plate recognition cameras, and LED strobe kits.</p>
              <p>From single entrance gate camera setups to multi-entrance community-wide CCTV pole installations, we design and install complete security pole systems tailored to your HOA's layout and budget.</p>
            </div>
            <div className="mt-6 space-y-2.5">
              {[
                "Security camera pole installs for HOA entrances",
                "Entrance gate camera systems with LPR",
                "CCTV pole installation — all hardware & mounting",
                "Outdoor security camera pole mounts (weather-rated)",
                "Metal pole for security camera with underground conduit",
                "Telescoping security camera poles available",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Camera className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
            <img
              src="/imgi_14_upscale_gate_TTS.jpg"
              alt="Security camera pole installation at Houston HOA entrance gate"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <p className="font-display font-semibold text-gray-900 text-sm">HOA Gate Camera Pole Install</p>
                <p className="text-xs text-gray-500 mt-0.5">Houston, TX — Texas Total Security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm title="Request an HOA Security Consultation" subtitle="Tell us about your community and we'll prepare a presentation for your board." />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default HOASecurity;
