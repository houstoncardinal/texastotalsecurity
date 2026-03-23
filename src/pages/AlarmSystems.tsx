import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Shield, Radio, RefreshCw, Wifi, AlertTriangle, Keyboard, Lock, Bell } from "lucide-react";

const features = [
  { icon: Shield, title: "Alarm Installation", desc: "Professional installation of hardwired, wireless, and hybrid alarm systems tailored to your property." },
  { icon: Radio, title: "24/7 Local Monitoring", desc: "Houston-based monitoring with fast local dispatch — not a distant national call center." },
  { icon: RefreshCw, title: "System Takeover", desc: "Already have a system from another provider? We can take it over and activate it on our local monitoring." },
  { icon: Wifi, title: "Wireless Systems", desc: "Modern wireless alarm solutions with cellular backup for reliable communication even during power outages." },
  { icon: AlertTriangle, title: "Panic & Duress", desc: "Panic buttons and silent duress codes for emergency situations at home or in commercial settings." },
  { icon: Keyboard, title: "Smart Keypads", desc: "Touchscreen keypads with user codes, schedules, and easy arm/disarm for every member of your household or team." },
  { icon: Lock, title: "Glass Break & Sensors", desc: "Door/window contacts, motion detectors, glass break sensors, and environmental monitoring for complete coverage." },
  { icon: Bell, title: "Sirens & Notifications", desc: "Interior/exterior sirens and instant mobile notifications so you always know what's happening." },
];

const faqs = [
  { question: "Can you take over my existing alarm system?", answer: "Yes. We regularly take over systems from ADT, Brinks, Vivint, and other providers. We'll evaluate your current equipment, replace any outdated components, and activate it on our local monitoring platform — often at a lower monthly cost." },
  { question: "What's the difference between hardwired and wireless alarms?", answer: "Hardwired systems use physical wiring between sensors and the panel — extremely reliable for new construction. Wireless systems use radio signals and are ideal for existing homes. We also install hybrid systems that combine both technologies." },
  { question: "How fast is your monitoring response time?", answer: "Because our monitoring center is local to Houston, we typically achieve faster dispatch times than national providers. Our operators communicate directly with local law enforcement and fire departments." },
  { question: "Do you require long-term contracts?", answer: "We offer flexible monitoring agreements. We believe in earning your business through quality service — not locking you into rigid contracts." },
  { question: "What happens during a power outage?", answer: "All our systems include battery backup that keeps your alarm operational during power outages. Cellular communication ensures your system stays connected even if phone or internet lines are down." },
];

const AlarmSystems = () => (
  <Layout>
    <PageHero
      title="Alarm Systems Installation & Monitoring"
      subtitle="Custom-designed alarm systems with 24/7 local monitoring. Installation, takeover, and ongoing service for residential and commercial properties across Houston."
      ctaText="Schedule a Free Alarm Survey"
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Complete Alarm Solutions" subtitle="From system design to 24/7 monitoring, we handle every aspect of your alarm system." />
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

    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">The Local Monitoring Advantage</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>When your alarm triggers, every second matters. National monitoring centers route signals through distant facilities — adding delay and losing local context.</p>
              <p>Our monitoring center is right here in Houston. Our operators know the area, have direct relationships with local dispatch, and can verify situations faster. The result? Quicker response times and better outcomes when it counts.</p>
              <p>We also never sell your monitoring contract to another company. Your account stays with us for as long as you choose — and you'll always have a direct line to real people who know your system.</p>
            </div>
          </div>
          <LeadForm title="Get a Free Alarm System Quote" subtitle="Tell us about your property and we'll design a custom alarm solution." />
        </div>
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default AlarmSystems;
