---
title: Pages
description: Configure Pages with Regional Services and Customer Metadata Boundary.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pages

In the following sections, we will give you some details about how to configure Pages with Regional Services and Customer Metadata Boundary.

## Regional Services

To configure Regional Services for hostnames [proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare and ensure that processing of a Pages project occurs only in-region, follow these steps for the dashboard or API configuration:

* [ Dashboard ](#tab-panel-5531)
* [ API ](#tab-panel-5532)

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Follow these steps to [create a Custom Domain](https://developers.cloudflare.com/pages/configuration/custom-domains/).
4. Go to the **DNS** of the zone you configured the Custom Domain for.
5. From the **Region** dropdown, select the region you would like to use on your domain.
6. Select **Save**.

1. Use the [API POST](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/create/) command to add a Custom Domain to a Pages project.
2. Run the [API POST](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the Pages Custom Domain to create a `regional_hostnames` with a specific Region.

Note

Regional Services only applies to the Custom Domain configured for a Pages project.

## Customer Metadata Boundary

Customer Metadata Boundary applies to the Custom Domain configured, as well as the [\*.pages.dev](https://developers.cloudflare.com/pages/configuration/preview-deployments/) subdomain. You also have the option to disable access to the [.dev domain](https://developers.cloudflare.com/pages/configuration/custom-domains/#disable-access-to-pagesdev-subdomain).

For information on available Analytics and Metrics, review the [Cloudflare product compatibility](https://developers.cloudflare.com/data-localization/compatibility/) page.

It is recommended not to store any Personally Identifiable Information (PII) in the Pages project's static assets.

Note

Page [Functions](https://developers.cloudflare.com/pages/functions/) are implemented as Cloudflare Workers. Refer to the Workers section for more information.

Refer to the [Pages documentation](https://developers.cloudflare.com/pages) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/how-to/pages/","name":"Pages"}}]}
```
