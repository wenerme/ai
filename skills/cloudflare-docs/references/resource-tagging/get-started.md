---
title: Get started
description: Set up authentication for Resource Tagging and make your first API calls.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Get started

This guide walks you through verifying that tagging works on your account and making your first API calls.

## Prerequisites

* At least one user with the Super Administrator, Workers Admin, or Tag Admin role. These roles can create, update, and delete tags.
* The API is the preferred interface for managing tags. You can also use the dashboard under **Manage Account** \> **Resource Tagging**, but you should be comfortable making authenticated HTTP requests for automation workflows.
* An API token with the required permissions. [Account Owned Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) are recommended for automation.

## 1\. Verify tagging is enabled

Test the API to confirm tagging is active on your account:

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/keys" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json"


```

### Interpreting the response

| Response                                             | Meaning                                                            | Action                                                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **200 OK** with {"success": true, "result": \[...\]} | Tagging is enabled. An empty array is normal if no tags exist yet. | Proceed to the next step.                                                                                                                                                                      |
| **403** mentioning "permission" or "role"            | The caller lacks required permissions.                             | Verify the caller has a Super Admin, Workers Admin, or Tag Admin role, or that the token has #com.cloudflare.api.account.tag.list scope.                                                       |
| **403** mentioning "feature" or "gate"               | Tagging is not enabled for this account.                           | Contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) for assistance.                                                                         |
| **401 Unauthorized**                                 | Authentication failed.                                             | Verify the token is valid, not expired, and formatted correctly in the Authorization: Bearer header.                                                                                           |
| Any other response                                   | Unexpected error.                                                  | Capture the full response body and contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) with the Account ID, request details, and timestamp. |

## 2\. Create your first tags

Set tags on a resource using `PUT`:

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

      "team": "platform"

    }

  }'


```

Explain Code

Then retrieve the tags:

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=workers_script&resource_id=$RESOURCE_ID" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json"


```

## 3\. List tagged resources

Query all tagged resources in the account, optionally filtering by tag:

Terminal window

```

# All tagged resources

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources" \

  -H "Authorization: Bearer $API_TOKEN"


# Filter: only resources with environment=production

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources?tag=environment=production" \

  -H "Authorization: Bearer $API_TOKEN"


```

## Next steps

* Learn the full [tag filtering syntax](https://developers.cloudflare.com/resource-tagging/how-to/filter-resources/) for complex queries.
* Understand the [GET, merge, PUT workflow](https://developers.cloudflare.com/resource-tagging/how-to/manage-tags/#add-a-single-tag) for modifying individual tags.
* Review [supported resource types](https://developers.cloudflare.com/resource-tagging/reference/resource-types/) and their required fields.
* Review [API limits and validation rules](https://developers.cloudflare.com/resource-tagging/reference/limits/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/resource-tagging/","name":"Resource Tagging"}},{"@type":"ListItem","position":3,"item":{"@id":"/resource-tagging/get-started/","name":"Get started"}}]}
```
