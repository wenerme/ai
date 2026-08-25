---
description: xAI's video generation model. Generates, edits, and extends videos from text and image inputs with native synchronized audio including dialogue, sound effects, and music. Supports multiple creative modes (normal, fun, custom).
title: Grok Imagine Video
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![xAI logo](https://developers.cloudflare.com/_astro/xai.2Y8IhZGx.svg)

# Grok Imagine Video

Text-to-Video • xAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/xai/grok-imagine-video/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`xai/grok-imagine-video`

* Third-party
* Zero data retention

xAI's video generation model. Generates, edits, and extends videos from text and image inputs with native synchronized audio including dialogue, sound effects, and music. Supports multiple creative modes (normal, fun, custom).

| Model Info          |                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terms and License   | [link ↗](https://x.ai/legal/terms-of-service)                                                                            |
| More information    | [link ↗](https://docs.x.ai/developers/models/grok-imagine-video)                                                         |
| Zero data retention | Yes                                                                                                                      |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/xai/grok-imagine-video) |

## Usage

```ts
const response = await env.AI.run(
  'xai/grok-imagine-video',
  {
    prompt: 'A golden retriever running through a field of sunflowers on a sunny day',
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
  "model": "xai/grok-imagine-video",
  "input": {
    "prompt": "A golden retriever running through a field of sunflowers on a sunny day",
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
    "video": "https://examples.aig.cloudflare.com/xai/grok-imagine-video/simple-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Portrait Video** — Vertical video for social media

```ts
const response = await env.AI.run(
  'xai/grok-imagine-video',
  {
    prompt: 'Slow-motion close-up of ink drops blooming through water against a black background',
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
  "model": "xai/grok-imagine-video",
  "input": {
    "prompt": "Slow-motion close-up of ink drops blooming through water against a black background",
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
    "video": "https://examples.aig.cloudflare.com/xai/grok-imagine-video/portrait-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Cinematic Landscape** — Widescreen cinematic shot at extended duration

```ts
const response = await env.AI.run(
  'xai/grok-imagine-video',
  {
    prompt:
      'A wide drone shot over snow-covered mountain peaks at sunrise, dramatic lighting with low clouds',
    aspect_ratio: '16:9',
    duration: 10,
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
  "model": "xai/grok-imagine-video",
  "input": {
    "prompt": "A wide drone shot over snow-covered mountain peaks at sunrise, dramatic lighting with low clouds",
    "aspect_ratio": "16:9",
    "duration": 10,
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/xai/grok-imagine-video/cinematic-landscape.mp4"
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

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-video/#page","headline":"Grok Imagine Video (xAI) · Cloudflare AI docs · Cloudflare AI docs","description":"xAI's video generation model. Generates, edits, and extends videos from text and image inputs with native synchronized audio including dialogue, sound effects, and music. Supports multiple creative modes (normal, fun, custom).","url":"https://developers.cloudflare.com/ai/models/xai/grok-imagine-video/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
