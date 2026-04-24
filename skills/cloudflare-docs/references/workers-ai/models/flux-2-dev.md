---
title: flux-2-dev
description: FLUX.2 [dev] is an image model from Black Forest Labs where you can generate highly realistic and detailed images, with multi-reference support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  flux-2-dev 

Text-to-Image • Black Forest Labs • Hosted 

`@cf/black-forest-labs/flux-2-dev` 

FLUX.2 \[dev\] is an image model from Black Forest Labs where you can generate highly realistic and detailed images, with multi-reference support.

| Model Info        |                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://bfl.ai/legal/terms-of-service)                                       |
| Partner           | Yes                                                                                   |
| Unit Pricing      | $0.00021 per input 512x512 tile, per step, $0.00041 per output 512x512 tile, per step |

## Usage

* [  TypeScript ](#tab-panel-3236)
* [  curl ](#tab-panel-3237)

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


    const resp = await env.AI.run("@cf/black-forest-labs/flux-2-dev", {

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

  --url 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/ai/run/@cf/black-forest-labs/flux-2-dev' \

  --header 'Authorization: Bearer {TOKEN}' \

  --header 'Content-Type: multipart/form-data' \

  --form 'prompt=a sunset at the alps' \

  --form steps=25 \

  --form width=1024 \

  --form height=1024


```

## Parameters

* [ Input ](#tab-panel-3238)
* [ Output ](#tab-panel-3239)

▶multipart{}

`object`

image

`string`Generated image as Base64 string.

## API Schemas

* [ Input ](#tab-panel-3234)
* [ Output ](#tab-panel-3235)

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

      },

      "required": [

        "body",

        "contentType"

      ]

    },

    "required": [

      "multipart"

    ]

  }

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
