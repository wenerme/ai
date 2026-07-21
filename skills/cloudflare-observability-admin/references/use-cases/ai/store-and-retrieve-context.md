---
description: Store vector embeddings, conversation history, and application state for AI applications using serverless databases and object storage.
title: Store and retrieve context
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

#  Store and retrieve context

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/use-cases/ai/store-and-retrieve-context/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/ai/store-and-retrieve-context/#page","headline":"Store and retrieve context · Cloudflare use cases","description":"Store vector embeddings, conversation history, and application state for AI applications using serverless databases and object storage.","url":"https://developers.cloudflare.com/use-cases/ai/store-and-retrieve-context/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
