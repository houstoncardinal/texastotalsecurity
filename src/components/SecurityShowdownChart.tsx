import { useState } from "react";
import { Shield, WifiOff, Video, Wrench, DollarSign, HardHat, ChevronRight } from "lucide-react";
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
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid hsl(0 0% 88%)", boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
    >
      {/* ── Column headers: desktop (3-col) ── */}
      <div className="hidden md:grid grid-cols-[0.85fr_1.2fr_1.2fr]">
        <div
          className="px-6 lg:px-8 py-4 flex items-center"
          style={{ background: "hsl(0 0% 14%)", borderTopLeftRadius: "1rem" }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(0 0% 42%)" }}>
            Feature / Category
          </span>
        </div>
        <div
          className="flex items-center px-5 py-4"
          style={{ background: "hsl(0 85% 44%)", borderLeft: "1px solid hsl(0 80% 38%)" }}
        >
          <span className="font-extrabold text-white leading-tight" style={{ fontSize: "clamp(0.82rem, 2vw, 1rem)" }}>
            Texas Total Security (Hardwired)
          </span>
        </div>
        <div
          className="flex items-center px-5 py-4"
          style={{ background: "hsl(0 0% 20%)", borderLeft: "1px solid hsl(0 0% 27%)", borderTopRightRadius: "1rem" }}
        >
          <span className="font-extrabold leading-tight" style={{ fontSize: "clamp(0.82rem, 2vw, 1rem)", color: "hsl(0 0% 58%)" }}>
            DIY Wi-Fi Cameras
          </span>
        </div>
      </div>

      {/* ── Column headers: mobile (2-col) ── */}
      <div className="grid grid-cols-2 md:hidden">
        <div
          className="flex items-center justify-center px-3 py-3"
          style={{ background: "hsl(0 85% 44%)", borderTopLeftRadius: "1rem" }}
        >
          <span className="font-extrabold text-white text-[11px] leading-tight text-center">
            Texas Total Security
          </span>
        </div>
        <div
          className="flex items-center justify-center px-3 py-3"
          style={{ background: "hsl(0 0% 20%)", borderLeft: "1px solid hsl(0 0% 27%)", borderTopRightRadius: "1rem" }}
        >
          <span className="font-extrabold text-[11px] leading-tight text-center" style={{ color: "hsl(0 0% 58%)" }}>
            DIY Wi-Fi Cameras
          </span>
        </div>
      </div>

      {/* ── Rows ── */}
      {features.map((feature, i) => {
        const Icon = feature.icon;
        const isFlashing = flashRow === i;
        const rowBg  = i % 2 === 0 ? "white"               : "hsl(0 0% 99%)";
        const ttsBg  = i % 2 === 0 ? "hsl(0 80% 97.5%)"    : "hsl(0 80% 96.5%)";
        const diyBg  = i % 2 === 0 ? "hsl(0 0% 97%)"       : "hsl(0 0% 96%)";

        return (
          <button
            key={i}
            onClick={() => handleRowClick(feature.sectionId, i)}
            className="w-full text-left group transition-colors duration-150 cursor-pointer"
            style={{ borderTop: "1px solid hsl(0 0% 91%)" }}
            aria-label={`Jump to ${feature.label} section`}
          >
            <div className="relative" style={{ background: isFlashing ? "hsl(0 85% 97%)" : undefined }}>

              {/* Left accent bar on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "linear-gradient(180deg, hsl(0 85% 44%) 0%, hsl(0 85% 36%) 100%)" }}
              />

              {/* Desktop: 3-col */}
              <div className="hidden md:grid md:grid-cols-[0.85fr_1.2fr_1.2fr]">
                {/* Feature cell */}
                <div className="flex items-center gap-3 px-6 lg:px-8 py-5" style={{ background: rowBg, borderRight: "1px solid hsl(0 0% 91%)" }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-150"
                    style={{ background: "hsl(0 0% 93%)", borderColor: "hsl(0 0% 86%)" }}
                  >
                    <Icon className="w-4 h-4 group-hover:text-red-600 transition-colors duration-150" style={{ color: "hsl(0 0% 40%)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold leading-snug" style={{ fontSize: "clamp(0.82rem, 1.35vw, 0.95rem)", color: "hsl(0 0% 16%)" }}>
                      {feature.label}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{feature.sublabel}</p>
                  </div>
                </div>

                {/* TTS cell */}
                <div className="px-5 py-5" style={{ background: ttsBg, borderRight: "1px solid hsl(0 70% 90%)" }}>
                  <div className="font-extrabold text-red-700 leading-tight mb-1.5" style={{ fontSize: "0.9rem" }}>
                    {feature.tts.headline}
                  </div>
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: "0.82rem" }}>
                    {feature.tts.detail}
                  </p>
                </div>

                {/* DIY cell */}
                <div className="px-5 py-5" style={{ background: diyBg }}>
                  <div className="font-extrabold leading-tight mb-1.5" style={{ color: "hsl(0 0% 31%)", fontSize: "0.9rem" }}>
                    {feature.diy.headline}
                  </div>
                  <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.82rem" }}>
                    {feature.diy.detail}
                  </p>
                </div>
              </div>

              {/* Mobile: feature full-width, verdicts below */}
              <div className="md:hidden" style={{ background: rowBg }}>
                <div className="px-4 pt-3 pb-2.5 flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border"
                    style={{ background: "hsl(0 0% 93%)", borderColor: "hsl(0 0% 86%)" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: "hsl(0 0% 40%)" }} />
                  </div>
                  <div>
                    <span className="font-extrabold text-gray-900 leading-snug" style={{ fontSize: "0.9rem" }}>
                      {feature.label}
                    </span>
                    <p className="text-[10.5px] text-gray-500 leading-tight">{feature.sublabel}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-red-500 flex-shrink-0 transition-colors" />
                </div>
                <div className="grid grid-cols-2" style={{ borderTop: "1px solid hsl(0 0% 93%)" }}>
                  <div className="px-3 py-3" style={{ background: ttsBg }}>
                    <div className="font-extrabold text-red-700 leading-tight mb-1" style={{ fontSize: "0.75rem" }}>
                      {feature.tts.headline}
                    </div>
                    <p className="text-gray-700 leading-relaxed" style={{ fontSize: "0.68rem" }}>
                      {feature.tts.detail}
                    </p>
                  </div>
                  <div className="px-3 py-3" style={{ background: diyBg, borderLeft: "1px solid hsl(0 0% 91%)" }}>
                    <div className="font-extrabold leading-tight mb-1" style={{ color: "hsl(0 0% 31%)", fontSize: "0.75rem" }}>
                      {feature.diy.headline}
                    </div>
                    <p className="text-gray-600 leading-relaxed" style={{ fontSize: "0.68rem" }}>
                      {feature.diy.detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop hover indicator */}
              <div className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <span className="text-[11px] text-red-600 font-semibold">Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-0.5 transition-transform duration-150" />
              </div>

            </div>
          </button>
        );
      })}

      {/* ── Footer ── */}
      <div
        style={{
          borderTop: "1px solid hsl(0 0% 89%)",
          background: "hsl(0 0% 98%)",
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <p className="text-gray-500" style={{ fontSize: "0.82rem" }}>
          Each category reflects documented performance differences between hardwired PoE and wireless camera systems.
        </p>
        <Link
          to="/blog/security-showdown-hardwired-vs-wifi-cameras"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-bold uppercase tracking-[0.11em] transition-opacity duration-200 hover:opacity-85 whitespace-nowrap shrink-0"
          style={{ background: "hsl(0 85% 44%)", color: "white", fontSize: "clamp(0.66rem, 1.2vw, 0.73rem)" }}
        >
          Read the Full Breakdown
          <ChevronRight className="w-3 h-3 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
