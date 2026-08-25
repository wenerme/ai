---
description: Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.
title: Recraft V4.1 SVG
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

# Recraft V4.1 SVG

Text-to-Image • Recraft

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`recraft/recraftv4-1-vector`

* Third-party
* Zero data retention

Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.

| Model Info          |                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                       |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                            |
| Zero data retention | Yes                                                                                                                          |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-vector) |

## Usage

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  { prompt: 'A simple flat icon of a coffee cup with steam rising' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A simple flat icon of a coffee cup with steam rising"
  }
}'
```

![Simple Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/simple-icon.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/simple-icon.jpg"
  },
  "state": "Completed"
}
```

## Examples

**App Icon** — Mobile app icon in vector format

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  {
    prompt: 'A colorful gradient app icon featuring a chat bubble with a sparkle effect',
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
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A colorful gradient app icon featuring a chat bubble with a sparkle effect",
    "size": "1024x1024"
  }
}'
```

![App Icon](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/app-icon.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/app-icon.jpg"
  },
  "state": "Completed"
}
```

**Illustration** — Vector illustration for web use

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  {
    prompt:
      'A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view',
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
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view",
    "size": "1024x1024"
  }
}'
```

![Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/illustration.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/illustration.jpg"
  },
  "state": "Completed"
}
```

**With Brand Colors** — Vector with specific color palette

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-vector',
  {
    prompt: 'A badge or seal design with a star in the center, suitable for a certification mark',
    controls: {
      background_color: { rgb: [255, 255, 255] },
      colors: [{ rgb: [0, 119, 182] }, { rgb: [255, 209, 102] }],
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-vector",
  "input": {
    "prompt": "A badge or seal design with a star in the center, suitable for a certification mark",
    "controls": {
      "background_color": {
        "rgb": [
          255,
          255,
          255
        ]
      },
      "colors": [
        {
          "rgb": [
            0,
            119,
            182
          ]
        },
        {
          "rgb": [
            255,
            209,
            102
          ]
        }
      ]
    }
  }
}'
```

![With Brand Colors](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/with-brand-colors.jpg)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-vector/with-brand-colors.jpg"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/#page","headline":"Recraft V4.1 SVG (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Generate production-ready SVG vector graphics from text prompts with high aesthetic quality, clean geometry, structured layers, and editable paths.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-vector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
