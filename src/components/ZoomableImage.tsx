import { useState, useRef, useCallback, useEffect } from "react";
import { X, ZoomIn, RotateCcw, Maximize2 } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export function ZoomableImage({ src, alt, className = "", caption }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragOrigin = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const pinchRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clampScale = (v: number) => Math.min(Math.max(v, 1), 6);

  const open = () => {
    setIsOpen(true);
    setScale(1);
    setPos({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
  };

  const close = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setPos({ x: 0, y: 0 });
    document.body.style.overflow = "";
  }, []);

  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // ── Desktop: wheel zoom ──
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.18 : -0.18;
    setScale(prev => clampScale(prev + delta));
  };

  // ── Desktop: drag ──
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setDragging(true);
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: dragOrigin.current.px + (e.clientX - dragOrigin.current.mx),
      y: dragOrigin.current.py + (e.clientY - dragOrigin.current.my),
    });
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, onMouseMove, onMouseUp]);

  // ── Touch: pinch-zoom + pan ──
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true);
      dragOrigin.current = {
        mx: e.touches[0].clientX,
        my: e.touches[0].clientY,
        px: pos.x,
        py: pos.y,
      };
      pinchRef.current = null;
    } else if (e.touches.length === 2) {
      setDragging(false);
      pinchRef.current = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && pinchRef.current !== null) {
      const dist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      const ratio = dist / pinchRef.current;
      setScale(prev => clampScale(prev * ratio));
      pinchRef.current = dist;
    } else if (e.touches.length === 1 && dragging) {
      setPos({
        x: dragOrigin.current.px + (e.touches[0].clientX - dragOrigin.current.mx),
        y: dragOrigin.current.py + (e.touches[0].clientY - dragOrigin.current.my),
      });
    }
  };

  const onTouchEnd = () => {
    setDragging(false);
    pinchRef.current = null;
    if (scale < 1.05) { setScale(1); setPos({ x: 0, y: 0 }); }
  };

  const zoomPct = Math.round(scale * 100);

  return (
    <>
      {/* ── Thumbnail ── */}
      <figure className={`relative group ${className}`}>
        <div
          className="relative overflow-hidden rounded-xl border border-border cursor-zoom-in"
          onClick={open}
          role="button"
          tabIndex={0}
          aria-label="Click to zoom image"
          onKeyDown={e => e.key === "Enter" && open()}
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
            loading="eager"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-end p-3">
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
              <Maximize2 className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-xs font-medium">Click to zoom</span>
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className="mt-3 text-xs text-muted-foreground text-center italic leading-relaxed">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* ── Lightbox ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: "rgba(0,0,0,0.96)" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-xs font-mono tabular-nums">{zoomPct}%</span>
              {scale > 1 && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium transition-colors px-2.5 py-1 rounded-md hover:bg-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <p className="text-white/40 text-xs hidden sm:block">
                {scale <= 1 ? "Scroll or pinch to zoom · Drag to pan" : "Drag to pan · Scroll to adjust zoom"}
              </p>
            </div>
            <button
              onClick={close}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Image area */}
          <div
            ref={containerRef}
            className="flex-1 overflow-hidden flex items-center justify-center select-none"
            onWheel={onWheel}
            style={{ touchAction: "none" }}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-[95vw] max-h-[85vh] object-contain"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                transformOrigin: "center center",
                cursor: dragging ? "grabbing" : scale > 1 ? "grab" : "zoom-in",
                transition: dragging ? "none" : "transform 0.12s ease",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              draggable={false}
              onClick={() => { if (scale <= 1) setScale(2.5); }}
            />
          </div>

          {/* Bottom hint bar */}
          <div className="flex items-center justify-center gap-6 px-4 py-2.5 border-t border-white/10 flex-shrink-0">
            <button onClick={() => setScale(s => clampScale(s + 0.5))} className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors px-3 py-1.5 rounded-md hover:bg-white/10">
              <ZoomIn className="w-3.5 h-3.5" /> Zoom In
            </button>
            <button onClick={reset} className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors px-3 py-1.5 rounded-md hover:bg-white/10">
              <RotateCcw className="w-3.5 h-3.5" /> Fit
            </button>
            <button onClick={close} className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors px-3 py-1.5 rounded-md hover:bg-white/10">
              <X className="w-3.5 h-3.5" /> Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
