---
title: Remove locale from URL path
description: Create a redirect rule to redirect visitors from an old URL format with locale information to a new URL format.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/examples/remove-locale-url.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Remove locale from URL path

Create a redirect rule to redirect visitors from an old URL format with locale information to a new URL format.

This example single redirect for zone `example.com` will redirect visitors from an old URL format that included the locale (for example, `/en-us/<page_name>`) to the new format `/<page_name>`.

**When incoming requests match**

* **Field:** _URI Path_
* **Operator:** _matches regex_
* **Value:** `^/[A-Za-z]{2}-[A-Za-z]{2}/`

If you are using the Expression Editor, enter the following expression:  
`http.request.uri.path matches "^/[A-Za-z]{2}-[A-Za-z]{2}/"`

**Then**

* **Type:** _Dynamic_
* **Expression:** `regex_replace(http.request.uri.path, "^/[A-Za-z]{2}-[A-Za-z]{2}/(.*)", "/${1}")`
* **Status code:** _301_
* **Preserve query string:** Enabled

The function [regex\_replace()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#regex%5Freplace) allows you to extract parts of the URL using regular expressions' capture groups. Create capture groups by putting part of the regular expression in parentheses. Then, reference a capture group using `${<num>}` in the replacement string, where `<num>` is the number of the capture group.

For example, the redirect rule would perform the following redirects:

| Request URL                           | Target URL                      | Status code |
| ------------------------------------- | ------------------------------- | ----------- |
| example.com/en-us/meet-our-team       | example.com/meet-our-team       | 301         |
| example.com/pt-BR/meet-our-team       | example.com/meet-our-team       | 301         |
| example.com/en-us/calendar?view=month | example.com/calendar?view=month | 301         |
| example.com/meet-our-team             | (unchanged)                     | n/a         |
| example.com/robots.txt                | (unchanged)                     | n/a         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/remove-locale-url/","name":"Remove locale from URL path"}}]}
```
