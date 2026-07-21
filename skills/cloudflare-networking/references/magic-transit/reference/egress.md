---
description: How Magic Transit handles egress traffic.
title: Egress traffic
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

#  Egress traffic

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/magic-transit/reference/egress/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

If you have implemented Magic Transit with egress traffic, consider the following technical aspects to create a successful connection to Cloudflare.

* The source IP for [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) you send to Cloudflare must come from your Magic Transit prefix. If you have Magic Transit [leased IPs](https://developers.cloudflare.com/magic-transit/cloudflare-ips/) or [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/) prefixes, you can choose whether to implement a Network Address Translation (NAT) on your edge device, or use the prefix as a routed Local Area Network (LAN) interface on your side.
* Cloudflare recommends that you create policy-based routing (PBR) rules to ensure that only traffic from your BYOIP prefixes or Magic Transit leased IP addresses goes through your GRE/IPsec tunnels to Cloudflare for egress to the Internet. Cloudflare only accepts egress traffic from authorized prefixes. As such, your PBR policies need to align with this. If implementing PBR is not feasible and you need to implement a default-route through the Magic Transit tunnels, ensure the routes for your tunnel destination anycast IPs go through your underlay transit path.
* You need a tunnel failure detection mechanism to re-route your PBR traffic. This ensures your device re-routes packets if a failure occurs in the upstream channel to Cloudflare. For example, you might configure your device to ping the other side of the tunnel or send a probe to an Internet website. When the probe fails, you want your device to deprecate the PBR forwarding-path, and switch to a backup tunnel. Refer to your equipment's configuration guide to learn how to implement this.
* You may need to configure multiple GRE/IPsec tunnels to load-share traffic sent to the Internet through Cloudflare. You can achieve this by applying two different PBR rules. Thus, traffic from one IP/subnet goes through one tunnel, and traffic from another IP/subnet goes through a different tunnel.
* Your Cloudflare Network Firewall rules will apply in both directions. Ensure you set up your Cloudflare Network Firewall rules for your intended traffic flows, both in and out.
* If using Magic Transit egress, we recommend you set your GRE or IPsec tunnel health check configuration to [bidirectional](https://developers.cloudflare.com/magic-transit/how-to/configure-tunnel-endpoints/#add-tunnels), so that Cloudflare health checks are in sync with the [data plane ↗](https://en.wikipedia.org/wiki/Forwarding%5Fplane) traffic flow.
* Once you configure your traffic to egress through the GRE/IPsec tunnel, Cloudflare encapsulates it and sends it to a Cloudflare anycast endpoint. Your Internet Service Provider (ISP) then routes the encapsulated traffic to the nearest available Cloudflare point of presence (PoP), where it exits to the Internet through Cloudflare's connectivity options at that location.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/reference/egress/#page","headline":"Egress traffic · Cloudflare Magic Transit docs","description":"How Magic Transit handles egress traffic.","url":"https://developers.cloudflare.com/magic-transit/reference/egress/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
