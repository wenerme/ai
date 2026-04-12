---
title: Metrics
description: Queues expose metrics which allow you to measure the queue backlog, consumer concurrency, and message operations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/queues/observability/metrics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Metrics

Queues expose metrics which allow you to measure the queue backlog, consumer concurrency, and message operations.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) are queried from Cloudflare’s [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

### Backlog

Queues export the below metrics within the `queuesBacklogAdaptiveGroups` dataset.

| Metric           | GraphQL Field Name | Description                                        |
| ---------------- | ------------------ | -------------------------------------------------- |
| Backlog bytes    | bytes              | Average size of the backlog, in bytes              |
| Backlog messages | messages           | Average size of the backlog, in number of messages |

The `queuesBacklogAdaptiveGroups` dataset provides the following dimensions for filtering and grouping queries:

* `queueID` \- ID of the queue
* `datetime` \- Timestamp for when the message was sent
* `date` \- Timestamp for when the message was sent, truncated to the start of a day
* `datetimeHour` \- Timestamp for when the message was sent, truncated to the start of an hour
* `datetimeMinute` \- Timestamp for when the message was sent, truncated to the start of a minute

### Consumer concurrency

Queues export the below metrics within the `queueConsumerMetricsAdaptiveGroups` dataset.

| Metric                    | GraphQL Field Name | Description                                            |
| ------------------------- | ------------------ | ------------------------------------------------------ |
| Avg. Consumer Concurrency | concurrency        | Average number of concurrent consumers over the period |

The `queueConsumerMetricsAdaptiveGroups` dataset provides the following dimensions for filtering and grouping queries:

* `queueID` \- ID of the queue
* `datetime` \- Timestamp for the consumer metrics
* `date` \- Timestamp for the consumer metrics, truncated to the start of a day
* `datetimeHour` \- Timestamp for the consumer metrics, truncated to the start of an hour
* `datetimeMinute` \- Timestamp for the consumer metrics, truncated to the start of a minute

### Message operations

Queues export the below metrics within the `queueMessageOperationsAdaptiveGroups` dataset.

| Metric                    | GraphQL Field Name | Description                                                                                                     |
| ------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Total billable operations | billableOperations | Sum of billable operations (writes, reads, and deletes) over the time period                                    |
| Total Bytes               | bytes              | Sum of bytes read, written, and deleted from the queue                                                          |
| Lag                       | lagTime            | Average lag time in milliseconds between when the message was written and the operation to consume the message. |
| Retries                   | retryCount         | Average number of retries per message                                                                           |
| Message Size              | messageSize        | Maximum message size over the specified period                                                                  |

The `queueMessageOperationsAdaptiveGroups` dataset provides the following dimensions for filtering and grouping queries:

* `queueID` \- ID of the queue
* `actionType` \- The type of message operation. Can be `WriteMessage`, `ReadMessage` or `DeleteMessage`
* `consumerType` \- The queue consumer type. Can be `worker` or `http`. Only applicable for `ReadMessage` and `DeleteMessage` action types
* `outcome` \- The outcome of the mesage operation. Only applicable for `DeleteMessage` action types. Can be `success`, `dlq` or `fail`.
* `datetime` \- Timestamp for the message operation
* `date` \- Timestamp for the message operation, truncated to the start of a day
* `datetimeHour` \- Timestamp for the message operation, truncated to the start of an hour
* `datetimeMinute` \- Timestamp for the message operation, truncated to the start of a minute

## Example GraphQL Queries

### Get average queue backlog over time period

```

query QueueBacklog(

  $accountTag: string!

  $queueId: string!

  $datetimeStart: Time!

  $datetimeEnd: Time!

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      queueBacklogAdaptiveGroups(

        limit: 10000

        filter: {

          queueId: $queueId

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

        }

      ) {

        avg {

          messages

          bytes

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAiucAhAhgYwNYBsD2BzACgCgYYASdNHEAOwBcAVFPALhgGc6IBLGvAQhLlQYcAEkAJm048+g0mQko6YOtwC2YAMp0UEOmwYaw88kpVrNAURpSYRzYICUMAN5CAbtzAB3SG6FSSmp6dgIAM24sFQg2Vxhg2kZmNgo0KiSmPBgAXxd3UkKYEWR0bHwAQSUABzUPMABxCGpqsMCimCwNbgMYAEYABiGB9qLI6Mg40Y6SsElU2clpovNVYwB9PDBgVNXLbV19ZcK9jaxt3eU161tjnOn845QPbIKOos12dmYwdmPSABGUBUf3epHu7whhSh9xyQA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBHWAUzaoBMsQAlAUQAKAGXz8KAdSrIAEtTqNOYRK0QBLALasAyojAAnRDwBMABmMA2ALSmALFYCMx5Ocy2LmcwC0GIJSvUtfnhubDNLG3snFwAONw9vEABfIA)

### Get average consumer concurrency by hour

```

query QueueConcurrencyByHour(

  $accountTag: string!

  $queueId: string!

  $datetimeStart: Time!

  $datetimeEnd: Time!

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      queueConsumerMetricsAdaptiveGroups(

        limit: 10000

        filter: {

          queueId: $queueId

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

        }

        orderBy: [datetimeHour_DESC]

      ) {

        avg {

          concurrency

        }

        dimensions {

          datetimeHour

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAiucBhA9gOwMYghMmoBCUAEitgBQBQMMAJAIYYZloAuAKvQOYBcMAzqwgBLNFwCE1OqDDgAkgBM+gkWMk1aC+qzCthAWzABlVvQis+7A2HV0tOvYYCiaJTCuHJAShgBvKQBuwmAA7pB+UjSMzCBs-OQAZsIANjoQfL4w0Swc3HwMTDmcXDAAvj7+NFUwMsjo-CCGEACyuiIY-ACCWgAOegFgAOIQZD3xkdUwyQbCFjAAjAAMy4sT1UmpkBlrk7Vgivl7ijvV9rrWAPpcYMD5Z47GpuYnVfeXyTd32ufOri+lLxQEAUkCIfAA2m9DKRsBcACJOIxIAC6OwqL3oARKlUm1WYmGwuHw-xeCmsaH4wnqEVxp2+DxhEBJuIB1VZZUopSAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBHWAUzaoBMsQAlAUQAKAGXz8KAdSrIAEtTqNOYRK0QBLALasAyojAAnRDwBMABmMA2ALSmALFYCMx5Ocy2LmcwC0GIJSvUtfnhubDNLG3snFwAONw9vEABfIA)

### Get message operations by minute

```

query QueueMessageOperationsByMinute(

  $accountTag: string!

  $queueId: string!

  $datetimeStart: Date!

  $datetimeEnd: Date!

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      queueMessageOperationsAdaptiveGroups(

        limit: 10000

        filter: {

          queueId: $queueId

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

        }

        orderBy: [datetimeMinute_DESC]

      ) {

        count

        sum {

          bytes

        }

        dimensions {

          datetimeMinute

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAiucBZMBnVBDA5mA8gB0gwBcBLAewDtUAhKJUykYsACgCgYYASDAYz7kQlYgBVsALhipiERlgCEnHqDDgAkgBMpMuZUXLumkmDIBbMAGViGCMSkARE0q5GT5sAFFK2mE5ZKAJQwAN7KAG6kYADukKHKXPyCwsSorABmpAA2LBBSITBJQiLiWFK8AsVi2DAAvsFhXE0wqshomDgERGRUqACCxvhk4WAA4hBC+GkJzTBZpGak9jAAjAAMG2szzZk5kPnbs61gWuXHWofNxiweAPo4wOXXpgtWNnaXTc93WWCPPN9Xt5NJ9ap9yBBNJA6FIANqAiwMJgsW4OTyWADCAF1Dg1PskRJ9UCAzPFZrMAEZQFioUGfTSvagUahk8lfdyvJHMMB08lg5r8ursWpAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBHWAUzaoBMsQAlAUQAKAGXz8KAdSrIAEtTqNOYRK0QBLALasAyojAAnRDwBMABmMA2ALSmALFYCMDhiCUr1W-vG7Yzlm-YOxiAAvkA)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/observability/metrics/","name":"Metrics"}}]}
```
