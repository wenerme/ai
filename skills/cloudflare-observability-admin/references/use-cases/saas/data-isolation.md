---
description: Isolate customer data in a multi-tenant SaaS platform using per-tenant databases, object storage, and key-value stores.
title: Store and isolate customer data
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Store and isolate customer data

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/saas/data-isolation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Multi-tenant platforms need to store customer data with appropriate isolation — per-tenant databases, separate object storage, or row-level separation. Cloudflare provides serverless storage options that support tenant isolation at the database, bucket, or key-prefix level.

## Solutions

### D1

Serverless SQL database built on SQLite, with global read replication. [Learn more about D1](https://developers.cloudflare.com/d1/).

* **Database per tenant** \- Create isolated D1 databases per customer for complete data separation, or use row-level isolation in a shared database

### R2

S3-compatible object storage with zero egress fees. [Learn more about R2](https://developers.cloudflare.com/r2/).

* **Object storage** \- Store customer files and assets per tenant using prefix or bucket-level isolation, with no egress fees

### Durable Objects

Stateful objects with strongly consistent storage and coordination. [Learn more about Durable Objects](https://developers.cloudflare.com/durable-objects/).

* **Real-time coordination** \- Manage stateful workflows and provide strong consistency for multi-tenant operations

### KV

Globally distributed key-value storage for low-latency reads. [Learn more about KV](https://developers.cloudflare.com/kv/).

* **Edge configuration** \- Store per-tenant settings, feature flags, and session data at the edge for low-latency reads

## Get started

1. [D1 get started](https://developers.cloudflare.com/d1/get-started/)
2. [R2 get started](https://developers.cloudflare.com/r2/get-started/)
3. [Durable Objects get started](https://developers.cloudflare.com/durable-objects/get-started/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/saas/data-isolation/#page","headline":"Store and isolate customer data · Cloudflare use cases","description":"Isolate customer data in a multi-tenant SaaS platform using per-tenant databases, object storage, and key-value stores.","url":"https://developers.cloudflare.com/use-cases/saas/data-isolation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
