---
title: Backup payment method auto-retry
description: How Cloudflare retries failed payments using backup methods.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Backup payment method auto-retry

If your subscription renewal payment fails on your primary payment method, Cloudflare automatically retries the payment using your other payment methods on file. This keeps your services active without requiring you to take action.

## How backup payment auto-retry works

1. **Primary attempt**: Cloudflare attempts your subscription renewal payment using your primary (default) payment method.
2. **Automatic retry**: If the payment fails, Cloudflare attempts each of your other payment methods in sequence.
3. **Success notification**: If a backup payment succeeds, your services remain active and you receive an email confirming which payment method was charged.
4. **All methods fail**: If all payment methods fail, standard payment retry processes continue. You may receive an email asking you to update your payment information.

Note

Auto-retry applies to subscription renewal payments only. Auto-retry does not apply to one-time purchases or initial subscription payments.

## Eligibility

Backup payment auto-retry is available to pay-as-you-go accounts with at least two payment methods on file — one primary and one or more backups. The feature is enabled automatically. No action is needed to turn it on.

## Supported payment methods

Auto-retry works with all payment methods supported by Cloudflare, including credit cards, debit cards, and PayPal. Auto-retry supports any combination of primary and backup payment method types.

## Email notification

When a backup payment method is charged, you receive an email with:

* The invoice amount and number
* Which primary payment method failed
* Which backup payment method was charged
* A link to manage your payment methods

## Manage your payment methods

1. In the Cloudflare dashboard, go to the Billing page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Payment**.
3. In the **Payment Methods** section, review your primary and backup payment methods.

Add a second payment method to ensure auto-retry can keep your services active if your primary method fails.

## FAQ

### Multiple charges

You are never charged on more than one payment method for the same invoice. A backup payment method is only charged if your primary payment method fails.

### All payment methods fail

If your primary and all backup payment methods fail, the standard payment retry process continues. You may receive an email asking you to update your payment information.

### Multiple backup payment methods

All backup payment methods are tried in sequence if your primary payment method fails. The more payment methods you have on file, the more chances for your payment to succeed automatically.

### Next renewal behavior

Your next renewal always attempts your primary (default) payment method first. Backup payment methods are only used if the primary fails.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/payment-methods/","name":"Payment methods"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/payment-methods/backup-payment-method-auto-retry/","name":"Backup payment method auto-retry"}}]}
```
