import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function PainCard({ point, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="flex gap-8 items-start"
    >
      <span className="text-6xl md:text-7xl font-bold text-gold/15 leading-none shrink-0" style={{ fontFamily: 'var(--font-serif)' }}>
        {point.number}
      </span>
      <div className="pt-2">
        <h3 className="text-xl md:text-2xl font-bold text-navy mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          {point.title}
        </h3>
        <p className="text-navy/60 leading-relaxed text-base md:text-lg">
          {point.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Pain() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  const painPoints = t('pain.points')

  return (
    <section className="py-28 md:py-40 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div ref={ref} className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            >
              {t('pain.label')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t('pain.heading')}{' '}
              <span className="italic text-gold-dark">{t('pain.headingAccent')}</span>
            </motion.h2>
          </div>

          <div className="flex flex-col gap-14">
            {painPoints.map((point, i) => (
              <PainCard key={point.number} point={point} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
