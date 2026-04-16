import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative py-32 md:py-48 bg-navy overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/20 to-navy-dark" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block ml-12" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block mr-12" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-8"
        >
          {t('finalCta.label')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {t('finalCta.heading')}{' '}
          <span className="italic text-gold">{t('finalCta.headingAccent')}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/45 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-14"
        >
          {t('finalCta.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <a
            href="mailto:guym@gmnrconsultants.com"
            className="px-12 py-5 bg-gold text-navy text-sm font-bold tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
          >
            {t('finalCta.cta')}
          </a>
          <a
            href="mailto:guym@gmnrconsultants.com"
            className="text-white/50 text-sm tracking-wide hover:text-gold transition-colors duration-300"
          >
            guym@gmnrconsultants.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
