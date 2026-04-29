---
title: Cloudflare for SaaS
description: Configure Cloudflare for SaaS with Regional Services and Customer Metadata Boundary.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare for SaaS

In the following sections, we will give you some details about how to configure Cloudflare for SaaS with Regional Services and Customer Metadata Boundary.

## Regional Services

To configure Regional Services for both hostnames [proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare and the fallback origin, follow these steps for the dashboard or API configuration:

* [ Dashboard ](#tab-panel-5527)
* [ API ](#tab-panel-5528)

1. In the Cloudflare dashboard, go to the **Custom Hostnames** page.  
[ Go to **Custom Hostnames** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames)
2. Follow these steps to [configure Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).

1. Set the [fallback record](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/fallback%5Forigin/methods/update/).
2. Create a [Custom Hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/).
3. Run the [API POST](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the Custom Hostname to create a `regional_hostnames` with a specific region.

The Regional Services functionality can be extended to Custom Hostnames and this is dependent on the target of the alias.

Consider the following example.

Note

As a SaaS provider, I might want all of my customers to connect to the nearest data center to them and for all the processing and Cloudflare features to be applied there; however, I might have a few exceptions where I want the processing to only be done in the US.

In this case, I can just keep my fallback record with `Earth` as the processing region and have all my Custom Hostnames create a CNAME record and use the fallback record as the CNAME target. For any Custom Hostnames that need to be processed in the US, I will create a DNS record for example, `us.saasprovider.com` and set the processing region to `United States of America`. In order for the US processing region to be applied, my customers must create a CNAME record and use the `us.saasprovider.com` as the CNAME target. The origin associated with the Custom Hostname is not used to set the processing region, but instead to route the traffic to the right server.

Below you can find a breakdown of the different ways that you might configure Cloudflare for SaaS and the corresponding processing regions:

* No processing region: `fallback.saasprovider.com`
* Processing region is the `US`: `us.saasprovider.com`
* User location: `UK` (closest datacenter: `LHR`)

| Test | Custom Hostname                        | Target                    | Origin                       | Location |
| ---- | -------------------------------------- | ------------------------- | ---------------------------- | -------- |
| 1    | ​​regionalservices-default.example.com | fallback.saasprovider.com | default (fallback)           | LHR      |
| 2    | regionalservices-default2.example.com  | us.saasprovider.com       | default (fallback)           | EWR      |
| 3    | regionalservices-custom.example.com    | fallback.saasprovider.com | us.saasprovider.com (custom) | LHR      |
| 4    | regionalservices-custom2.example.com   | us.saasprovider.com       | us.saasprovider.com (custom) | EWR      |

* In order to set a processing region for the fallback record to any of the available regions for Regional Services, create a new regional hostname entry for the fallback via a [POST](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) request.
* To update the existing region (for example, from `EU` to `US`), make a [PATCH](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) request for the fallback to update the processing region accordingly.
* To remove the regional services processing region and set it back to `Earth`, make a [DELETE](https://developers.cloudflare.com/data-localization/regional-services/get-started/#configure-regional-services-via-api) request to delete the region configuration.

## Customer Metadata Boundary

Cloudflare for SaaS [Analytics](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/) based on [HTTP requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) are fully supported by Customer Metadata Boundary.

Refer to [Cloudflare for SaaS documentation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/how-to/cloudflare-for-saas/","name":"Cloudflare for SaaS"}}]}
```
