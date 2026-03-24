import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Radio, MapPin, Clock, Shield, PhoneCall, CheckCircle2 } from "lucide-react";

const benefits = [
  { icon: MapPin, title: "Houston-Based Center", desc: "Our monitoring operators are right here in Houston — familiar with local geography, dispatch procedures, and emergency services." },
  { icon: Clock, title: "Faster Response Times", desc: "Local monitoring means faster signal processing and quicker communication with local law enforcement and fire departments." },
  { icon: PhoneCall, title: "Real Human Operators", desc: "When your alarm triggers, a trained operator — not an automated system — evaluates the situation and takes action." },
  { icon: Shield, title: "24/7/365 Coverage", desc: "Round-the-clock monitoring every day of the year. Holidays, weekends, severe weather — we never close." },
  { icon: CheckCircle2, title: "Video Verification", desc: "For systems with cameras, our operators can verify alarm events visually — reducing false dispatches and improving police response priority." },
  { icon: Radio, title: "Multiple Communication Paths", desc: "Cellular, IP, and phone line monitoring ensure your system stays connected even if one communication path fails." },
];

const monitoringTypes = [
  "Alarm Monitoring — Through Dispatch Center located in San Antonio, TX",
  "Video Monitoring — Double verified video monitoring triggered by alarm events",
  "Video Guard Patrol — Monitoring station logs into cameras at scheduled times to check on specific cameras",
  "Custom Monitoring Services — Specific environments monitored for specific events",
];

const faqs = [
  { question: "How is local monitoring different from national monitoring?", answer: "Local monitoring means our operators are right here in the Houston area. They understand local geography, have direct relationships with local dispatch, and can process alarm signals faster than distant national call centers that route through multiple hubs." },
  { question: "Do you sell monitoring contracts to other companies?", answer: "Never. Your account stays with us for as long as you choose. We never sell our alarm contracts to big national companies. You'll always have a direct line to real people who know your system." },
  { question: "What types of monitoring do you offer?", answer: "We offer standard alarm monitoring, video monitoring (double verified), video guard patrol where operators check your cameras on schedule, and custom monitoring services designed for specific environments and events." },
  { question: "Can you monitor my existing alarm system?", answer: "In most cases, yes. We can take over monitoring of your existing alarm equipment from another provider, saving you the cost of new equipment while upgrading to faster, local service." },
];

const MonitoringServices = () => (
  <Layout>
    <PageHero
      title="24/7 Local Monitoring Services"
      subtitle="Your alarm is only as good as the team watching it. Our Houston-based monitoring center delivers faster response, real accountability, and the personal service national companies can't match."
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="The Local Monitoring Difference" subtitle="Why Houston businesses and homeowners choose local monitoring over national call centers." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="glass-card p-6">
              <b.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Monitoring Types */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Local vs. National Monitoring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-display font-bold text-accent mb-4">Texas Total Security</h3>
                <ul className="space-y-3">
                  {["Houston-based operators", "Direct local dispatch", "Know your neighborhood", "Personal accountability", "Video verification available", "No contract selling"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6 opacity-70">
                <h3 className="font-display font-bold text-muted-foreground mb-4">National Providers</h3>
                <ul className="space-y-3">
                  {["Distant call centers", "Routed through multiple hubs", "No local knowledge", "Faceless service", "Basic alarm-only response", "Contracts frequently sold"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-4 h-4 rounded-full border border-muted-foreground/30 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground mb-4">Monitoring Services We Offer</h3>
            <div className="space-y-3 mb-8">
              {monitoringTypes.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <LeadForm title="Switch to Local Monitoring" subtitle="Tell us about your current system and we'll make switching easy." />
          </div>
        </div>
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default MonitoringServices;
