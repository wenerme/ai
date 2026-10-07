---
description: Bria's video background removal replaces the background of a clip up to 60 seconds long with a solid color or with transparency. Transparent output needs the mov_proresks (ProRes) preset. Frame rate and audio are preserved, and the output resolution matches the input unless auto_zoom crops to the subject.
title: Video Remove Background 3.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

b

# Video Remove Background 3.0

video-to-video • bria

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/bria/v-rmbg-3.0/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`bria/v-rmbg-3.0`

- Third-party

Bria's video background removal replaces the background of a clip up to 60 seconds long with a solid color or with transparency. Transparent output needs the mov\_proresks (ProRes) preset. Frame rate and audio are preserved, and the output resolution matches the input unless auto\_zoom crops to the subject.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://bria.ai/terms-of-use) |
| More information | [link ↗](https://docs.bria.ai/video-editing/editing/remove-background) |
| Pricing | <ul><li>Default (per second)$0.0225</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'bria/v-rmbg-3.0',
  {
    video:
      'https://labs-assets.bria.ai/sandbox-example-inputs/5586521-uhd_3840_2160_25fps_original.mp4',
    background_color: 'White',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/v-rmbg-3.0",
  "input": {
    "video": "https://labs-assets.bria.ai/sandbox-example-inputs/5586521-uhd_3840_2160_25fps_original.mp4",
    "background_color": "White"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/bria/v-rmbg-3.0/white-background.mp4"
  }
}
```

## Parameters

video

`string`requiredformat: uriPublic URL of the input video: MP4, MOV, WEBM, AVI, or GIF, up to 60 seconds and 16000x16000.

background\_color

`string`enum: Transparent, Black, White, Gray, Red, Green, Blue, Yellow, Cyan, Magenta, OrangeColor that replaces the removed background; set it explicitly. Transparent needs the mov\_proresks preset: with any other preset Bria uses Black and returns a \`warning\`.

output\_container\_and\_codec

`string`enum: mp4\_h264, mp4\_h265, mov\_h265, mov\_proresksOutput container and codec. Default mp4\_h264. mov\_proresks (ProRes) is the preset that keeps transparency.

auto\_zoom

`boolean`Crop once to the subject for the whole video. Output resolution and aspect ratio may change, and processing is slower. Default false.

preserve\_audio

`boolean`Keep the input audio track. Default true.

spill\_suppression

`number`minimum: 0maximum: 1Strength of green-fringe removal for green-screen footage, from 0 (off) to 1. Default 0.

video

`string`format: uriURL of the processed video.

warning

`string`Present when Bria adjusted the request, such as a Transparent background with a preset that has no alpha channel.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/bria/v-rmbg-3.0/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/bria/v-rmbg-3.0/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/bria/v-rmbg-3.0/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/bria/v-rmbg-3.0/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bria/v-rmbg-3.0/#page","headline":"Video Remove Background 3.0","description":"Bria's video background removal replaces the background of a clip up to 60 seconds long with a solid color or with transparency. Transparent output needs the mov_proresks (ProRes) preset. Frame rate and audio are preserved, and the output resolution matches the input unless auto_zoom crops to the subject.","url":"https://developers.cloudflare.com/ai/models/bria/v-rmbg-3.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
