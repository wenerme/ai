---
description: FLUX.1 Kontext [pro] creates and edits images from text prompts with strong character and style consistency.
title: FLUX.1 Kontext [pro]
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

# FLUX.1 Kontext \[pro\]

Text-to-Image • Black Forest Labs

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-1-kontext-pro/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`black-forest-labs/flux-1-kontext-pro`

* Third-party

FLUX.1 Kontext \[pro\] creates and edits images from text prompts with strong character and style consistency.

| Model Info        |                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                                 |
| More information  | [link ↗](https://docs.bfl.ml/api-reference/models/edit-or-create-an-image-with-flux1-kontext-[pro])                                    |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-1-kontext-pro) |

## Usage

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-1-kontext-pro',
  { prompt: 'A small furry elephant pet looks out from a cat house' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-1-kontext-pro",
  "input": {
    "prompt": "A small furry elephant pet looks out from a cat house"
  }
}'
```

![Text to Image](https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-pro/text-to-image.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-pro/text-to-image.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Wide Cinematic Image** — Generate a cinematic landscape using a wide aspect ratio.

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-1-kontext-pro',
  {
    prompt:
      'A remote gas station swallowed by crimson fog, green glow from overhead lights staining the asphalt, cinematic wide shot',
    input_image:
      'https://cdn.sanity.io/images/gsvmb6gz/production/3ae6ee032b85373b84934574f3ac3bb2fb792d64-2048x1365.jpg',
    aspect_ratio: '16:9',
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
  "model": "black-forest-labs/flux-1-kontext-pro",
  "input": {
    "prompt": "A remote gas station swallowed by crimson fog, green glow from overhead lights staining the asphalt, cinematic wide shot",
    "input_image": "https://cdn.sanity.io/images/gsvmb6gz/production/3ae6ee032b85373b84934574f3ac3bb2fb792d64-2048x1365.jpg",
    "aspect_ratio": "16:9",
    "output_format": "jpeg"
  }
}'
```

![Wide Cinematic Image](https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-pro/wide-cinematic-image.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-pro/wide-cinematic-image.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredText prompt for image generation or editing.

input\_image

`string | null`Optional base64 encoded image or URL to edit.

aspect\_ratio

`string | null`Output aspect ratio, from 3:7 to 7:3\. Defaults to 1:1.

seed

`integer | null`Optional seed for reproducible generation.

prompt\_upsampling

`boolean`Whether to upsample the prompt. Defaults to false.

safety\_tolerance

`integer`minimum: 0maximum: 6Moderation tolerance. 0 is strictest and 6 is most permissive.

output\_format

`string`enum: jpeg, pngOutput image format. Defaults to jpeg.

image

`string`format: uriURL to the generated image

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-1-kontext-pro/#page","headline":"FLUX.1 Kontext [pro] (Black Forest Labs) · Cloudflare AI docs · Cloudflare AI docs","description":"FLUX.1 Kontext [pro] creates and edits images from text prompts with strong character and style consistency.","url":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-1-kontext-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
