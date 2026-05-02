import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Wrench, RefreshCw, CheckCircle2, Clock, Camera, Shield, Phone, AlertTriangle, Battery, Settings } from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

const services = [
  { icon: Wrench, title: "System Troubleshooting", desc: "Diagnosis for alarm faults, camera issues, connectivity problems, sensor failures, and unknown system behavior." },
  { icon: Camera, title: "Camera Service", desc: "Camera repositioning, recording checks, lens cleaning, image review, night visibility checks, and NVR troubleshooting." },
  { icon: Shield, title: "Alarm Repair", desc: "Battery replacement, sensor testing, zone cleanup, keypad issues, siren checks, and communication path verification." },
  { icon: RefreshCw, title: "System Updates", desc: "Firmware updates, app access review, user code cleanup, notification settings, and equipment health checks." },
  { icon: Clock, title: "Preventive Inspections", desc: "Scheduled system reviews to catch weak points before they become downtime, false alarms, or missing footage." },
  { icon: CheckCircle2, title: "Ongoing Support", desc: "Service planning for properties that need a reliable local team after installation day." },
];

const serviceSignals = [
  "Alarm keypad beeping, trouble alerts, or failed communication",
  "Camera offline, poor image quality, or missing recordings",
  "Sensors not responding, zones bypassed, or false alarms",
  "Remote viewing app access problems or user permission cleanup",
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
      title="Security System Maintenance Houston TX | Alarm & Camera Service"
      description="Security system service and maintenance in Houston, TX. Alarm repairs, camera troubleshooting, NVR checks, battery replacement, system updates, and local support."
      schemas={maintenanceSchemas}
    />

    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img src="/commercial/imgi_62_com13.png" alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.91)_48%,rgba(10,10,10,0.74)_100%)]" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_460px] gap-8 lg:gap-10 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <Wrench className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                Service & Maintenance · Houston
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Keep your alarm and camera systems working when they matter.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Local troubleshooting, repairs, system updates, camera service, alarm maintenance, and support for existing security systems across Houston.
            </p>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
              {[
                { label: "Alarm", sublabel: "repair and testing" },
                { label: "Camera", sublabel: "service and NVR checks" },
                { label: "Battery", sublabel: "backup replacement" },
                { label: "Support", sublabel: "local response" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-white">{stat.label}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}>
            <LeadForm
              title="Request Service"
              subtitle="Use the quick form or guided prompts so we can route your request correctly."
              showServiceType={false}
              defaultServiceType="maintenance"
              referringPage="/service-maintenance"
              compact
              className="shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-start">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }} className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">When to Call</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
              Small trouble signals become expensive failures when ignored.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Security systems need periodic attention: batteries age, cameras move, storage fills, sensors fail, and communication paths can become unreliable.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3">
            {serviceSignals.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }}
                className="flex items-start gap-3 border border-gray-200 bg-gray-50 p-4"
              >
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed text-gray-700">{item}</span>
              </motion.div>
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
                <Settings className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">Service Scope</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                We service the systems that protect the property every day.
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                Our service approach focuses on diagnosis first, then a practical fix: repair what makes sense, replace what is unreliable, and document what needs future attention.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.035 }}
                className="bg-black p-5 hover:bg-white/[0.045] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-red-500/10 border border-red-500/20">
                    <s.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold leading-tight">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Battery className="w-9 h-9 text-red-600 mx-auto mb-4" />
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">Need immediate assistance?</h2>
        <p className="mt-3 text-gray-600 leading-relaxed">Call support directly if your alarm, camera, or monitoring service needs urgent attention.</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
            <Phone className="w-4 h-4" /> Call (713) 387-9937
          </a>
          <a href="mailto:info@texastotalsecurity.com" className="inline-flex items-center justify-center gap-2 border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-900 hover:border-red-200 hover:bg-red-50 transition-colors">
            info@texastotalsecurity.com
          </a>
        </div>
      </div>
    </section>
  </Layout>
);

export default ServiceMaintenance;
