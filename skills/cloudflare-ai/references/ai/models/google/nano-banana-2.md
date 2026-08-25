---
description: Google's second-generation image generation model with improved quality and speed.
title: Nano Banana 2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Nano Banana 2

Text-to-Image • Google

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/google/nano-banana-2/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`google/nano-banana-2`

* Third-party
* Zero data retention

Google's second-generation image generation model with improved quality and speed.

| Model Info          |                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Terms and License   | [link ↗](https://ai.google.dev/gemini-api/terms)                                                                       |
| More information    | [link ↗](https://deepmind.google/technologies/imagen/)                                                                 |
| Zero data retention | Yes                                                                                                                    |
| Pricing             | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/google/nano-banana-2) |

## Usage

```ts
const response = await env.AI.run(
  'google/nano-banana-2',
  {
    prompt:
      'A futuristic cyberpunk city at night with towering skyscrapers, neon signs in Japanese and English, flying cars, and rain-slicked streets reflecting colorful lights',
    aspect_ratio: '16:9',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-2",
  "input": {
    "prompt": "A futuristic cyberpunk city at night with towering skyscrapers, neon signs in Japanese and English, flying cars, and rain-slicked streets reflecting colorful lights",
    "aspect_ratio": "16:9"
  }
}'
```

![Futuristic City](https://examples.aig.cloudflare.com/google/nano-banana-2/futuristic-city.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2/futuristic-city.png"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Abstract Art** — Modern abstract expressionist painting

```ts
const response = await env.AI.run(
  'google/nano-banana-2',
  {
    prompt:
      'An abstract expressionist painting with bold splashes of cobalt blue, crimson red, and gold leaf accents on a large canvas',
    aspect_ratio: '1:1',
    output_format: 'png',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-2",
  "input": {
    "prompt": "An abstract expressionist painting with bold splashes of cobalt blue, crimson red, and gold leaf accents on a large canvas",
    "aspect_ratio": "1:1",
    "output_format": "png"
  }
}'
```

![Abstract Art](https://examples.aig.cloudflare.com/google/nano-banana-2/abstract-art.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2/abstract-art.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**With Google Search** — Use web search grounding for current events

```ts
const response = await env.AI.run(
  'google/nano-banana-2',
  {
    prompt: 'An illustration of the latest Mars rover exploring the Martian surface',
    aspect_ratio: '16:9',
    google_search: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-2",
  "input": {
    "prompt": "An illustration of the latest Mars rover exploring the Martian surface",
    "aspect_ratio": "16:9",
    "google_search": true
  }
}'
```

![With Google Search](https://examples.aig.cloudflare.com/google/nano-banana-2/with-google-search.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2/with-google-search.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**High Resolution Portrait** — 4K portrait with specific aspect ratio

```ts
const response = await env.AI.run(
  'google/nano-banana-2',
  {
    prompt:
      'A professional studio portrait of a woman with dramatic side lighting, wearing elegant jewelry',
    aspect_ratio: '3:4',
    output_format: 'jpg',
    resolution: '4K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/nano-banana-2",
  "input": {
    "prompt": "A professional studio portrait of a woman with dramatic side lighting, wearing elegant jewelry",
    "aspect_ratio": "3:4",
    "output_format": "jpg",
    "resolution": "4K"
  }
}'
```

![High Resolution Portrait](https://examples.aig.cloudflare.com/google/nano-banana-2/high-resolution-portrait.jpg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/google/nano-banana-2/high-resolution-portrait.jpg"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

prompt

`string`required

▶image\_input\[\]

`array`maxItems: 3

aspect\_ratio

`string`enum: match\_input\_image, 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

output\_format

`string`enum: jpg, png

resolution

`string`enum: 1K, 2K, 4K

google\_search

`boolean`

image\_search

`boolean`

image

`string`format: uri

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/nano-banana-2/#page","headline":"Nano Banana 2 (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Google's second-generation image generation model with improved quality and speed.","url":"https://developers.cloudflare.com/ai/models/google/nano-banana-2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
