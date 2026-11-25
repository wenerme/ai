---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Identify and address API vulnerabilities with discovery, schema validation, and abuse detection.
title: Cloudflare API Shield
image: https://developers.cloudflare.com/api-shield/og.png?v=4def62fcf84999fc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare API Shield

Identify and address your API vulnerabilities.

Enterprise-only paid add-on

Note

Enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/understand/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

## Why care about API security?

APIs have become the [backbone of popular web services ↗︎](https://blog.postman.com/intro-to-apis-history-of-apis/), helping the Internet become more accessible and useful.

As APIs have become more prevalent, however, so have their problems:

- Many companies have [thousands of APIs](https://developers.cloudflare.com/api-shield/security/api-discovery/), including ones they do not even know about.
- To support a large base of users, many APIs are protected by a negative security model that makes them vulnerable to credential-stuffing attacks and automated scanning tools.
- With so many endpoints and users, it is difficult to recognize brute-force attacks against [specific endpoints](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/).
- Sophisticated attacks are even harder to recognize, often because even development teams are unaware of common and uncommon [usage patterns](https://developers.cloudflare.com/api-shield/security/sequence-analytics/).

Refer to the [Get started](https://developers.cloudflare.com/api-shield/get-started/) guide to set up API Shield.

## Features

[Security features](https://developers.cloudflare.com/api-shield/security/)

Secure your APIs using API Shield's security features.

Use Security features

[Management, monitoring, and more](https://developers.cloudflare.com/api-shield/management-and-monitoring/)

Monitor the health of your API endpoints.

Use Management, monitoring, and more

## Use Schema Profiles

[Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/) provides a shared detection, analytics, and mitigation model. Schema Profile is its only current profile type.

API Shield provides two Schema Profile sources. [Schema Learning](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/) learns from traffic, while [Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) uses uploaded OpenAPI schemas.

Use API Shield for API inventory, OpenAPI governance, profile export, automation, and higher-scale API workflows. Use the WAF Application Profiles pages for Profile Analysis and Custom Rule enforcement.

## Availability

Unless specified otherwise on a feature page, API Shield features require the paid API Shield add-on on an Enterprise plan. Anyone can set up [Mutual TLS](https://developers.cloudflare.com/api-shield/security/mtls/) with a Cloudflare-managed certificate authority.

Refer to [API Shield plans](https://developers.cloudflare.com/api-shield/plans/) for resource limits by zone plan.

Customers with the API Security entitlement already have access to Schema Profiles through Schema Learning and Schema Validation. Cloudflare is opening a closed beta to invited Enterprise customers without the API Security entitlement. Interested customers can contact their account team to express interest. Closed beta access does not imply future plan availability or pricing.

Note

API Shield currently does not work for JDCloud customers.

## Related products

[DDoS Protection](https://developers.cloudflare.com/ddos-protection/)

Cloudflare DDoS protection secures websites, applications, and entire networks while ensuring the performance of legitimate traffic is not compromised.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/api-shield/#page","headline":"Cloudflare API Shield","description":"Identify and address API vulnerabilities with discovery, schema validation, and abuse detection.","url":"https://developers.cloudflare.com/api-shield/","inLanguage":"en","image":"https://developers.cloudflare.com/api-shield/og.png?v=4def62fcf84999fc","dateModified":"2026-11-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
