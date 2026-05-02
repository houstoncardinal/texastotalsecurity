import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Users, Building2, ShoppingBag, Stethoscope, Hotel, UtensilsCrossed, Factory, Car, HardHat, Landmark, Plane, Anchor, Church, Star, Shield, Droplets, Store, Camera, Radio, CheckCircle2, Phone, MapPin, Network } from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

const industries = [
  { icon: Home, name: "Residential", desc: "Custom alarm and camera systems for homes of all sizes.", category: "Homes" },
  { icon: Users, name: "HOA Communities", desc: "Gate cameras, LPR, and community-wide surveillance.", category: "Communities" },
  { icon: Building2, name: "Apartment Complexes", desc: "Multi-unit security and common area cameras.", category: "Multifamily" },
  { icon: Store, name: "Shopping Centers", desc: "Mall and strip center loss prevention, storefront cameras, and parking lot surveillance.", category: "Retail" },
  { icon: ShoppingBag, name: "Retail Stores", desc: "Storefront security, POS area cameras, employee entrance monitoring, and after-hours alerts.", category: "Retail" },
  { icon: Stethoscope, name: "Medical & Dental", desc: "HIPAA-aware security and waiting area monitoring.", category: "Professional" },
  { icon: Hotel, name: "Hotels & Hospitality", desc: "Guest safety, hallway cameras, and property perimeter security.", category: "Hospitality" },
  { icon: UtensilsCrossed, name: "Restaurants", desc: "Kitchen, dining, and exterior cameras with POS area monitoring.", category: "Hospitality" },
  { icon: Factory, name: "Industrial Sites", desc: "Perimeter security and hazardous area monitoring.", category: "Industrial" },
  { icon: Car, name: "Parking Garages", desc: "Level-by-level cameras, LPR, emergency call stations, and lighting.", category: "Parking" },
  { icon: HardHat, name: "Construction Sites", desc: "Solar-powered cameras, time-lapse, and temporary site security.", category: "Temporary" },
  { icon: Landmark, name: "Government Buildings", desc: "High-security surveillance, restricted access, and compliance systems.", category: "Government" },
  { icon: Plane, name: "Airports", desc: "Perimeter surveillance, terminal cameras, and runway monitoring.", category: "Critical" },
  { icon: Anchor, name: "Marinas", desc: "Dock cameras, boat slip monitoring, and waterfront perimeter security.", category: "Waterfront" },
  { icon: Star, name: "Valet Operations", desc: "Vehicle tracking cameras, key management, and customer documentation.", category: "Operations" },
  { icon: Church, name: "Places of Worship", desc: "Interior/exterior cameras, entry monitoring, and event security.", category: "Community" },
  { icon: Shield, name: "Police & Fire Stations", desc: "Perimeter security, parking lot surveillance, and evidence room monitoring.", category: "Public Safety" },
  { icon: Landmark, name: "Town Halls & Government", desc: "Council chamber cameras, public-facing counter monitoring, and 24/7 perimeter surveillance.", category: "Government" },
  { icon: Droplets, name: "Water Treatment Facilities", desc: "Critical infrastructure perimeter security and remote monitoring for water and utility plants.", category: "Critical" },
];

const focusAreas = [
  { icon: Camera, title: "Coverage Design", desc: "Camera placement planned around entry points, parking exposure, blind spots, lighting, and the evidence your team actually needs." },
  { icon: Shield, title: "Alarm Protection", desc: "Hardwired alarm systems, takeovers, cellular communication, and emergency response programming for occupied or after-hours properties." },
  { icon: Radio, title: "Monitoring Workflows", desc: "Professional monitoring, contacts, dispatch instructions, remote viewing, and escalation plans matched to how your property operates." },
  { icon: Network, title: "Serviceable Infrastructure", desc: "PoE networks, NVR retention, surge protection, access control tie-ins, and designs that can be maintained long after installation." },
];

const industriesSchemas = [
  generateLocalBusinessSchema(),
  generateItemListSchema(
    industries.map((ind, i) => ({
      name: ind.name,
      description: ind.desc,
      url: "/industries",
      position: i + 1,
    }))
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Industries We Serve", href: "/industries" },
  ]),
];

const IndustriesWeServe = () => (
  <Layout>
    <SEOHead
      title="Security Systems for Every Industry Houston TX | HOA, Apartment Complex & Commercial | Texas Total Security"
      description="Security systems for every industry in Houston. HOA security camera systems, apartment complex surveillance, neighborhood security, commercial alarm systems & security poles. Locally owned & operated."
      schemas={industriesSchemas}
    />

    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img src="/commercial/imgi_6_com6-scaled.jpg" alt="" className="h-full w-full object-cover opacity-[0.24]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.9)_48%,rgba(10,10,10,0.68)_100%)]" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_430px] gap-8 lg:gap-12 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <Building2 className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                Houston Security by Property Type
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Security systems shaped around the way your industry actually operates.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              From homes and HOAs to retail centers, industrial sites, government facilities, and critical infrastructure, we design alarm, camera, and monitoring systems around real risk, real evidence, and real response.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
                Request Industry Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:7133879937" className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4" /> Call (713) 387-9937
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }} className="border border-white/10 bg-white/[0.055] p-5 sm:p-6 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "19", sublabel: "industry profiles" },
                { label: "CCTV", sublabel: "hardwired systems" },
                { label: "LPR", sublabel: "gates & parking" },
                { label: "24/7", sublabel: "monitoring options" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-black/45 p-4">
                  <p className="font-display text-3xl font-bold text-white">{stat.label}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{stat.sublabel}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-red-500/20 bg-red-500/10 p-4 text-sm leading-relaxed text-white/70">
              The same core system can look completely different by environment: a restaurant needs POS and back-door visibility, while a water facility needs perimeter, access, and remote monitoring discipline.
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-10 items-start">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }} className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-red-50 border border-red-100">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-700">Industry Map</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-950 leading-tight">
              Different environments call for different security priorities.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We translate each property type into practical security decisions: where footage matters, what should trigger alerts, who needs access, and how the system should be maintained.
            </p>
            <div className="mt-6 grid gap-2">
              {["Alarm systems", "Security cameras", "Access points", "Video monitoring"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.5, ease: easeExpo, delay: (i % 3) * 0.035 }}
                className="group bg-white p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-red-50 border border-red-100 group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                    <ind.icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">{ind.category}</p>
                    <h3 className="mt-1 font-display font-bold text-gray-950 leading-tight">{ind.name}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-stretch">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }} className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 bg-red-600/10 border border-red-500/25">
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">Design Algorithm</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                We start with operations, then build the system around them.
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                A polished system is not just equipment. It is coverage, communication, response, permissions, retention, and service access working together for the people responsible for the property.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {focusAreas.map((area, i) => (
              <motion.div key={area.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }} className="bg-black p-5 hover:bg-white/[0.045] transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-red-500/10 border border-red-500/20 mb-4">
                  <area.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-display font-bold leading-tight">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <CTABlock title="Need Security for Your Industry?" subtitle="Tell us the property type, the pain points, and who needs visibility. We will map the alarm, camera, and monitoring approach around that reality." />
  </Layout>
);

export default IndustriesWeServe;
