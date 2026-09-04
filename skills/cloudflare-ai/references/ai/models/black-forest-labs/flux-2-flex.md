---
description: FLUX.2 [flex] is Black Forest Labs' fine-grained control variant of FLUX.2 — exposes tunable inference steps, guidance, and prompt upsampling for typography-heavy and production workflows.
title: FLUX.2 [flex]
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

# FLUX.2 \[flex\]

Text-to-Image • Black Forest Labs

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-2-flex/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`black-forest-labs/flux-2-flex`

* Third-party

FLUX.2 \[flex\] is Black Forest Labs' fine-grained control variant of FLUX.2 — exposes tunable inference steps, guidance, and prompt upsampling for typography-heavy and production workflows.

| Model Info        |                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                          |
| More information  | [link ↗](https://blackforestlabs.ai/)                                                                                           |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-2-flex) |

## Usage

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-2-flex',
  {
    prompt:
      "Samsung Galaxy S25 Ultra product advertisement, 'Ultra-strong titanium' headline, close-up of phone edge showing titanium frame, dark gradient background, clean minimalist tech aesthetic",
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-2-flex",
  "input": {
    "prompt": "Samsung Galaxy S25 Ultra product advertisement, '\''Ultra-strong titanium'\'' headline, close-up of phone edge showing titanium frame, dark gradient background, clean minimalist tech aesthetic"
  }
}'
```

![Typography & Design](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/typography-design.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/typography-design.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**High Detail Generation** — Crank steps and guidance for maximum detail when latency is not the priority

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-2-flex',
  {
    prompt: 'A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar',
    guidance: 7.5,
    steps: 50,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-2-flex",
  "input": {
    "prompt": "A detailed oil painting portrait of a Renaissance nobleman with intricate lace collar",
    "guidance": 7.5,
    "steps": 50
  }
}'
```

![High Detail Generation](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/high-detail-generation.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/high-detail-generation.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Fast Draft** — Fast draft with prompt upsampling disabled — preserves the literal prompt

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-2-flex',
  { prompt: 'A simple line sketch of a mountain landscape', prompt_upsampling: false, steps: 10 },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-2-flex",
  "input": {
    "prompt": "A simple line sketch of a mountain landscape",
    "prompt_upsampling": false,
    "steps": 10
  }
}'
```

![Fast Draft](https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/fast-draft.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/black-forest-labs/flux-2-flex/fast-draft.jpeg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredText prompt for image generation or editing.

seed

`integer`minimum: \-9007199254740991maximum: 9007199254740991Optional seed for reproducible generation.

width

`integer`minimum: 64maximum: 9007199254740991Width of the generated image in pixels (minimum 64). Omit to let BFL pick.

height

`integer`minimum: 64maximum: 9007199254740991Height of the generated image in pixels (minimum 64). Omit to let BFL pick.

safety\_tolerance

`integer`minimum: 0maximum: 5Tolerance for input/output moderation. 0 is the strictest, 5 the most permissive. Defaults to 2.

output\_format

`string`enum: jpeg, png, webpOutput image format. Defaults to jpeg.

▶input\_images\[\]

`array`maxItems: 8Up to 8 reference images for editing or multi-image composition. Each entry is an HTTPS URL or a data:image/...;base64,... URI.

prompt\_upsampling

`boolean`Whether BFL should expand short prompts before generation. Defaults to true on flex.

guidance

`number`minimum: 1.5maximum: 10Classifier-free guidance scale (1.5–10). Higher values follow the prompt more strictly at the cost of realism.

steps

`integer`minimum: 1maximum: 50Number of denoising steps (1–50). Higher steps yield more detail at the cost of latency.

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-2-flex/#page","headline":"FLUX.2 [flex] (Black Forest Labs) · Cloudflare AI docs · Cloudflare AI docs","description":"FLUX.2 [flex] is Black Forest Labs' fine-grained control variant of FLUX.2 — exposes tunable inference steps, guidance, and prompt upsampling for typography-heavy and production workflows.","url":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-2-flex/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
