---
description: Recraft V4.1 Utility is a general-purpose text-to-image model balancing quality and flexibility for a wide range of everyday use cases at standard resolution.
title: Recraft V4.1 Utility
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

# Recraft V4.1 Utility

Text-to-Image • Recraft

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`recraft/recraftv4-1-utility`

* Third-party
* Zero data retention

Recraft V4.1 Utility is a general-purpose text-to-image model balancing quality and flexibility for a wide range of everyday use cases at standard resolution.

| Model Info          |                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                                        |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                             |
| Zero data retention | Yes                                                                                                                           |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4-1-utility) |

## Usage

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  { prompt: 'A friendly cartoon robot waving hello against a white background' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A friendly cartoon robot waving hello against a white background"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/simple-generation.png"
  },
  "state": "Completed"
}
```

## Examples

**Product Mockup** — Generate a product concept image

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  { prompt: 'A clean product photo of a white ceramic coffee mug on a wooden table' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A clean product photo of a white ceramic coffee mug on a wooden table"
  }
}'
```

![Product Mockup](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/product-mockup.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/product-mockup.png"
  },
  "state": "Completed"
}
```

**Custom Size** — Specify output dimensions

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  {
    prompt: 'A simple banner illustration with abstract shapes and warm colors',
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
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A simple banner illustration with abstract shapes and warm colors",
    "size": "1024x1024"
  }
}'
```

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/custom-size.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/custom-size.png"
  },
  "state": "Completed"
}
```

**With Color Controls** — Guide generation with specific colors

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  {
    prompt: 'A flat illustration of a globe with network connections',
    controls: { colors: [{ rgb: [30, 90, 200] }, { rgb: [255, 255, 255] }] },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A flat illustration of a globe with network connections",
    "controls": {
      "colors": [
        {
          "rgb": [
            30,
            90,
            200
          ]
        },
        {
          "rgb": [
            255,
            255,
            255
          ]
        }
      ]
    }
  }
}'
```

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/with-color-controls.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/with-color-controls.png"
  },
  "state": "Completed"
}
```

**Background Color** — Set a specific background color

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-utility',
  {
    prompt: 'A simple icon of a checkmark inside a circle',
    controls: { background_color: { rgb: [240, 248, 255] } },
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
  "model": "recraft/recraftv4-1-utility",
  "input": {
    "prompt": "A simple icon of a checkmark inside a circle",
    "controls": {
      "background_color": {
        "rgb": [
          240,
          248,
          255
        ]
      }
    },
    "size": "1024x1024"
  }
}'
```

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/background-color.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4-1-utility/background-color.png"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/#page","headline":"Recraft V4.1 Utility (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Recraft V4.1 Utility is a general-purpose text-to-image model balancing quality and flexibility for a wide range of everyday use cases at standard resolution.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-utility/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
