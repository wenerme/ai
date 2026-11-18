---
description: Kling Image 4.0 is Kling AI's latest image model, generating 2K images from a text prompt and up to 10 reference images, in nine aspect ratios including auto.
title: Kling Image 4.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Kling AI logo](https://developers.cloudflare.com/_astro/kling.CbZKRtvH.svg)

# Kling Image 4.0

Text-to-Image • Kling AI

Model ID

`klingai/kling-v4-image` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Kling Image 4.0 is Kling AI's latest image model, generating 2K images from a text prompt and up to 10 reference images, in nine aspect ratios including auto.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://klingai.com/terms) |
| More information | [link ↗](https://kling.ai/document-api) |
| Pricing | <ul><li>Per image$0.063</li><li>Per input image$0.003</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'klingai/kling-v4-image',
  {
    prompt:
      'A photorealistic portrait of a fox in an autumn forest, golden hour lighting',
    resolution: '2k',
    aspect_ratio: '16:9',
  },
  {
    gateway: { id: 'default' },
  }
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "klingai/kling-v4-image",
  "input": {
    "aspect_ratio": "16:9",
    "prompt": "A photorealistic portrait of a fox in an autumn forest, golden hour lighting",
    "resolution": "2k"
  }
}'
```

![Simple Generation](https://examples.aig.cloudflare.com/klingai/kling-v4-image/simple-generation.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/klingai/kling-v4-image/simple-generation.png",
    "images": [
      "https://examples.aig.cloudflare.com/klingai/kling-v4-image/simple-generation.png"
    ]
  }
}
```

## Parameters

prompt

`string`requiredminLength: 1maxLength: 50000Text prompt describing the image, up to 50,000 English characters. Refer to reference images as @image\_1, @image\_2, and so on.

▶images\[]

`array`maxItems: 10Reference images for image-to-image: https URLs, data URIs or raw base64 (JPG or PNG, up to 30 MB, at least 300 px per side, aspect ratio between 2:5 and 5:2)

n

`integer`requireddefault: 1minimum: 1maximum: 9Number of images to generate

resolution

`string`requireddefault: 2kenum: 2kOutput resolution

aspect\_ratio

`string`requireddefault: autoenum: auto, 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, 21:9Aspect ratio of the generated image; auto picks one from the input

image

`string`URL to the first generated image

▶images\[]

`array`URLs to all generated images

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v4-image/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v4-image/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v4-image/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v4-image/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/klingai/kling-v4-image/#page","headline":"Kling Image 4.0","description":"Kling Image 4.0 is Kling AI's latest image model, generating 2K images from a text prompt and up to 10 reference images, in nine aspect ratios including auto.","url":"https://developers.cloudflare.com/ai/models/klingai/kling-v4-image/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
