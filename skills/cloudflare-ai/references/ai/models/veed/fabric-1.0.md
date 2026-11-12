---
description: VEED Fabric 1.0 generates a talking video by lip-syncing a source image to a driving audio clip.
title: VEED Fabric 1.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

v

# VEED Fabric 1.0

Image-to-Video • veed

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/veed/fabric-1.0/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`veed/fabric-1.0` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

VEED Fabric 1.0 generates a talking video by lip-syncing a source image to a driving audio clip.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://fal.ai/models/veed/fabric-1.0) |
| Pricing | <ul><li>@480p (per second)$0.08</li><li>@720p (per second)$0.15</li><li>Default (per second)$0.15</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'veed/fabric-1.0',
  {
    image_url: 'https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png',
    audio_url: 'https://v3.fal.media/files/elephant/Oz_g4AwQvXtXpUHL3Pa7u_Hope.mp3',
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
  "model": "veed/fabric-1.0",
  "input": {
    "image_url": "https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png",
    "audio_url": "https://v3.fal.media/files/elephant/Oz_g4AwQvXtXpUHL3Pa7u_Hope.mp3",
    "resolution": "720p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/veed__fabric-1.0/talking-portrait.mp4"
  },
  "state": "Completed"
}
```

## Examples

<details>

<summary>**Lower Resolution** — Same prompt at 480p for faster, cheaper generations.</summary>



```ts
const response = await env.AI.run(
  'veed/fabric-1.0',
  {
    image_url: 'https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png',
    audio_url: 'https://v3.fal.media/files/elephant/Oz_g4AwQvXtXpUHL3Pa7u_Hope.mp3',
    resolution: '480p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "veed/fabric-1.0",
  "input": {
    "image_url": "https://v3.fal.media/files/koala/NLVPfOI4XL1cWT2PmmqT3_Hope.png",
    "audio_url": "https://v3.fal.media/files/elephant/Oz_g4AwQvXtXpUHL3Pa7u_Hope.mp3",
    "resolution": "480p"
  }
}'
```

```json
{
  "gatewayMetadata": {
    "keySource": "BYOK"
  },
  "result": {
    "video": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/veed__fabric-1.0/lower-resolution.mp4"
  },
  "state": "Completed"
}
```

</details>

## Parameters

image\_url

`string`requiredURL of the source image. Accepts a publicly reachable HTTP(S) URL or a base64 data URI (data:image/...;base64,...).

audio\_url

`string`requiredURL of the driving audio. Accepts a publicly reachable HTTP(S) URL or a base64 data URI (data:audio/...;base64,...).

resolution

`string`requireddefault: 720penum: 480p, 720pResolution of the generated video.

video

`string`format: uriPresigned URL for the generated lipsync video.

duration

`number`Duration of the generated video in seconds, when reported by the provider.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/veed/fabric-1.0/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/veed/fabric-1.0/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/veed/fabric-1.0/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/veed/fabric-1.0/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/veed/fabric-1.0/#page","headline":"VEED Fabric 1.0","description":"VEED Fabric 1.0 generates a talking video by lip-syncing a source image to a driving audio clip.","url":"https://developers.cloudflare.com/ai/models/veed/fabric-1.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
