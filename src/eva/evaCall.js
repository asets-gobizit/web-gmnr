// Maria ("Eva" internally) — browser voice call with the GMnR ElevenLabs agent.
// The agent introduces herself as Maria, so every visible string says Maria.
//
// This replaces the official <elevenlabs-convai> embed with the same live-call
// panel used on gobizit.ai (timer, transcript, download, mute, end call), so
// the UI can be themed to the GMnR navy/gold palette. The agent itself is
// unchanged and is still managed in ElevenLabs, not from this repo.
//
// The SDK is loaded from the CDN at call time (not bundled) so the site ships
// nothing extra until a visitor actually starts a call.

export const EVA_AGENT_ID = 'agent_0601m6we58v4fdaswsa082psggca'
export const EVA_SDK_VERSION = '1.29.0'
export const EVA_SDK_SRC =
  'https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.29.0/dist/lib.iife.js'
export const EVA_SDK_SCRIPT_ID = 'elevenlabs-client-sdk'

export const EVA_CONTACT_EMAIL = 'guym@gmnrconsultants.com'
export const EVA_BOOKING_URL = {
  en: 'https://gobizit.zohobookings.com/#/3843393000006051022',
  es: 'https://gobizit.zohobookings.com/#/3843393000005967072',
}

const TEXT = {
  en: {
    launcher: 'Talk with Maria',
    launcherSub: 'AI assistant · in your browser',
    title: 'Live call with Maria',
    connecting: 'Connecting…',
    listening: 'Listening — go ahead and talk',
    speaking: 'Maria is speaking…',
    muted: "Muted — Maria can't hear you",
    ended: 'Call ended',
    endedThanks: 'Call ended — thanks for talking to Maria!',
    hint: 'Speak naturally — Maria is listening. The transcript appears here.',
    you: 'You',
    agent: 'Maria',
    mute: 'Mute',
    unmute: 'Unmute',
    endCall: 'End call',
    talkAgain: 'Talk again',
    close: 'Close',
    download: 'Download transcript',
    micBlocked: 'Microphone blocked. Allow mic access, or email ' + EVA_CONTACT_EMAIL,
    failed: 'Could not connect. Please email ' + EVA_CONTACT_EMAIL,
    book: 'Book a free consultation',
    language: 'English',
  },
  es: {
    launcher: 'Habla con María',
    launcherSub: 'Asistente de IA · en tu navegador',
    title: 'Llamada en directo con María',
    connecting: 'Conectando…',
    listening: 'Escuchando — puedes hablar',
    speaking: 'María está hablando…',
    muted: 'Silenciado — María no puede oírte',
    ended: 'Llamada finalizada',
    endedThanks: '¡Llamada finalizada — gracias por hablar con María!',
    hint: 'Habla con naturalidad — María te escucha. La transcripción aparece aquí.',
    you: 'Tú',
    agent: 'María',
    mute: 'Silenciar',
    unmute: 'Activar micro',
    endCall: 'Finalizar llamada',
    talkAgain: 'Hablar de nuevo',
    close: 'Cerrar',
    download: 'Descargar transcripción',
    micBlocked: 'Micrófono bloqueado. Permite el acceso o escribe a ' + EVA_CONTACT_EMAIL,
    failed: 'No se pudo conectar. Escríbenos a ' + EVA_CONTACT_EMAIL,
    book: 'Reserva una consulta gratuita',
    language: 'Español',
  },
}

// Same rule as LanguageContext: Spanish lives under /es.
export function siteLanguage(pathname) {
  return String(pathname || '').startsWith('/es') ? 'es' : 'en'
}

export function evaText(language) {
  return TEXT[language] || TEXT.en
}

export function bookingUrl(language) {
  return EVA_BOOKING_URL[language] || EVA_BOOKING_URL.en
}

// Agent lines that offer a meeting get a booking button under the bubble.
const BOOKING_HINT = /(book|booking|schedule|consultation|discovery call|reserva|reservar|agendar|cita|consulta gratuita)/i

export function mentionsBooking(text) {
  return BOOKING_HINT.test(String(text || ''))
}

// Strips the bracketed stage directions the agent sometimes emits.
export function cleanMessage(text) {
  return String(text || '')
    .replace(/\[[^\]]{1,30}\]\s*/g, '')
    .trim()
}

export function formatElapsed(seconds) {
  const s = Math.max(0, Math.floor(seconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export function transcriptFile(messages, language) {
  const t = evaText(language)
  const now = new Date()
  const lines = [`GMnR Consultants · ${t.title}`, now.toLocaleString(), '']
  for (const m of messages) {
    lines.push(`${m.source === 'user' ? t.you : t.agent}: ${m.text}`, '')
  }
  return {
    text: lines.join('\n'),
    name: `maria-call-${now.toISOString().slice(0, 16).replace(/[:T]/g, '-')}.txt`,
  }
}

let sdkPromise = null

export function resetEvaSdkLoaderForTests() {
  sdkPromise = null
}

// Loads @elevenlabs/client once, from the CDN, and resolves with the global.
export function loadEvaSdk(doc = typeof document === 'undefined' ? null : document) {
  if (!doc?.createElement) return Promise.reject(new Error('No document'))
  const view = doc.defaultView || (typeof window === 'undefined' ? null : window)
  if (view?.ElevenLabsClient) return Promise.resolve(view.ElevenLabsClient)
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise((resolve, reject) => {
    const existing = doc.getElementById(EVA_SDK_SCRIPT_ID)
    const script = existing || doc.createElement('script')
    const done = () => {
      if (view?.ElevenLabsClient) resolve(view.ElevenLabsClient)
      else reject(new Error('ElevenLabs SDK missing'))
    }
    script.addEventListener('load', done)
    script.addEventListener('error', () => {
      script.remove()
      sdkPromise = null
      reject(new Error('ElevenLabs SDK failed to load'))
    })
    if (!existing) {
      script.id = EVA_SDK_SCRIPT_ID
      script.async = true
      script.src = EVA_SDK_SRC
      ;(doc.body || doc.head || doc.documentElement).appendChild(script)
    }
  })
  return sdkPromise
}
