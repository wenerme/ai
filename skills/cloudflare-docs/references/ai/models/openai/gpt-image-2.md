---
title: GPT Image 2
description: OpenAI's next-generation image model that creates and edits images from text prompts, with support for multiple quality levels, sizes, and output formats. Note: transparent backgrounds are not supported — use openai/gpt-image-1.5 for transparent PNGs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  GPT Image 2 

Text-to-Image • OpenAI • Proxied 

`openai/gpt-image-2` 

OpenAI's next-generation image model that creates and edits images from text prompts, with support for multiple quality levels, sizes, and output formats. Note: transparent backgrounds are not supported — use openai/gpt-image-1.5 for transparent PNGs.

| Model Info        |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                               |
| More information  | [link ↗](https://openai.com/)                                                                                        |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-image-2) |

## Usage

* [ TypeScript ](#tab-panel-1080)
* [ cURL ](#tab-panel-1081)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

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

  "model": "openai/gpt-image-2",

  "input": {

    "prompt": "A golden retriever puppy playing in autumn leaves"

  }

}'


```

* [ Output ](#tab-panel-1078)
* [ Raw response ](#tab-panel-1079)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/simple-generation.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/simple-generation.png"

  },

  "state": "Completed"

}


```

## Examples

**High Quality**  — Generate a high-quality detailed image 

* [ TypeScript ](#tab-panel-1084)
* [ cURL ](#tab-panel-1085)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt:

      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',

    quality: 'high',

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

  "model": "openai/gpt-image-2",

  "input": {

    "prompt": "A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures",

    "quality": "high"

  }

}'


```

* [ Output ](#tab-panel-1082)
* [ Raw response ](#tab-panel-1083)

![High Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/high-quality.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/high-quality.png"

  },

  "state": "Completed"

}


```

**Custom Size**  — Generate a portrait-oriented image 

* [ TypeScript ](#tab-panel-1088)
* [ cURL ](#tab-panel-1089)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt: 'A towering redwood forest with sunbeams filtering through the canopy, misty atmosphere',

    size: '1024x1536',

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

  "model": "openai/gpt-image-2",

  "input": {

    "prompt": "A towering redwood forest with sunbeams filtering through the canopy, misty atmosphere",

    "size": "1024x1536"

  }

}'


```

* [ Output ](#tab-panel-1086)
* [ Raw response ](#tab-panel-1087)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/custom-size.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/custom-size.png"

  },

  "state": "Completed"

}


```

**WebP Output**  — Generate an image in WebP format for smaller file size 

* [ TypeScript ](#tab-panel-1092)
* [ cURL ](#tab-panel-1093)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    output_format: 'webp',

    prompt:

      'A neon-lit cyberpunk cityscape at night with rain-slicked streets and holographic billboards',

    quality: 'high',

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

  "model": "openai/gpt-image-2",

  "input": {

    "output_format": "webp",

    "prompt": "A neon-lit cyberpunk cityscape at night with rain-slicked streets and holographic billboards",

    "quality": "high"

  }

}'


```

* [ Output ](#tab-panel-1090)
* [ Raw response ](#tab-panel-1091)

![WebP Output](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/webp-output.webp) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/webp-output.webp"

  },

  "state": "Completed"

}


```

**Image Edit**  — Edit an existing image by providing it in the images array as base64 (a raw string or a data:image/{png|jpeg|webp};base64,... URI). This routes the call to OpenAI's /v1/images/edits endpoint. The example uses a tiny 32x32 smiley-face PNG - real inputs are the full base64 encoding of your source image. 

* [ TypeScript ](#tab-panel-1098)
* [ cURL ](#tab-panel-1099)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    images: [

      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=',

    ],

    prompt:

      'Transform this cartoon smiley into a photorealistic 3D clay sculpture sitting on a marble pedestal, studio lighting',

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

  "model": "openai/gpt-image-2",

  "input": {

    "images": [

      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII="

    ],

    "prompt": "Transform this cartoon smiley into a photorealistic 3D clay sculpture sitting on a marble pedestal, studio lighting"

  }

}'


```

* [ Output ](#tab-panel-1094)
* [ Raw response ](#tab-panel-1095)

![Image Edit](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/image-edit.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/image-edit.png"

  },

  "state": "Completed"

}


```

**Multi-Image Edit**  — Compose multiple input images by passing up to 16 base64 strings in the images array. The model blends the references; useful for combining subjects, styles, or reference shots. The example pairs a smiley-face PNG with a red ball PNG. 

* [ TypeScript ](#tab-panel-1100)
* [ cURL ](#tab-panel-1101)

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    images: [

      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=',

      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhklEQVR42u2XsRHAMAgDNY73nye7OG2KgGUnGCWH76j/oTACPfnhcwIA3AoTGIFXRTADPlqjakYEDJwFWyJLAk/hrAQi4YwEouEjiVuBt+FXCVcgqntvCtjVvTUF7OremkIJlEAJ6Aikf0QSX3H6MpJYx+mBRCKSSYRSiVgucZjInGa/vY5PvB72/7IdMuAAAAAASUVORK5CYII=',

    ],

    prompt:

      'Combine these into a single photorealistic scene: a ceramic smiley-face mug next to a red rubber ball on a sunlit wooden table',

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

  "model": "openai/gpt-image-2",

  "input": {

    "images": [

      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=",

      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhklEQVR42u2XsRHAMAgDNY73nye7OG2KgGUnGCWH76j/oTACPfnhcwIA3AoTGIFXRTADPlqjakYEDJwFWyJLAk/hrAQi4YwEouEjiVuBt+FXCVcgqntvCtjVvTUF7OremkIJlEAJ6Aikf0QSX3H6MpJYx+mBRCKSSYRSiVgucZjInGa/vY5PvB72/7IdMuAAAAAASUVORK5CYII="

    ],

    "prompt": "Combine these into a single photorealistic scene: a ceramic smiley-face mug next to a red rubber ball on a sunlit wooden table"

  }

}'


```

* [ Output ](#tab-panel-1096)
* [ Raw response ](#tab-panel-1097)

![Multi-Image Edit](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/multi-image-edit.png) 

```

{

  "gatewayMetadata": {

    "keySource": "BYOK"

  },

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/multi-image-edit.png"

  },

  "state": "Completed"

}


```

## Parameters

* [ Input ](#tab-panel-1102)
* [ Output ](#tab-panel-1103)

background

`string`enum: transparent, opaque, autoBackground transparency setting. Use transparent for images with no background, opaque for a solid background, or auto to let the model decide.

▶images\[\]

`array`maxItems: 16Input images for image editing, 1-16 entries. Each entry is base64-encoded (raw string or data:image/{png|jpeg|webp};base64,... URI).

output\_format

`string`enum: png, webp, jpegOutput format for the generated image

prompt

`string`requiredText prompt describing the image to generate or edit

quality

`string`enum: low, medium, high, autoQuality of the generated image

size

`string`enum: 1024x1024, 1024x1536, 1536x1024, autoSize of the generated image

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
