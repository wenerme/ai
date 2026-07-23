---
description: Create custom rulesets at the account level and deploy them to multiple zones.
title: Custom rulesets (account level)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom rulesets (account level)

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/account/custom-rulesets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Custom rulesets at the account level require an Enterprise plan.

Custom rulesets are collections of custom rules that you can deploy at the account or [zone level](https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/).

Like [custom rules](https://developers.cloudflare.com/waf/custom-rules/) at the zone level, custom rulesets allow you to control incoming traffic by filtering requests.

Account-level custom rulesets allow you to define a set of custom rules once and apply them across multiple Enterprise zones in your account. Instead of configuring each zone individually, you create a ruleset at the account level and use expressions to control which zones and traffic it applies to.

At the zone level, all customers can create and deploy custom rulesets. Custom rulesets at the account level require an Enterprise plan. For more details, refer to [Availability](https://developers.cloudflare.com/waf/custom-rules/#availability).

## Next steps

Refer to the following pages for more information on working with custom rulesets:

* [Work with custom rulesets in the dashboard](https://developers.cloudflare.com/waf/account/custom-rulesets/create-dashboard/)
* [Work with custom rulesets using the API](https://developers.cloudflare.com/waf/account/custom-rulesets/create-api/)

For Terraform examples, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/#create-and-deploy-a-custom-ruleset).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/custom-rulesets/#page","headline":"Custom rulesets (account level) · Cloudflare Web Application Firewall (WAF) docs","description":"Create custom rulesets at the account level and deploy them to multiple zones.","url":"https://developers.cloudflare.com/waf/account/custom-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
