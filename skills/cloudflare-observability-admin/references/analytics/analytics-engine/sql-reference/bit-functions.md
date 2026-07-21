---
description: Bitwise SQL functions for Analytics Engine.
title: Bit functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Bit functions

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/bit-functions/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## bitAnd  New

Usage:

```sql
bitAnd(a, b)
```

`bitAnd` returns the bitwise AND of expressions `a` and `b`.

Examples:

```sql
-- perform 0b1 & 0b11
bitAnd(1, 3)
-- extract the least significant bit of the integer value of double1
bitAnd(toUInt8(double1), 1)
```

## bitCount  New

Usage:

```sql
bitCount(a)
```

`bitCount` returns the number of bits set to one in the binary representation of `a`.

Examples:

```sql
-- get the number of 1 bits in the binary representation of the float `double1`
bitCount(double1)
-- get the number of 1 bits in the binary representation of `double1` as an integer
bitCount(toUInt32(double1))
-- select rows where at least 5 bits are 1
SELECT * WHERE bitCount(double1) > 5
```

## bitHammingDistance  New

Usage:

```sql
bitHammingDistance(x, y)
```

`bitHammingDistance` returns the number of bits that differ between `x` and `y`.

Examples:

```sql
-- returns zero
bitHammingDistance(1, 1)
-- returns 2
bitHammingDistance(3, 0)
```

## bitNot  New

Usage:

```sql
bitNot(a)
```

`bitNot` returns `a` with all bits flipped.

Examples:

```sql
bitNot(1)
```

## bitOr  New

Usage:

```sql
bitOr(a, b)
```

`bitOr` returns the inclusive bitwise or of `a` and `b`.

Examples:

```sql
-- returns 3
bitOr(1, 2)
```

## bitRotateLeft  New

Usage:

```sql
bitRotateLeft(a, n)
```

`bitRotateLeft` rotates all bits in `a` left by `n` positions.

Examples:

```sql
-- returns 2
bitRotateLeft(1, 1)
-- returns 1
bitRotateLeft(128, 1)
```

## bitRotateRight  New

Usage:

```sql
bitRotateRight(a, n)
```

`bitRotateRight` rotates all bits in `a` right by `n` positions.

Examples:

```sql
-- returns 128
bitRotateRight(1, 1)
-- returns 3
bitRotateRight(12, 2)
```

## bitShiftLeft  New

Usage:

```sql
bitShiftLeft(a, n)
```

`bitShiftLeft` shifts all bits in `a` left by `n` positions.

Examples:

```sql
-- returns 2
bitShiftLeft(1, 1)
-- returns 0
bitShiftLeft(128, 1)
```

## bitShiftRight  New

Usage:

```sql
bitShiftRight(a, n)
```

`bitShiftRight` shifts all bits in `a` right by `n` positions.

Examples:

```sql
-- returns 0
bitShiftRight(1, 1)
-- returns 3
bitShiftRight(12, 2)
```

## bitTest  New

Usage:

```sql
bitTest(a, n)
```

`bitTest` returns the value of bit `n` in number `a`.

Examples:

```sql
-- returns 1
bitTest(3, 1)
-- return 0
bitTest(2, 1)
-- select rows where a particular bit is 1
SELECT * WHERE bitTest(double1, 2)
```

## bitXor  New

Usage:

```sql
bitXor(a, b)
```

`bitXor` returns the bitwise exclusive-or of `a` and `b`.

Examples:

```sql
-- returns 3
bitXor(1, 2)
-- returns 0
bitXor(3, 3)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/bit-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Bitwise SQL functions for Analytics Engine.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/bit-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
