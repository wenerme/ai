---
title: Resolve &quot;cannot remove payment method&quot;
description: Fix errors when removing a payment method.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Resolve "cannot remove payment method"

When attempting to remove a payment method, you may see one of the following error messages:

* "You can't remove this payment method while it's linked to active subscriptions. Go to Billing to manage subscriptions."
* "You can't remove a payment method while there are transactions in progress. Make sure all transactions are completed and all subscriptions are cancelled."

## Causes

* You still have active paid subscriptions.
* You have canceled your paid subscriptions, but a usage-based charge is still scheduled.
* You have an upcoming Registrar domain registration renewal within the next 24 hours.

## Solutions

### Check for active paid subscriptions

You can only remove a payment method after all paid subscriptions are canceled and outstanding charges are settled.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account** \> **Billing**.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
3. Select **Subscriptions**.
4. Check **Service status** for any subscriptions marked **Active**.
5. Select **Cancel** for each active paid subscription.

Repeat this for all active paid subscriptions before attempting to remove the payment method.

### Check for usage-based products

If you have canceled all paid subscriptions, any usage-based products canceled within the last 30 days may still generate charges. Your payment method must remain on file until those charges are processed. If you recently canceled any of the following products, wait 30 days before removing your payment method:

| Product                                                                                        | Billable metric                       | Free tier or included usage                                      | Pricing details                                                                                   |
| ---------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Workers](https://developers.cloudflare.com/workers/platform/pricing/)                         | Requests and CPU time                 | 10M requests and 30M CPU-ms                                      | [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)                    |
| [R2](https://developers.cloudflare.com/r2/pricing/)                                            | Storage and operations                | 10 GB storage, 1M Class A operations, and 10M Class B operations | [R2 pricing](https://developers.cloudflare.com/r2/pricing/)                                       |
| [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/)                    | Data transfer                         | First 1 GB                                                       | [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/)                       |
| [Cache Reserve](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/) | Reads, writes, and storage            | None                                                             | [Cache Reserve](https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/)    |
| [Load Balancing](https://developers.cloudflare.com/load-balancing/)                            | DNS queries                           | First 500K queries                                               | [Load Balancing](https://developers.cloudflare.com/load-balancing/)                               |
| [Stream](https://developers.cloudflare.com/stream/pricing/)                                    | Minutes stored and minutes viewed     | Varies by plan                                                   | [Stream pricing](https://developers.cloudflare.com/stream/pricing/)                               |
| [Images](https://developers.cloudflare.com/images/pricing/)                                    | Transformations and storage           | Varies by plan                                                   | [Images pricing](https://developers.cloudflare.com/images/pricing/)                               |
| [Spectrum](https://developers.cloudflare.com/spectrum/)                                        | Data transfer                         | None                                                             | [Spectrum](https://developers.cloudflare.com/spectrum/)                                           |
| [Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)                    | Rule requests                         | Varies by plan                                                   | [Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)                       |
| [Log Explorer](https://developers.cloudflare.com/log-explorer/pricing/)                        | Log storage and queries               | Varies by plan                                                   | [Log Explorer pricing](https://developers.cloudflare.com/log-explorer/pricing/)                   |
| [Zero Trust](https://developers.cloudflare.com/cloudflare-one/)                                | Seats and usage-based services        | Varies by plan                                                   | [Zero Trust](https://developers.cloudflare.com/cloudflare-one/)                                   |
| [Vectorize](https://developers.cloudflare.com/vectorize/platform/pricing/)                     | Stored dimensions and queried vectors | Varies by plan                                                   | [Vectorize pricing](https://developers.cloudflare.com/vectorize/platform/pricing/)                |
| [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/pricing/)      | Data points read and written          | Varies by plan                                                   | [Analytics Engine pricing](https://developers.cloudflare.com/analytics/analytics-engine/pricing/) |

After the next monthly invoice is generated, you can remove the payment method.

### Check for an upcoming Registrar renewal

For Registrar domains scheduled for auto-renewal, we will attempt to renew approximately 30 days before your renewal date. In the 24 hours prior to that, we will automatically process a payment hold using your payment method. During this time you will be unable to remove your payment method.

To check if any of your domains are in the renewal process:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Domain Registration** \> **Manage Domains**.
3. Under **Expires**, look for domains expiring within the next 31 days that have auto-renewal turned on.

If you have any domains with auto-renewal turned on that are expiring in 31 days or less, wait for them to renew before you remove your payment method. To understand more about this process, refer to [Renew domains](https://developers.cloudflare.com/registrar/account-options/renew-domains/).

## Verify the fix

After you clear active subscriptions, pending usage-based charges, and upcoming Registrar renewals, return to **Payment** \> **Payment methods** and try to remove the payment method again.

## If none of the above apply

If none of the above apply and you still receive an error, [contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Related resources

* [Update billing information](https://developers.cloudflare.com/billing/get-started/update-billing-info/) — Add a replacement payment method
* [Cancel subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/) — Cancel subscriptions before removing a payment method
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Look up other billing error messages

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/troubleshoot/","name":"Troubleshoot"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/troubleshoot/resolve-cannot-remove-payment-method/","name":"Resolve \"cannot remove payment method\""}}]}
```
