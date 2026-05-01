---
title: Workers
description: Configure Workers with Regional Services and Customer Metadata Boundary.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers

To ensure that your Cloudflare Workers code runs only within a specific geographic region, configure Regional Services on the Workers custom domain. This restricts where TLS termination (traffic decryption) and code execution occur.

## Regional Services

To configure Regional Services for hostnames [proxied](https://developers.cloudflare.com/dns/proxy-status/) (meaning traffic routes through Cloudflare rather than directly to your origin server) through Cloudflare and ensure that processing of a Workers project occurs only in-region, follow these steps:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Workers project.
3. Follow the steps to [create a custom domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
4. Run the [API POST](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the configured Workers Custom Domain to create a `regional_hostnames` with a specific region.

### Caveats

Regional Services only applies to the custom domain configured for a Workers project. Therefore, it will run only in-region Cloudflare locations.

Regional Services does not apply to [subrequests](https://developers.cloudflare.com/workers/platform/limits/#subrequests) (secondary HTTP requests that Workers make to other services).

Regional Services does not apply to other Worker triggers, like [Queues](https://developers.cloudflare.com/queues/) or [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

## Customer Metadata Boundary

Customer Metadata Boundary applies to the custom domain configured, as well as the [\*.workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) subdomain.

Workers [Metrics and Analytics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/) are not available outside the US region when using Customer Metadata Boundary.

With Customer Metadata Boundary set to `EU`, **Workers & Pages** \> **Workers** \> **Metrics** tab the zone dashboard will not be populated.

Note

It is recommended to not store any Personally Identifiable Information (PII) in the Workers code. If sensitive information needs to be used, it is recommended to use [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

Refer to the [Workers documentation](https://developers.cloudflare.com/workers/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/how-to/workers/","name":"Workers"}}]}
```
