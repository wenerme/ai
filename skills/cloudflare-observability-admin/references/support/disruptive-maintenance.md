---
description: Understand Cloudflare scheduled maintenance windows.
title: Disruptive Maintenance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Disruptive Maintenance

Last updated Aug 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/disruptive-maintenance/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Scheduled maintenance windows

Planned maintenance is published on the [Cloudflare Status page ↗](https://www.cloudflarestatus.com/).

During these maintenance windows, customers may experience a slight increase in latency to the edge location which is under maintenance.

### Notifications

There are two ways to be notified about scheduled maintenance.

Status page notifications are delivered independently of Cloudflare infrastructure and fire even if Cloudflare itself is down. You can subscribe by email, webhook, Slack, Discord, or Google Chat. For more information, refer to [status page notifications ↗](https://www.cloudflarestatus.com/docs/notifications).

You can also receive maintenance updates through [Cloudflare Notifications](https://developers.cloudflare.com/notifications/), which delivers to the destinations configured on your account.

Maintenance Notification

**Who is it for?**

Customers interested in knowing about planned [Cloudflare maintenance](https://developers.cloudflare.com/support/troubleshooting/disruptive-maintenance/) for specific data centers. The notification lets you know when maintenance has been scheduled, changed, or canceled on an entire point of presence.

**Other options / filters**

You can filter maintenance notifications for specific points of presence and updates (scheduled, changed, canceled).

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

If the notification is announcing new scheduled maintenance, you may want to add the maintenance to your calendar. During these maintenance windows, you may experience a slight increase in latency to the edge location which is under maintenance.

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

## Unplanned maintenance

Cloudflare operates a redundant [anycast network ↗](https://www.cloudflare.com/en-gb/learning/cdn/glossary/anycast-network/) that is capable of automatically removing locations from our network if they require unplanned maintenance or experience an emergency event. In such cases, traffic will be rerouted automatically to alternative locations.

To check for unplanned maintenance, confirm whether a location was re-routed by checking if its status is listed as **Re-routed** in the [status page locations view ↗](https://www.cloudflarestatus.com/locations). Exceptionally, an incident may be declared for maintenance at a location, in which case updates are available on the [Cloudflare Status page ↗](https://www.cloudflarestatus.com/).

## Interconnections at locations under maintenance

If you have a [CNI connection](https://developers.cloudflare.com/network-interconnect/) with Cloudflare at a re-routed location, it may become temporarily unavailable during planned or unplanned maintenance, and regular Internet routing may be used instead to reach your network.

In the Magic family of products, the routing is defined explicitly using [static routes](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#create-a-static-route) to send traffic to the specified tunnels, with customer-configured priorities. If you have a CNI tunnel, we strongly recommend that you also add routes to an alternative tunnel, such as a fallback Internet tunnel, to make sure your traffic can be routed at all times.

## Related resources

* [Available RSS feeds](https://developers.cloudflare.com/fundamentals/new-features/available-rss-feeds/) (for the [Cloudflare changelog](https://developers.cloudflare.com/changelog/))
* [Subscribe to Cloudflare Status](https://developers.cloudflare.com/support/cloudflare-status/)
* [API deprecations](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/disruptive-maintenance/#page","headline":"Disruptive Maintenance · Cloudflare Support docs","description":"Understand Cloudflare scheduled maintenance windows.","url":"https://developers.cloudflare.com/support/disruptive-maintenance/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
