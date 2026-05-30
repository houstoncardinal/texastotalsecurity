import { useState } from "react";
import { Shield, WifiOff, Video, Wrench, DollarSign, HardHat, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Feature = {
  icon: React.ElementType;
  label: string;
  sublabel: string;
  sectionId: string;
  tts: { headline: string; detail: string };
  diy: { headline: string; detail: string };
};

const features: Feature[] = [
  {
    icon: Shield,
    label: "Thief With a Jammer",
    sublabel: "Signal blocking & RF interference",
    sectionId: "thief-with-a-jammer",
    tts: {
      headline: "100% Protected",
      detail: "Data travels through physical cable — there is no wireless signal for a blocker to jam.",
    },
    diy: {
      headline: "Blackout",
      detail: "Signal blockers blind Wi-Fi cameras instantly, cutting your feed and recording.",
    },
  },
  {
    icon: WifiOff,
    label: "Internet Outage",
    sublabel: "ISP disruptions & connectivity gaps",
    sectionId: "internet-outage",
    tts: {
      headline: "100% Functional",
      detail: "Records 24/7 directly to your local recorder — no internet connection required.",
    },
    diy: {
      headline: "Fails",
      detail: "Stops recording and misses motion events the moment your internet goes down.",
    },
  },
  {
    icon: Video,
    label: "Video Quality",
    sublabel: "Image clarity & compression",
    sectionId: "video-quality",
    tts: {
      headline: "Flawless 4K Ultra-HD",
      detail: "Uncompressed, high-bandwidth video delivered through a dedicated cable — no sharing.",
    },
    diy: {
      headline: "Often Pixelated",
      detail: "Compressed to save your home's Wi-Fi bandwidth, reducing usable image detail.",
    },
  },
  {
    icon: Wrench,
    label: "Maintenance",
    sublabel: "Ongoing upkeep requirements",
    sectionId: "maintenance",
    tts: {
      headline: "Zero Hassle",
      detail: "Constant power through the cable — zero batteries to charge or replace.",
    },
    diy: {
      headline: "High Maintenance",
      detail: "Frequent battery swaps or charging required to keep cameras active and recording.",
    },
  },
  {
    icon: DollarSign,
    label: "Hidden Costs",
    sublabel: "Subscriptions & cloud fees",
    sectionId: "hidden-costs",
    tts: {
      headline: "None",
      detail: "You own your local storage and data — no subscriptions, no monthly fees, ever.",
    },
    diy: {
      headline: "Monthly Fees Required",
      detail: "Cloud storage and footage history require a paid plan to access beyond 24–48 hours.",
    },
  },
  {
    icon: HardHat,
    label: "Installation",
    sublabel: "Setup quality & complexity",
    sectionId: "installation",
    tts: {
      headline: "Professional & Clean",
      detail: "Turnkey service by licensed local experts — cable routing, mounting, and setup handled.",
    },
    diy: {
      headline: "Frustrating DIY",
      detail: "Ladder work, drilling, complex tech setup, and troubleshooting — all on your shoulders.",
    },
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
}

export function BackToChart() {
  return (
    <button
      onClick={() => scrollToSection("showdown-chart")}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mt-2 mb-8 group"
    >
      <svg className="w-3 h-3 rotate-180 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      Back to comparison chart
    </button>
  );
}

export default function SecurityShowdownChart() {
  const [flashRow, setFlashRow] = useState<number | null>(null);

  const handleRowClick = (sectionId: string, index: number) => {
    setFlashRow(index);
    setTimeout(() => setFlashRow(null), 700);
    scrollToSection(sectionId);
  };

  return (
    <div
      id="showdown-chart"
      className="my-8 rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.07)",
      }}
    >
      {/* ── Header ── */}
      <div
        className="px-6 sm:px-8 pt-8 pb-6 border-b border-gray-100"
        style={{ background: "linear-gradient(160deg, #f9fafb 0%, #ffffff 100%)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-200 bg-red-50">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-700">Interactive Comparison</span>
          </div>
          <span className="text-[11px] text-gray-400 tabular-nums font-medium">6 categories</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-950 leading-tight mb-1">
          The Security Showdown: Texas Total Security vs. DIY Wi-Fi
        </h3>
        <p className="text-sm text-gray-500">
          Select any row to jump to the full breakdown below.
        </p>

        {/* Column headers */}
        <div className="grid grid-cols-2 gap-3 mt-6 sm:max-w-lg">
          <div className="rounded-xl px-4 py-3 bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Texas Total Security</span>
            </div>
          </div>
          <div className="rounded-xl px-4 py-3 bg-red-50 border border-red-200">
            <div className="flex items-center gap-2">
              <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">DIY Wi-Fi Cameras</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature Rows ── */}
      <div className="divide-y divide-gray-100">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isFlashing = flashRow === i;

          return (
            <button
              key={i}
              onClick={() => handleRowClick(feature.sectionId, i)}
              className="w-full text-left group transition-colors duration-150 cursor-pointer"
              style={{
                background: isFlashing
                  ? "rgba(239,68,68,0.06)"
                  : i % 2 === 0
                  ? "#ffffff"
                  : "#f9fafb",
              }}
              aria-label={`Jump to ${feature.label} section`}
            >
              <div className="relative">
                {/* Left accent bar on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "linear-gradient(180deg, hsl(0 85% 44%) 0%, hsl(0 85% 36%) 100%)" }}
                />

                {/* Desktop layout: 3-column grid (md+) */}
                <div className="hidden md:grid md:grid-cols-[26%_37%_37%] min-h-[88px]">
                  {/* Feature cell */}
                  <div className="flex items-center gap-3 px-6 py-5 border-r border-gray-100">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100 border border-gray-200 transition-colors duration-150 group-hover:bg-red-50 group-hover:border-red-200">
                      <Icon className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors duration-150" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-display font-semibold text-gray-900 leading-tight">{feature.label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{feature.sublabel}</p>
                    </div>
                  </div>

                  {/* TTS cell */}
                  <div className="flex items-start gap-2.5 px-5 py-5 border-r border-gray-100 bg-emerald-50/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-700 leading-tight">{feature.tts.headline}</p>
                      <p className="text-[12px] text-gray-500 mt-1.5 leading-relaxed">{feature.tts.detail}</p>
                    </div>
                  </div>

                  {/* DIY cell */}
                  <div className="flex items-start gap-2.5 px-5 py-5 bg-red-50/30">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-700 leading-tight">{feature.diy.headline}</p>
                      <p className="text-[12px] text-gray-500 mt-1.5 leading-relaxed">{feature.diy.detail}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile layout (below md) */}
                <div className="md:hidden">
                  {/* Feature header — large tap target */}
                  <div className="flex items-center justify-between px-5 pt-5 pb-4 min-h-[64px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 border border-gray-200 group-hover:bg-red-50 group-hover:border-red-200 transition-colors duration-150">
                        <Icon className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors duration-150" />
                      </div>
                      <div>
                        <p className="text-[15px] font-display font-bold text-gray-900 leading-tight">{feature.label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{feature.sublabel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      <span className="text-[10px] font-semibold text-red-600/70 hidden xs:block">Details</span>
                      <ChevronRight className="w-5 h-5 text-red-500/60 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all duration-150" />
                    </div>
                  </div>

                  {/* Two comparison cells */}
                  <div className="grid grid-cols-2 border-t border-gray-100">
                    <div className="flex flex-col gap-2 px-4 py-4 border-r border-gray-100 bg-emerald-50/50">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Professional</span>
                      </div>
                      <p className="text-[13px] font-semibold text-emerald-800 leading-tight">{feature.tts.headline}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{feature.tts.detail}</p>
                    </div>
                    <div className="flex flex-col gap-2 px-4 py-4 bg-red-50/40">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                        <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">DIY Wi-Fi</span>
                      </div>
                      <p className="text-[13px] font-semibold text-red-800 leading-tight">{feature.diy.headline}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{feature.diy.detail}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop "Read more" indicator */}
                <div className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <span className="text-[11px] text-red-600 font-semibold">Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-0.5 transition-transform duration-150" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="px-6 sm:px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50">
        <p className="text-[12px] text-gray-400 max-w-sm leading-relaxed">
          Each category reflects documented performance differences between hardwired PoE and wireless camera systems.
        </p>
        <Link
          to="/free-analysis"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white rounded-lg px-4 py-2.5 flex-shrink-0 transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, hsl(0 85% 44%) 0%, hsl(0 92% 34%) 100%)" }}
        >
          Free Onsite Security Analysis
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
