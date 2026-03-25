import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { cities } from "@/lib/cityData";

const footerCitySlugs = ["houston", "katy", "sugar-land", "richmond", "cypress", "bellaire", "memorial-houston", "the-woodlands"];
const footerCities = footerCitySlugs.map(s => cities.find(c => c.slug === s)).filter(Boolean) as typeof cities;

const techPartners = [
  "Honeywell / Resideo",
  "Alarm.com",
  "DMP",
  "DSC",
  "Hikvision",
  "Bosch Security",
];

const footerColHead = "text-[10.5px] font-bold uppercase tracking-[0.20em] mb-5 block" as const;
const footerLink = "text-[13.5px] text-white/38 hover:text-white/80 transition-colors duration-200 leading-none" as const;

const Footer = () => (
  <footer className="relative overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
    {/* Ambient red glow — bottom left */}
    <div
      className="absolute bottom-0 left-0 w-[500px] h-[300px] pointer-events-none"
      style={{ background: "radial-gradient(ellipse at bottom left, hsl(0 85% 45% / 0.06), transparent 65%)" }}
    />

    {/* Tech partner strip */}
    <div className="relative z-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold shrink-0" style={{ color: "rgba(255,255,255,0.18)" }}>
            Authorized Installer
          </span>
          <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.08)" }}>|</span>
          {techPartners.map((p) => (
            <span key={p} className="text-[12.5px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.26)" }}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* CTA strip */}
    <div className="relative z-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <p className="font-display font-bold text-white text-lg mb-1 tracking-tight">
            Ready to Secure Your Property?
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.36)" }}>
            Free onsite security analysis — no obligation, no pressure.
          </p>
        </div>
        <Link
          to="/free-analysis"
          className="btn-primary-gradient inline-flex items-center gap-2 text-sm whitespace-nowrap shrink-0"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>

    {/* Main grid */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-14">

        {/* Brand col */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <img
              src="/logo.png"
              alt="Texas Total Security"
              className="w-10 h-10 object-contain brightness-0 invert"
              style={{ opacity: 0.85 }}
              loading="lazy"
            />
            <span className="font-display font-bold text-white text-[16px] leading-tight tracking-tight">
              Texas Total Security
            </span>
          </div>
          <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
            Houston's trusted security experts for over 30 years. Custom alarm, camera, and monitoring solutions.
          </p>
          <ul className="space-y-2">
            {["Licensed & Insured", "LIC# B03066901", "30+ Years in Business", "Locally Owned", "24/7 Dispatch Center"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <span className={footerColHead} style={{ color: "rgba(255,255,255,0.32)" }}>Services</span>
          <ul className="space-y-3">
            {[
              { name: "Alarm Systems", href: "/alarm-systems" },
              { name: "Security Cameras", href: "/security-cameras" },
              { name: "Residential Security", href: "/residential" },
              { name: "Commercial Security", href: "/commercial" },
              { name: "HOA Solutions", href: "/hoa-security" },
              { name: "24/7 Monitoring", href: "/monitoring-services" },
              { name: "Service & Maintenance", href: "/service-maintenance" },
            ].map((l) => (
              <li key={l.href}><Link to={l.href} className={footerLink}>{l.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <span className={footerColHead} style={{ color: "rgba(255,255,255,0.32)" }}>Company</span>
          <ul className="space-y-3">
            {[
              { name: "About Us", href: "/about" },
              { name: "Industries We Serve", href: "/industries" },
              { name: "Project Portfolio", href: "/portfolio" },
              { name: "Customer Reviews", href: "/reviews" },
              { name: "Service Areas", href: "/service-areas" },
              { name: "Resources & Blog", href: "/blog" },
              { name: "Contact Us", href: "/contact" },
              { name: "Free Security Analysis", href: "/free-analysis" },
            ].map((l) => (
              <li key={l.href}><Link to={l.href} className={footerLink}>{l.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <span className={footerColHead} style={{ color: "rgba(255,255,255,0.32)" }}>Service Areas</span>
          <ul className="space-y-3">
            {footerCities.map((city) => (
              <li key={city.slug}>
                <Link to={`/${city.slug}-security-systems`} className={footerLink}>{city.name}</Link>
              </li>
            ))}
            <li>
              <Link
                to="/service-areas"
                className="text-[13.5px] font-semibold transition-colors duration-200"
                style={{ color: "hsl(var(--accent))" }}
              >
                View All Areas →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <span className={footerColHead} style={{ color: "rgba(255,255,255,0.32)" }}>Contact</span>
          <ul className="space-y-4">
            <li>
              <a href="tel:7133879937" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                  style={{ background: "hsl(0 85% 45% / 0.10)" }}>
                  <Phone className="w-3.5 h-3.5" style={{ color: "hsl(var(--accent))" }} />
                </div>
                <span className="text-sm font-medium transition-colors duration-200" style={{ color: "rgba(255,255,255,0.48)" }}>
                  (713) 387-9937
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:info@texastotalsecurity.com" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "hsl(0 85% 45% / 0.10)" }}>
                  <Mail className="w-3.5 h-3.5" style={{ color: "hsl(var(--accent))" }} />
                </div>
                <span className="text-[12.5px] transition-colors duration-200 break-all" style={{ color: "rgba(255,255,255,0.40)" }}>
                  info@texastotalsecurity.com
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "hsl(0 85% 45% / 0.10)" }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: "hsl(var(--accent))" }} />
              </div>
              <span className="text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.30)" }}>
                11331 Richmond Ave. #102<br />Houston, TX 77082
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between py-5 gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          &copy; {new Date().getFullYear()} Texas Total Security. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          {[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Accessibility", href: "#" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="hover:text-white/40 transition-colors duration-200">{item.label}</a>
          ))}
          <Link to="/service-areas" className="hover:text-white/40 transition-colors duration-200">Sitemap</Link>
          <span style={{ color: "rgba(255,255,255,0.08)" }}>·</span>
          <span>LIC# B03066901</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
