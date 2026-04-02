import { Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MobileCTA = () => (
  <motion.div 
    initial={{ y: 80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 120, damping: 18 }}
    className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
  >
    {/* Sleek Gradient Bar */}
    <div className="mx-3 mb-3 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
      <div className="flex items-center">
        {/* Call Button */}
        <a
          href="tel:7133879937"
          className="flex items-center justify-center gap-2 py-4 px-5 bg-white/10 hover:bg-white/15 transition-colors active:bg-white/20"
        >
          <Phone className="w-5 h-5 text-white" />
          <span className="text-white font-semibold text-sm">Call</span>
        </a>
        
        {/* Divider */}
        <div className="w-px h-10 bg-white/10" />
        
        {/* Free Analysis CTA */}
        <Link
          to="/free-analysis"
          className="flex-1 flex items-center justify-center gap-2.5 py-4 px-5 bg-gradient-to-r from-accent to-red-600 hover:from-red-600 hover:to-accent transition-all"
        >
          <Shield className="w-5 h-5 text-white" />
          <span className="text-white font-bold text-sm">Free Analysis</span>
        </Link>
        
        {/* Divider */}
        <div className="w-px h-10 bg-white/10" />
        
        {/* Text Button */}
        <a
          href="sms:7133879937"
          className="flex items-center justify-center gap-2 py-4 px-5 bg-white/10 hover:bg-white/15 transition-colors active:bg-white/20"
        >
          <div className="w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center">
            <span className="text-white text-[8px] font-bold mt-0.5">...</span>
          </div>
          <span className="text-white font-semibold text-sm">Text</span>
        </a>
      </div>
    </div>
    
    {/* Ultra-thin Status Bar */}
    <div className="flex items-center justify-center gap-2 pb-2">
      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span className="text-white/40 text-[10px] tracking-wide">LOCAL MONITORING ACTIVE</span>
    </div>
  </motion.div>
);

export default MobileCTA;
