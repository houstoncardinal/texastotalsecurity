import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Shield, CheckCircle2, Clock, Users, Phone, MapPin, ClipboardCheck, Wrench, Star } from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

const analysisSteps = [
  { icon: MapPin, title: "Walk the Property", desc: "We review entrances, blind spots, existing equipment, wiring paths, exterior exposure, and daily operating needs." },
  { icon: ClipboardCheck, title: "Prioritize Risk", desc: "We separate urgent vulnerabilities from optional upgrades so your proposal is clear, practical, and budget-aware." },
  { icon: Wrench, title: "Design the System", desc: "You receive a recommendation for alarm coverage, CCTV infrastructure, monitoring, and service needs." },
];

const benefits = [
  "Onsite assessment by a Houston security specialist",
  "Alarm, camera, monitoring, and service recommendations",
  "Existing equipment reviewed before replacement is suggested",
  "No pressure, no obligation, and no generic package selling",
];

const FreeAnalysis = () => {
  const [searchParams] = useSearchParams();
  const defaultServiceType = searchParams.get("service") ?? "";
  const defaultPropertyType = searchParams.get("property") ?? "";
  const referringPage = searchParams.get("ref") ?? (typeof document !== "undefined" ? document.referrer : "");

  const schemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Free Security Analysis", href: "/free-analysis" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Free Security Analysis Houston TX | Alarm, CCTV & Monitoring Assessment"
        description="Schedule a free onsite security analysis in Houston, TX. Texas Total Security assesses alarm systems, CCTV cameras, monitoring, service needs, and property vulnerabilities."
        schemas={schemas}
      />
      <Breadcrumbs items={[{ name: "Free Security Analysis" }]} />

      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
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
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                  Free Onsite Security Analysis
                </span>
              </div>
              <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
                Get a professional security plan before you spend money on equipment.
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
                We assess your property, existing system, vulnerabilities, and goals, then recommend a practical plan for alarms, cameras, monitoring, and service.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3 max-w-2xl">
                {benefits.map((item) => (
                  <div key={item} className="flex items-start gap-2 border border-white/10 bg-white/[0.055] p-3">
                    <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed text-white/65">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                <span>Licensed & Insured · LIC# B03066901</span>
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-red-400" /> Houston Area Specialists</span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}
              className="lg:justify-self-end w-full"
            >
              <LeadForm
                title="Schedule Your Free Analysis"
                subtitle="Use the quick form or guided prompts. We'll contact you to schedule the visit."
                defaultServiceType={defaultServiceType}
                defaultPropertyType={defaultPropertyType}
                referringPage={referringPage || "/free-analysis"}
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
                <ClipboardCheck className="w-3.5 h-3.5 text-red-600" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">What Happens Onsite</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
                A clear assessment, not a sales script.
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The goal is to understand what your property actually needs, what equipment still has value, and what security gaps should be addressed first.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
              {analysisSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.05 }}
                  className="bg-white p-5"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-red-50 border border-red-100 mb-4">
                    <step.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="w-9 h-9 text-red-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">Prefer to schedule by phone?</h2>
          <p className="mt-3 text-white/60 leading-relaxed">Speak directly with a Houston security specialist.</p>
          <a href="tel:7133879937" className="mt-6 btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
            <Phone className="w-4 h-4" /> Call (713) 387-9937
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-red-400" /> Local team</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-red-400" /> No obligation</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FreeAnalysis;
