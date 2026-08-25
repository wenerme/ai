---
description: Definitions of core Cloudflare Images terms including transformations, variants, hosted images, and origins.
title: Key concepts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Key concepts

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/get-started/key-concepts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Here is a summary of the key terms that we use throughout our guides.

| Term               | What this means                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Remote image       | An image that is stored outside of Images storage, including images in [R2](https://developers.cloudflare.com/r2/).                                                                                                                                                                                                                                                              |
| Transformation     | A request to optimize a remote image that is stored outside of Images.                                                                                                                                                                                                                                                                                                           |
| Origin             | The location where your image is stored.When you optimize a remote image, Cloudflare will pull the original image from the origin and store it in cache.                                                                                                                                                                                                                         |
| Hosted image       | An image that is stored in Images.Cloudflare dynamically serves copies of your original image, optimized based on your requirements.                                                                                                                                                                                                                                             |
| Parameter / Option | A parameter is a type of optimization that you can perform on an image.An option is the value for the parameter.For example, you can set the width parameter to a value of 100 to resize an image to a width of 100.                                                                                                                                                             |
| Variant            | A predefined way to specify how a hosted image should be resized.For example, you can create a variant called "thumbnail" that sets image dimensions to 100x100.When you serve images with this variant, Cloudflare will serve a version of the original image that is resized to 100x100.Predefined variants specify a limited set of parameters: width, height, fit, and blur. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/get-started/key-concepts/#page","headline":"Key concepts · Cloudflare Images docs","description":"Definitions of core Cloudflare Images terms including transformations, variants, hosted images, and origins.","url":"https://developers.cloudflare.com/images/get-started/key-concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
