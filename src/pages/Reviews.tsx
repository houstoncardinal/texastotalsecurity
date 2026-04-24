import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateReviewSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Star, ExternalLink } from "lucide-react";

const homeownerReviews = [
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "I love my new security cameras — the coverage and resolution is great! The camera monitor is awesome. I can cook in the kitchen and keep an eye on the kids while they play. Also the street and driveway coverage is nice. Thank you Texas Total Security!",
  },
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "My husband and I were unhappy with our current big national alarm company. Now Texas Total Security provides us with great customer service and alarm monitoring. It was a quick simple process to switch!",
  },
  {
    name: "Homeowner",
    role: "Bellaire, TX",
    text: "During the process of building our new house in Bellaire I decided we needed to get professional security. After meeting up with the Texas Total Security team who actually came to the job site and explained what they can do, I chose them over my builder's security guy. What really stood out the most was how Texas Total Security described to me in such detail and confidence the process and exactly what I will be getting. I love the fact that when my wireless door sensor has a low battery, they can inform me and schedule a technician.",
  },
  {
    name: "Homeowner",
    role: "Houston, TX",
    text: "My friend referred me to Tim and Texas Total Security because they were pleased with the quality of security cameras and they felt safe with the new equipment. Tim came out to my home and provided me with the free security analysis. He was professional and courteous but really listened to what I needed. My husband and I decided to move forward and now I have full coverage of my home and can get notified when my staff and family arms and disarms the alarm system right on my phone. I have full control of my home!",
  },
];

const businessReviews = [
  {
    name: "Business Owner",
    role: "Houston, TX",
    text: "My business was growing so quickly that I needed to keep an eye on day to day operations at my office but, I couldn't be there all the time. Texas Total Security installed the surveillance cameras in all the right locations. Now I can be on the go and travel while getting remote access to my cameras on my cell phone or tablet. Now I spend more time with family!",
  },
];

const hoaReviews = [
  {
    name: "Property Manager",
    role: "Houston, TX",
    text: "I needed help getting video coverage and protecting our entrance and exit gates. Texas Total Security not only provided great security camera coverage so we can see who hits the gates but, provided deterrence with red and blue strobe lights. Their license plate cameras are great!",
  },
  {
    name: "HOA Board Member",
    role: "Houston, TX",
    text: "So glad we went with Texas Total Security! They have helped us with providing CCTV footage of events that HPD needed. They even dropped the memory stick at the property management's office.",
  },
];

const allReviews = [...homeownerReviews, ...businessReviews, ...hoaReviews];

const reviewSchemas = [
  generateLocalBusinessSchema(),
  generateReviewSchema(
    allReviews.map(r => ({ author: r.name, text: r.text, rating: 5, location: r.role }))
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews" },
  ]),
];

const Reviews = () => (
  <Layout>
    <SEOHead
      title="Customer Reviews | Houston's Best Local Alarm Company | Texas Total Security"
      description="Texas Total Security — rated 5 stars by Houston homeowners, businesses & HOA communities. See real reviews about our alarm systems, cameras & local monitoring."
      schemas={reviewSchemas}
    />
    <PageHero
      title="Reviews & Testimonials"
      subtitle="Hear from homeowners, business owners, and property managers who trust Texas Total Security to protect what matters most."
      showCTA={false}
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Homeowner Reviews" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {homeownerReviews.map((r, i) => <TestimonialCard key={i} {...r} />)}
        </div>

        <SectionHeading title="Business Owner Reviews" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {businessReviews.map((r, i) => <TestimonialCard key={i} {...r} />)}
        </div>

        <SectionHeading title="HOA & Property Manager Reviews" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hoaReviews.map((r, i) => <TestimonialCard key={i} {...r} />)}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-tight text-center max-w-xl mx-auto">
        <div className="flex justify-center gap-1 mb-4">
          {[1,2,3,4,5].map((i) => <Star key={i} className="w-6 h-6 fill-accent text-accent" />)}
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">Check Us Out on Google!</h2>
        <p className="text-muted-foreground mb-2">Where you can learn more about our company information, view photos of past projects, and read reviews.</p>
        <a
          href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-gradient inline-flex items-center gap-2 mt-4"
        >
          View Our Google Page <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>

    <CTABlock />
  </Layout>
);

export default Reviews;
