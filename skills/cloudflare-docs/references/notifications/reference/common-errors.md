---
title: Common errors
description: Refer to the information below for more details on common notification errors and how to troubleshoot them.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/notifications/reference/common-errors.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Common errors

Refer to the information below for more details on common notification errors and how to troubleshoot them.

## Webhook test failed with status code 400 400 Bad Request

This error can occur when you try to configure a webhook that is not currently supported, such as setting up a PagerDuty webhook.

PagerDuty needs to be configured under [connected notification services](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).

## Deleted users are still receiving notifications

When you remove a user from your account via **Manage Account** \> **Members** in the Cloudflare dashboard, their email address is not removed from existing notifications.

You need to remove the email address from the configuration of the notifications by [editing the notification recipient](https://developers.cloudflare.com/notifications/get-started/#edit-a-notification).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/notifications/","name":"Notifications"}},{"@type":"ListItem","position":3,"item":{"@id":"/notifications/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/notifications/reference/common-errors/","name":"Common errors"}}]}
```
