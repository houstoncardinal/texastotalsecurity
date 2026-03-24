import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Home, Shield, Camera, Thermometer, Smartphone, Baby, Lock, Bell } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  { icon: Shield, title: "Whole-Home Alarm Systems", desc: "Custom alarm coverage for every door, window, and access point with 24/7 local monitoring." },
  { icon: Camera, title: "Home Surveillance", desc: "Indoor and outdoor cameras with night vision, motion detection, and mobile app access." },
  { icon: Thermometer, title: "Environmental Sensors", desc: "Smoke, CO, flood, and temperature sensors that protect against fire, gas leaks, and water damage." },
  { icon: Smartphone, title: "Smart Home Integration", desc: "Control your security system, locks, and cameras from your smartphone alongside smart home devices." },
  { icon: Baby, title: "Family Safety", desc: "Baby monitors, panic buttons, medical alerts, and user codes for every family member." },
  { icon: Lock, title: "Smart Locks & Access", desc: "Keyless entry with smart locks, garage controllers, and automated access for trusted visitors." },
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
  { question: "How does Texas Total Security customize residential alarm systems for different types of homes?", answer: "We understand that security is not a one-size-fits-all solution. We specialize in customizing residential alarm systems to fit diverse properties, including new builds, condominiums, townhomes, second homes, and large ranches. Our consultants work directly with you to design a solution that addresses the specific vulnerabilities and layout of your property, ensuring complete and reliable protection." },
  { question: "What does your comprehensive residential security service include?", answer: "Our dedicated residential security service is built on three core pillars: superior installation by licensed professionals, personalized system design, and dedicated twenty-four/seven monitoring. We integrate top-tier technology, like advanced surveillance and smart controls, guaranteeing rapid response and constant vigilance to keep your family and assets secure around the clock." },
  { question: "Does Texas Total Security offer solutions beyond basic burglar alarms?", answer: "Yes, our systems go far beyond basic intrusion alerts. We integrate features such as fire and carbon monoxide detection, environmental monitoring, and smart home automation. This provides layers of defense, ensuring that your residential alarm systems protect against security threats, environmental hazards, and give you complete control over your home's safety features." },
  { question: "Is my home too old for a modern security system?", answer: "Not at all. We install wireless systems that require no new wiring, making them perfect for older homes. We can also work with existing wiring if available." },
  { question: "Can I control my system when I'm away?", answer: "Yes. Our systems include mobile apps for remote arm/disarm, camera viewing, and real-time notifications — from anywhere in the world." },
  { question: "What if I already have a system from another company?", answer: "We can often take over your existing equipment and activate it on our local monitoring platform, saving you the cost of new equipment." },
];

const ResidentialSecurity = () => (
  <Layout>
    <PageHero
      title="Residential Security Service in Houston, TX"
      subtitle="Protect your family and home with custom-designed alarm and surveillance systems backed by 24/7 local monitoring from Houston's most trusted security experts."
    />

    {/* Intro from original site */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground leading-relaxed mb-6">
            At Texas Total Security in Houston, TX, we understand that protecting your home is your number one priority. We are dedicated to delivering absolute peace of mind through a robust and fully customized residential security service. Every home has unique needs, and we design tailored solutions that provide seamless and comprehensive protection for everything from individual residences to entire Home Owners Association communities. We specialize in state-of-the-art residential alarm systems that deter intruders, alert authorities, and keep your family safe around the clock. Your safety is our ultimate mission.
          </p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading title="Designing Your Personalized Defense" subtitle="True security is not a generic, one-size-fits-all product." />
        <div className="max-w-4xl mx-auto mb-10">
          <p className="text-muted-foreground leading-relaxed">
            Our professional security consultants collaborate directly with you to assess every unique vulnerability of your property, whether you own a new condominium, an existing family home, or are coordinating security for a large HOA. We then meticulously plan and integrate the most advanced technology available, including high-definition surveillance cameras (such as essential HOA gate cameras), and environmental sensors, ensuring complete coverage across your entire premises. This personalized approach guarantees that your specific concerns — from external perimeter protection to internal intrusion monitoring — are addressed with reliable, cutting-edge equipment that provides seamless smart home integration.
          </p>
        </div>
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

    {/* Commitment section from original site */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Commitment to Long-Term Vigilance</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Choosing us means partnering with a team deeply committed to your long-term protection, going beyond simple alerts to include full home automation capabilities. We stand apart by offering three fundamental pillars of service: superior installation, dedicated monitoring, and responsive technical support.
              </p>
              <p>
                Our highly trained and licensed technicians manage the entire setup process, ensuring every component of your residential alarm systems is installed masterfully and functions flawlessly. Furthermore, our professional monitoring center provides constant vigilance, ready to dispatch emergency services instantly when an alert is triggered, ensuring your home is continuously under our watchful eye 24/7.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading title="We Protect Every Type of Home" />
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

    <section className="section-padding bg-secondary">
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm title="Get a Free Home Security Assessment" subtitle="Tell us about your home and we'll design the perfect system." />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default ResidentialSecurity;
