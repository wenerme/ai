---
description: Exempt partners from Hotlink Protection using custom rules.
title: Exempt partners from Hotlink Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Exempt partners from Hotlink Protection

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/exempt-partners-hotlink-protection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When enabled, [Cloudflare Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/) blocks all HTTP referrers that are not part of your domain or zone. That presents a problem if you allow partners to use inline links to your assets.

## Allow requests from partners using custom rules

You can use custom rules to protect against hotlinking while allowing inline links from your partners. In this case, you will need to disable [Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/) so that partner referrals are not blocked by that feature.

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) uses the [http.referer](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.referer/) field to target HTTP referrals from partner sites.

The `not` operator matches HTTP referrals that are not from partner sites, and the action blocks them:

* **When incoming requests match**:
Use the expression editor:
`not (http.referer contains "example.com" or http.referer eq "www.example.net" or http.referer eq "www.cloudflare.com")`
* **Then take action**: _Block_

## Allow requests from partners using Configuration Rules

Alternatively, you can [create a configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/) to exclude HTTP referrals from partner sites from Hotlink Protection. In this case, you would keep the Hotlink Protection feature enabled.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/exempt-partners-hotlink-protection/#page","headline":"Exempt partners from Hotlink Protection · Cloudflare Web Application Firewall (WAF) docs","description":"Exempt partners from Hotlink Protection using custom rules.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/exempt-partners-hotlink-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
