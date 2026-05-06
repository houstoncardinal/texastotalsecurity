import { motion } from "framer-motion";
import { useState } from "react";
import { Radio, Zap, Network, Layers, ShieldCheck } from "lucide-react";

/**
 * Wireless Bridge System — premium interactive infrastructure visualization.
 * LOCAL hardware system only (no cloud / SaaS / internet symbolism).
 * Flow: Cameras → Flex Utility Box → Wireless Bridge (TX) → RF Link →
 *       Wireless Bridge (RX) → PoE → Network Switch.
 */
const WirelessBridgeSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const badges = [
    { icon: Radio, label: "Point-to-Point Link" },
    { icon: Zap, label: "PoE Powered" },
    { icon: Network, label: "Local Network System" },
    { icon: Layers, label: "Scalable Deployment" },
  ];

  const Tooltip = ({ id, x, y, label, sub }: { id: string; x: number; y: number; label: string; sub?: string }) =>
    hovered === id ? (
      <foreignObject x={x - 90} y={y - 58} width="180" height="52" style={{ overflow: "visible", pointerEvents: "none" }}>
        <div
          style={{
            background: "rgba(6,10,18,0.97)",
            border: "1px solid hsl(205 90% 55% / 0.6)",
            borderRadius: "8px",
            padding: "6px 10px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.6), 0 0 22px hsl(205 90% 55% / 0.4)",
            textAlign: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ color: "white", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>{label}</div>
          {sub && <div style={{ color: "hsl(205 80% 78%)", fontSize: "9.5px", marginTop: 2 }}>{sub}</div>}
        </div>
      </foreignObject>
    ) : null;

  const hoverProps = (id: string) => ({
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered((h) => (h === id ? null : h)),
    onTouchStart: () => setHovered(id),
    style: { cursor: "pointer", transition: "transform 250ms ease, filter 250ms ease", transformOrigin: "center", transformBox: "fill-box" } as React.CSSProperties,
    className: hovered === id ? "tts-node-active" : "tts-node",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(210 60% 10%) 0%, hsl(0 0% 4%) 60%, hsl(0 0% 3%) 100%)",
        paddingTop: "clamp(3.5rem, 6vw, 6rem)",
        paddingBottom: "clamp(3.5rem, 6vw, 6rem)",
      }}
      aria-label="Wireless Bridge Surveillance System"
    >
      <style>{`
        @keyframes ttsDash { to { stroke-dashoffset: -240; } }
        @keyframes ttsDashSlow { to { stroke-dashoffset: -160; } }
        @keyframes ttsBeamFlow { to { stroke-dashoffset: -300; } }
        @keyframes ttsPulseGlow { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        @keyframes ttsBeamShimmer { 0%,100% { opacity: .55; } 50% { opacity: .95; } }
        @keyframes ttsFloat1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ttsFloat2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @keyframes ttsLedBlink { 0%,60%,100% { opacity: 1; } 70%,90% { opacity: .25; } }
        .tts-flow { stroke-dasharray: 4 8; animation: ttsDash 3.5s linear infinite; }
        .tts-flow-slow { stroke-dasharray: 3 7; animation: ttsDashSlow 5s linear infinite; }
        .tts-beam-core { stroke-dasharray: 14 12; animation: ttsBeamFlow 2.4s linear infinite; }
        .tts-beam-glow { animation: ttsBeamShimmer 2.6s ease-in-out infinite; }
        .tts-glow { animation: ttsPulseGlow 2.4s ease-in-out infinite; }
        .tts-led { animation: ttsLedBlink 3s ease-in-out infinite; }
        .tts-float-pole { animation: ttsFloat1 7s ease-in-out infinite; transform-origin: center; }
        .tts-float-bldg { animation: ttsFloat2 9s ease-in-out infinite; transform-origin: center; }
        .tts-node { transition: transform 250ms ease, filter 250ms ease; }
        .tts-node:hover, .tts-node-active { transform: scale(1.05); filter: drop-shadow(0 0 12px hsl(205 95% 60% / 0.95)); }
        @media (prefers-reduced-motion: reduce) {
          .tts-flow, .tts-flow-slow, .tts-beam-core, .tts-beam-glow, .tts-glow, .tts-led, .tts-float-pole, .tts-float-bldg { animation: none !important; }
        }
        @media (max-width: 640px) {
          .tts-flow, .tts-flow-slow { animation-duration: 5s; }
        }
      `}</style>

      {/* Texas outline watermark */}
      <svg
        aria-hidden
        className="absolute pointer-events-none hidden md:block"
        viewBox="0 0 100 100"
        style={{ top: "8%", right: "4%", width: "300px", height: "300px", opacity: 0.05 }}
      >
        <path
          d="M14 18 L60 18 L62 14 L70 16 L72 22 L88 22 L88 38 L84 44 L82 56 L78 60 L72 70 L62 78 L52 86 L46 84 L40 76 L34 78 L26 72 L22 60 L14 50 L10 38 L14 30 Z"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
        />
      </svg>

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.045,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[10.5px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: "hsl(205 90% 55% / 0.1)",
              border: "1px solid hsl(205 90% 55% / 0.3)",
              color: "hsl(205 90% 75%)",
            }}
          >
            <ShieldCheck className="w-3 h-3" /> Texas Total Security
          </span>
          <h2
            className="font-display font-bold text-white leading-[1.05] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.85rem, 4.4vw, 3rem)", letterSpacing: "-0.035em" }}
          >
            Wireless Bridge{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(205 95% 70%) 0%, hsl(205 95% 55%) 50%, hsl(0 85% 56%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Surveillance System
            </span>
          </h2>
          <p className="text-white/70 text-[0.98rem] sm:text-[1.05rem] leading-relaxed max-w-2xl mx-auto">
            Reliable long-range security without trenching or fiber.
          </p>
        </motion.div>

        {/* SVG diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
          style={{
            background: "linear-gradient(180deg, hsl(210 50% 8% / 0.6) 0%, hsl(0 0% 5% / 0.4) 100%)",
            border: "1px solid hsl(205 60% 30% / 0.22)",
            borderRadius: "20px",
            padding: "clamp(0.75rem, 2vw, 1.5rem)",
            boxShadow: "0 30px 80px -30px hsl(205 90% 30% / 0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <svg
            viewBox="0 0 1000 460"
            className="w-full h-auto block"
            role="img"
            aria-label="Diagram of wireless surveillance bridge linking remote pole to a commercial building network switch"
          >
            <defs>
              <linearGradient id="bgFloor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210 50% 12%)" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(210 60% 20%)" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="poleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0 0% 78%)" />
                <stop offset="100%" stopColor="hsl(0 0% 32%)" />
              </linearGradient>
              <linearGradient id="bldgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210 25% 30%)" />
                <stop offset="100%" stopColor="hsl(210 30% 12%)" />
              </linearGradient>
              <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(205 95% 60%)" stopOpacity="0.0" />
                <stop offset="15%" stopColor="hsl(205 95% 65%)" stopOpacity="0.95" />
                <stop offset="50%" stopColor="hsl(195 100% 78%)" stopOpacity="1" />
                <stop offset="85%" stopColor="hsl(205 95% 65%)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="hsl(205 95% 60%)" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="beamCoreGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(195 100% 90%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(195 100% 95%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(195 100% 90%)" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="cameraGlowBlue" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="hsl(205 95% 60%)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="hsl(205 95% 60%)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="redAccentGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="hsl(0 90% 58%)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(0 90% 58%)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="antGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="hsl(205 95% 65%)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(205 95% 65%)" stopOpacity="0" />
              </radialGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ground */}
            <rect x="0" y="380" width="1000" height="80" fill="url(#bgFloor)" />
            <line x1="0" y1="395" x2="1000" y2="395" stroke="hsl(205 60% 30% / 0.25)" strokeWidth="1" strokeDasharray="2 6" />

            {/* ─────────── LEFT: SURVEILLANCE POLE ─────────── */}
            <g className="tts-float-pole">
              {/* Concrete base */}
              <rect x="138" y="370" width="44" height="18" rx="2" fill="hsl(0 0% 24%)" />
              <rect x="134" y="386" width="52" height="6" rx="1" fill="hsl(0 0% 14%)" />
              <rect x="138" y="370" width="44" height="3" fill="hsl(0 0% 32%)" />

              {/* Pole */}
              <rect x="156" y="80" width="8" height="290" fill="url(#poleGrad)" />
              <rect x="156" y="80" width="2" height="290" fill="hsl(0 0% 95%)" opacity="0.55" />
              <rect x="155" y="160" width="10" height="2" fill="hsl(0 0% 25%)" />
              <rect x="155" y="240" width="10" height="2" fill="hsl(0 0% 25%)" />

              {/* Cross-arm */}
              <rect x="100" y="100" width="120" height="5" fill="hsl(0 0% 55%)" />
              <rect x="100" y="100" width="120" height="1.5" fill="hsl(0 0% 80%)" />

              {/* Camera 1 — left (PoE bullet camera) */}
              <g {...hoverProps("cam1")} transform="translate(108 95)">
                <circle cx="0" cy="0" r="22" fill="url(#cameraGlowBlue)" className="tts-glow" />
                {/* mount arm */}
                <rect x="-1.5" y="-14" width="3" height="6" fill="hsl(0 0% 55%)" />
                {/* body */}
                <rect x="-13" y="-8" width="26" height="16" rx="4" fill="hsl(0 0% 94%)" stroke="hsl(0 0% 60%)" strokeWidth="0.6" />
                <rect x="-13" y="-8" width="26" height="5" rx="3" fill="hsl(0 0% 78%)" />
                {/* sunshield */}
                <rect x="-14" y="-10" width="28" height="3" rx="1.5" fill="hsl(0 0% 88%)" />
                {/* lens */}
                <circle cx="0" cy="2" r="5.5" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 35%)" strokeWidth="0.6" />
                <circle cx="0" cy="2" r="2.6" fill="hsl(205 95% 60%)" className="tts-glow" />
                <circle cx="-1.2" cy="0.8" r="0.9" fill="white" opacity="0.85" />
                {/* IR LED */}
                <circle cx="-9" cy="2" r="1.2" fill="hsl(0 90% 60%)" className="tts-led" />
                <circle cx="9" cy="2" r="1.2" fill="hsl(0 90% 60%)" className="tts-led" />
              </g>

              {/* Camera 2 — right (PoE turret camera) */}
              <g {...hoverProps("cam2")} transform="translate(212 95)">
                <circle cx="0" cy="0" r="22" fill="url(#cameraGlowBlue)" className="tts-glow" />
                <rect x="-1.5" y="-14" width="3" height="6" fill="hsl(0 0% 55%)" />
                <rect x="-13" y="-8" width="26" height="16" rx="4" fill="hsl(0 0% 94%)" stroke="hsl(0 0% 60%)" strokeWidth="0.6" />
                <rect x="-13" y="-8" width="26" height="5" rx="3" fill="hsl(0 0% 78%)" />
                <rect x="-14" y="-10" width="28" height="3" rx="1.5" fill="hsl(0 0% 88%)" />
                <circle cx="0" cy="2" r="5.5" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 35%)" strokeWidth="0.6" />
                <circle cx="0" cy="2" r="2.6" fill="hsl(205 95% 60%)" className="tts-glow" />
                <circle cx="-1.2" cy="0.8" r="0.9" fill="white" opacity="0.85" />
                <circle cx="-9" cy="2" r="1.2" fill="hsl(0 90% 60%)" className="tts-led" />
                <circle cx="9" cy="2" r="1.2" fill="hsl(0 90% 60%)" className="tts-led" />
              </g>

              {/* Wireless bridge antenna (TX, top) */}
              <g {...hoverProps("ant1")} transform="translate(160 58)">
                <circle cx="0" cy="0" r="30" fill="url(#antGlow)" className="tts-glow" />
                {/* dish back */}
                <ellipse cx="0" cy="0" rx="15" ry="22" fill="hsl(0 0% 96%)" stroke="hsl(0 0% 55%)" strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="15" ry="22" fill="none" stroke="hsl(0 0% 70%)" strokeWidth="0.5" strokeDasharray="2 3" />
                {/* feed horn */}
                <ellipse cx="0" cy="0" rx="6" ry="11" fill="hsl(0 0% 78%)" />
                <circle cx="0" cy="0" r="2.2" fill="hsl(205 95% 65%)" className="tts-glow" />
                {/* mast */}
                <rect x="-1.5" y="20" width="3" height="14" fill="hsl(0 0% 58%)" />
                {/* tilt bracket */}
                <rect x="-4" y="32" width="8" height="3" fill="hsl(0 0% 45%)" />
              </g>

              {/* Flex utility (PoE) box */}
              <g {...hoverProps("box")} transform="translate(140 230)">
                <rect x="0" y="0" width="40" height="58" rx="4" fill="hsl(0 0% 90%)" stroke="hsl(0 0% 50%)" strokeWidth="1" />
                <rect x="0" y="0" width="40" height="58" rx="4" fill="none" stroke="hsl(0 0% 100%)" strokeWidth="0.5" opacity="0.4" />
                {/* hinge */}
                <rect x="0" y="22" width="2" height="14" fill="hsl(0 0% 55%)" />
                {/* faceplate display */}
                <rect x="3" y="3" width="34" height="14" rx="1" fill="hsl(210 35% 16%)" stroke="hsl(210 30% 25%)" strokeWidth="0.5" />
                <circle cx="8" cy="10" r="1.6" fill="hsl(120 80% 55%)" className="tts-led" />
                <circle cx="14" cy="10" r="1.6" fill="hsl(205 90% 60%)" className="tts-glow" />
                <circle cx="20" cy="10" r="1.6" fill="hsl(45 90% 55%)" className="tts-led" />
                {/* DIN rails / ports */}
                <rect x="6" y="22" width="28" height="2" rx="0.5" fill="hsl(0 0% 55%)" />
                <rect x="6" y="28" width="28" height="2" rx="0.5" fill="hsl(0 0% 55%)" />
                <rect x="6" y="34" width="28" height="2" rx="0.5" fill="hsl(0 0% 55%)" />
                <rect x="6" y="40" width="28" height="2" rx="0.5" fill="hsl(0 0% 55%)" />
                {/* RJ45 ports */}
                <rect x="6" y="46" width="6" height="6" fill="hsl(0 0% 25%)" />
                <rect x="14" y="46" width="6" height="6" fill="hsl(0 0% 25%)" />
                <rect x="22" y="46" width="6" height="6" fill="hsl(0 0% 25%)" />
                <rect x="30" y="46" width="6" height="6" fill="hsl(0 0% 25%)" />
                {/* lock */}
                <circle cx="34" cy="14" r="1.5" fill="hsl(0 0% 50%)" />
              </g>

              {/* PoE flow lines: cameras → box → antenna (TX) */}
              <path d="M 116 105 Q 130 160 158 230" fill="none" stroke="hsl(205 90% 60% / 0.35)" strokeWidth="3" />
              <path d="M 116 105 Q 130 160 158 230" fill="none" stroke="hsl(205 95% 70%)" strokeWidth="1.6" className="tts-flow" />

              <path d="M 204 105 Q 188 160 162 230" fill="none" stroke="hsl(205 90% 60% / 0.35)" strokeWidth="3" />
              <path d="M 204 105 Q 188 160 162 230" fill="none" stroke="hsl(205 95% 70%)" strokeWidth="1.6" className="tts-flow" />

              <path d="M 160 230 Q 160 150 160 92" fill="none" stroke="hsl(205 90% 60% / 0.35)" strokeWidth="3" />
              <path d="M 160 230 Q 160 150 160 92" fill="none" stroke="hsl(205 95% 70%)" strokeWidth="1.6" className="tts-flow" />

              <Tooltip id="cam1" x={108} y={95} label="PoE Camera" sub="4K bullet, IR night vision" />
              <Tooltip id="cam2" x={212} y={95} label="PoE Camera" sub="4K turret with analytics" />
              <Tooltip id="ant1" x={160} y={60} label="Wireless Bridge" sub="Transmit (TX) — 5GHz directional" />
              <Tooltip id="box" x={160} y={258} label="Flex Utility Box" sub="PoE injector & power distribution" />
            </g>

            {/* ─────────── CENTER: WIRELESS RF LINK ─────────── */}
            <g>
              {/* Outer halo */}
              <line x1="190" y1="58" x2="800" y2="80" stroke="url(#beamGrad)" strokeWidth="18" opacity="0.18" filter="url(#strongGlow)" />
              {/* Mid beam */}
              <line x1="190" y1="58" x2="800" y2="80" stroke="url(#beamGrad)" strokeWidth="8" opacity="0.5" filter="url(#softGlow)" className="tts-beam-glow" />
              {/* Bright core */}
              <line x1="190" y1="58" x2="800" y2="80" stroke="url(#beamCoreGrad)" strokeWidth="2.5" opacity="0.95" />
              {/* Flowing pulse along the beam */}
              <line
                x1="190"
                y1="58"
                x2="800"
                y2="80"
                stroke="hsl(195 100% 92%)"
                strokeWidth="2"
                className="tts-beam-core"
                strokeLinecap="round"
                opacity="0.95"
              />

              {/* Pulse arcs near antennas */}
              {[0, 1, 2].map((i) => (
                <circle
                  key={`p1-${i}`}
                  cx="190"
                  cy="58"
                  r={10 + i * 8}
                  fill="none"
                  stroke="hsl(205 95% 65%)"
                  strokeWidth="1"
                  opacity={0.4 - i * 0.1}
                >
                  <animate attributeName="r" from={10 + i * 8} to={30 + i * 8} dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from={0.5 - i * 0.1} to="0" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {[0, 1, 2].map((i) => (
                <circle
                  key={`p2-${i}`}
                  cx="800"
                  cy="80"
                  r={10 + i * 8}
                  fill="none"
                  stroke="hsl(205 95% 65%)"
                  strokeWidth="1"
                  opacity={0.4 - i * 0.1}
                >
                  <animate attributeName="r" from={10 + i * 8} to={30 + i * 8} dur="2.4s" begin={`${i * 0.6 + 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from={0.5 - i * 0.1} to="0" dur="2.4s" begin={`${i * 0.6 + 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}

              {/* Direction indicator arrow */}
              <g transform="translate(495 30)">
                <polygon points="-6,-4 6,0 -6,4" fill="hsl(195 100% 80%)" opacity="0.85" />
              </g>

              {/* Beam label */}
              <g {...hoverProps("beam")}>
                <rect x="420" y="40" width="160" height="22" rx="11" fill="hsl(210 60% 12%)" stroke="hsl(205 90% 55% / 0.65)" strokeWidth="1" />
                <circle cx="432" cy="51" r="2.5" fill="hsl(0 90% 58%)" className="tts-led" />
                <text x="505" y="55" textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(205 95% 82%)" letterSpacing="1.5">
                  POINT-TO-POINT RF LINK
                </text>
              </g>
              <Tooltip id="beam" x={500} y={50} label="Wireless Bridge Link" sub="Up to 3 mi line-of-sight" />
            </g>

            {/* ─────────── RIGHT: COMMERCIAL BUILDING ─────────── */}
            <g className="tts-float-bldg">
              {/* Building body */}
              <rect x="700" y="160" width="240" height="220" fill="url(#bldgGrad)" stroke="hsl(210 30% 38%)" strokeWidth="1" />
              <rect x="694" y="156" width="252" height="8" fill="hsl(210 30% 22%)" />
              <rect x="694" y="156" width="252" height="2" fill="hsl(210 30% 35%)" />

              {/* Subtle red brand accent stripe */}
              <rect x="700" y="370" width="240" height="2" fill="hsl(0 85% 56%)" opacity="0.55" />

              {/* Windows */}
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4].map((col) => (
                  <rect
                    key={`w-${row}-${col}`}
                    x={714 + col * 44}
                    y={180 + row * 44}
                    width="32"
                    height="28"
                    fill={(row + col) % 3 === 0 ? "hsl(45 85% 65%)" : "hsl(210 50% 28%)"}
                    opacity={(row + col) % 3 === 0 ? 0.88 : 0.5}
                    stroke="hsl(210 30% 18%)"
                    strokeWidth="0.5"
                  />
                ))
              )}

              {/* Entrance */}
              <rect x="800" y="340" width="40" height="40" fill="hsl(210 40% 22%)" stroke="hsl(210 30% 18%)" strokeWidth="1" />
              <rect x="817" y="345" width="6" height="35" fill="hsl(0 0% 12%)" />

              {/* Rooftop wireless bridge (RX) */}
              <g {...hoverProps("ant2")} transform="translate(800 80)">
                <circle cx="0" cy="0" r="30" fill="url(#antGlow)" className="tts-glow" />
                <rect x="-1.5" y="20" width="3" height="58" fill="hsl(0 0% 58%)" />
                <ellipse cx="0" cy="0" rx="15" ry="22" fill="hsl(0 0% 96%)" stroke="hsl(0 0% 55%)" strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="15" ry="22" fill="none" stroke="hsl(0 0% 70%)" strokeWidth="0.5" strokeDasharray="2 3" />
                <ellipse cx="0" cy="0" rx="6" ry="11" fill="hsl(0 0% 78%)" />
                <circle cx="0" cy="0" r="2.2" fill="hsl(205 95% 65%)" className="tts-glow" />
              </g>

              {/* Indoor PoE Access Point (ceiling-mount style) */}
              <g {...hoverProps("ap")} transform="translate(870 235)">
                <circle cx="0" cy="0" r="18" fill="url(#antGlow)" className="tts-glow" opacity="0.7" />
                <circle cx="0" cy="0" r="11" fill="hsl(0 0% 96%)" stroke="hsl(0 0% 60%)" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="7" fill="hsl(0 0% 92%)" stroke="hsl(0 0% 70%)" strokeWidth="0.4" />
                <circle cx="0" cy="0" r="2.6" fill="hsl(205 90% 60%)" className="tts-glow" />
                <circle cx="0" cy="0" r="0.8" fill="white" />
              </g>

              {/* Network switch (rack mount) */}
              <g {...hoverProps("switch")} transform="translate(720 285)">
                <rect x="0" y="0" width="80" height="34" rx="3" fill="hsl(210 22% 10%)" stroke="hsl(205 90% 55% / 0.55)" strokeWidth="1" />
                <rect x="0" y="0" width="80" height="34" rx="3" fill="none" stroke="hsl(0 0% 100% / 0.08)" strokeWidth="0.5" />
                {/* brand stripe */}
                <rect x="0" y="0" width="3" height="34" fill="hsl(0 85% 56%)" opacity="0.7" />
                {/* status LEDs */}
                <circle cx="9" cy="6" r="1.4" fill="hsl(120 80% 55%)" className="tts-led" />
                <circle cx="14" cy="6" r="1.4" fill="hsl(205 90% 60%)" className="tts-glow" />
                <circle cx="19" cy="6" r="1.4" fill="hsl(45 90% 55%)" className="tts-led" />
                {/* RJ45 ports */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i}>
                    <rect x={9 + i * 8.4} y={12} width="6.8" height="8" rx="0.5" fill="hsl(0 0% 22%)" stroke="hsl(0 0% 35%)" strokeWidth="0.4" />
                    <circle cx={12.4 + i * 8.4} cy={22.5} r="0.7" fill={i % 2 === 0 ? "hsl(120 80% 55%)" : "hsl(45 90% 55%)"} className="tts-led" />
                  </g>
                ))}
                <text x="40" y="32" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="hsl(205 90% 70%)" letterSpacing="1">
                  POE+ NETWORK SWITCH
                </text>
              </g>

              {/* Data flow: RX → AP → Switch (directional, left→right then down) */}
              {/* RX down to AP */}
              <path d="M 800 110 Q 820 170 870 235" fill="none" stroke="hsl(205 90% 60% / 0.35)" strokeWidth="3" />
              <path d="M 800 110 Q 820 170 870 235" fill="none" stroke="hsl(205 95% 70%)" strokeWidth="1.6" className="tts-flow-slow" />

              {/* RX direct to Switch (PoE backbone) */}
              <path d="M 800 110 Q 770 200 760 285" fill="none" stroke="hsl(205 90% 60% / 0.35)" strokeWidth="3" />
              <path d="M 800 110 Q 770 200 760 285" fill="none" stroke="hsl(205 95% 70%)" strokeWidth="1.6" className="tts-flow-slow" />

              {/* AP back to Switch */}
              <path d="M 870 235 Q 820 270 780 285" fill="none" stroke="hsl(205 90% 60% / 0.35)" strokeWidth="3" />
              <path d="M 870 235 Q 820 270 780 285" fill="none" stroke="hsl(205 95% 70%)" strokeWidth="1.6" className="tts-flow-slow" />

              <Tooltip id="ant2" x={800} y={80} label="Wireless Bridge" sub="Receive (RX) — rooftop endpoint" />
              <Tooltip id="ap" x={870} y={235} label="Access Point" sub="PoE wireless access point" />
              <Tooltip id="switch" x={760} y={285} label="Network Switch" sub="Local PoE+ recording network" />
            </g>

            {/* Logo watermark */}
            <text
              x="20"
              y="440"
              fontSize="10"
              fontWeight="700"
              fill="hsl(205 60% 60%)"
              opacity="0.5"
              letterSpacing="2.5"
            >
              TEXAS TOTAL SECURITY · WIRELESS BRIDGE INFRASTRUCTURE
            </text>
          </svg>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-4xl mx-auto"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(180deg, hsl(210 50% 12% / 0.7), hsl(210 50% 8% / 0.7))",
                border: "1px solid hsl(205 60% 30% / 0.35)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{
                  background: "hsl(205 90% 55% / 0.15)",
                  border: "1px solid hsl(205 90% 55% / 0.3)",
                }}
              >
                <Icon className="w-4 h-4" style={{ color: "hsl(205 95% 70%)" }} />
              </span>
              <span className="text-white text-[12px] sm:text-[12.5px] font-semibold tracking-wide leading-tight">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <a
            href="/property-assessment"
            className="btn-primary-gradient inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-[14px]"
            style={{ boxShadow: "0 8px 30px hsl(205 90% 45% / 0.35), 0 2px 8px rgba(0,0,0,0.3)" }}
          >
            Design My Wireless Bridge System
          </a>
          <p className="text-white/45 text-[11px] mt-3 tracking-wide">
            No trenching · No fiber · Local hardware network
          </p>
        </div>
      </div>
    </section>
  );
};

export default WirelessBridgeSection;
