---
description: Configure Network Firewall for Magic Transit egress traffic.
title: Magic Transit egress
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt
> Use this file to discover all available pages before exploring further.

#  Magic Transit egress

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/magic-transit-egress/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The suggestions in the [Minimal ruleset](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/minimal-ruleset/) and [Extended ruleset](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/extended-ruleset/) are recommendations for ingress traffic.

For Magic Transit egress traffic, consider the following information:

* The Cloudflare Network Firewall (formerly Magic Firewall) rules will apply to both Magic Transit ingress and egress traffic passing via Cloudflare.
* Network Firewall is not stateful for your Magic Transit egress traffic.
* Network Firewall is not stateful in both directions after DDoS mitigations.
* If you have a Network Firewall "default drop" catchall rule for ingress traffic, you will need to add an earlier rule to permit traffic sourced from your Magic Transit prefix with the destination as **any** to allow outbound egress traffic.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/magic-transit-egress/#page","headline":"Magic Transit egress · Cloudflare Network Firewall docs","description":"Configure Network Firewall for Magic Transit egress traffic.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/magic-transit-egress/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
