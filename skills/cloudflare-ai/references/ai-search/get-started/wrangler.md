---
description: Create and manage AI Search instances from the command line.
title: CLI
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

#  CLI

Last updated Jul 10, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-search/get-started/wrangler/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This guide walks you through creating an AI Search instance using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/).

## 1\. Install Wrangler

Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the command-line tool for Cloudflare Workers and developer platform products.

 npm  yarn  pnpm  bun

```
npm install wrangler
```

```
yarn install wrangler
```

```
pnpm install wrangler
```

```
bun install wrangler
```

## 2\. Create an AI Search instance

Create a new instance.

```sh
wrangler ai-search create my-instance
```

You can upload files to the instance using the [dashboard](https://developers.cloudflare.com/ai-search/get-started/dashboard/#upload-content) or the [REST API](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/upload/).

### Connect a data source (optional)

You can optionally connect a website or R2 bucket when creating the instance.

**Website:**

Automatically crawl and index a [website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) that you own.

```sh
wrangler ai-search create my-instance --type web-crawler --source developers.cloudflare.com
```

**R2 bucket:**

Index documents stored in an [R2 bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/).

```sh
wrangler ai-search create my-instance --type r2 --source my-bucket
```

## 3\. Check indexing status

Check if your content has finished indexing by running the `stats` command.

```sh
wrangler ai-search stats my-instance
```

## 4\. Test your instance

Once indexing is complete, run a search query against your instance.

```sh
wrangler ai-search search my-instance --query "What is Cloudflare?"
```

For the full list of available commands, refer to [Wrangler commands](https://developers.cloudflare.com/ai-search/wrangler-commands/).

## Add to your application

### [ Workers binding ](https://developers.cloudflare.com/ai-search/api/search/workers-binding/)

 Query AI Search directly from your Workers code.

### [ REST API ](https://developers.cloudflare.com/ai-search/api/search/rest-api/)

 Query AI Search using HTTP requests.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/get-started/wrangler/#page","headline":"CLI · Cloudflare AI Search docs","description":"Create and manage AI Search instances from the command line.","url":"https://developers.cloudflare.com/ai-search/get-started/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
