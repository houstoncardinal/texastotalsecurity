import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Shield, CheckCircle2, Clock, Users, Phone } from "lucide-react";

const benefits = [
  "Security Pro meets with you onsite at your home or business",
  "Talks about current security system, upgrades, or plans for a new one",
  "Examines layout and gathers information regarding equipment",
  "Comes up with solutions, ideas, and discusses a plan of action",
  "Absolutely no pressure and no obligation to purchase",
  "Residential and commercial properties welcome",
];

const testimonials = [
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "My friend referred me to Tim and Texas Total Security because they were pleased with the quality of security cameras. Tim came out to my home and provided me with the free security analysis. He was professional and courteous but really listened to what I needed.",
  },
  {
    name: "Homeowner",
    role: "Bellaire, TX",
    text: "After meeting up with the Texas Total Security team who actually came to the job site and explained what they can do, I chose them over my builder's security guy. What really stood out was how they described the process in detail and confidence.",
  },
];

const FreeAnalysis = () => {
  const schemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Free Security Analysis", href: "/free-analysis" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Free Security Analysis Houston TX | Local Alarm Company | Texas Total Security"
        description="Free onsite security analysis for Houston homes, businesses & communities. Licensed local experts — custom proposal, no pressure. Call (713) 387-9937."
        schemas={schemas}
      />
      <Breadcrumbs items={[{ name: "Free Security Analysis" }]} />

      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(0_85%_46%/0.15),transparent_60%)]" />
        <div className="container-tight px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="text-primary-foreground">
              <div className="trust-badge mb-6 bg-primary-foreground/10 text-primary-foreground">
                <Shield className="w-4 h-4 text-accent" /> 100% Free — No Obligation
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
                Free Onsite<br />
                <span className="text-gradient">Security Analysis</span>
              </h1>
              <p className="text-lg opacity-70 mb-8 max-w-lg leading-relaxed">
                A certified security specialist will visit your property, assess your vulnerabilities, and design a custom protection plan — completely free, with zero obligation.
              </p>

              <div className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm opacity-80">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold opacity-80">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold opacity-80">Locally owned & operated</span>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-32">
              <LeadForm
                title="Schedule Your Free Analysis"
                subtitle="Fill out the form and we'll contact you within 24 hours to schedule your visit."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Prefer to Call?</h2>
          <p className="text-muted-foreground mb-6">Speak directly with a security specialist to schedule your free analysis.</p>
          <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center gap-2 text-lg px-8 py-4">
            <Phone className="w-5 h-5" /> (713) 387-9937
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default FreeAnalysis;
