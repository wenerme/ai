---
description: Resolve unpaid invoices and overdue balances.
title: Pay an outstanding balance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

#  Pay an outstanding balance

Last updated May 29, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

If automatic payment retries fail and you do not pay manually, your account accrues an overdue balance. While the balance is unpaid, you cannot purchase products, upgrade subscriptions, or update your billing profile. Attempts to do so return an error:

**"You cannot add or modify subscriptions or services until the outstanding balance is paid."**

To pay, select **Pay Now** from the **Billing** page in the Cloudflare dashboard. You can pay the entire balance in one transaction or [pay individual invoices](#manually-pay-invoices) separately.

## Understand why you have an outstanding balance

When an outstanding balance is due, a new invoice is created in your account for that amount. The new invoice shows the original invoice number that the outstanding balance relates to. You can look up this original invoice to identify which products were not fully paid for.

1. In the Cloudflare dashboard, go to the **Billing** page.
[ Go to **Billing** ↗ ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Invoices and documents**.
3. Select the most recent invoice. The amount shown should match your outstanding balance.
4. In the invoice PDF, find **Invoice that pays the following outstanding balance:** and note the invoice number.
5. Return to **Invoices and documents** and select the original invoice number.

## Pay an outstanding balance

Note

Allow up to 24 hours for your payment to be recognized and for your account to be in good standing. After that time has passed, you will be able to manage your subscriptions and order more services.

To pay the total outstanding balance:

1. In the Cloudflare dashboard, go to the **Billing** page.
[ Go to **Billing** ↗ ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to the **Pay overdue balances** section.
3. Select **Pay now** next to the balance you want to pay.

You will be redirected to our payment system to proceed.

## Manually pay invoices

If an automatic subscription renewal payment fails, Cloudflare automatically retries the payment using your default payment method five times over five days. During this period, you can log in to the dashboard and attempt to manually pay the invoices.

1. In the Cloudflare dashboard, go to the **Billing** page.
[ Go to **Billing** ↗ ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Invoices and documents**.
3. Select **Pay now** next to the invoice you want to pay.

You will be redirected to our payment system to proceed.

## Related resources

* [Resolve a payment failure](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/) — Fix errors when paying
* [Invoices](https://developers.cloudflare.com/billing/manage/invoices/) — View and download invoices
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Look up billing error messages

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/#page","headline":"Pay an outstanding balance · Cloudflare Billing docs","description":"Resolve unpaid invoices and overdue balances.","url":"https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
