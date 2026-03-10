import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import guyPhoto from '../assets/guy-molcho-new.png'
import dannyPhoto from '../assets/danny-nissani.png'

const guyCredentials = [
  { label: 'Years of Experience', value: '20+' },
  { label: 'Markets Entered', value: '15+' },
  { label: 'Deals Closed', value: '50+' },
]

const dannyCredentials = [
  { label: 'Years of Experience', value: '20+' },
  { label: 'Markets Entered', value: '15+' },
  { label: 'Deals Closed', value: '50+' },
]

function PersonCard({ photo, altText, name, title, bio, credentials, reverse, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
      {/* Photo */}
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

      {/* Text */}
      <div className={reverse ? 'lg:col-start-1 lg:row-start-1' : ''}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6"
        >
          About
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
  return (
    <section id="about" className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-32">

        <PersonCard
          photo={guyPhoto}
          altText="Guy Molcho — Founder of GMnR Consultants"
          name="Guy Molcho"
          title="Founder & Principal Consultant"
          bio={[
            'With over two decades in international business development, M&A advisory, and strategic growth consulting, I help companies expand into new markets and close deals that move the needle.',
            "My background spans renewable energy, clean-tech, real estate finance, and cross-border transactions. I've worked with multinationals and startups alike — from securing key accounts in new territories to structuring joint ventures and acquisition deals across Europe, Asia, and the Americas.",
            'GMnR Consultants exists because not every company needs a full-time business development team — but every company deserves one that delivers.',
          ]}
          credentials={guyCredentials}
          reverse={false}
          delay={0}
        />

        <PersonCard
          photo={dannyPhoto}
          altText="Danny Nissani — AI-Driven Business Systems Architect"
          name="Danny Nissani"
          title="AI-Driven Business Systems Architect"
          bio={[
            'Danny Nissani specializes in building the technological and operational infrastructure that enables companies to scale internationally and operate more efficiently. With over two decades of experience in enterprise systems and digital transformation, he focuses on applying advanced AI automation, intelligent workflows, and integrated business architectures to support strategic growth.',
            'His background combines technology, business systems architecture, and legal expertise, allowing him to bridge complex operational challenges with practical commercial execution. Danny also brings strong negotiation and deal-structuring capabilities, supporting cross-border partnerships and renewable energy initiatives.',
            'At GMnR Consultants, Danny develops AI-driven systems that support market expansion and scalable international collaboration.',
          ]}
          credentials={dannyCredentials}
          reverse={true}
          delay={0.1}
        />

      </div>
    </section>
  )
}
