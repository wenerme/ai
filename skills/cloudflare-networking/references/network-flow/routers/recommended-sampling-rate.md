---
description: The best sampling rate recommendations for your network's traffic volume.
title: Recommended sampling rate
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt
> Use this file to discover all available pages before exploring further.

# Recommended sampling rate

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network-flow/routers/recommended-sampling-rate/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Your router samples the traffic that passes through it to create NetFlow or sFlow data. The sampling rate determines how frequently your router captures a packet — for example, a rate of 1 in 100 means your router captures one out of every 100 packets.

Sampling more frequently (lower ratios like 1 in 100) produces more accurate flow data but uses more router memory and CPU. Sampling less frequently (higher ratios like 1 in 4,000) reduces resource usage and is suitable for networks with larger traffic volumes.

The following table provides general recommendations based on your traffic volume. Test different sampling rates to find the best option for your network.

| Traffic Volume | Router sampling recommendation              |
| -------------- | ------------------------------------------- |
| Low            | Between 1 in 100 packets - 1 in 500 packets |
| Medium         | Between 1 in 1,000 - 1 in 2,000 packets     |
| High           | Between 1 in 2,000 - 1 in 4,000 packets     |

As a general rule, you may notice a loss in data accuracy (depending on your network volume) when your network flow sampling rate exceeds 1 in 5,000 packets.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network-flow/routers/recommended-sampling-rate/#page","headline":"Recommended sampling rate · Cloudflare Network Flow docs","description":"The best sampling rate recommendations for your network's traffic volume.","url":"https://developers.cloudflare.com/network-flow/routers/recommended-sampling-rate/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["NetFlow"]}
```
