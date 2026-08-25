---
description: Hyperdrive accelerates database queries through edge connection setup, connection pooling, and query caching.
title: How Hyperdrive works
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# How Hyperdrive works

Last updated Jul 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Connecting to traditional centralized databases from Cloudflare's global network which consists of over [300 data center locations ↗](https://www.cloudflare.com/network/) presents a few challenges as queries can originate from any of these locations.

If your database is centrally located, queries can take a long time to get to the database and back. Queries can take even longer in situations where you have to establish new connections from stateless environments like Workers, requiring multiple round trips for each Worker invocation.

Traditional databases usually handle a maximum number of connections. With any reasonably large amount of distributed traffic, it becomes easy to exhaust these connections.

Hyperdrive solves these challenges by managing the number of global connections to your origin database, selectively parsing and choosing which query response to cache while reducing loading on your database and accelerating your database queries.

## How Hyperdrive makes databases fast globally

Hyperdrive accelerates database queries by:

* Performing the connection setup for new database connections near your Workers
* Pooling existing connections near your database
* Caching query results

This ensures you have optimal performance when connecting to your database from Workers (whether your queries are cached or not).

![Hyperdrive connection](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1234,height=696,format=svg/_astro/hyperdrive-comparison.BMT25nFH.svg)

### 1\. Edge connection setup

When a database driver connects to a database from a Cloudflare Worker **directly**, it will first go through the connection setup. This may require multiple round trips to the database in order to verify and establish a secure connection. This can incur additional network latency due to the distance between your Cloudflare Worker and your database.

**With Hyperdrive**, this connection setup occurs between your Cloudflare Worker and Hyperdrive on the edge, as close to your Worker as possible (see diagram, label _1\. Connection setup_). This incurs significantly less latency, since the connection setup is completed within the same location.

Learn more about how connections work between Workers and Hyperdrive in [Connection lifecycle](https://developers.cloudflare.com/hyperdrive/concepts/connection-lifecycle/).

### 2\. Connection Pooling

Hyperdrive creates a pool of connections to your database that can be reused as your application executes queries against your database.

The pool of database connections is placed in one or more regions closest to your origin database. This minimizes the latency incurred by roundtrips between your Cloudflare Workers and database to establish new connections. This also ensures that as little network latency is incurred for uncached queries.

If the connection pool has pre-existing connections, the connection pool will try and reuse that connection (see diagram, label _2\. Existing warm connection_). If the connection pool does not have pre-existing connections, it will establish a new connection to your database and use that to route your query. This aims at reusing and creating the least number of connections possible as required to operate your application.

Note

Hyperdrive automatically manages the connection pool properties for you, including limiting the total number of connections to your origin database. Refer to [Limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) to learn more.

Learn more about connection pooling behavior and configuration in [Connection pooling](https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/).

Reduce latency with Placement

If your Worker makes **multiple sequential queries** per request, use [Placement](https://developers.cloudflare.com/workers/configuration/placement/) to run your Worker close to your database. Each query adds round-trip latency: 20-30ms from a distant region, or 1-3ms when placed nearby. Multiple queries compound this difference.

If your Worker makes only one query per request, placement does not improve end-to-end latency. The total round-trip time is the same whether it happens near the user or near the database.

```jsonc
{
	"placement": {
		"region": "aws:us-east-1", // Match your database region, for example "gcp:us-east4" or "azure:eastus"
	},
}
```

### 3\. Query Caching

Hyperdrive supports caching of non-mutating (read) queries to your database.

When queries are sent via Hyperdrive, Hyperdrive parses the query and determines whether the query is a mutating (write) or non-mutating (read) query.

For non-mutating queries, Hyperdrive caches the response for the configured `max_age`. When your Worker sends a later query that matches the original, Hyperdrive returns the cached response instead of sending the query back to the origin database.

Caching reduces the burden on your origin database and accelerates the response times for your queries.

Hyperdrive does not invalidate cached read query results when your application writes to your database. If your application needs read-after-write consistency, refer to [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/#read-after-write-behavior) for guidance on using a separate cache-disabled Hyperdrive configuration for reads that must return fresh data.

Learn more about query caching behavior and configuration in [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/).

## Pooling mode

The Hyperdrive connection pooler operates in transaction mode, where the client that executes the query communicates through a single connection for the duration of a transaction. When that transaction has completed, the connection is returned to the pool.

Hyperdrive supports [SET statements ↗](https://www.postgresql.org/docs/current/sql-set.html) for the duration of a transaction or a query. For instance, if you manually create a transaction with `BEGIN`/`COMMIT`, `SET` statements within the transaction will take effect. Moreover, a query that includes a `SET` command (`SET X; SELECT foo FROM bar;`) will also apply the `SET` command. When a connection is returned to the pool, the connection is `RESET` such that the `SET` commands will not take effect on subsequent queries.

This implies that a single Worker invocation may obtain multiple connections to perform its database operations and may need to `SET` any configurations for every query or transaction. It is not recommended to wrap multiple database operations with a single transaction to maintain the `SET` state. Doing so will affect the performance and scaling of Hyperdrive, as the connection cannot be reused by other Worker isolates for the duration of the transaction.

Hyperdrive supports named prepared statements as implemented in the `postgres.js` and `node-postgres` drivers. Named prepared statements in other drivers may have worse performance or may not be supported.

## Related resources

* [Connection lifecycle](https://developers.cloudflare.com/hyperdrive/concepts/connection-lifecycle/)
* [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/)
* [Connection pooling](https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/#page","headline":"How Hyperdrive works · Cloudflare Hyperdrive docs","description":"Hyperdrive accelerates database queries through edge connection setup, connection pooling, and query caching.","url":"https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
