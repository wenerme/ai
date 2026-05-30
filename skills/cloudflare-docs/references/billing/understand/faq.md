---
title: Billing FAQ
description: Answers to common billing questions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Billing FAQ

When does my billing cycle start?

Your first paid purchase on a Cloudflare account sets the billing date for all future monthly subscriptions. Annual subscriptions follow their own cycle. All billing dates use UTC. For example, if you purchase the Pro plan on the 10th, all monthly charges bill on the 10th going forward.

For more detail, refer to [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/#billing-cycles).

What payment methods does Cloudflare accept?

Cloudflare accepts Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay, Stripe Link, and UnionPay. You can add up to two payment methods to your account. Your primary payment method is charged automatically; if it fails, Cloudflare retries your additional payment method.

To manage your payment methods, refer to [Update billing information](https://developers.cloudflare.com/billing/get-started/update-billing-info/).

Why is my invoice so long with many $0.00 line items?

Cloudflare lists every billable dimension for every active product on your invoice, even when usage is zero. For example, R2 alone generates 7 separate line items (storage, Class A operations, Class B operations, plus Infrequent Access variants). If your usage stays within the free tier, all of these show $0.00.

This confirms the product is active and that no overage charges were incurred. For a detailed breakdown, refer to [Reading your invoice](https://developers.cloudflare.com/billing/understand/how-billing-works/#reading-your-invoice).

What happens if my payment fails?

When a payment fails, Cloudflare retries the charge — first against your primary payment method, then against your additional payment method if one is on file. You have a 5-day grace period to resolve the issue. During this period, your services continue but you cannot purchase new products or modify your billing profile.

If payment is not resolved within the grace period, your account is automatically downgraded to the Free plan. You retain your websites but lose access to paid features.

For more detail, refer to [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/#what-happens-when-payment-fails).

Can I get a refund?

Fees are non-refundable. You are billed for the full billing period in which you cancel and no refunds are issued for unused time. After cancellation, you retain access to paid services through the end of the current billing period. For full terms, refer to the [Cloudflare Terms of Use ↗](https://www.cloudflare.com/terms/).

For details, refer to [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/).

How do I change my billing email?

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Manage Account** \> **Billing**.
4. Select the **Payment** tab.
5. Under **Billing email preference**, select **Change email address** and enter the new address.

For more detail, refer to [Update billing information](https://developers.cloudflare.com/billing/get-started/update-billing-info/).

How do I read my invoice?

A Cloudflare invoice contains two groups of line items: usage-based charges from the previous billing period (metered, billed in arrears) and flat-rate charges for the upcoming period (plans, subscriptions, billed in advance). Each line item shows the product name, date range, quantity, unit price, and total amount.

For a complete walkthrough with examples, refer to [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/#reading-your-invoice).

How do I download my invoices?

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Manage Account** \> **Billing**.
4. On the **Invoices and documents** tab, find the invoice and select the download icon next to the invoice number.

For more detail, refer to [Invoices](https://developers.cloudflare.com/billing/manage/invoices/).

How do I cancel a subscription or plan?

Cancellations take effect at the end of the current billing period. You retain access to paid features until then. To cancel:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Manage Account** \> **Billing** \> **Subscriptions**.
4. Find the subscription and select **Cancel**.

For more detail, refer to [Cancel subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/).

How can I monitor my usage-based charges?

Cloudflare provides two tools:

1. **[Billable usage dashboard](https://developers.cloudflare.com/billing/manage/billable-usage/)** — shows daily usage-based costs per product with a chart and sortable table. Select **Manage Account** \> **Billing** \> **Billable Usage** in the dashboard.
2. **[Budget alerts](https://developers.cloudflare.com/billing/manage/budget-alerts/)** — sends an email when your total spend crosses a dollar threshold you define.

For optimization strategies, refer to [Optimize costs](https://developers.cloudflare.com/billing/manage/optimize-costs/).

What is the difference between a plan and a subscription?

A **plan** (Free, Pro, Business, Enterprise) is a per-domain billing tier that determines which features are available on that domain. A **subscription** (also called an add-on) is a product you enable at the account or domain level, such as Workers, R2, Load Balancing, or Cache Reserve. Plans and subscriptions appear as separate line items on your invoice.

Who can access billing settings on my account?

Billing access depends on your role. The Super Administrator can do everything. The Billing role can view invoices and manage payment methods but cannot change subscriptions. The Administrator role can change subscriptions but cannot manage payment methods.

For the full permissions matrix, refer to [Billing permissions](https://developers.cloudflare.com/billing/understand/billing-permissions/).

## Related resources

* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — Billing lifecycle, charge types, and invoice structure
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Common billing error messages and solutions
* [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) — Refund policy and subscription terms

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/understand/","name":"Understand"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/understand/faq/","name":"Billing FAQ"}}]}
```
