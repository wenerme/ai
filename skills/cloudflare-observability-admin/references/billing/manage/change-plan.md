---
description: Upgrade or downgrade a domain's Cloudflare plan.
title: Change domain plan
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

# Change domain plan

Last updated Jun 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/billing/manage/change-plan/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Occasionally, you may want to upgrade or downgrade the plan associated with a specific Cloudflare domain.

## Limitations

Only [Super Administrators](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles) can manage changes to domain plans.

If you decide to downgrade or remove a domain, Cloudflare does not issue refunds. Refer to our [billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) for more information.

Upgrades are processed immediately, but downgrades are not processed until the end of the billing period. You cannot upgrade if you have an unpaid invoice. When downgrading, you can continue using the higher plan's products until the new billing period begins.

If you downgrade your plan, your plan may have access to [fewer Page Rules](https://developers.cloudflare.com/rules/page-rules/). If you continue to use more page rules than is allowed by your plan limit, you may be charged for additional rules. Remove excess rules and [cancel additional subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/) if you do not want to be charged.

The Enterprise App Sec Advanced and Enterprise App Sec Core plans cannot be downgraded without [contacting Cloudflare](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

For additional help, refer to [this Community thread ↗](https://community.cloudflare.com/t/communitytip-page-rules-best-practices-when-downgrading-pro-to-free/305725).

## Change plan type

To change the Cloudflare plan for a domain in the dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Overview**.
3. For Active Subscriptions, select **Change**.
![Screenshot of the Overview page with the Plan extension section highlighted](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2352,height=1598,format=webp/_astro/change-plan.MkI9crmU.png)
4. Choose the appropriate plan type, then select **Continue**.
5. Select **Confirm**.

To change the Cloudflare plan for a domain using the API, first send a [GET](https://developers.cloudflare.com/api/resources/zones/subresources/plans/methods/list/) request to review available subscriptions.

Then, send a [PUT](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/update/) request with your desired plan type in the `rate_plan` object.

Note

If you are an Enterprise customer and cannot change your plan type, contact your Customer Success Manager.

## Change plan duration

To change the duration of your Cloudflare plan in the dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Overview**.
3. For Active Subscriptions, select **Change**.
![Screenshot of the Overview page with the Plan extension section highlighted](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2352,height=1598,format=webp/_astro/change-plan.MkI9crmU.png)
4. Switch the toggle between **Monthly** or **Annual**.
![Screenshot of the Plan choice with the annual or monthly toggle highlighted](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1856,height=1092,format=webp/_astro/plan-duration.BZ11r_rH.png)
5. Choose the appropriate plan type, then select **Continue**.
6. Select **Confirm**.

To change the duration of a Cloudflare plan for a domain using the API, send a [PUT](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/update/) request with an updated value for the `frequency` parameter.

## Related resources

* [Cancel subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/) — Cancel plans and add-ons
* [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) — Refund policy and subscription terms
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — When upgrades and downgrades take effect

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/manage/change-plan/#page","headline":"Change domain plan · Cloudflare Billing docs","description":"Upgrade or downgrade a domain's Cloudflare plan.","url":"https://developers.cloudflare.com/billing/manage/change-plan/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
