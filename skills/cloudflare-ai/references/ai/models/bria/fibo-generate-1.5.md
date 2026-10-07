---
description: FIBO Generate creates images from a text prompt, a reference image, or both. Each result includes the seed and the structured JSON (VGL) prompt used to render it; send them back to recreate the image exactly or to refine it with a new prompt. Outputs are 1MP or 4MP in nine aspect ratios.
title: FIBO Generate 1.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

b

# FIBO Generate 1.5

Text-to-Image • bria

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/bria/fibo-generate-1.5/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`bria/fibo-generate-1.5`

- Third-party

FIBO Generate creates images from a text prompt, a reference image, or both. Each result includes the seed and the structured JSON (VGL) prompt used to render it; send them back to recreate the image exactly or to refine it with a new prompt. Outputs are 1MP or 4MP in nine aspect ratios.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://bria.ai/terms-of-use) |
| More information | [link ↗](https://docs.bria.ai/image-generation/generation/image-generate) |
| Pricing | <ul><li>Per image$0.03</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'bria/fibo-generate-1.5',
  {
    prompt:
      'studio product photo of a matte black insulated travel mug on a white seamless background, soft diffused key light from the upper left, crisp edges',
    aspect_ratio: '1:1',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/fibo-generate-1.5",
  "input": {
    "prompt": "studio product photo of a matte black insulated travel mug on a white seamless background, soft diffused key light from the upper left, crisp edges",
    "aspect_ratio": "1:1"
  }
}'
```

![Product Photo](https://examples.aig.cloudflare.com/bria/fibo-generate-1.5/product-photo.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/fibo-generate-1.5/product-photo.png",
    "seed": 1528689072,
    "structured_prompt": "{\"short_description\": \"A meticulously composed studio product photograph of a matte black insulated travel mug. The mug stands prominently on a pristine white seamless background, highlighted by soft, diffused key lighting from the upper left, emphasizing its sleek design and crisp edges. The image conveys a sense of modern simplicity and sophisticated utility.\", \"objects\": [{\"description\": \"A modern, insulated travel mug with a minimalist design. It features a cylindrical body that tapers slightly towards the top, with a secure, leak-proof lid. The matte black finish absorbs light, giving it a premium, non-reflective appearance.\", \"location\": \"center\", \"relationship\": \"The primary subject of the photograph, centrally positioned to draw immediate attention.\", \"relative_size\": \"large within frame\", \"shape_and_color\": \"Cylindrical, matte black\", \"texture\": \"Smooth, non-reflective matte finish\", \"appearance_details\": \"Subtle branding logo debossed near the bottom, barely visible due to the matte finish and lighting. The lid is also matte black, with a small, integrated sip opening.\", \"orientation\": \"Upright, perfectly vertical\"}], \"background_setting\": \"A pristine, pure white seamless studio background that creates an infinite, shadow-free horizon, ensuring the product stands out without distractions.\", \"lighting\": {\"conditions\": \"Studio lighting, soft and diffused\", \"direction\": \"Key light from the upper left, fill light from the right to minimize harsh shadows\", \"shadows\": \"Very soft, subtle shadow cast directly beneath and slightly to the right of the mug, providing just enough depth without being distracting. Edges are crisp and well-defined.\"}, \"aesthetics\": {\"composition\": \"Centered, product photography composition, emphasizing symmetry and clean lines.\", \"color_scheme\": \"Monochromatic with high contrast between the matte black mug and the pure white background.\", \"mood_atmosphere\": \"Clean, sophisticated, modern, and minimalist.\", \"aesthetic_score\": \"very high\", \"preference_score\": \"very high\"}, \"photographic_characteristics\": {\"depth_of_field\": \"Shallow, with the mug in sharp focus and the background completely blurred into an abstract white field.\", \"focus\": \"Sharp focus on the entire travel mug, highlighting its crisp edges and surface details.\", \"camera_angle\": \"Eye-level, slightly elevated to showcase the top edge of the lid.\", \"lens_focal_length\": \"Standard lens (e.g., 50mm-85mm) to avoid distortion and accurately represent the product.\"}, \"style_medium\": \"photograph\", \"context\": \"This is a product marketing photograph intended for e-commerce websites, print catalogs, or advertising campaigns, designed to showcase the quality and aesthetic appeal of the travel mug.\", \"artistic_style\": \"realistic\"}"
  }
}
```

## Examples

<details>

<summary>**Reference Image** — Generate a new piece of jewelry inspired by a reference photo, from Bria's docs.</summary>



```ts
const response = await env.AI.run(
  'bria/fibo-generate-1.5',
  {
    prompt: 'a ring inspired by the image',
    images: ['https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo/ref_1.jpg'],
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/fibo-generate-1.5",
  "input": {
    "prompt": "a ring inspired by the image",
    "images": [
      "https://bria-datasets.s3.us-east-1.amazonaws.com/api_doc/fibo/ref_1.jpg"
    ]
  }
}'
```

![Reference Image](https://examples.aig.cloudflare.com/bria/fibo-generate-1.5/reference-image.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/fibo-generate-1.5/reference-image.png",
    "seed": 120559985,
    "structured_prompt": "{\"short_description\": \"A close-up photograph of an elegant ring featuring a teardrop-shaped ruby set in a thick, curb-chain inspired gold band. The ring is positioned on a smooth, light-colored surface, with soft, diffused lighting highlighting its intricate details and the gem's vibrant color.\", \"objects\": [{\"description\": \"An elegant ring with a prominent teardrop-shaped ruby gemstone. The band of the ring is crafted from polished gold, designed to resemble a thick, interlocked curb chain, giving it a modern yet classic aesthetic. The ruby is securely set in a gold bezel, allowing light to pass through and enhance its deep red hue.\", \"location\": \"center\", \"relationship\": \"The central focus of the image, resting on a smooth surface.\", \"relative_size\": \"large within frame\", \"shape_and_color\": \"Irregular shape with a teardrop red gem and a golden band.\", \"texture\": \"Smooth, polished metal and faceted, glassy gemstone.\", \"appearance_details\": \"The gold band has distinct, interlocked links, mimicking a curb chain. The ruby is a rich, translucent red with visible facets.\", \"orientation\": \"Slightly angled, with the teardrop point facing towards the bottom-right.\"}], \"background_setting\": \"A minimalist, light-colored, smooth surface, possibly a tabletop or a display stand, providing a clean and uncluttered backdrop that allows the ring to stand out. There are no other distracting elements in the background.\", \"lighting\": {\"conditions\": \"Soft, diffused studio lighting\", \"direction\": \"Evenly lit from above and slightly to the front\", \"shadows\": \"Subtle, soft shadows directly beneath the ring, indicating depth without harshness.\"}, \"aesthetics\": {\"composition\": \"Centered, close-up shot, with the ring occupying a significant portion of the frame.\", \"color_scheme\": \"Warm complementary colors, with the rich red of the ruby contrasting with the golden band and the neutral, light background.\", \"mood_atmosphere\": \"Elegant, luxurious, and sophisticated.\", \"aesthetic_score\": \"very high\", \"preference_score\": \"very high\"}, \"photographic_characteristics\": {\"depth_of_field\": \"Shallow, with the ring in sharp focus and the background slightly blurred to isolate the subject.\", \"focus\": \"Sharp focus on subject\", \"camera_angle\": \"Slightly high angle, looking down at the ring.\", \"lens_focal_length\": \"Macro\"}, \"style_medium\": \"photograph\", \"context\": \"This is a concept for a high-end jewelry product photograph, suitable for an e-commerce website, a luxury catalog, or a fashion magazine advertisement.\", \"artistic_style\": \"realistic\"}"
  }
}
```

</details>

<details>

<summary>**4MP Landscape** — Generate a widescreen image at 4MP. 4MP adds about 30 seconds of latency compared with 1MP.</summary>



```ts
const response = await env.AI.run(
  'bria/fibo-generate-1.5',
  {
    prompt:
      'aerial view of a winding river through an autumn forest at golden hour, mist rising from the water, highly detailed',
    resolution: '4MP',
    aspect_ratio: '16:9',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/fibo-generate-1.5",
  "input": {
    "prompt": "aerial view of a winding river through an autumn forest at golden hour, mist rising from the water, highly detailed",
    "resolution": "4MP",
    "aspect_ratio": "16:9"
  }
}'
```

![4MP Landscape](https://examples.aig.cloudflare.com/bria/fibo-generate-1.5/4mp-landscape.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/fibo-generate-1.5/4mp-landscape.png",
    "seed": 1535063202,
    "structured_prompt": "{\"short_description\": \"An aerial view of a winding river meandering through a dense autumn forest during the golden hour. Soft mist gently rises from the water's surface, illuminated by the warm, low-angle sunlight, highlighting the vibrant reds, oranges, and yellows of the fall foliage. The scene is highly detailed, capturing the intricate patterns of the trees and the river's flow.\", \"objects\": [{\"description\": \"A wide, winding river, appearing as a dark, reflective ribbon cutting through the forest. Its surface is smooth in some areas, with subtle ripples in others, and a delicate mist hovers just above it.\", \"location\": \"center, extending from foreground to background\", \"relationship\": \"The central element, guiding the eye through the forest.\", \"relative_size\": \"large within frame\", \"shape_and_color\": \"Irregular, sinuous shape; dark blue-green with golden reflections.\", \"texture\": \"Smooth, reflective water with soft, wispy mist.\", \"appearance_details\": \"Reflects the golden light of the sky, creating shimmering streaks.\", \"orientation\": \"Flowing from bottom-right to top-left, then curving through the scene.\"}, {\"description\": \"Dense clusters of deciduous trees, showcasing a spectacular array of autumn colors. Each tree is individually distinguishable, contributing to the rich tapestry of the forest.\", \"location\": \"surrounding the river, filling the midground and background\", \"relationship\": \"Form the main environment through which the river flows, providing a vibrant contrast.\", \"relative_size\": \"large within frame\", \"shape_and_color\": \"Varied organic shapes; predominantly red, orange, yellow, and some lingering green.\", \"texture\": \"Rough, textured canopy with individual leaves visible.\", \"appearance_details\": \"Leaves are illuminated from above, creating a glowing effect.\", \"orientation\": \"Upright, forming a continuous canopy.\"}, {\"description\": \"Thin, ethereal wisps of mist gently rising from the cool surface of the river, catching the golden light.\", \"location\": \"directly above the river\", \"relationship\": \"Intertwined with the river, enhancing the atmospheric quality.\", \"relative_size\": \"small to medium within frame\", \"shape_and_color\": \"Amorphous, transparent white.\", \"texture\": \"Soft, translucent, and diffuse.\", \"appearance_details\": \"Subtly glows with the warm light, creating a mystical effect.\", \"orientation\": \"Rising vertically and drifting gently.\"}], \"background_setting\": \"The forest extends into the horizon, appearing as a vast, undulating carpet of autumn colors. The distant sky, partially visible, shows a soft, hazy golden glow typical of late afternoon.\", \"lighting\": {\"conditions\": \"Golden hour sunlight, low and warm.\", \"direction\": \"Side-lit from the upper left, casting long, soft highlights.\", \"shadows\": \"Long, soft shadows are cast by the trees, stretching across the forest floor and partially obscuring some areas, adding depth and contrast. The mist catches the light, reducing some shadow intensity over the river.\"}, \"aesthetics\": {\"composition\": \"Leading lines created by the winding river, drawing the viewer's eye through the vast landscape. The composition is balanced with the river as a central element.\", \"color_scheme\": \"Warm complementary colors, dominated by rich oranges, reds, and yellows against the cool blues and greens of the river and deeper forest areas.\", \"mood_atmosphere\": \"Serene, majestic, ethereal, and tranquil.\", \"aesthetic_score\": \"very high\", \"preference_score\": \"very high\"}, \"photographic_characteristics\": {\"depth_of_field\": \"Deep, ensuring clarity from the foreground river to the distant forest.\", \"focus\": \"Sharp focus throughout the entire scene, emphasizing the high detail.\", \"camera_angle\": \"High aerial view, directly overhead but slightly angled to show the river's flow and forest depth.\", \"lens_focal_length\": \"Wide-angle, to capture the expansive landscape.\"}, \"style_medium\": \"photograph\", \"context\": \"This is a concept for a high-resolution landscape photograph, ideal for nature documentaries, travel magazines, or fine art prints, capturing the breathtaking beauty of autumn from an aerial perspective.\", \"artistic_style\": \"realistic\"}"
  }
}
```

</details>

## Parameters

prompt

`string`minLength: 1Text prompt. Use alone, with \`images\` as a reference, or with \`structured\_prompt\` to refine a previous result.

▶images\[]

`array`minItems: 1maxItems: 1One reference image: a public URL or base64-encoded image data (a \`data:\` URI prefix is accepted).

structured\_prompt

`string`minLength: 1Structured (VGL) prompt as a JSON string, as returned by a previous result. Recreates that image with the same \`seed\`; add \`prompt\` to refine it. Cannot be combined with \`images\`.

resolution

`string`enum: 1MP, 4MPOutput resolution. 4MP adds about 30 seconds of latency. Default 1MP.

aspect\_ratio

`string`enum: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9Output aspect ratio. Default 1:1.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Seed for reproducible results. Pass the seed of a previous result with its \`structured\_prompt\` to recreate or refine it.

output\_type

`string`enum: png, jpegOutput image format. Default png.

ip\_signal

`boolean`When true, the result carries a \`warning\` if the text input may reference IP-protected content. Default false.

prompt\_content\_moderation

`boolean`Reject the request if the prompt fails content moderation. Default true.

visual\_input\_content\_moderation

`boolean`Reject the request if the reference image fails content moderation. Default true.

visual\_output\_content\_moderation

`boolean`Fail the request if the generated image fails content moderation. Default true.

image

`string`format: uriURL of the generated image. Bria hosts it for a limited time (3 days by default); download it to keep it.

seed

`integer`minimum: -9007199254740991maximum: 9007199254740991Seed used for this image.

structured\_prompt

`string`Structured (VGL) prompt used for this image, as a JSON string. Pass it back with \`seed\` to recreate or refine the image.

warning

`string`Present when \`ip\_signal\` flagged the prompt as possibly IP-protected.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/bria/fibo-generate-1.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/bria/fibo-generate-1.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/bria/fibo-generate-1.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/bria/fibo-generate-1.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bria/fibo-generate-1.5/#page","headline":"FIBO Generate 1.5","description":"FIBO Generate creates images from a text prompt, a reference image, or both. Each result includes the seed and the structured JSON (VGL) prompt used to render it; send them back to recreate the image exactly or to refine it with a new prompt. Outputs are 1MP or 4MP in nine aspect ratios.","url":"https://developers.cloudflare.com/ai/models/bria/fibo-generate-1.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
