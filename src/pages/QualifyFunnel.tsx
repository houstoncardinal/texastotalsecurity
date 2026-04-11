import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  Building2, Users, Store, Factory, HelpCircle,
  Camera, Shield, Sun, Radio, Lock, Brain,
  ArrowRight, ArrowLeft, Phone, CheckCircle2, Upload, X,
  Ruler, DollarSign, Clock, UserCheck,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

/* ─── Step Data ─────────────────────────────────────────── */
const PROPERTY_TYPES = [
  { label: "HOA / Apartment Complex", value: "hoa", icon: Users, desc: "Gated communities & multifamily" },
  { label: "Commercial Building", value: "commercial", icon: Building2, desc: "Offices, campuses & corporate" },
  { label: "Retail / Business", value: "retail", icon: Store, desc: "Storefronts, restaurants & shops" },
  { label: "Industrial", value: "industrial", icon: Factory, desc: "Warehouses, yards & facilities" },
  { label: "Other", value: "other", icon: HelpCircle, desc: "Tell us about your property" },
];

const SECURITY_NEEDS = [
  { label: "Security Cameras", value: "cameras", icon: Camera },
  { label: "License Plate Recognition", value: "lpr", icon: Shield },
  { label: "Lighting / Deterrents", value: "lighting", icon: Sun },
  { label: "Remote Monitoring", value: "monitoring", icon: Radio },
  { label: "Access Control", value: "access", icon: Lock },
  { label: "AI Detection", value: "ai", icon: Brain },
];

const BUDGET_RANGES = [
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not sure yet",
];

const TIMELINES = [
  { label: "ASAP", value: "asap", desc: "Need it now" },
  { label: "30 Days", value: "30days", desc: "Within a month" },
  { label: "90 Days", value: "90days", desc: "Planning phase" },
  { label: "Just Exploring", value: "exploring", desc: "Gathering info" },
];

const STEPS = [
  "Property Type",
  "Size & Scope",
  "Security Needs",
  "Build Your Setup",
  "Upload & Analysis",
  "Qualification",
  "Contact Info",
];

/* ─── Main Component ────────────────────────────────────── */
const QualifyFunnel = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [propertyType, setPropertyType] = useState("");
  const [units, setUnits] = useState("");
  const [sqft, setSqft] = useState("");
  const [parkingLot, setParkingLot] = useState("");
  const [currentSystem, setCurrentSystem] = useState("");
  const [securityNeeds, setSecurityNeeds] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isDecisionMaker, setIsDecisionMaker] = useState<boolean | null>(null);
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "" });

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return !!propertyType;
      case 1: return true;
      case 2: return securityNeeds.length > 0;
      case 3: return true;
      case 4: return true;
      case 5: return !!budget && !!timeline && isDecisionMaker !== null;
      case 6: return contact.firstName && contact.email && contact.phone;
      default: return true;
    }
  }, [step, propertyType, securityNeeds, budget, timeline, isDecisionMaker, contact]);

  const nextStep = () => { if (canProceed() && step < STEPS.length - 1) setStep(s => s + 1); };
  const prevStep = () => { if (step > 0) setStep(s => s - 1); };

  const toggleNeed = (val: string) => {
    setSecurityNeeds(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const removeFile = (idx: number) => setUploadedFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) setUploadedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  if (submitted) {
    return (
      <Layout>
        <SEOHead title="Request Received | Texas Total Security" description="Thank you for your submission." />
        <section className="min-h-screen flex items-center justify-center" style={{ background: "hsl(0 0% 3%)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg mx-auto px-6 py-20"
          >
            <motion.div
              className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ background: "hsl(120 60% 45% / 0.12)", border: "1px solid hsl(120 60% 45% / 0.25)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle2 className="w-10 h-10" style={{ color: "hsl(120 60% 50%)" }} />
            </motion.div>
            <h1 className="font-display font-bold text-white text-3xl mb-4 tracking-tight">We're On It.</h1>
            <p className="text-lg mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              A security specialist will review your property details and reach out within 2 business hours.
            </p>
            <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
              For immediate assistance, call us directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 text-base">
                <Phone className="w-5 h-5" /> (713) 387-9937
              </a>
              <Link to="/" className="btn-outline-light inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Check If You Qualify | Free Security Assessment | Texas Total Security"
        description="See if your property qualifies for a custom security solution in 60 seconds. No obligation. Built for property managers, HOAs, and business owners in Houston."
      />

      <section className="min-h-screen relative" style={{ background: "hsl(0 0% 3%)" }}>
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(0 85% 45% / 0.04) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }} />

        {/* Progress bar */}
        <div className="sticky top-0 z-50" style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(0 85% 60%)" }}>
                {STEPS[step]}
              </span>
              <span className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
                {progress}% Complete
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(0 85% 45%), hsl(0 85% 55%))" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: easeExpo }}
              />
            </div>
            {/* Step indicators */}
            <div className="flex items-center justify-between mt-3">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i <= step ? "hsl(0 85% 50%)" : "rgba(255,255,255,0.1)",
                      boxShadow: i === step ? "0 0 8px hsl(0 85% 50% / 0.5)" : "none",
                    }}
                  />
                  <span className="hidden sm:inline text-[10px] font-medium" style={{ color: i <= step ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)" }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: easeExpo }}
            >
              {/* ── Step 0: Property Type ── */}
              {step === 0 && (
                <div>
                  <h2 className="font-display font-bold text-white text-center mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}>
                    What type of property do you manage?
                  </h2>
                  <p className="text-center mb-10" style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                    Select your property type so we can tailor the right solution.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROPERTY_TYPES.map((pt) => {
                      const selected = propertyType === pt.value;
                      return (
                        <motion.button
                          key={pt.value}
                          onClick={() => setPropertyType(pt.value)}
                          className="text-left rounded-2xl p-6 transition-all duration-200"
                          style={{
                            background: selected ? "hsl(0 85% 45% / 0.12)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${selected ? "hsl(0 85% 45% / 0.4)" : "rgba(255,255,255,0.06)"}`,
                            boxShadow: selected ? "0 0 24px hsl(0 85% 45% / 0.15)" : "none",
                          }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                            background: selected ? "hsl(0 85% 45% / 0.2)" : "rgba(255,255,255,0.05)",
                            border: `1px solid ${selected ? "hsl(0 85% 45% / 0.3)" : "rgba(255,255,255,0.08)"}`,
                          }}>
                            <pt.icon className="w-6 h-6" style={{ color: selected ? "hsl(0 85% 60%)" : "rgba(255,255,255,0.4)" }} />
                          </div>
                          <h3 className="font-display font-semibold text-white text-[15px] mb-1">{pt.label}</h3>
                          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>{pt.desc}</p>
                          {selected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-3">
                              <CheckCircle2 className="w-5 h-5" style={{ color: "hsl(0 85% 55%)" }} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 1: Size & Scope ── */}
              {step === 1 && (
                <div>
                  <h2 className="font-display font-bold text-white text-center mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}>
                    Tell us about your property
                  </h2>
                  <p className="text-center mb-10" style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                    Help us understand the scope so we can design the right system.
                  </p>
                  <div className="max-w-lg mx-auto space-y-6">
                    {[
                      { label: "Number of Units / Buildings", value: units, onChange: setUnits, placeholder: "e.g., 120 units, 5 buildings", icon: Building2 },
                      { label: "Approximate Square Footage", value: sqft, onChange: setSqft, placeholder: "e.g., 50,000 sq ft", icon: Ruler },
                      { label: "Parking Lot Size", value: parkingLot, onChange: setParkingLot, placeholder: "e.g., 200 spaces, 2 garages", icon: Store },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                          <field.icon className="w-4 h-4" style={{ color: "hsl(0 85% 55%)" }} />
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={field.value}
                          onChange={e => field.onChange(e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-5 py-4 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none transition-all"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                          onFocus={e => { e.target.style.borderColor = "hsl(0 85% 45% / 0.4)"; e.target.style.boxShadow = "0 0 16px hsl(0 85% 45% / 0.1)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <Shield className="w-4 h-4" style={{ color: "hsl(0 85% 55%)" }} />
                        Current Security System
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["None", "Outdated System", "ADT / Vivint / Brinks", "Other Provider"].map(opt => {
                          const sel = currentSystem === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => setCurrentSystem(opt)}
                              className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all"
                              style={{
                                background: sel ? "hsl(0 85% 45% / 0.12)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${sel ? "hsl(0 85% 45% / 0.35)" : "rgba(255,255,255,0.06)"}`,
                                color: sel ? "hsl(0 85% 65%)" : "rgba(255,255,255,0.45)",
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2: Security Needs ── */}
              {step === 2 && (
                <div>
                  <h2 className="font-display font-bold text-white text-center mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}>
                    What security do you need?
                  </h2>
                  <p className="text-center mb-10" style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                    Select all that apply. We'll build around your priorities.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {SECURITY_NEEDS.map((need) => {
                      const selected = securityNeeds.includes(need.value);
                      return (
                        <motion.button
                          key={need.value}
                          onClick={() => toggleNeed(need.value)}
                          className="flex flex-col items-center text-center rounded-2xl p-6 transition-all"
                          style={{
                            background: selected ? "hsl(0 85% 45% / 0.12)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${selected ? "hsl(0 85% 45% / 0.4)" : "rgba(255,255,255,0.06)"}`,
                            boxShadow: selected ? "0 0 20px hsl(0 85% 45% / 0.12)" : "none",
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3" style={{
                            background: selected ? "hsl(0 85% 45% / 0.2)" : "rgba(255,255,255,0.05)",
                          }}>
                            <need.icon className="w-7 h-7" style={{ color: selected ? "hsl(0 85% 60%)" : "rgba(255,255,255,0.35)" }} />
                          </div>
                          <span className="font-semibold text-sm" style={{ color: selected ? "white" : "rgba(255,255,255,0.5)" }}>
                            {need.label}
                          </span>
                          {selected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2">
                              <CheckCircle2 className="w-4 h-4" style={{ color: "hsl(0 85% 55%)" }} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 3: Build Your Setup (Configurator Link) ── */}
              {step === 3 && (
                <div className="text-center">
                  <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}>
                    Build Your Security Setup
                  </h2>
                  <p className="mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                    Use our interactive 3D configurator to design your custom security pole with cameras, lighting, and active deterrence — or skip this step.
                  </p>
                  <motion.div
                    className="rounded-3xl p-8 sm:p-12 max-w-2xl mx-auto relative overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: "radial-gradient(ellipse at 50% 0%, hsl(0 85% 45% / 0.08), transparent 60%)",
                    }} />
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{
                        background: "hsl(0 85% 45% / 0.12)",
                        border: "1px solid hsl(0 85% 45% / 0.25)",
                      }}>
                        <Camera className="w-10 h-10" style={{ color: "hsl(0 85% 58%)" }} />
                      </div>
                      <h3 className="font-display font-bold text-white text-xl mb-3">Interactive 3D Pole Configurator</h3>
                      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Add cameras, antennas, lighting — see your custom setup rendered in real-time 3D.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                          to="/security-pole-configurator"
                          className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold"
                        >
                          Open 3D Configurator <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={nextStep}
                          className="text-sm font-medium transition-colors"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                        >
                          Skip this step →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ── Step 4: Upload & Analysis ── */}
              {step === 4 && (
                <div>
                  <h2 className="font-display font-bold text-white text-center mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}>
                    Upload Property Photos
                  </h2>
                  <p className="text-center mb-10" style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                    Help us analyze your property for maximum coverage. Photos of entrances, parking lots, and common areas are most helpful.
                  </p>
                  <div className="max-w-lg mx-auto">
                    <div
                      className="rounded-2xl p-10 text-center cursor-pointer transition-all"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "2px dashed rgba(255,255,255,0.1)",
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={e => e.preventDefault()}
                      onDragEnter={e => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 85% 45% / 0.4)"; }}
                      onDragLeave={e => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >
                      <Upload className="w-10 h-10 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.25)" }} />
                      <p className="text-sm font-semibold text-white mb-1">Drag & drop files here</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or click to browse — JPG, PNG, MP4 accepted</p>
                      <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-6 space-y-2">
                        {uploadedFiles.map((f, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="flex items-center gap-3 min-w-0">
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "hsl(120 60% 50%)" }} />
                              <span className="text-sm text-white truncate">{f.name}</span>
                              <span className="text-xs shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                            </div>
                            <button onClick={() => removeFile(i)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                              <X className="w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-center mt-6 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                      This step is optional — you can skip it and we'll photograph during the assessment.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Step 5: Qualification Gate ── */}
              {step === 5 && (
                <div>
                  <h2 className="font-display font-bold text-white text-center mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}>
                    Let's see if there's a fit
                  </h2>
                  <p className="text-center mb-10" style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                    We'll tell you straight up if it's worth it for both sides.
                  </p>
                  <div className="max-w-lg mx-auto space-y-8">
                    {/* Budget */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <DollarSign className="w-4 h-4" style={{ color: "hsl(0 85% 55%)" }} />
                        Estimated Budget Range
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {BUDGET_RANGES.map(b => {
                          const sel = budget === b;
                          return (
                            <button
                              key={b}
                              onClick={() => setBudget(b)}
                              className="px-5 py-3.5 rounded-xl text-sm font-medium text-left transition-all"
                              style={{
                                background: sel ? "hsl(0 85% 45% / 0.12)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${sel ? "hsl(0 85% 45% / 0.35)" : "rgba(255,255,255,0.06)"}`,
                                color: sel ? "hsl(0 85% 65%)" : "rgba(255,255,255,0.45)",
                              }}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <Clock className="w-4 h-4" style={{ color: "hsl(0 85% 55%)" }} />
                        When do you need this?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {TIMELINES.map(t => {
                          const sel = timeline === t.value;
                          return (
                            <button
                              key={t.value}
                              onClick={() => setTimeline(t.value)}
                              className="px-5 py-3.5 rounded-xl text-left transition-all"
                              style={{
                                background: sel ? "hsl(0 85% 45% / 0.12)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${sel ? "hsl(0 85% 45% / 0.35)" : "rgba(255,255,255,0.06)"}`,
                              }}
                            >
                              <span className="text-sm font-semibold block" style={{ color: sel ? "white" : "rgba(255,255,255,0.5)" }}>{t.label}</span>
                              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{t.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Decision maker */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <UserCheck className="w-4 h-4" style={{ color: "hsl(0 85% 55%)" }} />
                        Are you the decision maker for this project?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{ label: "Yes, I am", val: true }, { label: "No, I'm gathering info", val: false }].map(opt => {
                          const sel = isDecisionMaker === opt.val;
                          return (
                            <button
                              key={String(opt.val)}
                              onClick={() => setIsDecisionMaker(opt.val)}
                              className="px-5 py-4 rounded-xl text-sm font-medium transition-all"
                              style={{
                                background: sel ? "hsl(0 85% 45% / 0.12)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${sel ? "hsl(0 85% 45% / 0.35)" : "rgba(255,255,255,0.06)"}`,
                                color: sel ? "white" : "rgba(255,255,255,0.45)",
                              }}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 6: Contact Capture ── */}
              {step === 6 && (
                <div>
                  <h2 className="font-display font-bold text-white text-center mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em" }}>
                    You're almost done
                  </h2>
                  <p className="text-center mb-10" style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px" }}>
                    Let's see if there's a deal here. No obligation — we'll review and respond within 2 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>First Name *</label>
                        <input
                          required type="text" value={contact.firstName}
                          onChange={e => setContact({ ...contact, firstName: e.target.value })}
                          placeholder="John"
                          className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                          onFocus={e => { e.target.style.borderColor = "hsl(0 85% 45% / 0.4)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>Last Name</label>
                        <input
                          type="text" value={contact.lastName}
                          onChange={e => setContact({ ...contact, lastName: e.target.value })}
                          placeholder="Smith"
                          className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                          onFocus={e => { e.target.style.borderColor = "hsl(0 85% 45% / 0.4)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>Email *</label>
                      <input
                        required type="email" value={contact.email}
                        onChange={e => setContact({ ...contact, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onFocus={e => { e.target.style.borderColor = "hsl(0 85% 45% / 0.4)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>Phone *</label>
                      <input
                        required type="tel" value={contact.phone}
                        onChange={e => setContact({ ...contact, phone: e.target.value })}
                        placeholder="(713) 555-0000"
                        className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onFocus={e => { e.target.style.borderColor = "hsl(0 85% 45% / 0.4)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>Company / Property Name</label>
                      <input
                        type="text" value={contact.company}
                        onChange={e => setContact({ ...contact, company: e.target.value })}
                        placeholder="ABC Property Management"
                        className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onFocus={e => { e.target.style.borderColor = "hsl(0 85% 45% / 0.4)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!canProceed()}
                      className="btn-primary-gradient w-full flex items-center justify-center gap-2 py-4 text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Submit & Get Your Assessment <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                      Your information is secure. We never share or sell your data.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          {step < 6 && (
            <div className="flex items-center justify-between mt-12 max-w-lg mx-auto">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="btn-primary-gradient flex items-center gap-2 px-8 py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Takes 30 seconds badge */}
          <div className="text-center mt-8">
            <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>
              Takes 60 seconds · No obligation · We'll tell you straight up if it's worth it
            </span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QualifyFunnel;
