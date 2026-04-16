import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import {
  ArrowRight, Phone, CheckCircle2, Camera, Sun, Ruler,
  ChevronLeft, ChevronRight, RotateCcw, Eye, Zap, Shield,
  Box, Layers, Package, MapPin, Building2, Wrench, Star,
  DollarSign, ClipboardList, Check, X,
} from "lucide-react";
import * as THREE from "three";

// ─── Quote Storage ────────────────────────────────────────────────────────────

export interface PoleQuote {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  notes: string;
  config: PoleConfig;
  estimatedTotal: number;
  submittedAt: number;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
}

const QUOTES_KEY = "tts_pole_quotes";

export function loadPoleQuotes(): PoleQuote[] {
  try {
    const raw = localStorage.getItem(QUOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function savePoleQuote(quote: PoleQuote) {
  const existing = loadPoleQuotes();
  localStorage.setItem(QUOTES_KEY, JSON.stringify([quote, ...existing]));
}

// ─── Configuration Options ────────────────────────────────────────────────────

const POLE_HEIGHTS = [
  { label: "10 ft", value: 10, desc: "Parking lots, small yards", baseCost: 850 },
  { label: "15 ft", value: 15, desc: "Standard commercial", baseCost: 1200 },
  { label: "20 ft", value: 20, desc: "Large properties, gates", baseCost: 1600 },
  { label: "25 ft", value: 25, desc: "Maximum deterrence", baseCost: 2100 },
  { label: "30 ft", value: 30, desc: "Industrial / Perimeter", baseCost: 2700 },
];

const ARM_CONFIGS = [
  { label: "T-Bar Crossarm", value: "crossarm", desc: "Horizontal arm, cameras hang pendant from underside", cost: 320, arms: 2 },
  { label: "Single Bracket", value: "single", desc: "Swan-neck arm — all cameras one direction", cost: 0, arms: 1 },
  { label: "Dual Bracket", value: "dual", desc: "Opposite-facing brackets for 2-way coverage", cost: 180, arms: 2 },
  { label: "360° Multi-Bracket", value: "cross", desc: "Individual brackets distributed around pole", cost: 280, arms: 4 },
  { label: "Direct Mount", value: "none", desc: "Camera integrated flush to pole body", cost: 0, arms: 0 },
];

const CAMERA_COUNTS = [1, 2, 3, 4, 5, 6];

const CAMERA_TYPES = [
  { label: "PTZ", value: "ptz", desc: "360° pan-tilt-zoom", cost: 650 },
  { label: "Bullet", value: "bullet", desc: "Fixed long-range focus", cost: 380 },
  { label: "Dome", value: "dome", desc: "Discreet wide-angle", cost: 320 },
  { label: "LPR", value: "lpr", desc: "License plate recognition", cost: 950 },
  { label: "Multi-Sensor", value: "multi", desc: "180°/360° panoramic", cost: 1100 },
];

const LIGHTING_OPTIONS = [
  { label: "None", value: "none", desc: "Camera-only setup", cost: 0 },
  { label: "LED Floodlight", value: "led", desc: "High-output white light", cost: 280 },
  { label: "IR Illuminator", value: "ir", desc: "Invisible night vision", cost: 220 },
  { label: "Strobe + Siren", value: "strobe", desc: "Active deterrence", cost: 340 },
  { label: "Solar LED", value: "solar", desc: "Off-grid illumination", cost: 520 },
];

const MOUNT_TYPES = [
  { label: "Direct Burial", value: "burial", desc: "Standard 4–6 ft depth", cost: 0 },
  { label: "Concrete Base", value: "concrete", desc: "Poured footing, strongest", cost: 350 },
  { label: "Anchor Bolt", value: "anchor", desc: "Pre-cast template system", cost: 450 },
];

const FINISH_OPTIONS = [
  { label: "Matte Black", value: "#111111", hex: "#111111" },
  { label: "Gloss Black", value: "#1c1c1e", hex: "#1c1c1e" },
  { label: "Dark Bronze", value: "#3b2314", hex: "#3b2314" },
  { label: "Galvanized", value: "#8a8d8f", hex: "#8a8d8f" },
  { label: "Powder White", value: "#dde0e2", hex: "#dde0e2" },
  { label: "Forest Green", value: "#2c3e2d", hex: "#2c3e2d" },
];

const ACCESSORIES = [
  { label: "Weatherproof Junction Box", value: "junction", cost: 120 },
  { label: "Conduit Kit (per pole)", value: "conduit", cost: 85 },
  { label: "Grounding Kit", value: "grounding", cost: 65 },
  { label: "Smart Controller / PoE Switch", value: "controller", cost: 240 },
  { label: "Vandal-Resistant Shroud", value: "shroud", cost: 95 },
  { label: "Tamper-Proof Hardware", value: "tamper", cost: 55 },
];

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10, 15, 20];

const PROPERTY_TYPES = [
  "Residential", "Commercial Office", "Retail", "Industrial/Warehouse",
  "HOA / Community", "Church / House of Worship", "School / Campus",
  "Healthcare", "Gas Station / C-Store", "Parking Lot", "Other",
];

interface PoleConfig {
  height: number;
  armConfig: string;
  cameraCount: number;
  cameraType: string;
  lighting: string;
  mountType: string;
  color: string;
  quantity: number;
  accessories: string[];
}

// ─── Pricing Engine ───────────────────────────────────────────────────────────

function calcPrice(config: PoleConfig): { perPole: number; total: number; breakdown: { label: string; amount: number }[] } {
  const height = POLE_HEIGHTS.find(h => h.value === config.height)!;
  const arm = ARM_CONFIGS.find(a => a.value === config.armConfig)!;
  const camType = CAMERA_TYPES.find(c => c.value === config.cameraType)!;
  const light = LIGHTING_OPTIONS.find(l => l.value === config.lighting)!;
  const mount = MOUNT_TYPES.find(m => m.value === config.mountType)!;
  const accessoryCost = config.accessories.reduce((acc, a) => {
    const item = ACCESSORIES.find(x => x.value === a);
    return acc + (item?.cost ?? 0);
  }, 0);

  const cameraTotal = camType.cost * config.cameraCount;
  const installLabor = 320 + config.cameraCount * 80;

  const breakdown = [
    { label: `${height.label} Steel Pole`, amount: height.baseCost },
    { label: `${arm.label}`, amount: arm.cost },
    { label: `${config.cameraCount}× ${camType.label} Camera(s)`, amount: cameraTotal },
    { label: `${light.label} Lighting`, amount: light.cost },
    { label: `${mount.label} Mount`, amount: mount.cost },
    { label: "Installation & Labor", amount: installLabor },
    ...(accessoryCost > 0 ? [{ label: "Accessories", amount: accessoryCost }] : []),
  ].filter(b => b.amount > 0);

  const perPole = breakdown.reduce((s, b) => s + b.amount, 0);
  return { perPole, total: perPole * config.quantity, breakdown };
}

// ─── Camera Models (origin = mount point, body faces +X outward) ──────────────

function CameraModel({ type }: { type: string }) {
  // Real security cameras are white/light grey — always separate from pole color
  const bodyC = "#dde0e2";
  const trimC = "#b0b4b8";
  const lensC = "#050810";
  const bodyM = { color: bodyC, roughness: 0.28, metalness: 0.35 } as const;
  const trimM = { color: trimC, roughness: 0.35, metalness: 0.42 } as const;
  const lensM = { color: lensC, roughness: 0.04, metalness: 0.92 } as const;

  switch (type) {
    default:
    case "ptz":
      // Matches reference photos: round white ball-style PTZ camera
      return (
        <group>
          {/* Dark mounting yoke — bolts to bracket knuckle */}
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.042, 0.048, 0.036, 14]} />
            <meshStandardMaterial color="#222" roughness={0.3} metalness={0.82} />
          </mesh>
          {/* Yoke side arms */}
          {([-1, 1] as const).map(s => (
            <mesh key={s} position={[s * 0.047, -0.032, 0]}>
              <boxGeometry args={[0.013, 0.068, 0.013]} />
              <meshStandardMaterial color="#222" roughness={0.3} metalness={0.82} />
            </mesh>
          ))}
          {/* White spherical ball housing */}
          <mesh position={[0, -0.075, 0]}>
            <sphereGeometry args={[0.074, 20, 20]} />
            <meshStandardMaterial {...bodyM} />
          </mesh>
          {/* Equator trim ring */}
          <mesh position={[0, -0.075, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.074, 0.004, 6, 24]} />
            <meshStandardMaterial {...trimM} />
          </mesh>
          {/* Tinted dome window on front face */}
          <mesh position={[0.042, -0.092, 0]} rotation={[0.38, 0, Math.PI / 2]}>
            <sphereGeometry args={[0.044, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#0a1020" roughness={0.05} metalness={0.25} transparent opacity={0.88} />
          </mesh>
          {/* Lens behind dome */}
          <mesh position={[0.07, -0.088, 0]}>
            <sphereGeometry args={[0.015, 10, 10]} />
            <meshStandardMaterial {...lensM} />
          </mesh>
        </group>
      );

    case "bullet":
      return (
        <group rotation={[0.28, 0, 0]}>
          {/* Mount saddle */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.048, 0.038, 0.048]} />
            <meshStandardMaterial color="#222" roughness={0.3} metalness={0.82} />
          </mesh>
          {/* Sun visor */}
          <mesh position={[0.1, 0.052, 0]}>
            <boxGeometry args={[0.24, 0.007, 0.075]} />
            <meshStandardMaterial {...bodyM} />
          </mesh>
          {/* Cylindrical body */}
          <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.033, 0.047, 0.23, 14]} />
            <meshStandardMaterial {...bodyM} />
          </mesh>
          {/* Back cap */}
          <mesh position={[-0.012, 0, 0]}>
            <cylinderGeometry args={[0.047, 0.047, 0.012, 14]} />
            <meshStandardMaterial {...trimM} />
          </mesh>
          {/* Lens barrel */}
          <mesh position={[0.218, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.021, 0.027, 0.02, 12]} />
            <meshStandardMaterial {...lensM} />
          </mesh>
          {/* Lens glass */}
          <mesh position={[0.232, 0, 0]}>
            <sphereGeometry args={[0.015, 10, 10]} />
            <meshStandardMaterial {...lensM} />
          </mesh>
        </group>
      );

    case "dome":
      return (
        <group>
          {/* Base disc */}
          <mesh>
            <cylinderGeometry args={[0.071, 0.071, 0.021, 16]} />
            <meshStandardMaterial {...bodyM} />
          </mesh>
          {/* Trim ring */}
          <mesh position={[0, -0.01, 0]}>
            <torusGeometry args={[0.071, 0.006, 6, 22]} />
            <meshStandardMaterial {...trimM} />
          </mesh>
          {/* Tinted dome hanging down */}
          <mesh position={[0, -0.012, 0]}>
            <sphereGeometry args={[0.065, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.72]} />
            <meshStandardMaterial color="#0c0c18" roughness={0.06} metalness={0.28} transparent opacity={0.82} />
          </mesh>
          {/* Inner lens */}
          <mesh position={[0, -0.067, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial {...lensM} />
          </mesh>
        </group>
      );

    case "lpr":
      return (
        <group rotation={[0.35, 0, 0]}>
          {/* Mount plate */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.055, 0.038, 0.055]} />
            <meshStandardMaterial color="#222" roughness={0.3} metalness={0.82} />
          </mesh>
          {/* Body */}
          <mesh position={[0.1, 0, 0]}>
            <boxGeometry args={[0.21, 0.093, 0.073]} />
            <meshStandardMaterial {...bodyM} />
          </mesh>
          {/* IR LED strip */}
          <mesh position={[0.1, 0.055, 0]}>
            <boxGeometry args={[0.18, 0.013, 0.056]} />
            <meshStandardMaterial color="#2a0000" emissive="#770000" emissiveIntensity={0.8} roughness={0.5} metalness={0.2} />
          </mesh>
          {/* Lens */}
          <mesh position={[0.212, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.023, 0.023, 0.016, 12]} />
            <meshStandardMaterial {...lensM} />
          </mesh>
        </group>
      );

    case "multi":
      return (
        <group>
          {/* Wide disc body */}
          <mesh position={[0, -0.015, 0]}>
            <cylinderGeometry args={[0.094, 0.094, 0.05, 16]} />
            <meshStandardMaterial {...bodyM} />
          </mesh>
          {/* Trim ring */}
          <mesh position={[0, -0.015, 0]}>
            <torusGeometry args={[0.094, 0.005, 6, 24]} />
            <meshStandardMaterial {...trimM} />
          </mesh>
          {/* Tinted bottom cover */}
          <mesh position={[0, -0.042, 0]}>
            <cylinderGeometry args={[0.092, 0.092, 0.012, 16]} />
            <meshStandardMaterial color="#0a0a14" roughness={0.06} metalness={0.28} transparent opacity={0.78} />
          </mesh>
          {/* 4 lenses */}
          {[0, 1, 2, 3].map(i => {
            const a = (i / 4) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 0.06, -0.042, Math.sin(a) * 0.06]}>
                <sphereGeometry args={[0.014, 8, 8]} />
                <meshStandardMaterial {...lensM} />
              </mesh>
            );
          })}
        </group>
      );
  }
}

// Individual swan-neck bracket — matches reference photos exactly.
// Origin at pole face. Clamp plate → horizontal stub → drop → ball joint → camera.
function CameraBracket({
  poleColor, cameraType, stubLen = 0.31, dropLen = 0.18,
}: {
  poleColor: string; cameraType: string; stubLen?: number; dropLen?: number;
}) {
  const pM = { color: poleColor, roughness: 0.22, metalness: 0.82 } as const;
  return (
    <group>
      {/* Flat clamp plate on pole face */}
      <mesh position={[0.022, 0, 0]}>
        <boxGeometry args={[0.044, 0.088, 0.088]} />
        <meshStandardMaterial {...pM} />
      </mesh>
      {/* Clamp bolts */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[0.029, s * 0.026, 0.05]}>
          <cylinderGeometry args={[0.007, 0.007, 0.016, 6]} />
          <meshStandardMaterial color="#383838" roughness={0.4} metalness={0.88} />
        </mesh>
      ))}
      {/* Horizontal stub arm */}
      <mesh position={[0.044 + stubLen / 2, 0.005, 0]}>
        <boxGeometry args={[stubLen, 0.04, 0.04]} />
        <meshStandardMaterial {...pM} />
      </mesh>
      {/* Corner fillet at bracket-to-arm joint */}
      <mesh position={[0.044, -0.012, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.026, 0.026, 0.034]} />
        <meshStandardMaterial {...pM} />
      </mesh>
      {/* Vertical drop tube */}
      <mesh position={[0.044 + stubLen, -(dropLen / 2) + 0.005, 0]}>
        <boxGeometry args={[0.028, dropLen, 0.028]} />
        <meshStandardMaterial {...pM} />
      </mesh>
      {/* Ball-joint knuckle at drop bottom */}
      <mesh position={[0.044 + stubLen, -dropLen + 0.005, 0]}>
        <sphereGeometry args={[0.027, 10, 10]} />
        <meshStandardMaterial color="#252525" roughness={0.24} metalness={0.86} />
      </mesh>
      {/* Camera body at knuckle */}
      <group position={[0.044 + stubLen, -dropLen - 0.022, 0]}>
        <CameraModel type={cameraType} />
      </group>
    </group>
  );
}

// ─── T-Bar Crossarm Mount (pole1.JPG style) ──────────────────────────────────
// Long horizontal arm extending both directions from pole top.
// Cameras drop pendant-style from underside via clamp → tube → ball joint.
function CrossarmMount({
  pM, W, poleH, crossarmPositions, cameraType,
}: {
  pM: { color: string; roughness: number; metalness: number };
  W: number; poleH: number;
  crossarmPositions: number[];
  cameraType: string;
}) {
  const armHalfLen = 1.1;
  const armY = poleH + 0.185;
  const armSide = W * 0.68;
  return (
    <group>
      {/* Main horizontal arm tube */}
      <mesh position={[0, armY, 0]}>
        <boxGeometry args={[armHalfLen * 2, armSide, armSide]} />
        <meshStandardMaterial {...pM} />
      </mesh>
      {/* Arm-to-pole gusset plates */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[s * W * 0.38, armY - armSide * 0.56, 0]} rotation={[0, 0, s * 0.52]}>
          <boxGeometry args={[0.055, 0.11, armSide * 0.85]} />
          <meshStandardMaterial {...pM} />
        </mesh>
      ))}
      {/* End caps */}
      {([-1, 1] as const).map(s => (
        <mesh key={s} position={[s * armHalfLen, armY, 0]}>
          <boxGeometry args={[armSide, armSide, armSide]} />
          <meshStandardMaterial {...pM} />
        </mesh>
      ))}
      {/* Pendant camera mounts: clamp saddle → vertical drop → ball joint → camera */}
      {crossarmPositions.map((xPos, i) => (
        <group key={i} position={[xPos, armY - armSide / 2, 0]}>
          {/* Clamp saddle on arm underside */}
          <mesh position={[0, -0.018, 0]}>
            <boxGeometry args={[0.062, 0.036, 0.062]} />
            <meshStandardMaterial {...pM} />
          </mesh>
          {/* Clamp bolts */}
          {([-1, 1] as const).map(bx => (
            <mesh key={bx} position={[bx * 0.022, -0.018, 0.038]}>
              <cylinderGeometry args={[0.006, 0.006, 0.014, 6]} />
              <meshStandardMaterial color="#383838" roughness={0.4} metalness={0.88} />
            </mesh>
          ))}
          {/* Vertical drop tube */}
          <mesh position={[0, -0.122, 0]}>
            <boxGeometry args={[0.026, 0.17, 0.026]} />
            <meshStandardMaterial {...pM} />
          </mesh>
          {/* Ball-joint knuckle */}
          <mesh position={[0, -0.215, 0]}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshStandardMaterial color="#252525" roughness={0.24} metalness={0.86} />
          </mesh>
          {/* Camera */}
          <group position={[0, -0.248, 0]}>
            <CameraModel type={cameraType} />
          </group>
        </group>
      ))}
    </group>
  );
}

function SecurityPole({ config }: { config: PoleConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const poleH = config.height * 0.17;
  const W = 0.145; // square pole cross-section — matches photos

  useFrame(({ clock }) => {
    if (groupRef.current)
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.055;
  });

  // Individual brackets — used for single/dual/cross configs only (not crossarm/none)
  const bracketPositions: { angle: number; yOffset: number }[] = useMemo(() => {
    const n = config.cameraCount;
    if (n === 0 || config.armConfig === "none" || config.armConfig === "crossarm") return [];
    let angles: number[];
    if (config.armConfig === "single") {
      // All face same direction with tiny angular spread so they don't overlap
      angles = Array.from({ length: n }, (_, i) => i * 0.14 - (n - 1) * 0.07);
    } else if (config.armConfig === "dual") {
      // Alternate 180 degrees apart
      angles = Array.from({ length: n }, (_, i) => i % 2 === 0 ? 0 : Math.PI);
    } else {
      // cross / 360° multi-bracket: evenly distributed
      angles = Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2);
    }
    // Stagger heights very slightly so brackets don't overlap
    return angles.map((angle, i) => ({ angle, yOffset: -(i * 0.09) }));
  }, [config.cameraCount, config.armConfig]);

  // Crossarm pendant positions — evenly distributed along horizontal arm
  const crossarmPositions: number[] = useMemo(() => {
    if (config.armConfig !== "crossarm") return [];
    const n = config.cameraCount;
    const halfLen = 1.05;
    if (n === 1) return [0];
    return Array.from({ length: n }, (_, i) => ((i / (n - 1)) * 2 - 1) * (halfLen - 0.12));
  }, [config.cameraCount, config.armConfig]);

  const pM = { color: config.color, roughness: 0.22, metalness: 0.82 } as const;

  return (
    <group ref={groupRef} position={[0, -(poleH / 2) - 0.06, 0]}>

      {/* Ground / asphalt */}
      <mesh position={[0, 0.003, 0]}>
        <boxGeometry args={[1.2, 0.006, 1.2]} />
        <meshStandardMaterial color="#383838" roughness={0.98} metalness={0.0} />
      </mesh>
      {/* Concrete pad */}
      <mesh position={[0, 0.03, 0]} receiveShadow>
        <boxGeometry args={[0.72, 0.054, 0.72]} />
        <meshStandardMaterial color="#6e6e6e" roughness={0.92} metalness={0.03} />
      </mesh>

      {/* Anchor bolts */}
      {([-1, 1] as const).flatMap(sx =>
        ([-1, 1] as const).map(sz => (
          <mesh key={`${sx}${sz}`} position={[sx * 0.25, 0.09, sz * 0.25]}>
            <cylinderGeometry args={[0.009, 0.009, 0.075, 6]} />
            <meshStandardMaterial color="#484848" roughness={0.4} metalness={0.85} />
          </mesh>
        ))
      )}

      {/* Base flange plate */}
      <mesh position={[0, 0.072, 0]}>
        <boxGeometry args={[W + 0.13, 0.02, W + 0.13]} />
        <meshStandardMaterial {...pM} />
      </mesh>
      {/* Base collar */}
      <mesh position={[0, 0.135, 0]}>
        <boxGeometry args={[W + 0.06, 0.09, W + 0.06]} />
        <meshStandardMaterial {...pM} />
      </mesh>

      {/* Main square shaft */}
      <mesh position={[0, poleH / 2 + 0.19, 0]} castShadow>
        <boxGeometry args={[W, poleH, W]} />
        <meshStandardMaterial {...pM} />
      </mesh>

      {/* Flat top cap — clean horizontal cut */}
      <mesh position={[0, poleH + 0.19, 0]}>
        <boxGeometry args={[W + 0.007, 0.013, W + 0.007]} />
        <meshStandardMaterial {...pM} />
      </mesh>

      {/* Conduit seam (front face) */}
      <mesh position={[W / 2 + 0.001, poleH / 2 + 0.19, 0]}>
        <boxGeometry args={[0.003, poleH * 0.76, 0.016]} />
        <meshStandardMaterial color="#060606" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Access panel / junction box mid-pole */}
      <mesh position={[W / 2 + 0.002, poleH * 0.31 + 0.19, 0]}>
        <boxGeometry args={[0.004, 0.12, 0.08]} />
        <meshStandardMaterial color="#111" roughness={0.6} metalness={0.5} />
      </mesh>
      {[-0.04, 0.04].map(dy => (
        <mesh key={dy} position={[W / 2 + 0.002, poleH * 0.31 + 0.19 + dy, 0.03]}>
          <cylinderGeometry args={[0.004, 0.004, 0.006, 6]} />
          <meshStandardMaterial color="#333" roughness={0.4} metalness={0.9} />
        </mesh>
      ))}

      {/* ══ T-BAR CROSSARM — matches pole1.JPG reference exactly ══
          Long horizontal arm extends both directions from pole top.
          Cameras hang pendant-style from underside of arm. */}
      {config.armConfig === "crossarm" && <CrossarmMount
        pM={pM}
        W={W}
        poleH={poleH}
        crossarmPositions={crossarmPositions}
        cameraType={config.cameraType}
      />}

      {/* ══ PER-CAMERA BRACKETS — matches pole2.JPG reference (single/dual/cross) ══
          Each camera: individual swan-neck bracket — clamp plate → horizontal stub → drop → ball joint → camera */}
      {bracketPositions.map((pos, i) => (
        <group
          key={i}
          position={[0, poleH - 0.06 + pos.yOffset, 0]}
          rotation={[0, pos.angle, 0]}
        >
          {/* W/2 shifts clamp plate to pole face */}
          <group position={[W / 2, 0, 0]}>
            <CameraBracket
              poleColor={config.color}
              cameraType={config.cameraType}
              stubLen={0.3}
              dropLen={0.17}
            />
          </group>
        </group>
      ))}

      {/* ── Direct-mount (no arms) ── */}
      {config.armConfig === "none" && Array.from({ length: config.cameraCount }, (_, i) => {
        const angle = (i / Math.max(config.cameraCount, 1)) * Math.PI * 2;
        return (
          <group key={i} position={[0, poleH - 0.06 - i * 0.28, 0]} rotation={[0, angle, 0]}>
            <mesh position={[W / 2 + 0.016, 0, 0]}>
              <boxGeometry args={[0.032, 0.09, 0.09]} />
              <meshStandardMaterial {...pM} />
            </mesh>
            <mesh position={[W / 2 + 0.016, -0.062, 0]}>
              <boxGeometry args={[0.022, 0.1, 0.022]} />
              <meshStandardMaterial {...pM} />
            </mesh>
            <mesh position={[W / 2 + 0.016, -0.12, 0]}>
              <sphereGeometry args={[0.024, 10, 10]} />
              <meshStandardMaterial color="#252525" roughness={0.25} metalness={0.85} />
            </mesh>
            <group position={[W / 2 + 0.016, -0.15, 0]}>
              <CameraModel type={config.cameraType} />
            </group>
          </group>
        );
      })}

      {/* ══ LIGHTING ══ */}
      {config.lighting === "led" && (
        <group position={[0, poleH + 0.13, 0]}>
          <mesh position={[0.12, 0.008, 0]}>
            <boxGeometry args={[0.24, 0.034, 0.034]} />
            <meshStandardMaterial {...pM} />
          </mesh>
          <mesh position={[0.24, -0.012, 0]} rotation={[0.26, 0, 0]}>
            <boxGeometry args={[0.36, 0.058, 0.13]} />
            <meshStandardMaterial color="#b8b8b8" roughness={0.3} metalness={0.55} />
          </mesh>
          <mesh position={[0.24, -0.042, 0]} rotation={[0.26, 0, 0]}>
            <boxGeometry args={[0.32, 0.005, 0.1]} />
            <meshStandardMaterial color="#fffde0" emissive="#fffaaa" emissiveIntensity={0.65} roughness={0.4} metalness={0} />
          </mesh>
        </group>
      )}
      {config.lighting === "strobe" && (
        <group position={[0, poleH + 0.23, 0]}>
          <mesh>
            <boxGeometry args={[0.1, 0.17, 0.1]} />
            <meshStandardMaterial color="#990000" roughness={0.28} emissive="#ee1100" emissiveIntensity={1.0} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.056, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ff5500" roughness={0.15} transparent opacity={0.78} emissive="#ff3300" emissiveIntensity={1.2} />
          </mesh>
        </group>
      )}
      {config.lighting === "ir" && (
        <group position={[0, poleH - 0.18, 0]} rotation={[0, Math.PI * 0.6, 0]}>
          <mesh position={[W / 2 + 0.065, 0, 0]}>
            <boxGeometry args={[0.13 + W, 0.036, 0.036]} />
            <meshStandardMaterial {...pM} />
          </mesh>
          <mesh position={[W / 2 + 0.16, 0, 0]}>
            <boxGeometry args={[0.14, 0.22, 0.08]} />
            <meshStandardMaterial color="#151515" roughness={0.45} metalness={0.55} />
          </mesh>
          <mesh position={[W / 2 + 0.232, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 0.01, 14]} />
            <meshStandardMaterial color="#180000" emissive="#660000" emissiveIntensity={0.7} roughness={0.55} />
          </mesh>
        </group>
      )}
      {config.lighting === "solar" && (
        <group position={[0, poleH + 0.21, 0]}>
          <mesh position={[0.1, -0.02, 0]}>
            <boxGeometry args={[0.2, 0.032, 0.032]} />
            <meshStandardMaterial {...pM} />
          </mesh>
          <mesh position={[0.2, 0.05, 0]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[0.48, 0.015, 0.33]} />
            <meshStandardMaterial color="#1a2460" roughness={0.15} metalness={0.4} emissive="#1a3090" emissiveIntensity={0.24} />
          </mesh>
          <mesh position={[0.2, 0.066, 0]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[0.46, 0.001, 0.31]} />
            <meshStandardMaterial color="#0e1840" roughness={0.55} metalness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function PoleScene({ config }: { config: PoleConfig }) {
  return (
    <Canvas
      camera={{ position: [3.5, 1, 3.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      shadows
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 10, 5]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 5, -3]} intensity={0.3} color="#b8cce0" />
      <pointLight position={[0, 4, 1]} intensity={0.25} color="#fff5ee" />
      <Suspense fallback={<Html center><span className="text-sm text-gray-400">Loading…</span></Html>}>
        <SecurityPole config={config} />
        <ContactShadows position={[0, -config.height * 0.085 - 0.02, 0]} opacity={0.4} scale={8} blur={3} />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={2.5}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}

// ─── Step Definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { id: "height", label: "Pole Height", icon: Ruler },
  { id: "arm", label: "Arm Config", icon: Layers },
  { id: "cameras", label: "Cameras", icon: Camera },
  { id: "lighting", label: "Lighting", icon: Sun },
  { id: "mount", label: "Mount & Finish", icon: Box },
  { id: "quantity", label: "Qty & Add-ons", icon: Package },
  { id: "quote", label: "Get Quote", icon: ClipboardList },
];

// ─── Option Card ──────────────────────────────────────────────────────────────

function OptionCard({
  selected, onClick, title, subtitle, badge, cost,
}: {
  selected: boolean; onClick: () => void;
  title: string; subtitle?: string; badge?: string; cost?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 text-left group"
      style={{
        background: selected ? "hsl(0 75% 50%/0.07)" : "white",
        borderColor: selected ? "hsl(0 75% 50%)" : "hsl(0 0% 88%)",
        boxShadow: selected ? "0 0 0 1px hsl(0 75% 50%/0.18)" : "none",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
          style={{
            borderColor: selected ? "hsl(0 75% 50%)" : "hsl(0 0% 80%)",
            background: selected ? "hsl(0 75% 50%)" : "white",
          }}
        >
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{title}</span>
            {badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{ background: "hsl(0 75% 50%/0.1)", color: "hsl(0 75% 40%)" }}>
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {cost !== undefined && cost > 0 && (
        <span className="text-xs font-semibold text-gray-500 ml-2 flex-shrink-0">+${cost.toLocaleString()}</span>
      )}
    </button>
  );
}

// ─── Price Ticker ─────────────────────────────────────────────────────────────

function PriceTicker({ total, perPole, qty }: { total: number; perPole: number; qty: number }) {
  return (
    <div className="rounded-2xl p-4 mb-5" style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 91%)" }}>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Estimated Total</p>
          <p className="font-display font-bold text-2xl text-gray-900">
            ${total.toLocaleString()}
          </p>
          {qty > 1 && (
            <p className="text-xs text-gray-400 mt-0.5">${perPole.toLocaleString()} × {qty} poles</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Includes</p>
          <p className="text-xs text-gray-500">Equipment + Install</p>
          <p className="text-xs text-gray-400">Final quote on-site</p>
        </div>
      </div>
    </div>
  );
}

// ─── Quote Form ───────────────────────────────────────────────────────────────

function QuoteForm({ config, estimatedTotal, onClose }: {
  config: PoleConfig; estimatedTotal: number; onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    propertyAddress: "", propertyType: PROPERTY_TYPES[0], notes: "",
  });

  const { breakdown } = calcPrice(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quote: PoleQuote = {
      id: `pq_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      ...form,
      config,
      estimatedTotal,
      submittedAt: Date.now(),
      status: "new",
    };
    savePoleQuote(quote);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 px-6">
        <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "hsl(145 60% 45%/0.1)" }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: "hsl(145 60% 38%)" }} />
        </div>
        <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">Quote Received</h3>
        <p className="text-gray-500 mb-2 max-w-sm mx-auto text-sm">
          Your custom pole configuration has been submitted. A specialist will call or email within <strong>2 business hours</strong>.
        </p>
        <p className="text-xs text-gray-400 mb-7">Estimated: <strong className="text-gray-700">${estimatedTotal.toLocaleString()}</strong> · Confirmation sent to {form.email}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:2814070766" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-6 py-3">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <button onClick={onClose} className="btn-outline-dark px-6 py-3 text-sm">
            Build Another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Config summary */}
      <div className="rounded-xl p-4 mb-5 grid grid-cols-3 gap-2" style={{ background: "hsl(0 0% 97%)", border: "1px solid hsl(0 0% 91%)" }}>
        {[
          { label: "Height", val: `${config.height} ft` },
          { label: "Cameras", val: `${config.cameraCount}× ${CAMERA_TYPES.find(c => c.value === config.cameraType)?.label}` },
          { label: "Lighting", val: LIGHTING_OPTIONS.find(l => l.value === config.lighting)?.label },
          { label: "Mount", val: MOUNT_TYPES.find(m => m.value === config.mountType)?.label },
          { label: "Arms", val: ARM_CONFIGS.find(a => a.value === config.armConfig)?.label },
          { label: "Quantity", val: `${config.quantity} pole${config.quantity > 1 ? "s" : ""}` },
        ].map(s => (
          <div key={s.label}>
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">{s.label}</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="rounded-xl p-4 mb-5" style={{ background: "hsl(0 75% 50%/0.04)", border: "1px solid hsl(0 75% 50%/0.15)" }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(0 75% 40%)" }}>Estimate Breakdown</p>
        {breakdown.map(b => (
          <div key={b.label} className="flex items-center justify-between py-0.5">
            <span className="text-xs text-gray-600">{b.label}</span>
            <span className="text-xs font-semibold text-gray-800">${b.amount.toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 flex items-center justify-between" style={{ borderColor: "hsl(0 75% 50%/0.2)" }}>
          <span className="text-sm font-bold text-gray-900">Total ({config.quantity} pole{config.quantity > 1 ? "s" : ""})</span>
          <span className="text-sm font-bold" style={{ color: "hsl(0 75% 40%)" }}>${estimatedTotal.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              placeholder="John Smith" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Company / Property</label>
            <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              placeholder="ABC Management" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Email *</label>
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              placeholder="john@company.com" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone *</label>
            <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              placeholder="(713) 555-0000" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Property Address</label>
          <input value={form.propertyAddress} onChange={e => setForm({ ...form, propertyAddress: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            placeholder="1234 Main St, Houston, TX" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Property Type</label>
          <select value={form.propertyType} onChange={e => setForm({ ...form, propertyType: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white">
            {PROPERTY_TYPES.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Additional Notes</label>
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
            placeholder="Site conditions, timeline, existing infrastructure..." />
        </div>
        <div className="flex gap-3 pt-1">
          <button type="submit" className="btn-primary-gradient flex-1 inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold">
            Submit Quote Request <ArrowRight className="w-4 h-4" />
          </button>
          <button type="button" onClick={onClose} className="btn-outline-dark px-5 py-3 text-sm">
            Back
          </button>
        </div>
        <p className="text-[11px] text-gray-400 text-center">We never share your information. Response within 2 business hours.</p>
      </form>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const PoleConfigurator = () => {
  const [config, setConfig] = useState<PoleConfig>({
    height: 15,
    armConfig: "crossarm",
    cameraCount: 3,
    cameraType: "ptz",
    lighting: "led",
    mountType: "burial",
    color: "#111111",
    quantity: 1,
    accessories: [],
  });
  const [step, setStep] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const { perPole, total } = calcPrice(config);

  const update = (key: keyof PoleConfig, val: any) =>
    setConfig(prev => ({ ...prev, [key]: val }));

  const toggleAccessory = (val: string) =>
    setConfig(prev => ({
      ...prev,
      accessories: prev.accessories.includes(val)
        ? prev.accessories.filter(a => a !== val)
        : [...prev.accessories, val],
    }));

  const isLast = step === STEPS.length - 2; // step 5 = Qty & Add-ons (last before quote)

  return (
    <Layout>
      <SEOHead
        title="Custom Security Pole Configurator | Design Your Setup | Texas Total Security"
        description="Design your custom security camera pole with our interactive 3D configurator. Choose height, arm config, cameras, lighting, and finish. Get a free quote for your Houston-area property."
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "hsl(0 0% 3%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(0 85% 45% / 0.07) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: "hsl(0 85% 45%/0.12)", border: "1px solid hsl(0 85% 45%/0.25)" }}
          >
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: "hsl(0 85% 65%)" }}>
              Interactive 3D Configurator
            </span>
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
          >
            Design Your Custom{" "}
            <span style={{ background: "linear-gradient(135deg, hsl(0 80% 72%), hsl(0 85% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Security Pole
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="text-sm sm:text-base mx-auto max-w-xl mb-8" style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Configure height, arms, cameras, lighting, and finish. See your setup in real-time 3D and get an instant estimate — built for HOAs, commercial facilities, and property managers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Shield, text: "Texas-licensed installers" },
              { icon: Wrench, text: "Professional installation included" },
              { icon: Star, text: "5-year structural warranty" },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-2">
                <f.icon className="w-3.5 h-3.5" style={{ color: "hsl(0 85% 60%)" }} />
                <span className="text-xs text-white/50">{f.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Configurator */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-8 lg:gap-12">

            {/* 3D Viewport */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-100 bg-gradient-to-b from-gray-50 to-white" style={{ minHeight: 520 }}>
              <PoleScene config={config} />

              {/* Live config overlay */}
              <div className="absolute top-4 left-4 space-y-1.5 pointer-events-none">
                {[
                  `${config.height} ft pole`,
                  `${config.cameraCount}× ${CAMERA_TYPES.find(c => c.value === config.cameraType)?.label}`,
                  ARM_CONFIGS.find(a => a.value === config.armConfig)?.label,
                  LIGHTING_OPTIONS.find(l => l.value === config.lighting)?.label !== "None"
                    ? LIGHTING_OPTIONS.find(l => l.value === config.lighting)?.label : null,
                ].filter(Boolean).map(label => (
                  <div key={label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                    <span className="text-[11px] text-white/80 font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Controls hint */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm">
                <RotateCcw className="w-3 h-3 text-white/60" />
                <span className="text-[11px] text-white/60">Drag · Scroll to zoom</span>
              </div>

              {/* Price badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm flex items-center gap-1.5">
                <DollarSign className="w-3 h-3 text-white/60" />
                <span className="text-[11px] font-semibold text-white">${total.toLocaleString()} est.</span>
              </div>

              {/* Color swatch row */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                {FINISH_OPTIONS.map(f => (
                  <button
                    key={f.value}
                    onClick={() => update("color", f.value)}
                    className="w-6 h-6 rounded-full border-2 transition-all"
                    style={{
                      background: f.hex,
                      borderColor: config.color === f.value ? "white" : "rgba(255,255,255,0.2)",
                      boxShadow: config.color === f.value ? "0 0 0 1px rgba(0,0,0,0.3)" : "none",
                      transform: config.color === f.value ? "scale(1.2)" : "scale(1)",
                    }}
                    title={f.label}
                  />
                ))}
              </div>
            </div>

            {/* Config Panel */}
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                {showQuote ? (
                  <motion.div
                    key="quote"
                    initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }}
                    className="rounded-3xl border border-gray-200 p-6 sm:p-8"
                    style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
                  >
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Request Your Custom Quote</h3>
                    <p className="text-sm text-gray-400 mb-5">A specialist responds within 2 business hours.</p>
                    <QuoteForm config={config} estimatedTotal={total} onClose={() => { setShowQuote(false); setStep(0); }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="config"
                    initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }}
                    className="rounded-3xl border border-gray-200 p-6 sm:p-8 flex flex-col flex-1"
                    style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
                  >
                    {/* Step pills */}
                    <div className="flex gap-1 mb-5 flex-wrap">
                      {STEPS.slice(0, -1).map((s, i) => (
                        <button
                          key={s.id}
                          onClick={() => setStep(i)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all"
                          style={{
                            background: i === step ? "hsl(0 75% 50%)" : i < step ? "hsl(0 75% 50%/0.1)" : "hsl(0 0% 95%)",
                            color: i === step ? "white" : i < step ? "hsl(0 75% 40%)" : "hsl(0 0% 50%)",
                          }}
                        >
                          {i < step ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                          <span className="hidden sm:inline">{s.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Price ticker */}
                    <PriceTicker total={total} perPole={perPole} qty={config.quantity} />

                    {/* Step title */}
                    <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-gray-400 mb-1">
                      Step {step + 1} of {STEPS.length - 1}
                    </p>
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-4">
                      {STEPS[step]?.label}
                    </h3>

                    {/* Step content */}
                    <div className="flex-1 min-h-0 overflow-y-auto">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-2"
                        >
                          {/* Step 0: Height */}
                          {step === 0 && POLE_HEIGHTS.map(h => (
                            <OptionCard
                              key={h.value}
                              selected={config.height === h.value}
                              onClick={() => update("height", h.value)}
                              title={h.label}
                              subtitle={h.desc}
                              cost={h.baseCost}
                            />
                          ))}

                          {/* Step 1: Arm Config */}
                          {step === 1 && ARM_CONFIGS.map(a => (
                            <OptionCard
                              key={a.value}
                              selected={config.armConfig === a.value}
                              onClick={() => update("armConfig", a.value)}
                              title={a.label}
                              subtitle={a.desc}
                              cost={a.cost}
                            />
                          ))}

                          {/* Step 2: Camera Count + Type */}
                          {step === 2 && (
                            <>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Number of Cameras</p>
                              <div className="grid grid-cols-6 gap-2 mb-4">
                                {CAMERA_COUNTS.map(c => (
                                  <button
                                    key={c}
                                    onClick={() => update("cameraCount", c)}
                                    className="py-2.5 rounded-xl text-sm font-bold transition-all border"
                                    style={{
                                      background: config.cameraCount === c ? "hsl(0 75% 50%)" : "white",
                                      color: config.cameraCount === c ? "white" : "#374151",
                                      borderColor: config.cameraCount === c ? "hsl(0 75% 50%)" : "#e5e7eb",
                                    }}
                                  >
                                    {c}
                                  </button>
                                ))}
                              </div>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Camera Type</p>
                              {CAMERA_TYPES.map(t => (
                                <OptionCard
                                  key={t.value}
                                  selected={config.cameraType === t.value}
                                  onClick={() => update("cameraType", t.value)}
                                  title={t.label}
                                  subtitle={t.desc}
                                  cost={t.cost}
                                  badge={t.value === "lpr" ? "High-value" : t.value === "ptz" ? "Popular" : undefined}
                                />
                              ))}
                            </>
                          )}

                          {/* Step 3: Lighting */}
                          {step === 3 && LIGHTING_OPTIONS.map(l => (
                            <OptionCard
                              key={l.value}
                              selected={config.lighting === l.value}
                              onClick={() => update("lighting", l.value)}
                              title={l.label}
                              subtitle={l.desc}
                              cost={l.cost}
                            />
                          ))}

                          {/* Step 4: Mount + Finish */}
                          {step === 4 && (
                            <>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Mount Type</p>
                              {MOUNT_TYPES.map(m => (
                                <OptionCard
                                  key={m.value}
                                  selected={config.mountType === m.value}
                                  onClick={() => update("mountType", m.value)}
                                  title={m.label}
                                  subtitle={m.desc}
                                  cost={m.cost}
                                />
                              ))}
                              <p className="text-xs font-semibold text-gray-500 mt-4 mb-2">Pole Finish</p>
                              <div className="grid grid-cols-3 gap-2">
                                {FINISH_OPTIONS.map(f => (
                                  <button
                                    key={f.value}
                                    onClick={() => update("color", f.value)}
                                    className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
                                    style={{
                                      borderColor: config.color === f.value ? "hsl(0 75% 50%)" : "#e5e7eb",
                                      background: config.color === f.value ? "hsl(0 75% 50%/0.05)" : "white",
                                    }}
                                  >
                                    <span className="w-7 h-7 rounded-full border border-gray-200" style={{ background: f.hex }} />
                                    <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">{f.label}</span>
                                    {config.color === f.value && <Check className="w-3 h-3 text-red-500" />}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}

                          {/* Step 5: Quantity + Accessories */}
                          {step === 5 && (
                            <>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Number of Poles</p>
                              <div className="grid grid-cols-5 gap-2 mb-5">
                                {QUANTITY_OPTIONS.map(q => (
                                  <button
                                    key={q}
                                    onClick={() => update("quantity", q)}
                                    className="py-2.5 rounded-xl text-sm font-bold transition-all border"
                                    style={{
                                      background: config.quantity === q ? "hsl(0 75% 50%)" : "white",
                                      color: config.quantity === q ? "white" : "#374151",
                                      borderColor: config.quantity === q ? "hsl(0 75% 50%)" : "#e5e7eb",
                                    }}
                                  >
                                    {q}
                                  </button>
                                ))}
                              </div>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Add-on Accessories</p>
                              {ACCESSORIES.map(a => (
                                <button
                                  key={a.value}
                                  onClick={() => toggleAccessory(a.value)}
                                  className="w-full flex items-center justify-between p-3.5 rounded-xl border mb-2 transition-all text-left"
                                  style={{
                                    background: config.accessories.includes(a.value) ? "hsl(0 75% 50%/0.07)" : "white",
                                    borderColor: config.accessories.includes(a.value) ? "hsl(0 75% 50%)" : "#e5e7eb",
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0"
                                      style={{
                                        borderColor: config.accessories.includes(a.value) ? "hsl(0 75% 50%)" : "#d1d5db",
                                        background: config.accessories.includes(a.value) ? "hsl(0 75% 50%)" : "white",
                                      }}
                                    >
                                      {config.accessories.includes(a.value) && <Check className="w-2.5 h-2.5 text-white" />}
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">{a.label}</span>
                                  </div>
                                  <span className="text-xs font-semibold text-gray-500">+${a.cost}</span>
                                </button>
                              ))}
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3 pt-5 mt-4 border-t border-gray-100">
                      {step > 0 && (
                        <button
                          onClick={() => setStep(s => s - 1)}
                          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                      )}
                      {isLast ? (
                        <button
                          onClick={() => setShowQuote(true)}
                          className="btn-primary-gradient flex-1 inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold"
                        >
                          Get My Quote <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 2))}
                          className="btn-primary-gradient flex-1 inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold"
                        >
                          Next: {STEPS[step + 1]?.label} <ChevronRight className="w-4 h-4" />
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

      {/* Why Custom Poles CTA */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Engineered for Texas", body: "Every pole is spec'd for Houston's wind load requirements, UV exposure, and soil conditions — engineered to last 20+ years." },
            { icon: Wrench, title: "Turnkey Installation", body: "Our licensed crews handle trenching, concrete, conduit routing, camera commissioning, and system integration in a single visit." },
            { icon: Zap, title: "Integrated with Your System", body: "Poles connect to your existing NVR, VMS, or Alarm.com platform. PoE, fiber, or wireless options available." },
          ].map(f => (
            <div key={f.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(0 75% 50%/0.08)" }}>
                <f.icon className="w-5 h-5" style={{ color: "hsl(0 75% 46%)" }} />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default PoleConfigurator;
