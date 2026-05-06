---
title: Instant Bank Payments via Link
description: Understand Instant Bank Payments via Link for Cloudflare services.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Instant Bank Payments via Link

Instant Bank Payments (IBP) via [Link ↗](https://link.co/) lets you pay for Cloudflare services directly from your bank account. Link is a one-click checkout wallet that stores your payment details. If you already have a bank account saved in Link, it appears as a payment option at checkout. If not, you can connect one during the checkout flow.

## How Instant Bank Payments works

1. **Checkout**: Cloudflare presents your saved Link payment methods. You can also connect your bank with Link if not already set up.
2. **Select bank account**: Your bank account appears as a payment option alongside your existing cards.
3. **Confirm payment**: Select your bank account and confirm.
4. **Processing**: The payment is authenticated and processed on your behalf.

After your first Link authentication, your bank account is available for future purchases without re-entering details.

Note

Instant Bank Payments is an additional payment option. Your existing cards remain available at checkout.

## Eligibility

Instant Bank Payments via Link is available to US-based self-serve accounts across all Cloudflare products. You can connect your bank account through Link during checkout.

## Identify bank payments

Bank-based Link payments appear in your billing history with these identifiers:

| Field            | Value |
| ---------------- | ----- |
| Payment method   | link  |
| Last four digits | 0000  |

Card-based Link payments display your card's last four digits, distinguishing them from bank payments.

## View your payment history

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Go to **Manage Account** \> **Billing**.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
3. Select **Invoices** to view your invoice and payment history.

## Failed bank payments

If a bank payment cannot be processed:

1. **Retry or switch**: You are prompted to select a different payment method. You can retry with the same bank account or choose a card.
2. **Update payment method**: If the issue persists, update your payment method in billing settings.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)

Ensure your bank account has sufficient funds and supports instant payments.

## FAQ

### Payment identification

Your billing history shows the payment method as `link` with last four digits `0000`. Card-based Link payments show your card's actual last four digits.

### Bank account security

Your bank credentials are stored in the Link wallet using encryption and multi-factor authentication. Your raw bank details are never shared with Cloudflare or other merchants.

### Card payment availability

Instant Bank Payments is an additional option. Cards saved in Link or added manually remain available at checkout.

### Processing time

Bank payments through Link process in the same checkout flow as card payments. Your purchase is confirmed immediately.

### Bank account removal

You can manage your saved payment methods, including bank accounts, through the [Link wallet ↗](https://link.co/). Removing a bank account does not affect previously completed payments.

### Incorrect charges

[Contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) with your invoice number and payment details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/payment-methods/","name":"Payment methods"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/payment-methods/instant-bank-payments-link/","name":"Instant Bank Payments via Link"}}]}
```
