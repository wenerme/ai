---
title: Tags
description: Organize, search, and filter user Workers by custom tags like customer ID or plan type in Workers for Platforms.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/workers-for-platforms/configuration/tags.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Tags

Use tags to organize, search, and filter user Workers at scale. Tag Workers based on customer ID, plan type, project ID, or environment. After you tag user Workers, you can perform bulk operations like deleting all Workers for a specific customer.

Note

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

## Add tags via dashboard

1. Go to **Workers for Platforms** in the Cloudflare dashboard and select your namespace.
2. Select a user Worker from the list.
3. Go to **Settings** \> **Tags**.
4. Add your tags (for example, `customer-123`, `pro-plan`, `production`).
5. Select **Save**.

You can also search and filter Workers by tags in the namespace view.

## Tags API reference

For complete API documentation, refer to [Workers for Platforms API](https://developers.cloudflare.com/api/resources/workers%5Ffor%5Fplatforms/subresources/dispatch/subresources/namespaces/subresources/scripts/subresources/tags/).

### Get script tags

Fetch all tags for a Worker script.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers Tail Read`
* `Workers Scripts Write`
* `Workers Scripts Read`

Get Script Tags

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/tags" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Set script tags

Replace all tags on a Worker script. Existing tags not in the request are removed.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers Scripts Write`

Put Script Tags

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/tags" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Add a single tag

Add one tag to a Worker script without affecting existing tags.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers Scripts Write`

Put Script Tag

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/tags/$TAG" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Delete a single tag

Remove one tag from a Worker script.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers Scripts Write`

Delete Script Tag

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/tags/$TAG" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Filter Workers by tag

List all Workers that match a tag filter. Use `tag:yes` to include or `tag:no` to exclude.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers Tail Read`
* `Workers Scripts Write`
* `Workers Scripts Read`

List Scripts in Namespace

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts?tags=production%3Ayes" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Delete Workers by tag

Delete all Workers matching a tag filter. Use this to bulk delete Workers when a customer leaves your platform.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Workers Scripts Write`

Delete Scripts in Namespace

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts?tags=customer-123%3Ayes" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/","name":"Configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/tags/","name":"Tags"}}]}
```
