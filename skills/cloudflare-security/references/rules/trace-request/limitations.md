---
description: Known limitations when using the Trace feature.
title: Cloudflare Trace limitations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Trace limitations

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/trace-request/limitations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Automatic rule bypasses

Trace does not display rules that are automatically bypassed for operational reasons.

For example, when SSL/TLS certificates are in `pending_validation` status, security rules are automatically disabled for domain control validation (DCV) paths like `/.well-known/pki-validation/` and `/.well-known/acme-challenge/`. These bypasses will not appear in trace results.

For more information, refer to [Why are some rules bypassed?](https://developers.cloudflare.com/waf/troubleshooting/faq/#why-are-some-rules-bypassed-when-i-did-not-create-an-exception) in the WAF documentation.

---

## Unsupported features

Trace currently does not support:

* Hostnames using [Data Localization Suite](https://developers.cloudflare.com/data-localization/)
* [Spectrum](https://developers.cloudflare.com/spectrum/) applications

Additionally, the following products will not appear in trace results:

* [Firewall rules (deprecated)](https://developers.cloudflare.com/firewall/)
* [Load Balancing](https://developers.cloudflare.com/load-balancing/) and [Load Balancer Custom Rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/)
* [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/)
* [Rate limiting rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/)
* [WAF managed rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/)
* [Content security rules](https://developers.cloudflare.com/client-side-security/rules/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/trace-request/limitations/#page","headline":"Cloudflare Trace limitations · Cloudflare Rules docs","description":"Known limitations when using the Trace feature.","url":"https://developers.cloudflare.com/rules/trace-request/limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
