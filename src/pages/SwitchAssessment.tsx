import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  generateAllServicesSchemas,
  generateBreadcrumbSchema,
  generateEnhancedServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo";
import {
  CheckCircle2, ArrowRight, ArrowLeft, Phone,
  Shield, Camera, Home, Building2, Users, Radio,
  DollarSign, Star, Clock, Award,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const switchSteps = [
  {
    title: "Free Switch Assessment",
    body: "We visit your property, review your existing alarm panel, keypads, sensors, and wiring, and tell you exactly what can be reused alongside a clear proposal for what needs attention.",
  },
  {
    title: "Efficient Takeover Process",
    body: "When compatible, our technician reprograms your panel, tests every zone, addresses problem devices, and activates 24/7 monitoring — frequently handled in a single visit.",
  },
  {
    title: "Locally Managed & Supported",
    body: "Your account is managed right here by Texas Total Security. Honeywell, DSC, DMP, Resideo, and many other systems can often be taken over without replacing everything.",
  },
];

const switchFaqs = [
  {
    question: "Can I switch my alarm company and keep my existing equipment?",
    answer: "In many cases, yes. Texas Total Security evaluates your existing alarm panel, keypads, sensors, and wiring, then tells you what can be reused, repaired, or upgraded before you switch.",
  },
  {
    question: "How long does an alarm company switch take?",
    answer: "Many alarm takeovers are completed in a single visit. The technician reprograms the panel, tests zones and sensors, addresses problem equipment, and activates professional monitoring.",
  },
  {
    question: "Can switching alarm companies lower my monthly monitoring bill?",
    answer: "Often, yes. Many customers who switch to Texas Total Security pay less for monthly monitoring, especially when compatible equipment can be reused instead of replaced.",
  },
];

const stepTitles = [
  "What system do you have?",
  "Who monitors your alarm?",
  "Your contact info",
];

/* ─── Lead storage ──────────────────────────────────────────── */
export interface SwitchLead {
  id: number;
  submittedAt: string;
  systemType: string;
  currentCompany: string;
  monthlyBill: string;
  inContract: string;
  contractTimeLeft: string;
  interests: string[];
  name: string;
  phone: string;
  email: string;
  address: string;
  systemTypeOther?: string;
  hasEquipmentProblems?: string;
  hasSensorProblems?: string;
  bypassingZones?: string;
  bypassedZoneDetails?: string;
  canSetAlarm?: string;
  missingEquipment?: string;
  billingFrequency?: string;
  signedRecently?: string;
  signedRecentlyDetails?: string;
  whatToFix?: string;
  whatToAdd?: string;
  situation?: string;
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

/* ─── Main Component ────────────────────────────────────────── */
const SwitchAssessment = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  /* Step 1 — Equipment */
  const [systemType, setSystemType] = useState("");
  const [systemTypeOther, setSystemTypeOther] = useState("");

  /* Step 2 — Provider */
  const [currentCompany, setCurrentCompany] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [inContract, setInContract] = useState("");
  const [contractTimeLeft, setContractTimeLeft] = useState("");

  /* Step 3 — Contact */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (v: string) =>
    setInterests(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const canProceed = () => {
    if (step === 0) return !!systemType;
    if (step === 1) return !!currentCompany;
    if (step === 2) return !!(name && phone && email);
    return true;
  };

  const next = () => { if (canProceed() && step < 2) setStep(s => s + 1); };
  const back = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSwitchLead({
      submittedAt: new Date().toISOString(),
      systemType: systemType === "Other" && systemTypeOther ? systemTypeOther : systemType,
      currentCompany,
      monthlyBill,
      inContract,
      contractTimeLeft,
      interests,
      name, phone, email, address,
    });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "switch-assessment",
        "bot-field": "",
        name, phone, email,
        address: address || "",
        systemType: systemType || "",
        currentCompany: currentCompany || "",
        interests: interests.join(", "),
      }).toString(),
    }).catch(() => {});
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
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: "hsl(120 55% 48% / 0.1)", border: "2px solid hsl(120 55% 48% / 0.3)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
            >
              <CheckCircle2 className="w-10 h-10" style={{ color: "hsl(120 55% 48%)" }} />
            </motion.div>
            <h1 className="font-display font-bold text-gray-900 text-2xl mb-2 tracking-tight">We've got your info!</h1>
            <p className="text-gray-500 mb-2">
              A local specialist will review your situation and reach out within <strong className="text-gray-800">2 business hours</strong>.
            </p>
            <p className="text-gray-400 text-sm mb-6">We'll tell you what's compatible, how much you could save, and what the switch looks like.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center gap-2 px-7 py-3.5 text-sm">
                <Phone className="w-4 h-4" /> Call Now — (713) 387-9937
              </a>
              <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Back to Home</Link>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-red-400 transition-colors placeholder:text-gray-400 bg-white";
  const labelClass = "text-sm font-semibold text-gray-800 mb-1.5";

  return (
    <Layout>
      <SEOHead
        title="Switch Your Alarm Company Houston TX | Free Assessment"
        description="Switch your alarm company in Houston without starting over. Texas Total Security reviews your existing equipment, contract, and monitoring bill, then explains your alarm takeover options."
        schemas={[
          generateLocalBusinessSchema(),
          generateEnhancedServiceSchema(
            "Switch Your Alarm Company Houston TX",
            "Switch your alarm company to Texas Total Security in Houston. We evaluate existing panels, keypads, sensors, wiring, contract status, and monitoring bills, then take over compatible alarm systems.",
            "/switch-my-alarm",
            "Alarm Company Switch and Alarm System Takeover",
            [],
            switchFaqs
          ),
          generateHowToSchema(
            "How to Switch Your Alarm Company to Texas Total Security",
            "Switch your existing alarm system to Texas Total Security in Houston.",
            [
              { name: "Request a free switch assessment", text: "Tell us who monitors your alarm now, what equipment you have, and whether you are in contract." },
              { name: "Review compatibility", text: "We evaluate your alarm panel, keypads, sensors, wiring, and communication path." },
              { name: "Take over the system", text: "Our technician reprograms the panel, tests every sensor, and activates professional monitoring." },
            ],
            "/switch-my-alarm"
          ),
          generateBreadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Switch Your Alarm Company", href: "/switch-my-alarm" },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <img src="/keypads-collage.jpg" alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.9)_48%,rgba(10,10,10,0.68)_100%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-red-100">
              Houston Alarm Takeovers
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Switch Your Alarm Company Without Starting Over
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Texas Total Security helps Houston homeowners and businesses move away from national alarm providers while keeping compatible panels, keypads, sensors, and wiring whenever possible.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 py-5">
          {[
            { icon: Star, text: "5★ Rated on Google" },
            { icon: Award, text: "Locally Owned & Operated" },
            { icon: Shield, text: "Licensed & Insured" },
            { icon: Phone, text: "Talk to the Owner" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 justify-center sm:justify-start">
              <item.icon className="w-4 h-4 text-red-600 shrink-0" />
              <span className="text-xs font-semibold text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 border-b border-gray-100 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {switchSteps.map((item, i) => (
              <div key={item.title} className="bg-white border border-gray-200 p-5 shadow-sm">
                <div className="mb-4 flex h-8 w-8 items-center justify-center bg-red-600 text-sm font-bold text-white">{i + 1}</div>
                <h3 className="text-base font-bold leading-snug text-gray-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: Side-by-side info + form */}
      <section className="bg-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">

            {/* RIGHT FIRST on mobile: Compact multi-step form */}
            <div className="order-first lg:order-last">
              {/* Sticky form on desktop */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-white border border-gray-200 shadow-sm">
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2" style={{ background: "hsl(0 85% 50% / 0.08)", color: "hsl(0 85% 50%)" }}>
                      Free Assessment
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-lg leading-tight">
                      {stepTitles[step]}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Step {step + 1} of 3{step === 2 ? " — submit and we'll reach out" : ""}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-4">
                    {step === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {[
                            { label: "Honeywell", icon: Shield },
                            { label: "DSC", icon: Shield },
                            { label: "2GIG", icon: Shield },
                            { label: "Other", icon: Shield },
                          ].map((s) => (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => setSystemType(s.label)}
                              className="flex items-center gap-2 py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200"
                              style={{
                                borderColor: systemType === s.label ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                                background: systemType === s.label ? "hsl(0 85% 50%)" : "white",
                                color: systemType === s.label ? "white" : "rgb(75 85 99)",
                              }}
                            >
                              <s.icon className="w-4 h-4" />
                              {s.label}
                            </button>
                          ))}
                        </div>
                        {systemType === "Other" && (
                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="What brand?"
                              value={systemTypeOther}
                              onChange={(e) => setSystemTypeOther(e.target.value)}
                              className={inputClass}
                              autoFocus
                            />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={next}
                            disabled={!canProceed()}
                            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                            style={{
                              background: canProceed() ? "linear-gradient(135deg, hsl(0 85% 50%), hsl(0 85% 42%))" : "rgb(229 231 235)",
                              color: canProceed() ? "white" : "rgb(156 163 175)",
                            }}
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-3 mb-4">
                          <div>
                            <label className={labelClass}>Current alarm company <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              placeholder="e.g. ADT, Brinks, Vivint, local company..."
                              value={currentCompany}
                              onChange={(e) => setCurrentCompany(e.target.value)}
                              className={inputClass}
                              autoFocus
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Monthly bill</label>
                            <input
                              type="text"
                              placeholder="e.g. $49.99"
                              value={monthlyBill}
                              onChange={(e) => setMonthlyBill(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Contract status</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { label: "In contract", value: "yes" },
                                { label: "Month-to-month", value: "no" },
                                { label: "Not sure", value: "unsure" },
                              ].map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setInContract(opt.value)}
                                  className="py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-200"
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
                            <div>
                              <label className={labelClass}>Time left on contract?</label>
                              <input
                                type="text"
                                placeholder="e.g. 14 months"
                                value={contractTimeLeft}
                                onChange={(e) => setContractTimeLeft(e.target.value)}
                                className={inputClass}
                              />
                            </div>
                          )}
                          <div>
                            <label className="text-xs font-semibold text-gray-800 mb-1.5 block">What interests you?</label>
                            <div className="flex flex-wrap gap-1.5">
                              {[
                                { value: "lower-bill", label: "Lower bill" },
                                { value: "fix-equipment", label: "Fix equipment" },
                                { value: "local", label: "Local service" },
                                { value: "add-cameras", label: "Add cameras" },
                              ].map((opt) => {
                                const active = interests.includes(opt.value);
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => toggleInterest(opt.value)}
                                    className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all duration-200"
                                    style={{
                                      borderColor: active ? "hsl(0 85% 50%)" : "rgb(229 231 235)",
                                      background: active ? "hsl(0 85% 50%)" : "white",
                                      color: active ? "white" : "rgb(75 85 99)",
                                    }}
                                  >
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button type="button" onClick={back} className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-300 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={next}
                            disabled={!canProceed()}
                            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                            style={{
                              background: canProceed() ? "linear-gradient(135deg, hsl(0 85% 50%), hsl(0 85% 42%))" : "rgb(229 231 235)",
                              color: canProceed() ? "white" : "rgb(156 163 175)",
                            }}
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <form onSubmit={handleSubmit} name="switch-assessment" data-netlify="true" netlify-honeypot="bot-field">
                          <input type="hidden" name="form-name" value="switch-assessment" />
                          <input type="hidden" name="bot-field" />
                          <div className="space-y-3 mb-4">
                            <div>
                              <input
                                type="text"
                                placeholder="Full name *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClass}
                                required
                                autoFocus
                              />
                            </div>
                            <div>
                              <input
                                type="tel"
                                placeholder="Phone number *"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={inputClass}
                                required
                              />
                            </div>
                            <div>
                              <input
                                type="email"
                                placeholder="Email *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                                required
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder="Property address (optional)"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className={inputClass}
                              />
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-3 mb-3 flex flex-wrap gap-1.5 text-xs">
                            {systemType && <span className="bg-white border border-gray-200 px-2 py-1 rounded font-medium text-gray-700">{systemType}{systemTypeOther ? `: ${systemTypeOther}` : ""}</span>}
                            {currentCompany && <span className="bg-white border border-gray-200 px-2 py-1 rounded font-medium text-gray-700">{currentCompany}</span>}
                            {monthlyBill && <span className="bg-white border border-gray-200 px-2 py-1 rounded font-medium text-gray-700">${monthlyBill}/mo</span>}
                            {interests.length > 0 && <span className="bg-white border border-gray-200 px-2 py-1 rounded font-medium text-gray-700">{interests.length} interest{interests.length > 1 ? "s" : ""}</span>}
                          </div>

                          <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
                            A local specialist will review your situation and reach out with honest answers. No pressure, no call center scripts.
                          </p>

                          <div className="flex gap-2">
                            <button type="button" onClick={back} className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-300 transition-colors">
                              <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button
                              type="submit"
                              disabled={!canProceed()}
                              className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                              style={{
                                background: canProceed() ? "linear-gradient(135deg, hsl(0 85% 50%), hsl(0 85% 42%))" : "rgb(229 231 235)",
                                color: canProceed() ? "white" : "rgb(156 163 175)",
                              }}
                            >
                              Submit Assessment <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* LEFT: Informative content — below form on mobile */}
            <div className="order-last lg:order-first">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 mb-3">Why Switch to Texas Total Security</div>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-950 mb-4">
                A Houston company that answers when you call and owns every part of your account.
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 mb-6">
                If you're tired of your current alarm company — hard to reach, equipment problems that never get resolved, a national call center that doesn't know your property — we can help. Texas Total Security is locally owned and operated in Houston. When you have a question, you talk to the people who installed your system, not a remote support queue.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Keep compatible Honeywell, DSC, 2GIG, DMP, and Resideo equipment — no need to replace what works",
                  "Transparent pricing on monitoring and service — no hidden rate escalations",
                  "We evaluate your existing system thoroughly before recommending anything",
                  "Local Houston account management — the same people who install your system support it after",
                  "You can reach the owner of the company directly when something matters",
                  "Your system is managed by Texas Total Security, with monitoring routed through our certified partner center",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Need help now?</span>
                </div>
                <p className="text-lg font-bold text-gray-900">(713) 387-9937</p>
                <p className="text-xs text-gray-500 mt-0.5">Call and ask about switching your alarm company</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-t border-gray-200 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 mb-3 text-center">FAQ</div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-950 mb-6 text-center">
            Common Questions About Switching
          </h2>
          <div className="max-w-3xl mx-auto grid gap-3">
            {switchFaqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-gray-200 p-5">
                <h3 className="text-base font-bold leading-snug text-gray-950">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default SwitchAssessment;