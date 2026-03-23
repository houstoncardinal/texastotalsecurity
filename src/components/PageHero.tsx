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
  <section className="section-dark py-16 sm:py-20 lg:py-24">
    <div className="container-tight px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">{title}</h1>
      <p className="text-base sm:text-lg opacity-70 mb-8 max-w-2xl mx-auto">{subtitle}</p>
      {showCTA && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={ctaHref} className="btn-primary-gradient inline-flex items-center gap-2">
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:7133879937" className="inline-flex items-center gap-2 text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity">
            <Phone className="w-4 h-4" /> (713) 387-9937
          </a>
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
