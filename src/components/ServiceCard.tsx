import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const ServiceCard = ({ icon: Icon, title, description, href }: ServiceCardProps) => (
  <Link
    to={href}
    className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-7 sm:p-8 overflow-hidden relative"
    style={{
      boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)",
      transition: "box-shadow 0.3s ease, transform 0.3s ease",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.05), 0 16px 40px rgba(0,0,0,0.09)";
      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)";
      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
    }}
  >
    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-accent/8 transition-colors duration-300 border border-gray-100">
      <Icon className="w-5 h-5 text-gray-700 group-hover:text-accent transition-colors duration-300" />
    </div>
    <h3 className="font-display font-bold text-[17px] text-gray-900 leading-snug mb-3 tracking-tight">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">{description}</p>
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-300">
      Learn More <ArrowRight className="w-4 h-4" />
    </span>
  </Link>
);

export default ServiceCard;
