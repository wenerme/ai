---
title: flux-1-schnell
description: FLUX.1 [schnell] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions. 
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  flux-1-schnell 

Text-to-Image • Black Forest Labs 

@cf/black-forest-labs/flux-1-schnell 

FLUX.1 \[schnell\] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions. 

| Model Info        |                                                  |
| ----------------- | ------------------------------------------------ |
| Terms and License | [link ↗](https://bfl.ai/legal/terms-of-service)  |
| Unit Pricing      | $0.000053 per 512 by 512 tile, $0.00011 per step |

## Usage

* [  Worker (Data URI) ](#tab-panel-1713)
* [  Worker (Image) ](#tab-panel-1714)
* [  curl ](#tab-panel-1715)

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

Explain Code

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

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/black-forest-labs/flux-1-schnell  \

  -X POST  \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

  -d '{ "prompt": "cyberpunk cat", "seed": "Random positive integer" }'


```

## Parameters

\* indicates a required field

### Input

* `prompt` ` string ` required min 1 max 2048  
A text description of the image you want to generate.
* `steps` ` integer ` default 4 max 8  
The number of diffusion steps; higher values can improve quality but take longer.

### Output

* `image` ` string `  
The generated image in Base64 format.

## API Schemas

The following schemas are based on JSON Schema

* [ Input ](#tab-panel-1716)
* [ Output ](#tab-panel-1717)

```

{

    "type": "object",

    "properties": {

        "prompt": {

            "type": "string",

            "minLength": 1,

            "maxLength": 2048,

            "description": "A text description of the image you want to generate."

        },

        "steps": {

            "type": "integer",

            "default": 4,

            "maximum": 8,

            "description": "The number of diffusion steps; higher values can improve quality but take longer."

        }

    },

    "required": [

        "prompt"

    ]

}


```

Explain Code

```

{

    "type": "object",

    "contentType": "application/json",

    "properties": {

        "image": {

            "type": "string",

            "description": "The generated image in Base64 format."

        }

    }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
