---
description: SQL operators supported by the SQL API.
title: Operators
image: https://developers.cloudflare.com/analytics/sql-api/sql-reference/operators/og.png?v=7988826db27eee17
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Operators

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/sql-api/sql-reference/operators/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Arithmetic operators

| Operator | Description | Example |
| --- | --- | --- |
| `+` | Addition | `requests + 1` |
| `-` | Subtraction | `bytes - cachedBytes` |
| `*` | Multiplication | `requests * 100` |
| `/` | Division | `bytes / requests` |
| `%` | Modulo | `edgeResponseStatus % 100` |
| unary `-` | Negation | `-1` |

The field types in a dataset determine which arithmetic operations are valid.

## Comparison operators

| Operator | Description |
| --- | --- |
| `=` | Equal to |
| `!=` or `<>` | Not equal to |
| `<` | Less than |
| `<=` | Less than or equal to |
| `>` | Greater than |
| `>=` | Greater than or equal to |

## Logical operators

| Operator | Description |
| --- | --- |
| `AND` | Both predicates are true. |
| `OR` | At least one predicate is true. |
| `NOT` | Negates a predicate. |

Parentheses control evaluation order:

```sql
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '1' HOUR
  AND (edgeResponseStatus = 429 OR edgeResponseStatus >= 500)
```

Tenancy predicates are an exception. Keep `accountTag` and `zoneTag` predicates at the top level and join them with `AND`.

## IN

Use `IN` or `NOT IN` to compare a scalar expression with a non-empty list:

```sql
edgeResponseStatus IN (403, 404, 429)
```

`NOT IN` is not supported for account or zone tenancy predicates.

## BETWEEN

Use `BETWEEN` to test an inclusive range. `NOT BETWEEN` negates the test:

```sql
timestamp BETWEEN '2026-09-15T00:00:00Z' AND '2026-09-15T01:00:00Z'
edgeResponseStatus BETWEEN 400 AND 499
```

## Pattern matching

Use `LIKE` and `NOT LIKE` for case-sensitive pattern matching. Use `ILIKE` and `NOT ILIKE` for case-insensitive matching. In a pattern, `%` matches any sequence of characters and `_` matches one character.

```sql
clientRequestHttpHost ILIKE 'api.%'
```

`LIKE ... ESCAPE` is not supported.

## Null predicates

Use `IS NULL` or `IS NOT NULL` to test whether an expression is null:

```sql
originResponseStatus IS NOT NULL
```

This does not make a standalone `NULL` literal valid in other expressions.

## CASE

The SQL API supports searched and simple `CASE` expressions:

```sql
CASE
  WHEN edgeResponseStatus >= 500 THEN 'server error'
  WHEN edgeResponseStatus >= 400 THEN 'client error'
  ELSE 'other'
END

CASE edgeResponseStatus
  WHEN 200 THEN 'ok'
  ELSE 'other'
END
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/operators/#page","headline":"Operators","description":"SQL operators supported by the SQL API.","url":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/operators/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/operators/og.png?v=7988826db27eee17","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
