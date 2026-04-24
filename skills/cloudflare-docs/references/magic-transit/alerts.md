---
title: Alerts
description: Configure alerts for Magic Transit events.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/alerts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Alerts

You can configure alerts to receive notifications for changes in your network.

Network Flow - Auto Advertisement

**Who is it for?**

[Magic Transit on-demand](https://developers.cloudflare.com/magic-transit/on-demand/) customers who use Flow-Based Monitoring and want alerts when Magic Transit is automatically enabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

No action is needed. You can go to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/magic-transit) to review the health and status of your tunnels.

Network Flow - DDoS Attack

**Who is it for?**

[BYOIP](https://developers.cloudflare.com/byoip/) and [Spectrum](https://developers.cloudflare.com/spectrum/) customers with [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) who want to receive a notification when Cloudflare has mitigated attacks that generate an average of at least 12,000 packets per second over a five-second period, with a duration of one minute or more.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

No action needed. Refer to [DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/) for more information.

Network Flow - Volumetric Attack

**Who is it for?**

[Magic Transit on-demand](https://developers.cloudflare.com/magic-transit/on-demand/) customers who are using Flow-Based Monitoring to detect attacks when Magic Transit is disabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

If you do not have auto advertisement enabled, you need to advertise your IP prefixes to enable Magic Transit. For more information, refer to [Dynamic advertisement](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/).

Magic Tunnel Health Check Alert

**Who is it for?**

Magic Transit and Cloudflare WAN customers who wish to receive alerts when the percentage of tunnel states meeting the selected service-level objective (SLO) drops below the defined threshold for a Magic Tunnel.

**Other options / filters**

* Notification Name: A custom name for the notification.
* Description (optional): A custom description for the notification.
* Notification Email (can be multiple emails): The email address of recipient for the notification.
* Webhooks
* Tunnels: Choose one or more tunnels to monitor.
* SLO: Define SLO threshold for Magic Tunnel health alerts. Available options are _High_, _Medium_, and _Low_.

**Included with**

Purchase of Magic Transit and Cloudflare WAN.

**What should you do if you receive one?**

Refer to the [Magic Transit tunnel health](https://developers.cloudflare.com/magic-transit/network-health/check-tunnel-health-dashboard/) or [Cloudflare WAN IPsec/GRE tunnel health](https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard/) for more information on what the issue might be.

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/alerts/","name":"Alerts"}}]}
```
