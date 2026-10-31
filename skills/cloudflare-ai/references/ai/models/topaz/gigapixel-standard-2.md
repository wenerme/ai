---
description: Topaz Labs Gigapixel Standard 2 is a general-purpose precision image upscaler that balances detail, sharpness, and noise reduction while staying true to the source. It is the recommended default for photos, graphics, and print, with optional face recovery.
title: Gigapixel Standard 2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Gigapixel Standard 2

Image-to-Image • topaz

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/topaz/gigapixel-standard-2/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`topaz/gigapixel-standard-2`

- Third-party

Topaz Labs Gigapixel Standard 2 is a general-purpose precision image upscaler that balances detail, sharpness, and noise reduction while staying true to the source. It is the recommended default for photos, graphics, and print, with optional face recovery.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://developer.topazlabs.com/image-models/gigapixel/standard-2) |
| Pricing | <ul><li>Per provider unit$0.12</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'topaz/gigapixel-standard-2',
  {
    image: 'https://tile.loc.gov/storage-services/service/pnp/ppmsca/13300/13397r.jpg',
    output_format: 'jpeg',
    output_width: 1900,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "topaz/gigapixel-standard-2",
  "input": {
    "image": "https://tile.loc.gov/storage-services/service/pnp/ppmsca/13300/13397r.jpg",
    "output_format": "jpeg",
    "output_width": 1900
  }
}'
```

![Poster Upscale](https://examples.aig.cloudflare.com/topaz/gigapixel-standard-2/poster-upscale.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/topaz/gigapixel-standard-2/poster-upscale.jpeg"
  }
}
```

## Examples

<details>

<summary>**Small Photo Upscale** — Upscale a 640-pixel photo 4x to 2560 pixels wide. Standard 2 picks its own enhancement settings, so none are needed. Photo: NASA.</summary>



```ts
const response = await env.AI.run(
  'topaz/gigapixel-standard-2',
  {
    image:
      'https://images-assets.nasa.gov/image/KSC-20260313-PH-JBS01_0157/KSC-20260313-PH-JBS01_0157~small.jpg',
    output_format: 'jpeg',
    output_width: 2560,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "topaz/gigapixel-standard-2",
  "input": {
    "image": "https://images-assets.nasa.gov/image/KSC-20260313-PH-JBS01_0157/KSC-20260313-PH-JBS01_0157~small.jpg",
    "output_format": "jpeg",
    "output_width": 2560
  }
}'
```

![Small Photo Upscale](https://examples.aig.cloudflare.com/topaz/gigapixel-standard-2/small-photo-upscale.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/topaz/gigapixel-standard-2/small-photo-upscale.jpeg"
  }
}
```

</details>

<details>

<summary>**Thumbnail Portrait** — Upscale a 127-pixel thumbnail of an 1863 portrait 6x to 762 pixels wide. Face recovery rebuilds a sharp face where a plain upscale smears it. Photo: Alexander Gardner, via the Library of Congress (no known restrictions).</summary>



```ts
const response = await env.AI.run(
  'topaz/gigapixel-standard-2',
  {
    face_enhancement: true,
    face_enhancement_creativity: 0.2,
    face_enhancement_strength: 0.8,
    image: 'https://tile.loc.gov/storage-services/service/pnp/ppmsca/19300/19301_150px.jpg',
    output_format: 'jpeg',
    output_width: 762,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "topaz/gigapixel-standard-2",
  "input": {
    "face_enhancement": true,
    "face_enhancement_creativity": 0.2,
    "face_enhancement_strength": 0.8,
    "image": "https://tile.loc.gov/storage-services/service/pnp/ppmsca/19300/19301_150px.jpg",
    "output_format": "jpeg",
    "output_width": 762
  }
}'
```

![Thumbnail Portrait](https://examples.aig.cloudflare.com/topaz/gigapixel-standard-2/thumbnail-portrait.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/topaz/gigapixel-standard-2/thumbnail-portrait.jpeg"
  }
}
```

</details>

## Parameters

image

`string`requiredSource image as a public HTTPS URL or a base64 data URI (JPEG, PNG, or TIFF)

output\_width

`integer`minimum: 1maximum: 32000Desired output width in pixels. If only one dimension is set, the other scales proportionally. If neither is set, the source resolution is kept (enhancement without upscaling)

output\_height

`integer`minimum: 1maximum: 32000Desired output height in pixels. If only one dimension is set, the other scales proportionally. If neither is set, the source resolution is kept (enhancement without upscaling)

output\_format

`string`requireddefault: jpegenum: jpeg, png, tiffFormat of the upscaled image

crop\_to\_fill

`boolean`Crop to fill the requested dimensions instead of letterboxing when the aspect ratio differs

face\_enhancement

`boolean`Run face recovery on detected faces

face\_enhancement\_strength

`number`minimum: 0maximum: 1Strength of face recovery

face\_enhancement\_creativity

`number`minimum: 0maximum: 1Face recovery style, from realistic (0) to creative (1)

subject\_detection

`string`enum: foreground, background, allWhere enhancements are applied

sharpen

`number`minimum: 0maximum: 1Amount of additional sharpening

denoise

`number`minimum: 0maximum: 1Amount of noise reduction

fix\_compression

`number`minimum: 0maximum: 1Amount of compression-artifact reduction

image

`string`format: uriTime-limited presigned URL to the upscaled image

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/topaz/gigapixel-standard-2/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/topaz/gigapixel-standard-2/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/topaz/gigapixel-standard-2/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/topaz/gigapixel-standard-2/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/topaz/gigapixel-standard-2/#page","headline":"Gigapixel Standard 2","description":"Topaz Labs Gigapixel Standard 2 is a general-purpose precision image upscaler that balances detail, sharpness, and noise reduction while staying true to the source. It is the recommended default for photos, graphics, and print, with optional face recovery.","url":"https://developers.cloudflare.com/ai/models/topaz/gigapixel-standard-2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
