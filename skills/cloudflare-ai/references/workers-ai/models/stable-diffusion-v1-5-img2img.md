---
description: Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion.
title: stable-diffusion-v1-5-img2img
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![RunwayML logo](https://developers.cloudflare.com/_astro/runway.Cq8Cjov4.svg)

#  stable-diffusion-v1-5-img2img

 Beta

 Text-to-Image • RunwayML

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` @cf/runwayml/stable-diffusion-v1-5-img2img `

* Cloudflare-hosted

Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion.

| Model Info        |                                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://github.com/runwayml/stable-diffusion/blob/main/LICENSE) |
| More information  | [link ↗](https://huggingface.co/runwayml/stable-diffusion-v1-5)          |
| Beta              | Yes                                                                      |
| Unit Pricing      | $0.00 per step                                                           |

## Parameters

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

Input [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/#page","headline":"stable-diffusion-v1-5-img2img (RunwayML) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion.","url":"https://developers.cloudflare.com/workers-ai/models/stable-diffusion-v1-5-img2img/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
