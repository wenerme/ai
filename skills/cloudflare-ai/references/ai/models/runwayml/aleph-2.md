---
title: RunwayML Aleph 2
description: RunwayML's video editing model. Edit one frame to update your whole video, make changes across multiple shots, and work with up to 30 seconds of video. Supports keyframe-guided editing for precise control over specific moments in the clip.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![RunwayML logo](https://developers.cloudflare.com/_astro/runway.Cq8Cjov4.svg)

#  RunwayML Aleph 2

Text-to-Video • RunwayML

`runwayml/aleph-2`

RunwayML's video editing model. Edit one frame to update your whole video, make changes across multiple shots, and work with up to 30 seconds of video. Supports keyframe-guided editing for precise control over specific moments in the clip.

| Model Info        |                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Terms and License | [link ↗](https://runwayml.com/terms-of-use)                                                                        |
| More information  | [link ↗](https://runwayml.com/)                                                                                    |
| Pricing           | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/runwayml/aleph-2) |

## Usage

* [ TypeScript ](#tab-panel-2020)
* [ cURL ](#tab-panel-2021)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/aleph-2',
  {
    prompt: 'Transform the scene into a golden-hour sunset with warm lighting',
    video_uri: 'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/cinematic-scene.mp4',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/aleph-2",
  "input": {
    "prompt": "Transform the scene into a golden-hour sunset with warm lighting",
    "video_uri": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/cinematic-scene.mp4"
  }
}'
```

* [ Output ](#tab-panel-2018)
* [ Raw response ](#tab-panel-2019)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/7449093b-e574-41a5-8308-05e4692fa652.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Examples

**Keyframe-Guided Edit**  — Edit a video using a reference image anchored to the first frame of the output

* [ TypeScript ](#tab-panel-2028)
* [ cURL ](#tab-panel-2029)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/aleph-2',
  {
    prompt: 'Edit the video to match the provided reference frame',
    video_uri: 'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/nature-close-up.mp4',
    prompt_images: [
      {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg',
        position: 'first',
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/aleph-2",
  "input": {
    "prompt": "Edit the video to match the provided reference frame",
    "video_uri": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/nature-close-up.mp4",
    "prompt_images": [
      {
        "uri": "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg",
        "position": "first"
      }
    ]
  }
}'
```

* [ Output ](#tab-panel-2022)
* [ Raw response ](#tab-panel-2023)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/cd7388fe-09d6-4b16-afc5-24bb315eaf14.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Timed Keyframe Edit**  — Place a guidance image at a specific timestamp within the input video using keyframes\[\].seconds

* [ TypeScript ](#tab-panel-2030)
* [ cURL ](#tab-panel-2031)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/aleph-2',
  {
    prompt: 'Change the background to a futuristic cityscape at night',
    video_uri: 'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/simple-text-to-video.mp4',
    keyframes: [
      {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg',
        seconds: 2.0,
      },
    ],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/aleph-2",
  "input": {
    "prompt": "Change the background to a futuristic cityscape at night",
    "video_uri": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/simple-text-to-video.mp4",
    "keyframes": [
      {
        "uri": "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg",
        "seconds": 2.0
      }
    ]
  }
}'
```

* [ Output ](#tab-panel-2024)
* [ Raw response ](#tab-panel-2025)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/a7e054fa-1cf2-4265-a35c-518b8c4d6a1a.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

**Content Moderation Override**  — Edit a video featuring public figures with relaxed content moderation

* [ TypeScript ](#tab-panel-2032)
* [ cURL ](#tab-panel-2033)

**TypeScript**

```ts
const response = await env.AI.run(
  'runwayml/aleph-2',
  {
    prompt: 'Make the background a dramatic stormy sky',
    video_uri: 'https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/cinematic-scene.mp4',
    content_moderation: {
      public_figure_threshold: 'low',
    },
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "runwayml/aleph-2",
  "input": {
    "prompt": "Make the background a dramatic stormy sky",
    "video_uri": "https://pub-04a6d208d361438ea01b797e6973bd19.r2.dev/catalog/runwayml__gen-4.5/cinematic-scene.mp4",
    "content_moderation": {
      "public_figure_threshold": "low"
    }
  }
}'
```

* [ Output ](#tab-panel-2026)
* [ Raw response ](#tab-panel-2027)

```json
{
  "state": "Completed",
  "result": {
    "video": "https://dnznrvs05pmza.cloudfront.net/ea5b1ccd-3dd6-43c3-86e3-5ed720849e92.mp4"
  },
  "gatewayMetadata": {
    "keySource": "Unified"
  }
}
```

## Parameters

* [ Input ](#tab-panel-2034)
* [ Output ](#tab-panel-2035)

prompt

`string`requiredminLength: 1maxLength: 1000Text prompt describing the edit to apply to the input video

video\_uri

`string`requiredHTTPS URL, Runway URI, or data URI of the source video to edit (≤30 seconds)

▶keyframes\[\]

`array`minItems: 1maxItems: 5Timed guidance images placed at specific points in the input video. Each entry has a uri and either seconds (absolute timestamp) or at (fractional position). Up to 5.

▶prompt\_images\[\]

`array`minItems: 1maxItems: 5Image keyframes for guiding the edit at specific points in the output video. Up to 5.

seed

`integer`minimum: 0maximum: 4294967295Random seed for reproducible results

▶content\_moderation{}

`object`Settings that affect the behavior of the content moderation system

duration

`number`exclusiveMinimum: 0Duration of the source video in seconds. Used for billing only — not sent to RunwayML. Provide this so the gateway can compute per-second video cost accurately.

video

`string`format: uriURL to the edited video

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/ai/models/runwayml/aleph-2/schema-input.json "Open") [ ](https://developers.cloudflare.com/ai/models/runwayml/aleph-2/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/ai/models/runwayml/aleph-2/schema-output.json "Open") [ ](https://developers.cloudflare.com/ai/models/runwayml/aleph-2/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/runwayml/aleph-2/#page","headline":"RunwayML Aleph 2 (RunwayML) · Cloudflare AI docs · Cloudflare AI docs","description":"RunwayML's video editing model. Edit one frame to update your whole video, make changes across multiple shots, and work with up to 30 seconds of video. Supports keyframe-guided editing for precise control over specific moments in the clip.","url":"https://developers.cloudflare.com/ai/models/runwayml/aleph-2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
