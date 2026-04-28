---
title: HappyHorse 1.0 T2V
description: Alibaba's HappyHorse 1.0 text-to-video model. Generates videos from a text prompt with configurable resolution, aspect ratio, and duration (3-15s).
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  HappyHorse 1.0 T2V 

Text-to-Video • Alibaba • Proxied 

`alibaba/hh1-t2v` 

Alibaba's HappyHorse 1.0 text-to-video model. Generates videos from a text prompt with configurable resolution, aspect ratio, and duration (3-15s).

| Model Info        |                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                              |
| More information  | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1-t2v) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-t2v',

  {

    prompt: 'A little girl walking on the road',

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

**Vertical 1080P**  — Vertical 9:16 output at 1080P for social media 

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-t2v',

  {

    prompt:

      'A dog running through a field of tall grass, slow motion, golden hour',

    resolution: '1080P',

    ratio: '9:16',

    duration: 6,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 

**Reproducible Output**  — Use a fixed seed for reproducibility 

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-t2v',

  {

    prompt: 'Clouds drifting across a mountain range, time-lapse style',

    resolution: '720P',

    ratio: '16:9',

    duration: 5,

    seed: 42,

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

* [ Input ](#tab-panel-2)
* [ Output ](#tab-panel-3)

prompt

`string`requiredminLength: 1maxLength: 2500

resolution

`string`enum: 720P, 1080P

ratio

`string`enum: 16:9, 9:16, 1:1, 4:3, 3:4

duration

`integer`minimum: 3maximum: 15

seed

`integer`minimum: 0maximum: 2147483647

watermark

`boolean`

video

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
