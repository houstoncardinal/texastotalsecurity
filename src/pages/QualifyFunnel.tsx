import { useState, useCallback, type ElementType, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  Home, Building2, Briefcase, Users, Camera, Bell, Radio, Car,
  RefreshCw, ArrowRight, Phone, CheckCircle2, ArrowLeft,
  Clock3, MapPin, User, Mail, Sparkles,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

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
  } catch { return []; }
}

function saveQualifyLead(lead: Omit<QualifyLead, "id">) {
  const existing = loadQualifyLeads();
  existing.unshift({ ...lead, id: Date.now() });
  localStorage.setItem("tts_qualify_leads", JSON.stringify(existing));
}

const ROLES = [
  { label: "Homeowner", value: "homeowner", icon: Home, desc: "Home, condo, or townhome" },
  { label: "Property Manager", value: "property-manager", icon: Building2, desc: "Apartments or multi-family" },
  { label: "Business Owner", value: "business-owner", icon: Briefcase, desc: "Office, retail, or warehouse" },
  { label: "HOA / Board Member", value: "board-member", icon: Users, desc: "Gates & common areas" },
];

const NEEDS = [
  { label: "Security Cameras", value: "cameras", icon: Camera },
  { label: "Alarm System", value: "alarm", icon: Bell },
  { label: "24/7 Monitoring", value: "monitoring", icon: Radio },
  { label: "License Plate Reader", value: "lpr", icon: Car },
  { label: "Switch Companies", value: "switch", icon: RefreshCw },
];

const TIMELINES = [
  { label: "As soon as possible", value: "asap", icon: Clock3 },
  { label: "Within a few weeks", value: "soon", icon: Clock3 },
  { label: "Just exploring", value: "exploring", icon: Sparkles },
];

const PROPERTY_SIZES = [
  { label: "Home / Condo", value: "home" },
  { label: "Small Business", value: "small-biz" },
  { label: "Mid-Size", value: "mid" },
  { label: "Large Portfolio", value: "large" },
];

function ChipGroup({ options, selected, onClick }: {
  options: { label: string; value: string }[];
  selected: string;
  onClick: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(item => (
        <button
          key={item.value}
          type="button"
          onClick={() => onClick(item.value)}
          className="rounded-full border-2 px-3.5 py-1.5 text-xs font-bold transition-all duration-200"
          style={{
            borderColor: selected === item.value ? "hsl(0 85% 50%)" : "hsl(220 13% 88%)",
            background: selected === item.value ? "hsl(0 85% 50%)" : "white",
            color: selected === item.value ? "white" : "hsl(220 9% 38%)",
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function StepBadge({ step, total, label }: { step: number; total: number; label: string }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">{step + 1}</div>
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">{label}</span>
      </div>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 sm:w-24 sm:flex-none">
        <motion.div
          className="h-full rounded-full bg-red-600"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: easeExpo }}
        />
      </div>
      <span className="text-[11px] font-bold text-red-600">{pct}%</span>
    </div>
  );
}

function OptionChip({ selected, onClick, icon: Icon, label }: {
  selected: boolean;
  onClick: () => void;
  icon: ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200"
      style={{
        borderColor: selected ? "hsl(0 85% 50%)" : "hsl(220 13% 88%)",
        background: selected ? "hsl(0 85% 50%)" : "white",
        color: selected ? "white" : "hsl(220 9% 38%)",
      }}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    saveQualifyLead({
      name: contact.name, phone: contact.phone, email: contact.email, address: contact.address,
      role, needs, timeline, propertySize,
      submittedAt: now.toISOString(), source: "Pre-Qualify Funnel", status: "new",
      service: needs.join(", "), value: "TBD", date: dateStr,
    });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "prequalify-funnel", "bot-field": "",
        name: contact.name, phone: contact.phone, email: contact.email,
        address: contact.address || "", role, needs: needs.join(", "),
        timeline, propertySize: propertySize || "",
      }).toString(),
    }).catch(() => {});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <SEOHead title="Request Received | Texas Total Security" description="Thank you. A specialist will reach out soon." />
        <section className="flex min-h-screen items-center justify-center bg-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpo }}
            className="max-w-lg text-center"
          >
            <motion.div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 210, damping: 16, delay: 0.1 }}
            >
              <CheckCircle2 className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-950">You're all set</h1>
            <p className="mt-2 text-sm text-gray-500">A local specialist will reach out with the best next step for your property.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold">
                <Phone className="h-4 w-4" /> (713) 387-9937
              </a>
              <Link to="/" className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  const inputClass = "w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:border-red-400 focus:shadow-[0_0_0_3px_hsl(0_85%_45%/0.10)]";

  return (
    <Layout>
      <SEOHead
        title="Free Security Pre-Qualify | Texas Total Security"
        description="Answer a few quick questions and get guided toward the right alarm, camera, monitoring, or HOA security next step."
      />

      {/* Slim header bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-gray-950">
            <img src="/logo.png" alt="Texas Total Security" className="h-8 w-8 object-contain" />
            <span className="hidden sm:inline">Texas Total Security</span>
          </Link>
          <StepBadge step={step} total={4} label={["Your Role", "Your Needs", "Timing", "Contact"][step]} />
        </div>
      </div>

      {/* Main content — compact, centered, no sidebar */}
      <section className="flex min-h-[calc(100vh-60px)] items-start justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-6 sm:py-10">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: easeExpo }}
              >
                {/* STEP 0: Role */}
                {step === 0 && (
                  <div className="p-5 sm:p-6">
                    <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">What kind of property?</h2>
                    <p className="mt-1 text-sm text-gray-500">We'll tailor the rest around it.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ROLES.map(item => (
                        <OptionChip
                          key={item.value}
                          selected={role === item.value}
                          onClick={() => setRole(item.value)}
                          icon={item.icon}
                          label={item.label}
                        />
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button type="button" onClick={next} disabled={!canProceed()}
                        className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold disabled:opacity-40">
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 1: Needs */}
                {step === 1 && (
                  <div className="p-5 sm:p-6">
                    <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">What do you need help with?</h2>
                    <p className="mt-1 text-sm text-gray-500">Pick everything that applies.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {NEEDS.map(item => (
                        <OptionChip
                          key={item.value}
                          selected={needs.includes(item.value)}
                          onClick={() => toggleNeed(item.value)}
                          icon={item.icon}
                          label={item.label}
                        />
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <button type="button" onClick={back} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button type="button" onClick={next} disabled={!canProceed()}
                        className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold disabled:opacity-40">
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Timing + Size */}
                {step === 2 && (
                  <div className="p-5 sm:p-6">
                    <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">A couple quick details</h2>
                    <p className="mt-1 text-sm text-gray-500">Timing and property scope.</p>
                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">When would you like to start?</p>
                        <div className="flex flex-wrap gap-2">
                          {TIMELINES.map(item => (
                            <OptionChip
                              key={item.value}
                              selected={timeline === item.value}
                              onClick={() => setTimeline(item.value)}
                              icon={item.icon}
                              label={item.label}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Property size</p>
                          <span className="text-[10px] text-gray-400">optional</span>
                        </div>
                        <ChipGroup options={PROPERTY_SIZES} selected={propertySize} onClick={setPropertySize} />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <button type="button" onClick={back} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button type="button" onClick={next} disabled={!canProceed()}
                        className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold disabled:opacity-40">
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact */}
                {step === 3 && (
                  <div className="p-5 sm:p-6">
                    <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">Where should we reach you?</h2>
                    <p className="mt-1 text-sm text-gray-500">A local team member will follow up.</p>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-3" name="prequalify-funnel" data-netlify="true" netlify-honeypot="bot-field">
                      <input type="hidden" name="form-name" value="prequalify-funnel" />
                      <input type="hidden" name="bot-field" />

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Full name", key: "name", type: "text", placeholder: "Your name", icon: User, required: true },
                          { label: "Phone", key: "phone", type: "tel", placeholder: "(713) 555-0000", icon: Phone, required: true },
                          { label: "Email", key: "email", type: "email", placeholder: "you@email.com", icon: Mail, required: true },
                          { label: "Address", key: "address", type: "text", placeholder: "Houston area", icon: MapPin, required: false },
                        ].map(field => {
                          const Icon = field.icon;
                          return (
                            <label key={field.key}>
                              <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">{field.label}{field.required ? " *" : ""}</span>
                              <div className="relative">
                                <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                  type={field.type}
                                  required={field.required}
                                  value={contact[field.key as keyof typeof contact]}
                                  onChange={e => setContact({ ...contact, [field.key]: e.target.value })}
                                  placeholder={field.placeholder}
                                  className={inputClass}
                                />
                              </div>
                            </label>
                          );
                        })}
                      </div>

                      {/* Summary chips */}
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {role && <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-medium text-gray-700">{ROLES.find(r => r.value === role)?.label}</span>}
                        {needs.length > 0 && <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-medium text-gray-700">{needs.length} need{needs.length > 1 ? "s" : ""}</span>}
                        {timeline && <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-medium text-gray-700">{TIMELINES.find(t => t.value === timeline)?.label}</span>}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button type="button" onClick={back} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button type="submit" disabled={!canProceed()}
                          className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold disabled:opacity-40">
                          Send Request <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-center text-[10px] text-gray-400">We'll use this only to follow up about your security request.</p>
                    </form>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QualifyFunnel;