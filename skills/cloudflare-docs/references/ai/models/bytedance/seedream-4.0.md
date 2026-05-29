---
title: Seedream 4.0
description: Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg) 

#  Seedream 4.0 

Text-to-Image • ByteDance • Proxied 

`bytedance/seedream-4.0` 

Seedream 4.0 is ByteDance's image creation model that combines text-to-image generation and image editing into a single architecture, offering fast, high-resolution output up to 4K.

| Model Info       |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedream4%5F0)                                                                    |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedream-4.0) |

## Usage

* [ TypeScript ](#tab-panel-336)
* [ cURL ](#tab-panel-337)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  { prompt: 'A serene mountain lake surrounded by pine trees at dawn' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "bytedance/seedream-4.0",

  "input": {

    "prompt": "A serene mountain lake surrounded by pine trees at dawn"

  }

}'


```

* [ Output ](#tab-panel-334)
* [ Raw response ](#tab-panel-335)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/simple-generation.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387438887c5f50319cb4d4388d7836967b82aebe5227f8d_0.jpeg"

  },

  "state": "Completed"

}


```

## Examples

**High Resolution**  — 4K quality image generation 

* [ TypeScript ](#tab-panel-340)
* [ cURL ](#tab-panel-341)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    aspect_ratio: '1:1',

    prompt:

      'A detailed steampunk mechanical owl with brass gears and copper feathers, intricate clockwork visible',

    size: '4K',

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

  "model": "bytedance/seedream-4.0",

  "input": {

    "aspect_ratio": "1:1",

    "prompt": "A detailed steampunk mechanical owl with brass gears and copper feathers, intricate clockwork visible",

    "size": "4K"

  }

}'


```

* [ Output ](#tab-panel-338)
* [ Raw response ](#tab-panel-339)

![High Resolution](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/high-resolution.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387448153c5f50319cb4d4388d7836967b82aebe5807cbc_0.jpeg"

  },

  "state": "Completed"

}


```

**Widescreen Landscape**  — Cinematic aspect ratio image 

* [ TypeScript ](#tab-panel-344)
* [ cURL ](#tab-panel-345)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    aspect_ratio: '21:9',

    prompt:

      'A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground',

    size: '2K',

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

  "model": "bytedance/seedream-4.0",

  "input": {

    "aspect_ratio": "21:9",

    "prompt": "A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground",

    "size": "2K"

  }

}'


```

* [ Output ](#tab-panel-342)
* [ Raw response ](#tab-panel-343)

![Widescreen Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/widescreen-landscape.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387469085c5f50319cb4d4388d7836967b82aebe5dcf17e_0.jpeg"

  },

  "state": "Completed"

}


```

**Portrait Format**  — Vertical image for portraits 

* [ TypeScript ](#tab-panel-348)
* [ cURL ](#tab-panel-349)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    aspect_ratio: '9:16',

    enhance_prompt: true,

    prompt: 'An elegant Art Deco poster featuring a jazz singer under a spotlight',

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

  "model": "bytedance/seedream-4.0",

  "input": {

    "aspect_ratio": "9:16",

    "enhance_prompt": true,

    "prompt": "An elegant Art Deco poster featuring a jazz singer under a spotlight"

  }

}'


```

* [ Output ](#tab-panel-346)
* [ Raw response ](#tab-panel-347)

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/portrait-format.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387475078c5f50319cb4d4388d7836967b82aebe5e6ec81_0.jpeg"

  },

  "state": "Completed"

}


```

**Detailed 4K**  — High-resolution detailed botanical illustration 

* [ TypeScript ](#tab-panel-352)
* [ cURL ](#tab-panel-353)

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    aspect_ratio: '3:4',

    prompt: 'A detailed botanical illustration of exotic tropical flowers',

    size: '4K',

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

  "model": "bytedance/seedream-4.0",

  "input": {

    "aspect_ratio": "3:4",

    "prompt": "A detailed botanical illustration of exotic tropical flowers",

    "size": "4K"

  }

}'


```

* [ Output ](#tab-panel-350)
* [ Raw response ](#tab-panel-351)

![Detailed 4K](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/detailed-4k.jpeg) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776441662380e1f2c28e220bf76d8a56e2a46eaa08e982d37f_0.jpeg"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-354)
* [ Output ](#tab-panel-355)

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

enhance\_prompt

`boolean`

height

`integer`maximum: 4096minimum: 1024

prompt

`string`required

size

`string`enum: 1K, 2K, 4K, custom

width

`integer`maximum: 4096minimum: 1024

image

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
