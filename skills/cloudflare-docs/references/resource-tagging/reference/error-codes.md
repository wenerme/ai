---
title: Error codes
description: Tagging API error codes, causes, and resolutions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error codes

## Error code reference

| Code | HTTP status | Message                                       | Likely cause                                           | Resolution                                                                                                    |
| ---- | ----------- | --------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| 1002 | 400         | Invalid set payload                           | Request body is malformed or missing required fields   | Verify the body is valid JSON with resource\_type, resource\_id, and tags                                     |
| 1003 | 400         | resource\_type and resource\_id are required  | Missing query parameters                               | Include both resource\_type and resource\_id in the query string                                              |
| 1006 | 400         | Invalid resource type                         | Unsupported resource type                              | Use a [supported resource type](https://developers.cloudflare.com/resource-tagging/reference/resource-types/) |
| 1007 | 400         | tag parameter must be in format...            | Tag filter syntax is incorrect                         | Refer to [tag filtering syntax](https://developers.cloudflare.com/resource-tagging/how-to/filter-resources/)  |
| 1009 | 400         | tag\_key is required                          | Missing tag\_key parameter                             | Include the tag\_key path parameter                                                                           |
| 1010 | 400         | too many tag filters (maximum 20)             | More than 20 tag query parameters                      | Reduce filters to 20 or fewer, or split across multiple requests                                              |
| 1011 | 400         | tag key too long (maximum 256 characters)     | Tag key exceeds 256 characters                         | Shorten the tag key                                                                                           |
| 1012 | 400         | tag value too long (maximum 1024 characters)  | Tag value exceeds 1,024 characters                     | Shorten the tag value                                                                                         |
| 1013 | 400         | too many OR values in tag filter (maximum 10) | More than 10 comma-separated values in a single filter | Split into multiple filters                                                                                   |
| 1014 | 400         | Invalid tag key                               | Key contains invalid characters                        | Use only letters, digits, \_, ., \-                                                                           |
| 1015 | 400         | Invalid delete payload                        | Delete request body is malformed                       | Verify the body includes resource\_type and resource\_id                                                      |

Error 1007 note

The error message text references `:` as the tag filter separator (for example, `key:value`), but the API implementation uses `=` in query parameters (for example, `tag=key=value`). The error message is outdated — always use `=` when constructing tag filters.

## Resource not found behavior

In the current beta, `GET /accounts/{account_id}/tags` returns `500 Internal Server Error` for resources that do not exist or have never been tagged:

```

"resource not found: type={resource_type} id={resource_id}"


```

List endpoints (`/tags/resources`, `/tags/keys`, `/tags/values/{key}`) return `200 OK` with an empty result array when no matches are found -- this is expected, not an error.

This `500` behavior is a known beta limitation and may change to `404` in a future release.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/resource-tagging/","name":"Resource Tagging"}},{"@type":"ListItem","position":3,"item":{"@id":"/resource-tagging/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/resource-tagging/reference/error-codes/","name":"Error codes"}}]}
```
