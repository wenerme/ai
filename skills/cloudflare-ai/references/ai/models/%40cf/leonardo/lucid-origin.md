---
description: Lucid Origin from Leonardo.AI is their most adaptable and prompt-responsive model to date. Whether you're generating images with sharp graphic design, stunning full-HD renders, or highly specific creative direction, it adheres closely to your prompts, renders text with accuracy, and supports a wide array of visual styles and aesthetics – from stylized concept art to crisp product mockups.

title: lucid-origin
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Leonardo logo](https://developers.cloudflare.com/_astro/leonardo.Ch-T5rST.svg)

#  lucid-origin

 Text-to-Image • Leonardo

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/%40cf/leonardo/lucid-origin/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` @cf/leonardo/lucid-origin `

* Cloudflare-hosted
* Partner

Lucid Origin from Leonardo.AI is their most adaptable and prompt-responsive model to date. Whether you're generating images with sharp graphic design, stunning full-HD renders, or highly specific creative direction, it adheres closely to your prompts, renders text with accuracy, and supports a wide array of visual styles and aesthetics – from stylized concept art to crisp product mockups.

| Model Info        |                                                 |
| ----------------- | ----------------------------------------------- |
| Terms and License | [link ↗](https://leonardo.ai/terms-of-service/) |
| Partner           | Yes                                             |
| Unit Pricing      | $0.007 per 512 by 512 tile, $0.00013 per step   |

## Parameters

prompt

`string`requiredminLength: 1A text description of the image you want to generate.

guidance

`number`default: 4.5minimum: 0maximum: 10Controls how closely the generated image should adhere to the prompt; higher values make the image more aligned with the prompt

seed

`integer`minimum: 0Random seed for reproducibility of the image generation

height

`integer`default: 1120minimum: 0maximum: 2500The height of the generated image in pixels

width

`integer`default: 1120minimum: 0maximum: 2500The width of the generated image in pixels

num\_steps

`integer`minimum: 1maximum: 40The number of diffusion steps; higher values can improve quality but take longer

steps

`integer`minimum: 1maximum: 40The number of diffusion steps; higher values can improve quality but take longer

image

`string`The generated image in Base64 format.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/@cf/leonardo/lucid-origin/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/leonardo/lucid-origin/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/@cf/leonardo/lucid-origin/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/@cf/leonardo/lucid-origin/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/leonardo/lucid-origin/#page","headline":"lucid-origin (Leonardo) · Cloudflare AI docs · Cloudflare AI docs","description":"Lucid Origin from Leonardo.AI is their most adaptable and prompt-responsive model to date. Whether you're generating images with sharp graphic design, stunning full-HD renders, or highly specific creative direction, it adheres closely to your prompts, renders text with accuracy, and supports a wide array of visual styles and aesthetics – from stylized concept art to crisp product mockups.","url":"https://developers.cloudflare.com/ai/models/%40cf/leonardo/lucid-origin/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
