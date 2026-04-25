---
title: Seedream 4.0
description: Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedream 4.0 

Text-to-Image • ByteDance • Proxied 

`bytedance/seedream-4.0` 

Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.

| Model Info       |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedream4%5F0)                                                                    |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-4.0) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt: 'A serene mountain lake surrounded by pine trees at dawn',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/simple-generation.jpeg) 

## Examples

**High Resolution**  — 4K quality image generation 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt:

      'A detailed steampunk mechanical owl with brass gears and copper feathers, intricate clockwork visible',

    size: '4K',

    aspect_ratio: '1:1',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![High Resolution](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/high-resolution.jpeg) 

**Widescreen Landscape**  — Cinematic aspect ratio image 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt:

      'A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground',

    size: '2K',

    aspect_ratio: '21:9',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Widescreen Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/widescreen-landscape.jpeg) 

**Portrait Format**  — Vertical image for portraits 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt:

      'An elegant Art Deco poster featuring a jazz singer under a spotlight',

    aspect_ratio: '9:16',

    enhance_prompt: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/portrait-format.jpeg) 

**Detailed 4K**  — High-resolution detailed botanical illustration 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt: 'A detailed botanical illustration of exotic tropical flowers',

    size: '4K',

    aspect_ratio: '3:4',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Detailed 4K](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/detailed-4k.jpeg) 

## Parameters

* [ Input ](#tab-panel-120)
* [ Output ](#tab-panel-121)

prompt

`string`required

size

`string`enum: 1K, 2K, 4K, custom

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

width

`integer`minimum: 1024maximum: 4096

height

`integer`minimum: 1024maximum: 4096

enhance\_prompt

`boolean`

image

`string`format: uri

## API Schemas

* [ Input ](#tab-panel-118)
* [ Output ](#tab-panel-119)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string"

    },

    "size": {

      "type": "string",

      "enum": [

        "1K",

        "2K",

        "4K",

        "custom"

      ]

    },

    "aspect_ratio": {

      "type": "string",

      "enum": [

        "match_input_image",

        "1:1",

        "4:3",

        "3:4",

        "16:9",

        "9:16",

        "3:2",

        "2:3",

        "21:9"

      ]

    },

    "width": {

      "type": "integer",

      "minimum": 1024,

      "maximum": 4096

    },

    "height": {

      "type": "integer",

      "minimum": 1024,

      "maximum": 4096

    },

    "enhance_prompt": {

      "type": "boolean"

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
