import { useState, useEffect, useId, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import Logo from './Logo'

/** Union Jack, the flag of the United Kingdom. */
function UnitedKingdomFlag({ className }) {
  const saltireId = `uk-saltire-${useId().replace(/:/g, '')}`
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={saltireId}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath={`url(#${saltireId})`} />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

/** Flag of Spain: 2:3, red–yellow–red bands with the yellow band twice each red band. */
function SpainFlag({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 90 60"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="90" height="60" fill="#AA151B" />
      <rect y="15" width="90" height="30" fill="#F1BF00" />
    </svg>
  )
}

const LANGUAGES = [
  { id: 'en', short: 'EN', full: 'English', flagClass: 'h-[14px] w-[28px]' },
  { id: 'es', short: 'ES', full: 'Español', flagClass: 'h-[14px] w-[21px]' },
]

function LanguageFlag({ id, className }) {
  if (id === 'en') return <UnitedKingdomFlag className={className} />
  return <SpainFlag className={className} />
}

function LanguageSwitcher({ lang, onSelect, variant }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const optionRefs = useRef([])
  const listId = useId()
  const desktop = variant === 'desktop'
  const current = LANGUAGES.find((item) => item.id === lang) || LANGUAGES[0]

  useEffect(() => {
    if (!open) return undefined
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const index = Math.max(0, LANGUAGES.findIndex((item) => item.id === lang))
    optionRefs.current[index]?.focus()
  }, [open, lang])

  const choose = (id) => {
    setOpen(false)
    buttonRef.current?.focus()
    if (id !== lang) onSelect(id)
  }

  const moveFocus = (delta) => {
    const items = optionRefs.current.filter(Boolean)
    const currentIndex = items.indexOf(document.activeElement)
    const next = items[(currentIndex + delta + items.length) % items.length]
    next?.focus()
  }

  return (
    <div
      ref={rootRef}
      className={desktop ? 'relative shrink-0' : 'relative self-start'}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        lang={current.id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={current.full}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            setOpen(true)
          }
        }}
        className={`flex items-center gap-1.5 border px-2 py-1.5 text-xs font-semibold tracking-widest uppercase cursor-pointer transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gold ${
          open ? 'border-gold/40 text-gold' : 'border-white/15 text-white/80 hover:border-gold/40 hover:text-gold'
        }`}
      >
        <LanguageFlag id={current.id} className={`block shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.45)] ${current.flagClass}`} />
        <span>{current.short}</span>
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label={lang === 'es' ? 'Idioma' : 'Language'}
          className={desktop
            ? 'absolute left-0 top-full z-50 mt-2 min-w-[11.5rem] border border-white/15 bg-navy py-1 shadow-xl'
            : 'mt-2 min-w-[11.5rem] border border-white/15 bg-navy py-1'}
        >
          {LANGUAGES.map((item, index) => {
            const selected = item.id === lang
            return (
              <button
                key={item.id}
                ref={(node) => { optionRefs.current[index] = node }}
                type="button"
                role="option"
                lang={item.id}
                tabIndex={-1}
                aria-selected={selected}
                onClick={() => choose(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    moveFocus(1)
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    moveFocus(-1)
                  } else if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    choose(item.id)
                  }
                }}
                className={`flex w-full items-center gap-2 whitespace-nowrap px-3 py-2 text-left text-xs cursor-pointer transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-gold ${
                  selected ? 'bg-white/10 text-gold' : 'text-white/80 hover:bg-white/5 hover:text-gold'
                }`}
              >
                <LanguageFlag id={item.id} className={`block shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.45)] ${item.flagClass}`} />
                <span className="font-semibold tracking-widest uppercase">{item.short}</span>
                <span className="font-medium normal-case tracking-normal">{item.full}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, langPrefix, t, switchLanguage } = useLanguage()

  const isHome = location.pathname === '/' || location.pathname === '/es' || location.pathname === '/es/'
  const isCarbonEts = location.pathname.includes('/projects/carbon-ets')
  const bookCallUrl = isCarbonEts
    ? 'https://gobizit.zohobookings.com/#/3843393000005967072'
    : 'https://gobizit.zohobookings.com/#/3843393000006051022'

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
      {/* Carbon ETS promo strip */}
      {isCarbonEts && (
        <div className="bg-gray-200 border-b border-navy/10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2.5 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8">
            <div className="text-center flex-1">
              <p className="text-navy text-xs md:text-sm font-semibold leading-snug">
                {t('carbonEts.banner.line1')}
              </p>
              <p className="text-navy text-xs md:text-sm font-semibold leading-snug">
                {t('carbonEts.banner.line2')}
              </p>
            </div>
            <motion.a
              href="https://gobizit.zohobookings.com/#/3843393000005967072"
              target="_blank"
              rel="noopener noreferrer"
              animate={{
                backgroundColor: ['rgba(26, 35, 50, 0)', 'rgba(26, 35, 50, 1)', 'rgba(26, 35, 50, 0)'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
              className="shrink-0 px-5 py-1.5 border border-gold text-gold text-[11px] md:text-xs font-semibold tracking-widest uppercase rounded-full hover:!bg-gold hover:text-navy transition-colors duration-300 whitespace-nowrap"
            >
              {t('carbonEts.banner.cta')}
            </motion.a>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <button onClick={goHome} className="cursor-pointer">
          <Logo size="sm" variant="light" />
        </button>

        {/* Desktop nav. Item gap is slightly tighter so both flags fit without squashing the logo. */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
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

          <LanguageSwitcher lang={lang} variant="desktop" onSelect={(next) => { if (next !== lang) switchLanguage() }} />

          {!isCarbonEts && (
            <a
              href={bookCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-6 py-2.5 border border-gold text-gold text-xs font-semibold tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300 cursor-pointer"
            >
              {t('nav.bookCall')}
            </a>
          )}
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
              <LanguageSwitcher
                lang={lang}
                variant="mobile"
                onSelect={(next) => {
                  if (next !== lang) switchLanguage()
                  setMobileOpen(false)
                }}
              />
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
              {!isCarbonEts && (
                <a
                  href={bookCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-6 py-3 border border-gold text-gold text-xs font-semibold tracking-widest uppercase text-center hover:bg-gold hover:text-navy transition-all cursor-pointer block"
                >
                  {t('nav.bookCall')}
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
