---
title: Cloudflare Status
description: Check Cloudflare service status and configure notifications.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

# Cloudflare Status

Cloudflare provides updates on the status of our services and network at [https://www.cloudflarestatus.com/ ↗](https://www.cloudflarestatus.com/), which you should check if you notice unexpected behavior with Cloudflare.

Beyond looking at the page itself, there are programmatic ways to consume this information.

## Configure notifications

Cloudflare offers a dedicated notification called **Incident Alert**, which lets you know when Cloudflare is experiencing an incident.

You can configure this notification to send via [email](https://developers.cloudflare.com/notifications/get-started/), [Webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/), or [PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).

## Use the API

Cloudflare also provides status information through the [Cloudflare Status API ↗](https://www.cloudflarestatus.com/api).

Endpoints are displayed with examples using cURL and our embedded JavaScript widget (if available).

## Related resources

* [Available RSS feeds](https://developers.cloudflare.com/fundamentals/new-features/available-rss-feeds/) (for the [Cloudflare changelog](https://developers.cloudflare.com/changelog/))
* [API deprecations](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/)
* [Planned maintenance windows](https://developers.cloudflare.com/support/disruptive-maintenance/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/cloudflare-status/","name":"Cloudflare Status"}}]}
```
