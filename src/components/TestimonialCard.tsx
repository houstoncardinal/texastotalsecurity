import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

const TestimonialCard = ({ name, role, text, rating = 5 }: TestimonialCardProps) => (
  <div className="glass-card p-6 sm:p-8">
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber text-amber" />
      ))}
    </div>
    <p className="text-sm leading-relaxed text-muted-foreground mb-6 italic">"{text}"</p>
    <div>
      <p className="font-display font-semibold text-sm text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </div>
);

export default TestimonialCard;
