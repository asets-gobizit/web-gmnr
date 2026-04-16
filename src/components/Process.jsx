import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function Step({ step, index, totalSteps }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative"
    >
      {index < totalSteps - 1 && (
        <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-gradient-to-r from-gold/40 to-gold/10" />
      )}

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold/40 mb-8">
          <span className="text-gold font-bold text-lg">{step.number}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
          {step.title}
        </h3>
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
          {step.subtitle}
        </p>
        <p className="text-white/50 leading-relaxed max-w-xs mx-auto">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  const steps = t('process.steps')

  return (
    <section id="process" className="py-28 md:py-40 bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/[0.02] rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        <div ref={ref} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          >
            {t('process.label')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('process.heading')}{' '}
            <span className="italic text-gold">{t('process.headingAccent')}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} totalSteps={steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
