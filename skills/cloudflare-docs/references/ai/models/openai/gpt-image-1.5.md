---
title: GPT Image 1.5
description: OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT Image 1.5 

Text-to-Image • OpenAI • Proxied 

`openai/gpt-image-1.5` 

OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.

| Model Info        |                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                                 |
| More information  | [link ↗](https://openai.com/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-image-1.5) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

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

Response200 ![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/simple-generation.png) 

## Examples

**High Quality**  — Generate a high-quality detailed image 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',

    quality: 'high',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![High Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/high-quality.png) 

**Low Quality Draft**  — Fast, rough draft for iteration 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A quiet Japanese garden in morning mist with a stone lantern and koi pond',

    quality: 'low',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Low Quality Draft](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/low-quality-draft.png) 

**Medium Quality**  — Balanced quality for most uses 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting',

    quality: 'medium',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Medium Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/medium-quality.png) 

**Auto Quality**  — Let the model pick an appropriate quality level 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky',

    quality: 'auto',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Auto Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/auto-quality.png) 

## Parameters

* [ Input ](#tab-panel-374)
* [ Output ](#tab-panel-375)

prompt

`string`requiredText prompt describing the image to generate or edit

image

`string`Base64-encoded input image for image editing

quality

`string`enum: low, medium, high, autoQuality of the generated image

size

`string`enum: 256x256, 512x512, 1024x1024, 1792x1024, 1024x1792Size of the generated image

style

`string`enum: vivid, naturalStyle of the generated image

image

`string`format: uriURL to the generated image

## API Schemas

* [ Input ](#tab-panel-372)
* [ Output ](#tab-panel-373)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "description": "Text prompt describing the image to generate or edit",

      "type": "string"

    },

    "image": {

      "description": "Base64-encoded input image for image editing",

      "type": "string"

    },

    "quality": {

      "description": "Quality of the generated image",

      "type": "string",

      "enum": [

        "low",

        "medium",

        "high",

        "auto"

      ]

    },

    "size": {

      "description": "Size of the generated image",

      "type": "string",

      "enum": [

        "256x256",

        "512x512",

        "1024x1024",

        "1792x1024",

        "1024x1792"

      ]

    },

    "style": {

      "description": "Style of the generated image",

      "type": "string",

      "enum": [

        "vivid",

        "natural"

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

      "description": "URL to the generated image",

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
