import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Shield, Radio, RefreshCw, Wifi, AlertTriangle, Keyboard, Lock, Bell, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Shield, title: "Alarm Installation", desc: "Professional installation of hardwired, wireless, and hybrid alarm systems tailored to your property." },
  { icon: Radio, title: "24/7 Local Monitoring", desc: "Houston-based monitoring with fast local dispatch — not a distant national call center." },
  { icon: RefreshCw, title: "System Takeover", desc: "Already have a system? We can take it over and activate it on our local monitoring." },
  { icon: Wifi, title: "Wireless Systems", desc: "Modern wireless alarm solutions with cellular backup for reliable communication." },
  { icon: AlertTriangle, title: "Panic & Duress", desc: "Panic buttons, key fob remotes, and silent duress codes for emergency situations." },
  { icon: Keyboard, title: "Smart Keypads", desc: "Touchscreen keypads with user codes, schedules, and easy arm/disarm." },
  { icon: Lock, title: "Glass Break & Sensors", desc: "Door/window contacts, motion detectors, glass break sensors, and environmental monitoring." },
  { icon: Bell, title: "Sirens & Strobes", desc: "Interior/exterior sirens and alarm strobes to alert and help law enforcement." },
];

const alarmEquipment = [
  "Alarm Systems (Hardwired and Wireless) — Arm on AWAY when you leave, or STAY to protect you while at home",
  "Alarm Keypad — Arm/Disarm with Panic Button, Police, Fire, and Emergency Medical dispatch",
  "Key Fob or Keychain Remote — Remotely Arm or Disarm with Panic Button",
  "Medical Pendants — Necklace or Watch to remotely communicate for medical emergencies",
  "Hard Wired or Wireless Panic Button — Silent Alarm for Law Enforcement dispatch",
  "Motion Detector (PIR) — Triggered by humans walking in front of sensor",
  "Glass Break Sensor — Triggered when glass is broken at a window or door",
  "Door Sensor — Triggered when the door is opened",
  "Window Sensor — Triggered when the window is opened",
  "Outdoor Siren — Audible alarm to alert people and help law enforcement locate the event",
  "Indoor Siren — Audible noise inside home or business",
  "Alarm Strobe — Strobe light outside to signal an event and guide law enforcement",
  "Smart Home / Automation System — Tied into Audio/Video, Thermostats, Door Locks, Garage Doors, Lighting",
  "Alarm Monitoring — Through Dispatch Center located in San Antonio, TX",
  "Video Monitoring — Double Verified Video Monitoring triggered by alarm events",
  "Video Guard Patrol — Monitoring station logs into cameras at scheduled times",
  "Custom Monitoring Services — Specific environments monitored for specific events",
];

const faqs = [
  { question: "Do you provide both installation and monitoring services?", answer: "Yes. Texas Total Security offers complete alarm system installation and alarm system monitoring services. Our technicians handle everything from designing and installing your system to connecting it to our Houston-based monitoring center for 24/7 protection." },
  { question: "Can you install security systems for both homes and businesses?", answer: "Absolutely. We design and install custom alarm and surveillance systems for both residential and commercial properties." },
  { question: "How long does it take to install a new alarm system?", answer: "Most residential systems can be installed within a few hours to a full day, depending on property size and complexity." },
  { question: "Can I use my current system from another alarm company?", answer: "Yes. In many cases, we can take over monitoring of your existing alarm equipment, allowing you to avoid the cost of a full replacement." },
  { question: "Switching from another alarm company?", answer: "Switching is easier than you might think. Our team handles the transition smoothly, minimizing downtime and ensuring your system is protected throughout." },
  { question: "Can you take over my existing alarm system?", answer: "Yes. We regularly take over systems from ADT, Brinks, Vivint, and other providers." },
  { question: "What's the difference between hardwired and wireless alarms?", answer: "Hardwired systems use physical wiring — extremely reliable for new construction. Wireless systems use radio signals and are ideal for existing homes. We also install hybrid systems." },
  { question: "What happens during a power outage?", answer: "All our systems include battery backup. Cellular communication ensures your system stays connected even if phone or internet lines are down." },
  { question: "What is the cost of switching alarm companies?", answer: "In many cases, there is minimal cost to switch. We often take over your existing alarm equipment at no charge, eliminating the need for new hardware. Contact us for a free assessment and we'll provide transparent pricing with no surprises." },
  { question: "How long does it take to switch alarm companies?", answer: "Most alarm company switches are completed in a single visit. Our technicians reprogram your existing panel, test all sensors, and connect your system to our local Houston monitoring center — typically within a few hours." },
];

const alarmSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Alarm System Installation & Monitoring — Houston TX",
    "Custom alarm system design, professional installation, and 24/7 local monitoring for homes and businesses in Houston, TX. System takeovers from ADT, Brinks, Vivint. Licensed & insured since 1994.",
    "/alarm-systems",
    "Alarm System Installation",
    ["switch alarm company Houston TX", "local alarm company Houston", "cancel ADT Houston", "local alarm system Houston", "local burglar alarm Houston", "alarm companies near me Houston", "best alarm companies Houston", "local alarm monitoring Houston", "change alarm company Houston", "Honeywell alarm installation Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Alarm Systems", href: "/alarm-systems" },
  ]),
];

const AlarmSystems = () => (
  <Layout>
    <SEOHead
      title="Switch Alarm Companies Houston TX | Local Alarm Installation & Monitoring | Texas Total Security"
      description="Ready to switch alarm companies? Houston's best local alarm company. Cancel ADT, Brinks or Vivint & switch to expert Honeywell installation with 24/7 local monitoring. System takeovers available. (713) 387-9937."
      schemas={alarmSchemas}
    />
    <PageHero
      title="Local Alarm Company in Houston, TX"
      subtitle="Switch alarm companies with zero hassle. Houston's top-rated local alarm company installs Honeywell systems, takes over from ADT, Brinks & Vivint, and provides 24/7 local monitoring — never outsourced."
      ctaText="Switch Your Alarm Today — Free Survey"
    />

    <section className="section-padding">
      <div className="container-tight">
        <div className="glass-card-static p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="divider-accent !mx-0" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">Switching Alarm Companies? We Make It Easy.</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Finding the right local alarm company is critical for real protection. Texas Total Security is one of Houston's top-rated local alarm companies — and switching is simpler than you think. Whether you want to cancel ADT, change from Brinks, drop Vivint, or just find the best local alarm company near you, our team handles the entire takeover process. We keep your existing equipment in most cases, saving you time and money. Schedule your FREE onsite security survey today.
            </p>
          </div>
        </div>

        <SectionHeading title="Protect What Matters Most" subtitle="You deserve more than a one-size-fits-all security solution." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-7">
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Local Monitoring You Can Trust</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Unlike national providers that route alerts through distant call centers, Texas Total Security delivers alarm system monitoring backed by a local, in-house dispatch team right here in Houston, TX.</p>
              <p>If you already have alarm equipment and are frustrated with your current provider, we make switching simple while maximizing the value of what you own.</p>
              <p>We never sell your contract to a big national company — your security stays local.</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground mb-5">Alarm System Equipment</h3>
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
              {alarmEquipment.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm title="Get a Free Alarm System Quote" subtitle="Tell us about your property and we'll design a custom alarm solution." />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default AlarmSystems;
