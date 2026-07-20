---
title: Out of region access
description: Allow authorized users to access logs and analytics stored outside their physical region.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Out of region access

With the default configuration for Customer Metadata Boundary, users who are physically located outside the configured storage region will not have access to view analytics on the dashboard or retrieve data through the standard API endpoint. When **Allow out-of-region access** is enabled, Customer Logs will still be stored exclusively within the configured region but will be made available to authorized users on your account regardless of their physical location.

This is useful when your operations, security, or engineering teams are distributed across multiple regions and need visibility into traffic analytics without relocating the underlying data.

For example, when **Allow out-of-region access** is **disabled** on an account configured for Customer Metadata Boundary in the US, users in Europe will not be able to see any analytics or Customer Logs on the dashboard.

When **Allow out-of-region access** is enabled on an account configured for Customer Metadata Boundary in the US, users in both Europe and the US will be able to see analytics on the dashboard even though the Customer Logs are stored exclusively in the US.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/#page","headline":"Out of region access · Cloudflare Data Localization Suite docs","description":"Allow authorized users to access logs and analytics stored outside their physical region.","url":"https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/metadata-boundary/","name":"Customer Metadata Boundary"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/metadata-boundary/out-of-region-access/","name":"Out of region access"}}]}
```
