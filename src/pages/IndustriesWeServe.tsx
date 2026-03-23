import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Users, Building2, ShoppingBag, Stethoscope, GraduationCap, Hotel, UtensilsCrossed, Factory, Car, HardHat, Landmark, Plane, Anchor, Church, Star } from "lucide-react";

const industries = [
  { icon: Home, name: "Residential", desc: "Custom alarm and camera systems for homes of all sizes." },
  { icon: Users, name: "HOA Communities", desc: "Gate cameras, LPR, and community-wide surveillance." },
  { icon: Building2, name: "Apartment Complexes", desc: "Multi-unit security, access control, and common area cameras." },
  { icon: ShoppingBag, name: "Retail Centers", desc: "Loss prevention, storefront cameras, and parking lot surveillance." },
  { icon: Stethoscope, name: "Medical & Dental", desc: "HIPAA-aware security, access control, and waiting area monitoring." },
  { icon: GraduationCap, name: "Schools & Daycare", desc: "Campus surveillance, entry control, and emergency notification." },
  { icon: Hotel, name: "Hotels & Hospitality", desc: "Guest safety, hallway cameras, and property perimeter security." },
  { icon: UtensilsCrossed, name: "Restaurants", desc: "Kitchen, dining, and exterior cameras with POS area monitoring." },
  { icon: Factory, name: "Industrial Sites", desc: "Perimeter security, hazardous area monitoring, and access control." },
  { icon: Car, name: "Parking Garages", desc: "Level-by-level cameras, LPR, emergency call stations, and lighting." },
  { icon: HardHat, name: "Construction Sites", desc: "Solar-powered cameras, time-lapse, and temporary site security." },
  { icon: Landmark, name: "Government Buildings", desc: "High-security surveillance, restricted access, and compliance systems." },
  { icon: Plane, name: "Airports", desc: "Perimeter surveillance, terminal cameras, and runway monitoring." },
  { icon: Anchor, name: "Marinas", desc: "Dock cameras, boat slip monitoring, and waterfront perimeter security." },
  { icon: Star, name: "Valet Operations", desc: "Vehicle tracking cameras, key management, and customer documentation." },
  { icon: Church, name: "Places of Worship", desc: "Interior/exterior cameras, entry monitoring, and event security." },
];

const IndustriesWeServe = () => (
  <Layout>
    <PageHero
      title="Industries We Serve"
      subtitle="Custom security solutions for every sector. From residential homes to industrial complexes, we have the expertise to protect any property type."
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Security for Every Industry" subtitle="Over 30 years of experience protecting Houston's diverse business landscape." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => (
            <div key={ind.name} className="glass-card p-6 group">
              <ind.icon className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">{ind.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTABlock title="Need Security for Your Industry?" subtitle="Every industry has unique security challenges. Let's discuss yours." />
  </Layout>
);

export default IndustriesWeServe;
