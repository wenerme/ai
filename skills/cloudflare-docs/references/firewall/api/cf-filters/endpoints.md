---
title: Endpoints
description: To invoke a Cloudflare Filters API operation, append the endpoint to the Cloudflare API base URL:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-filters/endpoints.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Endpoints

To invoke a Cloudflare Filters API operation, append the endpoint to the Cloudflare API base URL:

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-filters/endpoints/","name":"Endpoints"}}]}
```
