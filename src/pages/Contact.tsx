import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateContactPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Phone, Mail, MapPin, Clock, Shield, ExternalLink } from "lucide-react";

const contactSchemas = [
  generateLocalBusinessSchema(),
  generateContactPageSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]),
];

const Contact = () => (
  <Layout>
    <SEOHead
      title="Contact Texas Total Security | Houston Security Company | (713) 387-9937"
      description="Contact Houston's trusted security experts. Call (713) 387-9937 or email info@texastotalsecurity.com. Free onsite security analysis. Serving Houston & surrounding areas since 1994."
      schemas={contactSchemas}
    />
    <PageHero
      title="Reach Out to Texas Total Security"
      subtitle="Ready to protect your property? Get in touch for a free consultation, quote, or service request. We respond fast — because security doesn't wait."
      showCTA={false}
    />

    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Get in Touch</h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, href: "tel:7133879937", label: "(713) 387-9937", sub: "Call us for immediate assistance" },
                { icon: Mail, href: "mailto:info@texastotalsecurity.com", label: "info@texastotalsecurity.com", sub: "Email us your questions or project details" },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                    <c.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{c.label}</p>
                    <p className="text-sm text-muted-foreground">{c.sub}</p>
                  </div>
                </a>
              ))}
              <a href="https://goo.gl/maps/vP7zqsAQH2yuo1ut8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">11331 Richmond Ave. #102</p>
                  <p className="text-sm text-muted-foreground">Houston, TX 77082</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fast Response</p>
                  <p className="text-sm text-muted-foreground">We respond to all inquiries within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="glass-card-static p-6 flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-accent shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Licensed & Insured</p>
                <p className="text-xs text-muted-foreground">Texas License: LIC# B03066901</p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> View Our Google Page
            </a>
          </div>

          <LeadForm title="Send Us a Message" subtitle="Fill out the form and a security specialist will contact you within 24 hours." />
        </div>
      </div>
    </section>

    <section style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden h-64 sm:h-80" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.123456789!2d-95.5766137!3d29.7264855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQzJzM1LjMiTiA5NcKwMzQnMzUuOCJX!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Texas Total Security Location - 11331 Richmond Ave. #102, Houston, TX 77082"
          />
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
