---
title: Perform mobile redirects
description: Create a redirect rule to redirect visitors using mobile devices to a different hostname.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/examples/perform-mobile-redirects.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Perform mobile redirects

Create a redirect rule to redirect visitors using mobile devices to a different hostname.

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/perform-mobile-redirects/","name":"Perform mobile redirects"}}]}
```
