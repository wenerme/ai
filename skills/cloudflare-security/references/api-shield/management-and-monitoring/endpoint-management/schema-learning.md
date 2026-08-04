---
description: Automatically learn API schema parameters from traffic and export in OpenAPI format.
title: Schema learning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Schema learning

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Schema learning observes live API traffic for operations in the `full` state. It discovers the parameters, headers, and body formats that your API endpoints accept. You can export learned schemas in OpenAPI `v3.0.0` format by hostname.

For API Shield customers using unified operation discovery, select **Learn profile** from a discovered operation's row actions. This promotes the operation to the `full` state and starts collecting data for schema learning. The action then changes to **Profile learned**. For more information, refer to [Promote an operation](https://developers.cloudflare.com/security/web-assets/manage-operations/#promote-an-operation).

To protect your API with a learned schema, refer to [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-applying-a-learned-schema-to-an-entire-hostname).

## Export a schema

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Operations** tab.
3. Select **Export schema** and choose a hostname to export.
4. Select whether to include learned parameters and rate limit recommendations.
5. Select **Export schema** and choose a location to save the file.

Note

The schema is saved as a JSON file in OpenAPI `v3.0.0` format.

## Learned schema contents

Learned schemas always include:

* The listed hostname in the servers section
* All full operations by hostname, method, and path

For operations that receive sufficient traffic, learned schemas will also include:

* Detected path variables and formats
* Detected query parameters and formats
* Detected `POST`, `PUT`, and `PATCH` body variable names and formats for `application/json` content types

Learned schemas can optionally include:

* API Shield's rate limit threshold recommendations

## Limitations

An operation must remain in the `full` state for at least 24 hours before schema learning begins. Schema learning continuously inspects the last 72 hours of traffic to the operation.

Schema learning only learns from requests with `2xx` response codes.

Schema learning works best with high traffic volumes. Learned schemas may have lower confidence for operations with fewer than 10,000 requests in the last 72 hours.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#page","headline":"Schema learning · Cloudflare API Shield docs","description":"Automatically learn API schema parameters from traffic and export in OpenAPI format.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
