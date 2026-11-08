import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  guyPhoneLink,
  loadConvaiEmbed,
  mariaText,
  mariaWidgetAttributes,
  siteLanguage,
} from '../maria/convaiWidget.js'

// One official <elevenlabs-convai> for the whole site. It stays mounted across
// / and /es so language changes update attributes instead of adding a widget.
// Nothing here starts a call.
export default function MariaWidget() {
  const { pathname } = useLocation()
  const language = siteLanguage(pathname)
  const attributes = mariaWidgetAttributes(language)
  const guyPhone = guyPhoneLink(language)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadConvaiEmbed(document).then(
      () => {
        if (!cancelled) setUnavailable(false)
      },
      () => {
        if (!cancelled) setUnavailable(true)
      },
    )
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <elevenlabs-convai
        {...attributes}
        style={{ zIndex: 40 }}
      />
      <a className="guy-direct-call" href={guyPhone.href}>
        {guyPhone.label}
      </a>
      {unavailable ? (
        <p className="sr-only" role="status">
          {mariaText(language).main_label}: {language === 'es'
            ? 'el asistente de voz no está disponible.'
            : 'the voice assistant is unavailable.'}
        </p>
      ) : null}
    </>
  )
}
