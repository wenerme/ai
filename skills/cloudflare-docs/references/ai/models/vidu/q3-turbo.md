---
title: Vidu Q3 Turbo
description: Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![Vidu logo](https://developers.cloudflare.com/_astro/vidu._WEx0U8r.svg) 

#  Vidu Q3 Turbo 

Text-to-Video • Vidu 

`vidu/q3-turbo` 

Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.

| Model Info          |                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.vidu.com/terms)                                                                            |
| More information    | [link ↗](https://www.vidu.com/)                                                                                 |
| Zero data retention | Yes                                                                                                             |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/vidu/q3-turbo) |

## Usage

* [ TypeScript ](#tab-panel-1892)
* [ cURL ](#tab-panel-1893)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-turbo',  { prompt: 'A cat lazily stretching on a sunlit windowsill', duration: 5, resolution: '720p' },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-turbo",  "input": {    "prompt": "A cat lazily stretching on a sunlit windowsill",    "duration": 5,    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1890)
* [ Raw response ](#tab-panel-1891)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_28/tasks/26/0417/05/942602832110972928/creation-01/video.mp4"  },  "state": "Completed"}
```

## Examples

**High Resolution**  — Generate at 1080p 

* [ TypeScript ](#tab-panel-1896)
* [ cURL ](#tab-panel-1897)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-turbo',  {    prompt:      'Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background',    duration: 5,    resolution: '1080p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-turbo",  "input": {    "prompt": "Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background",    "duration": 5,    "resolution": "1080p"  }}'
```

* [ Output ](#tab-panel-1894)
* [ Raw response ](#tab-panel-1895)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_44/tasks/26/0417/05/942602894400569344/creation-01/video.mp4"  },  "state": "Completed"}
```

**Portrait Video**  — Vertical video for mobile viewing 

* [ TypeScript ](#tab-panel-1902)
* [ cURL ](#tab-panel-1903)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-turbo',  {    prompt: 'A waterfall cascading down mossy rocks in a tropical jungle, mist rising',    aspect_ratio: '9:16',    duration: 5,    resolution: '720p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-turbo",  "input": {    "prompt": "A waterfall cascading down mossy rocks in a tropical jungle, mist rising",    "aspect_ratio": "9:16",    "duration": 5,    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1898)
* [ Raw response ](#tab-panel-1899)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_48/tasks/26/0417/05/942603057143758848/creation-01/video.mp4"  },  "state": "Completed"}
```

**Extended Duration**  — Longer video clip 

* [ TypeScript ](#tab-panel-1904)
* [ cURL ](#tab-panel-1905)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-turbo',  {    prompt:      'Timelapse of clouds rolling over a mountain peak from sunrise to sunset, dramatic lighting',    duration: 16,    resolution: '720p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-turbo",  "input": {    "prompt": "Timelapse of clouds rolling over a mountain peak from sunrise to sunset, dramatic lighting",    "duration": 16,    "resolution": "720p"  }}'
```

* [ Output ](#tab-panel-1900)
* [ Raw response ](#tab-panel-1901)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_84/tasks/26/0417/06/942603162785705984/creation-01/video.mp4"  },  "state": "Completed"}
```

**Low Resolution Fast Preview**  — Quick preview at 540p 

* [ TypeScript ](#tab-panel-1908)
* [ cURL ](#tab-panel-1909)

TypeScript

```
const response = await env.AI.run(  'vidu/q3-turbo',  {    prompt: 'A sailboat gliding across calm ocean waters at sunset',    duration: 3,    resolution: '540p',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "vidu/q3-turbo",  "input": {    "prompt": "A sailboat gliding across calm ocean waters at sunset",    "duration": 3,    "resolution": "540p"  }}'
```

* [ Output ](#tab-panel-1906)
* [ Raw response ](#tab-panel-1907)

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "video": "https://video.cf.vidu.com/infer_68/tasks/26/0417/06/942603796612128768/creation-01/video.mp4"  },  "state": "Completed"}
```

## Parameters

* [ Input ](#tab-panel-1910)
* [ Output ](#tab-panel-1911)

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

Input [ ](https://developers.cloudflare.com/ai/models/vidu/q3-turbo/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/vidu/q3-turbo/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/vidu/q3-turbo/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/vidu/q3-turbo/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/vidu/q3-turbo/#page","headline":"Vidu Q3 Turbo (Vidu) · Cloudflare AI docs · Cloudflare AI docs","description":"Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.","url":"https://developers.cloudflare.com/ai/models/vidu/q3-turbo/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
