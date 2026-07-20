---
title: Query caching
description: Hyperdrive automatically caches read queries to reduce database load and improve performance.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Query caching

Hyperdrive automatically caches cacheable read queries that your Worker sends to your database when query caching is turned on. This reduces database load and avoids a network round trip to your database for popular queries. Query caching is enabled by default.

## What does Hyperdrive cache?

Hyperdrive uses database protocols to differentiate between a mutating query (a query that writes to the database) and a non-mutating query (a read-only query). Hyperdrive caches eligible read-only query responses and does not cache writes.

Besides determining the difference between a `SELECT` and an `INSERT`, Hyperdrive also parses the database wire-protocol and uses it to differentiate between a mutating or non-mutating query.

For example, a read query that populates the front page of a news site would be cached:

* [ PostgreSQL ](#tab-panel-9430)
* [ MySQL ](#tab-panel-9431)

```sql
-- Cacheable: uses a parameterized date value instead of CURRENT_DATE
SELECT * FROM articles WHERE DATE(published_time) = $1
ORDER BY published_time DESC LIMIT 50
```

```sql
-- Cacheable: uses a parameterized date value instead of CURDATE()
SELECT * FROM articles WHERE DATE(published_time) = ?
ORDER BY published_time DESC LIMIT 50
```

Mutating queries (including `INSERT`, `UPSERT`, or `CREATE TABLE`) and queries that use functions designated as [volatile ↗](https://www.postgresql.org/docs/current/xfunc-volatility.html) or [stable ↗](https://www.postgresql.org/docs/current/xfunc-volatility.html) by PostgreSQL are not cached:

* [ PostgreSQL ](#tab-panel-9432)
* [ MySQL ](#tab-panel-9433)

```sql
-- Not cached: mutating queries
INSERT INTO users(id, name, email) VALUES(555, 'Matt', 'hello@example.com');


-- Not cached: LASTVAL() is a volatile function
SELECT LASTVAL(), * FROM articles LIMIT 50;


-- Not cached: NOW() is a stable function
SELECT * FROM events WHERE created_at > NOW() - INTERVAL '1 hour';
```

```sql
-- Not cached: mutating queries
INSERT INTO users(id, name, email) VALUES(555, 'Thomas', 'hello@example.com');


-- Not cached: LAST_INSERT_ID() is a volatile function
SELECT LAST_INSERT_ID(), * FROM articles LIMIT 50;


-- Not cached: NOW() returns a non-deterministic value
SELECT * FROM events WHERE created_at > NOW() - INTERVAL 1 HOUR;
```

Common PostgreSQL functions that are **not cacheable** include:

| Function           | PostgreSQL volatility category | Cached |
| ------------------ | ------------------------------ | ------ |
| NOW()              | STABLE                         | No     |
| CURRENT\_TIMESTAMP | STABLE                         | No     |
| CURRENT\_DATE      | STABLE                         | No     |
| CURRENT\_TIME      | STABLE                         | No     |
| LOCALTIME          | STABLE                         | No     |
| LOCALTIMESTAMP     | STABLE                         | No     |
| TIMEOFDAY()        | VOLATILE                       | No     |
| RANDOM()           | VOLATILE                       | No     |
| LASTVAL()          | VOLATILE                       | No     |
| TXID\_CURRENT()    | STABLE                         | No     |

Only functions designated as `IMMUTABLE` by PostgreSQL (functions whose return value never changes for the same inputs) are compatible with Hyperdrive caching. If your query uses a `STABLE` or `VOLATILE` function, move the function call to your application code and pass the resulting value as a query parameter instead.

Do not use SQL comments as cache controls

Hyperdrive uses text-based pattern matching to detect some uncacheable functions in your queries. This can include function names inside SQL comments.

Comments that contain volatile or uncacheable function names, such as `-- NOW()` or `-- RANDOM()`, can cause the query to be treated as uncacheable. However, comment text that does not contain uncacheable function names does not change the cache key.

For example:

A: `/* some text here */ SELECT * FROM some_table;`B: `/* some different text here */ SELECT * FROM some_table;`

Both A and B share the same cached value. If A is run before B, B will receive the value cached by A.

Hyperdrive does not document SQL comments as a cache-control API, and parser behavior can differ between database engines. Use a cache-disabled Hyperdrive configuration when you need a guaranteed fresh read.

Avoid referencing uncacheable function names anywhere in query text, including comments.

## Default cache settings

The default caching behavior for Hyperdrive is:

* `max_age` \= 60 seconds (1 minute)
* `stale_while_revalidate` \= 15 seconds

The `max_age` setting determines the maximum lifetime a query response will be served from cache. Cached responses may be evicted from the cache prior to this time if they are rarely used.

The `stale_while_revalidate` setting allows Hyperdrive to continue serving stale cache results for an additional period of time while it is revalidating the cache. In most cases, revalidation should happen rapidly.

You can set a maximum `max_age` of 1 hour.

## Read-after-write behavior

Hyperdrive does not purge or invalidate cached read query results when your application writes to your database. A later matching `SELECT` can return the cached result until the configured `max_age` expires. Hyperdrive can also serve the result during the `stale_while_revalidate` window while it refreshes the cache in the background.

Writes still go to your database. Hyperdrive only caches eligible read query responses.

This means you should choose a caching strategy based on how fresh each read must be:

* **Use query caching for reads that can tolerate brief staleness.** Good examples include public content, dashboards, search results, product catalogs, and other high-volume reads where a short delay after writes is acceptable.
* **Lower `max_age` and `stale_while_revalidate` when a short stale window works.** This keeps query caching enabled while reducing how long Hyperdrive can serve an older result.
* **Use a cache-disabled Hyperdrive configuration for reads that must be fresh.** Create a second Hyperdrive configuration with `--caching-disabled`, bind it alongside your cached configuration, and route those reads through the cache-disabled binding. Good examples include authentication, sessions, permissions, billing state, admin settings, and reads immediately after a write. Refer to [Disable caching](#disable-caching) for an example.
* **Disable query caching everywhere only when most reads must be fresh.** You still get Hyperdrive's connection pooling and fast connection setup when caching is disabled.

If an object-relational mapping (ORM) library or authentication library owns the SQL, create separate database clients for the cached and cache-disabled Hyperdrive bindings. Pass the cache-disabled client to the library or module that needs fresh reads, and use the cached client for reads that can tolerate the configured stale window.

## Disable caching

Disable caching on a per-Hyperdrive configuration basis by using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI to set the `--caching-disabled` option.

To create a separate cache-disabled Hyperdrive configuration against the same database:

```sh
npx wrangler hyperdrive create my-database-fresh --connection-string="<DATABASE_CONNECTION_STRING>" --caching-disabled
```

To turn off caching on an existing Hyperdrive configuration:

```sh
npx wrangler hyperdrive update <HYPERDRIVE_CONFIG_ID> --caching-disabled
```

You can configure multiple Hyperdrive connections from a single application: one connection that enables caching for popular queries, and a second connection for fresh reads that should not use query caching.

When you use multiple Hyperdrive configurations for the same database, account for the total origin connections across configurations. Refer to [Tune connection pool](https://developers.cloudflare.com/hyperdrive/configuration/tune-connection-pool/) for guidance.

For example, using database drivers:

* [ PostgreSQL ](#tab-panel-9434)
* [ MySQL ](#tab-panel-9435)

**index.ts**

```ts
export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Create clients inside your handler — not in global scope
    const client = postgres(env.HYPERDRIVE.connectionString);
    // Use the cache-disabled binding for auth, permissions, and reads after writes.
    const clientNoCache = postgres(env.HYPERDRIVE_CACHE_DISABLED.connectionString);
    // ...
  },
} satisfies ExportedHandler<Env>;
```

**index.ts**

```ts
export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Create connections inside your handler — not in global scope
    const connection = await createConnection({
      host: env.HYPERDRIVE.host,
      user: env.HYPERDRIVE.user,
      password: env.HYPERDRIVE.password,
      database: env.HYPERDRIVE.database,
      port: env.HYPERDRIVE.port,
    });
    // Use the cache-disabled binding for auth, permissions, and reads after writes.
    const connectionNoCache = await createConnection({
      host: env.HYPERDRIVE_CACHE_DISABLED.host,
      user: env.HYPERDRIVE_CACHE_DISABLED.user,
      password: env.HYPERDRIVE_CACHE_DISABLED.password,
      database: env.HYPERDRIVE_CACHE_DISABLED.database,
      port: env.HYPERDRIVE_CACHE_DISABLED.port,
    });
    // ...
  },
} satisfies ExportedHandler<Env>;
```

The Wrangler configuration remains the same both for PostgreSQL and MySQL.

* [  wrangler.jsonc ](#tab-panel-9436)
* [  wrangler.toml ](#tab-panel-9437)

**JSONC**

```jsonc
{
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<YOUR_HYPERDRIVE_CACHE_ENABLED_CONFIGURATION_ID>",
    },
    {
      "binding": "HYPERDRIVE_CACHE_DISABLED",
      "id": "<YOUR_HYPERDRIVE_CACHE_DISABLED_CONFIGURATION_ID>",
    },
  ],
}
```

**TOML**

```toml
[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<YOUR_HYPERDRIVE_CACHE_ENABLED_CONFIGURATION_ID>"


[[hyperdrive]]
binding = "HYPERDRIVE_CACHE_DISABLED"
id = "<YOUR_HYPERDRIVE_CACHE_DISABLED_CONFIGURATION_ID>"
```

## Next steps

* For more information, refer to [How Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
* To connect to PostgreSQL, refer to [Connect to PostgreSQL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/).
* For troubleshooting guidance, refer to [Troubleshoot and debug](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/concepts/query-caching/#page","headline":"Query caching · Cloudflare Hyperdrive docs","description":"Hyperdrive automatically caches read queries to reduce database load and improve performance.","url":"https://developers.cloudflare.com/hyperdrive/concepts/query-caching/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/concepts/query-caching/","name":"Query caching"}}]}
```
