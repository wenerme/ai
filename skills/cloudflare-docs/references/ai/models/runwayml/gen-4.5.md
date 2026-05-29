---
title: RunwayML Gen-4.5
description: RunwayML's video generation model supporting both text-to-video and image-to-video with customizable duration, aspect ratio, and content moderation controls.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![RunwayML logo](https://developers.cloudflare.com/_astro/runway.Cq8Cjov4.svg) 

#  RunwayML Gen-4.5 

Text-to-Video • RunwayML • Proxied 

`runwayml/gen-4.5` 

RunwayML's video generation model supporting both text-to-video and image-to-video with customizable duration, aspect ratio, and content moderation controls.

| Model Info        |                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://runwayml.com/terms-of-use)                                                                        |
| More information  | [link ↗](https://runwayml.com/)                                                                                    |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/runwayml/gen-4.5) |

## Usage

* [ TypeScript ](#tab-panel-1302)
* [ cURL ](#tab-panel-1303)

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    duration: 5,

    prompt: 'A timelapse of the Eiffel Tower on a sunny day with clouds flying by',

    ratio: '1280:720',

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

  "model": "runwayml/gen-4.5",

  "input": {

    "duration": 5,

    "prompt": "A timelapse of the Eiffel Tower on a sunny day with clouds flying by",

    "ratio": "1280:720"

  }

}'


```

* [ Output ](#tab-panel-1300)
* [ Raw response ](#tab-panel-1301)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://dnznrvs05pmza.cloudfront.net/fd840364-360e-4903-8500-d5787fd8ab90.mp4"

  },

  "state": "Completed"

}


```

## Examples

**Portrait Video**  — Vertical video for social media 

* [ TypeScript ](#tab-panel-1306)
* [ cURL ](#tab-panel-1307)

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    duration: 5,

    prompt:

      'A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling',

    ratio: '720:1280',

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

  "model": "runwayml/gen-4.5",

  "input": {

    "duration": 5,

    "prompt": "A busy street in Tokyo at night with neon signs reflecting on wet pavement, rain falling",

    "ratio": "720:1280"

  }

}'


```

* [ Output ](#tab-panel-1304)
* [ Raw response ](#tab-panel-1305)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://dnznrvs05pmza.cloudfront.net/44f43eac-8c12-4084-ace3-6395fa67c13e.mp4"

  },

  "state": "Completed"

}


```

**Nature Close-up**  — Close-up wildlife shot in 16:9 

* [ TypeScript ](#tab-panel-1310)
* [ cURL ](#tab-panel-1311)

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    duration: 5,

    prompt:

      'Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background',

    ratio: '1280:720',

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

  "model": "runwayml/gen-4.5",

  "input": {

    "duration": 5,

    "prompt": "Close-up of a hummingbird feeding from a vibrant red flower, slow motion with soft bokeh background",

    "ratio": "1280:720"

  }

}'


```

* [ Output ](#tab-panel-1308)
* [ Raw response ](#tab-panel-1309)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://dnznrvs05pmza.cloudfront.net/e03781eb-2544-45ae-a9a8-6148d556bf2a.mp4"

  },

  "state": "Completed"

}


```

**Cinematic Scene**  — Longer duration cinematic video 

* [ TypeScript ](#tab-panel-1314)
* [ cURL ](#tab-panel-1315)

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    duration: 10,

    prompt:

      'Aerial drone shot flying through a misty forest at dawn, rays of sunlight breaking through the trees',

    ratio: '1280:720',

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

  "model": "runwayml/gen-4.5",

  "input": {

    "duration": 10,

    "prompt": "Aerial drone shot flying through a misty forest at dawn, rays of sunlight breaking through the trees",

    "ratio": "1280:720"

  }

}'


```

* [ Output ](#tab-panel-1312)
* [ Raw response ](#tab-panel-1313)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://dnznrvs05pmza.cloudfront.net/23ea177e-523d-45b4-9f8c-c4f8d7238ff0.mp4"

  },

  "state": "Completed"

}


```

**Image-to-Video**  — Animate an existing image 

* [ TypeScript ](#tab-panel-1320)
* [ cURL ](#tab-panel-1321)

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    duration: 5,

    image_input:

      'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg',

    prompt: 'Camera slowly pans across the scene, gentle wind blowing',

    ratio: '1280:720',

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

  "model": "runwayml/gen-4.5",

  "input": {

    "duration": 5,

    "image_input": "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg",

    "prompt": "Camera slowly pans across the scene, gentle wind blowing",

    "ratio": "1280:720"

  }

}'


```

* [ Output ](#tab-panel-1316)
* [ Raw response ](#tab-panel-1317)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://dnznrvs05pmza.cloudfront.net/ab424367-7431-4a0a-aa39-52604ff9150a.mp4"

  },

  "state": "Completed"

}


```

**Reproducible Generation**  — Use seed for consistent results 

* [ TypeScript ](#tab-panel-1324)
* [ cURL ](#tab-panel-1325)

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    duration: 5,

    prompt: 'A sailboat gliding across calm ocean waters at sunset',

    ratio: '1280:720',

    seed: 42,

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

  "model": "runwayml/gen-4.5",

  "input": {

    "duration": 5,

    "prompt": "A sailboat gliding across calm ocean waters at sunset",

    "ratio": "1280:720",

    "seed": 42

  }

}'


```

* [ Output ](#tab-panel-1318)
* [ Raw response ](#tab-panel-1319)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://dnznrvs05pmza.cloudfront.net/0bdfbec7-0823-4529-bdb5-d37bb24adb0d.mp4"

  },

  "state": "Completed"

}


```

**With Content Moderation**  — Adjust content moderation settings 

* [ TypeScript ](#tab-panel-1326)
* [ cURL ](#tab-panel-1327)

TypeScript

```

const response = await env.AI.run(

  'runwayml/gen-4.5',

  {

    content_moderation: { public_figure_threshold: 'low' },

    duration: 5,

    prompt: 'A press conference with multiple speakers at podiums',

    ratio: '1280:720',

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

  "model": "runwayml/gen-4.5",

  "input": {

    "content_moderation": {

      "public_figure_threshold": "low"

    },

    "duration": 5,

    "prompt": "A press conference with multiple speakers at podiums",

    "ratio": "1280:720"

  }

}'


```

* [ Output ](#tab-panel-1322)
* [ Raw response ](#tab-panel-1323)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "video": "https://dnznrvs05pmza.cloudfront.net/75c4cb0d-20aa-4824-b1f3-32f33ab9269b.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1328)
* [ Output ](#tab-panel-1329)

▶content\_moderation{}

`object`Content moderation settings

duration

`integer`requireddefault: 5maximum: 10minimum: 2Video duration in seconds

image\_input

`string`HTTPS URL, Runway URI, or data URI containing an image for image-to-video

prompt

`string`requiredmaxLength: 1000minLength: 1Text prompt describing what should appear in the video

ratio

`string`requireddefault: 1280:720enum: 1280:720, 720:1280, 1104:832, 960:960, 832:1104, 1584:672Resolution/aspect ratio of the output video

seed

`integer`maximum: 4294967295minimum: 0Random seed for reproducible results

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
