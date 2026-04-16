---
title: Session identifiers
description: Configure session identifiers to track authenticated API traffic per user.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/management-and-monitoring/session-identifiers.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Session identifiers

While not strictly required, it is recommended that you configure your session identifiers when getting started with API Shield. When Cloudflare inspects your API traffic for individual sessions, we can offer more tools for visibility, management, and control.

If you are unsure of the session identifiers that your API uses, consult with your development team.

Session identifiers should uniquely identify API clients. A common session identifier for API traffic is the `Authorization` header. When a [JSON Web Token (JWT)](https://developers.cloudflare.com/api-shield/security/jwt-validation/) is used by the API for client authentication, its value may change over time. You can use a claim value inside the JWT such as `sub` or `email` as a session ID to uniquely identify the session over time.

If your API uses the `Authorization` header on more than 1% of successful requests to your zone, Cloudflare will automatically set it as the API Shield session identifier.

Note

You must have specific entitlements to configure session identifiers or cookies as a form of identifiers, such as an Enterprise subscription, for features such as [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/), [Sequence Mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) or [rate limiting recommendations](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/), and to see results in [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) and [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/).

## To set up session identifiers

* [  New dashboard ](#tab-panel-3464)
* [ Old dashboard ](#tab-panel-3465)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. On **Session identifiers**, select **Configure session identifiers**.
4. Select **Manage identifiers**.
5. Choose the type of session identifier (cookie, HTTP header, or JWT claim).  
Note  
The session identifier cookie must comply with RFC 6265\. Otherwise, it will be rejected.  
If you are using a JWT claim, choose the [Token Configuration](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/#token-configurations) that will verify the JWT. Token Configurations are required to use JWT claims as session identifiers. Refer to [JWT Validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) for more information.
6. Enter the name of the session identifier.
7. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **API Shield**.
3. Select **Settings**.
4. On **Endpoint settings**, select **Manage identifiers**.
5. Choose the type of session identifier (cookie, HTTP header, or JWT claim).  
Note  
The session identifier cookie must comply with RFC 6265\. Otherwise, it will be rejected.  
If you are using a JWT claim, choose the [Token Configuration](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/#token-configurations) that will verify the JWT. Token Configurations are required to use JWT claims as session identifiers. Refer to [JWT Validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) for more information.
6. Enter the name of the session identifier.
7. Select **Save**.

After setting up session identifiers and allowing some time for Cloudflare to learn your traffic patterns, you can view your per endpoint and per session rate limiting recommendations, as well as enforce per endpoint and per session rate limits by creating new rules. Session identifiers will allow you to view API Discovery results from session ID-based discovery and session traffic patterns in Sequence Analytics.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/management-and-monitoring/","name":"Management and Monitoring"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/management-and-monitoring/session-identifiers/","name":"Session identifiers"}}]}
```
