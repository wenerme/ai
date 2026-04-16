---
title: Seedream 4.0
description: Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedream 4.0 

Text-to-Image • ByteDance • Proxied 

`bytedance/seedream-4.0` 

Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.

| Model Info       |                                                       |
| ---------------- | ----------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedream4%5F0) |

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

Response200 ![Simple Generation](https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg) 

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

Response200 ![High Resolution](https://replicate.delivery/xezq/fMmA8cw0vv3eC0c3PYt2e1fymQEsD1bR1lpd5UnhTKqmNTjZB/tmpik3_vkq7.jpg) 

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

Response200 ![Widescreen Landscape](https://replicate.delivery/xezq/0lxxNQSg3NabCZrDiQVAPGVmjP1Q2dd7TgYCOTfI9LpyZaMLA/tmp89gopylq.jpg) 

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

Response200 ![Portrait Format](https://replicate.delivery/xezq/TRYcLgNMrBpPJVq09ICKXWe4Z8d6olzpK5vtQPOB8O23ZaMLA/tmpaecga26m.jpg) 

**Custom Dimensions**  — Specific width and height 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt: 'A detailed botanical illustration of exotic tropical flowers',

    size: 'custom',

    width: 2048,

    height: 3072,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Custom Dimensions](https://replicate.delivery/xezq/1SbAc0aXYXbVD9doyrdCW78hYufVefMsaJXBrETN7Lu2npxsA/tmphvkx7emy.jpg) 

## Parameters

* [ Input ](#tab-panel-50)
* [ Output ](#tab-panel-51)

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

`string`requiredformat: uri

## API Schemas

* [ Input ](#tab-panel-48)
* [ Output ](#tab-panel-49)

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
