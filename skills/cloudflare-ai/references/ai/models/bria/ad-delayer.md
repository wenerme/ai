---
description: "Ad Delayer turns a finished, flat ad image into an editable JSON layer document: a background plate, product and logo cutouts, live text with typography, and vector shapes, with each image layer hosted as its own file. It is designed for flat ads; results for ordinary photographs are not guaranteed. Bria trains it exclusively on licensed data."
title: Ad Delayer
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

b

# Ad Delayer

Image-to-Document • bria

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/bria/ad-delayer/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`bria/ad-delayer`

- Third-party

Ad Delayer turns a finished, flat ad image into an editable JSON layer document: a background plate, product and logo cutouts, live text with typography, and vector shapes, with each image layer hosted as its own file. It is designed for flat ads; results for ordinary photographs are not guaranteed. Bria trains it exclusively on licensed data.

| Model Info | |
| --- | --- |
| Terms and License | [link ↗](https://bria.ai/terms-of-use) |
| More information | [link ↗](https://docs.bria.ai/ads/transformations/delayer-ad) |
| Pricing | <ul><li>Per image$0.30</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'bria/ad-delayer',
  { image: 'https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/simple-generation.jpg' },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bria/ad-delayer",
  "input": {
    "image": "https://examples.aig.cloudflare.com/xai/grok-imagine-image-2.0/simple-generation.jpg"
  }
}'
```

```
Constructed a layered ad.
```

```json
{
  "state": "Completed",
  "result": {
    "layer_document": "https://examples.aig.cloudflare.com/bria/ad-delayer/concert-poster.json",
    "text": "Constructed a layered ad."
  }
}
```

## Parameters

▶image

`one of`required

layer\_document

`string`format: uriURL of the JSON layer document: the canvas size, font stylesheets, and z-ordered image, vector, and text layers. Image layers link to their extracted assets through \`asset\_path\`. Bria hosts the document and assets for 30 days.

text

`string`Short summary from Bria of the layers it built.

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/bria/ad-delayer/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/bria/ad-delayer/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/bria/ad-delayer/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/bria/ad-delayer/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bria/ad-delayer/#page","headline":"Ad Delayer","description":"Ad Delayer turns a finished, flat ad image into an editable JSON layer document: a background plate, product and logo cutouts, live text with typography, and vector shapes, with each image layer hosted as its own file. It is designed for flat ads; results for ordinary photographs are not guaranteed. Bria trains it exclusively on licensed data.","url":"https://developers.cloudflare.com/ai/models/bria/ad-delayer/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
