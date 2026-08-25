---
description: Advanced filtering, reshaping, redacting, and computing on Logpush records with SQL before they leave Cloudflare.
title: Transformers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Transformers

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/transformers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Beta

Closed beta

Transformers are in closed beta. Contact your Cloudflare Account Executive for access. Beta usage is not billed. The API surface may change before GA.

Transformers let you run a SQL query against each batch of records before Logpush delivers them to your destination. Use them to filter records you do not want to store, reshape fields to match a downstream schema, redact sensitive values, compute new fields, or add static metadata.

You write the logic as a single SQL query, attach it to a Logpush job, and Cloudflare runs it on every batch. The `FROM` clause names the Logpush dataset (for example, `http_requests` or `audit_logs_v2`) and field names come from that dataset's schema.

## Key features

* **SQL-based transforms** \- a single-statement SQL query per Logpush job.
* **Per-record execution** \- runs on each NDJSON record before Cloudflare delivers the batch.
* **Advanced filtering and reshaping** \- drop, rename, redact, compute, or tag fields.
* **Attach and detach without redeploying** \- manage transformers from the Cloudflare dashboard or the API.
* **Version history** \- every save creates a new version; older versions remain viewable.

Before you begin, you need:

* A Logpush job that uses the `ndjson` output format. Transformers are only available for NDJSON jobs, and are supported for both account-scoped and zone-scoped datasets.
* An API token with the `Logs Write` permission for the account.
* Familiarity with the [dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) whose records you plan to transform. Your SQL references its field names directly.

## Access Transformers

You can create, preview, attach, and manage transformers through the Cloudflare dashboard or the API.

### Transformer Studio (UI)

Transformer Studio is the workspace that includes a SQL editor where you write, preview, and manage Transformers. Open it from the Logpush page in the Cloudflare dashboard.

[Go to **Logpush** ↗](https://dash.cloudflare.com/?to=/:account/logs)

From Studio you can:

* Create a new transformer by writing a SQL query against a Logpush dataset.
* Preview a transformer against a canned sample record for the target dataset before saving.
* Attach a transformer to any eligible Logpush job on the account or zone. Only NDJSON jobs matching the transformer's dataset appear as available attach targets. CSV jobs are not shown.
* Detach a transformer from a job.
* Save a new version each time you edit and save the SQL. Older versions remain available to view.
* Rename a transformer or update its description.
* Delete a transformer. A transformer cannot be deleted while any Logpush job references it.

### API

Every transformer action is available through the Cloudflare API. To authenticate, use an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the `Logs Write` permission.

| Operation             | Method | Endpoint                                                |
| --------------------- | ------ | ------------------------------------------------------- |
| List transformers     | GET    | accounts/:account\_id/logpush/transformers              |
| Create a transformer  | POST   | accounts/:account\_id/logpush/transformers              |
| Preview a transformer | POST   | accounts/:account\_id/logpush/transformers/preview      |
| Get a transformer     | GET    | accounts/:account\_id/logpush/transformers/:id          |
| Download SQL          | GET    | accounts/:account\_id/logpush/transformers/:id/content  |
| List versions         | GET    | accounts/:account\_id/logpush/transformers/:id/versions |
| Update a transformer  | PUT    | accounts/:account\_id/logpush/transformers/:id          |
| Delete a transformer  | DELETE | accounts/:account\_id/logpush/transformers/:id          |

To attach or detach a transformer from a job, set `transformer_id` on the Logpush job. Refer to [Logpush job setup](https://developers.cloudflare.com/logs/logpush/logpush-job/) for job endpoints.

## The SQL transformer contract

A transformer is a single SQL query. The Logpush dataset is the source table; the query output becomes the delivered record.

```sql
SELECT ClientIP, RayID, EdgeResponseStatus
FROM http_requests
WHERE EdgeResponseStatus >= 400
```

The `FROM` table name must match the dataset of the Logpush job the transformer is attached to. If it does not, attachment fails.

Records that do not match the `WHERE` clause are dropped from the output.

### Supported SQL

Transformers use the same SQL dialect as [Cloudflare Pipelines](https://developers.cloudflare.com/pipelines/sql-reference/). The following operations are supported:

* **Projection** \- `SELECT` specific fields, rename with `AS`, compute new fields with expressions.
* **Filtering** \- `WHERE` clauses with the standard comparison, boolean, and null-check operators.
* **CTEs** \- `WITH ... AS (...)` common table expressions.
* **`UNNEST`** \- expand array or list fields into rows.
* **JSON access** \- the `->` operator returns a JSON object; `->>` returns a string. For example, `RequestHeaders ->> 'Host'`.
* **Nested output** \- `named_struct('key', value, ...)` builds a nested JSON object.
* **Array output** \- `[value1, value2]` builds a JSON array.
* **Scalar functions** \- standard SQL functions including `UPPER`, `LOWER`, `COALESCE`, `CAST`, `extract`, and `to_timestamp`.

### Not supported

* Joins
* Subqueries
* Aggregation (`GROUP BY`, `HAVING`, `COUNT`, `SUM`)
* Window functions
* `ORDER BY`
* Multiple statements - one query per transformer

### Validation

Every SQL query is validated against the target dataset's schema before it is saved. Unknown fields, wrong types, invalid syntax, unknown datasets, and unsupported operations are rejected at upload time.

In the dashboard, validation errors appear inline in the editor with line and column numbers. Through the API, they are returned in the `errors` array of the response.

### Limits

| Limit                          | Value       |
| ------------------------------ | ----------- |
| SQL query size                 | 10 KB       |
| Transformer name length        | 255 bytes   |
| Transformer description length | 4,096 bytes |
| Filesystem access from a query | None        |
| Network access from a query    | None        |
| Batch chunk size               | 1,000 rows  |

## Examples

The examples below apply every capability from [Key features](#key-features) in a single query. Each keeps a subset of records, reshapes the survivors, and drops fields the downstream pipeline does not need.

### Filter and reshape audit log records

This transformer keeps only `update` actions from the audit trail and reshapes the surviving records for downstream delivery. Specifically, it:

* Excludes every record whose `ActionType` is not `update`.
* Converts `ActionTimestamp` from RFC3339 into a Unix epoch integer, renamed `unix_ts`.
* Uppercases `ActionType` and renames it `action_type`.
* Adds a hardcoded `provider` field with the value `Cloudflare`.
* Groups `ActorType`, `ActorEmail`, and `ActorIPAddress` into a nested `actor` object.
* Derives a boolean `is_zone` flag from `ResourceType = 'zone'`.
* Builds a `resource_meta` array from `ResourceType` and `ResourceID`.
* Drops `ActorID`, `AccountID`, and `ActorContext` by omission from the `SELECT`.

Input record from the [audit\_logs\_v2](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit%5Flogs%5Fv2/) dataset:

```json
{
  "ActionType": "update",
  "ActorEmail": "user@example.com",
  "ActorID": "a1b2c3d4",
  "ActorIPAddress": "203.0.113.42",
  "ActorType": "user",
  "ActionTimestamp": "2026-05-21T15:00:00Z",
  "AccountID": "90796717",
  "ResourceID": "r1s2t3u4",
  "ResourceType": "zone",
  "ActorContext": "dashboard"
}
```

Transformer:

```sql
SELECT
  extract(epoch FROM to_timestamp(ActionTimestamp)) AS unix_ts,
  UPPER(ActionType) AS action_type,
  'Cloudflare' AS provider,
  named_struct(
    'type', ActorType,
    'email', ActorEmail,
    'ip', ActorIPAddress
  ) AS actor,
  ResourceType = 'zone' AS is_zone,
  [ResourceType, ResourceID] AS resource_meta
FROM audit_logs_v2
WHERE ActionType = 'update'
```

Delivered record:

```json
{
  "action_type": "UPDATE",
  "actor": {
    "email": "user@example.com",
    "ip": "203.0.113.42",
    "type": "user"
  },
  "is_zone": true,
  "provider": "Cloudflare",
  "resource_meta": ["zone", "r1s2t3u4"],
  "unix_ts": 1779375600
}
```

### Filter and reshape HTTP request records

This transformer keeps all HTTP traffic **except** health checks, metrics scrapers, and internal-facing hostnames. This is a common pattern for teams that want the full log stream, minus predictable noise. Specifically, it:

* Excludes every request to `internal.example.com` and `health.example.com`.
* Excludes every request to paths starting with `/healthz` or `/metrics`.
* Converts `EdgeStartTimestamp` from RFC3339 into a Unix epoch integer, renamed `unix_ts`.
* Uppercases `ClientRequestMethod` and renames it `method`.
* Adds a hardcoded `provider` field with the value `Cloudflare`.
* Groups `ClientRequestHost`, `ClientRequestPath`, and `ClientRequestMethod` into a nested `request` object.
* Derives a boolean `is_server_error` flag from `EdgeResponseStatus >= 500`.
* Builds a `request_meta` array from `ClientRequestHost` and `ClientRequestPath`.
* Drops `ClientIP`, `ClientRequestUserAgent`, `RayID`, `OriginResponseTime`, and `WAFAction` by omission from the `SELECT`.

Input record from the [http\_requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) dataset:

```json
{
  "ClientIP": "203.0.113.42",
  "ClientRequestHost": "example.com",
  "ClientRequestMethod": "POST",
  "ClientRequestPath": "/api/checkout",
  "ClientRequestUserAgent": "curl/7.85.0",
  "EdgeResponseStatus": 502,
  "EdgeStartTimestamp": "2026-05-21T15:00:00Z",
  "RayID": "8e2a1c60ef9e1c9a",
  "OriginResponseTime": 3200000000,
  "WAFAction": "unknown"
}
```

This example assumes `EdgeStartTimestamp` is delivered as an RFC3339 string. If your job delivers timestamps as Unix nanoseconds, drop the `to_timestamp()` wrapper and divide by 1e9 instead.

Transformer:

```sql
SELECT
  extract(epoch FROM to_timestamp(EdgeStartTimestamp)) AS unix_ts,
  UPPER(ClientRequestMethod) AS method,
  'Cloudflare' AS provider,
  named_struct(
    'host', ClientRequestHost,
    'path', ClientRequestPath,
    'method', ClientRequestMethod
  ) AS request,
  EdgeResponseStatus >= 500 AS is_server_error,
  [ClientRequestHost, ClientRequestPath] AS request_meta
FROM http_requests
WHERE ClientRequestHost NOT IN ('internal.example.com', 'health.example.com')
  AND ClientRequestPath NOT LIKE '/healthz%'
  AND ClientRequestPath NOT LIKE '/metrics%'
```

Delivered record:

```json
{
  "is_server_error": true,
  "method": "POST",
  "provider": "Cloudflare",
  "request": {
    "host": "example.com",
    "method": "POST",
    "path": "/api/checkout"
  },
  "request_meta": ["example.com", "/api/checkout"],
  "unix_ts": 1779375600
}
```

## Errors and troubleshooting

### API errors

| HTTP | Message                                                  | Cause                                                                                                                     |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 403  | transformer feature is not available for this account    | Your account does not have access to Transformers. Contact your Cloudflare Account Executive.                             |
| 400  | missing required field: name                             | Add a name field to the request body.                                                                                     |
| 400  | missing required field: code                             | Add a non-empty code field with your SQL query.                                                                           |
| 400  | Schema validation error (unknown column, invalid syntax) | The SQL references a field that does not exist, uses unsupported syntax, or has a type mismatch. Fix the query and retry. |
| 413  | (request entity too large)                               | The SQL query exceeds 10 KB. Shorten the query.                                                                           |
| 400  | transformer N not found for this account                 | The transformer ID does not exist, or belongs to a different account.                                                     |
| 400  | transformer N dataset "X" does not match job dataset "Y" | The transformer's FROM table does not match the job's dataset.                                                            |

### Runtime failures

If a transformer fails while processing a batch, the batch fails: nothing is delivered for it, an error is recorded on the Logpush job, and Logpush retries the batch on its normal schedule. There is no automatic raw-log fallback.

If failures continue, records in the affected batches are eventually dropped and cannot be recovered.

The last error appears on the job's `last_error` field. Common causes:

* **The output exceeded the size limit.** Reduce output per record or drop more records with `WHERE`.
* **An internal Cloudflare error occurred.** Contact Cloudflare Support with the job ID and timestamp.

To debug, open the transformer in [Transformer Studio](#transformer-studio-ui) and use the **Run** button to preview it against a sample record. Validation and execution logic are the same, so problems visible in production usually reproduce in preview.

## Related resources

* [Logpush datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) \- the fields your SQL queries reference
* [Logpush job setup](https://developers.cloudflare.com/logs/logpush/logpush-job/) \- creating and managing Logpush jobs
* [Log fields reference](https://developers.cloudflare.com/logs/reference/log-fields/) \- full field descriptions across datasets
* [Filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) \- simpler filtering without SQL

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/transformers/#page","headline":"Transformers · Cloudflare Logs docs","description":"Advanced filtering, reshaping, redacting, and computing on Logpush records with SQL before they leave Cloudflare.","url":"https://developers.cloudflare.com/logs/logpush/transformers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
