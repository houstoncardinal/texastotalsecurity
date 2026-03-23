import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield } from "lucide-react";
import { cities } from "@/lib/cityData";

const Footer = () => (
  <footer className="section-dark">
    <div className="container-tight px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-primary-foreground/10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Texas Total Security</span>
          </div>
          <p className="text-sm leading-relaxed opacity-70 mb-4">
            Houston's trusted security experts for over 30 years. Custom alarm, surveillance, and monitoring solutions for homes, businesses, and communities.
          </p>
          <p className="text-xs opacity-50">LIC# B03066901</p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2">
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
                <Link to={l.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2">
            {[
              { name: "About Us", href: "/about" },
              { name: "Industries", href: "/industries" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "Reviews", href: "/reviews" },
              { name: "Service Areas", href: "/service-areas" },
              { name: "Blog & Resources", href: "/blog" },
              { name: "Contact", href: "/contact" },
              { name: "Free Security Analysis", href: "/free-analysis" },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Service Areas</h4>
          <ul className="space-y-2">
            {cities.slice(0, 8).map((city) => (
              <li key={city.slug}>
                <Link to={`/${city.slug}-security-systems`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {city.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/service-areas" className="text-sm text-accent hover:opacity-80 transition-opacity">
                View All Areas →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3">
            <li>
              <a href="tel:7133879937" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4 text-accent" /> (713) 387-9937
              </a>
            </li>
            <li>
              <a href="mailto:info@texastotalsecurity.com" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4 text-accent" /> info@texastotalsecurity.com
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm opacity-70">
              <MapPin className="w-4 h-4 text-accent mt-0.5" />
              <span>Serving Houston &<br />Surrounding Areas</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-8 pb-4 gap-4">
        <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} Texas Total Security. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs opacity-50">
          <span>Licensed & Insured</span>
          <span>•</span>
          <span>LIC# B03066901</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
