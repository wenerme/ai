---
title: OpenAI GPT Image 2
description: OpenAI's next-generation image model that creates and edits images from text prompts, with support for multiple quality levels, sizes, and output formats. Note: transparent backgrounds are not supported — use openai/gpt-image-1.5 for transparent PNGs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BI8PEEzI.svg) 

#  OpenAI GPT Image 2 

Text-to-Image • OpenAI • Proxied 

`openai/gpt-image-2` 

OpenAI's next-generation image model that creates and edits images from text prompts, with support for multiple quality levels, sizes, and output formats. Note: transparent backgrounds are not supported — use openai/gpt-image-1.5 for transparent PNGs.

| Model Info        |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://openai.com/policies/)                                                                               |
| More information  | [link ↗](https://openai.com/)                                                                                        |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-image-2) |

## Usage

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt: 'A golden retriever puppy playing in autumn leaves',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-466)
* [ Raw response ](#tab-panel-467)

![Simple Generation](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/simple-generation.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/simple-generation.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Examples

**High Quality**  — Generate a high-quality detailed image 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt:

      'A detailed botanical illustration of exotic tropical flowers with fine line work and watercolor textures',

    quality: 'high',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-468)
* [ Raw response ](#tab-panel-469)

![High Quality](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/high-quality.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/high-quality.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Custom Size**  — Generate a portrait-oriented image 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt:

      'A towering redwood forest with sunbeams filtering through the canopy, misty atmosphere',

    size: '1024x1536',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-470)
* [ Raw response ](#tab-panel-471)

![Custom Size](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/custom-size.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/custom-size.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**WebP Output**  — Generate an image in WebP format for smaller file size 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt:

      'A neon-lit cyberpunk cityscape at night with rain-slicked streets and holographic billboards',

    quality: 'high',

    output_format: 'webp',

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-472)
* [ Raw response ](#tab-panel-473)

![WebP Output](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/webp-output.webp) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/webp-output.webp"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Image Edit**  — Edit an existing image by providing it in the images array as base64 (a raw string or a data:image/{png|jpeg|webp};base64,... URI). This routes the call to OpenAI's /v1/images/edits endpoint. The example uses a tiny 32x32 smiley-face PNG - real inputs are the full base64 encoding of your source image. 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt:

      'Transform this cartoon smiley into a photorealistic 3D clay sculpture sitting on a marble pedestal, studio lighting',

    images: [

      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=',

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-474)
* [ Raw response ](#tab-panel-475)

![Image Edit](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/image-edit.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/image-edit.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

**Multi-Image Edit**  — Compose multiple input images by passing up to 16 base64 strings in the images array. The model blends the references; useful for combining subjects, styles, or reference shots. The example pairs a smiley-face PNG with a red ball PNG. 

TypeScript

```

const response = await env.AI.run(

  'openai/gpt-image-2',

  {

    prompt:

      'Combine these into a single photorealistic scene: a ceramic smiley-face mug next to a red rubber ball on a sunlit wooden table',

    images: [

      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=',

      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhklEQVR42u2XsRHAMAgDNY73nye7OG2KgGUnGCWH76j/oTACPfnhcwIA3AoTGIFXRTADPlqjakYEDJwFWyJLAk/hrAQi4YwEouEjiVuBt+FXCVcgqntvCtjVvTUF7OremkIJlEAJ6Aikf0QSX3H6MpJYx+mBRCKSSYRSiVgucZjInGa/vY5PvB72/7IdMuAAAAAASUVORK5CYII=',

    ],

  },

  {

    gateway: { id: 'default' },

  }

)

console.log(response)


```

* [ Output ](#tab-panel-476)
* [ Raw response ](#tab-panel-477)

![Multi-Image Edit](https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/multi-image-edit.png) 

```

{

  "state": "Completed",

  "result": {

    "image": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/openai__gpt-image-2/multi-image-edit.png"

  },

  "gatewayMetadata": {

    "keySource": "Unified"

  }

}


```

## Parameters

* [ Input ](#tab-panel-478)
* [ Output ](#tab-panel-479)

prompt

`string`requiredText prompt describing the image to generate or edit

▶images\[\]

`array`maxItems: 16Input images for image editing, 1-16 entries. Each entry is base64-encoded (raw string or data:image/{png|jpeg|webp};base64,... URI).

quality

`string`enum: low, medium, high, autoQuality of the generated image

size

`string`enum: 1024x1024, 1024x1536, 1536x1024, autoSize of the generated image

background

`string`enum: transparent, opaque, autoBackground transparency setting. Use transparent for images with no background, opaque for a solid background, or auto to let the model decide.

output\_format

`string`enum: png, webp, jpegOutput format for the generated image

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
