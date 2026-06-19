---
title: phoenix-1.0
description: Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![Leonardo logo](https://developers.cloudflare.com/_astro/leonardo.Ch-T5rST.svg) 

#  phoenix-1.0 

Text-to-Image • Leonardo 

`@cf/leonardo/phoenix-1.0` 

Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.

| Model Info        |                                                 |
| ----------------- | ----------------------------------------------- |
| Terms and License | [link ↗](https://leonardo.ai/terms-of-service/) |
| Partner           | Yes                                             |
| Unit Pricing      | $0.0058 per 512 by 512 tile, $0.00011 per step  |

## Usage

* [  TypeScript ](#tab-panel-5116)
* [  curl ](#tab-panel-5117)

```
export interface Env {  AI: Ai;}
export default {  async fetch(request, env): Promise<Response> {
    const inputs = {      prompt: "cyberpunk cat",    };
    const response = await env.AI.run(      "@cf/leonardo/phoenix-1.0",      inputs    );
    return new Response(response, {      headers: {        "content-type": "image/jpg",      },    });  },} satisfies ExportedHandler<Env>;
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/leonardo/phoenix-1.0  \  -X POST  \  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \  -d '{ "prompt": "cyberpunk cat" }'
```

## Parameters

* [ Input ](#tab-panel-5118)
* [ Output ](#tab-panel-5119)

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

Input [ ](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/#page","headline":"phoenix-1.0 (Leonardo) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Phoenix 1.0 is a model by Leonardo.Ai that generates images with exceptional prompt adherence and coherent text.","url":"https://developers.cloudflare.com/workers-ai/models/phoenix-1.0/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
