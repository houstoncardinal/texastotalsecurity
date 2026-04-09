import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Radio, MapPin, Clock, Shield, PhoneCall, CheckCircle2 } from "lucide-react";

const benefits = [
  { icon: MapPin, title: "Houston-Based Center", desc: "Our monitoring operators are right here in Houston — familiar with local geography and emergency services." },
  { icon: Clock, title: "Faster Response Times", desc: "Local monitoring means faster signal processing and quicker communication with law enforcement." },
  { icon: PhoneCall, title: "Real Human Operators", desc: "When your alarm triggers, a trained operator evaluates the situation and takes action." },
  { icon: Shield, title: "24/7/365 Coverage", desc: "Round-the-clock monitoring every day of the year. We never close." },
  { icon: CheckCircle2, title: "Video Verification", desc: "Operators can verify alarm events visually — reducing false dispatches and improving response priority." },
  { icon: Radio, title: "Multiple Communication Paths", desc: "Cellular, IP, and phone line monitoring ensure your system stays connected." },
];

const monitoringTypes = [
  "Alarm Monitoring — Through Dispatch Center located in San Antonio, TX",
  "Video Monitoring — Double verified video monitoring triggered by alarm events",
  "Video Guard Patrol — Monitoring station logs into cameras at scheduled times",
  "Custom Monitoring Services — Specific environments monitored for specific events",
];

const faqs = [
  { question: "How is local monitoring different from national monitoring?", answer: "Local monitoring means our operators are in the Houston area. They understand local geography, have direct relationships with local dispatch, and process alarm signals faster." },
  { question: "Do you sell monitoring contracts to other companies?", answer: "Never. Your account stays with us. We never sell our alarm contracts to big national companies." },
  { question: "What types of monitoring do you offer?", answer: "Standard alarm monitoring, video monitoring (double verified), video guard patrol, and custom monitoring services." },
  { question: "Can you monitor my existing alarm system?", answer: "In most cases, yes. We can take over monitoring from another provider, saving you the cost of new equipment." },
];

const monitoringSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "24/7 Alarm Monitoring Houston TX — Local Dispatch Center",
    "Local 24/7 alarm monitoring by Texas Total Security in Houston, TX. In-house monitoring center — not a distant national call center. Video monitoring, guard patrol & custom monitoring services.",
    "/monitoring-services",
    "Alarm Monitoring Service",
    ["alarm monitoring Houston TX", "24/7 alarm monitoring Houston", "local alarm monitoring Houston", "video monitoring Houston", "security monitoring company Houston"]
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Monitoring Services", href: "/monitoring-services" },
  ]),
];

const MonitoringServices = () => (
  <Layout>
    <SEOHead
      title="Local Alarm Monitoring Houston TX | Switch Alarm Monitoring Companies | Texas Total Security"
      description="Best local alarm monitoring company in Houston, TX. 24/7 in-house local dispatch center — not a national call center. Switch alarm monitoring companies today. Video monitoring, guard patrol & never sells your contract. (713) 387-9937."
      schemas={monitoringSchemas}
    />
    <PageHero
      title="24/7 Local Monitoring Services"
      subtitle="Your alarm is only as good as the team watching it. Our Houston-based monitoring center delivers faster response, real accountability, and personal service."
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="The Local Monitoring Difference" subtitle="Why Houston businesses and homeowners choose local monitoring over national call centers." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="glass-card p-7">
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
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
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Local vs. National Monitoring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card-static p-6 border-accent/20">
                <h3 className="font-display font-bold text-accent mb-4 text-sm">Texas Total Security</h3>
                <ul className="space-y-3">
                  {["Houston-based operators", "Direct local dispatch", "Know your neighborhood", "Personal accountability", "Video verification", "No contract selling"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card-static p-6 opacity-60">
                <h3 className="font-display font-bold text-muted-foreground mb-4 text-sm">National Providers</h3>
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
            <h3 className="text-xl font-display font-bold text-foreground mb-5">Monitoring Services We Offer</h3>
            <div className="space-y-3 mb-8">
              {monitoringTypes.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
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
