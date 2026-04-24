---
title: Allow traffic from search engine bots
description: Allow traffic from search engine and verified bots.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/custom-rules/use-cases/allow-traffic-from-verified-bots.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Allow traffic from search engine bots

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/allow-traffic-from-verified-bots/","name":"Allow traffic from search engine bots"}}]}
```
