---
description: Pruna's P-Video is a premium video generation model supporting text-to-video, image-to-video, and audio-conditioned generation up to 1080p at 24 or 48 fps, with configurable duration up to 20 seconds.
title: P-Video
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.BVOvqoaI.svg)

# P-Video

Text-to-Video • Pruna AI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/pruna/p-video/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`pruna/p-video`

* Third-party

Pruna's P-Video is a premium video generation model supporting text-to-video, image-to-video, and audio-conditioned generation up to 1080p at 24 or 48 fps, with configurable duration up to 20 seconds.

| Model Info       |                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart)                                                           |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/pruna/p-video) |

## Usage

```ts
const response = await env.AI.run(
  'pruna/p-video',
  {
    prompt: 'A sports car drifting through a neon-lit city at night, cinematic aerial shot',
    duration: 5,
    resolution: '720p',
    aspect_ratio: '16:9',
    draft: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-video",
  "input": {
    "prompt": "A sports car drifting through a neon-lit city at night, cinematic aerial shot",
    "duration": 5,
    "resolution": "720p",
    "aspect_ratio": "16:9",
    "draft": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/pruna/p-video/neon-city-drift.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredText prompt for video generation.

image

`string`Input image to generate video from (image-to-video). HTTP(S) URL or data URI. Supports jpg, jpeg, png, webp. When provided, aspect\_ratio is ignored.

audio

`string`Input audio to condition video generation. HTTP(S) URL or data URI. Supports flac, mp3, wav. When provided, duration is ignored.

duration

`integer`requireddefault: 5minimum: 1maximum: 20Duration of the video in seconds (1-20). Ignored when audio is provided.

resolution

`string`requireddefault: 720penum: 720p, 1080pVideo resolution.

▶fps

`one of`required

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 1:1Aspect ratio of the video. Ignored when an input image is provided.

seed

`integer`minimum: \-9007199254740991maximum: 9007199254740991Random seed for reproducible generation.

draft

`boolean`requireddefault: falseDraft mode. Generates a lower-quality preview of the video.

save\_audio

`boolean`requireddefault: trueSave the video with audio.

last\_frame\_image

`string`Reference image for the last frame of the video. HTTP(S) URL or data URI.

prompt\_upsampling

`boolean`requireddefault: trueUse prompt upsampling to enhance the prompt.

disable\_safety\_filter

`boolean`requireddefault: trueDisable safety filter for prompts and input images.

video

`string`format: uriPresigned URL for the generated video.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-video/#page","headline":"P-Video (Pruna AI) · Cloudflare AI docs · Cloudflare AI docs","description":"Pruna's P-Video is a premium video generation model supporting text-to-video, image-to-video, and audio-conditioned generation up to 1080p at 24 or 48 fps, with configurable duration up to 20 seconds.","url":"https://developers.cloudflare.com/ai/models/pruna/p-video/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
