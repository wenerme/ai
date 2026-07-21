---
description: Allow authorized users to access logs and analytics stored outside their physical region.
title: Out of region access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

#  Out of region access

Last updated May 7, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

With the default configuration for Customer Metadata Boundary, users who are physically located outside the configured storage region will not have access to view analytics on the dashboard or retrieve data through the standard API endpoint. When **Allow out-of-region access** is enabled, Customer Logs will still be stored exclusively within the configured region but will be made available to authorized users on your account regardless of their physical location.

This is useful when your operations, security, or engineering teams are distributed across multiple regions and need visibility into traffic analytics without relocating the underlying data.

For example, when **Allow out-of-region access** is **disabled** on an account configured for Customer Metadata Boundary in the US, users in Europe will not be able to see any analytics or Customer Logs on the dashboard.

When **Allow out-of-region access** is enabled on an account configured for Customer Metadata Boundary in the US, users in both Europe and the US will be able to see analytics on the dashboard even though the Customer Logs are stored exclusively in the US.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/#page","headline":"Out of region access · Cloudflare Data Localization Suite docs","description":"Allow authorized users to access logs and analytics stored outside their physical region.","url":"https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
```
