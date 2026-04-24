---
title: Asynchronous Batch API
description: Queue large inference workloads for asynchronous processing with the Workers AI Batch API.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers-ai/features/batch-api/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Asynchronous Batch API

Asynchronous batch processing lets you send a collection (batch) of inference requests in a single call. Instead of expecting immediate responses for every request, the system queues them for processing and returns the results later.

Batch processing is useful for large workloads such as summarization or embeddings when there is no human interaction. Using the batch API will guarantee that your requests are fulfilled eventually, rather than erroring out if Cloudflare does not have enough capacity at a given time.

When you send a batch request, the API immediately acknowledges receipt with a status like `queued` and provides a unique `request_id`. This ID is later used to poll for the final responses once the processing is complete.

You can use the Batch API by either creating and deploying a Cloudflare Worker that leverages the [Batch API with the AI binding](https://developers.cloudflare.com/workers-ai/features/batch-api/workers-binding/), using the [REST API](https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/) directly or by starting from a [template ↗](https://github.com/craigsdennis/batch-please-workers-ai).

Note

Ensure that the total payload is under 10 MB.

## Demo application

If you want to get started quickly, click the button below:

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/craigsdennis/batch-please-workers-ai)

This will create a repository in your GitHub account and deploy a ready-to-use Worker that demonstrates how to use Cloudflare's Asynchronous Batch API. The template includes preconfigured AI bindings, and examples for sending and retrieving batch requests with and without external references. Once deployed, you can visit the live Worker and start experimenting with the Batch API immediately.

## Supported Models

Refer to our [model catalog](https://developers.cloudflare.com/workers-ai/models/?capabilities=Batch) for supported models.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/batch-api/","name":"Asynchronous Batch API"}}]}
```
