---
description: How URL normalization modifies incoming request URIs before rule evaluation.
title: How URL normalization works
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# How URL normalization works

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/normalization/how-it-works/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

URL normalization modifies separators, encoded elements, and literal bytes in incoming URLs so that they conform to a consistent formatting standard.

For example, consider a WAF custom rule that blocks requests whose URLs match `www.example.com/hello`. The rule would not block a request containing an encoded element — `www.example.com/%68ello`. Normalizing incoming URLs on the Cloudflare global network helps simplify rules expressions containing URLs.

The two available types of URL normalization are:

* [RFC 3986 normalization](#rfc-3986-normalization)
* [Cloudflare normalization](#cloudflare-normalization)

The location where URL normalization will occur depends on the [configured settings](https://developers.cloudflare.com/rules/normalization/settings/).

For examples of the different settings and their impact on request URLs, refer to the [URL normalization examples](https://developers.cloudflare.com/rules/normalization/examples/).

## RFC 3986 normalization

The URL normalization performed according to [RFC 3986 ↗](https://www.ietf.org/rfc/rfc3986.txt) is as follows:

* The following unreserved characters are [percent decoded ↗](https://tools.ietf.org/html/rfc3986#section-2.1) (converted from their `%XX` encoded form back to the original character):
  * Alphabetical characters: `a`\-`z`, `A`\-`Z` (decoded from `%41`\-`%5A` and `%61`\-`%7A`)
  * Digit characters: `0`\-`9` (decoded from `%30`\-`%39`)
  * hyphen `-` (`%2D`), period `.` (`%2E`), underscore `_` (`%5F`), and tilde `~` (`%7E`)
* These reserved characters are not encoded or decoded: `: / ? # [ ] @ ! $ & ' ( ) * + , ; =`
* Other characters, for example literal byte values, are percent encoded.
* Percent encoded representations are converted to upper case.
* URL paths are normalized according to the [Remove Dot Segments ↗](https://tools.ietf.org/html/rfc3986#section-5.2.4) protocol.

## Cloudflare normalization

When using the Cloudflare URL normalization, some extra normalization techniques will be applied to URLs of incoming requests, in the following order:

1. Normalize back slashes (`\`) into forward slashes (`/`).
2. Merge successive forward slashes (for example, `//` will be normalized to `/`).
3. Perform [RFC 3986 normalization](#rfc-3986-normalization) of the resulting URL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/normalization/how-it-works/#page","headline":"How URL normalization works · Cloudflare Rules docs","description":"How URL normalization modifies incoming request URIs before rule evaluation.","url":"https://developers.cloudflare.com/rules/normalization/how-it-works/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
