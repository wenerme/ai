---
title: flux-2-klein-4b
description: FLUX.2 [klein] is an ultra-fast, distilled image model. It unifies image generation and editing in a single model, delivering state-of-the-art quality enabling interactive workflows, real-time previews, and latency-critical applications.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

#  flux-2-klein-4b

Text-to-Image • Black Forest Labs

`@cf/black-forest-labs/flux-2-klein-4b`

FLUX.2 \[klein\] is an ultra-fast, distilled image model. It unifies image generation and editing in a single model, delivering state-of-the-art quality enabling interactive workflows, real-time previews, and latency-critical applications.

| Model Info        |                                                                     |
| ----------------- | ------------------------------------------------------------------- |
| Terms and License | [link ↗](https://bfl.ai/legal/terms-of-service)                     |
| Partner           | Yes                                                                 |
| Unit Pricing      | $0.000059 per input 512x512 tile, $0.000287 per output 512x512 tile |

## Usage

* [  TypeScript ](#tab-panel-2378)
* [  curl ](#tab-panel-2379)

```ts
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


    const resp = await env.AI.run("@cf/black-forest-labs/flux-2-klein-4b", {
      multipart: {
        body: formStream,
        contentType: formContentType
      }
    });


    return Response.json(resp);
  },
} satisfies ExportedHandler<Env>;
```

```sh
curl --request POST \
  --url 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/ai/run/@cf/black-forest-labs/flux-2-klein-4b' \
  --header 'Authorization: Bearer {TOKEN}' \
  --header 'Content-Type: multipart/form-data' \
  --form 'prompt=a sunset at the alps' \
  --form steps=25 \
  --form width=1024 \
  --form height=1024
```

## Parameters

* [ Input ](#tab-panel-2380)
* [ Output ](#tab-panel-2381)

▶multipart{}

`object`required

image

`string`Generated image as Base64 string.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/workers-ai/models/flux-2-klein-4b/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/flux-2-klein-4b/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/flux-2-klein-4b/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/flux-2-klein-4b/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/black-forest-labs/flux-2-klein-4b/#page","headline":"flux-2-klein-4b (Black Forest Labs) · Cloudflare AI docs · Cloudflare AI docs","description":"FLUX.2 \\[klein] is an ultra-fast, distilled image model. It unifies image generation and editing in a single model, delivering state-of-the-art quality enabling interactive workflows, real-time previews, and latency-critical applications.","url":"https://developers.cloudflare.com/ai/models/%40cf/black-forest-labs/flux-2-klein-4b/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
