---
description: How Protocol validation rules works in Gateway.
title: Protocol validation rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Protocol validation rules

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/protocol-validation-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Network Firewall can validate [Session Initiation Protocol (SIP) ↗](https://datatracker.ietf.org/doc/html/rfc2543) traffic — the protocol used to set up voice and video calls over IP networks (VoIP). This lets you inspect whether SIP packets are properly formatted and enforce a positive security model (only allow well-formed SIP traffic, block everything else).

You can use the `sip` field when creating a rule to check whether packets contain valid SIP data, a Layer 7 (L7) protocol. The `sip` field evaluates to `true` for well-formed SIP packets. Refer to [Cloudflare Network Firewall fields](https://developers.cloudflare.com/cloudflare-network-firewall/reference/network-firewall-fields/), specifically the `sip` field, for more information on this topic.

Currently, SIP is the only protocol supported for deep validation. Contact your account manager if you need Cloudflare Network Firewall to support additional protocols.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/protocol-validation-rules/#page","headline":"Protocol validation rules · Cloudflare One docs","description":"How Protocol validation rules works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/protocol-validation-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
