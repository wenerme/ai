---
description: Alibaba's Wan 2.6 text-to-image model generating images from text prompts with optional negative prompts and customizable dimensions.
title: Wan 2.6 Image
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg)

# Wan 2.6 Image

Text-to-Image • Alibaba

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/wan-2.6-image/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/wan-2.6-image`

* Third-party
* Zero data retention

Alibaba's Wan 2.6 text-to-image model generating images from text prompts with optional negative prompts and customizable dimensions.

| Model Info          |                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                    |
| More information    | [link ↗](https://wan.video/)                                                                                            |
| Zero data retention | Yes                                                                                                                     |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/wan-2.6-image) |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/wan-2.6-image',
  { prompt: 'A golden retriever puppy playing in autumn leaves' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-2.6-image",
  "input": {
    "prompt": "A golden retriever puppy playing in autumn leaves"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/66/20260417/c057796c/32701268-BbftSa6r_189314ac1a36.png"
  },
  "state": "Completed"
}
```

## Examples

**Custom Dimensions** — Specify image size in WxH format

```ts
const response = await env.AI.run(
  'alibaba/wan-2.6-image',
  {
    prompt:
      'A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground',
    size: '1024x768',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-2.6-image",
  "input": {
    "prompt": "A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground",
    "size": "1024x768"
  }
}'
```

![Custom Dimensions](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/custom-dimensions.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/35/20260417/c057796c/3257252-vy1GbNI6_bc223e38c5b4.png"
  },
  "state": "Completed"
}
```

**Square Format** — Square image for social media or product photos

```ts
const response = await env.AI.run(
  'alibaba/wan-2.6-image',
  {
    prompt:
      'A sleek wireless headphone on a minimalist white marble surface with soft studio lighting',
    size: '1024x1024',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-2.6-image",
  "input": {
    "prompt": "A sleek wireless headphone on a minimalist white marble surface with soft studio lighting",
    "size": "1024x1024"
  }
}'
```

![Square Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/square-format.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/84/20260417/c057796c/18355039-RFkWcHgG_0dcb1c1d6d95.png"
  },
  "state": "Completed"
}
```

**Negative Prompt** — Guide generation away from unwanted elements

```ts
const response = await env.AI.run(
  'alibaba/wan-2.6-image',
  {
    prompt: 'A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar',
    negative_prompt: 'modern clothing, photograph, blurry, low quality',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-2.6-image",
  "input": {
    "prompt": "A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar",
    "negative_prompt": "modern clothing, photograph, blurry, low quality"
  }
}'
```

![Negative Prompt](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/negative-prompt.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/53/20260417/c057796c/26097304-eVhNm6uS_edc041cd5e2b.png"
  },
  "state": "Completed"
}
```

**Portrait Format** — Tall vertical image for portraits

```ts
const response = await env.AI.run(
  'alibaba/wan-2.6-image',
  {
    prompt: 'An elegant Art Deco poster featuring a jazz singer under a spotlight',
    size: '768x1024',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/wan-2.6-image",
  "input": {
    "prompt": "An elegant Art Deco poster featuring a jazz singer under a spotlight",
    "size": "768x1024"
  }
}'
```

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/portrait-format.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/5a/20260417/c057796c/79957405-YTXQsRY6_8d8a6631f1d6.png"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`required

size

`string`pattern: ^\\d+x\\d+$

negative\_prompt

`string`

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/wan-2.6-image/#page","headline":"Wan 2.6 Image (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's Wan 2.6 text-to-image model generating images from text prompts with optional negative prompts and customizable dimensions.","url":"https://developers.cloudflare.com/ai/models/alibaba/wan-2.6-image/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
