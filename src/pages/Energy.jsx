import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import ets2Image from '../assets/Image-EST2.png'

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

export default function Energy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative bg-navy pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy opacity-90" />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #c8a250 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              Energy &amp; Carbon Markets
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              The Carbon Cost Challenge Reshaping European Energy
            </h1>
            <p className="mt-8 text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              The EU Emissions Trading System has transformed carbon emissions into a tradable financial liability embedded within the European energy system. For companies across the energy value chain, this creates a growing and complex cost variable that demands strategic attention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                The Regulatory Landscape
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                A Financial and Regulatory Challenge at Scale
              </h2>
              <p className="text-navy/70 text-lg leading-relaxed mb-6">
                The European energy and industrial sectors are facing a growing financial and regulatory challenge driven by the EU Emissions Trading System (EU ETS).
              </p>
              <p className="text-navy/70 text-lg leading-relaxed">
                Under EU ETS, companies must purchase and surrender EU Allowances (EUAs) for their verified carbon emissions. Carbon has become a major operating cost variable for many organisations.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={ets2Image}
                alt="EU Emissions Trading System — carbon market dynamics"
                className="w-full max-w-md rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Rising Carbon Prices */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Market Dynamics
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Rising Carbon Prices
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-8 max-w-3xl">
            EU carbon allowances are traded as a market commodity. Prices are influenced by multiple intersecting forces, creating volatility that directly impacts operating costs for emissions-intensive industries.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'EU climate policy',
              'Energy market conditions',
              'Regulatory supply adjustments',
              'Geopolitical events',
              'Financial trading activity',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-cream border border-warm-gray"
              >
                <span className="text-gold text-lg mt-0.5">&#9670;</span>
                <span className="text-navy/80 text-base font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Declining Free Allocation */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Phase IV (2021–2030)
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Declining Free Allocation for Industry
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
            Many heavy industries historically received free carbon allowances. However, under EU ETS Phase IV these allocations are gradually declining. By 2034, many sectors will face significantly greater exposure to market-priced allowances.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-3xl">
            Even if emissions remain constant, companies must increasingly purchase allowances on the open market each year.
          </p>

          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Industries Affected
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Steel', 'Cement', 'Refining', 'Chemicals', 'Glass', 'Paper', 'Metals'].map(
              (industry, i) => (
                <div
                  key={i}
                  className="px-6 py-4 border border-white/10 text-white/80 text-sm font-medium tracking-wide text-center"
                >
                  {industry}
                </div>
              )
            )}
          </div>
        </div>
      </Section>

      {/* Expanding Carbon Market */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Expanding Scope
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Expansion of the Carbon Market to New Sectors
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">
            The EU ETS is expanding beyond traditional heavy industry. New sectors are now entering the system, many of which have limited internal experience managing carbon market exposure.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Maritime shipping',
              'Aviation',
              'Fuel suppliers',
              'Road transport fuels',
              'Building heating fuels',
            ].map((sector, i) => (
              <div
                key={i}
                className="p-8 bg-white border border-warm-gray hover:border-gold/30 transition-colors duration-300"
              >
                <span className="text-gold text-2xl block mb-3">&#9670;</span>
                <span className="text-navy font-semibold text-base">{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ETS2 */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            New Regulation
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Introduction of ETS2
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-12 max-w-3xl">
            The EU is launching a new emissions trading system known as ETS2. This creates a new carbon cost layer across the European energy system, primarily affecting fuel suppliers.
          </p>

          {/* Timeline */}
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {[
              { year: '2025', milestone: 'Emissions monitoring begins' },
              { year: '2026', milestone: 'Emissions verification begins' },
              { year: '2028', milestone: 'First allowance surrender' },
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-navy text-center">
                <p className="text-gold text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  {item.year}
                </p>
                <p className="text-white/70 text-sm tracking-wide">{item.milestone}</p>
              </div>
            ))}
          </div>

          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Entities Subject to ETS2
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {[
              'Natural gas distributors',
              'Heating fuel suppliers',
              'Petrol and diesel distributors',
              'Fuel retailers',
            ].map((entity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-5 bg-cream border border-warm-gray"
              >
                <span className="text-gold">&#9670;</span>
                <span className="text-navy/80 text-sm font-medium">{entity}</span>
              </div>
            ))}
          </div>
          <p className="text-navy/70 text-lg leading-relaxed mt-8 max-w-3xl">
            These entities will be required to purchase allowances covering the emissions generated by the fuels they sell.
          </p>
        </div>
      </Section>

      {/* Indirect Carbon Cost Exposure */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Broader Impact
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Indirect Carbon Cost Exposure
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-3xl">
            Even companies not directly obligated under ETS may face significant impacts. Carbon has become a structural variable across the entire energy market.
          </p>
          <p className="text-white/50 text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Carbon prices influence
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {[
              'Electricity market pricing',
              'Gas-fired generation costs',
              'Wholesale power market volatility',
              'Long-term energy procurement strategies',
            ].map((impact, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 border border-white/10"
              >
                <span className="text-gold">&#9670;</span>
                <span className="text-white/70 text-sm font-medium">{impact}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Operational Complexity */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            The Management Challenge
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Operational Complexity
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">
            Managing carbon exposure requires companies to monitor multiple interconnected variables. For organisations without dedicated carbon market expertise, the system introduces significant financial and operational complexity.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Allowance procurement',
              'Price volatility',
              'Regulatory reporting',
              'Surrender deadlines',
              'Cross-commodity exposure (power, gas, carbon)',
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-warm-gray"
              >
                <span className="text-gold text-lg block mb-2">&#9670;</span>
                <span className="text-navy/80 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Structural Shift */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            The New Reality
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            A Structural Shift in European Energy Markets
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-3xl">
            The EU ETS has transformed carbon emissions into a tradable financial liability embedded within the energy system. Understanding how regulatory and market forces interact has become essential for companies operating in Europe's energy-intensive sectors.
          </p>
          <p className="text-white/50 text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            What this affects
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Operating margins',
              'Energy procurement strategies',
              'Asset profitability',
              'Long-term investment planning',
              'Competitiveness in global markets',
            ].map((item, i) => (
              <div
                key={i}
                className="px-6 py-4 border border-white/10 text-white/70 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-navy/10">
            <Link
              to="/"
              className="text-gold-dark text-sm font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              &larr; Back to Home
            </Link>
            <a
              href="/#contact"
              className="px-8 py-3 bg-gold text-navy text-xs font-semibold tracking-widest uppercase hover:bg-gold-dark transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
