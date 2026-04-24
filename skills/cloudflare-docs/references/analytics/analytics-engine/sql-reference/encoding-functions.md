---
title: Encoding functions
description: Encoding SQL functions for Analytics Engine queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/analytics/analytics-engine/sql-reference/encoding-functions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Encoding functions

## bin New

Usage:

```

bin(<expression>)


```

`bin` returns a string containing the binary representation of its argument.

Examples:

```

-- get the binary representation of 1

bin(1)

-- get the binary representation of a string`

bin('abc')


```

## hex New

Usage:

```

hex(<expression>)


```

`hex` returns a string containing the hexadecimal representation of its argument.

Examples:

```

-- get the hexadecimal representation of 1

hex(1)

-- get the hexadecimal representation of a string`

hex('abc')


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/encoding-functions/","name":"Encoding functions"}}]}
```
