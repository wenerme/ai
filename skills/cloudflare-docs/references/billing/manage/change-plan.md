---
title: Change domain plan
description: Upgrade or downgrade a domain's Cloudflare plan.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Change domain plan

Occasionally, you may want to upgrade or downgrade the plan associated with a specific Cloudflare domain.

## Limitations

Only Super Administrators can manage changes to domain plans.

If you decide to downgrade or remove a domain, Cloudflare does not issue refunds. Refer to our [billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) for more information.

Upgrades are processed immediately, but downgrades are not processed until the end of the billing period. You will not be able to upgrade if you have an unpaid invoice. When downgrading, you are allowed to continue using the higher plans' products until the new billing period begins.

If you downgrade your plan, your plan may have access to [fewer Page Rules](https://developers.cloudflare.com/rules/page-rules/). If you continue to use more page rules than is allowed by your plan limit, you may be charged for additional rules. Remove excess rules and [cancel additional subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/) if you do not want to be charged.

The Enterprise App Sec Advanced and Enterprise App Sec Core plans cannot be downgraded without [contacting Cloudflare](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

For additional help, refer to [this Community thread ↗](https://community.cloudflare.com/t/communitytip-page-rules-best-practices-when-downgrading-pro-to-free/305725).

## Change plan type

* [ Dashboard ](#tab-panel-5513)
* [ API ](#tab-panel-5514)

To change the Cloudflare plan for a domain in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Overview**.
3. For Plan Extensions, select **Change**.  
![Screenshot of the Overview page with the Plan extension section highlighted](https://developers.cloudflare.com/_astro/change-plan.MkI9crmU_eMjgp.webp)
4. Choose the appropriate plan type, then select **Continue**.
5. Select **Confirm**.

To change the Cloudflare plan for a domain using the API, first send a [GET](https://developers.cloudflare.com/api/resources/zones/subresources/plans/methods/list/) request to review available subscriptions.

Then, send a [PUT](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/update/) request with your desired plan type in the `rate_plan` object.

Note

If you are an Enterprise customer and cannot change your plan type, contact your Customer Success Manager.

## Change plan duration

* [ Dashboard ](#tab-panel-5515)
* [ API ](#tab-panel-5516)

To change the duration of your Cloudflare plan in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Overview**.
3. For Plan Extensions, select **Change**.  
![Screenshot of the Overview page with the Plan extension section highlighted](https://developers.cloudflare.com/_astro/change-plan.MkI9crmU_eMjgp.webp)
4. Switch the toggle between **Monthly** or **Annual**.  
![Screenshot of the Plan choice with the annual or monthly toggle highlighted](https://developers.cloudflare.com/_astro/plan-duration.BZ11r_rH_u9VOU.webp)
5. Choose the appropriate plan type, then select **Continue**.
6. Select **Confirm**.

To change the duration of a Cloudflare plan for a domain using the API, send a [PUT](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/update/) request with an updated value for the `frequency` parameter.

## Related resources

* [Cancel subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/) — Cancel plans and add-ons
* [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) — Refund policy and subscription terms
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — When upgrades and downgrades take effect

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/manage/","name":"Manage"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/manage/change-plan/","name":"Change domain plan"}}]}
```
