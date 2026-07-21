---
description: Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.
title: Recraft V4
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

#  Recraft V4

 Text-to-Image • Recraft

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` recraft/recraftv4 `

* Third-party
* Zero data retention

Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.

| Model Info          |                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://www.recraft.ai/terms)                                                                               |
| More information    | [link ↗](https://www.recraft.ai/)                                                                                    |
| Zero data retention | Yes                                                                                                                  |
| Pricing             | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4) |

## Usage

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  { prompt: 'A minimalist logo of a mountain range with a sun rising behind it' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A minimalist logo of a mountain range with a sun rising behind it"
  }
}'
```

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png"
  },
  "state": "Completed"
}
```

## Examples

**Scene Composition**  — Generate a complex compositional scene

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney"
  }
}'
```

![Scene Composition](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png"
  },
  "state": "Completed"
}
```

**Custom Size**  — Specify output dimensions

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'A flat illustration of a workspace with a laptop, coffee cup, and potted plant',
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
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A flat illustration of a workspace with a laptop, coffee cup, and potted plant",
    "size": "1024x1024"
  }
}'
```

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png"
  },
  "state": "Completed"
}
```

**With Color Controls**  — Guide generation with specific brand colors

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'An abstract geometric pattern suitable for a tech company brand identity',
    controls: { colors: [{ rgb: [255, 107, 53] }, { rgb: [0, 43, 91] }] },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "An abstract geometric pattern suitable for a tech company brand identity",
    "controls": {
      "colors": [
        {
          "rgb": [
            255,
            107,
            53
          ]
        },
        {
          "rgb": [
            0,
            43,
            91
          ]
        }
      ]
    }
  }
}'
```

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png"
  },
  "state": "Completed"
}
```

**Background Color**  — Set a specific background color

```ts
const response = await env.AI.run(
  'recraft/recraftv4',
  {
    prompt: 'A clean icon of a lightning bolt',
    controls: { background_color: { rgb: [245, 245, 245] } },
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
  "model": "recraft/recraftv4",
  "input": {
    "prompt": "A clean icon of a lightning bolt",
    "controls": {
      "background_color": {
        "rgb": [
          245,
          245,
          245
        ]
      }
    },
    "size": "1024x1024"
  }
}'
```

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png)

```json
{
  "gatewayMetadata": {
    "keySource": "Unified"
  },
  "result": {
    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png"
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

Input [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/recraft/recraftv4/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4/#page","headline":"Recraft V4 (Recraft) · Cloudflare AI docs · Cloudflare AI docs","description":"Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
