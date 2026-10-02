---
description: Route Cloudflare alerts to PagerDuty.
title: Configure PagerDuty
image: https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/og.png?v=ede932aacb2e9e2b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure PagerDuty

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

PagerDuty is available if your account has at least one zone on a Business or higher plan.

Cloudflare supports routing alerts to PagerDuty, so you can use the same service definitions and escalation paths you already have configured. When an alert fires, Cloudflare sends it to all PagerDuty services configured for that alert. PagerDuty then handles de-duping, rate limiting, and escalation based on your service configuration.

To use PagerDuty, you need a [PagerDuty account ↗︎](https://www.pagerduty.com/sign-up/) with User, Admin, Manager, Global Admin, or Account Owner permissions.

## Connect PagerDuty

1. In the Cloudflare dashboard, go to **Alerts** > **Destinations**. [Go to **Alerts** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. In the **Connected notification services** card, select **Connect**.
3. Log in to your [PagerDuty account ↗︎](https://www.pagerduty.com/) to connect it to your Cloudflare account.
4. Choose the services you want to use and select **Connect**.
5. The browser will navigate back to your Cloudflare dashboard. Select **Continue**.

Your connected PagerDuty services will appear in the **Connected notification services** card.

## Edit or disconnect PagerDuty

To change which PagerDuty services are connected, you need to disconnect and reconnect:

1. In the Cloudflare dashboard, go to **Alerts** > **Destinations**. [Go to **Alerts** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. In the **Connected notification services** card, select **View** on the PagerDuty service you want to disconnect.
3. Select **Disconnect** > **Confirm**.
4. Make your changes in [PagerDuty ↗︎](https://www.pagerduty.com/).
5. [Reconnect PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).

Note

Disconnecting PagerDuty disables any alerts currently routed to it. If PagerDuty was the only destination for an alert, that alert will have no destination until you reconfigure it.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/#page","headline":"Configure PagerDuty","description":"Route Cloudflare alerts to PagerDuty.","url":"https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/","inLanguage":"en","image":"https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/og.png?v=ede932aacb2e9e2b","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
