import { useState } from "react";
import { Send } from "lucide-react";

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  showServiceType?: boolean;
}

const LeadForm = ({
  title = "Request Your Free Security Analysis",
  subtitle = "Fill out the form below and a security specialist will contact you within 24 hours.",
  showServiceType = true,
}: LeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-display font-bold text-xl mb-2 text-foreground">Thank You!</h3>
        <p className="text-muted-foreground text-sm">
          Your request has been received. A security specialist will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 sm:p-8">
      {title && <h3 className="font-display font-bold text-xl mb-1 text-foreground">{title}</h3>}
      {subtitle && <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name *"
            required
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            required
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address *"
          required
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {showServiceType && (
          <select className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
            <option value="">What type of service do you need?</option>
            <option>Alarm System Installation</option>
            <option>Security Camera Installation</option>
            <option>Alarm Monitoring</option>
            <option>System Takeover / Switch Provider</option>
            <option>HOA / Gate Cameras</option>
            <option>Commercial Security</option>
            <option>Residential Security</option>
            <option>Networking / WiFi</option>
            <option>Service & Maintenance</option>
            <option>Other</option>
          </select>
        )}
        <select className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
          <option value="">Property Type</option>
          <option>Residential Home</option>
          <option>Condo / Townhome</option>
          <option>Commercial Business</option>
          <option>HOA / Community</option>
          <option>Industrial / Warehouse</option>
          <option>Other</option>
        </select>
        <textarea
          placeholder="Tell us about your security needs..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
        />
        <button type="submit" className="w-full btn-primary-gradient flex items-center justify-center gap-2">
          <Send className="w-4 h-4" /> Submit Request
        </button>
        <p className="text-xs text-muted-foreground text-center">
          No obligation. No pressure. We'll contact you within 24 hours.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
