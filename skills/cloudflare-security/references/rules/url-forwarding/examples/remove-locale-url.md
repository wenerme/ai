---
description: Create a redirect rule to redirect visitors from an old URL format with locale information to a new URL format.
title: Remove locale from URL path
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Remove locale from URL path

Create a redirect rule to redirect visitors from an old URL format with locale information to a new URL format.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/remove-locale-url/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/remove-locale-url/#page","headline":"Remove locale from URL path · Cloudflare Rules docs","description":"Create a redirect rule to redirect visitors from an old URL format with locale information to a new URL format.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/remove-locale-url/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects","Localization"]}
```
