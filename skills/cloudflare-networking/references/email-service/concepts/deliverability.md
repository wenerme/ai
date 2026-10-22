---
description: Understand bounce handling and reputation management for optimal email delivery with Email Service.
title: Email deliverability
image: https://developers.cloudflare.com/email-service/concepts/deliverability/og.png?v=6445422fd87b5279
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Email deliverability

Understand bounce handling and reputation management for optimal email delivery.

Last updated Oct 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/email-service/concepts/deliverability/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When you send an email, there is no guarantee it reaches the recipient's inbox. Inbox providers like Gmail, Yahoo, Outlook, and iCloud invest heavily in filtering out unwanted email. If you send poorly targeted emails, have high bounce rates, or trigger spam complaints, these providers may flag your domain as untrustworthy. Once that happens, even your legitimate emails can end up in spam or be blocked outright.

This concept is referred to as email deliverability: maintaining a healthy sending reputation so that inbox providers trust your emails. Cloudflare Email Service helps with this by automatically handling bounces, managing suppression lists, and authenticating your emails through SPF, DKIM, and DMARC.

## Bounces

Bounces occur when emails cannot be delivered to recipients. There are two types of bounces: **hard bounces** and **soft bounces**.

### Hard bounces

Hard bounces are permanent delivery failures that occur when:

- The recipient address does not exist.
- The recipient domain does not exist.
- The receiving server permanently rejects the recipient.

**Hard bounces are never retried** because the failure is permanent. Emails that hard bounce will generate a bounce notification to the sender address and can be monitored through [analytics](https://developers.cloudflare.com/email-service/observability/metrics-analytics/).

Email Service adds eligible recipient-side hard bounces to your [suppression list](https://developers.cloudflare.com/email-service/concepts/suppressions/). Suppressions have no expiration when the mailbox or domain does not exist.

They also have no expiration when the recipient remains unavailable across repeated delivery attempts. Other eligible hard-bounce suppressions last seven days.

### Soft bounces

Soft bounces are temporary failures that may succeed if retried:

- Recipient mailbox is full
- Email server temporarily down
- Rate limiting or greylisting

Cloudflare automatically retries soft bounces with exponential backoff. Eligible recipient-side failures create a 24-hour suppression.

## Reputation management

Cloudflare automatically manages:

- **IP reputation**: Managed sending infrastructure optimized for deliverability
- **Domain authentication**: DKIM signing, SPF alignment, DMARC compliance
- **Feedback processing**: ISP complaint handling and suppression list management

### Best practices

#### Content and list hygiene

Avoid content that can trigger spam-detection or can be perceived as unwanted content:

- Avoid spam trigger words (FREE, URGENT, GUARANTEED)
- Include both HTML and plain text versions
- Use legitimate URLs and clear sender identification

Ensure that your email lists are clean and contain intended recipients:

- Validate emails before sending
- Implement double opt-in for subscriptions
- Remove hard bounced addresses immediately

Ensure that your deliverability stays above key metrics to avoid affecting your email sending reputation:

- Delivery rate >95%
- Hard bounce rate < 2%
- Complaint rate < 0.1%

Cloudflare also checks these metrics for your account. Refer to [Sending reputation status](#sending-reputation-status) for the thresholds and what happens when your account exceeds them.

#### Use separate domains for separate purposes

Each domain builds its own deliverability reputation with inbox providers. Use separate domains or subdomains for different types of email so that one category does not affect the reputation of another. For example:

- `notifications.yourdomain.com` for transactional emails (order confirmations, password resets)
- `marketing.yourdomain.com` for marketing and promotional emails
- `yourdomain.com` for important account-related communications

This way, if marketing emails generate higher complaint rates, your transactional email deliverability is not impacted. Each domain can be onboarded separately through [domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/).

## Sending reputation status

Cloudflare checks the sending reputation of each account daily. If your account sends too many messages that bounce, that receiving servers reject as spam, or that recipients report as spam, Cloudflare sends you a warning by email. If the problem continues, Cloudflare can pause Email Sending for your account.

### Metrics and thresholds

Cloudflare measures three metrics for each sending domain, over the last seven days:

| Metric | How Cloudflare calculates it | Warning | At Risk |
| --- | --- | --- | --- |
| Bounce rate | Messages that bounced because of the recipient (for example, the address or the domain does not exist), divided by all messages sent | 2% or more | 5% or more |
| Spam rejection rate | Messages that the receiving server rejected as spam, divided by all messages sent | 1% or more | 3% or more |
| Complaint rate | Messages that recipients reported as spam, divided by messages delivered | 0.1% or more | 0.2% or more |

Your account status is the worst status of all your sending domains. One sending domain with poor metrics can change the status of the whole account.

### Status levels

| Status | Meaning | Can you send email? |
| --- | --- | --- |
| Healthy | All metrics are below the Warning thresholds. | Yes |
| Warning | At least one metric is at or above its Warning threshold. | Yes |
| At Risk | At least one metric is at or above its At Risk threshold. A seven-day improvement period starts. | Yes |
| Paused | The account stayed At Risk for the full improvement period. After a review, Cloudflare paused Email Sending for the account. | No |

Each time the status changes, Cloudflare sends an email to the users of the account. The [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/) also shows the current status on the account overview page.

### If your account is paused

While Email Sending is paused:

- Cloudflare rejects every new message from the account. The [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) throws the error code `E_ACCOUNT_SUSPENDED`. The [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) returns HTTP `403` with error code `10207`.
- Cloudflare does not deliver messages that it accepted before the pause and that are still waiting for delivery.
- Cloudflare does not keep or queue the rejected messages. Your application must send them again after Cloudflare restores Email Sending.
- Your sending domains, DNS records, suppression list, and settings do not change.

To restore Email Sending:

1. Review the metrics for each sending domain in the dashboard. Find the metric that is At Risk.
2. Find the cause. Common causes are an old or purchased recipient list, a sign-up form that does not validate addresses, and messages that recipients did not expect.
3. Fix the cause. Remove invalid and inactive addresses from your list. Send only to recipients who asked for your email, and make it easy to unsubscribe.
4. [Contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) and ask Cloudflare to restore Email Sending. Tell Support what caused the problem and what you changed.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/concepts/deliverability/#page","headline":"Email deliverability","description":"Understand bounce handling and reputation management for optimal email delivery with Email Service.","url":"https://developers.cloudflare.com/email-service/concepts/deliverability/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/concepts/deliverability/og.png?v=6445422fd87b5279","dateModified":"2026-10-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
