---
description: FLUX.1 Kontext [max] is Black Forest Labs' highest-quality Kontext model for text-to-image generation and context-aware image editing.
title: FLUX.1 Kontext [max]
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

# FLUX.1 Kontext \[max\]

Text-to-Image • Black Forest Labs

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-1-kontext-max/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`black-forest-labs/flux-1-kontext-max`

* Third-party

FLUX.1 Kontext \[max\] is Black Forest Labs' highest-quality Kontext model for text-to-image generation and context-aware image editing.

| Model Info        |                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                                 |
| More information  | [link ↗](https://docs.bfl.ml/api-reference/models/edit-or-create-an-image-with-flux1-kontext-[max])                                    |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-1-kontext-max) |

## Usage

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-1-kontext-max',
  {
    prompt:
      'A lone warrior in bloodstained samurai armor stands before a pagoda engulfed in flames, cinematic dark fantasy realism',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-1-kontext-max",
  "input": {
    "prompt": "A lone warrior in bloodstained samurai armor stands before a pagoda engulfed in flames, cinematic dark fantasy realism"
  }
}'
```

![Maximum Quality Generation](https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-max/maximum-quality-generation.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-max/maximum-quality-generation.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Reproducible Generation** — Use a seed and PNG output for reproducible image generation.

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-1-kontext-max',
  {
    prompt:
      'A detailed oil painting portrait of a Renaissance nobleman with an intricate lace collar',
    seed: 42,
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
  "model": "black-forest-labs/flux-1-kontext-max",
  "input": {
    "prompt": "A detailed oil painting portrait of a Renaissance nobleman with an intricate lace collar",
    "seed": 42,
    "output_format": "png"
  }
}'
```

![Reproducible Generation](https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-max/reproducible-generation.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-1-kontext-max/reproducible-generation.png"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-1-kontext-max/#page","headline":"FLUX.1 Kontext [max] (Black Forest Labs) · Cloudflare AI docs · Cloudflare AI docs","description":"FLUX.1 Kontext \\[max] is Black Forest Labs' highest-quality Kontext model for text-to-image generation and context-aware image editing.","url":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-1-kontext-max/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
