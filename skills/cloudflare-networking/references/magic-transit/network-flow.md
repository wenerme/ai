---
description: Monitor Magic Transit traffic with Network Flow.
title: Network Flow
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# Network Flow

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/magic-transit/network-flow/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Magic Transit On Demand](https://developers.cloudflare.com/magic-transit/on-demand/) allows you to keep Magic Transit disabled during normal operations and activate it only when you need DDoS protection. Network Flow monitors your traffic while Magic Transit is off and detects attacks. When an attack is detected, you can enable Magic Transit automatically or manually.

You can create Network Flow rules that monitor specific IP prefixes for DDoS attacks. When an attack is detected, Cloudflare notifies you by email, [webhook](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/), or [PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/).

If you enable [auto-advertisement](#activate-ip-auto-advertisement) on a rule, Magic Transit activates automatically to protect the targeted prefixes. You can enable auto-advertisement for individual Network Flow rules through the dashboard or API.

After Magic Transit activates and your traffic flows through Cloudflare, Cloudflare blocks malicious DDoS traffic. Your origin servers receive only clean traffic through IPsec or GRE tunnels.

The following diagrams illustrate this process:

![The diagram shows the flow of traffic when you send flow data from your network to Cloudflare for analysis.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1435,height=802,format=webp/_astro/1-flowdata.C2Oap_Pf.png)

![Cloudflare automatically notifies you when Cloudflare detects an attack	based on your flow data.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1436,height=761,format=webp/_astro/2-flowdata.DLOwyPqi.png)

![You can create rules to activate Magic Transit automatically, to protect your IP addresses from a DDoS
attack.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1436,height=761,format=webp/_astro/3-flowdata.CiegeHTC.png)

## Activate IP auto-advertisement

Before a rule can automatically activate Magic Transit, you must enable IP advertisement for the relevant prefixes. You can do this through the dashboard or the API.

### Dashboard

To activate IP advertisement through the Cloudflare dashboard, refer to [Configure dynamic advertisement](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#configure-dynamic-advertisement).

### API

To activate IP advertisement through the API, refer to the [IP Address Management Dynamic Advertisement API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement%5Fstatus/methods/edit/).

## Network Flow rules

To create Network Flow rules with auto-advertisement, refer to [Rule Auto-Advertisement](https://developers.cloudflare.com/network-flow/rules/#rule-auto-advertisement).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/network-flow/#page","headline":"Network Flow · Cloudflare Magic Transit docs","description":"Monitor Magic Transit traffic with Network Flow.","url":"https://developers.cloudflare.com/magic-transit/network-flow/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
