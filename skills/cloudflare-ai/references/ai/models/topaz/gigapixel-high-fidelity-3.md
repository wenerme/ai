---
description: Topaz Labs Gigapixel High Fidelity 3 is a precision image upscaler tuned for high-resolution sources and professional photography, preserving fine texture and detail with minimal alteration. It adds recovery-strength and opacity controls over High Fidelity 2.
title: Gigapixel High Fidelity 3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Gigapixel High Fidelity 3

Image-to-Image • topaz

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/topaz/gigapixel-high-fidelity-3/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`topaz/gigapixel-high-fidelity-3`

- Third-party

Topaz Labs Gigapixel High Fidelity 3 is a precision image upscaler tuned for high-resolution sources and professional photography, preserving fine texture and detail with minimal alteration. It adds recovery-strength and opacity controls over High Fidelity 2.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://developer.topazlabs.com/image-models/gigapixel/high-fidelity-3) |
| Pricing | <ul><li>Per provider unit$0.12</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'topaz/gigapixel-high-fidelity-3',
  {
    image:
      'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000842/GSFC_20171208_Archive_e000842~medium.jpg',
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
  "model": "topaz/gigapixel-high-fidelity-3",
  "input": {
    "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000842/GSFC_20171208_Archive_e000842~medium.jpg",
    "output_format": "jpeg",
    "output_width": 2560
  }
}'
```

![Star Field Upscale](https://examples.aig.cloudflare.com/topaz/gigapixel-high-fidelity-3/star-field-upscale.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/topaz/gigapixel-high-fidelity-3/star-field-upscale.jpeg"
  }
}
```

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

recovery\_strength

`number`minimum: 0maximum: 1Strength of detail recovery (Topaz default 1.0)

opacity

`number`minimum: 0maximum: 1Blend of the enhanced result over the source (Topaz default 1.0)

image

`string`format: uriTime-limited presigned URL to the upscaled image

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/topaz/gigapixel-high-fidelity-3/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/topaz/gigapixel-high-fidelity-3/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/topaz/gigapixel-high-fidelity-3/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/topaz/gigapixel-high-fidelity-3/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/topaz/gigapixel-high-fidelity-3/#page","headline":"Gigapixel High Fidelity 3","description":"Topaz Labs Gigapixel High Fidelity 3 is a precision image upscaler tuned for high-resolution sources and professional photography, preserving fine texture and detail with minimal alteration. It adds recovery-strength and opacity controls over High Fidelity 2.","url":"https://developers.cloudflare.com/ai/models/topaz/gigapixel-high-fidelity-3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
