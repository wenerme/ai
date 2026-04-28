---
title: dreamshaper-8-lcm
description: Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

 l 

#  dreamshaper-8-lcm 

Text-to-Image • lykon • Hosted 

`@cf/lykon/dreamshaper-8-lcm` 

Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range.

| Model Info       |                                                    |
| ---------------- | -------------------------------------------------- |
| More information | [link ↗](https://huggingface.co/Lykon/DreamShaper) |

## Usage

* [  TypeScript ](#tab-panel-2512)
* [  curl ](#tab-panel-2513)

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

      "@cf/lykon/dreamshaper-8-lcm",

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

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/lykon/dreamshaper-8-lcm  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat" }'


```

## Parameters

* [ Input ](#tab-panel-2514)
* [ Output ](#tab-panel-2515)

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

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
