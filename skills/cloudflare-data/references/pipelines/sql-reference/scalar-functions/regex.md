---
description: Scalar functions for regular expressions
title: Regex functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Regex functions

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/regex/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

_Cloudflare Pipelines scalar function implementations are based on [Apache DataFusion ↗](https://arrow.apache.org/datafusion/) (via [Arroyo ↗](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference._

Cloudflare Pipelines uses a [PCRE-like ↗](https://en.wikibooks.org/wiki/Regular%5FExpressions/Perl-Compatible%5FRegular%5FExpressions)regular expression [syntax ↗](https://docs.rs/regex/latest/regex/#syntax) (minus support for several features including look-around and backreferences).

## `regexp_like`

Returns true if a [regular expression ↗](https://docs.rs/regex/latest/regex/#syntax) has at least one match in a string, false otherwise.

```plaintext
regexp_like(str, regexp[, flags])
```

**Arguments**

* **str**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.
* **regexp**: Regular expression to test against the string expression. Can be a constant, column, or function.
* **flags**: Optional regular expression flags that control the behavior of the regular expression. The following flags are supported:
  * **i**: case-insensitive: letters match both upper and lower case
  * **m**: multi-line mode: ^ and $ match begin/end of line
  * **s**: allow . to match \\n
  * **R**: enables CRLF mode: when multi-line mode is enabled, \\r\\n is used
  * **U**: swap the meaning of x\* and x\*?

**Example**

```sql
select regexp_like('Köln', '[a-zA-Z]ö[a-zA-Z]{2}');
+--------------------------------------------------------+
| regexp_like(Utf8("Köln"),Utf8("[a-zA-Z]ö[a-zA-Z]{2}")) |
+--------------------------------------------------------+
| true                                                   |
+--------------------------------------------------------+
SELECT regexp_like('aBc', '(b|d)', 'i');
+--------------------------------------------------+
| regexp_like(Utf8("aBc"),Utf8("(b|d)"),Utf8("i")) |
+--------------------------------------------------+
| true                                             |
+--------------------------------------------------+
```

Additional examples can be found [here ↗](https://github.com/apache/datafusion/blob/main/datafusion-examples/examples/regexp.rs)

## `regexp_match`

Returns a list of [regular expression ↗](https://docs.rs/regex/latest/regex/#syntax) matches in a string.

```plaintext
regexp_match(str, regexp[, flags])
```

**Arguments**

* **str**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.
* **regexp**: Regular expression to match against. Can be a constant, column, or function.
* **flags**: Optional regular expression flags that control the behavior of the regular expression. The following flags are supported:
  * **i**: case-insensitive: letters match both upper and lower case
  * **m**: multi-line mode: ^ and $ match begin/end of line
  * **s**: allow . to match \\n
  * **R**: enables CRLF mode: when multi-line mode is enabled, \\r\\n is used
  * **U**: swap the meaning of x\* and x\*?

**Example**

```sql
select regexp_match('Köln', '[a-zA-Z]ö[a-zA-Z]{2}');
+---------------------------------------------------------+
| regexp_match(Utf8("Köln"),Utf8("[a-zA-Z]ö[a-zA-Z]{2}")) |
+---------------------------------------------------------+
| [Köln]                                                  |
+---------------------------------------------------------+
SELECT regexp_match('aBc', '(b|d)', 'i');
+---------------------------------------------------+
| regexp_match(Utf8("aBc"),Utf8("(b|d)"),Utf8("i")) |
+---------------------------------------------------+
| [B]                                               |
+---------------------------------------------------+
```

Additional examples can be found [here ↗](https://github.com/apache/datafusion/blob/main/datafusion-examples/examples/regexp.rs)

## `regexp_replace`

Replaces substrings in a string that match a [regular expression ↗](https://docs.rs/regex/latest/regex/#syntax).

```plaintext
regexp_replace(str, regexp, replacement[, flags])
```

**Arguments**

* **str**: String expression to operate on. Can be a constant, column, or function, and any combination of string operators.
* **regexp**: Regular expression to match against. Can be a constant, column, or function.
* **replacement**: Replacement string expression. Can be a constant, column, or function, and any combination of string operators.
* **flags**: Optional regular expression flags that control the behavior of the regular expression. The following flags are supported:
  * **g**: (global) Search globally and don't return after the first match
  * **i**: case-insensitive: letters match both upper and lower case
  * **m**: multi-line mode: ^ and $ match begin/end of line
  * **s**: allow . to match \\n
  * **R**: enables CRLF mode: when multi-line mode is enabled, \\r\\n is used
  * **U**: swap the meaning of x\* and x\*?

**Example**

```sql
SELECT regexp_replace('foobarbaz', 'b(..)', 'X\\1Y', 'g');
+------------------------------------------------------------------------+
| regexp_replace(Utf8("foobarbaz"),Utf8("b(..)"),Utf8("X\1Y"),Utf8("g")) |
+------------------------------------------------------------------------+
| fooXarYXazY                                                            |
+------------------------------------------------------------------------+
SELECT regexp_replace('aBc', '(b|d)', 'Ab\\1a', 'i');
+-------------------------------------------------------------------+
| regexp_replace(Utf8("aBc"),Utf8("(b|d)"),Utf8("Ab\1a"),Utf8("i")) |
+-------------------------------------------------------------------+
| aAbBac                                                            |
+-------------------------------------------------------------------+
```

Additional examples can be found [here ↗](https://github.com/apache/datafusion/blob/main/datafusion-examples/examples/regexp.rs)

## `position`

Returns the position of `substr` in `origstr` (counting from 1). If `substr` does not appear in `origstr`, return 0.

```plaintext
position(substr in origstr)
```

**Arguments**

* **substr**: The pattern string.
* **origstr**: The model string.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/regex/#page","headline":"Regex functions · Cloudflare Pipelines Docs","description":"Scalar functions for regular expressions","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/regex/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
