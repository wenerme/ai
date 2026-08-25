---
description: ElevenLabs' multilingual text-to-speech model for generating natural speech across many languages with ElevenLabs voices.
title: Eleven Multilingual v2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ElevenLabs logo](https://developers.cloudflare.com/_astro/elevenlabs.0RXw7U95.svg)

# Eleven Multilingual v2

Text-to-Speech • ElevenLabs

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/elevenlabs/eleven-multilingual-v2/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`elevenlabs/eleven-multilingual-v2`

* Third-party

ElevenLabs' multilingual text-to-speech model for generating natural speech across many languages with ElevenLabs voices.

| Model Info        |                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://elevenlabs.io/terms)                                                                                               |
| More information  | [link ↗](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/elevenlabs/eleven-multilingual-v2) |

## Usage

```ts
const response = await env.AI.run(
  'elevenlabs/eleven-multilingual-v2',
  {
    text: 'Bonjour et bienvenue dans Cloudflare AI Gateway. Suivez vos requetes, vos couts et les performances de vos modeles depuis une seule interface.',
    voice_id: 'JBFqnCBsd6RMkjVDRZzb',
    language_code: 'fr',
    output_format: 'mp3_44100_128',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "elevenlabs/eleven-multilingual-v2",
  "input": {
    "text": "Bonjour et bienvenue dans Cloudflare AI Gateway. Suivez vos requetes, vos couts et les performances de vos modeles depuis une seule interface.",
    "voice_id": "JBFqnCBsd6RMkjVDRZzb",
    "language_code": "fr",
    "output_format": "mp3_44100_128"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/elevenlabs/eleven-multilingual-v2/french-ai-gateway-speech.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

text

`string`requiredminLength: 1maxLength: 10000The text to convert into speech.

voice\_id

`string`requiredminLength: 1The ElevenLabs voice ID to use for generation.

output\_format

`string`enum: mp3\_22050\_32, mp3\_24000\_48, mp3\_44100\_128, mp3\_44100\_192, mp3\_44100\_32, mp3\_44100\_64, mp3\_44100\_96, opus\_48000\_128, opus\_48000\_192, opus\_48000\_32, opus\_48000\_64, opus\_48000\_96

language\_code

`string`ISO 639-1 language code to enforce.

▶voice\_settings{}

`object`

seed

`integer`minimum: 0maximum: 4294967295

previous\_text

`string`

next\_text

`string`

apply\_text\_normalization

`string`enum: auto, on, off

audio

`string`Base64-encoded data URI for the generated audio file.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/elevenlabs/eleven-multilingual-v2/#page","headline":"Eleven Multilingual v2 (ElevenLabs) · Cloudflare AI docs · Cloudflare AI docs","description":"ElevenLabs' multilingual text-to-speech model for generating natural speech across many languages with ElevenLabs voices.","url":"https://developers.cloudflare.com/ai/models/elevenlabs/eleven-multilingual-v2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
