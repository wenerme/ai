---
description: Example Compression Rules for Brotli, Gzip, and Zstandard configurations.
title: Compression Rules examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Compression Rules examples

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/compression-rules/examples/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[**Disable Brotli compression**Create a compression rule to turn off Brotli compression for all incoming requests of a given zone.](https://developers.cloudflare.com/rules/compression-rules/examples/disable-all-brotli/)

[**Disable compression for AVIF images**Create a compression rule to turn off compression for AVIF images, based on either the content type or the file extension specified in the request.](https://developers.cloudflare.com/rules/compression-rules/examples/disable-compression-avif/)

[**Enable Zstandard compression for default content types**Create a compression rule to turn on Zstandard compression for response content types where Cloudflare applies compression by default.](https://developers.cloudflare.com/rules/compression-rules/examples/enable-zstandard/)

[**Use Gzip compression for CSV files**Create a compression rule to set Gzip compression as the preferred compression method for CSV files.](https://developers.cloudflare.com/rules/compression-rules/examples/gzip-for-csv/)

[**Use only Brotli compression for a specific path**Create a compression rule to set Brotli as the only supported compression algorithm for a specific URI path.](https://developers.cloudflare.com/rules/compression-rules/examples/only-brotli-url-path/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/rules/compression-rules/examples/#page","headline":"Compression Rules examples · Cloudflare Rules docs","description":"Example Compression Rules for Brotli, Gzip, and Zstandard configurations.","url":"https://developers.cloudflare.com/rules/compression-rules/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
