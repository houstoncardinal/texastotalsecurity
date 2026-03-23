import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import TestimonialCard from "@/components/TestimonialCard";
import { Shield, CheckCircle2, Clock, Users, Phone, ArrowRight } from "lucide-react";

const benefits = [
  "A certified security specialist visits your property in person",
  "We identify vulnerable entry points, blind spots, and security gaps",
  "You receive a custom system design tailored to your property",
  "Detailed proposal with transparent pricing — no hidden fees",
  "Absolutely no pressure and no obligation to purchase",
  "Residential and commercial properties welcome",
];

const testimonials = [
  { name: "Michael T.", role: "Homeowner, Sugar Land", text: "The security analysis was thorough and eye-opening. They found vulnerabilities I never would have noticed. Zero pressure — just honest, expert advice." },
  { name: "David R.", role: "Property Manager, Houston", text: "They came out, surveyed all three of my properties, and delivered a clear proposal for each. Professional from start to finish." },
];

const FreeAnalysis = () => (
  <Layout>
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(205_100%_50%/0.15),transparent_60%)]" />
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
                <span className="text-sm font-semibold opacity-80">30+ years of experience</span>
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
          {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
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

export default FreeAnalysis;
