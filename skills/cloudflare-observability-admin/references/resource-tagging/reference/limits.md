---
description: API limits, tag key validation rules, and pagination behavior.
title: Limits and validation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt
> Use this file to discover all available pages before exploring further.

#  Limits and validation

Last updated Apr 27, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/resource-tagging/reference/limits/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/resource-tagging/reference/limits/#page","headline":"Limits and validation · Cloudflare Resource Tagging docs","description":"API limits, tag key validation rules, and pagination behavior.","url":"https://developers.cloudflare.com/resource-tagging/reference/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
