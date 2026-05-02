import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Mail, MessageCircle, Phone, Shield, X } from "lucide-react";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    tidioChatApi?: {
      open?: () => void;
      show?: () => void;
      hide?: () => void;
      on?: (event: string, callback: () => void) => void;
    };
  }
}

const openTidio = () => {
  if (window.tidioChatApi?.show) window.tidioChatApi.show();
  if (window.tidioChatApi?.open) window.tidioChatApi.open();
};

const ContactWidget = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hideTidio = () => window.tidioChatApi?.hide?.();
    if (window.tidioChatApi?.on) {
      window.tidioChatApi.on("ready", hideTidio);
    } else {
      const timer = window.setTimeout(hideTidio, 2000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-3 right-3 z-[9998] sm:bottom-5 sm:right-5">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mb-3 w-[calc(100vw-1.5rem)] max-w-[340px] overflow-hidden border border-white/10 bg-neutral-950 text-white shadow-2xl shadow-black/30"
            >
              <div className="relative p-4">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                <div className="absolute -right-12 -top-12 h-28 w-28 bg-red-600/15 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-red-500/25 bg-red-600/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-red-200">
                      <Shield className="h-3.5 w-3.5" />
                      Support
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold leading-tight">
                      Need help with security?
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">
                      Call, chat, or request a property assessment.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close contact widget"
                    className="border border-white/10 p-1.5 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="relative mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={openTidio}
                    className="flex items-center justify-between border border-white/10 bg-white/[0.045] px-3.5 py-2.5 text-left transition-colors hover:border-red-500/35 hover:bg-red-600/10"
                  >
                    <span className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4 text-red-400" />
                      <span>
                        <span className="block text-sm font-semibold">Live chat</span>
                        <span className="text-xs text-white/45">Open Tidio support</span>
                      </span>
                    </span>
                  </button>
                  <a
                    href="tel:7133879937"
                    className="flex items-center gap-3 border border-white/10 bg-white/[0.045] px-3.5 py-2.5 transition-colors hover:border-red-500/35 hover:bg-red-600/10"
                  >
                    <Phone className="h-4 w-4 text-red-400" />
                    <span>
                      <span className="block text-sm font-semibold">Call now</span>
                      <span className="text-xs text-white/45">(713) 387-9937</span>
                    </span>
                  </a>
                  <a
                    href="mailto:info@texastotalsecurity.com"
                    className="flex items-center gap-3 border border-white/10 bg-white/[0.045] px-3.5 py-2.5 transition-colors hover:border-red-500/35 hover:bg-red-600/10"
                  >
                    <Mail className="h-4 w-4 text-red-400" />
                    <span>
                      <span className="block text-sm font-semibold">Email us</span>
                      <span className="text-xs text-white/45">info@texastotalsecurity.com</span>
                    </span>
                  </a>
                </div>

                <div className="relative mt-3 grid grid-cols-2 gap-2">
                  <Link
                    to="/free-analysis"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 bg-red-600 px-3 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-red-950/30 transition-colors hover:bg-red-700"
                  >
                    <Phone className="h-4 w-4" />
                    Callback
                  </Link>
                  <Link
                    to="/property-assessment"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 border border-white/15 bg-white px-3 py-2.5 text-center text-sm font-bold text-black transition-colors hover:bg-gray-100"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Assessment
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen(value => !value)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-2.5 border border-white/10 bg-neutral-950/95 px-3 py-2.5 text-white shadow-xl shadow-black/30 backdrop-blur-sm transition-colors hover:border-red-500/35 hover:bg-black"
          aria-label="Open contact options"
        >
          <span className="flex h-8 w-8 items-center justify-center bg-red-600 text-white">
            <Shield className="h-4 w-4" />
          </span>
          <span className="text-left">
            <span className="block text-[13px] font-bold leading-none">Need help?</span>
            <span className="mt-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45 sm:block">Contact TTS</span>
          </span>
        </motion.button>
      </div>
    </>
  );
};

export default ContactWidget;
