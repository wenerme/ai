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

Text-to-Video • Vidu • Proxied 

`vidu/q3-pro` 

Vidu Q3 Pro is a high-quality video generation model supporting text-to-video, image-to-video, and start/end-frame-to-video workflows with audio and up to 16-second clips.

| Model Info        |                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.vidu.com/terms)                                                                          |
| More information  | [link ↗](https://www.vidu.com/)                                                                               |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/vidu/q3-pro) |

## Usage

* [ TypeScript ](#tab-panel-1332)
* [ cURL ](#tab-panel-1333)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    duration: 5,

    prompt: 'A golden retriever running through a sunlit meadow in slow motion',

    resolution: '720p',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "vidu/q3-pro",

  "input": {

    "duration": 5,

    "prompt": "A golden retriever running through a sunlit meadow in slow motion",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1330)
* [ Raw response ](#tab-panel-1331)

```

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

**Portrait Aspect Ratio**  — Vertical video for social media 

* [ TypeScript ](#tab-panel-1338)
* [ cURL ](#tab-panel-1339)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    aspect_ratio: '9:16',

    duration: 5,

    prompt:

      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',

    resolution: '720p',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "vidu/q3-pro",

  "input": {

    "aspect_ratio": "9:16",

    "duration": 5,

    "prompt": "A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1334)
* [ Raw response ](#tab-panel-1335)

```

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

**Silent Video**  — Generate video without audio 

* [ TypeScript ](#tab-panel-1342)
* [ cURL ](#tab-panel-1343)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    audio: false,

    duration: 8,

    prompt: 'Abstract paint swirls slowly mixing in water, vivid blues and golds',

    resolution: '720p',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "vidu/q3-pro",

  "input": {

    "audio": false,

    "duration": 8,

    "prompt": "Abstract paint swirls slowly mixing in water, vivid blues and golds",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1336)
* [ Raw response ](#tab-panel-1337)

```

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

**Square Format**  — Square video for product demos or social posts 

* [ TypeScript ](#tab-panel-1344)
* [ cURL ](#tab-panel-1345)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    aspect_ratio: '1:1',

    duration: 5,

    prompt:

      'A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background',

    resolution: '720p',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "vidu/q3-pro",

  "input": {

    "aspect_ratio": "1:1",

    "duration": 5,

    "prompt": "A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1340)
* [ Raw response ](#tab-panel-1341)

```

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

* [ Input ](#tab-panel-1346)
* [ Output ](#tab-panel-1347)

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

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
