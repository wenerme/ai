---
description: OpenAI's fastest high-quality everyday image generation model. It accepts text and image inputs and produces images with low, medium, high, xhigh, max, and auto quality settings.
title: GPT Image 2.5 Flare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![OpenAI logo](https://developers.cloudflare.com/_astro/openai.BBwNKzBb.svg)

# GPT Image 2.5 Flare

Text-to-Image • OpenAI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-flare/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`openai/gpt-image-2.5-flare`

- Third-party

OpenAI's fastest high-quality everyday image generation model. It accepts text and image inputs and produces images with low, medium, high, xhigh, max, and auto quality settings.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://openai.com/policies/) |
| More information | [link ↗](https://developers.openai.com/api/docs/models/gpt-image-2.5-flare) |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/openai/gpt-image-2.5-flare) |

## Usage

```ts
const response = await env.AI.run(
  'openai/gpt-image-2.5-flare',
  {
    prompt:
      'A premium studio product photograph of a translucent orange mechanical keyboard on a cobalt blue acrylic pedestal, a few keys glowing amber, crisp reflections, bold geometric shadows, clean commercial art direction, no logos or readable words',
    quality: 'high',
    size: '1024x1024',
    output_format: 'jpeg',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-2.5-flare",
  "input": {
    "prompt": "A premium studio product photograph of a translucent orange mechanical keyboard on a cobalt blue acrylic pedestal, a few keys glowing amber, crisp reflections, bold geometric shadows, clean commercial art direction, no logos or readable words",
    "quality": "high",
    "size": "1024x1024",
    "output_format": "jpeg"
  }
}'
```

![Commercial Product Scene](https://examples.aig.cloudflare.com/openai/gpt-image-2.5-flare/commercial-product-scene.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/openai/gpt-image-2.5-flare/commercial-product-scene.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**Environmental Concept Frame** — Generate a wide environmental concept frame</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-image-2.5-flare',
  {
    prompt:
      'A wide establishing shot of a hidden mountain library carved into basalt cliffs, tiny figures crossing rope bridges, waterfalls disappearing into mist, late afternoon sun, grounded fantasy concept art with realistic scale',
    quality: 'xhigh',
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
  "model": "openai/gpt-image-2.5-flare",
  "input": {
    "prompt": "A wide establishing shot of a hidden mountain library carved into basalt cliffs, tiny figures crossing rope bridges, waterfalls disappearing into mist, late afternoon sun, grounded fantasy concept art with realistic scale",
    "quality": "xhigh",
    "size": "1536x1024"
  }
}'
```

![Environmental Concept Frame](https://examples.aig.cloudflare.com/openai/gpt-image-2.5-flare/environmental-concept-frame.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/openai/gpt-image-2.5-flare/environmental-concept-frame.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Poster Reference Edit** — Transform a reference sketch into a finished illustration</summary>



```ts
const response = await env.AI.run(
  'openai/gpt-image-2.5-flare',
  {
    prompt:
      'Reimagine the reference as a vibrant risograph poster for a fictional night market. Keep the central market stall silhouette and hanging lantern arrangement, add layered coral, teal, and navy ink textures, imperfect registration, and a lively crowd rendered as abstract shapes',
    images: [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII=',
    ],
    quality: 'medium',
    output_format: 'png',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "openai/gpt-image-2.5-flare",
  "input": {
    "prompt": "Reimagine the reference as a vibrant risograph poster for a fictional night market. Keep the central market stall silhouette and hanging lantern arrangement, add layered coral, teal, and navy ink textures, imperfect registration, and a lively crowd rendered as abstract shapes",
    "images": [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR42u2XQRLAIAgD8/839i/26qFCACm0ozPe1KwcQsAoXvgcAABxpwFowl4QWITHxW0LCBhxVngF4gKIirMQyBRnIJAtrkE8AuwWnyFEgKzfS1UA+3sWTju3BGAu7gKYIfBW+Q/AAQgBeMCkt1wVsLZjcwUYG2Z9wGLHZitWk1DEisubUYt2XB5IWkSyFqG0RSxvMZi0Gc1+Ox3fm00ZJ5mGVtkAAAAASUVORK5CYII="
    ],
    "quality": "medium",
    "output_format": "png"
  }
}'
```

![Poster Reference Edit](https://examples.aig.cloudflare.com/openai/gpt-image-2.5-flare/poster-reference-edit.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/openai/gpt-image-2.5-flare/poster-reference-edit.png"
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

Input [Open](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-flare/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-flare/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-flare/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-flare/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-flare/#page","headline":"GPT Image 2.5 Flare (OpenAI) · Cloudflare AI docs · Cloudflare AI docs","description":"OpenAI's fastest high-quality everyday image generation model. It accepts text and image inputs and produces images with low, medium, high, xhigh, max, and auto quality settings.","url":"https://developers.cloudflare.com/ai/models/openai/gpt-image-2.5-flare/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
