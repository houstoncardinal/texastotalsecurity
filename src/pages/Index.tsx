import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import TrustBar from "@/components/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import { Link } from "react-router-dom";
import { generateLocalBusinessSchema, generateFAQSchema, generateOrganizationSchema } from "@/lib/seo";
import {
  Shield, Camera, Home, Building2, Users, Radio, ArrowRight, Phone,
  PhoneCall, ClipboardCheck, Wrench, HeadphonesIcon, CheckCircle2, Star,
} from "lucide-react";

const processSteps = [
  { icon: PhoneCall, title: "Initial Call", desc: "Speak with a security specialist about your needs and schedule your free analysis." },
  { icon: ClipboardCheck, title: "Free Onsite Analysis", desc: "Our expert visits your property to assess vulnerabilities and design a custom solution." },
  { icon: Wrench, title: "Professional Installation", desc: "Certified technicians install your system with precision and clean workmanship." },
  { icon: HeadphonesIcon, title: "Ongoing Support", desc: "24/7 local monitoring, maintenance, and fast-response support for the life of your system." },
];

const testimonials = [
  { name: "Michael & Sarah T.", role: "Homeowners, Sugar Land", text: "Texas Total Security designed a system that perfectly fits our home. Their team was professional, thorough, and the monitoring gives us real peace of mind." },
  { name: "David R.", role: "Property Manager, Houston", text: "We switched from a national provider and the difference is night and day. Local support, faster response, and they actually know our properties." },
  { name: "Lisa M.", role: "HOA Board President, Katy", text: "The gate camera system they installed for our community has dramatically reduced incidents. Their team is responsive and the technology is impressive." },
];

const industries = [
  "Residential", "HOAs", "Retail", "Medical", "Schools", "Restaurants",
  "Industrial", "Hotels", "Construction", "Parking", "Government", "Worship",
];

const faqs = [
  { q: "Do you offer free security assessments?", a: "Yes. We provide a complimentary onsite security analysis for every property. Our specialists evaluate your vulnerabilities and design a custom system — no obligation, no pressure." },
  { q: "What areas do you serve?", a: "We serve Houston and surrounding areas including Sugar Land, Katy, The Woodlands, Pearland, Cypress, Bellaire, Missouri City, Pasadena, League City, and more." },
  { q: "Can you take over my existing alarm system?", a: "Absolutely. We regularly take over systems from other providers — often at a lower cost with better local monitoring. We'll evaluate your current equipment and activate it on our local monitoring platform." },
  { q: "What makes your monitoring different?", a: "Unlike national companies that route calls through distant call centers, our monitoring is handled locally in Houston. This means faster response times, better communication with local authorities, and real accountability." },
];

const Index = () => {
  const faqSchemaItems = faqs.map(f => ({ question: f.q, answer: f.a }));
  const schemas = [generateOrganizationSchema(), generateLocalBusinessSchema(), generateFAQSchema(faqSchemaItems)];

  return (
  <Layout>
    <SEOHead
      title="Texas Total Security | Houston Alarm, Camera & Monitoring Systems"
      description="Houston's trusted security experts for 30+ years. Custom alarm systems, security cameras, 24/7 local monitoring for homes, businesses, and HOAs. Free onsite security analysis. Call (713) 387-9937."
      schemas={schemas}
    />
    {/* Hero */}
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(205_100%_50%/0.15),transparent_60%)]" />
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative z-10">
        <div className="max-w-3xl">
          <div className="trust-badge mb-6 bg-primary-foreground/10 text-primary-foreground">
            <Shield className="w-4 h-4 text-accent" />
            Houston's Trusted Security Experts — 30+ Years
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Custom Security Systems<br />
            <span className="text-gradient">Built for Houston</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-xl mb-8 leading-relaxed">
            Alarm systems, surveillance, and 24/7 local monitoring designed to protect your home, business, or community. No contracts sold to national companies — ever.
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
          title="Comprehensive Security Solutions"
          subtitle="From residential alarm systems to enterprise-grade commercial surveillance, we design and install custom protection for every property type."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard icon={Shield} title="Alarm Systems" description="Custom alarm design, installation, and local monitoring for homes and businesses. Hardwired, wireless, and hybrid solutions." href="/alarm-systems" />
          <ServiceCard icon={Camera} title="Security Camera Systems" description="HD surveillance, license plate cameras, PTZ, active deterrence, and remote viewing — professionally installed and supported." href="/security-cameras" />
          <ServiceCard icon={Home} title="Residential Security" description="Whole-home protection with smart integration, environmental sensors, and 24/7 monitoring tailored to your family's needs." href="/residential-security" />
          <ServiceCard icon={Building2} title="Commercial Security" description="Scalable security for offices, retail, industrial sites, and multi-location businesses. Custom-designed for your operations." href="/commercial-security" />
          <ServiceCard icon={Users} title="HOA Security" description="Gate cameras, license plate recognition, common area surveillance, and community-wide security systems for property managers and boards." href="/hoa-security" />
          <ServiceCard icon={Radio} title="Monitoring Services" description="24/7 local in-house monitoring from Houston — not a distant national call center. Faster dispatch, real accountability." href="/monitoring-services" />
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading
          title="Why Houston Trusts Texas Total Security"
          subtitle="We're not a national franchise. We're your neighbors — and we've been protecting Houston properties for over three decades."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Local Company, Local Monitoring", desc: "Our monitoring center is right here in Houston. When seconds matter, local response makes all the difference." },
            { title: "30+ Years of Experience", desc: "Three decades of designing, installing, and servicing security systems across the greater Houston area." },
            { title: "No Contracts Sold to Nationals", desc: "We never sell your monitoring contract to a national company. Your account stays with us — always." },
            { title: "Custom-Designed Systems", desc: "Every property is different. We design systems tailored to your specific vulnerabilities, layout, and needs." },
            { title: "Residential & Commercial", desc: "From single-family homes to industrial complexes, we have the expertise to protect any property type." },
            { title: "Fast, Reliable Support", desc: "When you call, you talk to a real person who knows your system. No hold queues, no runaround." },
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
          title="How It Works"
          subtitle="From your first call to 24/7 monitored protection — we make the process simple, transparent, and stress-free."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading title="What Our Clients Say" subtitle="Real feedback from homeowners, business owners, and property managers across Houston." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>

    {/* Industries Preview */}
    <section className="section-padding">
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

    {/* FAQ Preview */}
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading title="Common Questions" />
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

    <CTABlock />
  </Layout>
);

export default Index;
