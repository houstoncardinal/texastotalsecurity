import { Phone, Shield, MessageCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
    {/* Main Navigation Bar */}
    <div 
      className="bg-white border-t border-gray-200"
      style={{
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="grid grid-cols-4 h-16">
        {/* Home */}
        <Link
          to="/"
          className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <Home className="w-5 h-5 text-gray-700" />
          <span className="text-[10px] font-semibold text-gray-600 tracking-wide">Home</span>
        </Link>

        {/* Call */}
        <a
          href="tel:7133879937"
          className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors relative group"
        >
          <div className="relative">
            <Phone className="w-5 h-5 text-gray-700 group-active:scale-95 transition-transform" />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{ background: "hsl(0 85% 50%)" }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
          <span className="text-[10px] font-semibold text-gray-600 tracking-wide">Call</span>
        </a>

        {/* Text/SMS */}
        <a
          href="sms:7133879937"
          className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-gray-700" />
          <span className="text-[10px] font-semibold text-gray-600 tracking-wide">Text</span>
        </a>

        {/* Free Analysis - Highlighted */}
        <Link
          to="/free-analysis"
          className="flex flex-col items-center justify-center gap-1 relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, hsl(0 85% 45%) 0%, hsl(0 85% 50%) 100%)",
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
          
          <Shield className="w-5 h-5 text-white relative z-10" />
          <span className="text-[10px] font-bold text-white tracking-wide relative z-10">Free Quote</span>
        </Link>
      </div>
    </div>
  </div>
);

export default MobileCTA;
