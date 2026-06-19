---
title: Vidu Q3 Pro
description: Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![Vidu logo](https://developers.cloudflare.com/_astro/vidu._WEx0U8r.svg) 

#  Vidu Q3 Pro 

Text-to-Video • Vidu 

`vidu/q3-pro` 

Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.

| Model Info          |                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.vidu.com/terms)                                                                          |
| More information    | [link ↗](https://www.vidu.com/)                                                                               |
| Zero data retention | Yes                                                                                                           |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/vidu/q3-pro) |

## Usage

* [ TypeScript ](#tab-panel-1874)
* [ cURL ](#tab-panel-1875)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-pro',  {    prompt: 'A golden retriever running through a sunlit meadow in slow motion',    duration: 5,    resolution: '720p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-pro",  "input": {    "prompt": "A golden retriever running through a sunlit meadow in slow motion",    "duration": 5,    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1872)
* [ Raw response ](#tab-panel-1873)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_64/tasks/26/0417/05/942597991691198464/creation-01/video.mp4"  },  "state": "Completed"}
```

## Examples

**Portrait Aspect Ratio**  — Vertical video for social media 

* [ TypeScript ](#tab-panel-1880)
* [ cURL ](#tab-panel-1881)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-pro',  {    prompt:      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',    aspect_ratio: '9:16',    duration: 5,    resolution: '720p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-pro",  "input": {    "prompt": "A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling",    "aspect_ratio": "9:16",    "duration": 5,    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1876)
* [ Raw response ](#tab-panel-1877)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_88/tasks/26/0417/05/942598607041753088/creation-01/video.mp4"  },  "state": "Completed"}
```

**Silent Video**  — Generate video without audio 

* [ TypeScript ](#tab-panel-1884)
* [ cURL ](#tab-panel-1885)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-pro',  {    audio: false,    prompt: 'Abstract paint swirls slowly mixing in water, vivid blues and golds',    duration: 8,    resolution: '720p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-pro",  "input": {    "audio": false,    "prompt": "Abstract paint swirls slowly mixing in water, vivid blues and golds",    "duration": 8,    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1878)
* [ Raw response ](#tab-panel-1879)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_76/tasks/26/0417/05/942599305355595776/creation-01/final_video.mp4"  },  "state": "Completed"}
```

**Square Format**  — Square video for product demos or social posts 

* [ TypeScript ](#tab-panel-1886)
* [ cURL ](#tab-panel-1887)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-pro',  {    prompt:      'A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background',    aspect_ratio: '1:1',    duration: 5,    resolution: '720p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-pro",  "input": {    "prompt": "A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background",    "aspect_ratio": "1:1",    "duration": 5,    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1882)
* [ Raw response ](#tab-panel-1883)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_40/tasks/26/0417/05/942599364482723840/creation-01/video.mp4"  },  "state": "Completed"}
```

## Parameters

* [ Input ](#tab-panel-1888)
* [ Output ](#tab-panel-1889)

aspect\_ratio

`string`enum: 16:9, 9:16, 3:4, 4:3, 1:1Video aspect ratio (text-to-video only). Default: 16:9

audio

`boolean`Enable audio-video synchronization. Default: true for Q3 models. When false, outputs silent video

duration

`integer`requireddefault: 5maximum: 16minimum: 1Video duration in seconds (1-16)

end\_image

`string`End image for start/end-to-video generation. Must be used together with start\_image. Accepts public URL or Base64 data URI (data:image/png;base64,...)

prompt

`string`maxLength: 5000Text prompt describing what should appear in the video

resolution

`string`requireddefault: 720penum: 540p, 720p, 1080pVideo resolution

start\_image

`string`Start image for video generation. Use alone for image-to-video, or with end\_image for start/end-to-video. Accepts public URL or Base64 data URI (data:image/png;base64,...)

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/vidu/q3-pro/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/vidu/q3-pro/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/vidu/q3-pro/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/vidu/q3-pro/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/vidu/q3-pro/#page","headline":"Vidu Q3 Pro (Vidu) · Cloudflare AI docs · Cloudflare AI docs","description":"Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.","url":"https://developers.cloudflare.com/ai/models/vidu/q3-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
