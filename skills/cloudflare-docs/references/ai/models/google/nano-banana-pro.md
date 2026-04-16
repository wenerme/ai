---
title: Nano Banana Pro
description: Google's higher-quality image generation model with improved detail and prompt adherence.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana Pro 

Text-to-Image • Google • Proxied 

`google/nano-banana-pro` 

Google's higher-quality image generation model with improved detail and prompt adherence.

| Model Info        |                                                        |
| ----------------- | ------------------------------------------------------ |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)       |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/) |

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

Response200 ![Product Photography](https://replicate.delivery/xezq/pKxv2F52WJ5aH9RcN4mefOdxvfeeKUfiuxLrXBcziHDGaSNmF/tmp5dsx8j7h.png) 

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

Response200 ![Fantasy Illustration](https://replicate.delivery/xezq/upf6QxJsbj2DLiXFPheoWEpyYVKefseWbhQOqh3ZQ5G7XpGzC/tmp38w8fb13.jpeg) 

**Architectural Visualization**  — Modern architecture render 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-pro',

  {

    prompt:

      'A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset',

    aspect_ratio: '16:9',

    image_size: '4K',

    output_format: 'jpg',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Architectural Visualization](https://replicate.delivery/xezq/wVDir3Wl4zK6OZ2UdNZZUFfjxRnI0m6qMys09tpNFkiLmaMLA/tmpaeoibzxr.jpeg) 

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

Response200 ![Character Design](https://replicate.delivery/xezq/RvsT0pTkqOqcENng7XvcI3D0RPrYxpJzoh5WzbPz2FFiTNmF/tmpi_j7bnz0.jpeg) 

## Parameters

* [ Input ](#tab-panel-106)
* [ Output ](#tab-panel-107)

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

`string`requiredformat: uri

## API Schemas

* [ Input ](#tab-panel-104)
* [ Output ](#tab-panel-105)

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
