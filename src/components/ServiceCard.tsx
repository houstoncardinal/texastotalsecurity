import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const ServiceCard = ({ icon: Icon, title, description, href }: ServiceCardProps) => (
  <Link to={href} className="glass-card p-6 sm:p-8 group block">
    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
      <Icon className="w-6 h-6 text-accent" />
    </div>
    <h3 className="font-display font-bold text-lg mb-2 text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
      Learn More <ArrowRight className="w-4 h-4" />
    </span>
  </Link>
);

export default ServiceCard;
