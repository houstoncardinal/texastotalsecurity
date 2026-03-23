import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className="bg-secondary/50 border-b border-border">
    <div className="container-tight px-4 sm:px-6 lg:px-8 py-3">
      <ol className="flex items-center gap-1.5 text-xs sm:text-sm flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        <li className="flex items-center gap-1.5" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" itemProp="item">
            <Home className="w-3.5 h-3.5" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            {item.href ? (
              <Link to={item.href} className="text-muted-foreground hover:text-foreground transition-colors" itemProp="item">
                <span itemProp="name">{item.name}</span>
              </Link>
            ) : (
              <span className="text-foreground font-medium" itemProp="name">{item.name}</span>
            )}
            <meta itemProp="position" content={String(i + 2)} />
          </li>
        ))}
      </ol>
    </div>
  </nav>
);

export default Breadcrumbs;
