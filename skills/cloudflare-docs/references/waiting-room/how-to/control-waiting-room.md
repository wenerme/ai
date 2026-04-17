---
title: Control waiting room traffic
description: Manage active user limits and queueing behavior.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waiting-room/how-to/control-waiting-room.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Control waiting room traffic

To change whether and how traffic reaches a waiting room, update the values for **Enabled**, **Queue All**, and **Queueing Method** on your waiting room.

## Enable a waiting room

To enable a waiting room:

1. Go to **Traffic** \> **Waiting Room**.
2. On a waiting room, set **Enabled** to **On**.

## Queue options

By default, an active waiting room puts visitors in a queue when traffic approaches the target thresholds defined in **Total active users** and **New users per minute**. Refer to [Queueing activation](https://developers.cloudflare.com/waiting-room/how-to/monitor-waiting-room/#queueing-activation) for more information.

However, if you want all visitors to be queued for a predefined amount of time — in preparation for a product release or other time-based event — use the [Create scheduled events](https://developers.cloudflare.com/waiting-room/additional-options/create-events/) option.

You may also use the **Queue-all** option on a waiting room as an emergency stop to all traffic during unexpected or temporary downtime. As long as the waiting room is active and **Queue-all** is enabled, no traffic will reach your application.

### Queue visitors when necessary

To queue visitors only when necessary:

1. Go to **Traffic** \> **Waiting Room**.
2. On a waiting room, set **Enabled** to **On**.
3. Your waiting room will begin queueing visitors once it approaches the target traffic thresholds defined in [**Total active users**](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/) and in [**New users per minute**](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/).

### Queue all visitors

To queue all visitors prior to a time-based offering, set up a pre-queue as part of a [waiting room event](https://developers.cloudflare.com/waiting-room/additional-options/create-events/#create-an-event-from-the-dashboard).

To start queueing all new visitors without a scheduled event:

1. Go to **Traffic** \> **Waiting Room**.
2. On a waiting room:  
   1. Ensure **Enabled** is set to **On**.  
   2. Set **Queue-all** to **On**.
3. Your waiting room will begin queueing all new visitors and will not allow any new visitors to the path protected by your waiting room. Queue-all will override all other waiting room settings, including event settings.

Note

Only new visitors will be queued. Active users that are already on your website will continue there and will not return to the queue until their session expires.

1. To begin allowing visitors to the path protected by your waiting room, set **Queue-all** to **Off**.

## Queueing method

For more details about queueing method, refer to [Queueing methods](https://developers.cloudflare.com/waiting-room/reference/queueing-methods/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}},{"@type":"ListItem","position":3,"item":{"@id":"/waiting-room/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/waiting-room/how-to/control-waiting-room/","name":"Control waiting room traffic"}}]}
```
