---
description: R2 NFC-normalizes object key names by default to ensure cross-platform Unicode consistency.
title: Unicode interoperability
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Unicode interoperability

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/reference/unicode-interoperability/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

R2 is built on top of Workers and supports Unicode natively. One nuance of Unicode that is often overlooked is the issue of [filename interoperability ↗](https://en.wikipedia.org/wiki/Filename#Encoding%5Findication%5Finteroperability) due to [Unicode equivalence ↗](https://en.wikipedia.org/wiki/Unicode%5Fequivalence).

Based on feedback from our users, we have chosen to NFC-normalize key names before storing by default. This means that `Héllo` and `Héllo`, for example, are the same object in R2 but different objects in other storage providers. Although `Héllo` and `Héllo` may be different character byte sequences, they are rendered the same.

R2 preserves the encoding for display though. When you list the objects, you will get back the last encoding you uploaded with.

There are still some platform-specific differences to consider:

* Windows and macOS filenames are case-insensitive while R2 and Linux are not.
* Windows console support for Unicode can be error-prone. Make sure to run `chcp 65001` before using command-line tools or use Cygwin if your object names appear to be incorrect.
* Linux allows distinct files that are unicode-equivalent because filenames are byte streams. Unicode-equivalent filenames on Linux will point to the same R2 object.

If it is important for you to be able to bypass the unicode equivalence and use byte-oriented key names, contact your Cloudflare account team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/reference/unicode-interoperability/#page","headline":"Unicode interoperability · Cloudflare R2 docs","description":"R2 NFC-normalizes object key names by default to ensure cross-platform Unicode consistency.","url":"https://developers.cloudflare.com/r2/reference/unicode-interoperability/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
