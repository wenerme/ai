---
description: Cloudflare Polish skips AVIF conversion when it would increase file size, when the image is too small, when the image is animated, or when AVIF capacity is temporarily unavailable.
title: AVIF may be skipped
image: https://developers.cloudflare.com/images/polish/no-avif/og.png?v=b05e3db74b0ff8a9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# AVIF may be skipped

Last updated Nov 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/images/polish/no-avif/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Polish avoids converting images to the AVIF format when such conversion would increase the file size. AVIF also has a few format-specific requirements, and capacity limits that can occasionally cause Polish to skip AVIF conversion for a particular request.

## Polish never makes files larger

When converting an image to AVIF would increase its file size, Polish skips the conversion and keeps the original format. Like WebP, AVIF is less likely to improve on already heavily-compressed or low-quality JPEG images, since there is less redundant data left to remove.

## AVIF requires a minimum image size

AVIF does not support images smaller than 16x16 pixels. If your image is smaller than this, Polish will not produce an AVIF version, and will serve the original format (or WebP, if enabled) instead.

## AVIF does not support animated images

Unlike WebP, AVIF does not support animated images. If the origin image is animated (for example, an animated GIF or animated PNG), Polish will not produce an AVIF version of it.

## AVIF conversion may be temporarily unavailable

AVIF compression is more computationally intensive than Polish's other compression options. During periods of high demand, Polish may be temporarily unable to produce an AVIF version for some requests. When this happens, Polish serves the original format (or a WebP version, if enabled). A subsequent request for the same image may successfully produce an AVIF version once demand decreases.

## AVIF compression efficiency may vary under high demand

To maintain fast response times, Polish may use faster, less exhaustive compression settings for AVIF during periods of high demand. This can result in a larger AVIF file than Polish would otherwise produce, though Polish still only serves AVIF when it is smaller than the original image.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/polish/no-avif/#page","headline":"AVIF may be skipped","description":"Cloudflare Polish skips AVIF conversion when it would increase file size, when the image is too small, when the image is animated, or when AVIF capacity is temporarily unavailable.","url":"https://developers.cloudflare.com/images/polish/no-avif/","inLanguage":"en","image":"https://developers.cloudflare.com/images/polish/no-avif/og.png?v=b05e3db74b0ff8a9","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
