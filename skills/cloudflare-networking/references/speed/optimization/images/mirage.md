---
description: Lazy-load images and reduce bandwidth on mobile connections.
title: Cloudflare Mirage (deprecated)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Mirage (deprecated)

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/images/mirage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Deprecation notice

Mirage was deprecated on September 15, 2025 and is no longer available.

As an alternative, Cloudflare recommends using [lazy loading](https://developers.cloudflare.com/images/tutorials/optimize-mobile-viewing/) and [responsive images](https://developers.cloudflare.com/images/optimization/make-responsive-images/) to optimize image performance for all devices.

## What was Mirage?

Cloudflare Mirage was a mobile image optimization feature that reduced bandwidth usage and accelerated image loading on slow mobile connections and HTTP/1.

Mirage worked by:

* Replacing images with low-resolution thumbnails bundled together into one file.
* Acting as a lazy loader, deferring loading of higher-resolution images until they become visible.

## Why was it deprecated?

Modern web standards and browser capabilities have evolved to provide native support for many of Mirage's features:

* Native lazy loading with the `loading="lazy"` HTML attribute.
* Responsive images using `srcset` and `<picture>` elements.
* HTTP/2 and HTTP/3 providing better performance.
* Improved mobile networks reducing the need for aggressive optimization.

## Migration path

Instead of Mirage, use:

* **[Polish](https://developers.cloudflare.com/images/polish/)** \- Seamlessly optimizes images for all browsers, not only mobile, and keeps images at full resolution.
* **[Image Resizing](https://developers.cloudflare.com/images/optimization/transformations/overview/)** \- Combined with `loading="lazy"` and `srcset` HTML attributes, provides modern responsive image delivery.
* **[Lazy loading guide](https://developers.cloudflare.com/images/tutorials/optimize-mobile-viewing/)** \- Learn how to implement native lazy loading.
* **[Responsive images guide](https://developers.cloudflare.com/images/optimization/make-responsive-images/)** \- Create images that adapt to different devices.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/optimization/images/mirage/#page","headline":"Cloudflare Mirage (deprecated) · Cloudflare Speed docs","description":"Lazy-load images and reduce bandwidth on mobile connections.","url":"https://developers.cloudflare.com/speed/optimization/images/mirage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
