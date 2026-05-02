import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateContactPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Phone, Mail, MapPin, Clock, Shield, ExternalLink, ArrowRight, CheckCircle2, MessageSquare, Wrench, Camera, Radio } from "lucide-react";
import { Link } from "react-router-dom";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

const contactSchemas = [
  generateLocalBusinessSchema(),
  generateContactPageSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]),
];

const contactMethods = [
  { icon: Phone, href: "tel:7133879937", label: "(713) 387-9937", sub: "Call for urgent help, pricing questions, or project scheduling." },
  { icon: Mail, href: "mailto:info@texastotalsecurity.com", label: "info@texastotalsecurity.com", sub: "Send photos, property details, service notes, or bid requests." },
  { icon: MapPin, href: "https://goo.gl/maps/vP7zqsAQH2yuo1ut8", label: "11331 Richmond Ave. #102", sub: "Houston, TX 77082" },
];

const requestTypes = [
  { icon: Shield, title: "Alarm Systems", desc: "New hardwired systems, takeovers, sensor issues, keypad problems, and cellular monitoring." },
  { icon: Camera, title: "Security Cameras", desc: "CCTV design, LPR, NVR recording, remote access, active deterrence, and camera service." },
  { icon: Radio, title: "Monitoring", desc: "Switch monitoring, activate compatible systems, update emergency contacts, or review dispatch instructions." },
  { icon: Wrench, title: "Service Calls", desc: "Troubleshooting, repairs, upgrades, system health checks, and preventive maintenance." },
];

const Contact = () => (
  <Layout>
    <SEOHead
      title="Contact Texas Total Security | Houston's Local Alarm Company | (713) 387-9937"
      description="Contact Texas Total Security — Houston's trusted local alarm company. Get a free analysis, switch alarm companies, or request a camera quote. Call (713) 387-9937."
      schemas={contactSchemas}
    />

    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img src="/TexasTotalSecuritySign.png" alt="" className="h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.91)_48%,rgba(10,10,10,0.72)_100%)]" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_460px] gap-8 lg:gap-10 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <MessageSquare className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                Houston Security Help Desk
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Talk to a local security team that can actually help.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Request a free analysis, get a camera quote, switch alarm monitoring, or schedule service with Texas Total Security in Houston.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
                <Phone className="w-4 h-4" /> Call (713) 387-9937
              </a>
              <a href="#contact-form" className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Send a Message <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
              <span>Licensed & Insured · LIC# B03066901</span>
              <span>Serving Greater Houston</span>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }} id="contact-form">
            <LeadForm
              title="Send Us a Message"
              subtitle="Tell us what you need. A security specialist will contact you within 24 hours."
              showServiceType
              referringPage="/contact"
              compact
              className="shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-10 items-start">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }} className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">Direct Contact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
              Start with the fastest path for your situation.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Call when the issue is urgent. Use the form when you want us to review property details, current equipment, photos, or a scope before we respond.
            </p>
            <div className="mt-6 border border-red-100 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-bold text-gray-950">Fast Response</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">We respond to all inquiries within 24 hours, and urgent service calls should start by phone.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-3">
            {contactMethods.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }}
                className="group flex items-start gap-4 border border-gray-200 bg-gray-50 p-5 hover:border-red-200 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 flex items-center justify-center shrink-0 bg-white border border-gray-200 group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                  <c.icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-gray-950 group-hover:text-red-700 transition-colors break-words">{c.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.sub}</p>
                </div>
                {c.href.startsWith("http") && <ExternalLink className="w-4 h-4 text-gray-300 ml-auto shrink-0" />}
              </motion.a>
            ))}

            <div className="grid sm:grid-cols-2 gap-3 mt-1">
              {[
                "Local Houston account management",
                "Licensed & insured security provider",
                "Alarm, camera, monitoring, and service support",
                "Residential, HOA, commercial, and industrial properties",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 border border-gray-200 bg-white p-4">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold leading-relaxed text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-red-600/10 border border-red-500/25">
              <Wrench className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">What Can We Help With?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              One contact point for security projects and service issues.
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Whether you are starting from scratch or trying to fix a system someone else installed, the first step is a clear conversation about what is happening now.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {requestTypes.map((type, i) => (
              <motion.div key={type.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }} className="bg-black p-5 hover:bg-white/[0.045] transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-red-500/10 border border-red-500/20 mb-4">
                  <type.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-display font-bold leading-tight">{type.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-6 lg:gap-8 items-stretch">
          <div className="border border-gray-200 bg-gray-50 p-6">
            <MapPin className="w-8 h-8 text-red-600 mb-4" />
            <h2 className="text-2xl font-display font-bold text-gray-950 leading-tight">Houston Office</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">11331 Richmond Ave. #102, Houston, TX 77082</p>
            <div className="mt-5 flex flex-col gap-3">
              <a href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:border-red-200 hover:bg-red-50 transition-colors">
                <ExternalLink className="w-4 h-4" /> View Google Page
              </a>
              <Link to="/service-areas" className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:border-red-200 hover:bg-red-50 transition-colors">
                Service Areas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="overflow-hidden border border-gray-200 h-72 sm:h-80 lg:h-auto min-h-[320px]">
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
      </div>
    </section>
  </Layout>
);

export default Contact;
