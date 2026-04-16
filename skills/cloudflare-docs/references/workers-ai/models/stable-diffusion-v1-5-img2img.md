---
title: stable-diffusion-v1-5-img2img
description: Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion. 
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![RunwayML logo](https://developers.cloudflare.com/_astro/runway.Cq8Cjov4.svg) 

#  stable-diffusion-v1-5-img2img Beta 

Text-to-Image • RunwayML • Hosted 

`@cf/runwayml/stable-diffusion-v1-5-img2img` 

Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion. 

| Model Info        |                                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://github.com/runwayml/stable-diffusion/blob/main/LICENSE) |
| More information  | [link ↗](https://huggingface.co/runwayml/stable-diffusion-v1-5)          |
| Beta              | Yes                                                                      |
| Unit Pricing      | $0.00 per step                                                           |

## Usage

* [  TypeScript ](#tab-panel-3737)
* [  curl ](#tab-panel-3738)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {


    // Picture of a dog

    const exampleInputImage = await fetch(

      "https://pub-1fb693cb11cc46b2b2f656f51e015a2c.r2.dev/dog.png"

    );


    const inputs = {

      prompt: "Change to a lion",

      image: [...new Uint8Array(await exampleInputImage.arrayBuffer())],

    };


    const response = await env.AI.run(

      "@cf/runwayml/stable-diffusion-v1-5-img2img",

      inputs

    );


    return new Response(response, {

      headers: {

        "content-type": "image/png",

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/runwayml/stable-diffusion-v1-5-img2img  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat" }'


```

## Parameters

* [ Input ](#tab-panel-3741)
* [ Output ](#tab-panel-3742)

prompt

`string`requiredminLength: 1A text description of the image you want to generate

negative\_prompt

`string`Text describing elements to avoid in the generated image

height

`integer`minimum: 256maximum: 2048The height of the generated image in pixels

width

`integer`minimum: 256maximum: 2048The width of the generated image in pixels

▶image\[\]

`array`For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values

image\_b64

`string`For use with img2img tasks. A base64-encoded string of the input image

▶mask\[\]

`array`An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values

num\_steps

`integer`default: 20maximum: 20The number of diffusion steps; higher values can improve quality but take longer

strength

`number`default: 1A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image

guidance

`number`default: 7.5Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt

seed

`integer`Random seed for reproducibility of the image generation

The binding returns a `ReadableStream` with the output (check the model's output schema).

## API Schemas

* [ Input ](#tab-panel-3739)
* [ Output ](#tab-panel-3740)

```

{

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string",

      "minLength": 1,

      "description": "A text description of the image you want to generate"

    },

    "negative_prompt": {

      "type": "string",

      "description": "Text describing elements to avoid in the generated image"

    },

    "height": {

      "type": "integer",

      "minimum": 256,

      "maximum": 2048,

      "description": "The height of the generated image in pixels"

    },

    "width": {

      "type": "integer",

      "minimum": 256,

      "maximum": 2048,

      "description": "The width of the generated image in pixels"

    },

    "image": {

      "type": "array",

      "description": "For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values",

      "items": {

        "type": "number",

        "description": "A value between 0 and 255"

      }

    },

    "image_b64": {

      "type": "string",

      "description": "For use with img2img tasks. A base64-encoded string of the input image"

    },

    "mask": {

      "type": "array",

      "description": "An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values",

      "items": {

        "type": "number",

        "description": "A value between 0 and 255"

      }

    },

    "num_steps": {

      "type": "integer",

      "default": 20,

      "maximum": 20,

      "description": "The number of diffusion steps; higher values can improve quality but take longer"

    },

    "strength": {

      "type": "number",

      "default": 1,

      "description": "A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image"

    },

    "guidance": {

      "type": "number",

      "default": 7.5,

      "description": "Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt"

    },

    "seed": {

      "type": "integer",

      "description": "Random seed for reproducibility of the image generation"

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

  "contentType": "image/png",

  "format": "binary",

  "description": "The generated image in PNG format"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
