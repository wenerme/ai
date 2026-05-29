---
title: GPT Image 1.5
description: OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT Image 1.5 

Text-to-Image • OpenAI • Proxied 

`openai/gpt-image-1.5` 

OpenAI's image generation model that creates and edits images from text prompts, supporting multiple quality levels and output sizes.

| Model Info        |                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                                 |
| More information  | [link ↗](https://openai.com/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-image-1.5) |

## Usage

* [ TypeScript ](#tab-panel-1058)
* [ cURL ](#tab-panel-1059)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  { prompt: 'A golden retriever puppy playing in autumn leaves' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "openai/gpt-image-1.5",

  "input": {

    "prompt": "A golden retriever puppy playing in autumn leaves"

  }

}'


```

* [ Output ](#tab-panel-1056)
* [ Raw response ](#tab-panel-1057)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/simple-generation.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/simple-generation.png"

  },

  "state": "Completed"

}


```

## Examples

**High Quality**  — Generate a high-quality detailed image 

* [ TypeScript ](#tab-panel-1062)
* [ cURL ](#tab-panel-1063)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',

    quality: 'high',

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

  "model": "openai/gpt-image-1.5",

  "input": {

    "prompt": "A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures",

    "quality": "high"

  }

}'


```

* [ Output ](#tab-panel-1060)
* [ Raw response ](#tab-panel-1061)

![High Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/high-quality.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/high-quality.png"

  },

  "state": "Completed"

}


```

**Low Quality Draft**  — Fast, rough draft for iteration 

* [ TypeScript ](#tab-panel-1066)
* [ cURL ](#tab-panel-1067)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt: 'A quiet Japanese garden in morning mist with a stone lantern and koi pond',

    quality: 'low',

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

  "model": "openai/gpt-image-1.5",

  "input": {

    "prompt": "A quiet Japanese garden in morning mist with a stone lantern and koi pond",

    "quality": "low"

  }

}'


```

* [ Output ](#tab-panel-1064)
* [ Raw response ](#tab-panel-1065)

![Low Quality Draft](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/low-quality-draft.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/low-quality-draft.png"

  },

  "state": "Completed"

}


```

**Medium Quality**  — Balanced quality for most uses 

* [ TypeScript ](#tab-panel-1070)
* [ cURL ](#tab-panel-1071)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting',

    quality: 'medium',

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

  "model": "openai/gpt-image-1.5",

  "input": {

    "prompt": "A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting",

    "quality": "medium"

  }

}'


```

* [ Output ](#tab-panel-1068)
* [ Raw response ](#tab-panel-1069)

![Medium Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/medium-quality.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/medium-quality.png"

  },

  "state": "Completed"

}


```

**Auto Quality**  — Let the model pick an appropriate quality level 

* [ TypeScript ](#tab-panel-1074)
* [ cURL ](#tab-panel-1075)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-1.5',

  {

    prompt:

      'A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky',

    quality: 'auto',

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

  "model": "openai/gpt-image-1.5",

  "input": {

    "prompt": "A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky",

    "quality": "auto"

  }

}'


```

* [ Output ](#tab-panel-1072)
* [ Raw response ](#tab-panel-1073)

![Auto Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/auto-quality.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-1.5/auto-quality.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1076)
* [ Output ](#tab-panel-1077)

▶images\[\]

`array`maxItems: 16Input images for image editing, 1-16 entries. Each entry is base64-encoded (raw string or data:image/{png|jpeg|webp};base64,... URI).

prompt

`string`requiredText prompt describing the image to generate or edit

quality

`string`enum: low, medium, high, autoQuality of the generated image

size

`string`enum: 256x256, 512x512, 1024x1024, 1792x1024, 1024x1792Size of the generated image

style

`string`enum: vivid, naturalStyle of the generated image

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
