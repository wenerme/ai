---
description: Protect against SQL injection, XSS, and other OWASP Top 10 vulnerabilities.
title: Block application attacks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Block application attacks

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/application-security/block-attacks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Web applications face constant threats from SQL injection, Cross-Site Scripting (XSS), and other Open Web Application Security Project (OWASP) Top 10 vulnerabilities. Cloudflare WAF managed rulesets block these attacks automatically, and rate limiting prevents brute force abuse.

## Solutions

### Application security (WAF)

Get automatic protection from vulnerabilities and create your own custom rules. [Learn more about WAF](https://developers.cloudflare.com/waf/).

* **Managed rulesets** \- Pre-configured rules covering OWASP Top 10 and emerging threats, updated by Cloudflare
* **Zero-day protection** \- Rules are updated as new vulnerabilities are discovered, with no action required from you
* **Custom rules** \- Block or challenge requests based on any request attribute including headers, cookies, and IP reputation

### Rate limiting

Limit request rates based on flexible matching criteria. [Learn more about rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **Rate limiting** \- Prevent brute force attacks and Application Programming Interface (API) abuse with flexible per-endpoint request limits

## Get started

1. [Deploy WAF managed rulesets](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/)
2. [Create custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/)
3. [Configure rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/)

For custom rules and rate limiting patterns specific to bot traffic, refer to [Stop malicious bots while allowing legitimate traffic (Free, Pro, and Business)](https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/application-security/block-attacks/#page","headline":"Block application attacks · Cloudflare use cases","description":"Protect against SQL injection, XSS, and other OWASP Top 10 vulnerabilities.","url":"https://developers.cloudflare.com/use-cases/application-security/block-attacks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
