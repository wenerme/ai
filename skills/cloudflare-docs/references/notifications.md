---
title: Notifications
description: Configure alerts for your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Notifications

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/notifications/","name":"Notifications"}}]}
```
