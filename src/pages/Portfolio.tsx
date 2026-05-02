import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo";
import { Camera, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Master-Planned Community Gate Security",
    type: "HOA / Community",
    challenge: "A 500+ home community in Katy needed to monitor multiple entry gates and reduce unauthorized vehicle access.",
    solution: "Installed a comprehensive LPR camera system at all four community entrances with 24/7 recording and remote access for property management.",
    systems: ["License Plate Recognition Cameras", "4K Security Cameras", "NVR with 90-Day Storage", "Remote Viewing Platform"],
    result: "78% reduction in unauthorized entry incidents within the first six months.",
  },
  {
    title: "Multi-Location Retail Surveillance",
    type: "Commercial / Retail",
    challenge: "A Houston-area retail chain needed unified surveillance across five locations with centralized remote monitoring.",
    solution: "Designed and installed a multi-site camera system with cloud-based remote access, allowing management to view all locations from a single interface.",
    systems: ["HD Security Cameras", "Cloud Remote Viewing", "POS-Area Cameras", "Active Deterrence"],
    result: "Significant reduction in shrinkage and improved employee accountability across all locations.",
  },
  {
    title: "Custom Residential Security System",
    type: "Residential",
    challenge: "A family in Sugar Land wanted comprehensive protection for their large property including smart home integration.",
    solution: "Installed a complete alarm system with 12 cameras, smart lock integration, video doorbell, and local 24/7 monitoring.",
    systems: ["Alarm System", "Security Cameras", "Smart Locks", "Video Doorbell", "24/7 Monitoring"],
    result: "Complete peace of mind with full mobile control and instant notifications for the entire family.",
  },
  {
    title: "Construction Site Security",
    type: "Commercial / Construction",
    challenge: "A general contractor needed temporary security for a 12-month commercial construction project in downtown Houston.",
    solution: "Deployed solar-powered cameras with active deterrence, cellular connectivity, and remote monitoring — no electrical infrastructure required.",
    systems: ["Solar-Powered Cameras", "Active Deterrence", "Cellular Connectivity", "Time-Lapse Recording"],
    result: "Zero theft or vandalism incidents during the entire construction period.",
  },
];

const portfolioSchemas = [
  generateLocalBusinessSchema(),
  generateItemListSchema(
    projects.map((p, i) => ({
      name: p.title,
      description: p.challenge,
      url: "/portfolio",
      position: i + 1,
    }))
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
  ]),
];

const Portfolio = () => (
  <Layout>
    <SEOHead
      title="Security System Portfolio | HOA Cameras, Security Poles & Alarm Installs | Texas Total Security"
      description="Browse Texas Total Security's portfolio of HOA security camera systems, CCTV pole installations, residential alarms, and commercial surveillance projects across Houston, TX."
      schemas={portfolioSchemas}
    />
    <PageHero
      title="Our Security Projects"
      subtitle="Real-world security solutions designed and installed by Texas Total Security. See how we protect Houston homes, businesses, and communities."
    />

    <section className="section-padding">
      <div className="container-tight">
        <div className="space-y-8">
          {projects.map((project, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="trust-badge text-xs">{project.type}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6">{project.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Challenge</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Solution</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Result</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.result}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Systems Installed</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.systems.map((s) => (
                        <span key={s} className="inline-block px-2 py-1 text-xs bg-secondary rounded-md text-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABlock title="Have a Security Project in Mind?" subtitle="Let's discuss your requirements. We'll design a custom solution for your property." />
  </Layout>
);

export default Portfolio;
