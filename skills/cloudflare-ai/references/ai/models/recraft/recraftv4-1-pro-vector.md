---
description: Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.
title: Recraft V4.1 Pro SVG
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

# Recraft V4.1 Pro SVG

Text-to-Image • Recraft

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`recraft/recraftv4-1-pro-vector`

* Third-party
* Zero data retention

Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.

| Model Info          |                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                           |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                                |
| Zero data retention | Yes                                                                                                                              |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-pro-vector) |

## Usage

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  { prompt: 'A modern minimalist logo for a cloud computing company, clean geometric shapes' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "A modern minimalist logo for a cloud computing company, clean geometric shapes"
  }
}'
```

![Logo Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/logo-design.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/logo-design.jpg"
  },
  "state": "Completed"
}
```

## Examples

**Icon Set** — Generate a vector icon

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  {
    prompt: 'A flat design icon of a rocket launching, suitable for a mobile app',
    size: '2048x2048',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "A flat design icon of a rocket launching, suitable for a mobile app",
    "size": "2048x2048"
  }
}'
```

![Icon Set](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/icon-set.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/icon-set.jpg"
  },
  "state": "Completed"
}
```

**Print-Ready Vector** — High-resolution vector for large-format print

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  {
    prompt:
      'An intricate mandala pattern with floral and geometric elements, highly detailed and symmetrical',
    size: '2048x2048',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "An intricate mandala pattern with floral and geometric elements, highly detailed and symmetrical",
    "size": "2048x2048"
  }
}'
```

![Print-Ready Vector](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/print-ready-vector.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/print-ready-vector.jpg"
  },
  "state": "Completed"
}
```

**Brand Illustration** — Vector illustration with brand colors

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-pro-vector',
  {
    prompt: 'A vector illustration of a cityscape skyline at sunset with clean lines and flat colors',
    controls: { colors: [{ rgb: [255, 87, 51] }, { rgb: [41, 50, 65] }, { rgb: [239, 239, 239] }] },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-pro-vector",
  "input": {
    "prompt": "A vector illustration of a cityscape skyline at sunset with clean lines and flat colors",
    "controls": {
      "colors": [
        {
          "rgb": [
            255,
            87,
            51
          ]
        },
        {
          "rgb": [
            41,
            50,
            65
          ]
        },
        {
          "rgb": [
            239,
            239,
            239
          ]
        }
      ]
    }
  }
}'
```

![Brand Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/brand-illustration.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-pro-vector/brand-illustration.jpg"
  },
  "state": "Completed"
}
```

## Parameters

prompt

`string`required

size

`string`

style

`string`

substyle

`string`

▶controls{}

`object`

image

`string`

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/#page","headline":"Recraft V4.1 Pro SVG (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Generate detailed, high-resolution SVG vector graphics from text prompts with high aesthetic quality, fine geometry, scalable to any size for print and design work.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-pro-vector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
