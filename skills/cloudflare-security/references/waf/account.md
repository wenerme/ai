---
description: Configure WAF settings at the account level for multiple zones.
title: Account-level WAF configuration
image: https://developers.cloudflare.com/waf/account/og.png?v=32a83b453b7b7c30
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Account-level WAF configuration

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/account/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The account-level Web Application Firewall (WAF) configuration allows you to define a configuration once and apply it to multiple Enterprise zones in your account. Instead of configuring each zone individually, you create rulesets at the account level and use expressions to control which zones and traffic they apply to.

For example, you can deploy a single ruleset that applies to `/admin/*` URI paths across both `example.com` and `example.net`. Rulesets can target all incoming traffic or a specific subset.

At the account level, WAF rules are grouped into rulesets. You can perform the following operations:

- Create and deploy [custom rulesets](https://developers.cloudflare.com/waf/account/custom-rulesets/)
- Create and deploy [rate limiting rulesets](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/)
- Deploy [managed rulesets](https://developers.cloudflare.com/waf/account/managed-rulesets/)

## Availability

Account-level WAF configuration requires an Enterprise plan.

|  | Custom rulesets | Rate limiting rulesets | Managed rulesets |
| --- | --- | --- | --- |
| Availability | Yes | Yes | Yes |
| Maximum number of rulesets | 10 | 10 | Not applicable |
| Maximum number of rules per ruleset | 100 | 10 | Not applicable |

The values in the table are the default limits. Your limits may vary based on the terms of your Enterprise contract.

Custom rulesets also have a total quota of 1,000 rules across all rulesets that a request traverses.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/#page","headline":"Account-level WAF configuration","description":"Configure WAF settings at the account level for multiple zones.","url":"https://developers.cloudflare.com/waf/account/","inLanguage":"en","image":"https://developers.cloudflare.com/waf/account/og.png?v=32a83b453b7b7c30","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
