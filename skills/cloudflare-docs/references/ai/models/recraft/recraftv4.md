---
title: Recraft V4
description: Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Recraft logo](https://developers.cloudflare.com/_astro/recraft.BhhnJczi.svg) 

#  Recraft V4 

Text-to-Image • Recraft • Proxied 

`recraft/recraftv4` 

Recraft V4 generates art-directed images with strong composition, accurate text rendering, and design taste built in. Fast and cost-efficient at standard resolution.

| Model Info        |                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.recraft.ai/terms)                                                                              |
| More information  | [link ↗](https://www.recraft.ai/)                                                                                   |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/recraft/recraftv4) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt: 'A minimalist logo of a mountain range with a sun rising behind it',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-534)
* [ Raw response ](#tab-panel-535)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/simple-generation.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**Scene Composition**  — Generate a complex compositional scene 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'A cozy cabin in the woods surrounded by tall pine trees, smoke rising from the chimney',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-536)
* [ Raw response ](#tab-panel-537)

![Scene Composition](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/scene-composition.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Custom Size**  — Specify output dimensions 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'A flat illustration of a workspace with a laptop, coffee cup, and potted plant',

    size: '1024x1024',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-538)
* [ Raw response ](#tab-panel-539)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/custom-size.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**With Color Controls**  — Guide generation with specific brand colors 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt:

      'An abstract geometric pattern suitable for a tech company brand identity',

    controls: {

      colors: [

        {

          rgb: [255, 107, 53],

        },

        {

          rgb: [0, 43, 91],

        },

      ],

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-540)
* [ Raw response ](#tab-panel-541)

![With Color Controls](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/with-color-controls.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Background Color**  — Set a specific background color 

TypeScript

```

const response = await env.AI.run(

  'recraft/recraftv4',

  {

    prompt: 'A clean icon of a lightning bolt',

    size: '1024x1024',

    controls: {

      background_color: {

        rgb: [245, 245, 245],

      },

    },

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-542)
* [ Raw response ](#tab-panel-543)

![Background Color](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/recraft__recraftv4/background-color.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-544)
* [ Output ](#tab-panel-545)

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

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
