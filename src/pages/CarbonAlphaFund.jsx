import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import content from '../i18n/carbonAlphaFund'

const BOOK_URL = 'https://gobizit.zohobookings.com/#/3843393000006051022'

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

// Monthly pro forma returns (%), July 2024 - October 2026: [year, month, value]
const MONTHLY_RETURNS = [
  [2024, 7, 4.1], [2024, 8, 6.6], [2024, 9, -4.8], [2024, 10, -2.3], [2024, 11, 4.5], [2024, 12, 2.8],
  [2025, 1, -6.1], [2025, 2, 6.3], [2025, 3, -6.2], [2025, 4, -0.7], [2025, 5, 19.1], [2025, 6, -2.8],
  [2025, 7, 17.0], [2025, 8, 0.8], [2025, 9, 9.0], [2025, 10, 9.9], [2025, 11, 6.8], [2025, 12, 5.0],
  [2026, 1, -14.8], [2026, 2, -12.3], [2026, 3, -0.5], [2026, 4, -1.1], [2026, 5, 11.4], [2026, 6, 6.9],
  [2026, 7, -0.6], [2026, 8, 14.7], [2026, 9, 9.1], [2026, 10, 18.6],
]

function formatReturn(value, lang) {
  const digits = Math.abs(value).toFixed(1)
  const text = lang === 'es' ? digits.replace('.', ',') : digits
  return (value < 0 ? '\u2212' : '+') + text
}

function MonthlyReturnsChart({ lang, months, ariaLabel }) {
  const W = 900
  const H = 380
  const padL = 46
  const padR = 12
  const padT = 24
  const padB = 58
  const min = -20
  const max = 20
  const innerW = W - padL - padR
  const innerH = H - padT - padB
  const y = (v) => padT + ((max - v) / (max - min)) * innerH
  const slot = innerW / MONTHLY_RETURNS.length
  const barW = slot * 0.66
  const ticks = [-20, -10, 0, 10, 20]
  const yearList = [2024, 2025, 2026]
  const yearOf = MONTHLY_RETURNS.map((r) => r[0])

  return (
    <svg viewBox={'0 0 ' + W + ' ' + H} role="img" aria-label={ariaLabel} className="w-full h-auto min-w-[760px]">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#ffffff" strokeOpacity={t === 0 ? 0.5 : 0.12} />
          <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#ffffff" fillOpacity="0.5">
            {t + '%'}
          </text>
        </g>
      ))}

      {MONTHLY_RETURNS.map(([yr, m, v], i) => {
        const x = padL + i * slot + (slot - barW) / 2
        const positive = v >= 0
        const top = y(Math.max(v, 0))
        const h = Math.max(Math.abs(y(v) - y(0)), 1)
        return (
          <g key={yr + '-' + m}>
            <rect x={x} y={top} width={barW} height={h} fill={positive ? '#c8a250' : '#d9695f'} />
            <text
              x={x + barW / 2}
              y={positive ? top - 5 : top + h + 12}
              textAnchor="middle"
              fontSize="9.5"
              fill="#ffffff"
              fillOpacity="0.75"
            >
              {formatReturn(v, lang)}
            </text>
            <text x={x + barW / 2} y={H - padB + 16} textAnchor="middle" fontSize="10.5" fill="#ffffff" fillOpacity="0.55">
              {months[m - 1]}
            </text>
          </g>
        )
      })}

      {yearList.map((yr) => {
        const x1 = padL + yearOf.indexOf(yr) * slot + 4
        const x2 = padL + (yearOf.lastIndexOf(yr) + 1) * slot - 4
        return (
          <g key={yr}>
            <line x1={x1} x2={x2} y1={H - padB + 28} y2={H - padB + 28} stroke="#ffffff" strokeOpacity="0.25" />
            <text x={(x1 + x2) / 2} y={H - padB + 46} textAnchor="middle" fontSize="12" fontWeight="600" fill="#ffffff" fillOpacity="0.7">
              {yr}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function CarbonAlphaFund() {
  const { lang, langPrefix } = useLanguage()
  const c = content[lang] || content.en

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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">{c.hero.label}</p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {c.hero.heading} <span className="italic text-gold">{c.hero.headingAccent}</span>
            </h1>
            <p className="mt-8 text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">{c.hero.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {c.hero.stats.map((stat, i) => (
              <StatPill key={i} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Strategy */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">{c.strategy.label}</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {c.strategy.heading}
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-6">{c.strategy.p1}</p>
            <p className="text-navy/70 text-lg leading-relaxed">{c.strategy.p2}</p>
          </div>
        </div>
      </Section>

      {/* Market */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">{c.market.label}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {c.market.heading}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">{c.market.description}</p>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {c.market.items.map((item, i) => (
              <div key={i} className="p-8 border border-white/10 hover:border-gold/30 transition-colors duration-300">
                <div className="h-1 w-12 bg-gold mb-6" />
                <p className="text-white text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  {item.title}
                </p>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Drivers */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">{c.drivers.label}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-12"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {c.drivers.heading}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.drivers.items.map((item, i) => (
              <div key={i} className="p-8 bg-cream border border-warm-gray hover:border-gold/30 transition-colors duration-300">
                <div className="h-1 w-8 bg-gold mb-6" />
                <p className="text-navy font-semibold text-base mb-3">{item.title}</p>
                <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-navy/40 text-sm mt-8 max-w-3xl">{c.drivers.note}</p>
        </div>
      </Section>

      {/* Track record (pro forma) */}
      <Section className="py-20 md:py-28 bg-navy" id="track-record">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">{c.performance.label}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {c.performance.heading}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">{c.performance.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-3xl">
            {c.performance.years.map((item, i) => (
              <StatPill key={i} value={item.value} label={item.label} />
            ))}
          </div>

          <div className="mt-12 border border-white/10 p-4 md:p-8">
            <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4">{c.performance.chartLabel}</p>
            <div className="overflow-x-auto">
              <MonthlyReturnsChart lang={lang} months={c.performance.months} ariaLabel={c.performance.chartAria} />
            </div>
          </div>

          <div className="mt-8 max-w-4xl space-y-3">
            {c.performance.notes.map((note, i) => (
              <p key={i} className="text-white/40 text-xs leading-relaxed">
                {note}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Founder */}
      <Section className="py-20 md:py-28 bg-cream" id="team">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">{c.founder.label}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {c.founder.name}
          </h2>
          <p className="text-navy/40 text-sm tracking-wide mb-4">{c.founder.role}</p>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">{c.founder.intro}</p>

          <div className="max-w-3xl space-y-6">
            {c.founder.details.map((item, i) => (
              <div key={i} className="flex gap-6 border-b border-warm-gray pb-6 last:border-0">
                <p className="text-navy/40 text-xs font-semibold tracking-widest uppercase w-36 shrink-0 pt-0.5">
                  {item.label}
                </p>
                <p className="text-navy/80 text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Opportunity */}
      <Section className="py-20 md:py-28 bg-navy" id="seed">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">{c.opportunity.label}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {c.opportunity.heading}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mb-10">{c.opportunity.description}</p>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-gold text-gold text-xs font-semibold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            {c.opportunity.cta}
          </a>
        </div>
      </Section>

      {/* Disclaimer + footer nav */}
      <section className="py-10 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="pt-6 border-t border-navy/10">
            <p className="text-navy/40 text-xs font-semibold tracking-widest uppercase mb-2">{c.disclaimer.label}</p>
            <p className="text-navy/50 text-xs leading-relaxed max-w-4xl mb-8">{c.disclaimer.text}</p>
            <Link
              to={`${langPrefix}/`}
              className="text-gold-dark text-sm font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              &larr; {c.backHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
