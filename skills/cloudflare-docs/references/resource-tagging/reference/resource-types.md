---
title: Supported resource types
description: Resource types that support tagging and their required fields.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Supported resource types

The Tagging API supports the following resource types across account-level and zone-level scopes.

## Account-level resources

Use `/accounts/{account_id}/tags` endpoints for these resource types.

| Resource type              | Required extra fields | Description                      |
| -------------------------- | --------------------- | -------------------------------- |
| account                    | None                  | The Cloudflare account itself    |
| access\_application        | None                  | Access application               |
| access\_group              | None                  | Access group                     |
| account\_ruleset           | None                  | Account-level ruleset            |
| ai\_gateway                | None                  | AI Gateway                       |
| alerting\_policy           | None                  | Notification policy              |
| alerting\_webhook          | None                  | Notification webhook destination |
| cloudflared\_tunnel        | None                  | Cloudflare Tunnel                |
| d1\_database               | None                  | D1 database                      |
| durable\_object\_namespace | None                  | Durable Objects namespace        |
| gateway\_list              | None                  | Gateway list                     |
| gateway\_rule              | None                  | Gateway rule                     |
| image                      | None                  | Cloudflare Image                 |
| kv\_namespace              | None                  | Workers KV namespace             |
| load\_balancer\_monitor    | None                  | Load Balancer monitor            |
| load\_balancer\_pool       | None                  | Load Balancer pool               |
| pages\_project             | None                  | Pages project                    |
| queue                      | None                  | Queue                            |
| r2\_bucket                 | None                  | R2 bucket                        |
| resource\_share            | None                  | Resource share                   |
| stream\_live\_input        | None                  | Stream live input                |
| stream\_video              | None                  | Stream video                     |
| vectorize\_index           | None                  | Vectorize index                  |
| worker                     | None                  | Workers script                   |
| worker\_version            | worker\_id            | Specific version of a Worker     |

## Zone-level resources

Use `/zones/{zone_id}/tags` endpoints for these resource types.

| Resource type                | Required extra fields   | Description                       |
| ---------------------------- | ----------------------- | --------------------------------- |
| access\_application\_policy  | access\_application\_id | Access application policy         |
| api\_gateway\_operation      | None                    | API Gateway operation             |
| custom\_certificate          | None                    | Custom SSL certificate            |
| custom\_hostname             | None                    | Custom hostname (SSL for SaaS)    |
| dns\_record                  | None                    | DNS record                        |
| healthcheck                  | None                    | Health check                      |
| load\_balancer               | None                    | Load Balancer                     |
| managed\_client\_certificate | None                    | Managed client certificate (mTLS) |
| worker\_route                | None                    | Worker route                      |
| zone                         | None                    | DNS zone                          |
| zone\_ruleset                | None                    | Zone-level ruleset                |

## Extra fields

Most resource types only require `resource_type` and `resource_id`. Two resource types require an additional field in both request bodies and query parameters.

### `worker_version`

Include the `worker_id` field:

Terminal window

```

# GET

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags?resource_type=worker_version&resource_id=$VERSION_ID&worker_id=$WORKER_ID" \

  -H "Authorization: Bearer $API_TOKEN"


# PUT

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "resource_type": "worker_version",

    "resource_id": "'"$VERSION_ID"'",

    "worker_id": "'"$WORKER_ID"'",

    "tags": {

      "version": "1.2.3",

      "environment": "staging"

    }

  }'


```

### `access_application_policy`

Include the `access_application_id` field:

Terminal window

```

# GET

curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags?resource_type=access_application_policy&resource_id=$POLICY_ID&access_application_id=$APP_ID" \

  -H "Authorization: Bearer $API_TOKEN"


# PUT

curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "resource_type": "access_application_policy",

    "resource_id": "'"$POLICY_ID"'",

    "access_application_id": "'"$APP_ID"'",

    "tags": {

      "sensitivity": "high",

      "team": "security"

    }

  }'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/resource-tagging/","name":"Resource Tagging"}},{"@type":"ListItem","position":3,"item":{"@id":"/resource-tagging/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/resource-tagging/reference/resource-types/","name":"Supported resource types"}}]}
```
