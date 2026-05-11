---
title: GraphQL Analytics
description: Use the GraphQL Analytics API to retrieve Network Flow data.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ GraphQL ](https://developers.cloudflare.com/search/?tags=GraphQL) 

# GraphQL Analytics

**Last reviewed:**  over 3 years ago 

Use the GraphQL Analytics API to retrieve Network Flow (formerly Magic Network Monitoring) flow data.

Before you begin, you must have an [API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/). For additional help getting started with GraphQL Analytics, refer to [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/).

### Obtain your Cloudflare Account ID

To query Network Flow data via GraphQL, you need your Cloudflare Account ID.

1. Log in to the Cloudflare dashboard, and select your account.
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home) 
1. The URL in your browser's address bar should show `https://dash.cloudflare.com/` followed by a hex string. The hex string is your Cloudflare Account ID.

## Explore GraphQL schema with Network Flow example

Run a test query to retrieve bits and packets aggregated in five-minute intervals. Copy and paste the following code into GraphiQL.

For additional information about the Analytics schema, refer to [Explore the Analytics schema with GraphiQL](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/).

```

query MagicNetworkMonitoring($accountTag: string!, $start: Time, $end: Time) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      mnmFlowDataAdaptiveGroups(

        filter: { datetime_gt: $start, datetime_leq: $end }

        limit: 10

        orderBy: [datetimeFiveMinutes_DESC]

      ) {

        sum {

          bits

          packets

        }

        dimensions {

          datetimeFiveMinutes

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsgQwOYEsDGA5MAXA7gewgGs58A7FbQlMpACgBIE018QzsAVZALhgGdsEGkgCEAGhgNBCCNj6cUAWzCSGYMgBMFysAEoYAbwBQMGADcUYXJCOmzMZq3bZ+dAGYoANtkh9DjixsHNxIfExBLqEwAL4GJg4OSmRKAGJe+LgAIgjYCACCmggADtgo5mAA4hBsxW72iWaePn5GMEW+ZSoA+kjyUjJykh04ut1eYMDhGpqxDY1eypR8AIwADPOJhJqQAEJQfADaI11gqeVgcDQgvvzdWQCiAMoAwgC6mzDxn2b8IEp2RqNABGlH4PwcxWYRBw4KBZhiEM0ujI-BQ5H4gPhZhOunOFSuZBuYDh8MRQPJDkpiJiQA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0SxACYAGbgGwBaXgFYhARgnJeAZkyiBmWdwBaDEAFN4AEy59BI8VJkBOBUpXqAvkA)

Note

Cloudflare analytics are case sensitive for paths and URIs. Make sure that filters or queries use the correct case.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/tutorials/graphql-analytics/","name":"GraphQL Analytics"}}]}
```
