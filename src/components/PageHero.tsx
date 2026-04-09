import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  badge?: string;
}

const PageHero = ({
  title,
  subtitle,
  showCTA = true,
  ctaText = "Get a Free Security Analysis",
  ctaHref = "/free-analysis",
  badge,
}: PageHeroProps) => (
  <section
    className="relative overflow-hidden"
    style={{ background: "hsl(0 0% 4%)" }}
  >
    {/* Top accent line */}
    <div
      className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, hsl(0 85% 50% / 0.7) 40%, hsl(0 85% 50% / 0.7) 60%, transparent 100%)",
      }}
    />

    {/* Primary red radial bloom — top center */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 90% 65% at 50% -15%, hsl(0 85% 45% / 0.16), transparent 65%)",
      }}
    />

    {/* Secondary subtle bloom — bottom left */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 50% 40% at -5% 100%, hsl(0 85% 45% / 0.07), transparent 60%)",
      }}
    />

    {/* Fine grid texture */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.022,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />

    {/* Animated corner ornament — top right */}
    <div
      className="absolute top-0 right-0 pointer-events-none"
      style={{
        width: "320px",
        height: "320px",
        background:
          "radial-gradient(circle at top right, hsl(0 85% 45% / 0.06) 0%, transparent 70%)",
      }}
    />

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 text-center">
      {/* Optional badge */}
      {badge && (
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.16em] uppercase"
          style={{
            background: "hsl(0 85% 45% / 0.1)",
            borderColor: "hsl(0 85% 45% / 0.25)",
            color: "hsl(0 85% 65%)",
          }}
        >
          <Shield className="w-3 h-3" />
          {badge}
        </div>
      )}

      {/* Title */}
      <h1
        className="font-display font-bold text-white leading-[1.05] tracking-tight mb-5"
        style={{
          fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
          letterSpacing: "-0.045em",
          textShadow: "0 2px 40px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </h1>

      {/* Red accent rule */}
      <div
        className="mx-auto mb-7 rounded-full"
        style={{
          width: "3.5rem",
          height: "3px",
          background: "linear-gradient(90deg, hsl(0 85% 45%), hsl(0 85% 60%))",
          boxShadow: "0 0 16px hsl(0 85% 50% / 0.5)",
        }}
      />

      {/* Subtitle — inline style guarantees white text regardless of CSS cascade */}
      <p
        className="text-[1.0625rem] sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        style={{ color: "rgba(255, 255, 255, 0.75)" }}
      >
        {subtitle}
      </p>

      {showCTA && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={ctaHref}
            className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-3.5 text-[15px]"
            style={{ boxShadow: "0 4px 24px hsl(0 85% 45% / 0.35)" }}
          >
            {ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:7133879937"
            className="btn-outline-light inline-flex items-center gap-2 text-sm px-7 py-3.5"
          >
            <Phone className="w-4 h-4" /> (713) 387-9937
          </a>
        </div>
      )}

      {/* Trust strip */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-10">
        {["30+ Years Experience", "Licensed & Insured · LIC# B03066901", "24/7 Local Monitoring"].map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ background: "hsl(0 85% 55% / 0.6)" }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>

    {/* Bottom fade line */}
    <div
      className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
    />
  </section>
);

export default PageHero;
