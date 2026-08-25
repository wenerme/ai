---
description: Create URL redirects with expression-based Single Redirect rules.
title: Single Redirects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Single Redirects

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Single Redirects allow you to create static or dynamic URL redirects. Static redirects send users to a fixed target URL, while dynamic redirects build the target URL from components of the original request. A [wildcard-based](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) interface allows you to define source and target URL patterns without complex functions or regular expressions, efficiently handling thousands of URLs with a single rule. Dynamic URL redirects also support advanced features such as string replacement operations and [regular expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#string-values-and-regular-expressions) (depending on your Cloudflare plan).

For more complex and customized redirect logic, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

---

## Related resources

* [Availability](https://developers.cloudflare.com/rules/url-forwarding/#availability): Information on the Single Redirects quotas and features per Cloudflare plan.
* [Execution order](https://developers.cloudflare.com/rules/url-forwarding/#execution-order): Execution order of the different Rules products.
* [Trace a request](https://developers.cloudflare.com/rules/trace-request/): Use Cloudflare Trace to determine if a redirect rule is triggering for a specific URL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/single-redirects/#page","headline":"Single Redirects · Cloudflare Rules docs","description":"Create URL redirects with expression-based Single Redirect rules.","url":"https://developers.cloudflare.com/rules/url-forwarding/single-redirects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
