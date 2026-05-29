---
title: Grok Imagine Image Quality
description: xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg) 

#  Grok Imagine Image Quality 

Text-to-Image • xAI • Proxied 

`xai/grok-imagine-image-quality` 

xAI's higher-fidelity text-to-image model optimized for sharper details, more accurate compositions, and stronger text rendering. Supports image editing via reference images and masks. Trades speed for quality compared to grok-imagine-image. Default output at 2k resolution.

| Model Info        |                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                                    |
| More information  | [link ↗](https://docs.x.ai/developers/models/grok-imagine-image-quality)                                                         |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-image-quality) |

## Usage

* [ TypeScript ](#tab-panel-1474)
* [ cURL ](#tab-panel-1475)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-image-quality',

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

  "model": "xai/grok-imagine-image-quality",

  "input": {

    "prompt": "A golden retriever puppy playing in autumn leaves"

  }

}'


```

* [ Output ](#tab-panel-1472)
* [ Raw response ](#tab-panel-1473)

![Simple Generation](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/simple-generation.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/simple-generation.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**High Quality Portrait**  — High-quality portrait-orientation render at 2K resolution 

* [ TypeScript ](#tab-panel-1480)
* [ cURL ](#tab-panel-1481)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-image-quality',

  {

    aspect_ratio: '3:4',

    prompt:

      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',

    quality: 'high',

    resolution: '2k',

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

  "model": "xai/grok-imagine-image-quality",

  "input": {

    "aspect_ratio": "3:4",

    "prompt": "A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures",

    "quality": "high",

    "resolution": "2k"

  }

}'


```

* [ Output ](#tab-panel-1476)
* [ Raw response ](#tab-panel-1477)

![High Quality Portrait](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/high-quality-portrait.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/high-quality-portrait.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Cinematic Widescreen**  — Widescreen cinematic composition 

* [ TypeScript ](#tab-panel-1484)
* [ cURL ](#tab-panel-1485)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-image-quality',

  {

    aspect_ratio: '16:9',

    prompt:

      'A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting',

    quality: 'high',

    resolution: '2k',

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

  "model": "xai/grok-imagine-image-quality",

  "input": {

    "aspect_ratio": "16:9",

    "prompt": "A neon-lit cyberpunk figure standing in the rain beneath a holographic billboard, cinematic lighting",

    "quality": "high",

    "resolution": "2k"

  }

}'


```

* [ Output ](#tab-panel-1478)
* [ Raw response ](#tab-panel-1479)

![Cinematic Widescreen](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/cinematic-widescreen.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/cinematic-widescreen.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Medium Quality Landscape**  — Balanced quality landscape render 

* [ TypeScript ](#tab-panel-1488)
* [ cURL ](#tab-panel-1489)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-image-quality',

  {

    aspect_ratio: '16:9',

    prompt:

      'A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky',

    quality: 'medium',

    resolution: '1k',

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

  "model": "xai/grok-imagine-image-quality",

  "input": {

    "aspect_ratio": "16:9",

    "prompt": "A panoramic view of the northern lights over a snowy mountain range, vivid greens and purples dancing across the sky",

    "quality": "medium",

    "resolution": "1k"

  }

}'


```

* [ Output ](#tab-panel-1482)
* [ Raw response ](#tab-panel-1483)

![Medium Quality Landscape](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/medium-quality-landscape.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/medium-quality-landscape.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Square Low Quality Draft**  — Fast, rough draft for iteration 

* [ TypeScript ](#tab-panel-1490)
* [ cURL ](#tab-panel-1491)

TypeScript

```

const response = await env.AI.run(

  'xai/grok-imagine-image-quality',

  {

    aspect_ratio: '1:1',

    prompt: 'A quiet Japanese garden in morning mist with a stone lantern and koi pond',

    quality: 'low',

    resolution: '1k',

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

  "model": "xai/grok-imagine-image-quality",

  "input": {

    "aspect_ratio": "1:1",

    "prompt": "A quiet Japanese garden in morning mist with a stone lantern and koi pond",

    "quality": "low",

    "resolution": "1k"

  }

}'


```

* [ Output ](#tab-panel-1486)
* [ Raw response ](#tab-panel-1487)

![Square Low Quality Draft](https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/square-low-quality-draft.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-quality/square-low-quality-draft.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-1492)
* [ Output ](#tab-panel-1493)

aspect\_ratio

`string`enum: 1:1, 3:4, 4:3, 9:16, 16:9, 2:3, 3:2, 9:19.5, 19.5:9, 9:20, 20:9, 1:2, 2:1, auto

▶image{}

`object`

▶images\[\]

`array`maxItems: 10

▶mask{}

`object`

n

`integer`maximum: 10minimum: 1

prompt

`string`required

quality

`string`enum: low, medium, high

resolution

`string`enum: 1k, 2k

response\_format

`string`enum: url, b64\_json

user

`string`

image

`string`Generated image. Either a base64 data URI (\`data:image/png;base64,...\`) or an \`https://\` URL, depending on the upstream \`response\_format\` (defaults to base64).

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
