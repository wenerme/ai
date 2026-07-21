---
description: Query tagged resources using the tag filtering syntax.
title: Filter resources by tag
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt
> Use this file to discover all available pages before exploring further.

#  Filter resources by tag

Last updated Apr 29, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/resource-tagging/how-to/filter-resources/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The `GET /accounts/{account_id}/tags/resources` endpoint supports tag filtering via the `tag` query parameter. Multiple `tag` parameters combine with AND logic. For the full endpoint specification, refer to the [Resource Tagging API reference ↗](https://developers.cloudflare.com/api/resources/tags/).

Caution

Use `=` as the separator in tag filters (for example, `tag=key=value`), not `:`. The API error message references `:` but the implementation uses `=`.

## Filter types

### Key-only filter

Match resources that have a specific tag key, regardless of value.

```bash
# All resources with an "environment" tag (any value)
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=environment" \
  -H "Authorization: Bearer $API_TOKEN"
```

### Key-value filter

Match resources where a tag key has a specific value.

```bash
# All resources with environment=production
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=environment=production" \
  -H "Authorization: Bearer $API_TOKEN"
```

### Multiple values (OR)

Match resources where a tag key has any of the specified values. Separate values with commas.

```bash
# environment=production OR environment=staging
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=environment=production,staging" \
  -H "Authorization: Bearer $API_TOKEN"
```

Maximum of 10 OR values per filter (error code `1013` if exceeded).

### Negate key

Match resources that do **not** have a specific tag key.

```bash
# All resources without an "archived" tag
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=!archived" \
  -H "Authorization: Bearer $API_TOKEN"
```

### Negate key-value

Match resources where a tag key does **not** have a specific value.

```bash
# All resources where region is NOT us-west-1
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=region!=us-west-1" \
  -H "Authorization: Bearer $API_TOKEN"
```

## Combining filters

Multiple `tag` parameters combine with AND logic. All conditions must match.

```bash
# Production resources in US regions, excluding archived
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=environment=production&tag=region=us-west-1,us-east-1&tag=!archived" \
  -H "Authorization: Bearer $API_TOKEN"
```

Maximum of 20 tag filters per query (error code `1010` if exceeded).

## Discover available tags

### List all tag keys

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/keys" \
  -H "Authorization: Bearer $API_TOKEN"
```

### List values for a key

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/values/environment" \
  -H "Authorization: Bearer $API_TOKEN"
```

Optionally filter by resource type:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/values/environment?type=worker" \
  -H "Authorization: Bearer $API_TOKEN"
```

## Pagination

All list endpoints use cursor-based pagination with a fixed page size of 100 results.

When the response includes a non-null `result_info.cursor`, pass it as a query parameter to get the next page:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=environment=production&cursor=$CURSOR" \
  -H "Authorization: Bearer $API_TOKEN"
```

When `cursor` is `null`, you have reached the last page. Pagination works seamlessly with tag filters.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/resource-tagging/how-to/filter-resources/#page","headline":"Filter resources by tag · Cloudflare Resource Tagging docs","description":"Query tagged resources using the tag filtering syntax.","url":"https://developers.cloudflare.com/resource-tagging/how-to/filter-resources/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
