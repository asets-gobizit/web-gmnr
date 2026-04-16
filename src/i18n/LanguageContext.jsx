import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import en from './en'
import es from './es'

const LanguageContext = createContext()

const translations = { en, es }

export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const lang = location.pathname.startsWith('/es') ? 'es' : 'en'
  const langPrefix = lang === 'es' ? '/es' : ''

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useMemo(() => {
    const strings = translations[lang]
    return (key) => {
      const keys = key.split('.')
      let val = strings
      for (const k of keys) {
        val = val?.[k]
      }
      return val ?? key
    }
  }, [lang])

  const switchLanguage = () => {
    const path = location.pathname
    if (lang === 'es') {
      // Remove /es prefix
      const newPath = path.replace(/^\/es/, '') || '/'
      navigate(newPath)
    } else {
      // Add /es prefix
      navigate('/es' + path)
    }
  }

  const value = useMemo(
    () => ({ lang, langPrefix, t, switchLanguage }),
    [lang, langPrefix, t]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
