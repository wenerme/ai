---
description: FIBO Edit changes one to four input images from a natural-language or structured JSON (VGL) instruction. Add a black-and-white mask to edit only part of a single image, or refer to several images as &quot;image 1&quot;, &quot;image 2&quot;, and so on to combine them or transfer a style.
title: FIBO Edit 1.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

b

# FIBO Edit 1.5

Image-to-Image • bria

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/bria/fibo-edit-1.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`bria/fibo-edit-1.5`

- Third-party

FIBO Edit changes one to four input images from a natural-language or structured JSON (VGL) instruction. Add a black-and-white mask to edit only part of a single image, or refer to several images as "image 1", "image 2", and so on to combine them or transfer a style.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://bria.ai/terms-of-use) |
| More information | [link ↗](https://docs.bria.ai/image-editing/editing/edit-image) |
| Pricing | <ul><li>Per image$0.03</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'bria/fibo-edit-1.5',
  {
    instruction:
      'Change the color palette of the image to #014040, #02735E, #03A678, #F27405, and #731702',
    images: [
      'https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo-edit/pexels-cottonbro-3401900.jpg',
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
  "model": "bria/fibo-edit-1.5",
  "input": {
    "instruction": "Change the color palette of the image to #014040, #02735E, #03A678, #F27405, and #731702",
    "images": [
      "https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo-edit/pexels-cottonbro-3401900.jpg"
    ]
  }
}'
```

![Color Palette](https://examples.aig.cloudflare.com/bria/fibo-edit-1.5/color-palette.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/fibo-edit-1.5/color-palette.png",
    "seed": 3749705
  }
}
```

## Examples

<details>

<summary>**Masked Edit** — Edit only the masked balloons: white areas of the mask are edited and black areas are kept. Adapted from Bria's docs.</summary>



```ts
const response = await env.AI.run(
  'bria/fibo-edit-1.5',
  {
    instruction:
      'Write PARTY on the balloons in a dark, playful font, using a different font for each balloon',
    images: [
      'https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo-edit/pexels-natalie-bond-320378-3371094.jpg',
    ],
    mask: 'https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo-edit/pexels-natalie-bond-320378-3371094_mask.png',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/fibo-edit-1.5",
  "input": {
    "instruction": "Write PARTY on the balloons in a dark, playful font, using a different font for each balloon",
    "images": [
      "https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo-edit/pexels-natalie-bond-320378-3371094.jpg"
    ],
    "mask": "https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo-edit/pexels-natalie-bond-320378-3371094_mask.png"
  }
}'
```

![Masked Edit](https://examples.aig.cloudflare.com/bria/fibo-edit-1.5/masked-edit.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/fibo-edit-1.5/masked-edit.png",
    "seed": 912468565
  }
}
```

</details>

<details>

<summary>**Multi-Image Style Transfer** — Restyle the first image in the style of the second. Both inputs are Nano Banana catalog examples.</summary>



```ts
const response = await env.AI.run(
  'bria/fibo-edit-1.5',
  {
    instruction:
      'Redraw image 1 in the pixel art style of image 2. Keep the armchair, the sleeping cat, and the hanging plants.',
    images: [
      'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/cozy-coffee-shop.png',
      'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/pixel-art-marketplace.png',
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
  "model": "bria/fibo-edit-1.5",
  "input": {
    "instruction": "Redraw image 1 in the pixel art style of image 2. Keep the armchair, the sleeping cat, and the hanging plants.",
    "images": [
      "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/cozy-coffee-shop.png",
      "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana/pixel-art-marketplace.png"
    ]
  }
}'
```

![Multi-Image Style Transfer](https://examples.aig.cloudflare.com/bria/fibo-edit-1.5/multi-image-style-transfer.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/fibo-edit-1.5/multi-image-style-transfer.png",
    "seed": 1523838269
  }
}
```

</details>

## Parameters

▶images\[]

`array`requiredminItems: 1maxItems: 4One to four input images, each a public URL or base64-encoded image data (a \`data:\` URI prefix is accepted). Refer to them in the instruction as "image 1", "image 2", and so on.

instruction

`string`minLength: 1Edit instruction in natural language. Provide this or \`structured\_instruction\`.

structured\_instruction

`string`minLength: 1Structured (VGL) edit instruction as a JSON string, as returned by a previous result. Provide this or \`instruction\`.

mask

`string`minLength: 1Black-and-white mask the same size as the input image, a public URL or base64-encoded image data (a \`data:\` URI prefix is accepted). White areas are edited and black areas are kept. Only allowed with a single input image.

aspect\_ratio

`string`enum: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9Output aspect ratio. Defaults to the aspect ratio of the first input image.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Seed for reproducible results.

output\_type

`string`enum: png, jpegOutput image format. Default png.

ip\_signal

`boolean`When true, the result carries a \`warning\` if the text input may reference IP-protected content. Default false.

prompt\_content\_moderation

`boolean`Reject the request if the instruction fails content moderation. Default true.

visual\_input\_content\_moderation

`boolean`Reject the request if an input image or the mask fails content moderation. Default true.

visual\_output\_content\_moderation

`boolean`Fail the request if the edited image fails content moderation. Default true.

image

`string`format: uriURL of the edited image. Bria hosts it for a limited time (3 days by default); download it to keep it.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Seed used for this image.

structured\_instruction

`string`Structured (VGL) edit instruction used for this image, as a JSON string.

warning

`string`Present when \`ip\_signal\` flagged the instruction as possibly IP-protected.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/bria/fibo-edit-1.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/bria/fibo-edit-1.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/bria/fibo-edit-1.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/bria/fibo-edit-1.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bria/fibo-edit-1.5/#page","headline":"FIBO Edit 1.5","description":"FIBO Edit changes one to four input images from a natural-language or structured JSON (VGL) instruction. Add a black-and-white mask to edit only part of a single image, or refer to several images as \"image 1\", \"image 2\", and so on to combine them or transfer a style.","url":"https://developers.cloudflare.com/ai/models/bria/fibo-edit-1.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
