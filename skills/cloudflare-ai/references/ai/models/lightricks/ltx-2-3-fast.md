---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Lightricks LTX-2.3 Fast is a low-cost video generation model for text-to-video and image-to-video, with synchronized audio, first-to-last frame control, portrait and landscape output up to 4K, and clips up to 20 seconds.
title: LTX-2.3 Fast
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

l

# LTX-2.3 Fast

Text-to-Video • lightricks

Model ID

`lightricks/ltx-2-3-fast` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Lightricks LTX-2.3 Fast is a low-cost video generation model for text-to-video and image-to-video, with synchronized audio, first-to-last frame control, portrait and landscape output up to 4K, and clips up to 20 seconds.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.ltx.io/models/ltx-2-3) |
| Pricing | <ul><li>@720p (per second)$0.03</li><li>@1080p (per second)$0.06</li><li>@2k (per second)$0.12</li><li>@4k (per second)$0.24</li><li>Default (per second)$0.03</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'lightricks/ltx-2-3-fast',
  {
    prompt: 'A paper boat drifting across a calm pond at sunrise',
    duration: 6,
    resolution: '1920x1080',
    fps: 24,
    generate_audio: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "lightricks/ltx-2-3-fast",
  "input": {
    "prompt": "A paper boat drifting across a calm pond at sunrise",
    "duration": 6,
    "resolution": "1920x1080",
    "fps": 24,
    "generate_audio": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/lightricks/ltx-2-3-fast/text-to-video.mp4"
  }
}
```

## Examples

<details>

<summary>**Image-to-Video** — Animate a still image into a short video</summary>



```ts
const response = await env.AI.run(
  'lightricks/ltx-2-3-fast',
  {
    prompt: 'The camera slowly pushes in while clouds drift past the tower',
    image_uri: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
    duration: 6,
    resolution: '1920x1080',
    fps: 24,
    generate_audio: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "lightricks/ltx-2-3-fast",
  "input": {
    "prompt": "The camera slowly pushes in while clouds drift past the tower",
    "image_uri": "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    "duration": 6,
    "resolution": "1920x1080",
    "fps": 24,
    "generate_audio": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/lightricks/ltx-2-3-fast/image-to-video.mp4"
  }
}
```

</details>

## Parameters

prompt

`string`requiredminLength: 1maxLength: 10000Text prompt describing the video

image\_uri

`string`format: uriHTTPS URI for the first frame

last\_frame\_uri

`string`format: uriHTTPS URI for the last frame

▶duration

`one of`required

resolution

`string`requireddefault: 1920x1080enum: 1280x720, 720x1280, 1920x1080, 1080x1920, 2560x1440, 1440x2560, 3840x2160, 2160x3840

▶fps

`one of`required

generate\_audio

`boolean`requireddefault: true

video

`string`format: uriURL to the generated video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/lightricks/ltx-2-3-fast/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/lightricks/ltx-2-3-fast/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/lightricks/ltx-2-3-fast/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/lightricks/ltx-2-3-fast/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/lightricks/ltx-2-3-fast/#page","headline":"LTX-2.3 Fast","description":"Lightricks LTX-2.3 Fast is a low-cost video generation model for text-to-video and image-to-video, with synchronized audio, first-to-last frame control, portrait and landscape output up to 4K, and clips up to 20 seconds.","url":"https://developers.cloudflare.com/ai/models/lightricks/ltx-2-3-fast/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
