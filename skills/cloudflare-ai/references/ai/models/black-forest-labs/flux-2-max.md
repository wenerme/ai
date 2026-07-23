---
description: FLUX.2 [max] is Black Forest Labs' highest-quality image model — top editing consistency, strongest prompt following, and grounding search for visualizations of real-time information.
title: FLUX.2 [max]
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

# FLUX.2 \[max\]

Text-to-Image • Black Forest Labs

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-2-max/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`black-forest-labs/flux-2-max`

* Third-party

FLUX.2 \[max\] is Black Forest Labs' highest-quality image model — top editing consistency, strongest prompt following, and grounding search for visualizations of real-time information.

| Model Info        |                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                         |
| More information  | [link ↗](https://blackforestlabs.ai/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-2-max) |

## Usage

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-2-max',
  {
    prompt:
      'A cat on its back legs running like a human is holding a big silver fish with its arms. The cat is running away from the shop owner and has a panicked look on his face. The scene is situated in a crowded market.',
    height: 2048,
    width: 1440,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-2-max",
  "input": {
    "prompt": "A cat on its back legs running like a human is holding a big silver fish with its arms. The cat is running away from the shop owner and has a panicked look on his face. The scene is situated in a crowded market.",
    "height": 2048,
    "width": 1440
  }
}'
```

![High Resolution Scene](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/high-resolution-scene.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/high-resolution-scene.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Hex Color Control** — Exact color control via hex codes — useful for brand-consistent imagery

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-2-max',
  {
    prompt:
      'A vase on a table in living room, the color of the vase is a gradient of color, starting with color #02eb3c and finishing with color #edfa3c. The flowers inside the vase have the color #ff0088',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-2-max",
  "input": {
    "prompt": "A vase on a table in living room, the color of the vase is a gradient of color, starting with color #02eb3c and finishing with color #edfa3c. The flowers inside the vase have the color #ff0088"
  }
}'
```

![Hex Color Control](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/hex-color-control.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/hex-color-control.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Image Editing** — Single-reference image editing — relight or restage a product photo

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-2-max',
  {
    prompt: 'Place this product onto a minimalist marble countertop with soft window light',
    input_images: [
      'https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg',
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
  "model": "black-forest-labs/flux-2-max",
  "input": {
    "prompt": "Place this product onto a minimalist marble countertop with soft window light",
    "input_images": [
      "https://replicate.delivery/xezq/jCypj4MeXYUiRyq7nfgm8z1OvFZF81wh4FznutDsZOuJz0YWA/tmp1iukn307.jpg"
    ]
  }
}'
```

![Image Editing](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/image-editing.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-max/image-editing.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredText prompt for image generation or editing.

seed

`integer`minimum: \-9007199254740991maximum: 9007199254740991Optional seed for reproducible generation.

width

`integer`minimum: 64maximum: 9007199254740991Width of the generated image in pixels (minimum 64). Omit to let BFL pick.

height

`integer`minimum: 64maximum: 9007199254740991Height of the generated image in pixels (minimum 64). Omit to let BFL pick.

safety\_tolerance

`integer`minimum: 0maximum: 5Tolerance for input/output moderation. 0 is the strictest, 5 the most permissive. Defaults to 2.

output\_format

`string`enum: jpeg, png, webpOutput image format. Defaults to jpeg.

▶input\_images\[\]

`array`maxItems: 8Up to 8 reference images for editing or multi-image composition. Each entry is an HTTPS URL or a data:image/...;base64,... URI.

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-2-max/#page","headline":"FLUX.2 [max] (Black Forest Labs) · Cloudflare AI docs · Cloudflare AI docs","description":"FLUX.2 \\[max] is Black Forest Labs' highest-quality image model — top editing consistency, strongest prompt following, and grounding search for visualizations of real-time information.","url":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-2-max/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
