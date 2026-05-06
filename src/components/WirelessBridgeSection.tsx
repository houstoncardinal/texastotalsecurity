import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Radio, Cloud, Zap, ShieldCheck } from "lucide-react";

/**
 * Wireless Bridge System — premium interactive hero-level section.
 * Uses scalable SVG, framer-motion, and CSS animations only (no heavy libs).
 */
const WirelessBridgeSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const badges = [
    { icon: Lock, label: "Encrypted Connection" },
    { icon: Radio, label: "Long-Range Coverage" },
    { icon: Cloud, label: "Cloud Managed" },
    { icon: Zap, label: "PoE Powered" },
  ];

  // Reusable tooltip
  const Tooltip = ({ id, x, y, label, sub }: { id: string; x: number; y: number; label: string; sub?: string }) =>
    hovered === id ? (
      <foreignObject x={x - 80} y={y - 56} width="160" height="50" style={{ overflow: "visible", pointerEvents: "none" }}>
        <div
          style={{
            background: "rgba(8,12,22,0.96)",
            border: "1px solid hsl(205 90% 55% / 0.55)",
            borderRadius: "8px",
            padding: "6px 10px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.55), 0 0 18px hsl(205 90% 55% / 0.35)",
            textAlign: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ color: "white", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>{label}</div>
          {sub && <div style={{ color: "hsl(205 80% 75%)", fontSize: "9px", marginTop: 2 }}>{sub}</div>}
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
      aria-label="Wireless Security Bridge System"
    >
      {/* Inline keyframes for animated dashes / signal pulses */}
      <style>{`
        @keyframes ttsDash { to { stroke-dashoffset: -200; } }
        @keyframes ttsDashSlow { to { stroke-dashoffset: -120; } }
        @keyframes ttsPulseGlow { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
        @keyframes ttsFloat1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes ttsFloat2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
        .tts-flow { stroke-dasharray: 4 8; animation: ttsDash 4s linear infinite; }
        .tts-flow-slow { stroke-dasharray: 3 7; animation: ttsDashSlow 6s linear infinite; }
        .tts-beam { stroke-dasharray: 8 10; animation: ttsDash 3s linear infinite; }
        .tts-glow { animation: ttsPulseGlow 2.4s ease-in-out infinite; }
        .tts-float-pole { animation: ttsFloat1 7s ease-in-out infinite; transform-origin: center; }
        .tts-float-bldg { animation: ttsFloat2 9s ease-in-out infinite; transform-origin: center; }
        .tts-node { transition: transform 250ms ease, filter 250ms ease; }
        .tts-node:hover, .tts-node-active { transform: scale(1.06); filter: drop-shadow(0 0 10px hsl(205 95% 60% / 0.85)); }
        @media (prefers-reduced-motion: reduce) {
          .tts-flow, .tts-flow-slow, .tts-beam, .tts-glow, .tts-float-pole, .tts-float-bldg { animation: none !important; }
        }
      `}</style>

      {/* Texas outline watermark */}
      <svg
        aria-hidden
        className="absolute pointer-events-none"
        viewBox="0 0 100 100"
        style={{ top: "8%", right: "4%", width: "320px", height: "320px", opacity: 0.05 }}
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
          opacity: 0.04,
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
            Wireless Security{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(205 95% 70%) 0%, hsl(205 95% 55%) 50%, hsl(0 85% 56%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bridge System
            </span>
          </h2>
          <p className="text-white/70 text-[0.98rem] sm:text-[1.05rem] leading-relaxed max-w-2xl mx-auto">
            Secure, long-range surveillance without trenching or cables. Connect remote poles, gates, and outbuildings back to your network with encrypted, point-to-point wireless.
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
            border: "1px solid hsl(205 60% 30% / 0.2)",
            borderRadius: "20px",
            padding: "clamp(0.75rem, 2vw, 1.5rem)",
            boxShadow: "0 30px 80px -30px hsl(205 90% 30% / 0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Aspect-ratio responsive SVG */}
          <svg
            viewBox="0 0 1000 460"
            className="w-full h-auto block"
            role="img"
            aria-label="Diagram of wireless surveillance bridge linking remote pole to a commercial building"
          >
            <defs>
              <linearGradient id="bgFloor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210 50% 12%)" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(210 60% 20%)" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="poleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0 0% 70%)" />
                <stop offset="100%" stopColor="hsl(0 0% 35%)" />
              </linearGradient>
              <linearGradient id="bldgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210 25% 28%)" />
                <stop offset="100%" stopColor="hsl(210 30% 14%)" />
              </linearGradient>
              <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(205 95% 60%)" stopOpacity="0.0" />
                <stop offset="20%" stopColor="hsl(205 95% 60%)" stopOpacity="0.95" />
                <stop offset="80%" stopColor="hsl(205 95% 70%)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="hsl(205 95% 70%)" stopOpacity="0.0" />
              </linearGradient>
              <radialGradient id="cameraGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="hsl(0 90% 60%)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="hsl(0 90% 60%)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="antGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="hsl(205 95% 65%)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="hsl(205 95% 65%)" stopOpacity="0" />
              </radialGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ground floor gradient */}
            <rect x="0" y="380" width="1000" height="80" fill="url(#bgFloor)" />
            <line x1="0" y1="395" x2="1000" y2="395" stroke="hsl(205 60% 30% / 0.25)" strokeWidth="1" strokeDasharray="2 6" />

            {/* ─────────── LEFT: SURVEILLANCE POLE ─────────── */}
            <g className="tts-float-pole">
              {/* Concrete base */}
              <rect x="138" y="370" width="44" height="18" rx="2" fill="hsl(0 0% 22%)" />
              <rect x="134" y="386" width="52" height="6" rx="1" fill="hsl(0 0% 14%)" />

              {/* Pole */}
              <rect x="156" y="80" width="8" height="290" fill="url(#poleGrad)" />
              <rect x="156" y="80" width="2" height="290" fill="hsl(0 0% 90%)" opacity="0.5" />

              {/* Cross-arm */}
              <rect x="100" y="100" width="120" height="5" fill="hsl(0 0% 50%)" />

              {/* Camera 1 — left */}
              <g {...hoverProps("cam1")} transform="translate(108 95)">
                <circle cx="0" cy="0" r="22" fill="url(#cameraGlow)" className="tts-glow" />
                <rect x="-12" y="-9" width="24" height="18" rx="3" fill="hsl(0 0% 92%)" />
                <rect x="-12" y="-9" width="24" height="6" rx="2" fill="hsl(0 0% 75%)" />
                <circle cx="0" cy="2" r="5" fill="hsl(0 0% 12%)" />
                <circle cx="0" cy="2" r="2.5" fill="hsl(205 90% 60%)" className="tts-glow" />
              </g>

              {/* Camera 2 — right */}
              <g {...hoverProps("cam2")} transform="translate(212 95)">
                <circle cx="0" cy="0" r="22" fill="url(#cameraGlow)" className="tts-glow" />
                <rect x="-12" y="-9" width="24" height="18" rx="3" fill="hsl(0 0% 92%)" />
                <rect x="-12" y="-9" width="24" height="6" rx="2" fill="hsl(0 0% 75%)" />
                <circle cx="0" cy="2" r="5" fill="hsl(0 0% 12%)" />
                <circle cx="0" cy="2" r="2.5" fill="hsl(0 90% 60%)" className="tts-glow" />
              </g>

              {/* Wireless bridge antenna (top) */}
              <g {...hoverProps("ant1")} transform="translate(160 60)">
                <circle cx="0" cy="0" r="28" fill="url(#antGlow)" className="tts-glow" />
                <ellipse cx="0" cy="0" rx="14" ry="20" fill="hsl(0 0% 96%)" stroke="hsl(0 0% 65%)" strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="7" ry="12" fill="hsl(0 0% 80%)" />
                <rect x="-1.5" y="18" width="3" height="14" fill="hsl(0 0% 60%)" />
              </g>

              {/* Weatherproof utility (NVR) box */}
              <g {...hoverProps("box")} transform="translate(140 230)">
                <rect x="0" y="0" width="40" height="56" rx="4" fill="hsl(0 0% 88%)" stroke="hsl(0 0% 55%)" strokeWidth="1" />
                <rect x="3" y="3" width="34" height="14" rx="1" fill="hsl(210 30% 18%)" />
                <circle cx="8" cy="10" r="1.5" fill="hsl(120 80% 55%)" className="tts-glow" />
                <circle cx="14" cy="10" r="1.5" fill="hsl(205 90% 60%)" className="tts-glow" />
                <circle cx="20" cy="10" r="1.5" fill="hsl(0 0% 50%)" />
                <rect x="6" y="22" width="28" height="2" fill="hsl(0 0% 60%)" />
                <rect x="6" y="28" width="28" height="2" fill="hsl(0 0% 60%)" />
                <rect x="6" y="34" width="28" height="2" fill="hsl(0 0% 60%)" />
                <rect x="6" y="40" width="28" height="2" fill="hsl(0 0% 60%)" />
                <circle cx="34" cy="50" r="2" fill="hsl(0 0% 50%)" />
              </g>

              {/* PoE flow lines: cameras → box → antenna */}
              <path d="M 116 105 Q 140 160 160 230" fill="none" stroke="hsl(205 90% 60%)" strokeWidth="1.5" className="tts-flow" opacity="0.85" />
              <path d="M 204 105 Q 180 160 160 230" fill="none" stroke="hsl(205 90% 60%)" strokeWidth="1.5" className="tts-flow" opacity="0.85" />
              <path d="M 160 230 Q 160 150 160 88" fill="none" stroke="hsl(205 90% 60%)" strokeWidth="1.5" className="tts-flow" opacity="0.85" />

              {/* Tooltips */}
              <Tooltip id="cam1" x={108} y={95} label="4K PoE Camera" sub="Active deterrence" />
              <Tooltip id="cam2" x={212} y={95} label="LPR Camera" sub="License plate recognition" />
              <Tooltip id="ant1" x={160} y={60} label="Wireless Bridge" sub="Encrypted 5GHz uplink" />
              <Tooltip id="box" x={160} y={258} label="Weatherproof PoE Box" sub="NVR & power" />
            </g>

            {/* ─────────── CENTER: WIRELESS SIGNAL BEAM ─────────── */}
            <g>
              {/* Background outer beam */}
              <line x1="190" y1="60" x2="800" y2="80" stroke="url(#beamGrad)" strokeWidth="14" opacity="0.18" filter="url(#softGlow)" />
              {/* Mid beam */}
              <line x1="190" y1="60" x2="800" y2="80" stroke="url(#beamGrad)" strokeWidth="6" opacity="0.45" />
              {/* Animated dashed signal */}
              <line
                x1="190"
                y1="60"
                x2="800"
                y2="80"
                stroke="hsl(205 95% 75%)"
                strokeWidth="2"
                className="tts-beam"
                strokeLinecap="round"
                opacity="0.95"
              />
              {/* Pulse arcs near the antennas */}
              {[0, 1, 2].map((i) => (
                <circle
                  key={`p1-${i}`}
                  cx="190"
                  cy="60"
                  r={10 + i * 8}
                  fill="none"
                  stroke="hsl(205 95% 65%)"
                  strokeWidth="1"
                  opacity={0.4 - i * 0.1}
                >
                  <animate attributeName="r" from={10 + i * 8} to={28 + i * 8} dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
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
                  <animate attributeName="r" from={10 + i * 8} to={28 + i * 8} dur="2.4s" begin={`${i * 0.6 + 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from={0.5 - i * 0.1} to="0" dur="2.4s" begin={`${i * 0.6 + 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}

              {/* Beam label */}
              <g {...hoverProps("beam")}>
                <rect x="430" y="40" width="140" height="22" rx="11" fill="hsl(210 60% 12%)" stroke="hsl(205 90% 55% / 0.6)" strokeWidth="1" />
                <text x="500" y="55" textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(205 95% 80%)" letterSpacing="1.5">
                  AES-256 ENCRYPTED LINK
                </text>
              </g>
              <Tooltip id="beam" x={500} y={50} label="Point-to-Point Bridge" sub="Up to 3 mi line-of-sight" />
            </g>

            {/* ─────────── RIGHT: COMMERCIAL BUILDING ─────────── */}
            <g className="tts-float-bldg">
              {/* Building body */}
              <rect x="700" y="160" width="240" height="220" fill="url(#bldgGrad)" stroke="hsl(210 30% 35%)" strokeWidth="1" />
              {/* Roof ledge */}
              <rect x="694" y="156" width="252" height="8" fill="hsl(210 30% 22%)" />
              {/* Windows grid */}
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4].map((col) => (
                  <rect
                    key={`w-${row}-${col}`}
                    x={714 + col * 44}
                    y={180 + row * 44}
                    width="32"
                    height="28"
                    fill={(row + col) % 3 === 0 ? "hsl(45 80% 65%)" : "hsl(210 50% 30%)"}
                    opacity={(row + col) % 3 === 0 ? 0.85 : 0.5}
                    stroke="hsl(210 30% 18%)"
                    strokeWidth="0.5"
                  />
                ))
              )}
              {/* Entrance */}
              <rect x="800" y="340" width="40" height="40" fill="hsl(210 40% 22%)" stroke="hsl(210 30% 18%)" strokeWidth="1" />
              <rect x="817" y="345" width="6" height="35" fill="hsl(0 0% 12%)" />

              {/* Rooftop wireless bridge receiver */}
              <g {...hoverProps("ant2")} transform="translate(800 80)">
                <circle cx="0" cy="0" r="28" fill="url(#antGlow)" className="tts-glow" />
                <rect x="-1.5" y="0" width="3" height="76" fill="hsl(0 0% 55%)" />
                <ellipse cx="0" cy="0" rx="14" ry="20" fill="hsl(0 0% 96%)" stroke="hsl(0 0% 65%)" strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="7" ry="12" fill="hsl(0 0% 80%)" />
              </g>

              {/* Wall-mounted access point */}
              <g {...hoverProps("ap")} transform="translate(920 220)">
                <circle cx="0" cy="0" r="14" fill="url(#antGlow)" className="tts-glow" opacity="0.7" />
                <circle cx="0" cy="0" r="7" fill="hsl(0 0% 95%)" stroke="hsl(0 0% 60%)" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="2.5" fill="hsl(205 90% 60%)" className="tts-glow" />
              </g>

              {/* Network rack (subtle, inside building) */}
              <g {...hoverProps("rack")} transform="translate(740 280)">
                <rect x="0" y="0" width="42" height="70" rx="2" fill="hsl(210 20% 10%)" stroke="hsl(205 90% 55% / 0.5)" strokeWidth="1" opacity="0.95" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <rect x="3" y={4 + i * 13} width="36" height="9" fill="hsl(210 25% 16%)" />
                    <circle cx="7" cy={8.5 + i * 13} r="1" fill="hsl(120 80% 55%)" className="tts-glow" />
                    <circle cx="11" cy={8.5 + i * 13} r="1" fill="hsl(205 90% 60%)" />
                    <rect x="16" y={7 + i * 13} width="20" height="3" fill="hsl(0 0% 30%)" />
                  </g>
                ))}
              </g>

              {/* Data flow: receiver → AP → rack */}
              <path d="M 800 156 Q 800 200 920 220" fill="none" stroke="hsl(205 90% 60%)" strokeWidth="1.5" className="tts-flow-slow" opacity="0.85" />
              <path d="M 920 220 Q 870 260 761 280" fill="none" stroke="hsl(205 90% 60%)" strokeWidth="1.5" className="tts-flow-slow" opacity="0.85" />
              <path d="M 800 156 Q 770 220 761 280" fill="none" stroke="hsl(205 90% 60%)" strokeWidth="1.2" className="tts-flow-slow" opacity="0.55" />

              {/* Tooltips */}
              <Tooltip id="ant2" x={800} y={80} label="Rooftop Receiver" sub="Wireless bridge endpoint" />
              <Tooltip id="ap" x={920} y={220} label="Wireless Access Point" sub="Building Wi-Fi distribution" />
              <Tooltip id="rack" x={761} y={280} label="Network Rack & Cloud Gateway" sub="Recording + remote access" />
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
            No trenching · No cable runs · Encrypted long-range link
          </p>
        </div>
      </div>
    </section>
  );
};

export default WirelessBridgeSection;
