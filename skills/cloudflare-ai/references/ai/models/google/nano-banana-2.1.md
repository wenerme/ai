---
description: Google's Nano Banana 2.1 image generation and editing model, optimized for a balance of quality and performance.
title: Nano Banana 2.1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Nano Banana 2.1

Text-to-Image • Google

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/google/nano-banana-2.1/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/nano-banana-2.1`

- Third-party

Google's Nano Banana 2.1 image generation and editing model, optimized for a balance of quality and performance.

| Model Info | |
| --- | --- |
| Context Window [ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/) | 131,072 tokens |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms) |
| More information | [link ↗](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/nano-banana-2-1) |
| Pricing | <ul><li>Input text (per 1M tokens)$1.50</li><li>Input image (per 1M tokens)$1.50</li><li>Output text (per 1M tokens)$7.50</li><li>Reasoning (per 1M tokens)$7.50</li><li>Output image (per 1M tokens)$30.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'google/nano-banana-2.1',
  {
    prompt:
      'A cinematic landscape of a misty mountain valley at sunrise, with warm golden light and dramatic clouds',
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
  "model": "google/nano-banana-2.1",
  "input": {
    "prompt": "A cinematic landscape of a misty mountain valley at sunrise, with warm golden light and dramatic clouds",
    "aspect_ratio": "16:9"
  }
}'
```

![Cinematic Landscape](https://examples.aig.cloudflare.com/google/nano-banana-2.1/cinematic-landscape.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2.1/cinematic-landscape.png"
  }
}
```

## Examples

<details>

<summary>**Watercolor Edit** — Edit an image with a text prompt</summary>



```ts
const response = await env.AI.run(
  'google/nano-banana-2.1',
  {
    prompt: 'Turn the scene into a watercolor illustration with soft pastel colors',
    image_input: ['https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg'],
    aspect_ratio: 'match_input_image',
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
  "model": "google/nano-banana-2.1",
  "input": {
    "prompt": "Turn the scene into a watercolor illustration with soft pastel colors",
    "image_input": [
      "https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg"
    ],
    "aspect_ratio": "match_input_image",
    "output_format": "png"
  }
}'
```

![Watercolor Edit](https://examples.aig.cloudflare.com/google/nano-banana-2.1/watercolor-edit.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2.1/watercolor-edit.png"
  }
}
```

</details>

<details>

<summary>**Grounded Travel Poster** — Create a search-grounded travel poster</summary>



```ts
const response = await env.AI.run(
  'google/nano-banana-2.1',
  {
    prompt:
      'A stylish vintage travel poster celebrating the latest landmarks and cultural highlights of Tokyo, with bold Japanese-inspired typography, Mount Fuji in the distance, and a warm limited-color print palette',
    aspect_ratio: '2:3',
    google_search: true,
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
  "model": "google/nano-banana-2.1",
  "input": {
    "prompt": "A stylish vintage travel poster celebrating the latest landmarks and cultural highlights of Tokyo, with bold Japanese-inspired typography, Mount Fuji in the distance, and a warm limited-color print palette",
    "aspect_ratio": "2:3",
    "google_search": true,
    "output_format": "jpg"
  }
}'
```

![Grounded Travel Poster](https://examples.aig.cloudflare.com/google/nano-banana-2.1/grounded-travel-poster.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2.1/grounded-travel-poster.jpg"
  }
}
```

</details>

<details>

<summary>**Editorial Product Campaign** — Create a polished product campaign image from a reference</summary>



```ts
const response = await env.AI.run(
  'google/nano-banana-2.1',
  {
    prompt:
      'Transform this product photo into a premium editorial campaign image on a sculptural stone pedestal, with soft studio lighting, deep emerald accents, realistic shadows, and a clean luxury magazine aesthetic',
    image_input: [
      'https://storage.googleapis.com/cloud-samples-data/generative-ai/image/320px-Felis_catus-cat_on_snow.jpg',
    ],
    aspect_ratio: '4:5',
    output_format: 'jpg',
    resolution: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-2.1",
  "input": {
    "prompt": "Transform this product photo into a premium editorial campaign image on a sculptural stone pedestal, with soft studio lighting, deep emerald accents, realistic shadows, and a clean luxury magazine aesthetic",
    "image_input": [
      "https://storage.googleapis.com/cloud-samples-data/generative-ai/image/320px-Felis_catus-cat_on_snow.jpg"
    ],
    "aspect_ratio": "4:5",
    "output_format": "jpg",
    "resolution": "2K"
  }
}'
```

![Editorial Product Campaign](https://examples.aig.cloudflare.com/google/nano-banana-2.1/editorial-product-campaign.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2.1/editorial-product-campaign.jpg"
  }
}
```

</details>

## Parameters

prompt

`string`required

▶image\_input\[]

`array`maxItems: 3

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

output\_format

`string`enum: jpg, png

resolution

`string`enum: 1K, 2K, 4K

google\_search

`boolean`

image\_search

`boolean`

image

`string`format: uri

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/google/nano-banana-2.1/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/google/nano-banana-2.1/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/google/nano-banana-2.1/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/google/nano-banana-2.1/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana-2.1/#page","headline":"Nano Banana 2.1","description":"Google's Nano Banana 2.1 image generation and editing model, optimized for a balance of quality and performance.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana-2.1/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
