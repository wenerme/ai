---
title: MiniMax Hailuo 2.3 Fast
description: A lower-latency version of Hailuo 2.3 that preserves core motion quality, visual consistency, and stylization while enabling faster iteration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  MiniMax Hailuo 2.3 Fast 

Text-to-Video • MiniMax • Proxied 

`minimax/hailuo-2.3-fast` 

A lower-latency version of Hailuo 2.3 that preserves core motion quality, visual consistency, and stylization while enabling faster iteration.

| Model Info        |                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://hailuoai.com/terms)                                                                                      |
| More information  | [link ↗](https://hailuoai.com/)                                                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/hailuo-2.3-fast) |

## Usage

* [ TypeScript ](#tab-panel-758)
* [ cURL ](#tab-panel-759)

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3-fast',

  {

    duration: 6,

    fast_pretreatment: false,

    first_frame_image:

      'https://replicate.delivery/xezq/MQpUhqkESIIQDlWUxtNcsznZLfUTmhEbCV3vdAZGHGPwwaMLA/tmpgl4gvv5n.jpeg',

    prompt: 'Gentle movement and subtle animation, natural-looking motion',

    prompt_optimizer: true,

    resolution: '768P',

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

  "model": "minimax/hailuo-2.3-fast",

  "input": {

    "duration": 6,

    "fast_pretreatment": false,

    "first_frame_image": "https://replicate.delivery/xezq/MQpUhqkESIIQDlWUxtNcsznZLfUTmhEbCV3vdAZGHGPwwaMLA/tmpgl4gvv5n.jpeg",

    "prompt": "Gentle movement and subtle animation, natural-looking motion",

    "prompt_optimizer": true,

    "resolution": "768P"

  }

}'


```

* [ Output ](#tab-panel-754)
* [ Raw response ](#tab-panel-755)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "status": "Success",

    "task_id": "388514752192863",

    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/eff40703-0339-4d1d-b66a-db050e878038/output.mp4"

  },

  "state": "Completed"

}


```

## Examples

**High Resolution I2V**  — Animate a photo in 1080P 

* [ TypeScript ](#tab-panel-762)
* [ cURL ](#tab-panel-763)

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3-fast',

  {

    duration: 6,

    fast_pretreatment: false,

    first_frame_image:

      'https://replicate.delivery/xezq/IeNNble3XUqhpUZTd3CkYTUf8EgkFU1fl1Jnyive3B26MsGzC/tmp51dpln4i.jpeg',

    prompt: 'Camera slowly pans across the scene with cinematic depth of field',

    prompt_optimizer: true,

    resolution: '1080P',

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

  "model": "minimax/hailuo-2.3-fast",

  "input": {

    "duration": 6,

    "fast_pretreatment": false,

    "first_frame_image": "https://replicate.delivery/xezq/IeNNble3XUqhpUZTd3CkYTUf8EgkFU1fl1Jnyive3B26MsGzC/tmp51dpln4i.jpeg",

    "prompt": "Camera slowly pans across the scene with cinematic depth of field",

    "prompt_optimizer": true,

    "resolution": "1080P"

  }

}'


```

* [ Output ](#tab-panel-756)
* [ Raw response ](#tab-panel-757)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "status": "Success",

    "task_id": "388515984507205",

    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/2b6251d2-d4ae-4d58-b12f-2609c50fadc2/output.mp4"

  },

  "state": "Completed"

}


```

**Fast Processing**  — Quick I2V with fast pretreatment enabled 

* [ TypeScript ](#tab-panel-764)
* [ cURL ](#tab-panel-765)

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3-fast',

  {

    duration: 6,

    fast_pretreatment: true,

    first_frame_image:

      'https://replicate.delivery/xezq/jfh37lJpnDQhaKcAfCrxSCEh7HA7lv5cCWmJW284tYXwh1YWA/tmpw2i437qe.jpeg',

    prompt: 'Hair blowing in the wind, eyes blinking naturally',

    prompt_optimizer: true,

    resolution: '768P',

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

  "model": "minimax/hailuo-2.3-fast",

  "input": {

    "duration": 6,

    "fast_pretreatment": true,

    "first_frame_image": "https://replicate.delivery/xezq/jfh37lJpnDQhaKcAfCrxSCEh7HA7lv5cCWmJW284tYXwh1YWA/tmpw2i437qe.jpeg",

    "prompt": "Hair blowing in the wind, eyes blinking naturally",

    "prompt_optimizer": true,

    "resolution": "768P"

  }

}'


```

* [ Output ](#tab-panel-760)
* [ Raw response ](#tab-panel-761)

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "status": "Success",

    "task_id": "388515980755024",

    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/b64303a0-0227-4d42-983a-dcaec397b6b1/output.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-766)
* [ Output ](#tab-panel-767)

▶duration

`one of`required

fast\_pretreatment

`boolean`requireddefault: false

first\_frame\_image

`string`requiredURL or base64 data URI of the first frame image

prompt

`string`maxLength: 2000

prompt\_optimizer

`boolean`requireddefault: true

resolution

`string`requireddefault: 768Penum: 768P, 1080P

status

`string`enum: Preparing, Queueing, Processing, Success, Fail

task\_id

`string`

video

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
