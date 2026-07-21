---
description: Build stateful serverless applications with Durable Objects, including AI agents, real-time chat, and collaborative apps.
title: Cloudflare Durable Objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

#  Cloudflare Durable Objects

Last updated Jul 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/durable-objects/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Create AI agents, collaborative applications, real-time interactions like chat, and more without needing to coordinate state, have separate storage, or manage infrastructure.

 Available on Free and Paid plans

Durable Objects provide a building block for stateful applications and distributed systems.

Use Durable Objects to build applications that need coordination among multiple clients, like collaborative editing tools, interactive chat, multiplayer games, live notifications, and deep distributed systems, without requiring you to build serialization and coordination primitives on your own.

[ Get started ](https://developers.cloudflare.com/durable-objects/get-started/)

Note

SQLite-backed Durable Objects are now available on the Workers Free plan with these [limits](https://developers.cloudflare.com/durable-objects/platform/pricing/).

[SQLite storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/) and corresponding [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) methods like `sql.exec` have moved from beta to general availability. New Durable Object classes should use wrangler configuration for [SQLite storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class).

### What are Durable Objects?

A Durable Object is a special kind of [Cloudflare Worker](https://developers.cloudflare.com/workers/) which uniquely combines compute with storage. Like a Worker, a Durable Object is automatically provisioned geographically close to where it is first requested, starts up quickly when needed, and shuts down when idle. You can have millions of them around the world. However, unlike regular Workers:

* Each Durable Object has a **globally-unique name**, which allows you to send requests to a specific object from anywhere in the world. Thus, a Durable Object can be used to coordinate between multiple clients who need to work together.
* Each Durable Object has some **durable storage** attached. Since this storage lives together with the object, it is strongly consistent yet fast to access.

Therefore, Durable Objects enable **stateful** serverless applications.

For more information, refer to the full [What are Durable Objects?](https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/) page.

---

## Features

[In-memory State](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/)

Learn how Durable Objects coordinate connections among multiple clients or events.

 Use In-memory State

[Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/)

Learn how Durable Objects provide transactional, strongly consistent, and serializable storage.

 Use Storage API

[WebSocket Hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#durable-objects-hibernation-websocket-api)

Learn how WebSocket Hibernation allows you to manage the connections of multiple clients at scale.

 Use WebSocket Hibernation

[Durable Objects Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/)

Learn how to use alarms to trigger a Durable Object and perform compute in the future at customizable intervals.

 Use Durable Objects Alarms

---

## Related products

[Workers](https://developers.cloudflare.com/workers/)

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

[D1](https://developers.cloudflare.com/d1/)

D1 is Cloudflare's SQL-based native serverless database. Create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

[R2](https://developers.cloudflare.com/r2/)

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

---

## More resources

### [ Limits ](https://developers.cloudflare.com/durable-objects/platform/limits/)

Learn about Durable Objects limits.

### [ Pricing ](https://developers.cloudflare.com/durable-objects/platform/pricing/)

Learn about Durable Objects pricing.

### [ Storage options ](https://developers.cloudflare.com/workers/platform/storage-options/)

Learn more about storage and database options you can build with Workers.

### [ Developer Discord ](https://discord.cloudflare.com)

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

### [ @CloudflareDev ](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/durable-objects/#page","headline":"Overview · Cloudflare Durable Objects docs","description":"Build stateful serverless applications with Durable Objects, including AI agents, real-time chat, and collaborative apps.","url":"https://developers.cloudflare.com/durable-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
