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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/binary-string/#page","headline":"Binary string functions · Cloudflare Pipelines Docs","description":"Scalar functions for manipulating binary strings","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/binary-string/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
