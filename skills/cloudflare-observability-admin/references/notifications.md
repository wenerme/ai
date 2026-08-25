---
description: Configure alerts for your Cloudflare account.
title: Notifications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Notifications

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/notifications/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Available on all plans

Cloudflare Notifications help you stay up to date with your Cloudflare account. Manage your Notifications to define what you want to be warned about and how, be it a denial-of-service attack or an issue with your server.

The available Notification features vary according to your plan:

* Free plans can set up email-based Notifications.
* Business and higher plans can also [access PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).
* Professional and higher plans can also [use webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/).

The notification service only works on the [proxied](https://developers.cloudflare.com/dns/proxy-status/) domains because Cloudflare needs enough information necessary to decide if we need to trigger a notification or not.

Note

The availability of delivery methods like PagerDuty and webhooks in Free or Professional zones depends on the highest zone plan in your Cloudflare account:

* PagerDuty is available in zones on a Free/Professional plan if your Cloudflare account has at least one zone in a Business plan (or higher).
* Webhooks are available in zones on a Free plan if your Cloudflare account has at least one zone in a Professional plan (or higher).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/notifications/#page","headline":"Notifications · Cloudflare Notifications docs","description":"Configure alerts for your Cloudflare account.","url":"https://developers.cloudflare.com/notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
