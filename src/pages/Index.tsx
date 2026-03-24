import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import TrustBar from "@/components/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { generateLocalBusinessSchema, generateFAQSchema, generateOrganizationSchema } from "@/lib/seo";
import {
  Shield, Camera, Home, Building2, Users, Radio, ArrowRight, Phone,
  PhoneCall, ClipboardCheck, Wrench, HeadphonesIcon, CheckCircle2,
} from "lucide-react";

const processSteps = [
  { icon: PhoneCall, title: "Initial Phone Call", desc: "Speak with a security specialist about your needs and schedule your free analysis." },
  { icon: ClipboardCheck, title: "Free Onsite Analysis", desc: "Security Pro meets with you onsite at your home or business. Examines layout and gathers information regarding equipment." },
  { icon: Wrench, title: "Professional Installation", desc: "Certified technicians install your system with precision and clean workmanship." },
  { icon: HeadphonesIcon, title: "Follow Up & Support", desc: "Follow up phone call, 24/7 local monitoring, maintenance, and fast-response support for the life of your system." },
];

const testimonials = [
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "I love my new security cameras — the coverage and resolution is great! The camera monitor is awesome. I can cook in the kitchen and keep an eye on the kids while they play. Also the street and driveway coverage is nice. Thank you Texas Total Security!",
  },
  {
    name: "Business Owner",
    role: "Houston, TX",
    text: "My business was growing so quickly that I needed to keep an eye on day to day operations at my office but, I couldn't be there all the time. Texas Total Security installed the surveillance cameras in all the right locations. Now I can be on the go and travel while getting remote access to my cameras on my cell phone or tablet. Now I spend more time with family!",
  },
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "My husband and I were unhappy with our current big national alarm company. Now Texas Total Security provides us with great customer service and alarm monitoring. It was a quick simple process to switch!",
  },
  {
    name: "Property Manager",
    role: "Houston, TX",
    text: "I needed help getting video coverage and protecting our entrance and exit gates. Texas Total Security not only provided great security camera coverage so we can see who hits the gates but, provided deterrence with red and blue strobe lights. Their license plate cameras are great!",
  },
  {
    name: "Homeowner",
    role: "Bellaire, TX",
    text: "During the process of building our new house in Bellaire I decided we needed to get professional security. What really stood out the most was how Texas Total Security described to me in such detail and confidence the process and exactly what I will be getting.",
  },
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "My friend referred me to Tim and Texas Total Security because they were pleased with the quality of security cameras and they felt safe with the new equipment. Tim came out to my home and provided me with the free security analysis. He was professional and courteous but really listened to what I needed. I have full control of my home!",
  },
  {
    name: "HOA Board Member",
    role: "Houston, TX",
    text: "So glad we went with Texas Total Security! They have helped us with providing CCTV footage of events that HPD needed. They even dropped the memory stick at the property management's office.",
  },
];

const industries = [
  "Residential", "HOAs", "Retail", "Medical", "Schools", "Restaurants",
  "Industrial", "Hotels", "Construction", "Parking", "Government", "Worship",
];

const faqs = [
  { q: "Do you handle alarm system installation for older homes or buildings?", a: "Yes. Our technicians are trained to install alarm systems in properties of all ages, including older homes and commercial buildings. We assess your structure, wiring, and layout to ensure your new system is installed safely and functions reliably." },
  { q: "How quickly can you respond to service calls in the Houston area?", a: "Because we're a local team, we provide fast, dependable support throughout Houston and the surrounding communities. Whether you need maintenance, troubleshooting, or an equipment check, we work efficiently to keep your alarm and security systems running smoothly." },
  { q: "Can I integrate my alarm systems with security cameras or smart devices?", a: "Absolutely. We offer security systems that integrate seamlessly with security cameras, smart locks, mobile apps, and home automation equipment, allowing you to monitor and manage your property from anywhere." },
  { q: "What makes your security systems different from national alarm companies?", a: "Our focus is on personalized service, local expertise, and advanced technology designed specifically for Houston environments. You get reliable protection, professional installation, and responsive support from a team that truly understands local security challenges." },
  { q: "Do you offer security solutions for both residential and commercial properties?", a: "Yes. We deliver complete alarm and security systems for single-family homes, apartments, retail spaces, offices, warehouses, and more. Each setup is customized to match your property's size, layout, and safety goals." },
];

const Index = () => {
  const faqSchemaItems = faqs.map(f => ({ question: f.q, answer: f.a }));
  const schemas = [generateOrganizationSchema(), generateLocalBusinessSchema(), generateFAQSchema(faqSchemaItems)];

  return (
  <Layout>
    <SEOHead
      title="Texas Total Security | #1 Security Systems for Homes & Businesses in Houston, TX"
      description="Houston's trusted security experts for 30+ years. Custom alarm systems, security cameras, 24/7 local monitoring for homes, businesses, and HOAs. Free onsite security analysis. Call (713) 387-9937."
      schemas={schemas}
    />
    {/* Hero */}
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(0_85%_46%/0.15),transparent_60%)]" />
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-accent/20 text-accent-foreground mb-6">
            <Shield className="w-4 h-4" />
            Houston's Trusted Security Experts — 30+ Years
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Get the Protection<br />
            <span className="text-gradient">You Deserve</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-xl mb-4 leading-relaxed">
            #1 Security Systems for Homes and Businesses in Houston, TX
          </p>
          <p className="text-base text-primary-foreground/60 max-w-xl mb-4 leading-relaxed">
            Also Serving All Surrounding Areas
          </p>
          <p className="text-base text-primary-foreground/60 max-w-xl mb-8 leading-relaxed">
            Experience a higher level of safety with proven, modern security systems tailored to homes and businesses of every size. Our solutions feature advanced alarm systems designed to handle the unique conditions and security concerns found throughout the Houston area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center justify-center gap-2 text-base px-8 py-4">
              Get a Free Security Analysis <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:7133879937"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="w-5 h-5" /> Call (713) 387-9937
            </a>
          </div>
        </div>
      </div>
    </section>

    <TrustBar />

    {/* Services Overview */}
    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Specializing in…"
          subtitle="From residential alarm systems to enterprise-grade commercial surveillance, we design and install custom protection for every property type."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard icon={Shield} title="Alarm Systems" description="Custom alarm design, installation, and local monitoring for homes and businesses. Hardwired, wireless, and hybrid solutions." href="/alarm-systems" />
          <ServiceCard icon={Camera} title="Security Camera & Surveillance Systems" description="HD surveillance, license plate cameras, PTZ, active deterrence, and remote viewing — professionally installed and supported." href="/security-cameras" />
          <ServiceCard icon={Home} title="Residential Security" description="Whole-home protection with smart integration, environmental sensors, and 24/7 monitoring tailored to your family's needs." href="/residential-security" />
          <ServiceCard icon={Building2} title="Commercial Security" description="Scalable security for offices, retail, industrial sites, and multi-location businesses. Custom-designed for your operations." href="/commercial-security" />
          <ServiceCard icon={Users} title="HOA Security" description="Gate cameras, license plate recognition, common area surveillance, and community-wide security systems for property managers and boards." href="/hoa-security" />
          <ServiceCard icon={Radio} title="Active Deterrence & Notification Systems" description="Cameras with sirens, strobes, and two-way talk that confront trespassers. Indoor or outdoor networking and WiFi systems." href="/monitoring-services" />
        </div>
      </div>
    </section>

    {/* Why We're the Best */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading
          title="Why We're the Best"
          subtitle="We're not a national franchise. We're your neighbors — and we've been protecting Houston properties for over three decades."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Reliable Security Equipment", desc: "Equipment that works when you need it — built for real-world Houston conditions and backed by professional support." },
            { title: "Newest Technology to Fight Crime", desc: "We utilize the newest technology to fight crime, including active deterrence cameras, LPR systems, and smart integrations." },
            { title: "30+ Years of Trusted Service", desc: "Trustworthy security techs working in Houston and surrounding areas for over 30 years." },
            { title: "Friendly, Local Customer Service", desc: "Customer service by friendly and local staff. You'll know your technician by name, and they'll know your system inside and out." },
            { title: "In-House Monitoring by Dispatch Center", desc: "In-house monitoring by dispatch center — not a distant national call center. Local operators dispatch local authorities fast." },
            { title: "We Don't Sell Our Alarm Contracts", desc: "We don't sell our alarm contracts to big national companies. Your account stays with us — always." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading
          title="Our Process"
          subtitle="From your first call to 24/7 monitored protection — we make the process simple, transparent, and stress-free."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Free Onsite Security Analysis */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <div className="glass-card p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">Free Onsite Security Analysis</h2>
              <ul className="space-y-4">
                {[
                  "Security Pro meets with you onsite at your home or business",
                  "Talks about current security system, upgrades, or plans for a new one",
                  "Examines layout and gathers information regarding equipment",
                  "Comes up with solutions, ideas, and discusses a plan of action",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2 text-lg px-8 py-4">
                Schedule Your Free Analysis <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-muted-foreground mt-4">No obligation. No pressure. 100% free.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="What Our Customers Are Saying About Us…" subtitle="Real feedback from homeowners, business owners, and property managers across Houston." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
            View All Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* Industries Preview */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading title="Industries We Protect" subtitle="Custom security solutions for every sector — from homes to hospitals, schools to construction sites." />
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {industries.map((ind) => (
            <span key={ind} className="trust-badge">{ind}</span>
          ))}
        </div>
        <div className="text-center">
          <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
            View All Industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Frequently Asked Questions (FAQs)" />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="glass-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Google CTA */}
    <section className="section-padding bg-secondary">
      <div className="container-tight text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">Check Us Out on Google!</h2>
        <p className="text-muted-foreground mb-2">Where you can learn more about our:</p>
        <ul className="text-muted-foreground mb-6 space-y-1">
          <li>Company Information</li>
          <li>View Photos of Past Projects</li>
          <li>Reviews</li>
        </ul>
        <a
          href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-gradient inline-flex items-center gap-2"
        >
          View Our Google Page <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>

    <CTABlock />
  </Layout>
  );
};

export default Index;
