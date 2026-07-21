---
description: Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.
title: Seedream 4.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

#  Seedream 4.0

 Text-to-Image • ByteDance

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.0/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` bytedance/seedream-4.0 `

* Third-party

Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.

| Model Info       |                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| More information | [link ↗](https://seed.bytedance.com/en/seedream4%5F0)                                                                     |
| Pricing          | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-4.0) |

## Usage

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.0',
  { prompt: 'A serene mountain lake surrounded by pine trees at dawn' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.0",
  "input": {
    "prompt": "A serene mountain lake surrounded by pine trees at dawn"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/simple-generation.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387438887c5f50319cb4d4388d7836967b82aebe5227f8d_0.jpeg"
  },
  "state": "Completed"
}
```

## Examples

**High Resolution**  — 4K quality image generation

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.0',
  {
    prompt:
      'A detailed steampunk mechanical owl with brass gears and copper feathers, intricate clockwork visible',
    aspect_ratio: '1:1',
    size: '4K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.0",
  "input": {
    "prompt": "A detailed steampunk mechanical owl with brass gears and copper feathers, intricate clockwork visible",
    "aspect_ratio": "1:1",
    "size": "4K"
  }
}'
```

![High Resolution](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/high-resolution.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387448153c5f50319cb4d4388d7836967b82aebe5807cbc_0.jpeg"
  },
  "state": "Completed"
}
```

**Widescreen Landscape**  — Cinematic aspect ratio image

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.0',
  {
    prompt:
      'A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground',
    aspect_ratio: '21:9',
    size: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.0",
  "input": {
    "prompt": "A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground",
    "aspect_ratio": "21:9",
    "size": "2K"
  }
}'
```

![Widescreen Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/widescreen-landscape.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387469085c5f50319cb4d4388d7836967b82aebe5dcf17e_0.jpeg"
  },
  "state": "Completed"
}
```

**Portrait Format**  — Vertical image for portraits

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.0',
  {
    prompt: 'An elegant Art Deco poster featuring a jazz singer under a spotlight',
    aspect_ratio: '9:16',
    enhance_prompt: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.0",
  "input": {
    "prompt": "An elegant Art Deco poster featuring a jazz singer under a spotlight",
    "aspect_ratio": "9:16",
    "enhance_prompt": true
  }
}'
```

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/portrait-format.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387475078c5f50319cb4d4388d7836967b82aebe5e6ec81_0.jpeg"
  },
  "state": "Completed"
}
```

**Detailed 4K**  — High-resolution detailed botanical illustration

```ts
const response = await env.AI.run(
  'bytedance/seedream-4.0',
  {
    prompt: 'A detailed botanical illustration of exotic tropical flowers',
    aspect_ratio: '3:4',
    size: '4K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedream-4.0",
  "input": {
    "prompt": "A detailed botanical illustration of exotic tropical flowers",
    "aspect_ratio": "3:4",
    "size": "4K"
  }
}'
```

![Detailed 4K](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/detailed-4k.jpeg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776441662380e1f2c28e220bf76d8a56e2a46eaa08e982d37f_0.jpeg"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`required

size

`string`enum: 1K, 2K, 4K, custom

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

width

`integer`minimum: 1024maximum: 4096

height

`integer`minimum: 1024maximum: 4096

enhance\_prompt

`boolean`

image

`string`format: uri

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.0/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.0/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.0/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/bytedance/seedream-4.0/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedream-4.0/#page","headline":"Seedream 4.0 (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedream-4.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
