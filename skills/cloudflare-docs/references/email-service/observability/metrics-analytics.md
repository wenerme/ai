---
title: Metrics and analytics
description: Query Email Service sending metrics and delivery rates via the dashboard or GraphQL Analytics API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics and analytics

Email Service exposes analytics that allow you to inspect email sending performance and delivery rates across all your domains.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) charts are queried from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

Email Service currently exposes the below metrics:

| Dataset              | GraphQL Dataset Name       | Description                                                                                                                  |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Sending (aggregated) | emailSendingAdaptiveGroups | Aggregated email sending counts grouped by dimensions such as status, date, sending domain, and authentication results.      |
| Sending (events)     | emailSendingAdaptive       | Individual email sending events with full detail including sender, recipient, subject, message ID, and error information.    |
| Routing (aggregated) | emailRoutingAdaptiveGroups | Aggregated email routing counts grouped by dimensions such as status, date, recipient domain, and authentication results.    |
| Routing (events)     | emailRoutingAdaptive       | Individual email routing events with full detail including sender, recipient, subject, message ID, and processing decisions. |

Metrics can be queried (and are retained) for the past 31 days.

## View metrics in the dashboard

Per-domain analytics for Email Service are available in the Cloudflare dashboard. To view current and historical metrics:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Compute** \> **Email Service** and select **Email Sending** or **Email Routing**.
3. Select an existing domain or view account-wide metrics.
4. Select the **Analytics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your Email Service domains via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

To get started using the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/), follow the documentation to setup [Authentication for the GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/). Your API token must include the **Analytics Read** permission.

These are **zone-level** datasets. To query them, provide your zone ID (not account ID) as the `zoneTag` filter. The GraphQL datasets for Email Service include:

* `emailSendingAdaptiveGroups` — aggregated email sending counts with groupable dimensions
* `emailSendingAdaptive` — individual email sending events
* `emailRoutingAdaptiveGroups` — aggregated email routing counts with groupable dimensions
* `emailRoutingAdaptive` — individual email routing events

### Email Sending dimensions

The `emailSendingAdaptiveGroups` dataset supports the following dimensions for grouping and filtering:

| Dimension              | Type   | Description                                              |
| ---------------------- | ------ | -------------------------------------------------------- |
| date                   | Date   | Day-level grouping                                       |
| datetime               | Time   | Exact event timestamp                                    |
| datetimeMinute         | Time   | Minute-level grouping                                    |
| datetimeFiveMinutes    | Time   | 5-minute interval grouping                               |
| datetimeFifteenMinutes | Time   | 15-minute interval grouping                              |
| datetimeHour           | Time   | Hour-level grouping                                      |
| status                 | string | Delivery status (for example, delivered, deliveryFailed) |
| eventType              | string | Origin of email (incoming, forward, reply, newEmail)     |
| sendingDomain          | string | The domain used to send the email                        |
| envelopeTo             | string | Recipient envelope address                               |
| errorCause             | string | Error cause for failed sends                             |
| arc                    | string | ARC authentication result                                |
| dkim                   | string | DKIM authentication result                               |
| dmarc                  | string | DMARC authentication result                              |
| spf                    | string | SPF authentication result                                |
| isSpam                 | uint8  | Whether the email was flagged as spam                    |
| isNDR                  | uint8  | Whether the email is a non-delivery report               |
| isLastEvent            | uint8  | Whether this is the last event for this email            |

The `emailSendingAdaptive` dataset includes all of the above plus per-event fields: `from`, `to`, `subject`, `messageId`, `sessionId`, `errorDetail`.

### Email Routing dimensions

The `emailRoutingAdaptiveGroups` dataset supports the following dimensions for grouping and filtering:

| Dimension              | Type   | Description                                          |
| ---------------------- | ------ | ---------------------------------------------------- |
| date                   | Date   | Day-level grouping                                   |
| datetime               | Time   | Exact event timestamp                                |
| datetimeMinute         | Time   | Minute-level grouping                                |
| datetimeFiveMinutes    | Time   | 5-minute interval grouping                           |
| datetimeFifteenMinutes | Time   | 15-minute interval grouping                          |
| datetimeHour           | Time   | Hour-level grouping                                  |
| status                 | string | Resulting outcome for the email                      |
| eventType              | string | Origin of email (incoming, forward, reply, newEmail) |
| action                 | string | Action applied by the routing rule                   |
| ruleMatched            | string | UUID of the routing rule matched by the email        |
| arc                    | string | ARC authentication result                            |
| dkim                   | string | DKIM authentication result                           |
| dmarc                  | string | DMARC authentication result                          |
| spf                    | string | SPF authentication result                            |
| isSpam                 | uint8  | Whether the email was flagged as spam                |
| isNDR                  | uint8  | Whether the email is a non-delivery report           |
| isLastEvent            | uint8  | Whether this is the last event for this email        |

The `emailRoutingAdaptive` dataset includes all of the above plus per-event fields: `from`, `to`, `subject`, `messageId`, `sessionId`, `errorDetail`, `ruleMatched`.

### Examples

The following are common GraphQL queries that you can use to retrieve information about Email Service analytics. These queries use the variable `$zoneTag`, which should be set to your Cloudflare Zone ID. You can find this in the Cloudflare dashboard under your domain's **Overview** page.

```

{

  "zoneTag": "<YOUR_ZONE_ID>",

  "start": "2024-07-15",

  "end": "2024-07-30"

}


```

#### Email sending operations

To query the count of emails for a given date range, grouped by `date` and `status` (for example, `delivered`, `deliveryFailed`):

```

query EmailSendingByStatus($zoneTag: string!, $start: Date!, $end: Date!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      emailSendingAdaptiveGroups(

        filter: { date_geq: $start, date_leq: $end }

        limit: 10000

        orderBy: [date_DESC]

      ) {

        count

        dimensions {

          date

          status

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAogWwIYEsA2BlMA7AJi7AcwCEoMAXJckAZwAoASALwHtswAVJQgLhhvIQChAIQAaGAwFII5PgBEqYcZJy4FSkQEoYAbwBQMGADcUYAO6Q9hozFbt6AM3TlIfXXbadufZl66EMAC+Oga2tmDI6Fh4wgCCuEgADuQoxmAA4hAsIEn0NuFGzmiuEO4wia4A+oRgwL7SshKVYFVodb5qwQWFaCgIKHIwAIwADOOjPeEsELiQpHwA2i1V8nAYAMIAulMwobtGAMY52OQHFf04NChsNNaFhS3nRtLUNOdBu5-h391BQA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOwUQMKABNm7LrwEAOEAF8gA)

#### Delivery failure analysis

To investigate delivery failure causes for a specific date range, grouped by `errorCause` and `sendingDomain`:

```

query EmailDeliveryFailures($zoneTag: string!, $start: Date!, $end: Date!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      emailSendingAdaptiveGroups(

        filter: { date_geq: $start, date_leq: $end, status: "deliveryFailed" }

        limit: 10000

        orderBy: [date_DESC]

      ) {

        count

        dimensions {

          date

          errorCause

          sendingDomain

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAogWwIYEsA2ARMaUDdJQBiqaIEYAzgBQAkAXgPYB2YAKkgOYBcMFALhBRMOAQgA0MGvyQQ+PDEj5hxksEwAm8xcoCUMAN4AoGDFwowAd0gHjJmIxbUAZuiUQe++8zace9b+wcMAC+ekZ2dmDI6ADKaupCHACC6kgADnx4YADiEAwgadS2ESYuaG4eMKlKAPocYMB+0rIS1WA1aA1+8RLSfCAUPABE6thZ0MToYOpDIcUlOAgocjAAjAAMm+vzEQwQoxAAQlA8ANptNRhwMQDCALo7MGGPJgDG+Ux8L1UoCGoUKGYFBsJRKbW+JkgeQgNyQAzAEN48USGAY0SY32CjyxERxc2CQA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOwUQMKABNm7LrwEAOEAF8gA)

#### Hourly volume

To query email sending volume grouped by hour, useful for identifying traffic patterns:

```

query EmailSendingHourlyVolume($zoneTag: string!, $start: Time!, $end: Time!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      emailSendingAdaptiveGroups(

        filter: { datetimeHour_geq: $start, datetimeHour_leq: $end }

        limit: 10000

        orderBy: [datetimeHour_ASC]

      ) {

        count

        dimensions {

          datetimeHour

          status

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAogWwIYEsA2BlMA7AJi7AcwAkB7ECNKANVLRATAAoASAL1OzABUlCAuGAGcALhAKEAhABoYLUUggjB3FIxlycuFWrCSAlDADeAKBgwAbijAB3SMbPmYHLkKYAzdCMiCjzzjx8guwBvIQwAL6Gpk5OYMjoWHgSAIK4SAAOIigWYADiEOQZbo6x5p5o3hC+MOne2YxkFAD6hGDAwQpKsnVgDWBNEM1o7cFakaVlaGooyjAAjAAMy4uTsaQQuJAAQlCCANq9-YPNKRgAwgC6azDRN+YAxuTYIve1uthCKJxCDmVlR10gze5gUIhAQjeERu0NisImESAA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGABxw2AVlQAWAJyoAzKIwUQMKABNm7LrwHD+-STPmKAvkA)

#### Individual email events

To query individual email events for troubleshooting specific delivery issues. This uses the `emailSendingAdaptive` dataset and filters by `datetime` (Time type):

```

query RecentEmailEvents($zoneTag: string!, $start: Time!, $end: Time!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      emailSendingAdaptive(

        filter: { datetime_geq: $start, datetime_leq: $end }

        limit: 50

        orderBy: [datetime_DESC]

      ) {

        datetime

        from

        to

        subject

        status

        eventType

        sendingDomain

        messageId

        errorCause

        errorDetail

        dkim

        dmarc

        spf

        isSpam

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBASmAxmAdgFwKIFsCGBLAGwwDdU0BnACgBIAvAexTABUcBzALhnLQjxTYBCADQxqPHBDRdmeLGBFjUAExlyFAShgBvAFAwYxPGADukHfoMwGTKgDNCaSF23XGLdlzrvWbGAF8tPSsrMFxCAGUVfjYAQWUcAAc0PFJKSxCDBwInCBcYBKcU+QB9NjBgLwkpUUKwYrASggqvFQCMzII5PGkYAFYABg6Q+ghlSAAhKC4AbTqGkoARDAiAYQBdYZggrYN59V2YOwh6LEO0ekPyEAAjACskNCu0HDQQckOwUnRmKESwK7RASLU74FCHeTkcjsMAASWUnwgJwgqxw7wBmVCSNGi3q+AIh2UAGs5ITcBBEFdEnZDnhyBFEjgzpj-B1WQZWf4gA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGABxw2AVlQAWAJyoAzKIwUQMKABNm7LrwHD+-STPmKAvkA)

#### Email routing operations

To query the count of routed emails for a given date range, grouped by `date` and `status`:

```

query EmailRoutingByStatus($zoneTag: string!, $start: Date!, $end: Date!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      emailRoutingAdaptiveGroups(

        filter: { date_geq: $start, date_leq: $end }

        limit: 10000

        orderBy: [date_DESC]

      ) {

        count

        dimensions {

          date

          status

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAogWwIYEsA2AlA9iALigOwHMAhKAZVyVxAGcAKAEgC8sCwAVJIgLhltwRCRAIQAaGIwFIIuPgBFqYcZLAEAJgqUiAlDADeAKBgwAbijAB3SAeMmYrdgwBm6XJD76HbTtz4sfLiIYAF89I3t7MGR0bDxhAEF1JAAHfFMwAHEIHBSGO0iTVzR3CE8YZPcAfSIwYH9pWQlKsCq0Ov81dVCCwrQUBBQ5GABGAAYJsd7IrAh1SDI+AG0Wqvk4cgBhAF1pmHC9kwBjHAJcQ4qBtVoUNlpbQsKWi5NpGloLkL2vyJ+ekKAA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOwUQMKABNm7LrwEAOEAF8gA)

#### Routing rule activity

To see which routing rules are matching emails, grouped by `ruleMatched` and `action`:

```

query EmailRoutingRuleActivity($zoneTag: string!, $start: Date!, $end: Date!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      emailRoutingAdaptiveGroups(

        filter: { date_geq: $start, date_leq: $end }

        limit: 10000

        orderBy: [date_DESC]

      ) {

        count

        dimensions {

          date

          ruleMatched

          action

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAogWwIYEsA2AlA9iALigOwHMMQ0wBBAY3wDcVcoAKAEgC8sCwAVJIgLhgBnXBEJEAhABoYLEUgi5BAESS4w02WAIATFWo0BKGAG8AUDBj0wAd0imLlmBy5CmAM3TqIgk8848fILsAbxEMAC+xuZOTmDI6Nh44hQ6SAAOdGAA4hA46W6OsZaeaN6+MGnqAPpEYMDB8ooyVWDV5A1aupFFxWgoCAyCAIwADOOjvbFYEDqQAEJQggDardXKcADKAMIAulMw0QeWVDgEuMeVA9pCKJxCDsXFrZeWEGRgALJqVAAWYDpXjAkDQ7gRLhEDpDYtCehEgA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGAOwUQMKABNm7LrwEAOEAF8gA)

#### Individual routing events

To query individual routing events for troubleshooting:

```

query RecentRoutingEvents($zoneTag: string!, $start: Time!, $end: Time!) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      emailRoutingAdaptive(

        filter: { datetime_geq: $start, datetime_leq: $end }

        limit: 50

        orderBy: [datetime_DESC]

      ) {

        datetime

        from

        to

        subject

        status

        action

        ruleMatched

        messageId

        errorDetail

        dkim

        dmarc

        spf

        isSpam

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBASmAxmAdgFzgexGgligcwFEA3VNAZwAoASAL0xTABUBDAgLhgrQnwICEAGhg0erCGi7NcAWzDDRqACbS5CgJQwA3gCgYMErjAB3SDv0GYDJtQBmuADZpIXbdcYt2Xep7YEYAF8tPSsrMFlWJywcfgBBZVYABzwyKkswgwdnVx0YRJc8eQB9AjBgH3FJEQKwIrBix3KfFSCMzMc5XCkYAFYABnawzAhlSAAhKC4AbVr64oARIgBlAGEAXSGYEK2DOfVdmDsITFlDtExDihAAIwArJDQrtFY0EApD1kQ8RkOIECaAFlXogABZgZSHeQUCjsMAASUhmXCEBOEAWdSijkOygA1nIcZEIIgrkk7IdcBRlklWGdkYF2gyDAzAkA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2eBGABxw2AVlQAWAJyoAzKIwUQMKABNm7LrwHD+-STPmKAvkA)

Note

The `*AdaptiveGroups` datasets use `Date` type filters (`date_geq`, `date_leq`) for day-level filtering, or `Time` type filters (`datetimeHour_geq`, etc.) for finer granularity. The `*Adaptive` (events) datasets use `Time` type filters (`datetime_geq`, `datetime_leq`), for example `"2024-07-15T00:00:00Z"`.

## Next steps

* [Email logs](https://developers.cloudflare.com/email-service/observability/logs/) — view individual email activity in the dashboard.
* [Audit logs](https://developers.cloudflare.com/email-service/observability/audit-logs/) — track configuration changes.
* [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) — full GraphQL API reference.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/observability/metrics-analytics/#page","headline":"Metrics and analytics · Cloudflare Email Service docs","description":"Query Email Service sending metrics and delivery rates via the dashboard or GraphQL Analytics API.","url":"https://developers.cloudflare.com/email-service/observability/metrics-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/observability/","name":"Observability and logs"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/observability/metrics-analytics/","name":"Metrics and analytics"}}]}
```
