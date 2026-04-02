---
title: Build serverless backends
description: Deploy backend code globally with automatic scaling, fast startup times, and scheduled tasks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/use-cases/web-apps/serverless-backends.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Build serverless backends

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/web-apps/","name":"Web sites and web apps"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/web-apps/serverless-backends/","name":"Build serverless backends"}}]}
```
