---
description: The fastest Krea 2 model, built for low-cost iteration on expressive illustrations, style-driven concepts, and rapid visual exploration. Keeps the Krea 2 style system and expressive visual range but uses a distilled sampling schedule so you can move through ideas much faster. Especially useful for expressive illustration, graphic styles, typography experiments, and quick campaign or concept directions.
title: Krea 2 Medium Turbo
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

 k

#  Krea 2 Medium Turbo

 Text-to-Image • krea

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium-turbo/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` krea/krea-2-medium-turbo `

* Third-party

The fastest Krea 2 model, built for low-cost iteration on expressive illustrations, style-driven concepts, and rapid visual exploration. Keeps the Krea 2 style system and expressive visual range but uses a distilled sampling schedule so you can move through ideas much faster. Especially useful for expressive illustration, graphic styles, typography experiments, and quick campaign or concept directions.

| Model Info        |                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.krea.ai/terms)                                                                                         |
| More information  | [link ↗](https://docs.krea.ai/api-reference/krea/krea-2-medium-turbo)                                                       |
| Pricing           | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/krea/krea-2-medium-turbo) |

## Usage

```ts
const response = await env.AI.run(
  'krea/krea-2-medium-turbo',
  {
    prompt: 'Ice citadel, frost mages and snow beasts, in a cool, fantasy anime style.',
    aspect_ratio: '1:1',
    resolution: '1K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "krea/krea-2-medium-turbo",
  "input": {
    "prompt": "Ice citadel, frost mages and snow beasts, in a cool, fantasy anime style.",
    "aspect_ratio": "1:1",
    "resolution": "1K"
  }
}'
```

![Default](https://examples.aig.cloudflare.com/krea/krea-2-medium-turbo/default.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/krea/krea-2-medium-turbo/default.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`requiredText prompt describing the image to generate.

aspect\_ratio

`string`requiredenum: 1:1, 4:3, 3:2, 16:9, 2.35:1, 4:5, 2:3, 9:16Aspect ratio of the generated image.

resolution

`string`requiredenum: 1KResolution scale.

seed

`number | null`Random seed for reproducible generations. Pass null or omit for a random seed.

▶styles\[\]

`array`Styles (typically LoRAs) to apply to the generation.

▶image\_style\_references\[\]

`array`maxItems: 10Reference images to drive the visual style (up to 10).

creativity

`string`default: lowenum: raw, low, medium, highPrompt expansion mode. \`raw\` disables expansion; \`low\`, \`medium\`, \`high\` control strength. Does not affect the K2 Intensity, Complexity, or Movement slider LoRAs.

intensity

`integer`default: 0minimum: \-100maximum: 100K2 Intensity slider (-100 to 100). 0 disables the slider LoRA.

complexity

`integer`default: 0minimum: \-100maximum: 100K2 Complexity slider (-100 to 100). 0 disables the slider LoRA.

movement

`integer`default: 0minimum: \-100maximum: 100K2 Movement slider (-100 to 100). 0 disables the slider LoRA.

▶moodboards\[\]

`array`maxItems: 1Moodboard references (currently limited to one).

image

`string`format: uriPresigned URL for the generated image.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium-turbo/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium-turbo/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium-turbo/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium-turbo/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/krea/krea-2-medium-turbo/#page","headline":"Krea 2 Medium Turbo (krea) · Cloudflare AI docs · Cloudflare AI docs","description":"The fastest Krea 2 model, built for low-cost iteration on expressive illustrations, style-driven concepts, and rapid visual exploration. Keeps the Krea 2 style system and expressive visual range but uses a distilled sampling schedule so you can move through ideas much faster. Especially useful for expressive illustration, graphic styles, typography experiments, and quick campaign or concept directions.","url":"https://developers.cloudflare.com/ai/models/krea/krea-2-medium-turbo/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
