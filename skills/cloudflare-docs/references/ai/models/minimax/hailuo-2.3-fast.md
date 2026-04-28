---
title: MiniMax Hailuo 2.3 Fast
description: A lower-latency version of Hailuo 2.3 that preserves core motion quality, visual consistency, and stylization while enabling faster iteration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

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

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3-fast',

  {

    first_frame_image:

      'https://replicate.delivery/xezq/MQpUhqkESIIQDlWUxtNcsznZLfUTmhEbCV3vdAZGHGPwwaMLA/tmpgl4gvv5n.jpeg',

    prompt: 'Gentle movement and subtle animation, natural-looking motion',

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

**High Resolution I2V**  — Animate a photo in 1080P 

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3-fast',

  {

    first_frame_image:

      'https://replicate.delivery/xezq/IeNNble3XUqhpUZTd3CkYTUf8EgkFU1fl1Jnyive3B26MsGzC/tmp51dpln4i.jpeg',

    prompt: 'Camera slowly pans across the scene with cinematic depth of field',

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

**Fast Processing**  — Quick I2V with fast pretreatment enabled 

TypeScript

```

const response = await env.AI.run(

  'minimax/hailuo-2.3-fast',

  {

    first_frame_image:

      'https://replicate.delivery/xezq/jfh37lJpnDQhaKcAfCrxSCEh7HA7lv5cCWmJW284tYXwh1YWA/tmpw2i437qe.jpeg',

    prompt: 'Hair blowing in the wind, eyes blinking naturally',

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

* [ Input ](#tab-panel-190)
* [ Output ](#tab-panel-191)

first\_frame\_image

`string`requiredURL or base64 data URI of the first frame image

prompt

`string`maxLength: 2000

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
