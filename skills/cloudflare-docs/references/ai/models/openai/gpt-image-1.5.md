---
title: GPT Image 1.5
description: OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT Image 1.5 

Text-to-Image • OpenAI • Proxied 

`openai/gpt-image-1.5` 

OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.

| Model Info        |                                        |
| ----------------- | -------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information  | [link ↗](https://openai.com/)          |

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

Response200 ![Simple Generation](https://replicate.delivery/xezq/e6OMSz5X7H1sDqhsR2iMNEmeYt6xKtz4dqOG3LDbz1l7CCbWA/tmprm99whd5.webp) 

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

Response200 ![High Quality](https://replicate.delivery/xezq/rnBZiGNrfi02SiE14PNWfPLPkwpCG0U1itHlfqZtY0rOHE2sA/tmpbxd7pnlz.webp) 

**Custom Size**  — Generate a widescreen image 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky',

    size: '1792x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Custom Size](https://replicate.delivery/xezq/beYNKTX2VH21ViqZfKtHZV0SJra3P2jsUXHI4wshiwy5DCbWA/tmpg6k0o7rl.webp) 

**Vivid Style**  — Hyper-real, dramatic image style 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A neon-lit cyberpunk cityscape at night with rain-slicked streets and holographic billboards',

    style: 'vivid',

    quality: 'high',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Vivid Style](https://replicate.delivery/xezq/qVMMM1dkCI6VHNUokpmXAKf4fjYeizd1qBTq7E6K4EsBJE2sA/tmpmeik2ps6.webp) 

**Natural Style**  — More natural, less hyper-real image style 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A quiet Japanese garden in morning mist with a stone lantern and koi pond',

    style: 'natural',

    size: '1024x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Natural Style](https://replicate.delivery/xezq/9Qss2QiMKqaxOx1en1jfhWTZ4I19P1HJcIdlh6BxFk9zECbWA/tmpcqc84swf.webp) 

## Parameters

* [ Input ](#tab-panel-202)
* [ Output ](#tab-panel-203)

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

* [ Input ](#tab-panel-200)
* [ Output ](#tab-panel-201)

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
