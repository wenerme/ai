---
description: Scalar functions for manipulating binary strings
title: Binary string functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Binary string functions

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/binary-string/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

_Cloudflare Pipelines scalar function implementations are based on [Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `encode`

Encode binary data into a textual representation.

```plaintext
encode(expression, format)
```

**Arguments**

* **expression**: Expression containing string or binary data
* **format**: Supported formats are: `base64`, `hex`

**Related functions**: [decode](#decode)

## `decode`

Decode binary data from textual representation in string.

```plaintext
decode(expression, format)
```

**Arguments**

* **expression**: Expression containing encoded string data
* **format**: Same arguments as [encode](#encode)

**Related functions**: [encode](#encode)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/binary-string/#page","headline":"Binary string functions · Cloudflare Pipelines Docs","description":"Scalar functions for manipulating binary strings","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/binary-string/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
