---
description: How Magic Transit egress works in Gateway.
title: Magic Transit egress
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Magic Transit egress

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/magic-transit-egress/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The suggestions in the [Minimal ruleset](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/minimal-ruleset) and [Extended ruleset](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/extended-ruleset) are recommendations for ingress (incoming) traffic. This page covers the additional consideration needed for egress (outgoing) traffic.

Cloudflare Network Firewall does not track connection state (it is not "stateful"). A stateful firewall automatically allows return traffic for active connections — for example, if you send a request outbound, the response is allowed back in. Because Network Firewall is not stateful, each packet — whether ingress or egress — is evaluated independently against your rules. This means ingress block rules can inadvertently block egress traffic.

For Magic Transit egress traffic, consider the following:

* Network Firewall rules apply to both Magic Transit ingress and egress traffic passing through Cloudflare.
* If you have a "default drop" catchall rule (a final rule that blocks all traffic not matched by earlier rules) for ingress traffic, you must add an earlier rule to permit traffic sourced from your Magic Transit prefix with the destination as **any** to allow outbound egress traffic.
For example, place the following allow rule before any default-drop catchall rule:

**Match**: `ip.src in {<YOUR_MAGIC_TRANSIT_PREFIX>}`
**Action**: Allow

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/magic-transit-egress/#page","headline":"Magic Transit egress · Cloudflare One docs","description":"How Magic Transit egress works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/best-practices/magic-transit-egress/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
