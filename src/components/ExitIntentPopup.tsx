import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ArrowRight, Shield } from "lucide-react";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("exitIntentShown")) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem("exitIntentShown", "1");
        document.removeEventListener("mouseout", handler);
      }
    };

    // Delay listener so it doesn't fire on page load
    const timeout = setTimeout(() => {
      document.addEventListener("mouseout", handler);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseout", handler);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998]"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => setShow(false)}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div
              className="relative rounded-3xl overflow-hidden max-w-md w-full"
              style={{
                background: "hsl(0 0% 4%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              }}
            >
              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at 50% 0%, hsl(0 85% 45% / 0.12), transparent 60%)",
              }} />

              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5" style={{ color: "rgba(255,255,255,0.4)" }} />
              </button>

              <div className="relative z-10 p-8 sm:p-10 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: "hsl(0 85% 45% / 0.12)", border: "1px solid hsl(0 85% 45% / 0.25)" }}
                >
                  <Shield className="w-7 h-7" style={{ color: "hsl(0 85% 58%)" }} />
                </div>

                <h3 className="font-display font-bold text-white text-2xl mb-3 tracking-tight" style={{ letterSpacing: "-0.03em" }}>
                  Want us to analyze your property for free?
                </h3>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Our security experts will visit your property at no cost, identify vulnerabilities, and design a custom solution — zero obligation.
                </p>

                <Link
                  to="/qualify"
                  onClick={() => setShow(false)}
                  className="btn-primary-gradient w-full flex items-center justify-center gap-2 py-4 text-base font-semibold mb-3"
                >
                  Check If You Qualify <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => setShow(false)}
                  className="text-xs font-medium"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  No thanks, I'll keep browsing
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
