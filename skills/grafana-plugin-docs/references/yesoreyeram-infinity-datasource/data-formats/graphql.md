---
title: "GraphQL | Grafana Plugins documentation"
description: "Query GraphQL endpoints with the Infinity data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GraphQL

Select **GraphQL** as the query type to retrieve data from GraphQL endpoints. GraphQL queries work similarly to JSON queries but use the POST method with a query body.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Infinity plugin GraphQL demo](https://play.grafana.org/d/infinity-graphql).

[Try it](https://play.grafana.org/d/infinity-graphql)

## Configure a GraphQL query

To query a GraphQL endpoint:

1. Select **GraphQL** as the query type.
2. Enter the GraphQL endpoint URL.
3. Set the HTTP method to **POST**.
4. Click the expand icon next to the URL to open advanced options.
5. Enter your GraphQL query in the query field.
6. Define columns to extract specific fields from the response.

## Example query

The following example queries a countries API to retrieve country names and continent information:

**URL**: `https://countries.trevorblades.com/graphql`

**GraphQL query**:

graphql [Copy code to clipboard] Copy

```graphql
{
  countries {
    name
    continent {
      name
    }
  }
}
```

**Root selector**: `data.countries`

**Columns configuration**:

Expand table

| Selector         | Title     | Type   |
|------------------|-----------|--------|
| `name`           | Country   | String |
| `continent.name` | Continent | String |

## GraphQL variables

You can include variables in your GraphQL queries. Enter variables as JSON in the variables field:

JSON [Copy code to clipboard] Copy

```json
{
  "code": "US"
}
```

Then reference them in your query:

graphql [Copy code to clipboard] Copy

```graphql
query($code: ID!) {
  country(code: $code) {
    name
    capital
  }
}
```

## Parser options

GraphQL responses are JSON, so all JSON parser options are available:

- **JSONata parser**: For data transformations, alerting, and recorded queries
- **JQ parser**: For data transformations, alerting, and recorded queries
- **UQL parser**: For advanced in-memory transformations

Refer to [JSON](/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/json/) for details on parser options.
