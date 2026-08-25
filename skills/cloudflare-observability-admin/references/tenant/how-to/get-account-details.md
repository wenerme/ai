---
description: Retrieve account information for tenant-managed Cloudflare accounts using the API.
title: Get account details
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tenant/llms.txt
> Use this file to discover all available pages before exploring further.

# Get account details

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/tenant/how-to/get-account-details/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

```bash
curl "https://api.cloudflare.com/client/v4/tenants/{tenant_id}/accounts?page=1&per_page=10" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

A successful request will return an HTTP status of `200` and a response body containing account information and feature flags for all accounts managed by the Tenant.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tenant/how-to/get-account-details/#page","headline":"Get account details · Cloudflare Tenant docs","description":"Retrieve account information for tenant-managed Cloudflare accounts using the API.","url":"https://developers.cloudflare.com/tenant/how-to/get-account-details/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
