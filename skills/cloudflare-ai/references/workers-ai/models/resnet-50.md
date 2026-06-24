---
title: resnet-50
description: 50 layers deep image classification CNN trained on more than 1M images from ImageNet
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Microsoft logo](https://developers.cloudflare.com/_astro/microsoft.LujcDJ--.svg)

#  resnet-50

Image Classification • Microsoft

`@cf/microsoft/resnet-50`

50 layers deep image classification CNN trained on more than 1M images from ImageNet

| Model Info       |                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://www.microsoft.com/en-us/research/blog/microsoft-vision-model-resnet-50-combines-web-scale-data-and-multi-task-learning-to-achieve-state-of-the-art/) |
| Unit Pricing     | $0.0000025 per inference request                                                                                                                                      |

## Usage

* [  TypeScript ](#tab-panel-5148)
* [  curl ](#tab-panel-5149)

```
export interface Env {  AI: Ai;}
export default {  async fetch(request, env): Promise<Response> {    const res = await fetch("https://cataas.com/cat");    const blob = await res.arrayBuffer();
    const inputs = {      image: [...new Uint8Array(blob)],    };
    const response = await env.AI.run(      "@cf/microsoft/resnet-50",      inputs    );
    return new Response(JSON.stringify(response));  },} satisfies ExportedHandler<Env>;
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/microsoft/resnet-50  \    -X POST  \    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \    --data-binary "@orange-llama.png"
```

## Parameters

* [ Input ](#tab-panel-5150)
* [ Output ](#tab-panel-5151)

Option 1

stringformat: binary

The image to classify

▶Option 2{}

object

type

`array`

contentType

`application/json`

items

`[object Object]`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/workers-ai/models/resnet-50/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/resnet-50/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/resnet-50/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/resnet-50/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/resnet-50/#page","headline":"resnet-50 (Microsoft) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"50 layers deep image classification CNN trained on more than 1M images from ImageNet","url":"https://developers.cloudflare.com/workers-ai/models/resnet-50/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
