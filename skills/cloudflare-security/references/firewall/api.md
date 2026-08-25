---
description: Manage firewall rules programmatically via APIs.
title: Manage rules via the APIs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage rules via the APIs

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare offers APIs that work together to achieve the same effect as the UI-based **Firewall rules** feature under **Security** \> **WAF**.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

These APIs are the following:

* [**Firewall Rules API**](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/): Manage firewall rules and their actions, based on criteria separately defined through filters.
* [**Filters API**](https://developers.cloudflare.com/firewall/api/cf-filters/): Manage the filters that enable rule matching.
* [**Lists API**](https://developers.cloudflare.com/waf/tools/lists/lists-api/): Manage named lists of items (such as IP addresses) that you can use in the rules of different Cloudflare products.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/firewall/api/#page","headline":"Manage firewall rules via the APIs · Cloudflare Firewall Rules (deprecated) docs","description":"Manage firewall rules programmatically via APIs.","url":"https://developers.cloudflare.com/firewall/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
