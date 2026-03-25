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
  <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero-radial)" }} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(0_85%_45%/0.06),transparent_40%)]" />
    <div className="container-tight px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-10 text-center max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-foreground leading-[1.1] mb-5 animate-fade-up">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-primary-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up animate-delay-100">
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
