---
description: View a log of sent notifications.
title: Notification History
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

#  Notification History

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/notifications/notification-history/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Notification History is a log of notifications that have been sent to your account via the Notifications service. Information contained in Notification History includes the notification itself, when the notification was sent, and who the notification was sent to.

## How to access Notification History

Currently, customers can access Notification History [via the Cloudflare API](https://developers.cloudflare.com/api/resources/alerting/subresources/history/methods/list/). Using `GET`, customers can retrieve a list of history records for notifications sent to an account. The records are displayed for the last 30 or 90 days, based on the type of plan.

```txt
GET accounts/{account_id}/alerting/v3/history
```

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/alerting/v3/history?page=1&per_page=25" \
--header "Authorization: Bearer <API_TOKEN>"
```

## Availability

Notification History is available on all plans. The amount of history clients have access to depends on the type of plan:

* **Free, Pro, and Business**: History from the past 30 days.
* **Enterprise**: History from the past 90 days.

Note

Customers will not be able to access Notification History from before 2021-10-11.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/notification-history/#page","headline":"Notification History · Cloudflare Notifications docs","description":"View a log of sent notifications.","url":"https://developers.cloudflare.com/notifications/notification-history/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
