---
description: Set up monitors and platform notifications, and deliver them to email, webhooks, PagerDuty, or connected services.
title: Alerts
image: https://developers.cloudflare.com/notifications/og.png?v=53368d19a966bd60
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Alerts

Last updated Oct 20, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/notifications/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Alerts is part of [Cloudflare Observability](https://developers.cloudflare.com/observability/). In the dashboard, you can find it under **Observability** > **Alerts**.

Alerts are organized into two categories: **Monitors** that you define yourself, and **Platform Notifications** that Cloudflare evaluates automatically.

## Monitors

Monitors evaluate a SQL API query on a schedule and send a notification when the result meets your detection criteria. You choose the dataset, define the query, and select a detection method: threshold, anomaly detection, or service-level objective (SLO). Refer to [Monitors](https://developers.cloudflare.com/notifications/monitors/) for configuration details.

## Platform Notifications

Platform Notifications are pre-configured alert types tied to specific Cloudflare products. You enable the ones you care about, choose where they are delivered, and Cloudflare evaluates the trigger conditions. They cover products such as DDoS Protection, SSL/TLS, Health Checks, Load Balancing, and Billing. Refer to [Platform Notifications](https://developers.cloudflare.com/notifications/notification-available/) for the full list.

## Delivery methods

All alerts can be delivered to:

- **Email** (all plans)
- **[Webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/)** (all plans; accounts without a paid zone can configure up to 100 webhook destinations)
- **[PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/)** (Business and higher)
- **Connected services**, including coding agents

## [Get started](https://developers.cloudflare.com/notifications/get-started/)

Create and manage alerts from the Cloudflare dashboard. Configure where alerts are delivered.

## [Monitors](https://developers.cloudflare.com/notifications/monitors/)

Define custom threshold, anomaly detection, and SLO monitors on SQL API datasets.

## [Platform Notifications](https://developers.cloudflare.com/notifications/notification-available/)

Browse built-in notification types organized by Cloudflare product.

## [Alert history](https://developers.cloudflare.com/notifications/notification-history/)

View a log of alerts that have been sent on your account.

## [API reference](https://developers.cloudflare.com/notifications/api-reference/)

Manage alerts programmatically using the Cloudflare API.

## [Reference](https://developers.cloudflare.com/notifications/reference/)

Troubleshooting, common errors, and details on specific alert types.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/notifications/#page","headline":"Alerts","description":"Set up monitors and platform notifications, and deliver them to email, webhooks, PagerDuty, or connected services.","url":"https://developers.cloudflare.com/notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/notifications/og.png?v=53368d19a966bd60","dateModified":"2026-10-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
