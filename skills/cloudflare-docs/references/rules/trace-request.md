---
title: Trace a request
description: Trace a request through Cloudflare to see which rules match and apply.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/trace-request/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Trace a request

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

* [ Use Cloudflare Trace ](https://developers.cloudflare.com/rules/trace-request/how-to/)
* [ Cloudflare Trace limitations ](https://developers.cloudflare.com/rules/trace-request/limitations/)
* [ Cloudflare Trace changelog ](https://developers.cloudflare.com/rules/trace-request/changelog/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/trace-request/","name":"Trace a request"}}]}
```
