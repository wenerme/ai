---
title: Changelog
description: API Shield now automatically detects zombie endpoints — saved endpoints that have not received traffic for an extended period. When detected, the cf-risk-zombie risk label is applied.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/api-shield.xml) 

## 2025-11-25

  
**New Zombie API detection for API Shield**   

API Shield now automatically detects zombie endpoints — saved endpoints that have not received traffic for an extended period. When detected, the `cf-risk-zombie` [risk label](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels) is applied.

The scan runs daily alongside existing risk scans. Endpoints are labeled after 32 days without traffic.

Zombie endpoints may indicate deprecated or forgotten API surface area that could pose a security risk. Review these endpoints and consider removing them from Endpoint Management if they are no longer in use. Also consider using a [fallthrough rule](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-adding-a-fallthrough-rule) to prevent communication with endpoints removed from Endpoint Management.

## 2025-02-17

**New automatically applied risk labels**

API Shield now automatically labels endpoints with risks due to missing schemas and performance anomalies (spikes in error rates, latency, and body response sizes).

## 2025-01-16

**API Authentication Posture**

Customers will see per-endpoint authentication details inside [Endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/) for zones with configured session identifiers.

## 2024-12-19

**Automatically applied endpoint risk labels**

API Shield now automatically labels endpoints with risks due to authentication status and sensitive data detection.

## 2024-11-04

**Endpoint labels**

Customers can now organize their endpoints by use case and custom labels using the [Endpoint labeling service](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/) for easy reference and future machine learning (ML) model training.

## 2024-10-18

**API Shield fields in Custom Rules**

Customers can now use API Shield product feature fields in [custom rules](https://developers.cloudflare.com/waf/custom-rules/), referencing features such as [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/), [session identifiers](https://developers.cloudflare.com/api-shield/get-started/#session-identifiers), and [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

## 2024-09-25

**Fallthrough rule for Schema validation 2.0**

Customers can now enable the [Fallthrough Action](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-adding-a-fallthrough-rule) for Schema validation 2.0 to block or log requests that do not match the endpoints listed in schemas protected by Schema validation 2.0.

## 2024-08-28

**Increased capacity for Endpoint management and Schema validation**

Endpoint management and Schema validation now support up to 10,000 saved and validated API endpoints.

## 2024-07-08

**API Discovery's hostname variables**

Customers can now see when [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/) groups similar subdomains with the same methods and paths, making it easy to discover and manage APIs that share many vanity domains or subdomains.

## 2024-07-02

**Route API requests using API Routing**

Customers can now route requests to different back-end services through [API Routing](https://developers.cloudflare.com/api-shield/management-and-monitoring/api-routing/), creating a unified front for their APIs distributed across otherwise disparate systems.

## 2024-05-13

**Use JWT claims in Advanced Rate Limiting, Transform Rules, and as session IDs**

Customers can now use the fields inside [JSON Web Tokens (known as claims)](https://developers.cloudflare.com/api-shield/security/jwt-validation/transform-rules/#enhance-transform-rules-with-jwt-claims) as [session identifiers in API Shield](https://developers.cloudflare.com/api-shield/get-started/#session-identifiers), to count values in [Advanced Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/), and to send on useful information in [Transform Rules](https://developers.cloudflare.com/rules/transform/).

## 2024-04-30

**Build sequence mitigation rules via the Cloudflare dashboard**

Customers can now build [Sequence mitigation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/) rules with a new user interface inside the API Shield section of the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

## 2024-02-23

**Endpoint management supports hostname variables**

Customers can now save endpoints in [Endpoint management](https://developers.cloudflare.com/api-shield/management-and-monitoring/) that contain variables in the hostname. Hostname variables are supported across all product features.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/changelog/","name":"Changelog"}}]}
```
