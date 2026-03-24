import { useState } from "react";
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
  const location = useLocation();

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm hidden md:block">
        <div className="container-tight flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-4">
            <span className="opacity-80">Houston's Trusted Security Experts — 30+ Years of Experience</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-60">LIC# B03066901</span>
            <a href="mailto:info@texastotalsecurity.com" className="opacity-80 hover:opacity-100 transition-opacity">
              info@texastotalsecurity.com
            </a>
            <a href="tel:7133879937" className="flex items-center gap-1.5 font-semibold text-accent">
              <Phone className="w-3.5 h-3.5" />
              (713) 387-9937
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container-tight flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-foreground text-lg block">Texas Total Security</span>
              <span className="text-muted-foreground text-[11px] tracking-wider uppercase">Houston, TX</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                Services <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 w-64 bg-card border border-border rounded-xl shadow-lg py-2 mt-1">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      to={s.href}
                      className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:7133879937"
              className="flex items-center gap-2 text-sm font-semibold text-accent"
            >
              <Phone className="w-4 h-4" />
              (713) 387-9937
            </a>
            <Link to="/free-analysis" className="btn-primary-gradient text-sm">
              Free Security Analysis
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="px-4 py-4 space-y-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-3 py-2">Services</p>
              {services.map((s) => (
                <Link
                  key={s.href}
                  to={s.href}
                  className="block px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.name}
                </Link>
              ))}
              <div className="border-t border-border my-3" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-3 py-2.5 text-sm rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border my-3" />
              <Link
                to="/free-analysis"
                className="block btn-primary-gradient text-center text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Free Security Analysis
              </Link>
              <a
                href="tel:7133879937"
                className="block text-center py-3 text-sm font-semibold text-accent"
              >
                Call (713) 387-9937
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
