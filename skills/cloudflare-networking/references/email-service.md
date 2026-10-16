---
description: Send transactional email and route incoming email with Cloudflare Email Service. Arbitrary-recipient sending requires Workers Paid, while routing supports Workers Free and Paid.
title: Cloudflare Email Service
image: https://developers.cloudflare.com/email-service/og.png?v=9f1e4a6a5ef85e5b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Email Service

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/email-service/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Send transactional email and route incoming email with Cloudflare Email Service. Arbitrary-recipient sending requires Workers Paid, while routing supports Workers Free and Paid.

Cloudflare Email Service sends transactional email and handles incoming email.

- **Email Sending** Beta sends outbound transactional emails. Available on Workers Paid plan
- **Email Routing** processes incoming emails with Workers or forwards them to destination addresses. Available on Free and Paid plans

Note

Sending to [verified destination addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#destination-addresses) in your account is free on Workers Free and Paid plans, even when only Email Routing is configured.

Use Email Sending for account emails, order confirmations, and alerts. Use Email Routing to process or forward incoming messages.

Send email through the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/), [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/), or [authenticated SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/).

[Get started](https://developers.cloudflare.com/email-service/get-started/)

---

## Features

[Email Sending](https://developers.cloudflare.com/email-service/get-started/send-emails/)

Send transactional emails from Workers or other applications.

Use Email Sending

[Email Routing](https://developers.cloudflare.com/email-service/get-started/route-emails/)

Route incoming emails to custom addresses, Workers, or external destinations.

Use Email Routing

[Deliverability](https://developers.cloudflare.com/email-service/concepts/deliverability/)

Review email authentication and sender reputation factors.

Use Deliverability

[Analytics & Observability](https://developers.cloudflare.com/email-service/observability/)

Review sending and routing activity, metrics, and analytics.

Use Analytics & Observability

[API](https://developers.cloudflare.com/email-service/api/)

Send and route emails using the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/), [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/), or [SMTP](https://developers.cloudflare.com/email-service/api/send-emails/smtp/).

Use API

---

## Related products

[Workers](https://developers.cloudflare.com/workers/)

Send and process email from Workers.

[Queues](https://developers.cloudflare.com/queues/)

Send Email Sending events to a queue.

[Analytics Engine](https://developers.cloudflare.com/analytics/)

Store custom metrics from email Workers.

---

## More resources

### [Platform limits](https://developers.cloudflare.com/email-service/platform/limits/)

Review Email Service limits and quotas.

### [Pricing](https://developers.cloudflare.com/email-service/platform/pricing/)

Review Email Service pricing and plans.

### [Examples](https://developers.cloudflare.com/email-service/examples/)

View Email Service code examples.

### [Discord](https://discord.cloudflare.com)

Ask questions and discuss Email Service with other developers.

### [Twitter](https://x.com/cloudflaredev)

Follow product announcements and developer updates.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/email-service/#page","headline":"Cloudflare Email Service","description":"Send transactional email and route incoming email with Cloudflare Email Service. Arbitrary-recipient sending requires Workers Paid, while routing supports Workers Free and Paid.","url":"https://developers.cloudflare.com/email-service/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/og.png?v=9f1e4a6a5ef85e5b","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
