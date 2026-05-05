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

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt: 'A golden retriever running through a sunlit meadow in slow motion',

    duration: 5,

    resolution: '720p',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-592)
* [ Raw response ](#tab-panel-593)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video.cf.vidu.com/infer_64/tasks/26/0417/05/942597991691198464/creation-01/video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Portrait Aspect Ratio**  — Vertical video for social media 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt:

      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',

    duration: 5,

    resolution: '720p',

    aspect_ratio: '9:16',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-594)
* [ Raw response ](#tab-panel-595)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video.cf.vidu.com/infer_88/tasks/26/0417/05/942598607041753088/creation-01/video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Silent Video**  — Generate video without audio 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt:

      'Abstract paint swirls slowly mixing in water, vivid blues and golds',

    duration: 8,

    resolution: '720p',

    audio: false,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-596)
* [ Raw response ](#tab-panel-597)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video.cf.vidu.com/infer_76/tasks/26/0417/05/942599305355595776/creation-01/final_video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Square Format**  — Square video for product demos or social posts 

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-pro',

  {

    prompt:

      'A sleek wireless headphone rotating on a pedestal with soft studio lighting and a white background',

    duration: 5,

    resolution: '720p',

    aspect_ratio: '1:1',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-598)
* [ Raw response ](#tab-panel-599)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video.cf.vidu.com/infer_40/tasks/26/0417/05/942599364482723840/creation-01/video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-600)
* [ Output ](#tab-panel-601)

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
