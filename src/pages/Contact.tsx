import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { Phone, Mail, MapPin, Clock, Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => (
  <Layout>
    <PageHero
      title="Reach Out to Texas Total Security for a Free Security Analysis"
      subtitle="Ready to protect your property? Get in touch for a free consultation, quote, or service request. We respond fast — because security doesn't wait."
      showCTA={false}
    />

    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Get in Touch</h2>
            <div className="space-y-6 mb-10">
              <a href="tel:7133879937" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">(713) 387-9937</p>
                  <p className="text-sm text-muted-foreground">Call us for immediate assistance</p>
                </div>
              </a>
              <a href="mailto:info@texastotalsecurity.com" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">info@texastotalsecurity.com</p>
                  <p className="text-sm text-muted-foreground">Email us your questions or project details</p>
                </div>
              </a>
              <a href="https://goo.gl/maps/vP7zqsAQH2yuo1ut8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">11331 Richmond Ave. #102</p>
                  <p className="text-sm text-muted-foreground">Houston, TX 77082</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fast Response</p>
                  <p className="text-sm text-muted-foreground">We respond to all inquiries within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center gap-4 mb-6">
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

          <LeadForm
            title="Send Us a Message"
            subtitle="Fill out the form and a security specialist will contact you within 24 hours."
          />
        </div>
      </div>
    </section>

    {/* Map */}
    <section className="bg-secondary">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-xl overflow-hidden h-64 sm:h-80">
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
