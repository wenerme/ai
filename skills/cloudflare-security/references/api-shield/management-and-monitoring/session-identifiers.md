---
description: Configure session identifiers to track authenticated API traffic per user.
title: Session identifiers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Session identifiers

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

While not strictly required, it is recommended that you configure your session identifiers when getting started with API Shield. When Cloudflare inspects your API traffic for individual sessions, we can offer more tools for visibility, management, and control.

If you are unsure of the session identifiers that your API uses, consult with your development team.

Session identifiers should uniquely identify API clients. A common session identifier for API traffic is the `Authorization` header. When a [JSON Web Token (JWT)](https://developers.cloudflare.com/api-shield/security/jwt-validation/) is used by the API for client authentication, its value may change over time. You can use a claim value inside the JWT such as `sub` or `email` as a session ID to uniquely identify the session over time.

If your API uses the `Authorization` header on more than 1% of successful requests to your zone, Cloudflare will automatically set it as the API Shield session identifier.

Note

You must have specific entitlements to configure session identifiers or cookies as a form of identifiers, such as an Enterprise subscription, for features such as [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/), [Sequence Mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) or [rate limiting recommendations](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/), and to see results in [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) and [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/).

## To set up session identifiers

1. In the Cloudflare dashboard, go to the **Security Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. On **Session identifiers**, select **Configure session identifiers**.
4. Select **Manage identifiers**.
5. Choose the type of session identifier (cookie, HTTP header, or JWT claim).
Note
The session identifier cookie must comply with RFC 6265\. Otherwise, it will be rejected.
If you are using a JWT claim, choose the [Token Configuration](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/#token-configurations) that will verify the JWT. Token Configurations are required to use JWT claims as session identifiers. Refer to [JWT Validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) for more information.
6. Enter the name of the session identifier.
7. Select **Save**.

After setting up session identifiers and allowing some time for Cloudflare to learn your traffic patterns, you can view your per endpoint and per session rate limiting recommendations, as well as enforce per endpoint and per session rate limits by creating new rules. Session identifiers will allow you to view API Discovery results from session ID-based discovery and session traffic patterns in Sequence Analytics.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/#page","headline":"Session identifiers · Cloudflare API Shield docs","description":"Configure session identifiers to track authenticated API traffic per user.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/session-identifiers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
