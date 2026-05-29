---
title: Wan 2.6 Image
description: Alibaba's Wan 2.6 text-to-image model generating images from text prompts with optional negative prompts and customizable dimensions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  Wan 2.6 Image 

Text-to-Image • Alibaba • Proxied 

`alibaba/wan-2.6-image` 

Alibaba's Wan 2.6 text-to-image model generating images from text prompts with optional negative prompts and customizable dimensions.

| Model Info        |                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                    |
| More information  | [link ↗](https://wan.video/)                                                                                            |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/wan-2.6-image) |

## Usage

* [ TypeScript ](#tab-panel-74)
* [ cURL ](#tab-panel-75)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

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

  "model": "alibaba/wan-2.6-image",

  "input": {

    "prompt": "A golden retriever puppy playing in autumn leaves"

  }

}'


```

* [ Output ](#tab-panel-72)
* [ Raw response ](#tab-panel-73)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/simple-generation.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/66/20260417/c057796c/32701268-BbftSa6r_189314ac1a36.png"

  },

  "state": "Completed"

}


```

## Examples

**Custom Dimensions**  — Specify image size in WxH format 

* [ TypeScript ](#tab-panel-78)
* [ cURL ](#tab-panel-79)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt:

      'A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground',

    size: '1024x768',

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

  "model": "alibaba/wan-2.6-image",

  "input": {

    "prompt": "A vast alien desert landscape with two suns setting on the horizon, ancient ruins in the foreground",

    "size": "1024x768"

  }

}'


```

* [ Output ](#tab-panel-76)
* [ Raw response ](#tab-panel-77)

![Custom Dimensions](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/custom-dimensions.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/35/20260417/c057796c/3257252-vy1GbNI6_bc223e38c5b4.png"

  },

  "state": "Completed"

}


```

**Square Format**  — Square image for social media or product photos 

* [ TypeScript ](#tab-panel-82)
* [ cURL ](#tab-panel-83)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt:

      'A sleek wireless headphone on a minimalist white marble surface with soft studio lighting',

    size: '1024x1024',

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

  "model": "alibaba/wan-2.6-image",

  "input": {

    "prompt": "A sleek wireless headphone on a minimalist white marble surface with soft studio lighting",

    "size": "1024x1024"

  }

}'


```

* [ Output ](#tab-panel-80)
* [ Raw response ](#tab-panel-81)

![Square Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/square-format.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/84/20260417/c057796c/18355039-RFkWcHgG_0dcb1c1d6d95.png"

  },

  "state": "Completed"

}


```

**Negative Prompt**  — Guide generation away from unwanted elements 

* [ TypeScript ](#tab-panel-86)
* [ cURL ](#tab-panel-87)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    negative_prompt: 'modern clothing, photograph, blurry, low quality',

    prompt: 'A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar',

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

  "model": "alibaba/wan-2.6-image",

  "input": {

    "negative_prompt": "modern clothing, photograph, blurry, low quality",

    "prompt": "A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar"

  }

}'


```

* [ Output ](#tab-panel-84)
* [ Raw response ](#tab-panel-85)

![Negative Prompt](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/negative-prompt.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/53/20260417/c057796c/26097304-eVhNm6uS_edc041cd5e2b.png"

  },

  "state": "Completed"

}


```

**Portrait Format**  — Tall vertical image for portraits 

* [ TypeScript ](#tab-panel-90)
* [ cURL ](#tab-panel-91)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.6-image',

  {

    prompt: 'An elegant Art Deco poster featuring a jazz singer under a spotlight',

    size: '768x1024',

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

  "model": "alibaba/wan-2.6-image",

  "input": {

    "prompt": "An elegant Art Deco poster featuring a jazz singer under a spotlight",

    "size": "768x1024"

  }

}'


```

* [ Output ](#tab-panel-88)
* [ Raw response ](#tab-panel-89)

![Portrait Format](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__wan-2.6-image/portrait-format.png) 

```

{

  "gatewayMetadata": {

    "keySource": "Unified"

  },

  "result": {

    "image": "https://dashscope-463f.oss-accelerate.aliyuncs.com/1d/5a/20260417/c057796c/79957405-YTXQsRY6_8d8a6631f1d6.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-92)
* [ Output ](#tab-panel-93)

negative\_prompt

`string`

prompt

`string`required

size

`string`pattern: ^\\d+x\\d+$

image

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
