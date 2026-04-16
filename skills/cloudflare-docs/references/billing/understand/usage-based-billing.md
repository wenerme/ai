---
title: Usage-based billing
description: For some Cloudflare subscriptions and services, Cloudflare charges you based on how much you used a feature during your previous billing period. This differs from other services, which are a prepaid flat fee for the upcoming month (for example, plans and page rules).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/billing/understand/usage-based-billing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Usage-based billing

For some Cloudflare subscriptions and services, Cloudflare charges you based on how much you used a feature during your previous billing period. This differs from other services, which are a prepaid flat fee for the upcoming month (for example, plans and page rules).

For example, if your billing date is on the 15th of the month and you turn on Cloudflare Workers in the dashboard on the 1st, your next invoice includes the Workers charges from the 1st through the 15th. The following invoice includes charges for Workers usage during the full billing period.

Note

The pricing structure varies based on the service being used.

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/understand/","name":"Understand"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/understand/usage-based-billing/","name":"Usage-based billing"}}]}
```
