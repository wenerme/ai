---
title: stable-diffusion-v1-5-inpainting
description: Stable Diffusion Inpainting is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input, with the extra capability of inpainting the pictures by using a mask.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

 r 

#  stable-diffusion-v1-5-inpainting Beta 

Text-to-Image • runwayml 

@cf/runwayml/stable-diffusion-v1-5-inpainting 

Stable Diffusion Inpainting is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input, with the extra capability of inpainting the pictures by using a mask.

| Model Info        |                                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://github.com/runwayml/stable-diffusion/blob/main/LICENSE) |
| More information  | [link ↗](https://huggingface.co/runwayml/stable-diffusion-inpainting)    |
| Beta              | Yes                                                                      |
| Unit Pricing      | $0.00 per step                                                           |

## Usage

* [  TypeScript ](#tab-panel-2045)
* [  curl ](#tab-panel-2046)

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


    // Mask of dog

    const exampleMask = await fetch(

      "https://pub-1fb693cb11cc46b2b2f656f51e015a2c.r2.dev/dog-mask.png"

    );


    const inputs = {

      prompt: "Change to a lion",

      image: [...new Uint8Array(await exampleInputImage.arrayBuffer())],

      mask: [...new Uint8Array(await exampleMask.arrayBuffer())],

    };


    const response =

      await env.AI.run(

        "@cf/runwayml/stable-diffusion-v1-5-inpainting",

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

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/runwayml/stable-diffusion-v1-5-inpainting  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat" }'


```

## Parameters

\* indicates a required field

### Input

* `prompt` ` string ` required min 1  
A text description of the image you want to generate
* `negative_prompt` ` string `  
Text describing elements to avoid in the generated image
* `height` ` integer ` min 256 max 2048  
The height of the generated image in pixels
* `width` ` integer ` min 256 max 2048  
The width of the generated image in pixels
* `image` ` array `  
For use with img2img tasks. An array of integers that represent the image data constrained to 8-bit unsigned integer values  
   * `items` ` number `  
   A value between 0 and 255
* `image_b64` ` string `  
For use with img2img tasks. A base64-encoded string of the input image
* `mask` ` array `  
An array representing An array of integers that represent mask image data for inpainting constrained to 8-bit unsigned integer values  
   * `items` ` number `  
   A value between 0 and 255
* `num_steps` ` integer ` default 20 max 20  
The number of diffusion steps; higher values can improve quality but take longer
* `strength` ` number ` default 1  
A value between 0 and 1 indicating how strongly to apply the transformation during img2img tasks; lower values make the output closer to the input image
* `guidance` ` number ` default 7.5  
Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt
* `seed` ` integer `  
Random seed for reproducibility of the image generation

### Output

 The binding returns a `ReadableStream` with the output (check the model's output schema). 

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-2047)
* [ Output ](#tab-panel-2048)

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
