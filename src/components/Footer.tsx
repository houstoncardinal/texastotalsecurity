import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight, Shield, Clock, Star } from "lucide-react";

const footerServiceAreas = [
  { name: "West University Place", zip: "77005", slug: "west-university-security-systems" },
  { name: "Memorial Villages", zip: "77024", slug: "memorial-villages-security-systems" },
  { name: "Bellaire", zip: "77401", slug: "bellaire-security-systems" },
  { name: "Upper Kirby / Greenway", zip: "77027", slug: "upper-kirby-security-systems" },
  { name: "Spring Valley", zip: "77055", slug: "spring-valley-security-systems" },
  { name: "Montrose North", zip: "77098", slug: "montrose-north-security-systems" },
  { name: "Galleria / Uptown", zip: "77056", slug: "galleria-security-systems" },
  { name: "River Oaks / Fourth Ward", zip: "77019", slug: "river-oaks-security-systems" },
  { name: "Montrose", zip: "77006", slug: "montrose-security-systems" },
  { name: "Medical Center", zip: "77030", slug: "medical-center-security-systems" },
  { name: "Rice Military", zip: "77007", slug: "rice-military-security-systems" },
  { name: "Energy Corridor", zip: "77079", slug: "energy-corridor-security-systems" },
  { name: "Downtown Houston", zip: "77002", slug: "downtown-houston-security-systems" },
];

const techPartners = ["Honeywell / Resideo", "Alarm.com", "DMP", "DSC", "Hikvision", "Bosch Security"];

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.1 };

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>

      {/* ── Ambient glows ─────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, hsl(0 85% 45% / 0.07), transparent 65%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[450px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, hsl(0 85% 45% / 0.04), transparent 65%)" }}
      />
      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.018,
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Tech partner strip ────────────────────────── */}
      <div className="relative z-10 border-b border-white/[0.045]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold shrink-0 text-white/18">
              Authorized Installer
            </span>
            <span className="hidden sm:inline text-white/[0.08]">|</span>
            {techPartners.map((p) => (
              <span key={p} className="text-[12px] font-semibold tracking-wide text-white/28">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA strip ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.7, ease: easeExpo }}
        className="relative z-10 border-b border-white/[0.045]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
             <p className="font-display font-bold text-white text-xl mb-1 tracking-tight" style={{ letterSpacing: "-0.03em" }}>
               Ready to Secure Your Properties?
             </p>
             <p className="text-sm text-white/44">
               Free property assessment for commercial, multifamily & HOA communities — no obligation.
             </p>
          </div>
          <Link
            to="/free-analysis"
            className="btn-primary-gradient inline-flex items-center gap-2 text-sm whitespace-nowrap shrink-0"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* ── Main grid ─────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <img
                src="/logo.png"
                alt="Texas Total Security"
                className="w-10 h-10 object-contain brightness-0 invert"
                style={{ opacity: 0.88 }}
                loading="lazy"
              />
              <span className="font-display font-bold text-white text-[16px] leading-tight tracking-tight">
                Texas Total Security
              </span>
            </div>
             <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.44)" }}>
               Houston's trusted commercial security company for property managers, HOAs, and business owners — locally owned and operated.
             </p>
            <ul className="space-y-2.5">
              {[
                { icon: Shield,       text: "Licensed & Insured" },
                { icon: Clock,        text: "Locally Owned & Operated" },
                { icon: Star,         text: "5-Star Google Rating" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--accent) / 0.13)" }}
                  >
                    <item.icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/[0.07]">
              <p className="text-[10px] uppercase tracking-widest text-white/28 font-semibold mb-2">License</p>
              <p className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>LIC# B03066901</p>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo, delay: 0.07 }}
          >
            <h4 className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-white/35 mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
               {[
                 { name: "Alarm Systems & Takeovers",   href: "/alarm-systems" },
                 { name: "Security Camera Systems",     href: "/security-cameras" },
                 { name: "Monitoring Services",         href: "/monitoring-services" },
                 { name: "Residential Solutions",       href: "/residential" },
                 { name: "Commercial Solutions",        href: "/commercial" },
                 { name: "HOA Security Solutions",      href: "/hoa-security" },
                 { name: "Pole Configurator",           href: "/security-pole-configurator" },
                 { name: "Service & Maintenance",       href: "/service-maintenance" },
               ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[14px] transition-colors duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "rgba(255,255,255,0.60)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.92)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo, delay: 0.13 }}
          >
            <h4 className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-white/35 mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "About Us",              href: "/about",          highlight: false },
                { name: "Industries We Serve",   href: "/industries",     highlight: false },
                { name: "Customer Reviews",      href: "/reviews",        highlight: false },
                { name: "Service Areas",         href: "/service-areas",  highlight: false },
                { name: "Resources & Blog",      href: "/blog",           highlight: false },
                { name: "Contact Us",            href: "/contact",        highlight: false },
                { name: "Free Security Analysis",href: "/free-analysis",  highlight: true  },
              ].map((link) => (
                <li key={link.href}>
                  {link.highlight ? (
                    <Link
                      to={link.href}
                      className="text-[14px] font-semibold text-accent transition-colors hover:text-accent/80"
                    >
                      {link.name} →
                    </Link>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-[14px] transition-colors duration-200 hover:translate-x-1 inline-block"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.92)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo, delay: 0.18 }}
          >
            <h4 className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-white/35 mb-5">
              Service Areas
            </h4>
            <ul className="space-y-2.5">
              {footerServiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/neighborhoods/${area.slug}`}
                    className="text-[14px] transition-colors duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "rgba(255,255,255,0.60)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.92)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link
                  to="/service-areas"
                  className="text-[14px] font-semibold text-accent transition-colors hover:text-accent/80"
                >
                  View All Areas →
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, ease: easeExpo, delay: 0.23 }}
          >
            <h4 className="text-[10.5px] uppercase tracking-[0.2em] font-bold text-white/35 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:7133879937" className="flex items-center gap-3 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: "hsl(var(--accent))" }}
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10.5px] uppercase tracking-wider text-white/34 mb-0.5">Phone</p>
                    <p
                      className="text-[15px] font-bold text-white transition-colors duration-200"
                      style={{}}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "hsl(var(--accent))")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "white")}
                    >
                      (713) 387-9937
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@texastotalsecurity.com" className="flex items-center gap-3 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-white/18"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <Mail className="w-5 h-5" style={{ color: "rgba(255,255,255,0.65)" }} />
                  </div>
                  <div>
                    <p className="text-[10.5px] uppercase tracking-wider text-white/34 mb-0.5">Email</p>
                    <p
                      className="text-[14px] transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      info@texastotalsecurity.com
                    </p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "rgba(255,255,255,0.65)" }} />
                </div>
                <div>
                  <p className="text-[10.5px] uppercase tracking-wider text-white/34 mb-1">Address</p>
                  <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                    11331 Richmond Ave. #102<br />
                    Houston, TX 77082
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Service areas — full internal-link block for Google local SEO */}
        <div
          className="py-7 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] font-bold mb-3" style={{ color: "rgba(255,255,255,0.22)" }}>
            Serving Houston's Most Prestigious Inner-Loop Neighborhoods
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-[12px] leading-relaxed max-w-5xl mx-auto">
            {footerServiceAreas.map((area, index) => (
              <span key={area.slug} className="inline-flex items-center gap-3">
                <Link
                  to={`/neighborhoods/${area.slug}`}
                  className="transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.34)" }}
                >
                  {area.name} ({area.zip}), TX
                </Link>
                {index < footerServiceAreas.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.16)" }}>·</span>
                )}
              </span>
            ))}
          </div>
          <p className="text-[11px] mt-3 font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
            Licensed & Insured · Texas DPS Alarm License #B03066901 · Locally owned &amp; operated for 15+ years
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.34)" }}>
              © {currentYear} Texas Total Security. All rights reserved.
            </p>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.08)" }}>·</span>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.24)" }}>LIC# B03066901</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms of Service", to: "/terms-of-service" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-[13px] transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.34)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.80)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.34)")}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.34)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.80)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.34)")}
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
