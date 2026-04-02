import { Phone, MessageCircle, Shield, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MobileCTA = () => (
  <motion.div 
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
    className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset"
  >
    {/* Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/90 to-black/80" />
    <div className="absolute inset-0 backdrop-blur-xl" />
    
    {/* Border Glow */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    
    {/* Content */}
    <div className="relative px-4 pt-3 pb-6">
      {/* Main Action Button */}
      <Link
        to="/free-analysis"
        className="group relative flex items-center justify-center gap-3 w-full mb-3 overflow-hidden rounded-2xl py-4 px-6"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-red-500 to-accent bg-[length:200%_100%] group-hover:animate-gradient-x transition-all" />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
        
        {/* Content */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="block text-white font-bold text-lg leading-tight">Get Free Security Analysis</span>
            <span className="block text-white/70 text-xs">No obligation • Custom quote</span>
          </div>
          <Calendar className="w-5 h-5 text-white/80 ml-2" />
        </div>
      </Link>
      
      {/* Quick Actions */}
      <div className="flex gap-3">
        <a
          href="tel:7133879937"
          className="flex-1 group flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
            <Phone className="w-4 h-4 text-accent" />
          </div>
          <span className="text-white font-semibold text-sm">Call Now</span>
        </a>
        
        <a
          href="sms:7133879937"
          className="flex-1 group flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
            <MessageCircle className="w-4 h-4 text-accent" />
          </div>
          <span className="text-white font-semibold text-sm">Text Us</span>
        </a>
      </div>
      
      {/* Trust Indicator */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/50 text-xs">Local Monitoring Active</span>
        </div>
        <span className="text-white/20">•</span>
        <span className="text-white/50 text-xs">30+ Years Houston</span>
      </div>
    </div>
    
    {/* Add to your CSS */}
    <style>{`
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-gradient-x {
        animation: gradient-x 3s ease infinite;
      }
      .safe-area-inset {
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
    `}</style>
  </motion.div>
);

export default MobileCTA;
