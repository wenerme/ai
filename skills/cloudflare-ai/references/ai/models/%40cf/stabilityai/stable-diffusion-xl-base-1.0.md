---
title: stable-diffusion-xl-base-1.0
description: Diffusion-based text-to-image generative model by Stability AI. Generates and modify images based on text prompts.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Stability.ai logo](https://developers.cloudflare.com/_astro/stabilityai.CmlmNdqR.svg)

#  stable-diffusion-xl-base-1.0 Beta

Text-to-Image • Stability.ai

`@cf/stabilityai/stable-diffusion-xl-base-1.0`

Diffusion-based text-to-image generative model by Stability AI. Generates and modify images based on text prompts.

| Model Info        |                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md) |
| More information  | [link ↗](https://stability.ai/stable-diffusion)                                                |
| Beta              | Yes                                                                                            |
| Unit Pricing      | $0.00 per step                                                                                 |

## Usage

* [  TypeScript ](#tab-panel-2673)
* [  curl ](#tab-panel-2674)

```ts
export interface Env {
  AI: Ai;
}


export default {
  async fetch(request, env): Promise<Response> {


    const inputs = {
      prompt: "cyberpunk cat",
    };


    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
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

```sh
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0  \
  -X POST  \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \
  -d '{ "prompt": "cyberpunk cat" }'
```

## Parameters

* [ Input ](#tab-panel-2675)
* [ Output ](#tab-panel-2676)

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

Input [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-base-1.0/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-base-1.0/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-base-1.0/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-xl-base-1.0/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/stabilityai/stable-diffusion-xl-base-1.0/#page","headline":"stable-diffusion-xl-base-1.0 (Stability.ai) · Cloudflare AI docs · Cloudflare AI docs","description":"Diffusion-based text-to-image generative model by Stability AI. Generates and modify images based on text prompts.","url":"https://developers.cloudflare.com/ai/models/%40cf/stabilityai/stable-diffusion-xl-base-1.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
