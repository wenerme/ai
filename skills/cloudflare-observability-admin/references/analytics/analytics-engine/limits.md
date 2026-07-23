---
description: Review GraphQL Analytics API query limits.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/analytics-engine/limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following limits apply to Workers Analytics Engine:

* Analytics Engine will accept up to twenty blobs, twenty doubles, and one index per call to `writeDataPoint`.
* The total size of all blobs in a request must not exceed **16 KB**. The 16 KB size limit for the blobs field applies to **each individual data point**, regardless of how many are included in a single request using writeDataPoints().
* Each index must not be more than 96 bytes.
* You can write a maximum of 250 data points per Worker invocation (client HTTP request). Each call to `writeDataPoint` counts towards this limit.

## Data retention

Data written to Workers Analytics Engine is stored for three months.

Interested in longer retention periods? Join the `#analytics-engine` channel in the [Cloudflare Developers Discord ↗](https://discord.cloudflare.com/) and tell us more about what you are building.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/limits/#page","headline":"Workers Analytics Engine — Limits · Cloudflare Analytics docs","description":"Review GraphQL Analytics API query limits.","url":"https://developers.cloudflare.com/analytics/analytics-engine/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
