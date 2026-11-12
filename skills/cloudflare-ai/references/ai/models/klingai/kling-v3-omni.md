---
description: Kling V3 Omni is Kling AI's multimodal video generation model supporting text-to-video with audio.
title: Kling v3 Omni
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Kling AI logo](https://developers.cloudflare.com/_astro/kling.CbZKRtvH.svg)

# Kling v3 Omni

Text-to-Video • Kling AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/klingai/kling-v3-omni/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`klingai/kling-v3-omni` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Kling V3 Omni is Kling AI's multimodal video generation model supporting text-to-video with audio.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://klingai.com/terms) |
| More information | [link ↗](https://klingai.com/) |
| Pricing | <ul><li>Default (per second)$0.113</li><li>default audio$0.145</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'klingai/kling-v3-omni',
  {
    prompt: 'A cat chasing a butterfly through a sunlit meadow of wildflowers',
    duration: 5,
    aspect_ratio: '16:9',
    sound: 'on',
  },
  {
    gateway: { id: 'default' },
  }
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "klingai/kling-v3-omni",
  "input": {
    "aspect_ratio": "16:9",
    "duration": 5,
    "prompt": "A cat chasing a butterfly through a sunlit meadow of wildflowers",
    "sound": "on"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v3-omni/simple-video.mp4"
  }
}
```

## Parameters

prompt

`string`requiredText prompt describing the video to generate

negative\_prompt

`string`Negative text prompt

image\_input

`string`Base64-encoded reference image for i2v

duration

`integer`requireddefault: 5minimum: 3maximum: 15Video duration in seconds

aspect\_ratio

`string`requireddefault: 16:9enum: 16:9, 9:16, 1:1Video aspect ratio

sound

`string`requireddefault: onenum: on, offWhether to generate sound with the video

video

`string`URL to the generated video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v3-omni/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v3-omni/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v3-omni/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v3-omni/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/klingai/kling-v3-omni/#page","headline":"Kling v3 Omni","description":"Kling V3 Omni is Kling AI's multimodal video generation model supporting text-to-video with audio.","url":"https://developers.cloudflare.com/ai/models/klingai/kling-v3-omni/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
