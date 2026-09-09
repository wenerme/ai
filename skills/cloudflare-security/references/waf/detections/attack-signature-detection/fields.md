---
description: Reference Attack Signature Detection fields, example values, Security Rules usage, and Logpush mappings.
title: Fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Fields

Last updated Sep 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/attack-signature-detection/fields/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Attack Signature Detection populates these request fields when signatures match:

| Field                               | Type          | Meaning                                                                                                             |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- |
| cf.waf.signature.request.categories | Array<String> | Categories associated with all matching signatures. A signature can have more than one category.                    |
| cf.waf.signature.request.confidence | Array<String> | Confidence values associated with matching signatures. Supported values are high and low.                           |
| cf.waf.signature.request.refs       | Array<String> | Refs for matching signatures, up to 10 per request. Each Ref matches the corresponding Managed Rule public Rule ID. |

Note

Attack Signature Detection is available in Early Access. Contact your Cloudflare account team to request access.

All three fields are available in Security Analytics and Security Rules. You can reference them in rules created in the dashboard or through the API.

## Example values

The fields can contain values like these:

| Field                               | Example value                          |
| ----------------------------------- | -------------------------------------- |
| cf.waf.signature.request.categories | \["sqli", "cve-2025-55182"\]           |
| cf.waf.signature.request.confidence | \["high"\]                             |
| cf.waf.signature.request.refs       | \["d68f8101f6e14e25aefcaea69c530a29"\] |

## Rules language examples

Use `any()` to test array elements:

```txt
any(cf.waf.signature.request.categories[*] eq "sqli")
```

```txt
any(cf.waf.signature.request.confidence[*] eq "high")
```

```txt
any(cf.waf.signature.request.refs[*] eq "d68f8101f6e14e25aefcaea69c530a29")
```

For rollout guidance, refer to [Use attack signatures in Security Rules](https://developers.cloudflare.com/waf/detections/attack-signature-detection/use-attack-signatures-in-security-rules/).

## Logpush fields

Signature Refs and categories are available in Logpush:

| Rules field                         | Logpush field                                                                                                                                            |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf.waf.signature.request.refs       | [wafRequestSignatureRefs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/#wafrequestsignaturerefs)             |
| cf.waf.signature.request.categories | [wafRequestSignatureCategories](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/#wafrequestsignaturecategories) |

Only signature Ref and category mappings are available in Logpush.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/fields/#page","headline":"Fields · Cloudflare Web Application Firewall (WAF) docs","description":"Reference Attack Signature Detection fields, example values, Security Rules usage, and Logpush mappings.","url":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
