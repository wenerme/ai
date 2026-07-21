---
description: Automatically learn API schema parameters from traffic and export in OpenAPI format.
title: Schema learning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

#  Schema learning

Last updated May 6, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Schema learning observes live API traffic to automatically discover the parameters, headers, and body formats your endpoints accept. For all endpoints saved to Endpoint Management, you can export the learned schema in OpenAPI `v3.0.0` format by hostname.

To protect your API with a learned schema, refer to [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-applying-a-learned-schema-to-an-entire-hostname).

## Export a schema

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[ Go to **Web assets** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#page","headline":"Schema learning · Cloudflare API Shield docs","description":"Automatically learn API schema parameters from traffic and export in OpenAPI format.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
