---
description: Pruna's P-Image is an ultra-fast text-to-image model with automatic prompt enhancement and 2-stage refinement, combining exceptional speed with high-quality output and flexible aspect ratios.
title: P-Image
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Pruna AI logo](https://developers.cloudflare.com/_astro/prunaai.Bv7D31UF.svg)

# P-Image

Text-to-Image • Pruna AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/pruna/p-image/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`pruna/p-image`

- Third-party

Pruna's P-Image is an ultra-fast text-to-image model with automatic prompt enhancement and 2-stage refinement, combining exceptional speed with high-quality output and flexible aspect ratios.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.api.pruna.ai/guides/quickstart) |
| Pricing | <ul><li>Per image$0.005</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'pruna/p-image',
  {
    prompt: 'A majestic lion standing on a rocky cliff at sunset, photorealistic, 4k',
    aspect_ratio: '16:9',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-image",
  "input": {
    "prompt": "A majestic lion standing on a rocky cliff at sunset, photorealistic, 4k",
    "aspect_ratio": "16:9"
  }
}'
```

![Lion at Sunset](https://examples.aig.cloudflare.com/pruna/p-image/lion-at-sunset.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/p-image/lion-at-sunset.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**Reading Nook** — Square-format generation with prompt upsampling.</summary>



```ts
const response = await env.AI.run(
  'pruna/p-image',
  {
    prompt: 'A cozy reading nook by a rainy window, warm lighting, detailed illustration',
    aspect_ratio: '1:1',
    prompt_upsampling: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "pruna/p-image",
  "input": {
    "prompt": "A cozy reading nook by a rainy window, warm lighting, detailed illustration",
    "aspect_ratio": "1:1",
    "prompt_upsampling": true
  }
}'
```

![Reading Nook](https://examples.aig.cloudflare.com/pruna/p-image/reading-nook.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/pruna/p-image/reading-nook.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

## Parameters

prompt

`string`requiredText description of the image to generate. The model automatically enhances prompts for better results.

aspect\_ratio

`string`requireddefault: 16:9enum: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, customAspect ratio for the image. Use "custom" with width/height for exact dimensions.

width

`integer`minimum: 256maximum: 1440multipleOf: 16Custom width in pixels (256-1440, multiple of 16). Only used when aspect\_ratio="custom".

height

`integer`minimum: 256maximum: 1440multipleOf: 16Custom height in pixels (256-1440, multiple of 16). Only used when aspect\_ratio="custom".

lora\_weights

`string`Load LoRA weights. Supports HuggingFace URLs in the format huggingface.co/\<owner>/\<model-name>\[/\<file.safetensors>].

lora\_scale

`number`requireddefault: 0.5minimum: -1maximum: 3How strongly the LoRA should be applied (-1 to 3).

hf\_api\_token

`string`HuggingFace API token for accessing private LoRAs. This credential is forwarded verbatim to Pruna. It is only written to gateway request-body logs when the gateway-level collectLogPayload debug flag is explicitly enabled — it never appears in structured analytics logs.

prompt\_upsampling

`boolean`requireddefault: falseUpsample the prompt with an LLM for enhanced results.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Random seed for reproducible generation.

disable\_safety\_checker

`boolean`requireddefault: falseDisable safety checker for generated images.

image

`string`format: uriPresigned URL for the generated image.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/pruna/p-image/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/pruna/p-image/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/pruna/p-image/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/pruna/p-image/#page","headline":"P-Image","description":"Pruna's P-Image is an ultra-fast text-to-image model with automatic prompt enhancement and 2-stage refinement, combining exceptional speed with high-quality output and flexible aspect ratios.","url":"https://developers.cloudflare.com/ai/models/pruna/p-image/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
