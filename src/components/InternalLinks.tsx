import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface LinkItem {
  label: string;
  href: string;
}

interface InternalLinksProps {
  title?: string;
  links: LinkItem[];
}

const InternalLinks = ({ title = "Related Services", links }: InternalLinksProps) => (
  <section className="section-padding bg-secondary/50">
    <div className="container-tight">
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">{title}</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {links.map(link => (
          <Link
            key={link.href}
            to={link.href}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            {link.label} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default InternalLinks;
