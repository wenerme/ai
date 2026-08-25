---
description: Durable, buffered queues that receive and store events for processing in Cloudflare Pipelines.
title: Streams
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Streams

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pipelines/streams/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Streams are durable, buffered queues that receive and store events for processing in [Cloudflare Pipelines](https://developers.cloudflare.com/pipelines/). They provide reliable data ingestion via HTTP endpoints and Worker bindings, ensuring no data loss even during downstream processing delays or failures.

A single stream can be read by multiple pipelines, allowing you to route the same data to different destinations or apply different transformations. For example, you might send user events to both a real-time analytics pipeline and a data warehouse pipeline.

Streams currently accept events in JSON format and support both structured events with defined schemas and unstructured JSON. When a schema is provided, streams will validate and enforce it for incoming events.

## Learn more

### [Manage streams](https://developers.cloudflare.com/pipelines/streams/manage-streams/)

Create, configure, and delete streams using Wrangler or the API.

### [Writing to streams](https://developers.cloudflare.com/pipelines/streams/writing-to-streams/)

Send events to streams via HTTP endpoints or Worker bindings.

### [Logpush as a source](https://developers.cloudflare.com/pipelines/streams/logpush/)

Use Cloudflare Logpush to send logs from Cloudflare products to a Pipelines stream.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/pipelines/streams/#page","headline":"Streams · Cloudflare Pipelines Docs","description":"Durable, buffered queues that receive and store events for processing in Cloudflare Pipelines.","url":"https://developers.cloudflare.com/pipelines/streams/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
