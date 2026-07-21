---
description: Browse available datasets and fields via introspection.
title: Explore the GraphQL schema
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Explore the GraphQL schema

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Many GraphQL clients support browsing the GraphQL schema by taking care of [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/). In this page, we will cover GraphiQL and Altair clients.

[GraphiQL ↗](https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme) and [Altair ↗](https://altairgraphql.dev/#download) are open-source GraphQL clients that provide a tool to compose a query, execute it, and inspect the results. And as a bonus, they also allow you to browse GraphQL schema.

## Prerequisites

Before you begin, do not forget to [configure](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/) the API endpoint and HTTP headers.

The screenshots below are done from GraphiQL. However, Altair provides the same functionality and you will not find any difficulties following the same instructions to explore the schema.

## Open the Documentation Explorer

To open the GraphiQL Documentation Explorer, select the **Docs** link in the header of the response pane:

![Clicking GraphiQL Docs link to open Documentation Explorer](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-docs-link.png)

The **Documentation Explorer** opens and displays a list of available objects:

![GraphiQL Doc Explorer pane](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer.png)

Objects in the **Documentation Explorer** use this syntax:

```txt
  object-name: object-type-definition
```

## Find the type definition of an object

When you first open the **Documentation Explorer** pane, the `mutation` and `query` root types display:

![Documentation Explorer displaying mutation and query nodes](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-query-mutations.png)

In this example, `query` is the name of a root, and `Query` is the type definition.

## Find the fields available for a type definition

Click on the **type definition** of a node to view the fields that it provides. The **Documentation Explorer** also displays descriptions of the nodes.

For example, select the **Query** type definition. The **Documentation Explorer**displays the fields that `Query` provides. In this example, the fields are `cost` and `viewer`:

![Documentation Explorer displaying cost and viewer fields](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-view-cost.png)

To explore the schema, select the names of objects and definitions. You can also use the search input (magnifying glass icon) and breadcrumb links in the header.

## Find the arguments associated with a field

Click the type definition of the `viewer` field (gold text) to list its sub-fields. The `viewer` field provides sub-fields that allow you to query `accounts` or `zones` data:

![Displaying viewer fields](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-viewer-fields.png)

The `accounts` and `zones` nodes take arguments to specify which dataset to query.

For example, `zones` can take a filter of `ZoneFilter_InputObject` type as an argument. To view the fields available to filter, select **ZoneFilter\_InputObject**.

## Find the datasets available for a zone

To view a list of the datasets available to query, select the **zone** type definition (gold text):

![Clicking zone type definition](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-zones.png)

A list of datasets displays in the **Fields** section, each with list of valid arguments and a brief description. Arguments that end with an exclamation mark (`!`) are required.

![Fields section displaying datasets available](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-zone-fields.png)

Use the search input (magnifying glass icon) to find specific datasets:

![Searching a dataset in the Documentation Explorer](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-find-firewall.png)

To select a dataset, select its name.

The definition for the dataset displays. This example shows the `firewallEventsAdaptive` dataset:

![Example of a dataset definition](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-firewallevents-definition.png)

## Find the fields available for a dataset

To view the fields available for a particular dataset, select on its type definition (gold text).

For example, select the **ZoneFirewallEventsAdaptive** type definition to view the fields available for the `firewallEventsAdaptive` dataset:

![Clicking type definition to visualize fields available for a dataset](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-firewall-type-definition.png)

The list of fields displays:

![Displaying available fields for a dataset](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/~/assets/images/analytics/graphiql-doc-explorer-firewall-fields.png)

For more information on using GraphiQL, please visit this [guide](https://developers.cloudflare.com/analytics/graphql-api/getting-started/compose-graphql-query/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/#page","headline":"Explore the GraphQL schema · Cloudflare Analytics docs","description":"Browse available datasets and fields via introspection.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
