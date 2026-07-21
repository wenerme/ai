---
description: xAI's Grok text-to-speech model. Generates high-fidelity spoken audio in 5 expressive voices (eve, ara, rex, sal, leo) with 20+ supported languages. Supports inline speech tags for laughter, whispers, and pauses.
title: Grok TTS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

#  Grok TTS

 Text-to-Speech • xAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/xai/grok-tts/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` xai/grok-tts `

* Third-party

xAI's Grok text-to-speech model. Generates high-fidelity spoken audio in 5 expressive voices (eve, ara, rex, sal, leo) with 20+ supported languages. Supports inline speech tags for laughter, whispers, and pauses.

| Model Info        |                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                   |
| More information  | [link ↗](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech)                                  |
| Pricing           | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-tts) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-tts',
  { text: 'Hello! Welcome to the xAI Text to Speech API.', language: 'en' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-tts",
  "input": {
    "text": "Hello! Welcome to the xAI Text to Speech API.",
    "language": "en"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/xai/grok-tts/simple-generation.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Different Voice**  — Use the warm, conversational \`ara\` voice

```ts
const response = await env.AI.run(
  'xai/grok-tts',
  { text: 'Thank you for calling. How can I help you today?', voice_id: 'ara', language: 'en' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-tts",
  "input": {
    "text": "Thank you for calling. How can I help you today?",
    "voice_id": "ara",
    "language": "en"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/xai/grok-tts/different-voice.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**High-Fidelity MP3**  — 44.1 kHz / 192 kbps MP3 for production use

```ts
const response = await env.AI.run(
  'xai/grok-tts',
  {
    text: 'Crystal clear audio at maximum quality.',
    voice_id: 'rex',
    language: 'en',
    output_format: { codec: 'mp3', sample_rate: 44100, bit_rate: 192000 },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-tts",
  "input": {
    "text": "Crystal clear audio at maximum quality.",
    "voice_id": "rex",
    "language": "en",
    "output_format": {
      "codec": "mp3",
      "sample_rate": 44100,
      "bit_rate": 192000
    }
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/xai/grok-tts/high-fidelity-mp3.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Telephony (mulaw)**  — G.711 μ-law at 8 kHz for SIP / PSTN integration

```ts
const response = await env.AI.run(
  'xai/grok-tts',
  {
    text: 'Hello, thank you for calling. How can I help you today?',
    voice_id: 'ara',
    language: 'en',
    output_format: { codec: 'mulaw', sample_rate: 8000 },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-tts",
  "input": {
    "text": "Hello, thank you for calling. How can I help you today?",
    "voice_id": "ara",
    "language": "en",
    "output_format": {
      "codec": "mulaw",
      "sample_rate": 8000
    }
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/xai/grok-tts/telephony-law.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Expressive Delivery**  — Inline speech tags for laughter, pauses, and whispers

```ts
const response = await env.AI.run(
  'xai/grok-tts',
  {
    text: 'So I walked in and [pause] there it was. [laugh] I honestly could not believe it! <whisper>It was a secret the whole time.</whisper>',
    voice_id: 'eve',
    language: 'en',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-tts",
  "input": {
    "text": "So I walked in and [pause] there it was. [laugh] I honestly could not believe it! <whisper>It was a secret the whole time.</whisper>",
    "voice_id": "eve",
    "language": "en"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/xai/grok-tts/expressive-delivery.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Text Normalization**  — Convert written numbers and abbreviations to spoken form

```ts
const response = await env.AI.run(
  'xai/grok-tts',
  {
    text: 'The total is $1,234.56 and the meeting is at 3pm on Jan 15th.',
    voice_id: 'rex',
    language: 'en',
    text_normalization: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-tts",
  "input": {
    "text": "The total is $1,234.56 and the meeting is at 3pm on Jan 15th.",
    "voice_id": "rex",
    "language": "en",
    "text_normalization": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/xai/grok-tts/text-normalization.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

text

`string`minLength: 1maxLength: 15000Text to convert to speech. Maximum 15,000 characters. Supports inline speech tags: \[pause\], \[laugh\], <whisper>…</whisper>, etc. Required for REST mode, mutually exclusive with websocket.

language

`string`requiredBCP-47 language code (e.g. "en", "zh", "pt-BR") or "auto" for automatic language detection. Required for both REST and WebSocket modes. Supported codes: auto, en, ar-EG, ar-SA, ar-AE, bn, zh, fr, de, hi, id, it, ja, ko, pt-BR, pt-PT, ru, es-MX, es-ES, tr, vi.

websocket

`boolean`Enable WebSocket streaming for text-to-speech. When true, establishes a bidirectional WebSocket connection. Mutually exclusive with text.

voice\_id

`string`minLength: 1Voice for synthesis. Defaults to "eve". Built-in voices: eve (energetic), ara (warm), rex (confident), sal (balanced), leo (authoritative). Custom voice IDs from /v1/tts/voices are also accepted. Case-insensitive — "Eve", "EVE", and "eve" are equivalent.

▶output\_format{}

`object`Output audio format. Defaults to MP3 at 24 kHz / 128 kbps when omitted.

▶optimize\_streaming\_latency

`one of`

text\_normalization

`boolean`When true, normalizes written-form text into spoken-form before synthesis (e.g. "Dr." → "Doctor", "100" → "one hundred"). Defaults to false.

speed

`number`minimum: 0.7maximum: 1.5Speech speed multiplier. 1.0 is normal speed. Range: 0.7 to 1.5\. Defaults to 1.0\. Only used in WebSocket mode.

audio

`string`Presigned R2 URL for the generated audio file. MIME type reflects the requested codec (audio/mpeg for mp3, audio/wav for wav, etc.).

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/xai/grok-tts/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-tts/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/xai/grok-tts/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-tts/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-tts/#page","headline":"Grok TTS (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok text-to-speech model. Generates high-fidelity spoken audio in 5 expressive voices (eve, ara, rex, sal, leo) with 20+ supported languages. Supports inline speech tags for laughter, whispers, and pauses.","url":"https://developers.cloudflare.com/ai/models/xai/grok-tts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
