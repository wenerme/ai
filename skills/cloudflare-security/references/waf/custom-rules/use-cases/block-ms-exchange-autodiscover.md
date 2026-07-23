---
description: Block Microsoft Exchange Autodiscover requests.
title: Block Microsoft Exchange Autodiscover requests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Block Microsoft Exchange Autodiscover requests

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-ms-exchange-autodiscover/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In some cases, Microsoft Exchange Autodiscover service requests can be "noisy", triggering large numbers of `HTTP 404` (`Not found`) errors.

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests for `autodiscover.xml` and `autodiscover.src`:

* **When incoming requests match**:
Use the expression editor:
`(ends_with(http.request.uri.path, "/autodiscover.xml") or ends_with(http.request.uri.path, "/autodiscover.src"))`
* **Then take action**: _Block_

Alternatively, customers on a Business or Enterprise plan can use the `matches` [comparison operator](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) for the same purpose. For this example, the expression would be the following:

```txt
(http.request.uri.path matches "/autodiscover.(xml|src)$")
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-ms-exchange-autodiscover/#page","headline":"Block Microsoft Exchange Autodiscover requests · Cloudflare Web Application Firewall (WAF) docs","description":"Block Microsoft Exchange Autodiscover requests.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-ms-exchange-autodiscover/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
```
