---
description: Kling 4.0 Flash is Kling AI's fast text-to-video model, producing 3 to 20 seconds of 720p video from prompts of up to 26,000 characters.
title: Kling 4.0 Flash
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Kling AI logo](https://developers.cloudflare.com/_astro/kling.CbZKRtvH.svg)

# Kling 4.0 Flash

Text-to-Video • Kling AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/klingai/kling-v4-flash/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Model ID

`klingai/kling-v4-flash` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Kling 4.0 Flash is Kling AI's fast text-to-video model, producing 3 to 20 seconds of 720p video from prompts of up to 26,000 characters.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://klingai.com/terms) |
| More information | [link ↗](https://klingai.com/) |
| Pricing | <ul><li>@720p (per second)$0.094</li><li>Default (per second)$0.094</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'klingai/kling-v4-flash',
  {
    aspect_ratio: '16:9',
    duration: 5,
    prompt:
      'A paper boat drifts down a narrow, rain-soaked Tokyo alley at night. Neon signs in pink and teal reflect in the puddles and ripple as raindrops fall. The camera tracks low alongside the boat, close to the water. Cinematic, photorealistic, shallow depth of field.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "klingai/kling-v4-flash",
  "input": {
    "aspect_ratio": "16:9",
    "duration": 5,
    "prompt": "A paper boat drifts down a narrow, rain-soaked Tokyo alley at night. Neon signs in pink and teal reflect in the puddles and ripple as raindrops fall. The camera tracks low alongside the boat, close to the water. Cinematic, photorealistic, shallow depth of field."
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v4-flash/neon-alley-paper-boat.mp4"
  }
}
```

## Examples

<details>

<summary>**Latte Art Close-Up** — Vertical 9:16 video for mobile and social feeds</summary>



```ts
const response = await env.AI.run(
  'klingai/kling-v4-flash',
  {
    aspect_ratio: '9:16',
    duration: 5,
    prompt:
      'A barista pours steamed milk into a latte in slow motion, forming a heart. Warm morning light streams through a café window behind her. The camera starts on the cup and slowly tilts up to her smile. Cozy, realistic, soft focus background.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "klingai/kling-v4-flash",
  "input": {
    "aspect_ratio": "9:16",
    "duration": 5,
    "prompt": "A barista pours steamed milk into a latte in slow motion, forming a heart. Warm morning light streams through a café window behind her. The camera starts on the cup and slowly tilts up to her smile. Cozy, realistic, soft focus background."
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v4-flash/latte-art-close-up.mp4"
  }
}
```

</details>

## Parameters

prompt

`string`requiredminLength: 1maxLength: 26000Text prompt describing the video: scene, actions, camera movement, and style. Up to 26,000 English characters, or 11,000 non-English characters.

duration

`integer`requireddefault: 5minimum: 3maximum: 20Video duration in seconds

aspect\_ratio

`string`requireddefault: 16:9enum: 21:9, 16:9, 9:16, 1:1Video aspect ratio

resolution

`string`requireddefault: 720penum: 720pOutput resolution

video

`string`URL to the generated video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v4-flash/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v4-flash/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v4-flash/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v4-flash/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/klingai/kling-v4-flash/#page","headline":"Kling 4.0 Flash","description":"Kling 4.0 Flash is Kling AI's fast text-to-video model, producing 3 to 20 seconds of 720p video from prompts of up to 26,000 characters.","url":"https://developers.cloudflare.com/ai/models/klingai/kling-v4-flash/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
