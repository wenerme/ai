---
description: Set up API Shield to identify and address API security best practices.
title: Get started with API Shield
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started with API Shield

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

API Shield protects your APIs by discovering endpoints, validating request schemas, and detecting abuse patterns. This guide walks through the initial setup from configuring session identifiers to enabling advanced protections.

## Session identifiers

While not strictly required, it is recommended that you configure your session identifiers when getting started with API Shield. When Cloudflare inspects your API traffic for individual sessions, we can offer more tools for visibility, management, and control.

If you are unsure of the session identifiers that your API uses, consult with your development team.

Session identifiers should uniquely identify API clients. A common session identifier for API traffic is the `Authorization` header. When a [JSON Web Token (JWT)](https://developers.cloudflare.com/api-shield/security/jwt-validation/) is used by the API for client authentication, its value may change over time. You can use a claim value inside the JWT such as `sub` or `email` as a session ID to uniquely identify the session over time.

If your API uses the `Authorization` header on more than 1% of successful requests to your zone, Cloudflare will automatically set it as the API Shield session identifier.

You must have specific entitlements to configure session identifiers or cookies as a form of identifiers, such as an Enterprise subscription, for features such as [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/), [Sequence Mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) or [rate limiting recommendations](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/), and to see results in [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) and [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/).

### To set up session identifiers

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

## Create a Schema Profile

[Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/) provides one Schema Profile with two sources. Schema Learning derives a profile from traffic, while Schema Validation uses an uploaded OpenAPI schema.

Both sources provide an **always-on detection** after their profile becomes available. Mitigation requires a separate WAF Custom Rule.

If you maintain an OpenAPI schema, follow the [Schema Validation upload procedure](https://developers.cloudflare.com/api-shield/security/schema-validation/#upload-a-schema). API Shield remains the reference for OpenAPI compatibility, schema governance, and automation.

## Enable the Sensitive Data Detection ruleset and accompanying rules

API Shield works with the Cloudflare [WAF](https://developers.cloudflare.com/waf/) [Sensitive Data Detection](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#sensitive-data-detection) ruleset to identify API endpoints that return sensitive data, such as social security or credit card numbers, in their HTTP responses. Review these endpoints to verify that sensitive data is only returned where expected.

Note

Sensitive Data Detection requires a separate subscription. Contact your account team if your plan does not include this feature.

You can identify endpoints returning sensitive data by selecting the icon next to the path in a row. Expand the endpoint to see details on which rules were triggered and view more information by exploring events in **Firewall Events**.

## Manage operations

Web Assets continuously discovers operations from traffic. An operation represents an endpoint by HTTP method, hostname pattern, and path pattern.

You can also add operations manually under **Web Assets** \> **Operations**. Discovery and manual creation only add inventory entries.

To start Schema Learning, select **Learn profile** from the operation overflow menu. Review the learned schema through **View details** \> **Security overview**.

For the complete workflow and traffic thresholds, refer to [Get started with Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/get-started/).

## Add rate limits to your most sensitive endpoints

[Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) allow you to define rate limits for requests matching an expression, and choose the action to perform when those rate limits are reached.

API Shield generates rate limit recommendations for each endpoint based on your session identifiers. These recommendations are scoped per endpoint and per session rather than applied across your entire site or based on IP address.

Per-session rate limits track traffic from individual visitors during their session to a specific endpoint. This reduces false positives from broadly scoped rules while still limiting abusive traffic.

## Export a learned schema

Learned schemas include the hostname, all endpoints by host, method, and path, and detected path variables (for example, `/users/{id}`). They can also include detected query parameters and their format. You can optionally include rate limit threshold recommendations.

You can export your learned schemas in the [Cloudflare dashboard](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#export-a-schema) or via the [API](https://developers.cloudflare.com/api/resources/api%5Fgateway/subresources/schemas/methods/list/).

Exporting creates an OpenAPI `v3.0.0` file. To use a fixed profile, upload that file through [Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

## View and configure Sequence Analytics

[Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) identifies common patterns of API requests — for example, a user checking their account balance before initiating a funds transfer.

Sequences are ranked by precedence score, which measures how likely specific API requests are to occur together in a consistent order. High-scoring sequences contain API requests that are likely to be preceded by the other operations in the sequence.

[Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) allows you to enforce request patterns for authenticated clients communicating with your API. Use Sequence Analytics to identify the sequences your API clients follow, then apply API Shield protections (rate limiting, Schema validation, JWT validation, and mTLS) to the endpoints in your high-scoring sequences. Verify the expected endpoint order with your development team.

For more information, refer to [Detecting API abuse automatically using sequence analysis ↗](https://blog.cloudflare.com/api-sequence-analytics) blog post.

## Additional configuration

### Set up JSON Web Tokens (JWT) validation

[JSON Web Tokens (JWT) validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) verifies that tokens sent by clients have not been tampered with and have not expired. Configure JWT validation using the Cloudflare dashboard or API.

### Set up GraphQL malicious query protection

If your origin uses GraphQL, you may consider setting limits on GraphQL query size and depth.

[GraphQL malicious query protection](https://developers.cloudflare.com/api-shield/security/graphql-protection/api/) scans GraphQL traffic for queries with excessive nesting or size that could overload your origin and result in a denial of service. You can create rules that set maximum query depth and size to block these queries before they reach your origin.

For more information, refer to the [blog post ↗](https://blog.cloudflare.com/protecting-graphql-apis-from-malicious-queries/).

### Mutual TLS (mTLS) authentication

If you operate an API that requires or would benefit from an extra layer of protection, you may consider using Mutual TLS (mTLS).

[Mutual TLS (mTLS) authentication](https://developers.cloudflare.com/api-shield/security/mtls/) requires both the client and server to verify each other's identity using certificates. In standard TLS, only the server proves its identity. mTLS adds client verification, which is useful for devices like IoT hardware that do not authenticate via an identity provider.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/get-started/#page","headline":"Get started with API Shield · Cloudflare API Shield docs","description":"Set up API Shield to identify and address API security best practices.","url":"https://developers.cloudflare.com/api-shield/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
