---
description: Known limitations when using Rules simulator.
title: Rules simulator limitations
image: https://developers.cloudflare.com/rules/simulator/limitations/og.png?v=0ad15ab2b5a796d0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Rules simulator limitations

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/rules/simulator/limitations/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Automatic rule bypasses

Rules simulator does not display rules that are automatically bypassed for operational reasons.

For example, when SSL/TLS certificates are in `pending_validation` status, security rules are automatically disabled for domain control validation (DCV) paths like `/.well-known/pki-validation/` and `/.well-known/acme-challenge/`. These bypasses will not appear in simulation results.

For more information, refer to [Why are some rules bypassed?](https://developers.cloudflare.com/waf/troubleshooting/faq/#why-are-some-rules-bypassed-when-i-did-not-create-an-exception) in the WAF documentation.

---

## Unsupported features

Rules simulator currently does not support:

- Hostnames using [Data Localization Suite](https://developers.cloudflare.com/data-localization/)
- [Spectrum](https://developers.cloudflare.com/spectrum/) applications

Additionally, the following products will not appear in simulation results:

- [Firewall rules (deprecated)](https://developers.cloudflare.com/firewall/)
- [Load Balancing](https://developers.cloudflare.com/load-balancing/) and [Load Balancer Custom Rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/)
- [IP Access rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/)
- [Rate limiting rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/)
- [WAF managed rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/)
- [Content security rules](https://developers.cloudflare.com/client-side-security/rules/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/simulator/limitations/#page","headline":"Rules simulator limitations","description":"Known limitations when using Rules simulator.","url":"https://developers.cloudflare.com/rules/simulator/limitations/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/simulator/limitations/og.png?v=0ad15ab2b5a796d0","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
