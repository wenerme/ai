---
title: MiniMax Speech 2.8 HD
description: MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg)

#  MiniMax Speech 2.8 HD

Text-to-Speech • MiniMax

`minimax/speech-2.8-hd`

MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.

| Model Info          |                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.minimaxi.com/terms)                                                                                |
| More information    | [link ↗](https://www.minimaxi.com/)                                                                                     |
| Zero data retention | Yes                                                                                                                     |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/speech-2.8-hd) |

## Usage

* [ TypeScript ](#tab-panel-1002)
* [ cURL ](#tab-panel-1003)

**TypeScript**

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

* [ Output ](#tab-panel-998)
* [ Raw response ](#tab-panel-999)

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

**Custom Voice**  — Use a specific voice and adjust speed

* [ TypeScript ](#tab-panel-1006)
* [ cURL ](#tab-panel-1007)

**TypeScript**

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

* [ Output ](#tab-panel-1000)
* [ Raw response ](#tab-panel-1001)

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

**With Emotion**  — Apply emotional tone to speech

* [ TypeScript ](#tab-panel-1010)
* [ cURL ](#tab-panel-1011)

**TypeScript**

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

* [ Output ](#tab-panel-1004)
* [ Raw response ](#tab-panel-1005)

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

**High Sample Rate**  — Studio quality at 44.1kHz sample rate

* [ TypeScript ](#tab-panel-1012)
* [ cURL ](#tab-panel-1013)

**TypeScript**

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

* [ Output ](#tab-panel-1008)
* [ Raw response ](#tab-panel-1009)

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

* [ Input ](#tab-panel-1014)
* [ Output ](#tab-panel-1015)

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

Input [ ](https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/#page","headline":"MiniMax Speech 2.8 HD (MiniMax) · Cloudflare AI docs · Cloudflare AI docs","description":"MiniMax Speech 2.8 HD focuses on studio-grade audio generation with emotion control, multilingual support (40+ languages), and voice cloning.","url":"https://developers.cloudflare.com/ai/models/minimax/speech-2.8-hd/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
