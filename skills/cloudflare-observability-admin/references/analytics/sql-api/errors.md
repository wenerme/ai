---
description: Understand SQL API HTTP errors and how to resolve them.
title: Error responses
image: https://developers.cloudflare.com/analytics/sql-api/errors/og.png?v=0831ad0117bcd00d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Error responses

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/sql-api/errors/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The SQL API uses HTTP status codes to report errors. Errors returned by the SQL service usually have a `text/plain` body with a customer-safe description. Authentication errors rejected by the API gateway use the standard Cloudflare API JSON response envelope.

| Status | Meaning | Action |
| --- | --- | --- |
| `400` | The request is malformed, or the API gateway rejected missing or invalid authentication credentials. | Correct the request or authentication headers before retrying. |
| `403` | Authentication or authorization failed, including an explicitly selected field being denied. | Verify token permissions, resource scope, plan, and requested fields. |
| `422` | The request or SQL statement is invalid or unsupported. | Correct the request using the [SQL language reference](https://developers.cloudflare.com/analytics/sql-api/sql-reference/). |
| `429` | The request exceeded a rate, concurrency, queue, policy, or query-resource limit. | Wait before retrying or reduce query cost. Honor `Retry-After` when present. |
| `500` | An unexpected internal error occurred. | Retry later. Contact Cloudflare Support if the error persists. |
| `501` | The requested SQL processing behavior is not implemented. | Remove unsupported syntax. |
| `503` | Authorization, tenancy resolution, queueing, or the data store is unavailable. | Verify resource identifiers, then retry transient failures with bounded exponential backoff and jitter. |
| `507` | The data store could not complete the query within its resource limits. | Reduce the time range, selected data, or result size. |

## Invalid SQL

An HTTP `422` response begins with `Input was invalid:` and describes the validation failure. Common causes include:

- For HTTP API requests, missing account or zone scope in both SQL and the request body. The [Workers binding](https://developers.cloudflare.com/analytics/sql-api/workers-binding/) supplies scope automatically and rejects SQL tenancy predicates.
- Missing lower timestamp bound in both SQL and `time_range`.
- Supplying tenancy or time bounds in both SQL and the corresponding request field.
- A bare dataset name instead of a schema-qualified name.
- An unknown or unavailable field.
- `ORDER BY` without `LIMIT`, except for a Workers Analytics Engine dataset.
- Multiple SQL statements.
- Missing, duplicate, or conflicting parameter values.
- An unsupported SQL clause, output format, or function for the selected backend.

## Introspection errors

The [introspection endpoint](https://developers.cloudflare.com/analytics/sql-api/datasets/#discover-datasets) returns the same status codes as query execution, but its `422` causes relate to introspection parameters rather than SQL syntax. Refer to [Errors](https://developers.cloudflare.com/analytics/sql-api/datasets/#errors) for the causes specific to introspection.

## Retry behavior

Retry `429`, `500`, `503`, and `507` responses only when repeating the query is safe for your application. Use bounded exponential backoff with jitter. If a `429` response includes `Retry-After`, do not retry before that interval has elapsed. For `Unable to authorize` or `Unable to resolve account information`, first verify that the account or zone identifier is correct. Contact Cloudflare Support if the error persists after bounded retries.

Do not retry `400`, `403`, `422`, or `501` responses without changing the credentials, permissions, or query.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/sql-api/errors/#page","headline":"Error responses","description":"Understand SQL API HTTP errors and how to resolve them.","url":"https://developers.cloudflare.com/analytics/sql-api/errors/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/sql-api/errors/og.png?v=0831ad0117bcd00d","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
