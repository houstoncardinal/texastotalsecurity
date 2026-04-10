import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  ArrowRight, Phone, CheckCircle2, Camera, Sun, Palette, Ruler,
  ChevronLeft, ChevronRight, RotateCcw, Eye,
} from "lucide-react";
import * as THREE from "three";

/* ─── Configuration Options ─────────────────────────────── */
const POLE_HEIGHTS = [
  { label: "10 ft", value: 10, desc: "Parking lots & small areas" },
  { label: "15 ft", value: 15, desc: "Standard commercial" },
  { label: "20 ft", value: 20, desc: "Large properties & gates" },
  { label: "25 ft", value: 25, desc: "Maximum coverage & deterrence" },
];

const CAMERA_COUNTS = [1, 2, 3, 4];

const CAMERA_TYPES = [
  { label: "PTZ", value: "ptz", desc: "360° pan-tilt-zoom coverage" },
  { label: "Bullet", value: "bullet", desc: "Fixed long-range focus" },
  { label: "Dome", value: "dome", desc: "Discreet wide-angle view" },
  { label: "LPR", value: "lpr", desc: "License plate recognition" },
];

const LIGHTING_OPTIONS = [
  { label: "None", value: "none", desc: "Camera-only setup" },
  { label: "LED Floodlight", value: "led", desc: "High-output white light" },
  { label: "IR Illuminator", value: "ir", desc: "Invisible night vision boost" },
  { label: "Strobe + Siren", value: "strobe", desc: "Active deterrence system" },
];

const COLOR_OPTIONS = [
  { label: "Matte Black", value: "#1a1a1a", hex: "#1a1a1a" },
  { label: "White", value: "#e8e8e8", hex: "#e8e8e8" },
  { label: "Bronze", value: "#5c3a21", hex: "#5c3a21" },
  { label: "Dark Green", value: "#2d4a3e", hex: "#2d4a3e" },
  { label: "Silver", value: "#8a8a8a", hex: "#8a8a8a" },
];

interface Config {
  height: number;
  cameraCount: number;
  cameraType: string;
  lighting: string;
  color: string;
}

/* ─── 3D Pole Component ─────────────────────────────────── */
function SecurityPole({ config }: { config: Config }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  const poleHeight = config.height * 0.18;
  const poleColor = config.color;
  const cameraArmLength = 0.6;

  // Camera positions based on count
  const cameraPositions = useMemo(() => {
    const positions: { angle: number; height: number }[] = [];
    for (let i = 0; i < config.cameraCount; i++) {
      const angle = (i / config.cameraCount) * Math.PI * 2;
      const height = poleHeight - 0.15 - (i * 0.22);
      positions.push({ angle, height });
    }
    return positions;
  }, [config.cameraCount, poleHeight]);

  return (
    <group ref={groupRef} position={[0, -poleHeight / 2, 0]}>
      {/* Base plate */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.1, 16]} />
        <meshStandardMaterial color={poleColor} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Main pole */}
      <mesh position={[0, poleHeight / 2 + 0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.12, poleHeight, 12]} />
        <meshStandardMaterial color={poleColor} roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, poleHeight + 0.12, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={poleColor} roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Camera arms and cameras */}
      {cameraPositions.map((pos, i) => (
        <group key={i} position={[0, pos.height, 0]} rotation={[0, pos.angle, 0]}>
          {/* Arm */}
          <mesh position={[cameraArmLength / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.03, cameraArmLength, 8]} />
            <meshStandardMaterial color={poleColor} roughness={0.35} metalness={0.7} />
          </mesh>
          
          {/* Camera body */}
          <group position={[cameraArmLength + 0.08, 0, 0]}>
            {config.cameraType === "bullet" ? (
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.06, 0.06, 0.2, 10]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
              </mesh>
            ) : config.cameraType === "dome" ? (
              <group>
                <mesh>
                  <sphereGeometry args={[0.08, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.5} transparent opacity={0.8} />
                </mesh>
                <mesh position={[0, -0.01, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.03, 12]} />
                  <meshStandardMaterial color="#333" roughness={0.4} metalness={0.6} />
                </mesh>
              </group>
            ) : config.cameraType === "lpr" ? (
              <group>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <boxGeometry args={[0.12, 0.22, 0.09]} />
                  <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
                </mesh>
                {/* IR LEDs */}
                <mesh position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <boxGeometry args={[0.04, 0.16, 0.06]} />
                  <meshStandardMaterial color="#440000" roughness={0.5} emissive="#330000" emissiveIntensity={0.5} />
                </mesh>
              </group>
            ) : (
              /* PTZ */
              <group>
                <mesh>
                  <sphereGeometry args={[0.09, 14, 14]} />
                  <meshStandardMaterial color="#1a1a1a" roughness={0.15} metalness={0.6} />
                </mesh>
                {/* Lens ring */}
                <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <torusGeometry args={[0.035, 0.008, 8, 16]} />
                  <meshStandardMaterial color="#111" roughness={0.2} metalness={0.9} />
                </mesh>
              </group>
            )}
            {/* Lens */}
            <mesh position={[0.1, 0, 0]}>
              <sphereGeometry args={[0.025, 10, 10]} />
              <meshStandardMaterial color="#0a1a3a" roughness={0.1} metalness={0.9} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Lighting */}
      {config.lighting === "led" && (
        <group position={[0, poleHeight - 0.4, 0]}>
          <mesh>
            <boxGeometry args={[0.25, 0.08, 0.15]} />
            <meshStandardMaterial color="#ddd" roughness={0.3} metalness={0.5} emissive="#ffffcc" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}
      {config.lighting === "ir" && (
        <group position={[0.15, poleHeight - 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 0.18, 0.08]} />
            <meshStandardMaterial color="#222" roughness={0.4} metalness={0.7} emissive="#330000" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )}
      {config.lighting === "strobe" && (
        <group position={[0, poleHeight + 0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.1, 10]} />
            <meshStandardMaterial color="#cc0000" roughness={0.3} metalness={0.5} emissive="#ff0000" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 0.04, 10]} />
            <meshStandardMaterial color="#ff3300" roughness={0.2} transparent opacity={0.7} emissive="#ff0000" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ─── 3D Scene ──────────────────────────────────────────── */
function PoleScene({ config }: { config: Config }) {
  return (
    <Canvas
      camera={{ position: [3, 1.5, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#b0c4de" />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#ffd4d4" />
      
      <Suspense fallback={<Html center><div className="text-sm text-gray-400">Loading 3D model...</div></Html>}>
        <SecurityPole config={config} />
        <ContactShadows position={[0, -config.height * 0.09 - 0.02, 0]} opacity={0.35} scale={6} blur={2.5} />
        <Environment preset="studio" />
      </Suspense>
      
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

/* ─── Config Panel Steps ────────────────────────────────── */
const STEPS = ["Height", "Cameras", "Type", "Lighting", "Color"];

/* ─── Quote Form ────────────────────────────────────────── */
function QuoteForm({ config, onClose }: { config: Config; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedHeight = POLE_HEIGHTS.find(h => h.value === config.height);
  const selectedType = CAMERA_TYPES.find(t => t.value === config.cameraType);
  const selectedLighting = LIGHTING_OPTIONS.find(l => l.value === config.lighting);
  const selectedColor = COLOR_OPTIONS.find(c => c.value === config.color);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "hsl(120 60% 45% / 0.1)" }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: "hsl(120 60% 40%)" }} />
        </div>
        <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">Quote Request Received</h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          A security specialist will contact you within 2 business hours with a detailed quote for your custom security pole.
        </p>
        <a href="tel:7133879937" className="btn-primary-gradient inline-flex items-center gap-2">
          <Phone className="w-4 h-4" /> Call Now for Immediate Assistance
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Config summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6 p-4 rounded-xl" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Height</p>
          <p className="text-sm font-semibold text-gray-900">{selectedHeight?.label}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Cameras</p>
          <p className="text-sm font-semibold text-gray-900">{config.cameraCount}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Type</p>
          <p className="text-sm font-semibold text-gray-900">{selectedType?.label}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Lighting</p>
          <p className="text-sm font-semibold text-gray-900">{selectedLighting?.label}</p>
        </div>
        <div className="text-center col-span-2 sm:col-span-1">
          <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Color</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-gray-200" style={{ background: selectedColor?.hex }} />
            <p className="text-sm font-semibold text-gray-900">{selectedColor?.label}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
            <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="John Smith" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Company / Property</label>
            <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="ABC Property Management" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Email *</label>
            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="john@company.com" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone *</label>
            <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" placeholder="(713) 555-0000" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Additional Notes</label>
          <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
            placeholder="Describe your property, number of poles needed, installation requirements..." />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="submit" className="btn-primary-gradient flex-1 inline-flex items-center justify-center gap-2 py-3.5 text-sm font-semibold">
            Request Custom Quote <ArrowRight className="w-4 h-4" />
          </button>
          <button type="button" onClick={onClose} className="btn-outline-dark px-6 py-3.5 text-sm">
            Back to Configurator
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center">Your information is secure. We never share or sell your data.</p>
      </form>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
const PoleConfigurator = () => {
  const [config, setConfig] = useState<Config>({
    height: 15,
    cameraCount: 2,
    cameraType: "ptz",
    lighting: "led",
    color: "#1a1a1a",
  });
  const [step, setStep] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  const updateConfig = (key: keyof Config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  return (
    <Layout>
      <SEOHead
        title="Custom Security Pole Configurator | Design Your Setup | Texas Total Security"
        description="Design your custom security camera pole with our interactive 3D configurator. Choose height, cameras, lighting, and color. Get a free quote for your property."
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "hsl(0 0% 3%)", minHeight: "50vh" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(0 85% 45% / 0.08) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "hsl(0 85% 45% / 0.12)", border: "1px solid hsl(0 85% 45% / 0.25)" }}
          >
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 65%)" }}>
              Interactive 3D Configurator
            </span>
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
          >
            Design Your Custom{" "}
            <span style={{
              background: "linear-gradient(135deg, hsl(0 80% 72%), hsl(0 85% 50%))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Security Pole
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base mx-auto mb-4 max-w-xl"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Configure height, cameras, lighting, and finish — see your setup rendered in real-time 3D. Built for property managers, HOAs, and commercial facilities.
          </motion.p>
        </div>
      </section>

      {/* Configurator */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">

            {/* 3D Viewport */}
            <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-100" style={{ minHeight: "500px" }}>
              <PoleScene config={config} />
              {/* Viewport controls hint */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 text-white/70 text-[11px]">
                <RotateCcw className="w-3 h-3" /> Drag to rotate · Scroll to zoom
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60">
                <Eye className="w-3.5 h-3.5 text-white/70" />
                <span className="text-[11px] text-white/70 font-medium">Live Preview</span>
              </div>
            </div>

            {/* Configuration Panel */}
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                {showQuote ? (
                  <motion.div
                    key="quote"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="rounded-3xl border border-gray-200 p-6 sm:p-8"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                  >
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Request Your Custom Quote</h3>
                    <p className="text-sm text-gray-500 mb-6">A specialist will respond within 2 hours.</p>
                    <QuoteForm config={config} onClose={() => setShowQuote(false)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="config"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="rounded-3xl border border-gray-200 p-6 sm:p-8 flex flex-col flex-1"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                  >
                    {/* Step indicator */}
                    <div className="flex items-center gap-1.5 mb-6">
                      {STEPS.map((s, i) => (
                        <button
                          key={s}
                          onClick={() => setStep(i)}
                          className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                            i <= step ? "bg-accent" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-1">
                      Step {step + 1} of {STEPS.length}
                    </p>
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                      {step === 0 && "Select Pole Height"}
                      {step === 1 && "Number of Cameras"}
                      {step === 2 && "Camera Type"}
                      {step === 3 && "Lighting System"}
                      {step === 4 && "Pole Color / Finish"}
                    </h3>

                    {/* Step content */}
                    <div className="flex-1 min-h-0">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-2.5"
                        >
                          {step === 0 && POLE_HEIGHTS.map(h => (
                            <button
                              key={h.value}
                              onClick={() => updateConfig("height", h.value)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                                config.height === h.value
                                  ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Ruler className="w-5 h-5" style={{ color: config.height === h.value ? "hsl(var(--accent))" : "#9ca3af" }} />
                                <div>
                                  <p className="font-semibold text-sm text-gray-900">{h.label}</p>
                                  <p className="text-xs text-gray-400">{h.desc}</p>
                                </div>
                              </div>
                              {config.height === h.value && <CheckCircle2 className="w-5 h-5 text-accent" />}
                            </button>
                          ))}

                          {step === 1 && (
                            <div className="grid grid-cols-2 gap-3">
                              {CAMERA_COUNTS.map(c => (
                                <button
                                  key={c}
                                  onClick={() => updateConfig("cameraCount", c)}
                                  className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all duration-200 ${
                                    config.cameraCount === c
                                      ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <Camera className="w-6 h-6 mb-2" style={{ color: config.cameraCount === c ? "hsl(var(--accent))" : "#9ca3af" }} />
                                  <span className="font-bold text-2xl text-gray-900">{c}</span>
                                  <span className="text-xs text-gray-400">{c === 1 ? "Camera" : "Cameras"}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          {step === 2 && CAMERA_TYPES.map(t => (
                            <button
                              key={t.value}
                              onClick={() => updateConfig("cameraType", t.value)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                                config.cameraType === t.value
                                  ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div>
                                <p className="font-semibold text-sm text-gray-900">{t.label}</p>
                                <p className="text-xs text-gray-400">{t.desc}</p>
                              </div>
                              {config.cameraType === t.value && <CheckCircle2 className="w-5 h-5 text-accent" />}
                            </button>
                          ))}

                          {step === 3 && LIGHTING_OPTIONS.map(l => (
                            <button
                              key={l.value}
                              onClick={() => updateConfig("lighting", l.value)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                                config.lighting === l.value
                                  ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Sun className="w-5 h-5" style={{ color: config.lighting === l.value ? "hsl(var(--accent))" : "#9ca3af" }} />
                                <div>
                                  <p className="font-semibold text-sm text-gray-900">{l.label}</p>
                                  <p className="text-xs text-gray-400">{l.desc}</p>
                                </div>
                              </div>
                              {config.lighting === l.value && <CheckCircle2 className="w-5 h-5 text-accent" />}
                            </button>
                          ))}

                          {step === 4 && (
                            <div className="grid grid-cols-2 gap-3">
                              {COLOR_OPTIONS.map(c => (
                                <button
                                  key={c.value}
                                  onClick={() => updateConfig("color", c.value)}
                                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                                    config.color === c.value
                                      ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <span className="w-8 h-8 rounded-full border-2 shrink-0" style={{
                                    background: c.hex,
                                    borderColor: config.color === c.value ? "hsl(var(--accent))" : "#e5e7eb"
                                  }} />
                                  <span className="text-sm font-medium text-gray-900">{c.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                      {step > 0 && (
                        <button onClick={prevStep} className="btn-outline-dark flex items-center gap-1.5 text-sm px-5 py-3">
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                      )}
                      {step < STEPS.length - 1 ? (
                        <button onClick={nextStep} className="btn-primary-gradient flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold">
                          Next: {STEPS[step + 1]} <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowQuote(true)}
                          className="btn-primary-gradient flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"
                        >
                          Request Quote <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="section-padding" style={{ background: "hsl(0 0% 97%)" }}>
        <div className="container-tight px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Custom Security Infrastructure</span>
            <h2 className="font-display font-bold text-gray-900 mt-4 mb-4" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.08 }}>
              Built for Commercial & Community Properties
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Our custom-fabricated security poles are engineered for maximum coverage, durability, and professional aesthetics — ideal for apartment complexes, HOA communities, parking structures, and commercial facilities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Fabrication", desc: "Every pole is built to your exact specifications — height, camera placement, wiring, and finish are fully customizable." },
              { title: "Professional Installation", desc: "Our licensed technicians handle everything from concrete foundation to final camera alignment and network configuration." },
              { title: "Weather-Rated Hardware", desc: "IP66/67 rated cameras and powder-coated poles engineered to withstand Houston's heat, humidity, and storms." },
              { title: "Integrated Wiring", desc: "All cabling runs internally through the pole for a clean, tamper-resistant installation that deters vandalism." },
              { title: "Scalable Deployments", desc: "From a single entry gate pole to a 50-pole campus-wide deployment — we scale with your property needs." },
              { title: "Ongoing Support", desc: "24/7 monitoring integration, remote diagnostics, and local service technicians for the life of your system." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-gray-100" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <h3 className="font-display font-semibold text-gray-900 mb-2 text-[15px]">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2 text-sm">
              Schedule a Free Property Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PoleConfigurator;
