import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  generateLocalBusinessSchema,
  generateEnhancedServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import {
  Phone, ArrowRight, CheckCircle2, Clock, Users, Lock, Award, Radio, ShieldCheck,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.2 };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

const benefits = [
  {
    icon: Clock,
    title: "1-2 Day Turnarounds",
    desc: "Quick local deployment vs. national multi-week corporate delays.",
  },
  {
    icon: Users,
    title: "Real Local People",
    desc: "Direct connection to neighborhood technicians by name — stop waiting on hold.",
  },
  {
    icon: Lock,
    title: "In-House Contracts",
    desc: "We never sell your account to these guys: ADT, Brinks, Vivint, Alert 360, or other big national chains.",
  },
  {
    icon: Award,
    title: "30+ Years Experience",
    desc: "Elite installation quality backed by seasoned, senior local field experts.",
  },
  {
    icon: Radio,
    title: "Identical Police Dispatch",
    desc: "Seamless emergency alarm handling, processed through the exact same back-end monitoring networks.",
  },
];

const keypadPoints = [
  "There are absolutely no issues with your system — hardwired alarms are the most reliable on the market.",
  "We want to keep your hardwired system going for years to come.",
  "We handle 100% of the reprogramming, so you don't lift a finger.",
];

const offerFaqs = [
  {
    question: "Do I have to replace my Honeywell keypad to switch?",
    answer: "No. If your home has a Honeywell keypad like the one shown above, Texas Total Security can typically reprogram your existing hardwired system to work with our monitoring — no new equipment required.",
  },
  {
    question: "Will you sell my account to another company later?",
    answer: "No. Your contract stays in-house with Texas Total Security. We never sell or transfer accounts to ADT, Brinks, Vivint, Alert 360, or any other national chain.",
  },
  {
    question: "How fast can I switch from my current alarm company?",
    answer: "Most local switches are completed in 1-2 days, compared to the multi-week delays common with large national providers.",
  },
];

const CtaBand = ({ label }: { label: string }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    transition={{ duration: 0.6, ease: easeExpo }}
    className="relative overflow-hidden rounded-3xl"
    style={{
      background: "linear-gradient(135deg, hsl(0 85% 46%) 0%, hsl(0 90% 36%) 100%)",
      boxShadow: "0 20px 48px hsl(0 85% 30% / 0.28)",
    }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
    <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
      <p className="text-white/85 font-bold text-[13px] uppercase tracking-[0.14em] mb-2">{label}</p>
      <h2
        className="font-display font-black text-white leading-tight mb-4"
        style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em" }}
      >
        Call Now to Speak With a<br className="hidden sm:block" /> Houston Security Professional!
      </h2>
      <div
        className="inline-flex flex-col items-center gap-1 rounded-2xl px-6 py-4 mb-6"
        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}
      >
        <p className="text-white font-bold text-[15px] sm:text-[17px] leading-snug">
          Some new customers are getting $49.99, $39.99, or even $29.99!
        </p>
        <p className="text-white/80 text-[13px]">Call now to get more details and see what you qualify for.</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <motion.a
          href="tel:7133879937"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 font-black px-8 py-4 text-sm sm:text-base rounded-xl whitespace-nowrap w-full sm:w-auto"
          style={{ background: "#ffffff", color: "hsl(0 85% 40%)", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
        >
          <Phone className="w-5 h-5 shrink-0" />
          CALL TODAY: (713) 387-9937
        </motion.a>
      </div>
      <p className="text-white/70 text-[12px] mt-4">
        Visit{" "}
        <a href="https://www.texastotalsecurity.com" className="underline decoration-white/40 hover:decoration-white">
          TexasTotalSecurity.com
        </a>
      </p>
    </div>
  </motion.div>
);

const HoneywellOffer = () => {
  const schemas = [
    generateLocalBusinessSchema(),
    generateEnhancedServiceSchema(
      "Honeywell Alarm Takeover & Activation Offer",
      "Switch your Houston alarm monitoring to Texas Total Security and keep your existing Honeywell keypad. We reprogram compatible hardwired systems with no new equipment required.",
      "/honeywell-keypad-offer",
      "Alarm System Takeover",
      ["honeywell keypad", "switch alarm company houston", "alarm takeover", "adt alternative"],
      offerFaqs
    ),
    generateFAQSchema(offerFaqs),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "Honeywell Activation Offer", href: "/honeywell-keypad-offer" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Honeywell Keypad Activation Offer | Switch Alarm Companies in Houston"
        description="Have a Honeywell keypad? Switch to Texas Total Security and keep your hardwired system. Local Houston technicians, in-house contracts, 1-2 day turnarounds. Call (713) 387-9937."
        schemas={schemas}
        ogImage="/honeywell-6160-keypad.png"
        ogImageAlt="Honeywell hardwired alarm keypad"
      />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 8% -5%, hsl(0 85% 96%) 0%, transparent 55%), " +
            "radial-gradient(ellipse 45% 40% at 100% 105%, hsl(212 45% 96%) 0%, transparent 60%), " +
            "#ffffff",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(hsl(0 0% 74%) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            opacity: 0.28,
          }}
        />
        <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: "linear-gradient(90deg, hsl(0 85% 50%), hsl(0 85% 50%) 50%, transparent)" }} />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 pt-14 pb-12 sm:pt-16 sm:pb-14 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, ease: easeExpo }}
            className="inline-flex items-center gap-2 mb-5 rounded-full pl-2.5 pr-3.5 py-1.5"
            style={{ border: "1px solid hsl(0 85% 44% / 0.18)", background: "rgba(255,255,255,0.75)" }}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full shrink-0" style={{ background: "hsl(0 85% 44%)" }}>
              <ShieldCheck className="w-2.5 h-2.5 text-white" />
            </span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(0 85% 38%)" }}>
              Exclusive Offer for Houston Homeowners
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.06 }}
            className="font-display font-black text-gray-950 mb-3"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.1rem)", lineHeight: 1.08, letterSpacing: "-0.03em", textWrap: "balance" }}
          >
            Ready for a Reliable Local Team That Actually Cares?
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.12 }}
            className="font-bold mb-8"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "hsl(0 85% 44%)" }}
          >
            Ditch the corporate giants &amp; switch to Texas Total Security today!
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.16 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="tel:7133879937"
              className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 text-white text-sm rounded-xl whitespace-nowrap w-full sm:w-auto"
              style={{ background: "linear-gradient(135deg, hsl(0 85% 48%), hsl(0 90% 38%))", boxShadow: "0 6px 20px hsl(0 85% 40% / 0.3)" }}
            >
              <Phone className="w-4 h-4 shrink-0" />
              Call (713) 387-9937
            </a>
            <Link
              to="/request-callback"
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 text-sm rounded-xl whitespace-nowrap w-full sm:w-auto"
              style={{ border: "1.5px solid hsl(0 0% 0% / 0.13)", background: "#ffffff", color: "#111" }}
            >
              Request a Callback
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </motion.div>
        </div>

        {/* Benefits */}
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 pb-14 sm:pb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 rounded-2xl bg-white p-5 ${idx === 4 ? "sm:col-span-2" : ""}`}
                style={{ border: "1px solid hsl(0 0% 90%)", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ border: "1.5px solid hsl(0 85% 44% / 0.3)", background: "hsl(0 85% 44% / 0.05)" }}
                >
                  <b.icon className="w-5 h-5" style={{ color: "hsl(0 85% 44%)" }} />
                </div>
                <div>
                  <p className="font-bold text-gray-950 text-[0.98rem] mb-1">{b.title}</p>
                  <p className="text-gray-500 leading-snug text-[0.87rem]">{b.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BAND #1
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "hsl(0 0% 98%)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
          <CtaBand label="Tired of Your Current Company?" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          KEYPAD IDENTIFICATION
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-14 sm:py-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
          >
            <div
              className="inline-flex items-center gap-2 mb-4 rounded-full px-3.5 py-1.5"
              style={{ background: "hsl(0 85% 44% / 0.07)", border: "1px solid hsl(0 85% 44% / 0.18)" }}
            >
              <span className="text-[10.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(0 85% 38%)" }}>
                Exclusive Honeywell Limited-Time Activation Offer Inside
              </span>
            </div>
            <h2
              className="font-display font-black text-gray-950 mb-3"
              style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)", letterSpacing: "-0.03em", textWrap: "balance" }}
            >
              Do You Have This Keypad?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.65, ease: easeExpo }}
              className="relative mx-auto max-w-xs lg:max-w-none"
            >
              <div
                className="absolute rounded-[2.5rem] pointer-events-none"
                style={{
                  inset: "-1rem",
                  background: "linear-gradient(135deg, hsl(0 85% 90%) 0%, hsl(212 55% 92%) 100%)",
                  opacity: 0.55,
                  filter: "blur(24px)",
                  zIndex: 0,
                }}
              />
              <div
                className="relative overflow-hidden rounded-2xl bg-white p-6"
                style={{ border: "1px solid hsl(0 0% 90%)", boxShadow: "0 20px 48px rgba(0,0,0,0.1)", zIndex: 1 }}
              >
                <img
                  src="/honeywell-6160-keypad.png"
                  alt="Honeywell hardwired alarm keypad — if this is on your wall, this offer applies to you"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.6, ease: easeExpo, delay: 0.1 }}
            >
              <p className="text-gray-600 leading-relaxed text-[1.02rem] mb-6">
                If your home has this Honeywell keypad, we want to do business with you! Texas Total Security recommends and installs hardwired alarms because they are the most reliable systems on the market — and we want to keep your hardwired system going for years to come while we earn our spot as your go-to security company.
              </p>
              <ul className="space-y-3 mb-8">
                {keypadPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ background: "hsl(145 60% 94%)" }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "hsl(145 65% 34%)" }} />
                    </span>
                    <span className="text-gray-700 leading-snug text-[0.95rem]">{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="tel:7133879937"
                className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 text-white text-sm rounded-xl whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, hsl(0 85% 48%), hsl(0 90% 38%))", boxShadow: "0 6px 20px hsl(0 85% 40% / 0.3)" }}
              >
                <Phone className="w-4 h-4 shrink-0" />
                Claim This Offer — Call Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BAND #2 — closing
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "hsl(0 0% 98%)", borderTop: "1px solid hsl(0 0% 91%)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
          <CtaBand label="Tired of Your Current Company?" />
        </div>
      </section>
    </Layout>
  );
};

export default HoneywellOffer;
