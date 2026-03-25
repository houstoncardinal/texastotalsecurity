import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const PageHero = ({
  title,
  subtitle,
  showCTA = true,
  ctaText = "Get a Free Security Analysis",
  ctaHref = "/free-analysis",
}: PageHeroProps) => (
  <section
    className="relative overflow-hidden"
    style={{ background: "hsl(0 0% 4%)" }}
  >
    {/* Subtle red radial glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(0 85% 45% / 0.11), transparent 65%)" }}
    />
    {/* Fine grid texture */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.07] tracking-tight mb-5 animate-fade-up">
        {title}
      </h1>
      <p className="text-[1.0625rem] sm:text-lg text-white/48 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up animate-delay-100">
        {subtitle}
      </p>
      {showCTA && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-200">
          <Link to={ctaHref} className="btn-primary-gradient inline-flex items-center gap-2">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:7133879937" className="btn-outline-light text-sm">
            <Phone className="w-4 h-4" /> (713) 387-9937
          </a>
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
