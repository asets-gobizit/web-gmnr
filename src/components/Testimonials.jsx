import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function TestimonialCard({ testimonial, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`${index === 0 ? 'md:col-span-2' : ''}`}
    >
      <div className="h-full bg-white p-10 md:p-14 border border-warm-gray relative">
        <span
          className="absolute top-6 left-8 text-8xl text-gold/10 leading-none pointer-events-none"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          &ldquo;
        </span>

        <blockquote className="relative z-10">
          <p className="text-navy/70 text-lg md:text-xl leading-relaxed mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
            {testimonial.quote}
          </p>
          <footer className="flex items-center gap-3">
            <div className="w-10 h-px bg-gold" />
            <div>
              <p className="text-navy font-semibold text-sm">{testimonial.author}</p>
              <p className="text-navy/40 text-xs tracking-wide">{testimonial.company}</p>
            </div>
          </footer>
        </blockquote>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  const items = t('testimonials.items')

  return (
    <section className="py-28 md:py-40 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          >
            {t('testimonials.label')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t('testimonials.heading')}{' '}
            <span className="italic text-gold-dark">{t('testimonials.headingAccent')}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
