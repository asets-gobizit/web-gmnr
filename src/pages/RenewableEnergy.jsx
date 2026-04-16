import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

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
  const { t, langPrefix } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const heroStats = t('renewableEnergy.hero.stats')
  const projects = t('renewableEnergy.opportunity.projects')
  const comparisonRows = t('renewableEnergy.comparison.rows')
  const valenciaDetails = t('renewableEnergy.valencia.details')
  const valenciaStats = t('renewableEnergy.valencia.stats')
  const solvixDetails = t('renewableEnergy.solvix.details')
  const solvixStats = t('renewableEnergy.solvix.stats')
  const credibilityItems = t('renewableEnergy.credibility.items')

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
              {t('renewableEnergy.hero.label')}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('renewableEnergy.hero.heading')}{' '}
              <span className="italic text-gold">{t('renewableEnergy.hero.headingAccent')}</span>
            </h1>
            <p className="mt-8 text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              {t('renewableEnergy.hero.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {heroStats.map((stat, i) => (
              <StatPill key={i} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              {t('renewableEnergy.problem.label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              {t('renewableEnergy.problem.heading')}
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-6">{t('renewableEnergy.problem.p1')}</p>
            <p className="text-navy/70 text-lg leading-relaxed">{t('renewableEnergy.problem.p2')}</p>
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('renewableEnergy.opportunity.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('renewableEnergy.opportunity.heading')}{' '}
            <span className="italic text-gold">{t('renewableEnergy.opportunity.headingAccent')}</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
            {t('renewableEnergy.opportunity.description')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {projects.map((item, i) => (
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

      {/* Comparison */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('renewableEnergy.comparison.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-12" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('renewableEnergy.comparison.heading')}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-warm-gray">
                  <th className="text-left py-4 pr-8 text-navy/40 font-medium tracking-widest uppercase text-xs w-1/3"></th>
                  <th className="text-left py-4 pr-8 text-gold font-semibold tracking-widest uppercase text-xs">{t('renewableEnergy.valencia.heading')}</th>
                  <th className="text-left py-4 text-gold font-semibold tracking-widest uppercase text-xs">{t('renewableEnergy.solvix.heading')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, val1, val2], i) => (
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

      {/* Valencia PV */}
      <Section className="py-20 md:py-28 bg-cream" id="valencia">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('renewableEnergy.valencia.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('renewableEnergy.valencia.heading')}
          </h2>
          <p className="text-navy/40 text-sm tracking-wide mb-10">
            {t('renewableEnergy.valencia.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {valenciaDetails.map((item, i) => (
                <div key={i} className="flex gap-6 border-b border-warm-gray pb-6 last:border-0">
                  <p className="text-navy/40 text-xs font-semibold tracking-widest uppercase w-36 shrink-0 pt-0.5">{item.label}</p>
                  <p className="text-navy/80 text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 content-start">
              {valenciaStats.map((item, i) => (
                <div key={i} className="p-6 bg-navy text-center">
                  <p className="text-gold text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {item.value}
                  </p>
                  <p className="text-white/40 text-xs tracking-[0.15em] uppercase">{item.label}</p>
                </div>
              ))}
              <div className="col-span-2 p-5 bg-gold/10 border border-gold/30 text-center">
                <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">{t('renewableEnergy.valencia.irrLabel')}</p>
                <p className="text-navy text-3xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>11.94%</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Solvix */}
      <Section className="py-20 md:py-28 bg-navy" id="solvix">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('renewableEnergy.solvix.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('renewableEnergy.solvix.heading')}
          </h2>
          <p className="text-white/30 text-sm tracking-wide mb-10">
            {t('renewableEnergy.solvix.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {solvixDetails.map((item, i) => (
                <div key={i} className="flex gap-6 border-b border-white/10 pb-6 last:border-0">
                  <p className="text-white/30 text-xs font-semibold tracking-widest uppercase w-36 shrink-0 pt-0.5">{item.label}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 content-start">
              {solvixStats.map((item, i) => (
                <div key={i} className="p-6 bg-navy-light border border-white/10 text-center">
                  <p className="text-gold text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {item.value}
                  </p>
                  <p className="text-white/40 text-xs tracking-[0.15em] uppercase">{item.label}</p>
                </div>
              ))}
              <div className="col-span-2 p-5 border border-gold/30 text-center">
                <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">{t('renewableEnergy.solvix.marketLabel')}</p>
                <p className="text-white text-sm leading-relaxed mt-2">
                  {t('renewableEnergy.solvix.marketText')} <span className="text-gold font-bold">{t('renewableEnergy.solvix.marketValue')}</span> {t('renewableEnergy.solvix.marketSuffix')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Credibility */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('renewableEnergy.credibility.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-12" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('renewableEnergy.credibility.heading')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {credibilityItems.map((item, i) => (
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
              to={`${langPrefix}/`}
              className="text-gold-dark text-sm font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              &larr; {t('renewableEnergy.backHome')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
