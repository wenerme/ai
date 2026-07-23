---
description: Require a specific cookie value in incoming requests.
title: Require a specific cookie
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Require a specific cookie

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-cookie/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To secure a sensitive area such as a development area, you can share a cookie with trusted individuals and then filter requests so that only users with that cookie can access your site.

Use the [http.cookie](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.cookie/) field to target requests based on the presence of a specific cookie.

This example comprises two [custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/):

* Rule #1 targets requests to `dev.www.example.com` that have a specific cookie key, `devaccess`. As long as the value of the cookie key contains one of three authorized users — `james`, `matt`, or `michael` — the expression matches and the request is allowed, skipping all other custom rules.
* Rule #2 blocks all access to `dev.www.example.com`.

Since custom rules are evaluated in order, Cloudflare grants access to requests that satisfy rule 1 and blocks all other requests to `dev.www.example.com`:

**Rule #1:**

* **When incoming requests match**:
Use the expression editor:
`(http.cookie contains "devaccess=james" or http.cookie contains "devaccess=matt" or http.cookie contains "devaccess=michael") and http.host eq "dev.www.example.com"`
* **Then take action**: _Skip:_

  * _All remaining custom rules_

**Rule #2:**

* **When incoming requests match**:

| Field    | Operator | Value               |
| -------- | -------- | ------------------- |
| Hostname | equals   | dev.www.example.com |
If using the expression editor:
`(http.host eq "dev.www.example.com")`
* **Then take action**: _Block_

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-cookie/#page","headline":"Require a specific cookie · Cloudflare Web Application Firewall (WAF) docs","description":"Require a specific cookie value in incoming requests.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-cookie/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
