---
title: Grok Imagine Video
description: xAI's video generation model. Generates, edits, and extends videos from text and image inputs with native synchronized audio including dialogue, sound effects, and music. Supports multiple creative modes (normal, fun, custom).
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg) 

#  Grok Imagine Video 

Text-to-Video • xAI • Proxied 

`xai/grok-imagine-video` 

xAI's video generation model. Generates, edits, and extends videos from text and image inputs with native synchronized audio including dialogue, sound effects, and music. Supports multiple creative modes (normal, fun, custom).

| Model Info        |                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                            |
| More information  | [link ↗](https://docs.x.ai/developers/models/grok-imagine-video)                                                         |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-video) |

## Usage

* [ TypeScript ](#tab-panel-1498)
* [ cURL ](#tab-panel-1499)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-video',

  {

    aspect_ratio: '16:9',

    duration: 5,

    prompt: 'A golden retriever running through a field of sunflowers on a sunny day',

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

  "model": "xai/grok-imagine-video",

  "input": {

    "aspect_ratio": "16:9",

    "duration": 5,

    "prompt": "A golden retriever running through a field of sunflowers on a sunny day",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1494)
* [ Raw response ](#tab-panel-1495)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/xai/grok-imagine-video/simple-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Portrait Video**  — Vertical video for social media 

* [ TypeScript ](#tab-panel-1502)
* [ cURL ](#tab-panel-1503)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-video',

  {

    aspect_ratio: '9:16',

    duration: 5,

    prompt: 'Slow-motion close-up of ink drops blooming through water against a black background',

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

  "model": "xai/grok-imagine-video",

  "input": {

    "aspect_ratio": "9:16",

    "duration": 5,

    "prompt": "Slow-motion close-up of ink drops blooming through water against a black background",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1496)
* [ Raw response ](#tab-panel-1497)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/xai/grok-imagine-video/portrait-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Cinematic Landscape**  — Widescreen cinematic shot at extended duration 

* [ TypeScript ](#tab-panel-1504)
* [ cURL ](#tab-panel-1505)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-video',

  {

    aspect_ratio: '16:9',

    duration: 10,

    prompt:

      'A wide drone shot over snow-covered mountain peaks at sunrise, dramatic lighting with low clouds',

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

  "model": "xai/grok-imagine-video",

  "input": {

    "aspect_ratio": "16:9",

    "duration": 10,

    "prompt": "A wide drone shot over snow-covered mountain peaks at sunrise, dramatic lighting with low clouds",

    "resolution": "720p"

  }

}'


```

* [ Output ](#tab-panel-1500)
* [ Raw response ](#tab-panel-1501)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/xai/grok-imagine-video/cinematic-landscape.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-1506)
* [ Output ](#tab-panel-1507)

\_operation

`string`enum: generate, edit, extend

aspect\_ratio

`string`enum: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3

duration

`integer`maximum: 15minimum: 1

▶image{}

`object`

▶output{}

`object`

prompt

`string`

▶reference\_images\[\]

`array`maxItems: 10

resolution

`string`enum: 480p, 720p

size

`string`enum: 848x480, 1696x960, 1280x720, 1920x1080

user

`string`

▶video{}

`object`

video

`string`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
