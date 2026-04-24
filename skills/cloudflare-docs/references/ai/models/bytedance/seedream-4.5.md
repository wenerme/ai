---
title: Seedream 4.5
description: Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.
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

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedream 4.5 

Text-to-Image • ByteDance • Proxied 

`bytedance/seedream-4.5` 

Seedream 4.5 builds on 4.0 with multi-reference image support, batch generation, and sequential image generation.

| Model Info       |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedream4%5F5)                                                                    |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-4.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.5',

  {

    prompt:

      'A cozy reading nook with floor-to-ceiling bookshelves and a comfortable armchair',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-122)
* [ Output ](#tab-panel-123)

```

{

    "prompt": "A cozy reading nook with floor-to-ceiling bookshelves and a comfortable armchair"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/simple-generation-0.jpeg"

    ]

}


```

## Examples

**High Resolution**  — 4K quality image generation 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.5',

  {

    prompt:

      'A hyperrealistic still life painting of fresh fruit on an antique wooden table with dramatic chiaroscuro lighting',

    size: '4K',

    aspect_ratio: '4:3',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-124)
* [ Output ](#tab-panel-125)

```

{

    "prompt": "A hyperrealistic still life painting of fresh fruit on an antique wooden table with dramatic chiaroscuro lighting",

    "size": "4K",

    "aspect_ratio": "4:3"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/high-resolution-0.jpeg"

    ]

}


```

**Image-to-Image**  — Edit using reference images 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.5',

  {

    prompt:

      'Transform this scene into a winter wonderland with snow covering everything',

    image_input: [

      'https://replicate.delivery/xezq/0lxxNQSg3NabCZrDiQVAPGVmjP1Q2dd7TgYCOTfI9LpyZaMLA/tmp89gopylq.jpg',

    ],

    aspect_ratio: 'match_input_image',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-126)
* [ Output ](#tab-panel-127)

```

{

    "prompt": "Transform this scene into a winter wonderland with snow covering everything",

    "image_input": [

        "https://replicate.delivery/xezq/0lxxNQSg3NabCZrDiQVAPGVmjP1Q2dd7TgYCOTfI9LpyZaMLA/tmp89gopylq.jpg"

    ],

    "aspect_ratio": "match_input_image"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/image-to-image-0.jpeg"

    ]

}


```

**Sequential Generation**  — Generate multiple related images 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.5',

  {

    prompt:

      'A character design sheet for a fantasy warrior: front view, side view, and back view',

    aspect_ratio: '16:9',

    sequential_image_generation: 'auto',

    max_images: 3,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-128)
* [ Output ](#tab-panel-129)

```

{

    "prompt": "A character design sheet for a fantasy warrior: front view, side view, and back view",

    "aspect_ratio": "16:9",

    "sequential_image_generation": "auto",

    "max_images": 3

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/sequential-generation-0.jpeg"

    ]

}


```

**Multi-Image Edit**  — Combine multiple reference images 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.5',

  {

    prompt:

      'Combine the style of the first image with the subject from the second image',

    image_input: [

      'https://replicate.delivery/xezq/TRYcLgNMrBpPJVq09ICKXWe4Z8d6olzpK5vtQPOB8O23ZaMLA/tmpaecga26m.jpg',

      'https://replicate.delivery/xezq/1SbAc0aXYXbVD9doyrdCW78hYufVefMsaJXBrETN7Lu2npxsA/tmphvkx7emy.jpg',

    ],

    size: '2K',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Input / Output JSON 

* [ Input ](#tab-panel-130)
* [ Output ](#tab-panel-131)

```

{

    "prompt": "Combine the style of the first image with the subject from the second image",

    "image_input": [

        "https://replicate.delivery/xezq/TRYcLgNMrBpPJVq09ICKXWe4Z8d6olzpK5vtQPOB8O23ZaMLA/tmpaecga26m.jpg",

        "https://replicate.delivery/xezq/1SbAc0aXYXbVD9doyrdCW78hYufVefMsaJXBrETN7Lu2npxsA/tmphvkx7emy.jpg"

    ],

    "size": "2K"

}


```

```

{

    "images": [

        "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.5/multi-image-edit-0.jpeg"

    ]

}


```

## Parameters

* [ Input ](#tab-panel-134)
* [ Output ](#tab-panel-135)

prompt

`string`required

▶image\_input\[\]

`array`format: uri

size

`string`enum: 2K, 4K

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

sequential\_image\_generation

`string`enum: disabled, auto

max\_images

`integer`minimum: 1maximum: 15

disable\_safety\_checker

`boolean`

▶images\[\]

`array`minItems: 1format: uri

## API Schemas

* [ Input ](#tab-panel-132)
* [ Output ](#tab-panel-133)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string"

    },

    "image_input": {

      "type": "array",

      "items": {

        "type": "string",

        "format": "uri"

      }

    },

    "size": {

      "type": "string",

      "enum": [

        "2K",

        "4K"

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

    "sequential_image_generation": {

      "type": "string",

      "enum": [

        "disabled",

        "auto"

      ]

    },

    "max_images": {

      "type": "integer",

      "minimum": 1,

      "maximum": 15

    },

    "disable_safety_checker": {

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

    "images": {

      "minItems": 1,

      "type": "array",

      "items": {

        "type": "string",

        "format": "uri"

      }

    }

  },

  "required": [

    "images"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
