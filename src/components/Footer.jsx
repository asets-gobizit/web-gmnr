import { useLanguage } from '../i18n/LanguageContext'
import Logo from './Logo'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-navy-dark py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo size="sm" variant="light" />
            <span className="text-white/20 text-sm">
              {t('footer.tagline')}
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="mailto:guym@gmnrconsultants.com"
              className="text-white/30 text-sm hover:text-gold transition-colors duration-300"
            >
              guym@gmnrconsultants.com
            </a>
            <a
              href="https://www.linkedin.com/in/guy-molcho-804b17b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-gold transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/15 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
