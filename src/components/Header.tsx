import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone, Menu, X, ChevronDown, Shield, Mail,
  Camera, Home, Building2, Users, Radio, Wrench,
  ArrowRight, CheckCircle2, MapPin, Star,
} from "lucide-react";

const mainServices = [
  { name: "Alarm Systems", href: "/alarm-systems", icon: Shield, desc: "Custom design, installation & local monitoring" },
  { name: "Security Camera Systems", href: "/security-cameras", icon: Camera, desc: "HD surveillance & remote viewing" },
  { name: "Residential Security", href: "/residential", icon: Home, desc: "Whole-home protection systems" },
  { name: "Commercial Security", href: "/commercial", icon: Building2, desc: "Scalable business security solutions" },
  { name: "HOA Security Solutions", href: "/hoa-security", icon: Users, desc: "Gate cameras & community-wide security" },
  { name: "Monitoring Services", href: "/monitoring-services", icon: Radio, desc: "24/7 local dispatch center" },
  { name: "Service & Maintenance", href: "/service-maintenance", icon: Wrench, desc: "Ongoing system support & upkeep" },
];

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Industries", href: "/industries" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden lg:block" style={{ background: "hsl(0 0% 5%)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">
          <span className="text-[11px] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.38)" }}>
            Houston's #1 Trusted Security Company — Serving Greater Houston Since 1994
          </span>
          <div className="flex items-center gap-7">
            <span className="text-[11px] font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
              LIC# B03066901
            </span>
            <a
              href="mailto:info@texastotalsecurity.com"
              className="flex items-center gap-1.5 text-[11px] transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.42)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}
            >
              <Mail className="w-3 h-3" />
              info@texastotalsecurity.com
            </a>
            <a
              href="tel:7133879937"
              className="flex items-center gap-1.5 text-[11px] font-bold transition-colors duration-200"
              style={{ color: "hsl(var(--accent))" }}
            >
              <Phone className="w-3 h-3" />
              (713) 387-9937
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-100/80"
            : "border-b border-gray-100/60"
        }`}
        style={scrolled ? { boxShadow: "0 1px 0 rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.04)" } : undefined}
      >
        <div className="container-tight flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/logo.png"
              alt="Texas Total Security"
              className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className="font-display font-bold text-gray-900 text-[17px] block tracking-tight leading-none">
                Texas Total Security
              </span>
              <span className="text-gray-400 text-[10px] tracking-[0.14em] uppercase font-semibold mt-0.5 block">
                Licensed & Insured · Houston, TX
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Services Mega Menu */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
                  servicesOpen || location.pathname.includes('/services') || location.pathname.includes('/alarm') || location.pathname.includes('/camera') || location.pathname.includes('/residential') || location.pathname.includes('/commercial') || location.pathname.includes('/hoa') || location.pathname.includes('/monitoring') || location.pathname.includes('/service')
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Services
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[58rem] bg-white border border-gray-100/80 rounded-2xl overflow-hidden transition-all duration-300 ${
                  servicesOpen
                    ? "opacity-100 scale-100 translate-y-2 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
                style={{ 
                  boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)",
                  marginTop: "0.5rem"
                }}
              >
                <div className="p-6">
                  {/* 3 Column Grid */}
                  <div className="grid grid-cols-3 gap-8">
                    {/* Column 1: Residential & Commercial CTAs */}
                    <div className="space-y-3">
                      <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-4">Property Type</h3>
                      
                      <Link
                        to="/residential"
                        className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/5 to-accent/8 border border-accent/10 hover:border-accent/20 transition-all duration-200 hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Home className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm mb-0.5">Residential</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Home security, alarms, cameras, and smart home integration</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                      </Link>

                      <Link
                        to="/commercial"
                        className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm mb-0.5">Commercial</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Business security, access control, and enterprise surveillance</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                      </Link>

                      <Link
                        to="/free-analysis"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl btn-primary-gradient text-sm font-semibold"
                      >
                        Get Free Analysis <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Column 2: Main Services */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-4">All Services</h3>
                      <div className="space-y-1">
                        {mainServices.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-accent/8 group-hover:border-accent/20 transition-colors">
                              <service.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-accent transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-gray-900 leading-tight">{service.name}</p>
                              <p className="text-[11px] text-gray-400 leading-tight truncate">{service.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Quick Links & Trust */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-4">Quick Links</h3>
                      <div className="space-y-1">
                        {[
                          { name: "View All Services", href: "/services", icon: Shield },
                          { name: "Service Areas", href: "/service-areas", icon: MapPin },
                          { name: "Portfolio", href: "/portfolio", icon: Camera },
                          { name: "Reviews", href: "/reviews", icon: Star },
                        ].map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                          >
                            <link.icon className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
                            <span className="text-[13px] font-medium text-gray-700">{link.name}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Trust Badges */}
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <div className="space-y-2">
                          {[
                            "Serving Houston Since 1994",
                            "Licensed & Insured",
                            "Locally Owned & Operated",
                            "30+ Years Experience",
                          ].map((badge) => (
                            <div key={badge} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                              <span className="text-xs text-gray-600 font-medium">{badge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-gray-50/80 border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <a href="tel:7133879937" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-accent transition-colors">
                      <Phone className="w-4 h-4" />
                      (713) 387-9937
                    </a>
                    <a href="mailto:info@texastotalsecurity.com" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      info@texastotalsecurity.com
                    </a>
                  </div>
                  <Link to="/services" className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
                    View All Services <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
                  location.pathname === link.href
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="tel:7133879937"
              className="flex items-center gap-2 text-[13.5px] font-bold text-gray-700 hover:text-gray-900 transition-colors duration-150"
            >
              <Phone className="w-3.5 h-3.5" style={{ color: "hsl(var(--accent))" }} />
              (713) 387-9937
            </a>
            <Link
              to="/free-analysis"
              className="btn-primary-gradient text-[13.5px] whitespace-nowrap"
              style={{ padding: "0.55rem 1.25rem", borderRadius: "0.625rem" }}
            >
              Free Security Analysis
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu - Masterful mobile experience */}
        <div
          className={`lg:hidden fixed inset-0 top-[61px] bg-white z-40 transition-all duration-300 ${
            mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
          }`}
          style={{ overflowY: 'auto', overscrollBehavior: 'contain' }}
        >
          <div className="flex flex-col min-h-full px-4 py-6">
            {/* Services Section */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold px-2 py-2 mb-2">
                Our Services
              </p>
              <div className="grid grid-cols-2 gap-2">
                {mainServices.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-gray-50 transition-colors duration-150 border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center shrink-0 mb-2">
                      <s.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 leading-tight">{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold px-2 py-2 mb-2">
                Navigation
              </p>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-xl transition-colors duration-150 font-medium ${
                      location.pathname === link.href
                        ? "text-accent bg-accent/5"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Section - Fixed at bottom */}
            <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
              <Link
                to="/free-analysis"
                className="block btn-primary-gradient text-center text-sm py-3"
              >
                Free Security Analysis
              </Link>
              <a
                href="tel:7133879937"
                className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-accent"
              >
                <Phone className="w-4 h-4" /> Call (713) 387-9937
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
