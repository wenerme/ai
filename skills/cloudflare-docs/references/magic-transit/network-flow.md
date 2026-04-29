---
title: Network Flow
description: Monitor Magic Transit traffic with Network Flow.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network Flow

[Magic Transit On Demand](https://developers.cloudflare.com/magic-transit/on-demand/) allows you to keep Magic Transit disabled during normal operations and activate it only when you need DDoS protection. Network Flow monitors your traffic while Magic Transit is off and detects attacks. When an attack is detected, you can enable Magic Transit automatically or manually.

You can create Network Flow rules that monitor specific IP prefixes for DDoS attacks. When an attack is detected, Cloudflare notifies you by email, [webhook](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/), or [PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).

If you enable [auto-advertisement](#activate-ip-auto-advertisement) on a rule, Magic Transit activates automatically to protect the targeted prefixes. You can enable auto-advertisement for individual Network Flow rules through the dashboard or API.

After Magic Transit activates and your traffic flows through Cloudflare, Cloudflare blocks malicious DDoS traffic. Your origin servers receive only clean traffic through IPsec or GRE tunnels.

The following diagrams illustrate this process:

![The diagram shows the flow of traffic when you send flow data from your network to Cloudflare for analysis.](https://developers.cloudflare.com/_astro/1-flowdata.C2Oap_Pf_20TaAe.webp)

![Cloudflare automatically notifies you when Cloudflare detects an attack	based on your flow data.](https://developers.cloudflare.com/_astro/2-flowdata.DLOwyPqi_Z1KU3IT.webp)

![You can create rules to activate Magic Transit automatically, to protect your IP addresses from a DDoS
attack.](https://developers.cloudflare.com/_astro/3-flowdata.CiegeHTC_1lUfmQ.webp)

## Activate IP auto-advertisement

Before a rule can automatically activate Magic Transit, you must enable IP advertisement for the relevant prefixes. You can do this through the dashboard or the API.

### Dashboard

To activate IP advertisement through the Cloudflare dashboard, refer to [Configure dynamic advertisement](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#configure-dynamic-advertisement).

### API

To activate IP advertisement through the API, refer to the [IP Address Management Dynamic Advertisement API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement%5Fstatus/methods/edit/).

## Network Flow rules

To create Network Flow rules with auto-advertisement, refer to [Rule Auto-Advertisement](https://developers.cloudflare.com/network-flow/rules/#rule-auto-advertisement).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/network-flow/","name":"Network Flow"}}]}
```
