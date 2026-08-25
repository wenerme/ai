---
description: Deploy WAF managed rulesets for threat protection.
title: Managed Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Managed Rules

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/application-security/firewall/managed-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare provides pre-configured managed rulesets that protect against web application exploits such as the following:

* Zero-day vulnerabilities
* Top-10 attack techniques
* Use of stolen/leaked credentials
* Extraction of sensitive data

Managed rulesets are [regularly updated](https://developers.cloudflare.com/waf/change-log/). Each rule has a default action that varies according to the severity of the rule. You can adjust the behavior of specific rules, choosing from several possible actions.

Rules of managed rulesets have associated tags (such as `wordpress`) that allow you to search for a specific group of rules and configure them in bulk.

## Rulesets

By default, Cloudflare offers the following rulesets:

* [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/)
* [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/)
* [Cloudflare Exposed Credentials Check Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/exposed-credentials-check/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/firewall/managed-rules/#page","headline":"Managed Rules · Cloudflare Learning Paths","description":"Deploy WAF managed rulesets for threat protection.","url":"https://developers.cloudflare.com/learning-paths/application-security/firewall/managed-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
