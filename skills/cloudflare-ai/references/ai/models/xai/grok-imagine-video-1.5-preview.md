---
description: xAI's next-generation video generation model. Generates, edits, and extends videos from text and image inputs. Supports multiple aspect ratios and resolutions with improved quality over the previous generation.
title: Grok Imagine Video 1.5 Preview
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

#  Grok Imagine Video 1.5 Preview

 Image-to-Video • xAI

Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-video-1.5-preview/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

` xai/grok-imagine-video-1.5-preview `

* Third-party

xAI's next-generation video generation model. Generates, edits, and extends videos from text and image inputs. Supports multiple aspect ratios and resolutions with improved quality over the previous generation.

| Model Info        |                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://x.ai/legal/terms-of-service)                                                                                         |
| More information  | [link ↗](https://docs.x.ai/developers/models/grok-imagine-video)                                                                      |
| Pricing           | [View pricing in the Cloudflare dashboard  ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-video-1.5-preview) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-imagine-video-1.5-preview',
  {
    prompt: 'Generate a slow and serene time-lapse',
    image: { url: 'https://docs.x.ai/assets/api-examples/video/milkyway-still.png' },
    duration: 12,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "xai/grok-imagine-video-1.5-preview",
  "input": {
    "prompt": "Generate a slow and serene time-lapse",
    "image": {
      "url": "https://docs.x.ai/assets/api-examples/video/milkyway-still.png"
    },
    "duration": 12
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/xai/grok-imagine-video-1.5-preview/image-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

\_operation

`string`enum: generate, edit, extend

prompt

`string`

duration

`integer`minimum: 1maximum: 15

aspect\_ratio

`string`enum: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3

resolution

`string`enum: 480p, 720p

size

`string`enum: 848x480, 1696x960, 1280x720, 1920x1080

▶image{}

`object`

▶video{}

`object`

▶reference\_images\[\]

`array`maxItems: 10

▶output{}

`object`

user

`string`

video

`string`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-video-1.5-preview/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-video-1.5-preview/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-video-1.5-preview/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/xai/grok-imagine-video-1.5-preview/schema-output.json "Download")

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-video-1.5-preview/#page","headline":"Grok Imagine Video 1.5 Preview (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's next-generation video generation model. Generates, edits, and extends videos from text and image inputs. Supports multiple aspect ratios and resolutions with improved quality over the previous generation.","url":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-video-1.5-preview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
