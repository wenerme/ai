---
description: Retrieve tenant configuration and entitlement details using the Cloudflare Tenant API.
title: Get tenant details
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tenant/llms.txt
> Use this file to discover all available pages before exploring further.

# Get tenant details

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/tenant/how-to/get-tenant-details/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A [**Tenant Admin**](https://developers.cloudflare.com/tenant/glossary/#tenant-admin)'s unit and membership details will be used for access of resources and all Tenant operations on the API. The unit ID (`unit_tag`), for example, can be used to create an account on a specific unit.

This is especially useful when a Tenant Admin has multiple units and wants to create an account on a specific unit. All accounts created are associated with the units, each of which can have one or more memberships.

To retrieve tenant details, send a `GET` request to the `/user/tenants` endpoint:

```bash
curl "https://api.cloudflare.com/client/v4/user/tenants" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

A successful request will return an HTTP status of `200` and a response body containing tenant information, unit information, memberships, and tenant entitlements for all tenants administered by the user.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tenant/how-to/get-tenant-details/#page","headline":"Get tenant details · Cloudflare Tenant docs","description":"Retrieve tenant configuration and entitlement details using the Cloudflare Tenant API.","url":"https://developers.cloudflare.com/tenant/how-to/get-tenant-details/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
