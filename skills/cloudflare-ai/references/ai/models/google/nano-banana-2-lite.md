---
description: Google's fastest Gemini image generation model for rapid image creation and iteration.
title: Nano Banana 2 Lite
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Nano Banana 2 Lite

Text-to-Image • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/nano-banana-2-lite/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/nano-banana-2-lite`

* Third-party
* Zero data retention

Google's fastest Gemini image generation model for rapid image creation and iteration.

| Model Info                                                                          |                                                                                                                             |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 65,536 tokens                                                                                                               |
| Terms and License                                                                   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                            |
| More information                                                                    | [link ↗](https://deepmind.google/technologies/imagen/)                                                                      |
| Zero data retention                                                                 | Yes                                                                                                                         |
| Pricing                                                                             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-2-lite) |

## Usage

```ts
const response = await env.AI.run(
  'google/nano-banana-2-lite',
  {
    prompt:
      'A playful concept sketch of a compact solar-powered delivery robot rolling through a leafy neighborhood, bright morning light, clean product design',
    aspect_ratio: '16:9',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-2-lite",
  "input": {
    "prompt": "A playful concept sketch of a compact solar-powered delivery robot rolling through a leafy neighborhood, bright morning light, clean product design",
    "aspect_ratio": "16:9"
  }
}'
```

![Concept Sketch](https://examples.aig.cloudflare.com/google/nano-banana-2-lite/concept-sketch.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2-lite/concept-sketch.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Product Render** — Create a square PNG product image

```ts
const response = await env.AI.run(
  'google/nano-banana-2-lite',
  {
    prompt:
      'A studio product render of translucent wireless earbuds in a frosted glass charging case, soft gradient background, premium advertising style',
    aspect_ratio: '1:1',
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
  "model": "google/nano-banana-2-lite",
  "input": {
    "prompt": "A studio product render of translucent wireless earbuds in a frosted glass charging case, soft gradient background, premium advertising style",
    "aspect_ratio": "1:1",
    "output_format": "png"
  }
}'
```

![Product Render](https://examples.aig.cloudflare.com/google/nano-banana-2-lite/product-render.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2-lite/product-render.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`required

▶image\_input\[\]

`array`maxItems: 3

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

output\_format

`string`enum: jpg, png

resolution

`string`enum: 1K, 2K, 4K

image

`string`format: uri

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana-2-lite/#page","headline":"Nano Banana 2 Lite (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's fastest Gemini image generation model for rapid image creation and iteration.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana-2-lite/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
