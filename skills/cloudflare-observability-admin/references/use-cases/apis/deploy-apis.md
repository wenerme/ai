---
description: Deploy globally distributed APIs that scale automatically with no servers to manage.
title: Deploy APIs at the edge
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy APIs at the edge

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/apis/deploy-apis/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Deploying APIs on traditional infrastructure means managing servers, configuring regions, and provisioning for traffic spikes. Cloudflare Workers runs your API handlers in 300+ locations worldwide with automatic scaling and fast startup times.

## Solutions

### Workers

Build and deploy serverless applications on Cloudflare's global network. [Learn more about Workers](https://developers.cloudflare.com/workers/).

* **Global deployment** \- API handlers run in 300+ Cloudflare locations worldwide with no regional configuration
* **Auto-scaling** \- Handle traffic spikes without provisioning servers or setting capacity limits

### Queues

Reliable message queuing and background processing for Workers. [Learn more about Queues](https://developers.cloudflare.com/queues/).

* **Async processing** \- Offload webhook delivery and background jobs without blocking the API response

### D1 and Durable Objects

Serverless SQL database built on SQLite, with global read replication ([learn more about D1](https://developers.cloudflare.com/d1/)). Stateful objects with strongly consistent storage and coordination ([learn more about Durable Objects](https://developers.cloudflare.com/durable-objects/)).

* **Integrated storage** \- Structured Query Language (SQL) database and strongly consistent state storage available as Worker bindings

## Get started

1. [Workers get started](https://developers.cloudflare.com/workers/get-started/)
2. [D1 get started](https://developers.cloudflare.com/d1/get-started/)
3. [Queues get started](https://developers.cloudflare.com/queues/get-started/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/apis/deploy-apis/#page","headline":"Deploy APIs at the edge · Cloudflare use cases","description":"Deploy globally distributed APIs that scale automatically with no servers to manage.","url":"https://developers.cloudflare.com/use-cases/apis/deploy-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
