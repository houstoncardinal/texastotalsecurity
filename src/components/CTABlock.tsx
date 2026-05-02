import { Link } from "react-router-dom";
import { Phone, ArrowRight, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CTABlockProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

const CTABlock = ({
  title = "Have a Security Project in Mind?",
  subtitle = "Get your free onsite security analysis. No pressure, no obligation — just expert recommendations.",
  dark = false,
}: CTABlockProps) => (
  <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg"
      >
        {/* Subtle gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-full opacity-40"
          style={{ background: "linear-gradient(135deg, transparent 0%, hsl(0 85% 45% / 0.04) 100%)" }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 p-8 sm:p-10 lg:p-12 items-center">
          {/* Left — Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(0 85% 45% / 0.1) 0%, hsl(0 85% 45% / 0.05) 100%)",
                  border: "1px solid hsl(0 85% 45% / 0.15)",
                }}
              >
                <Shield className="w-5 h-5" style={{ color: "hsl(0 85% 50%)" }} />
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                Free Consultation
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-3 leading-tight">
              {title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                to="/free-analysis"
                className="btn-primary-gradient inline-flex items-center gap-2 text-sm px-7 py-3.5"
              >
                Get Free Analysis <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:7133879937"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                <Phone className="w-4 h-4" /> (713) 387-9937
              </a>
            </div>
          </div>

          {/* Right — Compact Trust Badges */}
          <div className="flex lg:flex-col gap-4 lg:gap-3">
            {[
              { label: "Local Team", icon: Shield },
              { label: "24/7 Local", icon: Phone },
              { label: "5.0 ★ Rated", icon: Star },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-accent/30 hover:bg-white transition-all duration-200 min-w-[140px]"
              >
                <item.icon className="w-4 h-4 shrink-0" style={{ color: "hsl(0 85% 50%)" }} />
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTABlock;
