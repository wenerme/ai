---
title: Changelog
description: Track the latest updates and changes to API Shield features.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/api-shield.xml) 

## 2026-03-23

  
**Web Assets fields now available in GraphQL Analytics API**   

Two new fields are now available in the `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) datasets:

* `webAssetsOperationId` — the ID of the [saved endpoint](https://developers.cloudflare.com/api-shield/management-and-monitoring/) that matched the incoming request.
* `webAssetsLabelsManaged` — the [managed labels](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#managed-labels) mapped to the matched operation at the time of the request (for example, `cf-llm`, `cf-log-in`). At most 10 labels are returned per request.

Both fields are empty when no operation matched. `webAssetsLabelsManaged` is also empty when no managed labels are assigned to the matched operation.

These fields allow you to determine, per request, which Web Assets operation was matched and which managed labels were active. This is useful for troubleshooting downstream security detection verdicts — for example, understanding why [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/) did or did not flag a request.

Refer to [Endpoint labeling service](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#analytics) for GraphQL query examples.

## 2026-03-09

  
**New Vulnerability Scanner for API Shield**   

Introducing Cloudflare's Web and API Vulnerability Scanner (Open Beta)

Cloudflare is launching the [Open Beta of the **Web and API Vulnerability Scanner** ↗](https://blog.cloudflare.com/vulnerability-scanner) for all [API Shield](https://developers.cloudflare.com/api-shield/) customers. This new, stateful Dynamic Application Security Testing (DAST) platform helps teams proactively find logic flaws in their APIs.

The initial release focuses on detecting Broken Object Level Authorization (BOLA) vulnerabilities by building API call graphs to simulate attacker and owner contexts, then testing these contexts by sending real HTTP requests to your APIs.

The scanner is now available via the Cloudflare API. To scan, set up your target environment, owner and attacker credentials, and upload your OpenAPI file with response schemas. The scanner will be available in the Cloudflare dashboard in a future release.

**Access**: This feature is only available to API Shield subscribers via the Cloudflare API. We hope you will use the API for programmatic integration into your CI/CD pipelines and security dashboards.

**Documentation**: Refer to the [developer documentation](https://developers.cloudflare.com/api-shield/security/vulnerability-scanner/) to start scanning your endpoints today.

## 2025-11-25

  
**New Zombie API detection for API Shield**   

API Shield now automatically detects zombie endpoints — saved endpoints that have not received traffic for an extended period. When detected, the `cf-risk-zombie` [risk label](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/#risk-labels) is applied.

The scan runs daily alongside existing risk scans. Endpoints are labeled after 32 days without traffic.

Zombie endpoints may indicate deprecated or forgotten API surface area that could pose a security risk. Review these endpoints and consider removing them from Endpoint Management if they are no longer in use. Also consider using a [fallthrough rule](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-adding-a-fallthrough-rule) to prevent communication with endpoints removed from Endpoint Management.

## 2025-11-12

  
**New BOLA Vulnerability Detection for API Shield**   

Now, API Shield automatically searches for and highlights **Broken Object Level Authorization (BOLA) attacks** on managed API endpoints. API Shield will highlight both BOLA enumeration attacks and BOLA pollution attacks, telling you what was attacked, by who, and for how long.

You can find these attacks three different ways: Security Overview, Endpoint details, or Security Analytics. If these attacks are not found on your managed API endpoints, there will not be an overview card or security analytics suspicious activity card.

![BOLA attack Overview card](https://developers.cloudflare.com/_astro/bola-overview-card.hwcSeAkb_1MwSDq.webp)![BOLA attack Overview drawer](https://developers.cloudflare.com/_astro/bola-overview-drawer.DD2c0bxS_zw6Ec.webp) 

From the endpoint details, you can select **View attack** to find details about the BOLA attacker’s sessions.

![BOLA attack endpoint details](https://developers.cloudflare.com/_astro/bola-endpoint-attack.UQP3MDkp_1Yhqqd.webp) 

From here, select **View in Analytics** to observe attacker traffic over time for the last seven days.

![BOLA attack analytics drawer](https://developers.cloudflare.com/_astro/bola-analytics-drawer.DXzC6EJU_iXjmr.webp) 

Your search will filter to traffic on that endpoint in the last seven days, along with the malicious session IDs found in the attack. Session IDs are hashed for privacy and will not be found in your origin logs. Refer to IP and JA4 fingerprint to cross-reference behavior at the origin.

At any time, you can also start your investigation into attack traffic from Security Analytics by selecting the suspicious activity card.

![Suspicious Activity card](https://developers.cloudflare.com/_astro/bola-suspicious-card._B3GB3s4_STW1N.webp) 

We urge you to take all of this client information to your developer team to research the attacker behavior and ensure any broken authorization policies in your API are fixed at the source in your application, preventing further abuse.

In addition, this release marks the end of the beta period for these scans. All Enterprise customers with API Shield subscriptions will see these new attacks if found on their zone.

## 2025-03-18

  
**New API Posture Management for API Shield**   

Now, API Shield **automatically** labels your API inventory with API-specific risks so that you can track and manage risks to your APIs.

View these risks in [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/) by label:

![A list of endpoint management labels](https://developers.cloudflare.com/_astro/endpoint-management-label.BDmf8Ai1_ZM5mgU.webp) 

...or in [Security Center Insights](https://developers.cloudflare.com/security-center/security-insights/):

![An example security center insight](https://developers.cloudflare.com/_astro/posture-management-insight.7vB7mzGI_Z1HKoUN.webp) 

API Shield will scan for risks on your API inventory daily. Here are the new risks we're scanning for and automatically labelling:

* **cf-risk-sensitive**: applied if the customer is subscribed to the [sensitive data detection ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/) and the WAF detects sensitive data returned on an endpoint in the last seven days.
* **cf-risk-missing-auth**: applied if the customer has configured a session ID and no successful requests to the endpoint contain the session ID.
* **cf-risk-mixed-auth**: applied if the customer has configured a session ID and some successful requests to the endpoint contain the session ID while some lack the session ID.
* **cf-risk-missing-schema**: added when a learned schema is available for an endpoint that has no active schema.
* **cf-risk-error-anomaly**: added when an endpoint experiences a recent increase in response errors over the last 24 hours.
* **cf-risk-latency-anomaly**: added when an endpoint experiences a recent increase in response latency over the last 24 hours.
* **cf-risk-size-anomaly**: added when an endpoint experiences a spike in response body size over the last 24 hours.

In addition, API Shield has two new 'beta' scans for **Broken Object Level Authorization (BOLA) attacks**. If you're in the beta, you will see the following two labels when API Shield suspects an endpoint is suffering from a BOLA vulnerability:

* **cf-risk-bola-enumeration**: added when an endpoint experiences successful responses with drastic differences in the number of unique elements requested by different user sessions.
* **cf-risk-bola-pollution**: added when an endpoint experiences successful responses where parameters are found in multiple places in the request.

We are currently accepting more customers into our beta. Contact your account team if you are interested in BOLA attack detection for your API.

Refer to the [blog post ↗](https://blog.cloudflare.com/cloudflare-security-posture-management/) for more information about Cloudflare's expanded posture management capabilities.

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
