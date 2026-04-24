---
title: Pay an outstanding balance
description: If automatic payment retries fail and you do not pay manually, your account accrues an overdue balance. While the balance is unpaid, you cannot purchase products, upgrade subscriptions, or update your billing profile. Attempts to do so return an error:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/billing/manage/pay-invoices-overdue-balances.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Pay an outstanding balance

If automatic payment retries fail and you do not pay manually, your account accrues an overdue balance. While the balance is unpaid, you cannot purchase products, upgrade subscriptions, or update your billing profile. Attempts to do so return an error:

**"You cannot add or modify subscriptions or services until the outstanding balance is paid."**

To pay, select **Pay Now** from the **Billing** page in the Cloudflare dashboard. You can pay the entire balance in one transaction or [pay individual invoices](#manually-pay-invoices) separately.

## Understand why you have an outstanding balance

When an outstanding balance is due, a new invoice will be created in your account for that amount. When you view that new invoice, it will show the original invoice number that the outstanding balance relates to. You can look up this original invoice to understand which product(s) were not fully paid for.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Invoices and documents**.
3. Select the most recent invoice - the amount shown should match your outstanding balance
4. On the invoice PDF, look for the section below the **Pay Online** link: **Invoice that pays the following outstanding balance:** and note the invoice number
5. Go back to the **Invoices and documents** section and click to view the invoice number

## Pay an outstanding balance

Note

Allow up to 24 hours for your payment to be recognized and for your account to be in good standing. After that time has passed, you will be able to manage your subscriptions and order more services.

To pay the total outstanding balance:

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to the **Pay overdue balances** section.
3. Select **Pay now** next to the balance you want to pay.

You will be redirected to our payment system to proceed.

## Manually pay invoices

If an automatic subscription renewal payment fails, Cloudflare automatically retries the payment using your default payment method five times over five days. During this period, you can log into the dashboard and attempt to manually pay the invoices.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Invoices and documents**.
3. Select **Pay now** next to the invoice you want to pay.

You will be redirected to our payment system to proceed.

## Related resources

* [Resolve a payment failure](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/) — Fix errors when paying
* [Invoices](https://developers.cloudflare.com/billing/manage/invoices/) — View and download invoices
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Look up billing error messages

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/manage/","name":"Manage"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/manage/pay-invoices-overdue-balances/","name":"Pay an outstanding balance"}}]}
```
