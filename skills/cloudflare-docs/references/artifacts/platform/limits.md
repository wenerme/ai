---
title: Limits
description: Review Artifacts platform limits.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

Limits that apply to creating, importing, cloning, and pushing Artifacts are detailed below.

These limits cover naming rules, storage, and request rates for control-plane and Git operations.

| Feature                        | Limit                                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| Control-plane request rate     | 2,000 requests per 10 seconds per Artifacts namespace                                          |
| Git request rate, per artifact | 2,000 requests per 10 seconds per artifact                                                     |
| Maximum storage per repository | 10 GB                                                                                          |
| Maximum storage per account    | 1 TB (can be raised on request)                                                                |
| Maximum number of repositories | Unlimited                                                                                      |
| Maximum number of namespaces   | Unlimited                                                                                      |
| Namespace and repo names       | Start with a letter or digit. Remaining characters may include letters, digits, ., \_, and \-. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/platform/limits/","name":"Limits"}}]}
```
