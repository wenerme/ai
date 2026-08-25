---
description: Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range.
title: dreamshaper-8-lcm
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

l

# dreamshaper-8-lcm

Text-to-Image • lykon

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/dreamshaper-8-lcm/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/lykon/dreamshaper-8-lcm`

* Cloudflare-hosted

Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range.

| Model Info       |                                                    |
| ---------------- | -------------------------------------------------- |
| More information | [link ↗](https://huggingface.co/Lykon/DreamShaper) |

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

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/dreamshaper-8-lcm/#page","headline":"dreamshaper-8-lcm (lykon) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range.","url":"https://developers.cloudflare.com/workers-ai/models/dreamshaper-8-lcm/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
