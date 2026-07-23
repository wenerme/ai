---
description: A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.
title: GPT-4o Transcribe
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

# GPT-4o Transcribe

Automatic Speech Recognition • OpenAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-4o-transcribe`

* Third-party
* Zero data retention

A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.

| Model Info          |                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://openai.com/policies/)                                                                                     |
| More information    | [link ↗](https://openai.com/)                                                                                              |
| Zero data retention | Yes                                                                                                                        |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-4o-transcribe) |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-4o-transcribe',
  { file: 'data:audio/wav;base64,<...>' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4o-transcribe",
  "input": {
    "file": "data:audio/wav;base64,<...>"
  }
}'
```

Hello

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "text": "Hello"
  },
  "state": "Completed"
}
```

## Examples

**With Language Hint** — Transcribe with a language hint for better accuracy

```ts
const response = await env.AI.run(
  'openai/gpt-4o-transcribe',
  { file: 'data:audio/wav;base64,<...>', language: 'en' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4o-transcribe",
  "input": {
    "file": "data:audio/wav;base64,<...>",
    "language": "en"
  }
}'
```

Hello

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "text": "Hello"
  },
  "state": "Completed"
}
```

**Guided Transcription** — Use a prompt to guide transcription style and context

```ts
const response = await env.AI.run(
  'openai/gpt-4o-transcribe',
  {
    file: 'data:audio/wav;base64,<...>',
    prompt: 'This is a technical discussion about Kubernetes and cloud-native architecture.',
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
  "model": "openai/gpt-4o-transcribe",
  "input": {
    "file": "data:audio/wav;base64,<...>",
    "prompt": "This is a technical discussion about Kubernetes and cloud-native architecture.",
    "language": "en"
  }
}'
```

This is a technical discussion about Kubernetes and cloud-native architecture.

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "text": "This is a technical discussion about Kubernetes and cloud-native architecture."
  },
  "state": "Completed"
}
```

**High Temperature** — Higher temperature for more varied transcription

```ts
const response = await env.AI.run(
  'openai/gpt-4o-transcribe',
  { file: 'data:audio/wav;base64,<...>', temperature: 0.5 },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-4o-transcribe",
  "input": {
    "file": "data:audio/wav;base64,<...>",
    "temperature": 0.5
  }
}'
```

Hello, world!

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "text": "Hello, world!"
  },
  "state": "Completed"
}
```

## Parameters

file

`string`requiredThe audio file as a data URI (data:audio/...;base64,...) or HTTPS URL. Supported formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.

language

`string`The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.

prompt

`string`An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language.

temperature

`number`minimum: 0maximum: 1The sampling temperature, between 0 and 1\. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. Defaults to 0 if omitted.

text

`string`The transcribed text.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/#page","headline":"GPT-4o Transcribe (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
