import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown, Shield } from "lucide-react";

const services = [
  { name: "Alarm Systems", href: "/alarm-systems" },
  { name: "Security Camera Systems", href: "/security-cameras" },
  { name: "Residential Security", href: "/residential-security" },
  { name: "Commercial Security", href: "/commercial-security" },
  { name: "HOA Security Solutions", href: "/hoa-security" },
  { name: "Monitoring Services", href: "/monitoring-services" },
  { name: "Service & Maintenance", href: "/service-maintenance" },
];

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Industries", href: "/industries" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Reviews", href: "/reviews" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Resources", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs hidden lg:block">
        <div className="container-tight flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
          <span className="opacity-60">Houston's Trusted Security Experts — 30+ Years of Experience</span>
          <div className="flex items-center gap-5">
            <span className="opacity-40">LIC# B03066901</span>
            <a href="mailto:info@texastotalsecurity.com" className="opacity-60 hover:opacity-100 transition-opacity">
              info@texastotalsecurity.com
            </a>
            <a href="tel:7133879937" className="flex items-center gap-1.5 font-bold text-accent">
              <Phone className="w-3 h-3" />
              (713) 387-9937
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/98 backdrop-blur-xl shadow-[0_1px_3px_hsl(0_0%_0%/0.06)]"
            : "bg-card/90 backdrop-blur-md"
        } border-b border-border`}
      >
        <div className="container-tight flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_2px_8px_hsl(0_85%_45%/0.3)] group-hover:shadow-[0_4px_16px_hsl(0_85%_45%/0.4)] transition-shadow">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-foreground text-lg block tracking-tight">Texas Total Security</span>
              <span className="text-muted-foreground text-[10px] tracking-[0.15em] uppercase font-medium">Houston, TX</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-foreground hover:text-accent transition-colors">
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 w-72 bg-card border border-border rounded-2xl py-2 mt-2 transition-all duration-200 origin-top ${
                  servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                {services.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="block px-5 py-3 text-sm text-foreground hover:bg-secondary hover:text-accent transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:7133879937"
              className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              (713) 387-9937
            </a>
            <Link to="/free-analysis" className="btn-primary-gradient text-sm !py-2.5 !px-5">
              Free Security Analysis
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden border-t border-border bg-card overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-5 space-y-1 overflow-y-auto max-h-[75vh]">
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold px-3 py-2">Services</p>
            {services.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="block px-3 py-2.5 text-sm rounded-xl hover:bg-secondary transition-colors"
              >
                {s.name}
              </Link>
            ))}
            <div className="border-t border-border my-3" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2.5 text-sm rounded-xl transition-colors ${
                  location.pathname === link.href ? "text-accent font-medium" : "hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-border my-3" />
            <Link
              to="/free-analysis"
              className="block btn-primary-gradient text-center text-sm"
            >
              Free Security Analysis
            </Link>
            <a
              href="tel:7133879937"
              className="block text-center py-3 text-sm font-bold text-accent"
            >
              Call (713) 387-9937
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
