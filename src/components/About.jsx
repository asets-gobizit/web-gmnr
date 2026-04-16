import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import guyPhoto from '../assets/guy-molcho-new.png'
import dannyPhoto from '../assets/danny-nissani.png'

function PersonCard({ photo, altText, name, title, bio, credentials, reverse, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <div ref={ref} className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay }}
        className={`relative ${reverse ? 'lg:col-start-2' : ''}`}
      >
        <div className="relative z-10">
          <img
            src={photo}
            alt={altText}
            className="w-full max-w-lg object-cover object-top"
            style={{ aspectRatio: '3/4' }}
          />
        </div>
        <div
          className={`absolute -bottom-6 ${reverse ? '-left-6' : '-right-6'} w-full max-w-lg border-2 border-gold/20 z-0`}
          style={{ aspectRatio: '3/4' }}
        />
      </motion.div>

      <div className={reverse ? 'lg:col-start-1 lg:row-start-1' : ''}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6"
        >
          {t('about.label')}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.3 }}
          className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.4 }}
          className="text-gold-dark font-semibold tracking-wide mb-8"
        >
          {title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.5 }}
          className="space-y-5 text-navy/55 leading-relaxed text-base md:text-lg mb-12"
        >
          {bio.map((para, i) => <p key={i}>{para}</p>)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.6 }}
          className="grid grid-cols-3 gap-6 pt-8 border-t border-warm-gray"
        >
          {credentials.map((c) => (
            <div key={c.label}>
              <p className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
                {c.value}
              </p>
              <p className="text-navy/40 text-xs tracking-wide mt-1 uppercase">{c.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const guy = t('about.guy')
  const danny = t('about.danny')

  return (
    <section id="about" className="pt-28 pb-12 md:pt-40 md:pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">
        <PersonCard
          photo={guyPhoto}
          altText="Guy Molcho — Founder of GMnR Consultants"
          name={guy.name}
          title={guy.title}
          bio={guy.bio}
          credentials={guy.credentials}
          reverse={false}
          delay={0}
        />
        <PersonCard
          photo={dannyPhoto}
          altText="Danny Nissani — AI-Driven Business Systems Architect"
          name={danny.name}
          title={danny.title}
          bio={danny.bio}
          credentials={danny.credentials}
          reverse={true}
          delay={0.1}
        />
      </div>
    </section>
  )
}
