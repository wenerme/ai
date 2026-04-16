---
title: Get started
description: Learn how to enable Argo Smart Routing in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/argo-smart-routing/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

Smart Shield

This functionality is now offered as part of Cloudflare's origin server safeguard, Smart Shield. [Learn more](https://developers.cloudflare.com/smart-shield/).

Argo Smart Routing is a one-click solution to speed up your global traffic.

* [ Dashboard ](#tab-panel-3498)
* [ API ](#tab-panel-3499)

To enable [Argo Smart Routing ↗](https://dash.cloudflare.com/?to=/:account/:zone/traffic) in the dashboard:

1. In the Cloudflare dashboard, go to the **Argo Smart Routing** page.  
[ Go to **Argo Smart Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/traffic)
2. For **Argo Smart Routing**, switch the toggle to **On**.
3. Provide your billing information.  
   * If you do not have a [billing profile](https://developers.cloudflare.com/billing/get-started/create-billing-profile/), enter your billing information.  
   * If you have a billing profile, confirm your billing information.

To enable or disable Argo Smart Routing with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/argo/subresources/smart%5Frouting/methods/edit/) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).

You will need to already have a [billing profile](https://developers.cloudflare.com/billing/get-started/create-billing-profile/) on your account to enable Argo Smart Routing.

Note

Enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## Billing

If Cloudflare mitigates attacks on your site - whether through DDoS protection, the WAF, or other mechanisms - that traffic will not be included in any charges for Argo Smart Routing.

Since this is a service with [usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/), Cloudflare recommends that you set up usage-based billing notifications to avoid unexpected bills.

To set up those notifications:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. On **Alert Type** of **Usage Based Billing**, click **Select**.
3. Fill out the following information:  
   * **Name**  
   * **Product**  
   * **Notification limit** (exact metric will vary based on product)  
   * **Notification email**  
Note  
Some plans also have access to alerts through [PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/) and [Webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/).
4. Select **Save**.

## Enable Tiered Cache

[Cache](https://developers.cloudflare.com/cache/) works by storing a copy of website content at Cloudflare's data centers. [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) divides these data centers into a hierarchy based on location. This behavior allows Cloudflare to deliver content from data centers closest to your visitor.

Argo Smart Routing and Tiered Cache work together to provide the most efficient connection for visitors to your site. For more information, go to [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/argo-smart-routing/","name":"Argo Smart Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/argo-smart-routing/get-started/","name":"Get started"}}]}
```
