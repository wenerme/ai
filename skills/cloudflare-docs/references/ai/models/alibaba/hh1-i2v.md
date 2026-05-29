---
title: HappyHorse 1.0 I2V
description: Alibaba's HappyHorse 1.0 image-to-video model. Animates a reference image with an optional text prompt. Supports 720P and 1080P output with durations from 3 to 15 seconds.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Alibaba logo](https://developers.cloudflare.com/_astro/alibaba.C3THgr9s.svg) 

#  HappyHorse 1.0 I2V 

Image-to-Video • Alibaba • Proxied 

`alibaba/hh1-i2v` 

Alibaba's HappyHorse 1.0 image-to-video model. Animates a reference image with an optional text prompt. Supports 720P and 1080P output with durations from 3 to 15 seconds.

| Model Info        |                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.alibabacloud.com/help/en/legal)                                                              |
| More information  | [link ↗](https://modelstudio.console.alibabacloud.com/)                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/alibaba/hh1-i2v) |

## Usage

* [ TypeScript ](#tab-panel-4)
* [ cURL ](#tab-panel-5)

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-i2v',

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

  "model": "alibaba/hh1-i2v",

  "input": {

    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",

    "prompt": "A gentle camera push-in on the scene with soft ambient lighting"

  }

}'


```

* [ Output ](#tab-panel-2)
* [ Raw response ](#tab-panel-3)

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-i2v/simple-image-to-video.mp4"

  },

  "state": "Completed"

}


```

## Examples

**High Resolution**  — Generate at 1080P with a longer duration 

* [ TypeScript ](#tab-panel-10)
* [ cURL ](#tab-panel-11)

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'Subject begins rapping confidently to the beat, head bobbing',

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

  "model": "alibaba/hh1-i2v",

  "input": {

    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",

    "prompt": "Subject begins rapping confidently to the beat, head bobbing",

    "duration": 10,

    "resolution": "1080P"

  }

}'


```

* [ Output ](#tab-panel-6)
* [ Raw response ](#tab-panel-7)

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-i2v/high-resolution.mp4"

  },

  "state": "Completed"

}


```

**Reproducible Output**  — Use a fixed seed for reproducibility 

* [ TypeScript ](#tab-panel-12)
* [ cURL ](#tab-panel-13)

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-i2v',

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

  "model": "alibaba/hh1-i2v",

  "input": {

    "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png",

    "prompt": "Camera orbits slowly around the subject under streetlamp light",

    "duration": 8,

    "resolution": "720P",

    "seed": 42

  }

}'


```

* [ Output ](#tab-panel-8)
* [ Raw response ](#tab-panel-9)

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-i2v/reproducible-output.mp4"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-0)
* [ Output ](#tab-panel-1)

duration

`integer`maximum: 15minimum: 3

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
