---
description: Allow traffic from search engine and verified bots.
title: Allow traffic from search engine bots
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Allow traffic from search engine bots

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) challenges requests from a list of countries, but allows traffic from search engine bots — such as Googlebot and Bingbot — and from other [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

The rule expression uses the [cf.client.bot](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.client.bot/) field to determine if the request originated from a known good bot or crawler.

* **When incoming requests match**:

| Field      | Operator | Value                 | Logic |
| ---------- | -------- | --------------------- | ----- |
| Country    | is in    | Mexico, United States | And   |
| Known Bots | equals   | false                 |       |
If you are using the expression editor:
`(ip.src.country in {"US" "MX"} and not cf.client.bot)`
* **Then take action**: _Managed Challenge_

## Other resources

* [Use case: Challenge bad bots](https://developers.cloudflare.com/waf/custom-rules/use-cases/challenge-bad-bots/)
* [Cloudflare bot solutions](https://developers.cloudflare.com/bots/)
* [Troubleshooting: Bing's Site Scan blocked by a WAF managed rule](https://developers.cloudflare.com/waf/troubleshooting/blocked-bing-site-scans/)
* [Learning Center: What is a web crawler? ↗](https://www.cloudflare.com/learning/bots/what-is-a-web-crawler/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/#page","headline":"Allow traffic from search engine bots and other verified bots · Cloudflare Web Application Firewall (WAF) docs","description":"Allow traffic from search engine and verified bots.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
