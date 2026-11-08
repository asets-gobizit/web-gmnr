import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  CONVAI_EMBED_SRC,
  CONVAI_SCRIPT_ID,
  MARIA_AGENT_ID,
  MARIA_ORB_COLOR_1,
  MARIA_ORB_COLOR_2,
  loadConvaiEmbed,
  guyPhoneLink,
  GUY_PHONE_HREF,
  mariaWidgetAttributes,
  resetConvaiEmbedLoaderForTests,
  siteLanguage,
} from '../src/maria/convaiWidget.js'

function fakeDocument() {
  const scripts = []
  const registry = new Map()
  const customElements = {
    get(name) {
      return registry.get(name)
    },
    define(name, value) {
      registry.set(name, value)
    },
  }

  function makeScript() {
    const listeners = new Map()
    const script = {
      id: '',
      src: '',
      async: false,
      type: '',
      dataset: {},
      parentNode: null,
      addEventListener(type, fn) {
        const list = listeners.get(type) || []
        list.push(fn)
        listeners.set(type, list)
      },
      removeEventListener(type, fn) {
        const list = listeners.get(type) || []
        listeners.set(type, list.filter((item) => item !== fn))
      },
      remove() {
        const index = scripts.indexOf(script)
        if (index >= 0) scripts.splice(index, 1)
        script.parentNode = null
      },
      dispatch(type) {
        for (const fn of [...(listeners.get(type) || [])]) fn()
      },
    }
    return script
  }

  const body = {
    appendChild(node) {
      node.parentNode = body
      scripts.push(node)
    },
  }
  const doc = {
    body,
    head: null,
    documentElement: {},
    defaultView: { customElements },
    createElement(tag) {
      if (tag !== 'script') throw new Error(`unexpected element ${tag}`)
      return makeScript()
    },
    getElementById(id) {
      return scripts.find((script) => script.id === id) || null
    },
    querySelector(selector) {
      const match = selector.match(/^script\[src="([^"]+)"\]$/)
      if (!match) return null
      return scripts.find((script) => script.src === match[1]) || null
    },
  }
  return { doc, scripts, customElements }
}

describe('site language', () => {
  it('follows the /es prefix used by the site', () => {
    assert.equal(siteLanguage('/'), 'en')
    assert.equal(siteLanguage('/projects/carbon-ets'), 'en')
    assert.equal(siteLanguage('/es'), 'es')
    assert.equal(siteLanguage('/es/'), 'es')
    assert.equal(siteLanguage('/es/blog/market-entry'), 'es')
  })
})

describe('Maria widget attributes', () => {
  it('points the official element at Maria and the active language', () => {
    const english = mariaWidgetAttributes('en')
    const spanish = mariaWidgetAttributes('es')

    assert.equal(english['agent-id'], MARIA_AGENT_ID)
    assert.equal(english.language, 'en')
    assert.equal(english['override-language'], 'en')
    assert.equal(spanish.language, 'es')
    assert.equal(spanish['override-language'], 'es')
    assert.equal(english['avatar-orb-color-1'], MARIA_ORB_COLOR_1)
    assert.equal(english['avatar-orb-color-2'], MARIA_ORB_COLOR_2)
    assert.equal(english.placement, 'top-right')
    assert.equal(spanish.placement, 'top-right')
    assert.equal(english['text-input'], 'false')
    assert.equal(english.id, 'maria-voice')
    assert.equal(spanish.id, 'maria-voice')

    const englishText = JSON.parse(english['text-contents'])
    const spanishText = JSON.parse(spanish['text-contents'])
    assert.equal(englishText.main_label, 'Talk to us today')
    assert.equal(englishText.accept_terms, 'Agree')
    assert.equal(spanishText.main_label, 'Talk to us today')
    assert.equal(spanishText.start_call, 'Llamar a María')
    assert.equal(spanishText.accept_terms, 'Aceptar')
    assert.equal(english['aria-label'], 'Talk to us today')
    assert.equal(spanish['aria-label'], 'Talk to us today')
  })

  it('does not carry agent secrets, a branch id, or a terms storage key', () => {
    const attributes = mariaWidgetAttributes('es')
    const keys = Object.keys(attributes)
    for (const forbidden of ['signed-url', 'terms-key', 'override-prompt', 'override-first-message', 'override-voice-id']) {
      assert.equal(keys.includes(forbidden), false)
    }
    assert.equal(JSON.stringify(attributes).includes('agtbrch_'), false)
    assert.equal(JSON.stringify(attributes).includes('xi-api-key'), false)
    assert.equal(attributes['markdown-link-allowed-hosts'], undefined)
  })

  it('offers Guy only through the exact tel link', () => {
    assert.equal(GUY_PHONE_HREF, 'tel:+972502521213')
    assert.equal(guyPhoneLink('en').href, 'tel:+972502521213')
    assert.equal(guyPhoneLink('es').href, 'tel:+972502521213')
    assert.equal(guyPhoneLink('en').label, 'Call +972 50 252 1213')
    assert.equal(guyPhoneLink('es').label, 'Llamar al +972 50 252 1213')
    assert.equal(guyPhoneLink('en').label.includes('*'), false)
  })
})

describe('convai embed loader', { concurrency: 1 }, () => {
  it('inserts the pinned official script once when called twice', async () => {
    resetConvaiEmbedLoaderForTests()
    const { doc, scripts } = fakeDocument()
    const first = loadConvaiEmbed(doc)
    const second = loadConvaiEmbed(doc)
    assert.equal(first, second)
    assert.equal(scripts.length, 1)
    assert.equal(scripts[0].src, CONVAI_EMBED_SRC)
    assert.equal(scripts[0].id, CONVAI_SCRIPT_ID)
    assert.equal(scripts[0].async, true)
    scripts[0].dispatch('load')
    assert.equal(await first, 'ready')
    assert.equal(await second, 'ready')
    assert.equal(scripts.length, 1)
  })

  it('does not add a script when the custom element is already registered', async () => {
    resetConvaiEmbedLoaderForTests()
    const { doc, scripts, customElements } = fakeDocument()
    customElements.define('elevenlabs-convai', function Widget() {})
    assert.equal(await loadConvaiEmbed(doc), 'ready')
    assert.equal(scripts.length, 0)
  })

  it('waits for an existing embed script instead of adding another', async () => {
    resetConvaiEmbedLoaderForTests()
    const { doc, scripts } = fakeDocument()
    const existing = doc.createElement('script')
    existing.id = CONVAI_SCRIPT_ID
    existing.src = CONVAI_EMBED_SRC
    doc.body.appendChild(existing)
    const pending = loadConvaiEmbed(doc)
    assert.equal(scripts.length, 1)
    existing.dispatch('load')
    assert.equal(await pending, 'ready')
    assert.equal(scripts.length, 1)
  })

  it('retries once after a load error and then allows a later attempt', async () => {
    resetConvaiEmbedLoaderForTests()
    const { doc, scripts } = fakeDocument()
    const pending = loadConvaiEmbed(doc, { retries: 1 })
    assert.equal(scripts.length, 1)
    scripts[0].dispatch('error')
    await Promise.resolve()
    assert.equal(scripts.length, 1)
    assert.notEqual(scripts[0].dataset.convaiStatus, 'error')
    scripts[0].dispatch('load')
    assert.equal(await pending, 'ready')

    resetConvaiEmbedLoaderForTests()
    const again = fakeDocument()
    const failing = loadConvaiEmbed(again.doc, { retries: 0 })
    again.scripts[0].dispatch('error')
    await assert.rejects(failing, /failed to load/)
    assert.equal(again.scripts.length, 0)
    const recovered = loadConvaiEmbed(again.doc, { retries: 0 })
    assert.equal(again.scripts.length, 1)
    again.scripts[0].dispatch('load')
    assert.equal(await recovered, 'ready')
  })

  it('skips loading during pre-render', async () => {
    resetConvaiEmbedLoaderForTests()
    assert.equal(await loadConvaiEmbed(undefined), 'skipped')
  })
})
