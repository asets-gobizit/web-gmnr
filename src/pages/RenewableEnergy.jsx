import { useState, useEffect, useRef } from 'react'
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

export default function RenewableEnergy() {
  const [lightbox, setLightbox] = useState(false)
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

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              Carbon &amp; European Energy Markets
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Carbon Is Now a Balance Sheet Item
            </h1>
            <p className="mt-8 text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              The EU Emissions Trading System covers approximately 11,000 installations across the EU, Norway, Iceland, and Liechtenstein. It has turned carbon emissions into a tradable financial liability — one that now sits at the centre of energy procurement, asset valuation, and long-term competitiveness for companies operating in Europe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Core Mechanism */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              The Core Mechanism
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              How the EU ETS Creates Cost Exposure
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-6">
              Under the EU ETS, companies must purchase and surrender EU Allowances (EUAs) to cover their verified annual emissions. Each allowance represents one tonne of CO₂. Failure to surrender results in financial penalties and reputational risk.
            </p>
            <p className="text-navy/70 text-lg leading-relaxed">
              EUAs are traded as a market commodity — on exchanges such as EEX and ICE, as well as over-the-counter. This means carbon is no longer a regulatory formality. It is a cost line subject to the same forces as any other traded commodity: supply constraints, policy shifts, and speculative activity.
            </p>
          </div>
        </div>
      </Section>

      {/* ETS2 Timeline Visual — Interactive */}
      <Section className="py-16 md:py-24 bg-gradient-to-b from-navy via-[#0a1628] to-navy overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Regulatory Timeline
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              EU ETS2 — Expanding the Carbon Market
            </h2>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              Click the diagram below to view it in full screen
            </p>
          </div>

          {/* Decorative glow behind card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gold/5 rounded-2xl blur-2xl" />
            <div
              className="relative group cursor-pointer rounded-xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/5 transition-all duration-500 hover:border-gold/40 hover:shadow-gold/10"
              onClick={() => setLightbox(true)}
            >
              {/* Gold accent bar */}
              <div className="h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <div className="bg-white p-3 md:p-6">
                <img
                  src={ets2Image}
                  alt="EU ETS2 regulatory timeline — DG CLIMA framework"
                  className="w-full rounded"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gold/90 text-navy px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  View Full Size
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/30 text-xs text-center mt-6 italic tracking-wide">
            Source: DG CLIMA — EU Emissions Trading System framework
          </p>
        </div>
      </Section>

      {/* Lightbox overlay */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={ets2Image}
            alt="EU ETS2 regulatory timeline — DG CLIMA framework"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* Price Volatility */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Market Volatility
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Carbon Prices Are Volatile — and Structurally Rising
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">
            EUA prices have ranged from under €20 to over €100 within the current trading phase. This volatility is driven by forces that are difficult to predict and impossible to control at the individual company level.
          </p>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">
            For emissions-intensive businesses, unmanaged carbon price exposure can create significant P&L uncertainty — turning a stable operating quarter into a loss-making one on the back of a single regulatory announcement.
          </p>
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">
            Key Price Drivers
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'EU Climate Policy', desc: 'Tightening emissions caps and accelerated reduction targets under Fit for 55' },
              { title: 'Energy Market Conditions', desc: 'Gas and power price movements that shift the fuel switching economics' },
              { title: 'Regulatory Supply Adjustments', desc: 'Market Stability Reserve interventions that withdraw surplus allowances' },
              { title: 'Geopolitical Events', desc: 'Conflict, trade disruption, and sanctions that reshape energy flows' },
              { title: 'Financial Trading Activity', desc: 'Institutional investors and hedge funds participating in carbon futures' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-cream border border-warm-gray">
                <p className="text-navy font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ETS1 — Declining Free Allocation */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            ETS1 — Phase IV (2021–2030)
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Free Allocation Is Disappearing
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
            Heavy industry has historically received free carbon allowances to protect against carbon leakage — the risk that production moves outside Europe to avoid emissions costs. Under EU ETS Phase IV, these free allocations are being progressively reduced.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
            By 2034, free allocation for many sectors will be substantially eliminated, coinciding with the full implementation of the Carbon Border Adjustment Mechanism (CBAM). The result: even companies with flat or declining emissions face a growing annual procurement burden on the open market.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-3xl">
            This is not a future scenario. The reduction is already underway, and the gap between free allocation and actual emissions widens every compliance year.
          </p>

          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Industries Facing Allocation Decline
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

      {/* Expansion to New Sectors */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Widening Scope
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            New Sectors, New Obligations
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">
            The EU ETS is no longer confined to power stations and heavy industry. Recent legislative expansions have brought maritime shipping and intra-EEA aviation into the system, with maritime obligations phased in from 2024.
          </p>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">
            Many of these newly obligated sectors have no prior experience with carbon allowance procurement, exchange-traded instruments, or emissions verification cycles. They are entering a complex, fast-moving market without the internal infrastructure to manage it.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { sector: 'Maritime Shipping', detail: 'Phased obligation from 2024 — covering 40%, 70%, then 100% of verified emissions' },
              { sector: 'Aviation (Intra-EEA)', detail: 'Already obligated under ETS1 — free allocation declining annually' },
              { sector: 'Fuel Suppliers', detail: 'Entering under ETS2 as upstream regulated entities from 2027' },
              { sector: 'Road Transport Fuels', detail: 'Covered under ETS2 — obligation falls on distributors, not consumers' },
              { sector: 'Building Heating Fuels', detail: 'Natural gas and heating oil suppliers face new surrender requirements' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-white border border-warm-gray hover:border-gold/30 transition-colors duration-300"
              >
                <p className="text-navy font-semibold text-base mb-2">{item.sector}</p>
                <p className="text-navy/60 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ETS2 */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            ETS2 — The Second System
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            A New Carbon Market Is Already Live
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">
            ETS2 is a separate emissions trading system targeting fuel combustion in buildings, road transport, and small industrial installations. Unlike ETS1, the obligation falls upstream — on fuel suppliers and distributors, not end consumers.
          </p>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">
            Monitoring and reporting requirements are already in effect. The first allowance surrender is due May 2028, covering 2027 emissions. All ETS2 allowances will be fully auctioned — there is no free allocation.
          </p>
          <p className="text-navy/70 text-lg leading-relaxed mb-12 max-w-3xl">
            For fuel distributors who have never operated in a carbon market, ETS2 introduces immediate complexity: scope factor calculations, biomethane blending rules, multi-jurisdiction reporting, and allowance procurement via exchange or OTC channels.
          </p>

          {/* Timeline */}
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {[
              { year: '2025', milestone: 'Emissions monitoring and reporting begins', status: 'LIVE' },
              { year: '2026', milestone: 'Third-party emissions verification begins', status: 'UPCOMING' },
              { year: '2028', milestone: 'First allowance surrender — May 2028 for 2027 emissions', status: 'DEADLINE' },
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-navy text-center">
                <p className="text-gold/40 text-[10px] tracking-[0.3em] uppercase mb-2">{item.status}</p>
                <p className="text-gold text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  {item.year}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">{item.milestone}</p>
              </div>
            ))}
          </div>

          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Directly Obligated Entities Under ETS2
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {[
              'Natural gas distributors',
              'Heating oil suppliers',
              'Petrol and diesel distributors',
              'Fuel retailers and wholesalers',
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
        </div>
      </Section>

      {/* Indirect Exposure */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Beyond Direct Obligations
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Carbon Costs Propagate Through the Entire Energy System
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
            Companies that are not directly obligated under either ETS1 or ETS2 are not insulated from carbon costs. The price of carbon is now embedded in the marginal cost of electricity generation, wholesale gas pricing, and long-term power purchase agreements.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
            Under ETS2, fuel suppliers will pass through allowance costs to downstream customers — small industrial operators, building managers, and fleet operators will all see carbon embedded in their energy bills. This creates a new layer of cost exposure for businesses that may have no awareness of the EU ETS at all.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-3xl">
            Carbon is no longer a niche compliance issue. It is a structural variable in European energy pricing.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {[
              'Electricity market clearing prices',
              'Gas-fired generation cost stacking',
              'Wholesale power forward curves',
              'PPA and long-term procurement pricing',
              'Asset valuation and investment returns',
              'Cross-border competitiveness',
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
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Carbon Compliance Is Operationally Complex
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">
            Managing carbon exposure is not simply a matter of buying allowances once a year. It requires ongoing monitoring of price movements, regulatory changes, and cross-commodity positions. Allowance procurement must be timed against market conditions. Surrender deadlines are fixed and non-negotiable. Reporting requirements are audited externally.
          </p>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">
            For companies managing both power and carbon — particularly gas-fired generators, refineries, and integrated utilities — the interaction between energy trading positions and carbon liability creates a multi-layered risk management challenge that spans procurement, finance, and regulatory compliance simultaneously.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Allowance Procurement', desc: 'Timing purchases across spot, futures, and OTC to optimise cost' },
              { title: 'Price Risk Management', desc: 'Hedging exposure against volatile forward curves' },
              { title: 'Regulatory Reporting', desc: 'Annual verification, registry management, and audit readiness' },
              { title: 'Surrender Deadlines', desc: 'Fixed annual compliance dates with financial penalties for non-delivery' },
              { title: 'Cross-Commodity Exposure', desc: 'Correlated risk across power, gas, and carbon positions' },
              { title: 'Multi-Jurisdiction Operations', desc: 'EU ETS, UK ETS, and potential linkage complexities for international operators' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-warm-gray">
                <p className="text-navy font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Structural Shift */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            The Structural Reality
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Carbon Has Permanently Changed the Economics of European Energy
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
            The EU ETS is not a transitional programme. It is the permanent regulatory architecture for European decarbonisation, with progressively tighter caps, expanding sectoral coverage, and increasing market sophistication.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">
            For power generators, industrial operators, fuel suppliers, renewable asset owners, and energy investors, carbon is now a core variable in every major business decision — from capital allocation and asset acquisition to energy procurement and margin forecasting.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-3xl">
            Companies that treat carbon as an afterthought will find themselves at a structural disadvantage. Those that understand the market dynamics, regulatory trajectory, and cross-commodity interactions will be better positioned to protect margins and compete effectively in a carbon-constrained European economy.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Operating margins under pressure',
              'Energy procurement repricing',
              'Asset valuations shifting',
              'Investment theses rewritten',
              'Competitive positioning at stake',
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

      {/* Source attribution */}
      <section className="py-10 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-navy/30 text-xs tracking-wide">
            Sources: European Commission DG CLIMA; International Carbon Action Partnership (ICAP); EU ETS Directive 2003/87/EC as amended.
          </p>
          <div className="mt-8 pt-6 border-t border-navy/10">
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
