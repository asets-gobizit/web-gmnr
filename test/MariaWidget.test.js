import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import MariaWidget from '../src/components/MariaWidget.jsx'
import { MARIA_AGENT_ID } from '../src/maria/convaiWidget.js'

function renderAt(pathname) {
  return renderToString(
    createElement(StaticRouter, { location: pathname }, createElement(MariaWidget)),
  )
}

describe('MariaWidget server render', () => {
  it('renders one official element for English and Spanish and no loader script', () => {
    const english = renderAt('/projects/renewable-energy')
    const spanish = renderAt('/es/')

    for (const html of [english, spanish]) {
      assert.equal(html.match(/<elevenlabs-convai/g).length, 1)
      assert.equal(html.includes('<script'), false)
      assert.equal(html.includes(`agent-id="${MARIA_AGENT_ID}"`), true)
      assert.equal(html.includes('text-input="false"'), true)
      assert.equal(html.includes('placement="top-right"'), true)
      assert.equal(html.includes('Talk to us today'), true)
      assert.equal(html.includes('Talk to Maria'), false)
      assert.equal(html.includes('Habla con María'), false)
      assert.equal(html.includes('avatar-orb-color-1="#2792dc"'), true)
      assert.equal(html.includes('avatar-orb-color-2="#9ce6e6"'), true)
      assert.equal(html.includes('terms-key'), false)
      assert.equal(html.includes('signed-url'), false)
      assert.equal(html.includes('z-index:40'), true)
    }

    assert.equal(english.includes('override-language="en"'), true)
    assert.equal(english.includes('language="en"'), true)
    assert.equal(english.includes('Call Maria'), true)

    assert.equal(spanish.includes('override-language="es"'), true)
    assert.equal(spanish.includes('language="es"'), true)
    assert.equal(spanish.includes('Llamar a María'), true)
    assert.equal(spanish.includes('Aceptar'), true)
  })

  it('renders one tappable Guy number and does not dial by itself', () => {
    for (const [pathname, label] of [
      ['/', 'Call +972 50 252 1213'],
      ['/es/', 'Llamar al +972 50 252 1213'],
    ]) {
      const html = renderAt(pathname)
      const links = html.match(/<a[^>]*href="tel:\+972502521213"[^>]*>[^<]*<\/a>/g) || []
      assert.equal(links.length, 1)
      assert.equal(links[0].includes(`>${label}<`), true)
      assert.equal(links[0].includes('target='), false)
      assert.equal(links[0].includes('onclick'), false)
      assert.equal(html.includes('href="tel:+972502521213"'), true)
      assert.equal(html.includes('markdown-link-allowed-hosts'), false)
    }
  })
})
