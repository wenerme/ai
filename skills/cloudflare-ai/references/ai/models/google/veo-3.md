---
description: Google's video generation model capable of producing high-quality videos with optional audio from text prompts.
title: Veo 3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

#  Veo 3

 Text-to-Video • Google

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/google/veo-3/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` google/veo-3 `

* Third-party
* Zero data retention

Google's video generation model capable of producing high-quality videos with optional audio from text prompts.

| Model Info          |                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                |
| More information    | [link ↗](https://deepmind.google/technologies/veo/)                                                             |
| Zero data retention | Yes                                                                                                             |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3) |

## Usage

```ts
const response = await env.AI.run(
  'google/veo-3',
  {
    prompt: 'A golden retriever running through a field of sunflowers on a sunny day',
    aspect_ratio: '16:9',
    duration: '6s',
    generate_audio: true,
    resolution: '720p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/veo-3",
  "input": {
    "prompt": "A golden retriever running through a field of sunflowers on a sunny day",
    "aspect_ratio": "16:9",
    "duration": "6s",
    "generate_audio": true,
    "resolution": "720p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/simple-video-generation.mp4"
  },
  "state": "Completed"
}
```

## Examples

**Cinematic Scene**  — Widescreen cinematic video in 1080p

```ts
const response = await env.AI.run(
  'google/veo-3',
  {
    prompt:
      'A dramatic drone shot flying through misty mountain peaks at sunrise, with clouds rolling through valleys below',
    aspect_ratio: '16:9',
    duration: '8s',
    generate_audio: true,
    resolution: '1080p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/veo-3",
  "input": {
    "prompt": "A dramatic drone shot flying through misty mountain peaks at sunrise, with clouds rolling through valleys below",
    "aspect_ratio": "16:9",
    "duration": "8s",
    "generate_audio": true,
    "resolution": "1080p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/cinematic-scene.mp4"
  },
  "state": "Completed"
}
```

**Vertical Video**  — Portrait orientation for social media

```ts
const response = await env.AI.run(
  'google/veo-3',
  {
    prompt: 'A barista expertly pouring latte art, close-up shot with shallow depth of field',
    aspect_ratio: '9:16',
    duration: '6s',
    generate_audio: true,
    resolution: '720p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/veo-3",
  "input": {
    "prompt": "A barista expertly pouring latte art, close-up shot with shallow depth of field",
    "aspect_ratio": "9:16",
    "duration": "6s",
    "generate_audio": true,
    "resolution": "720p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/vertical-video.mp4"
  },
  "state": "Completed"
}
```

**Short Format**  — Short video for social media posts

```ts
const response = await env.AI.run(
  'google/veo-3',
  {
    prompt: 'A timelapse of a flower blooming, soft natural lighting',
    aspect_ratio: '16:9',
    duration: '4s',
    generate_audio: true,
    resolution: '720p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/veo-3",
  "input": {
    "prompt": "A timelapse of a flower blooming, soft natural lighting",
    "aspect_ratio": "16:9",
    "duration": "4s",
    "generate_audio": true,
    "resolution": "720p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/short-format.mp4"
  },
  "state": "Completed"
}
```

**Silent Video**  — Video without audio generation

```ts
const response = await env.AI.run(
  'google/veo-3',
  {
    prompt: 'Abstract flowing liquid metal morphing into geometric shapes',
    aspect_ratio: '16:9',
    duration: '6s',
    generate_audio: false,
    resolution: '720p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/veo-3",
  "input": {
    "prompt": "Abstract flowing liquid metal morphing into geometric shapes",
    "aspect_ratio": "16:9",
    "duration": "6s",
    "generate_audio": false,
    "resolution": "720p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3/silent-video.mp4"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`requiredText prompt describing the video to generate

image\_input

`string`Base64-encoded reference image for i2v

duration

`string`requireddefault: 6senum: 4s, 6s, 8sVideo duration

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 1:1Video aspect ratio

resolution

`string`requireddefault: 720penum: 720p, 1080pVideo resolution

generate\_audio

`boolean`requireddefault: trueWhether to generate audio with the video

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/google/veo-3/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/veo-3/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/google/veo-3/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/veo-3/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/veo-3/#page","headline":"Veo 3 (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's video generation model capable of producing high-quality videos with optional audio from text prompts.","url":"https://developers.cloudflare.com/ai/models/google/veo-3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
