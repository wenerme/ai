---
title: Schema learning
description: Cloudflare learns schema parameters via traffic inspection. For all endpoints saved to Endpoint Management, you can export the learned schema in OpenAPI v3.0.0 format by hostname.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/management-and-monitoring/endpoint-management/schema-learning.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Schema learning

Cloudflare learns schema parameters via traffic inspection. For all endpoints saved to Endpoint Management, you can export the learned schema in OpenAPI `v3.0.0` format by hostname.

To protect your API with a learned schema, refer to [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-applying-a-learned-schema-to-an-entire-hostname).

## Export a schema

* [  New dashboard ](#tab-panel-3136)
* [ Old dashboard ](#tab-panel-3137)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Endpoints** tab.
3. Select **Export schema** and choose a hostname to export.
4. Select whether to include learned parameters and rate limit recommendations
5. Select **Export schema** and choose a location to save the file.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield** \> **Endpoint Management**.
3. Select **Export schema** and choose a hostname to export.
4. Select whether to include [learned parameters](https://developers.cloudflare.com/api-shield/management-and-monitoring/#learned-schemas-will-always-include) and [rate limit recommendations](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/)
5. Select **Export schema** and choose a location to save the file.

Note

The schema is saved as a JSON file in OpenAPI `v3.0.0` format.

Learned schemas will always include:

* The listed hostname in the servers section
* All endpoints by host, method, and path

For endpoints that receive sufficient traffic, learned schemas will also include:

* Detected path variables and formats
* Detected query parameters and formats
* Detected `POST`, `PUT`, and `PATCH` body variable names and formats for `application/json` content types

Learned schemas can optionally include:

* API Shield's rate limit threshold recommendations

## Limitations

Endpoints must be added for at least 24 hours before schema learning begins. Schema learning is a continuous process that inspects the last 72 hours of traffic to an endpoint.

Schema learning only learns from requests with `2xx` response codes.

Schema learning works best with high volumes of traffic. You may see less confident learned schemas for endpoints with less than 10,000 requests in the last 72 hours.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/management-and-monitoring/","name":"Management and Monitoring"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/management-and-monitoring/endpoint-management/","name":"Endpoint Management"}},{"@type":"ListItem","position":5,"item":{"@id":"/api-shield/management-and-monitoring/endpoint-management/schema-learning/","name":"Schema learning"}}]}
```
