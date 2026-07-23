---
description: Pruna's P-Video-Replace takes a source video and one or more identity reference images, then places the referenced person or people into the video while preserving the source motion and audio.
title: P-Video-Replace
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.BVOvqoaI.svg)

# P-Video-Replace

Image-to-Video • Pruna AI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/pruna/p-video-replace/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`pruna/p-video-replace`

* Third-party

Pruna's P-Video-Replace takes a source video and one or more identity reference images, then places the referenced person or people into the video while preserving the source motion and audio.

| Model Info       |                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart)                                                                   |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/pruna/p-video-replace) |

## Usage

```ts
const response = await env.AI.run(
  'pruna/p-video-replace',
  {
    video: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    images: ['https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg'],
    resolution: '720p',
    target_fps: 'original',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-video-replace",
  "input": {
    "video": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    "images": [
      "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg"
    ],
    "resolution": "720p",
    "target_fps": "original"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/pruna/p-video-replace/character-swap.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

video

`string`requiredSource RGB video (.mp4) used as the motion and audio source. HTTP(S) URL or data URI.

▶images\[\]

`array`requiredminItems: 1maxItems: 3Identity reference image(s), 1 to 3, to place into the video. Each entry is an HTTP(S) URL or a data URI.

turbo

`boolean`requireddefault: falseTurbo mode: faster generation for slightly lower quality.

resolution

`string`requireddefault: 720penum: 720p, 1080pTarget resolution.

save\_audio

`boolean`requireddefault: trueSave the video with audio.

ignore\_audio

`boolean`requireddefault: falseIgnore source audio during generation.

target\_fps

`string`requireddefault: originalenum: 24, 48, originalTarget FPS for the working video.

instruction\_prompt

`string`requireddefault: Further instruction on how to place people from the reference images into the scene.

seed

`integer`minimum: \-9007199254740991maximum: 9007199254740991Random seed for reproducible generation.

disable\_safety\_checker

`boolean`requireddefault: falseDisable safety checker for generated videos.

video

`string`format: uriPresigned URL for the replacement video.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-video-replace/#page","headline":"P-Video-Replace (Pruna AI) · Cloudflare AI docs · Cloudflare AI docs","description":"Pruna's P-Video-Replace takes a source video and one or more identity reference images, then places the referenced person or people into the video while preserving the source motion and audio.","url":"https://developers.cloudflare.com/ai/models/pruna/p-video-replace/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
