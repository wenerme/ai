---
description: Identify authentication misconfigurations for API endpoints with Authentication Posture.
title: Authentication Posture
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication Posture

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/authentication-posture/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Authentication Posture detects API endpoints with missing or inconsistent authentication and alerts you to potential misconfigurations.

For example, a security team member may expect that their API endpoints `/api/v1/users` and `/api/v1/orders` require authentication. However, bugs in origin API authentication policies can create broken authentication vulnerabilities — allowing unauthenticated access to protected resources. Authentication Posture details the authentication status of successful requests to your API endpoints, alerting to potential misconfigurations.

Consider a typical e-commerce application. Users can browse items and prices without logging in. However, to retrieve order details via `GET /api/v1/orders/{order_id}`, users must log in and pass an Authorization HTTP header with all requests. Cloudflare alerts you via [Security Center Insights](https://developers.cloudflare.com/security/security-insights/) and [Endpoint labels](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/) if successful requests reach this endpoint or any other endpoint without authentication when session identifiers are configured.

## Process

After configuring [session identifiers](https://developers.cloudflare.com/api-shield/get-started/#session-identifiers), API Shield continuously scans your traffic for successful requests without authentication and labels your endpoints on a daily basis. Refer to the table below for the labeling methodology.

| Description                                                                        | 2xx response codes | 4xx, 5xx response codes                               |
| ---------------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------- |
| If all requests are missing authentication, Cloudflare will apply the label:       | cf-missing-auth    | Without successful responses, no label will be added. |
| If only some requests are missing authentication, Cloudflare will apply the label: | cf-mixed-auth      | Without successful responses, no label will be added. |

### Examine an endpoint's authentication details

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Endpoints** tab.
3. Filter your endpoints by the `cf-risk-missing-auth` or `cf-risk-mixed-auth` labels.
4. Select an endpoint to see its authentication posture details on the endpoint details page.
5. Choose between the 24-hour and 7-day view options, and note any authentication changes over time.

The main authentication widget displays how many successful requests over the last seven days had session identifiers included with them, and which identifiers were included with the traffic.

The authentication-over-time chart shows a detailed breakdown over time of how clients successfully interacted with your API and which identifiers were used. A large increase in unauthenticated traffic may signal a security incident. Similarly, any successful unauthenticated traffic on an endpoint that is expected to be 100% authenticated can be a cause for concern.

Work with your development team to understand which authentication policies may need to be corrected on your API to stop unauthenticated traffic.

### Stop unauthenticated traffic with Cloudflare

To block unauthenticated requests, create a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) using the `cf.api_gateway.auth_id_present` field. This field evaluates to `true` when the configured API Shield session identifiers are present on a request. You can also match on absence to detect unauthenticated traffic. Add a host and path match to scope the rule to specific endpoints.

## Limitations

Authentication Posture can only apply when customers accurately set up session identifiers in API Shield. Session identifiers must uniquely identify authenticated users of your API. If you are unsure of your API's session identifier, consult with your development team.

## Availability

Authentication Posture is available for all Enterprise customers with an API Shield subscription.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/authentication-posture/#page","headline":"Authentication Posture · Cloudflare API Shield docs","description":"Identify authentication misconfigurations for API endpoints with Authentication Posture.","url":"https://developers.cloudflare.com/api-shield/security/authentication-posture/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
```
