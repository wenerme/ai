---
description: How Security filters works in Zero Trust networking.
title: Security filters
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Security filters

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/security/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Once your traffic flows through Cloudflare's network, you can apply security policies to it without deploying additional hardware. Cloudflare WAN (formerly Magic WAN) integrates with two primary security services, each operating at different layers of the network stack.

**[Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)** filters traffic at layers 3 and 4 of the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) — the network and transport layers. You can allow or block traffic based on packet characteristics such as source and destination IP addresses, ports, protocols, and packet length. All Cloudflare WAN customers have [automatic access to Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/plans/).

**[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-gateway/)** inspects traffic at higher layers, including DNS queries, network sessions, and HTTP requests. Use Gateway to set up policies that control Internet-bound traffic and access to your private network infrastructure. Refer to [Connect to Cloudflare Gateway with Cloudflare WAN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-gateway/) to learn how to filter Cloudflare WAN traffic with Gateway policies.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/security/#page","headline":"Enable security filters · Cloudflare One docs","description":"How Security filters works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/security/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
