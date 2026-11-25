---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: ByteDance's first-generation cinematic video model. Generates 1080p video from text or images with strong prompt adherence, stable motion, and native multi-shot narrative coherence. Supports first/last-frame image-to-video and image references.
title: Seedance 1.0 Pro
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

# Seedance 1.0 Pro

Text-to-Video • ByteDance

Model ID

`bytedance/seedance-1-pro` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

ByteDance's first-generation cinematic video model. Generates 1080p video from text or images with strong prompt adherence, stable motion, and native multi-shot narrative coherence. Supports first/last-frame image-to-video and image references.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.byteplus.com/en/docs/ModelArk/video-generation-tutorial) |
| Pricing | <ul><li>Default (per second)$0.05148</li><li>@480p (per second)$0.0243</li><li>@720p (per second)$0.05148</li><li>@1080p (per second)$0.1224</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'bytedance/seedance-1-pro',
  {
    prompt:
      'A handcrafted mechanical watch rests on black volcanic stone as a narrow beam of morning light moves across its polished steel case, macro cinematography, slow orbiting camera, crisp reflections',
    aspect_ratio: '16:9',
    duration: 5,
    resolution: '720p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedance-1-pro",
  "input": {
    "prompt": "A handcrafted mechanical watch rests on black volcanic stone as a narrow beam of morning light moves across its polished steel case, macro cinematography, slow orbiting camera, crisp reflections",
    "aspect_ratio": "16:9",
    "duration": 5,
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-1-pro/product-film.mp4"
  }
}
```

## Examples

<details>

<summary>**Aerial Landscape** — Cinematic 1080p nature sequence with an aerial camera move</summary>



```ts
const response = await env.AI.run(
  'bytedance/seedance-1-pro',
  {
    prompt:
      'An aerial camera glides over a winding river through an autumn forest at dawn, low clouds drifting between amber trees, cinematic color grading, smooth forward movement',
    aspect_ratio: '16:9',
    duration: 5,
    resolution: '1080p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedance-1-pro",
  "input": {
    "prompt": "An aerial camera glides over a winding river through an autumn forest at dawn, low clouds drifting between amber trees, cinematic color grading, smooth forward movement",
    "aspect_ratio": "16:9",
    "duration": 5,
    "resolution": "1080p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-1-pro/aerial-landscape.mp4"
  }
}
```

</details>

<details>

<summary>**First Frame Animation** — Animate a still image as the first frame of the video</summary>



```ts
const response = await env.AI.run(
  'bytedance/seedance-1-pro',
  {
    image: 'https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg',
    prompt:
      'Steam rises gently from the cup while the camera slowly pushes in, soft afternoon window light, calm and natural movement',
    duration: 5,
    resolution: '720p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedance-1-pro",
  "input": {
    "image": "https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg",
    "prompt": "Steam rises gently from the cup while the camera slowly pushes in, soft afternoon window light, calm and natural movement",
    "duration": 5,
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-1-pro/first-frame-animation.mp4"
  }
}
```

</details>

<details>

<summary>**Vertical Fashion Editorial** — Vertical fashion editorial for social video formats</summary>



```ts
const response = await env.AI.run(
  'bytedance/seedance-1-pro',
  {
    prompt:
      'A fashion editor walks through a sunlit greenhouse in a flowing emerald dress, leaves sway in a soft breeze, editorial photography, subtle handheld camera motion',
    aspect_ratio: '9:16',
    duration: 5,
    resolution: '720p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedance-1-pro",
  "input": {
    "prompt": "A fashion editor walks through a sunlit greenhouse in a flowing emerald dress, leaves sway in a soft breeze, editorial photography, subtle handheld camera motion",
    "aspect_ratio": "9:16",
    "duration": 5,
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bytedance/seedance-1-pro/vertical-fashion-editorial.mp4"
  }
}
```

</details>

## Parameters

prompt

`string`requiredmaxLength: 10000Text prompt describing the video to generate

image

`string`Reference image (HTTP(S) URL or base64 data URI) for image-to-video

last\_frame\_image

`string`Reference image (HTTP(S) URL or base64 data URI) for last-frame guidance. Only works if an image start frame is also given.

duration

`integer`requireddefault: 5minimum: 4maximum: 12Video duration in seconds

resolution

`string`requireddefault: 720penum: 480p, 720p, 1080pVideo resolution

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 4:3, 1:1, 3:4, 9:16, 21:9, 9:21Video aspect ratio. Ignored if an image is used.

fps

`number`requireddefault: 24const: 24Frame rate (frames per second)

camera\_fixed

`boolean`requireddefault: falseWhether to fix camera position

watermark

`boolean`requireddefault: falseWhether to add a watermark to the output video

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Random seed for reproducible generation

use\_virtual\_avatar

`boolean`requireddefault: falseRoute image reference inputs (image, reference\_images, last\_frame\_image) through ByteDance's trusted virtual avatar asset library before generation. Intended for AI-generated/virtual character avatars that would otherwise be blocked by face or deepfake detection

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/bytedance/seedance-1-pro/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/bytedance/seedance-1-pro/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/bytedance/seedance-1-pro/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/bytedance/seedance-1-pro/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedance-1-pro/#page","headline":"Seedance 1.0 Pro","description":"ByteDance's first-generation cinematic video model. Generates 1080p video from text or images with strong prompt adherence, stable motion, and native multi-shot narrative coherence. Supports first/last-frame image-to-video and image references.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedance-1-pro/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
