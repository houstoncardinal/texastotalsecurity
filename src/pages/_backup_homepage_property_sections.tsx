// BACKUP — original CTA CARDS + WHO WE SERVE sections
// To restore: user says "undo homepage change"
// Replace the consolidated WHO WE SERVE section in Index.tsx with this block

      {/* ══════════════════════════════════════════════════
          CTA CARDS — Residential / Commercial
      ══════════════════════════════════════════════════ */}
      <section
        style={{
          background: "white",
          borderTop: "1px solid hsl(0 0% 91%)",
          borderBottom: "1px solid hsl(0 0% 91%)",
          padding: "clamp(1.5rem, 3vw, 2.25rem) 0",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-5 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
            <span className="text-[9.5px] font-bold uppercase tracking-[0.24em]" style={{ color: "hsl(0 85% 50%)" }}>
              Get Started
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* ── Residential ── */}
            <motion.a
              href="/residential"
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo }}
              whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(0,0,0,0.09)", transition: { duration: 0.2 } }}
              className="group flex items-center gap-4 rounded-xl px-5 py-4"
              style={{
                background: "white",
                border: "1px solid hsl(0 0% 90%)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                textDecoration: "none",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "hsl(0 90% 96%)", border: "1px solid hsl(0 75% 90%)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="hsl(0 80% 47%)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10.182L12 3l9 7.182V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.182z" />
                  <polyline points="9 22 9 13 15 13 15 22" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ color: "hsl(0 80% 50%)" }}>
                  Residential
                </p>
                <h3
                  className="font-bold text-gray-900 leading-tight group-hover:text-[hsl(0,80%,42%)] transition-colors duration-200"
                  style={{ fontSize: "0.97rem", letterSpacing: "-0.018em" }}
                >
                  Home Security Solutions
                </h3>
                <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.775rem" }}>
                  Alarms, cameras & 24/7 monitoring for your home.
                </p>
              </div>
              <svg
                width="15" height="15" viewBox="0 0 14 14" fill="none"
                className="shrink-0 text-gray-300 group-hover:text-[hsl(0,80%,50%)] group-hover:translate-x-0.5 transition-all duration-200"
              >
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>

            {/* ── Commercial ── */}
            <motion.a
              href="/commercial"
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={vp}
              transition={{ duration: 0.55, ease: easeExpo }}
              whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(0,0,0,0.09)", transition: { duration: 0.2 } }}
              className="group flex items-center gap-4 rounded-xl px-5 py-4"
              style={{
                background: "white",
                border: "1px solid hsl(0 0% 90%)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                textDecoration: "none",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "hsl(0 90% 96%)", border: "1px solid hsl(0 75% 90%)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="hsl(0 80% 47%)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="15" rx="1" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                  <line x1="8.5" y1="12" x2="8.5" y2="12" strokeWidth="2.4" />
                  <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2.4" />
                  <line x1="15.5" y1="12" x2="15.5" y2="12" strokeWidth="2.4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-0.5" style={{ color: "hsl(0 80% 50%)" }}>
                  Commercial
                </p>
                <h3
                  className="font-bold text-gray-900 leading-tight group-hover:text-[hsl(0,80%,42%)] transition-colors duration-200"
                  style={{ fontSize: "0.97rem", letterSpacing: "-0.018em" }}
                >
                  Business Security Solutions
                </h3>
                <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.775rem" }}>
                  Surveillance, access control & monitoring for any business.
                </p>
              </div>
              <svg
                width="15" height="15" viewBox="0 0 14 14" fill="none"
                className="shrink-0 text-gray-300 group-hover:text-[hsl(0,80%,50%)] group-hover:translate-x-0.5 transition-all duration-200"
              >
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHO WE SERVE — light theme image cards
      ══════════════════════════════════════════════════ */}
      <section
        className="overflow-hidden"
        style={{
          background: "white",
          borderTop: "1px solid hsl(0 0% 92%)",
          paddingTop: "clamp(3rem, 6vw, 5rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header row — left-aligned, side by side with descriptor */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-9"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-[2px] rounded-full" style={{ background: "hsl(0 85% 50%)" }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "hsl(0 85% 50%)" }}
                >
                  Who We Serve
                </span>
              </div>
              <h2
                className="font-display font-bold text-gray-900 leading-tight"
                style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", letterSpacing: "-0.04em" }}
              >
                Security Solutions for Every Property Type
              </h2>
            </div>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whoWeServeCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.09 }}
                >
                  <Link to={card.cta.href} className="group block h-full">
                    <div
                      className="relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-350"
                      style={{
                        border: "1px solid hsl(0 0% 91%)",
                        background: "white",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        transition: "box-shadow 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0px)";
                      }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden h-44 sm:h-[200px]">
                        <img
                          src={card.image}
                          alt={card.label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.52) 100%)" }}
                        />
                        {/* Eyebrow on image */}
                        <div className="absolute bottom-3 left-3">
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{
                              background: "hsl(0 85% 48%)",
                              boxShadow: "0 2px 12px hsl(0 85% 40% / 0.45)",
                            }}
                          >
                            <Icon className="w-3 h-3 text-white" />
                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.16em] whitespace-nowrap">
                              {card.eyebrow}
                            </span>
                          </div>
                        </div>
                        {/* Red top accent */}
                        <div
                          className="absolute top-0 left-0 right-0"
                          style={{
                            height: 3,
                            background: "linear-gradient(to right, hsl(0 85% 42%), hsl(0 85% 56%))",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <h3
                          className="font-display font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-[hsl(0,85%,45%)] transition-colors duration-200"
                          style={{ fontSize: "1.05rem", letterSpacing: "-0.025em" }}
                        >
                          {card.headline}
                        </h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                          {card.body}
                        </p>

                        {/* Features */}
                        <ul className="space-y-1.5 mb-5 flex-1">
                          {card.features.map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <CheckCircle2
                                className="w-3.5 h-3.5 shrink-0 mt-[1px]"
                                style={{ color: "hsl(0 85% 50%)" }}
                              />
                              <span className="text-[12.5px] text-gray-700 leading-snug">{f}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA row */}
                        <div
                          className="pt-4"
                          style={{ borderTop: "1px solid hsl(0 0% 93%)" }}
                        >
                          <span
                            className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all duration-200"
                            style={{ color: "hsl(0 85% 48%)" }}
                          >
                            {card.cta.label}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
