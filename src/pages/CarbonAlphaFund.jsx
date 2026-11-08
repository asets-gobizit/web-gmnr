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
