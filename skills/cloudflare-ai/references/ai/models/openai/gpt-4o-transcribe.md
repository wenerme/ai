---
title: GPT-4o Transcribe
description: A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  GPT-4o Transcribe

Automatic Speech Recognition • OpenAI

`openai/gpt-4o-transcribe`

A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.

| Model Info          |                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://openai.com/policies/)                                                                                     |
| More information    | [link ↗](https://openai.com/)                                                                                              |
| Zero data retention | Yes                                                                                                                        |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-4o-transcribe) |

## Usage

* [ TypeScript ](#tab-panel-1096)
* [ cURL ](#tab-panel-1097)

**TypeScript**

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

* [ Output ](#tab-panel-1094)
* [ Raw response ](#tab-panel-1095)

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

**With Language Hint**  — Transcribe with a language hint for better accuracy

* [ TypeScript ](#tab-panel-1100)
* [ cURL ](#tab-panel-1101)

**TypeScript**

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

* [ Output ](#tab-panel-1098)
* [ Raw response ](#tab-panel-1099)

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

**Guided Transcription**  — Use a prompt to guide transcription style and context

* [ TypeScript ](#tab-panel-1104)
* [ cURL ](#tab-panel-1105)

**TypeScript**

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

* [ Output ](#tab-panel-1102)
* [ Raw response ](#tab-panel-1103)

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

**High Temperature**  — Higher temperature for more varied transcription

* [ TypeScript ](#tab-panel-1108)
* [ cURL ](#tab-panel-1109)

**TypeScript**

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

* [ Output ](#tab-panel-1106)
* [ Raw response ](#tab-panel-1107)

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

* [ Input ](#tab-panel-1110)
* [ Output ](#tab-panel-1111)

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

Input [ ](https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/#page","headline":"GPT-4o Transcribe (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"A speech-to-text model that uses GPT-4o to transcribe audio with improved word error rate and better language recognition compared to original Whisper models.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-4o-transcribe/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
