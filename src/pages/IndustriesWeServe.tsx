import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTABlock from "@/components/CTABlock";
import SectionHeading from "@/components/SectionHeading";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Users, Building2, ShoppingBag, Stethoscope, Hotel, UtensilsCrossed, Factory, Car, HardHat, Landmark, Plane, Anchor, Church, Star, Shield, Droplets, Store } from "lucide-react";

const industries = [
  { icon: Home, name: "Residential", desc: "Custom alarm and camera systems for homes of all sizes." },
  { icon: Users, name: "HOA Communities", desc: "Gate cameras, LPR, and community-wide surveillance." },
  { icon: Building2, name: "Apartment Complexes", desc: "Multi-unit security and common area cameras." },
  { icon: Store, name: "Shopping Centers", desc: "Mall and strip center loss prevention, storefront cameras, and parking lot surveillance." },
  { icon: ShoppingBag, name: "Retail Stores", desc: "Storefront security, POS area cameras, employee entrance monitoring, and after-hours alerts." },
  { icon: Stethoscope, name: "Medical & Dental", desc: "HIPAA-aware security and waiting area monitoring." },
  { icon: Hotel, name: "Hotels & Hospitality", desc: "Guest safety, hallway cameras, and property perimeter security." },
  { icon: UtensilsCrossed, name: "Restaurants", desc: "Kitchen, dining, and exterior cameras with POS area monitoring." },
  { icon: Factory, name: "Industrial Sites", desc: "Perimeter security and hazardous area monitoring." },
  { icon: Car, name: "Parking Garages", desc: "Level-by-level cameras, LPR, emergency call stations, and lighting." },
  { icon: HardHat, name: "Construction Sites", desc: "Solar-powered cameras, time-lapse, and temporary site security." },
  { icon: Landmark, name: "Government Buildings", desc: "High-security surveillance, restricted access, and compliance systems." },
  { icon: Plane, name: "Airports", desc: "Perimeter surveillance, terminal cameras, and runway monitoring." },
  { icon: Anchor, name: "Marinas", desc: "Dock cameras, boat slip monitoring, and waterfront perimeter security." },
  { icon: Star, name: "Valet Operations", desc: "Vehicle tracking cameras, key management, and customer documentation." },
  { icon: Church, name: "Places of Worship", desc: "Interior/exterior cameras, entry monitoring, and event security." },
  { icon: Shield, name: "Police & Fire Stations", desc: "Perimeter security, parking lot surveillance, and evidence room monitoring." },
  { icon: Landmark, name: "Town Halls & Government", desc: "Council chamber cameras, public-facing counter monitoring, and 24/7 perimeter surveillance." },
  { icon: Droplets, name: "Water Treatment Facilities", desc: "Critical infrastructure perimeter security and remote monitoring for water and utility plants." },
];

const industriesSchemas = [
  generateLocalBusinessSchema(),
  generateItemListSchema(
    industries.map((ind, i) => ({
      name: ind.name,
      description: ind.desc,
      url: "/industries",
      position: i + 1,
    }))
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Industries We Serve", href: "/industries" },
  ]),
];

const IndustriesWeServe = () => (
  <Layout>
    <SEOHead
      title="Security Systems for Every Industry Houston TX | HOA, Apartment Complex & Commercial | Texas Total Security"
      description="Security systems for every industry in Houston. HOA security camera systems, apartment complex surveillance, neighborhood security, commercial alarm systems & security poles. Locally owned & operated."
      schemas={industriesSchemas}
    />
    <PageHero
      title="Industries We Serve"
      subtitle="Custom security solutions for every sector. From residential homes to industrial complexes, we have the expertise to protect any property type."
    />

    <section className="section-padding">
      <div className="container-tight">
        <SectionHeading title="Security for Every Industry" subtitle="Expert security solutions protecting Houston's diverse business landscape." />
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
