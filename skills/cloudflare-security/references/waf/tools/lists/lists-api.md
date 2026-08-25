---
description: Manage lists programmatically with the Lists API.
title: Lists API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Lists API

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/tools/lists/lists-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The [Lists API](https://developers.cloudflare.com/api/resources/rules/subresources/lists/) provides an interface for programmatically managing the following types of lists:

* [Custom lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/): Contain one or more strings of the same type (such as IP addresses or hostnames) that you can reference collectively, by name, in rule expressions.
* [Bulk Redirect Lists](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-lists): Contain URL redirects that you enable by creating a Bulk Redirect Rule.

To use a list in a rule expression, refer to [Lists](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#lists) in the Rules language documentation.

## Get started

To get started, review the Lists [JSON object](https://developers.cloudflare.com/waf/tools/lists/lists-api/json-object/) and [Endpoints](https://developers.cloudflare.com/waf/tools/lists/lists-api/endpoints/).

---

## Rate limiting for Lists API requests

Cloudflare may apply rate limiting to your API requests creating, modifying, or deleting list items in custom lists and Bulk Redirect Lists.

Each operation (create, edit, or delete) on a list item counts as a modification. The following limits apply:

* You can make a maximum of 1,000,000 list item modifications in API requests over 12 hours.
* You can make a maximum of 30,000 API requests over 12 hours doing list item modifications.

If a write operation is still being processed — which happens asynchronously — and you submit a new request, you will receive a `429` HTTP status code. When this happens, submit your request again later.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/waf/tools/lists/lists-api/#page","headline":"Lists API · Cloudflare Web Application Firewall (WAF) docs","description":"Manage lists programmatically with the Lists API.","url":"https://developers.cloudflare.com/waf/tools/lists/lists-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
