---
description: Alibaba's Qwen Image 3.0 Pro generates images from text prompts with a focus on complex layout generation, small-text precision, and multilingual font rendering. Supports up to 6 image variants per call, negative prompts, seed control, and optional prompt rewriting.
title: Qwen Image 3.0 Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.BK31NAJz.svg)

# Qwen Image 3.0 Pro

Text-to-Image • Alibaba

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/alibaba/qwen-image-3.0-pro/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`alibaba/qwen-image-3.0-pro`

* Third-party

Alibaba's Qwen Image 3.0 Pro generates images from text prompts with a focus on complex layout generation, small-text precision, and multilingual font rendering. Supports up to 6 image variants per call, negative prompts, seed control, and optional prompt rewriting.

| Model Info        |                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                         |
| More information  | [link ↗](https://www.alibabacloud.com/en/solutions/generative-ai/qwen)                                                       |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/qwen-image-3.0-pro) |

## Usage

```ts
const response = await env.AI.run(
  'alibaba/qwen-image-3.0-pro',
  { prompt: 'A golden retriever puppy playing in autumn leaves' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen-image-3.0-pro",
  "input": {
    "prompt": "A golden retriever puppy playing in autumn leaves"
  }
}'
```

![Simple Generation](https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/simple-generation.png"
    ]
  },
  "state": "Completed"
}
```

## Examples

**Multiple Variants** — Generate several image variants from a single call

```ts
const response = await env.AI.run(
  'alibaba/qwen-image-3.0-pro',
  { prompt: 'A minimalist logo for a coffee roastery, line art style, single color', n: 4 },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "alibaba/qwen-image-3.0-pro",
  "input": {
    "prompt": "A minimalist logo for a coffee roastery, line art style, single color",
    "n": 4
  }
}'
```

![Multiple Variants](https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-0.png)![Multiple Variants](https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-1.png)![Multiple Variants](https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-2.png)![Multiple Variants](https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-3.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-0.png",
      "https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-1.png",
      "https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-2.png",
      "https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/multiple-variants-3.png"
    ]
  },
  "state": "Completed"
}
```

**Negative Prompt** — Guide generation away from unwanted elements

```ts
const response = await env.AI.run(
  'alibaba/qwen-image-3.0-pro',
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
  "model": "alibaba/qwen-image-3.0-pro",
  "input": {
    "prompt": "A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar",
    "negative_prompt": "modern clothing, photograph, blurry, low quality"
  }
}'
```

![Negative Prompt](https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/negative-prompt.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "images": [
      "https://examples.aig.cloudflare.com/alibaba/qwen-image-3.0-pro/negative-prompt.png"
    ]
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`required

size

`string`requireddefault: 1024x1024pattern: ^\\d+x\\d+$

negative\_prompt

`string`maxLength: 500

n

`integer`minimum: 1maximum: 6

seed

`integer`minimum: 0maximum: 2147483647

watermark

`boolean`

prompt\_extend

`boolean`

prompt\_extend\_mode

`string`enum: direct, agent

▶images\[\]

`array`minItems: 1format: uri

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/alibaba/qwen-image-3.0-pro/#page","headline":"Qwen Image 3.0 Pro (Alibaba) · Cloudflare AI docs · Cloudflare AI docs","description":"Alibaba's Qwen Image 3.0 Pro generates images from text prompts with a focus on complex layout generation, small-text precision, and multilingual font rendering. Supports up to 6 image variants per call, negative prompts, seed control, and optional prompt rewriting.","url":"https://developers.cloudflare.com/ai/models/alibaba/qwen-image-3.0-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
