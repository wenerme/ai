---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Topaz Labs Proteus 4 (prob-4) is a general-purpose precision video enhancer that upscales, denoises and sharpens low to medium quality footage to 1080p or 4K without generating new detail. It is Topaz's recommended default model and costs far less than the generative Starlight models.
title: Proteus 4
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Proteus 4

video-to-video • topaz

Model ID

`topaz/proteus-4` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Topaz Labs Proteus 4 (prob-4) is a general-purpose precision video enhancer that upscales, denoises and sharpens low to medium quality footage to 1080p or 4K without generating new detail. It is Topaz's recommended default model and costs far less than the generative Starlight models.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://developer.topazlabs.com/video-models/upscaling-and-enhancement/precision/proteus) |
| Pricing | <ul><li>Per provider unit$0.12</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'topaz/proteus-4',
  {
    frame_count: 150,
    frame_rate: 29.97,
    source_container: 'mp4',
    source_height: 360,
    source_width: 640,
    video_uri:
      'https://replicate.delivery/pbxt/PetLEVcclEkT5H9A3tYETZyAMT5GE2Sa4m6sQqPDpj8vgHga/animatediff.B572L3lv.mp4',
    target_resolution: '1920x1080',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "topaz/proteus-4",
  "input": {
    "frame_count": 150,
    "frame_rate": 29.97,
    "source_container": "mp4",
    "source_height": 360,
    "source_width": 640,
    "video_uri": "https://replicate.delivery/pbxt/PetLEVcclEkT5H9A3tYETZyAMT5GE2Sa4m6sQqPDpj8vgHga/animatediff.B572L3lv.mp4",
    "target_resolution": "1920x1080"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/topaz/proteus-4/upscale-to-1080p.mp4"
  }
}
```

## Examples

<details>

<summary>**4K with Manual Clean-Up** — Upscale to 4K and set the noise, compression-artifact and detail values yourself.</summary>



```ts
const response = await env.AI.run(
  'topaz/proteus-4',
  {
    frame_count: 150,
    frame_rate: 29.97,
    source_container: 'mp4',
    source_height: 360,
    source_width: 640,
    video_uri:
      'https://replicate.delivery/pbxt/PetLEVcclEkT5H9A3tYETZyAMT5GE2Sa4m6sQqPDpj8vgHga/animatediff.B572L3lv.mp4',
    target_resolution: '3840x2160',
    parameter_mode: 'Manual',
    noise: 0.3,
    compression: 0.4,
    details: 0.2,
    blur: 0.1,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "topaz/proteus-4",
  "input": {
    "frame_count": 150,
    "frame_rate": 29.97,
    "source_container": "mp4",
    "source_height": 360,
    "source_width": 640,
    "video_uri": "https://replicate.delivery/pbxt/PetLEVcclEkT5H9A3tYETZyAMT5GE2Sa4m6sQqPDpj8vgHga/animatediff.B572L3lv.mp4",
    "target_resolution": "3840x2160",
    "parameter_mode": "Manual",
    "noise": 0.3,
    "compression": 0.4,
    "details": 0.2,
    "blur": 0.1
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/topaz/proteus-4/4k-with-manual-clean-up.mp4"
  }
}
```

</details>

## Parameters

video\_uri

`string`requiredformat: uriHTTPS URI of the source video to enhance

source\_container

`string`requiredenum: 3gp, avi, dv, flv, m1v, m2t, m2ts, m2v, m4v, mkv, mov, mp4, mpeg, mpg, mts, mxf, ser, ts, vob, webm, wmvContainer format of the source video

source\_width

`integer`requiredexclusiveMinimum: 0maximum: 9007199254740991Width of the source video in pixels

source\_height

`integer`requiredexclusiveMinimum: 0maximum: 9007199254740991Height of the source video in pixels

frame\_count

`integer`requiredexclusiveMinimum: 0maximum: 9007199254740991Total frame count of the source video (used by Topaz for credit estimation)

frame\_rate

`number`requiredexclusiveMinimum: 0Frame rate of the source video in frames per second (e.g. 29.97)

target\_resolution

`string`requireddefault: 1920x1080enum: 1920x1080, 3840x2160Target output resolution

parameter\_mode

`string`enum: Auto, Manual, Relative"Auto" estimates every value, "Relative" nudges the estimates by the amounts you send, "Manual" uses your values as they are.

compression

`number`minimum: -1maximum: 1Strength of compression artifact recovery, from -1 to 1. Estimated if omitted.

details

`number`minimum: -1maximum: 1Amount of detail reconstruction, from -1 to 1. Estimated if omitted.

noise

`number`minimum: -1maximum: 1Amount of noise reduction, from -1 to 1. Estimated if omitted.

halo

`number`minimum: -1maximum: 1Amount of halo reduction, from -1 to 1. Estimated if omitted.

preblur

`number`minimum: -1maximum: 1Anti-aliasing and deblurring strength, from -1 to 1. Estimated if omitted.

blur

`number`minimum: -1maximum: 1Amount of sharpening, from -1 to 1. Estimated if omitted.

video

`string`format: uriURL to the enhanced video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/topaz/proteus-4/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/topaz/proteus-4/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/topaz/proteus-4/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/topaz/proteus-4/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/topaz/proteus-4/#page","headline":"Proteus 4","description":"Topaz Labs Proteus 4 (prob-4) is a general-purpose precision video enhancer that upscales, denoises and sharpens low to medium quality footage to 1080p or 4K without generating new detail. It is Topaz's recommended default model and costs far less than the generative Starlight models.","url":"https://developers.cloudflare.com/ai/models/topaz/proteus-4/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
