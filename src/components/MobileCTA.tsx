import { Phone, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const MobileCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/98 backdrop-blur-xl border-t border-border px-4 py-3 flex gap-3">
    <a
      href="tel:7133879937"
      className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold"
    >
      <Phone className="w-4 h-4" /> Call Now
    </a>
    <Link
      to="/free-analysis"
      className="flex-1 flex items-center justify-center gap-2 btn-primary-gradient text-sm !py-3"
    >
      <FileText className="w-4 h-4" /> Free Quote
    </Link>
  </div>
);

export default MobileCTA;
