interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = true }: SectionHeadingProps) => (
  <div className={`mb-12 ${centered ? "text-center max-w-2xl mx-auto" : ""}`}>
    <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">{title}</h2>
    {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
  </div>
);

export default SectionHeading;
