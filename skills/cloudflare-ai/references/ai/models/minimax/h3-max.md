---
description: A fast multimodal video generation model supporting text-to-video and image-to-video generation at 480P and 768P.
title: MiniMax H3 Max
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.B0Y99aoe.svg)

# MiniMax H3 Max

Text-to-Video • MiniMax

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/minimax/h3-max/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`minimax/h3-max`

- Third-party

A fast multimodal video generation model supporting text-to-video and image-to-video generation at 480P and 768P.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://platform.minimax.io/docs/guides/terms-of-service.md) |
| More information | [link ↗](https://platform.minimax.io/docs/guides/video-generation.md) |
| Pricing | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/minimax/h3-max) |

## Usage

```ts
const response = await env.AI.run(
  'minimax/h3-max',
  {
    content: [
      {
        type: 'text',
        text: 'A golden retriever runs along a beach at sunrise while the camera tracks beside it in a cinematic slow motion shot.',
      },
    ],
    duration: 5,
    extra: { prompt_expansion_mode: 'balanced' },
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
  "model": "minimax/h3-max",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "A golden retriever runs along a beach at sunrise while the camera tracks beside it in a cinematic slow motion shot."
      }
    ],
    "duration": 5,
    "extra": {
      "prompt_expansion_mode": "balanced"
    },
    "ratio": "16:9",
    "resolution": "768P"
  }
}'
```

```json
{
  "task": {
    "id": "441805798383681",
    "model": "MiniMax-H3-Max",
    "status": "succeeded",
    "created_at": 1789415547,
    "updated_at": 1789415554,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-max/balanced-text-to-video.mp4"
    },
    "resolution": "768P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 0
    },
    "ratio": "16:9",
    "task_type": "generation"
  }
}
```

## Examples

<details>

<summary>**Disabled Prompt Expansion** — Generate a fast 480P vertical social video with prompt expansion disabled.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-max',
  {
    content: [
      {
        type: 'text',
        text: 'A chef tosses vegetables in a wok in a bright street-food kitchen, energetic handheld camera.',
      },
    ],
    duration: 5,
    extra: { prompt_expansion_mode: 'disabled' },
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
  "model": "minimax/h3-max",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "A chef tosses vegetables in a wok in a bright street-food kitchen, energetic handheld camera."
      }
    ],
    "duration": 5,
    "extra": {
      "prompt_expansion_mode": "disabled"
    },
    "ratio": "9:16",
    "resolution": "480P"
  }
}'
```

```json
{
  "task": {
    "id": "441804654764158",
    "model": "MiniMax-H3-Max",
    "status": "succeeded",
    "created_at": 1789415577,
    "updated_at": 1789415583,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-max/disabled-prompt-expansion.mp4"
    },
    "resolution": "480P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 0
    },
    "ratio": "9:16",
    "task_type": "generation"
  }
}
```

</details>

<details>

<summary>**Quality Prompt Expansion** — Prioritize prompt expansion quality for a detailed 768P scene.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-max',
  {
    content: [
      {
        type: 'text',
        text: 'A detailed miniature railway travels through a glowing underground crystal cavern, with tiny passengers looking out of the windows.',
      },
    ],
    duration: 8,
    extra: { prompt_expansion_mode: 'quality' },
    ratio: '21:9',
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
  "model": "minimax/h3-max",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "A detailed miniature railway travels through a glowing underground crystal cavern, with tiny passengers looking out of the windows."
      }
    ],
    "duration": 8,
    "extra": {
      "prompt_expansion_mode": "quality"
    },
    "ratio": "21:9",
    "resolution": "768P"
  }
}'
```

```json
{
  "task": {
    "id": "441805071421550",
    "model": "MiniMax-H3-Max",
    "status": "succeeded",
    "created_at": 1789415588,
    "updated_at": 1789415659,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-max/quality-prompt-expansion.mp4"
    },
    "resolution": "768P",
    "duration": 8,
    "usage": {
      "total_seconds": 8,
      "input_seconds": 0,
      "output_seconds": 8,
      "input_image_count": 0
    },
    "ratio": "21:9",
    "task_type": "generation"
  }
}
```

</details>

<details>

<summary>**H3 Max Image to Video** — Animate a supplied first-frame image at 480P.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-max',
  {
    content: [
      {
        type: 'text',
        text: 'The camera slowly pans across the scene while fabric and hair move naturally in the wind.',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://filecdn.minimax.chat/public/85c96368-6ead-4eae-af9c-116be878eac3.png',
        },
        role: 'first_frame',
      },
    ],
    duration: 5,
    extra: { prompt_expansion_mode: 'balanced' },
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
  "model": "minimax/h3-max",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "The camera slowly pans across the scene while fabric and hair move naturally in the wind."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://filecdn.minimax.chat/public/85c96368-6ead-4eae-af9c-116be878eac3.png"
        },
        "role": "first_frame"
      }
    ],
    "duration": 5,
    "extra": {
      "prompt_expansion_mode": "balanced"
    },
    "ratio": "adaptive",
    "resolution": "480P"
  }
}'
```

```json
{
  "task": {
    "id": "441804606931065",
    "model": "MiniMax-H3-Max",
    "status": "succeeded",
    "created_at": 1789415661,
    "updated_at": 1789415668,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-max/h3-max-image-to-video.mp4"
    },
    "resolution": "480P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 1
    },
    "ratio": "adaptive",
    "task_type": "generation"
  }
}
```

</details>

<details>

<summary>**H3 Max Reference Images** — Use multiple reference images to guide a fast character generation.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-max',
  {
    content: [
      {
        type: 'text',
        text: 'Create a short cinematic portrait of the character walking through a modern gallery, preserving the face and clothing from the references.',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://cdn.hailuoai.com/prod/hailuo_demo/testsets/h3_promo_eval_ref2va/gallery/sr_v2p26_trio_seed42_20260724/inputs/9d5c7a33fa6e_01_%E5%9B%BE1_MHGgbVga3o_gpt4o-image-1780651118146.png',
        },
        role: 'reference_image',
      },
      {
        type: 'image_url',
        image_url: {
          url: 'https://cdn.hailuoai.com/prod/hailuo_demo/testsets/h3_promo_eval_ref2va/gallery/sr_v2p26_trio_seed42_20260724/inputs/7af326902315_00_%E5%9B%BE2_YqtKbY1jpo_u4391985813_Young_male_wearing_cream_hoodie_and_dark_brown_sh_45d56ed0-d626-4c37-9a5b-77f51f374982_1.png',
        },
        role: 'reference_image',
      },
    ],
    duration: 5,
    extra: { prompt_expansion_mode: 'balanced' },
    resolution: '768P',
    ratio: '16:9',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-max",
  "input": {
    "content": [
      {
        "type": "text",
        "text": "Create a short cinematic portrait of the character walking through a modern gallery, preserving the face and clothing from the references."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://cdn.hailuoai.com/prod/hailuo_demo/testsets/h3_promo_eval_ref2va/gallery/sr_v2p26_trio_seed42_20260724/inputs/9d5c7a33fa6e_01_%E5%9B%BE1_MHGgbVga3o_gpt4o-image-1780651118146.png"
        },
        "role": "reference_image"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://cdn.hailuoai.com/prod/hailuo_demo/testsets/h3_promo_eval_ref2va/gallery/sr_v2p26_trio_seed42_20260724/inputs/7af326902315_00_%E5%9B%BE2_YqtKbY1jpo_u4391985813_Young_male_wearing_cream_hoodie_and_dark_brown_sh_45d56ed0-d626-4c37-9a5b-77f51f374982_1.png"
        },
        "role": "reference_image"
      }
    ],
    "duration": 5,
    "extra": {
      "prompt_expansion_mode": "balanced"
    },
    "resolution": "768P",
    "ratio": "16:9"
  }
}'
```

```json
{
  "task": {
    "id": "441805100810489",
    "model": "MiniMax-H3-Max",
    "status": "succeeded",
    "created_at": 1789415671,
    "updated_at": 1789415685,
    "content": {
      "url": "https://examples.aig.cloudflare.com/minimax/h3-max/h3-max-reference-images.mp4"
    },
    "resolution": "768P",
    "duration": 5,
    "usage": {
      "total_seconds": 5,
      "input_seconds": 0,
      "output_seconds": 5,
      "input_image_count": 2
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

`integer`requiredminimum: 5maximum: 15

ratio

`string`enum: adaptive, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16

callback\_url

`string`format: uri

resolution

`string`requiredenum: 480P, 768P

▶extra{}

`object`

▶task{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/minimax/h3-max/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-max/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/minimax/h3-max/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-max/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/h3-max/#page","headline":"MiniMax H3 Max (MiniMax) · Cloudflare AI docs · Cloudflare AI docs","description":"A fast multimodal video generation model supporting text-to-video and image-to-video generation at 480P and 768P.","url":"https://developers.cloudflare.com/ai/models/minimax/h3-max/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
