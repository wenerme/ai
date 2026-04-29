---
title: Nano Banana Pro
description: Google's higher-quality image generation model with improved detail and prompt adherence.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana Pro 

Text-to-Image • Google • Proxied 

`google/nano-banana-pro` 

Google's higher-quality image generation model with improved detail and prompt adherence.

| Model Info        |                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                         |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/)                                                                   |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-pro) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    prompt:

      'A sleek modern wireless headphone on a minimalist white marble surface with soft studio lighting and subtle shadows',

    aspect_ratio: '1:1',

    output_format: 'png',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Product Photography](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/product-photography.png) 

## Examples

**Fantasy Illustration**  — Epic fantasy scene 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    prompt:

      'An epic fantasy illustration of a wizard casting a spell in an ancient library, magical runes floating in the air, dust motes catching golden light streaming through stained glass windows',

    aspect_ratio: '16:9',

    image_size: '2K',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Fantasy Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/fantasy-illustration.png) 

**Architectural Visualization**  — Modern architecture render 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    prompt:

      'A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset',

    aspect_ratio: '16:9',

    output_format: 'jpg',

    image_size: '4K',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Architectural Visualization](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/architectural-visualization.jpg) 

**Character Design**  — Game character concept art 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    prompt:

      'A detailed character design sheet for a steampunk inventor, showing front view, side view, and detail callouts for mechanical arm and goggles',

    aspect_ratio: '3:2',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Character Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/character-design.png) 

## Parameters

* [ Input ](#tab-panel-174)
* [ Output ](#tab-panel-175)

prompt

`string`required

▶image\_input\[\]

`array`maxItems: 3

aspect\_ratio

`string`enum: 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

output\_format

`string`enum: jpg, png, webp

image\_size

`string`enum: 1K, 2K, 4K

image

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
