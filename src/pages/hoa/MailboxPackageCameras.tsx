import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTABlock from "@/components/CTABlock";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import {
  Camera, Shield, CheckCircle2, ArrowRight, Phone,
  Eye, Clock, Maximize2, Plus, Minus, Mail, Users
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.12 };
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  28 }, show: { opacity: 1, x: 0 } };

const features = [
  { icon: Camera,    title: "HD Mailbox Cluster Cameras",     desc: "High-definition cameras positioned to capture clear facial detail and full coverage of every mailbox station, kiosk, and package locker on the property." },
  { icon: Eye,       title: "Package Locker Area Coverage",   desc: "Cameras covering every angle of package lockers, parcel rooms, and package staging areas — not just the door, but the full approach zone." },
  { icon: Maximize2, title: "Facial Recognition Angles",      desc: "Camera positioning optimized for clear facial capture — not just the back of heads. This is critical for identifying individuals in dispute resolution." },
  { icon: Clock,     title: "24/7 Continuous Recording",      desc: "Round-the-clock recording means every delivery and every pickup is documented — regardless of time of day or day of week." },
  { icon: Shield,    title: "Dispute Resolution Evidence",    desc: "When a resident claims a package was delivered and never received, timestamped footage shows exactly what happened at the mailbox cluster." },
  { icon: Users,     title: "Resident Confidence & Retention", desc: "Residents who see cameras protecting their mailboxes feel safer and are more likely to renew. Documented theft prevention supports your property's reputation." },
];

const faqsForSchema = [
  { question: "Does adding mailbox cameras actually reduce package theft?", answer: "Yes — the visible presence of cameras at mailbox clusters has a documented deterrent effect. Most opportunistic package thieves avoid monitored areas. For determined thieves, the footage provides the evidence needed for police investigation and resident notification. Properties with visible mailbox surveillance consistently report fewer complaints from residents about missing packages." },
  { question: "Can cameras identify the person who took a package?", answer: "When cameras are positioned correctly — at the right height, angle, and with adequate lighting — yes. We design mailbox camera placements to maximize facial capture rather than just recording that someone was present. This means positioning cameras to capture approaching individuals, not just the top of their heads. For nighttime coverage, we use IR illumination suited for facial detail at the distances typical of mailbox clusters." },
  { question: "What if our property has both a mailroom and individual cluster mailboxes?", answer: "We design coverage for every mail-related location on your property — mailrooms, individual cluster stations, package lockers, and any parcel staging areas. Each location gets the appropriate camera count and positioning for maximum coverage. We assess your full property layout during the free site visit and design accordingly." },
  { question: "How does footage help when a resident files a complaint?", answer: "When a resident reports a stolen package or tampered mailbox, we help your management team pull the specific footage window tied to the delivery timestamp and the complaint. Footage can confirm delivery, document removal, and identify the individual. This footage can be exported for police reports, HOA hearings, or provided to the resident for their own insurance claim." },
  { question: "Can mailbox cameras work with existing package lockers?", answer: "Yes. We install cameras alongside existing package locker systems from all major manufacturers. The cameras document who is accessing the lockers and when — independent of the locker's own internal logging, which may not capture all relevant detail." },
  { question: "What about data privacy and resident concerns?", answer: "Our systems are configured and used for legitimate security purposes within your property's common areas. Mailbox clusters and package areas are common property, not private spaces. We recommend posting visible signage indicating video surveillance is in use — both as a deterrent and as a transparent notice to residents. All footage access is limited to authorized management personnel." },
  { question: "How long is mailbox footage stored?", answer: "Storage is configured to your property's needs during installation — typically 30 to 60 days of continuous recording. Given the frequency of package delivery-related complaints, we recommend at least 30 days of retention to ensure footage is available when a resident reports a theft that may have happened days earlier." },
];

const schemas = [
  generateLocalBusinessSchema(),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "HOA Security", href: "/hoa-security" },
    { name: "Mailbox & Package Cameras", href: "/hoa-security/mailbox-cameras" },
  ]),
  generateFAQSchema(faqsForSchema),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mailbox & Package Security Cameras for Multi-Family Properties",
    provider: { "@type": "LocalBusiness", name: "Texas Total Security" },
    serviceType: "Security Camera Installation",
    areaServed: "Houston, TX",
    description: "HD cameras at mailbox clusters and package locker areas for apartment complexes and HOA communities throughout Houston. Package theft deterrence and dispute resolution evidence.",
    url: "https://www.texastotalsecurity.com/hoa-security/mailbox-cameras",
  },
];

const MailboxPackageCameras = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOHead
        title="Mailbox & Package Security Cameras for Multi-Family Properties | Texas Total Security"
        description="HD cameras at mailbox clusters and package locker areas stop package theft and provide dispute resolution evidence. Serving Houston apartment complexes and HOA communities."
        schemas={schemas}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 20% 8%) 50%, hsl(0 0% 5%) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 55% at 12% 70%, hsl(0 85% 44% / 0.13), transparent 65%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col justify-center" style={{ minHeight: "92vh" }}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, ease: easeExpo }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-5 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 75% 64%)" }}>HOA & Multi-Family Security · Houston, TX</span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Mailbox & Package Security Cameras<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(0 78% 78%) 0%, hsl(0 85% 56%) 45%, hsl(0 90% 44%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>for Multi-Family Properties</span>
            </h1>

            <p className="leading-relaxed mb-7" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.60)", maxWidth: "34rem" }}>
              Package theft is the most frequent resident complaint at multi-family properties. HD cameras at your mailbox clusters and package areas provide deterrence, evidence, and dispute resolution.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "HD cameras at every mailbox cluster, locker area, and parcel zone",
                "Facial-capture angles — clear identification, not just top-of-head footage",
                "24/7 recording with timestamped footage for police and HOA hearings",
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-[2px]" style={{ color: "hsl(0 85% 54%)" }} />
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/property-assessment"
                className="btn-primary-gradient inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5"
                style={{ boxShadow: "0 4px 24px hsl(0 85% 44% / 0.42)" }}
              >
                Get a Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3.5 rounded-xl transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "white" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                <Phone className="w-4 h-4" style={{ color: "hsl(0 85% 54%)" }} /> (713) 387-9937
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
            >
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
                style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
                <Mail className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 46%)" }}>The Problem</span>
              </div>
              <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", letterSpacing: "-0.03em" }}>
                Package Theft Is the #1 Resident Complaint — and a Liability Risk
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                Package theft at multi-family properties has reached epidemic proportions. Houston residents received an average of several hundred packages per year per household before the pandemic, and that number has only increased. At an apartment complex or HOA community, every one of those deliveries is a potential theft — and every theft is a potential complaint, dispute, or lawsuit directed at property management.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                When a resident reports a stolen package, the first question they ask is: "Do you have cameras at the mailboxes?" Without documentation, you're unable to assist, unable to dispute the claim, and potentially liable for losses on property you're responsible for maintaining as safe. With cameras positioned correctly, you can show exactly what happened — whether that's a theft, a misdelivery, or the resident picking up their own package and forgetting.
              </p>
              <div className="space-y-3">
                {[
                  "Residents blame management when packages go missing — with no footage to disprove it",
                  "Mail theft is a federal crime — footage supports law enforcement investigation",
                  "He-said-she-said neighbor disputes with no evidence trail",
                  "Repeat thieves continue because there's nothing to identify them",
                  "Negative reviews citing package theft damage your property's reputation",
                ].map((risk) => (
                  <div key={risk} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "hsl(0 85% 50%)" }} />
                    <p className="text-sm text-gray-600 leading-relaxed">{risk}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.75, ease: easeExpo }}
              className="rounded-2xl p-8"
              style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 91%)" }}
            >
              <h3 className="font-display font-bold text-gray-900 mb-5" style={{ fontSize: "1.15rem" }}>
                What Mailbox Cameras Solve
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Package Theft Deterrence", desc: "Visible cameras reduce opportunistic theft — most thieves avoid monitored areas." },
                  { label: "Dispute Resolution", desc: "Was the package delivered? Who picked it up? Footage answers both questions definitively." },
                  { label: "Police Investigation Support", desc: "Mail theft is a federal crime. Footage with facial detail and timestamps is what investigators need." },
                  { label: "Liability Protection", desc: "Document that your property is secured — and that you acted in good faith when incidents occur." },
                  { label: "Resident Satisfaction", desc: "Residents who feel their packages are protected are more likely to renew leases and recommend the property." },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(0 85% 50%)" }} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE INSTALL ── */}
      <section style={{ background: "hsl(0 0% 97%)" }} className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "hsl(0 85% 45% / 0.06)", border: "1px solid hsl(0 85% 45% / 0.12)" }}>
              <Camera className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 50%)" }} />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 45%)" }}>What We Install</span>
            </div>
            <h2 className="font-display font-bold text-gray-900 mb-4 leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", letterSpacing: "-0.03em" }}>
              Mailbox & Package Camera Systems for Houston Communities
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Every component is positioned to maximize identification — not just document that someone was present.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "hsl(0 85% 50% / 0.08)", border: "1px solid hsl(0 85% 50% / 0.15)" }}>
                  <f.icon className="w-6 h-6" style={{ color: "hsl(0 85% 50%)" }} />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-[15px] mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="mt-10 text-center"
          >
            <Link
              to="/property-assessment"
              className="btn-primary-gradient inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5"
            >
              Get a Free Mailbox Area Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DARK TRUST STRIP ── */}
      <section style={{ background: "hsl(0 0% 5%)" }} className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Camera Angles That Matter", desc: "We position every camera for facial capture, not just presence detection. Poor angles produce footage that can't identify anyone — we prevent that." },
              { num: "02", title: "Licensed Installation Professionals", desc: "License #B03066901. Our licensed team handles all conduit, mounting, and weatherproofing — no subcontractors." },
              { num: "03", title: "Direct Local Access", desc: "Owner Tim Townsend is reachable when you need to pull footage for a police report or resident dispute — not a national call center." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="shrink-0 mt-0.5">
                  <span className="font-display font-bold text-[11px] tracking-[0.14em]" style={{ color: "hsl(0 85% 50%)" }}>{p.num}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-2" style={{ fontSize: "15px" }}>{p.title}</h3>
                  <p className="leading-relaxed" style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.52)" }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 sm:py-16" style={{ background: "hsl(0 0% 97%)", borderTop: "1px solid hsl(0 0% 92%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-px w-4 rounded-full" style={{ background: "hsl(0 85% 52%)" }} />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "hsl(0 75% 55%)" }}>FAQ</span>
              </div>
              <h2 className="font-display font-bold text-gray-900"
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
                Mailbox & Package Camera Questions Answered
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 sm:text-right sm:max-w-[18rem] leading-relaxed">
              Specific answers for property managers and HOA boards dealing with package theft.
            </p>
          </motion.div>

          <div className="space-y-2">
            {[
              {
                q: "Does adding mailbox cameras actually reduce package theft?",
                a: (
                  <span>
                    Yes — the visible presence of cameras at mailbox clusters has a documented deterrent effect. Most opportunistic package thieves avoid monitored areas. For determined thieves, the footage provides the evidence needed for police investigation and resident notification. Properties with visible mailbox surveillance consistently report fewer complaints from residents about missing packages.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Schedule a free site assessment</Link>{" "}
                    to review your mailbox area coverage gaps.
                  </span>
                ),
              },
              {
                q: "Can cameras identify the person who took a package?",
                a: (
                  <span>
                    When cameras are positioned correctly — at the right height, angle, and with adequate lighting — yes. We design mailbox camera placements to maximize facial capture rather than just recording that someone was present. This means positioning cameras to capture approaching individuals, not just the top of their heads. For nighttime coverage, we use IR illumination suited for facial detail at the distances typical of mailbox clusters. Call{" "}
                    <a href="tel:7133879937" className="text-red-600 font-semibold hover:underline">(713) 387-9937</a>{" "}
                    to discuss your specific mailbox layout.
                  </span>
                ),
              },
              {
                q: "What if our property has both a mailroom and individual cluster mailboxes?",
                a: (
                  <span>
                    We design coverage for every mail-related location on your property — mailrooms, individual cluster stations, package lockers, and any parcel staging areas. Each location gets the appropriate camera count and positioning for maximum coverage. We assess your full property layout during the{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">free site visit</Link>{" "}
                    and design accordingly.
                  </span>
                ),
              },
              {
                q: "How does footage help when a resident files a complaint?",
                a: (
                  <span>
                    When a resident reports a stolen package or tampered mailbox, your management team can pull the specific footage window tied to the delivery timestamp and the complaint. Footage can confirm delivery, document removal, and identify the individual. This footage can be exported for police reports, HOA hearings, or provided to the resident for their own insurance claim.
                  </span>
                ),
              },
              {
                q: "Can mailbox cameras work with existing package lockers?",
                a: (
                  <span>
                    Yes. We install cameras alongside existing package locker systems from all major manufacturers. The cameras document who is accessing the lockers and when — independent of the locker's own internal logging, which may not capture all relevant detail or may not be accessible to property management for export.
                  </span>
                ),
              },
              {
                q: "What about data privacy and resident concerns?",
                a: (
                  <span>
                    Our systems are configured and used for legitimate security purposes within your property's common areas. Mailbox clusters and package areas are common property, not private spaces. We recommend posting visible signage indicating video surveillance is in use — both as a deterrent and as transparent notice to residents. All footage access is limited to authorized management personnel.
                  </span>
                ),
              },
              {
                q: "How long is mailbox footage stored?",
                a: (
                  <span>
                    Storage is configured to your property's needs during installation — typically 30 to 60 days of continuous recording. Given the frequency of package delivery-related complaints, we recommend at least 30 days of retention to ensure footage is available when a resident reports a theft that may have happened days earlier.{" "}
                    <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request your free assessment</Link>{" "}
                    and we'll size the storage to your property's volume.
                  </span>
                ),
              },
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.q}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.06 }}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-display font-semibold text-gray-900 text-[15px] leading-snug text-left">{faq.q}</h3>
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{ background: isOpen ? "hsl(0 85% 50%)" : "hsl(0 0% 93%)" }}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5 text-white" /> : <Plus className="w-3.5 h-3.5 text-gray-500" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 sm:px-6 pb-5">
                          <p className="text-[13.5px] text-gray-500 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABlock />
    </Layout>
  );
};

export default MailboxPackageCameras;
