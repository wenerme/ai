---
description: Pruna's P-Image Try-On virtually fits one or more garments onto a person's photo. Provide a photo of a person plus garment reference images and the model realistically dresses the person in the provided garments.
title: P-Image Try-On
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.Bv7D31UF.svg)

# P-Image Try-On

Image-to-Image • Pruna AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/pruna/p-image-try-on/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`pruna/p-image-try-on`

- Third-party

Pruna's P-Image Try-On virtually fits one or more garments onto a person's photo. Provide a photo of a person plus garment reference images and the model realistically dresses the person in the provided garments.

Tip

**70% off P-Image-Try-On:** Save 70% on all inference with P-Image-Try-On until Sunday, 21 June at 11:59 PM CEST

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart) |
| Pricing | <ul><li>Per image$0.015</li><li>Per input image$0.008</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'pruna/p-image-try-on',
  {
    person_image:
      'https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg',
    garment_images: [
      'https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/cloth/04469_00.jpg',
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-image-try-on",
  "input": {
    "person_image": "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg",
    "garment_images": [
      "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/cloth/04469_00.jpg"
    ]
  }
}'
```

![Single Garment](https://examples.aig.cloudflare.com/pruna/p-image-try-on/single-garment.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/p-image-try-on/single-garment.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**Turbo PNG** — Faster generation with turbo optimizations, returning a PNG.</summary>



```ts
const response = await env.AI.run(
  'pruna/p-image-try-on',
  {
    person_image:
      'https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg',
    garment_images: [
      'https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/cloth/09163_00.jpg',
    ],
    turbo: true,
    output_format: 'png',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-image-try-on",
  "input": {
    "person_image": "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/human/00121_00.jpg",
    "garment_images": [
      "https://huggingface.co/spaces/yisol/IDM-VTON/resolve/main/example/cloth/09163_00.jpg"
    ],
    "turbo": true,
    "output_format": "png"
  }
}'
```

![Turbo PNG](https://examples.aig.cloudflare.com/pruna/p-image-try-on/turbo-png.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/p-image-try-on/turbo-png.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

## Parameters

person\_image

`string`requiredImage of the person to dress. A publicly reachable HTTP(S) URL or a base64 data URI (data:image/...;base64,...).

▶garment\_images\[]

`array`requiredminItems: 1maxItems: 11Garment reference images to fit onto the person. Each entry is an HTTP(S) URL or a base64 data URI. Up to 6 recommended, up to 11 supported.

prompt

`string`requireddefault: Experimental guidance for non-flatlay garment images, e.g. which garment from which image to use.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Random seed. Leave unset for a random seed.

turbo

`boolean`requireddefault: falseRun faster with additional optimizations. Not recommended for more than 4 garments.

output\_format

`string`requireddefault: jpgenum: webp, jpg, pngFormat of the saved output image.

output\_quality

`integer`requireddefault: 95minimum: 0maximum: 100Quality for jpg/webp outputs, from 0 to 100.

reference\_pose

`string`Optional reference pose image (HTTP(S) URL or data URI). When provided, the person is reposed to match this reference before virtual try-on.

preserve\_input\_size

`boolean`requireddefault: trueReturn the output at the original input resolution.

image

`string`format: uriPresigned URL for the generated try-on image.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/pruna/p-image-try-on/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image-try-on/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/pruna/p-image-try-on/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image-try-on/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-image-try-on/#page","headline":"P-Image Try-On","description":"Pruna's P-Image Try-On virtually fits one or more garments onto a person's photo. Provide a photo of a person plus garment reference images and the model realistically dresses the person in the provided garments.","url":"https://developers.cloudflare.com/ai/models/pruna/p-image-try-on/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
