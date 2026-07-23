---
description: MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.
title: MiniMax Speech 2.8 HD
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg)

# MiniMax Speech 2.8 HD

Text-to-Speech • MiniMax

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`minimax/speech-2.8-hd`

* Third-party
* Zero data retention

MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.

| Model Info          |                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.minimaxi.com/terms)                                                                                |
| More information    | [link ↗](https://www.minimaxi.com/)                                                                                     |
| Zero data retention | Yes                                                                                                                     |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/speech-2.8-hd) |

## Usage

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-hd',
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
  "model": "minimax/speech-2.8-hd",
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
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/simple-speech.mp3"
  },
  "state": "Completed"
}
```

## Examples

**Custom Voice** — Use a specific voice and adjust speed

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-hd',
  {
    format: 'mp3',
    pitch: 0,
    speed: 0.9,
    text: 'The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.',
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
  "model": "minimax/speech-2.8-hd",
  "input": {
    "format": "mp3",
    "pitch": 0,
    "speed": 0.9,
    "text": "The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.",
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
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/custom-voice.mp3"
  },
  "state": "Completed"
}
```

**With Emotion** — Apply emotional tone to speech

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-hd',
  {
    emotion: 'happy',
    format: 'mp3',
    pitch: 0,
    speed: 1,
    text: "Congratulations! You've just won the grand prize! This is absolutely incredible news!",
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
  "model": "minimax/speech-2.8-hd",
  "input": {
    "emotion": "happy",
    "format": "mp3",
    "pitch": 0,
    "speed": 1,
    "text": "Congratulations! You'\''ve just won the grand prize! This is absolutely incredible news!",
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
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/with-emotion.mp3"
  },
  "state": "Completed"
}
```

**High Sample Rate** — Studio quality at 44.1kHz sample rate

```ts
const response = await env.AI.run(
  'minimax/speech-2.8-hd',
  {
    format: 'mp3',
    pitch: 0,
    sample_rate: 44100,
    speed: 1,
    text: 'This recording is generated at studio quality sample rate for the highest possible audio fidelity.',
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
  "model": "minimax/speech-2.8-hd",
  "input": {
    "format": "mp3",
    "pitch": 0,
    "sample_rate": 44100,
    "speed": 1,
    "text": "This recording is generated at studio quality sample rate for the highest possible audio fidelity.",
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
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/minimax__speech-2.8-hd/high-sample-rate.mp3"
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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/#page","headline":"MiniMax Speech 2.8 HD (MiniMax) · Cloudflare AI docs · Cloudflare AI docs","description":"MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.","url":"https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
