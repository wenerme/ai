---
description: SQL statements and clauses supported by the SQL API.
title: Statements and clauses
image: https://developers.cloudflare.com/analytics/sql-api/sql-reference/statements/og.png?v=c0195f3b9cab1c15
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Statements and clauses

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/sql-api/sql-reference/statements/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## SELECT

The SQL API accepts one `SELECT` statement per request.

```sql
SELECT select_expression [, ...]
FROM schema.dataset
[WHERE predicate]
[GROUP BY expression [, ...]]
[HAVING aggregate_predicate]
[ORDER BY expression [ASC | DESC] [, ...]]
[LIMIT non_negative_integer [OFFSET non_negative_integer]]
[FORMAT JSON | JSONEachRow | TabSeparated | TSV]
```

Use a schema-qualified dataset name, such as `events.httpRequests`. Bare dataset names are not supported.

Use `AS` to set result field names:

```sql
SELECT
  clientRequestHttpHost AS host,
  edgeResponseStatus AS status
FROM events.httpRequests
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '1' DAY
LIMIT 100
```

`SELECT *` returns every field that is available to the caller. If permissions deny a field reached only through `*`, the API omits it. Explicitly selecting a denied field returns HTTP `403`. Explicit field lists provide a more stable response when a dataset gains fields.

## WHERE

Use `WHERE` to set tenancy, time, and data filters.

```sql
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '1' DAY
  AND edgeResponseStatus >= 500
```

Every HTTP API query requires an account or zone scope. You can provide scope through the JSON request instead of SQL. The [Workers binding](https://developers.cloudflare.com/analytics/sql-api/workers-binding/) supplies account scope automatically, so do not include a tenancy predicate in binding queries. Supported SQL tenancy forms for HTTP API queries are:

```sql
accountTag = '<ACCOUNT_TAG>'
zoneTag = '<ZONE_TAG>'
zoneTag IN ('<ZONE_TAG_1>', '<ZONE_TAG_2>')
```

A query can select only one account. Specify zone tenancy in one `zoneTag` predicate. Use `IN` to select multiple zones. Tenancy predicates must be top-level conditions joined with `AND`. Do not place `accountTag` or `zoneTag` inside `OR`, `NOT`, or `NOT IN` expressions.

Any query containing `zoneTag` requires either **Zone Analytics Read** permission for every named zone or **Account Analytics Read** permission for their owning account.

Every query also requires a lower bound on the dataset timestamp field. Use `>`, `>=`, or `BETWEEN` to provide the lower bound, or use request-level `time_range`. The timestamp field name varies by dataset.

## GROUP BY

Use `GROUP BY` with aggregate functions to return one row for each unique group.

```sql
SELECT edgeResponseStatus AS status, COUNT(*) AS requests
FROM events.httpRequests
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '1' HOUR
GROUP BY edgeResponseStatus
```

## HAVING

Use `HAVING` to filter grouped results. A `HAVING` expression must reference an aggregate function.

```sql
SELECT clientRequestHttpHost AS host, COUNT(*) AS requests
FROM events.httpRequests
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '1' HOUR
GROUP BY clientRequestHttpHost
HAVING COUNT(*) > 100
```

## ORDER BY

Use `ORDER BY` to sort results in ascending (`ASC`) or descending (`DESC`) order. `ASC` is the default.

Every query that uses `ORDER BY` must also use `LIMIT`. Workers Analytics Engine datasets preserve compatibility with `ORDER BY` without `LIMIT`.

```sql
ORDER BY requests DESC
LIMIT 10
```

`NULLS FIRST` and `NULLS LAST` are not supported.

## LIMIT

`LIMIT` accepts a non-negative integer literal. Parameters and expressions are not supported as limit values.

```sql
LIMIT 100
```

## OFFSET

ClickHouse-backed datasets support `OFFSET` after `LIMIT`. Both values must be non-negative integer literals. Log Explorer-backed datasets do not support `OFFSET`.

```sql
LIMIT 100 OFFSET 200
```

Workers Analytics Engine datasets also preserve compatibility with `OFFSET` without `LIMIT`.

## FORMAT

Add a top-level `FORMAT` clause to select the response format:

```sql
FORMAT JSON
FORMAT JSONEachRow
FORMAT TabSeparated
FORMAT TSV
```

`TSV` is an alias for `TabSeparated`. Refer to [Response formats](https://developers.cloudflare.com/analytics/sql-api/query-api/#response-formats) for content types and response shapes. A `FORMAT` clause inside a derived table is not supported.

## Derived table projection

The SQL API supports one restricted derived table when the outer query only projects expressions from the inner query:

```sql
SELECT value
FROM (
  SELECT COUNT(*) AS value
  FROM events.httpRequests
  WHERE accountTag = '<ACCOUNT_TAG>'
    AND timestamp >= NOW() - INTERVAL '1' HOUR
)
```

The outer query cannot add filtering, grouping, aggregation, ordering, or a limit. The inner query can contain supported ordering and limits. Derived table aliases and nested derived tables are not supported.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/statements/#page","headline":"Statements and clauses","description":"SQL statements and clauses supported by the SQL API.","url":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/statements/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/sql-api/sql-reference/statements/og.png?v=c0195f3b9cab1c15","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
