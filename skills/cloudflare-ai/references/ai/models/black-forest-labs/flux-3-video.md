---
description: FLUX 3 Video is Black Forest Labs' video generation model. It generates video from a text prompt (t2v), animates one or more reference images (i2v), or continues an existing clip (v2v), with synchronized audio, up to fhd resolution, and 5-20 second durations.
title: FLUX 3 Video
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Black Forest Labs logo](https://developers.cloudflare.com/_astro/blackforestlabs.Ccs-Y4-D.svg)

# FLUX 3 Video

Text-to-Video • Black Forest Labs

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`black-forest-labs/flux-3-video`

- Third-party

FLUX 3 Video is Black Forest Labs' video generation model. It generates video from a text prompt (t2v), animates one or more reference images (i2v), or continues an existing clip (v2v), with synchronized audio, up to fhd resolution, and 5-20 second durations.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/) |
| More information | [link ↗](https://blackforestlabs.ai/) |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-3-video) |

## Usage

```ts
const response = await env.AI.run(
  'black-forest-labs/flux-3-video',
  {
    mode: 't2v',
    prompt:
      'A cozy ramen shop on a rainy Tokyo night, steam rising from the broth. Rain patter and quiet kitchen sounds.',
    resolution: 'hd',
    duration: 5,
    generate_audio: true,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "black-forest-labs/flux-3-video",
  "input": {
    "mode": "t2v",
    "prompt": "A cozy ramen shop on a rainy Tokyo night, steam rising from the broth. Rain patter and quiet kitchen sounds.",
    "resolution": "hd",
    "duration": 5,
    "generate_audio": true
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/black-forest-labs/flux-3-video/text-to-video.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

▶Option 1{}

object

▶Option 2{}

object

▶Option 3{}

object

video

`string`format: uriSigned URL to the generated mp4 (24fps, with audio by default). Expires \~2 hours after ready — download promptly.

draft\_cache

`string`Draft-mode cache bundle URL, only present for draft: true requests.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/#page","headline":"FLUX 3 Video","description":"FLUX 3 Video is Black Forest Labs' video generation model. It generates video from a text prompt (t2v), animates one or more reference images (i2v), or continues an existing clip (v2v), with synchronized audio, up to fhd resolution, and 5-20 second durations.","url":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
