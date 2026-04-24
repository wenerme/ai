---
title: phoenix-1.0
description: Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.
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

![Leonardo logo](https://developers.cloudflare.com/_astro/leonardo.Ch-T5rST.svg) 

#  phoenix-1.0 

Text-to-Image • Leonardo • Hosted 

`@cf/leonardo/phoenix-1.0` 

Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.

| Model Info        |                                                 |
| ----------------- | ----------------------------------------------- |
| Terms and License | [link ↗](https://leonardo.ai/terms-of-service/) |
| Partner           | Yes                                             |
| Unit Pricing      | $0.0058 per 512 by 512 tile, $0.00011 per step  |

## Usage

* [  TypeScript ](#tab-panel-3819)
* [  curl ](#tab-panel-3820)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    const inputs = {

      prompt: "cyberpunk cat",

    };


    const response = await env.AI.run(

      "@cf/leonardo/phoenix-1.0",

      inputs

    );


    return new Response(response, {

      headers: {

        "content-type": "image/jpg",

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/leonardo/phoenix-1.0  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat" }'


```

## Parameters

* [ Input ](#tab-panel-3823)
* [ Output ](#tab-panel-3824)

prompt

`string`requiredminLength: 1A text description of the image you want to generate.

guidance

`number`default: 2minimum: 2maximum: 10Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt

seed

`integer`minimum: 0Random seed for reproducibility of the image generation

height

`integer`default: 1024minimum: 0maximum: 2048The height of the generated image in pixels

width

`integer`default: 1024minimum: 0maximum: 2048The width of the generated image in pixels

num\_steps

`integer`default: 25minimum: 1maximum: 50The number of diffusion steps; higher values can improve quality but take longer

negative\_prompt

`string`minLength: 1Specify what to exclude from the generated images

The binding returns a `ReadableStream` with the output (check the model's output schema).

## API Schemas

* [ Input ](#tab-panel-3821)
* [ Output ](#tab-panel-3822)

```

{

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "A text description of the image you want to generate."

    },

    "guidance": {

      "type": "number",

      "default": 2,

      "minimum": 2,

      "maximum": 10,

      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"

    },

    "seed": {

      "type": "integer",

      "minimum": 0,

      "description": "Random seed for reproducibility of the image generation"

    },

    "height": {

      "type": "integer",

      "minimum": 0,

      "maximum": 2048,

      "default": 1024,

      "description": "The height of the generated image in pixels"

    },

    "width": {

      "type": "integer",

      "minimum": 0,

      "maximum": 2048,

      "default": 1024,

      "description": "The width of the generated image in pixels"

    },

    "num_steps": {

      "type": "integer",

      "default": 25,

      "minimum": 1,

      "maximum": 50,

      "description": "The number of diffusion steps; higher values can improve quality but take longer"

    },

    "negative_prompt": {

      "type": "string",

      "minLength": 1,

      "description": "Specify what to exclude from the generated images"

    }

  },

  "required": [

    "prompt"

  ]

}


```

Explain Code

```

{

  "type": "string",

  "contentType": "image/jpeg",

  "format": "binary",

  "description": "The generated image in JPEG format"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
