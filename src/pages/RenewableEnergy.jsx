import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

function Section({ children, className = '', id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function StatPill({ value, label }) {
  return (
    <div className="text-center px-6 py-4 border border-white/10">
      <p className="text-gold text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
        {value}
      </p>
      <p className="text-white/50 text-xs tracking-[0.2em] uppercase">{label}</p>
    </div>
  )
}

export default function RenewableEnergy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #c8a250 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              GMnR Consultants · Renewable Energy Projects
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Spanish Solar PV,{' '}
              <span className="italic text-gold">Ready for Capital</span>
            </h1>
            <p className="mt-8 text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              Two investment-grade solar projects in Spain — 145.79 MWp combined, secured grid connections, and proven developer backing delivering IRR up to 11.94%.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            <StatPill value="145.79 MWp" label="Total Capacity" />
            <StatPill value="€11.62M" label="Equity Required (Valencia)" />
            <StatPill value="11.94%" label="Levered IRR" />
            <StatPill value="32,000 t" label="CO₂ Saved / yr" />
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              The Investment Challenge
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Finding Bankable Solar Assets Is the Hard Part
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-6">
              Spain is targeting 76GW of solar PV by 2030 — more than doubling today's installed base of 32GW. The opportunity is clear. But sourcing projects with secured grid access, experienced developers, and a credible financial structure is where most investors lose time and capital.
            </p>
            <p className="text-navy/70 text-lg leading-relaxed">
              Grid connection queues, permitting risk, and developer track record separate viable assets from speculative ones. We've done that work for you.
            </p>
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            The Opportunity
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Two Projects. Both{' '}
            <span className="italic text-gold">Investment-Ready.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
            GMnR Consultants presents two shovel-ready Spanish solar opportunities — each with grid access secured, experienced developers in place, and financial structures built for institutional equity partners.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {[
              {
                tag: 'Valencia PV',
                value: '52.57 MWp',
                detail: 'PV plant complete — evacuation infrastructure 93% done. COD Q3 2026.',
              },
              {
                tag: 'Project Solvix',
                value: '93.22 MWp',
                detail: '5-project portfolio across Girona & Barcelona. Grid access secured for all. RtB from March 2026.',
              },
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/10 hover:border-gold/30 transition-colors duration-300">
                <div className="h-1 w-12 bg-gold mb-6" />
                <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">{item.tag}</p>
                <p className="text-white text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  {item.value}
                </p>
                <p className="text-white/50 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits — comparison */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Project Comparison
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-12"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            What You Get With Each Project
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-warm-gray">
                  <th className="text-left py-4 pr-8 text-navy/40 font-medium tracking-widest uppercase text-xs w-1/3"></th>
                  <th className="text-left py-4 pr-8 text-gold font-semibold tracking-widest uppercase text-xs">Valencia PV</th>
                  <th className="text-left py-4 text-gold font-semibold tracking-widest uppercase text-xs">Project Solvix</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Grid Access', '43 MWn secured — REE Ayora-400', 'All 5 projects secured'],
                  ['Developer Track Record', 'Grupo Zaragozá — 600MW, 19+ yrs', 'Grant Thornton advisory'],
                  ['Revenue Visibility', 'PPA 60% / 10yr + 40% merchant', '~1,600h avg net equiv. hours'],
                  ['Construction Status', 'PV plant complete, 93% infra done', 'RtB from March 2026'],
                  ['Financial Returns', '8.5% unlevered / 11.94% levered', 'Portfolio-grade diversification'],
                  ['Land', '128 ha secured', '100% land secured'],
                ].map(([label, val1, val2], i) => (
                  <tr key={i} className="border-b border-warm-gray">
                    <td className="py-5 pr-8 text-navy/50 font-medium">{label}</td>
                    <td className="py-5 pr-8 text-navy/80">{val1}</td>
                    <td className="py-5 text-navy/80">{val2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Project Detail — Valencia PV */}
      <Section className="py-20 md:py-28 bg-cream" id="valencia">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Project 01
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Valencia PV
          </h2>
          <p className="text-navy/40 text-sm tracking-wide mb-10">
            Energile Iberian Renewables · Jarafuel &amp; Zarra, Valencia, Spain
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { label: 'Technology', value: 'Bifacial modules + single-axis tracking (RISEN RSM 132-8-710)' },
                { label: 'Grid Connection', value: '43 MWn secured — connecting to REE Ayora-400 substation' },
                { label: 'Revenue', value: 'PPA 60% / 10 years + 40% merchant' },
                { label: 'Debt Terms', value: '67% LTV at 4.55%, 20-year tenor' },
                { label: 'COD', value: 'Q3 2026 (AAE June 2026)' },
                { label: 'Status', value: 'PV plant complete — evacuation infrastructure 93% done' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 border-b border-warm-gray pb-6 last:border-0">
                  <p className="text-navy/40 text-xs font-semibold tracking-widest uppercase w-36 shrink-0 pt-0.5">{item.label}</p>
                  <p className="text-navy/80 text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 content-start">
              {[
                { value: '52.57 MWp', label: 'Total Capacity' },
                { value: '€645k/MWp', label: 'Total CAPEX' },
                { value: '106.7 GWh', label: 'P50 Production' },
                { value: '€11.62M', label: 'Equity Required' },
                { value: '128 ha', label: 'Site Area' },
                { value: '32,000 t', label: 'CO₂ Saved / yr' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-navy text-center">
                  <p className="text-gold text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {item.value}
                  </p>
                  <p className="text-white/40 text-xs tracking-[0.15em] uppercase">{item.label}</p>
                </div>
              ))}
              <div className="col-span-2 p-5 bg-gold/10 border border-gold/30 text-center">
                <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">Levered IRR</p>
                <p className="text-navy text-3xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>11.94%</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Project Detail — Solvix */}
      <Section className="py-20 md:py-28 bg-navy" id="solvix">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Project 02
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Project Solvix
          </h2>
          <p className="text-white/30 text-sm tracking-wide mb-10">
            Grant Thornton Financial Advisory · Catalonia (Girona &amp; Barcelona), Spain
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { label: 'Assets', value: '5 PV projects — 2 in Girona, 3 in Barcelona' },
                { label: 'Grid Access', value: 'Access & connection secured for all 5 projects' },
                { label: 'Land', value: '100% secured' },
                { label: 'Ready-to-Build', value: 'Projects 1 & 2: 31 March 2026 · Projects 3–5: 31 July 2026' },
                { label: 'Transaction', value: 'Two-stage: NBO → VDR → Binding Offer' },
                { label: 'Advisor', value: 'Grant Thornton Spain (Fernando Beltran, Emilio Garcia)' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 border-b border-white/10 pb-6 last:border-0">
                  <p className="text-white/30 text-xs font-semibold tracking-widest uppercase w-36 shrink-0 pt-0.5">{item.label}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 content-start">
              {[
                { value: '93.22 MWp', label: 'Total Portfolio' },
                { value: '5', label: 'Projects' },
                { value: '~1,600h', label: 'Avg Net Equiv. Hours' },
                { value: '100%', label: 'Land Secured' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-navy-light border border-white/10 text-center">
                  <p className="text-gold text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {item.value}
                  </p>
                  <p className="text-white/40 text-xs tracking-[0.15em] uppercase">{item.label}</p>
                </div>
              ))}
              <div className="col-span-2 p-5 border border-gold/30 text-center">
                <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">Market Context</p>
                <p className="text-white text-sm leading-relaxed mt-2">Spain targeting <span className="text-gold font-bold">76GW</span> solar PV by 2030, from 32GW today</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Credibility */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Why These Projects
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-12"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Backed by Experience. Structured for Institutions.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Grupo Zaragozá',
                desc: '19+ years in renewable energy development. 600MW delivered across Spain.',
              },
              {
                title: 'Grant Thornton Spain',
                desc: 'Independent financial advisory on Project Solvix. Institutional-grade process.',
              },
              {
                title: "Spain's RE Mandate",
                desc: '81% renewable energy target by 2030. Government-backed grid expansion underway.',
              },
              {
                title: 'Secured Infrastructure',
                desc: 'Grid connections confirmed before equity is deployed. No connection risk.',
              },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-cream border border-warm-gray hover:border-gold/30 transition-colors duration-300">
                <div className="h-1 w-8 bg-gold mb-6" />
                <p className="text-navy font-semibold text-base mb-3">{item.title}</p>
                <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer nav */}
      <section className="py-10 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="pt-6 border-t border-navy/10">
            <Link
              to="/"
              className="text-gold-dark text-sm font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
