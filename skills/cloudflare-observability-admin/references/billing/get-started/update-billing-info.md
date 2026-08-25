---
description: Update payment methods, billing address, or tax IDs.
title: Update billing information
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

# Update billing information

Last updated May 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/billing/get-started/update-billing-info/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To avoid potential disruptions in your Cloudflare services, make sure your billing information is current and accurate.

If Cloudflare is unable to process your payment, refer to [Resolve a payment failure](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/).

## Update payment methods

Note

You may receive the error message "Your account is limited to 2 payment methods, and you've reached that limit. Please remove an existing payment method before adding a new one." when trying to add additional methods.

If you are unable to add or edit a payment method, [delete a payment method](https://developers.cloudflare.com/billing/get-started/update-billing-info/#delete-a-payment-method) and try again.

1. In the Cloudflare dashboard, go to the **Billing** page.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to the **Subscriptions** page and open the **Payment methods** panel.
3. Select **Add Payment Method** to add a new method, or **Edit** next to an existing one.
4. Enter card details or select a supported wallet. Complete 3D Secure authentication if your card issuer requires it.
5. Confirm the billing address shown on the form. The address is saved with the payment method.
6. Select **Save**.

### Supported payment methods

The Billing Profile supports:

* Cards (Visa, Mastercard, American Express, Discover, UnionPay)
* PayPal
* Apple Pay
* Google Pay
* Link
* [Instant Bank Payments via Link](https://developers.cloudflare.com/billing/payment-methods/instant-bank-payments-link/) (US-based self-serve accounts)

### 3D Secure authentication

Cards issued in regions where 3D Secure is required — for example, the EU under PSD2 or India under RBI — trigger an authentication step with the card issuer. Complete the challenge to save the card.

## Delete a payment method

Before removing your payment method from file, you must cancel all Cloudflare paid services.

Caution

If you currently subscribe to any [add-on services](https://developers.cloudflare.com/billing/understand/usage-based-billing/), Cloudflare must always have a payment method on file. If you need to remove a payment method, you must enter a new one to replace it.

You cannot delete a payment method if a payment fails or if there is an outstanding balance. Until Cloudflare processes payment, you can only add or edit your payment method.

1. In the Cloudflare dashboard, go to the **Billing** page.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to the **Subscriptions** page and open the **Payment methods** panel.
3. Select **Delete** next to the payment method you want to remove.
4. Select **Confirm** to finish.

## Update your billing address

Two address fields exist on your account:

| Field                              | Where it is used                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Billing profile address**        | Appears as **Bill to** on every invoice. Used for tax calculation and sanctions screening.                             |
| **Payment method billing address** | Captured when you add a payment method. Used by the card issuer to authorize each charge. Does not appear on invoices. |

Updating the billing profile address applies to invoices issued after the change. Past invoices keep the address that was on file when they were issued. Updating the billing profile address does not change the address stored on existing payment methods.

To update the billing profile address:

1. In the Cloudflare dashboard, go to the **Billing** page.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
2. From **Billing Address**, select **Edit** and enter your information.
3. Review the suggested address in the pop-up window. If the information is correct, select **Confirm**.

To update the address stored on a specific payment method, edit that payment method from the **Payment methods** panel on the **Subscriptions** page. The address you enter is saved both with the payment method and with the card issuer.

If you pay by PayPal, refer to PayPal's [billing address documentation ↗](https://www.paypal.com/ai/smarthelp/article/how-do-i-edit-the-billing-address-linked-to-my-credit-card-faq680).

## Update billing email address

Your billing email address is particularly important if you have [opted in to invoice emails](https://developers.cloudflare.com/billing/manage/invoices/#turn-on-invoice-emails-from-cloudflare).

1. In the Cloudflare dashboard, go to the **Billing** page.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to **Invoices and documents**.
3. From **Billing email preference**, select **Change email address**.
4. Enter and confirm your new email address, then select **Save**.

## Add or change a Tax ID, VAT, or GST number

If you added a payment method but did not include a Tax ID, VAT, or GST number, you can add or change the Tax ID, VAT, or GST number associated with the payment method afterwards.

Note

You cannot apply a VAT or GST number to past invoices. Adding a VAT or GST number will only apply to future invoices issued in the account.

1. In the Cloudflare dashboard, go to the **Billing** page.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
2. From **Billing Address**, select **Edit**.
3. In the **VAT/GST** field, enter your VAT or GST number.
4. Select **Confirm**.

## Remove a Tax ID, VAT, or GST number

Note

You cannot remove a VAT or GST number from past invoices. Removing a VAT or GST number will only apply to future invoices issued in the account.

1. In the Cloudflare dashboard, go to the **Billing** page.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
2. From **Billing Address**, select **Edit**.
3. In the **VAT/GST** field, delete the VAT or GST number.
4. Select **Confirm**.

## Related resources

* [Create billing profile](https://developers.cloudflare.com/billing/get-started/create-billing-profile/) — Set up your initial payment method
* [Invoices](https://developers.cloudflare.com/billing/manage/invoices/) — View and download invoices
* [Sales tax](https://developers.cloudflare.com/billing/understand/sales-tax/) — How tax is calculated based on your billing address

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/get-started/update-billing-info/#page","headline":"Update billing information · Cloudflare Billing docs","description":"Update payment methods, billing address, or tax IDs.","url":"https://developers.cloudflare.com/billing/get-started/update-billing-info/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
