---
title: Troubleshoot Transform Rules
description: Resolve common issues with Transform Rules.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Troubleshoot Transform Rules

When troubleshooting a rule configuration, review the [Transform Rules evaluation](https://developers.cloudflare.com/rules/transform/#transform-rules-evaluation) section to understand how and when your Transform Rule is evaluated for each request.

For more information on runtime errors related to Transform Rules configuration, refer to [Cloudflare 1xxx errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/).

## Why do I not see my request header modifications?

Transform Rules performing request header modifications affect the HTTP headers sent by Cloudflare's network to your origin server. You will not find these headers in your browser request or response data, which can make it difficult to tell if the rule is working as intended.

To check if a request header transform rule is taking effect, you can check the logs on your origin server or use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to check that the rule is matching traffic correctly. Since [Cloudflare Logpush](https://developers.cloudflare.com/logs/logpush/) only logs original HTTP request/response headers, Logpush logs will not include any header transformations done via Transform Rules.

To add HTTP headers that website visitors will receive in their browsers, you must [modify the response headers](https://developers.cloudflare.com/rules/transform/response-header-modification/) instead.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/troubleshooting/","name":"Troubleshoot Transform Rules"}}]}
```
