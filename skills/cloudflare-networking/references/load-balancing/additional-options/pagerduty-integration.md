---
description: Send load balancing alerts to PagerDuty.
title: Integrate with PagerDuty
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

#  Integrate with PagerDuty

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/load-balancing/additional-options/pagerduty-integration/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

To integrate Cloudflare health monitor notifications with PagerDuty, follow the steps outlined in PagerDuty’s [Email Integration Guide ↗](https://www.pagerduty.com/docs/guides/email-integration-guide/). If you do not have a PagerDuty account, you will first need to set that up.

PagerDuty will generate an email address that will create incidents based on emails sent to that address. For help locating that email address, refer to the [PagerDuty documentation ↗](https://www.pagerduty.com/docs/guides/email-integration-guide/).

When creating the Notifier object, configure the email to go to the PagerDuty integration email. Consequently, whenever a pool or endpoint goes down, an Incident will be created to capture it.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/additional-options/pagerduty-integration/#page","headline":"Integrate with PagerDuty · Cloudflare Load Balancing docs","description":"Send load balancing alerts to PagerDuty.","url":"https://developers.cloudflare.com/load-balancing/additional-options/pagerduty-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
