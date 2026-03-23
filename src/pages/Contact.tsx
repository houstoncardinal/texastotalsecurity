import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import SectionHeading from "@/components/SectionHeading";
import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";

const Contact = () => (
  <Layout>
    <PageHero
      title="Contact Texas Total Security"
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Houston, Texas</p>
                  <p className="text-sm text-muted-foreground">Serving Houston & surrounding areas</p>
                </div>
              </div>
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

            <div className="glass-card p-6 flex items-center gap-4">
              <Shield className="w-8 h-8 text-accent shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Licensed & Insured</p>
                <p className="text-xs text-muted-foreground">Texas License: LIC# B03066901</p>
              </div>
            </div>
          </div>

          <LeadForm
            title="Send Us a Message"
            subtitle="Fill out the form and a security specialist will contact you within 24 hours."
          />
        </div>
      </div>
    </section>

    {/* Map Placeholder */}
    <section className="bg-secondary">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-xl bg-muted h-64 sm:h-80 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">Map: Serving Greater Houston Area</p>
            <p className="text-xs text-muted-foreground mt-1">Interactive map placeholder</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
