---
title: Cloudflare Trace limitations
description: Trace does not display rules that are automatically bypassed for operational reasons.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/trace-request/limitations.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Trace limitations

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/trace-request/","name":"Trace a request"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/trace-request/limitations/","name":"Cloudflare Trace limitations"}}]}
```
