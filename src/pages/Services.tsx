import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import {
  Shield, Camera, Home, Building2, Users, Radio, Wrench,
  ArrowRight, Phone, CheckCircle2, Clock, MapPin, PhoneCall,
  Eye, Lock, Zap, Wifi, Sun, Video, MonitorSpeaker,
  Thermometer, Baby, AlertTriangle, Keyboard, Bell,
  RefreshCw, ChevronRight, Star,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Alarm Systems",
    href: "/alarm-systems",
    desc: "Custom design, installation & local monitoring",
    fullDesc: "Professional installation of hardwired, wireless, and hybrid alarm systems tailored to your property. Our alarm systems include 24/7 local monitoring with fast dispatch.",
    features: ["Hardwired & Wireless Systems", "24/7 Local Monitoring", "System Takeover", "Panic & Duress Buttons", "Smart Keypads", "Glass Break & Sensors"],
  },
  {
    icon: Camera,
    title: "Security Camera Systems",
    href: "/security-cameras",
    desc: "HD surveillance & remote viewing",
    fullDesc: "Crystal-clear HD & 4K surveillance systems with professional installation. View all cameras from your phone, tablet, or computer anywhere in the world.",
    features: ["HD & 4K Cameras", "License Plate Recognition", "Active Deterrence", "Solar Camera Systems", "PTZ & Fisheye", "Remote Viewing"],
  },
  {
    icon: Home,
    title: "Residential Security",
    href: "/residential",
    desc: "Whole-home protection systems",
    fullDesc: "Complete residential security solutions including whole-home alarm systems, surveillance cameras, smart home integration, and environmental monitoring.",
    features: ["Whole-Home Alarms", "Surveillance Cameras", "Smart Home Integration", "Environmental Sensors", "Family Safety Features", "Smart Locks"],
  },
  {
    icon: Building2,
    title: "Commercial Security",
    href: "/commercial",
    desc: "Scalable business security solutions",
    fullDesc: "Enterprise-grade security solutions for businesses of every size. From small retail stores to large industrial complexes and government buildings.",
    features: ["Commercial Alarms", "Access Control", "Active Deterrence", "Video Monitoring", "Networking Infrastructure", "Multi-Location Systems"],
  },
  {
    icon: Users,
    title: "HOA Security Solutions",
    href: "/hoa-security",
    desc: "Gate cameras & community-wide security",
    fullDesc: "Comprehensive security solutions for homeowners associations, apartment complexes, and gated communities. Protect your residents and property values.",
    features: ["Gate Cameras", "Community Surveillance", "Pool Area Monitoring", "Common Area Security", "License Plate Recognition", "Remote Monitoring"],
  },
  {
    icon: Radio,
    title: "Monitoring Services",
    href: "/monitoring-services",
    desc: "24/7 local dispatch center",
    fullDesc: "Houston-based monitoring center with real human operators. Faster response times, direct local dispatch, and personal accountability.",
    features: ["24/7/365 Coverage", "Video Verification", "Alarm Monitoring", "Video Guard Patrol", "Custom Monitoring", "Multiple Communication Paths"],
  },
  {
    icon: Wrench,
    title: "Service & Maintenance",
    href: "/service-maintenance",
    desc: "Ongoing system support & upkeep",
    fullDesc: "Keep your security system performing at peak reliability with our comprehensive maintenance programs, troubleshooting, and support plans.",
    features: ["System Troubleshooting", "Firmware Updates", "Camera Maintenance", "Alarm Servicing", "Preventive Inspections", "Support Plans"],
  },
];

const whyChooseUs = [
  {
    icon: Clock,
    title: "Since 1994",
    desc: "Over 30 years of experience protecting Houston homes and businesses",
  },
  {
    icon: MapPin,
    title: "Locally Owned",
    desc: "Houston-based company that never sells your contract to a national provider",
  },
  {
    icon: PhoneCall,
    title: "Local Monitoring",
    desc: "Our own dispatch center with operators who know your neighborhood",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    desc: "Fully licensed security professionals (LIC# B03066901)",
  },
];

const faqs = [
  {
    question: "What types of properties do you service?",
    answer: "We service both residential and commercial properties across the Greater Houston area, including single-family homes, apartments, condominiums, HOAs, small businesses, industrial facilities, government buildings, and more.",
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We provide free onsite security surveys where one of our local professionals visits your property, assesses your security needs, and provides a customized proposal — at no charge and no obligation.",
  },
  {
    question: "Can you take over my existing security system?",
    answer: "In most cases, yes. We can often take over alarm systems from ADT, Brinks, Vivint, and other providers, saving you the cost of a full replacement while providing better local monitoring service.",
  },
  {
    question: "How quickly can I get a system installed?",
    answer: "Most residential systems can be installed within a few hours to a full day, depending on property size. Commercial installations are scheduled based on your operational needs.",
  },
  {
    question: "What's included in your monitoring service?",
    answer: "Our monitoring includes 24/7 alarm monitoring, video verification (double-verified), video guard patrol services, and custom monitoring for specific environments. All backed by our local Houston dispatch team.",
  },
  {
    question: "Do you offer maintenance plans?",
    answer: "Yes. We offer support plans with priority service, guaranteed response times, and discounted rates for ongoing maintenance. We also provide troubleshooting, firmware updates, and preventive inspections.",
  },
];

const testimonials = [
  {
    name: "Michael R.",
    location: "Sugar Land, TX",
    text: "Texas Total Security installed our complete home security system. Professional installation, great equipment, and the local monitoring gives us real peace of mind.",
    rating: 5,
  },
  {
    name: "Jennifer T.",
    location: "The Woodlands, TX",
    text: "They took over our existing alarm system from ADT and it was seamless. Better monitoring, better service, and no new equipment costs.",
    rating: 5,
  },
  {
    name: "David K.",
    location: "Katy, TX",
    text: "Commercial installation for our office complex was done on time and on budget. The active deterrence cameras have virtually eliminated our after-hours incidents.",
    rating: 5,
  },
];

const Services = () => {
  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt="Professional security systems protecting Houston properties"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0.40) 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 65% 50% at 15% 65%, hsl(0 85% 45% / 0.16), transparent 60%)" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Our Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.06] tracking-tight mb-6">
              Complete Security Solutions for{" "}
              <span style={{ color: "hsl(var(--accent))" }}>Houston, TX</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-2xl">
              From alarm systems and security cameras to 24/7 local monitoring and ongoing maintenance — Texas Total Security delivers professional, customized security solutions for homes and businesses across Greater Houston since 1994.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2">
                Get a Free Security Analysis <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:7133879937" className="btn-outline-light text-sm">
                <Phone className="w-4 h-4" /> (713) 387-9937
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────── */}
      <section className="py-6 border-b border-gray-100" style={{ background: "hsl(0 0% 4%)" }}>
        <div className="container-tight">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-tight max-w-4xl mx-auto text-center">
          <div className="divider-accent" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-5">
            Everything You Need for Complete Protection
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Texas Total Security offers the full spectrum of security services — from alarm systems and surveillance cameras to access control, smart home integration, and 24/7 local monitoring. Every solution is custom-designed for your property, professionally installed, and backed by our Houston-based team.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ──────────────────────────────────── */}
      <section className="section-padding-sm" style={{ background: "var(--gradient-surface)" }}>
        <div className="container-tight">
          <SectionHeading
            title="Our Security Services"
            subtitle="Comprehensive protection for every aspect of your security needs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-7 overflow-hidden relative"
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.05), 0 16px 40px rgba(0,0,0,0.09)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-5 group-hover:bg-accent/14 transition-colors duration-300 border border-accent/10">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-[17px] text-gray-900 leading-snug mb-2 tracking-tight">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{service.fullDesc}</p>
                <div className="space-y-1.5 mb-5">
                  {service.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="text-xs text-gray-500">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-xs text-accent font-medium">+{service.features.length - 3} more</span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-300 mt-auto">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED SERVICES ──────────────────────────────── */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionHeading
            title="Alarm System Services"
            subtitle="Professional alarm installation, monitoring, and system takeover for Houston properties"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our alarm systems are custom-designed for each property, whether residential or commercial. We install hardwired, wireless, and hybrid systems with professional-grade equipment and 24/7 local monitoring.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Alarm Installation", desc: "Professional installation of hardwired, wireless, and hybrid alarm systems" },
                  { icon: Radio, title: "24/7 Local Monitoring", desc: "Houston-based monitoring with fast local dispatch" },
                  { icon: RefreshCw, title: "System Takeover", desc: "Take over existing systems from ADT, Brinks, Vivint & more" },
                  { icon: Wifi, title: "Wireless Systems", desc: "Modern wireless with cellular backup" },
                  { icon: AlertTriangle, title: "Panic & Duress", desc: "Panic buttons, key fobs, and silent duress codes" },
                  { icon: Keyboard, title: "Smart Keypads", desc: "Touchscreen keypads with user codes and schedules" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/15 transition-colors">
                      <item.icon className="w-4.5 h-4.5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/alarm-systems" className="btn-primary-gradient inline-flex items-center gap-2 mt-8">
                Learn About Alarm Systems <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">Alarm Equipment We Install</h3>
              {[
                "Alarm Systems (Hardwired and Wireless)",
                "Alarm Keypad with Panic Button",
                "Key Fob or Keychain Remote",
                "Medical Pendants",
                "Hard Wired or Wireless Panic Button",
                "Motion Detector (PIR)",
                "Glass Break Sensor",
                "Door & Window Sensors",
                "Outdoor & Indoor Sirens",
                "Alarm Strobe",
                "Smart Home / Automation System",
                "Video Monitoring Integration",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMERA SERVICES ───────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
        <div className="container-tight">
          <SectionHeading
            title="Security Camera Systems"
            subtitle="Professional surveillance design, installation, and support"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Off-the-shelf camera kits leave gaps. Our certified designers survey your property, identify every vulnerability, and create a surveillance plan that eliminates blind spots. All installations are clean, weatherproof, and built to last.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Camera, title: "HD & 4K Cameras", desc: "Crystal-clear footage day and night" },
                  { icon: Eye, title: "License Plate Cameras", desc: "Essential for HOAs and commercial" },
                  { icon: Zap, title: "Active Deterrence", desc: "Sirens, strobes, and two-way audio" },
                  { icon: Sun, title: "Solar Camera Systems", desc: "Off-grid surveillance for any location" },
                  { icon: Wifi, title: "Wireless Systems", desc: "Multiple cameras on one secured network" },
                  { icon: Video, title: "PTZ & Fisheye", desc: "Pan-tilt-zoom for large areas" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/15 transition-colors">
                      <item.icon className="w-4.5 h-4.5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/security-cameras" className="btn-primary-gradient inline-flex items-center gap-2 mt-8">
                Learn About Security Cameras <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">Camera & Surveillance Equipment</h3>
              {[
                "License Plate Cameras",
                "90° & 180° Wide Angle Cameras",
                "Fisheye Cameras",
                "PTZ Camera Systems",
                "Doorbell Cameras",
                "Audio Recording Systems",
                "Security Poles & Custom Setups",
                "Wireless Security Camera Systems",
                "Solar Camera Systems",
                "Analytic Systems (AI-Powered)",
                "Deterrence Systems",
                "NVR/DVR Recording Systems",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESIDENTIAL & COMMERCIAL SPLIT ───────────────── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Residential */}
            <div className="glass-card-static p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-6">
                  <Home className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">Residential Security</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Protect your family and home with a custom-designed alarm and surveillance system backed by 24/7 local monitoring.
                </p>
                <div className="space-y-2 mb-6">
                  {["New & Existing Homeowners", "New Homes from the Ground Up", "Condos & Townhomes", "Second Homes & Ranches", "Lake & Ocean Front Properties"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/residential" className="btn-primary-gradient inline-flex items-center gap-2">
                  Residential Security <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Commercial */}
            <div className="glass-card-static p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">Commercial Security</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Enterprise-grade security solutions for businesses of every size, from small retail to large industrial complexes.
                </p>
                <div className="space-y-2 mb-6">
                  {["Small Businesses & Retail", "Apartment Complexes & HOAs", "Industrial & Government", "Healthcare & Education", "Construction & Hotels"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/commercial" className="btn-primary-gradient inline-flex items-center gap-2">
                  Commercial Security <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MONITORING SERVICES ───────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="divider-accent !mx-0" />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
                24/7 Local Monitoring
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your alarm is only as good as the team watching it. Unlike national providers that route alerts through distant call centers, Texas Total Security delivers monitoring backed by a local, in-house dispatch team right here in Houston.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: MapPin, title: "Houston-Based Center", desc: "Operators familiar with local geography" },
                  { icon: Clock, title: "Faster Response", desc: "Direct communication with local dispatch" },
                  { icon: PhoneCall, title: "Real Human Operators", desc: "Trained operators evaluate every event" },
                  { icon: Shield, title: "24/7/365 Coverage", desc: "Round-the-clock, every day of the year" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4.5 h-4.5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground text-sm mb-0.5">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/monitoring-services" className="btn-primary-gradient inline-flex items-center gap-2">
                Learn About Monitoring <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">Monitoring Services</h3>
              {[
                "Alarm Monitoring — 24/7 through our dispatch center",
                "Video Monitoring — Double-verified for alarm events",
                "Video Guard Patrol — Scheduled camera logging by operators",
                "Custom Monitoring — Specific environments, specific events",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE & MAINTENANCE ────────────────────────── */}
      <section className="section-padding">
        <div className="container-tight">
          <SectionHeading
            title="Service & Maintenance"
            subtitle="Keep your security system performing at peak reliability"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Wrench, title: "System Troubleshooting", desc: "Fast diagnosis and repair for alarm faults, camera issues, and sensor malfunctions" },
              { icon: RefreshCw, title: "Firmware & Software Updates", desc: "Keep your system current with the latest security patches and features" },
              { icon: Camera, title: "Camera Maintenance", desc: "Lens cleaning, repositioning, night vision calibration, and weatherproofing" },
              { icon: Shield, title: "Alarm Servicing", desc: "Battery replacement, sensor testing, keypad calibration, and verification" },
              { icon: Clock, title: "Preventive Inspections", desc: "Scheduled system health checks to catch issues before they become problems" },
              { icon: CheckCircle2, title: "Support Plans", desc: "Priority service agreements with guaranteed response times and discounts" },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6">
                <item.icon className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/service-maintenance" className="btn-primary-gradient inline-flex items-center gap-2">
              Learn About Service & Maintenance <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
        <div className="container-tight">
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Trusted by thousands of Houston homeowners and businesses"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="glass-card-static p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOA SECURITY ──────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
              <img
                src="/commercial/imgi_11_com1.jpg"
                alt="HOA security cameras protecting community entrances"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.1), transparent)" }} />
            </div>
            <div>
              <div className="divider-accent !mx-0" />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
                HOA & Community Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Protect your HOA, gated community, or apartment complex with comprehensive security solutions. We specialize in gate cameras, community-wide surveillance, pool area monitoring, and license plate recognition.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {["Gate Cameras & LPR", "Community Surveillance", "Pool Area Monitoring", "Common Area Security", "Remote Viewing", "24/7 Monitoring"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/hoa-security" className="btn-primary-gradient inline-flex items-center gap-2">
                HOA Security Solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
        <div className="container-tight max-w-2xl mx-auto">
          <LeadForm
            title="Get a Free Security Consultation"
            subtitle="Tell us about your property and security needs — we'll design a custom solution at no charge."
          />
        </div>
      </section>

      <FAQSection items={faqs} />
      <CTABlock />
    </Layout>
  );
};

export default Services;
