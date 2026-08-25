---
description: Mitigate profile violations with scoped Custom Rules.
title: Enforce profiles with Custom Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Enforce profiles with Custom Rules

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Application Profiles separate detection from mitigation. Cloudflare runs an **always-on detection** after a profile becomes available.

A violation does not block a request automatically. Use a [Custom Rule](https://developers.cloudflare.com/waf/custom-rules/) when you are ready to mitigate traffic.

## Select a detection field

Use this expression for learned Schema Profiles:

```txt
cf.schema_validation.learned.violated
```

Use this expression for uploaded Schema Profiles:

```txt
cf.schema_validation.uploaded.violated
```

Monitor the selected field in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) before creating a blocking rule.

## Scope by application

Limit mitigation to the intended hostname and path:

```txt
cf.schema_validation.learned.violated and http.host eq "api.example.com" and starts_with(http.request.uri.path, "/v1/orders/")
```

Scope mitigation to an operation using its complete identity. Include the HTTP method, hostname, and path:

```txt
cf.schema_validation.learned.violated and http.request.method eq "POST" and http.host eq "api.example.com" and http.request.uri.path eq "/v1/orders"
```

## Combine security signals

Combine a profile violation with [Attack Score](https://developers.cloudflare.com/waf/detections/attack-score/):

```txt
cf.schema_validation.learned.violated and cf.waf.score lt 20
```

Combine an uploaded profile violation with [Bot Score](https://developers.cloudflare.com/bots/concepts/bot-score/):

```txt
cf.schema_validation.uploaded.violated and cf.bot_management.score lt 10
```

## Roll out mitigation

Review production traffic and sampled violation reasons first. Then [create a Custom Rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) with a suitable action.

Follow these rollout practices:

* Start with monitoring in Security Analytics.
* Limit the first rule to one operation.
* Review the effect before expanding scope.
* Recheck profiles after application releases.
* Recheck violations after client changes.

For field details, refer to [Application Profile fields](https://developers.cloudflare.com/waf/detections/application-profiles/fields/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/#page","headline":"Enforce profiles with Custom Rules · Cloudflare Web Application Firewall (WAF) docs","description":"Mitigate profile violations with scoped Custom Rules.","url":"https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
