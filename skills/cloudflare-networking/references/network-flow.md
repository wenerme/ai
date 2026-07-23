---
description: Analyze network traffic with NetFlow, sFlow, and IPFIX data.
title: Network Flow
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt
> Use this file to discover all available pages before exploring further.

# Network Flow

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network-flow/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Improve your network and cloud traffic visibility. Customers with public IPs can also detect DDoS attacks based on their traffic flows. Formerly Magic Network Monitoring.

Available on all plans

Understanding what is happening on your network is essential for troubleshooting performance issues, detecting threats, and planning capacity. Network Flow (formerly Magic Network Monitoring) gives you this visibility by analyzing network flow data that your routers or cloud environment send. The service supports NetFlow v5, NetFlow v9, IPFIX, and sFlow. In cloud environments, it supports AWS VPC flow logs through AWS Firehose.

Network Flow is available to all users with a Cloudflare account. You can log in to your Cloudflare dashboard, select your account, then go to the [Network flow ↗](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/flow-analytics) page to get started.

All users can use the [free version](https://developers.cloudflare.com/network-flow/network-flow-free/) in a home network, network lab, or business to get end-to-end visibility across their network traffic. Potential enterprise customers are encouraged to use the free version to run a proof of concept.

Enterprise customers can use Network Flow with [Magic Transit on-demand](https://developers.cloudflare.com/magic-transit/on-demand/) to monitor their network, identify volumetric DDoS attacks, and activate Magic Transit on-demand to mitigate those attacks.

Refer to [Get started](https://developers.cloudflare.com/network-flow/get-started/).

---

## Features

[Rules](https://developers.cloudflare.com/network-flow/rules/)

Create rules to set thresholds for network traffic volume and receive alerts when thresholds are exceeded.

Use Rules

[Magic Transit integration](https://developers.cloudflare.com/network-flow/magic-transit-integration/)

Magic Transit On Demand customers can automatically enable DDoS mitigation when the service detects a DDoS attack.

Use Magic Transit integration

[Rule notifications](https://developers.cloudflare.com/network-flow/rules/rule-notifications/)

Configure email, webhook, or PagerDuty notifications to receive alerts when rule thresholds are exceeded.

Use Rule notifications

---

## Related products

[Magic Transit](https://developers.cloudflare.com/magic-transit/)

Mitigates L7, L4, and L3 DDoS attacks when combined with Network Flow and Magic Transit on-demand.

[DDoS Protection](https://developers.cloudflare.com/ddos-protection/)

Provides HTTP DDoS attack protection for zones onboarded to Cloudflare in addition to L3 and L4 DDoS attack protection.

[Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/)

Connects your network infrastructure directly with Cloudflare - rather than using the public Internet - for a more reliable and secure experience.

## More resources

### [Discord](https://discord.com/invite/cloudflaredev)

Connect with the Network Flow community on Discord to ask questions, and share feedback.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/network-flow/#page","headline":"Overview · Cloudflare Network Flow docs","description":"Analyze network traffic with NetFlow, sFlow, and IPFIX data.","url":"https://developers.cloudflare.com/network-flow/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
