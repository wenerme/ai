---
description: Deploy backend code globally with automatic scaling, fast startup times, and scheduled tasks.
title: Build serverless backends
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

#  Build serverless backends

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/use-cases/web-apps/serverless-backends/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Running backend code on traditional servers requires provisioning capacity, managing scaling, and accepting cold starts. Cloudflare Workers runs your server-side code at the edge with fast startup, automatic scaling, and global distribution across 300+ locations.

## Solutions

### Workers

Build and deploy serverless applications on Cloudflare's global network. [Learn more about Workers](https://developers.cloudflare.com/workers/).

* **Global deployment** \- Code runs at the Cloudflare location nearest to each user automatically
* **Fast startup** \- V8 isolates start in milliseconds with no warm-up period, avoiding the cold start delays of container-based platforms
* **Auto-scaling** \- Handle traffic spikes without provisioning or configuration

### Cron Triggers

Schedule Workers to run on a recurring basis. [Learn more about Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

* **Scheduled tasks** \- Run Workers on a fixed schedule for background jobs and periodic tasks

### Queues

Reliable message queuing and background processing for Workers. [Learn more about Queues](https://developers.cloudflare.com/queues/).

* **Async processing** \- Reliably process background jobs and webhooks without blocking request handling

## Get started

1. [Workers get started](https://developers.cloudflare.com/workers/get-started/)
2. [Configure Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)
3. [Queues get started](https://developers.cloudflare.com/queues/get-started/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/web-apps/serverless-backends/#page","headline":"Build serverless backends · Cloudflare use cases","description":"Deploy backend code globally with automatic scaling, fast startup times, and scheduled tasks.","url":"https://developers.cloudflare.com/use-cases/web-apps/serverless-backends/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
