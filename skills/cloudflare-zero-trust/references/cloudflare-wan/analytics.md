---
description: Use Cloudflare WAN analytics to monitor site performance and troubleshoot issues.
title: Analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/analytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use Cloudflare WAN (formerly Magic WAN) analytics to monitor site performance and troubleshoot issues.

Use these options to gather information at the start of your troubleshooting workflow. Then, use more detailed network data collection and analysis to identify the root cause.

* View your entire network at a glance in [Network overview](#network-overview)
* Analyze network traffic over time in [Network Analytics](#network-analytics)
* Perform more detailed troubleshooting with:
  * [Traceroutes](#traceroutes)
  * [Packet captures](#packet-captures)

## Network overview

Network overview shows the connectivity status and traffic analytics for all Cloudflare WAN sites. Use it when you receive an alert, start troubleshooting, or perform routine monitoring.

For details, refer to [Network overview](https://developers.cloudflare.com/cloudflare-wan/analytics/site-analytics/).

## Network Analytics

Network Analytics provides detailed analytics on your Cloudflare WAN traffic over time. You can filter data by traffic characteristics and review traffic trends over time.

For details, refer to [Cloudflare WAN Network Analytics](https://developers.cloudflare.com/cloudflare-wan/analytics/network-analytics/).

## Traceroutes

Traceroutes provide a hop-by-hop breakdown of the Internet path network traffic follows from Cloudflare's network to your network.

For details, refer to [Traceroutes](https://developers.cloudflare.com/cloudflare-wan/analytics/traceroutes/).

## Packet captures

Packet captures allow you to analyze the raw packet data your network sends to and receives from Cloudflare's network.

For details, refer to [packet captures](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/).

## Query analytics with GraphQL

GraphQL Analytics provides a GraphQL API to query raw JSON data for your Cloudflare WAN traffic analytics. You can ingest this data into a Security Information and Event Management (SIEM) tool or another platform for further analysis.

* [Querying Cloudflare WAN tunnel bandwidth analytics with GraphQL](https://developers.cloudflare.com/cloudflare-wan/analytics/query-bandwidth/)
* [Querying Cloudflare WAN tunnel health check results with GraphQL](https://developers.cloudflare.com/cloudflare-wan/analytics/query-tunnel-health/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/analytics/#page","headline":"Analytics · Cloudflare WAN docs","description":"Use Cloudflare WAN analytics to monitor site performance and troubleshoot issues.","url":"https://developers.cloudflare.com/cloudflare-wan/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
