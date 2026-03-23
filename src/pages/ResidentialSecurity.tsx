import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Home, Shield, Camera, Thermometer, Smartphone, Baby, Lock, Bell } from "lucide-react";

const solutions = [
  { icon: Shield, title: "Whole-Home Alarm Systems", desc: "Custom alarm coverage for every door, window, and access point with 24/7 local monitoring." },
  { icon: Camera, title: "Home Surveillance", desc: "Indoor and outdoor cameras with night vision, motion detection, and mobile app access." },
  { icon: Thermometer, title: "Environmental Sensors", desc: "Smoke, CO, flood, and temperature sensors that protect against fire, gas leaks, and water damage." },
  { icon: Smartphone, title: "Smart Home Integration", desc: "Control your security system, locks, and cameras from your smartphone alongside smart home devices." },
  { icon: Baby, title: "Family Safety", desc: "Baby monitors, panic buttons, medical alerts, and user codes for every family member." },
  { icon: Lock, title: "Smart Locks & Access", desc: "Keyless entry with smart locks, garage controllers, and automated access for trusted visitors." },
];

const propertyTypes = ["New Construction Homes", "Existing Homes", "Condos & Townhomes", "Ranch Properties", "Second Homes & Vacation Properties", "Gated Communities"];

const faqs = [
  { question: "Is my home too old for a modern security system?", answer: "Not at all. We install wireless systems that require no new wiring, making them perfect for older homes. We can also work with existing wiring if available." },
  { question: "Can I control my system when I'm away?", answer: "Yes. Our systems include mobile apps for remote arm/disarm, camera viewing, and real-time notifications — from anywhere in the world." },
  { question: "What if I already have a system from another company?", answer: "We can often take over your existing equipment and activate it on our local monitoring platform, saving you the cost of new equipment." },
  { question: "Do you install in apartments or rentals?", answer: "We offer wireless systems that can be installed without permanent modifications — perfect for renters. Talk to us about your situation." },
];

const ResidentialSecurity = () => (
  <Layout>
    <PageHero
      title="Residential Security Systems"
      subtitle="Protect your family and home with custom-designed alarm and surveillance systems backed by 24/7 local monitoring from Houston's most trusted security experts."
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Home Security Solutions" subtitle="Every home is different. We design security systems that match your property, lifestyle, and family's needs." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card p-6">
              <s.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading title="We Protect Every Type of Home" />
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {propertyTypes.map((t) => (
            <span key={t} className="trust-badge">{t}</span>
          ))}
        </div>
        <div className="max-w-2xl mx-auto">
          <LeadForm title="Get a Free Home Security Assessment" subtitle="Tell us about your home and we'll design the perfect system." />
        </div>
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default ResidentialSecurity;
