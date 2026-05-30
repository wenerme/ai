---
title: Create billing profile
description: Add a payment method to your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create billing profile

## Add a primary payment method

A primary payment method is required to purchase Cloudflare products and services. Cloudflare does not store or have access to your full card number, PIN, or PayPal password.

Note

Because some countries tax goods and services on personal accounts, you may be asked to indicate whether your Cloudflare account is personal or business to determine tax eligibility.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to the **Subscriptions** page and open the **Payment methods** panel.
3. Select **Add Payment Method**. If no payment method is on file, the dialog opens automatically.
4. Choose a payment option and enter the required details:  
**Card** (Visa, Mastercard, American Express, Discover, UnionPay):  
   1. Enter your card details.  
   2. Complete 3D Secure authentication if your card issuer requires it.  
   3. If applicable, add your business information for your invoice, including your **Company** and **VAT/GST Number**.  
**PayPal** (your linked card or bank is charged if you have insufficient funds in your PayPal account):  
   1. Select **PayPal**.  
   2. Follow the online instructions until PayPal returns you to the Cloudflare **Payment Method** form to continue setup.  
   3. Verify your **PayPal username** now appears next to the PayPal logo.  
   4. Add your account contact information as well as **Company** and **VAT/GST Number**, if applicable.  
**Wallets**: Apple Pay, Google Pay, Link, and [Instant Bank Payments via Link](https://developers.cloudflare.com/billing/payment-methods/instant-bank-payments-link/) (US-based self-serve accounts) are also available.
5. Review the payment method and contact information.
6. To finish, select **Confirm**.
7. Ensure your new payment method appears in the **Payment methods** panel.

## Add an additional payment method

Optionally, add an additional payment method. Cloudflare automatically retries the charge on the additional method if the primary method fails. Refer to [Additional payment method auto-retry](https://developers.cloudflare.com/billing/payment-methods/additional-payment-method-auto-retry/) for details.

Note

You may receive the error message "Your account is limited to 2 payment methods, and you've reached that limit. Please remove an existing payment method before adding a new one." when trying to add additional methods.

If you are unable to add or edit a payment method, [delete a payment method](https://developers.cloudflare.com/billing/get-started/update-billing-info/#delete-a-payment-method) and try again.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to the **Subscriptions** page and open the **Payment methods** panel.
3. Select **Add Payment Method**.
4. Enter card details or select a supported wallet. Complete 3D Secure authentication if your card issuer requires it.
5. Confirm the billing address and select **Save**.
6. To make the additional payment method the primary method, select **Make primary payment method**.

## Related resources

* [Update billing information](https://developers.cloudflare.com/billing/get-started/update-billing-info/) — Change payment methods, billing address, or email
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — Billing lifecycle and charge types
* [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) — Refund policy and subscription terms

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/get-started/create-billing-profile/","name":"Create billing profile"}}]}
```
