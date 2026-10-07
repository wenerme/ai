---
description: Bria's RMBG 2.0 model removes the background from an image and returns a PNG cutout with a transparent background. Partial transparency from the input's alpha channel is kept by default.
title: Remove Background
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

b

# Remove Background

Image-to-Image • bria

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/bria/remove-background/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`bria/remove-background`

- Third-party

Bria's RMBG 2.0 model removes the background from an image and returns a PNG cutout with a transparent background. Partial transparency from the input's alpha channel is kept by default.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://bria.ai/terms-of-use) |
| More information | [link ↗](https://docs.bria.ai/image-editing/editing/background-remove) |
| Pricing | <ul><li>Per image$0.018</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'bria/remove-background',
  { image: 'https://labs-assets.bria.ai/sandbox-example-inputs/remove_background_example.jpg' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/remove-background",
  "input": {
    "image": "https://labs-assets.bria.ai/sandbox-example-inputs/remove_background_example.jpg"
  }
}'
```

![Portrait Cutout](https://examples.aig.cloudflare.com/bria/remove-background/portrait-cutout.png)

```json
{
  "state": "Completed",
  "result": {
    "image": "https://examples.aig.cloudflare.com/bria/remove-background/portrait-cutout.png"
  }
}
```

## Parameters

image

`string`requiredminLength: 1JPEG or PNG image (RGB, RGBA, or CMYK), a public URL or base64-encoded image data (a \`data:\` URI prefix is accepted).

preserve\_alpha

`boolean`Keep partial transparency from the input alpha channel. When false, every foreground pixel is fully opaque. Default true.

visual\_input\_content\_moderation

`boolean`Reject the request if the input image fails content moderation. Default false.

visual\_output\_content\_moderation

`boolean`Fail the request if the result fails content moderation. Default false.

image

`string`format: uriURL of the PNG cutout with a transparent background. Bria hosts it for a limited time (3 days by default); download it to keep it.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/bria/remove-background/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/bria/remove-background/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/bria/remove-background/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/bria/remove-background/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bria/remove-background/#page","headline":"Remove Background","description":"Bria's RMBG 2.0 model removes the background from an image and returns a PNG cutout with a transparent background. Partial transparency from the input's alpha channel is kept by default.","url":"https://developers.cloudflare.com/ai/models/bria/remove-background/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
