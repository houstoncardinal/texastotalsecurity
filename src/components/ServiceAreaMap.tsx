import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaHVuYWlucTY1MDAiLCJhIjoiY21kNmd4dHpsMDA0ZjJscHRvajQ3OG44bCJ9.jskKvYRHlHVADMSB3S1AZg";

type Area = {
  id: number;
  slug: string;
  name: string;
  zip: string;
  lng: number;
  lat: number;
  color: string;
  fill: string;      // rgba fill for polygon
  polygon: [number, number][];
};

/* ─── Service area data with polygon boundaries ─────────────── */
const AREAS: Area[] = [
  {
    id: 0,
    slug: "river-oaks-security-systems",
    name: "River Oaks",
    zip: "77019",
    lng: -95.4235, lat: 29.7527,
    color: "#FF6B6B",
    fill: "rgba(255,107,107,0.18)",
    polygon: [
      [-95.455, 29.742], [-95.408, 29.742],
      [-95.408, 29.770], [-95.455, 29.770],
      [-95.455, 29.742],
    ],
  },
  {
    id: 1,
    slug: "memorial-villages-security-systems",
    name: "Memorial Villages",
    zip: "77024",
    lng: -95.5144, lat: 29.7753,
    color: "#4ECDC4",
    fill: "rgba(78,205,196,0.18)",
    polygon: [
      [-95.548, 29.758], [-95.474, 29.758],
      [-95.474, 29.798], [-95.548, 29.798],
      [-95.548, 29.758],
    ],
  },
  {
    id: 2,
    slug: "galleria-security-systems",
    name: "Galleria / Tanglewood",
    zip: "77056",
    lng: -95.4632, lat: 29.7379,
    color: "#F9CA24",
    fill: "rgba(249,202,36,0.18)",
    polygon: [
      [-95.500, 29.728], [-95.428, 29.728],
      [-95.428, 29.756], [-95.500, 29.756],
      [-95.500, 29.728],
    ],
  },
  {
    id: 3,
    slug: "energy-corridor-security-systems",
    name: "Energy Corridor",
    zip: "77079",
    lng: -95.6334, lat: 29.7641,
    color: "#6BCB77",
    fill: "rgba(107,203,119,0.18)",
    polygon: [
      [-95.682, 29.753], [-95.596, 29.753],
      [-95.596, 29.786], [-95.682, 29.786],
      [-95.682, 29.753],
    ],
  },
  {
    id: 4,
    slug: "bellaire-security-systems",
    name: "Bellaire",
    zip: "77401",
    lng: -95.4578, lat: 29.7048,
    color: "#BB86FC",
    fill: "rgba(187,134,252,0.18)",
    polygon: [
      [-95.487, 29.696], [-95.434, 29.696],
      [-95.434, 29.719], [-95.487, 29.719],
      [-95.487, 29.696],
    ],
  },
  {
    id: 5,
    slug: "west-university-security-systems",
    name: "West University Place",
    zip: "77005",
    lng: -95.4247, lat: 29.7183,
    color: "#FF8C42",
    fill: "rgba(255,140,66,0.18)",
    polygon: [
      [-95.437, 29.710], [-95.407, 29.710],
      [-95.407, 29.730], [-95.437, 29.730],
      [-95.437, 29.710],
    ],
  },
  {
    id: 6,
    slug: "upper-kirby-security-systems",
    name: "Upper Kirby",
    zip: "77098",
    lng: -95.4147, lat: 29.7418,
    color: "#40C4FF",
    fill: "rgba(64,196,255,0.18)",
    polygon: [
      [-95.430, 29.731], [-95.392, 29.731],
      [-95.392, 29.757], [-95.430, 29.757],
      [-95.430, 29.731],
    ],
  },
  {
    id: 7,
    slug: "spring-valley-security-systems",
    name: "Spring Valley",
    zip: "77055",
    lng: -95.5302, lat: 29.7883,
    color: "#69F0AE",
    fill: "rgba(105,240,174,0.18)",
    polygon: [
      [-95.558, 29.780], [-95.494, 29.780],
      [-95.494, 29.808], [-95.558, 29.808],
      [-95.558, 29.780],
    ],
  },
  {
    id: 8,
    slug: "rice-military-security-systems",
    name: "Rice Military",
    zip: "77007",
    lng: -95.4284, lat: 29.7566,
    color: "#FFAB40",
    fill: "rgba(255,171,64,0.18)",
    polygon: [
      [-95.447, 29.754], [-95.414, 29.754],
      [-95.414, 29.776], [-95.447, 29.776],
      [-95.447, 29.754],
    ],
  },
  {
    id: 9,
    slug: "montrose-north-security-systems",
    name: "Montrose North",
    zip: "77006",
    lng: -95.3856, lat: 29.7548,
    color: "#CE93D8",
    fill: "rgba(206,147,216,0.18)",
    polygon: [
      [-95.404, 29.745], [-95.369, 29.745],
      [-95.369, 29.768], [-95.404, 29.768],
      [-95.404, 29.745],
    ],
  },
  {
    id: 10,
    slug: "montrose-security-systems",
    name: "Montrose",
    zip: "77006",
    lng: -95.3901, lat: 29.7380,
    color: "#F48FB1",
    fill: "rgba(244,143,177,0.18)",
    polygon: [
      [-95.406, 29.728], [-95.369, 29.728],
      [-95.369, 29.746], [-95.406, 29.746],
      [-95.406, 29.728],
    ],
  },
  {
    id: 11,
    slug: "medical-center-security-systems",
    name: "Medical Center",
    zip: "77030",
    lng: -95.4011, lat: 29.7086,
    color: "#4DB6AC",
    fill: "rgba(77,182,172,0.18)",
    polygon: [
      [-95.415, 29.700], [-95.380, 29.700],
      [-95.380, 29.720], [-95.415, 29.720],
      [-95.415, 29.700],
    ],
  },
  {
    id: 12,
    slug: "downtown-houston-security-systems",
    name: "Downtown Houston",
    zip: "77002",
    lng: -95.3698, lat: 29.7604,
    color: "#82B1FF",
    fill: "rgba(130,177,255,0.18)",
    polygon: [
      [-95.384, 29.748], [-95.344, 29.748],
      [-95.344, 29.776], [-95.384, 29.776],
      [-95.384, 29.748],
    ],
  },
];

/* ─── Inject global styles once ──────────────────────────────── */
function injectStyles() {
  if (document.getElementById("tts-map-styles-v2")) return;
  const s = document.createElement("style");
  s.id = "tts-map-styles-v2";
  s.textContent = `
    @keyframes tts-p1 {
      0%   { transform:translate(-50%,-50%) scale(1); opacity:0.72; }
      100% { transform:translate(-50%,-50%) scale(3.0); opacity:0; }
    }
    @keyframes tts-p2 {
      0%   { transform:translate(-50%,-50%) scale(1); opacity:0.50; }
      100% { transform:translate(-50%,-50%) scale(2.2); opacity:0; }
    }
    .tts-p1 { animation: tts-p1 2.3s ease-out infinite; }
    .tts-p2 { animation: tts-p2 2.3s ease-out 0.75s infinite; }
    .tts-dot { transition: transform 0.16s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.16s ease; }
    .tts-label {
      transition: background 0.15s ease, border-color 0.15s ease,
                  transform 0.15s ease, box-shadow 0.15s ease;
    }
    .tts-marker:hover .tts-dot {
      transform: translate(-50%,-50%) scale(1.55) !important;
    }
    .tts-marker:hover .tts-label {
      transform: translateY(-50%) translateX(3px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.55);
    }
    /* Popup chrome overrides */
    .tts-popup .mapboxgl-popup-content {
      padding: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      border-radius: 14px !important;
      overflow: hidden;
      min-width: 0;
    }
    .tts-popup .mapboxgl-popup-tip { display: none !important; }
    .tts-popup .mapboxgl-popup-close-button {
      position: absolute;
      top: 8px; right: 10px;
      color: rgba(255,255,255,0.7);
      font-size: 18px;
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      z-index: 10;
      line-height: 1;
    }
    .tts-popup .mapboxgl-popup-close-button:hover { color: #fff; }
  `;
  document.head.appendChild(s);
}

/* ─── Component ─────────────────────────────────────────────── */
const ServiceAreaMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const activePopupRef = useRef<mapboxgl.Popup | null>(null);
  const navigate = useNavigate();
  const [hoveredArea, setHoveredArea] = useState<Area | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    injectStyles();

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-95.47, 29.745],
      zoom: 10.4,
      interactive: true,
      attributionControl: false,
      pitchWithRotate: false,
      dragRotate: false,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

    /* ── Build popup for an area ── */
    const openPopup = (area: Area) => {
      if (activePopupRef.current) {
        activePopupRef.current.remove();
        activePopupRef.current = null;
      }

      const content = document.createElement("div");
      content.style.cssText = "width:248px;border-radius:14px;overflow:hidden;box-shadow:0 20px 56px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.08);";

      // Colored header
      const header = document.createElement("div");
      header.style.cssText = `padding:14px 40px 12px 16px;background:${area.color};position:relative;`;

      const zipLine = document.createElement("p");
      zipLine.textContent = `ZIP ${area.zip}  ·  Houston, TX`;
      zipLine.style.cssText = "font-size:9px;font-weight:700;color:rgba(0,0,0,0.45);letter-spacing:0.15em;text-transform:uppercase;margin:0 0 3px;font-family:system-ui,sans-serif;";

      const nameEl = document.createElement("p");
      nameEl.textContent = area.name;
      nameEl.style.cssText = "font-size:17px;font-weight:800;color:#fff;margin:0;letter-spacing:-0.025em;text-shadow:0 1px 4px rgba(0,0,0,0.2);font-family:system-ui,sans-serif;";

      header.appendChild(zipLine);
      header.appendChild(nameEl);

      // Body
      const body = document.createElement("div");
      body.style.cssText = "padding:12px 16px 14px;background:rgba(8,8,8,0.95);";

      const serviceList = document.createElement("div");
      serviceList.style.cssText = "display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;";
      ["4K Cameras", "Alarm Systems", "24/7 Monitoring"].forEach(tag => {
        const t = document.createElement("span");
        t.textContent = tag;
        t.style.cssText = `font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:${area.color}22;color:${area.color};border:1px solid ${area.color}44;font-family:system-ui,sans-serif;letter-spacing:0.02em;`;
        serviceList.appendChild(t);
      });

      const btnRow = document.createElement("div");
      btnRow.style.cssText = "display:flex;gap:8px;";

      const primaryBtn = document.createElement("button");
      primaryBtn.style.cssText = [
        "flex:1;padding:9px 12px;border:none;border-radius:8px;",
        `background:${area.color};color:#fff;`,
        "font-size:11.5px;font-weight:800;letter-spacing:0.02em;cursor:pointer;",
        "transition:opacity 0.12s,transform 0.1s;font-family:system-ui,sans-serif;",
        "box-shadow:0 3px 14px rgba(0,0,0,0.3);",
      ].join("");
      primaryBtn.textContent = "View Service Area →";
      primaryBtn.addEventListener("mouseenter", () => { primaryBtn.style.opacity = "0.85"; primaryBtn.style.transform = "translateY(-1px)"; });
      primaryBtn.addEventListener("mouseleave", () => { primaryBtn.style.opacity = "1"; primaryBtn.style.transform = "none"; });
      primaryBtn.addEventListener("click", () => navigate(`/neighborhoods/${area.slug}`));

      const callBtn = document.createElement("a");
      callBtn.href = "tel:7133879937";
      callBtn.title = "Call (713) 387-9937";
      callBtn.style.cssText = [
        "padding:9px 11px;border-radius:8px;border:1px solid rgba(255,255,255,0.14);",
        "color:rgba(255,255,255,0.65);text-decoration:none;",
        "display:flex;align-items:center;justify-content:center;",
        "transition:background 0.12s,border-color 0.12s;cursor:pointer;font-size:15px;",
      ].join("");
      callBtn.textContent = "📞";
      callBtn.addEventListener("mouseenter", () => { callBtn.style.background = "rgba(255,255,255,0.09)"; callBtn.style.borderColor = "rgba(255,255,255,0.28)"; });
      callBtn.addEventListener("mouseleave", () => { callBtn.style.background = "transparent"; callBtn.style.borderColor = "rgba(255,255,255,0.14)"; });

      btnRow.appendChild(primaryBtn);
      btnRow.appendChild(callBtn);
      body.appendChild(serviceList);
      body.appendChild(btnRow);
      content.appendChild(header);
      content.appendChild(body);

      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        maxWidth: "none",
        offset: [0, -12],
        anchor: "bottom",
        className: "tts-popup",
      });
      popup.setLngLat([area.lng, area.lat]);
      popup.setDOMContent(content);
      popup.addTo(map);
      activePopupRef.current = popup;
    };

    map.on("load", () => {
      // Fit bounds
      const bounds = new mapboxgl.LngLatBounds();
      AREAS.forEach(a => bounds.extend([a.lng, a.lat]));
      map.fitBounds(bounds, { padding: { top: 70, bottom: 70, left: 60, right: 60 }, maxZoom: 11.5, duration: 1400 });

      // ── GeoJSON source with all area polygons
      map.addSource("service-areas", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: AREAS.map(area => ({
            type: "Feature" as const,
            id: area.id,
            properties: { areaId: area.id, color: area.color },
            geometry: {
              type: "Polygon" as const,
              coordinates: [area.polygon],
            },
          })),
        },
      });

      // ── Fill layer
      map.addLayer({
        id: "areas-fill",
        type: "fill",
        source: "service-areas",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.34,
            0.15,
          ],
        },
      });

      // ── Outline layer
      map.addLayer({
        id: "areas-outline",
        type: "line",
        source: "service-areas",
        paint: {
          "line-color": ["get", "color"],
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            2.5,
            1.5,
          ],
          "line-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1.0,
            0.7,
          ],
        },
      });

      // ── Hover state on fill
      let hoveredId: number | string | null = null;

      map.on("mousemove", "areas-fill", (e) => {
        if (!e.features?.length) return;
        const fid = e.features[0].id;
        if (hoveredId !== null && hoveredId !== fid) {
          map.setFeatureState({ source: "service-areas", id: hoveredId }, { hover: false });
          setHoveredArea(null);
        }
        if (fid !== undefined && fid !== hoveredId) {
          hoveredId = fid;
          map.setFeatureState({ source: "service-areas", id: hoveredId }, { hover: true });
          const area = AREAS.find(a => a.id === Number(fid));
          if (area) setHoveredArea(area);
        }
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "areas-fill", () => {
        if (hoveredId !== null) {
          map.setFeatureState({ source: "service-areas", id: hoveredId }, { hover: false });
          hoveredId = null;
          setHoveredArea(null);
        }
        map.getCanvas().style.cursor = "";
      });

      // ── Click on fill → popup
      map.on("click", "areas-fill", (e) => {
        if (!e.features?.length) return;
        const area = AREAS.find(a => a.id === Number(e.features![0].id));
        if (area) openPopup(area);
      });

      // ── Markers
      AREAS.forEach(area => {
        const el = document.createElement("div");
        el.className = "tts-marker";
        el.style.cssText = "position:relative;width:14px;height:14px;cursor:pointer;";

        // Pulse ring 1
        const r1 = document.createElement("div");
        r1.className = "tts-p1";
        r1.style.cssText = `position:absolute;top:50%;left:50%;width:14px;height:14px;border-radius:50%;background:${area.color}66;pointer-events:none;`;

        // Pulse ring 2
        const r2 = document.createElement("div");
        r2.className = "tts-p2";
        r2.style.cssText = `position:absolute;top:50%;left:50%;width:14px;height:14px;border-radius:50%;background:${area.color}44;pointer-events:none;`;

        // Core dot
        const dot = document.createElement("div");
        dot.className = "tts-dot";
        dot.style.cssText = [
          "position:absolute;top:50%;left:50%;",
          "width:12px;height:12px;border-radius:50%;",
          "transform:translate(-50%,-50%);",
          `background:${area.color};`,
          "border:2px solid rgba(255,255,255,0.92);",
          "box-shadow:0 2px 10px rgba(0,0,0,0.6),0 0 0 1px rgba(0,0,0,0.2);",
          "z-index:2;pointer-events:none;",
        ].join("");

        // Label pill — clickable
        const label = document.createElement("span");
        label.className = "tts-label";
        label.textContent = area.name;
        label.style.cssText = [
          "position:absolute;top:50%;left:calc(100% + 10px);",
          "transform:translateY(-50%);",
          "white-space:nowrap;pointer-events:auto;z-index:3;",
          "font-size:10.5px;font-weight:700;letter-spacing:0.025em;",
          "color:rgba(255,255,255,0.96);",
          "background:rgba(6,6,6,0.80);",
          `border:1px solid ${area.color}55;`,
          "border-radius:20px;padding:3px 9px 3px 7px;",
          "-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);",
          "box-shadow:0 2px 8px rgba(0,0,0,0.45);",
          "cursor:pointer;font-family:system-ui,sans-serif;",
        ].join("");

        label.addEventListener("click", (e) => { e.stopPropagation(); openPopup(area); });
        el.addEventListener("click", () => openPopup(area));

        el.appendChild(r1);
        el.appendChild(r2);
        el.appendChild(dot);
        el.appendChild(label);

        new mapboxgl.Marker({ element: el, anchor: "center" })
          .setLngLat([area.lng, area.lat])
          .addTo(map);
      });
    });

    return () => {
      if (activePopupRef.current) activePopupRef.current.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Top-left badge */}
      <div
        className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl pointer-events-none"
        style={{
          background: "rgba(4,4,4,0.84)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 4px 18px rgba(0,0,0,0.45)",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(0,85%,54%)", boxShadow: "0 0 7px hsla(0,85%,54%,0.9)" }} />
        <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>
          {AREAS.length} Houston Service Areas
        </span>
      </div>

      {/* Hover tooltip pill */}
      {hoveredArea && (
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl pointer-events-none"
          style={{
            background: hoveredArea.color,
            boxShadow: `0 4px 18px ${hoveredArea.color}66`,
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#fff", letterSpacing: "0.01em", fontFamily: "system-ui,sans-serif" }}>
            {hoveredArea.name} — click to explore
          </span>
        </div>
      )}

    </div>
  );
};

export default ServiceAreaMap;
