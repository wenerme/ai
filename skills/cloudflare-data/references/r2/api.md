---
description: Access R2 storage through the S3-compatible API, Workers API, or Cloudflare REST API.
title: API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# API

Last updated Jun 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

R2 provides three API surfaces for interacting with your data:

* **[Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/):** An in-Worker API accessed by binding an R2 bucket to a [Worker](https://developers.cloudflare.com/workers/). Use the Workers API to read, write, and list objects from within a Worker.
* **[S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/):** An S3-compatible HTTP API available at `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`. Use existing S3 SDKs and tools to interact with R2.
* **[Cloudflare REST API](https://developers.cloudflare.com/api/resources/r2/):** The `api.cloudflare.com` REST API used by the Cloudflare Dashboard and Wrangler CLI. Supports bucket management and object operations. [Rate limits apply](https://developers.cloudflare.com/r2/platform/limits/#cloudflare-rest-api). Use the S3-compatible API or Workers API for high-throughput workloads.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/r2/api/#page","headline":"API · Cloudflare R2 docs","description":"Access R2 storage through the S3-compatible API, Workers API, or Cloudflare REST API.","url":"https://developers.cloudflare.com/r2/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
