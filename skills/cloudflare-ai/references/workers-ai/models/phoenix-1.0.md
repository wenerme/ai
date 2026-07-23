---
description: Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.
title: phoenix-1.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Leonardo logo](https://developers.cloudflare.com/_astro/leonardo.Ch-T5rST.svg)

# phoenix-1.0

Text-to-Image • Leonardo

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/leonardo/phoenix-1.0`

* Cloudflare-hosted
* Partner

Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.

| Model Info        |                                                 |
| ----------------- | ----------------------------------------------- |
| Terms and License | [link ↗](https://leonardo.ai/terms-of-service/) |
| Partner           | Yes                                             |
| Unit Pricing      | $0.0058 per 512 by 512 tile, $0.00011 per step  |

## Parameters

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

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/#page","headline":"phoenix-1.0 (Leonardo) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.","url":"https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
