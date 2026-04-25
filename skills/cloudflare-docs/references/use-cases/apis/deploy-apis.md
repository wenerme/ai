---
title: Deploy APIs at the edge
description: Deploy globally distributed APIs that scale automatically with no servers to manage.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Deploy APIs at the edge

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/apis/","name":"APIs and microservices"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/apis/deploy-apis/","name":"Deploy APIs at the edge"}}]}
```
