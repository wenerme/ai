---
description: OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.
title: GPT Image 1.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg)

#  GPT Image 1.5

 Text-to-Image • OpenAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/openai/gpt-image-1.5/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` openai/gpt-image-1.5 `

* Third-party
* Zero data retention

OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.

| Model Info          |                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://openai.com/policies/)                                                                                  |
| More information    | [link ↗](https://openai.com/)                                                                                           |
| Zero data retention | Yes                                                                                                                     |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-image-1.5) |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-image-1.5',
  { prompt: 'A golden retriever puppy playing in autumn leaves' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-1.5",
  "input": {
    "prompt": "A golden retriever puppy playing in autumn leaves"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/simple-generation.png"
  },
  "state": "Completed"
}
```

## Examples

**High Quality**  — Generate a high-quality detailed image

```ts
const response = await env.AI.run(
  'openai/gpt-image-1.5',
  {
    prompt:
      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',
    quality: 'high',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-1.5",
  "input": {
    "prompt": "A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures",
    "quality": "high"
  }
}'
```

![High Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/high-quality.png)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/high-quality.png"
  },
  "state": "Completed"
}
```

**Low Quality Draft**  — Fast, rough draft for iteration

```ts
const response = await env.AI.run(
  'openai/gpt-image-1.5',
  {
    prompt: 'A quiet Japanese garden in morning mist with a stone lantern and koi pond',
    quality: 'low',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-1.5",
  "input": {
    "prompt": "A quiet Japanese garden in morning mist with a stone lantern and koi pond",
    "quality": "low"
  }
}'
```

![Low Quality Draft](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/low-quality-draft.png)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/low-quality-draft.png"
  },
  "state": "Completed"
}
```

**Medium Quality**  — Balanced quality for most uses

```ts
const response = await env.AI.run(
  'openai/gpt-image-1.5',
  {
    prompt:
      'A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting',
    quality: 'medium',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-1.5",
  "input": {
    "prompt": "A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting",
    "quality": "medium"
  }
}'
```

![Medium Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/medium-quality.png)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/medium-quality.png"
  },
  "state": "Completed"
}
```

**Auto Quality**  — Let the model pick an appropriate quality level

```ts
const response = await env.AI.run(
  'openai/gpt-image-1.5',
  {
    prompt:
      'A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky',
    quality: 'auto',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-1.5",
  "input": {
    "prompt": "A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky",
    "quality": "auto"
  }
}'
```

![Auto Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/auto-quality.png)

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/auto-quality.png"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`requiredText prompt describing the image to generate or edit

▶images\[\]

`array`maxItems: 16Input images for image editing, 1-16 entries. Each entry is base64-encoded (raw string or data:image/{png|jpeg|webp};base64,... URI).

quality

`string`enum: low, medium, high, autoQuality of the generated image

size

`string`enum: 256x256, 512x512, 1024x1024, 1792x1024, 1024x1792Size of the generated image

style

`string`enum: vivid, naturalStyle of the generated image

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/openai/gpt-image-1.5/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-image-1.5/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/openai/gpt-image-1.5/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/openai/gpt-image-1.5/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-image-1.5/#page","headline":"GPT Image 1.5 (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-image-1.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
