---
description: Diagnose why the Network Firewall allowed or blocked traffic.
title: Diagnose traffic decisions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Diagnose traffic decisions

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-network-firewall/troubleshooting/diagnose-traffic-decisions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When traffic is unexpectedly blocked, multiple Cloudflare systems could be responsible. This guide walks you through identifying what is blocking your traffic and how to resolve it.

Traffic passing through Cloudflare's network is evaluated by several independent security systems in the following sequence:

1. Network-layer DDoS protection: This layer manages DDoS rulesets.
2. Advanced TCP protection: Cloudflare carries a stateful TCP inspection known as ([flowtrackd ↗](https://blog.cloudflare.com/announcing-flowtrackd/)).
3. Network Firewall: Your custom and managed firewall rules.

Each system operates independently. Traffic blocked by an earlier system never reaches later systems for evaluation.

Caution

Creating an allow rule in Network Firewall does **not** bypass DDoS protection. If traffic is blocked by Advanced TCP Protection or DDoS managed rules, you must configure bypasses in those systems separately.

To diagnose blocked traffic, use [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) to identify which system is blocking the traffic and why. If Network Analytics does not provide enough information, you can use packet captures for deeper analysis.

## Quick triage checklist

Before making changes, gather the following information:

* What traffic is affected? Check source IP, destination IP, ports, and protocols.
* When did the issue start?
* Were any configuration changes made recently?
* Is this affecting all traffic or specific flows?
* Check [Cloudflare Status ↗](https://www.cloudflarestatus.com/) for any ongoing incidents

## Filter dropped traffic

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Under **Protect & Connect**, go to **Insights** \> **Network analytics**.
3. In the **All Traffic** tab, select **Add filter**.
4. Configure the filter:
  * Select **Action** \> **equals** \> **Drop**
  * Select **Apply**.
5. Filter the time range to when the issue occurred.
6. Add additional filters if you know the affected traffic characteristics (such as Source IP, Destination IP, and more).
7. To identify the blocking system: In the **Packet Summary** graph, select the the three dots > **Mitigation system**. This tells you which Cloudflare system blocked the traffic.

### If the mitigation system displays DDoS Managed Ruleset

If the mitigation system displays DDoS Managed Ruleset, this means that traffic was blocked by DDoS Managed Ruleset. Note the **Rule ID** and **Rule Name** fields to identify which specific rule triggered.

1. At the top of **Network analytics**, select **DDoS managed rules**.
2. Make sure to include any relevant filters to identify the traffic and to narrow down the time range to the relevant issue timing.
3. In the **Packets summary** graph, select the three dots, then choose **Rule**. The dashboard will show you the rules that were acting on your traffic.
4. To resolve: Adjust the DDoS managed rule sensitivity or [create an override](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/) for the affected traffic pattern.

### If the mitigation system displays TCP Protection

If the mitigation system displays TCP Protection, it means that traffic was blocked by [TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/). Refer to [Mitigation Reason](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#mitigation-reasons) field to understand why it displays TCP Protection.

**To resolve**, create an [Advanced TCP Protection allowlist](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist/) or [filter](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-filter/) to bypass protection for the affected traffic.

### If the mitigation system displays Firewall Policy

If your traffic was blocked by your Network Firewall configuration:

1. At the top of **Network analytics**, select the **Firewall** tab.
2. Make sure to include any relevant filters to identify the traffic and to narrow down the time range to the relevant issue timing.
3. In the **Packets summary** graph, select the three dots, then choose **Rule**. The dashboard will show you the rules that were acting on your traffic.
4. Review your [Network Firewall policies](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/add-policies/) and adjust the rule order or expressions as needed.

## Use packet captures for deeper analysis

If you cannot identify the issue from Network Analytics, use [packet captures](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/) to inspect the actual traffic:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Under **Protect & Connect**, go to **Insights** \> **Network health**.
3. Go to **Diagnostics**, and configure a packet capture filter matching the affected traffic. Note that the packet capture (pcap) might be empty because packets were dropped.
4. Analyze the captured packets to understand traffic characteristics.
5. Compare against your rule configurations.

## Common scenarios

| Scenario                     | Symptoms                                | Likely cause                            | Recommended action                                   |
| ---------------------------- | --------------------------------------- | --------------------------------------- | ---------------------------------------------------- |
| Partner traffic blocked      | Specific source IP blocked              | DDoS or ATP sensitivity                 | Allowlist partner IP ranges in both systems          |
| New rule not working         | Traffic still passes                    | Rule order (earlier rule matches first) | Adjust rule priority or refine the matching criteria |
| Traffic blocked after change | Sudden drops after configuration change | Rule misconfiguration                   | Review recent changes and revert to the last version |

## Related resources

* [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/)
* [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/)
* [Network Firewall rule configuration](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/add-policies/)
* [Packet captures](https://developers.cloudflare.com/cloudflare-network-firewall/packet-captures/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/troubleshooting/diagnose-traffic-decisions/#page","headline":"Diagnose traffic decisions · Cloudflare Network Firewall docs","description":"Diagnose why the Network Firewall allowed or blocked traffic.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/troubleshooting/diagnose-traffic-decisions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
