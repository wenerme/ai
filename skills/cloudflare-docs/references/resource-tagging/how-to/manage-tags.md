---
title: Manage tags
description: Create, update, and delete tags on Cloudflare resources.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage tags

All tag operations use the Tagging API. Authentication requires an [account API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) or user API token with appropriate permissions.

## Set tags on a resource

Use `PUT` to set tags on an account-level resource. This operation replaces all existing tags on the resource.

Terminal window

```

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "resource_type": "workers_script",

    "resource_id": "'"$RESOURCE_ID"'",

    "tags": {

      "environment": "production",

      "team": "platform",

      "cost-center": "engineering"

    }

  }'


```

Explain Code

For zone-level resources, use the zone endpoint:

Terminal window

```

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

Explain Code

Some resource types require additional fields. Refer to [supported resource types](https://developers.cloudflare.com/resource-tagging/reference/resource-types/) for details.

## Get tags for a resource

Retrieve tags for a specific resource:

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=workers_script&resource_id=$RESOURCE_ID" \

  -H "Authorization: Bearer $API_TOKEN"


```

Note

In the current beta, querying tags for a resource that does not exist or has never been tagged returns a `500` error instead of `404`. Verify the resource exists and has been tagged at least once.

## Add a single tag

The API does not support partial updates — `PUT` always replaces all tags. To add a tag without removing existing ones, use the `GET`, merge, `PUT` pattern:

1. `GET` the current tags.

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=workers_script&resource_id=$RESOURCE_ID" \

  -H "Authorization: Bearer $API_TOKEN"


# Response: {"result": {"tags": {"environment": "production", "team": "platform"}}}


```

1. Merge the new tag into the existing set locally.

```

{

  "environment": "production",

  "team": "platform",

  "cost-center": "engineering"

}


```

1. `PUT` the complete merged tag set.

Terminal window

```

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "resource_type": "workers_script",

    "resource_id": "'"$RESOURCE_ID"'",

    "tags": {

      "environment": "production",

      "team": "platform",

      "cost-center": "engineering"

    }

  }'


```

Explain Code

Warning

If you `PUT` only the new tag, all existing tags are deleted. Always `GET` first, merge locally, then `PUT` the complete set.

## Remove a single tag

Follow the same `GET`, merge, `PUT` pattern, but omit the tag you want to remove from the set before calling `PUT`.

## Delete all tags

To remove all tags from a resource:

Terminal window

```

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "resource_type": "workers_script",

    "resource_id": "'"$RESOURCE_ID"'"

  }'


```

This returns `204 No Content` on success. Only use `DELETE` when you want to remove all tags from a resource (for example, when decommissioning it).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/resource-tagging/","name":"Resource Tagging"}},{"@type":"ListItem","position":3,"item":{"@id":"/resource-tagging/how-to/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/resource-tagging/how-to/manage-tags/","name":"Manage tags"}}]}
```
