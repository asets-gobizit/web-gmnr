import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, langPrefix, t, switchLanguage } = useLanguage()

  const isHome = location.pathname === '/' || location.pathname === '/es' || location.pathname === '/es/'

  const links = [
    { label: t('nav.about'), section: 'about' },
    { label: t('nav.services'), section: 'services' },
    { label: t('nav.process'), section: 'process' },
    { label: t('nav.insights'), section: 'blog' },
    { label: t('nav.contact'), section: 'contact' },
  ]

  const projectLinks = [
    { label: t('nav.carbonEts'), route: `${langPrefix}/projects/carbon-ets` },
    { label: t('nav.renewableEnergy'), route: `${langPrefix}/projects/renewable-energy` },
  ]

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
      navigate(`${langPrefix}/`)
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
      navigate(`${langPrefix}/`)
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
          {links.map((link) => (
            <button
              key={link.section}
              onClick={() => scrollToSection(link.section)}
              className="text-white/70 text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Projects dropdown */}
          <div className="relative">
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="text-white/70 text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors duration-300 cursor-pointer flex items-center gap-1"
            >
              {t('nav.projects')}
              <svg className={`w-3 h-3 mt-0.5 transition-transform ${projectsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {projectsOpen && (
              <div className="absolute top-full right-0 pt-2">
                <div className="bg-navy border border-white/10 shadow-xl min-w-[180px]">
                  {projectLinks.map((pl) => (
                    <button
                      key={pl.route}
                      onClick={() => { navigate(pl.route); setProjectsOpen(false) }}
                      className="block w-full text-left px-5 py-3 text-white/70 text-sm tracking-widest uppercase hover:text-gold hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                    >
                      {pl.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language switcher */}
          <button
            onClick={switchLanguage}
            className="text-white/50 text-xs font-semibold tracking-widest uppercase hover:text-gold transition-colors duration-300 cursor-pointer border border-white/15 px-3 py-1.5 hover:border-gold/40"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          <a
            href="https://gobizit.zohobookings.com/#/3843393000005967072"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-6 py-2.5 border border-gold text-gold text-xs font-semibold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300 cursor-pointer"
          >
            {t('nav.bookCall')}
          </a>
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
              {/* Language switcher mobile */}
              <button
                onClick={() => { switchLanguage(); setMobileOpen(false) }}
                className="self-start text-white/50 text-xs font-semibold tracking-widest uppercase border border-white/15 px-3 py-1.5 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'ES \u2014 Espa\u00F1ol' : 'EN \u2014 English'}
              </button>
              <div className="border-t border-white/10 my-1" />

              {/* Projects section */}
              <span className="text-white/40 text-xs tracking-widest uppercase">{t('nav.projects')}</span>
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
              <a
                href="https://gobizit.zohobookings.com/#/3843393000005967072"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 border border-gold text-gold text-xs font-semibold tracking-widest uppercase text-center hover:bg-gold hover:text-navy transition-all cursor-pointer block"
              >
                {t('nav.bookCall')}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
