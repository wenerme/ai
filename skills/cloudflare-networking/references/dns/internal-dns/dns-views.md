---
description: Manage DNS views to return different responses by network.
title: Manage DNS views
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage DNS views

Last updated Jul 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/internal-dns/dns-views/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Internal DNS views are logical groupings of [internal DNS zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/). As explained in the [architecture overview](https://developers.cloudflare.com/dns/internal-dns/#architecture-overview), DNS views are referenced by [Gateway resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to define how a specific query should be resolved.

Refer to the sections below for details on how to manage your DNS views, or consider the [get started](https://developers.cloudflare.com/dns/internal-dns/get-started/) for a complete workflow.

## Configuration conditions

When setting up DNS views, observe the following conditions:

* DNS views can be empty, with no [internal zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/) linked to them.
* A DNS view cannot contain public DNS zones.1
* Each internal DNS zone name must be unique within a given DNS view.
* Each DNS view name must be unique within a given Cloudflare account.

1 DNS zones that contain public DNS records and are accessible by public resolvers.

## Create a view

1. In the Cloudflare dashboard, go to the **Internal DNS** page.
[Go to **Internal DNS** ↗](https://dash.cloudflare.com/?to=/:account/internal-dns)
2. Go to **Internal DNS Views**.
3. Select **Create a view**.
4. Give your view a descriptive name.
1. Select **Manage zones** to add zones to your view. Select the internal zones that should be used to resolve queries sent by Gateway resolver to this view.
2. Choose **Save** to confirm.

Use the [Create Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/create/) endpoint. For each view you create, list all the internal zones that should be grouped under that view.

Note

DNS views are managed at the account level. Make sure your API token includes **Account** \> **DNS Views** \> **Edit** permission.

## Delete a view

DNS views can be deleted even if they still have internal zones linked to them. The internal DNS zones will continue to exist but will be unlinked once the view is deleted.

It is also possible to delete a DNS view that is being referenced by a Gateway resolver policy. In this case, queries matching the policy will return SERVFAIL.

1. In the Cloudflare dashboard, go to the **Internal DNS** page.
[Go to **Internal DNS** ↗](https://dash.cloudflare.com/?to=/:account/internal-dns)
2. Go to **Internal DNS Views**.
3. Find the view you want to delete.
4. Select the three dots in the corresponding row and choose _Delete_.
5. In the confirmation dialog, select **Delete** again to proceed.

Use the [Delete Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/delete/) endpoint.

## Other API actions

* [Update a DNS view](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/edit/) (`PATCH`)
* [Get view details](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/get/) (`GET`)
* [List DNS views](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/list/) (`GET`)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/dns-views/#page","headline":"Manage DNS views · Cloudflare DNS docs","description":"Manage DNS views to return different responses by network.","url":"https://developers.cloudflare.com/dns/internal-dns/dns-views/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
