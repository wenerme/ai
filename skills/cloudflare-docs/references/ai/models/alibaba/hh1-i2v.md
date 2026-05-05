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

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'A gentle camera push-in on the scene with soft ambient lighting',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-2)
* [ Raw response ](#tab-panel-3)

```

{

  "state": "Completed",

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-i2v/simple-image-to-video.mp4"

  },

  "gatewayMetadata": {

    "keySource": "BYOK"

  }

}


```

## Examples

**High Resolution**  — Generate at 1080P with a longer duration 

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'Subject begins rapping confidently to the beat, head bobbing',

    resolution: '1080P',

    duration: 10,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-4)
* [ Raw response ](#tab-panel-5)

```

{

  "state": "Completed",

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-i2v/high-resolution.mp4"

  },

  "gatewayMetadata": {

    "keySource": "BYOK"

  }

}


```

**Reproducible Output**  — Use a fixed seed for reproducibility 

TypeScript

```

const response = await env.AI.run(

  'alibaba/hh1-i2v',

  {

    image:

      'https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/wpimhv/rap.png',

    prompt: 'Camera orbits slowly around the subject under streetlamp light',

    resolution: '720P',

    duration: 8,

    seed: 42,

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-6)
* [ Raw response ](#tab-panel-7)

```

{

  "state": "Completed",

  "result": {

    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/alibaba__hh1-i2v/reproducible-output.mp4"

  },

  "gatewayMetadata": {

    "keySource": "BYOK"

  }

}


```

## Parameters

* [ Input ](#tab-panel-0)
* [ Output ](#tab-panel-1)

image

`string`requiredformat: uri

prompt

`string`

negative\_prompt

`string`

resolution

`string`enum: 720P, 1080P

duration

`integer`minimum: 3maximum: 15

seed

`integer`minimum: 0maximum: 2147483647

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
