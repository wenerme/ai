---
title: PlanetScale Postgres &amp; MySQL
description: Learn how Cloudflare partners with PlanetScale to provide managed Postgres and MySQL databases for Workers applications with Hyperdrive acceleration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# PlanetScale Postgres & MySQL

Create PlanetScale Postgres or MySQL databases with globally distributed Workers applications.

Cloudflare partners with [PlanetScale ↗](https://planetscale.com/) to provide PlanetScale-hosted Postgres and MySQL (Vitess) databases to Workers. [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) connects [Workers](https://developers.cloudflare.com/workers/) to PlanetScale databases with built-in database connection pooling and query caching for faster performance.

Get the best of both products, build for Workers global distribution and optimize for regional data access. Get started by creating a PlanetScale database in the Cloudflare dashboard.

[ Go to **Create a PlanetScale database** ](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive?modal=1&type=planetscale&step=1)

## Workers + PlanetScale

With Workers, build your application to deploy anywhere across Cloudflare’s global network spanning 330+ cities. You can deploy with a single step, and users in new locations can reach your application without deploying regional infrastructure.

Workers compute runs close to your users for low latency. PlanetScale Postgres provides regional databases for your application's control plane or any centralized data that doesn't fit Cloudflare's edge distribution model. Use it for records such as customers, billing, account settings, or other relational data.

Hyperdrive provides the connection glue between Workers and PlanetScale. It pools database connections and uses Cloudflare's [Cache](https://developers.cloudflare.com/cache/) for eligible read queries to make your application fast even when your database is centralized.

## How you benefit?

![Request flow from a user request to Workers, Hyperdrive caches, connection pools, and PlanetScale.](https://developers.cloudflare.com/_astro/planetscale-request-flow.CchJ2m4p_1fTg6l.svg)
1. **Run near the user.** When a user sends a request, Cloudflare routes it to a nearby location. Your Worker runs in that location, so request handling starts close to the user.
2. **Check for cached reads locally.** On the same Cloudflare server handling the Worker request, Hyperdrive sets up your database connection in single digit milliseconds (p90 4ms) so that your database client/driver can send queries immediately. Hyperdrive's connection setup performs [TCP ↗](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/?cf%5Ftarget%5Fid=09C713714C8E4B80173505A0C31C63BC) connection startup, [TLS ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/?cf%5Ftarget%5Fid=F13EF8B8F82B5AFEF99A8D9DA7DA3342) encryption, and client authentication all on the same local machine, removing any network roundtrips and latency to your database. Once the database connection is ready if the Worker sends a cacheable read query and the result is cached, Hyperdrive returns it without leaving that location.
3. **Forward when needed with caching in-between.** If no local cached result exists, or if the query cannot be cached, Hyperdrive sends the query across Cloudflare's network to a location close to your PlanetScale database. Hyperdrive checks another cache in that location before it reaches the database; this cache is populated by multiple requests to your database to improve your cache hit ratios similar to tiered caching .
4. **Query PlanetScale only when necessary.** If neither cache has the result, Hyperdrive sends the query to PlanetScale using an already available pool of database connections. Writes and other uncacheable queries go to PlanetScale so the database remains the source of truth. Multiple layers of caching reduce overall load on your database.

Hyperdrive does not invalidate cached read results when your application writes to PlanetScale. If your application needs read-after-write consistency for authentication, sessions, permissions, or another critical path, use a separate cache-disabled Hyperdrive configuration for those reads. Refer to [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/#read-after-write-behavior) for guidance.

## PlanetScale developer experience

### Postgres or MySQL

Choose PlanetScale Postgres or MySQL, and keep using familiar database drivers, object-relational mapping (ORM) libraries, and SQL tooling.

### Performance and reliability

Run production databases on PlanetScale infrastructure with commitment to performance and reliability that power trusted [customer workloads ↗](https://planetscale.com/).

### Modern development workflow

Use [development branches ↗](https://planetscale.com/docs/postgres/branching) to test database changes, [query insights ↗](https://planetscale.com/docs/postgres/monitoring/query-insights) to understand query performance, and the [Model Context Protocol (MCP) server ↗](https://planetscale.com/docs/connect/ai-tooling) to give agents access to database insights data, all without needing a database administrator (DBA).

### Cloudflare billing

When you create a PlanetScale database from the Cloudflare dashboard, you are billed via your Cloudflare account — you will see a line item on your Cloudflare invoice for your PlanetScale usage. The pricing for PlanetScale is the same when you create and use databases via Cloudflare as it is when you buy directly from PlanetScale. For more pricing details, refer to [PlanetScale's pricing ↗](https://planetscale.com/pricing). You can introspect per-database billing usage via PlanetScale's [dashboard ↗](https://planetscale.com/docs/billing#organization-usage-and-billing-page).

[Connect Postgres](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-database-providers/planetscale-postgres/)

Connect Hyperdrive to a PlanetScale Postgres database.

[Connect MySQL](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-database-providers/planetscale/)

Connect Hyperdrive to a PlanetScale MySQL database.

[Get started](https://developers.cloudflare.com/hyperdrive/get-started/)

Create a Hyperdrive configuration and query a database from Workers.

[How Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/)

Learn how Hyperdrive pools connections and caches queries.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/hyperdrive/planetscale/#page","headline":"PlanetScale Postgres & MySQL · Cloudflare Hyperdrive docs","description":"Learn how Cloudflare partners with PlanetScale to provide managed Postgres and MySQL databases for Workers applications with Hyperdrive acceleration.","url":"https://developers.cloudflare.com/hyperdrive/planetscale/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-07-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/planetscale/","name":"PlanetScale Postgres & MySQL"}}]}
```
