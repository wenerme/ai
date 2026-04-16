---
title: flux-2-klein-9b
description: FLUX.2 [klein] 9B is an ultra-fast, distilled image model with enhanced quality. It unifies image generation and editing in a single model, delivering state-of-the-art quality enabling interactive workflows, real-time previews, and latency-critical applications.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  flux-2-klein-9b 

Text-to-Image • Black Forest Labs • Hosted 

`@cf/black-forest-labs/flux-2-klein-9b` 

FLUX.2 \[klein\] 9B is an ultra-fast, distilled image model with enhanced quality. It unifies image generation and editing in a single model, delivering state-of-the-art quality enabling interactive workflows, real-time previews, and latency-critical applications.

| Model Info        |                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://bfl.ai/legal/terms-of-service)                                      |
| Partner           | Yes                                                                                  |
| Unit Pricing      | $0.015 per first MP (1024x1024), $0.002 per subsequent MP, $0.002 per input image MP |

## Usage

* [  TypeScript ](#tab-panel-3052)
* [  curl ](#tab-panel-3053)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const form = new FormData();

    form.append('prompt', 'a sunset with a dog');

    form.append('width', '1024');

    form.append('height', '1024');


    // FormData doesn't expose its serialized body or boundary. Passing it to a

    // Request (or Response) constructor serializes it and generates the Content-Type

    // header with the boundary, which is required for the server to parse the multipart fields.

    const formResponse = new Response(form);

    const formStream = formResponse.body;

    const formContentType = formResponse.headers.get('content-type')!;


    const resp = await env.AI.run("@cf/black-forest-labs/flux-2-klein-9b", {

      multipart: {

        body: formStream,

        contentType: formContentType

      }

    });


    return Response.json(resp);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl --request POST \

  --url 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/ai/run/@cf/black-forest-labs/flux-2-klein-9b' \

  --header 'Authorization: Bearer {TOKEN}' \

  --header 'Content-Type: multipart/form-data' \

  --form 'prompt=a sunset at the alps' \

  --form steps=25 \

  --form width=1024 \

  --form height=1024


```

## Parameters

* [ Input ](#tab-panel-3054)
* [ Output ](#tab-panel-3055)

▶multipart{}

`object`required

image

`string`Generated image as Base64 string.

## API Schemas

* [ Input ](#tab-panel-3050)
* [ Output ](#tab-panel-3051)

```

{

  "type": "object",

  "properties": {

    "multipart": {

      "type": "object",

      "properties": {

        "body": {

          "type": "object"

        },

        "contentType": {

          "type": "string"

        }

      }

    }

  },

  "required": [

    "multipart"

  ]

}


```

Explain Code

```

{

  "type": "object",

  "properties": {

    "image": {

      "type": "string",

      "description": "Generated image as Base64 string."

    }

  }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
