---
description: Kling 4.0 is Kling AI's video generation model for text-to-video and multi-keyframe image-to-video, producing up to 30 seconds of 720p or 1080p video from prompts of up to 26,000 characters and up to 10 keyframes.
title: Kling 4.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Kling AI logo](https://developers.cloudflare.com/_astro/kling.CbZKRtvH.svg)

# Kling 4.0

Text-to-Video • Kling AI

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/klingai/kling-v4/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`klingai/kling-v4`

- Third-party

Kling 4.0 is Kling AI's video generation model for text-to-video and multi-keyframe image-to-video, producing up to 30 seconds of 720p or 1080p video from prompts of up to 26,000 characters and up to 10 keyframes.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://klingai.com/terms) |
| More information | [link ↗](https://klingai.com/) |
| Pricing | <ul><li>Default (per second)$0.235</li><li>@720p (per second)$0.157</li><li>@1080p (per second)$0.235</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'klingai/kling-v4',
  {
    aspect_ratio: '16:9',
    duration: 5,
    prompt:
      'A paper boat drifts down a narrow, rain-soaked Tokyo alley at night. Neon signs in pink and teal reflect in the puddles and ripple as raindrops fall. The camera tracks low alongside the boat, close to the water. Cinematic, photorealistic, shallow depth of field.',
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
  "model": "klingai/kling-v4",
  "input": {
    "aspect_ratio": "16:9",
    "duration": 5,
    "prompt": "A paper boat drifts down a narrow, rain-soaked Tokyo alley at night. Neon signs in pink and teal reflect in the puddles and ripple as raindrops fall. The camera tracks low alongside the boat, close to the water. Cinematic, photorealistic, shallow depth of field.",
    "resolution": "1080p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v4/neon-alley-paper-boat.mp4"
  }
}
```

## Examples

<details>

<summary>**Ultra-Wide Canyon Sunrise** — Ultra-wide 21:9 text-to-video, an aspect ratio new in Kling 4.0</summary>



```ts
const response = await env.AI.run(
  'klingai/kling-v4',
  {
    aspect_ratio: '21:9',
    duration: 8,
    prompt:
      'A sweeping aerial shot glides over a red sandstone canyon at sunrise. Long shadows stretch across the canyon floor as a river catches the first golden light. The camera slowly pushes forward and rises to reveal the desert horizon. Epic cinematic landscape, anamorphic look.',
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
  "model": "klingai/kling-v4",
  "input": {
    "aspect_ratio": "21:9",
    "duration": 8,
    "prompt": "A sweeping aerial shot glides over a red sandstone canyon at sunrise. Long shadows stretch across the canyon floor as a river catches the first golden light. The camera slowly pushes forward and rises to reveal the desert horizon. Epic cinematic landscape, anamorphic look.",
    "resolution": "720p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v4/ultra-wide-canyon-sunrise.mp4"
  }
}
```

</details>

<details>

<summary>**Sketch to Product Reveal** — Image-to-video from one first frame: a pencil concept sketch becomes a photoreal product shot</summary>



```ts
const response = await env.AI.run(
  'klingai/kling-v4',
  {
    prompt:
      'The pencil sneaker sketch in @image_1 comes to life. The graphite lines fill in with real materials: white leather, a perforated toe box, an orange suede heel panel, a translucent cushioned sole. The sneaker lifts off the sketchbook page and settles onto a slowly rotating white studio turntable as the paper fades into a soft grey seamless backdrop. Studio softbox lighting, crisp reflections, macro detail on the stitching. Smooth, continuous camera orbit.',
    first_frame: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/sneaker-sketch.jpg',
    duration: 10,
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
  "model": "klingai/kling-v4",
  "input": {
    "prompt": "The pencil sneaker sketch in @image_1 comes to life. The graphite lines fill in with real materials: white leather, a perforated toe box, an orange suede heel panel, a translucent cushioned sole. The sneaker lifts off the sketchbook page and settles onto a slowly rotating white studio turntable as the paper fades into a soft grey seamless backdrop. Studio softbox lighting, crisp reflections, macro detail on the stitching. Smooth, continuous camera orbit.",
    "first_frame": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/sneaker-sketch.jpg",
    "duration": 10,
    "resolution": "1080p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v4/sketch-to-product-reveal.mp4"
  }
}
```

</details>

<details>

<summary>**Mascot Hops Off the Page** — One continuous shot through three keyframes (first, middle, last), with each keyframe referenced in the prompt</summary>



```ts
const response = await env.AI.run(
  'klingai/kling-v4',
  {
    prompt:
      'A flat illustrated robot mascot printed on a notebook page wakes up. In @image_1 it is flat ink on the paper; it blinks, its antenna wiggles, and it peels itself up off the page into a glossy 3D toy. In @image_2 it stands on the page beside its own faded print, knees bent, mid-hop. By @image_3 it has hopped onto the wooden desk next to the coffee mug and waves at the camera. Warm morning sunlight, shallow depth of field, playful stop-motion feel, one continuous shot with a fixed camera.',
    first_frame: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-page.jpg',
    middle_frames: ['https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-hop.jpg'],
    last_frame: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-desk.jpg',
    duration: 15,
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
  "model": "klingai/kling-v4",
  "input": {
    "prompt": "A flat illustrated robot mascot printed on a notebook page wakes up. In @image_1 it is flat ink on the paper; it blinks, its antenna wiggles, and it peels itself up off the page into a glossy 3D toy. In @image_2 it stands on the page beside its own faded print, knees bent, mid-hop. By @image_3 it has hopped onto the wooden desk next to the coffee mug and waves at the camera. Warm morning sunlight, shallow depth of field, playful stop-motion feel, one continuous shot with a fixed camera.",
    "first_frame": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-page.jpg",
    "middle_frames": [
      "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-hop.jpg"
    ],
    "last_frame": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-desk.jpg",
    "duration": 15,
    "resolution": "1080p"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "video": "https://examples.aig.cloudflare.com/klingai/kling-v4/mascot-hops-off-the-page.mp4"
  }
}
```

</details>

## Parameters

prompt

`string`requiredminLength: 1maxLength: 26000Text prompt describing the video, up to 26,000 English characters. Refer to keyframes as @image\_1, @image\_2, and so on, numbered first frame, middle frames, then last frame.

first\_frame

`string`minLength: 1Image the video starts from. An https URL, a data URI, or raw base64 (JPG or PNG, up to 30 MB, at least 300 px per side, aspect ratio between 2:5 and 5:2)

▶middle\_frames\[]

`array`maxItems: 9Keyframes the video passes through, in order

last\_frame

`string`minLength: 1Image the video ends on. An https URL, a data URI, or raw base64 (JPG or PNG, up to 30 MB, at least 300 px per side, aspect ratio between 2:5 and 5:2)

duration

`integer`requireddefault: 5minimum: 3maximum: 30Video duration in seconds

aspect\_ratio

`string`requireddefault: 16:9enum: 21:9, 16:9, 9:16, 1:1Video aspect ratio. Ignored when keyframes are given.

resolution

`string`requireddefault: 1080penum: 720p, 1080pOutput resolution

video

`string`URL to the generated video

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v4/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v4/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/klingai/kling-v4/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/klingai/kling-v4/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/klingai/kling-v4/#page","headline":"Kling 4.0","description":"Kling 4.0 is Kling AI's video generation model for text-to-video and multi-keyframe image-to-video, producing up to 30 seconds of 720p or 1080p video from prompts of up to 26,000 characters and up to 10 keyframes.","url":"https://developers.cloudflare.com/ai/models/klingai/kling-v4/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
