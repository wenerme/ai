---
title: Metrics and analytics
description: Query Workflows execution metrics, error rates, and step durations via the dashboard or GraphQL Analytics API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics and analytics

Workflows expose metrics that allow you to inspect and measure Workflow execution, error rates, steps, and total duration across each (and all) of your Workflows.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

Workflows currently export the below metrics within the `workflowsAdaptiveGroups` GraphQL dataset.

| Metric             | GraphQL Field Name | Description                                                                                                                |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Read Queries (qps) | readQueries        | The number of read queries issued against a database. This is the raw number of read queries, and is not used for billing. |

Metrics can be queried (and are retained) for the past 31 days.

### Labels and dimensions

The `workflowsAdaptiveGroups` dataset provides the following dimensions for filtering and grouping query results:

* `workflowName` \- Workflow name - e.g. `my-workflow`
* `instanceId` \- Instance ID
* `stepName` \- Step name
* `eventType` \- Event type (see [event types](#event-types))
* `stepCount` \- Step number within a given instance
* `date` \- The date when the Workflow was triggered
* `datetimeFifteenMinutes` \- The date and time truncated to fifteen minutes
* `datetimeFiveMinutes` \- The date and time truncated to five minutes
* `datetimeHour` \- The date and time truncated to the hour
* `datetimeMinute` \- The date and time truncated to the minute

### Event types

The `eventType` metric allows you to filter (or groupBy) Workflows and steps based on their last observed status.

The possible values for `eventType` are documented below:

#### Workflows-level status labels

* `WORKFLOW_QUEUED` \- the Workflow is queued, but not currently running. This can happen when you are at the [concurrency limit](https://developers.cloudflare.com/workflows/reference/limits/) and new instances are waiting for currently running instances to complete.
* `WORKFLOW_START` \- the Workflow has started and is running.
* `WORKFLOW_SUCCESS` \- the Workflow finished without errors.
* `WORKFLOW_FAILURE` \- the Workflow failed due to errors (exhausting retries, errors thrown, etc).
* `WORKFLOW_TERMINATED` \- the Workflow was explicitly terminated.

#### Step-level status labels

* `STEP_START` \- the step has started and is running.
* `STEP_SUCCESS` \- the step finished without errors.
* `STEP_FAILURE` \- the step failed due to an error.
* `SLEEP_START` \- the step is sleeping.
* `SLEEP_COMPLETE` \- the step last finished sleeping.
* `ATTEMPT_START` \- a step is retrying.
* `ATTEMPT_SUCCESS` \- the retry succeeded.
* `ATTEMPT_FAILURE` \- the retry attempt failed.

## View metrics in the dashboard

Per-Workflow and instance analytics for Workflows are available in the Cloudflare dashboard. To view current and historical metrics for a database:

1. In the Cloudflare dashboard, go to the **Workflows** page.  
[ Go to **Workflows** ](https://dash.cloudflare.com/?to=/:account/workers/workflows)
2. Select a Workflow to view its metrics.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your Workflows via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

Workflows GraphQL datasets require an `accountTag` filter with your Cloudflare account ID, and includes the `workflowsAdaptiveGroups` dataset.

### Examples

To query the count (number of workflow invocations) and sum of `wallTime` for a given `$workflowName` between `$datetimeStart` and `$datetimeEnd`, grouping by `date`:

```

query WorkflowInvocationsExample(

  $accountTag: string!

  $datetimeStart: Time

  $datetimeEnd: Time

  $workflowName: string

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      wallTime: workflowsAdaptiveGroups(

        limit: 10000

        filter: {

          datetimeHour_geq: $datetimeStart

          datetimeHour_leq: $datetimeEnd

          workflowName: $workflowName

        }

        orderBy: [count_DESC]

      ) {

        count

        sum {

          wallTime

        }

        dimensions {

          date: datetimeHour

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA6gewgawGYBsEHcCSA7ANwQGMBDAFwEsE8BnAUQA9SBbAB3TAAoAoGGACSlixBCDzkAKqQDmALhi1yESnhkBCPoIAmFMFRZgAyuVIRyCyZUNaBu8vuth6ebZae2sSNJiwA5VjAFJRU1HgBKGABvLQJKMCxIaK1+YVFxclouVEp0BwgFKJg0sQlpeUESjPKYAF9ImP4mmCxSdHQrQwUvFAxsWgBBXTYqAjAAcQgxNiyU5ph0a0oLGABGAAZN9bnmnLzIQp35+0dDAAkxCAB9GTBgBTs9A2NTcyPmk+eLkGvOe50nk4XNp3k0ej5sAEuoJwX1-IFQbVQUhtJAAEJQBQAbXSEiuABF6EYAMIAXSODVBuPIoNoIBYyXm81a7U6YERoO0Tjo1DojKZTROCk+Tm+EA5TKRzSldR4tSAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQATMRAU0QEsBbNgZURgAToiwgATAAZxANgC0kgKxyAjIuQqAHJhUB2TJIDMALQbNWHHmwCi8JmKmyFylTOSTJO-UdOMA7tBCANYAZgA20H6kYLxiAErWAAoAMvjWFADqVMgAEhR8yHFUpADiIAC+QA)

Here we are doing the same for `wallTime`, `instanceRuns` and `stepCount` in the same query:

```

query WorkflowInvocationsExample2(

  $accountTag: string!

  $datetimeStart: Time

  $datetimeEnd: Time

  $workflowName: string

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      instanceRuns: workflowsAdaptiveGroups(

        limit: 10000

        filter: {

          datetimeHour_geq: $datetimeStart

          datetimeHour_leq: $datetimeEnd

          workflowName: $workflowName

          eventType: "WORKFLOW_START"

        }

        orderBy: [count_DESC]

      ) {

        count

        dimensions {

          date: datetimeHour

        }

      }

      stepCount: workflowsAdaptiveGroups(

        limit: 10000

        filter: {

          datetimeHour_geq: $datetimeStart

          datetimeHour_leq: $datetimeEnd

          workflowName: $workflowName

          eventType: "WORKFLOW_START"

        }

        orderBy: [count_DESC]

      ) {

        count

        dimensions {

          date: datetimeHour

        }

      }

      wallTime: workflowsAdaptiveGroups(

        limit: 10000

        filter: {

          datetimeHour_geq: $datetimeStart

          datetimeHour_leq: $datetimeEnd

          workflowName: $workflowName

        }

        orderBy: [count_DESC]

      ) {

        count

        sum {

          wallTime

        }

        dimensions {

          date: datetimeHour

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA6gewgawGYBsEHcCSA7ANwQGMBDAFwEsE8BnAUQA9SBbAB3TACYAKAKBgwAJKWLEEIPOQAqpAOYAuGLXIRKeOQEIBwgCYUwVFmADK5UhHJLplYzqH7yh22Hp5d1l-axI0mLAByrGBKKmoafACUMADeOgSUYFiQsTqCouKS5LQ8qJToThBKMTAZElKyisJlWZUwAL7RcYItMOoqpHjEYABKkrRKPigY2LQAgvpsVARgAOIQEmw5aa0w6LaUVjAAjAAM+7srrXkFkMVHq47OxgASEhAA+nJgwEoOBkam5pYXrVefdxAj04rz0Hxcbl0vxaQz82CCxjesJGgWC0MEYBmFSgbBCMAARHAAPI9ADSADEADJEuAPEzSMY9aT46H1aFIXSQABCUCUAG1MlIHgARegmADCAF0Lk1oYLyNDdC46NQ6KlVpcDEp-i5ARBWRc2RqVGA2OLyltkf5xpNpnMFiAlvwNYJ1ixNko9gdoSdCucXS0dbd7k8Xm8g18LAqA4II3qHiDw+DjJD0TArfDgkjfCiEWA05iwNjcUpCSSKdTafTGcyDQGOdzeTABRaRWKpTL1S75YrlbRVbQuwGrtrk2A9XXVkbVlhSOh0DZEemc9aJqQppQZvNFssA26PTsDocA76zkOXXGQ89Qe8nJ8zFG05egQmw2C7xD3GmM6il0If3mk4ag2EA8vy8pthK0oarKAY9gGtAgCw54arO86LvmAbThqSrGCqNCDs0MYjjAz76lhhorNObL1EAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQATMRAU0QEsBbNgZURgAToiwgATAAZxANgC0kgKxyAjIuQqAHJhUB2TJIDMALQbNWHHmwCi8JmKmyFylTOSTJO-UdOMA7tBCANYAZgA20H6kYLxiAErWAAoAMvjWFADqVMgAEhR8yHFUpADiIAC+QA)

Here lets query `workflowsAdaptive` for raw data about `$instanceId` between `$datetimeStart` and `$datetimeEnd`:

```

query WorkflowsAdaptiveExample(

  $accountTag: string!

  $datetimeStart: Time

  $datetimeEnd: Time

  $instanceId: string

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      workflowsAdaptive(

        limit: 100

        filter: {

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

          instanceId: $instanceId

        }

        orderBy: [datetime_ASC]

      ) {

        datetime

        eventType

        workflowName

        instanceId

        stepCount

        wallTime

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA6gewgawGYBsEHcDOBBAEwEMAHAFwEsA3MAUQA8iBbE9MACgCgYYASIgMYCEIAHZkAKkQDmALhg4yECqOkBCbn2JkwlJmADKZIhDLyJFfZt7bdluqILn71lYqKiBYAJJOFSlWlOAEoYAG9NKgowLEhwzR5BYTEyHHZUCnQdCHkwmCSRcSk5PgKU4pgAX1CInjqYLCQ0TFxCUkoaLnr69EsKMxgARgAGYYTujKzIXPHumFs9MAB9aTBgeRsiHUWjEzJZ7oX7JbZ1rS27fVpHA-q3Y08fP157jy9fW6rPpAJIACEoPIANpHfRLPAGADCAF0DjVPqCwJ8wDQilASEi5jxGigMNgAHLMTFY16PD5Y-xgEiQwr7ClYIjodAWKxzSrjdk8dmVIA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQATMRAU0QEsBbNgZURgAToiwgATAAZxANgC0kgKxyAjIuQqAHJhUB2TJIDMALQbNWHHmwCi8JmKmyFylTOSTJO-UdONO8AGdBeAg2KntsACVrAAUAGXxrCgB1KmQACWo6AF8gA)

#### GraphQL query variables

Example values for the query variables:

```

{

  "accountTag": "fedfa729a5b0ecfd623bca1f9000f0a22",

  "datetimeStart": "2024-10-20T00:00:00Z",

  "datetimeEnd": "2024-10-29T00:00:00Z",

  "workflowName": "shoppingCart",

  "instanceId": "ecc48200-11c4-22a3-b05f-88a3c1c1db81"

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/observability/metrics-analytics/","name":"Metrics and analytics"}}]}
```
