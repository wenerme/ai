---
description: In the final part of the AI Image Playground series, Kristian teaches how to utilize Cloudflare's R2 object storage.
title: Store and Catalog AI Generated Images with R2 (Part 3)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Store and Catalog AI Generated Images with R2 (Part 3)

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-store-and-catalog/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In the final part of the AI Image Playground series, Kristian teaches how to utilize Cloudflare's [R2](https://developers.cloudflare.com/r2) object storage in order to maintain and keep track of each AI generated image.

Refer to the AI Image Playground [GitHub repository ↗](https://github.com/kristianfreeman/workers-ai-image-playground) to follow along locally.

Video series

* [Build an AI Image Generator Playground (Part 1)](https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-flux/)
* [Add New AI Models to your Playground (Part 2)](https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-flux-newmodels/)
* [Store and Catalog AI Generated Images with R2 (Part 3)](https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-store-and-catalog/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-store-and-catalog/#page","headline":"Store and Catalog AI Generated Images with R2 (Part 3) · Cloudflare Workers AI docs","description":"In the final part of the AI Image Playground series, Kristian teaches how to utilize Cloudflare's R2 object storage.","url":"https://developers.cloudflare.com/workers-ai/guides/tutorials/image-generation-playground/image-generator-store-and-catalog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","TypeScript"]}
```
