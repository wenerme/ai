---
title: Krea 2 Medium
description: Smaller, faster, more cost-efficient. Extensive post-training makes outputs especially stable and consistent across generations. Strongest on illustration, anime, painting, and other expressive or artistic styles.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

 k

#  Krea 2 Medium

Text-to-Image • krea

`krea/krea-2-medium`

Smaller, faster, more cost-efficient. Extensive post-training makes outputs especially stable and consistent across generations. Strongest on illustration, anime, painting, and other expressive or artistic styles.

| Model Info        |                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://www.krea.ai/terms)                                                                                  |
| More information  | [link ↗](https://docs.krea.ai/api-reference/krea/krea-2-medium)                                                      |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/krea/krea-2-medium) |

## Usage

* [ TypeScript ](#tab-panel-898)
* [ cURL ](#tab-panel-899)

**TypeScript**

```ts
const response = await env.AI.run(
  'krea/krea-2-medium',
  {
    prompt: "An igloo village glowing with Aurora's colors.",
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
  "model": "krea/krea-2-medium",
  "input": {
    "prompt": "An igloo village glowing with Aurora'\''s colors.",
    "aspect_ratio": "1:1",
    "resolution": "1K"
  }
}'
```

* [ Output ](#tab-panel-896)
* [ Raw response ](#tab-panel-897)

![Default](https://examples.aig.cloudflare.com/krea/krea-2-medium/default.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/krea/krea-2-medium/default.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-900)
* [ Output ](#tab-panel-901)

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

Input [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/krea/krea-2-medium/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/krea/krea-2-medium/#page","headline":"Krea 2 Medium (krea) · Cloudflare AI docs · Cloudflare AI docs","description":"Smaller, faster, more cost-efficient. Extensive post-training makes outputs especially stable and consistent across generations. Strongest on illustration, anime, painting, and other expressive or artistic styles.","url":"https://developers.cloudflare.com/ai/models/krea/krea-2-medium/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
