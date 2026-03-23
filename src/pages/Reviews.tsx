import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { Star, ExternalLink } from "lucide-react";

const homeownerReviews = [
  { name: "Michael & Sarah T.", role: "Homeowners, Sugar Land", text: "Texas Total Security designed a system that perfectly fits our home. Their team was professional, thorough, and the monitoring gives us real peace of mind. We've recommended them to all our neighbors." },
  { name: "Carlos D.", role: "Homeowner, Katy", text: "After dealing with a national company for years, switching to Texas Total Security was the best decision. Local monitoring, real people answering the phone, and they actually showed up when we needed service." },
  { name: "Amanda P.", role: "Homeowner, The Woodlands", text: "They installed cameras and an alarm system throughout our home. The technicians were incredibly neat and professional. The app is easy to use and I love being able to check on things when we're traveling." },
];

const businessReviews = [
  { name: "James L.", role: "Restaurant Owner, Houston", text: "We have cameras in three restaurant locations, all managed through one app. Texas Total Security designed a system that covers every angle — kitchen, dining, register, and parking. Outstanding work." },
  { name: "Patricia H.", role: "Medical Office Manager, Bellaire", text: "Security and patient privacy are critical in our practice. The team understood our requirements perfectly and designed a system that meets all our needs without being obtrusive." },
  { name: "Mark S.", role: "Warehouse Manager, Pasadena", text: "Our 40,000 sq ft warehouse needed comprehensive coverage. They installed cameras at every access point and the active deterrence cameras on the perimeter have stopped multiple attempted break-ins." },
];

const hoaReviews = [
  { name: "Lisa M.", role: "HOA Board President, Katy", text: "The gate camera system they installed for our community has dramatically reduced incidents. Their team is responsive and the technology is impressive. The board unanimously approves of the service." },
  { name: "Robert K.", role: "Property Manager, Sugar Land", text: "Managing multiple communities means I need reliable systems and a vendor I can count on. Texas Total Security delivers on both fronts — their support is exceptional and response time is unmatched." },
  { name: "Jennifer W.", role: "HOA Board Member, Cypress", text: "The license plate cameras have been a game-changer. We can track every vehicle and provide footage to law enforcement. The investment has paid for itself many times over in reduced incidents." },
];

const Reviews = () => (
  <Layout>
    <PageHero
      title="Reviews & Testimonials"
      subtitle="Hear from homeowners, business owners, and property managers who trust Texas Total Security to protect what matters most."
      showCTA={false}
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Homeowner Reviews" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {homeownerReviews.map((r) => <TestimonialCard key={r.name} {...r} />)}
        </div>

        <SectionHeading title="Business Owner Reviews" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {businessReviews.map((r) => <TestimonialCard key={r.name} {...r} />)}
        </div>

        <SectionHeading title="HOA & Property Manager Reviews" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hoaReviews.map((r) => <TestimonialCard key={r.name} {...r} />)}
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-tight text-center max-w-xl mx-auto">
        <div className="flex justify-center gap-1 mb-4">
          {[1,2,3,4,5].map((i) => <Star key={i} className="w-6 h-6 fill-amber text-amber" />)}
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">Love Your Texas Total Security System?</h2>
        <p className="text-muted-foreground mb-6">Help other Houston homeowners and businesses find trusted security. Leave us a review on Google.</p>
        <a
          href="https://www.google.com/search?q=Texas+Total+Security+Houston+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-gradient inline-flex items-center gap-2"
        >
          Leave a Google Review <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>

    <CTABlock />
  </Layout>
);

export default Reviews;
