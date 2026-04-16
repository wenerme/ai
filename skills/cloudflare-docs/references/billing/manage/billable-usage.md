---
title: Monitor billable usage
description: The billable usage dashboard gives you daily visibility into usage-based costs across your Cloudflare account. The data comes from the same system that generates your monthly invoice, so the figures match your bill.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/billing/manage/billable-usage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Monitor billable usage

The billable usage dashboard gives you daily visibility into usage-based costs across your Cloudflare account. The data comes from the same system that generates your monthly invoice, so the figures match your bill.

The dashboard shows usage-based overage charges only. Fixed-fee plan subscriptions (for example, a Pro plan) are not included.

Note

The billable usage dashboard is available to Pay-as-you-go accounts only. Enterprise contract accounts are not supported.

To access the dashboard, you must have the Billing read permission on your account.

## Access the dashboard

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Manage Account** \> **Billing**.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
4. Select **Billable Usage**.

## Cost breakdown chart

The bar chart at the top of the dashboard displays your daily usage charges for the selected billing period. Each bar is stacked by product, so you can identify which products are driving spend and when spending patterns change.

Hover over any bar to see the per-product cost breakdown for that day.

## Product usage table

Below the chart, a sortable table breaks down usage by product for the full billing period.

| Column             | Description                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Product**        | The Cloudflare product or service generating the usage charge. Products with a free tier show the included allowance (for example, "First 1M included"). |
| **Total usage**    | Total metered usage for the billing period, including any free-tier allowance.                                                                           |
| **Billable usage** | Usage that exceeds the free tier and will be charged.                                                                                                    |
| **Usage cost**     | Cumulative cost for the product in the selected billing period.                                                                                          |

Use the **product filter** at the top of the page to narrow the chart and table to specific products.

## Select a billing period

By default, the dashboard shows data for your current billing period. Use the date picker to view a previous billing period.

Usage data is aligned to your billing cycle, not the calendar month. Your billing period start date is determined by the first purchase date on your account.

## Data alignment with your invoice

The dashboard reads from the same data source that generates your monthly invoice.

* Costs reflect the published rate card for your account.
* The total usage cost shown at the end of a completed billing period matches the usage overage charges on the corresponding invoice.

## Set up budget alerts

To get notified when your spend crosses a dollar threshold, you can create budget alerts directly from the dashboard. For detailed instructions, refer to [Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/manage/","name":"Manage"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/manage/billable-usage/","name":"Monitor billable usage"}}]}
```
