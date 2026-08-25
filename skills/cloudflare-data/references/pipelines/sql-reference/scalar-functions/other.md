---
description: Miscellaneous scalar functions
title: Other functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Other functions

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/other/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

_Cloudflare Pipelines scalar function implementations are based on [Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `arrow_cast`

Casts a value to a specific Arrow data type:

```plaintext
arrow_cast(expression, datatype)
```

**Arguments**

* **expression**: Expression to cast. Can be a constant, column, or function, and any combination of arithmetic or string operators.
* **datatype**: [Arrow data type ↗](https://docs.rs/arrow/latest/arrow/datatypes/enum.DataType.html) name to cast to, as a string. The format is the same as that returned by \[`arrow_typeof`\]

**Example**

```plaintext
> select arrow_cast(-5, 'Int8') as a,
  arrow_cast('foo', 'Dictionary(Int32, Utf8)') as b,
  arrow_cast('bar', 'LargeUtf8') as c,
  arrow_cast('2023-01-02T12:53:02', 'Timestamp(Microsecond, Some("+08:00"))') as d
  ;
+----+-----+-----+---------------------------+
| a  | b   | c   | d                         |
+----+-----+-----+---------------------------+
| -5 | foo | bar | 2023-01-02T12:53:02+08:00 |
+----+-----+-----+---------------------------+
1 row in set. Query took 0.001 seconds.
```

## `arrow_typeof`

Returns the name of the underlying [Arrow data type ↗](https://docs.rs/arrow/latest/arrow/datatypes/enum.DataType.html) of the expression:

```plaintext
arrow_typeof(expression)
```

**Arguments**

* **expression**: Expression to evaluate. Can be a constant, column, or function, and any combination of arithmetic or string operators.

**Example**

```plaintext
> select arrow_typeof('foo'), arrow_typeof(1);
+---------------------------+------------------------+
| arrow_typeof(Utf8("foo")) | arrow_typeof(Int64(1)) |
+---------------------------+------------------------+
| Utf8                      | Int64                  |
+---------------------------+------------------------+
1 row in set. Query took 0.001 seconds.
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/other/#page","headline":"Other functions · Cloudflare Pipelines Docs","description":"Miscellaneous scalar functions","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/other/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
