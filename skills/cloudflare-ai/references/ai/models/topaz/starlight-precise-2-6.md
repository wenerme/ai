---
description: Topaz Labs Starlight Precise 2.6 (slp-2.6) is a video enhancement model that upscales and restores low-quality source video to 1080p or 4K. The quality-focused variant of the Starlight family, prioritizing detail reconstruction over speed. Billed using provider-reported processing credits.
title: Starlight Precise 2.6
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

t

# Starlight Precise 2.6

video-to-video • topaz

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/topaz/starlight-precise-2-6/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`topaz/starlight-precise-2-6`

- Third-party

Topaz Labs Starlight Precise 2.6 (slp-2.6) is a video enhancement model that upscales and restores low-quality source video to 1080p or 4K. The quality-focused variant of the Starlight family, prioritizing detail reconstruction over speed. Billed using provider-reported processing credits.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://developer.topazlabs.com/) |
| Pricing | <ul><li>Per provider unit$0.12</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'topaz/starlight-precise-2-6',
  {
    frame_count: 45,
    frame_rate: 29.97,
    sharpness: 3,
    source_container: 'mp4',
    source_height: 360,
    source_width: 640,
    target_resolution: '1920x1080',
    video_uri:
      'https://replicate.delivery/pbxt/PetLEVcclEkT5H9A3tYETZyAMT5GE2Sa4m6sQqPDpj8vgHga/animatediff.B572L3lv.mp4',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "topaz/starlight-precise-2-6",
  "input": {
    "frame_count": 45,
    "frame_rate": 29.97,
    "sharpness": 3,
    "source_container": "mp4",
    "source_height": 360,
    "source_width": 640,
    "target_resolution": "1920x1080",
    "video_uri": "https://replicate.delivery/pbxt/PetLEVcclEkT5H9A3tYETZyAMT5GE2Sa4m6sQqPDpj8vgHga/animatediff.B572L3lv.mp4"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/topaz/starlight-precise-2-6/precise-video-enhancement.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

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

sharpness

`number`requireddefault: 5minimum: 1maximum: 5Amount of sharpening applied to the enhanced video

video

`string`format: uriURL to the enhanced video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/topaz/starlight-precise-2-6/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/topaz/starlight-precise-2-6/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/topaz/starlight-precise-2-6/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/topaz/starlight-precise-2-6/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/topaz/starlight-precise-2-6/#page","headline":"Starlight Precise 2.6","description":"Topaz Labs Starlight Precise 2.6 (slp-2.6) is a video enhancement model that upscales and restores low-quality source video to 1080p or 4K. The quality-focused variant of the Starlight family, prioritizing detail reconstruction over speed. Billed using provider-reported processing credits.","url":"https://developers.cloudflare.com/ai/models/topaz/starlight-precise-2-6/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
