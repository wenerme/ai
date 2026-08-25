---
description: Manage domain access with IP rules.
title: Control domain access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Control domain access

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/surge-readiness/security/control-domain-access/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) specify an action based on the origin of your user across a single domain or all of the domains in your account.

IP Access Rules can be applied based on:

* IPv4 address or range: Specified in CIDR notation as `/16` or `/24`
* IPv6 address or range: Specified in CIDR notation as `/32`, `/48`, `/64`
* ASN
* Country or the Tor network

Note

We recommend locking down your origin with an Access Control List (ACL) which only allows [Cloudflare IPs ↗](http://www.cloudflare.com/ips).

Actions:

* Block: Ensures that an IP address will never be allowed to access your site.
* Non-Interactive Challenge: Visitors will be shown a non-interactive challenge before allowed access.
* Interactive Challenge: Visitors will be shown an interactive challenge before allowed access.
* Allowlist: Ensures that an IP address will never be blocked from accessing your site. This supersedes any Cloudflare security profile.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/control-domain-access/#page","headline":"Control domain access · Cloudflare Learning Paths","description":"Manage domain access with IP rules.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/control-domain-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
