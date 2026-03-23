import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

const FAQSection = ({ title = "Frequently Asked Questions", subtitle, items }: FAQSectionProps) => (
  <section className="section-padding">
    <div className="container-tight">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-none">
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
