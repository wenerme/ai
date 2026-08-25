---
description: Pruna's P-Video-Animate takes a source video and a subject reference image, then animates the referenced subject using the motion and audio from the source video.
title: P-Video-Animate
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.Bv7D31UF.svg)

# P-Video-Animate

Image-to-Video • Pruna AI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/pruna/p-video-animate/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`pruna/p-video-animate`

* Third-party

Pruna's P-Video-Animate takes a source video and a subject reference image, then animates the referenced subject using the motion and audio from the source video.

| Model Info       |                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart)                                                                   |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/pruna/p-video-animate) |

## Usage

```ts
const response = await env.AI.run(
  'pruna/p-video-animate',
  {
    video: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    image: 'https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg',
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
  "model": "pruna/p-video-animate",
  "input": {
    "video": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    "image": "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg",
    "resolution": "720p",
    "target_fps": "original"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/pruna/p-video-animate/motion-transfer.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

video

`string`requiredSource RGB video (.mp4) used as the motion and audio source. HTTP(S) URL or data URI.

image

`string`requiredReference image of the subject to animate. HTTP(S) URL or data URI.

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

`string`requireddefault: Further instruction on how the reference subject should be animated.

seed

`integer`minimum: \-9007199254740991maximum: 9007199254740991Random seed for reproducible generation.

disable\_safety\_checker

`boolean`requireddefault: falseDisable safety checker for generated videos.

video

`string`format: uriPresigned URL for the animated video.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-video-animate/#page","headline":"P-Video-Animate (Pruna AI) · Cloudflare AI docs · Cloudflare AI docs","description":"Pruna's P-Video-Animate takes a source video and a subject reference image, then animates the referenced subject using the motion and audio from the source video.","url":"https://developers.cloudflare.com/ai/models/pruna/p-video-animate/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
