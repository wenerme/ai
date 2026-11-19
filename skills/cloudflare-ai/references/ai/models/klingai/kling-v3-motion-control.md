---
description: Kling AI Motion Control 3.0 transfers a reference video's motion to a character image, generating 3–30 seconds when matching the video orientation or up to 10 seconds when matching the image orientation, with optional prompt guidance and 720p or 1080p output.
title: Kling v3 Motion Control
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Kling AI logo](https://developers.cloudflare.com/_astro/kling.CbZKRtvH.svg)

# Kling v3 Motion Control

video-to-video • Kling AI

Model ID

`klingai/kling-v3-motion-control` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Kling AI Motion Control 3.0 transfers a reference video's motion to a character image, generating 3–30 seconds when matching the video orientation or up to 10 seconds when matching the image orientation, with optional prompt guidance and 720p or 1080p output.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://klingai.com/terms) |
| More information | [link ↗](https://kling.ai/document-api/api/video/motion-control) |
| Pricing | <ul><li>Default (per second)$0.126</li><li>@720p (per second)$0.126</li><li>@1080p (per second)$0.168</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'klingai/kling-v3-motion-control',
  {
    audio: 'off',
    character_orientation: 'video',
    image_url:
      'https://p2-kling.klingai.com/kcdn/cdn-kcdn112452/kling-qa-test/35d77e27300cf5e8995704cd858d759c.png',
    prompt:
      "Keep the character's gray T-shirt and denim shorts while matching the dancer's fluid movements.",
    resolution: '720p',
    video_url: 'https://v4-kling.kechuangai.com/kcdn/cdn-kcdn112452/kling-qa-test/dance_10s.mp4',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "klingai/kling-v3-motion-control",
  "input": {
    "audio": "off",
    "character_orientation": "video",
    "image_url": "https://p2-kling.klingai.com/kcdn/cdn-kcdn112452/kling-qa-test/35d77e27300cf5e8995704cd858d759c.png",
    "prompt": "Keep the character'\''s gray T-shirt and denim shorts while matching the dancer'\''s fluid movements.",
    "resolution": "720p",
    "video_url": "https://v4-kling.kechuangai.com/kcdn/cdn-kcdn112452/kling-qa-test/dance_10s.mp4"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v3-motion-control/animate-a-character-from-motion.mp4"
  }
}
```

## Parameters

prompt

`string`maxLength: 2500Optional prompt for scene and background details

image\_url

`string`requiredformat: uriPublic URL of the character image (JPG or PNG)

video\_url

`string`requiredformat: uriPublic URL of the motion reference video (MP4 or MOV)

character\_orientation

`string`requireddefault: videoenum: video, imageMatch character orientation to the reference video or image

audio

`string`requireddefault: originalenum: original, offKeep the reference video audio or omit audio

resolution

`string`requireddefault: 720penum: 720p, 1080pGenerated video resolution

video

`string`URL to the generated video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v3-motion-control/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v3-motion-control/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v3-motion-control/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v3-motion-control/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/klingai/kling-v3-motion-control/#page","headline":"Kling v3 Motion Control","description":"Kling AI Motion Control 3.0 transfers a reference video's motion to a character image, generating 3–30 seconds when matching the video orientation or up to 10 seconds when matching the image orientation, with optional prompt guidance and 720p or 1080p output.","url":"https://developers.cloudflare.com/ai/models/klingai/kling-v3-motion-control/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
