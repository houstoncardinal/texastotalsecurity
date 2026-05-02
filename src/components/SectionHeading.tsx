interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  eyebrow?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  light = false,
  eyebrow,
}: SectionHeadingProps) => (
  <div className={`mb-16 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}>
    {eyebrow && (
      <span
        className={`block text-[11px] font-bold tracking-[0.18em] uppercase mb-4 ${
          light ? "text-accent" : "text-accent"
        }`}
      >
        {eyebrow}
      </span>
    )}
    <div
      className={`w-8 h-[2px] rounded-full mb-5 ${centered ? "mx-auto" : ""}`}
      style={{ background: "hsl(var(--accent))" }}
    />
    <h2
      className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold leading-[1.08] tracking-tight mb-5 ${
        light ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={`text-[1.0625rem] leading-relaxed ${centered ? "max-w-2xl mx-auto" : "max-w-2xl"} ${
          light ? "text-white/48" : "text-gray-500"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
