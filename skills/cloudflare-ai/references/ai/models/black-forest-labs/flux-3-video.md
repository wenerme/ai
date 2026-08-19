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

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`black-forest-labs/flux-3-video`

* Third-party

FLUX 3 Video is Black Forest Labs' video generation model. It generates video from a text prompt (t2v), animates one or more reference images (i2v), or continues an existing clip (v2v), with synchronized audio, up to fhd resolution, and 5-20 second durations.

| Model Info        |                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Terms and License | [link ↗](https://blackforestlabs.ai/terms-of-service/)                                                                           |
| More information  | [link ↗](https://blackforestlabs.ai/)                                                                                            |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/black-forest-labs/flux-3-video) |

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

Schema variant

Text to VideoImage to VideoVideo Continuation

mode

`string`requiredconst: t2v

prompt

`string`requiredminLength: 1Free-form prompt describing the video.

aspect\_ratio

`string`enum: auto, 21:9, 2:1, 16:9, 4:3, 1:1, 3:4, 9:16Output aspect ratio. \`auto\` (default) picks one from the prompt and any references.

▶duration

`one of`

resolution

`string`enum: hd, fhd\`hd\` (default) or \`fhd\` for a higher-resolution result finished by the video upsampler.

generate\_audio

`boolean`Generate synchronized audio alongside the video. Defaults to true.

safety\_tolerance

`integer`minimum: 0maximum: 4Tolerance for input/output harm moderation, 0 (strictest) to 4\. Defaults to 2\. Sexual content is capped at level 3 and hate content at level 2 regardless of the requested tolerance; requests with conditioning media are capped at level 2.

draft

`boolean`Generate a fast, low-cost preview instead of a final render, at a reduced flat price. Only available at hd resolution.

mode

`string`requiredconst: i2v

prompt

`string`requiredminLength: 1Free-form prompt describing the video.

▶keyframes

`one of`required

aspect\_ratio

`string`enum: auto, 21:9, 2:1, 16:9, 4:3, 1:1, 3:4, 9:16Output aspect ratio. \`auto\` (default) picks one from the prompt and any references.

▶duration

`one of`

resolution

`string`enum: hd, fhd\`hd\` (default) or \`fhd\` for a higher-resolution result finished by the video upsampler.

generate\_audio

`boolean`Generate synchronized audio alongside the video. Defaults to true.

safety\_tolerance

`integer`minimum: 0maximum: 4Tolerance for input/output harm moderation, 0 (strictest) to 4\. Defaults to 2\. Sexual content is capped at level 3 and hate content at level 2 regardless of the requested tolerance; requests with conditioning media are capped at level 2.

draft

`boolean`Generate a fast, low-cost preview instead of a final render, at a reduced flat price. Only available at hd resolution.

mode

`string`requiredconst: v2v

prompt

`string`requiredminLength: 1Free-form prompt describing the video.

start\_video

`string`requiredThe video to continue: an HTTPS URL or base64 mp4 (<= 50MB, <= 15s). The generated clip carries on from its final frames.

aspect\_ratio

`string`enum: auto, 21:9, 2:1, 16:9, 4:3, 1:1, 3:4, 9:16Output aspect ratio. \`auto\` (default) picks one from the prompt and any references.

▶duration

`one of`

resolution

`string`enum: hd, fhd\`hd\` (default) or \`fhd\` for a higher-resolution result finished by the video upsampler.

generate\_audio

`boolean`Generate synchronized audio alongside the video. Defaults to true.

safety\_tolerance

`integer`minimum: 0maximum: 4Tolerance for input/output harm moderation, 0 (strictest) to 4\. Defaults to 2\. Sexual content is capped at level 3 and hate content at level 2 regardless of the requested tolerance; requests with conditioning media are capped at level 2.

draft

`boolean`Generate a fast, low-cost preview instead of a final render, at a reduced flat price. Only available at hd resolution.

video

`string`format: uriSigned URL to the generated mp4 (24fps, with audio by default). Expires \~2 hours after ready — download promptly.

draft\_cache

`string`Draft-mode cache bundle URL, only present for draft: true requests.

video

`string`format: uriSigned URL to the generated mp4 (24fps, with audio by default). Expires \~2 hours after ready — download promptly.

draft\_cache

`string`Draft-mode cache bundle URL, only present for draft: true requests.

video

`string`format: uriSigned URL to the generated mp4 (24fps, with audio by default). Expires \~2 hours after ready — download promptly.

draft\_cache

`string`Draft-mode cache bundle URL, only present for draft: true requests.

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/#page","headline":"FLUX 3 Video (Black Forest Labs) · Cloudflare AI docs · Cloudflare AI docs","description":"FLUX 3 Video is Black Forest Labs' video generation model. It generates video from a text prompt (t2v), animates one or more reference images (i2v), or continues an existing clip (v2v), with synchronized audio, up to fhd resolution, and 5-20 second durations.","url":"https://developers.cloudflare.com/ai/models/black-forest-labs/flux-3-video/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
