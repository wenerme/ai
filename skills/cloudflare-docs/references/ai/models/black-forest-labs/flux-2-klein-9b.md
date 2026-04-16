---
title: FLUX 2 Klein 9B
description: FLUX 2 Klein is Black Forest Labs' 9-billion parameter image generation model optimized for fast inference.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  FLUX 2 Klein 9B 

Text-to-Image • Black Forest Labs • Proxied 

`black-forest-labs/flux-2-klein-9b` 

FLUX 2 Klein is Black Forest Labs' 9-billion parameter image generation model optimized for fast inference.

| Model Info        |                                                        |
| ----------------- | ------------------------------------------------------ |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/) |
| More information  | [link ↗](https://blackforestlabs.ai/)                  |

## Usage

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-klein-9b',

  {

    prompt: 'A golden retriever puppy playing in autumn leaves',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Simple Prompt](https://replicate.delivery/xezq/rVitACODTRq7IRhadkPPFpQ7M7wrOsuJbiwNXcXhnq7oONmF/out-0.webp) 

## Examples

**Detailed Scene**  — Complex scene with specific dimensions 

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-klein-9b',

  {

    prompt:

      'A Victorian-era street scene at dusk, gas lamps casting warm pools of light on cobblestones, horse-drawn carriages, and elegantly dressed pedestrians',

    width: 1024,

    height: 768,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Detailed Scene](https://replicate.delivery/xezq/a0eYF64A1epaP0efHPESxpQGMbEGgczi4j8bASDluvgMqTjZB/out-0.webp) 

**High Quality Generation**  — More inference steps for better quality 

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-klein-9b',

  {

    prompt:

      'A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar',

    num_steps: 50,

    guidance: 7.5,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![High Quality Generation](https://replicate.delivery/xezq/tg3mOF5RGVpkF5D51okqiCWNkjpnMoORytQPeUDgt4NSdaMLA/out-0.webp) 

**Fast Draft**  — Quick generation with fewer steps 

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-klein-9b',

  {

    prompt: 'A simple sketch of a mountain landscape',

    num_steps: 10,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Fast Draft](https://replicate.delivery/xezq/5fpRC3aXafgmD0mmnDn8dScpZdGbJCmgT93IfzbZagrL1pxsA/out-0.webp) 

**Reproducible Generation**  — Using a seed for consistent results 

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-klein-9b',

  {

    prompt:

      'A serene Japanese zen garden with raked sand patterns and a single bonsai tree',

    seed: 42,

    num_steps: 25,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

Explain Code

Response200 ![Reproducible Generation](https://replicate.delivery/xezq/BjLs0q1eKETCLSAltMgMVZIe9BJxrDQJAMSaW67kn9mm60YWA/out-0.webp) 

## Parameters

* [ Input ](#tab-panel-46)
* [ Output ](#tab-panel-47)

prompt

`string`required

width

`number`exclusiveMinimum: 0

height

`number`exclusiveMinimum: 0

num\_steps

`number`exclusiveMinimum: 0

guidance

`number`

seed

`number`

image

`string`requiredformat: uri

## API Schemas

* [ Input ](#tab-panel-44)
* [ Output ](#tab-panel-45)

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "prompt": {

      "type": "string"

    },

    "width": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "height": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "num_steps": {

      "type": "number",

      "exclusiveMinimum": 0

    },

    "guidance": {

      "type": "number"

    },

    "seed": {

      "type": "number"

    }

  },

  "required": [

    "prompt"

  ],

  "additionalProperties": false

}


```

Explain Code

```

{

  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",

  "properties": {

    "image": {

      "type": "string",

      "format": "uri"

    }

  },

  "required": [

    "image"

  ],

  "additionalProperties": false

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
