---
description: Lightricks LTX-2.5 Fast is a fast video generation model for text-to-video and image-to-video workflows, with synchronized audio, configurable duration, resolution, and frame rate.
title: LTX-2.5 Fast
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

l

# LTX-2.5 Fast

Text-to-Video • lightricks

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/lightricks/ltx-2-5-fast/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`lightricks/ltx-2-5-fast`

* Third-party

Lightricks LTX-2.5 Fast is a fast video generation model for text-to-video and image-to-video workflows, with synchronized audio, configurable duration, resolution, and frame rate.

| Model Info       |                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://docs.ltx.io/api-documentation/api-reference/video-generation/text-to-video)                              |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/lightricks/ltx-2-5-fast) |

## Usage

```ts
const response = await env.AI.run(
  'lightricks/ltx-2-5-fast',
  {
    prompt: 'A cinematic aerial shot of ocean waves at sunset',
    duration: 8,
    resolution: '1920x1080',
    fps: 24,
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
  "model": "lightricks/ltx-2-5-fast",
  "input": {
    "prompt": "A cinematic aerial shot of ocean waves at sunset",
    "duration": 8,
    "resolution": "1920x1080",
    "fps": 24,
    "generate_audio": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/lightricks/ltx-2-5-fast/text-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Image-to-Video** — Animate a reference image with a final frame

```ts
const response = await env.AI.run(
  'lightricks/ltx-2-5-fast',
  {
    prompt: 'The camera moves forward while the trees sway in the wind',
    image_uri:
      'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
    last_frame_uri:
      'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
    duration: 8,
    resolution: '1920x1080',
    fps: 24,
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
  "model": "lightricks/ltx-2-5-fast",
  "input": {
    "prompt": "The camera moves forward while the trees sway in the wind",
    "image_uri": "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    "last_frame_uri": "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    "duration": 8,
    "resolution": "1920x1080",
    "fps": 24,
    "generate_audio": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/lightricks/ltx-2-5-fast/image-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredminLength: 1maxLength: 10000Text prompt describing the video

image\_uri

`string`format: uriHTTPS URI for the first frame

last\_frame\_uri

`string`format: uriHTTPS URI for the last frame

▶duration

`one of`required

resolution

`string`requireddefault: 1920x1080enum: 1280x720, 720x1280, 1920x1080, 1080x1920, 2560x1440, 1440x2560, 3840x2160, 2160x3840

▶fps

`one of`required

generate\_audio

`boolean`requireddefault: true

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/lightricks/ltx-2-5-fast/#page","headline":"LTX-2.5 Fast (lightricks) · Cloudflare AI docs · Cloudflare AI docs","description":"Lightricks LTX-2.5 Fast is a fast video generation model for text-to-video and image-to-video workflows, with synchronized audio, configurable duration, resolution, and frame rate.","url":"https://developers.cloudflare.com/ai/models/lightricks/ltx-2-5-fast/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
