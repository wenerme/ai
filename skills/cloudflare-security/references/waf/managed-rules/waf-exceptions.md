---
description: Skip WAF managed rules for specific requests with exceptions.
title: Create exceptions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Create exceptions

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Create an exception to skip the execution of WAF managed rulesets or some of their rules. The exception configuration includes an expression that defines the skip conditions, and the rules or rulesets to skip under those conditions.

## Types of exceptions

An exception can have one of the following behaviors (from highest to lowest priority):

* Skip all remaining rules (belonging to WAF managed rulesets)
* Skip one or more WAF managed rulesets
* Skip one or more rules of WAF managed rulesets

For more information on exceptions, refer to [Create an exception](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/create-exception/) in the Ruleset Engine documentation.

## Scope and execution order

You can define exceptions at the account level and at the zone level. The scope of an exception determines which rules it affects:

* An account-level exception only skips rules configured at the account level. It does not affect zone-level rules.
* A zone-level exception only skips rules configured at the zone level. It does not affect account-level rules.

Within each phase, account-level rulesets run before zone-level rulesets. This means that if you deploy managed rules at both the account level and the zone level, a request is evaluated against account-level rules first. An exception defined at the zone level will not prevent a match at the account level.

For more information on how WAF features run in sequence, refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/).

Note

Exceptions apply to WAF managed rulesets only. To skip other security features such as [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) or [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/), create a custom rule with the [skip action](https://developers.cloudflare.com/waf/custom-rules/skip/) and select the specific products you want to skip.

## Next steps

Add exceptions [in the Cloudflare dashboard](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-dashboard/) or [via API](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-api/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/#page","headline":"Create WAF exceptions · Cloudflare Web Application Firewall (WAF) docs","description":"Skip WAF managed rules for specific requests with exceptions.","url":"https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
