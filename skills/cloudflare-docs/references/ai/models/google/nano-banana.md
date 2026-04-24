---
title: Nano Banana
description: Google's fast image generation model producing high-quality images from text prompts.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana 

Text-to-Image • Google • Proxied 

`google/nano-banana` 

Google's fast image generation model producing high-quality images from text prompts.

| Model Info        |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                     |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/)                                                               |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A cozy coffee shop interior with warm lighting, plants hanging from the ceiling, and a cat sleeping on a velvet armchair by the window',

    aspect_ratio: '16:9',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Cozy Coffee Shop](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/cozy-coffee-shop.png) 

## Examples

**Vintage Tokyo Poster**  — Retro travel poster style illustration 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A vintage travel poster for Tokyo, Japan in the style of 1960s airline advertisements, with Mount Fuji in the background and cherry blossoms framing the scene',

    aspect_ratio: '9:16',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Vintage Tokyo Poster](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/vintage-tokyo-poster.png) 

**Dewdrops Macro**  — Photorealistic macro photography 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A photorealistic macro shot of dewdrops on a spider web at sunrise, with rainbow light refracting through each droplet',

    aspect_ratio: '1:1',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Dewdrops Macro](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/dewdrops-macro.png) 

**Pixel Art Marketplace**  — Isometric pixel art scene 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'An isometric pixel art scene of a bustling medieval marketplace with merchants, knights, and a dragon perched on the town hall roof',

    aspect_ratio: '1:1',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Pixel Art Marketplace](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/pixel-art-marketplace.png) 

**High Resolution Landscape**  — Generate a high-resolution 4K landscape image 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A dramatic mountain landscape at golden hour with snow-capped peaks and a crystal clear alpine lake',

    aspect_ratio: '16:9',

    output_format: 'png',

    image_size: '4K',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![High Resolution Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/high-resolution-landscape.png) 

## Parameters

* [ Input ](#tab-panel-192)
* [ Output ](#tab-panel-193)

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

## API Schemas

* [ Input ](#tab-panel-190)
* [ Output ](#tab-panel-191)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string"

    },

    "image_input": {

      "maxItems": 3,

      "type": "array",

      "items": {

        "type": "string"

      }

    },

    "aspect_ratio": {

      "type": "string",

      "enum": [

        "1:1",

        "3:2",

        "2:3",

        "3:4",

        "4:3",

        "4:5",

        "5:4",

        "9:16",

        "16:9",

        "21:9"

      ]

    },

    "output_format": {

      "type": "string",

      "enum": [

        "jpg",

        "png",

        "webp"

      ]

    },

    "image_size": {

      "type": "string",

      "enum": [

        "1K",

        "2K",

        "4K"

      ]

    }

  },

  "required": [

    "prompt"

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

    "image": {

      "type": "string",

      "format": "uri"

    }

  },

  "required": [

    "image"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
