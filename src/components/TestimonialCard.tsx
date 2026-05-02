import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

const TestimonialCard = ({ name, role, text, rating = 5 }: TestimonialCardProps) => (
  <div
    className="flex flex-col bg-white border border-gray-100 rounded-2xl p-7 sm:p-8"
    style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05)" }}
  >
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" style={{ color: "hsl(var(--accent))" }} />
      ))}
    </div>
    <p className="text-[15px] leading-relaxed text-gray-600 flex-1 mb-7">
      &ldquo;{text}&rdquo;
    </p>
    <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-gray-600">{name.charAt(0)}</span>
      </div>
      <div>
        <p className="font-display font-semibold text-sm text-gray-900 leading-none mb-1">{name}</p>
        <p className="text-xs text-gray-400 font-medium">{role}</p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
