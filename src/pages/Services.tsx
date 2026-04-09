import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import {
  generateLocalBusinessSchema, generateFAQSchema, generateServiceSchema, generateOrganizationSchema
} from "@/lib/seo";
import {
  Shield, Camera, Home, Building2, Users, Radio, Wrench,
  ArrowRight, Phone, CheckCircle2, Clock, MapPin, PhoneCall,
  Eye, Lock, Zap, Wifi, Sun, Video, MonitorSpeaker,
  Thermometer, Baby, AlertTriangle, Keyboard, Bell,
  RefreshCw, ChevronRight, Star, Play, Calendar,
  FileText, Award, Headphones, Mic, Monitor, Car,
  Building, Warehouse, Factory, Store, Crosshair,
  Layers, Gauge, Battery, Signal,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Alarm Systems",
    href: "/alarm-systems",
    desc: "Custom design, installation & local monitoring",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    features: ["Hardwired & Wireless", "24/7 Local Monitoring", "System Takeover", "Panic & Duress"],
  },
  {
    icon: Camera,
    title: "Security Cameras",
    href: "/security-cameras",
    desc: "HD surveillance & remote viewing",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    features: ["HD & 4K Cameras", "License Plate Recognition", "Active Deterrence", "Remote Viewing"],
  },
  {
    icon: Home,
    title: "Residential",
    href: "/residential",
    desc: "Whole-home protection systems",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    features: ["Whole-Home Alarms", "Surveillance Cameras", "Smart Home Integration", "Environmental Sensors"],
  },
  {
    icon: Building2,
    title: "Commercial",
    href: "/commercial",
    desc: "Scalable business security",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    features: ["Access Control", "Active Deterrence", "Video Monitoring", "Multi-Location Systems"],
  },
  {
    icon: Users,
    title: "HOA Security",
    href: "/hoa-security",
    desc: "Gate cameras & community security",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    features: ["Gate Cameras", "LPR Systems", "Pool Monitoring", "Common Area Security"],
  },
  {
    icon: Radio,
    title: "Monitoring",
    href: "/monitoring-services",
    desc: "24/7 local dispatch center",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    features: ["24/7 Coverage", "Video Verification", "Video Guard Patrol", "Custom Monitoring"],
  },
  {
    icon: Wrench,
    title: "Service & Maintenance",
    href: "/service-maintenance",
    desc: "Ongoing system support",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    features: ["System Troubleshooting", "Firmware Updates", "Preventive Inspections", "Support Plans"],
  },
];

const whyChooseUs = [
  { icon: Clock, title: "Since 1994", desc: "30+ years protecting Houston" },
  { icon: MapPin, title: "Locally Owned", desc: "Never sell your contract" },
  { icon: Headphones, title: "Local Monitoring", desc: "Our own dispatch center" },
  { icon: Shield, title: "Licensed & Insured", desc: "LIC# B03066901" },
];

const alarmFeatures = [
  { icon: Shield, title: "Hardwired Systems", desc: "Extremely reliable for new construction" },
  { icon: Wifi, title: "Wireless Systems", desc: "Ideal for existing homes" },
  { icon: RefreshCw, title: "Hybrid Systems", desc: "Best of both worlds" },
  { icon: AlertTriangle, title: "Panic Buttons", desc: "Silent and audible alerts" },
  { icon: Baby, title: "Medical Alerts", desc: "Pendants and wristbands" },
  { icon: Bell, title: "Smart Notifications", desc: "Real-time alerts to your phone" },
];

const cameraFeatures = [
  { icon: Monitor, title: "HD & 4K", desc: "Crystal-clear footage" },
  { icon: Car, title: "License Plate", desc: "LPR cameras for gates" },
  { icon: Zap, title: "Active Deterrence", desc: "Sirens and strobes" },
  { icon: Sun, title: "Solar Powered", desc: "Off-grid surveillance" },
  { icon: Video, title: "PTZ Cameras", desc: "Pan-tilt-zoom coverage" },
  { icon: Eye, title: "Night Vision", desc: "Full-color after dark" },
];

const processSteps = [
  { num: "01", title: "Free Consultation", desc: "Schedule your free onsite security analysis" },
  { num: "02", title: "Custom Design", desc: "We create a system tailored to your needs" },
  { num: "03", title: "Expert Installation", desc: "Licensed technicians handle everything" },
  { num: "04", title: "24/7 Protection", desc: "Local monitoring from day one" },
];

const quickLinks = [
  { icon: Calendar, title: "Schedule Free Analysis", href: "/free-analysis", highlight: true },
  { icon: Phone, title: "Call (713) 387-9937", href: "tel:7133879937", highlight: false },
  { icon: FileText, title: "View Our Portfolio", href: "/portfolio", highlight: false },
  { icon: Star, title: "Read Our Reviews", href: "/reviews", highlight: false },
];

const equipmentList = [
  "Alarm Keypad with Panic Button",
  "Key Fob Remote Controls",
  "Medical Alert Pendants",
  "Motion Detectors (PIR)",
  "Glass Break Sensors",
  "Door & Window Sensors",
  "Indoor & Outdoor Sirens",
  "Alarm Strobes",
  "Smart Home Integration",
  "Cellular Backup Module",
  "Video Verification Cameras",
  "24/7 Monitoring Service",
];

const faqs = [
  { question: "What types of properties do you service?", answer: "We service both residential and commercial properties across Greater Houston, including single-family homes, apartments, HOAs, small businesses, industrial facilities, and government buildings." },
  { question: "Do you offer free consultations?", answer: "Yes! We provide free onsite security surveys where a local professional visits your property, assesses your needs, and provides a customized proposal at no charge." },
  { question: "Can you take over my existing system?", answer: "In most cases, yes. We can often take over systems from ADT, Brinks, Vivint, and others, saving you the cost of full replacement." },
  { question: "How quickly can I get installed?", answer: "Most residential systems can be installed within hours to a full day. Commercial installations are scheduled based on your operational needs." },
];

const Services = () => {
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateServiceSchema("Security Services", "Complete security solutions for homes and businesses", "/services"),
    generateFAQSchema(faqs),
  ];

  return (
    <Layout>
      <SEOHead
        title="Security Services Houston TX | Local Alarm Company, HOA Cameras & Security Poles | Texas Total Security"
        description="Complete security services in Houston, TX: local alarm systems, security camera installations, HOA security camera systems, security poles, CCTV pole installation, switch alarm companies & 24/7 local monitoring since 1994."
        schemas={schemas}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt="Houston security systems"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/60" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, hsl(0 85% 45% / 0.15), transparent 60%)" }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Our Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-[1.02] tracking-tight mb-6">
              Complete Security
              <br />
              <span className="bg-gradient-to-r from-accent to-red-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-8 max-w-xl">
              From alarm systems to surveillance cameras — professional installation, 24/7 local monitoring, and ongoing support for Houston homes and businesses since 1994.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/free-analysis" className="group btn-primary-gradient inline-flex items-center justify-center gap-2 text-base px-8 py-4">
                Schedule Free Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:7133879937" className="btn-outline-light inline-flex items-center justify-center gap-2 text-base px-8 py-4">
                <Phone className="w-5 h-5" />
                (713) 387-9937
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {["Free Onsite Analysis", "No Long-Term Contracts", "24/7 Local Dispatch"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 text-xs font-medium text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white/30 rotate-90" />
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────── */}
      <section className="py-5 bg-black/95 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{item.title}</p>
                  <p className="text-[10px] text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ──────────────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-tight">
          <SectionHeading
            eyebrow="What We Offer"
            title="Professional Security Services"
            subtitle="Everything you need for complete protection — all from one local Houston company"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.href}
                to={service.href}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Colored accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${service.bgColor} border ${service.borderColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-7 h-7 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{service.desc}</p>
                
                <div className="space-y-2 mb-5">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
            
            {/* CTA Card */}
            <Link
              to="/free-analysis"
              className="group relative bg-gradient-to-br from-accent to-red-600 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between min-h-[320px]"
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
              <div className="relative z-10">
                <Calendar className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-display font-bold mb-2">Get Your Free Analysis</h3>
                <p className="text-white/80 text-sm">Schedule a free onsite security assessment with our local experts</p>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:gap-3 transition-all mt-4">
                Schedule Now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── RESIDENTIAL VS COMMERCIAL ──────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Residential */}
            <Link
              to="/residential"
              className="group relative rounded-3xl overflow-hidden min-h-[400px] flex items-end"
            >
              <img
                src="/residential/imgi_33_luxury-home-6886153_1280.jpg"
                alt="Residential security"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 p-8 w-full">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Residential Security</h3>
                <p className="text-white/70 mb-4">Protect your family with custom-designed alarm systems, cameras, and smart home integration</p>
                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                  Explore Residential <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
            
            {/* Commercial */}
            <Link
              to="/commercial"
              className="group relative rounded-3xl overflow-hidden min-h-[400px] flex items-end"
            >
              <img
                src="/commercial/imgi_6_com6-scaled.jpg"
                alt="Commercial security"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 p-8 w-full">
                <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Commercial Security</h3>
                <p className="text-white/70 mb-4">Enterprise-grade solutions for businesses of every size and industry</p>
                <div className="flex items-center gap-2 text-white/80 font-semibold group-hover:gap-3 transition-all">
                  Explore Commercial <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container-tight">
          <SectionHeading
            eyebrow="Our Process"
            title="How It Works"
            subtitle="Simple, transparent, and stress-free from first call to 24/7 protection"
            light
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.num} className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <span className="text-5xl font-display font-bold bg-gradient-to-r from-accent/60 to-accent/30 bg-clip-text text-transparent mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALARM FEATURES ─────────────────────────────── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Alarm Systems</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                Professional Alarm Installation
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Custom-designed alarm systems for every property type. We install hardwired, wireless, and hybrid systems with professional-grade equipment and 24/7 local monitoring.
              </p>
              <Link to="/alarm-systems" className="btn-primary-gradient inline-flex items-center gap-2">
                Learn About Alarms <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {alarmFeatures.map((feature) => (
                <Link
                  key={feature.title}
                  to="/alarm-systems"
                  className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-accent/30 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center mb-3 group-hover:bg-accent group-hover:text-white transition-colors">
                    <feature.icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMERA FEATURES ───────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              {cameraFeatures.map((feature) => (
                <Link
                  key={feature.title}
                  to="/security-cameras"
                  className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <feature.icon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </Link>
              ))}
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
                <Camera className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Security Cameras</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
                HD & 4K Surveillance
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Crystal-clear surveillance systems designed to eliminate blind spots. From single cameras to enterprise multi-site systems, we survey, design, and install for maximum coverage.
              </p>
              <Link to="/security-cameras" className="btn-primary-gradient inline-flex items-center gap-2">
                Learn About Cameras <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MONITORING CALLOUT ────────────────────────── */}
      <section className="section-padding bg-gradient-to-r from-accent to-red-600 text-white">
        <div className="container-tight">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <Headphones className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-2">24/7 Local Monitoring</h3>
                <p className="text-white/80">Real operators. Local dispatch. Faster response times.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/monitoring-services" className="bg-white text-accent font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:7133879937" className="bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT & FEATURES ─────────────────────── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">What We Install</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {equipmentList.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-accent/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  link.href.startsWith("http") || link.href.startsWith("tel") ? (
                    <a
                      key={link.title}
                      href={link.href}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${
                        link.highlight
                          ? "bg-accent text-white border-accent hover:bg-accent/90"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className={`w-5 h-5 ${link.highlight ? "text-white" : "text-gray-400"}`} />
                        <span className={`font-semibold ${link.highlight ? "text-white" : "text-gray-900"}`}>{link.title}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${link.highlight ? "text-white" : "text-gray-400"}`} />
                    </a>
                  ) : (
                    <Link
                      key={link.title}
                      to={link.href}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${
                        link.highlight
                          ? "bg-accent text-white border-accent hover:bg-accent/90"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className={`w-5 h-5 ${link.highlight ? "text-white" : "text-gray-400"}`} />
                        <span className={`font-semibold ${link.highlight ? "text-white" : "text-gray-900"}`}>{link.title}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${link.highlight ? "text-white" : "text-gray-400"}`} />
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ───────────────────────────────── */}
      <section className="section-padding bg-gray-50">
        <div className="container-tight max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Get Your Free Security Analysis
            </h2>
            <p className="text-gray-500">Tell us about your property and we'll design the perfect system — no obligation, no pressure.</p>
          </div>
          <LeadForm
            title=""
            subtitle=""
          />
        </div>
      </section>

      <FAQSection items={faqs} />
      <CTABlock />
    </Layout>
  );
};

export default Services;
