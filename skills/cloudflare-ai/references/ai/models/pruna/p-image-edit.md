---
description: Pruna's P-Image-Edit edits and composes 1-5 reference images with text instructions. It supports complex compositions, style transfers, and targeted edits with flexible output aspect ratios.
title: P-Image-Edit
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.Bv7D31UF.svg)

# P-Image-Edit

Image-to-Image • Pruna AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/pruna/p-image-edit/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`pruna/p-image-edit`

- Third-party

Pruna's P-Image-Edit edits and composes 1-5 reference images with text instructions. It supports complex compositions, style transfers, and targeted edits with flexible output aspect ratios.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart) |
| Pricing | <ul><li>Per image$0.01</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'pruna/p-image-edit',
  {
    prompt: 'Transform the subject into a watercolor painting style with vibrant colors',
    images: ['https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg'],
    aspect_ratio: '1:1',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-image-edit",
  "input": {
    "prompt": "Transform the subject into a watercolor painting style with vibrant colors",
    "images": [
      "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg"
    ],
    "aspect_ratio": "1:1"
  }
}'
```

![Watercolor Style](https://examples.aig.cloudflare.com/pruna/p-image-edit/watercolor-style.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/p-image-edit/watercolor-style.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredText instruction describing the desired edit or composition.

▶images\[]

`array`requiredminItems: 1maxItems: 5Array of 1-5 reference images. Each entry is an HTTP(S) URL or a base64 data URI (data:image/...;base64,...).

turbo

`boolean`requireddefault: trueRun faster with additional optimizations. For complicated tasks, it is recommended to turn this off.

aspect\_ratio

`string`requireddefault: match\_input\_imageenum: match\_input\_image, 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3Output aspect ratio.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Random seed for reproducible generation.

disable\_safety\_checker

`boolean`requireddefault: falseDisable safety checker for generated images.

image

`string`format: uriPresigned URL for the edited image.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/pruna/p-image-edit/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image-edit/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/pruna/p-image-edit/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image-edit/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-image-edit/#page","headline":"P-Image-Edit","description":"Pruna's P-Image-Edit edits and composes 1-5 reference images with text instructions. It supports complex compositions, style transfers, and targeted edits with flexible output aspect ratios.","url":"https://developers.cloudflare.com/ai/models/pruna/p-image-edit/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
