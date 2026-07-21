---
description: Detect threats with the Network Firewall Intrusion Detection System.
title: IDS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt
> Use this file to discover all available pages before exploring further.

#  IDS

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-network-firewall/about/ids/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare's Intrusion Detection System (IDS) is a Cloudflare Advanced Network Firewall (formerly Magic Firewall) feature you can use to actively monitor for a wide range of known threat signatures in your traffic. An IDS expands the security coverage of a firewall to analyze traffic against a broader threat database, detecting a variety of sophisticated attacks such as ransomware, data exfiltration, and network scanning based on signatures or “fingerprints” in network traffic.

With Cloudflare's global anycast network, you get:

* Cloudflare's entire global network capacity is now the capacity of your IDS.
* Built in redundancy and failover. Every server runs Cloudflare's IDS software, and traffic is automatically attracted to the closest network location to its source.
* Continuous deployment for improvements to Cloudflare's IDS capabilities.

Refer to [Enable IDS](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/enable-ids/) for more information on enabling IDS and creating new rulesets. After IDS is enabled, your traffic will be scanned to find malicious traffic. The detections are logged to destinations that can be configured from the dashboard. Refer to [Use Logpush with IDS](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-logpush-with-ids/) for instructions on configuring a destination to receive the detections. Additionally, all traffic that is analyzed can be accessed via [network analytics](https://developers.cloudflare.com/analytics/network-analytics/). Refer to [GraphQL Analytics](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/) to query the analytics data.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/about/ids/#page","headline":"IDS · Cloudflare Network Firewall docs","description":"Detect threats with the Network Firewall Intrusion Detection System.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/about/ids/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
