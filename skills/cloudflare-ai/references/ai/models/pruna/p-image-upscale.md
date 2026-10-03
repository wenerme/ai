---
description: Pruna's P-Image-Upscale increases image resolution using AI, targeting 1-128 megapixels with optional detail and realism enhancement for sharper, cleaner results.
title: P-Image-Upscale
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.Bv7D31UF.svg)

# P-Image-Upscale

Image-to-Image • Pruna AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/pruna/p-image-upscale/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`pruna/p-image-upscale`

- Third-party

Pruna's P-Image-Upscale increases image resolution using AI, targeting 1-128 megapixels with optional detail and realism enhancement for sharper, cleaner results.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart) |
| Pricing | <ul><li>Per image (1-4 MP)$0.005</li><li>Per image (5-8 MP)$0.01</li><li>Per image (9-16 MP)$0.02</li><li>Per image (17-32 MP)$0.04</li><li>Per image (33-64 MP)$0.06</li><li>Per image (65-128 MP)$0.12</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'pruna/p-image-upscale',
  {
    image: 'https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg',
    target: 4,
    enhance_details: true,
    output_format: 'jpg',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-image-upscale",
  "input": {
    "image": "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg",
    "target": 4,
    "enhance_details": true,
    "output_format": "jpg"
  }
}'
```

![4MP Upscale](https://examples.aig.cloudflare.com/pruna/p-image-upscale/4mp-upscale.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/p-image-upscale/4mp-upscale.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

image

`string`requiredInput image to upscale. A publicly reachable HTTP(S) URL or a base64 data URI (data:image/...;base64,...).

target

`integer`requireddefault: 4minimum: 1maximum: 128Target resolution in megapixels (1-128). Output is capped at 128 MP.

output\_format

`string`requireddefault: jpgenum: webp, jpg, pngFormat of the output image.

output\_quality

`integer`requireddefault: 80minimum: 0maximum: 100Quality when saving the output image (0-100). Not relevant for .png outputs.

enhance\_details

`boolean`requireddefault: falseEnhance fine textures and small details.

enhance\_realism

`boolean`requireddefault: falseImprove realism. Recommended for AI-generated images.

disable\_safety\_checker

`boolean`requireddefault: falseDisable safety checker for generated images.

image

`string`format: uriPresigned URL for the upscaled image.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/pruna/p-image-upscale/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image-upscale/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/pruna/p-image-upscale/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image-upscale/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-image-upscale/#page","headline":"P-Image-Upscale","description":"Pruna's P-Image-Upscale increases image resolution using AI, targeting 1-128 megapixels with optional detail and realism enhancement for sharper, cleaner results.","url":"https://developers.cloudflare.com/ai/models/pruna/p-image-upscale/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
