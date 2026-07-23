---
description: Scalar functions for hashing values
title: Hashing functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Hashing functions

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/hashing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

_Cloudflare Pipelines scalar function implementations are based on [Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

## `digest`

Computes the binary hash of an expression using the specified algorithm.

```plaintext
digest(expression, algorithm)
```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.
* **algorithm**: String expression specifying algorithm to use. Must be one of:
  * md5
  * sha224
  * sha256
  * sha384
  * sha512
  * blake2s
  * blake2b
  * blake3

## `md5`

Computes an MD5 128-bit checksum for a string expression.

```plaintext
md5(expression)
```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha224`

Computes the SHA-224 hash of a binary string.

```plaintext
sha224(expression)
```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha256`

Computes the SHA-256 hash of a binary string.

```plaintext
sha256(expression)
```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha384`

Computes the SHA-384 hash of a binary string.

```plaintext
sha384(expression)
```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

## `sha512`

Computes the SHA-512 hash of a binary string.

```plaintext
sha512(expression)
```

**Arguments**

* **expression**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/hashing/#page","headline":"Hashing functions · Cloudflare Pipelines Docs","description":"Scalar functions for hashing values","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/hashing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
