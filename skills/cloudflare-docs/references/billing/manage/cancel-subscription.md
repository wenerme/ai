---
title: Cancel Cloudflare subscriptions
description: Cancel Cloudflare plans, add-ons, or subscriptions before the next billing period.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cancel Cloudflare subscriptions

Cancellations take effect at the end of the current billing period. You retain access to paid features until then. To avoid charges for the next billing period, start the cancellation process before your current period ends.

Downgrades follow the same timing. Switching from a yearly plan to a monthly plan, or from a paid plan to Free, does not take immediate effect. You continue to have access to the higher-tier service for the remainder of the current billing period. Refunds are not issued for unused time within a billing period.

For some subscriptions, cancellation is done by switching to the Free plan rather than selecting a separate cancel option.

Note

All billing dates are in UTC. Make any downgrades or changes at least 24 hours before your billing date to avoid timing issues.

Warning

Changing the DNS on your domain does not cancel your account or active subscriptions. You must explicitly cancel subscriptions through the Cloudflare dashboard.

## Turn off the Cloudflare subscription

For some subscriptions, you must turn off the product feature before you cancel the billing subscription.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Subscriptions**.
3. Select the feature you want to turn off under **Active Subscriptions** (Free or Pro customers) or **Plan Extensions** (Enterprise customers).
4. Follow the product-specific instructions to turn off the feature. The flow may ask you to turn off a switch, select a button, or choose _Disable_ from a drop-down list.

## Cancel the subscription in your billing profile

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Subscriptions**.
3. Find the subscription you want to cancel and select **Cancel**.
4. Select a reason for cancellation.
5. Select **Confirm**.

Note

To change your plan instead of canceling, select **Change** under **Active Subscriptions** and choose a new plan type. To cancel a paid plan entirely, select **Free**.

Warning

Fees are non-refundable. You are billed for the full billing period in which you cancel and no refunds are issued for unused time. After cancellation, you retain access to paid services through the end of the current billing period. For full terms, refer to the [Cloudflare Terms of Use ↗](https://www.cloudflare.com/terms/).

## Related resources

* [Change domain plan](https://developers.cloudflare.com/billing/manage/change-plan/) — Upgrade or downgrade instead of canceling
* [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) — Refund policy and subscription terms
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — When downgrades and cancellations take effect

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/manage/","name":"Manage"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/manage/cancel-subscription/","name":"Cancel Cloudflare subscriptions"}}]}
```
