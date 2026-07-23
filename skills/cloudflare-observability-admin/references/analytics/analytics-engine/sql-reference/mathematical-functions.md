---
description: Mathematical SQL functions for Analytics Engine.
title: Mathematical functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Mathematical functions

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/mathematical-functions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## intDiv

Usage:

```sql
intDiv(a, b)
```

Divide `a` by `b`, rounding the answer down to the nearest whole number.

## log New

Usage:

```sql
log(<expression>)
```

`log` returns the natural logarithm of a provided number. `ln` is also available as an alias.

Examples:

```sql
-- get the natural logarithm of the double1 column
log(double1)
```

## pow New

Usage:

```sql
pow(<expression>, <expression>)
```

`pow` returns the first argument raised to the power of the second argument.

Examples:

```sql
-- get the square of the double1 column
pow(double1, 2)
```

## round New

Usage:

```sql
round(<expression>[, n])
```

`round` returns a number rounded to the nearest whole number, or to a given number of decimal points specified by the second argument.

Examples:

```sql
-- round 5.5 to 6
round(5.5)
-- round 3.14 to 3.1
round(3.14, 1)
```

## floor New

Usage:

```sql
floor(<expression>[, n])
```

`floor` returns a number rounded down to a whole number, or rounded down to a given number of decimal points specified by the second argument.

Examples:

```sql
-- round down 5.5 to 5
floor(5.5)
-- round down 3.14 to 3.1
floor(3.14, 1)
```

## ceil New

Usage:

```sql
ceil(<expression>[, n])
```

`ceil` returns a number rounded up to a whole number, or rounded up to a given number of decimal points specified by the second argument.

Examples:

```sql
-- round up 5.5 to 6
ceil(5.5)
-- round up 3.14 to 3.2
ceil(3.14, 1)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/mathematical-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Mathematical SQL functions for Analytics Engine.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/mathematical-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
