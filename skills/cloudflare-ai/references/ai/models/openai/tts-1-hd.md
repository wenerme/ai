---
description: OpenAI's high-definition text-to-speech model producing higher quality audio output.
title: TTS-1 HD
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  TTS-1 HD

 Text-to-Speech • OpenAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/openai/tts-1-hd/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` openai/tts-1-hd `

* Third-party
* Zero data retention

OpenAI's high-definition text-to-speech model producing higher quality audio output.

| Model Info          |                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Terms and License   | [link ↗](https://openai.com/policies/)                                                                             |
| More information    | [link ↗](https://platform.openai.com/docs/guides/text-to-speech)                                                   |
| Zero data retention | Yes                                                                                                                |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/tts-1-hd) |

## Usage

```ts
const response = await env.AI.run(
  'openai/tts-1-hd',
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
  "model": "openai/tts-1-hd",
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
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/simple-speech.mp3"
  },
  "state": "Completed"
}
```

## Examples

**Storytelling**  — HD narration with the Fable voice

```ts
const response = await env.AI.run(
  'openai/tts-1-hd',
  {
    response_format: 'mp3',
    speed: 0.9,
    text: 'Once upon a time, in a kingdom beyond the clouds, there lived a young inventor who dreamed of building machines that could think.',
    voice: 'fable',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/tts-1-hd",
  "input": {
    "response_format": "mp3",
    "speed": 0.9,
    "text": "Once upon a time, in a kingdom beyond the clouds, there lived a young inventor who dreamed of building machines that could think.",
    "voice": "fable"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/storytelling.mp3"
  },
  "state": "Completed"
}
```

**Podcast Style**  — Conversational podcast narration

```ts
const response = await env.AI.run(
  'openai/tts-1-hd',
  {
    response_format: 'mp3',
    speed: 1,
    text: "So here's the thing about large language models — they're not actually thinking. They're predicting the next token based on patterns in their training data. But the results can be surprisingly coherent.",
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
  "model": "openai/tts-1-hd",
  "input": {
    "response_format": "mp3",
    "speed": 1,
    "text": "So here'\''s the thing about large language models — they'\''re not actually thinking. They'\''re predicting the next token based on patterns in their training data. But the results can be surprisingly coherent.",
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
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/podcast-style.mp3"
  },
  "state": "Completed"
}
```

**Shimmer Voice**  — Bright and expressive voice

```ts
const response = await env.AI.run(
  'openai/tts-1-hd',
  {
    response_format: 'mp3',
    speed: 1,
    text: 'Breaking news: scientists have discovered a new species of deep-sea fish that produces its own light using bioluminescence.',
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
  "model": "openai/tts-1-hd",
  "input": {
    "response_format": "mp3",
    "speed": 1,
    "text": "Breaking news: scientists have discovered a new species of deep-sea fish that produces its own light using bioluminescence.",
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
    "audio": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__tts-1-hd/shimmer-voice.mp3"
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

Input [ ](https://developers.cloudflare.com/ai/models/openai/tts-1-hd/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/tts-1-hd/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/openai/tts-1-hd/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/tts-1-hd/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/tts-1-hd/#page","headline":"TTS-1 HD (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"OpenAI's high-definition text-to-speech model producing higher quality audio output.","url":"https://developers.cloudflare.com/ai/models/openai/tts-1-hd/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
