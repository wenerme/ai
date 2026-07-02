---
title: Grok TTS
description: xAI's Grok text-to-speech model. Generates high-fidelity spoken audio in 5 expressive voices (eve, ara, rex, sal, leo) with 20+ supported languages. Supports inline speech tags for laughter, whispers, and pauses.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

#  Grok TTS

Text-to-Speech • xAI

`xai/grok-tts`

xAI's Grok text-to-speech model. Generates high-fidelity spoken audio in 5 expressive voices (eve, ara, rex, sal, leo) with 20+ supported languages. Supports inline speech tags for laughter, whispers, and pauses.

| Model Info        |                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                  |
| More information  | [link ↗](https://docs.x.ai/developers/model-capabilities/audio/text-to-speech)                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-tts) |

## Usage

* [ TypeScript ](#tab-panel-2126)
* [ cURL ](#tab-panel-2127)

**TypeScript**

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

* [ Output ](#tab-panel-2124)
* [ Raw response ](#tab-panel-2125)

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

* [ TypeScript ](#tab-panel-2130)
* [ cURL ](#tab-panel-2131)

**TypeScript**

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

* [ Output ](#tab-panel-2128)
* [ Raw response ](#tab-panel-2129)

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

* [ TypeScript ](#tab-panel-2138)
* [ cURL ](#tab-panel-2139)

**TypeScript**

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

* [ Output ](#tab-panel-2132)
* [ Raw response ](#tab-panel-2133)

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

* [ TypeScript ](#tab-panel-2144)
* [ cURL ](#tab-panel-2145)

**TypeScript**

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

* [ Output ](#tab-panel-2134)
* [ Raw response ](#tab-panel-2135)

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

* [ TypeScript ](#tab-panel-2140)
* [ cURL ](#tab-panel-2141)

**TypeScript**

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

* [ Output ](#tab-panel-2136)
* [ Raw response ](#tab-panel-2137)

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

* [ TypeScript ](#tab-panel-2146)
* [ cURL ](#tab-panel-2147)

**TypeScript**

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

* [ Output ](#tab-panel-2142)
* [ Raw response ](#tab-panel-2143)

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

* [ Input ](#tab-panel-2148)
* [ Output ](#tab-panel-2149)

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-tts/#page","headline":"Grok TTS (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's Grok text-to-speech model. Generates high-fidelity spoken audio in 5 expressive voices (eve, ara, rex, sal, leo) with 20+ supported languages. Supports inline speech tags for laughter, whispers, and pauses.","url":"https://developers.cloudflare.com/ai/models/xai/grok-tts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
