---
description: Upload files directly to an AI Search instance using built-in storage powered by R2 and Vectorize.
title: Built-in storage
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Built-in storage

Last updated Jun 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Every AI Search instance comes with built-in storage and a built-in vector index, powered by [R2](https://developers.cloudflare.com/r2/) and [Vectorize](https://developers.cloudflare.com/vectorize/). You can upload files directly to an instance without setting up either service yourself.

## Upload and manage files

Upload files to an instance using the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/) (Workers binding or REST API) or the **Items** tab in the dashboard (**AI** \> **AI Search** \> your instance > **Items**). You can also list, view, and delete uploaded files through the Items API or the dashboard.

For supported file types, refer to [Supported file types](https://developers.cloudflare.com/ai-search/configuration/data-source/#supported-file-types).

## Indexing

Files uploaded to built-in storage are indexed immediately. External data sources like websites and R2 buckets are indexed on a [sync schedule](https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/).

## External data sources

An instance can use built-in storage alongside an external data source. The available external data sources are:

* [Website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/): crawl and index a website that you own
* [R2 Bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/): index documents stored in a Cloudflare R2 bucket

For example, an instance can be backed by a website for shared documentation while also accepting file uploads through the Items API for additional content.

## Limits and pricing

Storage, vector indexing, and Browser Run usage for crawling are included. Workers AI and AI Gateway usage is billed separately. For full details, refer to [Limits and pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/#page","headline":"Built-in storage · Cloudflare AI Search docs","description":"Upload files directly to an AI Search instance using built-in storage powered by R2 and Vectorize.","url":"https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
