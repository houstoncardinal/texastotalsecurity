import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const ServiceCard = ({ icon: Icon, title, description, href }: ServiceCardProps) => (
  <Link to={href} className="glass-card p-7 sm:p-8 group block relative overflow-hidden">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "var(--gradient-card-hover)" }} />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-display font-bold text-lg mb-2.5 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-300">
        Learn More <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  </Link>
);

export default ServiceCard;
