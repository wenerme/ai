---
title: Store and retrieve context
description: Store vector embeddings, conversation history, and application state for AI applications using serverless databases and object storage.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/use-cases/ai/store-and-retrieve-context.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Store and retrieve context

AI applications need specialized storage for vector embeddings, conversation history, training data, and cached responses. Cloudflare Vectorize stores and queries embeddings for Retrieval Augmented Generation (RAG), D1 provides SQL storage for structured data, R2 stores documents and assets, and KV caches frequent responses at the edge.

## Solutions

### Vectorize

Vector database for storing and querying embeddings. [Learn more about Vectorize](https://developers.cloudflare.com/vectorize/).

* **Vector search** \- Store embeddings and find semantically similar content for Retrieval Augmented Generation (RAG) and recommendation features

### D1

Serverless SQL database built on SQLite, with global read replication. [Learn more about D1](https://developers.cloudflare.com/d1/).

* **Structured storage** \- Structured Query Language (SQL) database for conversation history, user data, and application metadata

### R2

S3-compatible object storage with zero egress fees. [Learn more about R2](https://developers.cloudflare.com/r2/).

* **Object storage** \- Store documents, training data, and generated assets with no egress fees

### KV

Globally distributed key-value storage for low-latency reads. [Learn more about KV](https://developers.cloudflare.com/kv/).

* **Edge caching** \- Cache frequent AI responses at the edge to reduce inference costs and latency

## Get started

1. [Vectorize get started](https://developers.cloudflare.com/vectorize/get-started/)
2. [D1 get started](https://developers.cloudflare.com/d1/get-started/)
3. [R2 get started](https://developers.cloudflare.com/r2/get-started/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/ai/","name":"AI applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/ai/store-and-retrieve-context/","name":"Store and retrieve context"}}]}
```
