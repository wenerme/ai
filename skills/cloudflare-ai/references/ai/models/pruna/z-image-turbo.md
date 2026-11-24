---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Z-Image Turbo is Tongyi-MAI's 6B-parameter distilled text-to-image model, served by Pruna. It generates photorealistic images in about 8 steps, renders English and Chinese text well, and supports custom sizes up to 2048×2048.
title: Z-Image Turbo
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.Bv7D31UF.svg)

# Z-Image Turbo

Text-to-Image • Pruna AI

Model ID

`pruna/z-image-turbo` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Z-Image Turbo is Tongyi-MAI's 6B-parameter distilled text-to-image model, served by Pruna. It generates photorealistic images in about 8 steps, renders English and Chinese text well, and supports custom sizes up to 2048×2048.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/models/z-image-turbo) |
| Pricing | <ul><li>Per image$0.005</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'pruna/z-image-turbo',
  { prompt: 'A red fox curled up asleep in fresh snow, soft morning light, photorealistic' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/z-image-turbo",
  "input": {
    "prompt": "A red fox curled up asleep in fresh snow, soft morning light, photorealistic"
  }
}'
```

![Fox in the Snow](https://examples.aig.cloudflare.com/pruna/z-image-turbo/fox-in-the-snow.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/z-image-turbo/fox-in-the-snow.jpg"
  }
}
```

## Examples

<details>

<summary>**Bilingual Neon Sign** — Renders Chinese and English text in the same image, wide format, PNG.</summary>



```ts
const response = await env.AI.run(
  'pruna/z-image-turbo',
  {
    prompt:
      'A rainy night street in Shanghai, a glowing neon sign that reads "营业中 OPEN LATE" in red Chinese characters and blue English letters, reflections on wet pavement, cinematic',
    width: 1440,
    height: 768,
    output_format: 'png',
    seed: 42,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/z-image-turbo",
  "input": {
    "prompt": "A rainy night street in Shanghai, a glowing neon sign that reads \"营业中 OPEN LATE\" in red Chinese characters and blue English letters, reflections on wet pavement, cinematic",
    "width": 1440,
    "height": 768,
    "output_format": "png",
    "seed": 42
  }
}'
```

![Bilingual Neon Sign](https://examples.aig.cloudflare.com/pruna/z-image-turbo/bilingual-neon-sign.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/z-image-turbo/bilingual-neon-sign.png"
  }
}
```

</details>

<details>

<summary>**Fast Product Shot** — Studio product photo with go_fast for the lowest latency.</summary>



```ts
const response = await env.AI.run(
  'pruna/z-image-turbo',
  {
    prompt:
      'Studio product photo of a matte black wireless earbud case on a white marble pedestal, soft rim light, shallow depth of field',
    go_fast: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/z-image-turbo",
  "input": {
    "prompt": "Studio product photo of a matte black wireless earbud case on a white marble pedestal, soft rim light, shallow depth of field",
    "go_fast": true
  }
}'
```

![Fast Product Shot](https://examples.aig.cloudflare.com/pruna/z-image-turbo/fast-product-shot.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/z-image-turbo/fast-product-shot.jpg"
  }
}
```

</details>

## Parameters

prompt

`string`requiredminLength: 1Text description of the image to generate.

width

`integer`minimum: 64maximum: 2048Width of the generated image in pixels (64-2048). Defaults to 1024.

height

`integer`minimum: 64maximum: 2048Height of the generated image in pixels (64-2048). Defaults to 1024.

num\_inference\_steps

`integer`minimum: 1maximum: 50Number of inference steps (1-50). Defaults to 8.

guidance\_scale

`number`minimum: 0maximum: 20Guidance scale (0-20). Should be 0 for Turbo models, which is the default.

go\_fast

`boolean`Apply additional optimizations for faster generation. Defaults to false.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Random seed for reproducible generation.

output\_format

`string`enum: jpg, png, webpFormat of the output image. Defaults to jpg.

output\_quality

`integer`minimum: 0maximum: 100Quality when saving jpg or webp output, from 0 to 100. Defaults to 80.

enable\_safety\_filter

`boolean`Check the prompt against the content policy. Defaults to false; the always-on categories are still blocked.

image

`string`format: uriPresigned URL for the generated image.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/pruna/z-image-turbo/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/pruna/z-image-turbo/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/pruna/z-image-turbo/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/pruna/z-image-turbo/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/z-image-turbo/#page","headline":"Z-Image Turbo","description":"Z-Image Turbo is Tongyi-MAI's 6B-parameter distilled text-to-image model, served by Pruna. It generates photorealistic images in about 8 steps, renders English and Chinese text well, and supports custom sizes up to 2048×2048.","url":"https://developers.cloudflare.com/ai/models/pruna/z-image-turbo/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
