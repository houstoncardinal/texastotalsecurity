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
  <section className={dark ? "section-dark section-padding" : "section-padding bg-secondary"}>
    <div className="container-tight text-center max-w-3xl mx-auto">
      <h2 className={`text-3xl sm:text-4xl font-display font-bold mb-4 ${dark ? "" : "text-foreground"}`}>
        {title}
      </h2>
      <p className={`mb-8 max-w-xl mx-auto ${dark ? "opacity-70" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2">
          Get Your Free Analysis <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="tel:7133879937"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-colors ${
            dark
              ? "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              : "border-border text-foreground hover:bg-muted"
          }`}
        >
          <Phone className="w-4 h-4" /> Call (713) 387-9937
        </a>
      </div>
    </div>
  </section>
);

export default CTABlock;
