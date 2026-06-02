---
title: FLUX.2 [flex]
description: FLUX.2 [flex] is Black Forest Labs' fine-grained control variant of FLUX.2 — exposes tunable inference steps, guidance, and prompt upsampling for typography-heavy and production workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg) 

#  FLUX.2 \[flex\] 

Text-to-Image • Black Forest Labs • Proxied 

`black-forest-labs/flux-2-flex` 

FLUX.2 \[flex\] is Black Forest Labs' fine-grained control variant of FLUX.2 — exposes tunable inference steps, guidance, and prompt upsampling for typography-heavy and production workflows.

| Model Info        |                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                          |
| More information  | [link ↗](https://blackforestlabs.ai/)                                                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-2-flex) |

## Usage

* [ TypeScript ](#tab-panel-284)
* [ cURL ](#tab-panel-285)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-flex',

  {

    prompt:

      "Samsung Galaxy S25 Ultra product advertisement, 'Ultra-strong titanium' headline, close-up of phone edge showing titanium frame, dark gradient background, clean minimalist tech aesthetic",

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

  "model": "black-forest-labs/flux-2-flex",

  "input": {

    "prompt": "Samsung Galaxy S25 Ultra product advertisement, '\''Ultra-strong titanium'\'' headline, close-up of phone edge showing titanium frame, dark gradient background, clean minimalist tech aesthetic"

  }

}'


```

* [ Output ](#tab-panel-282)
* [ Raw response ](#tab-panel-283)

![Typography & Design](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/typography-design.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/typography-design.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**High Detail Generation**  — Crank steps and guidance for maximum detail when latency is not the priority 

* [ TypeScript ](#tab-panel-288)
* [ cURL ](#tab-panel-289)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-flex',

  {

    prompt: 'A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar',

    guidance: 7.5,

    steps: 50,

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

  "model": "black-forest-labs/flux-2-flex",

  "input": {

    "prompt": "A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar",

    "guidance": 7.5,

    "steps": 50

  }

}'


```

* [ Output ](#tab-panel-286)
* [ Raw response ](#tab-panel-287)

![High Detail Generation](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/high-detail-generation.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/high-detail-generation.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Fast Draft**  — Fast draft with prompt upsampling disabled — preserves the literal prompt 

* [ TypeScript ](#tab-panel-292)
* [ cURL ](#tab-panel-293)

TypeScript

```

const response = await env.AI.run(

  'black-forest-labs/flux-2-flex',

  { prompt: 'A simple line sketch of a mountain landscape', prompt_upsampling: false, steps: 10 },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "black-forest-labs/flux-2-flex",

  "input": {

    "prompt": "A simple line sketch of a mountain landscape",

    "prompt_upsampling": false,

    "steps": 10

  }

}'


```

* [ Output ](#tab-panel-290)
* [ Raw response ](#tab-panel-291)

![Fast Draft](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/fast-draft.jpeg) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/fast-draft.jpeg"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-294)
* [ Output ](#tab-panel-295)

guidance

`number`maximum: 10minimum: 1.5Classifier-free guidance scale (1.5–10). Higher values follow the prompt more strictly at the cost of realism.

height

`integer`maximum: 9007199254740991minimum: 64Height of the generated image in pixels (minimum 64). Omit to let BFL pick.

▶input\_images\[\]

`array`maxItems: 8Up to 8 reference images for editing or multi-image composition. Each entry is an HTTPS URL or a data:image/...;base64,... URI.

output\_format

`string`enum: jpeg, png, webpOutput image format. Defaults to jpeg.

prompt

`string`requiredText prompt for image generation or editing.

prompt\_upsampling

`boolean`Whether BFL should expand short prompts before generation. Defaults to true on flex.

safety\_tolerance

`integer`maximum: 5minimum: 0Tolerance for input/output moderation. 0 is the strictest, 5 the most permissive. Defaults to 2.

seed

`integer`maximum: 9007199254740991minimum: \-9007199254740991Optional seed for reproducible generation.

steps

`integer`maximum: 50minimum: 1Number of denoising steps (1–50). Higher steps yield more detail at the cost of latency.

width

`integer`maximum: 9007199254740991minimum: 64Width of the generated image in pixels (minimum 64). Omit to let BFL pick.

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
