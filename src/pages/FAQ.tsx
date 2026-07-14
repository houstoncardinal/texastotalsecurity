import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import {
  ArrowRight,
  Bell,
  Building2,
  Camera,
  CheckCircle2,
  Radio,
  Shield,
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: ReactNode;
  answerText: string;
};

type FAQGroup = {
  title: string;
  intro: string;
  icon: typeof Shield;
  items: FAQItem[];
};

const faqGroups: FAQGroup[] = [
  {
    title: "Company & Process",
    intro: "How Texas Total Security works and what makes the company different.",
    icon: Shield,
    items: [
      {
        question: "What makes Texas Total Security different from national alarm companies?",
        answerText: "Texas Total Security is Houston-owned, licensed, and locally accountable. Customers can reach the owner directly, the company manages the customer relationship instead of sending people through a national call center.",
        answer: "We are Houston-owned, licensed, and reachable. Customers can talk to the owner directly, and your account relationship stays with Texas Total Security instead of a national call center.",
      },
      {
        question: "What happens during a free property assessment?",
        answerText: "Texas Total Security reviews the property layout, existing equipment, entry points, camera angles, blind spots, monitoring needs, and risk areas, then provides a practical recommendation with no obligation.",
        answer: (
          <span>
            We review your layout, existing equipment, entry points, blind spots, camera angles, monitoring needs, and risk areas. Then we give you a practical recommendation with no obligation.{" "}
            <Link to="/property-assessment" className="text-red-600 font-semibold hover:underline">Request a free property assessment</Link>.
          </span>
        ),
      },
      {
        question: "Do you serve homeowners, businesses, HOAs, and property managers?",
        answerText: "Yes. Texas Total Security serves Houston homeowners, commercial properties, HOAs, apartment communities, multi-family properties, property managers, and multi-site operators.",
        answer: (
          <span>
            Yes. We work with Houston homeowners, businesses, HOAs, apartment communities, multi-family properties, property managers, and multi-site operators.{" "}
            <Link to="/services" className="text-red-600 font-semibold hover:underline">See all services</Link>.
          </span>
        ),
      },
      {
        question: "Are you licensed and insured?",
        answerText: "Yes. Texas Total Security is licensed and insured for security work in Texas and provides professional alarm, camera, monitoring, and security system services in the Houston area.",
        answer: "Yes. We are licensed and insured for professional security work in Texas, including alarm systems, camera systems, monitoring, and security system services in the Houston area.",
      },
    ],
  },
  {
    title: "Alarm Systems & Takeovers",
    intro: "Questions about new alarms, existing equipment, and switching providers.",
    icon: Bell,
    items: [
      {
        question: "Can you take over my existing alarm system?",
        answerText: "In many cases, yes. Texas Total Security evaluates existing panels, sensors, keypads, wiring, and communicators, then determines what can be reused, repaired, upgraded, or replaced.",
        answer: (
          <span>
            In many cases, yes. We evaluate your panel, sensors, keypads, wiring, and communicator, then explain what can be reused, repaired, upgraded, or replaced.{" "}
            <Link to="/switch-my-alarm" className="text-red-600 font-semibold hover:underline">Learn about alarm takeovers</Link>.
          </span>
        ),
      },
      {
        question: "Do I have to replace everything if my alarm system is old?",
        answerText: "Not always. Compatible Honeywell, DSC, 2GIG, Resideo, and similar equipment may be reusable, but Texas Total Security will recommend replacement when equipment is unreliable, outdated, or not worth keeping.",
        answer: "Not always. Compatible Honeywell, DSC, 2GIG, Resideo, and similar equipment may be reusable. If something is unreliable, outdated, or not worth keeping, we will tell you directly.",
      },
      {
        question: "Do your alarm systems work if the internet goes down?",
        answerText: "Yes. Monitored alarm systems from Texas Total Security include backup communication options and battery backup for power interruptions, and include battery backup for power interruptions.",
        answer: "Yes. Our monitored alarm systems include backup communication options and battery backup for power interruptions, with battery backup for power interruptions.",
      },
      {
        question: "Can switching alarm companies lower my monitoring bill?",
        answerText: "Many customers who switch to Texas Total Security pay less for monthly alarm monitoring, especially when compatible existing equipment can be reused.",
        answer: "Often, yes. Many customers who switch pay less for monthly alarm monitoring, especially when their existing compatible equipment can be reused.",
      },
    ],
  },
  {
    title: "Security Cameras & License Plate Reader (LPR)",
    intro: "Camera system design, recording, remote viewing, and license plate capture.",
    icon: Camera,
    items: [
      {
        question: "Do you install hardwired security camera systems?",
        answerText: "Yes. Texas Total Security specializes in hardwired camera systems, including 4K cameras, NVR recording, remote viewing, outdoor cameras, commercial surveillance, HOA cameras, and active deterrence systems.",
        answer: (
          <span>
            Yes. We specialize in hardwired camera systems with 4K cameras, NVR recording, remote viewing, outdoor coverage, commercial surveillance, HOA cameras, and active deterrence.{" "}
            <Link to="/security-cameras" className="text-red-600 font-semibold hover:underline">Explore security camera systems</Link>.
          </span>
        ),
      },
      {
        question: "Can you install license plate reader cameras?",
        answerText: "Yes. Texas Total Security installs License Plate Reader (LPR) cameras for gates, driveways, parking lots, apartment communities, commercial properties, and HOA entrances, including nighttime plate capture when designed correctly.",
        answer: "Yes. We install License Plate Reader (LPR) cameras for gates, driveways, parking lots, apartment communities, commercial properties, and HOA entrances, including nighttime plate capture when designed correctly.",
      },
      {
        question: "Can I view my cameras remotely?",
        answerText: "Yes. Authorized users can view live and recorded camera footage from a phone, tablet, or computer, with permissions configured around the property owner's or manager's needs.",
        answer: "Yes. Authorized users can view live and recorded footage from a phone, tablet, or computer. We configure permissions around the property owner's or manager's needs.",
      },
      {
        question: "What are active deterrence cameras?",
        answerText: "Active deterrence cameras combine video recording with visible and audible deterrents such as strobes, sirens, two-way audio, or alerts to discourage trespassing, dumping, vandalism, and after-hours activity.",
        answer: "Active deterrence cameras combine recording with visible or audible deterrents like strobes, sirens, two-way audio, or alerts to discourage trespassing, dumping, vandalism, and after-hours activity.",
      },
    ],
  },
  {
    title: "Commercial, HOA & Property Management",
    intro: "Security for businesses, communities, apartment properties, and managed portfolios.",
    icon: Building2,
    items: [
      {
        question: "What types of commercial properties do you secure?",
        answerText: "Texas Total Security secures offices, retail spaces, warehouses, industrial facilities, parking lots, multi-site businesses, construction-related properties, and other Houston commercial locations.",
        answer: (
          <span>
            We secure offices, retail spaces, warehouses, industrial facilities, parking lots, multi-site businesses, and other Houston commercial properties.{" "}
            <Link to="/commercial" className="text-red-600 font-semibold hover:underline">Explore commercial security</Link>.
          </span>
        ),
      },
      {
        question: "Do you work with HOA boards and property managers?",
        answerText: "Yes. Texas Total Security designs camera, License Plate Reader (LPR), alarm, and monitoring systems for HOAs, gated communities, apartment complexes, condominium communities, and managed property portfolios.",
        answer: (
          <span>
            Yes. We design camera, License Plate Reader (LPR), alarm, and monitoring systems for HOAs, gated communities, apartment complexes, condominium communities, and managed property portfolios.{" "}
            <Link to="/hoa-security" className="text-red-600 font-semibold hover:underline">Explore HOA security</Link>.
          </span>
        ),
      },
      {
        question: "What are the highest-priority camera areas for communities?",
        answerText: "Common high-priority areas include gate entrances and exits, mailbox and package areas, pool areas, playgrounds, dog parks, dumpster areas, parking areas, and other common spaces with incidents or liability concerns.",
        answer: "High-priority areas often include gate entrances and exits, mailbox and package areas, pools, playgrounds, dog parks, dumpster areas, parking areas, and common spaces with incident or liability concerns.",
      },
      {
        question: "Can you manage camera access across multiple properties?",
        answerText: "Yes. Multi-property camera systems can be organized so property managers and authorized users can access live and recorded video across multiple locations from a single platform.",
        answer: "Yes. We can organize multi-property camera systems so property managers and authorized users can access live and recorded video across multiple locations from a single platform.",
      },
    ],
  },
  {
    title: "Monitoring, Service Areas & Next Steps",
    intro: "Coverage, monitoring, timelines, and how to get started.",
    icon: Radio,
    items: [
      {
        question: "Do you provide 24/7 alarm monitoring?",
        answerText: "Yes. Texas Total Security provides 24/7 professional alarm monitoring, with alarm signals handled through a certified monitoring center and account support managed by Texas Total Security.",
        answer: (
          <span>
            Yes. We provide 24/7 professional alarm monitoring, with alarm signals handled through a certified monitoring center and account support managed by Texas Total Security.{" "}
            <Link to="/monitoring-services" className="text-red-600 font-semibold hover:underline">Learn about monitoring</Link>.
          </span>
        ),
      },
      {
        question: "What areas do you serve?",
        answerText: "Texas Total Security serves Houston and surrounding areas, including River Oaks, Memorial, the Villages, Tanglewood, Galleria, Energy Corridor, Bellaire, West University, Upper Kirby, Montrose, Rice Military, and other Houston-area communities.",
        answer: (
          <span>
            We serve Houston and surrounding areas, including River Oaks, Memorial, the Villages, Tanglewood, Galleria, Energy Corridor, Bellaire, West University, Upper Kirby, Montrose, Rice Military, and more.{" "}
            <Link to="/service-areas" className="text-red-600 font-semibold hover:underline">View service areas</Link>.
          </span>
        ),
      },
      {
        question: "How long does installation take?",
        answerText: "Installation timing depends on the scope. Many alarm takeovers are completed in a single visit, while commercial, HOA, and multi-building camera projects may take several days or longer depending on property size.",
        answer: "Timing depends on scope. Many alarm takeovers are completed in a single visit, while commercial, HOA, and multi-building camera projects may take several days or longer depending on property size.",
      },
      {
        question: "How do I get started?",
        answerText: "The best next step is a free property assessment or pre-qualify request. Texas Total Security will review the property, goals, and existing equipment, then recommend the right alarm, camera, monitoring, or HOA security path.",
        answer: (
          <span>
            Start with a free property assessment or a quick pre-qualify request. We will review the property, goals, and existing equipment, then recommend the right path.{" "}
            <Link to="/pre-qualify" className="text-red-600 font-semibold hover:underline">Pre-Qualify Now</Link>.
          </span>
        ),
      },
    ],
  },
];

const schemaFaqs = faqGroups.flatMap(group => group.items.map(item => ({
  question: item.question,
  answer: item.answerText,
})));

const FAQ = () => {
  const schemas = [
    generateFAQSchema(schemaFaqs),
    generateBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "FAQ", href: "/faq" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Security System FAQ | Texas Total Security Houston"
        description="Answers about Texas Total Security alarm systems, security cameras, HOA security, commercial security, 24/7 monitoring, alarm takeovers, service areas, and free assessments."
        schemas={schemas}
      />

      <section className="relative overflow-hidden bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-45">
          <img src="/imgi_14_upscale_gate_TTS.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/65" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-200">
            <Shield className="h-3.5 w-3.5" />
            Texas Total Security FAQ
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
            Clear answers about alarms, cameras, monitoring, and Houston security systems.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            Use this page to understand how we design systems, take over existing alarms, support HOAs and businesses, and help Houston-area properties choose the right protection.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/property-assessment" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold">
              Request Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-6 py-3 text-sm font-bold text-white hover:bg-white/12">
              View Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-600">FAQ Topics</div>
              <div className="mt-4 space-y-2">
                {faqGroups.map(group => (
                  <a key={group.title} href={`#${group.title.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-white hover:text-red-600">
                    <group.icon className="h-4 w-4" />
                    {group.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {faqGroups.map((group, groupIndex) => (
              <section key={group.title} id={group.title.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")} className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-[-0.03em] text-gray-950">{group.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{group.intro}</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {group.items.map((item, itemIndex) => (
                    <AccordionItem key={item.question} value={`faq-${groupIndex}-${itemIndex}`} className="rounded-lg border border-gray-200 px-4">
                      <AccordionTrigger className="py-4 text-left text-sm font-bold text-gray-950 hover:text-red-600 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-950">
              <CheckCircle2 className="h-4 w-4 text-red-600" />
              Still have a property-specific question?
            </div>
            <p className="mt-1 text-sm text-gray-500">Tell us about the property and we will help you choose the right next step.</p>
          </div>
          <Link to="/pre-qualify" className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-3 text-sm font-bold">
            Pre-Qualify Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
