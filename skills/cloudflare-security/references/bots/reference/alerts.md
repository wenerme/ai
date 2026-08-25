---
description: Set up notifications for spikes in bot traffic on your domain.
title: Bot Detection Alerts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Bot Detection Alerts

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/reference/alerts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Bot alerts inform you when Cloudflare detects spikes in your traffic with any of the following characteristics:

* A global spike in traffic that has a bot score of less than 30.
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
[Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
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

The Bot Detection Alert notifies you when Cloudflare detects an abnormal spike to your zone where the [Z-score ↗](https://blog.cloudflare.com/introducing-thresholds-in-security-event-alerting-a-z-score-love-story/) exceeds 3.5 and bot requests exceed 200 per 5 minutes (bot score below 30). A Z-score measures how far a value deviates from the average, so a Z-score above 3.5 indicates a statistically unusual traffic spike.

The Z-score is calculated using a six-hour baseline window and a five-minute observation window.

Bot Detection Alerts are delivered with Cloudflare’s Notifications system via email, webhook, or Pager Duty.

You will not receive duplicate alerts within the same one-hour time frame, except in rare cases where different alert values simultaneously trigger alerts.

In addition to the information above, Custom Bot Detection Alerts allow you to include or exclude certain conditions:

* User-agent
* Hostname
* URI Path
* IP Source Address
* Autonomous System Number (AS Num)
* JA3 Fingerprint
* JA4 Fingerprint
* Bot Detection IDs

You can also choose to group by the following dimensions so that they can be alerted of volumetric anomalies based on:

* JA4 Fingerprint (removes the filter of bot score < 30)
* AS Num
* Bot Detection IDs

Note

Bot Detection Alerts exclude [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/reference/alerts/#page","headline":"Bot Detection Alerts · Cloudflare bot solutions docs","description":"Set up notifications for spikes in bot traffic on your domain.","url":"https://developers.cloudflare.com/bots/reference/alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
