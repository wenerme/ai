---
description: Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.
title: Vidu Q3 Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Vidu logo](https://developers.cloudflare.com/_astro/vidu._WEx0U8r.svg)

# Vidu Q3 Pro

Text-to-Video • Vidu

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/vidu/q3-pro/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`vidu/q3-pro`

* Third-party
* Zero data retention

Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.

| Model Info          |                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.vidu.com/terms)                                                                          |
| More information    | [link ↗](https://www.vidu.com/)                                                                               |
| Zero data retention | Yes                                                                                                           |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/vidu/q3-pro) |

## Usage

```ts
const response = await env.AI.run(
  'vidu/q3-pro',
  {
    prompt: 'A golden retriever running through a sunlit meadow in slow motion',
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
  "model": "vidu/q3-pro",
  "input": {
    "prompt": "A golden retriever running through a sunlit meadow in slow motion",
    "duration": 5,
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
    "video": "https://video.cf.vidu.com/infer_64/tasks/26/0417/05/942597991691198464/creation-01/video.mp4"
  },
  "state": "Completed"
}
```

## Examples

**Portrait Aspect Ratio** — Vertical video for social media

```ts
const response = await env.AI.run(
  'vidu/q3-pro',
  {
    prompt:
      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',
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
  "model": "vidu/q3-pro",
  "input": {
    "prompt": "A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling",
    "aspect_ratio": "9:16",
    "duration": 5,
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
    "video": "https://video.cf.vidu.com/infer_88/tasks/26/0417/05/942598607041753088/creation-01/video.mp4"
  },
  "state": "Completed"
}
```

**Silent Video** — Generate video without audio

```ts
const response = await env.AI.run(
  'vidu/q3-pro',
  {
    audio: false,
    prompt: 'Abstract paint swirls slowly mixing in water, vivid blues and golds',
    duration: 8,
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
  "model": "vidu/q3-pro",
  "input": {
    "audio": false,
    "prompt": "Abstract paint swirls slowly mixing in water, vivid blues and golds",
    "duration": 8,
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
    "video": "https://video.cf.vidu.com/infer_76/tasks/26/0417/05/942599305355595776/creation-01/final_video.mp4"
  },
  "state": "Completed"
}
```

**Square Format** — Square video for product demos or social posts

```ts
const response = await env.AI.run(
  'vidu/q3-pro',
  {
    prompt:
      'A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background',
    aspect_ratio: '1:1',
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
  "model": "vidu/q3-pro",
  "input": {
    "prompt": "A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background",
    "aspect_ratio": "1:1",
    "duration": 5,
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
    "video": "https://video.cf.vidu.com/infer_40/tasks/26/0417/05/942599364482723840/creation-01/video.mp4"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`maxLength: 5000Text prompt describing what should appear in the video

start\_image

`string`Start image for video generation. Use alone for image-to-video, or with end\_image for start/end-to-video. Accepts public URL or Base64 data URI (data:image/png;base64,...)

end\_image

`string`End image for start/end-to-video generation. Must be used together with start\_image. Accepts public URL or Base64 data URI (data:image/png;base64,...)

duration

`integer`requireddefault: 5minimum: 1maximum: 16Video duration in seconds (1-16)

resolution

`string`requireddefault: 720penum: 540p, 720p, 1080pVideo resolution

audio

`boolean`Enable audio-video synchronization. Default: true for Q3 models. When false, outputs silent video

aspect\_ratio

`string`enum: 16:9, 9:16, 3:4, 4:3, 1:1Video aspect ratio (text-to-video only). Default: 16:9

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/vidu/q3-pro/#page","headline":"Vidu Q3 Pro (Vidu) · Cloudflare AI docs · Cloudflare AI docs","description":"Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.","url":"https://developers.cloudflare.com/ai/models/vidu/q3-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
