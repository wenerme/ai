---
description: OpenAI's text-to-speech model optimized for real-time use with low latency.
title: TTS-1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  TTS-1

 Text-to-Speech • OpenAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/openai/tts-1/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` openai/tts-1 `

* Third-party
* Zero data retention

OpenAI's text-to-speech model optimized for real-time use with low latency.

| Model Info          |                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://openai.com/policies/)                                                                          |
| More information    | [link ↗](https://platform.openai.com/docs/guides/text-to-speech)                                                |
| Zero data retention | Yes                                                                                                             |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/tts-1) |

## Usage

```ts
const response = await env.AI.run(
  'openai/tts-1',
  {
    response_format: 'mp3',
    speed: 1,
    text: 'Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.',
    voice: 'alloy',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/tts-1",
  "input": {
    "response_format": "mp3",
    "speed": 1,
    "text": "Hello! Welcome to Cloudflare AI Gateway. Let me show you what we can do.",
    "voice": "alloy"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/simple-speech.mp3"
  },
  "state": "Completed"
}
```

## Examples

**Different Voice**  — Use the Nova voice for a different tone

```ts
const response = await env.AI.run(
  'openai/tts-1',
  {
    response_format: 'mp3',
    speed: 1,
    text: 'The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.',
    voice: 'nova',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/tts-1",
  "input": {
    "response_format": "mp3",
    "speed": 1,
    "text": "The weather today is sunny with a high of 72 degrees. Perfect for a walk in the park.",
    "voice": "nova"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/different-voice.mp3"
  },
  "state": "Completed"
}
```

**Narration**  — Slower narration style with the Onyx voice

```ts
const response = await env.AI.run(
  'openai/tts-1',
  {
    response_format: 'mp3',
    speed: 0.85,
    text: 'In the beginning, the universe was a singularity of infinite density. Then, in a fraction of a second, it expanded into everything we know today.',
    voice: 'onyx',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/tts-1",
  "input": {
    "response_format": "mp3",
    "speed": 0.85,
    "text": "In the beginning, the universe was a singularity of infinite density. Then, in a fraction of a second, it expanded into everything we know today.",
    "voice": "onyx"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/narration.mp3"
  },
  "state": "Completed"
}
```

**Echo Voice**  — Use the Echo voice for a deeper tone

```ts
const response = await env.AI.run(
  'openai/tts-1',
  {
    response_format: 'mp3',
    speed: 1,
    text: 'Welcome back to the podcast. Today we are going to talk about the future of artificial intelligence and its impact on creative work.',
    voice: 'echo',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/tts-1",
  "input": {
    "response_format": "mp3",
    "speed": 1,
    "text": "Welcome back to the podcast. Today we are going to talk about the future of artificial intelligence and its impact on creative work.",
    "voice": "echo"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/echo-voice.mp3"
  },
  "state": "Completed"
}
```

**Fast Playback**  — Speed up speech for quick listening

```ts
const response = await env.AI.run(
  'openai/tts-1',
  {
    response_format: 'mp3',
    speed: 1.5,
    text: 'This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent, user growth exceeded expectations, and infrastructure costs remain stable.',
    voice: 'shimmer',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/tts-1",
  "input": {
    "response_format": "mp3",
    "speed": 1.5,
    "text": "This is a fast-paced summary of the key findings from the quarterly report. Revenue is up fifteen percent, user growth exceeded expectations, and infrastructure costs remain stable.",
    "voice": "shimmer"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1/fast-playback.mp3"
  },
  "state": "Completed"
}
```

## Parameters

text

`string`requiredmaxLength: 4096The text to generate audio for. Maximum length is 4096 characters.

voice

`string`requireddefault: alloyenum: alloy, echo, fable, onyx, nova, shimmerThe voice to use when generating the audio. Defaults to alloy.

response\_format

`string`requireddefault: mp3enum: mp3, opus, wav, aac, flacThe output format for the audio. Supported formats are mp3, opus, wav, aac and flac.

speed

`number`requireddefault: 1minimum: 0.25maximum: 4The speed of the generated audio. Select a value from 0.25 to 4.0\. 1.0 is the default.

audio

`string`URL to the generated audio file

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/openai/tts-1/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/tts-1/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/openai/tts-1/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/tts-1/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/tts-1/#page","headline":"TTS-1 (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"OpenAI's text-to-speech model optimized for real-time use with low latency.","url":"https://developers.cloudflare.com/ai/models/openai/tts-1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
