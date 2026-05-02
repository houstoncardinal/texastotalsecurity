import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  CheckCircle2, ArrowRight, ArrowLeft, Phone,
  Building2, Shield, Camera, Radio, MapPin,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const STEP_LABELS = ["Your Property", "Current Security", "Your Goals", "Contact"];

/* ─── Lead storage ──────────────────────────────────────────── */
export interface AssessmentLead {
  id: number;
  submittedAt: string;
  propertyType: string;
  unitCount: string;
  buildingCount: string;
  propertySize: string;
  hasCameras: string;
  hasAlarm: string;
  cameraCount: string;
  primaryConcern: string;
  services: string[];
  additionalNotes: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export function loadAssessmentLeads(): AssessmentLead[] {
  try {
    return JSON.parse(localStorage.getItem("tts_assessment_leads") || "[]");
  } catch { return []; }
}

export function deleteAssessmentLead(id: number) {
  try {
    const existing = loadAssessmentLeads().filter(l => l.id !== id);
    localStorage.setItem("tts_assessment_leads", JSON.stringify(existing));
  } catch { /* ignore */ }
}

function saveAssessmentLead(lead: Omit<AssessmentLead, "id">) {
  try {
    const existing = loadAssessmentLeads();
    existing.unshift({ ...lead, id: Date.now() });
    localStorage.setItem("tts_assessment_leads", JSON.stringify(existing));
  } catch { /* ignore */ }
}

/* ─── ProgressBar ───────────────────────────────────────────── */
function ProgressBar({ step }: { step: number }) {
  const pct = Math.round(((step + 1) / STEP_LABELS.length) * 100);
  return (
    <div className="sticky top-[68px] lg:top-[108px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
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
const PropertyAssessment = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  /* Step 0 — Property */
  const [propertyType, setPropertyType] = useState("");
  const [unitCount, setUnitCount] = useState("");
  const [buildingCount, setBuildingCount] = useState("");
  const [propertySize, setPropertySize] = useState("");

  /* Step 1 — Current Security */
  const [hasCameras, setHasCameras] = useState("");
  const [hasAlarm, setHasAlarm] = useState("");
  const [cameraCount, setCameraCount] = useState("");
  const [primaryConcern, setPrimaryConcern] = useState("");

  /* Step 2 — Goals */
  const [services, setServices] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  /* Step 3 — Contact */
  const [contact, setContact] = useState({ name: "", phone: "", email: "", address: "" });

  const toggleService = (v: string) =>
    setServices(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const canProceed = useCallback(() => {
    if (step === 0) return !!propertyType;
    if (step === 1) return !!(hasCameras && hasAlarm && primaryConcern);
    if (step === 2) return services.length > 0;
    if (step === 3) return !!(contact.name && contact.phone && contact.email);
    return true;
  }, [step, propertyType, hasCameras, hasAlarm, primaryConcern, services, contact]);

  const next = () => { if (canProceed() && step < 3) setStep(s => s + 1); };
  const back = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveAssessmentLead({
      submittedAt: new Date().toISOString(),
      propertyType, unitCount, buildingCount, propertySize,
      hasCameras, hasAlarm, cameraCount, primaryConcern,
      services, additionalNotes,
      name: contact.name, phone: contact.phone, email: contact.email, address: contact.address,
    });
    setSubmitted(true);
  };

  /* ── Success ── */
  if (submitted) {
    return (
      <Layout>
        <SEOHead title="Assessment Received | Texas Total Security" description="We'll review your property details and reach out within 2 business hours." />
        <section className="min-h-screen flex items-center justify-center bg-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpo }}
            className="text-center max-w-lg mx-auto py-20"
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
            <h1 className="font-display font-bold text-gray-900 text-3xl mb-3 tracking-tight">We've got your property details!</h1>
            <p className="text-gray-500 text-lg mb-2">
              A local security specialist will review your assessment and reach out within <strong className="text-gray-800">2 business hours</strong>.
            </p>
            <p className="text-gray-400 text-sm mb-4">We'll put together a property-specific security plan with transparent pricing — no pressure, no obligation.</p>
            <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-3">What happens next:</p>
              <div className="space-y-2">
                {[
                  "We review your property type, size, and security goals",
                  "We identify the best equipment and configuration for your property",
                  "We schedule a free onsite visit at your convenience",
                  "You get a detailed proposal with transparent pricing",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold" style={{ color: "hsl(0 85% 50%)" }}>{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 text-base">
                <Phone className="w-4 h-4" /> Call Now — (713) 387-9937
              </a>
              <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Back to Home</Link>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-red-400 transition-colors placeholder:text-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-800 mb-1.5";

  const propertyTypes = [
    { value: "hoa", label: "HOA / Gated Community", icon: Building2 },
    { value: "apartment", label: "Apartment Complex", icon: Building2 },
    { value: "office", label: "Office / Commercial", icon: Building2 },
    { value: "retail", label: "Retail / Restaurant", icon: Building2 },
    { value: "industrial", label: "Industrial / Warehouse", icon: Building2 },
    { value: "residential", label: "Residential Home", icon: Building2 },
  ];

  const serviceOptions = [
    { value: "cameras",      icon: Camera,    label: "Security Camera System",    desc: "4K IP cameras, PTZ, wide-angle coverage" },
    { value: "lpr",          icon: Camera,    label: "License Plate Recognition",  desc: "LPR cameras at gates and entry points" },
    { value: "alarm",        icon: Shield,    label: "Alarm System & Monitoring",  desc: "Intrusion detection with professional monitoring" },
    { value: "poles",        icon: Building2, label: "Security Poles",             desc: "Custom-height poles with multiple cameras" },
    { value: "deterrence",   icon: Radio,     label: "Active Deterrence",          desc: "Sirens, strobes, two-way audio cameras" },
    { value: "monitoring",   icon: Radio,     label: "Monitoring Takeover",        desc: "Take over monitoring on your existing equipment" },
    { value: "proactive",    icon: Shield,    label: "Proactive System Monitoring", desc: "We flag hardware issues before they become failures" },
    { value: "full-design",  icon: MapPin,    label: "Full System Design",         desc: "Let us design the complete security plan" },
  ];

  const concerns = [
    "Crime deterrence & prevention",
    "Liability protection",
    "Insurance requirements",
    "Package & mail theft",
    "Unauthorized access",
    "All of the above",
  ];

  return (
    <Layout>
      <SEOHead
        title="Free Property Security Assessment — Multi-Family & Commercial | Texas Total Security"
        description="Tell us about your property and security goals. We'll design a custom security plan for your HOA, apartment complex, or commercial property — free, no obligation."
        schemas={[]}
      />
      <ProgressBar step={step} />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: "hsl(0 85% 50% / 0.08)", color: "hsl(0 85% 50%)" }}>
            Free Property Security Assessment
          </div>
          <h1 className="font-display font-bold text-gray-900 text-2xl sm:text-3xl tracking-tight mb-2">
            Tell Us About Your Property
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Takes about 2 minutes. We use this to design the right security system for your specific property — then schedule your free onsite visit.
          </p>
        </div>
      </div>

      {/* Form body */}
      <div className="min-h-[70vh] bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ── STEP 0: Your Property ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: easeExpo }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(0 85% 50% / 0.1)" }}>
                    <Building2 className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h2 className="font-display font-bold text-gray-900 text-lg">Your Property</h2>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-800 mb-3">What type of property is this? <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {propertyTypes.map((pt) => (
                      <button
                        key={pt.value}
                        type="button"
                        onClick={() => setPropertyType(pt.value)}
                        className="py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 text-left leading-snug"
                        style={{
                          borderColor: propertyType === pt.value ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                          background: propertyType === pt.value ? "hsl(0 85% 50%)" : "white",
                          color: propertyType === pt.value ? "white" : "rgb(75 85 99)",
                        }}
                      >
                        {pt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {(propertyType === "hoa" || propertyType === "apartment") && (
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className={labelClass}>Number of units</label>
                      <input
                        type="text"
                        placeholder="e.g. 120 units"
                        value={unitCount}
                        onChange={(e) => setUnitCount(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Number of buildings</label>
                      <input
                        type="text"
                        placeholder="e.g. 4 buildings"
                        value={buildingCount}
                        onChange={(e) => setBuildingCount(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {(propertyType === "office" || propertyType === "retail" || propertyType === "industrial") && (
                  <div className="mb-5">
                    <label className={labelClass}>Approximate property size</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["Under 2,500 sq ft", "2,500–10,000 sq ft", "10,000–50,000 sq ft", "50,000+ sq ft"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setPropertySize(s)}
                          className="py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all duration-200 leading-snug text-center"
                          style={{
                            borderColor: propertySize === s ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                            background: propertySize === s ? "hsl(0 85% 50%)" : "white",
                            color: propertySize === s ? "white" : "rgb(75 85 99)",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed()}
                  className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: canProceed() ? "linear-gradient(135deg, hsl(0 85% 50%), hsl(0 85% 42%))" : "rgb(229 231 235)",
                    color: canProceed() ? "white" : "rgb(156 163 175)",
                  }}
                >
                  Continue — Current Security <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ── STEP 1: Current Security ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: easeExpo }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(0 85% 50% / 0.1)" }}>
                    <Camera className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h2 className="font-display font-bold text-gray-900 text-lg">Your Current Security</h2>
                </div>

                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Does your property currently have security cameras? <span className="text-red-500">*</span></p>
                  <div className="flex gap-2 mb-3">
                    {["Yes", "No", "Some but not enough"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setHasCameras(opt)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-200 leading-snug"
                        style={{
                          borderColor: hasCameras === opt ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                          background: hasCameras === opt ? "hsl(0 85% 50%)" : "white",
                          color: hasCameras === opt ? "white" : "rgb(75 85 99)",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {(hasCameras === "Yes" || hasCameras === "Some but not enough") && (
                    <input
                      type="text"
                      placeholder="Approximately how many cameras?"
                      value={cameraCount}
                      onChange={(e) => setCameraCount(e.target.value)}
                      className={inputClass}
                    />
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Does your property have an active alarm system? <span className="text-red-500">*</span></p>
                  <div className="flex gap-2">
                    {["Yes", "No", "Not sure"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setHasAlarm(opt)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200"
                        style={{
                          borderColor: hasAlarm === opt ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                          background: hasAlarm === opt ? "hsl(0 85% 50%)" : "white",
                          color: hasAlarm === opt ? "white" : "rgb(75 85 99)",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-800 mb-3">What is your primary security concern? <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {concerns.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPrimaryConcern(c)}
                        className="py-2.5 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-200 text-left"
                        style={{
                          borderColor: primaryConcern === c ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                          background: primaryConcern === c ? "hsl(0 85% 50%)" : "white",
                          color: primaryConcern === c ? "white" : "rgb(75 85 99)",
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={back} className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-300 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canProceed()}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                    style={{
                      background: canProceed() ? "linear-gradient(135deg, hsl(0 85% 50%), hsl(0 85% 42%))" : "rgb(229 231 235)",
                      color: canProceed() ? "white" : "rgb(156 163 175)",
                    }}
                  >
                    Continue — Your Goals <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Goals ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: easeExpo }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(0 85% 50% / 0.1)" }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h2 className="font-display font-bold text-gray-900 text-lg">What Services Are You Looking For?</h2>
                </div>

                <p className="text-sm font-semibold text-gray-800 mb-3">Select everything that applies: <span className="text-red-500">*</span></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {serviceOptions.map((item) => {
                    const active = services.includes(item.value);
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => toggleService(item.value)}
                        className="flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200"
                        style={{
                          borderColor: active ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                          background: active ? "hsl(0 85% 50% / 0.04)" : "white",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200"
                          style={{ background: active ? "hsl(0 85% 50%)" : "rgb(243 244 246)" }}
                        >
                          <item.icon className="w-4 h-4" style={{ color: active ? "white" : "rgb(107 114 128)" }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mb-5">
                  <label className={labelClass}>Anything else you'd like us to know?</label>
                  <textarea
                    rows={3}
                    placeholder="Special requirements, timeline, or concerns about your property..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={back} className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-300 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canProceed()}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                    style={{
                      background: canProceed() ? "linear-gradient(135deg, hsl(0 85% 50%), hsl(0 85% 42%))" : "rgb(229 231 235)",
                      color: canProceed() ? "white" : "rgb(156 163 175)",
                    }}
                  >
                    Continue — Contact Info <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Contact ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: easeExpo }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(0 85% 50% / 0.1)" }}>
                    <Phone className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h2 className="font-display font-bold text-gray-900 text-lg">How Do We Reach You?</h2>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      A licensed security specialist will personally review your assessment and reach out to schedule your free onsite visit. No sales pressure, no call centers.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={contact.name}
                        onChange={(e) => setContact(c => ({ ...c, name: e.target.value }))}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        placeholder="(713) 000-0000"
                        value={contact.phone}
                        onChange={(e) => setContact(c => ({ ...c, phone: e.target.value }))}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={contact.email}
                        onChange={(e) => setContact(c => ({ ...c, email: e.target.value }))}
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Property Address <span className="text-gray-400 font-normal">(optional)</span></label>
                      <input
                        type="text"
                        placeholder="Full address or Houston area"
                        value={contact.address}
                        onChange={(e) => setContact(c => ({ ...c, address: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Summary recap */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-xs text-gray-500">
                    {propertyType && <div className="flex justify-between"><span>Property type:</span> <span className="font-medium text-gray-700 capitalize">{propertyType.replace("-", " ")}</span></div>}
                    {unitCount && <div className="flex justify-between"><span>Units:</span> <span className="font-medium text-gray-700">{unitCount}</span></div>}
                    {primaryConcern && <div className="flex justify-between"><span>Primary concern:</span> <span className="font-medium text-gray-700 text-right max-w-[60%]">{primaryConcern}</span></div>}
                    {services.length > 0 && <div className="flex justify-between"><span>Services needed:</span> <span className="font-medium text-gray-700 text-right max-w-[60%]">{services.length} selected</span></div>}
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={back} className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-300 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={!canProceed()}
                      className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                      style={{
                        background: canProceed() ? "linear-gradient(135deg, hsl(0 85% 50%), hsl(0 85% 42%))" : "rgb(229 231 235)",
                        color: canProceed() ? "white" : "rgb(156 163 175)",
                        boxShadow: canProceed() ? "0 4px 20px hsl(0 85% 45% / 0.3)" : "none",
                      }}
                    >
                      Submit My Assessment <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-4">No spam. No pressure. A licensed local specialist will call you.</p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Trust strip */}
      <div className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-2xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: Shield,       label: "LIC# B03066901" },
              { icon: Phone,        label: "Talk to the Owner" },
              { icon: Camera,       label: "15+ Years in Houston" },
              { icon: CheckCircle2, label: "Free — No Obligation" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5">
                <item.icon className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
                <p className="text-[11px] font-semibold text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyAssessment;
