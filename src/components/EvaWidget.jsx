import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  EVA_AGENT_ID,
  bookingUrl,
  cleanMessage,
  evaText,
  formatElapsed,
  loadEvaSdk,
  mentionsBooking,
  siteLanguage,
  transcriptFile,
} from '../eva/evaCall.js'
import './EvaWidget.css'

// Floating launcher + live-call panel for Eva (ElevenLabs voice agent).
// Nothing loads or connects until the visitor clicks the launcher.
export default function EvaWidget() {
  const { pathname } = useLocation()
  const language = siteLanguage(pathname)
  const t = useMemo(() => evaText(language), [language])

  const [open, setOpen] = useState(false)
  const [live, setLive] = useState(false)
  const [ended, setEnded] = useState(false)
  const [busy, setBusy] = useState(false)
  const [muted, setMuted] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState(false)
  const [messages, setMessages] = useState([])
  const [elapsed, setElapsed] = useState(0)

  const convRef = useRef(null)
  const timerRef = useRef(0)
  const bodyRef = useRef(null)
  const startedAtRef = useRef(0)

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = 0
    }
  }

  const finish = useCallback(
    (text, isError) => {
      clearTimer()
      setLive(false)
      setSpeaking(false)
      setEnded(true)
      setStatus(text || t.ended)
      setError(!!isError)
    },
    [t],
  )

  const stop = useCallback(() => {
    const conv = convRef.current
    convRef.current = null
    if (conv) conv.endSession?.().catch(() => {})
    finish(t.endedThanks, false)
  }, [finish, t])

  const start = useCallback(async () => {
    if (busy || convRef.current) return
    setBusy(true)
    setOpen(true)
    setEnded(false)
    setError(false)
    setMuted(false)
    setMessages([])
    setElapsed(0)
    setStatus(t.connecting)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
    } catch {
      setBusy(false)
      finish(t.micBlocked, true)
      return
    }

    try {
      const sdk = await loadEvaSdk()
      const conversation = await sdk.Conversation.startSession({
        agentId: EVA_AGENT_ID,
        connectionType: 'websocket',
        onConnect: () => {
          setLive(true)
          setStatus(t.listening)
          startedAtRef.current = Date.now()
          clearTimer()
          timerRef.current = setInterval(() => {
            setElapsed((Date.now() - startedAtRef.current) / 1000)
          }, 1000)
        },
        onMessage: (m) => {
          const text = cleanMessage(m?.message)
          if (!text) return
          const source = m?.source === 'user' || m?.role === 'user' ? 'user' : 'agent'
          const id = m?.response_id ?? m?.event_id ?? null
          setMessages((prev) => {
            const key = `${source}-${id}`
            if (id != null) {
              const at = prev.findIndex((entry) => entry.key === key)
              if (at > -1) {
                const next = prev.slice()
                next[at] = { ...next[at], text }
                return next
              }
            }
            return [...prev, { key: id != null ? key : `${source}-${prev.length}-${Date.now()}`, source, text }]
          })
        },
        onModeChange: (m) => {
          const isSpeaking = m?.mode === 'speaking'
          setSpeaking(isSpeaking)
          setStatus(isSpeaking ? t.speaking : muted ? t.muted : t.listening)
        },
        onDisconnect: () => {
          if (convRef.current) {
            convRef.current = null
            finish(t.endedThanks, false)
          }
        },
        onError: (message, context) => {
          console.error('[Eva] ElevenLabs error:', message, context)
        },
      })
      convRef.current = conversation
      setBusy(false)
    } catch (err) {
      console.error('[Eva] browser call failed:', err)
      convRef.current = null
      setBusy(false)
      finish(t.failed, true)
    }
  }, [busy, finish, muted, t])

  const toggleMute = useCallback(() => {
    const next = !muted
    setMuted(next)
    try {
      convRef.current?.setMicMuted?.(next)
    } catch {
      /* the SDK refuses only when the call already ended */
    }
    if (convRef.current) setStatus(next ? t.muted : t.listening)
  }, [muted, t])

  const download = useCallback(() => {
    const file = transcriptFile(messages, language)
    const blob = new Blob([file.text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      URL.revokeObjectURL(url)
      link.remove()
    }, 500)
  }, [language, messages])

  // Keep the newest line in view.
  useEffect(() => {
    const body = bodyRef.current
    if (body) body.scrollTop = body.scrollHeight
  }, [messages, status])

  // Never leave a call running behind a closed tab or a route change away.
  useEffect(() => {
    const onHide = () => {
      const conv = convRef.current
      convRef.current = null
      conv?.endSession?.().catch(() => {})
    }
    window.addEventListener('pagehide', onHide)
    return () => {
      window.removeEventListener('pagehide', onHide)
      clearTimer()
      onHide()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open && !convRef.current) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const closePanel = () => {
    if (convRef.current) stop()
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className={`eva-launcher${open ? ' eva-launcher--hidden' : ''}`}
        onClick={start}
        aria-label={t.launcher}
      >
        <span className="eva-launcher__icon" aria-hidden="true">
          <svg viewBox="0 0 512 512" focusable="false">
            <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
          </svg>
        </span>
        <span className="eva-launcher__label">
          <b>{t.launcher}</b>
          <small>{t.launcherSub}</small>
        </span>
      </button>

      <div
        className={[
          'eva-call',
          open ? 'is-open' : '',
          live ? 'is-live' : '',
          ended ? 'is-done' : '',
          speaking ? 'is-talking' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="dialog"
        aria-label={t.title}
        aria-hidden={open ? undefined : 'true'}
      >
        <div className="eva-call__head">
          <span className="eva-call__avatar" aria-hidden="true">E</span>
          <span className="eva-call__who">
            <b>{t.title}</b>
            <small className={error ? 'is-error' : undefined}>
              <span className="eva-dot" aria-hidden="true" />
              <span aria-live="polite">{status}</span>
            </small>
          </span>
          <span className="eva-call__timer">{formatElapsed(elapsed)}</span>
          <button
            type="button"
            className="eva-call__icon"
            onClick={download}
            disabled={messages.length === 0}
            title={t.download}
            aria-label={t.download}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
          </button>
          <button type="button" className="eva-call__icon eva-call__close" onClick={closePanel} aria-label={t.close}>
            &times;
          </button>
        </div>

        <div className="eva-call__body" ref={bodyRef} aria-live="polite">
          {messages.length === 0 ? (
            <p className="eva-call__hint">{t.hint}</p>
          ) : (
            messages.map((m) => (
              <div key={m.key} className={`eva-msg${m.source === 'user' ? ' eva-msg--user' : ''}`}>
                <em>{m.source === 'user' ? t.you : t.agent}</em>
                <span>{m.text}</span>
                {m.source === 'agent' && mentionsBooking(m.text) ? (
                  <a className="eva-msg__book" href={bookingUrl(language)} target="_blank" rel="noopener noreferrer">
                    {t.book}
                  </a>
                ) : null}
              </div>
            ))
          )}
        </div>

        <div className="eva-call__foot">
          {live ? <span className="eva-call__lang">{t.language}</span> : null}
          {live ? (
            <>
              <button type="button" className={`eva-btn eva-btn--mute${muted ? ' is-on' : ''}`} onClick={toggleMute} aria-pressed={muted}>
                {muted ? t.unmute : t.mute}
              </button>
              <button type="button" className="eva-btn eva-btn--end" onClick={stop}>
                {t.endCall}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="eva-btn eva-btn--again" onClick={start} disabled={busy}>
                {busy ? t.connecting : t.talkAgain}
              </button>
              <button type="button" className="eva-btn eva-btn--ghost" onClick={() => setOpen(false)}>
                {t.close}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
