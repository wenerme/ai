---
description: ByteDance's compact, cost-efficient video generation model from the Seedance 2.0 family. Supports text-to-video, image-to-video, reference video, and reference audio for background music. Ideal for high-volume workloads where speed and cost matter.
title: Seedance 2.0 Mini
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

# Seedance 2.0 Mini

Text-to-Video • ByteDance

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/bytedance/seedance-2.0-mini/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`bytedance/seedance-2.0-mini`

* Third-party

ByteDance's compact, cost-efficient video generation model from the Seedance 2.0 family. Supports text-to-video, image-to-video, reference video, and reference audio for background music. Ideal for high-volume workloads where speed and cost matter.

| Model Info       |                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedance)                                                                              |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedance-2.0-mini) |

## Usage

```ts
const response = await env.AI.run(
  'bytedance/seedance-2.0-mini',
  {
    prompt:
      'A cat sitting on a windowsill watching raindrops fall on the glass, cozy interior lighting',
    aspect_ratio: '16:9',
    duration: 5,
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
  "model": "bytedance/seedance-2.0-mini",
  "input": {
    "prompt": "A cat sitting on a windowsill watching raindrops fall on the glass, cozy interior lighting",
    "aspect_ratio": "16:9",
    "duration": 5,
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-mini/simple-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Image to Video** — Generate video from a reference image

```ts
const response = await env.AI.run(
  'bytedance/seedance-2.0-mini',
  {
    image: 'https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg',
    prompt: 'The scene slowly comes to life with gentle movement',
    aspect_ratio: '16:9',
    duration: 5,
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
  "model": "bytedance/seedance-2.0-mini",
  "input": {
    "image": "https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg",
    "prompt": "The scene slowly comes to life with gentle movement",
    "aspect_ratio": "16:9",
    "duration": 5,
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-mini/image-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Portrait Video with Audio** — Vertical video for social media

```ts
const response = await env.AI.run(
  'bytedance/seedance-2.0-mini',
  {
    prompt: 'A steaming coffee cup on a marble table, morning light streaming through a window',
    aspect_ratio: '9:16',
    duration: 5,
    resolution: '720p',
    generate_audio: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedance-2.0-mini",
  "input": {
    "prompt": "A steaming coffee cup on a marble table, morning light streaming through a window",
    "aspect_ratio": "9:16",
    "duration": 5,
    "resolution": "720p",
    "generate_audio": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-mini/portrait-video-with-audio.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredmaxLength: 2000Text prompt describing the video to generate

image

`string`Reference image (HTTP(S) URL or base64 data URI) for image-to-video

reference\_video

`string`Reference video (HTTP(S) URL or base64 data URI) for style/motion guidance

last\_frame\_image

`string`Reference image (HTTP(S) URL or base64 data URI) for last-frame guidance. Only works if an image start frame is also given.

▶reference\_images\[\]

`array`maxItems: 4Reference images (1-4, HTTP(S) URLs or base64 data URIs) to guide video generation for characters, avatars, clothing, or environments. Cannot be used with first/last frame images.

duration

`integer`requireddefault: 5minimum: 4maximum: 12Video duration in seconds

resolution

`string`requireddefault: 720penum: 480p, 720pVideo resolution

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 4:3, 1:1, 3:4, 9:16, 21:9, 9:21Video aspect ratio. Ignored if an image is used.

fps

`number`default: 24const: 24Frame rate (frames per second)

camera\_fixed

`boolean`default: falseWhether to fix camera position

generate\_audio

`boolean`Whether to generate audio with the video

watermark

`boolean`default: falseWhether to add a watermark to the output video

seed

`integer`minimum: \-9007199254740991maximum: 9007199254740991Random seed for reproducible generation

reference\_audio

`string`Reference audio (HTTP(S) URL or base64 data:audio/... URI) to use as background music. Must be accompanied by a reference image or video.

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedance-2.0-mini/#page","headline":"Seedance 2.0 Mini (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"ByteDance's compact, cost-efficient video generation model from the Seedance 2.0 family. Supports text-to-video, image-to-video, reference video, and reference audio for background music. Ideal for high-volume workloads where speed and cost matter.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedance-2.0-mini/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
