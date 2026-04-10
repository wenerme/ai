---
title: Network Flow
description: Understanding what is happening on your network is essential for troubleshooting performance issues, detecting threats, and planning capacity. Network Flow (formerly Magic Network Monitoring) gives you this visibility by analyzing network flow data that your routers or cloud environment send. The service supports NetFlow v5, NetFlow v9, IPFIX, and sFlow. In cloud environments, it supports AWS VPC flow logs through AWS Firehose.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network-flow/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Network Flow

Improve your network and cloud traffic visibility. Customers with public IPs can also detect DDoS attacks based on their traffic flows. Formerly Magic Network Monitoring.

 Available on all plans 

Understanding what is happening on your network is essential for troubleshooting performance issues, detecting threats, and planning capacity. Network Flow (formerly Magic Network Monitoring) gives you this visibility by analyzing network flow data that your routers or cloud environment send. The service supports NetFlow v5, NetFlow v9, IPFIX, and sFlow. In cloud environments, it supports AWS VPC flow logs through AWS Firehose.

Network Flow is available to all users with a Cloudflare account. You can log in to your Cloudflare dashboard, select your account, then go to the [Network flow ↗](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/flow-analytics) page to get started.

All users can use the [free version](https://developers.cloudflare.com/network-flow/network-flow-free/) in a home network, network lab, or business to get end-to-end visibility across their network traffic. Potential enterprise customers are encouraged to use the free version to run a proof of concept.

Enterprise customers can use Network Flow with [Magic Transit on-demand](https://developers.cloudflare.com/magic-transit/on-demand/) to monitor their network, identify volumetric DDoS attacks, and activate Magic Transit on-demand to mitigate those attacks.

Refer to [Get started](https://developers.cloudflare.com/network-flow/get-started/).

---

## Features

###  Rules 

Create rules to set thresholds for network traffic volume and receive alerts when thresholds are exceeded.

[ Use Rules ](https://developers.cloudflare.com/network-flow/rules/) 

###  Magic Transit integration 

Magic Transit On Demand customers can automatically enable DDoS mitigation when the service detects a DDoS attack.

[ Use Magic Transit integration ](https://developers.cloudflare.com/network-flow/magic-transit-integration/) 

###  Rule notifications 

Configure email, webhook, or PagerDuty notifications to receive alerts when rule thresholds are exceeded.

[ Use Rule notifications ](https://developers.cloudflare.com/network-flow/rules/rule-notifications/) 

---

## Related products

**[Magic Transit](https://developers.cloudflare.com/magic-transit/)** 

Mitigates L7, L4, and L3 DDoS attacks when combined with Network Flow and Magic Transit on-demand.

**[DDoS Protection](https://developers.cloudflare.com/ddos-protection/)** 

Provides HTTP DDoS attack protection for zones onboarded to Cloudflare in addition to L3 and L4 DDoS attack protection.

**[Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/)** 

Connects your network infrastructure directly with Cloudflare - rather than using the public Internet - for a more reliable and secure experience.

## More resources

[Discord](https://discord.com/invite/cloudflaredev) 

Connect with the Network Flow community on Discord to ask questions, and share feedback.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}}]}
```
