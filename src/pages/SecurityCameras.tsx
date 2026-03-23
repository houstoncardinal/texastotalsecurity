import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Camera, Eye, Zap, Sun, Wifi, Video, MonitorSpeaker, Shield } from "lucide-react";

const cameraTypes = [
  { icon: Camera, title: "HD & 4K Cameras", desc: "Crystal-clear footage day and night with professional-grade IP cameras built for Houston weather." },
  { icon: Eye, title: "License Plate Cameras", desc: "Specialized LPR cameras that capture plate numbers clearly — essential for HOAs, parking, and commercial properties." },
  { icon: Zap, title: "Active Deterrence", desc: "Cameras with built-in sirens, strobes, and two-way audio that actively deter intruders before they act." },
  { icon: Sun, title: "Solar Camera Systems", desc: "Off-grid surveillance for construction sites, ranches, and remote locations with solar-powered cameras." },
  { icon: Wifi, title: "Wireless Systems", desc: "Flexible wireless camera setups for properties where running cable isn't practical or desired." },
  { icon: Video, title: "PTZ & Fisheye", desc: "Pan-tilt-zoom and 360° fisheye cameras for large areas requiring comprehensive coverage from fewer units." },
  { icon: MonitorSpeaker, title: "Doorbell Cameras", desc: "Video doorbell integration for front-door visibility with two-way communication and motion alerts." },
  { icon: Shield, title: "Remote Viewing", desc: "View all cameras from your phone, tablet, or computer — anywhere in the world, anytime." },
];

const faqs = [
  { question: "How many cameras do I need?", answer: "It depends on your property's size, layout, and entry points. During our free onsite analysis, we map every vulnerable area and recommend the optimal number and placement for complete coverage." },
  { question: "Can I view cameras from my phone?", answer: "Yes. All our camera systems include mobile apps for iOS and Android, giving you live and recorded footage from anywhere with an internet connection." },
  { question: "Do cameras work at night?", answer: "Absolutely. Our cameras include infrared night vision and many models feature full-color night vision with built-in spotlights for even clearer nighttime footage." },
  { question: "How long is footage stored?", answer: "Storage duration depends on the number of cameras, resolution, and recorder capacity. Most systems store 30-90 days. We design storage to match your specific needs and compliance requirements." },
  { question: "Can cameras integrate with my alarm system?", answer: "Yes. We specialize in integrated security systems where cameras, alarms, and monitoring work together for comprehensive protection and verified alarm response." },
];

const SecurityCameras = () => (
  <Layout>
    <PageHero
      title="Security Camera Systems"
      subtitle="Professional surveillance design, installation, and support. From single-camera doorbell setups to enterprise-grade multi-site systems — custom-built for Houston properties."
      ctaText="Get a Custom Surveillance Plan"
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Camera Solutions for Every Need" subtitle="We install and service the full spectrum of surveillance technology for homes, businesses, and communities." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cameraTypes.map((c) => (
            <div key={c.title} className="glass-card p-6">
              <c.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Professionally Designed Surveillance</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Off-the-shelf camera kits leave gaps. Our certified designers survey your property, identify every vulnerability, and create a surveillance plan that eliminates blind spots.</p>
              <p>We select the right camera type for each location — wide-angle for parking lots, varifocal for entry points, LPR for gates, active deterrence for perimeters. Every camera earns its position.</p>
              <p>Our installations are clean, weatherproof, and built to last. We run structured cabling, configure network settings, optimize recording schedules, and set up remote access on all your devices before we leave.</p>
            </div>
          </div>
          <LeadForm title="Request a Custom Camera Design" subtitle="Tell us about your property and surveillance goals." />
        </div>
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default SecurityCameras;
