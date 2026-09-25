---
description: Reference information for Notifications in Zero Trust analytics.
title: Notifications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Notifications

Last updated Apr 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Administrators can receive alerts when Cloudflare detects connectivity issues with the Cloudflare One Client or degraded application performance. Notifications can be delivered via email, webhook, and third-party services.

## Manage notifications

DEX notifications are configured on the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/). For more information, refer to [Create a notification](https://developers.cloudflare.com/notifications/get-started/#create-a-notification).

## Available notifications

<details>

<summary>

Device connectivity anomaly

</summary>

**Who is it for?**

Zero Trust customers who want to be notified when Cloudflare detects a spike or drop in the number of devices connected to the WARP client.

**Other options / filters**

- **Alert configuration**: Choose when to trigger a notification. Available options are *Connectivity spike*, *Connectivity drop*, and *Connectivity spike or drop*.
- Filters:
  - **Colo**: Cloudflare data center that the device is connected to.
  - **Platform**: Operating system of the device.
  - **Version**: WARP client version (for example, <code>2024.3.409.0</code>).
  - **Mode**: <a href="https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/">WARP mode</a> deployed on the device.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Review your <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/fleet-status/">fleet status</a> to investigate why the spike or drop occurred and which devices are impacted.

**Additional information**

To learn more about the alert logic, refer to <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#z-score">Z-score</a>.

</details>

<details>

<summary>

DEX test latency

</summary>

**Who is it for?**

Zero Trust customers who wish to receive alerts when there is a spike or drop in application latency, as measured by the HTTP test <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/#test-results">Resource Fetch time</a> or Traceroute test <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/#test-results">Round trip time</a>. Requires setting up a <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/">DEX test</a>.

**Other options / filters**

- **Alert configuration**: Choose when to trigger a notification. Available options are *Latency spike*, *Latency drop*, and *Latency spike or drop*.
- Filters:
  - **Colo**: Cloudflare data center that the device is connected to.
  - **Platform**: Operating system of the device.
  - **Version**: WARP client version (for example, <code>2024.3.409.0</code>).
  - **Test name**: Choose which DEX test the alert should monitor. You will receive individual notifications for each test.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

View your <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/">test results</a> to investigate why the spike occurred.

**Additional information**

To learn more about the alert logic, refer to <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#z-score">Z-score</a>.

</details>

<details>

<summary>

DEX test low availability

</summary>

**Who is it for?**

Zero Trust customers who wish to receive alerts when the percentage of successful HTTP or traceroute requests to an application drops below the selected service-level objective (SLO). Requires setting up a <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/">DEX test</a>.

**Other options / filters**

- **Service Level Objective (SLO)**: Specify the availability threshold that will trigger an alert. Enter a percentage in <code>xx.x</code> format (for example, <code>98.0</code>).
- Filters:
  - **Colo**: Cloudflare data center that the device is connected to.
  - **Platform**: Operating system of the device.
  - **Version**: WARP client version (for example, <code>2024.3.409.0</code>).
  - **Test name**: Choose which DEX test the alert should monitor. You will receive individual notifications for each test.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

View your <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/">test results</a> to investigate why the degradation occurred.

**Additional information**

To learn more about the alert logic, refer to <a href="https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#slo">SLO</a>.

</details>

## Alert logic

### Z-score

Cloudflare uses a z-score to detect unusual traffic spikes or drops. A [z-score ↗︎](https://en.wikipedia.org/wiki/Standard_score) is the number of standard deviations the current value is from the mean. Cloudflare calculates the mean and standard deviation by comparing the current five minutes to the past four hours. This is measured every five minutes.

To trigger an alert, the z-score value must be above 3.5 or below -3.5, which indicates the current value is significantly different from the recent baseline.

### SLO

A service-level objective (SLO) measures the percentage of valid events that succeeded. It is defined as (good events / valid events) \* 100, where valid events are those that could be measured in a given time period. DEX notifications evaluate both a short window (five minutes) and a long window (one hour) and trigger an alert if availability falls below the SLO threshold in either window.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#page","headline":"Notifications","description":"Reference information for Notifications in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
