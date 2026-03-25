import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Home, Shield, Camera, Thermometer, Smartphone, Baby, Lock, Bell, CheckCircle2 } from "lucide-react";

const solutions = [
  { icon: Shield, title: "Whole-Home Alarm Systems", desc: "Custom alarm coverage for every door, window, and access point with 24/7 local monitoring." },
  { icon: Camera, title: "Home Surveillance", desc: "Indoor and outdoor cameras with night vision, motion detection, and mobile app access." },
  { icon: Thermometer, title: "Environmental Sensors", desc: "Smoke, CO, flood, and temperature sensors that protect against fire, gas leaks, and water damage." },
  { icon: Smartphone, title: "Smart Home Integration", desc: "Control your security system, locks, and cameras from your smartphone." },
  { icon: Baby, title: "Family Safety", desc: "Baby monitors, panic buttons, medical alerts, and user codes for every family member." },
  { icon: Lock, title: "Smart Locks & Access", desc: "Keyless entry with smart locks, garage controllers, and automated access." },
];

const propertyTypes = [
  "New Homeowners",
  "Existing Homeowners",
  "New Homes from the Ground Up",
  "Condominiums or Townhomes",
  "Second Homes",
  "Lake Homes, Ocean Front Properties, Ranches",
];

const faqs = [
  { question: "How does Texas Total Security customize residential alarm systems?", answer: "We specialize in customizing residential alarm systems to fit diverse properties. Our consultants work directly with you to design a solution that addresses the specific vulnerabilities and layout of your property." },
  { question: "What does your residential security service include?", answer: "Our service is built on three core pillars: superior installation by licensed professionals, personalized system design, and dedicated 24/7 monitoring with rapid response." },
  { question: "Do you offer solutions beyond basic burglar alarms?", answer: "Yes. We integrate fire and CO detection, environmental monitoring, and smart home automation for layers of defense." },
  { question: "Is my home too old for a modern security system?", answer: "Not at all. We install wireless systems that require no new wiring, making them perfect for older homes." },
  { question: "Can I control my system when I'm away?", answer: "Yes. Our systems include mobile apps for remote arm/disarm, camera viewing, and real-time notifications from anywhere." },
  { question: "What if I already have a system from another company?", answer: "We can often take over your existing equipment and activate it on our local monitoring platform." },
];

const ResidentialSecurity = () => (
  <Layout>
    <PageHero
      title="Residential Security Service in Houston, TX"
      subtitle="Protect your family and home with custom-designed alarm and surveillance systems backed by 24/7 local monitoring from Houston's most trusted security experts."
    />

    <section className="section-padding">
      <div className="container-tight max-w-4xl mx-auto">
        <div className="divider-accent" />
        <p className="text-muted-foreground leading-relaxed text-center text-lg">
          At Texas Total Security in Houston, TX, we understand that protecting your home is your number one priority. We deliver absolute peace of mind through a robust and fully customized residential security service. Every home has unique needs, and we design tailored solutions that provide seamless and comprehensive protection.
        </p>
      </div>
    </section>

    <section className="section-padding-sm" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <SectionHeading title="Designing Your Personalized Defense" subtitle="True security is not a generic, one-size-fits-all product." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-7">
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Commitment to Long-Term Vigilance</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Choosing us means partnering with a team deeply committed to your long-term protection, going beyond simple alerts to include full home automation capabilities.</p>
              <p>Our highly trained and licensed technicians manage the entire setup process, ensuring every component functions flawlessly. Our monitoring center provides constant vigilance, ready to dispatch emergency services instantly.</p>
            </div>
          </div>
          <div>
            <SectionHeading title="We Protect Every Type of Home" centered={false} />
            <div className="space-y-3">
              {propertyTypes.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm title="Get a Free Home Security Assessment" subtitle="Tell us about your home and we'll design the perfect system." />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default ResidentialSecurity;
