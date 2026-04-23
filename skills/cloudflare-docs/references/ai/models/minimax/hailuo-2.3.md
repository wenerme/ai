---
title: Hailuo 2.3
description: A high-fidelity video generation model optimized for realistic human motion, cinematic VFX, expressive characters, and strong prompt and style adherence across text-to-video and image-to-video workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.DPZX-zZI.svg) 

#  Hailuo 2.3 

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

Explain Code

Response200 

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

Explain Code

Response200 

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

Explain Code

Response200 

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

Explain Code

Response200 

## Parameters

* [ Input ](#tab-panel-228)
* [ Output ](#tab-panel-229)

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

## API Schemas

* [ Input ](#tab-panel-226)
* [ Output ](#tab-panel-227)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string",

      "maxLength": 2000

    },

    "first_frame_image": {

      "type": "string"

    },

    "prompt_optimizer": {

      "default": true,

      "type": "boolean"

    },

    "fast_pretreatment": {

      "default": false,

      "type": "boolean"

    },

    "duration": {

      "default": 6,

      "anyOf": [

        {

          "type": "number",

          "const": 6

        },

        {

          "type": "number",

          "const": 10

        }

      ]

    },

    "resolution": {

      "default": "768P",

      "type": "string",

      "enum": [

        "768P",

        "1080P"

      ]

    }

  },

  "required": [

    "prompt_optimizer",

    "fast_pretreatment",

    "duration",

    "resolution"

  ],

  "additionalProperties": false

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "video": {

      "type": "string",

      "format": "uri"

    },

    "task_id": {

      "type": "string"

    },

    "status": {

      "type": "string",

      "enum": [

        "Preparing",

        "Queueing",

        "Processing",

        "Success",

        "Fail"

      ]

    }

  },

  "required": [

    "task_id"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
