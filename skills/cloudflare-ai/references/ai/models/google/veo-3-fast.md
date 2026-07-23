---
description: A faster version of Veo 3 optimized for lower latency video generation with audio support.
title: Veo 3 Fast
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Veo 3 Fast

Text-to-Video • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/veo-3-fast/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/veo-3-fast`

* Third-party
* Zero data retention

A faster version of Veo 3 optimized for lower latency video generation with audio support.

| Model Info          |                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                    |
| More information    | [link ↗](https://deepmind.google/technologies/veo/)                                                                 |
| Zero data retention | Yes                                                                                                                 |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3-fast) |

## Usage

```ts
const response = await env.AI.run(
  'google/veo-3-fast',
  {
    prompt: 'Ocean waves crashing on a rocky shoreline at sunset',
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
  "model": "google/veo-3-fast",
  "input": {
    "prompt": "Ocean waves crashing on a rocky shoreline at sunset",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/quick-preview.mp4"
  },
  "state": "Completed"
}
```

## Examples

**Social Media Clip** — Quick vertical video for stories

```ts
const response = await env.AI.run(
  'google/veo-3-fast',
  {
    prompt: 'A coffee cup with steam rising, cozy cafe atmosphere',
    aspect_ratio: '9:16',
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
  "model": "google/veo-3-fast",
  "input": {
    "prompt": "A coffee cup with steam rising, cozy cafe atmosphere",
    "aspect_ratio": "9:16",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/social-media-clip.mp4"
  },
  "state": "Completed"
}
```

**Animated Loop** — Short loopable animation

```ts
const response = await env.AI.run(
  'google/veo-3-fast',
  {
    prompt: 'A campfire burning with flames dancing and sparks floating upward, seamless loop',
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
  "model": "google/veo-3-fast",
  "input": {
    "prompt": "A campfire burning with flames dancing and sparks floating upward, seamless loop",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/animated-loop.mp4"
  },
  "state": "Completed"
}
```

**Product Shot** — Quick product video preview

```ts
const response = await env.AI.run(
  'google/veo-3-fast',
  {
    prompt: 'A smartphone rotating on a dark surface with dramatic lighting',
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
  "model": "google/veo-3-fast",
  "input": {
    "prompt": "A smartphone rotating on a dark surface with dramatic lighting",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3-fast/product-shot.mp4"
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

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/veo-3-fast/#page","headline":"Veo 3 Fast (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"A faster version of Veo 3 optimized for lower latency video generation with audio support.","url":"https://developers.cloudflare.com/ai/models/google/veo-3-fast/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
