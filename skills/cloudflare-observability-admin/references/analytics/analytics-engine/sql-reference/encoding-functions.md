---
description: Encoding SQL functions for Analytics Engine queries.
title: Encoding functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Encoding functions

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/encoding-functions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## bin New

Usage:

```sql
bin(<expression>)
```

`bin` returns a string containing the binary representation of its argument.

Examples:

```sql
-- get the binary representation of 1
bin(1)
-- get the binary representation of a string`
bin('abc')
```

## hex New

Usage:

```sql
hex(<expression>)
```

`hex` returns a string containing the hexadecimal representation of its argument.

Examples:

```sql
-- get the hexadecimal representation of 1
hex(1)
-- get the hexadecimal representation of a string`
hex('abc')
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/encoding-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Encoding SQL functions for Analytics Engine queries.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/encoding-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
