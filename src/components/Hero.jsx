import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy py-24 md:py-28">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/30 to-navy" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gold accent line */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-6"
        >
          GMnR Consultants
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Business Development,{' '}
          <span className="italic text-gold">Outsourced</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/50 text-lg md:text-xl tracking-[0.15em] font-light mb-10"
        >
          Simple &middot; Efficient &middot; Fast
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <a
            href="#contact"
            className="px-10 py-4 bg-gold text-navy text-sm font-bold tracking-widest uppercase hover:bg-gold-light transition-all duration-300"
          >
            Book a Free Consultation
          </a>
          <a
            href="#services"
            className="px-10 py-4 border border-white/20 text-white/70 text-sm font-medium tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — animated arrow */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase group-hover:text-gold/60 transition-colors duration-300">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5 group-hover:border-gold/40 transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-gold/70"
            />
          </div>
        </motion.div>
      </motion.a>
    </section>
  )
}
