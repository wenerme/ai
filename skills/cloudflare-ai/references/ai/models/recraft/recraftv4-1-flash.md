---
description: Recraft V4.1 Flash is Recraft's fastest and lowest-cost image model, generating a 1K raster image in about 1.3 seconds with quality close to Recraft V4.1. Built for high-volume generation and rapid iteration, with strong results for photography, portraits, atmospheric scenes, mixed media, and logo concepts. It outputs raster images only and does not support styles.
title: Recraft V4.1 Flash
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg)

# Recraft V4.1 Flash

Text-to-Image • Recraft

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-flash/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`recraft/recraftv4-1-flash`

- Third-party

Recraft V4.1 Flash is Recraft's fastest and lowest-cost image model, generating a 1K raster image in about 1.3 seconds with quality close to Recraft V4.1. Built for high-volume generation and rapid iteration, with strong results for photography, portraits, atmospheric scenes, mixed media, and logo concepts. It outputs raster images only and does not support styles.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://www.recraft.ai/terms) |
| More information | [link ↗](https://www.recraft.ai/docs/api-reference/models/recraft-v4-1-flash) |
| Pricing | <ul><li>Per image$0.007</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-flash',
  { prompt: 'A minimalist logo of a mountain range with a sun rising behind it' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-flash",
  "input": {
    "prompt": "A minimalist logo of a mountain range with a sun rising behind it"
  }
}'
```

![Simple Generation](https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/simple-generation.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/simple-generation.png"
  }
}
```

## Examples

<details>

<summary>**Portrait Photo** — Generate a portrait photo with an aspect ratio</summary>



```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-flash',
  { prompt: 'Portrait of an old fisherman, golden hour, film photo', size: '4:5' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-flash",
  "input": {
    "prompt": "Portrait of an old fisherman, golden hour, film photo",
    "size": "4:5"
  }
}'
```

![Portrait Photo](https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/portrait-photo.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/portrait-photo.png"
  }
}
```

</details>

<details>

<summary>**Custom Size** — Specify exact output dimensions</summary>



```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-flash',
  {
    prompt: 'A flat illustration of a workspace with a laptop, coffee cup, and potted plant',
    size: '1344x768',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-flash",
  "input": {
    "prompt": "A flat illustration of a workspace with a laptop, coffee cup, and potted plant",
    "size": "1344x768"
  }
}'
```

![Custom Size](https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/custom-size.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/custom-size.png"
  }
}
```

</details>

<details>

<summary>**With Color Controls** — Guide generation with specific brand colors</summary>



```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-flash',
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
  "model": "recraft/recraftv4-1-flash",
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

![With Color Controls](https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/with-color-controls.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/with-color-controls.png"
  }
}
```

</details>

<details>

<summary>**Background Color** — Set a specific background color</summary>



```ts
const response = await env.AI.run(
  'recraft/recraftv4-1-flash',
  {
    prompt: 'A clean icon of a lightning bolt',
    controls: { background_color: { rgb: [245, 245, 245] } },
    size: '1:1',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "recraft/recraftv4-1-flash",
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
    "size": "1:1"
  }
}'
```

![Background Color](https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/background-color.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/recraft/recraftv4-1-flash/background-color.png"
  }
}
```

</details>

## Parameters

prompt

`string`required

size

`string`

▶controls{}

`object`

image

`string`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-flash/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-flash/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-flash/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-flash/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-flash/#page","headline":"Recraft V4.1 Flash","description":"Recraft V4.1 Flash is Recraft's fastest and lowest-cost image model, generating a 1K raster image in about 1.3 seconds with quality close to Recraft V4.1. Built for high-volume generation and rapid iteration, with strong results for photography, portraits, atmospheric scenes, mixed media, and logo concepts. It outputs raster images only and does not support styles.","url":"https://developers.cloudflare.com/ai/models/recraft/recraftv4-1-flash/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
