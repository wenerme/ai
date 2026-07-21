---
title: Key concepts
description: Definitions of core Cloudflare Images terms including transformations, variants, hosted images, and origins.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Key concepts

Here is a summary of the key terms that we use throughout our guides.

| Term               | What this means                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Remote image       | An image that is stored outside of Images storage, including images in [R2](https://developers.cloudflare.com/r2/).                                                                                                                                                                                                                                                              |
| Transformation     | A request to optimize a remote image that is stored outside of Images.                                                                                                                                                                                                                                                                                                           |
| Origin             | The location where your image is stored.When you optimize a remote image, Cloudflare will pull the original image from the origin and store it in cache.                                                                                                                                                                                                                         |
| Hosted image       | An image that is stored in Images.Cloudflare dynamically serves copies of your original image, optimized based on your requirements.                                                                                                                                                                                                                                             |
| Parameter / Option | A parameter is a type of optimization that you can perform on an image.An option is the value for the parameter.For example, you can set the width parameter to a value of 100 to resize an image to a width of 100.                                                                                                                                                             |
| Variant            | A predefined way to specify how a hosted image should be resized.For example, you can create a variant called "thumbnail" that sets image dimensions to 100x100.When you serve images with this variant, Cloudflare will serve a version of the original image that is resized to 100x100.Predefined variants specify a limited set of parameters: width, height, fit, and blur. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/get-started/key-concepts/#page","headline":"Key concepts · Cloudflare Images docs","description":"Definitions of core Cloudflare Images terms including transformations, variants, hosted images, and origins.","url":"https://developers.cloudflare.com/images/get-started/key-concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/get-started/key-concepts/","name":"Key concepts"}}]}
```
