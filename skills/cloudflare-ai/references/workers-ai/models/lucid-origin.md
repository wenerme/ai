---
title: lucid-origin
description: Lucid Origin from Leonardo.AI is their most adaptable and prompt-responsive model to date. Whether you're generating images with sharp graphic design, stunning full-HD renders, or highly specific creative direction, it adheres closely to your prompts, renders text with accuracy, and supports a wide array of visual styles and aesthetics – from stylized concept art to crisp product mockups.

image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Leonardo logo](https://developers.cloudflare.com/_astro/leonardo.Ch-T5rST.svg)

#  lucid-origin

Text-to-Image • Leonardo

`@cf/leonardo/lucid-origin`

Lucid Origin from Leonardo.AI is their most adaptable and prompt-responsive model to date. Whether you're generating images with sharp graphic design, stunning full-HD renders, or highly specific creative direction, it adheres closely to your prompts, renders text with accuracy, and supports a wide array of visual styles and aesthetics – from stylized concept art to crisp product mockups.

| Model Info        |                                                 |
| ----------------- | ----------------------------------------------- |
| Terms and License | [link ↗](https://leonardo.ai/terms-of-service/) |
| Partner           | Yes                                             |
| Unit Pricing      | $0.007 per 512 by 512 tile, $0.00013 per step   |

## Usage

* [  TypeScript ](#tab-panel-5071)
* [  curl ](#tab-panel-5072)

```
export interface Env {  AI: Ai;}
export default {  async fetch(request, env): Promise<Response> {
    const inputs = {      prompt: "cyberpunk cat",    };
    const response = await env.AI.run(      "@cf/leonardo/lucid-origin",      inputs    );
    return new Response(response, {      headers: {        "content-type": "image/jpg",      },    });  },} satisfies ExportedHandler<Env>;
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/leonardo/lucid-origin  \  -X POST  \  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \  -d '{ "prompt": "cyberpunk cat" }'
```

## Parameters

* [ Input ](#tab-panel-5073)
* [ Output ](#tab-panel-5074)

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

Input [ ](https://developers.cloudflare.com/workers-ai/models/lucid-origin/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/lucid-origin/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/lucid-origin/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/lucid-origin/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/lucid-origin/#page","headline":"lucid-origin (Leonardo) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Lucid Origin from Leonardo.AI is their most adaptable and prompt-responsive model to date. Whether you're generating images with sharp graphic design, stunning full-HD renders, or highly specific creative direction, it adheres closely to your prompts, renders text with accuracy, and supports a wide array of visual styles and aesthetics – from stylized concept art to crisp product mockups.","url":"https://developers.cloudflare.com/workers-ai/models/lucid-origin/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
