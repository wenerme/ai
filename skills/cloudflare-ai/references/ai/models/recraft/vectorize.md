---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Recraft Vectorize converts a raster image (PNG, JPG or WEBP) into a clean, editable SVG made of shapes. Use it to make logos, icons and illustrations scalable. V1 Pro produces higher-quality vectors.
title: Recraft Vectorize
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

# Recraft Vectorize

Image-to-Image • Recraft

Model ID

`recraft/vectorize` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Recraft Vectorize converts a raster image (PNG, JPG or WEBP) into a clean, editable SVG made of shapes. Use it to make logos, icons and illustrations scalable. V1 Pro produces higher-quality vectors.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://www.recraft.ai/docs/api-reference/tools/vectorize) |
| Pricing | <ul><li>Per provider unit$0.001</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'recraft/vectorize',
  {
    image: 'https://arkdocs-en.tos-ap-southeast-1.volces.com/images/image-generation/ocr-test3.png',
    version: 'v1_pro',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/vectorize",
  "input": {
    "image": "https://arkdocs-en.tos-ap-southeast-1.volces.com/images/image-generation/ocr-test3.png",
    "version": "v1_pro"
  }
}'
```

![Sticker Art to SVG (V1 Pro)](https://examples.aig.cloudflare.com/recraft/vectorize/sticker-art-to-svg-v1-pro.svg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/vectorize/sticker-art-to-svg-v1-pro.svg"
  }
}
```

## Examples

<details>

<summary>**Vectorize an Illustration** — Turn a raster illustration into an editable SVG.</summary>



```ts
const response = await env.AI.run(
  'recraft/vectorize',
  {
    image:
      'https://cdn.prod.website-files.com/655727fe69827d9a402de12c/679b82f54ef9617939df9d8e_motorcycle--going-fast.png',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/vectorize",
  "input": {
    "image": "https://cdn.prod.website-files.com/655727fe69827d9a402de12c/679b82f54ef9617939df9d8e_motorcycle--going-fast.png"
  }
}'
```

![Vectorize an Illustration](https://examples.aig.cloudflare.com/recraft/vectorize/vectorize-an-illustration.svg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/vectorize/vectorize-an-illustration.svg"
  }
}
```

</details>

<details>

<summary>**Cut-Out Shapes** — Shapes that don't overlap, for vinyl cutters and screen printing.</summary>



```ts
const response = await env.AI.run(
  'recraft/vectorize',
  {
    image:
      'https://cdn.prod.website-files.com/655727fe69827d9a402de12c/679b82f54ef9617939df9d8e_motorcycle--going-fast.png',
    shape_stacking: 'cut_out',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/vectorize",
  "input": {
    "image": "https://cdn.prod.website-files.com/655727fe69827d9a402de12c/679b82f54ef9617939df9d8e_motorcycle--going-fast.png",
    "shape_stacking": "cut_out"
  }
}'
```

![Cut-Out Shapes](https://examples.aig.cloudflare.com/recraft/vectorize/cut-out-shapes.svg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/vectorize/cut-out-shapes.svg"
  }
}
```

</details>

## Parameters

image

`string`requiredminLength: 1URL or data URL of the input image: PNG, JPG or WEBP, under 20 MB, up to 16 MP, sides 256 to 4096 px.

version

`string`enum: v1, v1\_pro"v1" ($0.01) or "v1\_pro" (higher-quality vectors, $0.04). Defaults to "v1".

shape\_stacking

`string`enum: hierarchical, cut\_out"hierarchical" layers shapes; "cut\_out" makes shapes that do not overlap (for cutters and printing). Defaults to "hierarchical".

image

`string`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/recraft/vectorize/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/recraft/vectorize/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/recraft/vectorize/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/recraft/vectorize/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/vectorize/#page","headline":"Recraft Vectorize","description":"Recraft Vectorize converts a raster image (PNG, JPG or WEBP) into a clean, editable SVG made of shapes. Use it to make logos, icons and illustrations scalable. V1 Pro produces higher-quality vectors.","url":"https://developers.cloudflare.com/ai/models/recraft/vectorize/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
