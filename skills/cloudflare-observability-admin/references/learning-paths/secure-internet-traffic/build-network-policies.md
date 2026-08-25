---
description: Secure Internet traffic and SaaS apps.
title: Build network security policies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Build network security policies

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

After creating policies for security based on DNS resolution, we can layer in additional security controls with the Gateway network firewall, which operates at Layer 4 of the OSI model. The Gateway network firewall allows you to build specific policies to block users or services' ability to connect to endpoints at specific IPs or on specific ports. You can also use [Protocol Detection ↗](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) to block proxying specific protocols.

## Objectives

By the end of this module, you will be able to:

* Creat your first Gateway network policy.
* Add recommended network security policies.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/#page","headline":"Build network security policies · Cloudflare Learning Paths","description":"Secure Internet traffic and SaaS apps.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-network-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
