---
title: Volumetric Abuse Detection
description: Set up adaptive, per-session rate limiting for API endpoints with Volumetric Abuse Detection.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Volumetric Abuse Detection

Cloudflare Volumetric Abuse Detection generates per-endpoint, per-session rate limit recommendations that adjust automatically as your traffic patterns change.

Cloudflare looks for endpoint abuse based on user traffic to individual endpoints.

For example, your API might see different levels of traffic to a `/reset-password` endpoint than a `/login` endpoint. Additionally, your `/login` endpoint might see higher than average traffic after a successful marketing campaign.

These two scenarios speak to the limitations of traditional rate limiting. Not only does traffic vary between endpoints, but it also can vary over time for the same endpoint. Volumetric Abuse Detection solves these problems using unsupervised learning (analyzing traffic patterns without predefined rules) to develop separate baselines for each endpoint and adjust to changes in user behavior over time.

Volumetric Abuse Detection rate limits are generated on a per-session basis rather than per IP address. This reduces false positives when traffic to your API increases, because rate limits track individual sessions rather than shared IP addresses.

Volumetric Abuse Detection rate limits are a way to prevent blatant volumetric abuse while minimizing false positives. If you are trying to prevent abusive bot traffic altogether, refer to Cloudflare's [Bot solutions](https://developers.cloudflare.com/bots/).

## Process

Volumetric Abuse Detection analyzes your API's individual session traffic statistics to recommend per-endpoint, per-session rate limits.

To access your endpoints:

Old dashboard: **Security** \> **API Shield** \> **Endpoint Management**

New dashboard: **Security** \> **Web Assets** \> **Endpoints**

Recommendations will continue to update if your traffic pattern changes.

### Requirements

Volumetric Abuse Detection generates rate limit thresholds only after collecting enough traffic data to produce reliable recommendations. If recommendations are missing for a discovered endpoint, the traffic likely failed to meet the necessary criteria.

Thresholds are suggested only for endpoints that satisfy all of the following requirements within the last seven days (or since initial discovery):

* The endpoint must receive sufficient valid traffic (traffic that meets the [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/#requirements) criteria). Intermittent or erratic traffic may prevent suggestions.
* The endpoint must be accessed by at least 50 distinct sessions in any 24-hour period during the last seven days.
* [Session identifiers](https://developers.cloudflare.com/api-shield/get-started/#to-set-up-session-identifiers), such as an authorization token available as a request header or cookie, must be configured to allow Cloudflare to accurately detect individual sessions and perform the required per-session rate analysis.

After adding a session identifier, allow 24 hours for rate limit recommendations to appear on endpoints in the Cloudflare dashboard.

### Rate limiting recommendation calculation

Select an endpoint row in **Endpoints** to view its rate limit recommendation. The detail view shows the overall recommended value and percentile-based values (p50, p90, p99).

Percentile values

Percentile values describe what portion of your traffic falls below a threshold. For example, if your p90 value is `83`, then 90% of your sessions had maximum request rates less than 83 requests per 10 minutes.

Cloudflare recalculates the recommended value throughout the day based on requests from the last 24 hours. The recommendation may not change if your traffic profile remains consistent.

Cloudflare recommends using the overall rate limit recommendation rather than a single percentile value. The overall recommendation accounts for variation across all your API sessions. Choosing a single percentile value may cause false positives due to a high number of outliers.

In **Endpoints**, you can review the confidence level for each recommendation and how many unique sessions were observed over the last seven days. In general, endpoints with fewer unique sessions and high variability of user behavior will have lower confidence scores.

Implementing low confidence rate limits can still be helpful to prevent API abuse. If the confidence level is low, start your rate limit rule in `log` mode and observe violations for false positives before switching to `block`.

### Create rate limits

Refer to the [Rules documentation](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) for more information on how to create an Advanced Rate Limiting rule.

## API

[Rate limit recommendations are available via the API](https://developers.cloudflare.com/api/resources/api%5Fgateway/subresources/operations/methods/get/) if you would like to dynamically update rate limits over time.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account API Gateway`
* `Account API Gateway Read`
* `Domain API Gateway`
* `Domain API Gateway Read`

Retrieve information about an operation

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/operations/$OPERATION_ID" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Special cases

### Rate limit by user (JWT claim)

You can rate limit requests based on any claim inside of a JSON Web Token (JWT), such as:

* Registered claims like `aud` or `sub`
* Custom claims like `userEmail`, including nested custom claims like `user.email`

Rate limiting based on JWT claim values will only work on valid JSON Web Tokens. If you do not block invalid JSON Web Tokens on your path, the [JWT claims will all be counted and possibly blocked](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#missing-field-versus-empty-value) if high traffic is detected in the Point of Presence (PoP).

You must also count the JWT claim that uniquely identifies the user. If you select a claim that is the same for many of your users, their rate limits will all be counted together.

### Rate limit by user tier

If you offer multiple tiers on your website or application and you want to enforce rate limiting based on the tiers, such as:

* If `"aud": "free-tier"`, rate limit to five requests per minute.
* If `"aud": "premium-tier"`, rate limit to 50 requests per minute.

You can follow the rate limiting rule example below:

Example rule expression

```

(http.request.method eq "GET" and

http.host eq "<YOUR_DOMAIN>" and

http.request.uri.path matches "</EXAMPLE_PATH>" and

lookup_json_string(http.request.jwt.claims["<JWT_TOKEN_CONFIGURATION_ID>"][0], "aud") eq "free-tier"


```

## Limitations

API Shield will always calculate recommendations when session identifiers are configured. To enable session-based rate limits, [subscribe to Advanced Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/#availability).

## Availability

Volumetric Abuse Detection is only available for Enterprise customers. If you are an Enterprise customer interested in this product, contact your account team.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/security/volumetric-abuse-detection/","name":"Volumetric Abuse Detection"}}]}
```
