---
title: Migrate to new GraphQL nodes
description: Migrate to new GraphQL analytics nodes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ GraphQL ](https://developers.cloudflare.com/search/?tags=GraphQL)[ Migration ](https://developers.cloudflare.com/search/?tags=Migration) 

# Migrate to new GraphQL nodes

After 30 September 2021, Cloudflare will make the following changes to the Load Balancing GraphQL schema:

* Deprecate nodes:  
   * `loadBalancingRequestsGroups` will be deprecated for `loadBalancingRequestsAdaptiveGroups`  
   * `loadBalancingRequests` will be deprecated for `loadBalancingRequestsAdaptive`
* Deprecate the `date` field (replace it with the existing `datetime` field)
* Add the `sampleInterval` field

## Example query

The following example:

* Replaces `loadBalancingRequestsGroups` with `loadBalancingRequestsAdaptiveGroups`
* Replaces `date` with `datetime`
* Uses the new `sampleInterval` field

```

query {

  viewer {

    zones(filter: { zoneTag: "your Zone ID" }) {

      loadBalancingRequestsAdaptiveGroups(

        filter: {

          datetime_gt: "2021-06-12T04:00:00Z",

          datetime_lt: "2021-06-13T06:00:00Z"

        }

      ) {

        dimensions {

          datetime

          coloCode

          ...

        }

        avg {

          sampleInterval

        }

      }

    }

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/reference/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/reference/migration-guides/load-balancing-graphql-nodes/","name":"Migrate to new GraphQL nodes"}}]}
```
