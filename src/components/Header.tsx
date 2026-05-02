import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone, Menu, X, ChevronDown, Shield, Mail,
  Camera, Home, Building2, Users, Radio, Wrench,
  ArrowRight, CheckCircle2, MapPin, Star,
} from "lucide-react";

const mainServices = [
  { name: "Alarm Systems & Takeovers", href: "/alarm-systems",        icon: Shield,    desc: "Switch providers & keep your equipment" },
  { name: "Security Camera Systems",   href: "/security-cameras",     icon: Camera,    desc: "4K surveillance & LPR systems" },
  { name: "Monitoring Services",       href: "/monitoring-services",  icon: Radio,     desc: "24/7 professional alarm monitoring" },
  { name: "Residential Solutions",     href: "/residential",          icon: Home,      desc: "Custom home security for all property types" },
  { name: "Commercial Solutions",      href: "/commercial",           icon: Building2, desc: "Enterprise-grade business solutions" },
  { name: "HOA Security Solutions",    href: "/hoa-security",         icon: Users,     desc: "Gate cameras & community-wide security" },
  { name: "Security Pole Configurator", href: "/security-pole-configurator", icon: Camera, desc: "Design your custom pole setup in 3D" },
  { name: "Service & Maintenance",     href: "/service-maintenance",  icon: Wrench,    desc: "Ongoing system support & upkeep" },
];

const navLinks = [
  { name: "About",      href: "/about" },
  { name: "Industries", href: "/industries" },
  { name: "Reviews",    href: "/reviews" },
    { name: "Contact",    href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const location  = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(true);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleServicesEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const isServiceActive =
    servicesOpen ||
    ["/services", "/alarm", "/security-cameras", "/residential", "/commercial", "/hoa", "/monitoring", "/service"].some(p =>
      location.pathname.startsWith(p)
    );

  return (
    <>
      {/* ── Top utility bar ─────────────────────────────────── */}
      <div className="hidden lg:block" style={{ background: "hsl(0 0% 4%)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">
          <span
            className="text-[11px] font-medium tracking-wide"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            Houston's Trusted Security Company — Serving Property Managers, HOAs & Businesses
          </span>
          <div className="flex items-center gap-7">
            <span
              className="text-[11px] font-semibold tracking-[0.16em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              LIC# B03066901
            </span>
            <a
              href="mailto:info@texastotalsecurity.com"
              className="flex items-center gap-1.5 text-[11px] transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.38)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
            >
              <Mail className="w-3 h-3" />
              info@texastotalsecurity.com
            </a>
            <a
              href="tel:7133879937"
              className="flex items-center gap-1.5 text-[11px] font-bold transition-colors duration-200"
              style={{ color: "hsl(var(--accent))" }}
              onMouseEnter={e => (e.currentTarget.style.color = "hsl(0 85% 60%)")}
              onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--accent))")}
            >
              <Phone className="w-3 h-3" />
              (713) 387-9937
            </a>
          </div>
        </div>
      </div>

      {/* ── Main header ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-[100000] transition-all duration-300 ${
          scrolled ? "header-scrolled" : "header-default"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Texas Total Security"
                className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-gray-900 text-[17px] block tracking-tight leading-none">
                Texas Total Security
              </span>
              <span
                className="text-[10px] tracking-[0.14em] uppercase font-semibold mt-0.5 block"
                style={{ color: "rgba(107,114,128,0.8)" }}
              >
                Licensed & Insured · Houston, TX
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5">

            {/* Services Mega Menu */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className={`relative flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
                  isServiceActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Services
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
                {/* Active underline */}
                {isServiceActive && (
                  <span
                    className="absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] rounded-full"
                    style={{ background: "hsl(var(--accent))" }}
                  />
                )}
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[58rem] bg-white border border-gray-100/80 rounded-2xl overflow-hidden transition-all duration-200 ${
                  servicesOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-[0.97] -translate-y-2 pointer-events-none"
                }`}
                style={{
                  boxShadow: "0 8px 40px rgba(0,0,0,0.11), 0 4px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-8">

                    {/* Column 1 — Property Type CTAs */}
                    <div className="space-y-2">
                      <h3 className="text-[10px] uppercase tracking-[0.16em] font-bold text-gray-400 mb-4">Property Type</h3>

                      {/* Residential */}
                      <Link
                        to="/residential"
                        className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                        style={{ background: "hsl(0 85% 45% / 0.04)", border: "1px solid hsl(0 85% 45% / 0.10)" }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(0 85% 45% / 0.22)";
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px hsl(0 85% 45% / 0.08)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.borderColor = "hsl(0 85% 45% / 0.10)";
                          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                          style={{ background: "hsl(var(--accent))" }}
                        >
                          <Home className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm mb-0.5">Residential</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Homes, condos & single-family properties</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />
                      </Link>

                      {/* Commercial */}
                      <Link
                        to="/commercial"
                        className="group flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/70 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-gray-700 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm mb-0.5">Commercial & Business</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Enterprise security, surveillance & multi-site</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />
                      </Link>

                      {/* HOA / Multi-Family */}
                      <Link
                        to="/hoa-security"
                        className="group flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/70 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-gray-600 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm mb-0.5">HOA & Multi-Family</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Gate cameras, LPR & community-wide security</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />
                      </Link>

                      <Link
                        to="/free-analysis"
                        className="btn-primary-gradient flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold"
                      >
                        Get Free Property Assessment <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Column 2 — All Services */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.16em] font-bold text-gray-400 mb-4">All Services</h3>
                      <div className="space-y-0.5">
                        {mainServices.map((service) => (
                          <Link
                            key={service.href}
                            to={service.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-accent/6 group-hover:border-accent/18 transition-colors">
                              <service.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-gray-900 leading-tight">{service.name}</p>
                              <p className="text-[11px] text-gray-400 leading-tight truncate">{service.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 3 — Quick Links & Trust */}
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.16em] font-bold text-gray-400 mb-4">Quick Links</h3>
                      <div className="space-y-0.5">
                        {[
                          { name: "View All Services", href: "/services",      icon: Shield },
                          { name: "Service Areas",     href: "/service-areas", icon: MapPin },
                          { name: "Reviews",           href: "/reviews",       icon: Star },
                        ].map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                          >
                            <link.icon className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors shrink-0" />
                            <span className="text-[13px] font-medium text-gray-700">{link.name}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                        {[
                          "Locally Owned & Operated",
                          "Licensed & Insured · #B03066901",
                          "24/7 Professional Monitoring",
                          "5.0 ★ Google Rating",
                        ].map((badge) => (
                          <div key={badge} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span className="text-[12px] text-gray-600 font-medium">{badge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="bg-gray-50/70 border-t border-gray-100 px-6 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <a
                      href="tel:7133879937"
                      className="flex items-center gap-2 text-[13px] font-semibold text-gray-700 hover:text-accent transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      (713) 387-9937
                    </a>
                    <a
                      href="mailto:info@texastotalsecurity.com"
                      className="text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      info@texastotalsecurity.com
                    </a>
                  </div>
                  <Link
                    to="/services"
                    className="flex items-center gap-1 text-[13px] font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    View All Services <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
                    active ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] rounded-full"
                      style={{ background: "hsl(var(--accent))" }}
                    />
                  )}
                </Link>
              );
            })}
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
              to="/qualify"
              className="btn-primary-gradient text-[13.5px] whitespace-nowrap"
              style={{ padding: "0.55rem 1.25rem", borderRadius: "0.65rem" }}
            >
              Check If You Qualify
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-[100002] lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X    className="w-5 h-5 text-gray-700" />
              : <Menu className="w-5 h-5 text-gray-700" />
            }
          </button>
        </div>

        {/* ── Mobile Menu ──────────────────────────────────── */}
        <div
          className={`lg:hidden fixed inset-0 z-[100001] bg-white transition-all duration-300 ${
            mobileOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
          style={{ overflowY: "auto", overscrollBehavior: "contain" }}
        >
          <div className="flex min-h-full flex-col px-4 pb-6 pt-20">
            <div className="mb-5 border-b border-gray-100 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Menu</p>
              <p className="mt-1 text-sm font-semibold text-gray-950">Texas Total Security</p>
            </div>

            <div className="mb-3">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(open => !open)}
                className="flex w-full items-center justify-between border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-bold text-gray-950"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="border-x border-b border-gray-200 bg-white">
                  <Link
                    to="/services"
                    className="flex items-center justify-between border-b border-gray-100 px-4 py-3 text-sm font-semibold text-accent"
                  >
                    View All Services <ArrowRight className="w-4 h-4" />
                  </Link>
                  {mainServices.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className={`flex items-center justify-between border-b border-gray-100 px-4 py-3 text-sm font-medium ${
                        location.pathname === s.href ? "bg-red-50 text-accent" : "text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <span>{s.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6 border border-gray-200">
              <Link
                to="/"
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  location.pathname === "/" ? "text-accent bg-accent/5" : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>
              <div className="border-t border-gray-100">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center border-b border-gray-100 px-4 py-3 text-sm transition-colors duration-150 font-medium last:border-b-0 ${
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

            {/* CTA */}
            <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
              <Link
                to="/qualify"
                className="block btn-primary-gradient text-center text-sm py-3.5 font-semibold"
              >
                Check If You Qualify
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
