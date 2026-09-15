---
description: High-performance multimodal video generation and editing model with conversational controls and generated audio.
title: Gemini Omni Flash 1.1
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Gemini Omni Flash 1.1

Text-to-Video • Google

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/google/gemini-omni-1.1-flash/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/gemini-omni-1.1-flash`

- Third-party

High-performance multimodal video generation and editing model with conversational controls and generated audio.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://ai.google.dev/gemini-api/terms) |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/gemini-omni-1.1-flash) |

## Usage

```ts
const response = await env.AI.run(
  'google/gemini-omni-1.1-flash',
  {
    text: 'A marble rolling fast on a chain reaction style track, continuous smooth shot.',
    aspect_ratio: '16:9',
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
  "model": "google/gemini-omni-1.1-flash",
  "input": {
    "text": "A marble rolling fast on a chain reaction style track, continuous smooth shot.",
    "aspect_ratio": "16:9",
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/google/gemini-omni-1.1-flash/text-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

<details>

<summary>**Portrait city** — Generate a portrait-format cinematic city scene</summary>



```ts
const response = await env.AI.run(
  'google/gemini-omni-1.1-flash',
  {
    text: 'A futuristic city with neon lights and flying cars, cinematic camera movement and atmospheric haze.',
    aspect_ratio: '9:16',
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
  "model": "google/gemini-omni-1.1-flash",
  "input": {
    "text": "A futuristic city with neon lights and flying cars, cinematic camera movement and atmospheric haze.",
    "aspect_ratio": "9:16",
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/google/gemini-omni-1.1-flash/portrait-city.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Mountain sunrise** — Generate a high-resolution landscape nature scene</summary>



```ts
const response = await env.AI.run(
  'google/gemini-omni-1.1-flash',
  {
    text: 'A drone shot flying over a mountain landscape at sunrise, golden light reflecting across a misty valley.',
    aspect_ratio: '16:9',
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
  "model": "google/gemini-omni-1.1-flash",
  "input": {
    "text": "A drone shot flying over a mountain landscape at sunrise, golden light reflecting across a misty valley.",
    "aspect_ratio": "16:9",
    "resolution": "1080p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/google/gemini-omni-1.1-flash/mountain-sunrise.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

<details>

<summary>**Chain reaction** — Generate a low-resolution landscape action scene</summary>



```ts
const response = await env.AI.run(
  'google/gemini-omni-1.1-flash',
  {
    text: 'A marble rolling quickly along a wooden track, knocking through a playful chain reaction in one continuous shot.',
    aspect_ratio: '16:9',
    resolution: '360p',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/gemini-omni-1.1-flash",
  "input": {
    "text": "A marble rolling quickly along a wooden track, knocking through a playful chain reaction in one continuous shot.",
    "aspect_ratio": "16:9",
    "resolution": "360p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/google/gemini-omni-1.1-flash/chain-reaction.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

</details>

## Parameters

text

`string`Text prompt or editing instruction

image

`string`First-frame or primary reference image

last\_frame

`string`Last-frame reference image

▶reference\_images\[]

`array`maxItems: 10

video

`string`Reference video for editing or extension

audio

`string`Reference audio input

previous\_interaction\_id

`string`

aspect\_ratio

`string`enum: 16:9, 9:16

resolution

`string`enum: 360p, 720p, 1080p, 4k

▶video

`one of`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/google/gemini-omni-1.1-flash/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-omni-1.1-flash/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/google/gemini-omni-1.1-flash/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/google/gemini-omni-1.1-flash/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/gemini-omni-1.1-flash/#page","headline":"Gemini Omni Flash 1.1 (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"High-performance multimodal video generation and editing model with conversational controls and generated audio.","url":"https://developers.cloudflare.com/ai/models/google/gemini-omni-1.1-flash/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
