---
title: MiniMax Hailuo 2.3
description: A high-fidelity video generation model optimized for realistic human motion, cinematic VFX, expressive characters, and strong prompt and style adherence across text-to-video and image-to-video workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  MiniMax Hailuo 2.3 

Text-to-Video • MiniMax • Proxied 

`minimax/hailuo-2.3` 

A high-fidelity video generation model optimized for realistic human motion, cinematic VFX, expressive characters, and strong prompt and style adherence across text-to-video and image-to-video workflows.

| Model Info        |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://hailuoai.com/terms)                                                                                 |
| More information  | [link ↗](https://hailuoai.com/)                                                                                      |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/hailuo-2.3) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3',

  {

    prompt: 'A golden retriever playing fetch on a sandy beach at sunset',

    prompt_optimizer: true,

    fast_pretreatment: false,

    duration: 6,

    resolution: '768P',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-302)
* [ Raw response ](#tab-panel-303)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/97d0c2d0-45ab-4ce8-a1f4-177401f43073/output.mp4",

    "task_id": "388507504709991",

    "status": "Success"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**High Resolution**  — 1080P video for higher quality output 

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3',

  {

    prompt:

      'A professional chef preparing sushi in a traditional Japanese kitchen, detailed close-up shots',

    prompt_optimizer: true,

    fast_pretreatment: false,

    duration: 6,

    resolution: '1080P',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-304)
* [ Raw response ](#tab-panel-305)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/1ee6a770-eb88-4b6a-86ea-61981f01ed65/output.mp4",

    "task_id": "388510158565457",

    "status": "Success"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Image to Video**  — Animate a still image with I2V 

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3',

  {

    prompt:

      'Slowly zoom in with subtle parallax movement, gentle atmospheric motion',

    first_frame_image:

      'https://replicate.delivery/xezq/MQpUhqkESIIQDlWUxtNcsznZLfUTmhEbCV3vdAZGHGPwwaMLA/tmpgl4gvv5n.jpeg',

    prompt_optimizer: true,

    fast_pretreatment: false,

    duration: 6,

    resolution: '768P',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-306)
* [ Raw response ](#tab-panel-307)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/a19c7850-6f3b-47dd-b6f1-decb592a11ff/output.mp4",

    "task_id": "388509844320343",

    "status": "Success"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Fast Processing**  — Enable fast pretreatment for quicker results 

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3',

  {

    prompt:

      'Fireworks exploding over a city skyline at night, colorful reflections on water',

    prompt_optimizer: true,

    fast_pretreatment: true,

    duration: 6,

    resolution: '768P',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-308)
* [ Raw response ](#tab-panel-309)

```

{

  "state": "Completed",

  "result": {

    "video": "https://video-product.cdn.minimax.io/inference_output/video/2026-04-17/438b5433-5d32-4760-9564-c86da3d22aee/output.mp4",

    "task_id": "388509805367378",

    "status": "Success"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-310)
* [ Output ](#tab-panel-311)

prompt

`string`maxLength: 2000

first\_frame\_image

`string`

prompt\_optimizer

`boolean`requireddefault: true

fast\_pretreatment

`boolean`requireddefault: false

▶duration

`one of`required

resolution

`string`requireddefault: 768Penum: 768P, 1080P

video

`string`format: uri

task\_id

`string`

status

`string`enum: Preparing, Queueing, Processing, Success, Fail

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
