import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateEnhancedServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Camera, Eye, Zap, Sun, Wifi, Video, MonitorSpeaker, Shield, CheckCircle2 } from "lucide-react";

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
];

const cameraSchemas = [
  generateLocalBusinessSchema(),
  generateEnhancedServiceSchema(
    "Security Camera Installation Houston TX",
    "Professional security camera and surveillance system installation in Houston, TX. 4K, HD, PTZ, license plate recognition, active deterrence, solar & wireless systems. Remote viewing from anywhere.",
    "/security-cameras",
    "Security Camera Installation",
    ["security camera pole installation Houston TX", "CCTV pole installation Houston", "security poles Houston", "entrance gate camera Houston", "surveillance camera pole mount Houston", "outdoor security camera pole Houston", "security camera installation Houston", "HOA security cameras Houston", "license plate cameras Houston"],
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
      title="Security Camera Installation Houston TX | Security Poles, CCTV Pole Install | Texas Total Security"
      description="Professional security camera installation & CCTV pole installation in Houston, TX. Security poles, entrance gate cameras, license plate recognition, outdoor security camera pole mounts & HD surveillance. Free analysis: (713) 387-9937."
      schemas={cameraSchemas}
    />
    <PageHero
      title="Security Camera Systems & Security Pole Installs"
      subtitle="Professional surveillance design, CCTV pole installation, and security camera pole mounts in Houston, TX. From entrance gate cameras and security poles to enterprise-grade multi-site systems — custom-built for every property type."
      ctaText="Get a Custom Camera & Pole Design"
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Camera Solutions for Every Need" subtitle="We install and service the full spectrum of surveillance technology." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cameraTypes.map((c) => (
            <div key={c.title} className="glass-card p-7">
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4">
                <c.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding" style={{ background: "var(--gradient-surface)" }}>
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Professionally Designed Surveillance</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Off-the-shelf camera kits leave gaps. Our certified designers survey your property, identify every vulnerability, and create a surveillance plan that eliminates blind spots.</p>
              <p>We select the right camera type for each location — wide-angle for parking lots, varifocal for entry points, LPR for gates, active deterrence for perimeters.</p>
              <p>Our installations are clean, weatherproof, and built to last. We configure network settings, optimize recording schedules, and set up remote access on all your devices.</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground mb-5">Complete Camera & Surveillance Equipment</h3>
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
              {fullCameraList.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="divider-accent !mx-0" />
            <h2 className="text-3xl font-display font-bold text-foreground mb-5">
              Security Pole Installation Services
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Texas Total Security specializes in security camera pole installs throughout Houston and surrounding areas. We provide complete CCTV pole installation services — from selecting the right outdoor security camera pole mount to underground conduit runs and full wiring. Our security poles are ideal for HOA entrances, parking lots, construction sites, and commercial properties.
            </p>
            <div className="space-y-2.5">
              {[
                "Security camera pole installs — all hardware, wiring & conduit",
                "CCTV pole installation with weatherproof camera housings",
                "Entrance gate camera systems on custom security poles",
                "Outdoor security camera pole mounts (rated for Houston weather)",
                "Surveillance camera pole mount for parking lots & perimeters",
                "Telescoping security camera poles for adjustable height",
                "Metal pole for security camera with anti-climb treatment",
                "Dome camera pole mount & PTZ pan-tilt-zoom installations",
                "Security camera extension poles for elevated coverage",
                "Ring camera pole mount & third-party pole solutions",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-2 text-[15px]">Outdoor Camera Mounting Poles</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">We install outdoor camera poles in concrete with proper base plates, ensuring maximum stability in all weather conditions. Each outdoor security camera pole is custom-measured and positioned for optimal camera coverage angles.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-2 text-[15px]">Entrance Gate Camera Poles</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Our entrance gate camera installations combine security poles with wide-angle cameras and LPR (license plate recognition) cameras to capture every vehicle entering your HOA, apartment complex, or commercial property.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-2 text-[15px]">CCTV Pole Installation Process</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Our CCTV camera pole services include site survey, pole placement design, trenching, conduit installation, mounting, wiring, camera configuration, and remote viewing setup — all handled by our licensed Houston technicians.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-tight max-w-2xl mx-auto">
        <LeadForm title="Request a Custom Camera Design" subtitle="Tell us about your property and surveillance goals." />
      </div>
    </section>

    <FAQSection items={faqs} />
    <CTABlock />
  </Layout>
);

export default SecurityCameras;
