import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Camera, Eye, Zap, Sun, Wifi, Video, MonitorSpeaker, Shield, CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0 },
};

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 };

const cameraTypes = [
  { icon: Camera, title: "HD & 4K Cameras", desc: "Crystal-clear footage day and night with professional-grade IP cameras built for Houston weather." },
  { icon: Eye, title: "License Plate Cameras", desc: "Cameras specifically used to capture license plates — essential for HOAs, parking, and commercial." },
  { icon: Zap, title: "Active Deterrence", desc: "Cameras with built-in sirens, strobes, and two-way audio that actively deter intruders." },
  { icon: Sun, title: "Solar Camera Systems", desc: "Used in areas where there is no electricity. Off-grid surveillance for construction sites and ranches." },
  { icon: Wifi, title: "Wireless Systems", desc: "Secured wireless network with access points/antennas — multiple cameras across locations on one network." },
  { icon: Video, title: "PTZ & Fisheye", desc: "Pan-tilt-zoom cameras for large areas, controlled with joystick or auto patrol. Fisheye for top-down coverage." },
  { icon: MonitorSpeaker, title: "Doorbell Cameras", desc: "2-way voice and notification system. Records 24/7 to DVR or NVR security hard drive." },
  { icon: Shield, title: "Remote Viewing", desc: "View all cameras from your phone, tablet, or computer — anywhere in the world, anytime." },
];

const fullCameraList = [
  "License Plate Cameras — Cameras specifically used to capture license plates",
  "90 Degree Wide Angle Cameras — Most common camera. Provides large areas of coverage",
  "180 Degree Cameras — Provides 180 degree coverage with one camera",
  "Fisheye Cameras — Top-down coverage for auditoriums, sports centers, jewelry stores",
  "PTZ Camera — Coverage for large areas like parking lots. Joystick or auto patrol",
  "Doorbell Camera — 2 way voice and notification system. Records 24/7",
  "Audio Recording — Built into the security camera or standalone microphone",
  "Security Poles — Custom setups with wide angle cameras, LPR cameras, LED strobe kits",
  "Wireless Security Camera Systems — Secured wireless network with access points",
  "Solar Camera Systems — For areas with no electricity",
  "Remote Camera Systems — Offsite using antennas, air cards, hot spots, or solar",
  "Construction Site Camera Systems — Surveillance at construction sites",
  "Analytic Systems — AI-powered including line crossing, vehicle detection, person detection",
  "Deterrence Systems — Active deterrence with prerecorded audio messages",
  "LED Strobe Light Kits — Deterrence notification, typically red and blue colors",
  "Notification Systems — Alerts to cell phone app or directly to DVR/NVR monitor",
  "2 Way Voice Systems — Outdoor speaker system to talk while watching through camera app",
  "Recording Systems — NVR or DVR with security hard drives for video recording",
];

const faqs = [
  { question: "How many cameras do I need?", answer: "It depends on your property's size, layout, and entry points. During our free onsite analysis, we map every vulnerable area and recommend the optimal number and placement." },
  { question: "Can I view cameras from my phone?", answer: "Yes. All our camera systems include mobile apps for iOS and Android, giving you live and recorded footage from anywhere." },
  { question: "Do cameras work at night?", answer: "Absolutely. Our cameras include infrared night vision and many models feature full-color night vision with built-in spotlights." },
  { question: "How long is footage stored?", answer: "Most systems store 30-90 days. We design storage to match your specific needs and compliance requirements." },
  { question: "Can cameras integrate with my alarm system?", answer: "Yes. We specialize in integrated security systems where cameras, alarms, and monitoring work together." },
  { question: "What's the difference between IP and analog cameras?", answer: "IP cameras deliver higher resolution (up to 4K), better night vision, and advanced features like analytics. We primarily install IP camera systems for superior quality." },
  { question: "Do you install cameras for businesses and homes?", answer: "Yes. We design and install camera systems for residential properties, commercial buildings, HOA communities, and industrial facilities." },
  { question: "Can you install cameras on existing poles or buildings?", answer: "Absolutely. We can mount cameras on existing structures or design custom security poles with integrated cameras, lighting, and deterrence systems." },
];

const cameraSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Security Camera Installation Houston TX | 4K Surveillance Systems",
    "Professional security camera installation in Houston. 4K IP cameras, license plate recognition, active deterrence, solar systems & remote viewing. Custom surveillance for homes, businesses & HOAs. Free site survey.",
    "/security-cameras",
    "Security Camera Installation",
    ["security camera installation Houston", "surveillance cameras Houston TX", "license plate cameras Houston", "4K security cameras Houston", "IP camera installation Houston", "security camera company Houston", "CCTV installation Houston", "business security cameras Houston"],
    faqs
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Security Cameras", href: "/security-cameras" },
  ]),
];

const SecurityCameras = () => (
  <Layout>
    <SEOHead
      title="Security Camera Installation Houston TX | 4K Surveillance Systems | License Plate Recognition | Texas Total Security"
      description="Professional security camera installation in Houston. 4K IP cameras, license plate recognition (LPR), active deterrence, solar systems & remote viewing. Custom surveillance for homes, businesses & HOAs. Free site survey: (713) 387-9937."
      schemas={cameraSchemas}
    />
    
    <PageHero
      title="Security Camera Systems in Houston, TX"
      subtitle="Professional surveillance camera installation with 4K resolution, license plate recognition, active deterrence, and remote viewing. Custom-designed for your property's unique security needs."
      ctaText="Get Free Camera System Quote"
    />

    {/* ══════════════════════════════════════════════════
        INTRO SECTION — Why Professional Cameras Matter
    ══════════════════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.75, ease: easeExpo }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-gray-100"
            style={{ background: "linear-gradient(135deg, hsl(0 85% 45% / 0.02) 0%, white 100%)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(0 85% 45% / 0.08) 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <div className="w-12 h-1 rounded-full mb-6" style={{ background: "hsl(0 85% 50%)" }} />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
                See Everything. Deter Crime. Protect What Matters.
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Security cameras aren't just about recording incidents — they're about preventing them. Our surveillance systems combine 4K clarity, intelligent analytics, and active deterrence to create a comprehensive security solution for your property.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                From license plate recognition at HOA gates to full-property coverage for commercial buildings, we design camera systems that deliver real protection — not just footage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        CAMERA TYPES GRID — Modern Card Design
    ══════════════════════════════════════════════════ */}
    <section className="section-padding" style={{ background: "hsl(0 0% 98%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "hsl(0 85% 45% / 0.06)",
              border: "1px solid hsl(0 85% 45% / 0.12)",
            }}
          >
            <Camera className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>
              Camera Solutions
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Every Camera Type You Need
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            From standard surveillance to specialized license plate recognition, we install the right cameras for your specific security challenges.
          </p>
        </motion.div>

        {/* Camera Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cameraTypes.map((camera, i) => (
            <motion.div
              key={camera.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.08 }}
              className="group"
            >
              <div className="h-full rounded-2xl p-7 bg-white border border-gray-200 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 85% 45% / 0.08) 0%, hsl(0 85% 45% / 0.04) 100%)",
                    border: "1px solid hsl(0 85% 45% / 0.12)",
                  }}
                >
                  <camera.icon className="w-7 h-7" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-3 leading-tight">
                  {camera.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {camera.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        FULL CAMERA LIST SPLIT — Content + Equipment
    ══════════════════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left — Content */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
          >
            <div className="w-12 h-1 rounded-full mb-6" style={{ background: "hsl(0 85% 50%)" }} />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Custom-Designed for Your Property
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                Every property has unique security challenges. That's why we don't sell cookie-cutter camera packages — we design custom surveillance systems based on your specific layout, vulnerabilities, and goals.
              </p>
              <p>
                Our security specialists conduct a free onsite analysis, mapping every entry point, blind spot, and high-risk area. Then we design a camera system that provides complete coverage without wasting your budget on unnecessary equipment.
              </p>
              <p className="font-semibold text-gray-900">
                The result? A surveillance system that actually protects your property — not just records incidents after they happen.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="mt-10 space-y-4">
              {[
                "4K Ultra HD resolution for crystal-clear footage",
                "Night vision with full-color capability",
                "Mobile app for remote viewing anywhere",
                "AI-powered analytics and alerts",
                "Weather-resistant for Houston climate",
                "Professional installation & setup",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 50%)" }} />
                  <span className="text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Full Camera List */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.75, ease: easeExpo }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-2xl p-8 border border-gray-200 bg-white shadow-lg">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Complete Camera Systems
              </h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {fullCameraList.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 50%)" }} />
                    <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        SECURITY POLE CONFIGURATOR CTA
    ══════════════════════════════════════════════════ */}
    <section className="section-padding" style={{ background: "hsl(0 0% 98%)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.75, ease: easeExpo }}
          className="relative rounded-3xl p-10 sm:p-14 overflow-hidden border border-gray-200 bg-white"
        >
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(0 85% 45% / 0.06) 0%, transparent 70%)" }}
          />
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(0 85% 45% / 0.12) 0%, hsl(0 85% 45% / 0.06) 100%)",
                border: "1px solid hsl(0 85% 45% / 0.2)",
              }}
            >
              <Camera className="w-8 h-8" style={{ color: "hsl(0 85% 50%)" }} />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">
              Design Your Custom Security Pole
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Use our interactive 3D configurator to design a custom security pole with cameras, lighting, and active deterrence — see your setup rendered in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/security-pole-configurator"
                className="btn-primary-gradient inline-flex items-center gap-2 text-base px-10 py-4"
              >
                Open 3D Configurator <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/free-analysis"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-semibold text-gray-700 border-2 border-gray-200 hover:border-accent hover:text-accent hover:shadow-lg transition-all duration-300"
              >
                Schedule Free Site Survey
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        CTA BANNER — Get Started
    ══════════════════════════════════════════════════ */}
    <section className="section-padding relative overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(0 85% 45% / 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7, ease: easeExpo }}
        >
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Upgrade Your Security?
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get a free onsite camera system analysis. We'll map your property and design a custom surveillance solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/free-analysis"
              className="btn-primary-gradient inline-flex items-center gap-2 text-base px-10 py-4"
            >
              Schedule Free Analysis <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:7133879937"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-5 h-5" /> (713) 387-9937
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        LEAD FORM
    ══════════════════════════════════════════════════ */}
    <section className="section-padding bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadForm
          title="Get a Free Camera System Quote"
          subtitle="Tell us about your property and we'll design a custom surveillance solution."
        />
      </div>
    </section>

    {/* ══════════════════════════════════════════════════
        FAQ SECTION
    ══════════════════════════════════════════════════ */}
    <FAQSection items={faqs} />

    {/* ══════════════════════════════════════════════════
        FINAL CTA
    ══════════════════════════════════════════════════ */}
    <CTABlock />
  </Layout>
);

export default SecurityCameras;
