import { Shield, Clock, Users, MapPin, Award } from "lucide-react";

const items = [
  { icon: Clock, label: "30+ Years Experience" },
  { icon: MapPin, label: "Houston Local" },
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Users, label: "Residential & Commercial" },
  { icon: Award, label: "LIC# B03066901" },
];

const TrustBar = () => (
  <section className="bg-card border-y border-border relative">
    <div className="container-tight px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <item.icon className="w-4 h-4 text-accent shrink-0" />
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
