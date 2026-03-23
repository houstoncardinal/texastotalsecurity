import { Shield, Clock, Users, MapPin } from "lucide-react";

const items = [
  { icon: Clock, label: "30+ Years Experience" },
  { icon: MapPin, label: "Houston Local" },
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Users, label: "Residential & Commercial" },
];

const TrustBar = () => (
  <section className="bg-secondary py-6 border-y border-border">
    <div className="container-tight px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-center gap-2.5 py-2">
            <item.icon className="w-5 h-5 text-accent shrink-0" />
            <span className="text-sm font-semibold text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
