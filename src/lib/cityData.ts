// Programmatic SEO: unique city data for each service area
// All locations are Houston inner-loop / near-loop neighborhoods per company focus

export interface CityData {
  slug: string;
  name: string;
  county: string;
  population: string;
  intro: string;
  securityContext: string;
  neighborhoods: string[];
  services: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const cities: CityData[] = [
  {
    slug: "houston",
    name: "Houston",
    county: "Harris County",
    population: "2.3 million",
    intro: "Houston's inner-loop and near-loop neighborhoods represent the city's most prestigious residential and commercial corridors. From River Oaks and the Villages to Bellaire, West University, and the Energy Corridor — these communities demand security systems that match their standards: discreet, hardwired, and professionally monitored.",
    securityContext: "Property crime in Houston's affluent inner-loop neighborhoods disproportionately targets high-value homes and vehicles. Package theft, catalytic converter theft, and opportunistic burglaries are rising concerns. Professionally monitored alarm systems, hard-wired 4K cameras, and license plate recognition at driveways provide the multi-layer protection these neighborhoods require.",
    neighborhoods: ["River Oaks", "The Villages", "Galleria / Tanglewood", "Energy Corridor", "Bellaire", "West University Place", "Spring Valley", "Rice Military", "Upper Kirby", "Montrose", "Medical Center", "Downtown"],
    services: ["alarm system installation", "hard-wired security camera installation", "24/7 alarm monitoring", "commercial security", "residential security", "HOA gate cameras", "license plate recognition", "active deterrence systems"],
    faqs: [
      { question: "What security system is best for a Houston inner-loop home?", answer: "For Houston's affluent inner-loop homes, we recommend a layered system: a professionally monitored alarm with cellular backup, hard-wired 4K cameras covering all entry points and driveways, and license plate recognition at the driveway. Texas Total Security provides a free onsite assessment to design a system custom to your property." },
      { question: "How much does alarm installation cost in Houston?", answer: "Costs vary based on property size, number of cameras, and monitoring features. We provide free onsite evaluations and transparent pricing with no hidden fees. Call (713) 387-9937 for a custom quote." },
      { question: "Do you install security cameras in Houston's high-end neighborhoods?", answer: "Yes — this is our primary focus. We specialize in discreet, professional-grade security camera installation in River Oaks, the Villages, Bellaire, West University, Galleria, and surrounding inner-loop communities. All installations are architecturally sensitive and designed for long-term performance." },
      { question: "What makes Texas Total Security different from national alarm companies?", answer: "We are locally owned and operated — not a franchise. You talk to the owner directly, your account is managed by Texas Total Security, and our technicians are experienced in Houston's specific neighborhoods, building styles, and HOA requirements." },
    ],
    metaTitle: "Houston Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Professional alarm systems, security cameras & 24/7 professional monitoring in Houston, TX. Specialists in River Oaks, the Villages, Bellaire, West University & inner-loop neighborhoods. Call (713) 387-9937.",
  },
  {
    slug: "bellaire",
    name: "Bellaire",
    county: "Harris County",
    population: "19,000+",
    intro: "Bellaire is one of Houston's most prestigious residential cities — entirely surrounded by Houston, with tree-lined streets, top-rated schools, and property values that consistently rank among the highest in Harris County. Bellaire homeowners expect security solutions that are discreet, reliable, and architecturally appropriate.",
    securityContext: "Bellaire's high property values and central Houston location make it a target for residential burglary and vehicle theft. Hard-wired camera systems, professionally monitored alarms with cellular backup, and license plate recognition at driveways provide the layered protection Bellaire residences require — without compromising the neighborhood's aesthetic.",
    neighborhoods: ["Bellaire proper", "Southside Place", "West University adjacent"],
    services: ["premium residential security", "discreet hard-wired camera installation", "alarm systems", "smart home security", "alarm monitoring", "estate security"],
    faqs: [
      { question: "Do you install security systems in Bellaire?", answer: "Yes. Texas Total Security is a primary provider of residential security in Bellaire — including custom alarm systems, hard-wired camera installation, and 24/7 professional monitoring. We work within HOA architectural guidelines." },
      { question: "Can security cameras be installed discreetly on Bellaire homes?", answer: "Absolutely. We specialize in discreet camera placement that provides comprehensive coverage while respecting Bellaire's architectural standards. Every camera position is planned during a free onsite evaluation." },
      { question: "How do you handle Bellaire HOA restrictions?", answer: "We design every system with HOA requirements in mind — using architecturally appropriate camera housings, discrete mounting locations, and conduit routing that meets community standards. We've worked with numerous Bellaire properties and know what HOA boards typically approve." },
    ],
    metaTitle: "Bellaire TX Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Premium security systems for Bellaire, TX homes. Discreet hard-wired cameras, custom alarms & 24/7 professional monitoring. Locally owned, highly rated. Call (713) 387-9937.",
  },
  {
    slug: "memorial-houston",
    name: "Memorial Houston",
    county: "Harris County",
    population: "80,000+ (Memorial area)",
    intro: "The Memorial area encompasses Houston's most sought-after residential villages — Bunker Hill, Piney Point, Hedwig Village, Hunters Creek Village, and Spring Valley. With large wooded lots, upscale estates, and winding private streets, Memorial properties require security systems that blend high performance with architectural sensitivity.",
    securityContext: "Memorial Houston's affluent and secluded home sites make them frequent targets for residential burglary and vehicle theft. The area's mature tree canopy and large lots create blind spots that generic systems can't reliably cover — making custom camera placement and professionally monitored alarms essential for Memorial homeowners.",
    neighborhoods: ["Bunker Hill Village", "Piney Point Village", "Hedwig Village", "Spring Valley Village", "Hunters Creek Village", "Memorial City", "Energy Corridor adjacent"],
    services: ["estate security systems", "discreet hard-wired camera installation", "alarm systems", "smart home security integration", "24/7 alarm monitoring", "video doorbell systems"],
    faqs: [
      { question: "Do you install security systems in Memorial Houston?", answer: "Yes. Texas Total Security is a leading security provider in Memorial Houston — serving Bunker Hill, Piney Point, Hedwig Village, Hunters Creek, Spring Valley Village, and surrounding communities. Every system is custom-designed for your property." },
      { question: "How do you handle camera placement on large wooded Memorial lots?", answer: "Our technicians conduct a thorough onsite evaluation to map blind spots, entry points, and coverage gaps created by mature trees and estate landscaping. We position cameras to maximize coverage while keeping them architecturally appropriate." },
      { question: "What does a typical Memorial Houston security system cost?", answer: "System costs vary based on property size, number of cameras, alarm zones, and monitoring needs. Texas Total Security provides free onsite assessments and transparent quotes. Call (713) 387-9937 to schedule your complimentary evaluation." },
    ],
    metaTitle: "Memorial Houston Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Custom security systems for Memorial Houston. Estate-grade alarm & hard-wired camera installation for Bunker Hill, Piney Point, Hedwig Village & more. Call (713) 387-9937.",
  },
  {
    slug: "the-villages-houston",
    name: "The Villages (77024)",
    county: "Harris County",
    population: "16,000+ (Memorial Villages)",
    intro: "ZIP 77024 — The Memorial Villages — represents the apex of Houston residential prestige. Bunker Hill Village, Piney Point Village, Hedwig Village, Hunters Creek Village, Hilshire Village, and Spring Valley Village together form a collection of independently incorporated communities with large wooded estates, private streets, and some of the highest property values in Texas.",
    securityContext: "The Villages' secluded nature, high property values, and limited law enforcement presence within incorporated village limits create a unique security profile. Hard-wired camera systems covering driveways, perimeter, and entry points are standard for estates in this area. Alarm monitoring with cellular backup ensures protection even during power or internet disruptions.",
    neighborhoods: ["Bunker Hill Village", "Piney Point Village", "Hedwig Village", "Hunters Creek Village", "Hilshire Village", "Spring Valley Village"],
    services: ["estate alarm systems", "hard-wired 4K camera installation", "driveway license plate recognition", "24/7 alarm monitoring", "smart home integration", "security consultation"],
    faqs: [
      { question: "Do you serve the Memorial Villages (77024)?", answer: "Yes — the Villages is one of our primary focus neighborhoods. We design and install estate-grade security systems for Bunker Hill, Piney Point, Hedwig Village, Hunters Creek, and Hilshire Village. Every system is custom-built for the property." },
      { question: "What security cameras work best for large wooded Village estates?", answer: "For large wooded lots in the Villages, we recommend hard-wired 4K cameras at all entry points, PTZ cameras covering open areas, driveway license plate recognition, and perimeter cameras positioned to see through foliage. All cameras are weatherproof and designed for zero maintenance." },
      { question: "Do the Villages have HOA security restrictions?", answer: "Each village is independently incorporated with its own ordinances. We are experienced in designing systems that meet architectural requirements across all six villages — from camera placement to conduit routing. We'll guide you through the approval process if required." },
    ],
    metaTitle: "The Villages Houston Security Systems (77024) | Texas Total Security",
    metaDescription: "Expert security for Houston's Memorial Villages (77024). Hard-wired cameras, estate alarm systems & 24/7 monitoring for Bunker Hill, Piney Point, Hedwig & Hunters Creek. Call (713) 387-9937.",
  },
  {
    slug: "galleria-houston",
    name: "Galleria / Tanglewood (77056)",
    county: "Harris County",
    population: "30,000+ (area)",
    intro: "ZIP 77056 — the Galleria and Tanglewood corridor — is one of Houston's most dynamic combinations of luxury residential and premier commercial. Tanglewood's stately estate homes, Briargrove's established neighborhoods, and the Galleria's high-rise luxury condominiums all require sophisticated security infrastructure.",
    securityContext: "The Galleria corridor's density and high vehicle traffic create elevated exposure to residential and vehicle-related crime. High-rise condo residents face unique access control and parking garage security needs, while Tanglewood estate owners benefit most from hard-wired perimeter systems and LPR at driveways. Commercial properties require enterprise-grade integrated systems.",
    neighborhoods: ["Tanglewood", "Briargrove", "Galleria High-rises", "Post Oak", "Afton Oaks adjacent"],
    services: ["luxury residential security", "hard-wired camera systems", "high-rise condo security consultation", "commercial security", "alarm monitoring", "LPR driveway cameras"],
    faqs: [
      { question: "Do you install security systems in the Galleria / Tanglewood area (77056)?", answer: "Yes. We serve both the residential neighborhoods (Tanglewood, Briargrove) and commercial properties throughout the Galleria corridor — including alarm installation, hard-wired cameras, and 24/7 professional monitoring." },
      { question: "Can you install security cameras in a Galleria-area high-rise condo?", answer: "We consult on high-rise condo security and install residential alarm systems within individual units. For common area camera systems in high-rise buildings, we work with property management directly." },
      { question: "What security is best for Tanglewood estates?", answer: "Tanglewood estates benefit from hard-wired 4K perimeter cameras, driveway LPR, a monitored alarm with cellular backup, and smart home integration. We design every system during a free onsite assessment." },
    ],
    metaTitle: "Galleria / Tanglewood Houston Security Systems (77056) | Texas Total Security",
    metaDescription: "Security systems for Galleria & Tanglewood Houston (77056). Hard-wired cameras, estate alarms & 24/7 monitoring. Residential & commercial. Call (713) 387-9937.",
  },
  {
    slug: "energy-corridor-houston",
    name: "Energy Corridor (77079)",
    county: "Harris County",
    population: "25,000+ (residential area)",
    intro: "ZIP 77079 — the Energy Corridor — stretches along I-10 between Highway 6 and the Beltway. Home to corporate campuses for some of the world's largest energy companies and affluent residential neighborhoods, this area demands both enterprise-grade commercial security and premium residential systems.",
    securityContext: "The Energy Corridor's mix of corporate headquarters, office parks, and upscale residential communities creates a diverse security landscape. Commercial facilities require access control, CCTV, and professionally monitored perimeter systems. Residential communities along the I-10 feeder roads benefit from hard-wired cameras and alarm monitoring with cellular backup.",
    neighborhoods: ["Energy Corridor residential", "Barker Reservoir adjacent", "Memorial Bend", "Briar Forest"],
    services: ["commercial alarm & camera systems", "residential security", "hard-wired camera installation", "access control", "24/7 monitoring", "multi-site commercial security"],
    faqs: [
      { question: "Do you install security systems in the Energy Corridor (77079)?", answer: "Yes. We serve both commercial and residential properties throughout the Energy Corridor and surrounding 77079 zip code — alarm systems, hard-wired cameras, access control, and 24/7 professional monitoring." },
      { question: "What commercial security services do you offer in the Energy Corridor?", answer: "We design complete commercial security systems for Energy Corridor office buildings, corporate campuses, and retail centers — including monitored alarm systems, 4K IP cameras, access control integration, and active deterrence." },
      { question: "Can you handle security for multiple Energy Corridor commercial properties?", answer: "Absolutely. We specialize in multi-site commercial deployments — one design team, consistent system standards, and a single monitoring partner for all your properties." },
    ],
    metaTitle: "Energy Corridor Houston Security Systems (77079) | Texas Total Security",
    metaDescription: "Commercial & residential security in Houston's Energy Corridor (77079). Hard-wired cameras, alarm systems & 24/7 monitoring. Licensed local experts. Call (713) 387-9937.",
  },
  {
    slug: "west-university-place",
    name: "West University Place (77005)",
    county: "Harris County",
    population: "15,000+",
    intro: "ZIP 77005 — West University Place — is consistently ranked among the highest per-capita income communities in the United States. Located adjacent to Rice University, 'West U' features densely packed streets of large, meticulously maintained homes on relatively compact lots — requiring precision camera placement and sophisticated alarm systems.",
    securityContext: "West University's high home values and relatively dense residential layout mean that security cameras and alarm systems need to be precisely positioned for coverage without encroachment. The neighborhood's proximity to Houston's medical center and major thoroughfares means vehicle-related crime is an active concern. Hard-wired cameras at driveways and professionally monitored alarms are the standard for serious West U homeowners.",
    neighborhoods: ["West University Place", "Southgate adjacent", "Rice University area", "Braeswood adjacent"],
    services: ["premium residential alarm systems", "hard-wired camera installation", "driveway LPR cameras", "24/7 alarm monitoring", "smart home integration", "estate security"],
    faqs: [
      { question: "Do you install security systems in West University Place (77005)?", answer: "Yes — West University Place is one of our primary focus neighborhoods. We design and install premium residential alarm and camera systems throughout West U, with experience navigating HOA aesthetic requirements and compact lot camera positioning." },
      { question: "What cameras work best for West University's smaller lot sizes?", answer: "For West U's compact lots, we use high-resolution 4K cameras with wide-angle lenses to maximize coverage from fewer mounting points. Strategic driveway LPR cameras and entry-point cameras provide comprehensive protection without excessive camera counts." },
      { question: "How do you avoid conflicts with neighbors on compact West U properties?", answer: "Camera placement on compact lots requires precise planning — we ensure every camera is positioned to cover your property without capturing neighboring homes or public spaces unnecessarily. We review sight lines during our free onsite evaluation." },
    ],
    metaTitle: "West University Place Security Systems (77005) | Texas Total Security",
    metaDescription: "Premium security systems for West University Place (77005). Expert alarm installation, hard-wired cameras & 24/7 professional monitoring. Locally owned. Call (713) 387-9937.",
  },
  {
    slug: "river-oaks-houston",
    name: "River Oaks (77027 / 77019)",
    county: "Harris County",
    population: "N/A (neighborhood within Houston)",
    intro: "ZIP codes 77027 and 77019 encompass Houston's most iconic residential address — River Oaks. From the sprawling generational estates along River Oaks Boulevard to the upscale urban homes of Afton Oaks and Neartown, this corridor represents the highest tier of Houston security expectations. Discreet, hard-wired systems designed to protect legacy properties.",
    securityContext: "River Oaks estate homes face unique security challenges: large perimeters, mature screening landscaping that creates blind spots, motorized gates, and trophy vehicles in exposed driveways. Hard-wired 4K cameras, driveway license plate recognition, professionally monitored alarms with cellular backup, and smart integration with motorized gate systems are the security standard for River Oaks properties.",
    neighborhoods: ["River Oaks Boulevard estates", "Afton Oaks", "Avalon Place", "Huntingdon Place", "Elm Grove", "Neartown adjacent"],
    services: ["estate security systems", "hard-wired 4K camera installation", "driveway LPR cameras", "gate access integration", "24/7 alarm monitoring", "smart home integration"],
    faqs: [
      { question: "Do you install security systems in River Oaks (77027 / 77019)?", answer: "Yes — River Oaks is among our most important service neighborhoods. We design estate-grade security systems for River Oaks Boulevard homes and surrounding communities, with extensive experience in large-lot camera planning and discreet installation." },
      { question: "Can you integrate security cameras with motorized gate systems in River Oaks?", answer: "Absolutely. We design integrated systems combining hard-wired perimeter cameras, driveway LPR, alarm monitoring, and communication with motorized gate controllers — all managed from a single platform." },
      { question: "How do you approach camera placement on River Oaks estate lots?", answer: "Each River Oaks property receives a thorough onsite evaluation. We map all entry points, identify blind spots created by screening landscaping, and position cameras to achieve complete coverage while maintaining the estate's aesthetic integrity." },
    ],
    metaTitle: "River Oaks Houston Security Systems (77027 / 77019) | Texas Total Security",
    metaDescription: "Estate security for River Oaks Houston (77027 / 77019). Hard-wired cameras, LPR, gate integration & 24/7 monitoring. Locally owned, highly rated. Call (713) 387-9937.",
  },
  {
    slug: "spring-valley-houston",
    name: "Spring Valley (77055)",
    county: "Harris County",
    population: "4,000+ (Spring Valley Village)",
    intro: "ZIP 77055 — Spring Valley — is an established, independently incorporated residential community in northwest Houston. Known for large lots, mature trees, and a strong community identity, Spring Valley homeowners invest in professional security systems that protect their properties without compromising the neighborhood's suburban character.",
    securityContext: "Spring Valley's mature tree canopy and large lot sizes create the same camera placement challenges found in the Memorial Villages. Hard-wired systems are strongly preferred for reliability and aesthetics. The neighborhood's single-entry street layout makes driveway LPR cameras particularly effective.",
    neighborhoods: ["Spring Valley Village", "Spring Branch adjacent", "Westview adjacent"],
    services: ["residential alarm systems", "hard-wired camera installation", "driveway LPR cameras", "24/7 alarm monitoring", "smart home integration"],
    faqs: [
      { question: "Do you serve Spring Valley (77055)?", answer: "Yes. We provide professional alarm and camera installation throughout Spring Valley and the surrounding 77055 zip code — with experience in the neighborhood's specific lot sizes, tree coverage, and community character." },
      { question: "What security systems work best for Spring Valley properties?", answer: "For Spring Valley's larger lots with mature trees, hard-wired 4K cameras at entry points, a driveway LPR camera, and a monitored alarm with cellular backup provide comprehensive, reliable protection. We design every system during a free onsite evaluation." },
    ],
    metaTitle: "Spring Valley Houston Security Systems (77055) | Texas Total Security",
    metaDescription: "Security systems in Spring Valley Houston (77055). Hard-wired cameras, alarm installation & 24/7 monitoring. Locally owned & operated. Call (713) 387-9937.",
  },
  {
    slug: "rice-military-houston",
    name: "Rice Military (77007)",
    county: "Harris County",
    population: "15,000+ (area)",
    intro: "ZIP 77007 — Rice Military and the Washington Avenue corridor — is one of Houston's most vibrant urban neighborhoods. Townhomes, new construction, young professionals, and proximity to Buffalo Bayou create a dynamic residential environment where urban security needs are as important as anywhere in the city.",
    securityContext: "Rice Military's dense urban layout, high vehicle traffic, and active nightlife corridor along Washington Avenue create elevated exposure to vehicle break-ins, package theft, and opportunistic crime. Townhomes with limited exterior space require creative camera positioning. Alarm monitoring with video verification is particularly effective in this urban environment.",
    neighborhoods: ["Rice Military", "Washington Corridor", "Garden Oaks adjacent", "Buffalo Bayou area"],
    services: ["urban residential alarm systems", "hardwired camera installation", "video doorbell systems", "24/7 alarm monitoring", "package theft deterrence"],
    faqs: [
      { question: "Do you install security systems in Rice Military (77007)?", answer: "Yes. We serve the Rice Military and Washington Corridor neighborhoods — designing alarm and camera systems for townhomes, row houses, and single-family homes throughout 77007." },
      { question: "What security system works best for a Rice Military townhome?", answer: "Townhomes in Rice Military benefit from entry-point cameras (front and rear), a video doorbell, package area monitoring, and a monitored alarm with cellular backup. We work with the unique constraints of townhome construction to deliver clean, effective installations." },
    ],
    metaTitle: "Rice Military Houston Security Systems (77007) | Texas Total Security",
    metaDescription: "Security systems for Rice Military Houston (77007). Alarm installation, cameras & 24/7 monitoring for townhomes & urban properties. Call (713) 387-9937.",
  },
  {
    slug: "upper-kirby-houston",
    name: "Upper Kirby / Greenway (77098)",
    county: "Harris County",
    population: "20,000+ (area)",
    intro: "ZIP 77098 — Upper Kirby and the Greenway Plaza corridor — is an upscale mixed-use neighborhood stretching from Buffalo Speedway to Dunlavy, north of US-59. Luxury apartments, boutique retail, and established single-family homes coexist in one of Houston's most walkable and desirable inner-loop corridors.",
    securityContext: "Upper Kirby's mix of luxury multifamily, commercial, and residential properties requires versatile security expertise. Apartment complexes benefit from hard-wired camera systems with LPR at parking entrances; retail properties need commercial-grade monitored alarm systems; and single-family homeowners require discreet residential cameras with professional monitoring.",
    neighborhoods: ["Upper Kirby", "Greenway Plaza", "Sloans Creek adjacent", "Avalon Place adjacent"],
    services: ["luxury apartment security", "commercial alarm & camera systems", "residential security", "hard-wired camera installation", "24/7 alarm monitoring"],
    faqs: [
      { question: "Do you serve Upper Kirby and Greenway Plaza (77098)?", answer: "Yes. We provide commercial and residential security throughout the Upper Kirby and Greenway Plaza areas — alarm systems, hard-wired cameras, and 24/7 monitoring for all property types." },
      { question: "Can you install cameras for an Upper Kirby apartment complex?", answer: "Absolutely. We specialize in multifamily property security — including hard-wired cameras at entries, exits, parking areas, amenity spaces, and mail stations. Hard-wired systems are our preference for reliability and long-term performance." },
    ],
    metaTitle: "Upper Kirby / Greenway Houston Security Systems (77098) | Texas Total Security",
    metaDescription: "Security systems for Upper Kirby & Greenway Houston (77098). Commercial, residential & apartment security with hard-wired cameras & 24/7 monitoring. Call (713) 387-9937.",
  },
  {
    slug: "montrose-houston",
    name: "Montrose (77006)",
    county: "Harris County",
    population: "25,000+ (area)",
    intro: "ZIP 77006 — Montrose — is one of Houston's most historically rich and culturally vibrant neighborhoods. Victorian homes, bungalows, galleries, restaurants, and tree-lined residential streets make Montrose a unique security environment where aesthetics and functionality must be balanced carefully.",
    securityContext: "Montrose's walkability and urban energy also bring elevated pedestrian-traffic-related crime. Vehicle break-ins and residential burglaries are active concerns. Hard-wired camera systems at entry points, driveway cameras, and monitored alarms with video verification are the most effective tools for Montrose property owners.",
    neighborhoods: ["Montrose", "West Gray corridor", "Museum District adjacent", "Midtown adjacent"],
    services: ["residential alarm systems", "hard-wired camera installation", "video doorbell systems", "24/7 alarm monitoring", "urban security consultation"],
    faqs: [
      { question: "Do you install security systems in Montrose (77006)?", answer: "Yes. We serve homeowners, businesses, and multifamily properties throughout Montrose — designing alarm and camera systems that respect the neighborhood's architectural character while delivering reliable protection." },
    ],
    metaTitle: "Montrose Houston Security Systems (77006) | Texas Total Security",
    metaDescription: "Security systems in Montrose Houston (77006). Alarm installation, cameras & 24/7 monitoring for homes, businesses & urban properties. Call (713) 387-9937.",
  },
  {
    slug: "medical-center-houston",
    name: "Medical Center (77030)",
    county: "Harris County",
    population: "106,000+ (daytime population)",
    intro: "ZIP 77030 — the Texas Medical Center — is home to the world's largest medical complex, comprising 61 institutions, 21 hospitals, and tens of thousands of daily employees and patients. The surrounding residential neighborhoods — Braeswood, South Main, and Greenbriar — house medical professionals who demand premium residential security.",
    securityContext: "The Medical Center area's high daytime population, 24/7 operations, and premium residential neighborhoods create a diverse security landscape. Medical facilities require enterprise-grade access control and surveillance. Nearby residential properties benefit from hard-wired camera systems and monitored alarms that provide protection day and night.",
    neighborhoods: ["Texas Medical Center campus", "Braeswood", "South Main", "Greenbriar", "West University adjacent"],
    services: ["commercial medical facility security consultation", "residential alarm systems", "hard-wired camera installation", "24/7 alarm monitoring", "multi-site security systems"],
    faqs: [
      { question: "Do you serve the Medical Center area (77030)?", answer: "Yes. We serve both the residential neighborhoods surrounding the Texas Medical Center and can consult on commercial security needs for medical office buildings and facilities in 77030." },
    ],
    metaTitle: "Medical Center Houston Security Systems (77030) | Texas Total Security",
    metaDescription: "Security systems near Texas Medical Center Houston (77030). Residential alarm installation, cameras & 24/7 monitoring. Locally owned. Call (713) 387-9937.",
  },
  {
    slug: "downtown-houston",
    name: "Downtown Houston (77002)",
    county: "Harris County",
    population: "10,000+ (residential), 150,000+ (daytime)",
    intro: "ZIP 77002 — Downtown Houston — is the city's commercial core, home to corporate headquarters, luxury high-rise condominiums, hotels, entertainment venues, and historic lofts. Security needs range from enterprise commercial systems for office towers to residential alarm and camera systems for condo owners.",
    securityContext: "Downtown Houston's urban density and mixed-use environment create unique security challenges. Commercial buildings require access control integration, lobby surveillance, and parking garage camera systems. Residential condo owners benefit from individual unit alarm systems with smart home integration and video doorbell cameras at unit entries.",
    neighborhoods: ["Downtown Core", "Historic District", "Midtown adjacent", "4th Ward adjacent", "EaDo adjacent"],
    services: ["commercial security systems", "residential condo alarm systems", "video doorbell systems", "hard-wired camera installation", "24/7 alarm monitoring", "commercial consultation"],
    faqs: [
      { question: "Do you serve Downtown Houston (77002)?", answer: "Yes. We serve both commercial properties and residential condo owners throughout downtown Houston — alarm systems, camera installation, and 24/7 professional monitoring." },
      { question: "Can you install a security system in a downtown Houston condo?", answer: "Absolutely. We install residential alarm systems and video doorbell cameras for downtown condo owners. For common area and building-wide systems, we work with property management and building ownership." },
    ],
    metaTitle: "Downtown Houston Security Systems (77002) | Texas Total Security",
    metaDescription: "Security systems in Downtown Houston (77002). Commercial & residential alarm installation, cameras & 24/7 monitoring. Locally owned. Call (713) 387-9937.",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map(c => c.slug);
}
