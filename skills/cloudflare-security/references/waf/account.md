---
description: Configure WAF settings at the account level for multiple zones.
title: Account-level WAF configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Account-level WAF configuration

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/account/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This feature requires an Enterprise plan.

The account-level Web Application Firewall (WAF) configuration allows you to define a configuration once and apply it to multiple Enterprise zones in your account. Instead of configuring each zone individually, you create rulesets at the account level and use expressions to control which zones and traffic they apply to.

For example, you can deploy a single ruleset that applies to `/admin/*` URI paths across both `example.com` and `example.net`. Rulesets can target all incoming traffic or a specific subset.

At the account level, WAF rules are grouped into rulesets. You can perform the following operations:

* Create and deploy [custom rulesets](https://developers.cloudflare.com/waf/account/custom-rulesets/)
* Create and deploy [rate limiting rulesets](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/)
* Deploy [managed rulesets](https://developers.cloudflare.com/waf/account/managed-rulesets/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/#page","headline":"Account-level WAF configuration · Cloudflare Web Application Firewall (WAF) docs","description":"Configure WAF settings at the account level for multiple zones.","url":"https://developers.cloudflare.com/waf/account/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
