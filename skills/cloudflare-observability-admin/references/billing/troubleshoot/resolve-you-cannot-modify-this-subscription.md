---
description: Fix errors when modifying a canceled subscription.
title: Resolve &quot;you cannot modify this subscription&quot;
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt
> Use this file to discover all available pages before exploring further.

# Resolve "you cannot modify this subscription"

Last updated May 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/billing/troubleshoot/resolve-you-cannot-modify-this-subscription/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When attempting to cancel or modify a subscription, you may see the following error message:

* "This subscription is scheduled to be cancelled at the end of the billing period. To make changes or purchase more, please click 'Cancel Downgrade' on the Subscriptions page."

## Causes

* You are attempting to cancel a subscription that is already scheduled for cancellation.
* You are attempting to upgrade a subscription that is already scheduled for cancellation.

## Solutions

If you intended to cancel a subscription, no further action is required. Your subscription ends at the close of the current billing period. Use the steps below to find the exact date.

### Find the cancellation date

After requesting cancellation, the **Subscriptions** page shows the end date under **Ending on**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account** \> **Billing**.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
3. Select **Subscriptions**.
4. Locate the product you canceled.
5. Under **Service status**, confirm that the status shows **Ending on** and the cancellation date.

### Refunds for canceled subscriptions

Cloudflare does not issue refunds for canceled subscriptions. Instead, your subscription remains active until the end of the current billing period.

If you do not want to pay for the next billing period, cancel your subscription before the current billing period ends. You can find this date on the **Subscriptions** page by checking the renewal date, for example **Renews on Aug 29, 2025**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account** \> **Billing**.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
3. Select **Subscriptions**.
4. Locate the product you want to cancel.
5. Under **Service status**, confirm the next renewal date.

### Stop the cancellation

If you changed your decision and the cancellation has not taken effect yet, you can select **Cancel Downgrade** next to the appropriate subscription.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account** \> **Billing**.
[Go to **Billing** ↗](https://dash.cloudflare.com/?to=/:account/billing)
3. Select **Subscriptions**.
4. Locate the product you canceled.
5. Under **Action**, select **Cancel Downgrade**.

## Verify the fix

After you cancel the downgrade, return to the subscription and retry the change you originally attempted.

## Related resources

* [Cancel subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/) — How cancellations work
* [Billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/) — Refund policy and billing terms
* [Error reference](https://developers.cloudflare.com/billing/troubleshoot/error-reference/) — Look up other billing error messages

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/billing/troubleshoot/resolve-you-cannot-modify-this-subscription/#page","headline":"Resolve \"you cannot modify this subscription\" · Cloudflare Billing docs","description":"Fix errors when modifying a canceled subscription.","url":"https://developers.cloudflare.com/billing/troubleshoot/resolve-you-cannot-modify-this-subscription/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
