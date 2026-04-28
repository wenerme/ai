---
title: Wan 2.6 Image
description: Alibaba's Wan 2.6 text-to-image model generating images from text prompts with optional negative prompts and customizable dimensions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  Wan 2.6 Image 

Text-to-Image • Alibaba • Proxied 

`alibaba/wan-2.6-image` 

Alibaba's Wan 2.6 text-to-image model generating images from text prompts with optional negative prompts and customizable dimensions.

| Model Info        |                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                    |
| More information  | [link ↗](https://wan.video/)                                                                                            |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/wan-2.6-image) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt: 'A golden retriever puppy playing in autumn leaves',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/simple-generation.png) 

## Examples

**Custom Dimensions**  — Specify image size in WxH format 

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt:

      'A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground',

    size: '1024x768',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Custom Dimensions](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/custom-dimensions.png) 

**Square Format**  — Square image for social media or product photos 

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt:

      'A sleek wireless headphone on a minimalist white marble surface with soft studio lighting',

    size: '1024x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Square Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/square-format.png) 

**Negative Prompt**  — Guide generation away from unwanted elements 

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt:

      'A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar',

    negative_prompt: 'modern clothing, photograph, blurry, low quality',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Negative Prompt](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/negative-prompt.png) 

**Portrait Format**  — Tall vertical image for portraits 

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt:

      'An elegant Art Deco poster featuring a jazz singer under a spotlight',

    size: '768x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/portrait-format.png) 

## Parameters

* [ Input ](#tab-panel-28)
* [ Output ](#tab-panel-29)

prompt

`string`required

size

`string`pattern: ^\\d+x\\d+$

negative\_prompt

`string`

image

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
