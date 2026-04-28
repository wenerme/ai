---
title: detr-resnet-50
description: DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

![Meta logo](https://developers.cloudflare.com/_astro/meta.BR4nfp35.svg) 

#  detr-resnet-50 Beta 

Object Detection • Meta • Hosted 

`@cf/facebook/detr-resnet-50` 

DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).

| Model Info   |                                  |
| ------------ | -------------------------------- |
| Beta         | Yes                              |
| Unit Pricing | $0.0000075 per inference request |

## Usage

* [  TypeScript ](#tab-panel-2499)
* [  curl ](#tab-panel-2500)

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const res = await fetch("https://cataas.com/cat");

    const blob = await res.arrayBuffer();


    const inputs = {

      image: [...new Uint8Array(blob)],

    };


    const response = await env.AI.run(

      "@cf/facebook/detr-resnet-50",

      inputs

    );


    return new Response(JSON.stringify({ inputs: { image: [] }, response }));

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/facebook/detr-resnet-50  \

    -X POST  \

    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \

    --data-binary "@pedestrian-boulevard-manhattan-crossing.jpg"


```

## Parameters

* [ Input ](#tab-panel-2501)
* [ Output ](#tab-panel-2502)

Option 1

stringformat: binary

The image to use for detection

▶Option 2{}

object

type

`array`

contentType

`application/json`

description

`An array of detected objects within the input image`

items

`[object Object]`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
