---
description: Troubleshoot common alert configuration errors.
title: Common errors
image: https://developers.cloudflare.com/notifications/reference/common-errors/og.png?v=9b00279b3a712300
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Common errors

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/notifications/reference/common-errors/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Webhook test failed with status code 400 Bad Request

This error can occur when you try to configure a webhook that is not currently supported, such as setting up a PagerDuty webhook. PagerDuty needs to be configured under [connected services](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/), not as a webhook.

## Deleted users are still receiving alerts

When you remove a user from your account via **Manage Account** > **Members** in the Cloudflare dashboard, their email address is not removed from existing alerts. You need to remove their email address by [editing the alert](https://developers.cloudflare.com/notifications/get-started/#manage-alerts).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/reference/common-errors/#page","headline":"Common errors","description":"Troubleshoot common alert configuration errors.","url":"https://developers.cloudflare.com/notifications/reference/common-errors/","inLanguage":"en","image":"https://developers.cloudflare.com/notifications/reference/common-errors/og.png?v=9b00279b3a712300","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
