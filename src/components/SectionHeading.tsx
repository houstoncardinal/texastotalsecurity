interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = true, light = false }: SectionHeadingProps) => (
  <div className={`mb-14 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}>
    <div className={`divider-accent ${centered ? "" : "!mx-0"}`} />
    <h2 className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold leading-tight mb-4 ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-base leading-relaxed ${light ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{subtitle}</p>}
  </div>
);

export default SectionHeading;
