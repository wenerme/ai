---
description: Secure APIs against abuse and injection attacks with schema validation, rate limiting, mTLS, and WAF rules.
title: Protect your APIs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Protect your APIs

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/apis/protect-apis/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

APIs are exposed to abuse, injection attacks, and unauthorized access. Cloudflare provides defense in depth with API Shield schema validation, per-endpoint rate limiting, mutual TLS (mTLS) client authentication, and security rules.

## Solutions

### API Shield

Discover, secure, and monitor your APIs. [Learn more about API Shield](https://developers.cloudflare.com/api-shield/).

* **Schema validation** \- Reject requests that do not conform to your OpenAPI specification before they reach your origin

### Rate Limiting

Limit request rates based on flexible matching criteria. [Learn more about Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **Rate limiting** \- Prevent abuse and volumetric attacks with per-IP or per-API-key request limits

### mTLS

Mutual TLS client certificate authentication. [Learn more about mTLS](https://developers.cloudflare.com/ssl/client-certificates/).

* **Client authentication** \- Require mutual TLS certificates for machine-to-machine communication

### Application Security

Get automatic protection from vulnerabilities and create your own custom rules. [Learn more about Application Security](https://developers.cloudflare.com/waf/).

* **Attack protection** \- Application security's managed rulesets block SQL injection, Cross-Site Scripting (XSS), and other injection attacks

### Access

Zero Trust access control for applications and infrastructure. [Learn more about Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

* **Identity providers** \- Integrate with Okta, Azure AD, Google Workspace, and other identity providers (IdPs) to gate API access
* **Service tokens** \- Issue long-lived credentials for machine-to-machine authentication between services

### Workers

Build and deploy serverless applications on Cloudflare's global network. [Learn more about Workers](https://developers.cloudflare.com/workers/).

* **JWT validation** \- Verify and decode JSON Web Tokens (JWTs) at the edge before requests reach your backend
* **Custom auth logic** \- Build any authentication scheme — API keys, Hash-based Message Authentication Code (HMAC) signatures, custom headers — directly at the edge

## Get started

1. [API Shield get started](https://developers.cloudflare.com/api-shield/get-started/)
2. [Configure rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)
3. [Set up mTLS authentication](https://developers.cloudflare.com/ssl/client-certificates/)
4. [Configure applications with Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/)
5. [Service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/)
6. [Workers get started](https://developers.cloudflare.com/workers/get-started/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/apis/protect-apis/#page","headline":"Protect your APIs · Cloudflare use cases","description":"Secure APIs against abuse and injection attacks with schema validation, rate limiting, mTLS, and WAF rules.","url":"https://developers.cloudflare.com/use-cases/apis/protect-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
