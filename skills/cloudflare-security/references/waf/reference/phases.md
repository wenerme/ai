---
description: WAF rule execution phases and their order of evaluation.
title: WAF phases
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# WAF phases

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/reference/phases/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Web Application Firewall provides the following [phases](https://developers.cloudflare.com/ruleset-engine/about/phases/) where you can create rulesets and rules:

* `http_request_firewall_custom`
* `http_ratelimit`
* `http_request_firewall_managed`

These phases exist both at the account level and at the zone level. Considering the available phases and the two different levels, rules will be evaluated in the following order:

| Security feature                                                                                | Scope   | Phase                            | Ruleset kind                 | Location in the dashboard                                                                                               |
| ----------------------------------------------------------------------------------------------- | ------- | -------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [Custom rulesets](https://developers.cloudflare.com/waf/account/custom-rulesets/)               | Account | http\_request\_firewall\_custom  | custom (create)root (deploy) | [Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf) \> **Custom rulesets** tab        |
| [Custom rules](https://developers.cloudflare.com/waf/custom-rules/)                             | Zone    | http\_request\_firewall\_custom  | zone                         | [Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)                   |
| [Rate limiting rulesets](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/) | Account | http\_ratelimit                  | root                         | [Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf) \> **Rate limiting rulesets** tab |
| [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)               | Zone    | http\_ratelimit                  | zone                         | [Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)                   |
| [Managed rulesets](https://developers.cloudflare.com/waf/account/managed-rulesets/)             | Account | http\_request\_firewall\_managed | root                         | [Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf) \> **Managed rulesets** tab       |
| [Managed rules](https://developers.cloudflare.com/waf/managed-rules/)                           | Zone    | http\_request\_firewall\_managed | zone                         | [Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)                   |

| Security feature                                                                                | Scope   | Phase                            | Ruleset kind                 | Location in the dashboard                                                                                               |
| ----------------------------------------------------------------------------------------------- | ------- | -------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [Custom rulesets](https://developers.cloudflare.com/waf/account/custom-rulesets/)               | Account | http\_request\_firewall\_custom  | custom (create)root (deploy) | [Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf) \> **Custom rulesets** tab        |
| [Custom rules](https://developers.cloudflare.com/waf/custom-rules/)                             | Zone    | http\_request\_firewall\_custom  | zone                         | Your zone > **Security** \> **WAF** \> **Custom rules** tab                                                             |
| [Rate limiting rulesets](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/) | Account | http\_ratelimit                  | root                         | [Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf) \> **Rate limiting rulesets** tab |
| [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)               | Zone    | http\_ratelimit                  | zone                         | Your zone > **Security** \> **WAF** \> **Rate limiting rules** tab                                                      |
| [Managed rulesets](https://developers.cloudflare.com/waf/account/managed-rulesets/)             | Account | http\_request\_firewall\_managed | root                         | [Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf) \> **Managed rulesets** tab       |
| [Managed rules](https://developers.cloudflare.com/waf/managed-rules/)                           | Zone    | http\_request\_firewall\_managed | zone                         | Your zone > **Security** \> **WAF** \> **Managed rules** tab                                                            |

To learn more about phases, refer to [Phases](https://developers.cloudflare.com/ruleset-engine/about/phases/) in the Ruleset Engine documentation.

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/reference/phases/#page","headline":"WAF phases · Cloudflare Web Application Firewall (WAF) docs","description":"WAF rule execution phases and their order of evaluation.","url":"https://developers.cloudflare.com/waf/reference/phases/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
