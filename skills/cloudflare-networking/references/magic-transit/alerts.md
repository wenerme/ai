---
description: Configure alerts for Magic Transit events.
title: Alerts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# Alerts

Last updated Apr 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/magic-transit/alerts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can configure alerts to receive notifications for changes in your network.

<details>

<summary>

Network Flow - Auto Advertisement

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/magic-transit/on-demand/">Magic Transit on-demand</a> customers who use Flow-Based Monitoring and want alerts when Magic Transit is automatically enabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

No action is needed. You can go to the <a href="https://dash.cloudflare.com/?to=/:account/magic-transit">Cloudflare dashboard</a> to review the health and status of your tunnels.

</details>

<details>

<summary>

Network Flow - DDoS Attack

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/byoip/">BYOIP</a> and <a href="https://developers.cloudflare.com/spectrum/">Spectrum</a> customers with <a href="https://developers.cloudflare.com/analytics/network-analytics/">Network Analytics</a> who want to receive a notification when Cloudflare has mitigated attacks that generate an average of at least 12,000 packets per second over a five-second period, with a duration of one minute or more.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

No action needed. Refer to <a href="https://developers.cloudflare.com/ddos-protection/reference/alerts/">DDoS alerts</a> for more information.

</details>

<details>

<summary>

Network Flow - Volumetric Attack

</summary>

**Who is it for?**

<a href="https://developers.cloudflare.com/magic-transit/on-demand/">Magic Transit on-demand</a> customers who are using Flow-Based Monitoring to detect attacks when Magic Transit is disabled.

**Other options / filters**

None.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

If you do not have auto advertisement enabled, you need to advertise your IP prefixes to enable Magic Transit. For more information, refer to <a href="https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/">Dynamic advertisement</a>.

</details>

<details>

<summary>

Magic Tunnel Health Check Alert

</summary>

**Who is it for?**

Magic Transit and Cloudflare WAN customers who wish to receive alerts when the percentage of tunnel states meeting the selected service-level objective (SLO) drops below the defined threshold for a Magic Tunnel.

**Other options / filters**

- Notification Name: A custom name for the notification.
- Description (optional): A custom description for the notification.
- Notification Email (can be multiple emails): The email address of recipient for the notification.
- Webhooks
- Tunnels: Choose one or more tunnels to monitor.
- SLO: Define SLO threshold for Magic Tunnel health alerts. Available options are *High*, *Medium*, and *Low*.

**Included with**

Purchase of Magic Transit and Cloudflare WAN.

**What should you do if you receive one?**

Refer to the <a href="https://developers.cloudflare.com/magic-transit/network-health/check-tunnel-health-dashboard/">Magic Transit tunnel health</a> or <a href="https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard/">Cloudflare WAN IPsec/GRE tunnel health</a> for more information on what the issue might be.

</details>

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/alerts/#page","headline":"Alerts","description":"Configure alerts for Magic Transit events.","url":"https://developers.cloudflare.com/magic-transit/alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
