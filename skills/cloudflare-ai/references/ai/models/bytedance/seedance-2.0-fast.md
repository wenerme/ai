---
description: Faster variant of ByteDance's Seedance 2.0 video model. Trades some quality for speed while sharing the same multimodal architecture. Supports text-to-video, image-to-video, native audio generation, multimodal references (images, videos, audio), video editing, and video extension.
title: Seedance 2.0 Fast
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

# Seedance 2.0 Fast

Text-to-Video • ByteDance

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/bytedance/seedance-2.0-fast/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`bytedance/seedance-2.0-fast`

* Third-party

Faster variant of ByteDance's Seedance 2.0 video model. Trades some quality for speed while sharing the same multimodal architecture. Supports text-to-video, image-to-video, native audio generation, multimodal references (images, videos, audio), video editing, and video extension.

| Model Info       |                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedance)                                                                              |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedance-2.0-fast) |

## Usage

```ts
const response = await env.AI.run(
  'bytedance/seedance-2.0-fast',
  {
    prompt: 'A golden retriever running through a field of sunflowers on a sunny day',
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
  "model": "bytedance/seedance-2.0-fast",
  "input": {
    "prompt": "A golden retriever running through a field of sunflowers on a sunny day",
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
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-fast/quick-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Portrait Video** — Vertical video for social media

```ts
const response = await env.AI.run(
  'bytedance/seedance-2.0-fast',
  {
    prompt: 'A barista pouring latte art in a cozy coffee shop, close-up with shallow depth of field',
    aspect_ratio: '9:16',
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
  "model": "bytedance/seedance-2.0-fast",
  "input": {
    "prompt": "A barista pouring latte art in a cozy coffee shop, close-up with shallow depth of field",
    "aspect_ratio": "9:16",
    "duration": 5,
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-fast/portrait-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Virtual Avatar Reference** — Use a virtual character avatar from the trusted asset library

```ts
const response = await env.AI.run(
  'bytedance/seedance-2.0-fast',
  {
    image: 'https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg',
    prompt: 'The scene gently animates with subtle motion',
    aspect_ratio: '16:9',
    duration: 5,
    resolution: '720p',
    use_virtual_avatar: true,
    generate_audio: false,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedance-2.0-fast",
  "input": {
    "image": "https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg",
    "prompt": "The scene gently animates with subtle motion",
    "aspect_ratio": "16:9",
    "duration": 5,
    "resolution": "720p",
    "use_virtual_avatar": true,
    "generate_audio": false
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-2.0-fast/virtual-avatar-reference.mp4"
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

`number`requireddefault: 24const: 24Frame rate (frames per second)

camera\_fixed

`boolean`requireddefault: falseWhether to fix camera position

generate\_audio

`boolean`Whether to generate audio with the video

watermark

`boolean`requireddefault: falseWhether to add a watermark to the output video

seed

`integer`minimum: \-9007199254740991maximum: 9007199254740991Random seed for reproducible generation

use\_virtual\_avatar

`boolean`requireddefault: falseRoute image reference inputs (image, reference\_images, last\_frame\_image) through ByteDance's trusted virtual avatar asset library before generation. Intended for AI-generated/virtual character avatars that would otherwise be blocked by face or deepfake detection

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedance-2.0-fast/#page","headline":"Seedance 2.0 Fast (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"Faster variant of ByteDance's Seedance 2.0 video model. Trades some quality for speed while sharing the same multimodal architecture. Supports text-to-video, image-to-video, native audio generation, multimodal references (images, videos, audio), video editing, and video extension.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedance-2.0-fast/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
