---
description: A faster version of Veo 3.1 optimized for lower latency while maintaining high-quality video and audio output.
title: Veo 3.1 Fast
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Veo 3.1 Fast

Text-to-Video • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/veo-3.1-fast/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/veo-3.1-fast`

* Third-party
* Zero data retention

A faster version of Veo 3.1 optimized for lower latency while maintaining high-quality video and audio output.

| Model Info          |                                                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                      |
| More information    | [link ↗](https://deepmind.google/technologies/veo/)                                                                   |
| Zero data retention | Yes                                                                                                                   |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/veo-3.1-fast) |

## Usage

```ts
const response = await env.AI.run(
  'google/veo-3.1-fast',
  {
    prompt: 'A butterfly landing on a colorful flower in a garden',
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
  "model": "google/veo-3.1-fast",
  "input": {
    "prompt": "A butterfly landing on a colorful flower in a garden",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/quick-demo.mp4"
  },
  "state": "Completed"
}
```

## Examples

**Social Content** — Quick vertical video for social media

```ts
const response = await env.AI.run(
  'google/veo-3.1-fast',
  {
    prompt: 'Aesthetic morning routine: sun rays through curtains, coffee being poured',
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
  "model": "google/veo-3.1-fast",
  "input": {
    "prompt": "Aesthetic morning routine: sun rays through curtains, coffee being poured",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/social-content.mp4"
  },
  "state": "Completed"
}
```

**Motion Graphics** — Quick animated graphics

```ts
const response = await env.AI.run(
  'google/veo-3.1-fast',
  {
    prompt: 'Glowing neon lines forming geometric patterns on a dark background',
    aspect_ratio: '16:9',
    duration: '4s',
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
  "model": "google/veo-3.1-fast",
  "input": {
    "prompt": "Glowing neon lines forming geometric patterns on a dark background",
    "aspect_ratio": "16:9",
    "duration": "4s",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/motion-graphics.mp4"
  },
  "state": "Completed"
}
```

**Ambient Scene** — Relaxing background video

```ts
const response = await env.AI.run(
  'google/veo-3.1-fast',
  {
    prompt: 'Rain falling on a window with a blurred city skyline in the background at night',
    aspect_ratio: '16:9',
    duration: '8s',
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
  "model": "google/veo-3.1-fast",
  "input": {
    "prompt": "Rain falling on a window with a blurred city skyline in the background at night",
    "aspect_ratio": "16:9",
    "duration": "8s",
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
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__veo-3.1-fast/ambient-scene.mp4"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/veo-3.1-fast/#page","headline":"Veo 3.1 Fast (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"A faster version of Veo 3.1 optimized for lower latency while maintaining high-quality video and audio output.","url":"https://developers.cloudflare.com/ai/models/google/veo-3.1-fast/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
