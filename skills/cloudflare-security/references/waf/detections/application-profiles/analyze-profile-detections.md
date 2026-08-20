---
description: Investigate profile conformance and sampled violation details.
title: Analyze profile detections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Analyze profile detections

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use **Profile Analysis** in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to investigate profile detections.

## Understand request statuses

Profile Analysis classifies requests with these statuses:

* **Conforms:** The evaluated request matched its applicable profile.
* **Violates:** The evaluated request did not match its applicable profile.
* **Not evaluated:** No applicable profile is available, or the profile does not apply.

## Review detections

1. In the Cloudflare dashboard, go to **Security** \> **Analytics**.
[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Open **Profile Analysis** and select a profile.
3. Review conformance trends over your selected time range.
4. Inspect sampled violations for the request component and affected field.
5. Review each sampled violation reason before configuring mitigation.
6. Filter by `cf.schema_validation.learned.violated` or `cf.schema_validation.uploaded.violated` to inspect the corresponding source.

## Interpret violations

A non-conforming request is not necessarily malicious. Releases, new clients, and valid edge cases can produce violations.

Cloudflare runs an **always-on detection** after a profile becomes available. Detection does not block requests by itself.

After reviewing representative traffic, refer to [Enforce profiles with Custom Rules](https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/#page","headline":"Analyze profile detections · Cloudflare Web Application Firewall (WAF) docs","description":"Investigate profile conformance and sampled violation details.","url":"https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
