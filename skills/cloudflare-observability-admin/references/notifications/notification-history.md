---
description: View a log of sent alerts.
title: Alert history
image: https://developers.cloudflare.com/notifications/notification-history/og.png?v=b58733f77e46fa7e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Alert history

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/notifications/notification-history/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Alert history is a log of alerts that have been sent to your account. Each record includes the alert itself, when it was sent, and who it was delivered to.

## Access alert history

You can access alert history [via the Cloudflare API](https://developers.cloudflare.com/api/resources/alerting/subresources/history/methods/list/). Use `GET` to retrieve history records for alerts sent to an account. Records are available for the last 30 or 90 days depending on your plan.

*Syntaxtxt*

```txt
GET accounts/{account_id}/alerting/v3/history
```

*Examplebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/alerting/v3/history?page=1&per_page=25" \
--header "Authorization: Bearer <API_TOKEN>"
```

## Availability

Alert history is available on all plans. Retention depends on your plan:

- **Free, Pro, and Business**: 30 days.
- **Enterprise**: 90 days.

Note

Alert history is not available for events before 2021-10-11.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/notification-history/#page","headline":"Alert history","description":"View a log of sent alerts.","url":"https://developers.cloudflare.com/notifications/notification-history/","inLanguage":"en","image":"https://developers.cloudflare.com/notifications/notification-history/og.png?v=b58733f77e46fa7e","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
