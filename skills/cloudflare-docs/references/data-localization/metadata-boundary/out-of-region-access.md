---
title: Out of region access
description: Allow authorized users to access logs and analytics stored outside their physical region.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Out of region access

With the default configuration for Customer Metadata Boundary, users outside the configured region will not have access to view analytics on the dashboard or the default API endpoint. When **Allow out-of-region access** is enabled, Customer Logs will still be stored exclusively within the configured region but will be made available to users outside the region as well.

For example, when **Allow out-of-region access** is **disabled** on an account configured for Customer Metadata Boundary in the US, users in Europe will not be able to see any analytics or Customer Logs on the dashboard.

When **Allow out-of-region access** is enabled on an account configured for Customer Metadata Boundary in the US, users in both Europe and the US will be able to see analytics on the dashboard even though the Customer Logs are stored exclusively in the US.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/metadata-boundary/","name":"Customer Metadata Boundary"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/metadata-boundary/out-of-region-access/","name":"Out of region access"}}]}
```
