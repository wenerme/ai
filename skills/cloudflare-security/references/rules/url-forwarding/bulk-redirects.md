---
description: Redirect large numbers of URLs with Bulk Redirects at the account level.
title: Bulk Redirects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Bulk Redirects

Last updated Jun 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Bulk Redirects allow you to define a large number of URL redirects at the account level, which can apply across domains in your account. These redirects navigate the user from a source URL to a target URL using a given HTTP status code. URL redirection is also known as URL forwarding.

Unlike dynamic URL redirects created in [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/), Bulk Redirects are essentially static. They do not support string replacement operations or regular expressions. However, you can configure URL redirect parameters that affect how source URLs are matched and how the redirect is performed.

For more complex and customized redirect logic, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

---

## Bulk Redirects and the WAF

Bulk Redirects run after the WAF in the request processing pipeline. This means that:

* If a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) blocks a request, the Bulk Redirect will not execute.
* If a WAF rule logs or challenges a request that subsequently passes, the firewall event will still appear in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) and [Logpush](https://developers.cloudflare.com/logs/) — even though the request is later redirected. This is expected behavior.

For the complete request processing order, refer to [Rules execution order](https://developers.cloudflare.com/rules/url-forwarding/#execution-order).

---

## Related resources

* [Availability](https://developers.cloudflare.com/rules/url-forwarding/#availability): Information on the Bulk Redirects quotas and features per Cloudflare plan.
* [Execution order](https://developers.cloudflare.com/rules/url-forwarding/#execution-order): Execution order of the different Rules products.
* [Trace a request](https://developers.cloudflare.com/rules/trace-request/): Use Cloudflare Trace to determine if a bulk redirect rule is triggering for a specific URL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/#page","headline":"Bulk Redirects · Cloudflare Rules docs","description":"Redirect large numbers of URLs with Bulk Redirects at the account level.","url":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
