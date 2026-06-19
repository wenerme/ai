---
title: P-Video
description: Pruna's P-Video is a premium video generation model supporting text-to-video, image-to-video, and audio-conditioned generation up to 1080p at 24 or 48 fps, with configurable duration up to 20 seconds.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

 p 

#  P-Video 

Text-to-Video • pruna 

`pruna/p-video` 

Pruna's P-Video is a premium video generation model supporting text-to-video, image-to-video, and audio-conditioned generation up to 1080p at 24 or 48 fps, with configurable duration up to 20 seconds.

| Model Info       |                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart)                                                           |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/pruna/p-video) |

## Usage

* [ TypeScript ](#tab-panel-1552)
* [ cURL ](#tab-panel-1553)

TypeScript

```
const response = await env.AI.run(  'pruna/p-video',  {    prompt: 'A sports car drifting through a neon-lit city at night, cinematic aerial shot',    duration: 5,    resolution: '720p',    aspect_ratio: '16:9',    draft: true,  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "pruna/p-video",  "input": {    "prompt": "A sports car drifting through a neon-lit city at night, cinematic aerial shot",    "duration": 5,    "resolution": "720p",    "aspect_ratio": "16:9",    "draft": true  }}'
```

* [ Output ](#tab-panel-1550)
* [ Raw response ](#tab-panel-1551)

```
{  "state": "Completed",  "result": {    "video": "https://examples.aig.cloudflare.com/pruna/p-video/neon-city-drift.mp4"  },  "gatewayMetadata": {    "keySource": "Unified"  }}
```

## Parameters

* [ Input ](#tab-panel-1554)
* [ Output ](#tab-panel-1555)

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 1:1Aspect ratio of the video. Ignored when an input image is provided.

audio

`string`Input audio to condition video generation. HTTP(S) URL or data URI. Supports flac, mp3, wav. When provided, duration is ignored.

disable\_safety\_filter

`boolean`requireddefault: trueDisable safety filter for prompts and input images.

draft

`boolean`requireddefault: falseDraft mode. Generates a lower-quality preview of the video.

duration

`integer`requireddefault: 5maximum: 20minimum: 1Duration of the video in seconds (1-20). Ignored when audio is provided.

▶fps

`one of`required

image

`string`Input image to generate video from (image-to-video). HTTP(S) URL or data URI. Supports jpg, jpeg, png, webp. When provided, aspect\_ratio is ignored.

last\_frame\_image

`string`Reference image for the last frame of the video. HTTP(S) URL or data URI.

prompt

`string`requiredText prompt for video generation.

prompt\_upsampling

`boolean`requireddefault: trueUse prompt upsampling to enhance the prompt.

resolution

`string`requireddefault: 720penum: 720p, 1080pVideo resolution.

save\_audio

`boolean`requireddefault: trueSave the video with audio.

seed

`integer`maximum: 9007199254740991minimum: \-9007199254740991Random seed for reproducible generation.

video

`string`format: uriPresigned URL for the generated video.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/pruna/p-video/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/pruna/p-video/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/pruna/p-video/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/pruna/p-video/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-video/#page","headline":"P-Video (pruna) · Cloudflare AI docs · Cloudflare AI docs","description":"Pruna's P-Video is a premium video generation model supporting text-to-video, image-to-video, and audio-conditioned generation up to 1080p at 24 or 48 fps, with configurable duration up to 20 seconds.","url":"https://developers.cloudflare.com/ai/models/pruna/p-video/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
