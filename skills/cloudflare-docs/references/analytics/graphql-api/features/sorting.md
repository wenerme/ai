---
title: Sorting
description: Sort GraphQL Analytics API query results.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sorting

You can specify the order of the query result elements using the `orderBy` argument. By default, the results are sorted by the primary key of a dataset (table). If you specify another field to sort on, the primary key is also used in the sorting key, allowing results to remain consistent for pagination.

The default order for an aggregated dataset is by the fields on which the aggregated data is grouped. If you specify a different order, the aggregation group is appended to your specified ordering.

Note

Ordering within nested structures is not supported.

## Examples

### Raw data sorting

```

firewallEventsAdaptive (orderBy: [clientCountryName_ASC]) {

    clientCountryName

}


```

### Raw data sorting using multiple fields

```

firewallEventsAdaptive (orderBy: [clientCountryName_ASC, datetime_DESC]) {

    clientCountryName

    datetime

}


```

### Group sorting by aggregation function

```

httpRequests1hGroups (orderBy: [sum_bytes_DESC]){

    sum {

        bytes

        requests

    }

    dimensions {

        datetime

    }

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/features/","name":"Features"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/features/sorting/","name":"Sorting"}}]}
```
