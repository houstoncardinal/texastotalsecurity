import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema, generateReviewSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Link } from "react-router-dom";
import { Star, ExternalLink, Quote, Shield, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.1 };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } };

/* ─── All 21 Google reviews with text (verbatim from Google listing) ── */
const googleReviews = [
  {
    name: "Jin Yang",
    role: "Google Review · 1 month ago",
    text: "Very happy with Texas Total Security! We switched our alarm company to Texas Total Security from ADT. Love that they are a local Houston alarm company. There communication and customer service is awesome. Highly recommend!!!",
    rating: 5,
  },
  {
    name: "Isaac Sam Brookhim",
    role: "Google Review · 1 month ago",
    text: "Excellent service and great pricing. The owner Tim is a great guy!",
    rating: 5,
  },
  {
    name: "S Nevar",
    role: "Google Review · 1 year ago",
    text: "Great company and staff. They did the set up on mobile phones and explained everything we needed to know on our two-way audio cameras and doorbell. Highly recommend. Thank You Tim and Johnny.",
    rating: 5,
  },
  {
    name: "Jason Hammond",
    role: "Google Review · 7 years ago",
    text: "FANTASTIC experience and very professional and caring company. I felt very comfortable from start to finish. Honest and knowledgeable staff. The person I dealt with was most Tim Townsend and the experience was very satisfactory.",
    rating: 5,
  },
  {
    name: "Floral Yang",
    role: "Google Review · 8 years ago",
    text: "Very happy with my new security camera system! Texas Total Security did a great job at installing everything and explained exactly how to use all the equipment. Job well done! I will recommend to my friends and family...",
    rating: 5,
  },
  {
    name: "Coleman Ferguson",
    role: "Google Review · 6 years ago",
    text: "Texas Total Security did a fantastic job installing an alarm system and cameras. The cameras are all 1080p hd and are all commercial grade. The owner, Tim Townsend, is a very credible, knowledgeable person who was able to explain everything to me in a way I was able to understand. I would recommend this company to everyone.",
    rating: 5,
  },
  {
    name: "Anna Bermudez",
    role: "Google Review · 7 years ago",
    text: "Excellent Service! These guys know what they are doing. Love my Alarm System and my New Cameras all over my property. I would recommend Tim at Texas Total Security to anyone who is looking for a Security System!!! Thank You Guys",
    rating: 5,
  },
  {
    name: "Ronen Klinghofer",
    role: "Google Review · 11 months ago",
    text: "They did a fabulous job once again! I am a very happy repeat customer!",
    rating: 5,
  },
  {
    name: "DLA Armstrong",
    role: "Google Review · 8 years ago",
    text: "I was surprised by the payed back style by phone, AND above and beyond EXTRA SERVICE I RECEIVED from TTS. They were detailed, educated me on security tips and reviewed with me until I understood everything before the left. New up to date technology with old school customers-always- right service. I am Super Satisfied!!!!!😁",
    rating: 5,
  },
  {
    name: "Cesar Enrrique Gonzalez Castro",
    role: "Google Review · 2 years ago",
    text: "Thank you Texas Total Security! You guys did a great job on my Alarm System and Security Cameras.",
    rating: 5,
  },
  {
    name: "Chris Gomez",
    role: "Google Review · 11 months ago",
    text: "Great company! They do amazing work!",
    rating: 5,
  },
  {
    name: "Dj Baroud",
    role: "Google Review · 6 years ago",
    text: "Texas Total Security did a great job! My family feels really safe now! Thank you guys so much!",
    rating: 5,
  },
  {
    name: "Donald Townsend",
    role: "Google Review · 6 years ago",
    text: "Job well done! Thanks for helping my friend and his family at an important time of need. They feel 100% secure now!",
    rating: 5,
  },
  {
    name: "Iris Deleon",
    role: "Google Local Guide · 5 years ago",
    text: "Tim was amazing! I had an issue with my NVR he came, gave me fair price and fix it quickly.",
    rating: 5,
  },
  {
    name: "Edward Koreba",
    role: "Google Local Guide · 7 years ago",
    text: "THEY INSTALLED CAMERAS AT MY HOME AN THEY WERE VERY POLITE AN WORKED VERY FAST MY CAMERAS SET UP WAS DONE AN PROGRAMMED IN ONE DAY THANK YOU for making my home safe",
    rating: 5,
  },
  {
    name: "John Gray",
    role: "Google Review · 2 years ago",
    text: "Very professional and safety oriented with cameras and alarm systems",
    rating: 5,
  },
  {
    name: "Floral Yang",
    role: "Google Review · 4 years ago",
    text: "You guys did a great job on my Security Camera System and Alarm System!!!!",
    rating: 5,
  },
  {
    name: "Vicky Vale",
    role: "Google Review · 6 years ago",
    text: "Love how clear the pictures are and how fast they came out when I called!",
    rating: 5,
  },
  {
    name: "Orlando Marin",
    role: "Google Review · 1 year ago",
    text: "Excelent Service, the best of Texas 🤠",
    rating: 5,
  },
  {
    name: "Arturo Saborit Blanco",
    role: "Google Review · 1 year ago",
    text: "ThankYou for a job well done!",
    rating: 5,
  },
  {
    name: "Johnny Osborne",
    role: "Google Review · 2 years ago",
    text: "Positive: Professionalism, Value",
    rating: 5,
  },
];

const reviewSchemas = [
  generateLocalBusinessSchema(),
  generateReviewSchema(
    googleReviews.map((r) => ({ author: r.name, text: r.text, rating: r.rating, location: "Houston, TX" }))
  ),
  generateBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews" },
  ]),
];

/* ─── Google "G" logo mark ─────────────────────────────────── */
const GoogleG = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Reviews = () => (
  <Layout>
    <SEOHead
      title="Customer Reviews | 5-Star Houston Security Company | Texas Total Security"
      description="Read real 5-star Google reviews from Houston homeowners, businesses & HOA communities who trust Texas Total Security for alarm systems, cameras & professional monitoring."
      schemas={reviewSchemas}
    />

    <section className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <img src="/imgi_12_Better-Picture-LOGO-on-Wall-at-Office2-scaled.jpg" alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.91)_48%,rgba(10,10,10,0.72)_100%)]" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-8 lg:gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeLeft} transition={{ duration: 0.75, ease: easeExpo }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/25 bg-red-500/10 mb-5">
              <Star className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-red-200">
                Verified Customer Feedback
              </span>
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
              Trusted by Houston homeowners, businesses, and property teams.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Real Google reviews from homeowners, businesses, and property teams who trusted Texas Total Security for alarms, cameras, monitoring, service, and straight answers.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8" target="_blank" rel="noopener noreferrer" className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm">
                <GoogleG /> View Google Reviews <ExternalLink className="w-4 h-4" />
              </a>
              <Link to="/free-analysis" className="inline-flex items-center justify-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeRight} transition={{ duration: 0.75, ease: easeExpo, delay: 0.08 }} className="border border-white/10 bg-white/[0.055] p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="font-display text-6xl font-bold text-white leading-none">5.0</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/40">Google rating</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: "25+", sublabel: "Google reviews" },
                { label: "100%", sublabel: "5-star reviews" },
                { label: "Local", sublabel: "Houston team" },
                { label: "15+", sublabel: "years serving" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-black/45 p-4">
                  <p className="font-display text-2xl font-bold text-white">{stat.label}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── RATING SUMMARY STRIP ── */}
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-10">
          <div className="flex items-center gap-3">
            <GoogleG />
            <div>
              <p className="font-display font-bold text-3xl text-gray-900 leading-none">5.0</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Google Rating</p>
            </div>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-3xl text-gray-900 leading-none">25+</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Google Reviews</p>
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-3xl text-gray-900 leading-none">100%</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">5-Star Reviews</p>
          </div>
          <a
            href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border transition-all duration-200"
            style={{ borderColor: "hsl(0 85% 50% / 0.25)", color: "hsl(0 85% 45%)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "hsl(0 85% 50% / 0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            <GoogleG /> View on Google <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>

    {/* ── REVIEWS GRID ── */}
    <section className="py-12 sm:py-14" style={{ background: "hsl(0 0% 97%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.6, ease: easeExpo }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-display font-bold text-gray-950 text-3xl sm:text-4xl mb-3">
            Real feedback from customers who trusted us with their security.
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            Every review below is verbatim from our Google listing — unedited, unfiltered, and 100% from real customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {googleReviews.map((review, i) => (
            <motion.div
              key={`${review.name}-${i}`}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
              transition={{ duration: 0.5, ease: easeExpo, delay: (i % 3) * 0.08 }}
              className="relative flex flex-col bg-white border border-gray-200 p-5 hover:border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute right-5 top-5 w-6 h-6 text-gray-100" />
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="relative text-[14.5px] leading-relaxed text-gray-600 flex-1 mb-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-600">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-gray-900 leading-none mb-1">{review.name}</p>
                    <p className="text-[11px] text-gray-400 font-medium">{review.role}</p>
                  </div>
                </div>
                <GoogleG />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-14 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-stretch">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, ease: easeExpo }} className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <Shield className="w-9 h-9 text-red-400 mb-5" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              The pattern customers call out is the part that matters.
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              People mention local service, clear explanations, fast work, fair pricing, and systems they understand before we leave.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {[
              "Local Houston alarm company, not a national call-center maze",
              "Owner involvement and technicians who explain the system",
              "Alarm and camera work completed with professional follow-through",
              "Support for homes, families, businesses, and repeat customers",
            ].map((item, i) => (
              <motion.div key={item} variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.04 }} className="bg-black p-5">
                <CheckCircle2 className="w-5 h-5 text-red-400 mb-4" />
                <p className="text-sm font-semibold leading-relaxed text-white/70">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── LEAVE A REVIEW CTA ── */}
    <section className="py-12 sm:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
          transition={{ duration: 0.6, ease: easeExpo }}
          className="relative overflow-hidden border border-gray-200 bg-gray-50 p-6 sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 border border-red-100 bg-white text-red-700">
                <Star className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Customer Review Center</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-950 leading-tight">
                Worked with Texas Total Security?
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Your Google review helps Houston property owners evaluate a local security company with confidence.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <a
                href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[104px] flex-col justify-between border border-red-200 bg-white p-4 text-left hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-gray-950">
                  <GoogleG /> Leave Review
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-700">
                  Open Google <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="tel:7133879937"
                className="group flex min-h-[104px] flex-col justify-between border border-gray-200 bg-white p-4 text-left hover:border-red-200 hover:bg-white transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-gray-950">
                  <Phone className="w-4 h-4 text-red-600" /> Call Us
                </span>
                <span className="mt-3 text-xs font-semibold text-gray-500">(713) 387-9937</span>
              </a>
              <a
                href="https://maps.app.goo.gl/o4XYckgxB3B77AyW8"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[104px] flex-col justify-between border border-gray-200 bg-white p-4 text-left hover:border-red-200 hover:bg-white transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-gray-950">
                  <ExternalLink className="w-4 h-4 text-red-600" /> View Listing
                </span>
                <span className="mt-3 text-xs font-semibold text-gray-500">Google profile</span>
              </a>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-200 pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
            <span>5.0 Google Rating</span>
            <span>25+ Reviews</span>
            <span>Local Houston Team</span>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Reviews;
