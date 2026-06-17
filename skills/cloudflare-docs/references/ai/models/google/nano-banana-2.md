---
title: Nano Banana 2
description: Google's second-generation image generation model with improved quality and speed.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  Nano Banana 2 

Text-to-Image • Google 

`google/nano-banana-2` 

Google's second-generation image generation model with improved quality and speed.

| Model Info          |                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                       |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                                 |
| Zero data retention | Yes                                                                                                                    |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-2) |

## Usage

* [ TypeScript ](#tab-panel-650)
* [ cURL ](#tab-panel-651)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt:

      'A futuristic cyberpunk city at night with towering skyscrapers, neon signs in Japanese and English, flying cars, and rain-slicked streets reflecting colorful lights',

    aspect_ratio: '16:9',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/nano-banana-2",

  "input": {

    "prompt": "A futuristic cyberpunk city at night with towering skyscrapers, neon signs in Japanese and English, flying cars, and rain-slicked streets reflecting colorful lights",

    "aspect_ratio": "16:9"

  }

}'


```

* [ Output ](#tab-panel-648)
* [ Raw response ](#tab-panel-649)

![Futuristic City](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/futuristic-city.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/futuristic-city.png"

  },

  "state": "Completed"

}


```

## Examples

**Abstract Art**  — Modern abstract expressionist painting 

* [ TypeScript ](#tab-panel-654)
* [ cURL ](#tab-panel-655)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt:

      'An abstract expressionist painting with bold splashes of cobalt blue, crimson red, and gold leaf accents on a large canvas',

    aspect_ratio: '1:1',

    output_format: 'png',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/nano-banana-2",

  "input": {

    "prompt": "An abstract expressionist painting with bold splashes of cobalt blue, crimson red, and gold leaf accents on a large canvas",

    "aspect_ratio": "1:1",

    "output_format": "png"

  }

}'


```

* [ Output ](#tab-panel-652)
* [ Raw response ](#tab-panel-653)

![Abstract Art](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/abstract-art.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/abstract-art.png"

  },

  "state": "Completed"

}


```

**With Google Search**  — Use web search grounding for current events 

* [ TypeScript ](#tab-panel-658)
* [ cURL ](#tab-panel-659)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt: 'An illustration of the latest Mars rover exploring the Martian surface',

    aspect_ratio: '16:9',

    google_search: true,

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/nano-banana-2",

  "input": {

    "prompt": "An illustration of the latest Mars rover exploring the Martian surface",

    "aspect_ratio": "16:9",

    "google_search": true

  }

}'


```

* [ Output ](#tab-panel-656)
* [ Raw response ](#tab-panel-657)

![With Google Search](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/with-google-search.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/with-google-search.png"

  },

  "state": "Completed"

}


```

**High Resolution Portrait**  — 4K portrait with specific aspect ratio 

* [ TypeScript ](#tab-panel-662)
* [ cURL ](#tab-panel-663)

TypeScript

```

const response = await env.AI.run(

  'google/nano-banana-2',

  {

    prompt:

      'A professional studio portrait of a woman with dramatic side lighting, wearing elegant jewelry',

    aspect_ratio: '3:4',

    output_format: 'jpg',

    resolution: '4K',

  },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "google/nano-banana-2",

  "input": {

    "prompt": "A professional studio portrait of a woman with dramatic side lighting, wearing elegant jewelry",

    "aspect_ratio": "3:4",

    "output_format": "jpg",

    "resolution": "4K"

  }

}'


```

* [ Output ](#tab-panel-660)
* [ Raw response ](#tab-panel-661)

![High Resolution Portrait](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/high-resolution-portrait.jpg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/google__nano-banana-2/high-resolution-portrait.jpg"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-664)
* [ Output ](#tab-panel-665)

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

google\_search

`boolean`

▶image\_input\[\]

`array`maxItems: 3

image\_search

`boolean`

output\_format

`string`enum: jpg, png

prompt

`string`required

resolution

`string`enum: 1K, 2K, 4K

image

`string`format: uri

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-2/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-2/schema-input.json "Download") 

Output [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-2/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/google/nano-banana-2/schema-output.json "Download") 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana-2/#page","headline":"Nano Banana 2 (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's second-generation image generation model with improved quality and speed.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana-2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
