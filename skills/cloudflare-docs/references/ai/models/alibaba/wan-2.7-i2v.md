---
title: Wan 2.7 I2V
description: Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  Wan 2.7 I2V 

Image-to-Video • Alibaba • Proxied 

`alibaba/wan-2.7-i2v` 

Alibaba's Wan 2.7 image-to-video model that generates videos from a reference image with optional text prompts. Supports 720P and 1080P output with durations from 2 to 15 seconds.

| Model Info        |                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                                  |
| More information  | [link ↗](https://wan.video/)                                                                                          |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/wan-2.7-i2v) |

## Usage

* [ TypeScript ](#tab-panel-96)
* [ cURL ](#tab-panel-97)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.7-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'A gentle camera push-in on the scene with soft ambient lighting',

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

  "model": "alibaba/wan-2.7-i2v",

  "input": {

    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",

    "prompt": "A gentle camera push-in on the scene with soft ambient lighting"

  }

}'


```

* [ Output ](#tab-panel-94)
* [ Raw response ](#tab-panel-95)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/simple-image-to-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**High Resolution**  — Generate at 1080P with a longer duration 

* [ TypeScript ](#tab-panel-102)
* [ cURL ](#tab-panel-103)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.7-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'Subject begins rapping confidently, head bobbing to the beat',

    duration: 10,

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

  "model": "alibaba/wan-2.7-i2v",

  "input": {

    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",

    "prompt": "Subject begins rapping confidently, head bobbing to the beat",

    "duration": 10,

    "resolution": "1080P"

  }

}'


```

* [ Output ](#tab-panel-98)
* [ Raw response ](#tab-panel-99)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/high-resolution.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**With Negative Prompt**  — Guide generation away from unwanted artifacts 

* [ TypeScript ](#tab-panel-106)
* [ cURL ](#tab-panel-107)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.7-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'Subject slowly turns their head and smiles',

    duration: 5,

    negative_prompt: 'blurry, distorted face, extra limbs',

    resolution: '720P',

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

  "model": "alibaba/wan-2.7-i2v",

  "input": {

    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",

    "prompt": "Subject slowly turns their head and smiles",

    "duration": 5,

    "negative_prompt": "blurry, distorted face, extra limbs",

    "resolution": "720P"

  }

}'


```

* [ Output ](#tab-panel-100)
* [ Raw response ](#tab-panel-101)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/with-negative-prompt.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Reproducible Output**  — Use a fixed seed for reproducibility 

* [ TypeScript ](#tab-panel-108)
* [ cURL ](#tab-panel-109)

TypeScript

```

const response = await env.AI.run(

  'alibaba/wan-2.7-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'Camera orbits slowly around the subject under streetlamp light',

    duration: 8,

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

  "model": "alibaba/wan-2.7-i2v",

  "input": {

    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",

    "prompt": "Camera orbits slowly around the subject under streetlamp light",

    "duration": 8,

    "resolution": "720P",

    "seed": 42

  }

}'


```

* [ Output ](#tab-panel-104)
* [ Raw response ](#tab-panel-105)

```

{

  "state": "Completed",

  "result": {

    "video": "https://examples.aig.cloudflare.com/alibaba/wan-2.7-i2v/reproducible-output.mp4"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-110)
* [ Output ](#tab-panel-111)

duration

`integer`maximum: 15minimum: 2

image

`string`requiredformat: uri

negative\_prompt

`string`

prompt

`string`

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
