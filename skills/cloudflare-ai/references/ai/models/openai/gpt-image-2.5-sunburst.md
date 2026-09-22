---
description: OpenAI's most capable image generation and editing model. It accepts text and image inputs and produces images with low, medium, high, xhigh, max, and auto quality settings.
title: GPT Image 2.5 Sunburst
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT Image 2.5 Sunburst

Text-to-Image • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-sunburst/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-image-2.5-sunburst`

- Third-party

OpenAI's most capable image generation and editing model. It accepts text and image inputs and produces images with low, medium, high, xhigh, max, and auto quality settings.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst) |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-image-2.5-sunburst) |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-image-2.5-sunburst',
  {
    prompt:
      'A cutaway editorial illustration of a floating ocean research station during a storm, showing laboratories, hydroponic gardens, autonomous submersibles, and illuminated underwater cables, precise technical details, dramatic but realistic lighting',
    quality: 'max',
    size: '1536x1024',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-2.5-sunburst",
  "input": {
    "prompt": "A cutaway editorial illustration of a floating ocean research station during a storm, showing laboratories, hydroponic gardens, autonomous submersibles, and illuminated underwater cables, precise technical details, dramatic but realistic lighting",
    "quality": "max",
    "size": "1536x1024"
  }
}'
```

![Technical Editorial Illustration](https://examples.aig.cloudflare.com/openai/gpt-image-2.5-sunburst/technical-editorial-illustration.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/openai/gpt-image-2.5-sunburst/technical-editorial-illustration.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**Portrait WebP** — Generate a portrait composition in WebP format</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-image-2.5-sunburst',
  {
    prompt:
      'A fashion portrait of an astronaut botanist in a glass greenhouse on Mars, crimson dust visible through the windows, translucent fabric, delicate blue flowers in the foreground, soft rim light, sophisticated magazine photography',
    quality: 'xhigh',
    size: '1024x1536',
    output_format: 'webp',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-2.5-sunburst",
  "input": {
    "prompt": "A fashion portrait of an astronaut botanist in a glass greenhouse on Mars, crimson dust visible through the windows, translucent fabric, delicate blue flowers in the foreground, soft rim light, sophisticated magazine photography",
    "quality": "xhigh",
    "size": "1024x1536",
    "output_format": "webp"
  }
}'
```

![Portrait WebP](https://examples.aig.cloudflare.com/openai/gpt-image-2.5-sunburst/portrait-webp.webp)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/openai/gpt-image-2.5-sunburst/portrait-webp.webp"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Cinematic Reference Edit** — Edit a reference image into a cinematic scene while preserving its main subject</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-image-2.5-sunburst',
  {
    prompt:
      "Turn the reference drawing into a polished cinematic stop-motion scene. Preserve the character's face and red scarf, add a miniature train platform at night, warm station lights, shallow depth of field, handcrafted felt and paper textures",
    images: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=',
    ],
    quality: 'high',
    background: 'opaque',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-2.5-sunburst",
  "input": {
    "prompt": "Turn the reference drawing into a polished cinematic stop-motion scene. Preserve the character'\''s face and red scarf, add a miniature train platform at night, warm station lights, shallow depth of field, handcrafted felt and paper textures",
    "images": [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII="
    ],
    "quality": "high",
    "background": "opaque"
  }
}'
```

![Cinematic Reference Edit](https://examples.aig.cloudflare.com/openai/gpt-image-2.5-sunburst/cinematic-reference-edit.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/openai/gpt-image-2.5-sunburst/cinematic-reference-edit.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

## Parameters

prompt

`string`requiredText prompt describing the image to generate or edit

▶images\[]

`array`maxItems: 16Input images for image editing, 1-16 entries. Each entry is base64-encoded (raw string or data:image/{png|jpeg|webp};base64,... URI).

quality

`string`enum: low, medium, high, xhigh, max, autoQuality of the generated image

size

`string`enum: 1024x1024, 1024x1536, 1536x1024, autoSize of the generated image

background

`string`enum: transparent, opaque, autoBackground transparency setting

output\_format

`string`enum: png, webp, jpegOutput format for the generated image

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-sunburst/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-sunburst/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-sunburst/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-sunburst/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-sunburst/#page","headline":"GPT Image 2.5 Sunburst","description":"OpenAI's most capable image generation and editing model. It accepts text and image inputs and produces images with low, medium, high, xhigh, max, and auto quality settings.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-sunburst/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
