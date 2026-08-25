---
description: Latest changes, improvements, and fixes for Workers KV.
title: Release notes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# Release notes

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/kv/platform/release-notes/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/kv/platform/release-notes/index.xml)

## 2024-11-14

**Workers KV REST API bulk operations provide granular errors**

The REST API endpoints for bulk operations ([write](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fupdate/), [delete](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fdelete/)) now return the keys of operations that failed during the bulk operation. The updated response bodies are documented in the [REST API documentation](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/list/) and contain the following information in the `result` field:

```
{
  "successful_key_count": number,
  "unsuccessful_keys": string[]
}

```

The unsuccessful keys are an array of keys that were not written successfully to all storage backends and therefore should be retried.

## 2024-08-08

**New KV Analytics API**

Workers KV now has a new [metrics dashboard](https://developers.cloudflare.com/kv/observability/metrics-analytics/#view-metrics-in-the-dashboard) and [analytics API](https://developers.cloudflare.com/kv/observability/metrics-analytics/#query-via-the-graphql-api) that leverages the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) used by many other Cloudflare products. The new analytics API provides per-account and per-namespace metrics for both operations and storage, including latency metrics for read and write operations to Workers KV.

The legacy Workers KV analytics REST API will be turned off as of January 31st, 2025\. Developers using this API will receive a series of email notifications prior to the shutdown of the legacy API.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/kv/platform/release-notes/#page","headline":"Release notes · Cloudflare Workers KV docs","description":"Latest changes, improvements, and fixes for Workers KV.","url":"https://developers.cloudflare.com/kv/platform/release-notes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
