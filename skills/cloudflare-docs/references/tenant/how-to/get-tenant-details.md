---
title: Get tenant details
description: Retrieve tenant configuration and entitlement details using the Cloudflare Tenant API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/tenant/how-to/get-tenant-details.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get tenant details

A [**Tenant Admin**](https://developers.cloudflare.com/tenant/glossary/#tenant-admin)'s unit and membership details will be used for access of resources and all Tenant operations on the API. The unit ID (`unit_tag`), for example, can be used to create an account on a specific unit.

This is especially useful when a Tenant Admin has multiple units and wants to create an account on a specific unit. All accounts created are associated with the units, each of which can have one or more memberships.

To retrieve tenant details, send a `GET` request to the `/user/tenants` endpoint:

Request

```

curl "https://api.cloudflare.com/client/v4/user/tenants" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

A successful request will return an HTTP status of `200` and a response body containing tenant information, unit information, memberships, and tenant entitlements for all tenants administered by the user.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/tenant/how-to/get-tenant-details/","name":"Get tenant details"}}]}
```
