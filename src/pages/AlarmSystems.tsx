import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Shield, Radio, RefreshCw, Wifi, AlertTriangle, Keyboard, Lock, Bell, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Shield, title: "Alarm Installation", desc: "Professional installation of hardwired, wireless, and hybrid alarm systems tailored to your property." },
  { icon: Radio, title: "24/7 Local Monitoring", desc: "Houston-based monitoring with fast local dispatch — not a distant national call center." },
  { icon: RefreshCw, title: "System Takeover", desc: "Already have a system from another provider? We can take it over and activate it on our local monitoring." },
  { icon: Wifi, title: "Wireless Systems", desc: "Modern wireless alarm solutions with cellular backup for reliable communication even during power outages." },
  { icon: AlertTriangle, title: "Panic & Duress", desc: "Panic buttons, key fob remotes, and silent duress codes for emergency situations at home or in commercial settings." },
  { icon: Keyboard, title: "Smart Keypads", desc: "Touchscreen keypads with user codes, schedules, and easy arm/disarm for every member of your household or team." },
  { icon: Lock, title: "Glass Break & Sensors", desc: "Door/window contacts, motion detectors, glass break sensors, and environmental monitoring for complete coverage." },
  { icon: Bell, title: "Sirens & Strobes", desc: "Interior/exterior sirens and alarm strobes to let people outside know an event is happening and help law enforcement locate the source." },
];

const alarmEquipment = [
  "Alarm Systems (Hardwired and Wireless) — Arm on AWAY when you leave, or STAY to protect you while at home or the office, especially while sleeping",
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
  "Smart Home / Automation System — Tied into Audio/Video, Thermostats, Door Locks, Garage Doors, Lighting, Window Blinds",
  "Alarm Monitoring — Through Dispatch Center located in San Antonio, TX",
  "Video Monitoring — Double Verified Video Monitoring triggered by alarm events",
  "Video Guard Patrol — Monitoring station logs into cameras at scheduled times",
  "Custom Monitoring Services — Specific environments monitored for specific events",
];

const faqs = [
  { question: "Do you provide both installation and monitoring services?", answer: "Yes. Texas Total Security offers complete alarm system installation and alarm system monitoring services. Our technicians handle everything from designing and installing your system to connecting it to our Houston-based monitoring center for 24/7 protection." },
  { question: "Can you install security systems for both homes and businesses?", answer: "Absolutely. We design and install custom alarm and surveillance systems for both residential and commercial properties. Whether it's a single-family home, office building, retail space, or industrial facility, we tailor every system to meet the specific security needs of your property." },
  { question: "How long does it take to install a new alarm system?", answer: "The installation timeline depends on the size and complexity of your property, but most residential systems can be installed within a few hours to a full day." },
  { question: "Can I use my current system from another alarm company?", answer: "Yes. In many cases, we can take over monitoring of your existing alarm equipment, allowing you to avoid the cost of a full replacement. We specialize in working with Honeywell systems and can often reuse compatible components, saving you time and money while improving your service experience." },
  { question: "Switching from another alarm company?", answer: "Switching is easier than you might think. Our team handles the transition smoothly, minimizing downtime and ensuring your system is protected throughout the process. We'll review your current setup, explain your options clearly, and move you to local monitoring without unnecessary upgrades." },
  { question: "Can you take over my existing alarm system?", answer: "Yes. We regularly take over systems from ADT, Brinks, Vivint, and other providers. We'll evaluate your current equipment, replace any outdated components, and activate it on our local monitoring platform — often at a lower monthly cost." },
  { question: "What's the difference between hardwired and wireless alarms?", answer: "Hardwired systems use physical wiring between sensors and the panel — extremely reliable for new construction. Wireless systems use radio signals and are ideal for existing homes. We also install hybrid systems that combine both technologies." },
  { question: "What happens during a power outage?", answer: "All our systems include battery backup that keeps your alarm operational during power outages. Cellular communication ensures your system stays connected even if phone or internet lines are down." },
];

const AlarmSystems = () => (
  <Layout>
    <PageHero
      title="Alarm System Servicing in Houston, TX"
      subtitle="Custom-designed alarm systems with 24/7 local monitoring. Installation, takeover, and ongoing service for residential and commercial properties across Houston."
      ctaText="Schedule a Free Alarm Survey"
    />

    {/* Takeover Section from original site */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="glass-card p-8 sm:p-12 mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">Unhappy With Your Existing Alarm Company?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Finding the right alarm company is important. When switching to Texas Total Security, we make the process simple. In most cases, we can take over your existing alarm system, saving you time and money. Hard-wired or wireless system? No problem. Have one of our local security professionals come out to your home or business to provide a FREE ONSITE SECURITY SURVEY.
          </p>
        </div>

        <SectionHeading title="Protect What Matters Most" subtitle="When it comes to keeping your home or business safe, you deserve more than a one-size-fits-all security solution." />
        <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center mb-10">
          Texas Total Security provides custom alarm system installation and monitoring systems, delivering dependable protection backed by more than 30 years of local experience. Our team specializes in customized burglar and intrusion systems for commercial and residential security customers in Houston, TX and surrounding areas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6">
              <f.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Local Monitoring + Equipment List */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Local Monitoring You Can Trust</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Unlike national providers that route alerts through distant call centers, Texas Total Security delivers alarm system monitoring backed by a local, in-house dispatch team right here in Houston, TX. This means faster response times, real accountability, and support from professionals who understand your neighborhood and your needs.</p>
              <p>If you already have alarm equipment and are frustrated with your current provider, we make switching simple while maximizing the value of what you own. Our experienced technicians bring hands-on expertise in alarm system installation and alarm system servicing for both homes and businesses, ensuring your system performs reliably long after setup.</p>
              <p>We never sell your contract to a big national company — your security stays local. From active deterrence to integrated surveillance and networking, our solutions are designed to protect what matters most.</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground mb-4">Alarm System Equipment</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {alarmEquipment.map((item) => (
                <div key={item} className="flex items-start gap-2">
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
