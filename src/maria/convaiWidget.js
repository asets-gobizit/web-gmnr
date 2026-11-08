// Official ElevenLabs conversational widget.
// Docs: https://elevenlabs.io/docs/eleven-agents/customization/widget
// Package @elevenlabs/convai-widget-embed@0.25.1 (6 Nov 2026). The unversioned
// unpkg URL redirects to this exact file; the version is pinned so a later
// release cannot change the loader out from under the site.
//
// Maria's ElevenLabs branch is managed outside this repo. Do not put a branch
// id on the element, and do not change agent configuration from here.

export const MARIA_AGENT_ID = 'agent_0601m6we58v4fdaswsa082psggca'
export const MARIA_WIDGET_ID = 'maria-voice'
export const CONVAI_EMBED_VERSION = '0.25.1'
export const CONVAI_EMBED_SRC =
  'https://unpkg.com/@elevenlabs/convai-widget-embed@0.25.1/dist/index.js'
export const CONVAI_SCRIPT_ID = 'elevenlabs-convai-embed'

// Official default orb, which is also Maria's configured avatar.
export const MARIA_ORB_COLOR_1 = '#2792dc'
export const MARIA_ORB_COLOR_2 = '#9ce6e6'

// Widget UI strings. The embed does not translate these from the site language;
// language presets on the agent supply the greeting and the terms body.
// "Agree" / "Aceptar" match the verbs already used in those terms.
const TEXT = {
  en: {
    main_label: 'Talk to Maria',
    start_call: 'Call Maria',
    start_chat: 'Message Maria',
    end_call: 'End call',
    expand: 'Open',
    collapse: 'Close',
    change_language: 'Change language',
    accept_terms: 'Agree',
    dismiss_terms: 'Cancel',
    listening_status: 'Listening',
    speaking_status: 'Talk to interrupt',
    mute_microphone: 'Mute microphone',
    input_label: 'Text message input',
    input_placeholder: 'Send a message...',
  },
  es: {
    main_label: 'Habla con María',
    start_call: 'Llamar a María',
    start_chat: 'Escribir a María',
    end_call: 'Finalizar llamada',
    expand: 'Abrir',
    collapse: 'Cerrar',
    change_language: 'Cambiar idioma',
    accept_terms: 'Aceptar',
    dismiss_terms: 'Cancelar',
    listening_status: 'Escuchando',
    speaking_status: 'Habla para interrumpir',
    mute_microphone: 'Silenciar micrófono',
    input_label: 'Mensaje de texto',
    input_placeholder: 'Enviar un mensaje...',
  },
}

// Same rule as LanguageContext: Spanish lives under /es.
export function siteLanguage(pathname) {
  return String(pathname || '').startsWith('/es') ? 'es' : 'en'
}

export function mariaText(language) {
  return TEXT[language] || TEXT.en
}

// Attributes the embed actually reads (convai-widget-core 0.25.1 CustomAttributeList).
// override-language wins over stored and browser language and selects Maria's
// English or Spanish greeting. text-input is off so opening the widget shows the
// voice orb and call button; a text greeting would collapse that orb. This does
// not change the agent. terms-key is intentionally omitted so the widget keeps
// its own consent prompt.
export function mariaWidgetAttributes(language) {
  const lang = language === 'es' ? 'es' : 'en'
  const text = mariaText(lang)
  return {
    id: MARIA_WIDGET_ID,
    'agent-id': MARIA_AGENT_ID,
    language: lang,
    'override-language': lang,
    placement: 'bottom-right',
    'avatar-orb-color-1': MARIA_ORB_COLOR_1,
    'avatar-orb-color-2': MARIA_ORB_COLOR_2,
    'text-input': 'false',
    'text-contents': JSON.stringify(text),
    'aria-label': text.main_label,
  }
}

let loadPromise = null

export function resetConvaiEmbedLoaderForTests() {
  loadPromise = null
}

function scriptParent(doc) {
  return doc.body || doc.head || doc.documentElement
}

function findEmbedScript(doc) {
  if (typeof doc.getElementById === 'function') {
    const byId = doc.getElementById(CONVAI_SCRIPT_ID)
    if (byId) return byId
  }
  if (typeof doc.querySelector === 'function') {
    return doc.querySelector(`script[src="${CONVAI_EMBED_SRC}"]`)
  }
  return null
}

function whenLoaded(script) {
  if (script.dataset?.convaiStatus === 'loaded') return Promise.resolve('ready')
  if (script.dataset?.convaiStatus === 'error') {
    return Promise.reject(new Error('ElevenLabs voice widget failed to load'))
  }
  return new Promise((resolve, reject) => {
    const onLoad = () => {
      if (script.dataset) script.dataset.convaiStatus = 'loaded'
      cleanup()
      resolve('ready')
    }
    const onError = () => {
      if (script.dataset) script.dataset.convaiStatus = 'error'
      cleanup()
      reject(new Error('ElevenLabs voice widget failed to load'))
    }
    const cleanup = () => {
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
    }
    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)
  })
}

function installScript(doc) {
  const existing = findEmbedScript(doc)
  if (existing) return whenLoaded(existing)

  const script = doc.createElement('script')
  script.id = CONVAI_SCRIPT_ID
  script.async = true
  script.type = 'text/javascript'
  script.src = CONVAI_EMBED_SRC
  script.dataset.convaiStatus = 'loading'
  const pending = whenLoaded(script)
  scriptParent(doc).appendChild(script)
  return pending
}

async function attempt(doc, retriesLeft) {
  try {
    const status = await installScript(doc)
    const defined = doc.defaultView?.customElements?.get?.('elevenlabs-convai')
    if (defined || status === 'ready') return 'ready'
    return 'ready'
  } catch (error) {
    const failed = findEmbedScript(doc)
    failed?.remove?.()
    if (retriesLeft > 0) return attempt(doc, retriesLeft - 1)
    throw error
  }
}

// Loads the official embed once per page. A failed attempt can be retried;
// a second call while loading does not insert another script. No-ops when the
// custom element is already registered, and does nothing during pre-render.
export function loadConvaiEmbed(doc, options = {}) {
  if (!doc?.createElement) return Promise.resolve('skipped')
  if (doc.defaultView?.customElements?.get?.('elevenlabs-convai')) {
    return Promise.resolve('ready')
  }
  if (loadPromise) return loadPromise

  const retries = Number.isInteger(options.retries) ? options.retries : 1
  loadPromise = attempt(doc, retries).then(
    (status) => status,
    (error) => {
      loadPromise = null
      throw error
    },
  )
  return loadPromise
}
