import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, Shield, Clock, Star, FileText } from "lucide-react";
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
      {/* Ambient red glow */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, hsl(0 85% 45% / 0.08), transparent 65%)" }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[250px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, hsl(0 85% 45% / 0.05), transparent 65%)" }}
      />

      {/* Tech partner strip */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold shrink-0 text-white/20">
              Authorized Installer
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            {techPartners.map((p) => (
              <span key={p} className="text-[12.5px] font-semibold tracking-wide text-white/30">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-display font-bold text-white text-lg mb-1 tracking-tight">
              Ready to Secure Your Property?
            </p>
            <p className="text-sm text-white/50">
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
                style={{ opacity: 0.9 }}
                loading="lazy"
              />
              <span className="font-display font-bold text-white text-[16px] leading-tight tracking-tight">
                Texas Total Security
              </span>
            </div>
            <p className="text-[13px] leading-relaxed mb-6 text-white/50">
              Houston's trusted security experts for over 30 years. Custom alarm, camera, and monitoring solutions.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Shield, text: "Licensed & Insured" },
                { icon: Clock, text: "30+ Years in Business" },
                { icon: Star, text: "5-Star Google Rating" },
                { icon: CheckCircle2, text: "Locally Owned" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-[13px] text-white/60 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-widest text-white/30 font-semibold mb-3">License</p>
              <p className="text-[13px] text-white/70 font-semibold">LIC# B03066901</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.20em] font-bold text-white/40 mb-5">
              Services
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: "Alarm Systems", href: "/alarm-systems" },
                { name: "Security Cameras", href: "/security-cameras" },
                { name: "Residential Security", href: "/residential" },
                { name: "Commercial Security", href: "/commercial" },
                { name: "HOA Solutions", href: "/hoa-security" },
                { name: "24/7 Monitoring", href: "/monitoring-services" },
                { name: "Service & Maintenance", href: "/service-maintenance" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-[14px] text-white/70 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.20em] font-bold text-white/40 mb-5">
              Company
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: "About Us", href: "/about" },
                { name: "Industries We Serve", href: "/industries" },
                { name: "Project Portfolio", href: "/portfolio" },
                { name: "Customer Reviews", href: "/reviews" },
                { name: "Service Areas", href: "/service-areas" },
                { name: "Resources & Blog", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
                { name: "Free Security Analysis", href: "/free-analysis", highlight: true },
              ].map((link) => (
                <li key={link.href}>
                  {link.highlight ? (
                    <Link 
                      to={link.href} 
                      className="text-[14px] font-semibold text-accent hover:text-accent/80 transition-colors"
                    >
                      {link.name} →
                    </Link>
                  ) : (
                    <Link 
                      to={link.href} 
                      className="text-[14px] text-white/70 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.20em] font-bold text-white/40 mb-5">
              Service Areas
            </h4>
            <ul className="space-y-3.5">
              {footerCities.map((city) => (
                <li key={city.slug}>
                  <Link 
                    to={`/${city.slug}-security-systems`} 
                    className="text-[14px] text-white/70 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/service-areas"
                  className="text-[14px] font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  View All Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.20em] font-bold text-white/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:7133879937" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/40 mb-0.5">Phone</p>
                    <p className="text-[15px] font-bold text-white group-hover:text-accent transition-colors">
                      (713) 387-9937
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@texastotalsecurity.com" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/40 mb-0.5">Email</p>
                    <p className="text-[14px] text-white/80 group-hover:text-white transition-colors">
                      info@texastotalsecurity.com
                    </p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Address</p>
                  <p className="text-[14px] text-white/80 leading-relaxed">
                    11331 Richmond Ave. #102<br />
                    Houston, TX 77082
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-[13px] text-white/40">
              © {currentYear} Texas Total Security. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/10">·</span>
            <p className="text-[12px] text-white/30">LIC# B03066901</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px]">
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Accessibility", href: "#" },
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <Link to="/service-areas" className="text-white/40 hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
