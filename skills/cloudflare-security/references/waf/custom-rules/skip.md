---
description: Use the Skip action to bypass security features for matching requests.
title: Configure a rule with the Skip action
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure a rule with the Skip action

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/skip/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the _Skip_ action in a custom rule to skip one or more security features. A rule configured with the _Skip_ action is also known as a skip rule.

Skip rules allow specific requests to bypass security features that would otherwise block or challenge them. Use skip rules when legitimate traffic matches a security rule unintentionally. For example, to allow a trusted API client through [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), or to exempt an internal monitoring service from [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

You can skip [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/), [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) rules, and several other security products. However, you cannot skip [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) (available on the Free plan).

For more information on the available options, refer to [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/).

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. [Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) by selecting **Create rule** \> **Custom rules**, or edit an existing custom rule.
3. Define the rule name and the rule expression.
4. Under **Choose action**, select _Skip_ from the dropdown.
![Available Skip action options when configuring a custom rule](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=900,height=670,format=webp/_astro/skip-action-options.N8Emdhwv.png)
5. Configure the desired [skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/).
6. Save your changes.

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to configure custom rules via API.

Refer to [API examples](https://developers.cloudflare.com/waf/custom-rules/skip/api-examples/) for examples of creating skip rules.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/skip/#page","headline":"Configure a custom rule with the Skip action · Cloudflare Web Application Firewall (WAF) docs","description":"Use the Skip action to bypass security features for matching requests.","url":"https://developers.cloudflare.com/waf/custom-rules/skip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
