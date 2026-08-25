---
description: MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.
title: MiniMax Speech 2.8 Turbo
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.B0Y99aoe.svg)

# MiniMax Speech 2.8 Turbo

Text-to-Speech • MiniMax

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/minimax/speech-2.8-turbo/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`minimax/speech-2.8-turbo`

* Third-party
* Zero data retention

MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.

| Model Info          |                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.minimaxi.com/terms)                                                                                   |
| More information    | [link ↗](https://www.minimaxi.com/)                                                                                        |
| Zero data retention | Yes                                                                                                                        |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/speech-2.8-turbo) |

## Usage

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-turbo',
  {
    format: 'mp3',
    pitch: 0,
    speed: 1,
    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',
    voice_id: 'English_expressive_narrator',
    volume: 1,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-2.8-turbo",
  "input": {
    "format": "mp3",
    "pitch": 0,
    "speed": 1,
    "text": "Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.",
    "voice_id": "English_expressive_narrator",
    "volume": 1
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/simple-speech.mp3"
  },
  "state": "Completed"
}
```

## Examples

**Fast Narration** — Speed up narration for quick playback

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-turbo',
  {
    format: 'mp3',
    pitch: 0,
    speed: 1.5,
    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.',
    voice_id: 'English_expressive_narrator',
    volume: 1,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-2.8-turbo",
  "input": {
    "format": "mp3",
    "pitch": 0,
    "speed": 1.5,
    "text": "This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent and user growth exceeded expectations.",
    "voice_id": "English_expressive_narrator",
    "volume": 1
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/fast-narration.mp3"
  },
  "state": "Completed"
}
```

**Calm Tone** — Calm and steady speech for meditation or relaxation

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-turbo',
  {
    emotion: 'calm',
    format: 'mp3',
    pitch: 0,
    speed: 0.8,
    text: 'Take a deep breath in. Hold it for a moment. Now slowly exhale. Let your shoulders relax and release any tension.',
    voice_id: 'English_expressive_narrator',
    volume: 1,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-2.8-turbo",
  "input": {
    "emotion": "calm",
    "format": "mp3",
    "pitch": 0,
    "speed": 0.8,
    "text": "Take a deep breath in. Hold it for a moment. Now slowly exhale. Let your shoulders relax and release any tension.",
    "voice_id": "English_expressive_narrator",
    "volume": 1
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/calm-tone.mp3"
  },
  "state": "Completed"
}
```

**Adjusted Pitch** — Lower the pitch for a deeper voice

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-turbo',
  {
    format: 'mp3',
    pitch: -6,
    speed: 1,
    text: 'Good evening. Tonight we explore the mysteries of the deep ocean and the creatures that live in total darkness.',
    voice_id: 'English_expressive_narrator',
    volume: 1,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/speech-2.8-turbo",
  "input": {
    "format": "mp3",
    "pitch": -6,
    "speed": 1,
    "text": "Good evening. Tonight we explore the mysteries of the deep ocean and the creatures that live in total darkness.",
    "voice_id": "English_expressive_narrator",
    "volume": 1
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-turbo/adjusted-pitch.mp3"
  },
  "state": "Completed"
}
```

## Parameters

text

`string`requiredmaxLength: 10000The text to convert to speech. Maximum 10,000 characters.

voice\_id

`string`requireddefault: English\_expressive\_narratorThe voice ID to use for synthesis

speed

`number`requireddefault: 1minimum: 0.5maximum: 2Speech speed (0.5 to 2)

volume

`number`requireddefault: 1minimum: 0maximum: 10Speech volume (0 to 10)

pitch

`integer`requireddefault: 0minimum: \-12maximum: 12Pitch adjustment (-12 to 12)

emotion

`string`enum: happy, sad, angry, fearful, disgusted, surprised, calm, fluentEmotion control for synthesized speech

format

`string`requireddefault: mp3enum: mp3, flac, wavOutput audio format

▶sample\_rate

`one of`

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/speech-2.8-turbo/#page","headline":"MiniMax Speech 2.8 Turbo (MiniMax) · Cloudflare AI docs · Cloudflare AI docs","description":"MiniMax Speech 2.8 Turbo turns text into natural, expressive speech with voice cloning, emotion control, and 40+ language support at faster speeds.","url":"https://developers.cloudflare.com/ai/models/minimax/speech-2.8-turbo/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
