---
description: Layer 3 and 4 DDoS protection for TCP and UDP Spectrum applications.
title: DDoS Protection for Spectrum
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

#  DDoS Protection for Spectrum

Last updated Jul 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/spectrum/about/ddos-for-spectrum/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Spectrum provides DDoS Protection at layers 3-4 of the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/), that is against TCP and UDP based DDoS attacks.

Spectrum works as a layer 4 reverse proxy, therefore a proper TCP connection must be first established before traffic is proxied to the origin. This moves any impact of SYN or SYN-ACK reflection attacks to the Cloudflare global network. Additionally, by using Spectrum in front of your application, your origin IP is concealed — preventing attackers from targeting your origin server directly. It is also recommended that you replace your origin IP address after moving to Cloudflare, and lock it down to only accept traffic from [Cloudflare’s IP address range ↗](https://www.cloudflare.com/ips/).

Random or out-of-state TCP packets should not be passed to the origin if a legitimate TCP connection has not yet been established between the client and Cloudflare. Spectrum also [leverages SYN cookie challenges as part of the Linux networking stack ↗](https://blog.cloudflare.com/syn-packet-handling-in-the-wild/) to defend against floods.

Furthermore, if a flood of packets of an unspecified protocol target your application (for example, your Spectrum application is for TCP traffic, and a UDP flood targets your Spectrum application), the packets will be dropped. Similarly, if packets target a port or port range that you did not specify, they will also be dropped.

L3/4 DDoS attacks should be detected and mitigated by the [Network-layer DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/) that is enabled by default. This ruleset detects and mitigates DDoS attacks by dynamically fingerprinting attacks based on packet header fields.

For protecting HTTP/S applications against L7 DDoS attacks and to benefit from caching and additional features, onboard your application to Cloudflare’s Web Application Firewall/Content Delivery Network service, which works in tandem with Cloudflare Spectrum.

Refer to [Cloudflare DDoS Protection](https://developers.cloudflare.com/ddos-protection/) to learn more.

---

## Mitigation reasons

The **Mitigation reason** field shown in the **DDoS managed rules** tab of [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) (**Networking** \> **Insights** \> **Network Analytics** in the dashboard) will contain more information on why a given packet was dropped by the Spectrum system.

The mitigation reasons are the following:

| Reason                 | Description                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Blocked**            | Packet dropped because it matched a DDoS protection rule.                                                            |
| **Rate limited**       | Packet dropped because it exceeded rate limits.                                                                      |
| **Connection limited** | Packet dropped because it exceeded connection limits.                                                                |
| **Unexpected**         | Packet dropped because it was not expected given the current state of the connection it was associated with.         |
| **Not found**          | Packet dropped because it does not match any configured Spectrum application on the destination IP address and port. |

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/about/ddos-for-spectrum/#page","headline":"DDoS Protection for Spectrum · Cloudflare Spectrum docs","description":"Layer 3 and 4 DDoS protection for TCP and UDP Spectrum applications.","url":"https://developers.cloudflare.com/spectrum/about/ddos-for-spectrum/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
