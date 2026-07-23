---
description: Understand the D1Result and D1ExecResult objects returned by D1 Worker Binding API query methods.
title: Return objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt
> Use this file to discover all available pages before exploring further.

# Return objects

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/d1/worker-api/return-object/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Some D1 Worker Binding APIs return a typed object.

| D1 Worker Binding API                                                                                                                                                                         | Return object |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| [D1PreparedStatement::run](https://developers.cloudflare.com/d1/worker-api/prepared-statements/#run), [D1Database::batch](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch) | D1Result      |
| [D1Database::exec](https://developers.cloudflare.com/d1/worker-api/d1-database/#exec)                                                                                                         | D1ExecResult  |

## `D1Result`

The methods [D1PreparedStatement::run](https://developers.cloudflare.com/d1/worker-api/prepared-statements/#run) and [D1Database::batch](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch) return a typed [D1Result](#d1result) object for each query statement. This object contains:

* The success status
* A meta object with the internal duration of the operation in milliseconds
* The results (if applicable) as an array

```js
{
  success: boolean, // true if the operation was successful, false otherwise
  meta: {
    served_by: string // the version of Cloudflare's backend Worker that returned the result
    served_by_region: string // the region of the database instance that executed the query
    served_by_primary: boolean // true if (and only if) the database instance that executed the query was the primary
    timings: {
      sql_duration_ms: number // the duration of the SQL query execution by the database instance (not including any network time)
    }
    duration: number, // the duration of the SQL query execution only, in milliseconds
		changes: number, // the number of changes made to the database
		last_row_id: number, // the last inserted row ID, only applies when the table is defined without the `WITHOUT ROWID` option
		changed_db: boolean, // true if something on the database was changed
    size_after: number, // the size of the database after the query is successfully applied
    rows_read: number, // the number of rows read (scanned) by this query
    rows_written: number // the number of rows written by this query
    total_attempts: number //the number of total attempts to successfully execute the query, including retries
  }
  results: array | null, // [] if empty, or null if it does not apply
}
```

### Example

```js
const someVariable = `Bs Beverages`;
const stmt = env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(someVariable);
const returnValue = await stmt.run();
return Response.json(returnValue)
```

```py
from workers import Response

some_variable = "Bs Beverages"
stmt = self.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind(some_variable)
return_value = await stmt.run()
return Response.json(return_value)
```

```json
{
  "success": true,
  "meta": {
    "served_by": "miniflare.db",
    "served_by_region": "WEUR",
    "served_by_primary": true,
    "timings": {
      "sql_duration_ms": 0.2552
    },
    "duration": 0.2552,
    "changes": 0,
    "last_row_id": 0,
    "changed_db": false,
    "size_after": 16384,
    "rows_read": 4,
    "rows_written": 0
  },
  "results": [
    {
      "CustomerId": 11,
      "CompanyName": "Bs Beverages",
      "ContactName": "Victoria Ashworth"
    },
    {
      "CustomerId": 13,
      "CompanyName": "Bs Beverages",
      "ContactName": "Random Name"
    }
  ]
}
```

## `D1ExecResult`

The method [D1Database::exec](https://developers.cloudflare.com/d1/worker-api/d1-database/#exec) returns a typed [D1ExecResult](#d1execresult) object for each query statement. This object contains:

* The number of executed queries
* The duration of the operation in milliseconds

```js
{
	"count": number, // the number of executed queries
	"duration": number // the duration of the operation, in milliseconds
}
```

### Example

```js
const returnValue = await env.DB.exec(`SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"`);
return Response.json(returnValue);
```

```py
from workers import Response

return_value = await self.env.DB.exec('SELECT * FROM Customers WHERE CompanyName = "Bs Beverages"')
return Response.json(return_value)
```

```json
{
  "count": 1,
  "duration": 1
}
```

Storing large numbers

Any numeric value in a column is affected by JavaScript's 52-bit precision for numbers. If you store a very large number (in `int64`), then retrieve the same value, the returned value may be less precise than your original number.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/worker-api/return-object/#page","headline":"Return objects · Cloudflare D1 docs","description":"Understand the D1Result and D1ExecResult objects returned by D1 Worker Binding API query methods.","url":"https://developers.cloudflare.com/d1/worker-api/return-object/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
