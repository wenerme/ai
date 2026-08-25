---
description: Review recent changes to Digital Experience Monitoring.
title: Digital Experience Monitoring
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Digital Experience Monitoring

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/changelog/dex/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/changelog/rss/dex.xml)

## 2026-07-09


**Wi-Fi signal and network performance analytics for Cloudflare One Client devices**

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into device, network, and application performance across your Cloudflare SASE deployment.

The **Device Monitoring** page now analyzes hardware and network data between a Cloudflare One Client device and Cloudflare's edge, so you can diagnose connectivity and performance issues. Previously, this data was only available in raw DEX Device State Event logs, which required you to build your own analytics to interpret it.

![Device Monitoring summary with connection status, connection mode, Wi-Fi signal strength, traffic performance, and device health](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1652,height=664,format=webp/_astro/dex-device-monitoring-summary.CBxeSd6b.png)

A summary at the top of the page shows the health of each category at a glance, using **Good**, **Fair**, and **Poor** labels:

* **Connection** — connection status, Cloudflare One Client mode, and tunnel type over time
* **Wi-Fi signal strength** — signal measured in dBm over time, with thresholds that flag a weak signal
* **Traffic performance** — upstream and downstream performance, including network throughput on the active interface
* **Device health** — hardware metrics such as CPU, memory, and disk
![Wi-Fi signal strength and network throughput charts on the Device Monitoring page](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1666,height=732,format=webp/_astro/dex-device-monitoring-wifi-network.CoEBznAm.png)

You can filter by category and adjust the time range to correlate a device's metrics with a user's reported issue.

These analytics are available to all Cloudflare One customers at no additional cost.

To learn more, refer to the [DEX monitoring documentation](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/).

## 2026-04-29


**Digital experience tests to authenticated resources and enhanced configuration**

[Digital experience tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) now support testing applications protected by Cloudflare Access or third-party authentication. All authentication secrets are managed via [Cloudflare Secret Store](https://developers.cloudflare.com/secrets-store/).

Digital experience tests also have enhanced configuration options including:

* New HTTP methods (DELETE, PATCH, POST, PUT)
* Secret Store headers, custom plain text headers, and custom request bodies
* Advanced settings: follow redirects, response bodies, response headers, and allow untrusted certificates
![Digital experience test configuration for Cloudflare Access applications](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2840,height=1374,format=webp/_astro/dex_test_auth_config.CD3G3zb_.png)![Digital experience enhanced test configuration](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2840,height=1496,format=webp/_astro/dex_test_enhanced_config.Nsv7Vcob.png)

## 2026-04-28


**Internet outage notifications for devices**

[Digital Experience](https://developers.cloudflare.com/cloudflare-one/insights/dex/) will display a dashboard notification when an Internet outage or traffic anomaly may impact a [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) device based on its geographic location or network connection.

This Internet outage and traffic anomaly data is pulled from [Cloudflare Radar ↗](https://radar.cloudflare.com/). All Internet outage and traffic anomaly observations can be viewed in the [Radar Outage Center ↗](https://radar.cloudflare.com/outage-center).

![Digital Experience Monitoring dashboard notification for Internet outage impacting Cloudflare One Client devices](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2076,height=314,format=webp/_astro/dex_radar_ux_notification.CpdrUVYA.png)![Digital Experience Monitoring dashboard analytics for Internet outage impacting Cloudflare One Client devices](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2068,height=909,format=webp/_astro/dex_radar_analytics.GaPxWM6C.png)

## 2026-04-28


**Cloudflare One Client speed tests**

IT teams can now remotely run speed tests from the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) to Cloudflare's network edge.

Each speed test includes the following metrics:

* Internet speed: download and upload throughput
* Latency: download, upload, unloaded latency, and jitter
* Network quality score: video streaming, webchat/real-time communication (RTC)

In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Digital experience** \> **Diagnostics** and select **Run diagnostics** to use the feature today.

![Cloudflare One client speed test result](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2906,height=1730,format=webp/_astro/dex_speed_test.DukupcRs.png)

## 2026-04-15


**Last seen timestamp for Cloudflare One Client devices is more consistent**

The last seen timestamp for [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) devices is now more consistent across the dashboard. IT teams will see more consistent information about the most recent client event between a device and Cloudflare's network.

## 2026-02-19


**DEX Supports EU Customer Metadata Boundary**

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into [WARP](https://developers.cloudflare.com/warp-client/) device connectivity and performance to any internal or external application.

Now, all DEX logs are fully compatible with Cloudflare's [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) (CMB) setting for the 'EU' (European Union), which ensures that DEX logs will not be stored outside the 'EU' when the option is configured.

If a Cloudflare One customer using DEX enables CMB 'EU', they will not see any DEX data in the Cloudflare One dashboard. Customers can ingest DEX data via [LogPush](https://developers.cloudflare.com/logs/logpush/), and build their own analytics and dashboards.

If a customer enables CMB in their account, they will see the following message in the Digital Experience dashboard: "DEX data is unavailable because Customer Metadata Boundary configuration is on. Use Cloudflare LogPush to export DEX datasets."

![Digital Experience Monitoring message when Customer Metadata Boundary for the EU is enabled](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2143,height=1221,format=webp/_astro/dex_supports_cmb.6YOLXjHN.png)

## 2025-11-12


**DEX Logpush jobs**

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into WARP device metrics, connectivity, and network performance across your Cloudflare SASE deployment.

We've released four new WARP and DEX device data sets that can be exported via [Cloudflare Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). These Logpush data sets can be exported to R2, a cloud bucket, or a SIEM to build a customized logging and analytics experience.

1. [DEX Application Tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/)
2. [DEX Device State Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fdevice%5Fstate%5Fevents/)
3. [WARP Config Changes](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp%5Fconfig%5Fchanges/)
4. [WARP Toggle Changes](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp%5Ftoggle%5Fchanges/)

To create a new DEX or WARP Logpush job, customers can go to the account level of the Cloudflare dashboard > Analytics & Logs > Logpush to get started.

![DEX logpush job creation dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2549,height=1283,format=webp/_astro/dex_logpush_datasets.CtCk36pX.png)

## 2025-08-29


**DEX MCP Server**

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into device connectivity and performance across your Cloudflare SASE deployment.

We've released an MCP server [(Model Context Protocol) ↗](https://cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/) for DEX.

The DEX MCP server is an AI tool that allows customers to ask a question like, "Show me the connectivity and performance metrics for the device used by carly‌@acme.com", and receive an answer that contains data from the DEX API.

Any Cloudflare One customer using a Free, Pay-as-you-go, or Enterprise account can access the DEX MCP Server. This feature is available to everyone.

Customers can test the new DEX MCP server in less than one minute. To learn more, read the [DEX MCP server documentation](https://developers.cloudflare.com/cloudflare-one/insights/dex/dex-mcp-server/).

## 2025-03-07


**Cloudflare One Agent now supports Endpoint Monitoring**

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into device, network, and application performance across your Cloudflare SASE deployment. The latest release of the Cloudflare One agent (v2025.1.861) now includes device endpoint monitoring capabilities to provide deeper visibility into end-user device performance which can be analyzed directly from the dashboard.

Device health metrics are now automatically collected, allowing administrators to:

* View the last network a user was connected to
* Monitor CPU and RAM utilization on devices
* Identify resource-intensive processes running on endpoints
![Device endpoint monitoring dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1226,height=675,format=webp/_astro/cloudflare-one-agent-health-monitoring.XXtiRuOp.gif)

This feature complements existing DEX features like [synthetic application monitoring](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) and [network path visualization](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/), creating a comprehensive troubleshooting workflow that connects application performance with device state.

For more details refer to our [DEX](https://developers.cloudflare.com/cloudflare-one/insights/dex/) documentation.

## 2025-01-24

**IP visibility**

[IP visibility](https://developers.cloudflare.com/cloudflare-one/insights/dex/ip-visibility/) enables admins to inspect the different IP addresses associated with an end-user device. IP types available for review on the Cloudflare dashboard include: the device's private IP, the public IP assigned to the device by the ISP, and the router's (that the device is connected to) private IP.

## 2024-12-19

**Remote captures**

Admins can now collect packet captures (PCAPs) and WARP diagnostic logs from end-user devices. For more information, refer to [Remote captures](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/).

## 2024-05-20

**Last seen ISP**

Admins can view the last ISP seen for a device by going to **My Team** \> **Devices**. Requires setting up a [traceroute test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/).

## 2024-05-13

**DEX alerts**

Admins can now set [DEX alerts](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/) using [Cloudflare Notifications](https://developers.cloudflare.com/notifications/). Three new DEX alert types:

* Device connectivity anomaly
* Test latency
* Test low availability

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/dex/#page","headline":"Digital Experience Monitoring Changelog · Cloudflare One docs","description":"Review recent changes to Digital Experience Monitoring.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/dex/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
