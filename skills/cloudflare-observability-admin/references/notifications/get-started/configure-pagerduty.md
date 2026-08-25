---
description: Route Cloudflare notifications to PagerDuty.
title: Configure PagerDuty
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure PagerDuty

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This feature is only available if your account has at least one zone on a Business or higher plan. For more information, refer to our [plans ↗](https://www.cloudflare.com/plans/).

Cloudflare’s Notification service supports routing notifications to PagerDuty. By sending notifications to PagerDuty you can leverage the same service definitions and escalation paths that you would for other third-party services that you connect to PagerDuty.

When a configuration that you have previously set up triggers a notification for PagerDuty, Cloudflare will send the notification to PagerDuty on your behalf. All of the PagerDuty services configured for the notification will receive the notification. PagerDuty will follow the service’s configuration to handle the notification appropriately. Actions like de-duping and rate limiting depend on the notification type.

To use PagerDuty as a connected service, you must [sign up for a PagerDuty account ↗](https://www.pagerduty.com/sign-up/).

Note

According to PagerDuty, you will need an account with the following permissions to add a connected service: User, Admin, Manager, Global Admin, or Account Owner.

## Connect PagerDuty to a Cloudflare account

1. In the Cloudflare dashboard, go to the **Notifications** page.
[Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. Go to **Destinations**.
3. In the **Connected notification services** card, select **Connect**.
4. Log in to your [PagerDuty account ↗](https://www.pagerduty.com/) to connect it to your Cloudflare account.
5. Choose the services you want to use and select **Connect**.
6. The browser will navigate back to your Cloudflare dashboard. Select **Continue**.

Your new connected PagerDuty will appear in the **Connected notification services** card.

## Edit a PagerDuty connected service

To edit which PagerDuty services are connected to your Cloudflare account, you must first disconnect PagerDuty from Cloudflare, make any changes you need in PagerDuty, and then reconnect it.

Disconnecting PagerDuty will disable any notifications being sent to PagerDuty where they are currently configured. If PagerDuty was the only configured destination, disconnecting PagerDuty may result in a notification with no destination.

If other delivery destinations were selected, then those notifications will still be routed as configured.

1. In the Cloudflare dashboard, go to the **Notifications** page.
[Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. Go to **Destinations**.
3. In the **Connected notification services** card, select **View** on the PagerDuty service you want to disconnect.
4. Select **Disconnect** \> **Confirm**.
5. Log in to your [PagerDuty account ↗](https://www.pagerduty.com/) and make the required changes.
6. [Reconnect PagerDuty to Cloudflare](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/#page","headline":"Configure PagerDuty · Cloudflare Notifications docs","description":"Route Cloudflare notifications to PagerDuty.","url":"https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
