---
description: Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.
title: Imagen 4
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

#  Imagen 4

 Text-to-Image • Google

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/google/imagen-4/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` google/imagen-4 `

* Third-party
* Zero data retention

Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.

| Model Info          |                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                   |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                             |
| Zero data retention | Yes                                                                                                                |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/imagen-4) |

## Usage

```ts
const response = await env.AI.run(
  'google/imagen-4',
  { prompt: 'A golden retriever puppy playing in autumn leaves' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/imagen-4",
  "input": {
    "prompt": "A golden retriever puppy playing in autumn leaves"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/simple-generation.png"
  },
  "state": "Completed"
}
```

## Examples

**Widescreen Landscape**  — Generate a widescreen landscape image

```ts
const response = await env.AI.run(
  'google/imagen-4',
  {
    prompt:
      'A dramatic drone shot of a winding river through an autumn forest, warm golden and red tones',
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
  "model": "google/imagen-4",
  "input": {
    "prompt": "A dramatic drone shot of a winding river through an autumn forest, warm golden and red tones",
    "aspect_ratio": "16:9"
  }
}'
```

![Widescreen Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/widescreen-landscape.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/widescreen-landscape.png"
  },
  "state": "Completed"
}
```

**Portrait Format**  — Vertical portrait-style image

```ts
const response = await env.AI.run(
  'google/imagen-4',
  {
    prompt: 'An elegant Art Deco poster featuring a jazz singer under a spotlight',
    aspect_ratio: '9:16',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/imagen-4",
  "input": {
    "prompt": "An elegant Art Deco poster featuring a jazz singer under a spotlight",
    "aspect_ratio": "9:16"
  }
}'
```

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/portrait-format.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/portrait-format.png"
  },
  "state": "Completed"
}
```

**With People**  — Allow generation of adult people

```ts
const response = await env.AI.run(
  'google/imagen-4',
  {
    prompt: 'A chef preparing sushi in a traditional Japanese kitchen, detailed close-up',
    person_generation: 'allow_adult',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/imagen-4",
  "input": {
    "prompt": "A chef preparing sushi in a traditional Japanese kitchen, detailed close-up",
    "person_generation": "allow_adult"
  }
}'
```

![With People](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/with-people.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/with-people.png"
  },
  "state": "Completed"
}
```

**Product Photo**  — Square product photography

```ts
const response = await env.AI.run(
  'google/imagen-4',
  {
    prompt:
      'A sleek wireless headphone on a minimalist white marble surface with soft studio lighting',
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
  "model": "google/imagen-4",
  "input": {
    "prompt": "A sleek wireless headphone on a minimalist white marble surface with soft studio lighting",
    "aspect_ratio": "1:1"
  }
}'
```

![Product Photo](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/product-photo.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__imagen-4/product-photo.png"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`requiredText prompt describing the image to generate

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9Aspect ratio of the generated image

person\_generation

`string`enum: dont\_allow, allow\_adult, allow\_allAllow the model to generate images of people. dont\_allow: block people, allow\_adult: adults only, allow\_all: adults and children

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/imagen-4/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/imagen-4/#page","headline":"Imagen 4 (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's latest image generation model producing high-quality, photorealistic images from text prompts with support for multiple aspect ratios.","url":"https://developers.cloudflare.com/ai/models/google/imagen-4/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
