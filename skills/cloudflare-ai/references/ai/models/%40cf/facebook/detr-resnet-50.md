---
description: DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).
title: detr-resnet-50
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Meta logo](https://developers.cloudflare.com/_astro/meta.CTzB_ysm.svg)

# detr-resnet-50

Beta

Object Detection • Meta

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/%40cf/facebook/detr-resnet-50/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/facebook/detr-resnet-50`

* Cloudflare-hosted

DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).

| Model Info   |                                  |
| ------------ | -------------------------------- |
| Beta         | Yes                              |
| Unit Pricing | $0.0000075 per inference request |

## Usage

```ts

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

```sh

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/facebook/detr-resnet-50  \
    -X POST  \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  \
    --data-binary "@pedestrian-boulevard-manhattan-crossing.jpg"
```

## Parameters

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/facebook/detr-resnet-50/#page","headline":"detr-resnet-50 (Meta) · Cloudflare AI docs · Cloudflare AI docs","description":"DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).","url":"https://developers.cloudflare.com/ai/models/%40cf/facebook/detr-resnet-50/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
