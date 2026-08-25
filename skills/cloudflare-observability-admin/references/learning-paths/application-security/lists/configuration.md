---
description: Configure rules with advanced settings.
title: Configurations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Configurations

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/application-security/lists/configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Both Custom and Managed Lists are located in the account settings. Refer to [Features by plan type](https://developers.cloudflare.com/learning-paths/application-security/lists/features/) for more information on plan eligibility.

## Custom Lists

Using a Custom List is an alternative to creating individual Firewall rules with long lists of IP addresses or other types of identifiers. They are easier to read and update, especially when they are used across many security rules. Lists are often used in conjunction with in-house or third party security feeds.

## Managed Lists

The following lists are managed by the Cloudflare team and are regularly updated.

| Display name                                    | Name in expressions | Description                                                                                                                         |
| ----------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Open Proxies                         | cf.open\_proxies    | IP addresses of known open HTTP and SOCKS proxy endpoints, which are frequently used to launch attacks and hide attackers identity. |
| Cloudflare Anonymizers                          | cf.anonymizer       | IP addresses of known anonymizers (Open SOCKS Proxies, VPNs, and TOR nodes).                                                        |
| Cloudflare VPNs                                 | cf.vpn              | IP addresses of known VPN servers.                                                                                                  |
| Cloudflare Malware                              | cf.malware          | IP addresses of known sources of malware.                                                                                           |
| Cloudflare Botnets, Command and Control Servers | cf.botnetcc         | IP addresses of known botnet command-and-control servers.                                                                           |


## Creating a rule

Refer to [Use lists in expressions](https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/) to learn how to invoke a Managed List.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/application-security/lists/configuration/#page","headline":"Configurations · Cloudflare Learning Paths","description":"Configure rules with advanced settings.","url":"https://developers.cloudflare.com/learning-paths/application-security/lists/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
