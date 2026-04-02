---
title: Glossary
description: Review the definitions for terms used across Cloudflare's D1 documentation.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/d1/reference/glossary.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Glossary

Review the definitions for terms used across Cloudflare's D1 documentation.

| Term                      | Definition                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bookmark                  | A bookmark represents the state of a database at a specific point in time. Bookmarks are lexicographically sortable. Sorting orders a list of bookmarks from oldest-to-newest.                                                                    |
| primary database instance | The primary database instance is the original instance of a database. This database instance only exists in one location in the world.                                                                                                            |
| query planner             | A component in a database management system which takes a user query and generates the most efficient plan of executing that query (the query plan). For example, the query planner decides which indices to use, or which table to access first. |
| read replica              | A read replica is an eventually-replicated copy of the primary database instance which only serve read requests. There may be multiple read replicas for a single primary database instance.                                                      |
| replica lag               | The time it takes for the primary database instance to replicate its changes to a specific read replica.                                                                                                                                          |
| session                   | A session encapsulates all the queries from one logical session for your application. For example, a session may correspond to all queries coming from a particular web browser session.                                                          |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/reference/glossary/","name":"Glossary"}}]}
```
