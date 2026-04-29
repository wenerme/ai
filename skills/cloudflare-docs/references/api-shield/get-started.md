---
title: Get started with API Shield
description: Set up API Shield to identify and address API security best practices.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started with API Shield

API Shield protects your APIs by discovering endpoints, validating request schemas, and detecting abuse patterns. This guide walks through the initial setup from configuring session identifiers to enabling advanced protections.

Note

Enabling API Shield features will have no impact on your traffic until you choose to move a setting from `log` to `block` mode.

## Session identifiers

While not strictly required, it is recommended that you configure your session identifiers when getting started with API Shield. When Cloudflare inspects your API traffic for individual sessions, we can offer more tools for visibility, management, and control.

If you are unsure of the session identifiers that your API uses, consult with your development team.

Session identifiers should uniquely identify API clients. A common session identifier for API traffic is the `Authorization` header. When a [JSON Web Token (JWT)](https://developers.cloudflare.com/api-shield/security/jwt-validation/) is used by the API for client authentication, its value may change over time. You can use a claim value inside the JWT such as `sub` or `email` as a session ID to uniquely identify the session over time.

If your API uses the `Authorization` header on more than 1% of successful requests to your zone, Cloudflare will automatically set it as the API Shield session identifier.

You must have specific entitlements to configure session identifiers or cookies as a form of identifiers, such as an Enterprise subscription, for features such as [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/), [Sequence Mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) or [rate limiting recommendations](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/), and to see results in [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) and [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/).

### To set up session identifiers

* [  New dashboard ](#tab-panel-4233)
* [ Old dashboard ](#tab-panel-4234)

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

## Upload a schema using Schema validation (optional)

Schema validation protects your APIs by checking incoming requests against your API schema. Depending on your configured action, requests that do not match the schema are logged or blocked.

When you upload a schema via the Cloudflare dashboard, its endpoints are automatically added to Endpoint Management. If you already have an OpenAPI specification, upload it to [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

Note

It is recommended to start with Schema validation rules set to `log` to review logged requests in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). When you are confident that only the correct requests are logged, you should switch the rule to `block`.

If you do not have a schema to upload, continue reading this guide to learn how to generate a schema with API Shield.

## Enable the Sensitive Data Detection ruleset and accompanying rules

API Shield works with the Cloudflare [WAF](https://developers.cloudflare.com/waf/) [Sensitive Data Detection](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#sensitive-data-detection) ruleset to identify API endpoints that return sensitive data, such as social security or credit card numbers, in their HTTP responses. Review these endpoints to verify that sensitive data is only returned where expected.

Note

Sensitive Data Detection requires a separate subscription. Contact your account team if your plan does not include this feature.

You can identify endpoints returning sensitive data by selecting the icon next to the path in a row. Expand the endpoint to see details on which rules were triggered and view more information by exploring events in **Firewall Events**.

## Add your discovered endpoints to Endpoint Management

Cloudflare automatically discovers API endpoints by inspecting your traffic. Adding these discovered endpoints to [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/) unlocks additional security and monitoring features.

Endpoint Management tracks request counts, error rates, and latency for each saved endpoint.

Note

Schema validation, schema learning, JWT validation, Sequence Analytics, sequence mitigation, and rate limit recommendations only run on endpoints saved to Endpoint Management.

You can save your endpoints directly from [API Discovery](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-from-api-discovery), [Schema validation](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-from-schema-validation), or [manually](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-manually) by method, path, and host.

You can view your list of saved endpoints in the **Endpoint Management** page. Cloudflare will aggregate [performance data](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#endpoint-analysis) and security data on your endpoint once it is saved.

### Allow the system to learn your traffic patterns

After you add an endpoint, Cloudflare begins learning schema parameters from your API traffic. Endpoints must be saved for at least 24 hours before schema learning begins. Schema learning is a continuous process that inspects the most recent 72 hours of traffic. Endpoints with higher traffic volumes produce more accurate schemas.

Cloudflare also uses your configured session identifiers to generate rate limit recommendations for each endpoint.

Allow at least 24 hours after adding endpoints before proceeding to the schema and rate limit steps below.

While the system learns your traffic patterns, you can continue with [additional configurations](https://developers.cloudflare.com/api-shield/get-started/#additional-configuration) such as JWT validation or mTLS.

## Add rate limits to your most sensitive endpoints

[Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) allow you to define rate limits for requests matching an expression, and choose the action to perform when those rate limits are reached.

API Shield generates rate limit recommendations for each endpoint based on your session identifiers. These recommendations are scoped per endpoint and per session rather than applied across your entire site or based on IP address.

Per-session rate limits track traffic from individual visitors during their session to a specific endpoint. This reduces false positives from broadly scoped rules while still limiting abusive traffic.

## Import a learned schema to Schema validation

Cloudflare learns schema parameters by inspecting request traffic for all endpoints saved to Endpoint Management. You can export the learned schema as an OpenAPI v3.0.0 specification by hostname.

Import the learned schema into Schema validation to protect endpoints that Cloudflare discovered through traffic inspection — including endpoints you may not have had a schema for previously.

You can import the learned schema of an entire hostname using the [Cloudflare dashboard](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-applying-a-learned-schema-to-an-entire-hostname). Alternatively, you can [apply learned schemas to individual endpoints](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-applying-a-learned-schema-to-a-single-endpoint). Before applying a learned schema, export and review it to verify the schema accurately represents your expected traffic patterns.

## Export a learned schema from Endpoint Management

Learned schemas include the hostname, all endpoints by host, method, and path, and detected path variables (for example, `/users/{id}`). They can also include detected query parameters and their format. You can optionally include rate limit threshold recommendations.

You can export your learned schemas in the [Cloudflare dashboard](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#export-a-schema) or via the [API](https://developers.cloudflare.com/api/resources/api%5Fgateway/subresources/schemas/methods/list/).

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/get-started/","name":"Get started with API Shield"}}]}
```
