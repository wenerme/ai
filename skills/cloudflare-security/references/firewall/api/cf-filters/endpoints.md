---
description: API endpoints for managing filters and firewall rules.
title: Endpoints
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

#  Endpoints

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/firewall/api/cf-filters/endpoints/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

To invoke a Cloudflare Filters API operation, append the endpoint to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4/
```

For authentication instructions, refer to [Getting Started: Requests](https://developers.cloudflare.com/fundamentals/api/) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://developers.cloudflare.com/fundamentals/api/).

Note

The Filters API endpoints require a value for `<ZONE_ID>`.

To retrieve a list of zones associated with your account, use the [List Zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) operation and note the Zone ID associated with the domain for which you want to manage filters.

The Cloudflare Filters API supports the operations outlined below. Visit the pages in this section for examples.

| Operation                                                                                        | Method & Endpoint                            | Notes                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Create filters](https://developers.cloudflare.com/api/resources/filters/methods/create/)        | POST zones/<ZONE\_ID>/filters                | Handled as a single transaction. If there is an error, the entire operation fails.                                                                                |
| [Get filters](https://developers.cloudflare.com/api/resources/filters/methods/list/)             | GET zones/<ZONE\_ID>/filters                 | Lists all current filters. Results return paginated with 25 items per page by default. Use optional parameters to narrow results.                                 |
| [Get a filter](https://developers.cloudflare.com/api/resources/filters/methods/get/)             | GET zones/<ZONE\_ID>/filters/<FILTER\_ID>    | Retrieve a single filter by ID.                                                                                                                                   |
| [Update filters](https://developers.cloudflare.com/api/resources/filters/methods/bulk%5Fupdate/) | PUT zones/<ZONE\_ID>/filters                 | Handled as a single transaction. All filters must exist for operation to succeed. If there is an error, the entire operation fails.                               |
| [Update a filter](https://developers.cloudflare.com/api/resources/filters/methods/update/)       | PUT zones/<ZONE\_ID>/filters/<FILTER\_ID>    | Update a single filter by ID.                                                                                                                                     |
| [Delete filters](https://developers.cloudflare.com/api/resources/filters/methods/bulk%5Fdelete/) | DELETE zones/<ZONE\_ID>/filters              | Delete existing filters. Must specify list of filter IDs.Empty requests result in no deletion. Returns HTTP status code 200 if a specified filter does not exist. |
| [Delete a filter](https://developers.cloudflare.com/api/resources/filters/methods/delete/)       | DELETE zones/<ZONE\_ID>/filters/<FILTER\_ID> | Delete a filter by ID.                                                                                                                                            |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-filters/endpoints/#page","headline":"Endpoints - Filters · Cloudflare Firewall Rules (deprecated) docs","description":"API endpoints for managing filters and firewall rules.","url":"https://developers.cloudflare.com/firewall/api/cf-filters/endpoints/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
