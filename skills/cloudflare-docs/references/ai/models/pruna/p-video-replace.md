---
title: P-Video-Replace
description: Pruna's P-Video-Replace takes a source video and one or more identity reference images, then places the referenced person or people into the video while preserving the source motion and audio.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.BVOvqoaI.svg) 

#  P-Video-Replace 

Image-to-Video • Pruna AI 

`pruna/p-video-replace` 

Pruna's P-Video-Replace takes a source video and one or more identity reference images, then places the referenced person or people into the video while preserving the source motion and audio.

| Model Info       |                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart)                                                                   |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/pruna/p-video-replace) |

## Usage

* [ TypeScript ](#tab-panel-1570)
* [ cURL ](#tab-panel-1571)

TypeScript

```
const response = await env.AI.run(  'pruna/p-video-replace',  {    video: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',    images: ['https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg'],    resolution: '720p',    target_fps: 'original',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "pruna/p-video-replace",  "input": {    "video": "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",    "images": [      "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg"    ],    "resolution": "720p",    "target_fps": "original"  }}'
```

* [ Output ](#tab-panel-1568)
* [ Raw response ](#tab-panel-1569)

```
{  "state": "Completed",  "result": {    "video": "https://examples.aig.cloudflare.com/pruna/p-video-replace/character-swap.mp4"  },  "gatewayMetadata": {    "keySource": "Unified"  }}
```

## Parameters

* [ Input ](#tab-panel-1572)
* [ Output ](#tab-panel-1573)

disable\_safety\_checker

`boolean`requireddefault: falseDisable safety checker for generated videos.

ignore\_audio

`boolean`requireddefault: falseIgnore source audio during generation.

▶images\[\]

`array`requiredmaxItems: 3minItems: 1Identity reference image(s), 1 to 3, to place into the video. Each entry is an HTTP(S) URL or a data URI.

instruction\_prompt

`string`requireddefault: Further instruction on how to place people from the reference images into the scene.

resolution

`string`requireddefault: 720penum: 720p, 1080pTarget resolution.

save\_audio

`boolean`requireddefault: trueSave the video with audio.

seed

`integer`maximum: 9007199254740991minimum: \-9007199254740991Random seed for reproducible generation.

target\_fps

`string`requireddefault: originalenum: 24, 48, originalTarget FPS for the working video.

turbo

`boolean`requireddefault: falseTurbo mode: faster generation for slightly lower quality.

video

`string`requiredSource RGB video (.mp4) used as the motion and audio source. HTTP(S) URL or data URI.

video

`string`format: uriPresigned URL for the replacement video.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-replace/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-replace/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-replace/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/pruna/p-video-replace/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-video-replace/#page","headline":"P-Video-Replace (Pruna AI) · Cloudflare AI docs · Cloudflare AI docs","description":"Pruna's P-Video-Replace takes a source video and one or more identity reference images, then places the referenced person or people into the video while preserving the source motion and audio.","url":"https://developers.cloudflare.com/ai/models/pruna/p-video-replace/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
