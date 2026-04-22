import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
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

export default function CarbonEts() {
  const [lightbox, setLightbox] = useState(false)
  const { t, langPrefix } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-cream min-h-screen">
      {/* Top notice banner — high-visibility gold strip */}
      <div className="bg-navy pt-20">
        <div className="bg-gold border-y-2 border-navy/20 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-navy text-sm md:text-base font-semibold leading-relaxed text-center md:text-left">
              {t('carbonEts.banner.text')}
            </p>
            <a
              href="https://gobizit.zohobookings.com/#/3843393000005967072"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 self-center md:self-auto px-6 py-3 bg-navy text-gold text-xs font-bold tracking-widest uppercase hover:bg-navy-dark transition-all duration-300 whitespace-nowrap shadow-md"
            >
              {t('carbonEts.banner.cta')}
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-navy pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
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
              {t('carbonEts.hero.label')}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('carbonEts.hero.heading')}
            </h1>
            <p className="mt-8 text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              {t('carbonEts.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Core Mechanism */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              {t('carbonEts.coreMechanism.label')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              {t('carbonEts.coreMechanism.heading')}
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-6">
              {t('carbonEts.coreMechanism.p1')}
            </p>
            <p className="text-navy/70 text-lg leading-relaxed">
              {t('carbonEts.coreMechanism.p2')}
            </p>
          </div>
        </div>
      </Section>

      {/* ETS2 Timeline Visual */}
      <Section className="py-16 md:py-24 bg-gradient-to-b from-navy via-[#0a1628] to-navy overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {t('carbonEts.timeline.label')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              {t('carbonEts.timeline.heading')}
            </h2>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              {t('carbonEts.timeline.clickHint')}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gold/5 rounded-2xl blur-2xl" />
            <div
              className="relative group cursor-pointer rounded-xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/5 transition-all duration-500 hover:border-gold/40 hover:shadow-gold/10"
              onClick={() => setLightbox(true)}
            >
              <div className="h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <div className="bg-white p-3 md:p-6">
                <img src={ets2Image} alt="EU ETS2 regulatory timeline" className="w-full rounded" />
              </div>
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gold/90 text-navy px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  {t('carbonEts.timeline.viewFullSize')}
                </div>
              </div>
            </div>
          </div>

          <p className="text-white/30 text-xs text-center mt-6 italic tracking-wide">
            {t('carbonEts.timeline.source')}
          </p>
        </div>
      </Section>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={ets2Image}
            alt="EU ETS2 regulatory timeline"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* Price Volatility */}
      <Section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('carbonEts.volatility.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('carbonEts.volatility.heading')}
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">
            {t('carbonEts.volatility.p1')}
          </p>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">
            {t('carbonEts.volatility.p2')}
          </p>
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-5">
            {t('carbonEts.volatility.driversLabel')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t('carbonEts.volatility.drivers').map((item, i) => (
              <div key={i} className="p-6 bg-cream border border-warm-gray">
                <p className="text-navy font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Free Allocation */}
      <Section className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('carbonEts.freeAllocation.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('carbonEts.freeAllocation.heading')}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">{t('carbonEts.freeAllocation.p1')}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">{t('carbonEts.freeAllocation.p2')}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-3xl">{t('carbonEts.freeAllocation.p3')}</p>

          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('carbonEts.freeAllocation.industriesLabel')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t('carbonEts.freeAllocation.industries').map((industry, i) => (
              <div key={i} className="px-6 py-4 border border-white/10 text-white/80 text-sm font-medium tracking-wide text-center">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Expansion */}
      <Section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('carbonEts.expansion.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('carbonEts.expansion.heading')}
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">{t('carbonEts.expansion.p1')}</p>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">{t('carbonEts.expansion.p2')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t('carbonEts.expansion.sectors').map((item, i) => (
              <div key={i} className="p-8 bg-white border border-warm-gray hover:border-gold/30 transition-colors duration-300">
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
            {t('carbonEts.ets2.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('carbonEts.ets2.heading')}
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">{t('carbonEts.ets2.p1')}</p>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">{t('carbonEts.ets2.p2')}</p>
          <p className="text-navy/70 text-lg leading-relaxed mb-12 max-w-3xl">{t('carbonEts.ets2.p3')}</p>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {t('carbonEts.ets2.timelineItems').map((item, i) => (
              <div key={i} className="relative p-8 bg-navy text-center">
                <p className="text-gold/40 text-[10px] tracking-[0.3em] uppercase mb-2">{item.status}</p>
                <p className="text-gold text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>{item.year}</p>
                <p className="text-white/70 text-sm leading-relaxed">{item.milestone}</p>
              </div>
            ))}
          </div>

          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            {t('carbonEts.ets2.entitiesLabel')}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {t('carbonEts.ets2.entities').map((entity, i) => (
              <div key={i} className="flex items-center gap-3 p-5 bg-cream border border-warm-gray">
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
            {t('carbonEts.indirect.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('carbonEts.indirect.heading')}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">{t('carbonEts.indirect.p1')}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">{t('carbonEts.indirect.p2')}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-3xl">{t('carbonEts.indirect.p3')}</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {t('carbonEts.indirect.impacts').map((impact, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 border border-white/10">
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
            {t('carbonEts.complexity.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('carbonEts.complexity.heading')}
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed mb-4 max-w-3xl">{t('carbonEts.complexity.p1')}</p>
          <p className="text-navy/70 text-lg leading-relaxed mb-10 max-w-3xl">{t('carbonEts.complexity.p2')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t('carbonEts.complexity.items').map((item, i) => (
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
            {t('carbonEts.structural.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            {t('carbonEts.structural.heading')}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">{t('carbonEts.structural.p1')}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-3xl">{t('carbonEts.structural.p2')}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-3xl">{t('carbonEts.structural.p3')}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t('carbonEts.structural.impacts').map((item, i) => (
              <div key={i} className="px-6 py-4 border border-white/10 text-white/70 text-sm font-medium">
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
            {t('carbonEts.sources')}
          </p>
          <div className="mt-8 pt-6 border-t border-navy/10">
            <Link
              to={`${langPrefix}/`}
              className="text-gold-dark text-sm font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300"
            >
              &larr; {t('carbonEts.backHome')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
