---
title: HappyHorse 1.0 T2V
description: Alibaba's HappyHorse 1.0 text-to-video model. Generates videos from a text prompt with configurable resolution, aspect ratio, and duration (3-15s).
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  HappyHorse 1.0 T2V 

Text-to-Video • Alibaba • Proxied 

`alibaba/hh1-t2v` 

Alibaba's HappyHorse 1.0 text-to-video model. Generates videos from a text prompt with configurable resolution, aspect ratio, and duration (3-15s).

| Model Info        |                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                              |
| More information  | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1-t2v) |

## Usage

* [ TypeScript ](#tab-panel-16)
* [ cURL ](#tab-panel-17)

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-t2v',

  { prompt: 'A little girl walking on the road' },

)

console.log(response)


```

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

  "model": "alibaba/hh1-t2v",

  "input": {

    "prompt": "A little girl walking on the road"

  }

}'


```

* [ Output ](#tab-panel-14)
* [ Raw response ](#tab-panel-15)

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-t2v/simple-text-to-video.mp4"

  },

  "state": "Completed"

}


```

## Examples

**Vertical 1080P**  — Vertical 9:16 output at 1080P for social media 

* [ TypeScript ](#tab-panel-22)
* [ cURL ](#tab-panel-23)

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-t2v',

  {

    duration: 6,

    prompt: 'A dog running through a field of tall grass, slow motion, golden hour',

    ratio: '9:16',

    resolution: '1080P',

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

  "model": "alibaba/hh1-t2v",

  "input": {

    "duration": 6,

    "prompt": "A dog running through a field of tall grass, slow motion, golden hour",

    "ratio": "9:16",

    "resolution": "1080P"

  }

}'


```

* [ Output ](#tab-panel-18)
* [ Raw response ](#tab-panel-19)

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-t2v/vertical-1080p.mp4"

  },

  "state": "Completed"

}


```

**Reproducible Output**  — Use a fixed seed for reproducibility 

* [ TypeScript ](#tab-panel-24)
* [ cURL ](#tab-panel-25)

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-t2v',

  {

    duration: 5,

    prompt: 'Clouds drifting across a mountain range, time-lapse style',

    ratio: '16:9',

    resolution: '720P',

    seed: 42,

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

  "model": "alibaba/hh1-t2v",

  "input": {

    "duration": 5,

    "prompt": "Clouds drifting across a mountain range, time-lapse style",

    "ratio": "16:9",

    "resolution": "720P",

    "seed": 42

  }

}'


```

* [ Output ](#tab-panel-20)
* [ Raw response ](#tab-panel-21)

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-t2v/reproducible-output.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-26)
* [ Output ](#tab-panel-27)

duration

`integer`maximum: 15minimum: 3

prompt

`string`requiredmaxLength: 2500minLength: 1

ratio

`string`enum: 16:9, 9:16, 1:1, 4:3, 3:4

resolution

`string`enum: 720P, 1080P

seed

`integer`maximum: 2147483647minimum: 0

watermark

`boolean`

video

`string`format: uri

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
