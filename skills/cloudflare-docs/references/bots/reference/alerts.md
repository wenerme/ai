---
title: Bot Detection Alerts
description: Set up notifications for spikes in bot traffic on your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/bots/reference/alerts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Bot Detection Alerts

Bot alerts inform you when Cloudflare detects spikes in your traffic with any of the following characteristics:

* A global spike in traffic that have a bot score of less than 30.
* An increase in traffic on available dimensions in [Set up a bot detection alert](#set-up-a-bot-detection-alert).
* Filters of your choosing in [Set up a bot detection alert](#set-up-a-bot-detection-alert).

---

## Alert types

Bot Detection Alert

**Who is it for?**

Enterprise customers who want to be notified when Cloudflare detects a spike in bot traffic on their zones.

**Other options / filters**

None.

**Included with**

Accounts with at least one Enterprise zone.

**What should you do if you receive one?**

Select the [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) link enclosed in the alert message. Contact support if additional advice is needed on how to investigate the attack further.

**Additional information**

After an alert is created on the dashboard, it may take up to 30 minutes before sufficient data is available to begin detecting traffic anomalies. Verified bot traffic is excluded from bot alerts.

Custom Bot Detection Alert

**Who is it for?**

Enterprise customers who want to be notified when Cloudflare detects a spike in bot traffic on their zones.

**Other options / filters**

Refer to the [alert logic](https://developers.cloudflare.com/bots/reference/alerts/#alert-logic) for more information on additional filters or groupings.

**Included with**

Accounts with at least one Enterprise zone.

**What should you do if you receive one?**

Select the [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) link enclosed in the alert message. Contact support if additional advice is needed on how to investigate the attack further.

**Additional information**

After an alert is created on the dashboard, it may take up to 30 minutes before sufficient data is available to begin detecting traffic anomalies. Verified bot traffic is excluded from both basic and advanced bot alerts.

Alerts with grouping could cause potential noise if you set them up for a high-traffic zone. Grouping alerts function as if you set up separate policies with a filter for each value. Alerts may trigger multiple values in the same group as long as the traffic for each value reaches the threshold of 200.

### Set up a bot detection alert

To receive Bot alerts, you must [configure a notification](https://developers.cloudflare.com/notifications/get-started/). Notifications help you stay up to date with your Cloudflare account through email, PagerDuty, or webhooks, depending on your Cloudflare plan.

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Select **Bot Management** from the Product list.
4. Choose one of the available bot detection alerts (depending on whether you want to set up custom filters and/or grouping):  
   * Bot Detection Alert  
   * Custom Bot Detection Alert
5. Enter a notification name and (optionally) a description.
6. Select the domain(s) to monitor for this alert.
7. Configure a delivery method for the notification. The available delivery methods depend on your Cloudflare plan. For more information, refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/).
8. If you are creating a notification for Custom Bot Detection Alert, define the parameters that will filter the notifications you will receive.
9. Select **Save**.

---

## Alert logic

The Bot Detection Alert notifies users when Cloudflare detects an abnormal spike to their zone where the Z-score > [3.5 ↗](https://blog.cloudflare.com/introducing-thresholds-in-security-event-alerting-a-z-score-love-story/) and bot requests > 200/5 minutes in bot traffic (bot score < 30).

Z-score is calculated with a long window duration of six hours and short window duration of five minutes.

Bot Detection Alerts are delivered with Cloudflare’s Notifications system via email, webhook, or Pager Duty.

You will not receive duplicate alerts within the same one-hour time frame, except in rare cases where different alert values simultaneously trigger alerts.

In addition to the information above, Custom Bot Detection Alerts allow you to include or exclude certain conditions:

* User-agent
* Hostname
* URI Path
* IP Source Address
* AS Num
* JA3 Fingerprint
* JA4 Fingerprint
* Bot Detection IDs

You can also choose to group by the following dimensions so that they can be alerted of volumetric anomalies based on:

* JA4 Fingerprint (removes the filter of bot score < 30)
* AS Num
* Bot Detection IDs

Note

Bot Detection Alerts exclude [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/reference/alerts/","name":"Bot Detection Alerts"}}]}
```
