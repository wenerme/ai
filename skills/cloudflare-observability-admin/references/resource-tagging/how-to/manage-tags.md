---
description: Create, update, and delete tags on Cloudflare resources.
title: Manage tags
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt
> Use this file to discover all available pages before exploring further.

#  Manage tags

Last updated Apr 29, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/resource-tagging/how-to/manage-tags/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

All tag operations use the Tagging API. Authentication requires an [account API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) or user API token with appropriate permissions.

## Set tags on a resource

Use `PUT` to set tags on an account-level resource. This operation replaces all existing tags on the resource.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type": "worker",
    "resource_id": "'"$RESOURCE_ID"'",
    "tags": {
      "environment": "production",
      "team": "platform",
      "cost-center": "engineering"
    }
  }'
```

For zone-level resources, use the zone endpoint:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type": "zone",
    "resource_id": "'"$ZONE_ID"'",
    "tags": {
      "environment": "production",
      "customer": "acme-corp"
    }
  }'
```

Some resource types require additional fields. Refer to [supported resource types](https://developers.cloudflare.com/resource-tagging/reference/resource-types/) for details.

## Get tags for a resource

Retrieve tags for a specific resource:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=worker&resource_id=$RESOURCE_ID" \
  -H "Authorization: Bearer $API_TOKEN"
```

Note

In the current beta, querying tags for a resource that does not exist or has never been tagged returns a `500` error instead of `404`. Verify the resource exists and has been tagged at least once.

## Add a single tag

The API does not support partial updates — `PUT` always replaces all tags. To add a tag without removing existing ones, use the `GET`, merge, `PUT` pattern:

1. `GET` the current tags.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=worker&resource_id=$RESOURCE_ID" \
  -H "Authorization: Bearer $API_TOKEN"

# Response: {"result": {"tags": {"environment": "production", "team": "platform"}}}
```

1. Merge the new tag into the existing set locally.

```json
{
  "environment": "production",
  "team": "platform",
  "cost-center": "engineering"
}
```

1. `PUT` the complete merged tag set.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type": "worker",
    "resource_id": "'"$RESOURCE_ID"'",
    "tags": {
      "environment": "production",
      "team": "platform",
      "cost-center": "engineering"
    }
  }'
```

Caution

If you `PUT` only the new tag, all existing tags are deleted. Always `GET` first, merge locally, then `PUT` the complete set.

## Remove a single tag

Follow the same `GET`, merge, `PUT` pattern, but omit the tag you want to remove from the set before calling `PUT`.

## Delete all tags

To remove all tags from a resource:

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type": "worker",
    "resource_id": "'"$RESOURCE_ID"'"
  }'
```

This returns `204 No Content` on success. Only use `DELETE` when you want to remove all tags from a resource (for example, when decommissioning it).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/resource-tagging/how-to/manage-tags/#page","headline":"Manage tags · Cloudflare Resource Tagging docs","description":"Create, update, and delete tags on Cloudflare resources.","url":"https://developers.cloudflare.com/resource-tagging/how-to/manage-tags/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
