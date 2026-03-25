import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";

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
      <SectionHeading title={title} subtitle={subtitle} />
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card-static px-7 border-none">
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:text-accent hover:no-underline py-6 transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6">
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
