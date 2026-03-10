import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { label: 'About', section: 'about' },
  { label: 'Services', section: 'services' },
  { label: 'Process', section: 'process' },
  { label: 'Insights', section: 'blog' },
  { label: 'Contact', section: 'contact' },
]

const projectLinks = [
  { label: 'Energy', route: '/energy' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (section) => {
    if (isHome) {
      const el = document.getElementById(section)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      // Wait for homepage to render, then scroll
      setTimeout(() => {
        const el = document.getElementById(section)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const goHome = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? 'bg-navy/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <button onClick={goHome} className="cursor-pointer">
          <Logo size="sm" variant="light" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {/* Projects dropdown — first item */}
          <div className="relative group">
            <button className="text-white/70 text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors duration-300 cursor-pointer flex items-center gap-1">
              Projects
              <svg className="w-3 h-3 mt-0.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-navy border border-white/10 shadow-xl min-w-[180px]">
                {projectLinks.map((pl) => (
                  <button
                    key={pl.route}
                    onClick={() => navigate(pl.route)}
                    className="block w-full text-left px-5 py-3 text-white/70 text-sm tracking-widest uppercase hover:text-gold hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                  >
                    {pl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {links.map((link) => (
            <button
              key={link.section}
              onClick={() => scrollToSection(link.section)}
              className="text-white/70 text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="ml-4 px-6 py-2.5 border border-gold text-gold text-xs font-semibold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300 cursor-pointer"
          >
            Book a Call
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {/* Projects section */}
              <span className="text-white/40 text-xs tracking-widest uppercase">Projects</span>
              {projectLinks.map((pl) => (
                <button
                  key={pl.route}
                  onClick={() => { navigate(pl.route); setMobileOpen(false) }}
                  className="text-white/80 text-sm tracking-widest uppercase hover:text-gold transition-colors text-left cursor-pointer pl-4"
                >
                  {pl.label}
                </button>
              ))}
              <div className="border-t border-white/10 my-2" />
              {links.map((link) => (
                <button
                  key={link.section}
                  onClick={() => { scrollToSection(link.section); setMobileOpen(false) }}
                  className="text-white/80 text-sm tracking-widest uppercase hover:text-gold transition-colors text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { scrollToSection('contact'); setMobileOpen(false) }}
                className="mt-2 px-6 py-3 border border-gold text-gold text-xs font-semibold tracking-widest uppercase text-center hover:bg-gold hover:text-navy transition-all cursor-pointer"
              >
                Book a Call
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
