---
title: Budget alerts
description: Get notified when spend crosses a dollar threshold.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Budget alerts

Budget alerts notify you by email when your account-wide usage-based spend crosses a dollar threshold you define. Use budget alerts to manage costs proactively instead of discovering unexpected charges at the end of a billing cycle.

Note

Budget alerts are available to Pay-as-you-go accounts only. Enterprise contract accounts are not supported.

## Create a budget alert

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Manage Account** \> **Billing**.
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
3. Select **Billable Usage**.
4. Select **Create budget alert**.
5. Configure the alert:

| Field                      | Description                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alert name**             | A descriptive name for the alert (for example, "R2 spend warning").                                                                                                   |
| **Description**            | _(Optional)_ A note about when this alert should fire.                                                                                                                |
| **Budget threshold (USD)** | The dollar amount that triggers the alert. When your cumulative usage-based spend for the current billing period crosses this value, Cloudflare sends a notification. |
| **Email recipients**       | One or more email addresses to notify. Select **Add email** to add additional recipients.                                                                             |
6. Select **Save**.

## View and manage budget alerts

To view your existing budget alerts, go to **Manage Account** \> **Billing** \> **Billable Usage** and select **Budget alerts**. The count next to the button shows how many alerts you have configured.

From there you can edit or delete existing alerts.

## How budget alerts work

* Budget alerts evaluate your cumulative usage-based spend for the current billing period.
* When spend crosses the threshold, Cloudflare sends a single email notification to all configured recipients.
* The alert resets at the start of each new billing period.
* Budget alerts are informational only. They do not pause or cap usage. Your monthly invoice remains the authoritative source for billing.

## Budget alerts compared to usage notifications

Cloudflare offers two types of spend monitoring:

| Feature            | Budget alerts                                   | Usage notifications                                       |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------- |
| **Scope**          | Account-wide, all usage-based products combined | Per-product (for example, Argo bytes or Workers requests) |
| **Threshold**      | Dollar amount                                   | Product-specific metric (bytes, requests, minutes)        |
| **Setup location** | **Billing** \> **Billable Usage**               | **Notifications**                                         |
| **Best for**       | Overall cost management                         | Monitoring a single product                               |

For per-product usage notifications, refer to [Usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/#usage-based-billing-notifications).

## Related resources

* [Monitor billable usage](https://developers.cloudflare.com/billing/manage/billable-usage/) — Track daily usage-based costs
* [Usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/) — Which products use metered billing
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — Billing lifecycle and charge types

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/manage/budget-alerts/#page","headline":"Budget alerts · Cloudflare Billing docs","description":"Get notified when spend crosses a dollar threshold.","url":"https://developers.cloudflare.com/billing/manage/budget-alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/manage/","name":"Manage"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/manage/budget-alerts/","name":"Budget alerts"}}]}
```
