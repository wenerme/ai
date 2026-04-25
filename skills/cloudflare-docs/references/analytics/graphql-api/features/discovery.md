---
title: Discovery
description: Discover available GraphQL Analytics API nodes and limits.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Discovery

GraphQL API supports [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/) to explore nodes and provides a way to retrieve the user's [limits](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/) for every node.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/features/","name":"Features"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/features/discovery/","name":"Discovery"}}]}
```
