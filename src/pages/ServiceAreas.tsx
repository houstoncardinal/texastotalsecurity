import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, ArrowRight, Shield, Clock, Radio, CheckCircle2, Building2, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cities } from "@/lib/cityData";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };

const countyGroups = [
  {
    county: "Harris County",
    description: "The heart of our coverage area. From Bellaire and Memorial to Spring, Humble, and Pasadena — Harris County encompasses Houston's most densely populated communities, commercial corridors, and industrial districts. Every neighborhood has distinct security needs and we design systems that reflect them.",
    cities: ["Houston", "Bellaire", "Memorial Houston", "Pasadena", "Humble", "Spring", "Tomball", "Cypress"],
  },
  {
    county: "Fort Bend County",
    description: "One of the fastest-growing counties in the United States, Fort Bend is home to Sugar Land, Katy, Missouri City, Rosenberg, and Richmond. Master-planned communities, high-growth corridors, and expanding commercial districts make Fort Bend a key service area for both residential and property management security.",
    cities: ["Sugar Land", "Katy", "Richmond", "Missouri City", "Rosenberg"],
  },
  {
    county: "Montgomery County",
    description: "The Woodlands and surrounding Montgomery County communities combine wooded estates, premier master-planned neighborhoods, and a thriving business district along I-45. Estate security, HOA solutions, and commercial systems are in high demand throughout this corridor.",
    cities: ["The Woodlands"],
  },
  {
    county: "Galveston & Brazoria Counties",
    description: "League City and Pearland anchor our coverage in the south Houston metro. Both communities have experienced rapid residential and commercial growth, and their proximity to the Texas Medical Center and NASA/Johnson Space Center corridors brings a diverse mix of property types requiring professional security coverage.",
    cities: ["League City", "Pearland"],
  },
];

const reasons = [
  {
    icon: Radio,
    title: "Professional 24/7 Monitoring",
    desc: "Certified monitoring center staffed around the clock. When an alarm triggers at your property, trained operators verify and dispatch local Houston-area authorities fast.",
  },
  {
    icon: Shield,
    title: "Local Technicians Who Know the Area",
    desc: "Our installation crews live and work in greater Houston. They know the access challenges, the climate conditions, the building styles, and the local permit requirements across Harris, Fort Bend, Montgomery, Galveston, and Brazoria counties.",
  },
  {
    icon: Clock,
    title: "Fast Response Across the Metro",
    desc: "Our service vehicles are staged across the Houston metro so response time stays low whether you're in the Woodlands, Sugar Land, League City, or central Houston. No sending a technician from a regional office hours away.",
  },
  {
    icon: Building2,
    title: "Commercial & Property Management Expertise",
    desc: "We specialize in multi-site commercial deployments, HOA security rollouts, and apartment complex surveillance systems across the Houston metro. One account manager, one system design team, multiple properties — managed seamlessly.",
  },
  {
    icon: Home,
    title: "Residential Systems for Every Neighborhood",
    desc: "From new construction pre-wire in Katy and Pearland to estate-grade camera systems in Memorial and The Woodlands — we design residential systems that fit your specific property, not a package off the shelf.",
  },
  {
    icon: CheckCircle2,
    title: "No Long-Term Contracts. No Sold Accounts.",
    desc: "Unlike national providers who sell your monitoring contract to a third party within months, Texas Total Security owns your account permanently. Your relationship stays with our local team for the life of your system.",
  },
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
        title="Security Service Areas Houston TX | Alarm & Camera Installation Near Me | Texas Total Security"
        description="Security systems throughout Greater Houston — alarm installation, cameras & 24/7 monitoring in Katy, Sugar Land, The Woodlands, Pearland, Cypress & more. Licensed local alarm company."
        schemas={schemas}
      />
      <Breadcrumbs items={[{ name: "Service Areas" }]} />

      {/* ── Hero ── */}
      <section className="section-dark py-20 sm:py-24 lg:py-28">
        <div className="container-tight px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <span className="eyebrow">Coverage Area</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-5 text-white" style={{ letterSpacing: "-0.035em" }}>
              Security Systems Across Houston &amp; Surrounding Cities
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.66)" }}>
              Texas Total Security serves the entire greater Houston metropolitan area — from The Woodlands in the north to League City in the south, Katy in the west to Pasadena and Humble in the east. Local monitoring, local technicians, and locally owned — always.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {[
                { label: "5 Counties Covered" },
                { label: "16+ Cities Served" },
                { label: "Professional 24/7 Monitoring" },
                { label: "Licensed · LIC# B03066901" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "hsl(0 85% 55% / 0.7)" }} />
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── City grid ── */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <SectionHeading
            title="Areas We Serve"
            subtitle="Click any city for detailed local security information, neighborhood coverage, and service-specific FAQs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cities.map((city, i) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, ease: easeExpo, delay: i * 0.04 }}
              >
                <Link
                  to={`/${city.slug}-security-systems`}
                  className="glass-card p-5 flex gap-3.5 group h-full"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200"
                    style={{ background: "hsl(0 85% 44% / 0.08)", border: "1px solid hsl(0 85% 44% / 0.12)" }}
                  >
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-0.5 group-hover:text-accent transition-colors text-[15px]">
                      {city.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {city.county} · {city.population}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent group-hover:gap-2 transition-all">
                      View services <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't see your city?{" "}
            <Link to="/contact" className="text-accent font-semibold hover:underline">
              Contact us — we likely serve your community.
            </Link>
          </p>
        </div>
      </section>

      {/* ── County breakdown ── */}
      <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
        <div className="container-tight">
          <SectionHeading
            title="Coverage by County"
            subtitle="We provide complete alarm, camera, and monitoring services across five Houston-area counties."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {countyGroups.map((group, i) => (
              <motion.div
                key={group.county}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
                className="card-clean p-7"
              >
                <h3 className="font-display font-bold text-foreground text-lg mb-3">{group.county}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {group.cities.map((city) => (
                    <span
                      key={city}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: "hsl(0 85% 44% / 0.07)",
                        color: "hsl(0 85% 40%)",
                        border: "1px solid hsl(0 85% 44% / 0.14)",
                      }}
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why local matters ── */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <SectionHeading
            title="Why Local Security Service Matters in Houston"
            subtitle="National alarm companies assign you to a call center. We assign you to a Houston team that knows your property, your neighborhood, and your infrastructure."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
                className="flex gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-accent/15"
                  style={{ background: "hsl(0 85% 44% / 0.08)" }}
                >
                  <reason.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1.5 leading-snug">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service types across the region ── */}
      <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="eyebrow">What We Install</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5" style={{ letterSpacing: "-0.03em" }}>
                Every Service. Every Property Type. Across Greater Houston.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you manage a 300-unit apartment complex in Pearland, own a commercial strip center in Katy, run an HOA in The Woodlands, or need residential security in Sugar Land — Texas Total Security has installed and monitored systems for every scenario across the Houston metro.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We don't sell cookie-cutter packages. Every property assessment is free, every system is custom-designed, and every installation is performed by our licensed Houston-based technicians.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Alarm Systems & Takeovers",
                  "4K Security Camera Systems",
                  "License Plate Recognition",
                  "Security Poles & Mounts",
                  "HOA Gate Camera Systems",
                  "Active Deterrence Systems",
                  "24/7 Local Monitoring",
                  "Commercial Multi-Site Systems",
                  "Residential Smart Security",
                  "New Construction Pre-Wire",
                ].map((service) => (
                  <div key={service} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Property Managers & HOA Boards",
                  desc: "We manage multi-property portfolios across the Houston metro — single point of contact, consistent system standards, and a monitoring partner who never sells your contract.",
                  link: "/hoa-security",
                  label: "HOA & Property Management",
                },
                {
                  title: "Commercial & Industrial Properties",
                  desc: "Offices, retail centers, warehouses, and industrial facilities across Harris, Fort Bend, and Montgomery counties — enterprise security scaled to your operation.",
                  link: "/commercial",
                  label: "Commercial Security",
                },
                {
                  title: "Residential Homeowners",
                  desc: "From starter homes in Humble to estates in Memorial — professionally designed and monitored alarm and camera systems for Houston-area families.",
                  link: "/residential",
                  label: "Residential Security",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className="card-clean p-6 flex flex-col gap-2 group"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">{item.label}</p>
                  <h4 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all mt-1">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABlock
        title="Ready to Secure Your Houston-Area Property?"
        subtitle="Free onsite security assessment — no obligation. We come to your property, evaluate your needs, and deliver a custom proposal."
      />
    </Layout>
  );
};

export default ServiceAreas;
