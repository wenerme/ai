---
description: Learn about Cf-Polished statuses in Cloudflare Images. Understand how to handle missing headers, optimize image formats, and troubleshoot common issues.
title: Cf-Polished statuses
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Cf-Polished statuses

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/polish/cf-polished-statuses/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If a `Cf-Polished` header is not returned, try [using single-file cache purge](https://developers.cloudflare.com/cache/how-to/purge-cache) to purge the image. The `Cf-Polished` header may also be missing if the origin is sending non-image `Content-Type`, or non-cacheable `Cache-Control`.

* `input_too_large`: The input image is too large or complex to process, and needs a lower resolution. Cloudflare recommends using PNG or JPEG images that are less than 4,000 pixels in any dimension, and smaller than 20 MB.
* `not_compressed` or `not_needed`: The image was fully optimized at the origin server and no compression was applied.
* `webp_bigger`: Polish attempted to convert to WebP, but the WebP image was not better than the original format. Because the WebP version does not exist, the status is set on the JPEG/PNG version of the response. Refer to [the reasons why Polish chooses not to use WebP](https://developers.cloudflare.com/images/polish/no-webp/).
* `cannot_optimize` or `internal_error`: The input image is corrupted or incomplete at the origin server. Upload a new version of the image to the origin server.
* `format_not_supported`: The input image format is not supported (for example, BMP or TIFF) or the origin server is using additional optimization software that is not compatible with Polish. Try converting the input image to a web-compatible format (like PNG or JPEG) and/or disabling additional optimization software at the origin server.
* `vary_header_present`: The origin web server has sent a `Vary` header with a value other than `accept-encoding`. If the origin web server is attempting to support WebP, disable WebP at the origin web server and let Polish perform the WebP conversion. Polish will still work if `accept-encoding` is the only header listed within the `Vary` header. Polish skips image URLs processed by [Cloudflare Images](https://developers.cloudflare.com/images/optimization/transformations/overview).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/polish/cf-polished-statuses/#page","headline":"Cf-Polished statuses · Cloudflare Images docs","description":"Learn about Cf-Polished statuses in Cloudflare Images. Understand how to handle missing headers, optimize image formats, and troubleshoot common issues.","url":"https://developers.cloudflare.com/images/polish/cf-polished-statuses/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
