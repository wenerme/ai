---
description: Supported features, known limitations, and best practices for R2 SQL queries.
title: Limitations and best practices
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt
> Use this file to discover all available pages before exploring further.

# Limitations and best practices

Last updated Jun 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2-sql/reference/limitations-best-practices/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

R2 SQL is in open beta. Limitations and best practices will change over time.

This page summarizes supported features, limitations, and best practices.

## Quick reference

| Feature                                                 | Supported | Notes                                                                      |
| ------------------------------------------------------- | --------- | -------------------------------------------------------------------------- |
| SELECT, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT        | Yes       |                                                                            |
| Column aliases (AS)                                     | Yes       |                                                                            |
| Expressions (CASE, CAST, LIKE, BETWEEN, IN, arithmetic) | Yes       | Full expression support                                                    |
| EXPLAIN                                                 | Yes       | Returns execution plan as text or JSON                                     |
| Scalar functions                                        | Yes       | Math, string, datetime, regex, crypto, array, map, struct, JSON            |
| Aggregate functions                                     | Yes       | Basic, approximate, statistical, bitwise, boolean, positional              |
| Approximate aggregates                                  | Yes       | approx\_distinct, approx\_median, approx\_percentile\_cont, approx\_top\_k |
| Struct / Array / Map column types                       | Yes       | Bracket notation, get\_field(), array functions, map functions             |
| CTEs (WITH ... AS)                                      | Yes       | Can reference different tables and include JOINs                           |
| JOINs (INNER, LEFT, RIGHT, FULL OUTER, CROSS)           | Yes       | All standard join types                                                    |
| Implicit joins (comma FROM)                             | Yes       |                                                                            |
| Subqueries (IN, NOT IN)                                 | Yes       | NOT IN not supported on nullable columns — use NOT EXISTS instead          |
| Subqueries (EXISTS, NOT EXISTS)                         | Yes       | semi-join and anti-join patterns                                           |
| Scalar subqueries                                       | Yes       | In SELECT, WHERE, HAVING                                                   |
| Derived tables (FROM subqueries)                        | Yes       | Can be nested and joined. LATERAL derived tables not supported.            |
| Self-joins                                              | Yes       | Same table with different aliases                                          |
| Window functions (OVER)                                 | Yes       | Inline OVER (...) only — named WINDOW clause not supported                 |
| QUALIFY                                                 | Yes       | Filter on a window function result                                         |
| SELECT DISTINCT / DISTINCT ON                           | Yes       |                                                                            |
| func(DISTINCT ...)                                      | Yes       | COUNT, SUM, AVG, and other aggregates                                      |
| Set operations (UNION, UNION ALL, INTERSECT, EXCEPT)    | Yes       |                                                                            |
| GROUPING SETS / ROLLUP / CUBE                           | Yes       |                                                                            |
| OFFSET                                                  | No        |                                                                            |
| INSERT / UPDATE / DELETE                                | No        | Read-only                                                                  |
| CREATE / DROP / ALTER                                   | No        | Read-only                                                                  |

For the full SQL syntax, refer to the [SQL reference](https://developers.cloudflare.com/r2-sql/sql-reference/).

---

## Unsupported SQL features

| Feature                                                            | Error                                               |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| OFFSET                                                             | unsupported feature: OFFSET clause is not supported |
| Named WINDOW clause                                                | unsupported feature: WINDOW clause is not supported |
| INSERT / UPDATE / DELETE                                           | only read-only queries are allowed                  |
| CREATE / DROP / ALTER                                              | only read-only queries are allowed                  |
| UNNEST / PIVOT / UNPIVOT                                           | Not supported                                       |
| Wildcard modifiers (ILIKE, EXCLUDE, EXCEPT, REPLACE, RENAME on \*) | Not supported                                       |
| Nested (parenthesized) joins                                       | Not supported                                       |
| LATERAL derived tables / LATERAL VIEW                              | Not supported                                       |
| PERCENTILE\_DISC                                                   | Not supported — use PERCENTILE\_CONT                |

---

## Unsupported expression patterns

| Pattern                             | Alternative                                       |
| ----------------------------------- | ------------------------------------------------- |
| NOT IN subquery on nullable columns | Use NOT EXISTS with a correlated subquery instead |

Exact aggregates such as `COUNT(DISTINCT ...)`, `MEDIAN`, `PERCENTILE_CONT`, `ARRAY_AGG`, and `STRING_AGG` are supported. On large datasets, prefer the approximate alternatives (`approx_distinct`, `approx_median`, `approx_percentile_cont`) for lower memory and compute. Refer to [Aggregate functions](https://developers.cloudflare.com/r2-sql/sql-reference/aggregate-functions/).

---

## Runtime constraints

| Constraint                           | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resource-intensive queries           | During open beta, queries that require high memory or compute may time out. This includes multi-way joins (three or more large tables), COUNT(DISTINCT) and other func(DISTINCT ...) across joins or high-cardinality columns, ARRAY\_AGG / STRING\_AGG, set operations that deduplicate large inputs, window functions over large partitions, and large sorts or high-cardinality GROUP BY. Add WHERE filters and LIMIT, and prefer approx\_\* aggregates to reduce the chance of a timeout. |
| Budget-gated functions               | MEDIAN, PERCENTILE\_CONT, ARRAY\_AGG, STRING\_AGG, NTH\_VALUE used as an aggregate, any aggregate with DISTINCT, and window functions (including those used through QUALIFY) are budget-gated up front. R2 SQL estimates the memory required before running the query and rejects it with a 400 error if too much data would be scanned. Add a GROUP BY or WHERE filters to reduce the rows processed.                                                                                        |
| Multi-table queries                  | JOINs, subqueries (IN, EXISTS, scalar, derived tables), and multi-table CTEs are supported. Performance depends on intermediate result size; use WHERE filters to manage join selectivity.                                                                                                                                                                                                                                                                                                    |
| Partitioned and unpartitioned tables | Both partitioned and unpartitioned Iceberg tables are supported.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Parquet format only                  | No CSV, JSON, or other formats.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Read-only                            | R2 SQL is a query engine, not a database. No writes.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| now() / current\_time() precision    | Quantized to 10ms boundaries and forced to UTC.                                                                                                                                                                                                                                                                                                                                                                                                                                               |

---

## Common error codes

| Code  | Meaning                                                            |
| ----- | ------------------------------------------------------------------ |
| 40003 | Invalid SQL syntax                                                 |
| 40004 | Invalid query (unsupported feature, unknown column, type mismatch) |
| 80001 | Edge service connection failure (retry)                            |

---

## Best practices

1. Include time-range filters in `WHERE` to limit data scanned.
2. Use specific column names instead of `SELECT *` for better performance.
3. Use `LIMIT` to control result set size.
4. Use approximate aggregation functions (`approx_distinct`, `approx_median`, `approx_percentile_cont`) instead of exact alternatives on large datasets.
5. Enable compaction in R2 Data Catalog to reduce the number of files scanned per query.
6. Use `EXPLAIN` to inspect the execution plan and verify predicate pushdown.
7. Use `WHERE` filters with multi-way joins to reduce intermediate result sizes. Joining three or more large tables without filters can exceed resource limits.
8. Join large fact tables through dimension tables rather than directly joining two large fact tables. For example, join `http_requests` to `firewall_events` through a shared `zones` dimension rather than cross-joining both fact tables.
9. Be cautious with `COUNT(DISTINCT)` across multi-way joins. This combination can produce very large intermediate results. Consider using `approx_distinct()` or breaking the query into smaller steps.
10. Use explicit `JOIN` syntax instead of implicit joins (comma-separated `FROM`) for readability and to ensure the optimizer can choose optimal join ordering.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-sql/reference/limitations-best-practices/#page","headline":"Limitations and best practices · R2 SQL docs","description":"Supported features, known limitations, and best practices for R2 SQL queries.","url":"https://developers.cloudflare.com/r2-sql/reference/limitations-best-practices/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SQL"]}
```
