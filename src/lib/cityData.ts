// Programmatic SEO: unique city data for each service area

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
    intro: "As the fourth-largest city in the United States, Houston presents unique security challenges that demand professional, locally-designed solutions. From the Energy Corridor to the Medical Center, Montrose to Memorial, every Houston neighborhood has distinct vulnerabilities that require custom protection strategies.",
    securityContext: "Houston's sprawling metropolitan landscape includes high-density commercial districts, historic residential neighborhoods, and rapidly developing suburban communities. Property crime rates in certain Houston zip codes remain above the national average, making professional alarm and surveillance systems essential for both homeowners and businesses.",
    neighborhoods: ["Heights", "Montrose", "River Oaks", "Memorial", "Galleria", "West University", "Midtown", "Downtown", "Energy Corridor", "Meyerland", "Spring Branch", "Clear Lake"],
    services: ["alarm system installation", "security camera installation", "24/7 alarm monitoring", "commercial security", "residential security", "HOA gate cameras", "access control", "active deterrence systems"],
    faqs: [
      { question: "What is the best security system for a Houston home?", answer: "The best security system for a Houston home depends on your property layout, neighborhood risk factors, and lifestyle. Texas Total Security provides free onsite assessments to design a custom system combining alarms, cameras, and 24/7 local monitoring tailored to your specific Houston address." },
      { question: "How much does alarm installation cost in Houston?", answer: "Alarm installation costs in Houston vary based on system complexity, number of sensors, and monitoring features. Texas Total Security provides free consultations and competitive pricing with no hidden fees. Contact us at (713) 387-9937 for a custom quote." },
      { question: "Do you offer security camera installation in Houston?", answer: "Yes. We install professional-grade security camera systems throughout Houston — including HD surveillance, license plate cameras, PTZ cameras, and active deterrence systems. All installations include remote viewing setup and ongoing support." },
      { question: "What areas of Houston do you serve?", answer: "We serve all Houston neighborhoods and surrounding cities including Sugar Land, Katy, Pearland, Cypress, The Woodlands, Pasadena, Missouri City, Bellaire, League City, Richmond, and Rosenberg." },
    ],
    metaTitle: "Houston Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Professional alarm systems, security cameras, and 24/7 local monitoring in Houston, TX. 30+ years of trusted service. Free onsite security analysis. Call (713) 387-9937.",
  },
  {
    slug: "sugar-land",
    name: "Sugar Land",
    county: "Fort Bend County",
    population: "118,000+",
    intro: "Sugar Land is one of the fastest-growing and most affluent communities in the Houston metropolitan area. With upscale neighborhoods like Sweetwater, Telfair, and Greatwood, Sugar Land homeowners and businesses require security solutions that match the premium quality of their properties.",
    securityContext: "While Sugar Land consistently ranks among Texas's safest cities, its proximity to Houston's urban center and increasing population density make proactive security essential. Package theft, vehicle break-ins, and HOA common-area incidents are growing concerns that professional surveillance and alarm systems can directly address.",
    neighborhoods: ["Sweetwater", "Telfair", "Greatwood", "New Territory", "First Colony", "Riverstone", "Colony Meadows", "Sugar Creek"],
    services: ["residential alarm systems", "security cameras", "HOA security", "smart home integration", "alarm monitoring", "video doorbell systems"],
    faqs: [
      { question: "Do you install security systems in Sugar Land?", answer: "Yes. Texas Total Security provides full security system design, installation, and monitoring throughout Sugar Land and Fort Bend County. We serve neighborhoods including Sweetwater, Telfair, Greatwood, and New Territory." },
      { question: "What security cameras work best for Sugar Land homes?", answer: "For Sugar Land properties, we typically recommend a combination of HD cameras for perimeter coverage, video doorbell cameras at entries, and license plate recognition cameras at driveways. Our experts design systems specific to your home layout during a free onsite analysis." },
      { question: "Can you install HOA gate cameras in Sugar Land communities?", answer: "Absolutely. We specialize in HOA security for Sugar Land communities — including gate cameras, license plate recognition, and common area surveillance. We work directly with HOA boards and property managers." },
    ],
    metaTitle: "Sugar Land Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Professional security systems in Sugar Land, TX. Alarm installation, security cameras, HOA solutions & 24/7 local monitoring. Free assessment. Call (713) 387-9937.",
  },
  {
    slug: "katy",
    name: "Katy",
    county: "Harris / Fort Bend / Waller County",
    population: "21,000+ (city proper), 400,000+ (Greater Katy)",
    intro: "Katy has transformed from a small railroad town into one of Houston's most desirable suburban communities. With master-planned neighborhoods like Cinco Ranch, Cross Creek Ranch, and Elyson attracting families and professionals, the demand for reliable, custom-designed security systems continues to grow.",
    securityContext: "Greater Katy's rapid expansion means new construction and evolving neighborhoods — both of which present security considerations. Rising e-commerce deliveries have increased package theft risks, while the area's proximity to major highways like I-10 and the Grand Parkway creates accessibility that benefits both residents and potential intruders.",
    neighborhoods: ["Cinco Ranch", "Cross Creek Ranch", "Elyson", "Cane Island", "Firethorne", "Pin Oak Village", "Grayson Lakes", "Tamarron"],
    services: ["alarm system installation", "security camera systems", "residential security", "new construction pre-wire", "smart home security", "alarm monitoring"],
    faqs: [
      { question: "What security companies serve Katy, TX?", answer: "Texas Total Security is a Houston-based security company serving Katy and all surrounding areas. Unlike national chains, we provide local monitoring, custom system design, and direct support from our Houston team — with over 30 years of experience." },
      { question: "How much do security cameras cost in Katy?", answer: "Security camera system pricing in Katy depends on the number of cameras, resolution quality, and features like license plate recognition or active deterrence. We provide free onsite evaluations and transparent pricing with no hidden fees." },
      { question: "Can you pre-wire a new home in Katy for security?", answer: "Yes. We work with Katy-area builders and homeowners to pre-wire new construction for alarm systems, security cameras, structured cabling, and networking — ensuring a clean, integrated installation." },
    ],
    metaTitle: "Katy Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Expert security system installation in Katy, TX. Alarms, cameras, monitoring & smart home security for Cinco Ranch, Cross Creek & more. Call (713) 387-9937.",
  },
  {
    slug: "pearland",
    name: "Pearland",
    county: "Brazoria County",
    population: "130,000+",
    intro: "Pearland is one of the Houston metro's most rapidly growing cities, attracting families and businesses with its excellent schools, strong community values, and strategic location. As the city expands, so does the need for professional security solutions that protect homes, businesses, and community spaces.",
    securityContext: "Pearland's growth along Highway 288 and the Sam Houston Tollway has brought new commercial development and residential construction. With this expansion comes increased traffic and evolving security needs — from residential break-in prevention to commercial asset protection and HOA common-area surveillance.",
    neighborhoods: ["Shadow Creek Ranch", "Southwyck", "Silverlake", "Lakes of Highland Glen", "Pearland Town Center area", "Country Place"],
    services: ["home alarm systems", "security cameras", "commercial security", "HOA surveillance", "alarm monitoring", "video doorbell installation"],
    faqs: [
      { question: "Do you provide security services in Pearland?", answer: "Yes. Texas Total Security serves all of Pearland and Brazoria County with professional alarm installation, security camera systems, and 24/7 local monitoring. We offer free onsite security assessments for both residential and commercial properties." },
      { question: "What is the best alarm company in Pearland?", answer: "Texas Total Security is the trusted choice for Pearland residents who want local, accountable security service — not a national call center. We've served the greater Houston area for 30+ years with custom-designed systems and in-house monitoring." },
    ],
    metaTitle: "Pearland Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Trusted security systems in Pearland, TX. Alarm installation, cameras, 24/7 monitoring for Shadow Creek Ranch, Silverlake & more. Call (713) 387-9937.",
  },
  {
    slug: "cypress",
    name: "Cypress",
    county: "Harris County",
    population: "190,000+",
    intro: "Cypress is one of Houston's most dynamic suburban communities, known for its excellent CFISD schools, family-friendly neighborhoods, and rapid growth along Highway 290 and the Grand Parkway. This expansion brings both opportunity and the need for reliable, professionally installed security solutions.",
    securityContext: "The Cypress area's blend of established communities and new developments creates a diverse security landscape. Large lot sizes in many Cypress neighborhoods require comprehensive camera coverage, while the area's highway accessibility makes professional alarm monitoring an important layer of protection.",
    neighborhoods: ["Bridgeland", "Towne Lake", "Cypress Creek Lakes", "Miramesa", "Fairfield", "Lakewood Forest", "Canyon Gate"],
    services: ["alarm systems", "security cameras", "residential security", "ranch and acreage security", "smart home integration", "alarm monitoring"],
    faqs: [
      { question: "Do you install security systems in Cypress, TX?", answer: "Yes. Texas Total Security provides full security system services in Cypress — including alarm installation, security cameras, and 24/7 local monitoring. We serve Bridgeland, Towne Lake, and all surrounding communities." },
      { question: "What security system is best for large Cypress properties?", answer: "Large Cypress properties benefit from a layered approach: perimeter cameras with night vision, driveway license plate recognition, alarm sensors at all entry points, and 24/7 monitoring. We design custom systems during a free onsite evaluation." },
    ],
    metaTitle: "Cypress Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Professional security systems in Cypress, TX. Alarm installation, cameras & monitoring for Bridgeland, Towne Lake & surrounding areas. Call (713) 387-9937.",
  },
  {
    slug: "the-woodlands",
    name: "The Woodlands",
    county: "Montgomery County",
    population: "120,000+",
    intro: "The Woodlands is one of Texas's premier master-planned communities, known for its wooded landscape, top-rated schools, and thriving commercial districts. Residents and businesses in The Woodlands expect security solutions that match the community's high standards — discreet, reliable, and custom-designed.",
    securityContext: "The Woodlands' wooded lots, winding streets, and secluded home sites create unique surveillance challenges that standard cookie-cutter systems can't address. Additionally, The Woodlands' commercial corridor along Interstate 45 supports a significant business population requiring enterprise-grade security infrastructure.",
    neighborhoods: ["Creekside Park", "Sterling Ridge", "Alden Bridge", "Panther Creek", "Cochran's Crossing", "Indian Springs", "Research Forest"],
    services: ["residential security systems", "commercial security", "camera installation", "alarm monitoring", "estate security", "HOA security"],
    faqs: [
      { question: "Do you serve The Woodlands area?", answer: "Yes. Texas Total Security provides professional alarm, camera, and monitoring services throughout The Woodlands and Montgomery County. We design systems that work with the area's unique wooded lots and architectural styles." },
      { question: "Can you install discreet security cameras on wooded properties in The Woodlands?", answer: "Absolutely. We specialize in designing camera systems that provide comprehensive coverage while remaining architecturally appropriate for The Woodlands' aesthetic standards. Our technicians work with your property's landscape to place cameras strategically." },
    ],
    metaTitle: "The Woodlands Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Premium security systems in The Woodlands, TX. Custom alarm & camera installation, 24/7 monitoring for Creekside, Sterling Ridge & more. Call (713) 387-9937.",
  },
  {
    slug: "pasadena",
    name: "Pasadena",
    county: "Harris County",
    population: "152,000+",
    intro: "Pasadena is a hardworking Houston-area city with deep roots in the energy industry, growing residential communities, and a thriving small business sector. Security needs in Pasadena range from protecting industrial facilities along the Ship Channel to safeguarding family homes and neighborhood businesses.",
    securityContext: "Pasadena's mix of industrial, commercial, and residential zones creates diverse security requirements. Industrial sites need perimeter surveillance and access control, while residential neighborhoods benefit from alarm systems and camera coverage that deter opportunistic crime.",
    neighborhoods: ["Deer Park", "South Houston", "Strawberry", "Richey", "Gardens", "Red Bluff"],
    services: ["industrial security", "commercial alarm systems", "residential cameras", "alarm monitoring", "perimeter security", "access control"],
    faqs: [
      { question: "Do you install commercial security systems in Pasadena?", answer: "Yes. We serve Pasadena businesses with commercial alarm systems, surveillance cameras, access control, and 24/7 monitoring — including industrial facilities along the Ship Channel corridor." },
      { question: "What residential security options do you offer in Pasadena?", answer: "We provide complete residential security in Pasadena: alarm systems, indoor/outdoor cameras, video doorbells, smart home integration, and 24/7 local monitoring. Every system is custom-designed for your property." },
    ],
    metaTitle: "Pasadena Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Security systems in Pasadena, TX. Commercial, industrial & residential alarm and camera installation with 24/7 local monitoring. Call (713) 387-9937.",
  },
  {
    slug: "missouri-city",
    name: "Missouri City",
    county: "Fort Bend County",
    population: "75,000+",
    intro: "Missouri City offers a blend of established neighborhoods and newer developments in the heart of Fort Bend County. With strong community values and proximity to Houston's employment centers, Missouri City residents and businesses rely on dependable security solutions to protect their properties.",
    securityContext: "Missouri City's position along Highway 6 and Fort Bend Parkway provides excellent connectivity but also increased traffic through residential areas. Professional alarm systems with local monitoring and strategically placed cameras provide the security layer that Missouri City families and business owners need.",
    neighborhoods: ["Sienna", "Quail Valley", "Lake Olympia", "Hunters Glen", "Palmer Plantation"],
    services: ["home security systems", "alarm installation", "camera systems", "HOA security", "alarm monitoring", "smart security"],
    faqs: [
      { question: "What security companies serve Missouri City?", answer: "Texas Total Security serves Missouri City with locally monitored alarm systems, professional camera installation, and ongoing support. Unlike national providers, our monitoring center is in Houston — ensuring faster response times." },
      { question: "Do you work with Missouri City HOAs?", answer: "Yes. We provide HOA security solutions throughout Missouri City and Fort Bend County — including gate cameras, license plate recognition, and common area surveillance systems." },
    ],
    metaTitle: "Missouri City Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Trusted security systems in Missouri City, TX. Alarm installation, cameras, HOA security & 24/7 local monitoring. Free assessment. Call (713) 387-9937.",
  },
  {
    slug: "league-city",
    name: "League City",
    county: "Galveston County",
    population: "115,000+",
    intro: "League City is one of the fastest-growing cities in the Houston–Galveston region, offering a coastal suburban lifestyle with excellent schools and family-oriented communities. As the city grows along Interstate 45 South, professional security systems are an increasingly important investment for homeowners and businesses alike.",
    securityContext: "League City's waterfront properties, new master-planned communities, and expanding commercial districts each present distinct security needs. Coastal weather considerations also play a role — security systems in League City must withstand humidity, storms, and salt air exposure.",
    neighborhoods: ["Tuscan Lakes", "South Shore Harbour", "Magnolia Creek", "Heritage Park", "Victory Lakes"],
    services: ["residential alarm systems", "security cameras", "commercial security", "weather-resistant cameras", "alarm monitoring"],
    faqs: [
      { question: "Do you install security systems in League City?", answer: "Yes. Texas Total Security provides full-service alarm and camera installation throughout League City and Galveston County. We use weather-rated equipment designed to withstand coastal conditions." },
      { question: "What cameras work best in League City's coastal climate?", answer: "We install IP-rated, weather-resistant cameras designed for coastal environments. Our League City installations include corrosion-resistant housings and equipment rated for humidity, heat, and storm conditions." },
    ],
    metaTitle: "League City Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Security systems in League City, TX. Weather-resistant cameras, alarms & 24/7 monitoring for Tuscan Lakes, South Shore & more. Call (713) 387-9937.",
  },
  {
    slug: "richmond",
    name: "Richmond",
    county: "Fort Bend County",
    population: "12,500+ (city), rapidly growing area",
    intro: "Richmond, the county seat of Fort Bend County, combines small-town Texas heritage with rapid suburban growth. New master-planned communities, expanding commercial corridors, and agricultural properties all present unique security challenges that Texas Total Security is equipped to address.",
    securityContext: "Richmond's evolving landscape — from historic downtown properties to brand-new subdivisions and ranch land — requires versatile security expertise. New construction offers pre-wire opportunities, while existing homes and businesses benefit from modern wireless and hybrid alarm and camera systems.",
    neighborhoods: ["Pecan Grove", "Harvest Green", "Long Meadow Farms", "Downtown Richmond"],
    services: ["alarm installation", "security cameras", "ranch security", "new construction pre-wire", "alarm monitoring", "commercial security"],
    faqs: [
      { question: "Can you install security on ranch properties in Richmond?", answer: "Yes. We design security systems for rural and ranch properties in the Richmond area — including long-range cameras, solar-powered camera systems, gate monitoring, and cellular alarm communication." },
      { question: "Do you serve the Pecan Grove area?", answer: "Absolutely. We provide full security services throughout Pecan Grove and all of Fort Bend County — including alarm systems, camera installation, and 24/7 local monitoring." },
    ],
    metaTitle: "Richmond TX Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Security systems in Richmond, TX. Residential, commercial & ranch security with alarms, cameras & 24/7 local monitoring. Call (713) 387-9937.",
  },
  {
    slug: "bellaire",
    name: "Bellaire",
    county: "Harris County",
    population: "19,000+",
    intro: "Bellaire is one of Houston's most prestigious residential communities, known for its tree-lined streets, top-rated schools, and proximity to the Texas Medical Center and Galleria. Bellaire homeowners expect security solutions that are discreet, reliable, and architecturally appropriate for their properties.",
    securityContext: "Bellaire's high property values and central Houston location make it a target for property crime. Professional alarm systems with local monitoring, strategically placed cameras, and smart home integration provide the layered protection that Bellaire residents require — without compromising their home's aesthetic.",
    neighborhoods: ["Bellaire proper", "Southside Place", "West University adjacent areas"],
    services: ["premium residential security", "discreet camera installation", "alarm systems", "smart home security", "alarm monitoring", "estate security"],
    faqs: [
      { question: "Do you install security systems in Bellaire?", answer: "Yes. Texas Total Security provides premium residential security services throughout Bellaire — including custom alarm systems, architecturally sensitive camera installation, and 24/7 local monitoring." },
      { question: "Can security cameras be installed discreetly on Bellaire homes?", answer: "Absolutely. We specialize in discreet camera placement that provides complete coverage while respecting the architectural character of Bellaire properties. Our team plans every camera position to be effective and unobtrusive." },
    ],
    metaTitle: "Bellaire Security Systems | Premium Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Premium security systems for Bellaire, TX homes. Discreet cameras, custom alarms & 24/7 local monitoring. Trusted 30+ years. Call (713) 387-9937.",
  },
  {
    slug: "memorial-houston",
    name: "Memorial Houston",
    county: "Harris County",
    population: "80,000+ (Memorial area)",
    intro: "The Memorial area of Houston encompasses some of the city's most sought-after neighborhoods — including Memorial Villages, Bunker Hill, Piney Point, Hedwig Village, and Spring Valley. With large wooded lots, upscale estates, and winding streets, Memorial properties require security systems that blend high performance with architectural sensitivity.",
    securityContext: "Memorial Houston's affluent neighborhoods and secluded home sites make them frequent targets for residential burglary and vehicle theft. The area's mature tree canopy and large lot sizes create blind spots that off-the-shelf systems can't reliably cover — making custom camera placement and professionally monitored alarm systems essential investments for Memorial homeowners.",
    neighborhoods: ["Bunker Hill Village", "Piney Point Village", "Hedwig Village", "Spring Valley Village", "Hunters Creek Village", "Memorial City", "Energy Corridor"],
    services: ["estate security systems", "discreet camera installation", "alarm systems", "smart home security integration", "24/7 alarm monitoring", "access control", "video doorbell systems"],
    faqs: [
      { question: "Do you install security systems in the Memorial Houston area?", answer: "Yes. Texas Total Security provides professional alarm and camera installation throughout Memorial Houston — including Bunker Hill, Piney Point, Hedwig Village, Hunters Creek, and the Energy Corridor. We design every system around your property's unique layout." },
      { question: "How do you handle camera placement on large Memorial properties?", answer: "Our technicians conduct a thorough onsite evaluation to map blind spots, entry points, and coverage gaps created by mature trees and estate-style landscaping. We position cameras to maximize coverage while keeping them architecturally unobtrusive." },
      { question: "Can you integrate security with smart home systems in Memorial?", answer: "Absolutely. We work with leading smart home platforms to integrate your alarm system, cameras, and access control into a unified, app-controlled ecosystem — ideal for Memorial homeowners who want seamless, remote management of their security." },
      { question: "What is the cost of a security system in Memorial Houston?", answer: "System costs vary based on property size, number of cameras, alarm zones, and monitoring needs. Texas Total Security provides free onsite assessments and transparent quotes with no hidden fees. Call (713) 387-9937 to schedule your complimentary evaluation." },
    ],
    metaTitle: "Memorial Houston Security Systems | Alarm & Camera Installation | Texas Total Security",
    metaDescription: "Custom security systems for Memorial Houston, TX. Estate-grade alarm & camera installation for Bunker Hill, Piney Point, Hedwig Village & more. Call (713) 387-9937.",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map(c => c.slug);
}
