---
description: Detect and mitigate DDoS attacks automatically across all Cloudflare plans.
title: Cloudflare DDoS Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare DDoS Protection

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Detect and mitigate distributed denial-of-service (DDoS) attacks automatically.

Available on all plans

Cloudflare automatically detects and mitigates [distributed denial-of-service (DDoS) attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) via our autonomous DDoS systems.

These systems include multiple dynamic mitigation rules exposed as [DDoS attack protection managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/). You can customize the mitigation rules included in these rulesets to optimize and tailor the protection to your needs.

---

## Features

[Managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/)

Protect against a variety of DDoS attacks across layers 3/4 (network layer) and layer 7 (application layer) of the OSI model.

Use Managed rulesets

[Adaptive DDoS Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/adaptive-protection/)

Get increased protection against sophisticated DDoS attacks on layer 7 and layers 3/4.

Use Adaptive DDoS Protection

[Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/)

Detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods, or SYN and SYN-ACK floods.

Use Advanced TCP Protection

[Advanced DNS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/)

Protect against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as random prefix attacks.

Use Advanced DNS Protection

[Programmable Flow Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection/)

Deploy custom eBPF packet logic across Cloudflare's network to inspect and mitigate DDoS attacks against UDP-based Layer 7 protocols.

Use Programmable Flow Protection

---

## Availability

|                                                        | Free                                                                                     | Pro                                                                                      | Business                                                                                 | Enterprise                                                                               | Enterprise with Advanced DDoS Protection add-on                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Availability                                           | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| Standard, unmetered DDoS protection (layers 3-7)       | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| HTTP DDoS attack protection                            | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| Network-layer (L3/4) DDoS attack protection            | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      |
| Managed rules customization                            | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes, with Log action                                                                     | Expression fields & multi-rule support                                                   |
| Proactive false positive detection for new rules       | No                                                                                       | No                                                                                       | No                                                                                       | Yes                                                                                      | Yes                                                                                      |
| Adaptive DDoS protection                               | Only error adaptive rules                                                                | Only error adaptive rules                                                                | Only error adaptive rules                                                                | Only error adaptive rules                                                                | All adaptive rules                                                                       |
| Traffic profiling signals for adaptive DDoS protection | Error rates only                                                                         | Error rates only                                                                         | Error rates & historical trends                                                          | Error rates & historical trends                                                          | Error rates & historical trends, client country, user agent, query string, ML-scores     |
| Advanced TCP Protection                                | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers |
| Advanced DNS Protection                                | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers | Available to [Magic Transit](https://developers.cloudflare.com/magic-transit/) customers |
| Number of ruleset overrides allowed                    | 1                                                                                        | 1                                                                                        | 1                                                                                        | 1                                                                                        | 10                                                                                       |
| Alerts                                                 | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Yes                                                                                      | Advanced alerts with filtering                                                           |

---

## Related products

[Spectrum](https://developers.cloudflare.com/spectrum/)

Provides security and acceleration for any TCP or UDP based application.

[Magic Transit](https://developers.cloudflare.com/magic-transit/)

A network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

[Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/)

Get automatic protection from vulnerabilities and the flexibility to create custom rules.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ddos-protection/#page","headline":"Overview · Cloudflare DDoS Protection docs","description":"Detect and mitigate DDoS attacks automatically across all Cloudflare plans.","url":"https://developers.cloudflare.com/ddos-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
