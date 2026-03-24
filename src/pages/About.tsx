import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle2, Shield, Users, MapPin, Clock, HeadphonesIcon } from "lucide-react";

const values = [
  { icon: MapPin, title: "Houston-Born & Operated", desc: "Trustworthy security techs working in Houston and surrounding areas for over 30 years. We live and work in the same communities we protect." },
  { icon: Shield, title: "We Don't Sell Alarm Contracts", desc: "We don't sell our alarm contracts to big national companies. Your account stays with us — always." },
  { icon: HeadphonesIcon, title: "In-House Monitoring by Dispatch Center", desc: "Our monitoring center is local. When an alarm triggers, local operators dispatch local authorities — fast." },
  { icon: Users, title: "Friendly, Local Customer Service", desc: "Customer service by friendly and local staff. You'll know your technician by name, and they'll know your system inside and out." },
  { icon: Clock, title: "Fast, Reliable Response", desc: "When you need service or have a question, you talk to a real person who can help — immediately. We work efficiently to keep your systems running." },
  { icon: CheckCircle2, title: "Custom System Design", desc: "We don't sell cookie-cutter packages. Every system is designed for your specific property, risks, and goals." },
];

const googleReviews = [
  { name: "Coleman Ferguson", role: "Google Review", text: "Texas Total Security did a fantastic job installing an alarm system and cameras. The cameras are all 1080p hd and are all commercial grade. The owner, Tim Townsend, is a very credible, knowledgeable person who was able to explain everything to me in a way I was able to understand. I would recommend this company to everyone." },
  { name: "Floral Yang", role: "Google Review", text: "Very happy with my new security camera system! Texas Total Security did a great job at installing everything and explained exactly how to use all the equipment. Job well done! I will recommend to my friends and family..." },
  { name: "Anna Bermudez", role: "Google Review", text: "Excellent Service! These guys know what they are doing. Love my Alarm System and my New Cameras all over my property. I would recommend Tim at Texas Total Security to anyone who is looking for a Security System!!! Thank You Guys" },
  { name: "Jason Hammond", role: "Google Review", text: "FANTASTIC experience and very professional and caring company. I felt very comfortable from start to finish. Honest and knowledgeable staff. The person I dealt with was most Tim Townsend and the experience was very satisfactory." },
  { name: "Dj Baroud", role: "Google Review", text: "Texas Total Security did a great job! My family feels really safe now! Thank you guys so much!" },
  { name: "DLA Armstrong", role: "Google Review", text: "I was surprised by the laid back style by phone, AND above and beyond EXTRA SERVICE I RECEIVED from TTS. They were detailed, educated me on security tips and reviewed with me until I understood everything before they left. New up-to-date technology with old school customers-always-right service. I am Super Satisfied!!!!!" },
  { name: "Iris Deleon", role: "Google Review", text: "Tim was amazing! I had an issue with my NVR he came, gave me fair price and fix it quickly." },
  { name: "Donald Townsend", role: "Google Review", text: "Job well done! Thanks for helping my friend and his family at an important time of need. They feel 100% secure now!" },
  { name: "Adil Bhaia", role: "Google Review", text: "THEY INSTALLED CAMERAS AT MY HOME AND THEY WERE VERY POLITE AND WORKED VERY FAST. MY CAMERAS SET UP WAS DONE AND PROGRAMMED IN ONE DAY. THANK YOU for making my home safe." },
  { name: "Floral Yang", role: "Google Review", text: "You guys did a great job on my Security Camera System and Alarm System!!!!" },
];

const About = () => {
  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="About Texas Total Security | Houston's Trusted Security Experts"
        description="Learn about Texas Total Security — Houston's locally owned security company with 30+ years of experience. In-house monitoring, custom system design, and customer service that sets us apart."
        schemas={schemas}
      />
      <Breadcrumbs items={[{ name: "About Us" }]} />

      <PageHero
        title="An Experienced Provider of High-End Security Systems"
        subtitle="Texas Total Security is the leading expert in security system installation in the Houston area. Specializing in commercial and residential installations, we guarantee that we will keep your business and home secured."
      />

      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                A Different Kind of Security Company
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Texas Total Security is the leading expert in security system installation in the Houston area. Specializing in commercial and residential installations, we guarantee that we will keep your business and home secured to keep them safe for your family and your profits. We also feature wireless security camera systems and custom design installations in order to meet your needs.
                </p>
                <p>
                  Every system we provide is backed by professional alarm system installation, ensuring your equipment performs at its best from day one. The Texas Total Security team understands what local properties require — strong coverage, smart integration, and dependable monitoring — so you can feel confident knowing your safety is supported by true Houston-based expertise.
                </p>
                <p>
                  We take pride in delivering responsive service and long-term support, helping you stay protected around the clock with solutions built for real-world challenges. Whether you're safeguarding a single-family home, a multi-unit property, or a growing business, you can count on technology that works seamlessly and reliably when you need it most.
                </p>
                <p>
                  From reducing risks to strengthening everyday security, we make it easier to protect the people and property that matter most. Our local experts are here to help you secure your Houston property with confidence.
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-2xl p-8 sm:p-10">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "30+", label: "Years in Business" },
                  { num: "1000s", label: "Systems Installed" },
                  { num: "24/7", label: "Local Monitoring" },
                  { num: "100%", label: "Locally Owned" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-display font-bold text-accent">{stat.num}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <SectionHeading title="Why We're the Best" subtitle="The principles that have guided our company for over 30 years." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
                <v.icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <SectionHeading title="What We Specialize In" subtitle="Comprehensive security solutions for Houston and surrounding areas." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "Alarm Systems",
              "Security Camera and Surveillance Systems",
              "Active Deterrence and Notification Systems",
              "Indoor or Outdoor Networking and WiFi Systems",
              "Alarm Monitoring & System Takeover",
              "HOA and Gate Camera Solutions",
              "Structured Cabling",
              "Video Monitoring",
            ].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm text-foreground font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <SectionHeading title="What Our Customers Say on Google" subtitle="Real reviews from real customers across the Houston area." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((r, i) => (
              <TestimonialCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </Layout>
  );
};

export default About;
