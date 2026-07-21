---
description: Block R-U-Dead-Yet slow POST attacks with custom rules.
title: Stop R-U-Dead-Yet? (R.U.D.Y.) attacks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

#  Stop R-U-Dead-Yet? (R.U.D.Y.) attacks

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/waf/custom-rules/use-cases/stop-rudy-attacks/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

R-U-Dead-Yet (R.U.D.Y.) attacks accomplish denial of service (DoS) by submitting long form fields. Use custom rules to stop these attacks by blocking requests that do not have a legitimate session cookie.

This example combines three expressions to target HTTP `POST` requests that do not contain a legitimate authenticated session cookie:

* The first expression uses the [http.request.uri.path](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.path/) field to target the paths to secure from R.U.D.Y.:
```txt
http.request.uri.path matches "(comment|conversation|event|poll)/create"
```
* The second uses a regular expression to match the format of a legitimate `auth_session` cookie. The `not` operator targets requests where that cookie is not formatted correctly:
```txt
not http.cookie matches "auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}"
```
* The third expression targets HTTP `POST` requests:
```txt
http.request.method eq "POST"
```

To generate the final [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) expression for this example, the three expressions are combined into a compound expression using the `and` operator. When an HTTP `POST` request to any of the specified URIs does not contain a properly formatted `auth_session` cookie, Cloudflare blocks the request:

* **When incoming requests match**:
Use the expression editor:
`(http.request.method eq "POST" and http.request.uri.path matches "(comment|conversation|event|poll)/create" and not http.cookie matches "auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}")`
* **Then take action**: _Block_

Note

The [matches](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) operator requires a Cloudflare Business or Enterprise plan.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/stop-rudy-attacks/#page","headline":"Stop R-U-Dead-Yet? (R.U.D.Y.) attacks · Cloudflare Web Application Firewall (WAF) docs","description":"Block R-U-Dead-Yet slow POST attacks with custom rules.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/stop-rudy-attacks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
