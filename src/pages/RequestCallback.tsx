import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  CheckCircle2, ArrowRight, Phone, Clock, Calendar, User,
} from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const RequestCallback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [bestTime, setBestTime] = useState("");

  const canSubmit = name && phone && email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "callback-request",
        "bot-field": "",
        name, phone, email, company: company || "",
        bestTime: bestTime || "",
      }).toString(),
    }).catch(() => {});

    // Save to localStorage for admin view
    try {
      const existing = JSON.parse(localStorage.getItem("tts_callback_requests") || "[]");
      existing.unshift({ id: Date.now(), name, phone, email, company, bestTime, submittedAt: new Date().toISOString() });
      localStorage.setItem("tts_callback_requests", JSON.stringify(existing));
    } catch { /* ignore */ }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <SEOHead title="Callback Request Received | Texas Total Security" description="Your callback request has been received. A Texas Total Security specialist will reach out during business hours." />
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
            <h1 className="text-2xl font-bold text-gray-950">We'll call you shortly</h1>
            <p className="mt-2 text-sm text-gray-500">A local specialist will reach out during business hours. We're available Mon–Sat.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/" className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  const inputClass = "w-full rounded-lg border border-gray-200 bg-white py-3.5 px-4 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:border-red-400 focus:shadow-[0_0_0_3px_hsl(0_85%_45%/0.10)]";

  return (
    <Layout>
      <SEOHead
        title="Request a Callback | Texas Total Security"
        description="Fill out a quick form and a Texas Total Security specialist will call you back during business hours."
      />

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-10">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeExpo }}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            {/* Header */}
            <div className="border-b border-gray-100 bg-neutral-950 px-6 py-5 text-white">
              <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-red-200">
                <Phone className="h-3 w-3" />
                Request a Callback
              </div>
              <h1 className="mt-3 text-xl font-bold tracking-tight">We'll call you back during business hours.</h1>
              <p className="mt-1 text-sm text-white/60">Fill this out and a local specialist will reach out by phone.</p>
            </div>

            {/* Form */}
            <div className="px-6 py-5">
              <form onSubmit={handleSubmit} name="callback-request" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="callback-request" />
                <input type="hidden" name="bot-field" />

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">Full name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">Phone number <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="(713) 555-0000" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">Email <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">Company name <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input type="text" placeholder="Your company or organization" value={company} onChange={e => setCompany(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">Best time to call <span className="text-gray-400 font-normal">(optional)</span></label>
                    <select value={bestTime} onChange={e => setBestTime(e.target.value)} className={inputClass + " appearance-none"}>
                      <option value="">Anytime during business hours</option>
                      <option value="morning">Morning (8am – 12pm)</option>
                      <option value="afternoon">Afternoon (12pm – 5pm)</option>
                      <option value="evening">Evening (5pm – 7pm)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 rounded-lg bg-red-50 border border-red-100 p-3">
                  <div className="flex items-center gap-2 text-xs text-red-800">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>Business hours: Mon–Fri 8am–6pm, Sat 9am–3pm. We return calls within 2 hours during business hours.</span>
                  </div>
                </div>

                <button type="submit" disabled={!canSubmit}
                  className="btn-primary-gradient mt-4 flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold disabled:opacity-40">
                  <Phone className="h-4 w-4" /> Request Callback <ArrowRight className="h-4 w-4" />
                </button>

                <p className="mt-3 text-center text-[10px] text-gray-400">We'll use your info only to return your call. No spam, no sales pitches.</p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default RequestCallback;