---
description: Data types, literals, arrays, and JSON values supported by the SQL API.
title: Data types and literals
image: https://developers.cloudflare.com/analytics/sql-api/sql-reference/data-types/og.png?v=e0a6da4814b37cd9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Data types and literals

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/sql-api/sql-reference/data-types/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Dataset schemas can expose the following field types:

| Type | Description |
| --- | --- |
| `String` | UTF-8 text. |
| `UInt8`, `UInt16`, `UInt32`, `UInt64` | Unsigned integers. |
| `Int64` | Signed integer. |
| `Float64` | Double-precision floating-point number. |
| `Date` | Calendar date. |
| `DateTime` | Timestamp with second precision. |
| `DateTime64(3)` | Timestamp with millisecond precision. |
| `Array(type)` | List of values of one scalar type. |
| `Json` | Object with dynamically typed values. |

## Literals

The SQL API supports integer, floating-point, string, and Boolean literals.

```sql
SELECT
  42 AS integer_value,
  3.14 AS float_value,
  'example' AS string_value,
  TRUE AS boolean_value
FROM events.httpRequests
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= '2026-09-15T00:00:00Z'
LIMIT 1
```

Escape a single quote inside a string according to standard SQL string literal syntax.

Standalone `NULL` literals are not supported. Expressions can still produce null values, and `IS NULL` and `IS NOT NULL` predicates are supported.

## Timestamp values

Use an ISO 8601 timestamp with a timezone:

```sql
timestamp >= '2026-09-15T08:30:00Z'
timestamp >= '2026-09-15T10:30:00+02:00'
```

The API normalizes timestamp values to UTC. A date without a time is interpreted as midnight UTC:

```sql
timestamp >= '2026-09-15'
```

A date and time without a timezone is rejected. For example, do not use `'2026-09-15T08:30:00'`.

## Arrays

An array field can only be selected as a complete, top-level result field:

```sql
SELECT botTags
FROM logs.httpRequests
WHERE zoneTag = '<ZONE_TAG>'
  AND timestamp >= '2026-09-15T00:00:00Z'
LIMIT 10
```

Array filtering, grouping, sorting, aggregation, indexing, and unnesting are not supported.

## JSON fields

Some datasets expose unstructured fields as JSON objects. You can select the complete object or one exact top-level key:

```sql
SELECT attributes, attributes['http.method'] AS method
FROM logs.workersLogs
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '1' HOUR
LIMIT 10
```

Key lookup is exact. A key such as `http.method` is one top-level key, not a path through a nested object. A missing key returns JSON `null`.

Depending on the dataset backend, an exact-key lookup can also be compared with a string, number, or Boolean literal, grouped, or passed to `SUM` and `AVG`:

```sql
SELECT attributes['http.method'] AS method, COUNT(*) AS events
FROM logs.workersLogs
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '1' HOUR
  AND attributes['http.method'] = 'GET'
GROUP BY attributes['http.method']
```

JSON casts, nested traversal, ordering by JSON values, comparisons between two JSON values, and `COUNT` of a JSON key are not supported. Dynamic JSON lookups also cannot be wrapped in `LIKE`, `BETWEEN`, `IS NULL`, or `CASE` expressions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/data-types/#page","headline":"Data types and literals","description":"Data types, literals, arrays, and JSON values supported by the SQL API.","url":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/data-types/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/data-types/og.png?v=e0a6da4814b37cd9","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
