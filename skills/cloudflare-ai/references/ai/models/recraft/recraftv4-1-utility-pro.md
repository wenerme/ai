---
description: Recraft V4.1 Utility Pro is a general-purpose text-to-image model producing high-resolution 2048px+ output for a wide range of production and print use cases.
title: Recraft V4.1 Utility Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

# Recraft V4.1 Utility Pro

Text-to-Image • Recraft

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-pro/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`recraft/recraftv4-1-utility-pro`

* Third-party
* Zero data retention

Recraft V4.1 Utility Pro is a general-purpose text-to-image model producing high-resolution 2048px+ output for a wide range of production and print use cases.

| Model Info          |                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                            |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                                 |
| Zero data retention | Yes                                                                                                                               |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-utility-pro) |

## Usage

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-pro',
  {
    prompt:
      'A detailed illustrated map of an imaginary fantasy island with labeled landmarks, mountains, and forests',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility-pro",
  "input": {
    "prompt": "A detailed illustrated map of an imaginary fantasy island with labeled landmarks, mountains, and forests"
  }
}'
```

![Print-Ready Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/print-ready-illustration.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/print-ready-illustration.png"
  },
  "state": "Completed"
}
```

## Examples

**Large Format Art** — Large canvas general-purpose image

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-pro',
  {
    prompt:
      'A wide panoramic landscape of rolling green hills with a river winding through the valley under a bright blue sky',
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
  "model": "recraft/recraftv4-1-utility-pro",
  "input": {
    "prompt": "A wide panoramic landscape of rolling green hills with a river winding through the valley under a bright blue sky",
    "size": "2048x2048"
  }
}'
```

![Large Format Art](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/large-format-art.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/large-format-art.png"
  },
  "state": "Completed"
}
```

**Marketing Asset** — High-resolution marketing visual with controlled colors

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-pro',
  {
    prompt: 'A clean, modern banner illustration of a smartphone displaying a productivity app',
    controls: {
      background_color: { rgb: [250, 250, 255] },
      colors: [{ rgb: [100, 200, 150] }, { rgb: [20, 20, 60] }],
    },
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
  "model": "recraft/recraftv4-1-utility-pro",
  "input": {
    "prompt": "A clean, modern banner illustration of a smartphone displaying a productivity app",
    "controls": {
      "background_color": {
        "rgb": [
          250,
          250,
          255
        ]
      },
      "colors": [
        {
          "rgb": [
            100,
            200,
            150
          ]
        },
        {
          "rgb": [
            20,
            20,
            60
          ]
        }
      ]
    },
    "size": "2048x2048"
  }
}'
```

![Marketing Asset](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/marketing-asset.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/marketing-asset.png"
  },
  "state": "Completed"
}
```

**Technical Diagram** — High-resolution technical or infographic illustration

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility-pro',
  {
    prompt:
      'A clean technical diagram showing the layers of a cloud computing architecture with labeled tiers',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility-pro",
  "input": {
    "prompt": "A clean technical diagram showing the layers of a cloud computing architecture with labeled tiers"
  }
}'
```

![Technical Diagram](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/technical-diagram.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility-pro/technical-diagram.png"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-pro/#page","headline":"Recraft V4.1 Utility Pro (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Recraft V4.1 Utility Pro is a general-purpose text-to-image model producing high-resolution 2048px+ output for a wide range of production and print use cases.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
