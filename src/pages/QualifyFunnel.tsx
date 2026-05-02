import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  Home, Building2, Briefcase, Users,
  Camera, Bell, Radio, Car, RefreshCw,
  ArrowRight, Phone, CheckCircle2, ArrowLeft,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

/* ─── Types & Storage ───────────────────────────────────────── */
export type QualifyLead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  needs: string[];
  timeline: string;
  propertySize: string;
  submittedAt: string;
  source: string;
  status: string;
  service: string;
  value: string;
  date: string;
};

export function loadQualifyLeads(): QualifyLead[] {
  try {
    return JSON.parse(localStorage.getItem("tts_qualify_leads") || "[]");
  } catch {
    return [];
  }
}

function saveQualifyLead(lead: Omit<QualifyLead, "id">) {
  const existing = loadQualifyLeads();
  existing.unshift({ ...lead, id: Date.now() });
  localStorage.setItem("tts_qualify_leads", JSON.stringify(existing));
}

/* ─── Step Data ─────────────────────────────────────────────── */
const ROLES = [
  { label: "Homeowner", value: "homeowner", icon: Home, desc: "Protect my home & family" },
  { label: "Property Manager", value: "property-manager", icon: Building2, desc: "Manage multiple properties" },
  { label: "Business Owner", value: "business-owner", icon: Briefcase, desc: "Secure my business" },
  { label: "HOA / Board Member", value: "board-member", icon: Users, desc: "Protect our community" },
];

const NEEDS = [
  { label: "Security Cameras", value: "cameras", icon: Camera },
  { label: "Alarm System", value: "alarm", icon: Bell },
  { label: "24/7 Monitoring", value: "monitoring", icon: Radio },
  { label: "License Plate Recognition", value: "lpr", icon: Car },
  { label: "Switch Alarm Companies", value: "switch", icon: RefreshCw },
];

const TIMELINES = [
  { label: "Right now", value: "asap", emoji: "🔥" },
  { label: "Within 3 months", value: "soon", emoji: "📅" },
  { label: "Just exploring", value: "exploring", emoji: "👀" },
];

const PROPERTY_SIZES = [
  { label: "Home / Condo", value: "home", desc: "Single property" },
  { label: "Small Business", value: "small-biz", desc: "1–2 locations" },
  { label: "Mid-Size Property", value: "mid", desc: "2–10 buildings" },
  { label: "Large Portfolio", value: "large", desc: "10+ units / sites" },
];

const STEP_LABELS = ["About You", "What You Need", "Quick Questions", "Contact"];

/* ─── Progress Bar ──────────────────────────────────────────── */
function ProgressBar({ step }: { step: number }) {
  const pct = Math.round(((step + 1) / STEP_LABELS.length) * 100);
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {STEP_LABELS.map((l, i) => (
              <div key={l} className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300"
                  style={{
                    background: i < step ? "hsl(120 55% 48%)" : i === step ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                    color: i <= step ? "white" : "rgb(156 163 175)",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="hidden sm:inline text-[11px] font-medium transition-colors" style={{ color: i === step ? "hsl(0 85% 50%)" : i < step ? "rgb(107 114 128)" : "rgb(209 213 219)" }}>
                  {l}
                </span>
                {i < STEP_LABELS.length - 1 && <div className="w-4 h-px bg-gray-200 hidden sm:block" />}
              </div>
            ))}
          </div>
          <span className="text-[12px] font-semibold" style={{ color: "hsl(0 85% 50%)" }}>{pct}%</span>
        </div>
        <div className="w-full h-1 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(0 85% 50%), hsl(0 85% 58%))" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: easeExpo }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
const QualifyFunnel = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [role, setRole] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "", address: "" });

  const toggleNeed = (v: string) =>
    setNeeds(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const canProceed = useCallback(() => {
    if (step === 0) return !!role;
    if (step === 1) return needs.length > 0;
    if (step === 2) return !!timeline;
    if (step === 3) return !!(contact.name && contact.phone && contact.email);
    return true;
  }, [step, role, needs, timeline, contact]);

  const next = () => { if (canProceed() && step < 3) setStep(s => s + 1); };
  const back = () => { if (step > 0) setStep(s => s - 1); };

  const handleRoleSelect = (val: string) => {
    setRole(val);
    setTimeout(() => setStep(1), 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    saveQualifyLead({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      role,
      needs,
      timeline,
      propertySize,
      submittedAt: now.toISOString(),
      source: "Qualify Funnel",
      status: "new",
      service: needs.map(n => NEEDS.find(x => x.value === n)?.label || n).join(", "),
      value: "TBD",
      date: dateStr,
    });
    setSubmitted(true);
  };

  /* Success screen */
  if (submitted) {
    return (
      <Layout>
        <SEOHead title="Request Received | Texas Total Security" description="Thank you — a specialist will reach out within 2 hours." />
        <section className="min-h-screen flex items-center justify-center bg-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="text-center max-w-md mx-auto py-20"
          >
            <motion.div
              className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ background: "hsl(120 55% 48% / 0.1)", border: "2px solid hsl(120 55% 48% / 0.3)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
            >
              <CheckCircle2 className="w-12 h-12" style={{ color: "hsl(120 55% 48%)" }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="text-3xl mb-3">🎉</div>
              <h1 className="font-display font-bold text-gray-900 text-3xl mb-3 tracking-tight">You're all set!</h1>
              <p className="text-gray-500 text-lg mb-2">A local specialist will review your info and reach out within 2 business hours.</p>
              <p className="text-gray-400 text-sm mb-10">Need something sooner? Call us directly.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 text-base">
                  <Phone className="w-5 h-5" /> (713) 387-9937
                </a>
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600 font-medium">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Get a Free Security Analysis | Texas Total Security"
        description="Find out what your property needs in 60 seconds. No obligation, no pressure — just local experts who know Houston."
      />

      <ProgressBar step={step} />

      <section className="min-h-[calc(100vh-72px)] bg-gray-50 relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, hsl(0 85% 45% / 0.025) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.28, ease: easeExpo }}
            >

              {/* ── Step 0: Who are you? ── */}
              {step === 0 && (
                <div>
                  <div className="text-center mb-8">
                    <p className="text-[13px] font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(0 85% 55%)" }}>Step 1 of 4</p>
                    <h1 className="font-display font-bold text-gray-900 mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", letterSpacing: "-0.04em" }}>
                      What best describes you?
                    </h1>
                    <p className="text-gray-500 text-[15px]">We'll tailor everything to your situation.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map((r) => {
                      const selected = role === r.value;
                      return (
                        <motion.button
                          key={r.value}
                          onClick={() => handleRoleSelect(r.value)}
                          className="relative text-left rounded-2xl p-5 transition-all"
                          style={{
                            background: selected ? "hsl(0 85% 45% / 0.07)" : "white",
                            border: `1.5px solid ${selected ? "hsl(0 85% 45% / 0.45)" : "rgb(229 231 235)"}`,
                            boxShadow: selected ? "0 0 20px hsl(0 85% 45% / 0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
                          }}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {selected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: "hsl(0 85% 50%)" }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{
                            background: selected ? "hsl(0 85% 45% / 0.12)" : "rgb(249 250 251)",
                            border: `1px solid ${selected ? "hsl(0 85% 45% / 0.25)" : "rgb(229 231 235)"}`,
                          }}>
                            <r.icon className="w-5 h-5" style={{ color: selected ? "hsl(0 85% 50%)" : "rgb(107 114 128)" }} />
                          </div>
                          <p className="font-display font-semibold text-[14px] text-gray-900 mb-0.5">{r.label}</p>
                          <p className="text-[12px] text-gray-400">{r.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                  <p className="text-center text-[11px] text-gray-400 mt-6">Tap to select · Takes about 60 seconds</p>
                </div>
              )}

              {/* ── Step 1: What do you need? ── */}
              {step === 1 && (
                <div>
                  <div className="text-center mb-8">
                    <p className="text-[13px] font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(0 85% 55%)" }}>Step 2 of 4</p>
                    <h2 className="font-display font-bold text-gray-900 mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", letterSpacing: "-0.04em" }}>
                      What are you looking for?
                    </h2>
                    <p className="text-gray-500 text-[15px]">Select everything that applies — we'll build around it.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {NEEDS.map((n) => {
                      const selected = needs.includes(n.value);
                      return (
                        <motion.button
                          key={n.value}
                          onClick={() => toggleNeed(n.value)}
                          className="flex flex-col items-center text-center rounded-2xl py-5 px-3 transition-all"
                          style={{
                            background: selected ? "hsl(0 85% 45% / 0.07)" : "white",
                            border: `1.5px solid ${selected ? "hsl(0 85% 45% / 0.45)" : "rgb(229 231 235)"}`,
                            boxShadow: selected ? "0 0 16px hsl(0 85% 45% / 0.1)" : "0 1px 4px rgba(0,0,0,0.04)",
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5" style={{
                            background: selected ? "hsl(0 85% 45% / 0.12)" : "rgb(249 250 251)",
                          }}>
                            <n.icon className="w-5 h-5" style={{ color: selected ? "hsl(0 85% 50%)" : "rgb(107 114 128)" }} />
                          </div>
                          <span className="font-semibold text-[13px]" style={{ color: selected ? "rgb(17 24 39)" : "rgb(107 114 128)" }}>{n.label}</span>
                          {selected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-1.5">
                              <CheckCircle2 className="w-4 h-4" style={{ color: "hsl(0 85% 55%)" }} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 2: Quick Questions ── */}
              {step === 2 && (
                <div>
                  <div className="text-center mb-8">
                    <p className="text-[13px] font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(0 85% 55%)" }}>Step 3 of 4</p>
                    <h2 className="font-display font-bold text-gray-900 mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", letterSpacing: "-0.04em" }}>
                      Two quick questions
                    </h2>
                    <p className="text-gray-500 text-[15px]">Almost there — these help us prepare for your call.</p>
                  </div>

                  {/* Timeline */}
                  <div className="mb-7">
                    <p className="font-semibold text-gray-800 text-[14px] mb-3">When do you want to get this done?</p>
                    <div className="grid grid-cols-3 gap-3">
                      {TIMELINES.map(t => {
                        const sel = timeline === t.value;
                        return (
                          <button
                            key={t.value}
                            onClick={() => setTimeline(t.value)}
                            className="rounded-2xl py-4 px-3 text-center transition-all"
                            style={{
                              background: sel ? "hsl(0 85% 45% / 0.07)" : "white",
                              border: `1.5px solid ${sel ? "hsl(0 85% 45% / 0.45)" : "rgb(229 231 235)"}`,
                            }}
                          >
                            <div className="text-2xl mb-1">{t.emoji}</div>
                            <p className="font-semibold text-[13px]" style={{ color: sel ? "rgb(17 24 39)" : "rgb(107 114 128)" }}>{t.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Property Size */}
                  <div>
                    <p className="font-semibold text-gray-800 text-[14px] mb-3">What size property?</p>
                    <div className="grid grid-cols-2 gap-3">
                      {PROPERTY_SIZES.map(s => {
                        const sel = propertySize === s.value;
                        return (
                          <button
                            key={s.value}
                            onClick={() => setPropertySize(s.value)}
                            className="rounded-2xl py-3.5 px-4 text-left transition-all"
                            style={{
                              background: sel ? "hsl(0 85% 45% / 0.07)" : "white",
                              border: `1.5px solid ${sel ? "hsl(0 85% 45% / 0.45)" : "rgb(229 231 235)"}`,
                            }}
                          >
                            <p className="font-semibold text-[13px]" style={{ color: sel ? "rgb(17 24 39)" : "rgb(107 114 128)" }}>{s.label}</p>
                            <p className="text-[11px] text-gray-400">{s.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3: Contact ── */}
              {step === 3 && (
                <div>
                  <div className="text-center mb-8">
                    <p className="text-[13px] font-bold tracking-widest uppercase mb-3" style={{ color: "hsl(0 85% 55%)" }}>Last Step</p>
                    <h2 className="font-display font-bold text-gray-900 mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", letterSpacing: "-0.04em" }}>
                      Where should we reach you?
                    </h2>
                    <p className="text-gray-500 text-[15px]">A real local person — not a bot — will call you within 2 hours.</p>
                  </div>

                  {/* Summary chip */}
                  {(role || needs.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap gap-2 justify-center mb-7"
                    >
                      {role && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: "hsl(0 85% 45% / 0.08)", color: "hsl(0 85% 50%)", border: "1px solid hsl(0 85% 45% / 0.2)" }}>
                          {ROLES.find(r => r.value === role)?.label}
                        </span>
                      )}
                      {needs.map(n => (
                        <span key={n} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600">
                          {NEEDS.find(x => x.value === n)?.label}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { label: "Full Name *", key: "name", type: "text", placeholder: "John Smith", required: true },
                      { label: "Phone *", key: "phone", type: "tel", placeholder: "(713) 555-0000", required: true },
                      { label: "Email *", key: "email", type: "email", placeholder: "john@email.com", required: true },
                      { label: "Property Address (optional)", key: "address", type: "text", placeholder: "123 Main St, Houston TX", required: false },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          required={field.required}
                          value={contact[field.key as keyof typeof contact]}
                          onChange={e => setContact({ ...contact, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3.5 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-all bg-white border border-gray-200 focus:border-red-400 focus:shadow-[0_0_0_3px_hsl(0_85%_45%/0.1)]"
                        />
                      </div>
                    ))}

                    <button
                      type="submit"
                      disabled={!canProceed()}
                      className="btn-primary-gradient w-full flex items-center justify-center gap-2 py-4 text-[15px] font-semibold mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ boxShadow: "0 4px 20px hsl(0 85% 45% / 0.3)" }}
                    >
                      Get My Free Analysis <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-center text-[11px] text-gray-400">
                      🔒 We never share or sell your info. Ever.
                    </p>
                  </form>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Nav buttons — only steps 1–2 need explicit Continue */}
          {(step === 1 || step === 2) && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={back}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={next}
                disabled={!canProceed()}
                className="btn-primary-gradient flex items-center gap-2 px-8 py-3 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="mt-4">
              <button
                onClick={back}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>
          )}

          <p className="text-center text-[11px] text-gray-300 mt-6">
            Takes ~60 seconds · No obligation · We'll tell you straight if there's a fit
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default QualifyFunnel;
