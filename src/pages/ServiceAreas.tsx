import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import CTABlock from "@/components/CTABlock";
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  Phone,
  Radio,
  Shield,
  Star,
  Trees,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.14 };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

const serviceAreas = [
  {
    zip: "77005",
    name: "West University Place",
    shortName: "West U",
    label: "Near Rice University",
    description: "Residential alarm and camera systems for compact premium lots, detached garages, and architecturally sensitive homes.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "west-university-security-systems",
  },
  {
    zip: "77024",
    name: "Memorial Villages",
    shortName: "Villages",
    label: "Memorial estate corridor",
    description: "Estate-grade systems for Bunker Hill, Piney Point, Hedwig, Hunters Creek, Hilshire, and nearby wooded lots.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "memorial-villages-security-systems",
  },
  {
    zip: "77401",
    name: "Bellaire",
    shortName: "Bellaire",
    label: "Inner-loop south",
    description: "Full-perimeter protection for alley-facing garages, new construction, family homes, and small commercial properties.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "bellaire-security-systems",
  },
  {
    zip: "77027",
    name: "Upper Kirby / Greenway",
    shortName: "Upper Kirby",
    label: "610 to River Oaks",
    description: "Mixed-use security for townhomes, restaurants, retail suites, Greenway offices, and River Oaks-adjacent properties.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "upper-kirby-security-systems",
  },
  {
    zip: "77055",
    name: "Spring Valley",
    shortName: "Spring Valley",
    label: "Memorial area village",
    description: "Quiet residential coverage for large lots, established homes, mature trees, and family household routines.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "spring-valley-security-systems",
  },
  {
    zip: "77098",
    name: "Montrose North",
    shortName: "Montrose North",
    label: "Buffalo Speedway to Dunlavy",
    description: "Security for the walkable corridor north of 59, including apartments, townhomes, boutiques, and mixed-use sites.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "montrose-north-security-systems",
  },
  {
    zip: "77056",
    name: "Galleria / Uptown",
    shortName: "Galleria",
    label: "West of 610",
    description: "Commercial and residential systems for Post Oak, high-rise condos, office suites, and structured parking.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "galleria-security-systems",
  },
  {
    zip: "77019",
    name: "River Oaks / Fourth Ward",
    shortName: "River Oaks",
    label: "River Oaks to Downtown",
    description: "Premium systems for estates, historic homes, luxury townhomes, and urban properties approaching Downtown.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "river-oaks-security-systems",
  },
  {
    zip: "77006",
    name: "Montrose",
    shortName: "Montrose",
    label: "West Gray to Museum District",
    description: "Flexible coverage for historic homes, dense townhome blocks, apartments, studios, and commercial spaces.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "montrose-security-systems",
  },
  {
    zip: "77030",
    name: "Medical Center",
    shortName: "Medical Center",
    label: "Texas Medical Center",
    description: "Systems for medical offices, multifamily housing, campus-adjacent properties, parking areas, and nearby homes.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "medical-center-security-systems",
  },
  {
    zip: "77007",
    name: "Rice Military",
    shortName: "Rice Military",
    label: "I-10 to Buffalo Bayou",
    description: "Compact, high-coverage alarm and camera systems for townhomes, garages, shared drives, and rooftops.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "rice-military-security-systems",
  },
  {
    zip: "77079",
    name: "Energy Corridor",
    shortName: "Energy Corridor",
    label: "Hwy 6 to Beltway 8",
    description: "Corporate campus, HOA, residential, parking-lot, and commercial security along the I-10 corridor.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "energy-corridor-security-systems",
  },
  {
    zip: "77002",
    name: "Downtown Houston",
    shortName: "Downtown",
    label: "Central business district",
    description: "Commercial security for offices, high-rise residential, hospitality, entertainment, storefronts, and garages.",
    strengths: ["Alarms", "Cameras", "Monitoring"],
    slug: "downtown-houston-security-systems",
  },
];

const capabilityGroups = [
  {
    icon: Home,
    title: "Residential",
    text: "Estate homes, West U and Bellaire family properties, Spring Valley lots, Montrose homes, and Rice Military townhomes.",
  },
  {
    icon: Building2,
    title: "Commercial",
    text: "Galleria offices, Downtown properties, Medical Center suites, retail corridors, restaurants, and mixed-use buildings.",
  },
  {
    icon: Trees,
    title: "Community",
    text: "HOA entrances, gated drives, shared parking, amenity areas, perimeter cameras, and license plate recognition.",
  },
];

const trustPoints = [
  { icon: Shield, label: "Licensed & Insured", sublabel: "LIC# B03066901" },
  { icon: Radio, label: "Verizon Cellular", sublabel: "Monitoring backup" },
  { icon: Camera, label: "Hardwired Systems", sublabel: "PoE cameras & alarms" },
  { icon: Star, label: "Local Houston Team", sublabel: "Owner-led service" },
];

const ServiceAreas = () => {
  const schemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Service Areas", href: "/service-areas" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Houston Security Service Areas | Alarm & Camera Installation | Texas Total Security"
        description="Texas Total Security serves Houston service areas including West University, Memorial Villages, Bellaire, Galleria, River Oaks, Montrose, Downtown, Energy Corridor and more."
        schemas={schemas}
      />

      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <img
            src="/imgi_11_Security-Camera-with-Buildings-in-background-Commercial.jpg_1675696598-scaled.jpg"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.92)_45%,rgba(10,10,10,0.76)_100%)]" />
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_440px] gap-7 lg:gap-9 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                  Houston Security Service Areas
                </span>
              </div>
              <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
                Focused Alarm & Camera Coverage Across Houston's Core Markets.
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
                Every listed area has access to the full Texas Total Security lineup: alarm systems, camera systems, monitoring, takeovers, service, HOA security, commercial security, and residential protection.
              </p>

              <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
                {trustPoints.map((point) => (
                  <div key={point.label} className="border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm">
                    <point.icon className="w-4 h-4 text-red-400 mb-2" />
                    <p className="font-display text-[15px] font-bold text-white">{point.label}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">{point.sublabel}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link to="/property-assessment" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
                  Schedule Free Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:7133879937" className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" /> (713) 387-9937
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }}
              className="border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm shadow-2xl shadow-black/30"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-200">Coverage Snapshot</p>
                  <h2 className="font-display mt-2 text-2xl font-bold text-white">13 Dedicated Area Pages</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Full-service coverage in every area listed.
                  </p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center bg-red-500 text-white">
                  <MapPin className="h-5 w-5" />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-4">
                {serviceAreas.slice(0, 8).map((area) => (
                  <Link
                    key={area.slug}
                    to={`/neighborhoods/${area.slug}`}
                    className="group flex items-center justify-between gap-2 border border-white/10 bg-black/20 px-3 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-red-500/35 hover:bg-red-500/10 hover:text-white"
                  >
                    <span className="truncate">{area.shortName}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-red-300" />
                  </Link>
                ))}
              </div>
              <a
                href="#service-area-directory"
                className="inline-flex w-full items-center justify-center gap-2 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100 transition-colors hover:bg-red-500/20"
              >
                View Full Area Directory <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="service-area-directory" className="bg-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo }}
            className="mb-7 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.45fr)] lg:items-end"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">Service Area Directory</p>
              <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-gray-950">
                Choose Your Houston Area
              </h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-500">
                Each area page includes local property context, but our complete service lineup is available in every area listed below.
              </p>
            </div>
            <div className="grid grid-cols-3 border border-gray-200 bg-gray-50">
              {[
                ["13", "Areas"],
                ["11", "ZIPs"],
                ["24/7", "Monitoring"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-gray-200 px-3 py-4 text-center last:border-r-0">
                  <p className="font-display text-2xl font-bold text-gray-950">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.55, ease: easeExpo }}
            className="mb-4 grid grid-cols-1 gap-3 border border-gray-900 bg-gray-950 p-4 text-white md:grid-cols-4"
          >
            {["Alarm Systems", "Security Cameras", "Monitoring & Takeovers", "HOA, Commercial & Residential"].map((service) => (
              <div key={service} className="flex items-center gap-2 text-sm font-semibold text-white/75">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-red-300" />
                {service}
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={area.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={vp}
                transition={{ duration: 0.5, ease: easeExpo, delay: (index % 3) * 0.035 }}
              >
                <Link
                  to={`/neighborhoods/${area.slug}`}
                  className="group grid h-full grid-cols-[auto_minmax(0,1fr)_auto] gap-4 border border-gray-200 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-[0_14px_34px_rgba(127,29,29,0.11)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-gray-950 text-white">
                    <MapPin className="h-5 w-5 text-red-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="font-display text-lg font-bold leading-tight text-gray-950 transition-colors group-hover:text-red-700">
                        {area.name}
                      </h3>
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] text-red-700">
                        {area.zip}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">{area.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{area.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {area.strengths.map((strength) => (
                      <span key={strength} className="bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-600">
                        {strength}
                      </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-red-700" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f7] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-6 lg:gap-8 items-stretch">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.65, ease: easeExpo }}
              className="border border-gray-200 bg-white p-6 sm:p-7 shadow-sm"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-600">Why Local Focus Matters</p>
              <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-950">
                One market, many property profiles.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Mature trees, alley access, garage placement, visitor parking, building management rules, and HOA expectations all change the system design. We plan coverage around the property, not a generic package.
              </p>
              <div className="mt-5 space-y-2.5">
                {["Hardwired alarm and PoE camera infrastructure", "Gate cameras, LPR, active deterrence, and monitoring", "Clean installation for homes, offices, HOAs, and parking areas"].map((item) => (
                  <div key={item} className="flex gap-2.5 text-sm font-medium text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {capabilityGroups.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.55, ease: easeExpo, delay: index * 0.05 }}
                  className="border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center bg-red-50 text-red-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo }}
            className="mt-3 grid grid-cols-1 gap-3 border border-gray-900 bg-gray-950 p-4 text-white md:grid-cols-3"
          >
            {[
              { icon: Clock, text: "Systems designed for real property layouts and daily operating patterns." },
              { icon: Camera, text: "Camera angles planned for usable evidence, not just visible equipment." },
              { icon: Shield, text: "Local accountability from assessment through installation and support." },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-white/65">
                <item.icon className="h-4 w-4 shrink-0 text-red-300" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABlock
        title="Ready to Protect Your Houston Property?"
        subtitle="Get a free onsite assessment for alarm systems, camera networks, monitoring, gate cameras, LPR, or a full property security upgrade."
      />
    </Layout>
  );
};

export default ServiceAreas;
