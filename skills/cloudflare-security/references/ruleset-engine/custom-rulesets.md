---
description: Create, deploy, and manage custom rulesets using the API.
title: Work with custom rulesets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Work with custom rulesets

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the following workflow to deploy a custom ruleset:

1. [Create a custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/create-custom-ruleset/), optionally providing a list of rules to include in the custom ruleset.
2. (Optional) [Add rules to your custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/add-rules-ruleset/).
3. [Deploy the custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/deploy-custom-ruleset/) by adding an `execute` rule to a phase entry point ruleset. If you skip this step, the rules of the custom ruleset will not run.

Currently, custom rulesets are only supported by the [Cloudflare WAF](https://developers.cloudflare.com/waf/), both at the account and the zone level.

Note

You cannot execute a custom ruleset from another custom ruleset, only from an [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset).

## Change the behavior of a custom ruleset

To modify custom ruleset behavior, Cloudflare recommends [creating a new custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/create-custom-ruleset/) or [editing the custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/add-rules-ruleset/) instead of using overrides.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ruleset-engine/custom-rulesets/#page","headline":"Work with custom rulesets · Cloudflare Ruleset Engine docs","description":"Create, deploy, and manage custom rulesets using the API.","url":"https://developers.cloudflare.com/ruleset-engine/custom-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
