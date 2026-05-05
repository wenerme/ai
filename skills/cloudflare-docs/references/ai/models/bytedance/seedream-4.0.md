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

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt: 'A serene mountain lake surrounded by pine trees at dawn',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-134)
* [ Raw response ](#tab-panel-135)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/simple-generation.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387438887c5f50319cb4d4388d7836967b82aebe5227f8d_0.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**High Resolution**  — 4K quality image generation 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt:

      'A detailed steampunk mechanical owl with brass gears and copper feathers, intricate clockwork visible',

    size: '4K',

    aspect_ratio: '1:1',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-136)
* [ Raw response ](#tab-panel-137)

![High Resolution](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/high-resolution.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387448153c5f50319cb4d4388d7836967b82aebe5807cbc_0.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Widescreen Landscape**  — Cinematic aspect ratio image 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt:

      'A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground',

    size: '2K',

    aspect_ratio: '21:9',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-138)
* [ Raw response ](#tab-panel-139)

![Widescreen Landscape](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/widescreen-landscape.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387469085c5f50319cb4d4388d7836967b82aebe5dcf17e_0.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Portrait Format**  — Vertical image for portraits 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt:

      'An elegant Art Deco poster featuring a jazz singer under a spotlight',

    aspect_ratio: '9:16',

    enhance_prompt: true,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-140)
* [ Raw response ](#tab-panel-141)

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/portrait-format.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776387475078c5f50319cb4d4388d7836967b82aebe5e6ec81_0.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Detailed 4K**  — High-resolution detailed botanical illustration 

TypeScript

```

const response = await env.AI.run(

  'bytedance/seedream-4.0',

  {

    prompt: 'A detailed botanical illustration of exotic tropical flowers',

    size: '4K',

    aspect_ratio: '3:4',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-142)
* [ Raw response ](#tab-panel-143)

![Detailed 4K](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/bytedance__seedream-4.0/detailed-4k.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://ark-content-generation-v2-ap-southeast-1.tos-ap-southeast-1.volces.com/seedream-4-0/021776441662380e1f2c28e220bf76d8a56e2a46eaa08e982d37f_0.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-144)
* [ Output ](#tab-panel-145)

prompt

`string`required

size

`string`enum: 1K, 2K, 4K, custom

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, 21:9

width

`integer`minimum: 1024maximum: 4096

height

`integer`minimum: 1024maximum: 4096

enhance\_prompt

`boolean`

image

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
