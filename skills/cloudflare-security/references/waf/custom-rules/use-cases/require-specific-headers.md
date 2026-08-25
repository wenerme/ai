---
description: Require specific HTTP headers in incoming requests.
title: Require specific HTTP headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Require specific HTTP headers

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-headers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Many organizations qualify traffic based on the presence of specific HTTP request headers. Use the Rules language [HTTP request header fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Headers&search-term=http.request) to target requests with specific headers.

## Example 1: Require presence of HTTP header

This example custom rule uses the [http.request.headers.names](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.names/) field to look for the presence of an `X-CSRF-Token` header. The [lower()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lower) transformation function converts the header name to lowercase so that the expression is case-insensitive.

When the `X-CSRF-Token` header is missing, Cloudflare blocks the request.

* **When incoming requests match**:
Use the expression editor:
`not any(lower(http.request.headers.names[*])[*] eq "x-csrf-token") and (http.request.full_uri eq "https://www.example.com/somepath")`
* **Then take action**: _Block_

## Example 2: Require HTTP header with a specific value

This example custom rule uses the [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/) field to look for the presence of the `X-Example-Header` header and to get its value (if any). When the `X-Example-Header` header is missing or it does not have the value `example-value`, Cloudflare blocks the request.

* **When incoming requests match**:
Use the expression editor:
`not any(http.request.headers["x-example-header"][*] eq "example-value") and (http.request.uri.path eq "/somepath")`
* **Then take action**: _Block_

The keys in the `http.request.headers` field, corresponding to HTTP header names, are in lowercase.

In this example the header name is case-insensitive, but the header value is case-sensitive.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-headers/#page","headline":"Require specific HTTP headers · Cloudflare Web Application Firewall (WAF) docs","description":"Require specific HTTP headers in incoming requests.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/require-specific-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
```
