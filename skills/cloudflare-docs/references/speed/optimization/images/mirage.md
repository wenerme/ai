---
title: Cloudflare Mirage (deprecated)
description: Cloudflare Mirage was a mobile image optimization feature that reduced bandwidth usage and accelerated image loading on slow mobile connections and HTTP/1.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/images/mirage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Mirage (deprecated)

Deprecation notice

Mirage was deprecated on September 15, 2025 and is no longer available.

As an alternative, Cloudflare recommends using [lazy loading](https://developers.cloudflare.com/images/tutorials/optimize-mobile-viewing/) and [responsive images](https://developers.cloudflare.com/images/transform-images/make-responsive-images/) to optimize image performance for all devices.

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
* **[Image Resizing](https://developers.cloudflare.com/images/transform-images/)** \- Combined with `loading="lazy"` and `srcset` HTML attributes, provides modern responsive image delivery.
* **[Lazy loading guide](https://developers.cloudflare.com/images/tutorials/optimize-mobile-viewing/)** \- Learn how to implement native lazy loading.
* **[Responsive images guide](https://developers.cloudflare.com/images/transform-images/make-responsive-images/)** \- Create images that adapt to different devices.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/images/","name":"Image optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/images/mirage/","name":"Cloudflare Mirage (deprecated)"}}]}
```
