---
title: Billing error reference
description: Common billing error messages and solutions.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/billing/troubleshoot/error-reference.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Billing error reference

Use the table below to find common billing error messages, understand what they mean, and navigate to the right solution.

## Error messages

| Error message                                                                               | Cause                                                                                 | Solution                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "You cannot add or modify subscriptions or services until the outstanding balance is paid." | Your account has an unpaid balance.                                                   | [Pay the outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/).                                                                                                               |
| "The payment has failed. Please contact your bank or use a different payment method."       | Your payment method was declined by your bank.                                        | Check your card details and bank balance, then retry. Refer to [Resolve a payment failure](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/).                                             |
| "Payment error: authorization failed"                                                       | Your bank declined the transaction, or 3DS authentication was not completed.          | Contact your bank and retry the payment. Refer to [Resolve a payment failure](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/).                                                          |
| "This zone cannot be upgraded"                                                              | The account or a previous owner of the domain has an outstanding balance.             | Pay the balance on all accounts you have access to, wait 24 hours, then retry. Refer to [Resolve the zone cannot be upgraded error](https://developers.cloudflare.com/billing/troubleshoot/resolve-zone-cannot-be-upgraded/). |
| "There is a problem with your billing profile"                                              | Same as "this zone cannot be upgraded" — an unpaid balance exists.                    | [Pay the outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/) and wait 24 hours.                                                                                             |
| "You cannot modify this subscription since it is currently scheduled to be cancelled"       | You are trying to change a subscription that already has a pending cancellation.      | Cancel the pending downgrade first, then make your change. Refer to [Resolve "you cannot modify this subscription"](https://developers.cloudflare.com/billing/troubleshoot/resolve-you-cannot-modify-this-subscription/).     |
| "You can't remove this payment method while it's linked to active subscriptions."           | You are trying to delete a payment method that is still tied to paid services.        | Cancel all paid subscriptions first, or add a replacement payment method. Refer to [Resolve "cannot remove payment method"](https://developers.cloudflare.com/billing/troubleshoot/resolve-cannot-remove-payment-method/).    |
| "You can't remove a payment method while there are transactions in progress."               | A usage-based charge is pending, or a Registrar renewal is scheduled within 24 hours. | Wait for pending transactions to complete, then retry. Refer to [Resolve "cannot remove payment method"](https://developers.cloudflare.com/billing/troubleshoot/resolve-cannot-remove-payment-method/).                       |

## Email notifications

| Email subject                              | What it means                                                                            | What to do                                                                                                                                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "We couldn't process your renewal payment" | A recurring subscription charge failed. Cloudflare will retry up to 5 times over 5 days. | Update your payment method or manually pay the invoice before the grace period ends. Refer to [Resolve a payment failure](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/). |

## Still stuck?

If your error message is not listed above or the suggested solution does not resolve the issue, [contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Related resources

* [Resolve a payment failure](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/) — Fix payment errors
* [Pay an outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/) — Resolve unpaid invoices
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — Billing lifecycle and charge types

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/troubleshoot/","name":"Troubleshoot"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/troubleshoot/error-reference/","name":"Billing error reference"}}]}
```
