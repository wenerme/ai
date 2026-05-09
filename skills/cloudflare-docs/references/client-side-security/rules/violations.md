---
title: Content security rule violations
description: Cloudflare reports any violations to your content security rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ GraphQL ](https://developers.cloudflare.com/search/?tags=GraphQL)[ CSP ](https://developers.cloudflare.com/search/?tags=CSP) 

# Content security rule violations

Note

Only available to customers with Client-Side Security Advanced.

A rule violation occurs when a browser loads a resource that is not covered by one of your [content security rules](https://developers.cloudflare.com/client-side-security/rules/). For log rules, the resource loads normally but is reported. For allow rules, the browser blocks the resource.

Shortly after you configure content security rules, the Cloudflare dashboard will start displaying any violations of those rules. This information is available for rules with any [action](https://developers.cloudflare.com/client-side-security/rules/#rule-actions) (_Allow_ and _Log_).

Information about rule violations is also available via [GraphQL API](#get-rule-violations-via-graphql-api) and [Logpush](#get-rule-violations-via-logpush).

## Review rule violations in the dashboard

To view rule violation information:

* [  New dashboard ](#tab-panel-4770)
* [ Old dashboard ](#tab-panel-4771)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Content security rules**.

* In the Cloudflare dashboard, go to **Security** \> **Client-side security** \> **Rules**.

The displayed information includes the following:

* A sparkline next to the rule name, showing violations in the past seven days.
* For content security rules with associated violations, an expandable details section for each rule, with the top resources present in violation events and a sparkline per top resource.

## Get rule violations via GraphQL API

Use the [Cloudflare GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/) to obtain rule violation information through the following dataset:

* `pageShieldReportsAdaptiveGroups`

You can query the dataset for rule violations that occurred in the past 30 days.

Use [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/) to explore the available fields the GraphQL schema. For more information, refer to [Explore the GraphQL schema](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/).

For an introduction to GraphQL querying, refer to [Querying basics](https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/).

### Example

Example GraphQL query

```

query PageShieldReports(

  $zoneTag: string

  $datetimeStart: Time

  $datetimeEnd: Time

) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      pageShieldReportsAdaptiveGroups(

        limit: 100

        orderBy: [datetime_ASC]

        filter: { datetime_geq: $datetimeStart, datetime_leq: $datetimeEnd }

      ) {

        avg {

          sampleInterval

        }

        count

        dimensions {

          policyID

          datetime

          datetimeMinute

          datetimeFiveMinutes

          datetimeFifteenMinutes

          datetimeHalfOfHour

          datetimeHour

          url

          urlHost

          host

          resourceType

          pageURL

          action

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBACgQwOZgMoAsCWYA2ATAJTAAcB7CAFwGcAKAKBhgBIAvUgOzABVkAuGKhQiZ2SBszwIKYCpgC2aCgkr8u8sOKaTpshQFF2eVeroBKGAG9xAN2wB3SJfGM2nWgDNMOaRH4WYrtx8zIE8SDAAvuZWjLEwxMhoWLiEJOTUAIKSxLLWYADiEKQgxLTOcTA48pgU-ACMAAwN5XHkeJAAQlD8ANraMuoA+hmoAMIAui2xnt6QfjD9umCDKMD8WlIDCqhKlAA0C5tLgzhgaxJH6gZ4kVPRU4wI1uExFXFUCHLEpwCS7D7WBA4B63N6MADGxX+ILw6nYVEwHCoTjBsTIVXBUB+ABEQYxFiZUfjLgoALIiEDSPGHHTqABimDy5PYlLAVGpBIUDPc0jA7GZrPZRJpWzAAAkge4APLuMXFCAckni+XUkAQYHCtU4OWCanoUi64UQNny8HcKDEDTChIoACqBAAMtSEODZBwQREpp64t7bhEgA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhABMEAXGWgSwFsYBlWhAJ1rRACYADPwBsAWkEBWCQA44ARgDMqfjNSSAnBgrU6DFjDxQqfIaInTBc+RpVrN2gL5A)

Example curl request

Terminal window

```

echo '{ "query":

  "query PageShieldReports($zoneTag: string, $datetimeStart: string, $datetimeEnd: string) {

    viewer {

      zones(filter: {zoneTag: $zoneTag}) {

        pageShieldReportsAdaptiveGroups(limit: 100,  orderBy: [datetime_ASC], filter: {datetime_geq:$datetimeStart, datetime_leq:$datetimeEnd}) {

          avg {

            sampleInterval

          }

          count

          dimensions {

            policyID

            datetime

            datetimeMinute

            datetimeFiveMinutes

            datetimeFifteenMinutes

            datetimeHalfOfHour

            datetimeHour

            url

            urlHost

            host

            resourceType

            pageURL

            action

          }

        }

      }

    }

  }",

  "variables": {

    "zoneTag": "<CLOUDFLARE_ZONE_ID>",

    "datetimeStart": "2023-04-17T11:00:00Z",

    "datetimeEnd": "2023-04-24T12:00:00Z"

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data @-


```

## Get rule violations via Logpush

[Cloudflare Logpush](https://developers.cloudflare.com/logs/logpush/) supports pushing logs to storage services, SIEM systems, and log management providers.

Information about rule violations is available in the [page\_shield\_events dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/page%5Fshield%5Fevents/).

For more information on configuring Logpush jobs, refer to [Logpush](https://developers.cloudflare.com/logs/logpush/) documentation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/rules/","name":"Content security rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/rules/violations/","name":"Content security rule violations"}}]}
```
