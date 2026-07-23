---
description: Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.
title: Vidu Q3 Turbo
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Vidu logo](https://developers.cloudflare.com/_astro/vidu._WEx0U8r.svg)

# Vidu Q3 Turbo

Text-to-Video • Vidu

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/vidu/q3-turbo/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`vidu/q3-turbo`

* Third-party
* Zero data retention

Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.

| Model Info          |                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.vidu.com/terms)                                                                            |
| More information    | [link ↗](https://www.vidu.com/)                                                                                 |
| Zero data retention | Yes                                                                                                             |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/vidu/q3-turbo) |

## Usage

```ts
const response = await env.AI.run(
  'vidu/q3-turbo',
  { prompt: 'A cat lazily stretching on a sunlit windowsill', duration: 5, resolution: '720p' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "vidu/q3-turbo",
  "input": {
    "prompt": "A cat lazily stretching on a sunlit windowsill",
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
    "video": "https://video.cf.vidu.com/infer_28/tasks/26/0417/05/942602832110972928/creation-01/video.mp4"
  },
  "state": "Completed"
}
```

## Examples

**High Resolution** — Generate at 1080p

```ts
const response = await env.AI.run(
  'vidu/q3-turbo',
  {
    prompt:
      'Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background',
    duration: 5,
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
  "model": "vidu/q3-turbo",
  "input": {
    "prompt": "Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background",
    "duration": 5,
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
    "video": "https://video.cf.vidu.com/infer_44/tasks/26/0417/05/942602894400569344/creation-01/video.mp4"
  },
  "state": "Completed"
}
```

**Portrait Video** — Vertical video for mobile viewing

```ts
const response = await env.AI.run(
  'vidu/q3-turbo',
  {
    prompt: 'A waterfall cascading down mossy rocks in a tropical jungle, mist rising',
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
  "model": "vidu/q3-turbo",
  "input": {
    "prompt": "A waterfall cascading down mossy rocks in a tropical jungle, mist rising",
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
    "video": "https://video.cf.vidu.com/infer_48/tasks/26/0417/05/942603057143758848/creation-01/video.mp4"
  },
  "state": "Completed"
}
```

**Extended Duration** — Longer video clip

```ts
const response = await env.AI.run(
  'vidu/q3-turbo',
  {
    prompt:
      'Timelapse of clouds rolling over a mountain peak from sunrise to sunset, dramatic lighting',
    duration: 16,
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
  "model": "vidu/q3-turbo",
  "input": {
    "prompt": "Timelapse of clouds rolling over a mountain peak from sunrise to sunset, dramatic lighting",
    "duration": 16,
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
    "video": "https://video.cf.vidu.com/infer_84/tasks/26/0417/06/942603162785705984/creation-01/video.mp4"
  },
  "state": "Completed"
}
```

**Low Resolution Fast Preview** — Quick preview at 540p

```ts
const response = await env.AI.run(
  'vidu/q3-turbo',
  {
    prompt: 'A sailboat gliding across calm ocean waters at sunset',
    duration: 3,
    resolution: '540p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "vidu/q3-turbo",
  "input": {
    "prompt": "A sailboat gliding across calm ocean waters at sunset",
    "duration": 3,
    "resolution": "540p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "video": "https://video.cf.vidu.com/infer_68/tasks/26/0417/06/942603796612128768/creation-01/video.mp4"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/vidu/q3-turbo/#page","headline":"Vidu Q3 Turbo (Vidu) · Cloudflare AI docs · Cloudflare AI docs","description":"Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.","url":"https://developers.cloudflare.com/ai/models/vidu/q3-turbo/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
