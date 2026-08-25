---
description: ElevenLabs Music v2 composes songs and instrumental tracks from a prompt or detailed composition plan.
title: ElevenLabs Music v2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ElevenLabs logo](https://developers.cloudflare.com/_astro/elevenlabs.0RXw7U95.svg)

# ElevenLabs Music v2

Music Generation • ElevenLabs

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/elevenlabs/music-v2/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`elevenlabs/music-v2`

* Third-party

ElevenLabs Music v2 composes songs and instrumental tracks from a prompt or detailed composition plan.

| Model Info        |                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://elevenlabs.io/terms)                                                                                 |
| More information  | [link ↗](https://elevenlabs.io/docs/api-reference/music/compose)                                                      |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/elevenlabs/music-v2) |

## Usage

```ts
const response = await env.AI.run(
  'elevenlabs/music-v2',
  {
    prompt: 'A warm cinematic ambient track with soft piano, subtle strings, and a hopeful mood',
    music_length_ms: 30000,
    force_instrumental: true,
    output_format: 'mp3_48000_192',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "elevenlabs/music-v2",
  "input": {
    "prompt": "A warm cinematic ambient track with soft piano, subtle strings, and a hopeful mood",
    "music_length_ms": 30000,
    "force_instrumental": true,
    "output_format": "mp3_48000_192"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/elevenlabs/music-v2/cinematic-instrumental.mp3"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`minLength: 1

▶composition\_plan{}

`object`

music\_length\_ms

`integer`minimum: 3000maximum: 600000

output\_format

`string`enum: auto, mp3\_48000\_128, mp3\_48000\_192, mp3\_48000\_240, mp3\_48000\_320, mp3\_22050\_32, mp3\_24000\_48, mp3\_44100\_32, mp3\_44100\_64, mp3\_44100\_96, mp3\_44100\_128, mp3\_44100\_192, opus\_48000\_32, opus\_48000\_64, opus\_48000\_96, opus\_48000\_128, opus\_48000\_192

seed

`integer`minimum: 0maximum: 4294967295

force\_instrumental

`boolean`

store\_for\_inpainting

`boolean`

sign\_with\_c2pa

`boolean`

audio

`string`Base64-encoded data URI for the generated music file.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/elevenlabs/music-v2/#page","headline":"ElevenLabs Music v2 (ElevenLabs) · Cloudflare AI docs · Cloudflare AI docs","description":"ElevenLabs Music v2 composes songs and instrumental tracks from a prompt or detailed composition plan.","url":"https://developers.cloudflare.com/ai/models/elevenlabs/music-v2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
