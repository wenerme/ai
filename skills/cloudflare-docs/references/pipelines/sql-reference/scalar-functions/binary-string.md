---
title: Binary string functions
description: Scalar functions for manipulating binary strings
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/pipelines/sql-reference/scalar-functions/binary-string.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Binary string functions

_Cloudflare Pipelines scalar function implementations are based on[Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `encode`

Encode binary data into a textual representation.

```

encode(expression, format)


```

**Arguments**

* **expression**: Expression containing string or binary data
* **format**: Supported formats are: `base64`, `hex`

**Related functions**:[decode](#decode)

## `decode`

Decode binary data from textual representation in string.

```

decode(expression, format)


```

**Arguments**

* **expression**: Expression containing encoded string data
* **format**: Same arguments as [encode](#encode)

**Related functions**:[encode](#encode)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/scalar-functions/","name":"Scalar functions"}},{"@type":"ListItem","position":5,"item":{"@id":"/pipelines/sql-reference/scalar-functions/binary-string/","name":"Binary string functions"}}]}
```
