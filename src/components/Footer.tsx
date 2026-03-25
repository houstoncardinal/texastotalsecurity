import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, ArrowRight } from "lucide-react";
import { cities } from "@/lib/cityData";

const Footer = () => (
  <footer className="relative overflow-hidden" style={{ background: "var(--gradient-dark-section)" }}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(0_85%_45%/0.06),transparent_60%)]" />

    {/* CTA strip */}
    <div className="relative z-10 border-b border-primary-foreground/10">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-bold text-primary-foreground text-xl mb-1">Ready to Secure Your Property?</h3>
          <p className="text-primary-foreground/50 text-sm">Get a free onsite security analysis — no obligation.</p>
        </div>
        <Link to="/free-analysis" className="btn-primary-gradient inline-flex items-center gap-2 text-sm whitespace-nowrap">
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>

    <div className="container-tight px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-primary-foreground text-lg">Texas Total Security</span>
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/50 mb-4">
            Houston's trusted security experts for over 30 years. Custom alarm, surveillance, and monitoring solutions.
          </p>
          <p className="text-xs text-primary-foreground/30">LIC# B03066901</p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-primary-foreground/70 mb-5">Services</h4>
          <ul className="space-y-2.5">
            {[
              { name: "Alarm Systems", href: "/alarm-systems" },
              { name: "Security Cameras", href: "/security-cameras" },
              { name: "Residential", href: "/residential-security" },
              { name: "Commercial", href: "/commercial-security" },
              { name: "HOA Solutions", href: "/hoa-security" },
              { name: "Monitoring", href: "/monitoring-services" },
              { name: "Service & Maintenance", href: "/service-maintenance" },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-sm text-primary-foreground/40 hover:text-accent transition-colors">{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-primary-foreground/70 mb-5">Company</h4>
          <ul className="space-y-2.5">
            {[
              { name: "About Us", href: "/about" },
              { name: "Industries", href: "/industries" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "Reviews", href: "/reviews" },
              { name: "Service Areas", href: "/service-areas" },
              { name: "Resources", href: "/blog" },
              { name: "Contact", href: "/contact" },
              { name: "Free Analysis", href: "/free-analysis" },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-sm text-primary-foreground/40 hover:text-accent transition-colors">{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-primary-foreground/70 mb-5">Service Areas</h4>
          <ul className="space-y-2.5">
            {cities.slice(0, 8).map((city) => (
              <li key={city.slug}>
                <Link to={`/${city.slug}-security-systems`} className="text-sm text-primary-foreground/40 hover:text-accent transition-colors">
                  {city.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/service-areas" className="text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                View All Areas →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-primary-foreground/70 mb-5">Contact</h4>
          <ul className="space-y-4">
            <li>
              <a href="tel:7133879937" className="flex items-center gap-2.5 text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent shrink-0" /> (713) 387-9937
              </a>
            </li>
            <li>
              <a href="mailto:info@texastotalsecurity.com" className="flex items-center gap-2.5 text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-accent shrink-0" /> info@texastotalsecurity.com
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-primary-foreground/40">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>11331 Richmond Ave. #102<br />Houston, TX 77082</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-t border-primary-foreground/8 gap-4">
        <p className="text-xs text-primary-foreground/30">&copy; {new Date().getFullYear()} Texas Total Security. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-primary-foreground/30">
          <span>Licensed & Insured</span>
          <span className="text-primary-foreground/15">•</span>
          <span>LIC# B03066901</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
