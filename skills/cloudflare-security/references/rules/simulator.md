---
description: Simulate an HTTP/S request through Cloudflare to see which rules match and apply.
title: Rules simulator
image: https://developers.cloudflare.com/rules/simulator/og.png?v=2dfb29b27626e805
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Rules simulator

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/rules/simulator/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Available on all plans

Rules simulator (Beta) simulates an HTTP/S request through Cloudflare's network to your origin server. Use this tool to understand how your Cloudflare configurations (such as rules, caching, and security settings) would affect a specific request. If the hostname you are testing is not [proxied by Cloudflare](https://developers.cloudflare.com/dns/proxy-status/), Rules simulator will still return all the configurations that Cloudflare would have applied to the request.

You can define specific request properties to simulate different conditions for an HTTP/S request. Rules that are turned off in Cloudflare products will not be evaluated.

Rules simulator is available to users with an Administrator or Super Administrator role.

## When to use Rules simulator

Use Rules simulator when you need to test what would happen with a simulated request:

- Understanding why a rule did not trigger as expected
- Testing how your rules handle different request scenarios
- Seeing the evaluation order of your rules
- Simulating requests from different geolocations or conditions
- Confirming that WAF, cache, and firewall rules will not block or modify a specific path before you turn on a new feature — for example, checking that WAF custom rules or rate limiting rules will not intercept your [Google tag gateway for advertisers](https://developers.cloudflare.com/google-tag-gateway/) measurement path

Use [Log Explorer](https://developers.cloudflare.com/observability/logs/log-explorer/) when you need to investigate what actually happened with real production traffic:

- Analyzing historical data and trends
- Investigating security incidents after they occur
- Searching for patterns across thousands of requests
- Monitoring application performance over time
- Providing forensic evidence to support teams

The key difference is that Rules simulator simulates "what-if" scenarios, while Log Explorer shows actual historical traffic.

## Resources

- [Use Rules simulator](https://developers.cloudflare.com/rules/simulator/how-to/)
- [Rules simulator limitations](https://developers.cloudflare.com/rules/simulator/limitations/)
- [Rules simulator changelog](https://developers.cloudflare.com/rules/simulator/changelog/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/simulator/#page","headline":"Rules simulator","description":"Simulate an HTTP/S request through Cloudflare to see which rules match and apply.","url":"https://developers.cloudflare.com/rules/simulator/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/simulator/og.png?v=2dfb29b27626e805","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
