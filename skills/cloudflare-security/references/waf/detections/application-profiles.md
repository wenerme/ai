---
description: Compare requests with application-specific expected structures.
title: Application Profiles
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Application Profiles

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/application-profiles/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Application Profiles define application-specific expectations and classify requests against them. They add a positive-security model to your existing protections.

Schema Profile is the only current profile type. It models supported request fields, types, formats, ranges, and values.

Note

Customers with API Security already have access to Schema Profiles through Schema Learning and Schema Validation. Cloudflare is opening a closed beta to invited Enterprise customers without API Security. Interested customers can contact their account team to express interest. Closed-beta access does not imply future plan availability or pricing.

## Understand the profile lifecycle

A Schema Profile can come from observed traffic or an uploaded [OpenAPI schema](https://developers.cloudflare.com/api-shield/security/schema-validation/). Both sources produce the same profile type.

An operation is Cloudflare's term for an endpoint identified by HTTP method, hostname pattern, and path pattern. [Web Assets](https://developers.cloudflare.com/security/web-assets/) continuously discovers operations, and you can add operations manually.

Discovery and manual creation only add operations to your inventory. Profiling starts when you select **Learn profile** for an operation.

After the profile becomes available, Cloudflare runs an **always-on detection**. The detection classifies requests but does not mitigate traffic.

Review results in **Profile Analysis** before creating a [Custom Rule](https://developers.cloudflare.com/waf/custom-rules/). This keeps detection, investigation, and mitigation as separate steps.

## Complement existing detections

Positive security identifies requests outside your expected application structure. A non-conforming request does not need to match an attack signature.

Application Profiles complement [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/), [Attack Score](https://developers.cloudflare.com/waf/detections/attack-score/), and other negative-security detections. You can combine these signals in Custom Rules.

## Explore Application Profiles

* [Get started](https://developers.cloudflare.com/waf/detections/application-profiles/get-started/)
* [Schema Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/schema-profiles/)
* [Analyze profile detections](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/)
* [Enforce profiles with Custom Rules](https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/)
* [Fields](https://developers.cloudflare.com/waf/detections/application-profiles/fields/)

## See also

* [Schema learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/)
* [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/waf/detections/application-profiles/#page","headline":"Application Profiles · Cloudflare Web Application Firewall (WAF) docs","description":"Compare requests with application-specific expected structures.","url":"https://developers.cloudflare.com/waf/detections/application-profiles/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
