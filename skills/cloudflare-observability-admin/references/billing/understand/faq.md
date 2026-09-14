---
description: Answers to common billing questions.
title: Billing FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

# Billing FAQ

Last updated May 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/billing/understand/faq/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

<details>

<summary>

When does my billing cycle start?

</summary>

Your first paid purchase on a Cloudflare account sets the billing date for all future monthly subscriptions. Annual subscriptions follow their own cycle. All billing dates use UTC. For example, if you purchase the Pro plan on the 10th, all monthly charges bill on the 10th going forward.

For more detail, refer to <a href="https://developers.cloudflare.com/billing/understand/how-billing-works/#billing-cycles">How Cloudflare billing works</a>.

</details>

<details>

<summary>

What payment methods does Cloudflare accept?

</summary>

Cloudflare accepts Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay, Stripe Link, and UnionPay. You can add up to two payment methods to your account. Your primary payment method is charged automatically; if it fails, Cloudflare retries your additional payment method.

To manage your payment methods, refer to <a href="https://developers.cloudflare.com/billing/get-started/update-billing-info/">Update billing information</a>.

</details>

<details>

<summary>

Why is my invoice so long with many $0.00 line items?

</summary>

Cloudflare lists every billable dimension for every active product on your invoice, even when usage is zero. For example, R2 alone generates 7 separate line items (storage, Class A operations, Class B operations, plus Infrequent Access variants). If your usage stays within the free tier, all of these show $0.00.

This confirms the product is active and that no overage charges were incurred. For a detailed breakdown, refer to <a href="https://developers.cloudflare.com/billing/understand/how-billing-works/#reading-your-invoice">Reading your invoice</a>.

</details>

<details>

<summary>

What happens if my payment fails?

</summary>

When a payment fails, Cloudflare retries the charge — first against your primary payment method, then against your additional payment method if one is on file. You have a 5-day grace period to resolve the issue. During this period, your services continue but you cannot purchase new products or modify your billing profile.

If payment is not resolved within the grace period, your account is automatically downgraded to the Free plan. You retain your websites but lose access to paid features.

For more detail, refer to <a href="https://developers.cloudflare.com/billing/understand/how-billing-works/#what-happens-when-payment-fails">How Cloudflare billing works</a>.

</details>

<details>

<summary>

Can I get a refund?

</summary>

Fees are non-refundable. You are billed for the full billing period in which you cancel and no refunds are issued for unused time. After cancellation, you retain access to paid services through the end of the current billing period. For full terms, refer to the <a href="https://www.cloudflare.com/terms/">Cloudflare Terms of Use ↗</a>.

For details, refer to <a href="https://developers.cloudflare.com/billing/understand/billing-policy/">Billing policy</a>.

</details>

<details>

<summary>

How do I change my billing email?

</summary>

1. Log in to the <a href="https://dash.cloudflare.com/">Cloudflare dashboard ↗</a>.
2. Select your account.
3. Go to **Manage Account** &gt; **Billing**.
4. Select the **Payment** tab.
5. Under **Billing email preference**, select **Change email address** and enter the new address.

For more detail, refer to <a href="https://developers.cloudflare.com/billing/get-started/update-billing-info/">Update billing information</a>.

</details>

<details>

<summary>

How do I read my invoice?

</summary>

A Cloudflare invoice contains two groups of line items: usage-based charges from the previous billing period (metered, billed in arrears) and flat-rate charges for the upcoming period (plans, subscriptions, billed in advance). Each line item shows the product name, date range, quantity, unit price, and total amount.

For a complete walkthrough with examples, refer to <a href="https://developers.cloudflare.com/billing/understand/how-billing-works/#reading-your-invoice">How Cloudflare billing works</a>.

</details>

<details>

<summary>

How do I download my invoices?

</summary>

1. Log in to the <a href="https://dash.cloudflare.com/">Cloudflare dashboard ↗</a>.
2. Select your account.
3. Go to **Manage Account** &gt; **Billing**.
4. On the **Invoices and documents** tab, find the invoice and select the download icon next to the invoice number.

For more detail, refer to <a href="https://developers.cloudflare.com/billing/manage/invoices/">Invoices</a>.

</details>

<details>

<summary>

How do I cancel a subscription or plan?

</summary>

Cancellations take effect at the end of the current billing period. You retain access to paid features until then. To cancel:

1. Log in to the <a href="https://dash.cloudflare.com/">Cloudflare dashboard ↗</a>.
2. Select your account.
3. Go to **Manage Account** &gt; **Billing** &gt; **Subscriptions**.
4. Find the subscription and select **Cancel**.

For more detail, refer to <a href="https://developers.cloudflare.com/billing/manage/cancel-subscription/">Cancel subscriptions</a>.

</details>

<details>

<summary>

How can I monitor my usage-based charges?

</summary>

Cloudflare provides two tools:

1. **<a href="https://developers.cloudflare.com/billing/manage/billable-usage/">Billable usage dashboard</a>** — shows daily usage-based costs per product with a chart and sortable table. Select **Manage Account** &gt; **Billing** &gt; **Billable Usage** in the dashboard.
2. **<a href="https://developers.cloudflare.com/billing/manage/budget-alerts/">Budget alerts</a>** — sends an email when your total spend crosses a dollar threshold you define.

For optimization strategies, refer to <a href="https://developers.cloudflare.com/billing/manage/optimize-costs/">Optimize costs</a>.

</details>

<details>

<summary>

What is the difference between a plan and a subscription?

</summary>

A **plan** (Free, Pro, Business, Enterprise) is a per-domain billing tier that determines which features are available on that domain. A **subscription** (also called an add-on) is a product you enable at the account or domain level, such as Workers, R2, Load Balancing, or Cache Reserve. Plans and subscriptions appear as separate line items on your invoice.

</details>

<details>

<summary>

Who can access billing settings on my account?

</summary>

Billing access depends on your role. The Super Administrator can do everything. The Billing role can view invoices and manage payment methods but cannot change subscriptions. The Administrator role can change subscriptions but cannot manage payment methods.

For the full permissions matrix, refer to <a href="https://developers.cloudflare.com/billing/understand/billing-permissions/">Billing permissions</a>.

</details>

## Related resources

- [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — Billing lifecycle, charge types, and invoice structure
- [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Common billing error messages and solutions
- [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) — Refund policy and subscription terms

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/understand/faq/#page","headline":"Billing FAQ · Cloudflare Billing docs","description":"Answers to common billing questions.","url":"https://developers.cloudflare.com/billing/understand/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
