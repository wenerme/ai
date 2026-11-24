---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Bria's RMBG 3.0 removes the background from an image and returns a PNG cutout with a transparent background, with cleaner edges than RMBG 2.0 on hair, fur, glass, smoke and other fine or see-through detail. In Bria's blind test on 234 hard images it gave the best or tied-best cutout on 185, more than Photoroom, remove.bg, Ideogram, BiRefNet or RMBG 2.0. It is trained only on licensed data and takes a few seconds per image; for speed and high volume use bria/remove-background (RMBG 2.0).
title: RMBG 3.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

b

# RMBG 3.0

Image-to-Image • bria

Model ID

`bria/rmbg-3.0` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

Bria's RMBG 3.0 removes the background from an image and returns a PNG cutout with a transparent background, with cleaner edges than RMBG 2.0 on hair, fur, glass, smoke and other fine or see-through detail. In Bria's blind test on 234 hard images it gave the best or tied-best cutout on 185, more than Photoroom, remove.bg, Ideogram, BiRefNet or RMBG 2.0. It is trained only on licensed data and takes a few seconds per image; for speed and high volume use bria/remove-background (RMBG 2.0).

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://bria.ai/terms-of-use) |
| More information | [link ↗](https://docs.bria.ai/whats-new/rmbg-3) |
| Pricing | <ul><li>Per image$0.018</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'bria/rmbg-3.0',
  {
    image:
      'https://docs.bria.ai/assets/hair-in.ecdf8abae813b036bf5f0db7f48f2e8128a2c2c7f24504803c798d87a63750e4.3d71a9a0.webp',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/rmbg-3.0",
  "input": {
    "image": "https://docs.bria.ai/assets/hair-in.ecdf8abae813b036bf5f0db7f48f2e8128a2c2c7f24504803c798d87a63750e4.3d71a9a0.webp"
  }
}'
```

![Loose Curly Hair](https://examples.aig.cloudflare.com/bria/rmbg-3.0/loose-curly-hair.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/rmbg-3.0/loose-curly-hair.png"
  }
}
```

## Examples

<details>

<summary>**See-Through Glassware** — Remove the background behind wine glasses and a glass carafe while the glass stays see-through. Input from Bria's RMBG 3.0 launch page.</summary>



```ts
const response = await env.AI.run(
  'bria/rmbg-3.0',
  {
    image:
      'https://docs.bria.ai/assets/glass-in.93980e97cdade22040b0254f2a98edd7735e0fa32d800bebe8da60c4d2635ca8.3d71a9a0.webp',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/rmbg-3.0",
  "input": {
    "image": "https://docs.bria.ai/assets/glass-in.93980e97cdade22040b0254f2a98edd7735e0fa32d800bebe8da60c4d2635ca8.3d71a9a0.webp"
  }
}'
```

![See-Through Glassware](https://examples.aig.cloudflare.com/bria/rmbg-3.0/see-through-glassware.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/rmbg-3.0/see-through-glassware.png"
  }
}
```

</details>

<details>

<summary>**Wisps of Smoke** — Isolate incense smoke from a patterned textile, keeping the semi-transparent wisps. Input from Bria's RMBG 3.0 launch page.</summary>



```ts
const response = await env.AI.run(
  'bria/rmbg-3.0',
  {
    image:
      'https://docs.bria.ai/assets/smoke-in.5cd10f54a22f918882c091233932184895c120b58d382728d97b83c692216773.3d71a9a0.webp',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/rmbg-3.0",
  "input": {
    "image": "https://docs.bria.ai/assets/smoke-in.5cd10f54a22f918882c091233932184895c120b58d382728d97b83c692216773.3d71a9a0.webp"
  }
}'
```

![Wisps of Smoke](https://examples.aig.cloudflare.com/bria/rmbg-3.0/wisps-of-smoke.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/rmbg-3.0/wisps-of-smoke.png"
  }
}
```

</details>

## Parameters

image

`string`requiredminLength: 1JPEG, PNG, or WEBP image, a public URL or base64-encoded image data (a \`data:\` URI prefix is accepted).

preserve\_alpha

`boolean`Keep partial transparency from the input alpha channel. When false, every foreground pixel is fully opaque. Default true.

visual\_input\_content\_moderation

`boolean`Reject the request if the input image fails content moderation. Default false.

visual\_output\_content\_moderation

`boolean`Fail the request if the result fails content moderation. Default false.

image

`string`format: uriURL of the PNG cutout with a transparent background. Bria hosts it for a limited time (3 days by default); download it to keep it.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/bria/rmbg-3.0/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/bria/rmbg-3.0/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/bria/rmbg-3.0/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/bria/rmbg-3.0/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bria/rmbg-3.0/#page","headline":"RMBG 3.0","description":"Bria's RMBG 3.0 removes the background from an image and returns a PNG cutout with a transparent background, with cleaner edges than RMBG 2.0 on hair, fur, glass, smoke and other fine or see-through detail. In Bria's blind test on 234 hard images it gave the best or tied-best cutout on 185, more than Photoroom, remove.bg, Ideogram, BiRefNet or RMBG 2.0. It is trained only on licensed data and takes a few seconds per image; for speed and high volume use bria/remove-background (RMBG 2.0).","url":"https://developers.cloudflare.com/ai/models/bria/rmbg-3.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
