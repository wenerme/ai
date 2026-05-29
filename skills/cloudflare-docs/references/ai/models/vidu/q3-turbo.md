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

Text-to-Video • Vidu • Proxied 

`vidu/q3-turbo` 

Vidu Q3 Turbo is a faster version of Vidu Q3 optimized for lower latency video generation while maintaining audio support and up to 16-second clips.

| Model Info        |                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.vidu.com/terms)                                                                            |
| More information  | [link ↗](https://www.vidu.com/)                                                                                 |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/vidu/q3-turbo) |

## Usage

* [ TypeScript ](#tab-panel-1350)
* [ cURL ](#tab-panel-1351)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  { duration: 5, prompt: 'A cat lazily stretching on a sunlit windowsill', resolution: '720p' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "vidu/q3-turbo",

  "input": {

    "duration": 5,

    "prompt": "A cat lazily stretching on a sunlit windowsill",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1348)
* [ Raw response ](#tab-panel-1349)

```

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

**High Resolution**  — Generate at 1080p 

* [ TypeScript ](#tab-panel-1354)
* [ cURL ](#tab-panel-1355)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    duration: 5,

    prompt:

      'Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background',

    resolution: '1080p',

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

  "model": "vidu/q3-turbo",

  "input": {

    "duration": 5,

    "prompt": "Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background",

    "resolution": "1080p"

  }

}'


```

* [ Output ](#tab-panel-1352)
* [ Raw response ](#tab-panel-1353)

```

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

**Portrait Video**  — Vertical video for mobile viewing 

* [ TypeScript ](#tab-panel-1360)
* [ cURL ](#tab-panel-1361)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    aspect_ratio: '9:16',

    duration: 5,

    prompt: 'A waterfall cascading down mossy rocks in a tropical jungle, mist rising',

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

  "model": "vidu/q3-turbo",

  "input": {

    "aspect_ratio": "9:16",

    "duration": 5,

    "prompt": "A waterfall cascading down mossy rocks in a tropical jungle, mist rising",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1356)
* [ Raw response ](#tab-panel-1357)

```

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

**Extended Duration**  — Longer video clip 

* [ TypeScript ](#tab-panel-1362)
* [ cURL ](#tab-panel-1363)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    duration: 16,

    prompt:

      'Timelapse of clouds rolling over a mountain peak from sunrise to sunset, dramatic lighting',

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

  "model": "vidu/q3-turbo",

  "input": {

    "duration": 16,

    "prompt": "Timelapse of clouds rolling over a mountain peak from sunrise to sunset, dramatic lighting",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1358)
* [ Raw response ](#tab-panel-1359)

```

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

**Low Resolution Fast Preview**  — Quick preview at 540p 

* [ TypeScript ](#tab-panel-1366)
* [ cURL ](#tab-panel-1367)

TypeScript

```

const response = await env.AI.run(

  'vidu/q3-turbo',

  {

    duration: 3,

    prompt: 'A sailboat gliding across calm ocean waters at sunset',

    resolution: '540p',

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

  "model": "vidu/q3-turbo",

  "input": {

    "duration": 3,

    "prompt": "A sailboat gliding across calm ocean waters at sunset",

    "resolution": "540p"

  }

}'


```

* [ Output ](#tab-panel-1364)
* [ Raw response ](#tab-panel-1365)

```

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

* [ Input ](#tab-panel-1368)
* [ Output ](#tab-panel-1369)

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
