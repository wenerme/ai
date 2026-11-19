---
description: The faster version of MiniMax H3 Image, with the same text-to-image, multi-reference generation and image editing features, up to 4K output and up to 16 reference images.
title: MiniMax H3 Image Highspeed
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MiniMax logo](https://developers.cloudflare.com/_astro/minimax.B0Y99aoe.svg)

# MiniMax H3 Image Highspeed

Text-to-Image • MiniMax

Model ID

`minimax/h3-image-highspeed` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

The faster version of MiniMax H3 Image, with the same text-to-image, multi-reference generation and image editing features, up to 4K output and up to 16 reference images.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://platform.minimax.io/docs/guides/terms-of-service.md) |
| More information | [link ↗](https://platform.minimax.io/docs/guides/image-generation.md) |
| Pricing | <ul><li>Input text (per 1M tokens)$2.30</li><li>Input image (per 1M tokens)$3.00</li><li>Output image (per 1M tokens)$7.60</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'minimax/h3-image-highspeed',
  {
    prompt:
      'Vintage-style travel poster of Kyoto in autumn: a red pagoda among maple trees, Mount Hiei in the distance, bold art-deco title text "KYOTO" at the top and "AUTUMN EXPRESS" at the bottom, limited palette of crimson, cream and navy',
    aspect_ratio: '3:4',
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
  "model": "minimax/h3-image-highspeed",
  "input": {
    "prompt": "Vintage-style travel poster of Kyoto in autumn: a red pagoda among maple trees, Mount Hiei in the distance, bold art-deco title text \"KYOTO\" at the top and \"AUTUMN EXPRESS\" at the bottom, limited palette of crimson, cream and navy",
    "aspect_ratio": "3:4",
    "area": "4K"
  }
}'
```

![4K Poster in Seconds](https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/4k-poster-in-seconds.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/4k-poster-in-seconds.jpeg",
    "images": [
      "https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/4k-poster-in-seconds.jpeg"
    ],
    "revised_prompt": "The image is a vertically oriented vintage travel poster for Kyoto in autumn, framed by a thick navy-blue Art-Deco border with ornate corner flourishes and thin gold-toned line accents on a warm cream parchment background. At the top center, the bold title text reads \"KYOTO\" in large crimson Art-Deco block letters with sharp angular serifs and a cream outline. Below the title, a stylized landscape illustration fills the center of the poster. The main subject is a traditional multi-tiered red pagoda standing in the center foreground, its roofs layered with navy-blue under-eaves and gold-toned ornamental roof finials. Flanking the pagoda on the left and right are large maple trees with dark navy branches and clusters of bright crimson leaves. In the lower foreground, a winding stone path with a small bridge and lanterns leads upward from the bottom center toward the pagoda. In the upper middle background, Mount Hiei rises as a stylized navy mountain silhouette with cream-colored mist bands and a small pavilion near its peak. The bottom section is centered with a small navy and crimson stylized train icon, followed by the text \"AUTUMN EXPRESS\" in bold navy Art-Deco lettering with a cream outline. Beneath the title text, a smaller line reads \"JAPAN\" flanked by two tiny crimson diamonds. At the very bottom edge, a navy horizontal decorative band holds a small gold-toned emblem and the words \"VINTAGE JOURNEY\", all rendered in clean retro typography. The overall design uses a strict crimson, cream, and navy color palette, with flat retro illustration shading, stylized halftone textures on the foliage, and a symmetrical composition that makes the travel poster feel like a classic mid-century print."
  }
}
```

## Examples

<details>

<summary>**Batch of Variations** — Four 1K concept variations in one request for fast exploration.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-image-highspeed',
  {
    prompt:
      'Product concept render of a minimalist smart speaker made of light oak and woven grey fabric, on a white studio background, soft shadows',
    n: 4,
    aspect_ratio: '1:1',
    area: '1K',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "minimax/h3-image-highspeed",
  "input": {
    "prompt": "Product concept render of a minimalist smart speaker made of light oak and woven grey fabric, on a white studio background, soft shadows",
    "n": 4,
    "aspect_ratio": "1:1",
    "area": "1K"
  }
}'
```

![Batch of Variations](https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/batch-of-variations.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/batch-of-variations.jpeg",
    "images": [
      "https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/batch-of-variations.jpeg",
      "https://video-product.cdn.minimax.io/h3_image/20261118/bfb70079-f388-4cca-9cbe-c1a06490021f.jpeg",
      "https://video-product.cdn.minimax.io/h3_image/20261118/c7420e1f-5298-42eb-b59d-7d24c797ad4d.jpeg",
      "https://video-product.cdn.minimax.io/h3_image/20261118/9ae7b0fa-997b-4aa2-a497-6f1037b65998.jpeg"
    ],
    "revised_prompt": "The image is a high-quality product concept render of a minimalist smart speaker centered on a seamless white studio background. The speaker is a tall, elegant cylinder with its top and bottom sections crafted from smooth light oak wood with a fine visible wood grain. The midsection is wrapped in a tightly woven matte grey fabric that provides tactile acoustic texture. On the light oak top surface, a subtle black circular touch control ring is embedded slightly inward, accompanied by four small glowing white LED indicator dots that signal playback status. A thin metallic brass-toned accent ring sits between the lower wooden base and the fabric. The speaker rests directly on a white studio floor, casting a soft, natural drop shadow extending to the lower right. The scene is lit with diffused professional studio lighting from the upper left, creating gentle highlights on the polished wood and deepening the fabric texture. A small 3.5mm audio jack and a power port are placed on the lower rear side of the oak base, faintly visible from the three-quarter angle. The composition uses a clean, bright aesthetic with soft shadows and a generous amount of white negative space around the product, maintaining a realistic and polished e-commerce product photography style."
  }
}
```

</details>

<details>

<summary>**Multi-Reference Edit** — Combine two reference photos into one new, consistently lit scene.</summary>



```ts
const response = await env.AI.run(
  'minimax/h3-image-highspeed',
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
  "model": "minimax/h3-image-highspeed",
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

![Multi-Reference Edit](https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/multi-reference-edit.jpeg)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/multi-reference-edit.jpeg",
    "images": [
      "https://examples.aig.cloudflare.com/minimax/h3-image-highspeed/multi-reference-edit.jpeg"
    ],
    "revised_prompt": "The five crumbly scones with dark berry filling in <Picture 1> are <Subject 1>. The loose blueberries scattered on the surface and inside the small bowl in <Picture 1> are <Subject 2>. The soft morning window lighting in <Picture 1> is <Subject 3>. The red apple held by a hand in <Picture 2> is <Subject 4>. The target image is an overhead editorial cafe-menu photograph showing <Subject 1>, <Subject 2>, and a newly introduced teacup resting on a folded linen napkin atop a rustic oak table, illuminated by <Subject 3>, while replacing the stained parchment paper, coffee cups, spoon, peonies, and dark slate surface from <Picture 1> as well as the orchard background from <Picture 2>. <Subject 1> is partially preserved; its baked appearance, crumbly texture, and berry-stained centers remain, while its placement and count are adjusted to sit cleanly on the new tabletop. <Subject 2> is partially preserved; the individual berries retain their round shape and dusty bloom, while being redistributed loosely across the new scene without the bowl. <Subject 3> supplies the soft directional morning illumination transferred to the entire target scene. <Subject 4> serves as a weak reference for the fresh fruit-and-tea cafe theme, inspiring the warm natural color accents without transferring the apple or hand itself. Seen directly from above in a 4:3 frame, a weathered rustic oak tabletop with visible wood grain and warm honey-brown tones fills the canvas. A neatly folded oatmeal-colored linen napkin with a subtle woven texture lies near the center-left, supporting four of the scones from <Subject 1>, while a fifth scone rests slightly apart on the bare wood to the right. Beside the napkin sits a ceramic teacup filled with amber tea, casting a gentle shadow under <Subject 3>, which enters from the side to create soft highlights on the cup rim, crumbs, and berry skins. A few berries from <Subject 2> are scattered casually around the napkin edges and teacup base."
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

Input [Open](https://developers.cloudflare.com/ai/models/minimax/h3-image-highspeed/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-image-highspeed/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/minimax/h3-image-highspeed/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/minimax/h3-image-highspeed/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/minimax/h3-image-highspeed/#page","headline":"MiniMax H3 Image Highspeed","description":"The faster version of MiniMax H3 Image, with the same text-to-image, multi-reference generation and image editing features, up to 4K output and up to 16 reference images.","url":"https://developers.cloudflare.com/ai/models/minimax/h3-image-highspeed/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
