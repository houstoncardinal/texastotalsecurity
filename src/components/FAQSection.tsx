import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
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
      <div className="max-w-6xl mx-auto">
        <Accordion type="single" collapsible className="grid gap-3 lg:grid-cols-2 lg:items-start">
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
        <div className="mt-7 flex justify-center">
          <Link
            to="/faq"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:border-accent/30 hover:text-accent hover:shadow-md"
          >
            View the Full Security FAQ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;
