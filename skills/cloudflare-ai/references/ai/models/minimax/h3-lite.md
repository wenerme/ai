---
description: A lightweight multimodal video generation model supporting text-to-video, first and last frame image-to-video, and reference-to-video generation at 480P and 768P.
title: MiniMax H3 Lite
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.B0Y99aoe.svg)

# MiniMax H3 Lite

Text-to-Video • MiniMax

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/minimax/h3-lite/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`minimax/h3-lite`

- Third-party

A lightweight multimodal video generation model supporting text-to-video, first and last frame image-to-video, and reference-to-video generation at 480P and 768P.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://platform.minimax.io/docs/guides/terms-of-service.md) |
| More information | [link ↗](https://platform.minimax.io/docs/guides/video-generation.md) |
| Pricing | <ul><li>@480p (per second)$0.025</li><li>@768p (per second)$0.04</li><li>Default (per second)$0.025</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'minimax/h3-lite',
  {
    content: [
      {
        type: 'text',
        text: 'Top-down shot of latte art being poured into a ceramic cup on a wooden café table, the milk forms a rosetta pattern in slow motion. Cozy morning light, vertical framing for social.',
      },
    ],
    duration: 4,
    ratio: '9:16',
    resolution: '480P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-lite",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "Top-down shot of latte art being poured into a ceramic cup on a wooden café table, the milk forms a rosetta pattern in slow motion. Cozy morning light, vertical framing for social."
      }
    ],
    "duration": 4,
    "ratio": "9:16",
    "resolution": "480P"
  }
}'
```

```json
{
  "task": {
    "id": "457313854865911",
    "model": "MiniMax-H3-Lite",
    "status": "succeeded",
    "created_at": 1793202510,
    "updated_at": 1793202525,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-lite/vertical-latte-art.mp4"
    },
    "resolution": "480P",
    "duration": 4,
    "usage": {
      "total_seconds": 4,
      "input_seconds": 0,
      "output_seconds": 4,
      "input_image_count": 0,
      "total_tokens": 41664,
      "prompt_tokens": 0,
      "completion_tokens": 41664
    },
    "ratio": "9:16",
    "task_type": "generation"
  }
}
```

## Examples

<details>

<summary>**Rice Terrace Flyover** — A 768P scenic establishing shot from text.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-lite',
  {
    content: [
      {
        type: 'text',
        text: 'Drone flyover of green terraced rice fields at sunrise, low mist drifting between the terraces [push in], then the camera rises to reveal the valley [tilt up]. Cinematic, calm.',
      },
    ],
    duration: 5,
    ratio: '16:9',
    resolution: '768P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-lite",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "Drone flyover of green terraced rice fields at sunrise, low mist drifting between the terraces [push in], then the camera rises to reveal the valley [tilt up]. Cinematic, calm."
      }
    ],
    "duration": 5,
    "ratio": "16:9",
    "resolution": "768P"
  }
}'
```

```json
{
  "task": {
    "id": "457314815484259",
    "model": "MiniMax-H3-Lite",
    "status": "succeeded",
    "created_at": 1793202531,
    "updated_at": 1793202549,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-lite/rice-terrace-flyover.mp4"
    },
    "resolution": "768P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 0,
      "total_tokens": 84625,
      "prompt_tokens": 0,
      "completion_tokens": 84625
    },
    "ratio": "16:9",
    "task_type": "generation"
  }
}
```

</details>

<details>

<summary>**Fresh Scones** — Bring a still food photo to life from a first frame at 480P.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-lite',
  {
    content: [
      {
        type: 'text',
        text: 'Steam rises gently from the freshly baked scones, a little butter melts, and the camera slowly pushes in. Warm kitchen light.',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg',
        },
        role: 'first_frame',
      },
    ],
    duration: 5,
    ratio: 'adaptive',
    resolution: '480P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-lite",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "Steam rises gently from the freshly baked scones, a little butter melts, and the camera slowly pushes in. Warm kitchen light."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg"
        },
        "role": "first_frame"
      }
    ],
    "duration": 5,
    "ratio": "adaptive",
    "resolution": "480P"
  }
}'
```

```json
{
  "task": {
    "id": "457317239742916",
    "model": "MiniMax-H3-Lite",
    "status": "succeeded",
    "created_at": 1793202551,
    "updated_at": 1793202572,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-lite/fresh-scones.mp4"
    },
    "resolution": "480P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 1,
      "total_tokens": 60543,
      "prompt_tokens": 8463,
      "completion_tokens": 52080
    },
    "ratio": "adaptive",
    "task_type": "generation"
  }
}
```

</details>

<details>

<summary>**Sketch Draws Itself** — End on a supplied last frame at 768P.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-lite',
  {
    content: [
      {
        type: 'text',
        text: 'A blank sheet of white paper on a design desk. Pencil lines appear on their own and sketch a sneaker concept, ending on the finished drawing. Static top-down camera, soft daylight.',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/sneaker-sketch.jpg',
        },
        role: 'last_frame',
      },
    ],
    duration: 5,
    ratio: 'adaptive',
    resolution: '768P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-lite",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "A blank sheet of white paper on a design desk. Pencil lines appear on their own and sketch a sneaker concept, ending on the finished drawing. Static top-down camera, soft daylight."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/sneaker-sketch.jpg"
        },
        "role": "last_frame"
      }
    ],
    "duration": 5,
    "ratio": "adaptive",
    "resolution": "768P"
  }
}'
```

```json
{
  "task": {
    "id": "457318745805131",
    "model": "MiniMax-H3-Lite",
    "status": "succeeded",
    "created_at": 1793203035,
    "updated_at": 1793203058,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-lite/sketch-draws-itself.mp4"
    },
    "resolution": "768P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 1,
      "total_tokens": 93088,
      "prompt_tokens": 8463,
      "completion_tokens": 84625
    },
    "ratio": "adaptive",
    "task_type": "generation"
  }
}
```

</details>

<details>

<summary>**Mascot Comes to Life 480P** — The same first and last frames as the H3 Highspeed example, at Lite's cheaper 480P.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-lite',
  {
    content: [
      {
        type: 'text',
        text: 'A flat illustrated robot mascot printed on a notebook page wakes up, blinks, peels itself off the paper into a glossy 3D toy, hops onto the wooden desk next to the coffee mug and waves at the camera. Warm morning light, playful stop-motion feel, one continuous shot.',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-page.jpg',
        },
        role: 'first_frame',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-desk.jpg',
        },
        role: 'last_frame',
      },
    ],
    duration: 5,
    ratio: 'adaptive',
    resolution: '480P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-lite",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "A flat illustrated robot mascot printed on a notebook page wakes up, blinks, peels itself off the paper into a glossy 3D toy, hops onto the wooden desk next to the coffee mug and waves at the camera. Warm morning light, playful stop-motion feel, one continuous shot."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-page.jpg"
        },
        "role": "first_frame"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-desk.jpg"
        },
        "role": "last_frame"
      }
    ],
    "duration": 5,
    "ratio": "adaptive",
    "resolution": "480P"
  }
}'
```

```json
{
  "task": {
    "id": "457316858245645",
    "model": "MiniMax-H3-Lite",
    "status": "succeeded",
    "created_at": 1793202593,
    "updated_at": 1793202616,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-lite/mascot-comes-to-life-480p.mp4"
    },
    "resolution": "480P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 2,
      "total_tokens": 69006,
      "prompt_tokens": 16926,
      "completion_tokens": 52080
    },
    "ratio": "adaptive",
    "task_type": "generation"
  }
}
```

</details>

<details>

<summary>**Mascot Storyboard Shot** — Keep a character consistent from reference images; H3 Lite needs a concrete ratio for reference-to-video.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-lite',
  {
    content: [
      {
        type: 'text',
        text: "Storyboard shot: the robot mascot from the reference images walks along a bookshelf, stops at the edge and waves. Keep the mascot's shape, colors and antenna consistent with the references. Playful stop-motion feel.",
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-hop.jpg',
        },
        role: 'reference_image',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-desk.jpg',
        },
        role: 'reference_image',
      },
    ],
    duration: 5,
    ratio: '16:9',
    resolution: '768P',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-lite",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "Storyboard shot: the robot mascot from the reference images walks along a bookshelf, stops at the edge and waves. Keep the mascot'\''s shape, colors and antenna consistent with the references. Playful stop-motion feel."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-hop.jpg"
        },
        "role": "reference_image"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://examples.aig.cloudflare.com/klingai/kling-v4/inputs/mascot-desk.jpg"
        },
        "role": "reference_image"
      }
    ],
    "duration": 5,
    "ratio": "16:9",
    "resolution": "768P"
  }
}'
```

```json
{
  "task": {
    "id": "457314329653813",
    "model": "MiniMax-H3-Lite",
    "status": "succeeded",
    "created_at": 1793202624,
    "updated_at": 1793202655,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-lite/mascot-storyboard-shot.mp4"
    },
    "resolution": "768P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 2,
      "total_tokens": 101551,
      "prompt_tokens": 16926,
      "completion_tokens": 84625
    },
    "ratio": "16:9",
    "task_type": "generation"
  }
}
```

</details>

## Parameters

▶content\[]

`array`requiredminItems: 1

duration

`integer`requiredminimum: 4maximum: 15

ratio

`string`enum: adaptive, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16

callback\_url

`string`format: uri

resolution

`string`requiredenum: 480P, 768P

▶task{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/minimax/h3-lite/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-lite/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/minimax/h3-lite/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-lite/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/h3-lite/#page","headline":"MiniMax H3 Lite","description":"A lightweight multimodal video generation model supporting text-to-video, first and last frame image-to-video, and reference-to-video generation at 480P and 768P.","url":"https://developers.cloudflare.com/ai/models/minimax/h3-lite/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
