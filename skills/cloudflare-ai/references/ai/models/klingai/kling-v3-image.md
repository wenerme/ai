---
description: Kling V3 Image is Kling AI's text-to-image model for photorealistic image generation.
title: Kling v3 Image
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Kling AI logo](https://developers.cloudflare.com/_astro/kling.CbZKRtvH.svg)

# Kling v3 Image

Text-to-Image • Kling AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/klingai/kling-v3-image/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`klingai/kling-v3-image`

- Third-party

Kling V3 Image is Kling AI's text-to-image model for photorealistic image generation.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://klingai.com/terms) |
| More information | [link ↗](https://klingai.com/) |
| Pricing | <ul><li>Per image$0.027</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'klingai/kling-v3-image',
  {
    prompt:
      'A photorealistic portrait of a fox in an autumn forest, golden hour lighting',
    resolution: '1k',
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
  "model": "klingai/kling-v3-image",
  "input": {
    "aspect_ratio": "16:9",
    "prompt": "A photorealistic portrait of a fox in an autumn forest, golden hour lighting",
    "resolution": "1k"
  }
}'
```

![Simple Generation](https://examples.aig.cloudflare.com/klingai/kling-v3-image/simple-generation.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/klingai/kling-v3-image/simple-generation.png"
  }
}
```

## Parameters

prompt

`string`requiredText prompt describing the image to generate

negative\_prompt

`string`Negative text prompt

image

`string`Reference image (Base64 encoding or URL) for image-to-image

resolution

`string`requireddefault: 1kenum: 1k, 2kImage generation resolution (1k: standard, 2k: high-res)

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, 21:9Aspect ratio of generated images

image

`string`URL to the generated image

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v3-image/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v3-image/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v3-image/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v3-image/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/klingai/kling-v3-image/#page","headline":"Kling v3 Image","description":"Kling V3 Image is Kling AI's text-to-image model for photorealistic image generation.","url":"https://developers.cloudflare.com/ai/models/klingai/kling-v3-image/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
