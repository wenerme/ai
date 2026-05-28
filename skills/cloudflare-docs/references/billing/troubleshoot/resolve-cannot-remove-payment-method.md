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

* You still have active paid subscriptions
* You have cancelled your paid subscriptions, but a usage-based charge is still scheduled
* You have an upcoming Registrar domain registration renewal within the next 24 hours

## Solutions

### Check for active paid subscriptions

You can only remove a payment method after all paid subscriptions are cancelled and outstanding charges are settled.

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account > Billing**.
3. Go to **Subscriptions**.
4. Check **Service status** for any which are marked “Active”
5. Click the “Cancel” button

Repeat this for all active paid subscriptions before attempting to remove the payment method.

### Check for usage-based products

If you have cancelled all paid subscriptions, any usage-based products cancelled within the last 30 days may still generate charges. Your payment method must remain on file until those charges are processed. If you recently cancelled any of the following products, wait 30 days before removing your payment method:

* Images
* Stream
* Workers
* Argo
* Spectrum
* R2
* Cache Reserve
* Load Balancing
* Rate Limiting
* Log Explorer
* Zero Trust
* Vectorize
* Analytics

After the next monthly invoice is generated, you can remove the payment method.

### Check for an upcoming Registrar renewal

For Registrar domains scheduled for auto-renewal, we will attempt to renew approximately 30 days before your renewal date. In the 24 hours prior to that, we will automatically process a payment hold using your payment method. During this time you will be unable to remove your payment method.

To check if any of your domains are in the process of renewal:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Domain Registration > Manage Domains**.
3. Under the **Expires** column, look for any domains expiring within the next 31 days which have Auto-renew enabled.

If you have any domains with auto-renew enabled that are expiring in 31 days or less, you will need to wait for them to renew before you can remove your payment method. To understand more about this process, refer to [renew domains](https://developers.cloudflare.com/registrar/account-options/renew-domains/).

### If none of the above apply

If none of the above apply and you still receive an error, [contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Related resources

* [Update billing information](https://developers.cloudflare.com/billing/get-started/update-billing-info/) — Add a replacement payment method
* [Cancel subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/) — Cancel subscriptions before removing a payment method
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Look up other billing error messages

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/troubleshoot/","name":"Troubleshoot"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/troubleshoot/resolve-cannot-remove-payment-method/","name":"Resolve \"cannot remove payment method\""}}]}
```
