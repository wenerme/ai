---
title: Monitor billable usage
description: Track daily usage-based costs across products.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Monitor billable usage

The billable usage dashboard gives you daily visibility into usage-based costs across your Cloudflare account. The data comes from the same system that generates your monthly invoice, so the figures match your bill.

The dashboard shows usage-based overage charges only. Fixed-fee plan subscriptions (for example, a Pro plan) are not included.

Note

The billable usage dashboard is available to Pay-as-you-go accounts only. Enterprise contract accounts are not supported.

To access the dashboard, you must have the Billing read permission on your account.

## Access the dashboard

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Manage Account** \> **Billing**.
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
3. Select **Billable Usage**.

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

## Filter usage by product family or product

Use the filters sidebar to narrow the dashboard to a subset of products.

* **Product family** — Group products by family (for example, Workers or R2) to compare costs across related usage metrics.
* **Product** — Filter to specific usage metrics. The list of available products narrows based on the families you select.

Applied filters scope the cost breakdown chart, product usage table, and summary totals to your selection. On mobile, the sidebar opens as a drawer with an **Apply** action. Select **Reset** to clear all filters.

## Select a billing period

By default, the dashboard shows data for your current billing period. Use the date picker to view a previous billing period.

Usage data is aligned to your billing cycle, not the calendar month. Your billing period start date is determined by the first purchase date on your account.

## Switch between subscriptions

In rare cases, an account has more than one usage-based subscription — usually because a previous subscription was replaced. If this applies to your account, a **Subscription** filter appears in the sidebar, with each subscription labeled by its start date.

Selecting a different subscription scopes the chart, product usage table, and available billing periods to that subscription's data. Each subscription has its own billing cycle.

## Data alignment with your invoice

The dashboard reads from the same data source that generates your monthly invoice.

* Costs reflect the published rate card for your account.
* The total usage cost shown at the end of a completed billing period matches the usage overage charges on the corresponding invoice.

## Set up budget alerts

To get notified when your spend crosses a dollar threshold, you can create budget alerts directly from the dashboard. For detailed instructions, refer to [Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/).

## Related resources

* [Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) — Get notified when spend crosses a threshold
* [Usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/) — Which products use metered billing
* [How charges accrue](https://developers.cloudflare.com/billing/understand/how-charges-accrue/) — How a request generates charges across products

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/manage/billable-usage/#page","headline":"Monitor billable usage · Cloudflare Billing docs","description":"Track daily usage-based costs across products.","url":"https://developers.cloudflare.com/billing/manage/billable-usage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/manage/","name":"Manage"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/manage/billable-usage/","name":"Monitor billable usage"}}]}
```
