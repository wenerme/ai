---
description: Learn how Cloudflare Firewall Rules work.
title: About
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# About

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/cf-firewall-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Firewall Rules is a flexible and intuitive framework for filtering HTTP requests. It gives you fine-grained control over which requests reach your applications, proactively inspecting incoming site traffic and automatically responding to threats.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

In a firewall rule you define an [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that tells Cloudflare what to look for in a request, and specify the appropriate [action](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/) to take when those conditions are met. Expressions can reference [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) \- groups of IP addresses that you can reference collectively by name.

To write firewall rule expressions, use the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/), a powerful expression language inspired in the Wireshark Display Filter language.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/cf-firewall-rules/#page","headline":"About Cloudflare Firewall Rules · Cloudflare Firewall Rules (deprecated) docs","description":"Learn how Cloudflare Firewall Rules work.","url":"https://developers.cloudflare.com/firewall/cf-firewall-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
