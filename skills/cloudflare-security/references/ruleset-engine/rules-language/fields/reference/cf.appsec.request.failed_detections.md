---
description: IDs of supported detections that reported failures for the request.
title: cf.appsec.request.failed_detections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.appsec.request.failed\_detections

`cf.appsec.request.failed_detections``Array<String>`

IDs of supported detections that reported failures for the request.

The field contains IDs of detections that reported failures before custom rules are evaluated, so you can act on those failures.

The default value is `[]`, which means no detection failures were reported.

Duplicate IDs are removed. Array order is not guaranteed.

The field does not alter the existing behavior of detections. Use it in rules to choose how to handle requests with reported failures.

Supported in zone and account custom rules and rate limiting rules. Also supported in zone Request Header Transform Rules.

The field is available on all plans, but using it does not grant access to detections or rule features that your plan does not include.

The possible IDs are:

| ID | Detection |
| --- | --- |
| `waf_content_scan` | Content scanning |
| `waf_score` | WAF attack score |
| `waf_signature` | Attack signature detection |
| `waf_credential_check` | Leaked credentials detection |
| `llm_prompt_pii` | LLM prompt PII detection |
| `llm_prompt_injection` | LLM prompt injection detection |
| `llm_prompt_custom_topic` | LLM prompt custom topic detection |
| `llm_prompt_unsafe_topic` | LLM prompt unsafe topic detection |

Example value:

```txt
["waf_score"]
```

Example usage:

```txt
# Match any reported detection failure
len(cf.appsec.request.failed_detections) gt 0

# Match a reported WAF attack score failure
any(cf.appsec.request.failed_detections[*] eq "waf_score")

# Join IDs for a request header value
join(cf.appsec.request.failed_detections, ",")
```

Categories:
- Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.appsec.request.failed_detections/#page","headline":"cf.appsec.request.failed_detections","description":"IDs of supported detections that reported failures for the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.appsec.request.failed_detections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
