---
title: Nano Banana
description: Google's fast image generation model producing high-quality images from text prompts.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana 

Text-to-Image • Google • Proxied 

`google/nano-banana` 

Google's fast image generation model producing high-quality images from text prompts.

| Model Info        |                                                        |
| ----------------- | ------------------------------------------------------ |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms)       |
| More information  | [link ↗](https://deepmind.google/technologies/imagen/) |

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

Response200 ![Cozy Coffee Shop](https://replicate.delivery/xezq/MQpUhqkESIIQDlWUxtNcsznZLfUTmhEbCV3vdAZGHGPwwaMLA/tmpgl4gvv5n.jpeg) 

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

Response200 ![Vintage Tokyo Poster](https://replicate.delivery/xezq/IeNNble3XUqhpUZTd3CkYTUf8EgkFU1fl1Jnyive3B26MsGzC/tmp51dpln4i.jpeg) 

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

Response200 ![Dewdrops Macro](https://replicate.delivery/xezq/jfh37lJpnDQhaKcAfCrxSCEh7HA7lv5cCWmJW284tYXwh1YWA/tmpw2i437qe.jpeg) 

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

Response200 ![Pixel Art Marketplace](https://replicate.delivery/xezq/pUAcLnl2KmpoChqQ7emXoyqpV3ZBUcV6tVyovozvl4N8waMLA/tmppjbe5cua.jpeg) 

**High Resolution Landscape**  — Generate a high-resolution 4K landscape image 

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana',

  {

    prompt:

      'A dramatic mountain landscape at golden hour with snow-capped peaks and a crystal clear alpine lake',

    aspect_ratio: '16:9',

    image_size: '4K',

    output_format: 'png',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![High Resolution Landscape](https://replicate.delivery/xezq/Rh5vNXYjxVJeBqHfy1F11GQY7ppLFzIMeA1XOGFj9DvIErxsA/tmpm17f21_f.png) 

## Parameters

* [ Input ](#tab-panel-98)
* [ Output ](#tab-panel-99)

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

* [ Input ](#tab-panel-96)
* [ Output ](#tab-panel-97)

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
