import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

const TestimonialCard = ({ name, role, text, rating = 5 }: TestimonialCardProps) => (
  <div className="glass-card p-7 sm:p-8 relative">
    <Quote className="w-8 h-8 text-accent/10 absolute top-6 right-6" />
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
      ))}
    </div>
    <p className="text-sm leading-relaxed text-muted-foreground mb-6">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
        <span className="text-xs font-bold text-accent">{name.charAt(0)}</span>
      </div>
      <div>
        <p className="font-display font-semibold text-sm text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
