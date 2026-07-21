---
description: Learn about enable cloudflare network firewall in this guide.
title: Enable Cloudflare Network Firewall
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

#  Enable Cloudflare Network Firewall

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/learning-paths/data-center-protection/enable-network-firewall/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Magic Transit customers are automatically provided with the [standard features](https://developers.cloudflare.com/cloudflare-network-firewall/plans/#standard-features) of Cloudflare Network Firewall, Cloudflare's firewall-as-a-service product.

Cloudflare recommends creating a ruleset customized to your environment and needs. Without any rules configured, Cloudflare Network Firewall will pass on all traffic after mitigations are applied to your tunnels.

The [Extended ruleset](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/extended-ruleset/) is the best practice for reducing your attack surface by adopting a positive security model. If possible, use your current Edge Firewall policies to help you decide what ports to permit/block.

If you cannot use the extended ruleset, then use the [minimal ruleset guidance](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/minimal-ruleset/) to create a customized ruleset to block known unwanted traffic and common vectors for attack.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/enable-network-firewall/#page","headline":"Enable Cloudflare Network Firewall · Cloudflare Learning Paths","description":"Learn about enable cloudflare network firewall in this guide.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/enable-network-firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
