---
description: Pre-built lists managed by Cloudflare for use in rule expressions.
title: Managed Lists
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Managed Lists

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/tools/lists/managed-lists/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare provides Managed Lists you can use in rule expressions. These lists are regularly updated.

Note

This feature requires an Enterprise plan.

## Managed IP Lists

Use Managed IP Lists to access Cloudflare's IP threat intelligence.

Cloudflare provides the following Managed IP Lists:

| Display name                                    | Name in expressions | Description                                                                                                                         |
| ----------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Open Proxies                         | cf.open\_proxies    | IP addresses of known open HTTP and SOCKS proxy endpoints, which are frequently used to launch attacks and hide attackers identity. |
| Cloudflare Anonymizers                          | cf.anonymizer       | IP addresses of known anonymizers (Open SOCKS Proxies, VPNs, and TOR nodes).                                                        |
| Cloudflare VPNs                                 | cf.vpn              | IP addresses of known VPN servers.                                                                                                  |
| Cloudflare Malware                              | cf.malware          | IP addresses of known sources of malware.                                                                                           |
| Cloudflare Botnets, Command and Control Servers | cf.botnetcc         | IP addresses of known botnet command-and-control servers.                                                                           |


Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/lists/managed-lists/#page","headline":"Managed Lists · Cloudflare Web Application Firewall (WAF) docs","description":"Pre-built lists managed by Cloudflare for use in rule expressions.","url":"https://developers.cloudflare.com/waf/tools/lists/managed-lists/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
