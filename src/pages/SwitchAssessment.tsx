import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  CheckCircle2, ArrowRight, ArrowLeft, Phone,
  Upload, X, AlertCircle, Wrench, Plus,
  Users, DollarSign, Shield, Camera,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const STEP_LABELS = ["Your System", "Current Provider", "Your Goals", "Contact"];

/* ─── Lead storage ──────────────────────────────────────────── */
export interface SwitchLead {
  id: number;
  submittedAt: string;
  // Equipment
  systemType: string;
  systemTypeOther: string;
  hasEquipmentProblems: string;
  hasSensorProblems: string;
  bypassingZones: string;
  bypassedZoneDetails: string;
  canSetAlarm: string;
  missingEquipment: string;
  keypAdPhotoName: string;
  // Provider
  currentCompany: string;
  monthlyBill: string;
  billingFrequency: string;
  inContract: string;
  signedUpDate: string;
  signedRecently: string;
  signedRecentlyDetails: string;
  contractTimeLeft: string;
  // Goals
  interests: string[];
  whatToFix: string;
  whatToAdd: string;
  situation: string;
  // Contact
  name: string;
  phone: string;
  email: string;
  address: string;
}

export function loadSwitchLeads(): SwitchLead[] {
  try {
    return JSON.parse(localStorage.getItem("tts_switch_leads") || "[]");
  } catch { return []; }
}

export function deleteSwitchLead(id: number) {
  try {
    const existing = loadSwitchLeads().filter(l => l.id !== id);
    localStorage.setItem("tts_switch_leads", JSON.stringify(existing));
  } catch { /* ignore */ }
}

function saveSwitchLead(lead: Omit<SwitchLead, "id">) {
  try {
    const existing = loadSwitchLeads();
    existing.unshift({ ...lead, id: Date.now() });
    localStorage.setItem("tts_switch_leads", JSON.stringify(existing));
  } catch { /* ignore */ }
}

/* ─── Sub-components ────────────────────────────────────────── */
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

function YesNo({
  label, value, onChange, detail, detailLabel, detailValue, onDetailChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  detail?: boolean;
  detailLabel?: string;
  detailValue?: string;
  onDetailChange?: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
      <div className="flex gap-2 mb-2">
        {["Yes", "No"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200"
            style={{
              borderColor: value === opt ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
              background: value === opt ? "hsl(0 85% 50%)" : "white",
              color: value === opt ? "white" : "rgb(75 85 99)",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      {detail && value === "Yes" && onDetailChange && (
        <input
          type="text"
          placeholder={detailLabel || "Please explain..."}
          value={detailValue || ""}
          onChange={(e) => onDetailChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-red-400 transition-colors mt-1"
        />
      )}
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
const SwitchAssessment = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Step 1 — Equipment */
  const [systemType, setSystemType] = useState("");
  const [systemTypeOther, setSystemTypeOther] = useState("");
  const [hasEquipmentProblems, setHasEquipmentProblems] = useState("");
  const [hasSensorProblems, setHasSensorProblems] = useState("");
  const [bypassingZones, setBypassingZones] = useState("");
  const [bypassedZoneDetails, setBypassedZoneDetails] = useState("");
  const [canSetAlarm, setCanSetAlarm] = useState("");
  const [missingEquipment, setMissingEquipment] = useState("");
  const [keypAdPhotoName, setKeypadPhotoName] = useState("");

  /* Step 2 — Provider */
  const [currentCompany, setCurrentCompany] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [billingFrequency, setBillingFrequency] = useState("monthly");
  const [inContract, setInContract] = useState("");
  const [signedUpDate, setSignedUpDate] = useState("");
  const [signedRecently, setSignedRecently] = useState("");
  const [signedRecentlyDetails, setSignedRecentlyDetails] = useState("");
  const [contractTimeLeft, setContractTimeLeft] = useState("");

  /* Step 3 — Goals */
  const [interests, setInterests] = useState<string[]>([]);
  const [whatToFix, setWhatToFix] = useState("");
  const [whatToAdd, setWhatToAdd] = useState("");
  const [situation, setSituation] = useState("");

  /* Step 4 — Contact */
  const [contact, setContact] = useState({ name: "", phone: "", email: "", address: "" });

  const toggleInterest = (v: string) =>
    setInterests(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const canProceed = useCallback(() => {
    if (step === 0) return !!systemType;
    if (step === 1) return !!currentCompany;
    if (step === 2) return interests.length > 0;
    if (step === 3) return !!(contact.name && contact.phone && contact.email);
    return true;
  }, [step, systemType, currentCompany, interests, contact]);

  const next = () => { if (canProceed() && step < 3) setStep(s => s + 1); };
  const back = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSwitchLead({
      submittedAt: new Date().toISOString(),
      systemType, systemTypeOther,
      hasEquipmentProblems, hasSensorProblems,
      bypassingZones, bypassedZoneDetails,
      canSetAlarm, missingEquipment, keypAdPhotoName,
      currentCompany, monthlyBill, billingFrequency,
      inContract, signedUpDate, signedRecently, signedRecentlyDetails, contractTimeLeft,
      interests, whatToFix, whatToAdd, situation,
      name: contact.name, phone: contact.phone, email: contact.email, address: contact.address,
    });
    setSubmitted(true);
  };

  /* ── Success ── */
  if (submitted) {
    return (
      <Layout>
        <SEOHead title="Assessment Received | Texas Total Security" description="We'll review your alarm situation and reach out within 2 business hours." />
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
            <h1 className="font-display font-bold text-gray-900 text-3xl mb-3 tracking-tight">We've got your info!</h1>
            <p className="text-gray-500 text-lg mb-2">
              A local specialist will review your alarm situation and reach out within <strong className="text-gray-800">2 business hours</strong>.
            </p>
            <p className="text-gray-400 text-sm mb-4">We'll tell you exactly what equipment you have, whether you're out of contract, and how much you could save by switching.</p>
            <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-3">What happens next:</p>
              <div className="space-y-2">
                {[
                  "We review your current system and provider details",
                  "We confirm whether you're in contract or free to switch",
                  "We put together a side-by-side comparison of what you're paying vs. what you'd pay with us",
                  "We call you — no pressure, just answers",
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

  return (
    <Layout>
      <SEOHead
        title="Alarm Takeover Assessment — Switch Your Alarm | Texas Total Security"
        description="Tell us about your current alarm system. We'll review your equipment, check your contract status, and show you how much you could save by switching to Texas Total Security."
        schemas={[]}
      />
      <ProgressBar step={step} />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: "hsl(0 85% 50% / 0.08)", color: "hsl(0 85% 50%)" }}>
            Alarm Takeover Assessment
          </div>
          <h1 className="font-display font-bold text-gray-900 text-2xl sm:text-3xl tracking-tight mb-2">
            Tell Us About Your Current System
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Takes about 3 minutes. We use this to review your equipment, check your contract, and show you exactly what switching would look like.
          </p>
        </div>
      </div>

      {/* Form body */}
      <div className="min-h-[70vh] bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ── STEP 0: Your System ── */}
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
                    <AlertCircle className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h2 className="font-display font-bold text-gray-900 text-lg">Your Current Alarm System</h2>
                </div>

                {/* System type */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-800 mb-3">What system do you currently have? <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Honeywell", "DSC", "2GIG", "Other"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSystemType(s)}
                        className="py-3 px-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200"
                        style={{
                          borderColor: systemType === s ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                          background: systemType === s ? "hsl(0 85% 50%)" : "white",
                          color: systemType === s ? "white" : "rgb(75 85 99)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {systemType === "Other" && (
                    <input
                      type="text"
                      placeholder="What brand or system?"
                      value={systemTypeOther}
                      onChange={(e) => setSystemTypeOther(e.target.value)}
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </div>

                <YesNo label="Do you have any equipment problems?" value={hasEquipmentProblems} onChange={setHasEquipmentProblems} />
                <YesNo label="Do you have problems with any sensors?" value={hasSensorProblems} onChange={setHasSensorProblems} />
                <YesNo
                  label="Do you have to bypass any zones to set your alarm?"
                  value={bypassingZones}
                  onChange={setBypassingZones}
                  detail
                  detailLabel="Which zones are you bypassing?"
                  detailValue={bypassedZoneDetails}
                  onDetailChange={setBypassedZoneDetails}
                />
                <YesNo label="Can you set your current alarm system right now?" value={canSetAlarm} onChange={setCanSetAlarm} />

                <div className="mb-5">
                  <label className={labelClass}>What equipment do you feel you're missing or wish you had?</label>
                  <input
                    type="text"
                    placeholder="e.g. cameras, glass break sensors, door contacts..."
                    value={missingEquipment}
                    onChange={(e) => setMissingEquipment(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Keypad photo upload */}
                <div className="mb-6">
                  <label className={labelClass}>
                    Upload a photo of your current alarm keypad <span className="text-gray-400 font-normal">(optional but very helpful)</span>
                  </label>
                  <div
                    className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors hover:border-red-300 hover:bg-red-50/30"
                    style={{ borderColor: keypAdPhotoName ? "hsl(120 55% 48%)" : "rgb(209 213 219)" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setKeypadPhotoName(file.name);
                      }}
                    />
                    {keypAdPhotoName ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" style={{ color: "hsl(120 55% 48%)" }} />
                        <span className="text-sm font-medium text-gray-700">{keypAdPhotoName}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setKeypadPhotoName(""); }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-7 h-7 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click to upload a photo of your keypad</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, HEIC — This helps us identify your exact panel model</p>
                      </>
                    )}
                  </div>
                </div>

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
                  Continue — Current Provider <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ── STEP 1: Current Provider ── */}
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
                    <DollarSign className="w-4 h-4" style={{ color: "hsl(0 85% 50%)" }} />
                  </div>
                  <h2 className="font-display font-bold text-gray-900 text-lg">Your Current Provider & Contract</h2>
                </div>

                <div className="mb-5">
                  <label className={labelClass}>What company is monitoring your alarm now? <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Brinks, Vivint, Alarm.com, local company..."
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="mb-5">
                  <label className={labelClass}>What is your current monthly monitoring bill?</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="text"
                        placeholder="e.g. 49.99"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(e.target.value)}
                        className={`${inputClass} pl-7`}
                      />
                    </div>
                    <select
                      value={billingFrequency}
                      onChange={(e) => setBillingFrequency(e.target.value)}
                      className="border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 focus:outline-none focus:border-red-400 bg-white"
                    >
                      <option value="monthly">/ month</option>
                      <option value="quarterly">/ quarter</option>
                      <option value="annual">/ year</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">Before or after tax is fine — just your best estimate</p>
                </div>

                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-800 mb-3">Are you currently in a contract?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Yes, in contract", value: "yes" },
                      { label: "Month-to-month", value: "no" },
                      { label: "Not sure", value: "unsure" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setInContract(opt.value)}
                        className="py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all duration-200 leading-snug"
                        style={{
                          borderColor: inContract === opt.value ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                          background: inContract === opt.value ? "hsl(0 85% 50%)" : "white",
                          color: inContract === opt.value ? "white" : "rgb(75 85 99)",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {inContract === "yes" && (
                  <div className="mb-5 bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-xs font-semibold text-amber-700 mb-3 uppercase tracking-wide">Contract Details</p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">When did you sign up?</label>
                        <input
                          type="text"
                          placeholder="e.g. January 2023, about 2 years ago..."
                          value={signedUpDate}
                          onChange={(e) => setSignedUpDate(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">How much time is left in your contract?</label>
                        <input
                          type="text"
                          placeholder="e.g. 14 months, about 1 year..."
                          value={contractTimeLeft}
                          onChange={(e) => setContractTimeLeft(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <YesNo
                  label="Did you sign anything recently — like when they came out to fix something?"
                  value={signedRecently}
                  onChange={setSignedRecently}
                  detail
                  detailLabel="What did you sign, and when approximately?"
                  detailValue={signedRecentlyDetails}
                  onDetailChange={setSignedRecentlyDetails}
                />

                <div className="flex gap-3 mt-2">
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
                  <h2 className="font-display font-bold text-gray-900 text-lg">What Are You Looking For?</h2>
                </div>

                <p className="text-sm font-semibold text-gray-800 mb-3">Select everything that applies: <span className="text-red-500">*</span></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { value: "fix-equipment",  icon: Wrench,  label: "Fix Equipment Problems", desc: "Sensors, panels, keypads that aren't working right" },
                    { value: "add-equipment",  icon: Plus,    label: "Add New Equipment",       desc: "More cameras, sensors, or upgraded hardware" },
                    { value: "local-company",  icon: Users,   label: "Work with a Local Company", desc: "Talk to real people — not a national call center" },
                    { value: "save-money",     icon: DollarSign, label: "Save Money on Monitoring", desc: "Pay less per month than I do now" },
                  ].map((item) => {
                    const active = interests.includes(item.value);
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => toggleInterest(item.value)}
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

                {interests.includes("fix-equipment") && (
                  <div className="mb-4">
                    <label className={labelClass}>What needs fixing?</label>
                    <input
                      type="text"
                      placeholder="e.g. front door sensor, keypad display, motion detector..."
                      value={whatToFix}
                      onChange={(e) => setWhatToFix(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                {interests.includes("add-equipment") && (
                  <div className="mb-4">
                    <label className={labelClass}>What would you like to add?</label>
                    <input
                      type="text"
                      placeholder="e.g. cameras, motion sensors, glass break detectors..."
                      value={whatToAdd}
                      onChange={(e) => setWhatToAdd(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                <div className="mb-5">
                  <label className={labelClass}>Anything else you'd like us to know about your situation?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us anything else that would help us understand your needs..."
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
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
                      A local specialist — not a call center — will personally review your assessment and reach out with honest answers. No pressure, no scripts.
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
                        placeholder="Houston, TX or full address"
                        value={contact.address}
                        onChange={(e) => setContact(c => ({ ...c, address: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Summary recap */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-xs text-gray-500">
                    {systemType && <div className="flex justify-between"><span>System:</span> <span className="font-medium text-gray-700">{systemType}{systemTypeOther ? ` — ${systemTypeOther}` : ""}</span></div>}
                    {currentCompany && <div className="flex justify-between"><span>Current provider:</span> <span className="font-medium text-gray-700">{currentCompany}</span></div>}
                    {monthlyBill && <div className="flex justify-between"><span>Current bill:</span> <span className="font-medium text-gray-700">${monthlyBill}/{billingFrequency === "monthly" ? "mo" : billingFrequency === "quarterly" ? "qtr" : "yr"}</span></div>}
                    {inContract && <div className="flex justify-between"><span>Contract:</span> <span className="font-medium text-gray-700">{inContract === "yes" ? `In contract${contractTimeLeft ? ` — ${contractTimeLeft} left` : ""}` : inContract === "no" ? "Month-to-month" : "Not sure"}</span></div>}
                    {interests.length > 0 && <div className="flex justify-between"><span>Looking to:</span> <span className="font-medium text-gray-700 text-right max-w-[60%]">{interests.map(i => ({ "fix-equipment": "Fix equipment", "add-equipment": "Add equipment", "local-company": "Local company", "save-money": "Save money" }[i])).join(", ")}</span></div>}
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
                  <p className="text-center text-xs text-gray-400 mt-4">No spam. No pressure. A real local person will call you.</p>
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
              { icon: Shield,  label: "5-Star Google Rating" },
              { icon: Phone,   label: "Talk to the Owner" },
              { icon: Camera,  label: "15+ Years in Houston" },
              { icon: CheckCircle2, label: "No Pressure — Ever" },
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

export default SwitchAssessment;
