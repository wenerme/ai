---
description: Frequently asked questions about Hyperdrive connectivity, caching, and supported databases.
title: FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# FAQ

Last updated Jul 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/reference/faq/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Below you will find answers to our most commonly asked questions regarding Hyperdrive.

## Connectivity

### Does Hyperdrive use specific IP addresses to connect to my database?

Hyperdrive connects to your database using [Cloudflare's IP address ranges ↗](https://www.cloudflare.com/ips/). These are shared by all Hyperdrive configurations and other Cloudflare products.

You can use this to configure restrictions in your database firewall to restrict the IP addresses that can access your database.

### Does Hyperdrive support connecting to D1 databases?

Hyperdrive does not support [D1](https://developers.cloudflare.com/d1) because D1 provides fast connectivity from Workers by design.

Hyperdrive is designed to speed up connectivity to traditional, regional SQL databases such as PostgreSQL. These databases are typically accessed using database drivers that communicate over TCP/IP. Unlike D1, creating a secure database connection to a traditional SQL database involves multiple round trips between the client (your Worker) and your database server. See [How Hyperdrive works](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/) for more detail on why round trips are needed and how Hyperdrive solves this.

D1 does not require round trips to create database connections. D1 is designed to be performant for access from Workers by default, without needing Hyperdrive.

### Should I use Placement with Hyperdrive?

Yes, if your Worker makes multiple queries per request. [Placement](https://developers.cloudflare.com/workers/configuration/placement/) runs your Worker near your database, reducing per-query latency from 20-30ms to 1-3ms. Hyperdrive handles connection pooling and setup. Placement reduces the network distance for query execution.

Use `placement.region` if your database runs in AWS, GCP, or Azure. Use `placement.host` for databases hosted elsewhere.

## Caching

### Does Hyperdrive invalidate cached reads when I write to my database

No. Hyperdrive does not invalidate cached read query results when your application writes to your database. A matching read can return a cached result until the configured `max_age` expires, and Hyperdrive can serve that result during the `stale_while_revalidate` window while it refreshes the cache.

Use a cache-disabled Hyperdrive configuration for reads that must return fresh data, such as authentication, sessions, permissions, or reads immediately after a write. Refer to [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/#read-after-write-behavior) to choose a caching strategy.

### Can I use Hyperdrive if some reads need read-after-write consistency

Yes. Configure two Hyperdrive bindings to the same database: one with query caching enabled for reads that can tolerate short staleness, and one with query caching disabled for reads that must be fresh. The cache-disabled binding still gives you Hyperdrive's connection pooling and fast connection setup.

If an object-relational mapping (ORM) library or authentication library owns the SQL, create separate database clients for each binding and pass the cache-disabled client to the code that needs fresh reads.

## Pricing

### Does Hyperdrive charge for data transfer / egress?

No.

### Is Hyperdrive available on the [Workers Free](https://developers.cloudflare.com/workers/platform/pricing/#workers) plan?

Yes. Refer to [pricing](https://developers.cloudflare.com/hyperdrive/platform/pricing/).

### Does Hyperdrive charge for additional compute?

Hyperdrive itself does not charge for compute (CPU) or processing (wall clock) time. Workers querying Hyperdrive and computing results: for example, serializing results into JSON and/or issuing queries, are billed per [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/#workers).

## Limits

### Are there any limits to Hyperdrive?

Refer to the published [limits](https://developers.cloudflare.com/hyperdrive/platform/limits/) documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/reference/faq/#page","headline":"FAQ · Cloudflare Hyperdrive docs","description":"Frequently asked questions about Hyperdrive connectivity, caching, and supported databases.","url":"https://developers.cloudflare.com/hyperdrive/reference/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
