import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";
import {
  generateLocalBusinessSchema, generateFAQSchema, generateServiceSchema, generateOrganizationSchema
} from "@/lib/seo";
import {
  Shield, Camera, Home, Building2, Users, Radio, Wrench,
  ArrowRight, Phone, CheckCircle2, Clock, MapPin, Star,
  Cable, MonitorSpeaker, Settings, ClipboardCheck,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Alarm Systems & Takeovers",
    href: "/alarm-systems",
    desc: "Hardwired alarm installation, existing-system takeovers, repair, cellular communication, and 24/7 professional monitoring.",
    features: ["Hardwired alarm systems", "System takeovers", "Sensor and zone repair", "Professional monitoring"],
  },
  {
    icon: Camera,
    title: "Security Camera Systems",
    href: "/security-cameras",
    desc: "Commercial CCTV infrastructure, 4K IP cameras, LPR, NVR recording, remote viewing, and video monitoring workflows.",
    features: ["Hardwired CCTV", "4K IP cameras", "License plate recognition", "Remote viewing"],
  },
  {
    icon: Radio,
    title: "Monitoring Services",
    href: "/monitoring-services",
    desc: "Professional alarm monitoring with accountable signal handling, dispatch support, and local account management.",
    features: ["24/7 monitoring", "Cellular communication", "Video verification options", "Local support"],
  },
  {
    icon: Home,
    title: "Residential Solutions",
    href: "/residential",
    desc: "Security systems for Houston homes, condos, estates, and residential properties that need reliable protection.",
    features: ["Home alarm systems", "Security cameras", "Smart notifications", "Clean installation"],
  },
  {
    icon: Building2,
    title: "Commercial Solutions",
    href: "/commercial",
    desc: "Security for offices, retail, warehouses, industrial sites, and multi-location business operations.",
    features: ["Commercial alarms", "Camera systems", "Access coverage planning", "Multi-site support"],
  },
  {
    icon: Users,
    title: "HOA Security Solutions",
    href: "/hoa-security",
    desc: "Gate cameras, LPR, common-area coverage, and board-ready security planning for Houston communities.",
    features: ["Gate cameras", "LPR systems", "Amenity coverage", "Board reporting support"],
  },
  {
    icon: Camera,
    title: "Security Pole Configurator",
    href: "/security-pole-configurator",
    desc: "Interactive security pole planning for camera placement, lighting, deterrence equipment, and site design.",
    features: ["3D pole planning", "Camera placement", "Lighting layout", "System estimate"],
  },
  {
    icon: Wrench,
    title: "Service & Maintenance",
    href: "/service-maintenance",
    desc: "Troubleshooting, upgrades, camera service, alarm repairs, and ongoing system support for existing clients.",
    features: ["System troubleshooting", "Camera repair", "Alarm repair", "Preventive support"],
  },
];

const trustStats = [
  { label: "Houston", sublabel: "local account management" },
  { label: "B03066901", sublabel: "licensed and insured" },
  { label: "CCTV + Alarm", sublabel: "integrated expertise" },
  { label: "24/7", sublabel: "monitoring options" },
];

const processSteps = [
  { icon: MapPin, title: "Site Assessment", desc: "We review property layout, risk areas, existing equipment, network paths, and operating requirements." },
  { icon: ClipboardCheck, title: "System Design", desc: "You receive a focused recommendation for alarm coverage, CCTV infrastructure, monitoring, and service priorities." },
  { icon: Cable, title: "Professional Installation", desc: "Licensed technicians install, route, test, label, and commission the system for dependable use." },
  { icon: Settings, title: "Support & Optimization", desc: "We provide account support, troubleshooting, monitoring changes, and long-term system maintenance." },
];

const faqs = [
  { question: "What security services does Texas Total Security provide?", answer: "We provide alarm systems and takeovers, security camera systems, monitoring services, residential security, commercial security, HOA security, security pole planning, and service and maintenance." },
  { question: "Do you serve commercial properties and HOAs in Houston?", answer: "Yes. We work with Houston businesses, HOAs, property managers, commercial facilities, residential clients, and multi-site operators." },
  { question: "Can you take over an existing alarm or camera system?", answer: "In many cases, yes. We evaluate existing equipment, identify what can be reused, and recommend repairs, upgrades, or replacement where needed." },
  { question: "Do you provide free onsite assessments?", answer: "Yes. We provide onsite security assessments for qualified Houston-area properties so recommendations are based on the actual layout and risks." },
];

const Services = () => {
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateServiceSchema("Security Services Houston TX", "Alarm systems, security camera systems, monitoring, HOA security, commercial security, residential security, security poles, and maintenance in Houston, TX.", "/services"),
    generateFAQSchema(faqs),
  ];

  return (
    <Layout>
      <SEOHead
        title="Security Services Houston TX | Alarm, CCTV, Monitoring & HOA Security"
        description="Texas Total Security provides Houston alarm systems, CCTV security camera systems, monitoring services, residential security, commercial security, HOA security, security pole planning, and service maintenance."
        schemas={schemas}
      />

      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.9)_48%,rgba(10,10,10,0.72)_100%)]" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                Security Services · Houston, TX
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Integrated security systems for Houston homes, HOAs, and businesses.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Texas Total Security designs, installs, monitors, and services hardwired alarm systems, CCTV camera systems, security poles, and property-wide security infrastructure.
            </p>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
              {trustStats.map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-white">{stat.label}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{stat.sublabel}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
                <Phone className="w-4 h-4" /> Call (713) 387-9937
              </a>
              <Link to="/free-analysis" className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Request Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
                <Star className="w-3.5 h-3.5 text-red-600" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">Service Menu</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
                One local team for the systems that protect your property.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The services below match the Services menu in the site navigation. Each page is focused on a specific security need, while our field team can design integrated systems across multiple categories.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              {services.map((service) => (
                <Link
                  key={service.href}
                  to={service.href}
                  className="group bg-white p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-red-50 border border-red-100">
                      <service.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-gray-950 leading-tight">{service.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{service.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-1.5">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-stretch">
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              <div className="absolute right-0 top-0 h-40 w-40 bg-red-600/10 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-red-600/10 border border-red-500/25">
                  <MonitorSpeaker className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">Assessment · Design · Install · Support</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                  Professional security is a system, not a collection of devices.
                </h2>
                <p className="mt-4 text-white/60 leading-relaxed">
                  We connect the practical pieces: alarm zones, camera coverage, LPR, monitoring, remote access, service requirements, and long-term reliability.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {processSteps.map((step) => (
                <div key={step.title} className="bg-black p-5 hover:bg-white/[0.045] transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-red-500/10 border border-red-500/20">
                      <step.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold leading-tight">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
                Start with the right service. We will connect the rest.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                If you are unsure which page fits your project, call us. A Houston-based specialist can route you to the correct service and explain what information is needed for a productive site assessment.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link to="/free-analysis" className="flex items-center justify-between border border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-950 hover:border-red-200 hover:bg-red-50 transition-colors">
                Request Free Analysis <ArrowRight className="w-4 h-4 text-red-600" />
              </Link>
              <a href="tel:7133879937" className="flex items-center justify-between border border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-950 hover:border-red-200 hover:bg-red-50 transition-colors">
                Call (713) 387-9937 <Phone className="w-4 h-4 text-red-600" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} />
    </Layout>
  );
};

export default Services;
