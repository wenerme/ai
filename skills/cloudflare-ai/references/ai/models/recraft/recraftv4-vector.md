---
description: Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.
title: Recraft V4 SVG
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4 SVG

 Text-to-Image • Recraft

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-vector/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` recraft/recraftv4-vector `

* Third-party
* Zero data retention

Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.

| Model Info          |                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                      |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                           |
| Zero data retention | Yes                                                                                                                         |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-vector) |

## Usage

```ts
const response = await env.AI.run(
  'recraft/recraftv4-vector',
  { prompt: 'A simple flat icon of a coffee cup with steam rising' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-vector",
  "input": {
    "prompt": "A simple flat icon of a coffee cup with steam rising"
  }
}'
```

![Simple Icon](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/simple-icon.svg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/simple-icon.svg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**App Icon**  — Mobile app icon in vector format

```ts
const response = await env.AI.run(
  'recraft/recraftv4-vector',
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
  "model": "recraft/recraftv4-vector",
  "input": {
    "prompt": "A colorful gradient app icon featuring a chat bubble with a sparkle effect",
    "size": "1024x1024"
  }
}'
```

![App Icon](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/app-icon.svg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/app-icon.svg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Illustration**  — Vector illustration for web use

```ts
const response = await env.AI.run(
  'recraft/recraftv4-vector',
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
  "model": "recraft/recraftv4-vector",
  "input": {
    "prompt": "A flat vector illustration of a person working at a desk with a computer, plants, and a window showing a city view",
    "size": "1024x1024"
  }
}'
```

![Illustration](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/illustration.svg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/illustration.svg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**With Brand Colors**  — Vector with specific color palette

```ts
const response = await env.AI.run(
  'recraft/recraftv4-vector',
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
  "model": "recraft/recraftv4-vector",
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

![With Brand Colors](https://examples.aig.cloudflare.com/recraft/recraftv4-vector/with-brand-colors.svg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-vector/with-brand-colors.svg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-vector/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-vector/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-vector/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4-vector/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-vector/#page","headline":"Recraft V4 SVG (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Generate production-ready SVG vector graphics from text prompts with clean geometry, structured layers, and editable paths.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-vector/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
