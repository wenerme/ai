---
description: Krea 3 is Krea's image generation and editing model, in beta. It edits one or more reference images from a text instruction, or generates an image from the prompt alone. References are passed as HTTP(S) URLs in image_urls (up to 8). Outputs go up to 2K, with optional thinking_mode, aspect_ratio, seed and regional_edit controls.
title: Krea 3
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

k

# Krea 3

Image-to-Image • krea

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/krea/krea-3/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`krea/krea-3`

- Third-party

Krea 3 is Krea's image generation and editing model, in beta. It edits one or more reference images from a text instruction, or generates an image from the prompt alone. References are passed as HTTP(S) URLs in image\_urls (up to 8). Outputs go up to 2K, with optional thinking\_mode, aspect\_ratio, seed and regional\_edit controls.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://www.krea.ai/terms) |
| More information | [link ↗](https://www.krea.ai/docs/api-reference/krea/krea-3-beta) |
| Pricing | <ul><li>output size 1k$0.03</li><li>Per image$0.03</li><li>output size 2k$0.06</li><li>Per input image$0.07</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'krea/krea-3',
  {
    prompt:
      'Change this forest visitor-centre photograph to a damp late-autumn morning after rain. Deciduous foliage turns copper, russet and yellow with some bare branches; keep evergreen areas green. Modest soft mist recedes between distant trunks, never obscuring the building. Add scattered fallen leaves at path edges, damp darkened timber, subtle silvering on exposed boards, water beading on the metal roof and natural moss only at shaded ground junctions. Keep the path and bridge clear, with subdued wet reflections rather than mirror gloss. Existing visitors stay in their positions and scale, with varied light autumn jackets. Preserve architecture, bridge, opening rhythm, existing material identities and exact framing. No dramatic cloud wall, new structures or blanket distress texture.',
    image_urls: ['https://gen.krea.ai/images/296f8f50-13db-43f4-ae7a-c5c7a08f7fa7.png'],
    resolution: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "krea/krea-3",
  "input": {
    "prompt": "Change this forest visitor-centre photograph to a damp late-autumn morning after rain. Deciduous foliage turns copper, russet and yellow with some bare branches; keep evergreen areas green. Modest soft mist recedes between distant trunks, never obscuring the building. Add scattered fallen leaves at path edges, damp darkened timber, subtle silvering on exposed boards, water beading on the metal roof and natural moss only at shaded ground junctions. Keep the path and bridge clear, with subdued wet reflections rather than mirror gloss. Existing visitors stay in their positions and scale, with varied light autumn jackets. Preserve architecture, bridge, opening rhythm, existing material identities and exact framing. No dramatic cloud wall, new structures or blanket distress texture.",
    "image_urls": [
      "https://gen.krea.ai/images/296f8f50-13db-43f4-ae7a-c5c7a08f7fa7.png"
    ],
    "resolution": "2K"
  }
}'
```

![Season Change](https://examples.aig.cloudflare.com/krea/krea-3/season-change.png)

```json
{
  "created_at": "2026-10-15T16:35:51.175Z",
  "completed_at": "2026-10-15T16:36:07.244Z",
  "job_id": "57b62982-c38b-4137-9e2a-2cae0c65786e",
  "status": "completed",
  "type": "k3",
  "result": {
    "urls": [
      "https://examples.aig.cloudflare.com/krea/krea-3/season-change.png"
    ]
  },
  "progress": null
}
```

## Examples

<details>

<summary>**Clay Model to Photo** — Render a clay model of a ceramics-school courtyard as a photograph without changing its geometry. Prompt and image from Krea's Krea 3 launch examples.</summary>



```ts
const response = await env.AI.run(
  'krea/krea-3',
  {
    prompt:
      'Convert this clay ceramics-school courtyard to a late-summer editorial photograph. Preserve its exact vertical framing, sawtooth roofs, chimney, pergola, door openings, worktable, washbasin and planted edge. Warm buff handmade brick with scattered slightly overfired units, smoked oak doors and pergola, deep olive glazed ceramic washbasin, terracotta pavers with fine dusty mortar joints. Strong but natural oblique afternoon light, a quiet nearly clear sky. Believable working craft space: small kiln-fired ceramic pieces on the existing table, light clay dust near the work area, subtle water/mineral traces at the basin and weathering of exposed timber only. Retain mounted wall lights, handles and drainage. Two small adult students, one with dark curls and a sage apron at the table, another with auburn hair and a cream shirt near a door. Full-frame photograph derived solely from this clay geometry and text; no geometry changes or graphic labels.',
    image_urls: ['https://gen.krea.ai/images/44ec07df-337c-4ec4-970a-639a48953c12.png'],
    resolution: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "krea/krea-3",
  "input": {
    "prompt": "Convert this clay ceramics-school courtyard to a late-summer editorial photograph. Preserve its exact vertical framing, sawtooth roofs, chimney, pergola, door openings, worktable, washbasin and planted edge. Warm buff handmade brick with scattered slightly overfired units, smoked oak doors and pergola, deep olive glazed ceramic washbasin, terracotta pavers with fine dusty mortar joints. Strong but natural oblique afternoon light, a quiet nearly clear sky. Believable working craft space: small kiln-fired ceramic pieces on the existing table, light clay dust near the work area, subtle water/mineral traces at the basin and weathering of exposed timber only. Retain mounted wall lights, handles and drainage. Two small adult students, one with dark curls and a sage apron at the table, another with auburn hair and a cream shirt near a door. Full-frame photograph derived solely from this clay geometry and text; no geometry changes or graphic labels.",
    "image_urls": [
      "https://gen.krea.ai/images/44ec07df-337c-4ec4-970a-639a48953c12.png"
    ],
    "resolution": "2K"
  }
}'
```

![Clay Model to Photo](https://examples.aig.cloudflare.com/krea/krea-3/clay-model-to-photo.png)

```json
{
  "created_at": "2026-10-15T16:36:20.005Z",
  "completed_at": "2026-10-15T16:36:37.546Z",
  "job_id": "d02a6643-e856-471f-8190-303e4d0eacc5",
  "status": "completed",
  "type": "k3",
  "result": {
    "urls": [
      "https://examples.aig.cloudflare.com/krea/krea-3/clay-model-to-photo.png"
    ]
  },
  "progress": null
}
```

</details>

<details>

<summary>**Product Reference** — Replace the pendant lights in image 1 with the product in image 2, keeping the people and the room. Prompt and images from Krea's Krea 3 launch examples.</summary>



```ts
const response = await env.AI.run(
  'krea/krea-3',
  {
    prompt:
      "Replace each of the FOUR existing opal pendant lights above the market counter in image 1 with the amber-glass saucer pendant from image 2, one for one. Keep the original ceiling mounting positions and suspension heights, varying apparent size naturally with depth. Retain the reference's amber saucer, opal cylindrical centre, bronze stem and real ceiling canopy; scale the shade to the counter, not an oversized chandelier. Gentle warm emission, not a global orange relight. Preserve all five occupants and their distinct clothes, hair and poses. Keep counters, food, green tile and banquette, yellow chairs, brick ceiling, other fittings, daylight and camera exactly unchanged.",
    image_urls: [
      'https://gen.krea.ai/images/b1acd96f-580f-4072-a0e8-19dd10355d5b.png',
      'https://gen.krea.ai/images/8f7a7086-08a2-42a6-8572-3e1245384f2a.png',
    ],
    resolution: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "krea/krea-3",
  "input": {
    "prompt": "Replace each of the FOUR existing opal pendant lights above the market counter in image 1 with the amber-glass saucer pendant from image 2, one for one. Keep the original ceiling mounting positions and suspension heights, varying apparent size naturally with depth. Retain the reference'\''s amber saucer, opal cylindrical centre, bronze stem and real ceiling canopy; scale the shade to the counter, not an oversized chandelier. Gentle warm emission, not a global orange relight. Preserve all five occupants and their distinct clothes, hair and poses. Keep counters, food, green tile and banquette, yellow chairs, brick ceiling, other fittings, daylight and camera exactly unchanged.",
    "image_urls": [
      "https://gen.krea.ai/images/b1acd96f-580f-4072-a0e8-19dd10355d5b.png",
      "https://gen.krea.ai/images/8f7a7086-08a2-42a6-8572-3e1245384f2a.png"
    ],
    "resolution": "2K"
  }
}'
```

![Product Reference](https://examples.aig.cloudflare.com/krea/krea-3/product-reference.png)

```json
{
  "created_at": "2026-10-15T16:36:51.455Z",
  "completed_at": "2026-10-15T16:37:21.388Z",
  "job_id": "6ed124d6-bd7e-46a0-bf77-0e7f98eabda5",
  "status": "completed",
  "type": "k3",
  "result": {
    "urls": [
      "https://examples.aig.cloudflare.com/krea/krea-3/product-reference.png"
    ]
  },
  "progress": null
}
```

</details>

<details>

<summary>**Multi-Reference Furniture Swap** — Replace the sofa, chairs and table in image 1 with three product references (images 2 to 4), keeping the people and the room. Prompt and images from Krea's Krea 3 launch examples.</summary>



```ts
const response = await env.AI.run(
  'krea/krea-3',
  {
    prompt:
      "Replace ONLY the living-room seating suite in image 1 using the three product references: image 2 supplies the saffron three-seat sofa replacing the orange sofa; image 3 supplies TWO oxblood velvet/chrome-sled lounge chairs replacing the two petrol chairs; image 4 supplies the green-marble oval table replacing the pale table. Image 1 controls each object's location, facing direction, relative scale and seat/table heights. Maintain the usable conversation group and the same rug; keep complete furniture within the frame and clear routes. Keep the reading woman in her original pose, clothes and position seated naturally on the new rear chair, with proper body/arm occlusion. Preserve both terrace residents and their outfits/hair, the terrace furniture, bowl on the table, shelves, lighting, timber ceiling, glazing, fittings and courtyard. Do not change the camera or architecture. No duplicate old furniture.",
    image_urls: [
      'https://gen.krea.ai/images/6a93c58a-76e3-40a8-8d42-71f535b3e5cf.png',
      'https://gen.krea.ai/images/dc41ed7c-4cf2-4b9a-aa76-0befd256edc4.png',
      'https://gen.krea.ai/images/246fd687-602f-43c4-b1bb-05efea8ffdc1.png',
      'https://gen.krea.ai/images/b0a40ddb-b46c-4410-a320-234e414513e4.png',
    ],
    resolution: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "krea/krea-3",
  "input": {
    "prompt": "Replace ONLY the living-room seating suite in image 1 using the three product references: image 2 supplies the saffron three-seat sofa replacing the orange sofa; image 3 supplies TWO oxblood velvet/chrome-sled lounge chairs replacing the two petrol chairs; image 4 supplies the green-marble oval table replacing the pale table. Image 1 controls each object'\''s location, facing direction, relative scale and seat/table heights. Maintain the usable conversation group and the same rug; keep complete furniture within the frame and clear routes. Keep the reading woman in her original pose, clothes and position seated naturally on the new rear chair, with proper body/arm occlusion. Preserve both terrace residents and their outfits/hair, the terrace furniture, bowl on the table, shelves, lighting, timber ceiling, glazing, fittings and courtyard. Do not change the camera or architecture. No duplicate old furniture.",
    "image_urls": [
      "https://gen.krea.ai/images/6a93c58a-76e3-40a8-8d42-71f535b3e5cf.png",
      "https://gen.krea.ai/images/dc41ed7c-4cf2-4b9a-aa76-0befd256edc4.png",
      "https://gen.krea.ai/images/246fd687-602f-43c4-b1bb-05efea8ffdc1.png",
      "https://gen.krea.ai/images/b0a40ddb-b46c-4410-a320-234e414513e4.png"
    ],
    "resolution": "2K"
  }
}'
```

![Multi-Reference Furniture Swap](https://examples.aig.cloudflare.com/krea/krea-3/multi-reference-furniture-swap.png)

```json
{
  "created_at": "2026-10-15T16:37:34.706Z",
  "completed_at": "2026-10-15T16:38:45.434Z",
  "job_id": "2f565064-7605-4d6a-9f9b-31e79268b8f7",
  "status": "completed",
  "type": "k3",
  "result": {
    "urls": [
      "https://examples.aig.cloudflare.com/krea/krea-3/multi-reference-furniture-swap.png"
    ]
  },
  "progress": null
}
```

</details>

## Parameters

prompt

`string`requiredminLength: 1Text description of the image to generate or the edit to apply.

▶image\_urls\[]

`array`maxItems: 8format: uriHTTP(S) URLs of up to 8 reference images, passed to Krea as-is. With references the request edits them; without, it generates from the prompt.

thinking\_mode

`string`enum: fast, high, ultraHow much Krea reasons about the request before generating.

resolution

`string`requiredenum: 1K, 2KOutput resolution.

aspect\_ratio

`string`enum: 1:1, 4:5, 3:4, 2:3, 9:16, 5:4, 4:3, 3:2, 16:9, 21:9Output aspect ratio.

seed

`number`Seed for reproducible results.

negative\_prompt

`string`maxLength: 1024What to avoid in the image, up to 1024 characters.

regional\_edit

`boolean`Turns on Krea's regional editing for the request.

image

`string`format: uriPresigned URL for the generated image.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/krea/krea-3/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/krea/krea-3/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/krea/krea-3/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/krea/krea-3/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/krea/krea-3/#page","headline":"Krea 3","description":"Krea 3 is Krea's image generation and editing model, in beta. It edits one or more reference images from a text instruction, or generates an image from the prompt alone. References are passed as HTTP(S) URLs in image_urls (up to 8). Outputs go up to 2K, with optional thinking_mode, aspect_ratio, seed and regional_edit controls.","url":"https://developers.cloudflare.com/ai/models/krea/krea-3/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
