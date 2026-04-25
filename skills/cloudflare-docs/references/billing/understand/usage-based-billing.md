---
title: Usage-based billing
description: Products that bill based on metered consumption.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Usage-based billing

For some Cloudflare subscriptions and services, Cloudflare charges you based on how much you used a feature during your previous billing period. This differs from other services, which are a prepaid flat fee for the upcoming month (for example, plans and page rules).

For example, if your billing date is on the 15th of the month and you turn on Cloudflare Workers in the dashboard on the 1st, your next invoice includes the Workers charges from the 1st through the 15th. The following invoice includes charges for Workers usage during the full billing period.

Note

The pricing structure varies based on the service being used.

## Products with usage-based billing

The following products bill based on consumption. Each product includes a free tier — you are only charged for usage that exceeds the included amount.

For current overage rates, refer to the [Cloudflare plans page ↗](https://www.cloudflare.com/plans/) or each product's pricing page linked below. Rates may change — the links below are always up to date.

| Product                                                                                        | Billable metric                | Free tier (included)                   | Pricing details                                                                                        |
| ---------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [Workers](https://developers.cloudflare.com/workers/platform/pricing/)                         | Requests, CPU time             | 10M requests, 30M CPU-ms               | [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)                         |
| [R2](https://developers.cloudflare.com/r2/pricing/)                                            | Storage, operations            | 10 GB storage, 1M Class A, 10M Class B | [R2 pricing](https://developers.cloudflare.com/r2/pricing/)                                            |
| [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/)                    | Data transfer (GB)             | First 1 GB                             | [Argo pricing](https://developers.cloudflare.com/argo-smart-routing/)                                  |
| [Cache Reserve](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/) | Reads, writes, storage         | None                                   | [Cache Reserve pricing](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/) |
| [Load Balancing](https://developers.cloudflare.com/load-balancing/)                            | DNS queries                    | First 500K                             | [Load Balancing](https://developers.cloudflare.com/load-balancing/)                                    |
| [Stream](https://developers.cloudflare.com/stream/pricing/)                                    | Minutes stored, minutes viewed | Varies by plan                         | [Stream pricing](https://developers.cloudflare.com/stream/pricing/)                                    |
| [Images](https://developers.cloudflare.com/images/pricing/)                                    | Transformations, storage       | Varies by plan                         | [Images pricing](https://developers.cloudflare.com/images/pricing/)                                    |
| [Spectrum](https://developers.cloudflare.com/spectrum/)                                        | Data transfer (GB)             | None                                   | [Spectrum](https://developers.cloudflare.com/spectrum/)                                                |

## Optimize usage-based costs

Reducing usage-based charges starts with understanding where your consumption comes from. Use the [billable usage dashboard](https://developers.cloudflare.com/billing/manage/billable-usage/) to identify which products are driving costs, then apply the strategies below.

| Strategy                                                                                                                                  | What it reduces                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Increase cache hit ratio with longer TTLs and appropriate Cache-Control headers                                                           | Argo data transfer, Workers invocations, origin load |
| Use [Cache Reserve](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/) for long-tail content                  | Origin fetches for infrequently accessed assets      |
| Set up [R2 lifecycle rules](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) to transition cold data to Infrequent Access | R2 storage costs                                     |
| Use [Workers Smart Placement](https://developers.cloudflare.com/workers/configuration/placement/) for data-heavy Workers                  | Workers CPU time                                     |
| Batch R2 operations where possible instead of per-object reads                                                                            | R2 Class B operation count                           |
| Set up [budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) to catch unexpected spikes early                  | All products — prevents surprise invoices            |

For a detailed walkthrough of how a single request generates charges across multiple products, refer to [How charges accrue](https://developers.cloudflare.com/billing/understand/how-charges-accrue/).

## Monitor your usage

The [billable usage dashboard](https://developers.cloudflare.com/billing/manage/billable-usage/) gives Pay-as-you-go customers daily visibility into usage-based costs. The dashboard shows a daily cost breakdown chart and a per-product usage table with free-tier allowances, so you can see exactly what you are being charged for.

You can also set up [budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) to get notified by email when your account-wide spend crosses a dollar threshold you define.

## Usage-based billing notifications

If you are on a Professional plan or higher, you can monitor the usage of individual Cloudflare add-ons by turning on email notifications. Cloudflare sends a notification to the billing email address on file when traffic, queries, requests, or minutes watched exceed your defined threshold.

Note

The email notifications are for informational purposes only. Actual usage and billing may vary. Your monthly invoice is the most reliable source for billing information.

You can choose the product you want to monitor and the threshold that triggers the notification. Thresholds depend on the product.

For example, Argo Smart Routing has **Notify when total bytes of traffic exceeds** as a threshold, and Load Balancing has **Notify when total number of DNS Queries exceeds** as a threshold.

### Set up usage notifications

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Notifications**.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
4. Select **Add** to create a new notification for **Billable Usage**.

For more information, refer to [Cloudflare notifications](https://developers.cloudflare.com/notifications/get-started/).

Note

Usage notifications monitor a single product metric (bytes, requests, minutes). To monitor your total dollar spend across all products, use [budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) instead.

## Related resources

* [How charges accrue](https://developers.cloudflare.com/billing/understand/how-charges-accrue/) — How a request generates charges across products
* [Monitor billable usage](https://developers.cloudflare.com/billing/manage/billable-usage/) — Track daily usage-based costs
* [Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/) — Get notified when spend crosses a threshold
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — Billing lifecycle and charge types

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/understand/","name":"Understand"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/understand/usage-based-billing/","name":"Usage-based billing"}}]}
```
