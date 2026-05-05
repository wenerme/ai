---
title: DDoS protection
description: DDoS mitigation layers available to Magic Transit customers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DDoS protection

Cloudflare [DDoS protection](https://developers.cloudflare.com/ddos-protection/) automatically detects and mitigates DDoS attacks using the [Autonomous Edge](https://developers.cloudflare.com/ddos-protection/about/components/#autonomous-edge). Magic Transit customers get multiple layers of protection, from always-on managed rulesets to advanced systems that you can configure for your specific traffic patterns.

## Mitigation layers

### DDoS managed rulesets

The [network-layer DDoS managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/) provides pre-configured rules that detect and mitigate L3/L4 DDoS attacks. The ruleset is always enabled and cannot be turned off. Magic Transit and Spectrum Enterprise customers can [customize the ruleset behavior](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/) by adjusting the action and sensitivity level for individual rules or groups of rules.

### Advanced TCP Protection

[Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/) detects and mitigates SYN flood attacks and out-of-state TCP attacks. It uses `flowtrackd` to learn your normal TCP traffic patterns and identify anomalous flows. You can create rules scoped globally, by region, or by data center, and set each rule to monitoring or mitigation mode.

### Advanced DNS Protection

[Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/) detects and mitigates DNS-over-UDP DDoS attacks. Like Advanced TCP Protection, it uses `flowtrackd` to build a traffic profile and identify volumetric DNS anomalies. You can create rules with configurable burst, rate, and profile sensitivity levels.

### Programmable Flow Protection

[Programmable Flow Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/) lets you write custom eBPF programs to inspect UDP payloads at the packet level. It is designed for custom or standardized L7 UDP-based protocols such as gaming, VoIP, financial services, and streaming. Programmable Flow Protection is available as an add-on for Magic Transit customers.

### Network Firewall

[Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) lets you create custom packet-level firewall rules to filter traffic by protocol, port, IP address, packet length, and other attributes. Network Firewall is included with Magic Transit.

## Automatic activation

Note

Advanced TCP and DNS Protection systems are automatically enabled in `Monitor` mode with the default thresholds for new Magic Transit customers and their [authorized prefixes](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).

Magic Transit customers can also enable the Advanced DDoS systems when the prefixes are ready, change the sensitivity level, or adjust the thresholds by contacting their account team.

After the initial monitoring period, review your traffic in [Network Analytics](https://developers.cloudflare.com/magic-transit/analytics/network-analytics/) to observe what would have been mitigated, then switch your rules from monitoring to mitigation mode. For more information, refer to [Advanced DDoS Systems general settings](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/).

## Execution order

When traffic enters the Cloudflare network, it passes through mitigation systems in the following order:

1. [DDoS managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/)
2. [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/)
3. [Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/)
4. [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)

[Programmable Flow Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/) operates within the Advanced DDoS Protection layer for UDP-based protocols.

## Related resources

* [Verify your DDoS protection](https://developers.cloudflare.com/magic-transit/how-to/verify-ddos-protection/): Confirm that your DDoS mitigation layers are active and correctly configured.
* [DDoS Protection overview](https://developers.cloudflare.com/ddos-protection/): Learn about Cloudflare DDoS Protection across all products.
* [Best practices for DDoS protection](https://developers.cloudflare.com/ddos-protection/best-practices/proactive-defense/): Review proactive defense recommendations, including steps specific to Magic Transit.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/ddos/","name":"DDoS protection"}}]}
```
