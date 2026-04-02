---
title: Get account details
description: An Account will contain various settings, resources, and subscriptions to products for users. Each Tenant can have multiple associated accounts.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/tenant/how-to/get-account-details.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get account details

An [**Account**](https://developers.cloudflare.com/tenant/glossary/#account) will contain various settings, resources, and subscriptions to products for users. Each Tenant can have multiple associated accounts.

To retrieve a list of accounts associated with a Tenant details, send a `GET` request to the `/tenants/{tenant_id}/accounts` endpoint. You can find the Tenant tag and all Tenants associated with the user with the [**Tenant Details**](https://developers.cloudflare.com/tenant/how-to/get-tenant-details/) API. The Tenant Accounts API also requires pagination passed as query parameters:

* `page` number  
   * Page number of accounts list response, indexed from 1
* `per_page` number  
   * Number of accounts to display per page
* `order` string  
   * (optional) Order by a specific column, has to be a valid top-level key from the response  
   * `direction` number  
         * (optional) 0 for ascending or 1 for descending, is 0 by default

Request

```

curl "https://api.cloudflare.com/client/v4/tenants/{tenant_id}/accounts?page=1&per_page=10" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

A successful request will return an HTTP status of `200` and a response body containing account information and feature flags for all accounts managed by the Tenant.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/tenant/how-to/get-account-details/","name":"Get account details"}}]}
```
