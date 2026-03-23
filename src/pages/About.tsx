import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import { CheckCircle2, Shield, Users, MapPin, Clock, HeadphonesIcon } from "lucide-react";

const values = [
  { icon: MapPin, title: "Houston-Born & Operated", desc: "We live and work in the same communities we protect. Our roots in Houston run deep — over three decades of serving this city." },
  { icon: Shield, title: "Never Sell Your Contract", desc: "National alarm companies buy and sell contracts constantly. We never have and never will. Your account stays with us." },
  { icon: HeadphonesIcon, title: "In-House Monitoring", desc: "Our monitoring center is local. When an alarm triggers, local operators dispatch local authorities — fast." },
  { icon: Users, title: "Personalized Service", desc: "You're not a ticket number. You'll know your technician by name, and they'll know your system inside and out." },
  { icon: Clock, title: "Fast, Reliable Response", desc: "When you need service or have a question, you talk to a real person who can help — immediately." },
  { icon: CheckCircle2, title: "Custom System Design", desc: "We don't sell cookie-cutter packages. Every system is designed for your specific property, risks, and goals." },
];

const About = () => (
  <Layout>
    <PageHero
      title="Houston's Security Experts Since 1994"
      subtitle="For over three decades, Texas Total Security has been designing, installing, and monitoring custom security systems for homes, businesses, and communities across the greater Houston area."
    />

    <section className="section-padding">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
              A Different Kind of Security Company
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Texas Total Security was founded with a simple belief: security should be personal. Not mass-produced. Not outsourced. Not sold off to the highest bidder.
              </p>
              <p>
                While national alarm companies treat customers as contract commodities — buying, selling, and transferring accounts without notice — we've built lasting relationships with every client. When you choose Texas Total Security, your monitoring stays local, your service stays personal, and your protection stays consistent.
              </p>
              <p>
                We design every system from scratch based on your property's unique layout, risks, and needs. Our certified technicians install with precision and our local monitoring center watches over your property 24/7/365. And when you need support, you get a real person — not an automated menu.
              </p>
              <p>
                From single-family homes in Sugar Land to commercial complexes in downtown Houston, from HOA communities in Katy to industrial facilities along the Ship Channel — we've seen it all and protected it all. That experience is what makes us Houston's trusted security partner.
              </p>
            </div>
          </div>
          <div className="bg-secondary rounded-2xl p-8 sm:p-10">
            <h3 className="font-display font-bold text-xl text-foreground mb-6">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "30+", label: "Years in Business" },
                { num: "1000s", label: "Systems Installed" },
                { num: "24/7", label: "Local Monitoring" },
                { num: "100%", label: "Locally Owned" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-display font-bold text-accent">{stat.num}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <SectionHeading title="What Sets Us Apart" subtitle="The principles that have guided our company for over 30 years." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4">
              <v.icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABlock />
  </Layout>
);

export default About;
