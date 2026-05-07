---
title: Endpoint labeling service
description: Organize API endpoints and address vulnerabilities with managed and custom labels.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ GraphQL ](https://developers.cloudflare.com/search/?tags=GraphQL) 

# Endpoint labeling service

API Shield's labeling service will help you organize your endpoints and address vulnerabilities in your API. The labeling service comes with managed and user-defined labels.

Managed labels help you organize endpoints by use case. Managed labels will also automatically identify endpoints with informative or security risks, alerting you on endpoints that need attention.

User-defined labels can also be added to endpoints in API Shield by creating a label and adding it to an individual endpoint or multiple endpoints. User-defined labels will be useful for organizing your endpoints by owner, version, or type.

You can filter your endpoints based on the labels.

## Categories

### Managed labels

Use managed labels to identify endpoints by use case. Cloudflare may automatically apply these labels in a future release.

`cf-log-in`: Add this label to endpoints that accept user credentials. You may have multiple endpoints if you accept username, password, and multi-factor authentication (MFA) across multiple endpoints or requests.

`cf-sign-up`: Add this label to endpoints that are the final step in creating user accounts for your site or application.

`cf-content`: Add this label to endpoints that provide unique content, such as product details, user reviews, pricing, or other unique information.

`cf-purchase`: Add this label to endpoints that are the final step in purchasing goods or services online.

`cf-password-reset`: Add this label to endpoints that participate in the user password reset process. This includes initial password reset requests and final password reset submissions.

`cf-add-cart`: Add this label to endpoints that add items to a user's shopping cart or verify item availability.

`cf-add-payment`: Add this label to endpoints that accept credit card or bank account details where fraudsters may iterate through account numbers to guess valid combinations of payment information.

`cf-check-value`: Add this label to endpoints that check the balance of rewards points, in-game currency, or other stored value products that can be earned, transferred, and redeemed for cash or physical goods.

`cf-add-post`: Add this label to endpoints that post messages in a communication forum, or product or merchant reviews.

`cf-account-update`: Add this label to endpoints that participate in user account or profile updates.

`cf-llm`: Services that are (partially) powered by Large Language Model (LLM).

`cf-rss-feed`: Add this label to endpoints that expect traffic from RSS clients.

`cf-web-page`: Add this label to endpoints that serve HTML pages.

`cf-contains-ads`: Add this label to endpoints that serve web pages containing advertisements.

Note

[Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) will not block requests to endpoints labeled as `cf-rss-feed`.

[Super Bot Fight Mode rules](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/#ruleset-engine) will not match or challenge requests labeled as `cf-rss-feed`.

### Risk labels

Cloudflare automatically runs risk scans every 24 hours on your saved endpoints. API Shield applies these labels when a scan finds security risks on your endpoints. A corresponding Security Center Insight is also raised when risks are found.

`cf-risk-missing-auth`: Automatically added when all successful requests lack a session identifier. Refer to [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/#process) for more information.

`cf-risk-mixed-auth`: Automatically added when some successful requests contain a session identifier and some successful requests lack a session identifier. Refer to [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/#process) for more information.

`cf-risk-sensitive`: Automatically added to endpoints when HTTP responses match the WAF's [Sensitive Data Detection](https://developers.cloudflare.com/api-shield/management-and-monitoring/#sensitive-data-detection) ruleset.

`cf-risk-missing-schema`: Automatically added when a learned schema is available for an endpoint that has no active schema.

`cf-risk-error-anomaly`: Automatically added when an endpoint experiences a recent increase in response errors over the last 24 hours.

`cf-risk-latency-anomaly`: Automatically added when an endpoint experiences a recent increase in response latency over the last 24 hours.

`cf-risk-size-anomaly`: Automatically added when an endpoint experiences a spike in response body size over the last 24 hours.

`cf-risk-bola-enumeration`: Automatically added when an endpoint experiences successful responses with drastic differences in the number of unique elements requested by different user sessions.

`cf-risk-bola-pollution`: Automatically added when an endpoint experiences successful responses where parameters are found in multiple places in the request, as opposed to what is expected from the API's schema.

`cf-risk-zombie`: Automatically added when a saved endpoint has not received traffic in 32 days.

Note

Cloudflare will only add authentication labels to endpoints with successful response codes. Refer to the below table for more details.

#### Recommended action

How you address risks to your endpoints will depend on its label(s). The following steps provide you with general guidelines on how to take action on them.

1. Review risks to endpoints.  
View the endpoints labeled as risks and identify if they have been labeled for other risks.  
For example, endpoints labeled `cf-risk-sensitive` and `cf-risk-missing-auth` or `cf-risk-mixed-auth` may contain sensitive data that is available to unauthenticated users.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
Go to the details pages for endpoints labeled as `cf-risk-missing-auth` or `cf-risk-mixed-auth`, and check for recent changes in the authenticated traffic profile in the last 24 hours and seven days.
2. Review traffic to these labeled endpoints in Security Analytics.  
Check for unexpected traffic sources and note any irregular traffic patterns.  
Filtering  
Filtering by risk label includes all traffic to all endpoints labeled with that risk, not only the traffic that prompted Cloudflare to apply the label.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
3. Review your origin's authorization and authentication policies with your development team.  
Speak with your developers or application owners in your organization to understand whether or not all requests to these endpoints should be authenticated. Modify your application to consistently enforce the authentication requirement for all traffic accessing these endpoints.  
Refer to [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/) for more information.

---

## Analytics

### GraphQL Analytics API

You can query the matched operation and managed labels for individual requests using the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). The `webAssetsOperationId` and `webAssetsLabelsManaged` fields are available in the `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` datasets. Use [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/) to explore the full schema and available filter operators.

`webAssetsLabelsManaged` returns at most 10 labels per request.

#### Example: query requests by managed label

The following query returns the count of requests per operation ID and managed label set, filtered to requests where the matched operation carries the `cf-log-in` managed label.

```

query GetAdaptiveGroups($start: DateTime!, $end: DateTime!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      httpRequestsAdaptiveGroups(

        filter: {

          datetime_geq: $start

          datetime_leq: $end

          requestSource: "eyeball"

          webAssetsLabelsManaged_hasany: ["cf-log-in"]

        }

        limit: 25

        orderBy: [count_DESC]

      ) {

        count

        dimensions {

          webAssetsOperationId

          webAssetsLabelsManaged

        }

      }

    }

  }

}


```

Replace `cf-log-in` with any [managed label](#managed-labels) or [risk label](#risk-labels). You can also omit the `webAssetsLabelsManaged_hasany` filter and use `webAssetsOperationId` as the sole dimension to group traffic by matched operation regardless of label.

### Logpush

You can export per-request Web Assets data to your storage or SIEM system of choice using [Logpush](https://developers.cloudflare.com/logs/logpush/). The `WebAssetsOperationID` and `WebAssetsLabelsManaged` fields are available in the [HTTP requests dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/#webassetslabelsmanaged).

---

## Create a label

* [  New dashboard ](#tab-panel-4424)
* [ Old dashboard ](#tab-panel-4425)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. Under **Endpoint labels**, select **Manage labels**.
4. Name the label and add an optional label description.
5. Apply the label to your selected endpoints.
6. Select **Create label**.

Alternatively, you can create a user-defined label via **Security** \> **Web Assets**.

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Endpoints** tab.
3. Choose the endpoint that you want to label.
4. Select **Edit endpoint labels**.
5. Under **User**, select **Create user label**.
6. Enter the label name.
7. Select **Create**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings** \> **Labels**.
3. Under **Security labels**, select **Create label**.
4. Name the label and add an optional label description.
5. Apply the label to your selected endpoints.
6. Select **Create label**.

Alternatively, you can create a user-defined label via Endpoint Management in API Shield:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings** \> **Labels**.
3. Choose the endpoint that you want to label.
4. Select **Edit labels**.
5. Under **User**, select **Create user label**.
6. Enter the label name.
7. Select **Create**.

## Apply a label to an individual endpoint

* [  New dashboard ](#tab-panel-4426)
* [ Old dashboard ](#tab-panel-4427)

1. In the Cloudflare dashboard, go to the **Web assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. In the **Endpoints** tab, choose the endpoint that you want to label.
3. Select **Edit endpoint labels**.
4. Add the label(s) that you want to use for the endpoint from the list of managed and user-defined labels.
5. Select **Save labels**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **API Shield**.
3. In the **Endpoint Management** tab, choose the endpoint that you want to label.
4. Select **Edit labels**.
5. Add the label(s) that you want to use for the endpoint from the list of managed and user-defined labels.
6. Select **Save labels**.

## Bulk apply labels to multiple endpoints

* [  New dashboard ](#tab-panel-4422)
* [ Old dashboard ](#tab-panel-4423)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. On **Endpoint labels**, select **Manage labels**.
4. On the existing label that you want to apply to multiple endpoints, select **Bulk apply**.
5. Choose the endpoints that you want to label by selecting its checkbox.
6. Select **Apply label**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings** \> **Labels**.
3. On the existing label that you want to apply to multiple endpoints, select **Bulk apply**.
4. Choose the endpoints that you want to label by selecting its checkbox.
5. Select **Save label**.

## Availability

Endpoint labeling is available to all customers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/management-and-monitoring/","name":"Management and Monitoring"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/management-and-monitoring/endpoint-labels/","name":"Endpoint labeling service"}}]}
```
