---
title: Nano Banana Pro
description: Google's higher-quality image generation model with improved detail and prompt adherence.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana Pro 

Text-to-Image • Google 

`google/nano-banana-pro` 

Google's higher-quality image generation model with improved detail and prompt adherence.

| Model Info          |                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                         |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                                   |
| Zero data retention | Yes                                                                                                                      |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-pro) |

## Usage

* [ TypeScript ](#tab-panel-646)
* [ cURL ](#tab-panel-647)

TypeScript

```
const response = await env.AI.run(  'google/nano-banana-pro',  {    prompt:      'A sleek modern wireless headphone on a minimalist white marble surface with soft studio lighting and subtle shadows',    aspect_ratio: '1:1',    output_format: 'png',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/nano-banana-pro",  "input": {    "prompt": "A sleek modern wireless headphone on a minimalist white marble surface with soft studio lighting and subtle shadows",    "aspect_ratio": "1:1",    "output_format": "png"  }}'
```

* [ Output ](#tab-panel-644)
* [ Raw response ](#tab-panel-645)

![Product Photography](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/product-photography.png) 

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/product-photography.png"  },  "state": "Completed"}
```

## Examples

**Fantasy Illustration**  — Epic fantasy scene 

* [ TypeScript ](#tab-panel-650)
* [ cURL ](#tab-panel-651)

TypeScript

```
const response = await env.AI.run(  'google/nano-banana-pro',  {    prompt:      'An epic fantasy illustration of a wizard casting a spell in an ancient library, magical runes floating in the air, dust motes catching golden light streaming through stained glass windows',    aspect_ratio: '16:9',    image_size: '2K',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/nano-banana-pro",  "input": {    "prompt": "An epic fantasy illustration of a wizard casting a spell in an ancient library, magical runes floating in the air, dust motes catching golden light streaming through stained glass windows",    "aspect_ratio": "16:9",    "image_size": "2K"  }}'
```

* [ Output ](#tab-panel-648)
* [ Raw response ](#tab-panel-649)

![Fantasy Illustration](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/fantasy-illustration.png) 

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/fantasy-illustration.png"  },  "state": "Completed"}
```

**Architectural Visualization**  — Modern architecture render 

* [ TypeScript ](#tab-panel-656)
* [ cURL ](#tab-panel-657)

TypeScript

```
const response = await env.AI.run(  'google/nano-banana-pro',  {    prompt:      'A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset',    aspect_ratio: '16:9',    image_size: '4K',    output_format: 'jpg',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/nano-banana-pro",  "input": {    "prompt": "A photorealistic architectural visualization of a modern glass house perched on a cliff overlooking the ocean at sunset",    "aspect_ratio": "16:9",    "image_size": "4K",    "output_format": "jpg"  }}'
```

* [ Output ](#tab-panel-652)
* [ Raw response ](#tab-panel-653)

![Architectural Visualization](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/architectural-visualization.jpg) 

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/architectural-visualization.jpg"  },  "state": "Completed"}
```

**Character Design**  — Game character concept art 

* [ TypeScript ](#tab-panel-658)
* [ cURL ](#tab-panel-659)

TypeScript

```
const response = await env.AI.run(  'google/nano-banana-pro',  {    prompt:      'A detailed character design sheet for a steampunk inventor, showing front view, side view, and detail callouts for mechanical arm and goggles',    aspect_ratio: '3:2',  },)console.log(response)
```

Terminal window

```
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  --header "Content-Type: application/json" \  --data '{  "model": "google/nano-banana-pro",  "input": {    "prompt": "A detailed character design sheet for a steampunk inventor, showing front view, side view, and detail callouts for mechanical arm and goggles",    "aspect_ratio": "3:2"  }}'
```

* [ Output ](#tab-panel-654)
* [ Raw response ](#tab-panel-655)

![Character Design](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/character-design.png) 

```
{  "gatewayMetadata": {    "keySource": "Unified"  },  "result": {    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-pro/character-design.png"  },  "state": "Completed"}
```

## Parameters

* [ Input ](#tab-panel-660)
* [ Output ](#tab-panel-661)

aspect\_ratio

`string`enum: 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

▶image\_input\[\]

`array`maxItems: 3

image\_size

`string`enum: 1K, 2K, 4K

output\_format

`string`enum: jpg, png, webp

prompt

`string`required

image

`string`format: uri

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-pro/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana-pro/#page","headline":"Nano Banana Pro (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's higher-quality image generation model with improved detail and prompt adherence.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
