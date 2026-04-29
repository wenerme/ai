---
title: Limits and validation
description: API limits, tag key validation rules, and pagination behavior.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits and validation

## API limits

| Limit                         | Value            | Error code |
| ----------------------------- | ---------------- | ---------- |
| Maximum tags per account      | 10,000 (beta)    | N/A        |
| Maximum tag key length        | 256 characters   | 1011       |
| Maximum tag value length      | 1,024 characters | 1012       |
| Maximum tag filters per query | 20               | 1010       |
| Maximum OR values per filter  | 10               | 1013       |
| Results per page              | 100 (fixed)      | N/A        |

When a limit is exceeded, the API returns `400 Bad Request` with the corresponding error code.

During the beta, each account is limited to 10,000 total tags. If you need a higher limit, contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Case sensitivity

Tag keys and values are case-sensitive. `Environment`, `environment`, and `ENVIRONMENT` are treated as three distinct keys. Be consistent with casing conventions across your organization to avoid duplicate keys.

## Tag key validation

Tag keys must follow these character rules:

### Allowed

* Unicode letters (any language)
* Unicode digits (0-9)
* Underscores (`_`)
* Periods (`.`)
* Hyphens (`-`)

### Not allowed

* Empty strings
* Spaces
* Special characters (except `_`, `.`, `-`)

### Examples

| Key         | Valid  | Reason              |
| ----------- | ------ | ------------------- |
| environment | Yes    | Letters only        |
| team\_name  | Yes    | Underscore          |
| cost-center | Yes    | Hyphen              |
| owner.email | Yes    | Period              |
| env123      | Yes    | Letters and digits  |
| env name    | **No** | Contains space      |
| team@work   | **No** | Special character @ |
| (empty)     | **No** | Empty string        |

Invalid tag keys return `400 Bad Request` with error code `1014`.

## Pagination

List endpoints use cursor-based pagination with a fixed page size of 100\. The page size is not configurable.

Paginated endpoints:

* `GET /accounts/{account_id}/tags/keys`
* `GET /accounts/{account_id}/tags/resources`
* `GET /accounts/{account_id}/tags/values/{tag_key}`

Refer to [Filter resources by tag](https://developers.cloudflare.com/resource-tagging/how-to/filter-resources/#pagination) for pagination examples.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/resource-tagging/","name":"Resource Tagging"}},{"@type":"ListItem","position":3,"item":{"@id":"/resource-tagging/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/resource-tagging/reference/limits/","name":"Limits and validation"}}]}
```
