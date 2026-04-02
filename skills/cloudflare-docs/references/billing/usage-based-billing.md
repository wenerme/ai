---
title: Usage based billing
description: For some Cloudflare subscriptions and services, you will be charged based on how much a feature was used during your previous billing period. This differs from other services, which are a prepaid flat fee for the upcoming month (e.g. plans, page rules, etc.).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/billing/usage-based-billing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Usage based billing

For some Cloudflare subscriptions and services, you will be charged based on how much a feature was used during your previous billing period. This differs from other services, which are a prepaid flat fee for the upcoming month (e.g. plans, page rules, etc.).

For example, if your billing date is March 15 and you enabled Cloudflare Workers in the dashboard on March 1, your March 15 invoice will include the Workers charges from March 1-15\. The next invoice on April 15 will include charges for Workers usage between March 16 and April 15.

Note

The pricing structure varies based on the service being used.

## Usage-Based billing notifications

For customers on Professional plans or higher, you can monitor the usage of Cloudflare add-ons by enabling email notifications. When enabled, you will receive a notification to the billing email address on file when the traffic, queries, requests, or minutes-watched exceed your desired threshold.

Note

The email notifications are for informational purposes only. Actual usage and billing may vary. Your monthly invoice is the most reliable source for billing information.

You can choose both the product that you want to be notified about, and the threshold that triggers the notification. Thresholds depend on the product chosen.

For example, Argo Smart Routing has **Notify when total bytes of traffic exceeds** as a threshold, and Load Balancing has **Notify when total number of DNS Queries exceeds** as a threshold.

To set up an alert, refer to [Configure Cloudflare notifications](https://developers.cloudflare.com/notifications/get-started/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/usage-based-billing/","name":"Usage based billing"}}]}
```
