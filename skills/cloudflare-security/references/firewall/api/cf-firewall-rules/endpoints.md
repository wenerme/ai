---
description: API endpoints for managing filters and firewall rules.
title: Endpoints
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Endpoints

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/endpoints/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To invoke a Cloudflare Firewall Rules API operation, append the endpoint to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4/
```

For authentication instructions, refer to [Getting Started: Requests](https://developers.cloudflare.com/fundamentals/api/) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://developers.cloudflare.com/fundamentals/api/).

Note

The Firewall Rules API endpoints require a value for `<ZONE_ID>`.

To retrieve a list of zones associated with your account, use the [List Zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) operation and note the zone ID associated with the domain whose firewall rules you want to manage.

The Cloudflare Firewall Rules API supports the operations outlined below. Visit the pages in this section for examples.

| Operation                                                                                                                   | Method & Endpoint                                 | Notes                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Create firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/create/)        | POST zones/<ZONE\_ID>/firewall/rules              | Handled as a single transaction. If there is an error, the entire operation fails.                                                                                            |
| [List firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/list/)            | GET zones/<ZONE\_ID>/firewall/rules               | Lists all current firewall rules. Results return paginated with 25 items per page by default. Use optional parameters to narrow results.                                      |
| [Get a firewall rule](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/get/)             | GET zones/<ZONE\_ID>/firewall/rules/<RULE\_ID>    | Retrieve a single firewall rule by ID.                                                                                                                                        |
| [Update firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/bulk%5Fupdate/) | PUT zones/<ZONE\_ID>/firewall/rules               | Handled as a single transaction. All rules must exist for operation to succeed. If there is an error, the entire operation fails.                                             |
| [Update a firewall rule](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/update/)       | PUT zones/<ZONE\_ID>/firewall/rules/<RULE\_ID>    | Update a single firewall rule by ID.                                                                                                                                          |
| [Delete firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/bulk%5Fdelete/) | DELETE zones/<ZONE\_ID>/firewall/rules            | Delete existing firewall rules. Must specify list of firewall rule IDs.Empty requests result in no deletion. Returns HTTP status code 200 if a specified rule does not exist. |
| [Delete a firewall rule](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/delete/)       | DELETE zones/<ZONE\_ID>/firewall/rules/<RULE\_ID> | Delete a firewall rule by ID.                                                                                                                                                 |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/endpoints/#page","headline":"Endpoints - Firewall rules · Cloudflare Firewall Rules (deprecated) docs","description":"API endpoints for managing filters and firewall rules.","url":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/endpoints/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
