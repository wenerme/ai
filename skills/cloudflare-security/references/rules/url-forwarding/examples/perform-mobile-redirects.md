---
description: Create a redirect rule to redirect visitors using mobile devices to a different hostname.
title: Perform mobile redirects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Perform mobile redirects

Create a redirect rule to redirect visitors using mobile devices to a different hostname.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/perform-mobile-redirects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following examples will redirect visitors using mobile devices — based on the request user agent string — to a different hostname.

## Redirect mobile users dropping the original URI path

This example static redirect will redirect requests for the current zone (`example.com`) from mobile users to `m.example.com` without preserving the URI path in the original HTTP request.

**When incoming requests match**

* Enter the following expression in the [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor):
`not http.host in {"m.example.com"} and (http.user_agent contains "mobi" or http.user_agent contains "Mobi")`

**Then**

* **Type:** _Static_
* **URL:** `m.example.com`
* **Status code:** _301_

Notes about this example:

* The `not http.host in {"m.example.com"}` condition prevents redirect loops.
* The user agent condition follows [Mozilla's recommendation ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent/Firefox#device-specific%5Fuser%5Fagent%5Fstrings) for identifying mobile devices.
* The **Then** \> **URL** value should be the same as the one you entered in the `http.host` condition of the rule's filter expression.
* You can redirect users to other zones on Cloudflare or to other hostnames not on Cloudflare.

## Redirect mobile users keeping the original path

This example single redirect will redirect requests for the current zone (`example.com`) from mobile users to `m.example.com`, keeping the URI path of the original HTTP request.

**When incoming requests match**

* Enter the following expression in the [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor):
`not http.host in {"m.example.com"} and (http.user_agent contains "mobi" or http.user_agent contains "Mobi")`

**Then**

* **Type:** _Dynamic_
* **Expression:** `concat("https://m.example.com", http.request.uri.path)`
* **Status code:** _301_

Notes about this example:

* The `not http.host in {"m.example.com"}` condition prevents redirect loops.
* The user agent condition follows [Mozilla's recommendation ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent/Firefox#device-specific%5Fuser%5Fagent%5Fstrings) for identifying mobile devices.
* The hostname in **Then** \> **Expression** should be the same as the one you entered in the `http.host` condition of the rule's filter expression.
* Depending on your use case, you may want to enable **Then** \> **Preserve query string** to also keep the query string of the original request.
* You can redirect users to other zones on Cloudflare or to other hostnames not on Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/perform-mobile-redirects/#page","headline":"Perform mobile redirects · Cloudflare Rules docs","description":"Create a redirect rule to redirect visitors using mobile devices to a different hostname.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/perform-mobile-redirects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
