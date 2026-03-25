import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

interface CTABlockProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

const CTABlock = ({
  title = "Ready to Protect What Matters Most?",
  subtitle = "Schedule your free onsite security analysis today. No pressure, no obligation — just expert recommendations tailored to your property.",
  dark = true,
}: CTABlockProps) => (
  <section
    className="relative overflow-hidden"
    style={{ background: dark ? "hsl(0 0% 4%)" : "hsl(0 0% 97%)" }}
  >
    {/* Ambient red glow */}
    {dark && (
      <>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "hsl(0 85% 45% / 0.07)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "hsl(0 85% 45% / 0.04)" }} />
      </>
    )}
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32 text-center">
      {/* Live badge */}
      {dark && (
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border"
          style={{ background: "hsl(0 85% 45% / 0.08)", borderColor: "hsl(0 85% 45% / 0.18)" }}>
          <span className="live-dot" />
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "hsl(var(--accent))" }}>
            Free Consultation Available
          </span>
        </div>
      )}
      <h2
        className={`text-4xl sm:text-5xl lg:text-[3.25rem] font-display font-bold leading-[1.08] tracking-tight mb-5 ${
          dark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      <p className={`text-lg leading-relaxed mb-10 max-w-xl mx-auto ${dark ? "text-white/45" : "text-gray-500"}`}>
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/free-analysis"
          className="btn-primary-gradient inline-flex items-center gap-2 text-base px-9 py-4"
        >
          Get Your Free Analysis <ArrowRight className="w-5 h-5" />
        </Link>
        <a
          href="tel:7133879937"
          className={`inline-flex items-center gap-2 px-7 py-[0.875rem] rounded-xl font-semibold text-sm transition-all duration-200 ${
            dark
              ? "btn-outline-light"
              : "border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300"
          }`}
          style={{ letterSpacing: "-0.01em" }}
        >
          <Phone className="w-4 h-4" /> (713) 387-9937
        </a>
      </div>
    </div>
  </section>
);

export default CTABlock;
