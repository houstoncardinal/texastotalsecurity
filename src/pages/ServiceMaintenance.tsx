import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Wrench, RefreshCw, CheckCircle2, Clock, Camera, Shield } from "lucide-react";

const services = [
  { icon: Wrench, title: "System Troubleshooting", desc: "Fast diagnosis and repair for alarm faults, camera issues, connectivity problems, and sensor malfunctions." },
  { icon: RefreshCw, title: "Firmware & Software Updates", desc: "Keep your system current with the latest firmware, security patches, and feature updates." },
  { icon: Camera, title: "Camera Maintenance", desc: "Lens cleaning, repositioning, night vision calibration, and weatherproofing checks for optimal performance." },
  { icon: Shield, title: "Alarm Servicing", desc: "Battery replacement, sensor testing, keypad calibration, and communication path verification." },
  { icon: Clock, title: "Preventive Inspections", desc: "Scheduled system health checks to catch issues before they become problems." },
  { icon: CheckCircle2, title: "Support Plans", desc: "Priority service agreements with guaranteed response times and discounted rates for ongoing maintenance." },
];

const maintenanceSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Security System Service & Maintenance Houston TX",
    "Professional security system maintenance, repair, and service in Houston, TX. Fast local response, expert technicians for alarm faults, camera issues, firmware updates & system upgrades.",
    "/service-maintenance",
    "Security System Maintenance",
    ["security system repair Houston TX", "alarm system maintenance Houston", "security camera repair Houston", "security system service Houston"]
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Service & Maintenance", href: "/service-maintenance" },
  ]),
];

const ServiceMaintenance = () => (
  <Layout>
    <SEOHead
      title="Security System Maintenance Houston TX | Local Alarm Company Service & Support | Texas Total Security"
      description="Professional security system maintenance & service in Houston, TX. Alarm servicing, camera maintenance, local alarm system support & upgrades. Houston's trusted local alarm company. Call (713) 387-9937."
      schemas={maintenanceSchemas}
    />
    <PageHero
      title="Service & Maintenance"
      subtitle="Your security system is an investment. Our ongoing service and maintenance programs ensure it performs at peak reliability — year after year."
      ctaText="Schedule a Service Call"
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Ongoing Support & Maintenance" subtitle="We stand behind every system we install with responsive, expert service." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
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
      <div className="container-tight max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">Already a Customer?</h2>
        <p className="text-muted-foreground mb-8">If you're experiencing an issue with your system or need to schedule routine maintenance, contact our support team directly.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center gap-2">
            Call Support: (713) 387-9937
          </a>
          <a href="mailto:info@texastotalsecurity.com" className="text-sm font-semibold text-accent">
            Email: info@texastotalsecurity.com
          </a>
        </div>
      </div>
    </section>

    <CTABlock />
  </Layout>
);

export default ServiceMaintenance;
