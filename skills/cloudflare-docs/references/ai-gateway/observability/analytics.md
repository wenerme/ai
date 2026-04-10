---
title: Analytics
description: Your AI Gateway dashboard shows metrics on requests, tokens, caching, errors, and cost. You can filter these metrics by time.
These analytics help you understand traffic patterns, token consumption, and
potential issues across AI providers. You can
view the following analytics:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/observability/analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Analytics

Your AI Gateway dashboard shows metrics on requests, tokens, caching, errors, and cost. You can filter these metrics by time. These analytics help you understand traffic patterns, token consumption, and potential issues across AI providers. You can view the following analytics:

* **Requests**: Track the total number of requests processed by AI Gateway.
* **Token Usage**: Analyze token consumption across requests, giving insight into usage patterns.
* **Costs**: Gain visibility into the costs associated with using different AI providers, allowing you to track spending, manage budgets, and optimize resources.
* **Errors**: Monitor the number of errors across the gateway, helping to identify and troubleshoot issues.
* **Cached Responses**: View the percentage of responses served from cache, which can help reduce costs and improve speed.

## View analytics

* [ Dashboard ](#tab-panel-3068)
* [ graphql ](#tab-panel-3069)

To view analytics in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Make sure you have your gateway selected.

You can use GraphQL to query your usage data outside of the AI Gateway dashboard. See the example query below. You will need to use your Cloudflare token when making the request, and change `{account_id}` to match your account tag.

Request

```

curl https://api.cloudflare.com/client/v4/graphql \

  --header 'Authorization: Bearer TOKEN \

  --header 'Content-Type: application/json' \

  --data '{

    "query": "query{\n  viewer {\n  accounts(filter: { accountTag: \"{account_id}\" }) {\n  requests: aiGatewayRequestsAdaptiveGroups(\n      limit: $limit\n      filter: { datetimeHour_geq: $start, datetimeHour_leq: $end }\n      orderBy: [datetimeMinute_ASC]\n    ) {\n      count,\n      dimensions {\n          model,\n          provider,\n          gateway,\n          ts: datetimeMinute\n      }\n      \n    }\n      \n  }\n  }\n}",

    "variables": {

      "limit": 1000,

      "start": "2023-09-01T10:00:00.000Z",

      "end": "2023-09-30T10:00:00.000Z",

      "orderBy": "date_ASC"

    }

}'


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/observability/analytics/","name":"Analytics"}}]}
```
