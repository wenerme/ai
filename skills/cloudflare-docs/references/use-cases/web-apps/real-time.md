---
title: Add real-time features
description: Build interactive applications with WebSockets, real-time collaboration, and live updates.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/use-cases/web-apps/real-time.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Add real-time features

Real-time features, such as live chat, collaborative editing, and multiplayer interactions, require persistent connections and strongly consistent state. Cloudflare Durable Objects maintain WebSocket connections and coordinate shared state, while Queues handle background event processing.

## Solutions

### Durable Objects

Stateful objects with strongly consistent storage and coordination. [Learn more about Durable Objects](https://developers.cloudflare.com/durable-objects/).

* **WebSocket support** \- Maintain persistent connections and broadcast messages across clients in real time
* **Collaborative editing** \- Build multiplayer and co-editing experiences with strongly consistent shared state
* **Strong consistency** \- Coordinate state across many concurrent connections with transactional guarantees

### Queues

Reliable message queuing and background processing for Workers. [Learn more about Queues](https://developers.cloudflare.com/queues/).

* **Event processing** \- Handle webhooks and background jobs reliably without blocking the main request path

## Get started

1. [Durable Objects get started](https://developers.cloudflare.com/durable-objects/get-started/)
2. [WebSocket connections with Durable Objects](https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/)
3. [Queues get started](https://developers.cloudflare.com/queues/get-started/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/web-apps/","name":"Web sites and web apps"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/web-apps/real-time/","name":"Add real-time features"}}]}
```
