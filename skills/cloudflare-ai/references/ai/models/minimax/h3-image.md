---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: MiniMax's open-weight image model built on H3 for text-to-image, multi-reference generation and image editing, producing realistic detail and strong prompt adherence at up to 4K with up to 16 reference images.
title: MiniMax H3 Image
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.B0Y99aoe.svg)

# MiniMax H3 Image

Text-to-Image • MiniMax

Model ID

`minimax/h3-image` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

MiniMax's open-weight image model built on H3 for text-to-image, multi-reference generation and image editing, producing realistic detail and strong prompt adherence at up to 4K with up to 16 reference images.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://platform.minimax.io/docs/guides/terms-of-service.md) |
| More information | [link ↗](https://platform.minimax.io/docs/guides/image-generation.md) |
| Pricing | <ul><li>Input text (per 1M tokens)$2.30</li><li>Input image (per 1M tokens)$1.50</li><li>Output image (per 1M tokens)$3.80</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'minimax/h3-image',
  {
    prompt:
      'Macro photograph of a ruby-throated hummingbird hovering beside a dew-covered fuchsia blossom at sunrise, iridescent feathers in sharp detail, water droplets catching the light, creamy bokeh background, shot on a 100mm macro lens',
    aspect_ratio: '16:9',
    area: '4K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-image",
  "input": {
    "prompt": "Macro photograph of a ruby-throated hummingbird hovering beside a dew-covered fuchsia blossom at sunrise, iridescent feathers in sharp detail, water droplets catching the light, creamy bokeh background, shot on a 100mm macro lens",
    "aspect_ratio": "16:9",
    "area": "4K"
  }
}'
```

![4K Photorealism](https://examples.aig.cloudflare.com/minimax/h3-image/4k-photorealism.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/minimax/h3-image/4k-photorealism.jpeg",
    "images": [
      "https://examples.aig.cloudflare.com/minimax/h3-image/4k-photorealism.jpeg"
    ],
    "revised_prompt": "The image is a highly detailed macro photograph of a ruby-throated hummingbird hovering beside a dew-covered fuchsia blossom at sunrise, shot on a 100mm macro lens with a shallow depth of field. On the left side of the composition, the hummingbird is captured in a right-facing three-quarter profile, its long dark beak extending toward the open bell of a deep magenta fuchsia blossom positioned on the right. The bird's wings are frozen mid-flap, rendered as translucent, blurred arcs of brown and black above its back, capturing the active hover. Its plumage is in sharp focus, featuring metallic emerald green feathers on the crown and back, a brilliant ruby-red gorget on the throat, and a crisp white underside. On the right, the fuchsia blossom hangs from a fine green stem extending from the upper right corner, featuring layered petals with curled edges and a visible tubular throat. The blossoms and stem are dotted with numerous spherical water droplets that catch the warm golden light. The scene is bathed in soft sunrise lighting originating from the upper left, creating a warm rim light along the bird's feathers and bright reflections on the dew drops. The background is a creamy, smooth out-of-focus bokeh consisting of overlapping muted green leaves and warm orange and yellow light spots from the early morning sun. The composition balances the bird and the flower on the left and right with a small gap between the beak and the flower's opening. The overall tone is natural and peaceful, emphasizing the crisp macro details against the soft background."
  }
}
```

## Examples

<details>

<summary>**Dense Prompt Adherence** — A busy scene where every object, position and the sign text follow the prompt.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-image',
  {
    prompt:
      'A cozy bookshop window at dusk. On the left, a stack of three green books; in the center, a black cat asleep on a red velvet cushion; on the right, a brass telescope pointing up. Above the window, a hand-painted sign reads "THE MIDNIGHT READER". Warm string lights, rain droplets on the glass, a reflection of a passing yellow umbrella',
    aspect_ratio: '4:3',
    area: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-image",
  "input": {
    "prompt": "A cozy bookshop window at dusk. On the left, a stack of three green books; in the center, a black cat asleep on a red velvet cushion; on the right, a brass telescope pointing up. Above the window, a hand-painted sign reads \"THE MIDNIGHT READER\". Warm string lights, rain droplets on the glass, a reflection of a passing yellow umbrella",
    "aspect_ratio": "4:3",
    "area": "2K"
  }
}'
```

![Dense Prompt Adherence](https://examples.aig.cloudflare.com/minimax/h3-image/dense-prompt-adherence.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/minimax/h3-image/dense-prompt-adherence.jpeg",
    "images": [
      "https://examples.aig.cloudflare.com/minimax/h3-image/dense-prompt-adherence.jpeg"
    ],
    "revised_prompt": "The image is a cozy cinematic photograph taken from the street, looking into a bookshop window at dusk. At the top of the window frame sits a hand-painted wooden plaque reading \"THE MIDNIGHT READER\" in elegant gold lettering. Inside the window, a warmly lit display shelf showcases a peaceful scene. On the left side of the shelf, there is a stack of three dark green hardcover books with gold-embossed title bands and a worn leather texture, neatly piled on top of one another. In the center, a small black cat sleeps curled up on a plush red velvet cushion with a soft tufted center. On the right side, a vintage brass telescope rests on a small wooden tripod stand, pointing diagonally upward toward the upper right corner. A garland of warm string lights with glowing amber bulbs hangs across the upper interior of the window, illuminating the scene. The outside environment is captured on the window glass, which is covered in numerous rain droplets. On the lower right side of the glass, the clear reflection of a passing person holding a bright yellow umbrella is visible, overlapping with subtle reflections of wet cobblestones and a softly lit streetlamp. The lighting creates a warm contrast between the inviting bookshop interior and the cool, rain-kissed twilight outside."
  }
}
```

</details>

<details>

<summary>**Multi-Reference Edit** — Combine two reference photos into one new, consistently lit scene.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-image',
  {
    prompt:
      'Overhead editorial photo for a cafe menu: place the tea cup from image 2 beside the scones from image 1 on a rustic oak table, matching the soft morning window light, with a folded linen napkin and a few scattered blueberries',
    images: [
      'https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg',
      'https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg',
    ],
    aspect_ratio: '4:3',
    area: '2K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-image",
  "input": {
    "prompt": "Overhead editorial photo for a cafe menu: place the tea cup from image 2 beside the scones from image 1 on a rustic oak table, matching the soft morning window light, with a folded linen napkin and a few scattered blueberries",
    "images": [
      "https://storage.googleapis.com/cloud-samples-data/generative-ai/image/scones.jpg",
      "https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/r2v_tea_pic1.jpg"
    ],
    "aspect_ratio": "4:3",
    "area": "2K"
  }
}'
```

![Multi-Reference Edit](https://examples.aig.cloudflare.com/minimax/h3-image/multi-reference-edit.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/minimax/h3-image/multi-reference-edit.jpeg",
    "images": [
      "https://examples.aig.cloudflare.com/minimax/h3-image/multi-reference-edit.jpeg"
    ],
    "revised_prompt": "The five crumbly blueberry scones in <Picture 1> are <Subject 1>. The fresh loose blueberries scattered across the parchment paper and inside the small bowl in <Picture 1> are <Subject 2>. The soft morning window light in <Picture 1> is <Subject 3>. The red apple held by a hand in <Picture 2> is <Subject 4>. The target image is an overhead editorial cafe-menu photograph showing <Subject 1>, <Subject 4> transformed into a teacup, and <Subject 2> arranged on a rustic oak table alongside a folded linen napkin under <Subject 3>, replacing the dark surface, serrated parchment paper, coffee cups, silver spoon, and pink peonies from <Picture 1>. <Subject 1> is partially preserved; its crumbly baked texture, golden-brown crust, and dark purple-blue berry pockets remain, while the scones are rearranged directly onto the wooden tabletop without the stained parchment paper. <Subject 2> is partially preserved; the individual dusty-blue berries with pale crowns remain, while their arrangement changes to a few loose berries scattered directly on the oak planks near <Subject 1>. <Subject 3> supplies the lighting setup transferred to the entire target scene. <Subject 4> serves as a weak reference for the new teacup; its warm sunlit crimson-red hue guides the exterior ceramic glaze of the cup while its shape becomes a round porcelain teacup viewed from above. Viewed from directly overhead in a 4:3 frame, wide weathered oak boards with visible grain, knots, and matte finish form the tabletop. Three scones from <Subject 1> rest clustered near the center-left, with two more positioned toward the lower right. Beside <Subject 1> sits the newly introduced round white-porcelain teacup inspired by <Subject 4>, featuring a glossy crimson-red outer rim and handle, filled with clear amber tea that catches bright specular highlights. A neatly folded natural oatmeal-colored linen napkin with subtle woven texture lies beneath the lower-right scones, and a few berries from <Subject 2> rest beside the cup and napkin. Soft directional daylight from <Subject 3> enters from the side, casting gentle diffused shadows across the oak grain and highlighting the flaky crumbs of <Subject 1>."
  }
}
```

</details>

## Parameters

prompt

`string`requiredmaxLength: 32000Text description of the image, or of the edit when images are given, up to 32,000 characters. Refer to reference images by their order, e.g. "image 1".

▶images\[]

`array`minItems: 1maxItems: 16Reference images for image editing and multi-reference generation, 1 to 16: https URLs or data:image/\<format>;base64 URIs (JPG, PNG, WEBP, HEIC or HEIF; 128 to 8192 px per side; long side at most 4x the short side). When set, the request is an image edit.

n

`integer`requireddefault: 1minimum: 1maximum: 10Number of images to generate, 1 to 10

size

`string`Exact output size as WIDTHxHEIGHT, e.g. 2720x1536: area 655,360 to 20,000,000 pixels, aspect ratio between 1:3 and 3:1. Cannot be combined with aspect\_ratio or area.

aspect\_ratio

`string`Output aspect ratio when size is not set: auto (default, chosen from the prompt) or X:Y with X and Y from 1 to 300, between 1:3 and 3:1, e.g. 16:9 or 21:9

area

`string`enum: 1K, 2K, 4KOutput area level when size is not set, targeting 1024x1024, 2048x2048 or 4096x4096 pixels at the chosen aspect ratio. Defaults to 4K.

disable\_prompt\_enhanced

`boolean`Text-to-image only: use the prompt as written instead of the enhanced prompt. Requires size or an X:Y aspect\_ratio.

output\_format

`string`enum: jpeg, png, webpOutput image format. Defaults to jpeg.

output\_compression

`integer`minimum: 0maximum: 100JPEG or WEBP quality, 0 to 100 (default 95); ignored for png

image

`string`URL of the first generated image, hosted by MiniMax

▶images\[]

`array`URLs of all generated images, hosted by MiniMax; images withheld by the content safety check are left out

revised\_prompt

`string`The prompt used for the first image, after prompt enhancement

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/minimax/h3-image/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-image/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/minimax/h3-image/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-image/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/h3-image/#page","headline":"MiniMax H3 Image","description":"MiniMax's open-weight image model built on H3 for text-to-image, multi-reference generation and image editing, producing realistic detail and strong prompt adherence at up to 4K with up to 16 reference images.","url":"https://developers.cloudflare.com/ai/models/minimax/h3-image/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
