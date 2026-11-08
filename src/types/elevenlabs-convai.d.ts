import type { HTMLAttributes } from 'react'

// Official embed attributes read by @elevenlabs/convai-widget-embed 0.25.1.
type ElevenLabsConvaiAttributes = {
  'agent-id'?: string
  language?: string
  'override-language'?: string
  placement?: string
  'avatar-orb-color-1'?: string
  'avatar-orb-color-2'?: string
  'text-input'?: 'true' | 'false'
  'text-contents'?: string
}

type ElevenLabsConvaiElement = HTMLAttributes<HTMLElement> & ElevenLabsConvaiAttributes

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': ElevenLabsConvaiElement
    }
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': ElevenLabsConvaiElement
    }
  }
}
