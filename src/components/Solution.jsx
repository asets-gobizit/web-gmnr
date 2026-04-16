import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const icons = [
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>,
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
]

function ServiceCard({ service, icon, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative bg-white p-10 md:p-12 border border-warm-gray hover:border-gold/30 transition-all duration-500"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="text-gold mb-8">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
        {service.title}
      </h3>
      <p className="text-navy/55 leading-relaxed text-base">
        {service.description}
      </p>
    </motion.div>
  )
}

export default function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  const services = t('solution.services')

  return (
    <section id="services" className="py-28 md:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          >
            {t('solution.label')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('solution.heading')}{' '}
            <span className="italic text-gold-dark">{t('solution.headingAccent')}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} icon={icons[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
