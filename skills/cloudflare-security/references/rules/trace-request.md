---
description: Trace a request through Cloudflare to see which rules match and apply.
title: Trace a request
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Trace a request

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/trace-request/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Available on all plans

Cloudflare Trace (Beta) simulates an HTTP/S request through Cloudflare's network to your origin server. Use this tool to understand how your Cloudflare configurations (such as rules, caching, and security settings) would affect a specific request. If the hostname you are testing is not [proxied by Cloudflare](https://developers.cloudflare.com/dns/proxy-status/), Cloudflare Trace will still return all the configurations that Cloudflare would have applied to the request.

You can define specific request properties to simulate different conditions for an HTTP/S request. Rules that are turned off in Cloudflare products will not be evaluated.

Cloudflare Trace is available to users with an Administrator or Super Administrator role.

## When to use Trace

Use Trace when you need to test what would happen with a simulated request:

* Understanding why a rule did not trigger as expected
* Testing how your rules handle different request scenarios
* Seeing the evaluation order of your rules
* Simulating requests from different geolocations or conditions

Use [Log Explorer](https://developers.cloudflare.com/log-explorer/) when you need to investigate what actually happened with real production traffic:

* Analyzing historical data and trends
* Investigating security incidents after they occur
* Searching for patterns across thousands of requests
* Monitoring application performance over time
* Providing forensic evidence to support teams

The key difference is that Trace simulates "what-if" scenarios, while Log Explorer shows actual historical traffic.

## Resources

* [Use Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/how-to/)
* [Cloudflare Trace limitations](https://developers.cloudflare.com/rules/trace-request/limitations/)
* [Cloudflare Trace changelog](https://developers.cloudflare.com/rules/trace-request/changelog/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/trace-request/#page","headline":"Trace a request with Cloudflare Trace · Cloudflare Rules docs","description":"Trace a request through Cloudflare to see which rules match and apply.","url":"https://developers.cloudflare.com/rules/trace-request/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
