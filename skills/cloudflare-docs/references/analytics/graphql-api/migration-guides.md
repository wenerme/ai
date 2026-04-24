---
title: Migration guides
description: Migrate from deprecated analytics APIs to GraphQL.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/analytics/graphql-api/migration-guides/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Migration guides

## GraphQL migrations

If you are currently using the deprecated `httpRequests1mByColoGroups` or `httpRequests1dByColoGroups` GraphQL API nodes, the [HTTP Requests by Colo Groups to HTTP Requests by Adaptive Groups](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/graphql-api-analytics/) guide will help you migrate your queries to use the `httpRequestsAdaptiveGroups` node.

## Zone Analytics migrations

If you are currently using the Zone Analytics API, the following guide will help you migrate your queries to the new GraphQL Analytics API:

* [Zone Analytics to GraphQL Analytics](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/zone-analytics/)
* [Zone Analytics Colos Endpoint to GraphQL Analytics](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/zone-analytics-colos/)

## Network Analytics migrations

If you are currently using the Network Analytics v1 (NAv1) GraphQL nodes, the [Network Analytics v1 to Network Analytics v2](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/network-analytics-v2/) guide will help you migrate your queries to the new Network Analytics v2.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/migration-guides/","name":"Migration guides"}}]}
```
