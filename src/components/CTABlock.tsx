import { Link } from "react-router-dom";
import { Phone, ArrowRight, Shield } from "lucide-react";

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
  <section className={`relative overflow-hidden ${dark ? "" : "bg-secondary"}`} style={dark ? { background: "var(--gradient-hero)" } : undefined}>
    {dark && <div className="absolute inset-0" style={{ background: "var(--gradient-hero-radial)" }} />}
    <div className="container-tight relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 text-center max-w-3xl mx-auto">
      {dark && (
        <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-7 h-7 text-accent" />
        </div>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-5 ${dark ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h2>
      <p className={`mb-10 max-w-xl mx-auto leading-relaxed ${dark ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2 text-base px-8 py-4">
          Get Your Free Analysis <ArrowRight className="w-5 h-5" />
        </Link>
        <a
          href="tel:7133879937"
          className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            dark
              ? "btn-outline-light"
              : "border border-border text-foreground hover:bg-muted"
          }`}
        >
          <Phone className="w-4 h-4" /> Call (713) 387-9937
        </a>
      </div>
    </div>
  </section>
);

export default CTABlock;
