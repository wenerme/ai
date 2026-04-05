---
title: Monitoring API
description: The Zaraz Monitoring API allows users to retrieve detailed data on Zaraz events through the GraphQL Analytics API. Using this API, you can monitor events, pageviews, triggers, actions, and server-side request statuses, including any errors and successes. The data available through the API mirrors what is shown on the Zaraz Monitoring page in the dashboard, but with the API, you can query it programmatically to create alerts and notifications for unexpected deviations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/monitoring/monitoring-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Monitoring API

The **Zaraz Monitoring API** allows users to retrieve detailed data on Zaraz events through the **GraphQL Analytics API**. Using this API, you can monitor events, pageviews, triggers, actions, and server-side request statuses, including any errors and successes. The data available through the API mirrors what is shown on the Zaraz Monitoring page in the dashboard, but with the API, you can query it programmatically to create alerts and notifications for unexpected deviations.

To get started, you'll need to generate an Analytics API token by following the [API token authentication guide](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).

## Key Entities

The Monitoring API includes the following core entities, which each provide distinct insights:

* **zarazTrackAdaptiveGroups**: Contains data on Zaraz events, such as event counts and timestamps.
* **zarazActionsAdaptiveGroups**: Provides information on Zaraz Actions.
* **zarazTriggersAdaptiveGroups**: Tracks data on Zaraz Triggers.
* **zarazFetchAdaptiveGroups**: Captures server-side request data, including URLs and returning status codes for third-party requests made by Zaraz.

## Example GraphQL Queries

You can construct any query you'd like using the above datasets, but here are some example queries you can use.

* [ Events ](#tab-panel-8649)
* [ Loads ](#tab-panel-8650)
* [ Triggers ](#tab-panel-8651)
* [ Erroneous responses ](#tab-panel-8652)

Query for the count of Zaraz events, grouped by time.

```

query ZarazEvents(

  $zoneTag: string

  $limit: uint64!

  $start: Time

  $end: Time

  $orderBy: ZoneZarazTrackAdaptiveGroupsOrderBy!

) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      data: zarazTrackAdaptiveGroups(

        limit: $limit

        filter: { datetimeHour_geq: $start, datetimeHour_leq: $end }

        orderBy: [$orderBy]

      ) {

        count

        dimensions {

          ts: datetimeHour

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAWgQwggXgUQG5gHYBcDOAFAFAwwAkKA9tmACoIDmAXDPrhAJbaOkUA2nALadcrEN1wA2ACwBCPuXZIxMOsLCKcAE1bqhmsuSoRtkAEJRWcGmETIUdZAGMA1gEFtCAA65OWAHEIKhBvfAB5UwsoBQBKGABvPgxOMAB3SES+MmpaIgAzTn5cSFYEmFz6JlZKWwZGGABfeKSyNpgvXARWFCRUJwQ3Tx8-QODQomz2mEERVXJZ0Sn2wuLSxI6EEr8DAAkQiAB9RjBgGuUIXAAaTe2NfZAj-lOanSbltpMzCEtWAG1jFEflAALofFofMjOEJ4SEdDTYfCcGj4LLTaYEVidMA7MAPCBwxofIntEnvRpAA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhABsBLAWxoBc0BGABjcoGdGEAnZugBMbIQDYAtGwAsU6XDYBOVEOmolGCiBhQAJmhAjxcuXBYBWFWo1aIfXTD4AhAJ4HdCRjEb0YACQgAVz4CAEEAZQBhEABfIA)

Query for the count of Zaraz loads, grouped by time.

```

query ZarazLoads(

  $zoneTag: string

  $limit: uint64!

  $start: Date

  $end: Date

  $orderBy: ZoneZarazTriggersAdaptiveGroupsOrderBy!

) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      data: zarazTriggersAdaptiveGroups(

        limit: $limit

        filter: { date_geq: $start, date_leq: $end, triggerName: Pageview }

        orderBy: [$orderBy]

      ) {

        count

        dimensions {

          ts: date

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAWgQwggXgGQPYICYGcAUAUDDACQoYB2YAKggOYBcMuALhAJaX3FkA2HALYdWzEF1YA2ACwBCXqTZJRMACIJWYBWErZm6zQowRskAEJRmcKmETIUNTvXqRcAQWwIADqw4A3MABxCAwQL1wAeRNzKHkAShgAb14-DjAAd0gk3hIKagIAMw4+TQhmRJg82gZmchs6ehgAXwTkknaYT1YEZhQkVEcOZ1cPb18A4NDwog6OgWEVUnmRHNmikshyzo0wAH0XYFqlCFYAGm3NXb4wQ7IdbHP2IZcIADkEQTBmAAUGMFSMs1Vh1jKYIBZmABtUigmIAXWBMFaiJIAGNQpRWCjOkIdLgOFRcNlZrNWLhmF0tCSSE1EbSOvSgU0gA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhABsBLAWxoBc0BGABjcoGdGEAnZugBMbIQDYAtGwAsUgMwUQMKABM0IEeKmyZiiHxUw+AIQCe6lQkYwCAQQDKAYRABfIA)

Query for the total execution count of each trigger processed by Zaraz.

```

query ZarazTriggers(

  $zoneTag: string

  $limit: uint64!

  $start: Date

  $end: Date

) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      data: zarazTriggersAdaptiveGroups(

        limit: $limit

        filter: { date_geq: $start, date_leq: $end }

        orderBy: [count_DESC]

      ) {

        count

        dimensions {

          name: triggerName

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAWgQwggXgFQgSwObcgZwAoAoGGAEhQHsA7MNBbALhnwBcsbtSKAbTALaY2LEJhpsAbABYAhD3LskImABEEbMArA0AJi3WbiAShgBvHgDdMYAO6RzPMtTpEAZpl6aILMzBf0jCyUtIHYMAC+phZksTC6GggsKEioGDh4EPgAggkADmyYlmAA4hBUIHlETnEw-EIq5PXCNXEeXpC+8RpgAPp4wMFKEGwANN2avbxggxQ6upGtsVQQupAAQlAsANoAxhUSvaoAogDKAMIAukvRS2T7IBJ38YI6+Ji0+I61tTQIAmAWBwMpAAHL-LQ-MgRJYwuJwxYRIA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhABsBLAWxoBc0BGABjcoGdGEAnZugBMbIQDYAtGwAsUgMwUQMKABM0IEeKmyZIAL5A)

Query for the count of 400 server-side responses, grouped by time and URL.

```

query ErroneousResponses(

  $zoneTag: string

  $limit: uint64!

  $start: Time

  $end: Time

  $orderBy: ZoneZarazFetchAdaptiveGroupsOrderBy!

) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      data: zarazFetchAdaptiveGroups(

        limit: $limit

        filter: {

          datetimeHour_geq: $start

          datetimeHour_leq: $end

          url_neq: ""

          status: 400

        }

        orderBy: [$orderBy]

      ) {

        count

        dimensions {

          ts: datetimeHour

          name: url

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAohCB7AdmJIDOAlMmAOqmeAFAFAwwAkAXqmACoCGA5gFwyYAuEAliiwrUANrwC2vLhxD8uANgAsAQiFVuTCFJgNxYVWBQATDjrF7KVJBEOQAQlA4Ateo41MaAMTBcAxgAsAQUMmfC5eADcwAHFkEHxMAHlrOygVAEoYAG8hcN4wAHdILKFKOjRMEgAzXmEuSA5MmDLGVg5aemYWGABfDOzKAZhgriYOGjdPb38gkLDImIx48kHB0QktKjXJEpXq2vrilZXh710ACQwIAH0WMGA29U0do5OwswuQa+E7toNDZ5Wn2EVzQ9xgACJwQDBuouFgOAoAAyI6E9VFWGwQewcADalmSWKgAF0AX1UT4MCguKjDLoUJheERDkcBlxMBxXudLqjKCgmGZpBBhKjugDRYNxWjukA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhABsBLAWxoBc0BGABjcoGdGEAnZugBMbIQDYAtGwAsU6XDYBOVEOmolGCiBhQAJmhAjxcuXBYBWFWo1aIfXTD4AhAJ4HdCRjEb0YACQgAVz4CAEEAZQBhEABfIA)

### Variables Example

```

{

  "zoneTag": "d6dfdf32c704a77ac227243a5eb5ca61",

  "start": "2025-01-01T00:00:00Z",

  "end": "2025-01-30T00:00:00Z",

  "limit": 10000,

  "orderBy": "datetimeHour_ASC"

}


```

Be sure to customize the zoneTag to match your specific zone, along with setting the desired start and end dates

### Explanation of Parameters

* **zoneTag**: Unique identifier of your Cloudflare zone.
* **limit**: Maximum number of results to return.
* **start** and **end**: Define the date range for the query in ISO 8601 format.
* **orderBy**: Determines the sorting order, such as by ascending or descending datetime.

## Example `curl` Request

Use this `curl` command to query the Zaraz Monitoring API for the number of events processed by Zaraz. Replace `$TOKEN` with your API token, `$ZONE_TAG` with your zone tag, and adjust the start and end dates as needed.

Terminal window

```

curl -X POST https://api.cloudflare.com/client/v4/graphql \

  -H "Content-Type: application/json" \

  -H "Authorization: Bearer $TOKEN" \

  -d '{

    "query": "query AllEvents($zoneTag: String!, $limit: Int!, $start: Date, $end: Date, $orderBy: [ZoneZarazTriggersAdaptiveGroupsOrderBy!]) { viewer { zones(filter: { zoneTag: $zoneTag }) { data: zarazTrackAdaptiveGroups( limit: $limit filter: { datetimeHour_geq: $start datetimeHour_leq: $end } orderBy: [$orderBy] ) { count dimensions { ts: datetimeHour } } } } }",

    "variables": {

      "zoneTag": "$ZONE_TAG",

      "start": "2025-01-01T00:00:00Z",

      "end": "2025-01-30T00:00:00Z",

      "limit": 10000,

      "orderBy": "datetimeHour_ASC"

    }

  }'


```

### Explanation of the `curl` Components

* **Authorization**: The `Authorization` header requires a Bearer token. Replace `$TOKEN` with your actual API token.
* **Content-Type**: Set `application/json` to indicate a JSON payload.
* **Data Payload**: This payload includes the GraphQL query and variable parameters, such as `zoneTag`, `start`, `end`, `limit`, and `orderBy`.

This `curl` example will return a JSON response containing event counts and timestamps within the specified date range. Modify the `variables` values as needed for your use case.

## Additional Resources

Refer to the [full GraphQL Analytics API documentation](https://developers.cloudflare.com/analytics/graphql-api/) for more details on available fields, filters, and further customization options for Zaraz Monitoring API queries.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/monitoring/","name":"Monitoring"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/monitoring/monitoring-api/","name":"Monitoring API"}}]}
```
