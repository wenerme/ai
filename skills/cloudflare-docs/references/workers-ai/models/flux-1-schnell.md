---
title: flux-1-schnell
description: FLUX.1 [schnell] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions. 
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  flux-1-schnell 

Text-to-Image • Black Forest Labs • Hosted 

`@cf/black-forest-labs/flux-1-schnell` 

FLUX.1 \[schnell\] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions. 

| Model Info        |                                                  |
| ----------------- | ------------------------------------------------ |
| Terms and License | [link ↗](https://bfl.ai/legal/terms-of-service)  |
| Unit Pricing      | $0.000053 per 512 by 512 tile, $0.00011 per step |

## Usage

* [  Worker (Data URI) ](#tab-panel-2527)
* [  Worker (Image) ](#tab-panel-2528)
* [  curl ](#tab-panel-2529)

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {

      prompt: 'a cyberpunk lizard',

      seed: Math.floor(Math.random() * 10)

    });

    // response.image is base64 encoded which can be used directly as an <img src=""> data URI

    const dataURI = `data:image/jpeg;charset=utf-8;base64,${response.image}`;

    return Response.json({ dataURI });

  },

} satisfies ExportedHandler<Env>;


```

TypeScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', {

      prompt: 'a cyberpunk lizard',

      seed: Math.floor(Math.random() * 10)

    });

    // Convert from base64 string

    const binaryString = atob(response.image);

    // Create byte representation

    const img = Uint8Array.from(binaryString, (m) => m.codePointAt(0));

    return new Response(img, {

      headers: {

        'Content-Type': 'image/jpeg',

      },

    });

  },

} satisfies ExportedHandler<Env>;


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/black-forest-labs/flux-1-schnell  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat", "seed": "Random positive integer" }'


```

## Parameters

* [ Input ](#tab-panel-2530)
* [ Output ](#tab-panel-2531)

prompt

`string`requiredminLength: 1maxLength: 2048A text description of the image you want to generate.

steps

`integer`default: 4maximum: 8The number of diffusion steps; higher values can improve quality but take longer.

image

`string`The generated image in Base64 format.

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
