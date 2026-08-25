---
description: Query Cloudflare analytics data using GraphQL.
title: GraphQL Analytics API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# GraphQL Analytics API

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The GraphQL Analytics API provides data regarding HTTP requests passing through Cloudflare's network, as well as data from specific products, such as Firewall or Load Balancing. Network Analytics users also have access to packet-level data. Use the GraphQL Analytics API to select specific datasets and metrics of interest, filter and aggregate the data along various dimensions, and integrate the results with other applications.

The basis of the API is the [GraphQL framework ↗](https://graphql.org/), created and open-sourced by Facebook. There is an active developer community for GraphQL and powerful clients for running queries, which makes it easy to get started. GraphQL is especially useful for building visualizations and powers the analytics in the Cloudflare dashboard.

GraphQL models a business domain as a graph using a schema. In the schema, there are logical definitions for different types of nodes and their connections (edges). These nodes are the datasets you use for your analytics. You write queries in GraphQL much like in SQL: you specify the dataset (table), the metrics to retrieve (such as requests and bytes), and filter or group by dimensions (for example, a time period).

GraphQL differs from a traditional API: it has one single endpoint:

```txt
https://api.cloudflare.com/client/v4/graphql
```

You pass the query parameters as a JSON object in the payload of a `POST` request to this endpoint.

You can use `curl` to make requests to the GraphQL Analytics API. Alternatively, you can use a GraphQL client to construct queries and pass requests to the GraphQL Analytics API.

## Clients

We are using [GraphiQL ↗](https://github.com/skevy/graphiql-app) for our example GraphQL queries. There are many other popular open-source clients that you can find online, such as [Altair ↗](https://altairgraphql.dev) and [Insomnia ↗](https://insomnia.rest).

## Limitations

The purpose of the GraphQL API is to provide aggregated analytics about various Cloudflare products. These datasets should not be used as a measure for usage that Cloudflare uses for billing purposes. Billable traffic [excludes things like DDoS traffic ↗](https://blog.cloudflare.com/unmetered-mitigation), while GraphQL is a measure of overall consumption/usage, so it will include all measurable traffic.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/analytics/graphql-api/#page","headline":"GraphQL Analytics API · Cloudflare Analytics docs","description":"Query Cloudflare analytics data using GraphQL.","url":"https://developers.cloudflare.com/analytics/graphql-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
