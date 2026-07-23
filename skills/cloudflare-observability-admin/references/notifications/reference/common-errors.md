---
description: Troubleshoot common notification configuration errors.
title: Common errors
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Common errors

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/notifications/reference/common-errors/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Refer to the information below for more details on common notification errors and how to troubleshoot them.

## Webhook test failed with status code 400 400 Bad Request

This error can occur when you try to configure a webhook that is not currently supported, such as setting up a PagerDuty webhook.

PagerDuty needs to be configured under [connected notification services](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).

## Deleted users are still receiving notifications

When you remove a user from your account via **Manage Account** \> **Members** in the Cloudflare dashboard, their email address is not removed from existing notifications.

You need to remove the email address from the configuration of the notifications by [editing the notification recipient](https://developers.cloudflare.com/notifications/get-started/#edit-a-notification).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/reference/common-errors/#page","headline":"Common errors · Cloudflare Notifications docs","description":"Troubleshoot common notification configuration errors.","url":"https://developers.cloudflare.com/notifications/reference/common-errors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
