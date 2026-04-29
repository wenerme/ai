---
title: Disruptive Maintenance
description: Understand Cloudflare scheduled maintenance windows.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Disruptive Maintenance

## Scheduled Maintenance Windows

Planned maintenances will be published on the status page using a _calendar_ that is updated on a daily basis.

During these maintenance windows, customers may experience a slight increase in latency to the edge location which is under maintenance.

Note

All dates in the calendar are in UTC Timezone.

### Maintenance Calendar links

[Download iCal ↗](https://calendar.google.com/calendar/ical/c%5F83vui762nfm498l9a0ciojbju0%40group.calendar.google.com/public/basic.ics "Download iCal") [Add to Google Calendar ↗](https://calendar.google.com/calendar/u/0?cid=Y184M3Z1aTc2Mm5mbTQ5OGw5YTBjaW9qYmp1MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t "Add to Google Calendar")

### Notifications

Scheduled maintenances can also be sent out via [Cloudflare Notifications](https://developers.cloudflare.com/notifications/).

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

## Unplanned Maintenance

Cloudflare operates a redundant [anycast network ↗](https://www.cloudflare.com/en-gb/learning/cdn/glossary/anycast-network/) that is capable of automatically removing locations from our network if they require unplanned maintenance or experience an emergency event. In such cases, traffic will be rerouted automatically to alternative locations.

To check for unplanned maintenance, you can confirm at all times if a location was re-routed by verifying if its status is listed as "Re-routed" in our status page [https://www.cloudflarestatus.com ↗](https://www.cloudflarestatus.com). Exceptionally, an incident may be declared for maintenance at a location, in which case updates will be available in our status page at [https://www.cloudflarestatus.com ↗](https://www.cloudflarestatus.com).

## Interconnections at locations under maintenance

If you have a [CNI connection](https://developers.cloudflare.com/network-interconnect/) with Cloudflare at a re-routed location, it may become temporarily unavailable during planned or unplanned maintenance, and regular internet routing may be used instead to reach your network.

In the Magic family of products, the routing is defined explicitly using [static routes](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#create-a-static-route) to send traffic to the specified tunnels, with customer-configured priorities. If you have a CNI tunnel, we strongly recommend that you also add routes to an alternative tunnel, such as a fallback Internet tunnel, to make sure your traffic can be routed at all times.

## Related resources

* [Available RSS feeds](https://developers.cloudflare.com/fundamentals/new-features/available-rss-feeds/) (for the [Cloudflare changelog](https://developers.cloudflare.com/changelog/))
* [Subscribe to Cloudflare Status](https://developers.cloudflare.com/support/cloudflare-status/)
* [API deprecations](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/disruptive-maintenance/","name":"Disruptive Maintenance"}}]}
```
